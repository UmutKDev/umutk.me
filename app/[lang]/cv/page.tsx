import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/site";
import { experiences, skillGroups } from "@/app/lib/content";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = await getDictionary(lang);
  return buildMetadata({ lang, path: "/cv", ...meta.cv });
}

export default async function Cv({ params }: PageProps<"/[lang]/cv">) {
  const lang = (await params).lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <article className="container py-[var(--space-2xl)]">
      <h1>{siteConfig.name}</h1>
      <p className="mt-4 text-ink-2">
        {siteConfig.role}, {siteConfig.location}
      </p>
      <p className="mt-1">
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>

      <h2 className="mt-16">{dict.cv.experience}</h2>
      <ol className="mt-6 grid gap-10">
        {experiences.map((e) => (
          <li key={e.company}>
            <h3>
              {e.slug ? <Link href={`/${lang}/work/${e.slug}`}>{e.company}</Link> : e.company}
            </h3>
            <p className="text-ink-2">
              {e.role[lang]}, {e.location[lang]},{" "}
              <time dateTime={e.start} className="font-mono text-sm text-cool">
                {e.period[lang]}
              </time>
            </p>
            <ul className="mt-3 grid list-disc gap-2 pl-5">
              {e.bullets.map((b) => (
                <li key={b.en}>{b[lang]}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h2 className="mt-16">{dict.cv.skills}</h2>
      <dl className="mt-6 grid gap-6">
        {skillGroups.map((g) => (
          <div key={g.label.en}>
            <dt className="text-sm text-muted">{g.label[lang]}</dt>
            <dd>{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
