import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { siteConfig } from "./site";
import { contentUpdated } from "./content";

const ogLocale = { en: "en_US", tr: "tr_TR" } as const;

// path is locale-less: "" for home, "/now", "/work/pick-a-seat".
// alt describes the share card; it defaults to the title, which fits home and the case studies.
export function buildMetadata({
  lang,
  path,
  title,
  description,
  alt = title,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  alt?: string;
}): Metadata {
  const url = `/${lang}${path}`;
  // Set here, not left to the opengraph-image files: a page's own openGraph drops the layout's file image,
  // and only config carries a localized alt. Case studies have their own card, the rest share home's.
  const card = path.startsWith("/work/") ? url : `/${lang}`;
  // ?v= busts social caches when content changes; the route itself ignores it.
  const images = [{ url: `${card}/opengraph-image?v=${contentUpdated}`, width: 1200, height: 630, type: "image/png", alt }];
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `/en${path}`, tr: `/tr${path}`, "x-default": `/en${path}` },
    },
    openGraph: {
      type: path.startsWith("/work/") ? "article" : "website",
      locale: ogLocale[lang],
      alternateLocale: ogLocale[lang === "en" ? "tr" : "en"],
      url,
      siteName: siteConfig.name,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.handles.x,
      creator: siteConfig.handles.x,
      images,
    },
  };
}
