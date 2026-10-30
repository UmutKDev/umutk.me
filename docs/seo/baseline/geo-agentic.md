# Baseline: GEO and agentic browsing — umutk.me

- Measured: 2026-10-30 (approx. 08:05–08:07 UTC)
- Target: `https://umutk.me` → 308 → `https://www.umutk.me/` (single hop, served by Vercel `fra1` behind Cloudflare)
- Scope: M0 baseline only. No source, `public/` or config changed.
- Skills used: `claude-seo:seo-geo`, `claude-seo:seo-agentic` (v2.5.0)

## Tool availability

| Tool | Result |
|---|---|
| `claude-seo run lighthouse_agentic.py / agentic_check.py / agent_ux_check.py` | **Unavailable**: every script exited rc=3 with "Claude SEO runtime is not ready. Run `/seo setup`". Setup was not run (out of scope for a measurement-only task). Checks were reproduced manually with `curl` and Python. |
| PageSpeed Insights v5 `category=AGENTIC_BROWSING` (anonymous) | **Unavailable**: HTTP 429, "Quota exceeded ... Queries per day" for both strategies. |
| Lighthouse via chrome-devtools MCP (`lighthouse_audit`) | **Worked**: Lighthouse 13.4.1, navigation mode, mobile and desktop. |
| Agent-UX heuristic (0-100, `agent_ux_check.py`) | Not obtained (runtime not ready). Lighthouse `agent-accessibility-tree` used instead. |
| Brand-mention / AI-citation tracking (DataForSEO, SE Ranking) | Not run. No platform-level GEO score is given. |

## Summary

| Metric | Mobile | Desktop |
|---|---|---|
| Lighthouse Agentic Browsing fraction | **2/2** | **2/2** |
| Lighthouse Accessibility | 92 | 93 |
| Lighthouse SEO | 100 | 100 |
| Lighthouse Best Practices | 100 | 100 |

P0 failures (agentic): **0 measured**. The biggest problem found is not agent-specific: **canonical, `og:url`, JSON-LD `url`/`image`, robots `Host` and the sitemap all point at a Vercel deployment URL instead of `https://www.umutk.me`** (details in Finding 1). This undermines entity clarity and citability for every search and AI surface.

## Lighthouse Agentic Browsing (LH 13.4.1, 2026-10-30T08:06Z)

The fraction is reported as computed; N/A audits drop out, so N = 2.

| Audit | Weight | Mobile | Desktop |
|---|---|---|---|
| `agent-accessibility-tree` | 1 | pass ("Accessibility tree is well-formed") | pass |
| `cumulative-layout-shift` | 1 | pass (CLS 0) | pass (CLS 0) |
| `llms-txt` | 0 | N/A (no `/llms.txt`, real 404) | N/A |
| `webmcp-form-coverage` | 0 | N/A | N/A |
| `webmcp-registered-tools` | 0 | N/A (page registers no tools) | N/A |
| `webmcp-schema-validity` | 0 | N/A | N/A |

Other failing Lighthouse audits (accessibility category, relevant to agents reading the tree):
- `color-contrast` (mobile + desktop)
- `list` — lists contain non-`<li>` children (mobile + desktop)
- `label-content-name-mismatch` (desktop only)

Paths that would add a counted audit (options, not goals): publishing a valid `/llms.txt` makes `llms-txt` count; registering WebMCP tools makes the WebMCP audits count. The site has no forms or transactions, so WebMCP is not warranted.

Raw reports (temp, not committed): `/var/folders/hw/cns_jwgj11x0jsrfw8cd84j80000gn/T/chrome-devtools-mcp-swWsIF/report.json` (mobile), `.../chrome-devtools-mcp-bFkUtM/report.json` (desktop).

## AI crawler access

### robots.txt (`GET https://www.umutk.me/robots.txt`, 200)

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Host: https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app
Sitemap: https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app/sitemap.xml
```

There are no per-agent groups and no `Content-Signal`. Every AI crawler falls under `*` and is allowed. That matches the plan ("all AI crawlers allowed"), but it is implicit rather than deliberate. Source: `app/robots.ts`.

| User-agent | Governs | robots.txt | HTTP (UA-token request, unverified) |
|---|---|---|---|
| Googlebot | Google Search, AI Overviews, AI Mode | allowed (`*`) | 200 |
| Google-Extended | Gemini/Vertex training & grounding (not Search) | allowed (`*`) | 200 |
| OAI-SearchBot | ChatGPT Search citability | allowed (`*`) | 200 |
| GPTBot | OpenAI training | allowed (`*`) | 200 |
| ChatGPT-User | user-triggered ChatGPT fetch | allowed (`*`) | 200 |
| Claude-SearchBot | Claude search citability | allowed (`*`) | 200 |
| ClaudeBot | Anthropic training | allowed (`*`) | 200 |
| Claude-User | user-triggered Claude fetch | allowed (`*`) | 200 |
| PerplexityBot | Perplexity search | allowed (`*`) | 200 |
| Perplexity-User | user-triggered Perplexity fetch | allowed (`*`) | 200 |
| Applebot | Siri / Spotlight / Safari | allowed (`*`) | 200 |
| CCBot | Common Crawl (training) | allowed (`*`) | 200 |
| Bytespider | ByteDance | allowed (`*`) | 200 |

WAF: no Cloudflare challenge or block was seen for any token (all 200, ~135–138 KB). These were requests carrying spoofed UA strings from one IP, so they show how the edge treats **unverified** traffic, not how it treats the real, IP-verified bots. Cloudflare's "AI bot" blocking and managed robots.txt appear off, since robots.txt is served by Vercel unchanged. Small body-size differences between UAs (135,474 vs 137,968 bytes) come from Next.js serving blocking metadata to known bot UAs. They are not a block.

Access policy:
- **Training** (GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended): allowed through `*`. Not stated explicitly.
- **Search** (Googlebot, OAI-SearchBot, Claude-SearchBot, PerplexityBot, Applebot): allowed.
- **User-triggered** (ChatGPT-User, Claude-User, Perplexity-User): allowed. There are no private paths to protect.

## llms.txt and discovery files (`https://www.umutk.me`)

| Path | Status |
|---|---|
| `/llms.txt` | 404 (absent) |
| `/llms-full.txt` | 404 |
| `/.well-known/ai-catalog.json` | 404 |
| `/.well-known/agent-card.json` | 404 |
| `/.well-known/api-catalog` | 404 |
| `/index.md` | 404 |
| `Accept: text/markdown` on `/` | returns `text/html`; no Markdown negotiation, `Vary` has no `Accept` |
| unknown URL `/this-should-404` | **404** (real 404, no catch-all 200) |
| `/sitemap.xml` | 200, one URL (wrong host, see Finding 1) |
| `/manifest.webmanifest` | 200 |
| `/cv`, `/now`, `/uses` | 404 (planned pages, not built yet) |

`llms.txt` is optional. Google says it neither helps nor hurts Search, so it carries no weight here. It may still be used by non-Google tools. No named consumer agent is claimed to read it.

## Server-side rendering

`curl` of `/` with no JavaScript returns 137,968 bytes of HTML with all main content present: about 682 visible words once scripts and styles are removed, including the hero, profile, experience timeline (ThinkCut, Pick a Seat, Dijital Sahne, Vanelli), stack and projects. AI crawlers that do not run JavaScript (GPTBot, PerplexityBot) therefore see the full content. **SSR check: pass.**

The text before the hero is terminal-flavour UI ("booting · syncing modules", `~/umutk $ load /umutk.me`, "⌘ K"). A crawler reads this text first, ahead of the actual summary.

## Citability and entity signals (homepage)

| Signal | Observed |
|---|---|
| `<html lang>` | `en` only; no `hreflang` (TR+EN is planned) |
| `<title>` | "Umut Kızıloğlu — Full-Stack Developer" |
| meta description | a clear, quotable one-sentence role summary (stack listed) |
| H1 | one H1, text is run together: "/// FULL-STACK DEVELOPERUmutKızıloğlu.building the web in production." (spans with no separating spaces) |
| H2s | stylised, not descriptive: "a short README.", "where I've been in the wild.", "tools I keep loaded in the chamber.", "selected work / field reports.", "let's build something worth running." |
| H3s | company and project names; "Pick a Seat" appears twice |
| Self-contained answer block | The meta description and "profile" paragraph give a good 40–80 word "who/what" summary. There is no block that answers "who is Umut Kızıloğlu / what does he do" in plain prose near the top, without UI chrome before it. |
| Dates | Experience date ranges are present as text; no `<time datetime>` and no last-updated date |
| Specific facts | "3+ years coding", employers and date ranges, stack. "∞ prod releases" cannot be quoted as a fact. |
| Images | 1 `<img>`, has alt |
| JSON-LD | `Person` (name, jobTitle, email, image, address Bursa/TR, knowsAbout, sameAs GitHub + LinkedIn) and `WebSite`. Every `url`/`image` points to the Vercel deployment host. |
| Case studies / long-form | none yet (planned `/work/[slug]`) |
| Brand presence (Wikipedia, Reddit, YouTube) | **not measured**. `sameAs` lists only GitHub and LinkedIn. |

Qualitative GEO readiness: **moderate-low**. The SSR, crawler access and Person schema basics are in place. The wrong canonical/entity URL, a thin single-page site with no citable case studies, stylised headings and no dates hold it back. No numeric GEO score or platform score (Google AIO, ChatGPT, Perplexity) is given, because citation tools were not run.

## Findings by priority

1. **P0 (SEO/entity, all surfaces): production metadata uses the Vercel deployment URL.**
   - Evidence: `<link rel="canonical" href="https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app">`, `og:url`, JSON-LD `Person.url`/`image` and `WebSite.url`, robots `Host:`/`Sitemap:`, and sitemap `<loc>` all use that host.
   - The deployment host itself returns 200 with `x-robots-tag: noindex`. Canonicalising to a noindexed URL tells search engines and AI indexers that the real page is a non-indexable duplicate.
   - Cause (read-only check): `app/lib/data.ts` resolves `SITE_URL` from `process.env.SITE_URL`, then falls back to `VERCEL_URL`. `SITE_URL` is evidently not set for Production on Vercel.
   - Confirm a fix with: `curl -s https://www.umutk.me/ | grep canonical` and `curl -s https://www.umutk.me/robots.txt`.
2. **P1: canonical host choice.** Apex `umutk.me` 308s to `www`. The redesign should pick one host (the plan says `https://umutk.me`) and keep the redirect, canonical, sitemap and JSON-LD consistent with it.
3. **P1 (a11y, read by agents):** `color-contrast` and `list` fail on both devices, and `label-content-name-mismatch` fails on desktop. The H1 accessible name is run together with no spaces.
4. **P1: no deliberate per-purpose robots groups and no `Content-Signal`.** Everything is allowed implicitly. If the plan keeps "all AI crawlers allowed", optionally state it with explicit groups. The owner must decide the `ai-train` signal.
5. **P2:** `/llms.txt` is absent. It is optional, has no Google effect, and would make the `llms-txt` Lighthouse audit count.
6. **P2:** no Markdown delivery (`.md` or `Accept: text/markdown`).
7. **N/A:** WebMCP, ai-catalog.json, A2A and UCP. The site has no forms, transactions or APIs to expose.

## Standards status (checked 2026-10-30, per skill references)

WebMCP: draft (Chrome-led; WebKit opposed). Content-Signal: proposal (Cloudflare). llms.txt: community proposal, no major provider confirms use. ai-catalog / ARD: proposal. Web Bot Auth: IETF draft (RFC 9421 signatures). RSL 1.0: published Dec 2025, not implemented here.

## Commands run (reproducible)

```bash
S=~/.claude/plugins/cache/agricidaniel-claude-seo/claude-seo/2.5.0/scripts/claude-seo
$S run lighthouse_agentic.py https://umutk.me --strategy both --json   # rc=3 runtime not ready
$S run agentic_check.py https://umutk.me --json                          # rc=3
$S run agent_ux_check.py https://umutk.me --json                         # rc=3
curl -sSi https://umutk.me/robots.txt                                    # 308 -> www
curl -sS https://www.umutk.me/robots.txt
for p in /llms.txt /llms-full.txt /.well-known/ai-catalog.json /.well-known/agent-card.json \
  /.well-known/api-catalog /index.md /this-should-404 /sitemap.xml /manifest.webmanifest; do
  curl -sS -o /dev/null -w "$p %{http_code} %{content_type}\n" https://www.umutk.me$p; done
curl -sS -D - -o /dev/null -H "Accept: text/markdown" https://www.umutk.me/
curl -sS -o home.html https://www.umutk.me/   # parsed for title/canonical/headings/JSON-LD/visible text
curl -sSI https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app/   # 200, x-robots-tag: noindex
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.umutk.me%2F&strategy={mobile,desktop}&category=AGENTIC_BROWSING"  # 429 quota
# UA matrix: curl -A "Mozilla/5.0 (compatible; <Token>; ...)" https://www.umutk.me/  for 13 AI/search tokens
# chrome-devtools MCP: navigate_page https://www.umutk.me/ ; lighthouse_audit device=mobile|desktop (LH 13.4.1)
```

## Re-measure after redesign

Rerun the same commands, plus `$S run lighthouse_agentic.py` once `/seo setup` has run. Compare: the Agentic fraction (expect N to become 3 if llms.txt ships), canonical host, the robots groups, `/llms.txt` status, a11y failures, and `hreflang` on `/tr` and `/en`.
