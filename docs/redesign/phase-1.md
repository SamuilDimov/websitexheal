# Website redesign — Phase 1: decide and tokenise

Date: 2026-09-03
Branch: `redesign/phase-1-tokens`
Brief: `website-style-references/29-xheal-website-redesign/xheal-redesign-brief.html`

Phase 1 changes nothing about the page structure. It settles the four open
decisions, adds the light token set beside the existing dark system, moves the
type scale to the approved weights, removes the icon font and unused media, and
aligns the brand kit with the site. Phases 2 to 5 (frame, middle sections, dark
chapter and motion, inner pages) build on these tokens.

## Decisions

| Decision | Outcome |
| --- | --- |
| Type family | Manrope stays. Weights 400–600 for everything; 700 only for inline emphasis until components are rewritten; 800 no longer loaded. PPNeueMontreal retired and its woffs removed. Brand kit updated. |
| Ground | Light site with one dark chapter (Digital Twin) and a dark closing download. Applied in phase 2 by setting `data-surface="light"` on `<html>`. |
| Headline | Default to "See it before you feel it." A/B against the current headline for two weeks after launch. Applied in phase 2 with the hero. |
| Rating claim | "Rated 5.0 on the App Store" is held until the rating count clears 100. The hero leads with parameters, domains and standards. Applied in phase 2 with the hero; the `aggregateRating` block in the homepage JSON-LD comes out at the same time. |

## What changed in this phase

### Tokens (`src/app/[locale]/globals.css`, `brand/xheal-design-system.json` v2.1)

- New root tokens: `--ground`, `--ground-2`, `--hairline`, `--ink`, `--ink-2`,
  `--ink-3`, `--accent`, `--accent-ink`, `--accent-tint`, `--hero-wash`,
  `--radius-panel` (32 px), `--font-mono-stack`.
- `[data-surface="light"]` remaps every semantic v2 token (backgrounds,
  surfaces, text, borders, hero gradient) to the light set.
  `[data-surface="dark"]` restores the v2 dark values inside a light page.
  Nothing uses either attribute yet, so the rendered site is unchanged except
  for type weight.
- Tailwind theme gains `ground`, `ground-2`, `hairline`, `ink`, `ink-2`,
  `ink-3`, `accent`, `accent-ink`, `accent-tint` colours, `font-mono` and
  `rounded-panel`.
- Shadow tokens stay defined for app UI mock-ups and are marked as not for
  marketing surfaces. Existing shadow usages are removed in phases 2–3 with the
  components that carry them.

### Type scale

- `.t-display1` → `clamp(40px, 5vw, 68px)`, weight 600, `-0.03em`.
- `.t-display2` → `clamp(30px, 3.4vw, 48px)`, weight 600, `-0.025em`.
- `.t-h1`–`.t-h4` → weight 600, fluid sizes, relative tracking.
- New: `.t-lead`, `.t-eyebrow` (mono, uppercase, `0.08em`), `.t-data` (mono,
  tabular), `.t-numeral` (`clamp(72px, 10vw, 144px)`).
- `.t-overline` now shares the mono eyebrow style. Buttons are weight 600.
- The mobile override block for display sizes is gone; the clamps handle it.
- Fonts: Manrope 400/500/600/700 with latin + cyrillic, IBM Plex Mono 400/500
  with latin + cyrillic, both via `next/font` (`--font-manrope`,
  `--font-plex-mono`).

### Icons

- `MaterialSymbolsRounded-Regular.ttf` (1.16 MB, unsubsetted) is removed.
- `src/components/ui/Icon.tsx` renders inline SVG from `lucide-react` and maps
  the Material glyph names still used in data files, messages and feature pages
  onto Lucide glyphs. Unknown names render a circle and warn in development.
- All 44 icon-font usages across 20 files now go through `<Icon name size />`.
  Sizes match the font-size each glyph was set at.

### Media

- `public/videos/xheal-band.mp4` (6.0 MB, referenced by nothing) removed.
- `xheal-v2-hero.mov` / `.mp4` / `.webm` stay for now; `HeroVideo.tsx` serves
  the `.mov` (HEVC alpha) to Safari and the `.webm` elsewhere. They are replaced
  by the new 4-second, play-once hero capture in phase 2.
- `npm run validate:export` now fails if a font or video in `out/` is
  referenced by nothing in the export, and lists unreferenced images as
  warnings.

### Brand

- `brand/brand-kit.md` section 10 rewritten: Manrope + IBM Plex Mono, light
  surface colours, dark surface scope, flat-surface rule. File re-encoded as
  UTF-8 (it was cp1252).

## Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run build`, `npm run validate:export`
  all pass on this branch.
- Homepage transfer drops by the icon font (1.16 MB) with no visual change
  beyond display weight 800 → 600.

## Next: Phase 2 (frame)

Nav capsule with scroll state, hero with the new video and headline, works-with
strip, closing and footer. First commit of phase 2 sets `data-surface="light"`
on `<html>` in `layout.tsx` and wraps the AI section and footer in
`data-surface="dark"`.
