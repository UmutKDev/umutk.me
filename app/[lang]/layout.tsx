import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { grotesk, mono } from "@/app/fonts";
import { getDictionary, hasLocale, locales } from "@/app/lib/i18n";
import { siteConfig } from "@/app/lib/site";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1013", // --color-paper
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${grotesk.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">
          {dict.skip}
        </a>
        <Nav lang={lang} dict={dict} />
        <main id="main">{children}</main>
        <Footer dict={dict} />
        <Analytics />
      </body>
    </html>
  );
}
