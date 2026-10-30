import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/site";
import { experiences, projects } from "@/app/lib/content";
import { StructuredData } from "@/app/components/StructuredData";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = await getDictionary(lang);
  return buildMetadata({ lang, path: "", ...meta.home });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <StructuredData lang={lang} />
      <section className="container py-[var(--space-2xl)]">
        <h1>{dict.hero.title}</h1>
        <p className="mt-6 max-w-[52ch] text-[length:var(--text-lead)] text-ink-2">{dict.hero.sentence}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-12 items-center rounded-pill bg-accent px-6 font-medium text-accent-ink no-underline hover:bg-ink"
          >
            {dict.hero.contact}
          </a>
          <Link
            href={`/${lang}/cv`}
            className="inline-flex min-h-12 items-center rounded-pill border border-rule-2 bg-paper-2 px-6 font-medium no-underline hover:bg-rule"
          >
            {dict.hero.cv}
          </Link>
        </div>
        <p className="mt-10">{dict.hero.intro}</p>
      </section>

      <section id="work" aria-labelledby="work-title" className="container pb-[var(--section-gap)]">
        <h2 id="work-title">{dict.work.title}</h2>
        <ul className="mt-6 grid gap-4">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/${lang}/work/${p.slug}`}>
                {p.name}, {dict.work.caseStudy}
              </Link>
              <p className="text-ink-2">{p.blurb[lang]}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-16">{dict.record.title}</h2>
        <ol className="mt-6 grid gap-6">
          {experiences.map((e) => (
            <li key={e.company}>
              <h3>{e.company}</h3>
              <p className="text-ink-2">
                {e.role[lang]}, {e.location[lang]},{" "}
                <time dateTime={e.start} className="font-mono text-sm text-cool">
                  {e.period[lang]}
                </time>
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
