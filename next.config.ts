import type { NextConfig } from "next";
import { locales, siteConfig } from "./app/lib/site";

const cvPdf = (lang: string) => `/cv/umut-kiziloglu-cv-${lang}.pdf`;
// Each CV PDF names its other-language twin, the HTTP form of hreflang.
const cvLink = locales.map((l) => `<${siteConfig.url}${cvPdf(l)}>; rel="alternate"; hreflang="${l}"`).join(", ");

const nextConfig: NextConfig = {
  experimental: {
    // the root layout lives under app/[lang], so unmatched URLs need their own 404
    globalNotFound: true,
  },
  async headers() {
    return locales.map((l) => ({ source: cvPdf(l), headers: [{ key: "Link", value: cvLink }] }));
  },
};

export default nextConfig;
