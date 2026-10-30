# SEO Audit: umutk.me, M7 (SEO completion & QA)

- **Date:** 2026-10-30
- **Target:** local production build, `bun run build && bun run start -p 3710`, http://localhost:3710. Canonical and other absolute URLs point to `https://www.umutk.me` on purpose.
- **Method:** `claude-seo:seo-audit` run inline. I ran the hreflang, schema, sitemap and image checks by hand instead of calling the sub-skills. Evidence comes from `curl`, a Python HTML parse of all 12 HTML URLs, Lighthouse 13 (mobile, via the Chrome DevTools MCP) and a DevTools performance trace (412x823 DPR2, Slow 4G, 4x CPU).
- **Compared against:** `docs/seo/baseline/*` (M0, score ~58) and `docs/seo/SITE-STRUCTURE.md`.
- **Source state:** M7 working tree, not committed. No source files were changed by this audit.

## Executive summary

**SEO Health Score: ~85 / 100** (baseline ~58, +27)

Every Critical and High item from the baseline is closed. All 12 planned URLs exist and return 200. Each has a self-canonical on `https://www.umutk.me`, an hreflang triplet (en, tr, x-default), a localized title and description from the plan, OG and Twitter tags with a localized 1200x630 card, and JSON-LD linked by `@id`. The sitemap lists 12 URLs with alternates. robots.txt is clean and carries Content-Signal. `/llms.txt` exists. Lighthouse mobile scores on `/en`: SEO 100, Accessibility 100 (baseline 92), Best Practices 96, Agentic Browsing 100. Lab LCP is 1.0 s (baseline 4.9 s).

Nothing found blocks indexing or the commit. What remains is content depth and a few metadata details.

## Category scores

| Category | Weight | Baseline | M7 | Weighted |
|---|---|---|---|---|
| Technical SEO | 22% | 40 | 92 | 20.2 |
| Content Quality | 23% | 65 | 72 | 16.6 |
| On-Page SEO | 20% | 70 | 88 | 17.6 |
| Schema / Structured Data | 10% | 60 | 88 | 8.8 |
| Performance (CWV, lab) | 10% | 55 | 85 | 8.5 |
| AI Search Readiness | 10% | 60 | 88 | 8.8 |
| Images | 5% | 85 | 90 | 4.5 |
| **Total** | | **~58** | | **~85** |

The category scores are judgment calls based on the evidence below. Performance is from a localhost lab run only, with no CDN and no field data, so it is not directly comparable to the baseline's production trace.

## Baseline issues: status

| Baseline issue | Status in M7 |
|---|---|
| Critical: canonical, og:url, JSON-LD, robots and sitemap used the Vercel host | **Fixed.** `app/lib/site.ts:10` hard-codes `https://www.umutk.me` for `VERCEL_ENV=production`. Every absolute URL now uses www. |
| High: apex vs www ambiguity | **Decided in code (www).** The redirect itself is set in Vercel/Cloudflare and was not checked here. |
| High: mobile LCP 4.9 s | **Fixed in lab.** LCP 1,018 ms (TTFB 364, render delay 654). CLS 0.00. |
| Medium: robots `Host:` and `Disallow: /_next/` | **Fixed.** Both removed. |
| Medium: placeholder or boot text in the SSR HTML, messy H1 | **Fixed.** The H1 is clean text. No boot strings remain. |
| Medium: single page, no internal URLs | **Fixed.** 12 URLs. Each page links to every page in its own locale plus its counterpart in the other locale. |
| Medium: `/llms.txt` 404 | **Fixed.** 200, 953 bytes. |
| Medium: schema without `@id`, ProfilePage, worksFor or X sameAs | **Fixed.** Person `#person`, WebSite `#website`, ProfilePage (home), CreativeWork and BreadcrumbList (case studies), WebPage and BreadcrumbList (now/uses/cv). |
| a11y: contrast and `<ol>` list failures | **Fixed.** Lighthouse Accessibility is 100. |
| P1 (GEO): no Content-Signal | **Added:** `search=yes, ai-input=yes, ai-train=yes`. |

## Evidence

### Routes (curl)

```
/                          307 -> /en   (Accept-Language tr -> /tr, Vary: Accept-Language)
/en /tr                    200 text/html (SSG, x-nextjs-prerender: 1)
/{en,tr}/{now,uses,cv}     200
/{en,tr}/work/{pick-a-seat,thinkcut-hr-suite}   200
/en/                       308 -> /en
/en/work/nope              404
/{en,tr}/opengraph-image   200 image/png (49.6 / 50.7 KB)
/{en,tr}/work/*/opengraph-image  200 image/png (45-57 KB, 1200x630)
/opengraph-image           404 (old root card, no longer referenced)
/robots.txt                200 text/plain, s-maxage=31536000
/sitemap.xml               200, 12 <loc>, each with en/tr/x-default alternates
/llms.txt                  200
/manifest.webmanifest /favicon.ico /memoji.png   200
/cv/umut-kiziloglu-cv-{en,tr}.pdf                200 application/pdf
/.well-known/security.txt  404
```

### robots.txt

```
User-Agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /
Disallow: /api/

Sitemap: https://www.umutk.me/sitemap.xml
```

### Per-page head (all 12 pages)

- **Titles:** 20 to 56 characters. They match SITE-STRUCTURE §3 word for word, except `/now` (EN "Now — Umut Kızıloğlu", TR "Şimdi — Umut Kızıloğlu"; the plan had "Şu An").
- **Descriptions:** 74 to 148 characters, all unique. `/now` is shorter than planned, which is fine because it matches the page content.
- **Canonical:** self, absolute, www, no trailing slash. **hreflang:** en, tr and x-default (→ en), reciprocal on every page, and the same as in the sitemap. `<html lang>` is correct.
- **OG:** `og:locale` and `og:locale:alternate` are correct. `og:image` is the locale card with width, height and alt. `twitter:card=summary_large_image`, with `twitter:image` and alt.
- **H1:** one per page.
- **Words** (visible, approximate): home 462/453, cv 367/372, case studies 179 to 185, uses 133/134, now 64/69.
- **Images:** 1 `<img>` per page, all with alt.
- **Language switch:** `<a hreflang lang>` points to the equivalent page. The accessible name now contains "EN" or "TR".

### Lighthouse (mobile, /en)

Accessibility 100 · Best Practices 96 · SEO 100 · Agentic Browsing 100. The only failure is `errors-in-console`, from a 404 on `/_vercel/insights/script.js`. That script is served only on Vercel, so the failure is expected locally.

### Performance trace (mobile, Slow 4G, 4x CPU, localhost)

LCP 1,018 ms (TTFB 364 ms + render delay 654 ms), CLS 0.00. The trace reported three insights: RenderBlocking (est. savings 0 ms), NetworkDependencyTree, and LegacyJavaScript (14.4 kB of polyfills; baseline 25.1 kB). No CrUX data.

## Findings (most severe first)

1. **NICE · Content** · `/en/now`, `/tr/now`: about 65 words of visible copy. This is thin for an indexable page and gives AI systems little to cite. **Fix:** add 2 to 4 dated short paragraphs (what you are building, learning and reading) and keep `contentUpdated` honest. Alternative: `noindex` until there is real content.
2. **NICE · On-page** · `/en`, `/tr` H1 is "Full-stack work, kept as a record." / "Full-stack işler, kayıt altında." The primary query (the name) is only in the title and the nav logo. **Fix:** keep the design line and add the name to the H1, for example a visually small "Umut Kızıloğlu —" prefix inside the same `<h1>`. Or accept this as a design choice, since the title, the ProfilePage schema and `/cv`'s H1 carry the name.
3. **NICE · Schema** · `app/[lang]/work/[slug]/page.tsx:56`: breadcrumb item 2 is `https://www.umutk.me/{lang}#work`, a fragment of item 1's URL. Google may ignore or merge the level. **Fix:** drop the "Work" level (Home › Project), or keep it without an `item`. A `ListItem` may omit `item` only in last position, so dropping the level is the clean option.
4. **NICE · Images / OG** · On `/tr/work/thinkcut-hr-suite` the card shows "ThinkCut HR Suite", but `og:image:alt` reads "ThinkCut İK Yazılımı Vaka Çalışması — Umut Kızıloğlu". The alt does not match the visible text. Also, on `/now`, `/uses` and `/cv` the alt is the home title, which describes the shared card accurately. **Fix:** render the TR card title from the same localized title string, or set the alt to the project name for case studies.
5. **NICE · On-page** · `app/lib/seo.ts:35`: `og:type` is `website` on the case studies. **Fix:** use `article` for `/work/*` (no other fields are needed). This is cosmetic for most platforms.
6. **NICE · Social** · `app/lib/seo.ts:26`: OG image URLs have no version query, and `og:image:type` and `twitter:site` are missing. Platforms that cached the old root card will keep showing it. **Fix:** append `?v=<contentUpdated>` to the card URL, add `type: "image/png"`, and add `site: siteConfig.handles.x`. After deploy, re-scrape with the LinkedIn Post Inspector and the X card validator.
7. **NICE · Docs** · `docs/seo/SITE-STRUCTURE.md:15,24,120,156,160` still says robots lives in `app/robots.ts`, uses the apex `https://umutk.me` (including the Person `@id`), and lists the `/_next/` disallow as current. **Fix:** update these to `app/robots.txt/route.ts`, `https://www.umutk.me` and `https://www.umutk.me/#person`, and note Content-Signal.
8. **NICE · Config hygiene** · `proxy.ts:18`: the matcher still excludes `opengraph-image`. Only the root path matched it, and that route is gone. **Fix:** remove `opengraph-image|` from the lookahead. Locale card routes start with `/en` or `/tr` and already return early.
9. **NICE · Policy** · `app/robots.txt/route.ts:10`: `ai-train=yes` is a policy choice. The code comment says it is the owner's call; the baseline (`geo-agentic.md` P1) asked for an explicit owner decision. **Fix:** confirm with the owner before the merge. No code change is needed if confirmed.
10. **NICE · Schema** · Home has `ProfilePage`. `/cv` uses `WebPage`, while the plan (§4) put `ProfilePage` on `/cv`. Either choice is valid; home as the profile is arguably better. **Fix:** update §4 of the plan to match, so the plan and code agree.
11. **NICE · Content** · The ASCII alias "Umut Kiziloglu" appears only in PDF filenames and URLs, not in visible copy (plan §7 item 4). **Fix:** add it once in visible text on `/cv`, for example "Umut Kızıloğlu (Umut Kiziloglu)" in the PDF link label, or add `alternateName` to the Person JSON-LD (no visible change).
12. **NICE · Content** · `/en/uses`, `/tr/uses` have no internal links to the case studies (plan §5 says /uses should link to where each tool was used) and no H2 sections. **Fix:** group the tools under H2s and link Next.js, NestJS and PostgreSQL to the matching case study.
13. **NICE · Technical** · `/.well-known/security.txt` returns 404. This is optional.

**MUST items: none.** Nothing found blocks indexing, causes duplicate-content signals or breaks hreflang.

## Post-deploy checks (not possible locally)

- Confirm that production renders canonical and og URLs on `https://www.umutk.me` (the `VERCEL_ENV=production` branch), and that apex and http each reach www in 1 hop.
- Submit `https://www.umutk.me/sitemap.xml` in GSC. Inspect `/en` and `/tr`, and check the hreflang report after re-crawl.
- Run the Rich Results Test on `/en` (ProfilePage) and on one case study (Breadcrumb).
- Compare CrUX and Vercel Speed Insights field LCP after 28 days.

---
Not covered: Rich Results Test, field CWV, GSC/backlinks/DataForSEO, the production redirect chain, and Lighthouse on pages other than `/en`. The claude-seo helper scripts (`render_page.py` etc.) were not run, and checks were done by hand with curl and Python.
