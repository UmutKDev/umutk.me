"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ label, links }: { label: string; links: { href: string; label: string }[] }) {
  const path = usePathname();
  return (
    <nav aria-label={label} className="ml-auto flex flex-wrap gap-x-6 gap-y-1 text-sm max-sm:order-last max-sm:ml-0 max-sm:w-full">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          aria-current={l.href === path ? "page" : undefined}
          className="text-ink-2 transition-colors hover:text-accent aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-cool aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
