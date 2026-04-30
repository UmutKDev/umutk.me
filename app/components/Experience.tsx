import { experiences } from "@/app/lib/data";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section
      id="work"
      className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <SectionHeader
        index="02"
        kicker="trace"
        title={
          <>
            <span className="italic">where</span> I&apos;ve been{" "}
            <span className="text-ink-soft">in the wild.</span>
          </>
        }
      />

      <ol className="relative mt-16">
        {/* timeline rail */}
        <div className="absolute left-4 top-2 bottom-4 w-px bg-gradient-to-b from-transparent via-[var(--color-line-strong)] to-transparent md:left-[calc(25%-1px)]" />

        {experiences.map((exp, i) => (
          <li
            key={`${exp.company}-${i}`}
            className="relative grid grid-cols-1 gap-4 pb-12 md:grid-cols-4 md:gap-6"
          >
            {/* dot */}
            <span className="absolute left-4 top-2 -translate-x-1/2 md:left-[calc(25%-1px)]">
              <span className="block h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_rgba(5,7,13,1),0_0_0_5px_rgba(163,255,18,0.25)]" />
            </span>

            {/* date column */}
            <div className="ml-10 text-mono text-xs uppercase tracking-[0.18em] text-ink-soft md:ml-0 md:text-right md:pr-10">
              <div>{exp.start}</div>
              <div className="text-ink-dim">→ {exp.end}</div>
            </div>

            {/* card */}
            <div className="md:col-span-3 md:pl-10">
              <div className="glass relative overflow-hidden rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-display text-3xl text-ink">
                    {exp.company}
                  </h3>
                  <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                    {exp.role}
                  </span>
                </div>
                {exp.location && (
                  <p className="text-mono mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                    @ {exp.location}
                  </p>
                )}
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-ink-soft">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="relative pl-5">
                      <span className="absolute left-0 top-2 h-px w-3 bg-[var(--color-accent)]/60" />
                      {b}
                    </li>
                  ))}
                </ul>
                {exp.stack && exp.stack.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.stack.map((t) => (
                      <span
                        key={t}
                        className="text-mono rounded-full border border-line bg-white/[0.03] px-2.5 py-0.5 text-[10.5px] uppercase tracking-[0.14em] text-ink-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
