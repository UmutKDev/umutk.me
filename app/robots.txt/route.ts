import { siteConfig } from "@/app/lib/site";

// A route instead of robots.ts: MetadataRoute.Robots has no field for Content-Signal.
// Owner's call: search, AI answers and AI training are all welcome.
export const dynamic = "force-static";

export function GET() {
  return new Response(
    `User-Agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /
Disallow: /api/

Sitemap: ${siteConfig.url}/sitemap.xml
`,
    { headers: { "Content-Type": "text/plain" } },
  );
}
