# SEO Baseline Audit: umutk.me (M0)

- **Date:** 2026-10-30
- **Target:** https://umutk.me (serves from `https://www.umutk.me/` after redirect)
- **Method:** `claude-seo:seo-audit` skill, run inline (no subagents). The skill's Python runtime was not ready (`claude-seo run ...` printed "Claude SEO runtime is not ready. Run /seo setup"), so `render_page.py`, `google_auth.py --check`, `backlinks_auth.py --check` and `drift_history.py` could not run. Evidence below comes from `curl`, a Python HTML parse of the raw HTML, Lighthouse 13.4.1 (via the Chrome DevTools MCP) and a DevTools performance trace.
- **Scope:** one indexable URL. The site is a single-page portfolio and the sitemap lists only one URL, so the 500-page crawl came down to the homepage plus its support files.
- **Source state:** repo HEAD `d7fa413` (2026-04-30). No source files were changed.

## Executive summary

**SEO Health Score: 58 / 100**

**Business type:** personal portfolio / professional profile (individual full-stack developer, Bursa, TR). This is not a local business or e-commerce site, so the seo-local, seo-maps and seo-ecommerce checks do not apply.

The page itself is in good shape: Lighthouse SEO scores 100, it has a single H1, it has Person and WebSite JSON-LD, and it is server-rendered with about 680 words of real content. The problem is the absolute URLs. **The canonical, `og:url`, `og:image`, JSON-LD `url`, robots.txt `Host`/`Sitemap` and the sitemap `<loc>` all point to a Vercel deployment hostname (`https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app`) and not to `umutk.me`.** That one defect tells search engines that the real site is a non-canonical duplicate.

### Top 5 critical / high issues
1. **Critical:** `<link rel="canonical">` points to the Vercel deployment host and not to `https://www.umutk.me/`.
2. **Critical:** the sitemap and robots.txt advertise the Vercel host, so the production domain has no valid sitemap entry.
3. **High:** the Open Graph and Twitter image URLs and the JSON-LD `url`/`image` all use the Vercel host. Social cards and entity data depend on a deployment-specific URL that can disappear.
4. **High:** mobile lab LCP is 4.9 s (Slow 4G, 4x CPU). 4.84 s of that is render delay; TTFB is only 94 ms.
5. **High:** the apex domain redirects to `www` (308), while project metadata intends the apex. The host choice needs to be settled. `http://umutk.me` takes 2 hops (301 to https apex, then 308 to www).

### Top 5 quick wins
1. Set `SITE_URL=https://www.umutk.me` (or the chosen canonical host) in the Vercel Production env. `app/lib/data.ts` falls back to `VERCEL_URL` when `SITE_URL` is unset, and that fallback is the root cause of issues 1 to 3.
2. Pick one canonical host (apex or www) and make the redirect, canonical and sitemap agree.
3. Add `/llms.txt` (currently 404). The plan allows all AI crawlers.
4. Fix the color-contrast failure on `.text-ink-dim` text and the invalid `<ol class="relative mt-16">` children (Lighthouse a11y 92).
5. Remove or hide the SSR placeholder text "Spotify not configured" and "booting · syncing modules" from the indexable HTML.

## Category scores

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 40 | 8.8 |
| Content Quality | 23% | 65 | 15.0 |
| On-Page SEO | 20% | 70 | 14.0 |
| Schema / Structured Data | 10% | 60 | 6.0 |
| Performance (CWV) | 10% | 55 | 5.5 |
| AI Search Readiness | 10% | 60 | 6.0 |
| Images | 5% | 85 | 4.3 |
| **Total** | | | **~58** |

The category scores are judgment calls, anchored on the evidence below. Lighthouse SEO = 100 is **not** taken at face value because it did not penalise the cross-host canonical.

## Evidence: commands run

```
curl -sSIL https://umutk.me            # 308 -> https://www.umutk.me/ (Cloudflare in front of Vercel, x-vercel-cache: HIT)
curl -sSIL http://umutk.me             # 301 -> https://umutk.me/ -> 308 -> https://www.umutk.me/
curl -sSIL https://www.umutk.me        # 200, text/html, x-nextjs-prerender: 1, HSTS max-age=63072000
curl -s https://www.umutk.me/robots.txt
curl -s https://www.umutk.me/sitemap.xml
curl -s -o /dev/null -w '%{http_code}' https://www.umutk.me/{llms.txt,manifest.webmanifest,favicon.ico,opengraph-image,icon.svg,apple-icon.png,notfound-xyz,.well-known/security.txt}
curl -A '<GPTBot|ClaudeBot|PerplexityBot|Googlebot>' https://www.umutk.me/   # all 200
PageSpeed Insights API v5 (mobile + desktop)  # FAILED: "Quota exceeded ... Queries per day" (no API key)
npx lighthouse@12.6.0                          # FAILED: "No Chrome installations found"
chrome-devtools MCP lighthouse_audit (mobile)  # OK, Lighthouse 13.4.1
chrome-devtools MCP performance trace (412x823 mobile, Slow 4G, 4x CPU)  # OK
```

**Not available:** CrUX field data ("no data for this page in CrUX"), Google Search Console / GA4 (the credential check could not run because the skill runtime was not set up), backlink data (Moz/Bing/Common Crawl not run) and DataForSEO (not used). No drift baseline exists. This document is the baseline.

### Raw observations

**robots.txt (200):**
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Host: https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app
Sitemap: https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app/sitemap.xml
```

**sitemap.xml (200):** one `<url>`, `loc=https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app`, `lastmod=2026-04-30T10:22:34.759Z`.

**Head tags (key ones):**
- `<html lang="en">`
- `<title>`: "Umut Kızıloğlu — Full-Stack Developer" (37 chars)
- meta description: 155 chars
- `robots: index, follow`; `googlebot: index, follow, max-image-preview:large, max-snippet:-1`
- `canonical`: `https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app`
- `og:url` / `og:image` / `twitter:image`: Vercel host
- `og:locale=en_US`; `twitter:card=summary_large_image`; `twitter:creator=@umutkdev`
- `meta keywords` present (ignored by Google; harmless)
- favicon.ico, `/icon` (32px PNG), `/apple-icon` (180px) and `manifest.webmanifest` all present and returning 200
- No `hreflang` / `rel=alternate` (the site is EN only today; the TR+EN plan will need this)

**Headings:** 1x H1 ("FULL-STACK DEVELOPER Umut Kızıloğlu. building the web in production."; it includes the decorative prefix `///`), 5x H2 and 14x H3. The order is logical.

**JSON-LD:** `Person` (name, jobTitle, email, image, address Bursa/TR, knowsAbout, sameAs GitHub + LinkedIn) and `WebSite` (name, url, description, inLanguage=en, author). Every `url`/`image` uses the Vercel host.

**Links:** internal links are only `#` anchors (#intro, #work, #stack, #projects, #contact). External links: GitHub, LinkedIn, `https://open.spotify.com`. Two `/cdn-cgi/l/email-protection#...` links come from Cloudflare email obfuscation, which rewrites `mailto:` in the HTML.

**Images:** 1 `<img>` (memoji, 144x144, `alt="Umut Kızıloğlu memoji"`, served via `/_next/image`, 35 KB source PNG). OG image is generated at 1200x630 PNG (95.6 KB).

**Analytics:** no Vercel Web Analytics (`/_vercel/insights`) or GA tag in the HTML. This is expected because the plan adds it later.

## Technical SEO (40/100)

| Severity | Finding | Evidence | Recommendation |
|---|---|---|---|
| Critical | Canonical points to a different host (Vercel deployment URL) | `<link rel="canonical" href="https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app">` | Make canonical resolve to the production origin. Root cause: `app/lib/data.ts` uses `SITE_URL`, then `VERCEL_URL`; `SITE_URL` is evidently unset in Production. Prefer `VERCEL_PROJECT_PRODUCTION_URL` or a hard-coded production origin. |
| Critical | Sitemap `<loc>` and robots `Sitemap:` use the Vercel host | see raw observations | Same fix. Then submit `https://www.umutk.me/sitemap.xml` in GSC. |
| High | Host ambiguity: apex 308 redirects to www, and http takes 2 hops | `curl -sSIL http://umutk.me` | Choose one host. Use a single-hop redirect if Cloudflare/Vercel settings allow it. |
| Medium | robots.txt `Host:` directive is non-standard (only Yandex used it) and points to the wrong host | robots.txt | Drop it, or set it to the production host. |
| Medium | `Disallow: /_next/` can block CSS/JS/image (`/_next/image`) fetches for renderers | robots.txt | Remove `Disallow: /_next/` so Googlebot can render fully. |
| Low | No `security.txt` | 404 | Optional. |
| Info (pass) | HTTPS + HSTS (2y), `x-content-type-options`, `x-frame-options: SAMEORIGIN`, `referrer-policy` present; real 404 returned for unknown paths; static prerender, cache HIT | headers | No CSP header; consider adding one later. |

## Content Quality (65/100)

- About 677 words of server-rendered text, specific and first-person: roles, dates, employers (ThinkCut, Dijital Sahne, Biletinial/Pick a Seat, Vanelli), and a stack list. This gives good Experience/Expertise signals.
- **Medium:** SSR text includes UI placeholders that get indexed: "booting · syncing modules", "~/umutk $ load /umutk.me", "syncing ◌ — Spotify not configured". These dilute the snippet and look broken.
- **Medium:** the case-study depth is thin. The two projects have about 30 words each, with no outcomes, metrics, screenshots or dedicated URLs. The planned `/work/[slug]` pages fix this.
- **Low:** no Turkish content, though the profile targets Bursa/TR and states "lang EN · TR". This is planned (TR+EN).
- Trust: Cloudflare-obfuscated email, GitHub and LinkedIn links. There is no downloadable CV yet (`/cv` is planned).

## On-Page SEO (70/100)

- Title (37 chars) and description (155 chars) are good and unique.
- **Medium:** the H1 text is "/// FULL-STACK DEVELOPERUmutKızıloğlu.building the web in production.". It has decorative glyphs and words run together because there is no spacing in the text nodes. A clean H1 would read "Umut Kızıloğlu — Full-Stack Developer".
- **Medium:** single page, no internal URLs. Only `#` anchors, so there is no crawlable architecture to rank anything beyond a name query.
- **Low:** the `og:locale` is `en_US`, but the audience is TR/remote. Use `tr_TR` + `en_US` alternates once i18n lands.

## Schema / Structured Data (60/100)

- Present: `Person` + `WebSite`, valid in shape.
- **High:** all `url`/`image` values point to the Vercel host. This breaks entity consolidation with `umutk.me`.
- **Medium:** missing `@id` linking (`WebSite.author` should reference `Person` by `@id`); no `ProfilePage` wrapper (Google supports `ProfilePage` for profile pages); `worksFor`/`alumniOf` and `hasOccupation` are absent; `sameAs` lacks X (`@umutkdev` is in the Twitter meta).
- Not validated with Google's Rich Results Test (needs a browser/API). The check was manual only.

## Performance (55/100)

Lab only. There is no CrUX field data and PSI was unavailable because of quota.

DevTools trace, mobile 412x823 DPR2, Slow 4G, 4x CPU throttle:

| Metric | Value | Threshold |
|---|---|---|
| LCP | **4,935 ms** (poor) | <= 2,500 |
| LCP: TTFB | 94 ms | |
| LCP: render delay | **4,840 ms** | |
| CLS | 0.01 (good) | <= 0.1 |
| INP | not measured (no interaction) | <= 200 |

- **High:** almost all LCP time is render delay, not network. This is consistent with a client-side intro/boot animation ("booting · syncing modules" loader) or JS-gated reveal that holds the LCP element. Confirm before fixing.
- Insights flagged: render-blocking requests, network dependency chain, DOM size, third parties, cache lifetimes, legacy JavaScript (about 25.1 kB of polyfills). 54 `<script>` tags in the HTML (13 external).
- HTML document: 138 KB (uncompressed transfer as measured by curl), TTFB about 0.47 s from Istanbul via Cloudflare to Vercel fra1.

## Images (85/100)

- One content image, with alt text and explicit dimensions, served through `next/image` (srcset 1x/2x).
- **Low:** alt "Umut Kızıloğlu memoji" is fine. JSON-LD `image` points to `/memoji.png` on the Vercel host; use a real photo or keep the memoji but use the production host.
- OG image: 1200x630 PNG, 95.6 KB. Good.

## AI Search Readiness (60/100)

- **Pass:** GPTBot, ClaudeBot, PerplexityBot and Googlebot user agents all get HTTP 200; robots.txt does not block AI crawlers. This matches the plan ("all AI crawlers allowed"). Cloudflare is in front; no bot challenge was observed for these UAs from this IP. Not verified from crawler IP ranges.
- **Pass:** Lighthouse Agentic Browsing = 100 (agent accessibility tree, WebMCP audits, CLS, llms-txt audit refs).
- **Medium:** `/llms.txt` returns 404 (Lighthouse's llms-txt audit still passed, so treat that pass as not-applicable).
- **Medium:** citability is limited. There are no standalone passages that answer "who is Umut Kızıloğlu / what has he built" with facts and numbers, and there are no dedicated pages to cite.
- **High (shared with Technical):** entity URLs in JSON-LD and canonical point to a Vercel host. AI systems may attribute content to that host.

## Accessibility (supporting signal)

Lighthouse mobile: **Accessibility 92**, Best Practices 100, SEO 100, Agentic Browsing 100 (49 passed, 2 failed):
- `color-contrast`: several `<div class="text-ink-dim">` elements are below the contrast threshold.
- `list`: `<ol class="relative mt-16">` contains non-`<li>` children.

## Prioritized action plan

**Phase 1: Critical (week 1)**
1. Fix production origin resolution (`SITE_URL` in Vercel Production, or use `VERCEL_PROJECT_PRODUCTION_URL`). Verify that canonical, og:url/og:image, JSON-LD, robots and sitemap all show the production host.
2. Decide apex vs www. Align the redirect and canonical.
3. Submit the sitemap in GSC and request indexing of the homepage.

**Phase 2: High (weeks 2-3, mostly part of the redesign)**
4. Remove the render-delaying intro/boot gate so the hero text paints immediately. Target LCP < 2.5 s on mobile.
5. Remove `Disallow: /_next/` and the `Host:` line from robots.
6. Strip placeholder/boot text from the SSR HTML. Clean up the H1.

**Phase 3: Content & authority (month 2, redesign milestones)**
7. `/work/[slug]` case studies with outcomes, plus `/now`, `/uses`, `/cv` + PDF. This gives real internal links and citable pages.
8. TR+EN under `app/[lang]` with `hreflang` (tr, en, x-default) and per-locale canonical and sitemap alternates.
9. Schema: `ProfilePage` + `Person` with `@id`, `worksFor`, `sameAs` (+X); `CreativeWork`/`Article` per case study; `BreadcrumbList`.
10. Add `/llms.txt`.
11. Fix contrast and list semantics.

**Phase 4: Monitoring**
12. Enable Vercel Web Analytics (+ Speed Insights for field CWV). Connect GSC. Re-run this audit after M1 and diff it against this baseline.

---
Not covered: the PSI API (quota), local Lighthouse performance category (no Chrome for CLI; DevTools trace used instead), CrUX/GSC/GA4/backlinks (no credentials, skill runtime not set up), Rich Results Test, screenshots/visual review, and a crawl beyond the homepage (the site has a single URL).
