import { BackgroundFX } from "./components/BackgroundFX";

export default function Loading() {
  return (
    <>
      <BackgroundFX />
      <main className="relative mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col items-center justify-center px-6 py-32">
        <div className="glass relative w-full overflow-hidden rounded-2xl p-8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span className="label-mono">booting · syncing modules</span>
          </div>
          <div className="text-mono mt-6 text-sm text-ink-soft">
            <span className="text-[var(--color-accent)]">~/umutk</span>
            <span className="mx-1 text-ink-dim">$</span>
            <span className="text-ink">load /umutk.me</span>
            <span className="anim-blink ml-1 inline-block h-[1.05em] w-[0.55em] -translate-y-[0.1em] bg-[var(--color-accent)] align-middle" />
          </div>

          <div className="mt-8 space-y-3">
            <Skeleton w="60%" />
            <Skeleton w="92%" />
            <Skeleton w="78%" />
          </div>
        </div>
      </main>
    </>
  );
}

function Skeleton({ w }: { w: string }) {
  return (
    <div
      className="anim-shimmer h-3 rounded-full bg-white/[0.06]"
      style={{ width: w }}
    />
  );
}
