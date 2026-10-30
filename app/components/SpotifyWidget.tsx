"use client";

import { useEffect, useState } from "react";
import type { Dict } from "@/app/lib/dictionaries/en";
import type { NowPlaying } from "@/app/lib/spotify";

const POLL_MS = 30_000;
const clock = (ms: number) => {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

// A record row: what is (or was last) playing. Renders nothing when Spotify isn't set up.
export function SpotifyWidget({ dict }: { dict: Dict["spotify"] }) {
  const [state, setState] = useState<"loading" | "error" | NowPlaying>("loading");

  useEffect(() => {
    let live = true;
    const load = () =>
      fetch("/api/spotify/now-playing", { cache: "no-store" })
        .then((r) => (r.ok ? (r.json() as Promise<NowPlaying>) : Promise.reject(r.status)))
        .then(
          (d) => {
            if (d.configured === false) clearInterval(t);
            if (live) setState(d);
          },
          () => live && setState("error"),
        );
    const t = setInterval(load, POLL_MS);
    load();
    return () => {
      live = false;
      clearInterval(t);
    };
  }, []);

  // nothing until the first answer, so the row never flashes a loading label and then vanishes
  if (state === "loading" || (state !== "error" && state.configured === false)) return null;
  const track = typeof state === "object" && state.title ? state : null;
  const label =
    state === "error" ? dict.error
    : state.isPlaying ? dict.playing
    : track ? dict.last
    : dict.off;

  return (
    <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y border-rule py-4">
      <span className="text-sm text-muted">{label}</span>
      {track && (
        <>
          {track.songUrl ? (
            <a href={track.songUrl} className="font-medium transition-colors hover:text-accent">
              {track.title}
            </a>
          ) : (
            <span className="font-medium">{track.title}</span>
          )}
          <span className="text-ink-2">{track.artist}</span>
          {track.durationMs ? (
            <time dateTime={`PT${Math.round(track.durationMs / 1000)}S`} className="font-mono text-sm text-cool">
              {clock(track.durationMs)}
            </time>
          ) : null}
        </>
      )}
    </p>
  );
}
