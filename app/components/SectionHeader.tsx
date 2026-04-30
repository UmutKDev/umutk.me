import type { ReactNode } from "react";

type Props = {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
};

export function SectionHeader({ index, kicker, title, description }: Props) {
  return (
    <header className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <div className="md:col-span-3">
        <div className="flex items-baseline gap-3 text-mono">
          <span className="text-[var(--color-accent)]">{index}</span>
          <span className="hairline w-10" />
          <span className="label-mono">{kicker}</span>
        </div>
      </div>
      <div className="md:col-span-9">
        <h2 className="text-display text-balance text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
