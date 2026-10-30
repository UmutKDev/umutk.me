import type { Locale } from "@/app/lib/i18n";
import { siteConfig } from "@/app/lib/site";
import { contentUpdated } from "@/app/lib/content";

// Escape any closing </script> sequence so embedded JSON-LD can never break out.
// Static data in this component never contains it, but defense-in-depth is cheap.
function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const ids = { person: `${siteConfig.url}/#person`, website: `${siteConfig.url}/#website` };

// Home › … › page, from [name, locale-less path] pairs
export const breadcrumb = (lang: Locale, items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${siteConfig.url}/${lang}${path}`,
  })),
});

// A read page (/now, /uses): dated, about the person.
export const webPage = (lang: Locale, path: string, meta: { title: string; description: string }) => {
  const url = `${siteConfig.url}/${lang}${path}`;
  return {
    "@type": "WebPage",
    "@id": url,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: lang,
    dateModified: contentUpdated,
    about: { "@id": ids.person },
    isPartOf: { "@id": ids.website },
  };
};

// Person and WebSite on every page; `nodes` describe the page itself (home: the ProfilePage).
export function StructuredData({ lang, nodes }: { lang: Locale; nodes?: object[] }) {
  const { person, website } = ids;
  const pageUrl = `${siteConfig.url}/${lang}`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person,
        name: siteConfig.name,
        url: `${siteConfig.url}/en`,
        jobTitle: siteConfig.role,
        email: siteConfig.email,
        image: `${siteConfig.url}/memoji.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bursa",
          addressRegion: "Bursa",
          addressCountry: "TR",
        },
        worksFor: { "@type": "Organization", name: "ThinkCut" },
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "NestJS",
          "PostgreSQL",
          "Docker",
          "Tailwind CSS",
        ],
        sameAs: siteConfig.links.map((l) => l.href),
      },
      {
        "@type": "WebSite",
        "@id": website,
        name: siteConfig.name,
        url: `${siteConfig.url}/en`,
        description: siteConfig.description,
        inLanguage: ["en", "tr"],
        author: { "@id": person },
      },
      ...(nodes ?? [
        {
          "@type": "ProfilePage",
          "@id": `${pageUrl}#profile`,
          url: pageUrl,
          inLanguage: lang,
          isPartOf: { "@id": website },
          mainEntity: { "@id": person },
        },
      ]),
    ],
  };

  return <script type="application/ld+json">{safeJson(graph)}</script>;
}
