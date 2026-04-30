const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export type NowPlaying = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
  fallback?: boolean;
};

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function getNowPlaying(): Promise<NowPlaying> {
  const token = await getAccessToken();
  if (!token) return { isPlaying: false };

  const res = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 204 || res.status >= 400) {
    return getRecentlyPlayed(token);
  }

  const data = await res.json();
  if (!data?.item) return getRecentlyPlayed(token);

  const item = data.item;
  return {
    isPlaying: Boolean(data.is_playing),
    title: item.name,
    artist: item.artists?.map((a: { name: string }) => a.name).join(", "),
    album: item.album?.name,
    albumImageUrl: item.album?.images?.[0]?.url,
    songUrl: item.external_urls?.spotify,
    progressMs: data.progress_ms ?? 0,
    durationMs: item.duration_ms ?? 0,
  };
}

async function getRecentlyPlayed(token: string): Promise<NowPlaying> {
  const res = await fetch(RECENT_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return { isPlaying: false };
  const data = await res.json();
  const item = data?.items?.[0]?.track;
  if (!item) return { isPlaying: false };
  return {
    isPlaying: false,
    fallback: true,
    title: item.name,
    artist: item.artists?.map((a: { name: string }) => a.name).join(", "),
    album: item.album?.name,
    albumImageUrl: item.album?.images?.[0]?.url,
    songUrl: item.external_urls?.spotify,
    durationMs: item.duration_ms ?? 0,
  };
}
