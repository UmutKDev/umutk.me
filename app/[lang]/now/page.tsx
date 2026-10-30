import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { experiences } from "@/app/lib/content";
import { StructuredData, breadcrumb, webPage } from "@/app/components/StructuredData";
import { SpotifyWidget } from "@/app/components/SpotifyWidget";
import { Terminal } from "@/app/components/Terminal";
import { Updated } from "@/app/components/Updated";

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
  const link = "transition-colors hover:text-cool";

  return (
    <>
      <StructuredData
        lang={lang}
        nodes={[
          webPage(lang, "/now", dict.meta.now),
          breadcrumb(lang, [
            [dict.nav.home, ""],
            [dict.now.title, "/now"],
          ]),
        ]}
      />
      <article className="container pt-[var(--space-2xl)] pb-[var(--section-gap)]">
        <h1>{dict.now.title}</h1>
        <Updated lang={lang} text={dict.updated} />

        <div className="mt-[var(--space-xl)] border-b border-rule">
          <dl className="rows">
            <div>
              <dt>{dict.now.current}</dt>
              <dd>
                {current.role[lang]},{" "}
                {current.slug ? (
                  <Link href={`/${lang}/work/${current.slug}`} className={link}>
                    {current.company}
                  </Link>
                ) : (
                  current.company
                )}
                , <span className="m cool">{current.period[lang]}</span>
              </dd>
            </div>
            <div>
              <dt>{dict.now.uses}</dt>
              <dd>
                <Link href={`/${lang}/uses`} className={link}>
                  {dict.now.usesLink}
                </Link>
              </dd>
            </div>
          </dl>
          <SpotifyWidget dict={dict.spotify} />
        </div>

        <section id="shell" aria-labelledby="shell-title" className="mt-[var(--space-xl)] grid gap-[var(--space-lg)]">
          <h2 id="shell-title">{dict.now.shell}</h2>
          <Terminal lang={lang} dict={dict.terminal} />
        </section>
      </article>
    </>
  );
}
