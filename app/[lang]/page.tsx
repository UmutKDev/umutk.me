import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/site";
import { projects, versions } from "@/app/lib/content";
import { StructuredData } from "@/app/components/StructuredData";
import { RecordTabs } from "@/app/components/RecordTabs";
import { Panel, short } from "@/app/components/VersionPanel";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = await getDictionary(lang);
  return buildMetadata({ lang, path: "", ...meta.home });
}

const btn =
  "inline-flex min-h-12 items-center rounded-pill border px-6 font-medium no-underline whitespace-nowrap transition-colors active:translate-y-px";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const dict = await getDictionary(lang);
  const record = versions();

  return (
    <>
      <StructuredData lang={lang} />
      <section aria-labelledby="hero-title" className="pt-[var(--space-2xl)] pb-[var(--space-xl)] sm:pb-[var(--space-3xl)]">
        <div className="container grid grid-cols-12 items-end gap-x-[var(--gap-columns)] gap-y-[var(--space-lg)]">
          <h1 id="hero-title" className="col-span-12 max-w-[16ch] min-[60rem]:col-span-8">
            {dict.hero.title}
          </h1>
          <div className="col-span-12 grid gap-6 min-[60rem]:col-span-4 min-[60rem]:col-start-9">
            <p className="text-[length:var(--text-lead)] leading-[1.45] text-ink-2">{dict.hero.sentence}</p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${siteConfig.email}`} className={`${btn} border-accent bg-accent text-accent-ink hover:border-ink hover:bg-ink`}>
                {dict.hero.contact}
              </a>
              <Link href={`/${lang}/cv`} className={`${btn} border-rule-2 bg-paper-2 hover:bg-rule`}>
                {dict.hero.cv}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="record-title" className="container pb-[var(--section-gap-l)]">
        <RecordTabs
          label={dict.record.versions}
          heading={<h2 id="record-title">{dict.record.title}</h2>}
          items={record.map((v) => ({ id: `v${v.n}`, label: `v${v.n} ${short(v.exp.company)}` }))}
        >
          {record.map((v) => (
            <Panel key={v.n} v={v} lang={lang} dict={dict.record} />
          ))}
        </RecordTabs>
      </section>

      <section id="work" aria-labelledby="work-title" className="container pb-[var(--section-gap-l)]">
        <h2 id="work-title">{dict.work.title}</h2>
        <ul className="mt-[var(--space-xl)] border-t border-rule">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="grid gap-x-[var(--gap-columns)] gap-y-2 border-b border-rule py-[var(--space-xl)] min-[60rem]:grid-cols-12 min-[60rem]:items-baseline"
            >
              <h3 className="min-[60rem]:col-span-4">
                <Link href={`/${lang}/work/${p.slug}`} className="transition-colors hover:text-cool">
                  {p.name}
                </Link>
              </h3>
              <p className="text-[length:var(--text-lead)] leading-[1.45] text-ink-2 min-[60rem]:col-span-8">{p.blurb[lang]}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container pt-[var(--space-2xl)] pb-[var(--section-gap)]">
        <p className="max-w-[62ch] text-[length:var(--text-lead)] leading-[1.55] text-ink-2">{dict.hero.intro}</p>
      </section>
    </>
  );
}
