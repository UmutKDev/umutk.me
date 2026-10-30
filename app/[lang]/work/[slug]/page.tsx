import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, locales, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { experiences, projects } from "@/app/lib/content";

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

export default async function CaseStudy({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const dict = await getDictionary(lang);
  const i = projects.findIndex((p) => p.slug === slug);
  const project = projects[i];
  const next = projects[(i + 1) % projects.length];
  const role = experiences.find((e) => e.slug === slug)!; // every project has a matching experience

  return (
    <article className="container py-[var(--space-2xl)]">
      <h1>{project.name}</h1>
      <p className="mt-6 max-w-[52ch] text-[length:var(--text-lead)] text-ink-2">{project.blurb[lang]}</p>
      <dl className="mt-10 grid gap-4">
        <div>
          <dt className="text-sm text-muted">{dict.record.role}</dt>
          <dd>{role.role[lang]}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">{dict.record.period}</dt>
          <dd className="font-mono text-sm text-cool">{role.period[lang]}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">{dict.work.stack}</dt>
          <dd>{role.stack?.join(", ")}</dd>
        </div>
      </dl>
      <ul className="mt-10 grid list-disc gap-3 pl-5">
        {role.bullets.map((b) => (
          <li key={b.en}>{b[lang]}</li>
        ))}
      </ul>
      <p className="mt-16">
        {dict.work.next}: <Link href={`/${lang}/work/${next.slug}`}>{next.name}</Link>
      </p>
    </article>
  );
}
