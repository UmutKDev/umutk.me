import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, locales, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/site";
import { projects, versions } from "@/app/lib/content";
import { StructuredData, breadcrumb, ids } from "@/app/components/StructuredData";
import { Panel } from "@/app/components/VersionPanel";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const { meta } = await getDictionary(lang);
  return buildMetadata({ lang, path: `/work/${slug}`, ...meta.work[slug] });
}

// Experience mode. Until the owner supplies decisions, the home page's version diff for this role
// stands in for the decision log (DESIGN.md Variants). A 1600 x 1000 product capture goes under it once one exists.
export default async function CaseStudy({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const dict = await getDictionary(lang);
  const i = projects.findIndex((p) => p.slug === slug);
  const project = projects[i];
  const next = projects[(i + 1) % projects.length];
  const v = versions().find((x) => x.exp.slug === slug)!; // every project has a matching experience
  const role = v.exp;
  const did = role.bullets.slice(1); // the first bullet is quoted as the diff's "why"
  const url = `${siteConfig.url}/${lang}/work/${slug}`;

  return (
    <>
      <StructuredData
        lang={lang}
        nodes={[
          {
            "@type": "CreativeWork",
            "@id": `${url}#work`,
            url,
            name: project.name,
            description: dict.meta.work[slug].description,
            author: { "@id": ids.person },
            dateCreated: role.start,
            keywords: role.stack,
            inLanguage: lang,
            isPartOf: { "@id": ids.website },
          },
          breadcrumb(lang, [
            [dict.nav.home, ""],
            [dict.nav.work, "#work"],
            [project.name, `/work/${slug}`],
          ]),
        ]}
      />
      <article className="container pt-[var(--space-xl)] pb-[var(--section-gap)]">
        <Link href={`/${lang}#work`} className="text-sm text-ink-2 transition-colors hover:text-accent">
          {dict.work.back}
        </Link>
        <h1 className="mt-[var(--space-lg)] max-w-[16ch]">{project.name}</h1>
        <p className="mt-6 max-w-[52ch] text-[length:var(--text-lead)] leading-[1.45] text-ink-2">{project.blurb[lang]}</p>

        <div className="mt-[var(--space-xl)]">
          <Panel v={v} lang={lang} dict={dict.record} head={<h2>{dict.work.changed}</h2>} />
        </div>

        {did.length > 0 && (
          <section
            aria-labelledby="did-title"
            className="mt-[var(--section-gap-s)] grid gap-x-[var(--gap-columns)] gap-y-[var(--space-lg)] min-[60rem]:grid-cols-12"
          >
            <h2 id="did-title" className="min-[60rem]:col-span-4">
              {dict.work.did}
            </h2>
            <ul className="border-b border-rule min-[60rem]:col-span-8">
              {did.map((b) => (
                <li key={b.en} className="border-t border-rule py-[var(--space-md)] text-[length:var(--text-lead)] leading-[1.45]">
                  {b[lang]}
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label={dict.work.next} className="mt-[var(--section-gap-s)] border-t border-rule pt-[var(--space-xl)]">
          <p className="text-sm text-muted">{dict.work.next}</p>
          <p className="mt-2 text-[length:var(--text-title)] font-medium leading-[1.2]">
            <Link href={`/${lang}/work/${next.slug}`} className="transition-colors hover:text-cool">
              {next.name}
            </Link>
          </p>
          <p className="mt-2 text-ink-2">{next.blurb[lang]}</p>
          <p className="mt-[var(--space-lg)]">
            <Link href={`/${lang}/cv`} className="text-ink-2 transition-colors hover:text-accent">
              {dict.work.cv}
            </Link>
          </p>
        </nav>
      </article>
    </>
  );
}
