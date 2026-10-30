# M0 design baseline: current umutk.me (before redesign)

Date: 2026-10-30. Branch `claude/umutk-me-redesign-plan-432f43`. Target: `app/page.tsx` (single page, route `/`).
No file under `app/`, `public/` or config was modified.

## How this was measured

| Step | Command / tool | Result |
| --- | --- | --- |
| Dev server | `bun run dev -- -p 3100` (background) | `GET / 200`; stopped after the run (killed PID 63716 and its parent `next dev -p 3100`; port 3100 free) |
| Hallmark audit | Skill `hallmark` (audit mode, `references/redesign.md`) then `node ~/.claude/skills/hallmark/scripts/sloplint.mjs app/globals.css --genre editorial --render --before --url http://localhost:3100/` (run from the scratchpad so `.hallmark/` was not written into the repo) | **31 FAIL, 1 REFLEX, 3 WARN** (static tier). Render tier did **not** run: "no puppeteer-core found". Raw: `raw/hallmark-sloplint.txt` |
| taste-skill review | Skill `taste-skill:design-taste-frontend` (review path) then `node <taste-skill>/scripts/inspect.mjs http://localhost:3100/ --out .design/before/taste-inspect` (Microsoft Edge headless, 1440 / 768 / 390) | **17 FAIL, 10 WARN**. Screenshots in `taste-inspect/`. Raw: `raw/taste-inspect.txt`. Note: measured on the dev server, not a production build |
| Full-page screenshots | Playwright MCP was **unavailable** (`Chromium distribution 'chrome' is not found`). Used taste-skill's CDP helper (`scripts/lib/cdp.mjs`) driving Edge headless instead | `home-390.png`, `home-768.png`, `home-1440.png` (page height 5943px at 1440), `command-palette-1440.png` |
| a11y probes | Same CDP session: `prefers-reduced-motion: reduce` emulated; command palette opened via the `cmdk-toggle` event; DOM attributes read | Raw: `raw/cdp-probes.txt` |

Caveats: Spotify env vars are not set locally, so the widget renders its "offline / Spotify not configured" state; the Next.js dev badge ("N", bottom-left) appears in the screenshots and is not part of the site.

## Key measurements (taste-skill inspector)

- Hero headline "Umut Kızıloğlu." 152px (10.6vw) Fraunces 400, 1 line at every width. But the actual `<h1>` measures **16px** because it starts with the 10px `/// FULL-STACK DEVELOPER` span (Hero.tsx:27-30).
- Typefaces in use: Geist 54%, **Geist Mono 38%**, Fraunces 8%. **14 font sizes** (10 to 152px). Body text **14px**.
- Colours: ground `#0a0907`, ink `#ece7d9`, accent/button `#d8856a` (flagged `palette-claude`: cream + terracotta).
- 6.6 screens, 681 words, **1 image** (the memoji), no hero media, 13 headings.
- 7 gradient fills, 18 resting box-shadows, 2 text-shadows, 8 hairline rules, 18 one-pixel outlined boxes, 4 backdrop-blur surfaces, 76 tiny tracked uppercase labels, 40 text blocks under 13px.
- Low contrast: experience dates "→ Present", "→ May 2024" etc. at **3:1** (need 4.5:1).
- Margins off-centre: 168px left vs 189px right at 1440; 16px vs 39px at 390.
- At 390 the contact heading "let's build something worth running." wraps to 4 lines.
- "Pick a Seat" and "ThinkCut · HR Suite" project titles are 100% covered by another element at one scroll position (screen 6; likely the fixed nav).

## What reads as generated / AI-slop

Ranked by how loudly it says "template". File:line evidence.

1. **Ambient FX layer** (BackgroundFX.tsx:8-50): three blurred drifting radial "blobs" (coral, amber, cream), two grid overlays with edge masks, an animated horizontal scan line, vignette and noise. This is the canonical generated dark portfolio backdrop.
2. **Glassmorphism everywhere** (globals.css `.glass`, `.glass-soft`, `.glass-strong`, `.glass-dark`, from line ~85): gradient-tinted translucent panels with `backdrop-filter: blur(20-28px)`, a 1px white border and an inset highlight plus a 30-60px drop shadow. Used for the terminal, About card, project cards, contact panel, nav pill and palette. Hallmark WARN 29 and F24 (hairline border under a soft shadow).
3. **Glow**: `.glow-text` text-shadow on "web" (Hero.tsx:38) and "worth" (Contact.tsx:29); coral halo behind the memoji (Hero.tsx:95); `accent-pulse` box-shadow rings on status dots (Nav.tsx:48, 91; Hero.tsx:109); hover glow ring on the email button (Contact.tsx:46).
4. **Eyebrows / kickers and tracked mono labels**: `/// FULL-STACK DEVELOPER` inside the h1 (Hero.tsx:28-30); `● OSMANGAZI, BURSA — TR ——— V.2026` meta line (Hero.tsx:17-24); `01 —— PROFILE`, `02 —— TRACE`, `03 —— PAYLOAD`, `04 —— ARTIFACTS` (SectionHeader.tsx:14-18); `proj.01`, `proj.02` (Projects.tsx:32-34); `05 · open channel` (Contact.tsx:22-25). The `.label-mono` class (globals.css:134: mono, 0.7rem, 0.16em tracking, uppercase) drives 76 such labels. Hallmark FAIL 67, REFLEX 64; taste FAIL eyebrow, mono, micro-label, numbering.
5. **Index numbering**: 01-05 section numbers, `proj.01/02`, `01 / 07` counters (taste FAIL numbering).
6. **One italic word in a roman heading**, on every heading: "Umut *Kızıloğlu.*", "*building* the web *in production.*", "*a* short README.", "*where* I've been...", "*tools* I keep loaded...", "*selected* work", "*let's* build something". Plus a coloured + underlined accent word ("web", "worth"). Taste WARN mixed-font-headline x7.
7. **Hand-drawn OS window**: the terminal card with red/yellow/green traffic-light dots and "~ /shell · zsh" (Hero.tsx:52-61), with a `scanlines` overlay. Hallmark Floor 11.
8. **Invented / joke metrics**: "3+ years coding" and "∞ prod releases" stat tiles (Hero.tsx:68-69). The ∞ is exactly the "invented metric" tell (Hallmark Floor 8).
9. **Dev-cosplay copy**: "a short README.", "where I've been in the wild", "tools I keep loaded in the chamber", "field reports", "artifacts", "payload", "open channel", "all bytes reserved", "v.2026", "status: online". Each is a costume label rather than a plain heading.
10. **Card gadgets**: 3D `TiltCard` with a cursor-following radial highlight (TiltCard.tsx), HUD corner brackets on project cards (Projects.tsx:69-79), rotating dashed ring around the avatar (Hero.tsx:90-93).
11. **Floating pill nav** with an active-pill fill and `scale-95` on scroll (Nav.tsx:54-75); `transition-all` on header and nav (Nav.tsx:39, 55; Contact.tsx:46, 59). Hallmark Floor 2.
12. **Gradient hairline section dividers** between every section (page.tsx:35-41).
13. **Decorative status dots** before location, logo, "Available" and in the toast (Hallmark Floor 10); emoji ☕ in the footer (Contact.tsx:78; taste FAIL emoji).
14. **Stale palette leftovers**: lime `rgba(163,255,18,…)` glows from an earlier theme still in Contact.tsx:16, 46, TiltCard.tsx:57, Experience.tsx:32, clashing with the coral accent.
15. **Token hygiene**: 27 colour literals outside the token block (Hallmark FAIL 48), `@keyframes bar` animates `height` (globals.css:294-295, FAIL 10a), `overflow-x: hidden` on body (globals.css:50, FAIL 34, breaks sticky).

## What is worth keeping

- **The content, almost all of it**: name, role, Osmangazi/Bursa location, the description and tagline (siteConfig, lib/data.ts), the four experience entries with dated bullets and stacks (ThinkCut, Pick a Seat, Dijital Sahne, Vanelli · Türkün Holding), the grouped stack list, the two projects with blurbs, the contact links. It is factual, specific and dated; it is the raw material for `/work/[slug]` case studies and `/cv`.
- **The voice in the About copy**: "I lean toward boring, well-instrumented code: the kind that wakes up healthy on Monday morning" and "a little bit of caching where it earns its keep" read as a person, not a template. Keep the plain-spoken, slightly dry tone; drop the costume labels around it.
- **Fraunces as a display face**: the huge set name at 152px is the one genuinely confident typographic move on the page. Keep large display type for the name (one face, one style, no italic switch).
- **The dark, warm ground** (`#0a0907`) as an option, if the accent is re-chosen away from the cream + terracotta pairing.
- **Personal signals**: the memoji (only real picture), the live Spotify "now playing" widget (a real "live thing" that differs per visit; good seed for `/now`), the ⌘K command palette as a power-user affordance (fix its semantics, see below), the Available-for-work signal (as plain text).
- **Wiring to preserve**: section ids `intro`, `about`, `work`, `stack`, `projects`, `contact` (used by Nav and CommandPalette), `cmdk-toggle` window event, `/api/spotify`, StructuredData JSON-LD, sitemap/robots/manifest/OG image routes.

## Accessibility issues

### CommandPalette (app/components/CommandPalette.tsx)

Probed with the palette open (raw/cdp-probes.txt): focused element is a plain `INPUT type=text` with `role=null, aria-expanded=null, aria-controls=null, aria-activedescendant=null, aria-label=null`; `[role=dialog]`: none; `[aria-modal]`: none; `[role=listbox]`: none; `[role=option]`: 0; `[aria-selected]`: 0; live regions: 0.

1. Not a dialog: the overlay (line 206) has no `role="dialog"`, `aria-modal="true"` or accessible name. Screen readers are not told a modal opened.
2. Input has no label (line 221-241); placeholder only. No combobox pattern: arrow-key "active" item (line 227-232) is purely visual, so screen-reader users hear nothing as they arrow through results. Needs `role="combobox"` + `aria-controls` + `aria-activedescendant`, list `role="listbox"`, items `role="option"` + `aria-selected`.
3. No focus trap: Tab leaves the palette into the page behind; background is not `inert`.
4. Focus is not returned to the trigger (Nav ⌘K button) on close.
5. Toast "email copied to clipboard" (line 292-298) has no `role="status"`/`aria-live`, so the copy result is not announced.
6. Result count "N commands" is not announced on filter change.
7. `focus:outline-none` on the input (line 239) with no replacement; `[role=dialog]` backdrop closes on click only.
8. Glyphs "→ ↗ ·" and "↵" hints are read aloud as symbols (not `aria-hidden`).
9. The ⌘K trigger is `hidden md:inline-flex` (Nav.tsx:82); on phones the palette is unreachable except by keyboard.

### CustomCursor (app/components/CustomCursor.tsx)

1. **Ignores `prefers-reduced-motion`**. With reduce emulated: `html.cursor-none` class present, both cursor elements rendered, and the lerped `requestAnimationFrame` loop (line 52-68) keeps running. The only check is `(pointer: fine)` (line 15).
2. **Hides the native cursor** globally (`cursor: none !important` on `html.cursor-none *`, globals.css:245-246), including over text inputs (no I-beam) and for users with OS-enlarged or high-contrast cursors.
3. Uses `mix-blend-difference` and a 0.18 lerp lag, so the visible pointer trails the real one (pointing-accuracy problem for motor-impaired users).

### Other

- **Zero `:focus-visible` rules** in any loaded stylesheet (CDP count: 0); no custom focus styles in components. Keyboard focus relies on UA defaults, which glass/pill backgrounds partly obscure.
- Reduced-motion block (globals.css:323-333) misses: the Sigil `spin 24s` inline animation (Hero.tsx:92; probe shows `spin running` under reduce), the TiltCard 3D tilt, the Nav `transition-all` scale, the Terminal typing effect, and CustomCursor.
- `.anim-fade-up` hero content starts at `opacity: 0` (keyframes `both`), visible only once CSS animation runs.
- `<h1>` contains the role eyebrow, name and tagline in one element (16px measured h1 per inspector); heading outline is noisy.
- Contrast 3:1 on experience dates and other `text-ink-dim` text; 40 text blocks under 13px; body 14px.
- Decorative "●" dots and "///" are inside text and read aloud.
- Covered text: project titles hidden under the fixed header at one scroll position.

## Anti-references for the redesign (do not reproduce)

- Blurred gradient blobs, grid/noise/scanline/vignette backdrops, any ambient FX layer.
- Glass panels / `backdrop-filter` cards, floating pill nav, glow text, pulse rings, glow hover rings.
- Eyebrows and kickers (`///`, `01 —— PROFILE`, `proj.01`), tracked uppercase mono micro-labels, index numbering.
- One italic or coloured/underlined accent word in a roman heading.
- Fake terminal window with traffic-light dots; fake "status: online"; "v.2026".
- Invented stats ("∞ prod releases", "3+" as a decorative tile). Real facts only, stated in prose.
- Dev-cosplay section titles (README, payload, artifacts, in the chamber, field reports, all bytes reserved). Use plain names: Work, Experience, Stack, Contact (and their Turkish equivalents).
- 3D tilt cards, HUD corner brackets, rotating dashed rings, custom cursors.
- Cream + terracotta assistant palette, leftover lime glows; three typefaces; 14 font sizes; mono as a body voice.
- Gradient hairline dividers and 1px outlined boxes as the main way to separate content.

## Numbers to beat (after)

| Metric | Before |
| --- | --- |
| Hallmark sloplint (static) | 31 FAIL, 1 REFLEX, 3 WARN |
| taste-skill inspect | 17 FAIL, 10 WARN |
| Typefaces / font sizes | 3 / 14 |
| Body size | 14px |
| Real pictures | 1 |
| `:focus-visible` rules | 0 |
| Reduced-motion: custom cursor active | yes |
| Command palette ARIA roles | none |

## Files in this folder

- `audit.md` (this file)
- `home-390.png`, `home-768.png`, `home-1440.png`: full-page captures
- `command-palette-1440.png`: palette open, 1440 viewport
- `taste-inspect/`: inspector fold and page screenshots at 1440/768/390, `report.json`
- `raw/hallmark-sloplint.txt`, `raw/taste-inspect.txt`, `raw/cdp-probes.txt`: unedited tool output
