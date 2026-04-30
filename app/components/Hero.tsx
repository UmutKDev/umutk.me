import Image from "next/image";
import { siteConfig } from "@/app/lib/data";
import { Terminal } from "./Terminal";
import { SpotifyWidget } from "./SpotifyWidget";

export function Hero() {
  return (
    <section
      id="intro"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-4 pt-32 pb-16 sm:px-6"
    >
      <div className="absolute right-4 top-28 hidden lg:block opacity-70">
        <Sigil />
      </div>

      {/* meta line */}
      <div className="anim-fade-up flex items-center gap-3">
        <span className="label-mono">
          <span className="text-[var(--color-accent)]">●</span>{" "}
          {siteConfig.location}
        </span>
        <span className="hairline w-12" />
        <span className="label-mono">v.2026</span>
      </div>

      {/* headline */}
      <h1 className="mt-10 max-w-5xl text-balance">
        <span className="anim-fade-up delay-100 block text-mono text-[10px] uppercase tracking-[0.32em] text-ink-soft">
          /// {siteConfig.role.toUpperCase()}
        </span>
        <span className="anim-fade-up delay-200 mt-4 block text-display text-[clamp(3.6rem,11vw,9.5rem)] text-ink">
          Umut
          <span className="ml-3 italic text-ink/85">Kızıloğlu.</span>
        </span>
        <span className="anim-fade-up delay-300 mt-3 block text-display text-[clamp(2.4rem,7vw,5.5rem)] text-ink-soft">
          <span className="italic">building</span> the{" "}
          <span className="relative inline-block">
            <span className="text-[var(--color-accent)] glow-text">web</span>
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-accent)]/60" />
          </span>{" "}
          <span className="italic">in production.</span>
        </span>
      </h1>

      <p className="anim-fade-up delay-400 mt-8 max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
        {siteConfig.description}{" "}
        <span className="text-ink">{siteConfig.tagline}</span>
      </p>

      <div className="anim-fade-up delay-500 mt-12 grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* terminal card */}
        <div className="glass relative overflow-hidden rounded-2xl p-5 md:col-span-7 scanlines">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6f5b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffc555]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#5dd28e]" />
            </div>
            <span className="label-mono">~ /shell · zsh</span>
          </div>
          <Terminal />
        </div>

        {/* now playing widget */}
        <div className="md:col-span-5">
          <SpotifyWidget />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="years coding" value="3+" />
            <Stat label="prod releases" value="∞" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-soft rounded-xl px-3 py-3">
      <div className="text-display text-2xl text-ink">{value}</div>
      <div className="label-mono mt-0.5">{label}</div>
    </div>
  );
}

function Sigil() {
  return (
    <div className="relative h-36 w-36 select-none">
      {/* outer rotating dashed ring */}
      <div
        className="absolute -inset-1 rounded-full border border-dashed border-[var(--color-line-strong)]"
        style={{ animation: "spin 24s linear infinite" }}
      />
      {/* warm coral glow halo */}
      <div className="absolute -inset-2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(216,133,106,0.35),transparent_65%)] blur-md" />
      {/* memoji disc */}
      <div className="absolute inset-0 overflow-hidden rounded-full border border-[var(--color-line-strong)] bg-[var(--color-bg-warm)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <Image
          src="/memoji.png"
          alt="Umut Kızıloğlu memoji"
          width={144}
          height={144}
          priority
          className="h-full w-full object-cover"
        />
      </div>
      {/* small status pip */}
      <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-[var(--color-bg)] bg-[var(--color-bg-soft)]">
        <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] accent-pulse" />
      </span>
    </div>
  );
}
