// Prints /en/cv and /tr/cv to public/cv/umut-kiziloglu-cv-{en,tr}.pdf against a running server:
//   bun run build && bun run start -p 3600 &   then   BASE_URL=http://localhost:3600 bun run cv:pdf
// Re-run after every content change: the PDF carries the build's "Updated" date.
// Uses the installed Edge (PDF_CHANNEL=chrome for Chrome); no `playwright install` needed.
import { chromium } from "@playwright/test";
import { locales, siteConfig } from "../app/lib/site";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({ channel: process.env.PDF_CHANNEL ?? "msedge" });
try {
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });
  for (const lang of locales) {
    const res = await page.goto(`${base}/${lang}/cv`, { waitUntil: "networkidle" });
    if (!res?.ok()) throw new Error(`${base}/${lang}/cv answered ${res?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    // relative links would print as BASE_URL (localhost); point them at the live site
    await page.evaluate((o) => document.querySelectorAll("a[href^='/']").forEach((a) => a.setAttribute("href", o + a.getAttribute("href"))), siteConfig.url);
    const path = `public/cv/umut-kiziloglu-cv-${lang}.pdf`;
    await page.pdf({ path, format: "A4", printBackground: false, preferCSSPageSize: true });
    console.log(`wrote ${path}`);
  }
} finally {
  await browser.close();
}
