import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { siteConfig } from "./site";

// app/opengraph-image sits above the [lang] root layout, so it is not attached automatically.
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.role}` };

const ogLocale = { en: "en_US", tr: "tr_TR" } as const;

// path is locale-less: "" for home, "/now", "/work/pick-a-seat"
export function buildMetadata({
  lang,
  path,
  title,
  description,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `/${lang}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `/en${path}`, tr: `/tr${path}`, "x-default": `/en${path}` },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: ogLocale[lang === "en" ? "tr" : "en"],
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.handles.x,
      images: [ogImage],
    },
  };
}
