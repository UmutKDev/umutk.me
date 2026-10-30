"use client";

import { usePathname } from "next/navigation";
import { locales } from "@/app/lib/site";

const names = { en: "English", tr: "Türkçe" };

// Links to the same page in each locale; the path after /{lang} is kept.
export function LangSwitch({ lang, label }: { lang: string; label: string }) {
  const rest = usePathname().replace(/^\/[^/]+/, "");
  return (
    <div role="group" aria-label={label} className="flex rounded-pill border border-rule-2 text-sm">
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          lang={l}
          aria-label={names[l]}
          aria-current={l === lang ? "page" : undefined}
          className="inline-flex min-h-11 items-center px-3 text-ink-2 no-underline first:rounded-l-pill last:rounded-r-pill hover:text-accent aria-[current=page]:bg-paper-2 aria-[current=page]:text-cool aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
        >
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
