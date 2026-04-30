import { siteConfig } from "@/app/lib/data";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <SectionHeader
        index="01"
        kicker="profile"
        title={
          <>
            <span className="italic">a</span> short{" "}
            <span className="text-ink-soft">README.</span>
          </>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-7 md:col-start-4">
          <div className="glass relative overflow-hidden rounded-2xl p-7 sm:p-9">
            <div className="absolute inset-0 grid-fx-fine opacity-40 mask-fade-edges" />
            <div className="relative">
              <p className="text-pretty text-lg leading-relaxed text-ink">
                I build full-stack web apps for{" "}
                <span className="text-[var(--color-accent)]">HR</span> and
                product teams — currently at{" "}
                <span className="text-ink">ThinkCut</span>. My loop is design ↔
                code ↔ deliver: reusable UI systems, clean API contracts, SSR
                for SEO, and a little bit of caching where it earns its keep.
              </p>
              <p className="mt-5 text-pretty text-base leading-relaxed text-ink-soft">
                Comfortable across the seam — React/Next.js on the surface,
                Node.js & NestJS underneath, PostgreSQL or MongoDB at the
                bottom, Docker for the trip. I lean toward boring,
                well-instrumented code: the kind that wakes up healthy on
                Monday morning.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Fact label="based" value={siteConfig.location.split("—")[0].trim()} />
                <Fact label="open to" value="remote · hybrid" />
                <Fact label="lang" value="EN · TR" />
                <Fact label="status" value="online" accent />
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border-t border-line pt-3">
      <dt className="label-mono">{label}</dt>
      <dd
        className={`text-mono mt-1 text-sm ${
          accent ? "text-[var(--color-accent)]" : "text-ink"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
