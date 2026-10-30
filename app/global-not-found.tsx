import type { Metadata } from "next";
import "./globals.css";
import { grotesk, mono } from "./fonts";
import en from "./lib/dictionaries/en";
import { siteConfig } from "./lib/site";
import tr from "./lib/dictionaries/tr";

// Unmatched URLs have no [lang] to read, so the 404 speaks both languages.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${en.notFound.title} / ${tr.notFound.title}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body>
        <main id="main" className="container grid gap-16 py-[var(--space-3xl)]">
          {[
            { lang: "en", dict: en },
            { lang: "tr", dict: tr },
          ].map(({ lang, dict }) => (
            <section key={lang} lang={lang} className="grid gap-6">
              {lang === "en" ? (
                <h1 className="text-[length:var(--text-display-s)]">{dict.notFound.title}</h1>
              ) : (
                <h2 className="text-[length:var(--text-display-s)]">{dict.notFound.title}</h2>
              )}
              <p>
                <a href={`/${lang}`}>{dict.notFound.back}</a>
              </p>
            </section>
          ))}
        </main>
      </body>
    </html>
  );
}
