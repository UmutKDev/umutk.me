"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { Dict } from "@/app/lib/dictionaries/en";
import type { Locale } from "@/app/lib/site";
// Imported statically: the dialog is ~1.5 KB gzipped, and a lazy chunk dropped the keys typed right after ⌘K.
import CommandPalette from "./CommandPalette";

const subscribe = () => () => {};
const shortcut = () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘ K" : "Ctrl K");

export function SearchPill({ lang, dict }: { lang: Locale; dict: Pick<Dict, "nav" | "palette"> }) {
  const [state, setState] = useState<"idle" | "open" | "closed">("idle");
  // null in the server HTML: the pill stays invisible until it can open something
  const keys = useSyncExternalStore(subscribe, shortcut, () => null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing || e.altKey || e.shiftKey || e.key.toLowerCase() !== "k") return;
      // Ctrl+K in a text field is the readline "delete to end of line"; ⌘K stays global
      const inField = (e.target as HTMLElement).closest?.("input, textarea, [contenteditable]");
      if (!e.metaKey && !(e.ctrlKey && !inField)) return;
      e.preventDefault();
      setState("open");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setState("open")}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        className={`inline-flex min-h-11 items-center justify-between gap-6 rounded-pill border border-rule-2 bg-paper-3 px-4 text-sm text-muted transition-colors hover:border-muted hover:text-ink-2 active:translate-y-px max-sm:ml-auto max-sm:gap-0 min-[60rem]:min-w-72 ${keys ? "" : "invisible"}`}
      >
        <span>{dict.nav.search}</span>
        <kbd aria-hidden className="font-[inherit] text-ink-2 max-sm:hidden">
          {keys?.replace(" ", " ")}
        </kbd>
      </button>
      {state !== "idle" && (
        <CommandPalette lang={lang} dict={dict} open={state === "open"} onClose={() => setState("closed")} />
      )}
    </>
  );
}
