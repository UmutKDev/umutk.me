"use client";

import { Children, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";

const subscribe = () => () => {};

// The panels are server-rendered; this only picks which one shows.
export function RecordTabs({
  label,
  heading,
  items,
  children,
}: {
  label: string;
  heading: ReactNode;
  items: { id: string; label: string }[]; // newest first, same order as children
  children: ReactNode;
}) {
  // false in the server HTML: without JS every panel shows, stacked newest first, and CSS hides the picker
  const live = useSyncExternalStore(subscribe, () => true, () => false);
  const [selected, setSelected] = useState(items[0].id);
  const tabs = [...items].reverse();
  const panels = Children.toArray(children);

  const onKey = (e: KeyboardEvent, i: number) => {
    const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const tab = tabs[(to + tabs.length) % tabs.length];
    setSelected(tab.id);
    document.getElementById(`tab-${tab.id}`)?.focus();
  };

  return (
    <>
      <div className="record-head">
        {heading}
        <div role="tablist" aria-label={label} className="versions">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-controls={t.id}
              aria-selected={t.id === selected}
              tabIndex={t.id === selected ? 0 : -1}
              onClick={() => setSelected(t.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="record" data-live={live || undefined}>
        {panels.map((panel, i) => {
          const id = items[i].id;
          return (
            <div
              key={id}
              id={id}
              role={live ? "tabpanel" : undefined}
              aria-labelledby={live ? `tab-${id}` : undefined}
              tabIndex={live ? 0 : undefined}
              hidden={live && id !== selected}
              className="rounded-card"
            >
              {panel}
            </div>
          );
        })}
      </div>
    </>
  );
}
