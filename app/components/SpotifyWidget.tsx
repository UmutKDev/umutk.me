"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NowPlaying } from "@/app/lib/spotify";

const POLL_MS = 15_000;
// Refetch window: when the current track has this many ms left, schedule an
// immediate one-shot refetch at end + buffer to catch the new track without
// waiting on the next regular poll tick.
const END_WATCH_MS = 4_000;
const END_BUFFER_MS = 600;

export function SpotifyWidget() {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number>(() => Date.now());
  const [now, setNow] = useState<number>(() => Date.now());
  const [loading, setLoading] = useState(true);
  const cancelledRef = useRef(false);
  const endWatchScheduledRef = useRef(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify/now-playing", { cache: "no-store" });
      if (!res.ok) throw new Error("bad response");
      const json = (await res.json()) as NowPlaying;
      if (!cancelledRef.current) {
        setData(json);
        setFetchedAt(Date.now());
        setNow(Date.now());
        setLoading(false);
      }
    } catch {
      if (!cancelledRef.current) {
        setData({ isPlaying: false });
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    cancelledRef.current = false;
    load();
    const interval = setInterval(load, POLL_MS);
    return () => {
      cancelledRef.current = true;
      clearInterval(interval);
    };
  }, [load]);

  // local clock — only ticks while playing, used to advance progress between polls
  useEffect(() => {
    if (!data?.isPlaying) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [data?.isPlaying]);

  // refocus refetch — switching back to the tab pulls fresh state immediately
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [load]);

  const elapsed = data?.isPlaying ? Math.max(0, now - fetchedAt) : 0;
  const progress = data?.durationMs
    ? Math.min(1, ((data.progressMs ?? 0) + elapsed) / data.durationMs)
    : 0;
  const remaining = data?.isPlaying && data.durationMs
    ? Math.max(0, data.durationMs - ((data.progressMs ?? 0) + elapsed))
    : Infinity;

  // Reset the end-of-song guard whenever a new track lands or playback stops,
  // so the next song gets its own one-shot timer.
  useEffect(() => {
    endWatchScheduledRef.current = false;
  }, [data?.title, data?.isPlaying]);

  // end-of-song refetch — schedule exactly one fetch right after the current
  // track is expected to end so the widget catches the next track within ~1s.
  useEffect(() => {
    if (!data?.isPlaying || !Number.isFinite(remaining)) return;
    if (remaining > END_WATCH_MS || endWatchScheduledRef.current) return;
    endWatchScheduledRef.current = true;
    const t = setTimeout(load, remaining + END_BUFFER_MS);
    return () => clearTimeout(t);
  }, [data?.isPlaying, remaining, load]);

  const status = loading
    ? "syncing"
    : data?.isPlaying
      ? "now playing"
      : data?.fallback
        ? "last played"
        : data?.title
          ? "paused"
          : "offline";

  const dotColor = data?.isPlaying
    ? "bg-[#1ed760]"
    : data?.fallback
      ? "bg-[var(--color-cyan)]"
      : data?.title
        ? "bg-[var(--color-accent)]"
        : "bg-ink-dim";

  return (
    <a
      href={data?.songUrl ?? "https://open.spotify.com"}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="glass relative overflow-hidden rounded-2xl p-4 transition-all hover:border-[var(--color-accent)]/40 hover:shadow-[0_0_0_1px_rgba(216,133,106,0.22),0_30px_60px_-20px_rgba(0,0,0,0.7)]">
        {/* shimmer when playing */}
        {data?.isPlaying && (
          <div className="absolute inset-0 anim-shimmer opacity-30 mix-blend-overlay" />
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`relative h-2 w-2 rounded-full ${dotColor}`}>
              {data?.isPlaying && (
                <span className="absolute inset-0 rounded-full bg-[#1ed760] animate-ping opacity-75" />
              )}
            </span>
            <span className="label-mono">{status}</span>
          </div>
          <SpotifyMark />
        </div>

        <div className="mt-3 flex items-start gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-[rgba(255,255,255,0.08)] bg-white/[0.04]">
            {data?.albumImageUrl ? (
              // Avoid next/image to skip remote-domain config; this is a tiny avatar.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.albumImageUrl}
                alt={data.album ?? "album art"}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-mono text-[10px] text-ink-dim">
                ◌
              </div>
            )}
            {data?.isPlaying && (
              <div className="absolute inset-x-1 bottom-1 flex items-end gap-[2px] h-3">
                <span className="block w-[2px] bg-[#1ed760] anim-bar" style={{ animationDelay: "-0.2s" }} />
                <span className="block w-[2px] bg-[#1ed760] anim-bar" style={{ animationDelay: "-0.6s" }} />
                <span className="block w-[2px] bg-[#1ed760] anim-bar" style={{ animationDelay: "-1s" }} />
                <span className="block w-[2px] bg-[#1ed760] anim-bar" style={{ animationDelay: "-1.4s" }} />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">
              {data?.title ?? "—"}
            </p>
            <p className="truncate text-xs text-ink-soft">
              {data?.artist ?? "Spotify not configured"}
            </p>
            <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1ed760] to-[var(--color-accent)] transition-[width] duration-1000 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

    </a>
  );
}

function SpotifyMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-ink-soft transition-colors group-hover:text-[#1ed760]"
      aria-hidden
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.3a.75.75 0 01-1 .25c-2.7-1.65-6.1-2-10.1-1.1a.75.75 0 11-.33-1.46c4.4-1 8.2-.6 11.2 1.25.35.2.45.7.23 1.06zm1.45-3.2a.94.94 0 01-1.3.3c-3.1-1.9-7.7-2.5-11.4-1.4a.94.94 0 11-.55-1.8c4.2-1.3 9.3-.6 12.9 1.6a.94.94 0 01.34 1.3zm.13-3.3c-3.7-2.2-9.7-2.4-13.1-1.4a1.13 1.13 0 11-.65-2.16c4-1.2 10.7-1 15 1.6a1.13 1.13 0 01-1.18 1.94z" />
    </svg>
  );
}
