# Design: umutk.me

The locked system. Every Hallmark and impeccable run reads this first and every page shares it. Change it on purpose; the file is the rule.
Source mock: `.design/directions/a/` (direction A, chosen 2026-10-30). Refreshed from shipped code after M6 (home, case studies, /now, /uses, /cv).

## System
- Genre: modern-minimal
- Shape of the first page: Manifesto (Banner hero, search-led nav, letter-close footer)
- Theme: Console, dealt 2/3 (seed `personal-umut-full-stack-developer-cabc·6c0743df·2026-10-30·r0`), colourway graphite
- Axes: dark/grotesk-sans/chromatic-amber · posture: restrained
- Idea: a career kept as a versioned record; each role is a diff of what changed.

## Tokens
`app/styles/tokens.css` is the source of truth (unlayered, so it beats the `@theme inline` copies in `app/globals.css`). The roles:
```css
:root {
  --color-paper: oklch(17% 0.008 250);  --color-paper-2: oklch(21% 0.009 250);  --color-paper-3: oklch(13.5% 0.007 250);
  --color-ink: oklch(95% 0.005 250);  --color-ink-2: oklch(83% 0.008 250);  --color-muted: oklch(71% 0.01 250);
  --color-rule: oklch(31% 0.01 250);  --color-rule-2: oklch(42% 0.012 250);
  --color-accent: oklch(82% 0.15 80);  --color-accent-ink: oklch(18% 0.04 75);  --color-accent-soft: oklch(29% 0.05 80);  --color-focus: oklch(82% 0.15 80);
  --color-cool: oklch(77% 0.12 245);  --color-cool-soft: oklch(29% 0.05 245);
  --color-ok: oklch(76% 0.15 150);  --color-ok-soft: oklch(24.5% 0.03 150);  --color-bad: oklch(70% 0.17 25);  --color-bad-soft: oklch(24.5% 0.035 25);
  --font-display: "Host Grotesk", ui-sans-serif, system-ui, sans-serif;  --font-body: var(--font-display);
  --font-outlier: "Atkinson Hyperlegible Mono", ui-monospace, monospace;
  --radius-card: 10px;  --radius-pill: 6px;  --rule-hair: 1px;  --shadow-card: none;
  --tracking-display: -0.03em;  --display-weight: 500;
}
```
Spacing (`--space-3xs`…`--space-4xl`), type scale (`--text-xs`…`--text-display`, fluid `clamp()` heads), easings, durations, z-index and layout (`--container: 1440px`, `--gutter: 64px` → 24px under 60rem → 16px under 40rem, section gaps likewise) live in the same file / `globals.css`.
Tailwind utilities exist for paper, ink, muted, rule, accent, cool(-soft), ok, bad, `font-mono` (= the outlier) and the two radii. `--color-error` / `--color-success` are scaffold leftovers with no consumer.
Depth is borders, not shadows: `paper-3` is the sunken ground (footer, terminal, search pill, diff rows), `paper-2` the raised card.

## Colour roles
- Amber (`--color-accent`) means the person: Umut, the primary action. One amber fill per screen.
- Cool blue (`--color-cool`) means an instrument: versions, dates, links to records, the selected state.
- Green and red appear only as diff tints (`+`/`-` glyphs, `ok-soft`/`bad-soft` was/now cells). Never decoration.
- The selected version tab and palette option are a `cool-soft` tint, not a second fill; Contact is the only amber fill.

## Type
- Host Grotesk 500 for heads, 400 for reading; body 16px or more; heads one weight, one colour.
- Atkinson Hyperlegible Mono only for what was measured: dates, version ids, durations, code, the terminal. Never for labels or nav.
- Labels, table heads and tags: body face, a step smaller, sentence case, untracked. No eyebrows, no italic words in heads.
- Fonts load via `next/font/google` with `latin` + `latin-ext` (Turkish: ı ş ğ ç ö ü İ); `globals.css` repoints the token faces at the hashed `next/font` variables.
- The `.m` class is the mono instrument style: `--text-sm`, tabular + slashed-zero numerals.
- Measure: `h1` 20ch, `h2` 30ch, `h3` 40ch, `p` 65ch; heads `text-wrap: balance`, prose `pretty`.

## Controls
- Primary: amber fill · `--radius-pill` · 48px high (`min-h-12`).
- Secondary: graphite fill with `--color-rule-2` outline · same radius and height.
- Small controls (search pill, version tabs, palette/terminal buttons): 44px (`min-h-11`), pill radius.
- Every control has hover (colour only), active (`translate-y-px`), focus-visible (global 2px `--color-focus` outline, offset 2px, instant), disabled states.
- Text links: inherit colour, 1px underline; hover goes amber (person/contact) or cool (records, case-study links).

## Motion
- Character: severe. CSS only: colour transitions (`--dur-short`, `--ease-out`), 1px press, the cursor ring's opacity fade. No reveals, no View Transitions, no `motion/react` shipped.
- Under `prefers-reduced-motion: reduce` every animation and transition ends at once (global rule in `globals.css`).

## Personality layers
- ⌘K palette: the nav's search pill (`SearchPill`) opens it on click, ⌘K, or Ctrl+K outside text fields; native `<dialog>`, combobox + listbox; route, language and "open terminal" commands. `CommandPalette` is **statically imported** (≈1.5 KB gz; a lazy chunk dropped keys typed right after ⌘K). The pill is invisible until hydrated.
- Terminal: lives at `/now#shell` (`<section id="shell">`), mono on `paper-3`; server HTML already holds the `help` output. The palette's "open terminal" sets a one-time `sessionStorage` marker so only that path focuses the input. Output appears at once, no typing effect.
- Custom cursor: a 32px ring trailing the pointer, only under `(pointer: fine) and (prefers-reduced-motion: no-preference)` and mouse input; the native cursor always stays; the ring hides on any keydown.
- Spotify now-playing: a record row on `/now` from `/api/spotify/now-playing`; renders nothing while loading or when unconfigured, then playing / last played / off / error.
All are client islands; content stays in server HTML.
- Version picker (home): server renders every diff panel; before hydration only the newest shows, without JS all show and the picker hides.

## Variants
- Case study `/work/[slug]`: the diff panel becomes the decision log (before / after per decision). Opens on a page title, not a hero.
- `/now`, `/uses`: Read pages of `.rows` (label 4 cols / value 8 cols at ≥60rem, stacked below).
- `/cv`: same tokens on screen. Print (`@page A4`, 16mm/18mm margins) swaps tokens to white paper, near-black ink, darker cool, pt-sized type and mm spacing; hides everything but `<main>` (nav, footer, palette, cursor, `.cv-download`); keeps the 40mm label column; `break-inside: avoid` on entries and rows. TR/EN PDFs in `public/cv/`.
- OG images (`app/lib/og.tsx`): Satori cards with hex approximations of paper/ink/accent and Host Grotesk 500 fetched from Google Fonts.

## Waivers and known exceptions
- Hallmark waive 44c: `/work/[slug]`, `/now`, `/uses` open on a title, not a hero.
- Hallmark waive 77: case study and /now are one column of record rows; content decides section count.
- Hallmark waive 79: the space under the title on /now and case studies is the record and shot slot; no filler copy.
- Hallmark dismissed F4: the cool-tint selected tab is a state, not a second filled action.
- sloplint 58 (80 words a screen) fails on `/cv` by design: the record text is the owner's and is not cut (noted in `app/[lang]/cv/page.tsx`).
- Content gaps: no project screenshots, no education/languages on the CV yet.

## Exports
`app/styles/tokens.css`; Tailwind v4 `@theme inline` mapping, responsive gutter overrides, base/components layers and print rules in `app/globals.css`.
