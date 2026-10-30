import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/app/lib/i18n";
import { buildMetadata } from "@/app/lib/seo";
import { skillGroups } from "@/app/lib/content";

export async function generateMetadata({ params }: PageProps<"/[lang]/uses">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = await getDictionary(lang);
  return buildMetadata({ lang, path: "/uses", ...meta.uses });
}

// Hardware, editor and apps are still a content gap; only the stack is known.
export default async function Uses({ params }: PageProps<"/[lang]/uses">) {
  const lang = (await params).lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <article className="container py-[var(--space-2xl)]">
      <h1>{dict.uses.title}</h1>
      <h2 id="stack" className="mt-16">{dict.uses.stack}</h2>
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
