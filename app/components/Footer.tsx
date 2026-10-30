import type { Dict } from "@/app/lib/dictionaries/en";
import { siteConfig } from "@/app/lib/site";

export function Footer({ dict }: { dict: Dict }) {
  return (
    <footer id="contact" className="border-t border-rule bg-paper-3 py-[var(--section-gap-s)]">
      <div className="container grid gap-6">
        <h2>{dict.close.title}</h2>
        <p className="text-[length:var(--text-lead)]">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
        <p className="text-muted">— {dict.close.sign}</p>
        <ul aria-label={dict.close.elsewhere} className="flex gap-6 text-sm">
          {siteConfig.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} rel="me" className="text-ink-2 hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
