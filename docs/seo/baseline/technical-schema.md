# Baseline: Technical SEO + Structured Data (M0)

- Measured: 2026-10-30 ~08:06 UTC, from a workstation in Istanbul (Cloudflare edge IST, Vercel region fra1)
- Target: https://umutk.me (redirects to https://www.umutk.me/)
- Repo state: branch `claude/umutk-me-redesign-plan-432f43`, HEAD `d7fa413` (2026-04-30). No source files changed.
- Skills invoked: `claude-seo:seo-technical`, `claude-seo:seo-schema`. Their helper scripts (`sitemap_discovery.py`, `agentic_check.py`, `parse_html.py`) **could not run**: `claude-seo run ...` returned "Claude SEO runtime is not ready. Run `/seo setup` and retry." All evidence below comes from `curl`, `openssl` and a small Python parse of the raw HTML.
- Not measured here: Core Web Vitals / PageSpeed / CrUX (no PSI run in this report), Google Search Console index status, rendered-vs-raw DOM comparison (no Chromium run).

## TL;DR

1. **Critical: every absolute URL the site emits points at a Vercel deployment host, not umutk.me.** Canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`/`image`, `robots.txt` `Host`/`Sitemap`, and the sitemap `<loc>` all use `https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app`.
2. **Critical: that canonical target serves `X-Robots-Tag: noindex`.** The homepage tells Google its canonical is a noindexed URL.
3. **High: the apex redirects to `www` (308), but the code assumes the apex (`https://umutk.me`) is canonical.** Host choice must be settled (apex vs www) before i18n work.
4. Structured data is valid JSON-LD (Person + WebSite, server-rendered), but has the wrong URLs, no `@id` graph linking, and no ProfilePage. It is English-only.
5. Root cause in code: `app/lib/data.ts` resolves `SITE_URL` as `process.env.SITE_URL` → `https://${VERCEL_URL}` → `"https://umutk.me"`. `SITE_URL` is evidently not set in the Vercel production environment, so the per-deployment `VERCEL_URL` is used.

## 1. Status codes and redirects

Command: `curl -s -o /dev/null -w '%{http_code} %{redirect_url}' <url>`

| URL | Status | Location / notes |
|---|---|---|
| http://umutk.me | 301 | https://umutk.me/ |
| https://umutk.me | 308 | https://www.umutk.me/ (body "Redirecting...", plus `refresh: 0;url=` header) |
| http://www.umutk.me | 301 | https://www.umutk.me/ |
| https://www.umutk.me/ | 200 | 137,968 B HTML, TTFB 0.14 s |
| https://umutk.me/robots.txt, /sitemap.xml, any path | 308 | same path on www |
| https://www.umutk.me/robots.txt | 200 | text/plain, 197 B |
| https://www.umutk.me/sitemap.xml | 200 | application/xml, 290 B |
| https://www.umutk.me/manifest.webmanifest | 200 | application/manifest+json |
| https://www.umutk.me/opengraph-image | 200 | image/png, 95,613 B |
| https://www.umutk.me/memoji.png | 200 | image/png, 35,376 B |
| https://www.umutk.me/favicon.ico, /icon, /apple-icon | 200 | image types correct |
| https://www.umutk.me/nonexistent-xyz | 404 | proper 404 status (good) |
| https://www.umutk.me/llms.txt | 404 | no llms.txt |
| https://www.umutk.me/en, /tr (via apex) | 308 → www, then 404 expected | i18n routes do not exist yet (baseline) |
| https://www.umutk.me/api/ | 308 | → /api (trailing-slash normalisation) |

Redirect chain for `http://umutk.me/`: 301 → `https://umutk.me/` → 308 → `https://www.umutk.me/` = **2 hops** (skill guideline: max 1).

Deployment host `https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app/` returns **200** with `X-Robots-Tag: noindex` (Vercel's default for non-production domains). Its `/opengraph-image?...`, `/memoji.png`, `/sitemap.xml` also return 200, so OG previews currently work, but only as long as that deployment is retained.

## 2. Canonical

Raw HTML of https://www.umutk.me/:

```html
<link rel="canonical" href="https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app"/>
```

- Points off-domain to a URL that sends `X-Robots-Tag: noindex` → canonical/noindex conflict. Google may ignore the canonical or drop the page; either way umutk.me does not declare itself canonical.
- Source: `app/layout.tsx` `alternates.canonical: siteConfig.url`, with `siteConfig.url` from `app/lib/data.ts` (env-dependent, see TL;DR 5).
- Even with the env fix, the code fallback is `https://umutk.me` (apex), while the live host is `www`. Canonical would then point at a URL that 308-redirects.
- 404 page: emits **both** `<meta name="robots" content="noindex"/>` and `<meta name="robots" content="index, follow"/>` (root layout `robots` metadata is merged with the not-found page's), plus the same off-domain canonical. Status 404 still makes it non-indexable, but the duplicate tag should be cleaned up.

## 3. robots.txt (live, www)

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Host: https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app
Sitemap: https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app/sitemap.xml
```

- `Sitemap:` points at the deployment host, not umutk.me. Crawlers that follow it reach a noindexed host.
- `Host:` is a Yandex-only, non-standard directive; Google ignores it. Recommend removing it.
- `Disallow: /_next/` blocks Next.js JS/CSS chunks and `/_next/image`. Google recommends not blocking rendering resources; content is server-rendered so impact is limited, but it should be removed (or narrowed) in the redesign.
- AI crawlers: no per-bot rules; all are allowed via `*`, matching the plan ("all AI crawlers allowed"). Test fetches with UAs GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Googlebot all returned **200** (no Cloudflare/WAF block observed for spoofed UAs; real bot IPs not tested).
- Source: `app/robots.ts`.

## 4. sitemap.xml (live, www)

```xml
<url>
<loc>https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app</loc>
<lastmod>2026-04-30T10:22:34.759Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1</priority>
</url>
```

- 1 URL, on the wrong host. A sitemap on www listing a URL on a different host is invalid for that property (cross-host URLs are rejected unless verified cross-submission).
- `lastmod` = build time (`new Date()` in `app/sitemap.ts`), so it changes on every deploy regardless of content; Google discounts unreliable lastmod.
- `changefreq` / `priority` are ignored by Google.
- No hreflang alternates (expected; i18n is future work in this plan).
- Note: the response `age: 1947860` (about 22.5 days) and `lastmod` 2026-04-30 indicate the live production deployment was built 2026-04-30, matching HEAD `d7fa413`.

## 5. Response headers (https://www.umutk.me/)

| Header | Value | Assessment |
|---|---|---|
| server | cloudflare (in front of Vercel, `x-vercel-cache: HIT`) | Cloudflare proxy + Vercel |
| strict-transport-security | `max-age=63072000` | Present; no `includeSubDomains`/`preload` |
| x-content-type-options | nosniff | OK |
| x-frame-options | SAMEORIGIN | OK |
| referrer-policy | same-origin | OK (strict; outbound referrers stripped) |
| x-xss-protection | `1; mode=block` | Deprecated header, harmless |
| expect-ct | `max-age=86400, enforce` | Deprecated header, harmless |
| content-security-policy | absent | Gap |
| permissions-policy | absent | Gap |
| access-control-allow-origin | `*` | On HTML; unnecessary but low risk for a static page |
| cache-control | `public, max-age=0, must-revalidate`, `x-nextjs-prerender: 1` | Static prerender, revalidated at edge |
| cf-cache-status | DYNAMIC | Cloudflare not caching HTML (Vercel does) |
| speculation-rules | `"/cdn-cgi/speculation"` | Cloudflare speculation rules injected |

TLS: certificate issuer Google Trust Services WE1, SAN `umutk.me, *.umutk.me`, valid 2026-10-24 to 2027-01-22. HTTPS enforced (HTTP → 301).

Stack signals: Next.js (`x-nextjs-*`, `_next/static`), no PHP signals; the PHP CVE advisory in the skill does not apply.

## 6. Meta and Open Graph (raw HTML, server-rendered)

| Tag | Value | Notes |
|---|---|---|
| `<html lang>` | en | single language |
| title | Umut Kızıloğlu — Full-Stack Developer | 37 chars, OK |
| meta description | "Full-stack developer building intuitive, scalable web applications across HR and product teams. React/Next.js, TypeScript, Node.js/NestJS, PostgreSQL, Docker." | ~160 chars, OK |
| meta robots | index, follow | `googleBot` max-image-preview/max-snippet configured in code but Next emitted only the generic tag (no separate `googlebot` meta seen) |
| canonical | deployment host | **wrong** |
| link rel=author | deployment host | wrong host |
| keywords | present | ignored by Google; harmless |
| og:type / og:locale / og:site_name | website / en_US / Umut Kızıloğlu | no `og:locale:alternate` (needed after TR launch) |
| og:url | deployment host | **wrong** |
| og:image | `https://umutk-i4p2le0c1-...vercel.app/opengraph-image?39d9cad7cc25bd14`, 1200x630 png, alt set | works today but host-bound; breaks if that deployment is deleted |
| twitter:card | summary_large_image | OK |
| twitter:creator | @umutkdev | no `twitter:site` |
| twitter:image | same deployment-host URL | **wrong host** |
| viewport | width=device-width, initial-scale=1 | OK |
| theme-color | #0a0907 | OK |
| manifest | /manifest.webmanifest | OK |
| icons | favicon.ico 256x256, /icon 32x32 png, /apple-icon 180x180 | OK; manifest reuses 180px apple-icon as `maskable` (not designed with safe zone) and lacks 192/512 icons |
| hreflang | none | expected at baseline |
| Vercel Web Analytics | not detected (`/_vercel/insights` absent) | expected; planned in redesign |

Single `<h1>` present with the name and role (content is in raw HTML, so SSR/SSG confirmed by `x-nextjs-prerender: 1` and visible text in the curl response).

## 7. Structured data (JSON-LD)

Detection: 2 `<script type="application/ld+json">` blocks in raw HTML, first at byte 8,083 of a 137,968 B document (well within Googlebot's 2 MB fetch limit). No Microdata (`itemscope` = 0), no RDFa (`typeof=` = 0). Both blocks parse as valid JSON (Python `json.loads`). Source: `app/components/StructuredData.tsx` (rendered from `app/page.tsx`); `<` is escaped as `<`.

### Block 1: Person

```json
{"@context":"https://schema.org","@type":"Person","name":"Umut Kızıloğlu",
 "url":"https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app",
 "jobTitle":"Full-Stack Developer","email":"umut.kiziloglu@umutk.me",
 "image":"https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app/memoji.png",
 "address":{"@type":"PostalAddress","addressLocality":"Bursa","addressRegion":"Bursa","addressCountry":"TR"},
 "knowsAbout":["Next.js","React","TypeScript","Node.js","NestJS","PostgreSQL","Docker","Tailwind CSS"],
 "sameAs":["https://github.com/UmutKDev","https://linkedin.com/in/umutkdev"]}
```

### Block 2: WebSite

```json
{"@context":"https://schema.org","@type":"WebSite","name":"Umut Kızıloğlu",
 "url":"https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app",
 "description":"Full-stack developer building ...","inLanguage":"en",
 "author":{"@type":"Person","name":"Umut Kızıloğlu","url":"https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app"}}
```

### Validation

| Schema | Type | Status | Issues |
|---|---|---|---|
| Block 1 | Person | Valid syntax, wrong data | `url`, `image` on deployment host; no `@id`; `image` is a memoji (fine, but a real headshot `ImageObject` helps entity matching); `sameAs` lacks X (`@umutkdev` is used in twitter:creator) and uses `linkedin.com` without `www`; no `worksFor`/`alumniOf`/`nationality`/`description`; `knowsAbout` plain strings (acceptable) |
| Block 2 | WebSite | Valid syntax, wrong data | `url` on deployment host; `author` duplicates Person instead of referencing it by `@id`; no `publisher`; `inLanguage` single `en` |
| (missing) | ProfilePage | Gap | Google's supported type for personal/profile pages; should wrap the homepage (or /about) with `mainEntity` → Person `@id` |
| (missing) | BreadcrumbList | Gap (future) | Needed on /work/[slug], /now, /uses, /cv once they exist |
| (missing) | CreativeWork / SoftwareSourceCode / Article for case studies | Gap (future) | For /work/[slug] |

No deprecated types in use. No placeholder text. No relative URLs (all absolute, but wrong host). No dates present.

Rich Results Test / Schema.org validator were not run (no API access in this session); validity above is syntax + property review against Google's Person/ProfilePage/WebSite docs.

## 8. Issues by priority

### Critical
1. **Wrong host in all absolute URLs** (canonical, og:url, og:image, twitter:image, link rel=author, JSON-LD, robots Sitemap/Host, sitemap loc). Cause: `SITE_URL` env not set in Vercel production, so `VERCEL_URL` (per-deployment host) is used. Fix direction: set `SITE_URL` in production env, and stop falling back to `VERCEL_URL` for canonical purposes (prefer `VERCEL_PROJECT_PRODUCTION_URL` or a hardcoded production origin).
2. **Canonical points to a URL that returns `X-Robots-Tag: noindex`.** Same root cause as 1.

### High
3. **Apex vs www mismatch.** Live serves `www` (apex 308 → www); code fallback and handles assume apex `umutk.me`. Pick one host, make it the Vercel primary domain, and make `SITE_URL` match it exactly.
4. **2-hop redirect chain** `http://umutk.me` → `https://umutk.me` → `https://www.umutk.me`. Resolves itself if apex becomes primary, or by redirecting HTTP apex straight to the final host.
5. **Sitemap lists only a cross-host URL**; effectively an empty sitemap for the www property.

### Medium
6. `robots.txt` disallows `/_next/` (rendering resources); remove. Remove non-standard `Host:` line.
7. JSON-LD lacks an `@id` graph (Person ↔ WebSite ↔ ProfilePage); add ProfilePage.
8. 404 page emits conflicting `noindex` and `index, follow` robots meta and an off-domain canonical.
9. No Content-Security-Policy or Permissions-Policy header.
10. Sitemap `lastmod` is build time, not content time.

### Low
11. `twitter:site` missing; `sameAs` missing X profile.
12. Manifest: no 192/512 icons; 180px apple-icon reused as `maskable`.
13. Deprecated headers (`x-xss-protection`, `expect-ct`), HSTS without `includeSubDomains`.
14. No `llms.txt` (optional; aligns with "all AI crawlers allowed" stance).
15. No IndexNow (Bing/Yandex) support.

## 9. Scorecard (measured categories only)

| Category | Status | Basis |
|---|---|---|
| Crawlability | fail | robots/sitemap point to noindexed deployment host; `/_next/` blocked |
| Indexability | fail | canonical → noindex URL; host mismatch |
| Security | pass (warn) | HTTPS + HSTS + core headers; no CSP |
| URL structure | warn | 2-hop chain; apex/www split |
| Mobile | pass (partial) | viewport present; no device rendering test run |
| Core Web Vitals | not measured | no PSI/CrUX in this report |
| Structured data | warn | valid JSON-LD, wrong URLs, no ProfilePage/@id |
| JS rendering | pass | content and JSON-LD in raw prerendered HTML |
| IndexNow | fail | not implemented |

No numeric 0-100 score is given: helper scripts were unavailable and CWV was not measured.

## 10. Commands used (reproducible)

```sh
curl -s -o /dev/null -w '%{http_code} %{redirect_url} %{size_download}B %{time_total}s' <url>   # per URL in section 1
curl -sI https://umutk.me ; curl -sI https://www.umutk.me/
curl -s https://www.umutk.me/robots.txt ; curl -s https://www.umutk.me/sitemap.xml
curl -s https://www.umutk.me/ > home.html   # parsed with python3 -I (regex for head tags, json.loads for ld+json)
curl -sI https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app/ | grep -i x-robots
for ua in GPTBot OAI-SearchBot ClaudeBot Claude-SearchBot PerplexityBot Googlebot; do curl -s -o /dev/null -w '%{http_code}' -A "Mozilla/5.0 (compatible; $ua/1.0)" https://www.umutk.me/; done
echo | openssl s_client -connect www.umutk.me:443 -servername www.umutk.me | openssl x509 -noout -issuer -dates -ext subjectAltName
claude-seo run sitemap_discovery.py https://umutk.me --json   # failed: runtime not ready
claude-seo run agentic_check.py https://www.umutk.me --json   # failed: runtime not ready
```
