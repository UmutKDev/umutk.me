# M7 Lighthouse audit

- Date: 2026-10-30
- Build: `next build` (Next 16.2.4, Turbopack), served with `next start -p 3720` on localhost.
- Tool: Lighthouse 12.8.2 CLI (`npx lighthouse@12`) with Microsoft Edge headless.
  - The chrome-devtools MCP `lighthouse_audit` excludes the Performance category, so the CLI was used for all four.
- Settings: mobile form factor, default simulated throttling (Lantern, Slow 4G, 4x CPU).

## Scores

| Route | Perf | A11y | Best Practices | SEO | FCP | LCP (sim) | LCP (observed) | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|---|
| /tr | 97 | 100 | 96 | **92** | 0.8 s | **2.6 s** | 0.20 s | 0 ms | 0 | 278 KiB |
| /en/work/pick-a-seat | 97 | 100 | 96 | **92** | 0.8 s | **2.6 s** | 0.03 s | 0 ms | 0 | 276 KiB |
| /en/cv | 97 | 100 | 96 | **92** | 0.8 s | **2.6 s** | 0.06 s | 0 ms | 0 | 282 KiB |
| /tr/now | 97 | 100 | 96 | **92** | 0.8 s | **2.6 s** | 0.03 s | 0 ms | 0 | 282 KiB |

Targets are every category at 95 or above, LCP at 2.0 s or below, CLS at 0.05 or below, and low TBT.

- **Met:** Performance, Accessibility, CLS and TBT.
- **Missed:**
  - SEO is 92 on every route because of `robots.txt`.
  - Best Practices is 96 locally only, because of the console 404 (opportunity 3).
  - Simulated LCP is 2.6 s on every route.

## First-load JS per route

Source: `.next/diagnostics/route-bundle-stats.json`. Next 16 no longer prints this table in the build output. Gzip was measured locally with `gzip -9`.

| Route | Raw | Gzip |
|---|---|---|
| /[lang] | 537 KiB | 151 KiB |
| /[lang]/now | 541 KiB | 152 KiB |
| /[lang]/cv | 536 KiB | 150 KiB |
| /[lang]/uses | 536 KiB | 150 KiB |
| /[lang]/work/[slug] | 536 KiB | 150 KiB |
| /_not-found | 501 KiB | 139 KiB |

- About 140 KiB gzip is the shared framework baseline: react-dom plus the Next runtime. The largest chunk is `0baa9p_i1kydf.js`, 222 KiB raw.
- The app's own client code is small: 8 `"use client"` components, 554 lines in total.

## Top opportunities

### 1. robots.txt `Content-Signal` fails the SEO audit (SEO 92)

- **Cause:** Lighthouse's `robots-txt` audit reports "Unknown directive" for `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, served from `app/robots.txt/route.ts:10`. That single failure costs 8 points on every page.
- **Options:**
  - Drop the line. SEO goes back to 100, and nothing is lost in enforcement, because Content-Signal is only a stated preference.
  - Keep it and accept SEO 92 as a known, deliberate deviation.

### 2. Simulated LCP is 2.6 s; observed LCP is under 0.2 s

- **Where the time goes:** the LCP element is the hero `h1` text (`#hero-title` on home). Its breakdown is TTFB 454 ms and render delay 2,193 ms, with no resource load.
- **Isolation runs on /tr (no source changes):**
  - All `*.woff2` blocked: LCP 2.5 s. Fonts contribute only about 0.1 s.
  - All `/_next/static/chunks/*.js` blocked: LCP 1.7 s and Performance 100.
- **Conclusion:** Lantern puts the framework JS (about 150 KiB gzip) and the render-blocking CSS on the text LCP's critical path. In real loads the text paints at FCP (observed LCP equals observed FCP).
- **Next step:** measure again on the Vercel preview, or in field data from Speed Insights or CrUX, before spending effort here.
- **Cheap levers, if the lab number has to come down:**
  - Inline the 9 KiB CSS (`experimental.inlineCss`). Lighthouse estimates 130 to 140 ms of render-blocking savings.
  - Keep the client boundary small. The JS is mostly framework, so the gain is limited.

### 3. Console 404 for `/_vercel/insights/script.js` (Best Practices 96)

- `<Analytics />` in `app/[lang]/layout.tsx:57` loads a script that exists only on Vercel. This happens on localhost only; on Vercel the score should be 100.
- Optional fix: render `<Analytics />` only when `process.env.VERCEL` is set, so local, CI and e2e runs stay clean.

### 4. Legacy JavaScript, about 13 KiB

- Polyfills in the shared chunk `0baa9p_i1kydf.js`. `package.json` has no `browserslist`.
- Adding a modern-only target (for example `"browserslist": ["chrome 111", "edge 111", "firefox 111", "safari 16.4"]`) can remove them.

### 5. Unused JavaScript, about 26 KiB

- Also in the framework chunk `0baa9p_i1kydf.js` (react-dom). There is no app-level fix; this is listed for completeness.

## Not covered

- /en, /tr/work/*, /uses and the remaining locale variants were not audited. They share the layout and bundle, so similar results are expected.
- Desktop form factor was not audited.
- The MCP `lighthouse_audit` was not run, because the CLI already covers its categories.
