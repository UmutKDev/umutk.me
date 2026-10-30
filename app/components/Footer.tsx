import Image from "next/image";
import type { Dict } from "@/app/lib/dictionaries/en";
import type { Locale } from "@/app/lib/i18n";
import { contentUpdated, updatedOn } from "@/app/lib/content";
import { siteConfig } from "@/app/lib/site";
import memoji from "@/public/memoji.png";

// The letter close: a face, a line to write to, a signature with the date the record was last touched.
export function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  const date = updatedOn(lang);
  return (
    <footer id="contact" className="border-t border-rule bg-paper-3 py-[var(--section-gap-s)]">
      <div className="container grid grid-cols-12 items-start gap-x-[var(--gap-columns)] gap-y-[var(--space-lg)]">
        <Image
          src={memoji}
          alt={dict.close.memoji}
          sizes="160px"
          className="col-span-12 w-full max-w-24 rounded-card sm:col-span-3 sm:max-w-40 min-[60rem]:col-span-2"
        />
        <div className="col-span-12 grid gap-6 sm:col-span-9 min-[60rem]:col-span-7">
          <h2>{dict.close.title}</h2>
          <p className="text-[length:var(--text-lead)]">
            <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-accent">
              {siteConfig.email}
            </a>
          </p>
          <p className="text-muted">
            {dict.close.sign}, <time dateTime={contentUpdated}>{date}</time>
          </p>
        </div>
        <ul
          aria-label={dict.close.elsewhere}
          className="col-span-12 flex gap-6 min-[60rem]:col-span-2 min-[60rem]:col-start-11 min-[60rem]:grid min-[60rem]:gap-2"
        >
          {siteConfig.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} rel="me" className="text-ink-2 transition-colors hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
