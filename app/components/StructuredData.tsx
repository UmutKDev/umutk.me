import type { Locale } from "@/app/lib/i18n";
import { siteConfig } from "@/app/lib/site";

// Escape any closing </script> sequence so embedded JSON-LD can never break out.
// Static data in this component never contains it, but defense-in-depth is cheap.
function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function StructuredData({ lang }: { lang: Locale }) {
  const person = `${siteConfig.url}/#person`;
  const website = `${siteConfig.url}/#website`;
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
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        inLanguage: lang,
        isPartOf: { "@id": website },
        mainEntity: { "@id": person },
      },
    ],
  };

  return <script type="application/ld+json">{safeJson(graph)}</script>;
}
