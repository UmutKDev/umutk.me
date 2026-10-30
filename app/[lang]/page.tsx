import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Dict } from "@/app/lib/dictionaries/en";
import { getDictionary, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/site";
import { projects, versions, type Version } from "@/app/lib/content";
import { StructuredData } from "@/app/components/StructuredData";
import { RecordTabs } from "@/app/components/RecordTabs";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = await getDictionary(lang);
  return buildMetadata({ lang, path: "", ...meta.home });
}

const short = (company: string) => company.split(",")[0];
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

type Row = { kind: "chg" | "del" | "add" | ""; field: string; was?: string; now?: string; m?: boolean };

// One version of the record: what changed against the version it was compared with.
function Panel({ v, lang, dict }: { v: Version; lang: Locale; dict: Dict["record"] }) {
  const { exp, base } = v;
  const pair = (field: string, now: string, was?: string): Row => ({
    kind: was === undefined ? "add" : was === now ? "" : "chg",
    field,
    was,
    now,
  });
  const rows: Row[] = [
    pair(dict.company, exp.company, base?.exp.company),
    pair(dict.role, exp.role[lang], base?.exp.role[lang]),
    { ...pair(dict.period, exp.period[lang], base?.exp.period[lang]), m: true },
  ];
  const list = (s: string[]) => s.join(", ");
  if (v.kept.length) rows.push({ kind: "", field: dict.kept, was: list(v.kept), now: list(v.kept) });
  if (v.dropped.length) rows.push({ kind: "del", field: dict.dropped, was: list(v.dropped) });
  if (v.added.length) rows.push({ kind: "add", field: dict.added, now: list(v.added) });

  // red behind what went, green behind what came; an unchanged value is one cell
  const glyph = { chg: ["±", dict.changed], del: ["−", dict.removed], add: ["+", dict.new], "": null };
  const tag = (n: number) => <span className="m cool">v{n}</span>;
  const when = new Intl.DateTimeFormat(lang, { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(exp.start));
  let note: ReactNode = dict.first;
  if (base) note = <>{exp.branch ? dict.branchedFrom : dict.comparedWith} {tag(base.n)}</>;

  return (
    <article className="version">
      <header className="version__head">
        <h3>
          {tag(v.n)} {exp.company}
        </h3>
        <p>{note}</p>
      </header>
      <table className="diff">
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">{dict.change}</span></th>
            <th scope="col"><span className="sr-only">{dict.field}</span></th>
            <th scope="col">{base ? <>{tag(base.n)} {short(base.exp.company)}</> : dict.before}</th>
            <th scope="col">{tag(v.n)} {short(exp.company)}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const g = glyph[r.kind];
            const cls = (c: string) => [c, r.m ? "m" : ""].join(" ").trim() || undefined;
            return (
              <tr key={r.field} className={r.kind || undefined}>
                <td className="g">
                  {g && (
                    <>
                      <span aria-hidden>{g[0]}</span>
                      <span className="sr-only">{g[1]}</span>
                    </>
                  )}
                </td>
                <th scope="row">{r.field}</th>
                {r.kind ? (
                  <>
                    <td className={cls(r.kind === "add" ? "" : "was")}>{r.was}</td>
                    <td className={cls(r.kind === "del" ? "" : "now")}>{r.now}</td>
                  </>
                ) : (
                  <td colSpan={2} className={cls("")}>{r.now}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <dl className="sig">
        <div>
          <dt>{dict.who}</dt>
          <dd className="person">{siteConfig.name.split(" ")[0]}</dd>
        </div>
        <div>
          <dt>{dict.when}</dt>
          <dd className="m cool">
            <time dateTime={exp.start}>{when}</time>
          </dd>
        </div>
        <div className="sig__why">
          <dt>{dict.why}</dt>
          <dd>
            <q>{exp.bullets[0][lang]}</q>
          </dd>
        </div>
      </dl>
    </article>
  );
}
