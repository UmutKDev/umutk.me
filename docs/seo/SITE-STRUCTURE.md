# umutk.me — Site Structure (target architecture for the redesign)

Status: M0 planning document. No source changes made.
Produced with: `claude-seo:seo-plan` skill (architecture-design step), facts sourced from `app/lib/data.ts`.
Date: 2026-10-30.

## 0. Evidence and limits

| Item | Source | Notes |
|---|---|---|
| Name, role, location, email, handles | `app/lib/data.ts` → `siteConfig` | "Umut Kızıloğlu", "Full-Stack Developer", "Osmangazi, Bursa — TR" |
| Work history | `app/lib/data.ts` → `experiences` | ThinkCut (Apr 2024–Present), Pick a Seat (Mar–May 2024), Dijital Sahne (May 2023–Apr 2024), Vanelli · Türkün Holding (Sep 2021–Jun 2022, intern) |
| Projects | `app/lib/data.ts` → `projects` | Pick a Seat; ThinkCut · HR Suite |
| Current sitemap | `app/sitemap.ts` | Single URL (`siteConfig.url`), no locales |
| Robots (since M7) | `app/robots.txt/route.ts` | `*` allow `/`, disallow `/api/`, `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, sitemap |

- `data.ts` contains **no quantitative outcomes** (traffic, conversion, latency, team size). Titles/descriptions below contain no metrics. Case-study pages must add metrics only when supplied by the owner.
- **Search volumes / keyword difficulty were not measured.** DataForSEO and GSC tools exist in this environment but were not called in this step; the query clusters below are intent-based hypotheses to validate in M0 keyword baseline (GSC queries + DataForSEO `kw_data_google_ads_search_volume` for TR/EN).
- Competitive analysis (skill step 2) skipped: personal portfolio, competitors are SERP neighbours for name/local queries, to be captured from the GSC baseline.

## 1. URL tree

```
https://www.umutk.me/
├── /                         → 307 to /en (or Accept-Language negotiation → /tr|/en); hreflang x-default target = /en
├── /en                       Home (EN)
│   ├── /en/work/pick-a-seat          Case study
│   ├── /en/work/thinkcut-hr-suite    Case study
│   ├── /en/now                       Current focus
│   ├── /en/uses                      Tools / setup
│   └── /en/cv                        HTML CV  → links /cv/umut-kiziloglu-cv-en.pdf
├── /tr                       Ana sayfa (TR)
│   ├── /tr/work/pick-a-seat
│   ├── /tr/work/thinkcut-hr-suite
│   ├── /tr/now
│   ├── /tr/uses
│   └── /tr/cv                        → links /cv/umut-kiziloglu-cv-tr.pdf
├── /cv/umut-kiziloglu-cv-en.pdf      static file (public/cv/)
├── /cv/umut-kiziloglu-cv-tr.pdf
├── /sitemap.xml
├── /robots.txt
└── /llms.txt (optional, agent discovery)
```

Decisions:
- **Slugs stay English in both locales** (`/tr/work/...`, `/tr/now`) — one route segment set under `app/[lang]`, hreflang pairs are 1:1. Translated slugs (`/tr/isler`) add routing cost for negligible ranking gain on a ~12-URL site.
- Case-study slugs derive from `projects[].name`: `pick-a-seat`, `thinkcut-hr-suite`. Dijital Sahne has no project entry in `data.ts`; add `/work/dijital-sahne` only if the owner supplies case-study material.
- No `/work` index page: the home page "Work" section is the index. Avoids a thin listing page with 2 items. Revisit at ≥5 case studies.
- No blog (per approved plan).
- PDFs are **not** locale-prefixed (`/cv/*.pdf`), so they sit outside `app/[lang]`; they cannot carry hreflang, and are linked only from their own-locale `/cv` page. Do not list PDFs in the sitemap; the HTML `/xx/cv` is the canonical CV.
- Trailing slash: none. Lowercase only.

### hreflang matrix (every HTML page)

| Page | `en` | `tr` | `x-default` |
|---|---|---|---|
| Home | /en | /tr | /en |
| work/[slug] | /en/work/[slug] | /tr/work/[slug] | /en/work/[slug] |
| now | /en/now | /tr/now | /en/now |
| uses | /en/uses | /tr/uses | /en/uses |
| cv | /en/cv | /tr/cv | /en/cv |

Each page: self-referencing `<link rel="canonical">`, `alternates.languages` with `en`, `tr`, `x-default`; `<html lang>` = `en` / `tr`. Sitemap: 12 URLs (6 per locale) with `alternates.languages` per entry.

## 2. Target query clusters (one per page per locale)

Primary = what the `<title>`/H1 targets. Supporting = for body copy/headings. Volumes unmeasured (see §0).

| Route | EN cluster | TR cluster |
|---|---|---|
| Home | **Primary:** "Umut Kızıloğlu" / "Umut Kiziloglu" (name, both spellings). **Supporting:** "full-stack developer Bursa", "Next.js developer Turkey", "umutkdev" | **Primary:** "Umut Kızıloğlu". **Supporting:** "Bursa yazılım geliştirici", "full-stack geliştirici Bursa", "Bursa web geliştirici" |
| /work/pick-a-seat | "Pick a Seat seat reservation Next.js case study", "Biletinial Pick a Seat" | "Pick a Seat koltuk rezervasyonu", "Biletinial Pick a Seat" |
| /work/thinkcut-hr-suite | "ThinkCut HR web app NestJS React", "HR software full-stack case study" | "ThinkCut İK yazılımı", "İK web uygulaması NestJS React" |
| /now | "Umut Kızıloğlu now" (name + navigational; low volume, freshness signal) | "Umut Kızıloğlu şu an ne yapıyor" / "Umut Kızıloğlu now" |
| /uses | "Umut Kızıloğlu uses", "full-stack developer setup / tools" | "Umut Kızıloğlu kullandıkları", "yazılım geliştirici araçları" |
| /cv | "Umut Kızıloğlu CV", "Umut Kızıloğlu resume", "full-stack developer CV Bursa" | "Umut Kızıloğlu özgeçmiş", "Umut Kızıloğlu CV", "full-stack geliştirici özgeçmiş" |

Rationale: realistic wins for a personal site are (1) owning the name SERP in both spellings (Turkish `ı`/`ğ` vs ASCII), (2) local-intent "Bursa + developer" in TR, (3) long-tail project names. Name SERP is reinforced by `Person` schema `sameAs` → GitHub `UmutKDev`, LinkedIn `umutkdev`, X `@umutkdev` (all from `siteConfig.handles`).

## 3. Title / description drafts

Limits: title ≤ 60 chars, description ≤ 155 chars. Template: `{page} — Umut Kızıloğlu` except home. No metrics (none in source).

### EN

| Route | Title | Description |
|---|---|---|
| /en | Umut Kızıloğlu — Full-Stack Developer in Bursa, Türkiye | Full-stack developer in Bursa building scalable web apps with React, Next.js, TypeScript, NestJS and PostgreSQL. Currently at ThinkCut. |
| /en/work/pick-a-seat | Pick a Seat: Seat Reservation UI — Umut Kızıloğlu | Case study: responsive ticketing and seat-reservation interfaces for Biletinial's Pick a Seat, built with Next.js, TypeScript and Tailwind CSS. |
| /en/work/thinkcut-hr-suite | ThinkCut HR Suite Case Study — Umut Kızıloğlu | Case study: HR web features at ThinkCut — reusable UI system, API integrations and SSR pages with NestJS, React, PostgreSQL, Redis and Docker. |
| /en/now | Now — Umut Kızıloğlu | What I'm focused on right now: work at ThinkCut, what I'm learning and building as a full-stack developer in Bursa. |
| /en/uses | Uses: Tools, Stack & Setup — Umut Kızıloğlu | The editor, hardware, frameworks and services I use daily as a full-stack developer: React, Next.js, NestJS, PostgreSQL, Docker and more. |
| /en/cv | CV — Umut Kızıloğlu, Full-Stack Developer | Résumé of Umut Kızıloğlu: full-stack developer at ThinkCut, previously Dijital Sahne. React, Next.js, NestJS, PostgreSQL. Download the PDF. |

### TR

| Route | Title | Description |
|---|---|---|
| /tr | Umut Kızıloğlu — Bursa'da Full-Stack Yazılım Geliştirici | Bursa'da React, Next.js, TypeScript, NestJS ve PostgreSQL ile ölçeklenebilir web uygulamaları geliştiren full-stack geliştirici. Şu an ThinkCut'ta. |
| /tr/work/pick-a-seat | Pick a Seat: Koltuk Rezervasyonu — Umut Kızıloğlu | Vaka çalışması: Biletinial'ın Pick a Seat ürünü için Next.js, TypeScript ve Tailwind CSS ile duyarlı bilet ve koltuk rezervasyonu arayüzleri. |
| /tr/work/thinkcut-hr-suite | ThinkCut İK Yazılımı Vaka Çalışması — Umut Kızıloğlu | Vaka çalışması: ThinkCut'ta İK odaklı web özellikleri; yeniden kullanılabilir arayüz sistemi, API entegrasyonları ve SSR. NestJS, React, PostgreSQL. |
| /tr/now | Şu An — Umut Kızıloğlu | Şu an neye odaklandığım: ThinkCut'taki işim, öğrendiklerim ve Bursa'da full-stack geliştirici olarak üzerinde çalıştıklarım. |
| /tr/uses | Kullandıklarım: Araçlar ve Kurulum — Umut Kızıloğlu | Full-stack geliştirici olarak her gün kullandığım editör, donanım, framework ve servisler: React, Next.js, NestJS, PostgreSQL, Docker ve fazlası. |
| /tr/cv | Özgeçmiş (CV) — Umut Kızıloğlu, Full-Stack Geliştirici | Umut Kızıloğlu özgeçmişi: ThinkCut'ta full-stack geliştirici, öncesinde Dijital Sahne. React, Next.js, NestJS, PostgreSQL. PDF olarak indirin. |

Notes:
- `/tr/work/thinkcut-hr-suite` title is 52 chars; TR home title is 56 chars (all titles measured 20–56 chars, descriptions 115–148 chars via python len()) — verify rendered pixel width (~580 px) at implementation; trim "Yazılım" if truncated.
- `/now` and `/uses` descriptions refer to content not yet in `data.ts`; adjust once content exists so description matches page.
- OG title/description = same strings; OG locale `en_US` / `tr_TR` with `og:locale:alternate`.

## 4. Schema per page type

| Page | JSON-LD |
|---|---|
| Home | `ProfilePage` (mainEntity → Person) + `Person` (name, jobTitle "Full-Stack Developer", address Bursa TR, email, `sameAs` GitHub/LinkedIn/X, `worksFor` ThinkCut) + `WebSite` (inLanguage) |
| work/[slug] | `CreativeWork` or `Article` (author → Person `@id`), `BreadcrumbList` Home › {project} |
| cv | `WebPage` + `BreadcrumbList` (ProfilePage lives on home since M5) |
| now, uses | `WebPage` + `BreadcrumbList` |

Use one stable Person `@id` (`https://www.umutk.me/#person`) across both locales.

## 5. Internal linking plan

Site is small (12 HTML URLs); every page should be ≤ 1 click from home.

**Global (header/footer, every page):**
- Logo/name → `/{lang}` (anchor: "Umut Kızıloğlu").
- Nav: Work (→ `/{lang}#work`), Now, Uses, CV.
- Language switch → the **equivalent** page in the other locale (not the other home). Uses `<a hreflang>`; never auto-redirect after first visit.
- Footer: GitHub, LinkedIn, X, email (`rel="me"` on profile links to strengthen the name entity).

**Home → children:**
- Work section: each project card links to its case study with descriptive anchor ("Pick a Seat seat-reservation case study"), not "Read more".
- Experience entries for ThinkCut / Pick a Seat link to the matching case study.
- Hero CTA: "View CV" → `/{lang}/cv`; secondary "Download PDF" → `/cv/umut-kiziloglu-cv-{lang}.pdf`.
- Short "Now" teaser (1–2 lines) → `/{lang}/now`.

**Case studies:**
- Breadcrumb: Home › Work › {project}.
- Prev/next link to the other case study.
- Stack tags link to `/{lang}/uses#{tool}` anchors where the tool appears on /uses (e.g. Next.js, NestJS, PostgreSQL).
- Closing CTA → `/{lang}/cv` and contact email.

**/cv:**
- Each role links to its case study when one exists (ThinkCut → thinkcut-hr-suite; Pick a Seat → pick-a-seat).
- PDF download link for same locale; text link to other-locale PDF labelled with language.

**/now, /uses:**
- /now links to the case study of current work (thinkcut-hr-suite) and to /uses.
- /uses links back to case studies where each tool was used.

**Rules:**
- No orphan pages: each of the 12 URLs gets ≥ 2 contextual internal links besides nav.
- Anchors descriptive and locale-native (TR anchors in Turkish).
- Section anchors (`#work`, `#stack`, `#contact`) are kept from current `navItems` but are not separate URLs and are not in the sitemap.
- Legacy URL `https://umutk.me/` keeps working via redirect; any old fragment links (`/#work`) resolve after redirect to `/en#work`.

## 6. Crawl / indexing setup (for implementation milestones)

- `robots.txt`: allow all, including AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) per approved plan; keep disallow `/api/`. Done in M7: `/_next/` is no longer disallowed, and `Content-Signal` states search, AI input and AI training are allowed.
- Sitemap: 12 entries with `alternates.languages`; `lastModified` from content, not `new Date()` (current `app/sitemap.ts` emits build time on every request).
- Root `/` redirect: use 307/308 or middleware locale negotiation; `/` itself not in the sitemap, `x-default` points to `/en`.
- Vercel Web Analytics: per-route pageviews to measure locale split and CV/PDF clicks (custom event on PDF download).

## 7. Open items for owner

1. Confirm case-study list (2 from `data.ts`; add Dijital Sahne?).
2. Supply any real outcome metrics for case studies (none exist in source).
3. Content for /now and /uses (not in `data.ts`).
4. Confirm ASCII alias "Umut Kiziloglu" appears in visible copy once (e.g. CV page, alt text) to catch non-Turkish-keyboard name searches.
5. Run keyword-volume validation (DataForSEO, locations Türkiye / global, languages tr/en) and GSC query baseline before freezing titles.
