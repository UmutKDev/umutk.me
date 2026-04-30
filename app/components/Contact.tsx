import { siteConfig } from "@/app/lib/data";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-14">
        <div className="absolute inset-0 grid-fx opacity-30 mask-fade-edges" />
        <div
          aria-hidden
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(163,255,18,0.25), transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative">
          <span className="label-mono">
            <span className="text-[var(--color-accent)]">05</span> · open
            channel
          </span>
          <h2 className="mt-6 text-display text-balance text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-ink">
            <span className="italic">let&apos;s</span> build something{" "}
            <span className="relative inline-block">
              <span className="text-[var(--color-accent)] glow-text">
                worth
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-accent)]/60" />
            </span>{" "}
            running.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            Pings about freelance contracts, full-time roles, side projects,
            or just-because-coffee are all welcome. Response time roughly
            zero-to-one business day.
          </p>

          <div className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-mono group inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-5 py-3 text-[13px] uppercase tracking-[0.18em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-accent-soft)] hover:shadow-[0_0_0_8px_rgba(163,255,18,0.12)]"
            >
              <span>{siteConfig.email}</span>
              <Arrow />
            </a>

            <div className="flex flex-wrap items-center gap-2">
              {siteConfig.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-mono group inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-4 py-3 text-[12px] uppercase tracking-[0.18em] text-ink-soft backdrop-blur-md transition-all hover:border-[var(--color-accent)]/60 hover:text-ink"
                >
                  <span>{link.label}</span>
                  <span className="text-ink-dim group-hover:text-[var(--color-accent)]">
                    {link.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
          © {new Date().getFullYear()} · {siteConfig.name} · all bytes
          reserved.
        </p>
        <p className="text-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
          built with next.js · tailwind · ☕ · {siteConfig.location.split("—")[0].trim()}
        </p>
      </footer>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden
    >
      <path d="M3 11L11 3" strokeLinecap="round" />
      <path d="M5 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
