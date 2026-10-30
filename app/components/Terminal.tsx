"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import type { Dict } from "@/app/lib/dictionaries/en";
import { projects, skillGroups, skillItems } from "@/app/lib/content";
import { locales, siteConfig, stripLocale, type Locale } from "@/app/lib/site";

type Entry = { cmd: string; out: string[] };

// A small shell over the site's own content. Output appears at once: no typing effect.
export function Terminal({ lang, dict }: { lang: Locale; dict: Dict["terminal"] }) {
  const rest = stripLocale(usePathname());
  const [log, setLog] = useState<Entry[]>([{ cmd: "help", out: [dict.help] }]);
  const [value, setValue] = useState("");
  const id = useId();
  const input = useRef<HTMLInputElement>(null);

  // the palette's "Open terminal" leaves a one-time marker; a plain visit to /now#shell does not pull focus
  useEffect(() => {
    try {
      if (!sessionStorage.getItem("focus-shell")) return;
      sessionStorage.removeItem("focus-shell");
    } catch {
      return;
    }
    const t = setTimeout(() => input.current?.focus());
    return () => clearTimeout(t);
  }, []);

  // null clears the log
  const run = (cmd: string, arg?: string): string[] | null => {
    switch (cmd) {
      case "help":
        return [dict.help];
      case "whoami":
        return [dict.whoami];
      case "work":
        return projects.map((p) => `${p.name}: /${lang}/work/${p.slug}`);
      case "stack":
        return skillGroups.map((g) => `${g.label[lang]}: ${skillItems(g, lang)}`);
      case "contact":
        return [siteConfig.email, ...siteConfig.links.map((l) => l.href)];
      case "lang":
        if (arg !== lang && locales.includes(arg as Locale)) location.assign(`/${arg}${rest}`);
        return [dict.lang];
      case "clear":
        return null;
      default:
        return [dict.unknown.replace("{cmd}", cmd)];
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const line = value.trim();
    setValue("");
    if (!line) return;
    const [cmd, arg] = line.split(/\s+/);
    const out = run(cmd.toLowerCase(), arg?.toLowerCase());
    setLog(out ? [...log, { cmd: line, out }] : []);
  };

  return (
    <div className="rounded-card border border-rule bg-paper-3 font-mono text-sm">
      <div role="log" aria-label={dict.output} className="grid gap-3 p-6 empty:p-0">
        {log.map((e, i) => (
          <div key={i}>
            <p className="text-ink">
              <span aria-hidden className="text-muted">$ </span>
              {e.cmd}
            </p>
            {e.out.map((line, j) => (
              <p key={j} className="text-ink-2">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex items-center gap-3 border-t border-rule py-2 pr-2 pl-6 first:border-t-0">
        <label htmlFor={id} className="text-muted">
          <span aria-hidden>$</span>
          <span className="sr-only">{dict.label}</span>
        </label>
        <input
          ref={input}
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          className="min-h-11 min-w-0 flex-1 rounded-none border-0 border-b border-muted bg-transparent px-1 text-ink"
        />
        <button
          type="submit"
          className="min-h-11 rounded-pill border border-rule-2 bg-paper-2 px-4 font-body transition-colors hover:bg-rule active:translate-y-px"
        >
          {dict.run}
        </button>
      </form>
    </div>
  );
}
