import { getDictionary, locales, type Locale } from "@/app/lib/i18n";
import { siteConfig } from "@/app/lib/site";
import { ogCard, ogSize } from "@/app/lib/og";

// Route handlers don't inherit the layout's params, so the image lists its own to stay static.
export const generateStaticParams = () => locales.map((lang) => ({ lang }));
export const dynamicParams = false;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const { hero, role } = await getDictionary(lang);
  return ogCard({ top: "Bursa, Türkiye", title: siteConfig.name, lines: [role, hero.sentence], foot: "" });
}
