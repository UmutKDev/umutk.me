import { locales, type Locale } from "@/app/lib/i18n";
import { siteConfig } from "@/app/lib/site";
import { experiences, projects } from "@/app/lib/content";
import { ogCard, ogSize } from "@/app/lib/og";

export const generateStaticParams = () => locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
export const dynamicParams = false;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug)!;
  const role = experiences.find((e) => e.slug === slug)!; // every project has a matching experience
  return ogCard({ top: role.period[lang], title: project.name, lines: [(role.stack ?? []).join(", ")], foot: siteConfig.name });
}
