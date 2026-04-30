import { projects } from "@/app/lib/data";
import { SectionHeader } from "./SectionHeader";
import { TiltCard } from "./TiltCard";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <SectionHeader
        index="04"
        kicker="artifacts"
        title={
          <>
            <span className="italic">selected</span> work{" "}
            <span className="text-ink-soft">/ field reports.</span>
          </>
        }
        description="A non-exhaustive subset — the rest lives behind NDAs and prod auth walls."
      />

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <TiltCard
            key={p.name}
            className="h-full"
            intensity={6}
          >
            <article className="glass-strong relative flex h-full flex-col overflow-hidden rounded-3xl p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  proj.{String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                  {p.start} → {p.end}
                </span>
              </div>

              <h3 className="mt-4 text-display text-4xl leading-tight text-ink">
                {p.name}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                {p.blurb}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-mono rounded-full border border-line bg-white/[0.03] px-2 py-0.5 text-[10.5px] uppercase tracking-[0.14em] text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* corner brackets */}
              <CornerBrackets />
            </article>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function CornerBrackets() {
  const base =
    "absolute h-3 w-3 border-[var(--color-accent)]/60 transition-colors group-hover:border-[var(--color-accent)]";
  return (
    <>
      <span className={`${base} top-3 left-3 border-l border-t`} />
      <span className={`${base} top-3 right-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-l border-b`} />
      <span className={`${base} bottom-3 right-3 border-r border-b`} />
    </>
  );
}
