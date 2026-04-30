"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/app/lib/data";

export function Nav() {
  const [active, setActive] = useState<string>("intro");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#intro"
          className="group flex items-center gap-2 text-mono text-sm tracking-widest"
        >
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)] accent-pulse" />
          <span className="text-ink-soft">umutk</span>
          <span className="text-ink">/</span>
          <span className="text-ink">me</span>
        </a>

        <nav
          className={`glass-soft hidden md:flex items-center gap-1 rounded-full px-1.5 py-1.5 text-mono text-[11px] tracking-[0.18em] uppercase transition-all ${
            scrolled ? "scale-95" : "scale-100"
          }`}
        >
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative rounded-full px-3 py-1.5 transition-colors ${
                active === id
                  ? "text-[var(--color-bg)]"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {active === id && (
                <span className="absolute inset-0 rounded-full bg-[var(--color-accent)]" />
              )}
              <span className="relative">{label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("cmdk-toggle"))}
            aria-label="Open command palette"
            className="text-mono hidden md:inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-soft backdrop-blur-md transition hover:border-[var(--color-accent)]/50 hover:text-ink"
          >
            <kbd className="rounded border border-line bg-white/5 px-1 text-[10px] leading-none">⌘</kbd>
            <span>K</span>
          </button>
          <a
            href="#contact"
            className="text-mono group relative inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-ink backdrop-blur-md transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] accent-pulse" />
            <span>Available</span>
          </a>
        </div>
      </div>
    </header>
  );
}
