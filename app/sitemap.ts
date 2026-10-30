import type { MetadataRoute } from "next";
import { locales, siteConfig } from "@/app/lib/site";
import { contentUpdated, projects } from "@/app/lib/content";

const paths = ["", "/now", "/uses", "/cv", ...projects.map((p) => `/work/${p.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const languages = {
      en: `${siteConfig.url}/en${path}`,
      tr: `${siteConfig.url}/tr${path}`,
      "x-default": `${siteConfig.url}/en${path}`,
    };
    return locales.map((lang) => ({
      url: languages[lang],
      lastModified: contentUpdated,
      alternates: { languages },
    }));
  });
}
