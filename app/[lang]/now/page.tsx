import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { experiences } from "@/app/lib/content";

export async function generateMetadata({ params }: PageProps<"/[lang]/now">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = await getDictionary(lang);
  return buildMetadata({ lang, path: "/now", ...meta.now });
}

// The monthly list is still a content gap; only the current role is known.
export default async function Now({ params }: PageProps<"/[lang]/now">) {
  const lang = (await params).lang as Locale;
  const dict = await getDictionary(lang);
  const current = experiences[0];

  return (
    <article className="container py-[var(--space-2xl)]">
      <h1>{dict.now.title}</h1>
      <p className="mt-6">
        {dict.now.current}: {current.role[lang]},{" "}
        {current.slug ? (
          <Link href={`/${lang}/work/${current.slug}`}>{current.company}</Link>
        ) : (
          current.company
        )}
        ,{" "}
        <time dateTime={current.start} className="font-mono text-sm text-cool">
          {current.period[lang]}
        </time>
      </p>
      <p className="mt-6">
        <Link href={`/${lang}/uses`}>{dict.uses.title}</Link>
      </p>
    </article>
  );
}
