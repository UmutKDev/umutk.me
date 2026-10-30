# Design: umutk.me

The locked system. Every Hallmark and impeccable run reads this first and every page shares it. Change it on purpose; the file is the rule.
Source mock: `.design/directions/a/` (direction A, chosen 2026-10-30).

## System
- Genre: modern-minimal
- Shape of the first page: Manifesto (Banner hero, search-led nav, letter-close footer)
- Theme: Console, dealt 2/3 (seed `personal-umut-full-stack-developer-cabc·6c0743df·2026-10-30·r0`), colourway graphite
- Axes: dark/grotesk-sans/chromatic-amber · posture: restrained
- Idea: a career kept as a versioned record; each role is a diff of what changed.

## Tokens
`app/styles/tokens.css` (ported from `.design/directions/a/tokens.css`) is the source of truth, exposed to Tailwind v4 through `@theme`. The roles:
```css
:root {
  --color-paper: oklch(17% 0.008 250);  --color-paper-2: oklch(21% 0.009 250);  --color-paper-3: oklch(13.5% 0.007 250);
  --color-ink: oklch(95% 0.005 250);  --color-ink-2: oklch(83% 0.008 250);  --color-muted: oklch(71% 0.01 250);
  --color-rule: oklch(31% 0.01 250);  --color-rule-2: oklch(42% 0.012 250);
  --color-accent: oklch(82% 0.15 80);  --color-accent-ink: oklch(18% 0.04 75);  --color-focus: oklch(82% 0.15 80);
  --color-cool: oklch(77% 0.12 245);  --color-ok: oklch(76% 0.15 150);  --color-bad: oklch(70% 0.17 25);
  --font-display: "Host Grotesk", ui-sans-serif, system-ui, sans-serif;  --font-body: var(--font-display);
  --font-outlier: "Atkinson Hyperlegible Mono", ui-monospace, monospace;
  --radius-card: 10px;  --radius-pill: 6px;  --rule-hair: 1px;  --shadow-card: none;
}
```
Spacing, type scale, easings and durations are the scaffold's and live in the same file.

## Colour roles
- Amber (`--color-accent`) means the person: Umut, the primary action. One amber fill per screen.
- Cool blue (`--color-cool`) means an instrument: versions, dates, links to records, the selected state.
- Green and red appear only as diff tints (added / dropped). Never decoration.

## Type
- Host Grotesk 500 for heads, 400 for reading; body 16px or more; heads one weight, one colour.
- Atkinson Hyperlegible Mono only for what was measured: dates, version ids, durations, code, the terminal. Never for labels or nav.
- Labels, table heads and tags: body face, a step smaller, sentence case, untracked. No eyebrows, no italic words in heads.
- Fonts load via `next/font/google` with `latin` + `latin-ext` (Turkish: ı ş ğ ç ö ü İ).

## Controls
- Primary: amber fill · `--radius-pill` · 48px high.
- Secondary: graphite fill with `--color-rule-2` outline · same radius and height.
- Every control has hover, active, focus-visible (2px `--color-focus`, instant), disabled states.

## Motion
- Character: severe. CSS only (`transform`, `opacity`), View Transitions for route changes; no `motion/react`.
- At most one reveal per page; under `prefers-reduced-motion: reduce` everything ends at once.

## Personality layers
- ⌘K palette: the nav's search pill opens it; native `<dialog>`, combobox + listbox, routes and language commands.
- Terminal: lives on `/now` or behind the palette, mono is its material; static fallback without JS.
- Custom cursor: only under `(pointer: fine) and (prefers-reduced-motion: no-preference)`; never hides the native cursor during keyboard use.
- Spotify now-playing: a record row (`now playing`, track, artist, time) on `/now`; loading, empty and error states.
All are client islands loaded after hydration; content stays in server HTML.

## Variants
- Case study `/work/[slug]`: the diff panel becomes the decision log (before / after per decision).
- `/cv`: same tokens; `@media print` switches to paper-white ground with ink-black text.

## Exports
`app/styles/tokens.css` in this project; Tailwind v4 `@theme` mapping in `app/globals.css`.
