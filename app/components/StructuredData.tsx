import { siteConfig } from "@/app/lib/data";

// Escape any closing </script> sequence so embedded JSON-LD can never break out.
// Static data in this component never contains it, but defense-in-depth is cheap.
function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    email: siteConfig.email,
    image: `${siteConfig.url}/memoji.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bursa",
      addressRegion: "Bursa",
      addressCountry: "TR",
    },
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
    sameAs: [
      `https://github.com/${siteConfig.handles.github}`,
      `https://linkedin.com/in/${siteConfig.handles.linkedin}`,
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <script type="application/ld+json">{safeJson(person)}</script>
      <script type="application/ld+json">{safeJson(website)}</script>
    </>
  );
}
