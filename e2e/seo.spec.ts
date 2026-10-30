import { expect, test } from "@playwright/test";
import { pages } from "./routes";

const endsWith = (path: string) => new RegExp(`^https?://[^/]+${path}$`);

for (const { lang, path, url } of pages) {
  test(`${url} answers 200 with lang, canonical and hreflang`, async ({ page }) => {
    const res = await page.goto(url);
    expect(res?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", endsWith(url));
    for (const [hreflang, target] of [["en", `/en${path}`], ["tr", `/tr${path}`], ["x-default", `/en${path}`]]) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)).toHaveAttribute("href", endsWith(target));
    }
  });
}

for (const [accept, lang] of [["tr-TR,tr;q=0.9,en;q=0.8", "tr"], ["en-US,en;q=0.9", "en"]]) {
  test(`/ redirects Accept-Language ${accept} to /${lang}`, async ({ request }) => {
    const res = await request.get("/", { headers: { "Accept-Language": accept }, maxRedirects: 0 });
    expect(res.status()).toBe(307);
    expect(new URL(res.headers().location, "http://x").pathname).toBe(`/${lang}`);
  });
}
