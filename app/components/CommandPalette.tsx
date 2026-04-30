"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/app/lib/data";

type Action = {
  id: string;
  label: string;
  hint?: string;
  group: "navigate" | "social" | "system";
  keywords?: string;
  perform: () => void | Promise<void>;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      close();
    },
    [close]
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      flash("email copied to clipboard");
    } catch {
      flash("clipboard blocked");
    }
    close();
  }, [close, flash]);

  const openExternal = useCallback(
    (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer");
      close();
    },
    [close]
  );

  const actions: Action[] = useMemo(
    () => [
      {
        id: "go-intro",
        label: "Go to Intro",
        hint: "↵",
        group: "navigate",
        keywords: "home top hero",
        perform: () => scrollTo("intro"),
      },
      {
        id: "go-about",
        label: "Go to About",
        hint: "↵",
        group: "navigate",
        keywords: "profile readme bio",
        perform: () => scrollTo("about"),
      },
      {
        id: "go-work",
        label: "Go to Work",
        hint: "↵",
        group: "navigate",
        keywords: "experience timeline jobs",
        perform: () => scrollTo("work"),
      },
      {
        id: "go-stack",
        label: "Go to Stack",
        hint: "↵",
        group: "navigate",
        keywords: "skills tech tools",
        perform: () => scrollTo("stack"),
      },
      {
        id: "go-projects",
        label: "Go to Projects",
        hint: "↵",
        group: "navigate",
        keywords: "work artifacts portfolio",
        perform: () => scrollTo("projects"),
      },
      {
        id: "go-contact",
        label: "Go to Contact",
        hint: "↵",
        group: "navigate",
        keywords: "email reach hire",
        perform: () => scrollTo("contact"),
      },
      {
        id: "copy-email",
        label: "Copy email",
        hint: siteConfig.email,
        group: "system",
        keywords: "mail address clipboard",
        perform: copyEmail,
      },
      {
        id: "send-email",
        label: "Send email",
        hint: "mailto",
        group: "social",
        keywords: "write contact",
        perform: () => {
          window.location.href = `mailto:${siteConfig.email}`;
          close();
        },
      },
      {
        id: "open-github",
        label: "Open GitHub",
        hint: "@" + siteConfig.handles.github,
        group: "social",
        keywords: "repo code source",
        perform: () => openExternal("https://github.com/" + siteConfig.handles.github),
      },
      {
        id: "open-linkedin",
        label: "Open LinkedIn",
        hint: "in/" + siteConfig.handles.linkedin,
        group: "social",
        keywords: "profile professional",
        perform: () => openExternal("https://linkedin.com/in/" + siteConfig.handles.linkedin),
      },
    ],
    [scrollTo, copyEmail, openExternal, close]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => {
      const hay = `${a.label} ${a.keywords ?? ""} ${a.hint ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, actions]);

  // global hotkey + programmatic toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isToggle = (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      if (isToggle) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (open && e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    const onToggle = () => setOpen((o) => !o);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk-toggle", onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk-toggle", onToggle);
    };
  }, [open, close]);

  // focus input + scroll lock on open
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // reset active when query changes
  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open && !toast) return null;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]"
          onClick={close}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-[rgba(5,4,2,0.7)] backdrop-blur-md" />

          <div
            className="glass-strong relative z-10 w-full max-w-xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="text-mono text-[var(--color-accent)] text-sm">
                ⌘K
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    filtered[active]?.perform();
                  }
                }}
                placeholder="Type a command or jump to a section…"
                className="text-mono w-full bg-transparent text-sm text-ink placeholder:text-ink-dim focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="label-mono shrink-0 hidden sm:inline">
                esc to close
              </span>
            </div>

            <ul className="max-h-[50vh] overflow-y-auto p-1.5">
              {filtered.length === 0 ? (
                <li className="px-3 py-6 text-center text-mono text-xs text-ink-dim">
                  no commands match &ldquo;{query}&rdquo;
                </li>
              ) : (
                filtered.map((action, i) => (
                  <li key={action.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => action.perform()}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors ${
                        active === i
                          ? "bg-[var(--color-accent)]/14 text-ink"
                          : "text-ink-soft hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <GroupGlyph group={action.group} active={active === i} />
                        <span className="text-sm">{action.label}</span>
                      </span>
                      {action.hint && (
                        <span className="text-mono text-[11px] text-ink-dim truncate max-w-[40%]">
                          {action.hint}
                        </span>
                      )}
                    </button>
                  </li>
                ))
              )}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-4 py-2">
              <div className="flex items-center gap-3 label-mono">
                <span><kbd className="rounded border border-line px-1.5 py-0.5 text-mono">↑↓</kbd> nav</span>
                <span><kbd className="rounded border border-line px-1.5 py-0.5 text-mono">↵</kbd> run</span>
              </div>
              <span className="label-mono">{filtered.length} commands</span>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-[110] -translate-x-1/2">
          <div className="glass-strong text-mono rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ink">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] align-middle" />
            {toast}
          </div>
        </div>
      )}
    </>
  );
}

function GroupGlyph({
  group,
  active,
}: {
  group: Action["group"];
  active: boolean;
}) {
  const color = active ? "text-[var(--color-accent)]" : "text-ink-dim";
  const glyph =
    group === "navigate" ? "→" : group === "social" ? "↗" : "·";
  return (
    <span className={`text-mono w-4 text-center ${color}`}>{glyph}</span>
  );
}
