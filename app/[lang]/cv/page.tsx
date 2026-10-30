import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/site";
import { experiences, skillGroups, skillItems } from "@/app/lib/content";
import { StructuredData, breadcrumb, webPage } from "@/app/components/StructuredData";
import { Updated } from "@/app/components/Updated";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = await getDictionary(lang);
  return buildMetadata({ lang, path: "/cv", ...meta.cv });
}

const link = "transition-colors hover:text-cool";

// Education and languages are still a content gap; the CV shows only what the record holds.
// Known exception: sloplint 58 (80 words a screen) fails on /cv by design; the record text is the owner's and is not cut to fit.
export default async function Cv({ params }: PageProps<"/[lang]/cv">) {
  const lang = (await params).lang as Locale;
  const dict = await getDictionary(lang);
  const [github, linkedin] = siteConfig.links;

  return (
    <>
      <StructuredData
        lang={lang}
        nodes={[
          webPage(lang, "/cv", dict.meta.cv),
          breadcrumb(lang, [
            [dict.nav.home, ""],
            [dict.nav.cv, "/cv"],
          ]),
        ]}
      />
      <article className="cv container pt-[var(--space-2xl)] pb-[var(--section-gap)]">
        <header className="grid grid-cols-12 items-end gap-x-[var(--gap-columns)] gap-y-[var(--space-lg)]">
          <div className="col-span-12 min-[60rem]:col-span-8">
            <h1>{siteConfig.name}</h1>
            <p className="mt-4 text-[length:var(--text-lead)] text-ink-2">
              {siteConfig.role}, {dict.cv.location}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href={`mailto:${siteConfig.email}`} className={link}>
                  {siteConfig.email}
                </a>
              </li>
              {[github, linkedin].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={link}>
                    {/* on paper all three contact links print as their address, like the email */}
                    <span className="print:hidden">{l.label}</span>
                    <span className="hidden print:inline">{l.href.replace("https://", "")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="cv-download col-span-12 min-[60rem]:col-span-4 min-[60rem]:justify-self-end">
            <a
              href={`/cv/umut-kiziloglu-cv-${lang}.pdf`}
              download
              type="application/pdf"
              hrefLang={lang}
              className="inline-flex min-h-12 items-center rounded-pill border border-accent bg-accent px-6 font-medium whitespace-nowrap text-accent-ink no-underline transition-colors hover:border-ink hover:bg-ink active:translate-y-px"
            >
              {dict.cv.pdf}
            </a>
          </div>
        </header>
        <Updated lang={lang} text={dict.updated} />

        <section aria-labelledby="summary" className="mt-[var(--section-gap-s)]">
          <h2 id="summary">{dict.cv.summary}</h2>
          <p className="mt-[var(--space-lg)] text-ink-2">{dict.cv.summaryText}</p>
        </section>

        <section aria-labelledby="experience" className="mt-[var(--section-gap-s)]">
          <h2 id="experience">{dict.cv.experience}</h2>
          <ol className="mt-[var(--space-lg)] border-b border-rule">
            {experiences.map((e) => (
              <li
                key={e.company}
                className="cv-entry grid gap-x-[var(--gap-columns)] gap-y-[var(--space-xs)] border-t border-rule py-[var(--space-lg)] min-[60rem]:grid-cols-12"
              >
                <p className="text-sm text-muted min-[60rem]:col-span-4">
                  <span className="m cool">{e.period[lang]}</span>
                  <br />
                  {e.location[lang]}
                </p>
                <div className="min-[60rem]:col-span-8">
                  <h3>
                    {e.slug ? (
                      <Link href={`/${lang}/work/${e.slug}`} className={link}>
                        {e.company}
                      </Link>
                    ) : (
                      e.company
                    )}
                  </h3>
                  <p className="mt-1 text-ink-2">{e.role[lang]}</p>
                  <ul className="mt-3 grid list-disc gap-2 pl-5 text-ink-2">
                    {e.bullets.map((b) => (
                      <li key={b.en}>{b[lang]}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="skills" className="mt-[var(--section-gap-s)]">
          <h2 id="skills">{dict.cv.skills}</h2>
          {/* same markup as /uses */}
          <dl className="rows mt-[var(--space-lg)] border-b border-rule">
            {skillGroups.map((g) => (
              <div key={g.label.en}>
                <dt>{g.label[lang]}</dt>
                <dd>{skillItems(g, lang)}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </>
  );
}
