import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { skillGroups, skillItems } from "@/app/lib/content";
import { StructuredData, breadcrumb, webPage } from "@/app/components/StructuredData";
import { Updated } from "@/app/components/Updated";

export async function generateMetadata({ params }: PageProps<"/[lang]/uses">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = await getDictionary(lang);
  return buildMetadata({ lang, path: "/uses", ...meta.uses, alt: meta.home.title });
}

// Hardware, editor and apps are still a content gap; only the stack is known.
export default async function Uses({ params }: PageProps<"/[lang]/uses">) {
  const lang = (await params).lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <StructuredData
        lang={lang}
        nodes={[
          webPage(lang, "/uses", dict.meta.uses),
          breadcrumb(lang, [
            [dict.nav.home, ""],
            [dict.uses.title, "/uses"],
          ]),
        ]}
      />
      <article className="container pt-[var(--space-2xl)] pb-[var(--section-gap)]">
        <h1>{dict.uses.title}</h1>
        <Updated lang={lang} text={dict.updated} />
        <dl id="stack" className="rows mt-[var(--space-xl)] border-b border-rule">
          {skillGroups.map((g) => (
            <div key={g.label.en}>
              <dt>{g.label[lang]}</dt>
              <dd>{skillItems(g, lang)}</dd>
            </div>
          ))}
        </dl>
      </article>
    </>
  );
}
