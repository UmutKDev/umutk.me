import Link from "next/link";
import { BackgroundFX } from "./components/BackgroundFX";

export const metadata = {
  title: "404 — signal lost",
};

export default function NotFound() {
  return (
    <>
      <BackgroundFX />
      <main className="relative mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col items-center justify-center px-6 py-32">
        <div className="glass scanlines relative w-full overflow-hidden rounded-3xl p-10 sm:p-14">
          <div className="text-mono text-[10px] uppercase tracking-[0.32em] text-ink-soft">
            <span className="text-[var(--color-accent)]">●</span>{" "}
            connection refused · 0x404
          </div>

          <h1 className="text-display mt-6 text-[clamp(5rem,16vw,12rem)] leading-[0.9] text-ink">
            <span className="italic">lost</span> in the
            <span className="ml-3 text-[var(--color-accent)] glow-text">
              void.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
            The page you tried to reach is either off the grid, has been
            renamed, or never made it past the staging branch. Try one of
            the entry points below.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <NavLink href="/#intro" cmd="cd ~/intro" />
            <NavLink href="/#work" cmd="cd ~/work" />
            <NavLink href="/#contact" cmd="cd ~/contact" />
          </div>

          <div className="mt-10 flex items-center gap-3">
            <Link
              href="/"
              className="text-mono group inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-[12px] uppercase tracking-[0.18em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-accent-soft)]"
            >
              <span>back to home</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <span className="label-mono">/* press esc anywhere */</span>
          </div>
        </div>
      </main>
    </>
  );
}

function NavLink({ href, cmd }: { href: string; cmd: string }) {
  return (
    <Link
      href={href}
      className="text-mono group flex items-center justify-between rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[12px] tracking-tight text-ink-soft transition-all hover:border-[var(--color-accent)]/40 hover:text-ink"
    >
      <span>{cmd}</span>
      <span className="text-ink-dim group-hover:text-[var(--color-accent)]">
        →
      </span>
    </Link>
  );
}
