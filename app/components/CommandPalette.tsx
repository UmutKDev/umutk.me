"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Dict } from "@/app/lib/dictionaries/en";
import { locales, siteConfig, stripLocale, type Locale } from "@/app/lib/site";

type Props = { lang: Locale; dict: Pick<Dict, "nav" | "palette">; open: boolean; onClose: () => void };

const link = (label: string) => siteConfig.links.find((l) => l.label === label)!.href;

export default function CommandPalette({ lang, dict, open, onClose }: Props) {
  const router = useRouter();
  const rest = stripLocale(usePathname());
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const id = useId();

  useEffect(() => {
    const d = dialog.current;
    if (open && d && !d.open) {
      opener.current = document.activeElement as HTMLElement | null;
      d.showModal();
    }
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const other = locales.find((l) => l !== lang)!;
  const go = (href: string) => () => router.push(href);
  const visit = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
  const commands: { label: string; lang?: Locale; run: () => void }[] = [
    { label: dict.nav.home, run: go(`/${lang}`) },
    { label: dict.nav.work, run: go(`/${lang}#work`) },
    { label: dict.nav.now, run: go(`/${lang}/now`) },
    { label: dict.nav.uses, run: go(`/${lang}/uses`) },
    { label: dict.nav.cv, run: go(`/${lang}/cv`) },
    {
      label: dict.palette.terminal,
      run: () =>
        rest === "/now"
          ? setTimeout(() => document.querySelector<HTMLInputElement>("#shell input")?.focus()) // after the dialog hands focus back
          : (() => {
              try {
                sessionStorage.setItem("focus-shell", "1");
              } catch {}
              router.push(`/${lang}/now#shell`);
            })(),
    },
    { label: dict.palette.switchLang, lang: other, run: go(`/${other}${rest}`) },
    {
      label: dict.palette.copyEmail,
      run: () =>
        // navigator.clipboard is undefined outside a secure context; that throws before a promise exists
        Promise.resolve()
          .then(() => navigator.clipboard.writeText(siteConfig.email))
          .then(
          () => setToast(dict.palette.copied),
          () => setToast(dict.palette.blocked.replace("{email}", siteConfig.email)),
        ),
    },
    { label: dict.palette.github, run: visit(link("GitHub")) },
    { label: dict.palette.linkedin, run: visit(link("LinkedIn")) },
  ];
  const needle = query.trim().toLocaleLowerCase(lang);
  const results = commands.filter((c) => c.label.toLocaleLowerCase(lang).includes(needle));
  const current = Math.min(active, results.length - 1);

  useEffect(() => {
    document.getElementById(`${id}-${current}`)?.scrollIntoView({ block: "nearest" });
  }, [id, current]);

  const run = (i: number) => {
    const cmd = results[i];
    if (!cmd) return;
    dialog.current?.close(); // focus goes back to the opener before the command runs
    cmd.run();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    const step = { ArrowDown: 1, ArrowUp: -1 }[e.key];
    if (step && results.length) {
      e.preventDefault();
      setActive((current + step + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(current);
    }
  };

  return (
    <>
      <dialog
        ref={dialog}
        aria-label={dict.palette.title}
        onClose={() => {
          setQuery("");
          setActive(0);
          onClose();
          opener.current?.focus();
        }}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="mx-auto mt-[12vh] w-[min(36rem,calc(100%-2*var(--gutter)))] max-w-none rounded-card border border-rule-2 bg-paper-2 p-0 text-ink backdrop:bg-paper-3/80"
      >
        <input
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={`${id}-list`}
          aria-activedescendant={results.length ? `${id}-${current}` : undefined}
          aria-autocomplete="list"
          aria-label={dict.palette.placeholder}
          placeholder={dict.palette.placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKey}
          autoComplete="off"
          spellCheck={false}
          className="min-h-14 w-full rounded-t-card border-b border-rule bg-transparent px-5 text-ink placeholder:text-muted"
        />
        <ul role="listbox" id={`${id}-list`} aria-label={dict.palette.results} className="grid max-h-[50vh] gap-px overflow-y-auto p-2">
          {results.map((c, i) => (
            <li
              key={c.label}
              id={`${id}-${i}`}
              role="option"
              aria-selected={i === current}
              lang={c.lang}
              onClick={() => run(i)}
              onMouseMove={() => setActive(i)}
              className="cursor-pointer rounded-pill px-3 py-2.5 text-ink-2 aria-selected:bg-cool-soft aria-selected:text-ink"
            >
              {c.label}
            </li>
          ))}
        </ul>
        <p role="status" className="px-5 text-sm text-muted not-empty:pb-5">
          {results.length ? "" : dict.palette.empty.replace("{q}", query.trim())}
        </p>
        <div className="flex justify-end border-t border-rule p-2">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="min-h-11 rounded-pill px-4 text-sm text-ink-2 transition-colors hover:bg-rule hover:text-ink"
          >
            {dict.palette.close}
          </button>
        </div>
      </dialog>
      <p
        role="status"
        className="fixed bottom-6 left-1/2 z-[500] -translate-x-1/2 rounded-pill border border-rule-2 bg-paper-2 px-4 py-2 text-sm empty:border-0 empty:p-0"
      >
        {toast}
      </p>
    </>
  );
}
