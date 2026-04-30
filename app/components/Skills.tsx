import { skillGroups } from "@/app/lib/data";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  return (
    <section
      id="stack"
      className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <SectionHeader
        index="03"
        kicker="payload"
        title={
          <>
            <span className="italic">tools</span> I keep loaded{" "}
            <span className="text-ink-soft">in the chamber.</span>
          </>
        }
        description="Pragmatic stack — chosen to move fast, scale gracefully and stay legible six months from now."
      />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <div
            key={group.label}
            className="glass relative overflow-hidden rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-display text-2xl text-ink">{group.label}</h3>
              <span className="text-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(skillGroups.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-mono rounded-md border border-line bg-white/[0.03] px-2 py-1 text-[11px] tracking-tight text-ink-soft transition-colors hover:border-[var(--color-accent)]/40 hover:text-ink"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="absolute -bottom-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
