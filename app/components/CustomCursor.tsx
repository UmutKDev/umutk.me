"use client";

import { useEffect, useRef } from "react";

// A ring that trails the pointer. The native cursor always stays; the ring hides during keyboard use.
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    const mq = matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!el) return;
    const hide = () => delete el.dataset.on;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !mq.matches) return hide();
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      el.dataset.on = "";
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("keydown", hide);
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("keydown", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[600] -mt-4 -ml-4 size-8 rounded-full border border-ink-2/60 opacity-0 transition-opacity duration-150 data-on:opacity-100"
    />
  );
}
