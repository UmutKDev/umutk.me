# Product — umutk.me

Personal site of Umut Kızıloğlu, a full-stack developer in Bursa, Türkiye.

## Who it is for
- Recruiters and engineering managers (TR and global) deciding whether to reach out.
- Prospective clients looking for a developer for a web product.
- Peer developers curious about the work, the stack and the setup.

## What it must do
1. Say who Umut is and what Umut builds in the first screen, in the visitor's language (TR or EN).
2. Prove it with real, dated work: case studies, experience, stack. No invented numbers.
3. Make contact the easiest next step; make the CV one click away (HTML + PDF).

## Surfaces and modes
| Route | Mode | Purpose |
|---|---|---|
| `/{lang}` | Persuade | Identity, selected work, experience, contact |
| `/{lang}/work/[slug]` | Experience | One project: problem, role, decisions, outcome |
| `/{lang}/now` | Read | What Umut is doing this month; now playing |
| `/{lang}/uses` | Read | Hardware, editor, stack |
| `/{lang}/cv` | Read / print | Printable CV, source of the PDF |

## Personality features (kept, redesigned)
⌘K command palette, terminal, custom cursor, Spotify now-playing. All optional layers: keyboard-accessible, reduced-motion aware, never hiding content from the server-rendered HTML.

## Constraints
TR + EN with hreflang; Next.js 16 App Router, Tailwind v4; Lighthouse mobile ≥ 95; WCAG 2.2 AA.
