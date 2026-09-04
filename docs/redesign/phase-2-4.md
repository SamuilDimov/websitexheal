# Website redesign — Phases 2 to 4: frame, middle, dark chapter

Date: 2026-09-03
Branch: `redesign/phase-1-tokens` (continues from phase 1)
Brief: `website-style-references/29-xheal-website-redesign/xheal-redesign-brief.html`

The homepage is rebuilt on the light surface. Eleven blocks, one dark chapter,
four App Store placements, both locales. Inner pages inherit the light tokens
and the new nav and footer; their own templates are phase 5.

## Frame (phase 2)

- `layout.tsx` sets `data-surface="light"` on `<html>`. Dark sections opt back
  in with `data-surface="dark"` (Digital Twin chapter, closing, footer, the
  App Store tile in the bento).
- `Navbar.tsx`: fixed transparent shell with a centred capsule; after 48 px of
  scroll the capsule gains card white at 82 %, a 12 px blur and a hairline.
  An IntersectionObserver switches the capsule to the dark token set whenever
  a `data-surface="dark"` section sits under it. Links: Features, How it works,
  Blog, About; locale switch (EN/BG); indigo "Get the app" pill with the Apple
  mark. Mobile: logo + pill + menu button, full sheet with links, locale and CTA.
- `HeroSection.tsx`: mono eyebrow, "See it before you feel it.", one-sentence
  lead, App Store badge + "See how it works", compliance line, proof strip
  (250+ parameters · WHO/ADA/EASD · 5 minutes). Copy sits on a full-bleed
  hero wash (it was boxed in a radius-32 panel until 2026-09-04, when Samuil
  asked for it to run edge to edge); the phone standing on the section's
  bottom edge is the `HeroSequence` canvas (see the hero phone sections below).
- `WorksWithSection.tsx`: Apple Health, Apple Watch, MyChart by Epic, lab
  PDFs, photos of reports, manual logs. Monochrome marks, hairlines above and
  below.
- `Footer.tsx`: dark closing ("Ready when you are.", badge, QR on desktop,
  phone) and a footer with four sitemap columns, a one-field newsletter
  (`#sign-up` kept), socials, the compliance disclaimer, and the wordmark at
  full container width.
- `APP_STORE_URL` centralised in `lib/site.ts`.

## Middle (phase 3)

- `ProblemSection.tsx`: "Normal tests. Real symptoms." Three lead + sentence
  columns on ground-2.
- `HowItWorksSection.tsx`: three steps scroll past a phone pinned with CSS
  `position: sticky`; an IntersectionObserver on a 20 % band around the
  viewport centre picks the active step and crossfades the screen
  (timeline → Health Awareness → flare-up insights). Under 768 px each step
  carries its own phone. No GSAP was needed for this; `gsap` is installed for
  the scrubbed sequences if they are added later.
- `SignalsSection.tsx`: the three real insight cards (sleep pattern, early
  warning, lab trend) as components with mono category and data line. Snap
  row on mobile.
- `FeatureBentoSection.tsx`: nine features in a 12-column bento. Two large
  tiles (Flare-Up Trigger Patterns, Chat With Your Health) carry a phone crop;
  seven compact tiles carry icon, title and one line; a dark App Store tile
  closes the grid. Replaces `FeatureScrollShowcase` (6,657 px).
- `ProofSection.tsx`: numerals (250+, 6, ~5,000 with context), standards line,
  and a testimonial `Marquee` with initials instead of portraits. Pauses
  off-screen and on hover; plain scroller under reduced motion.
- `FaqSection.tsx`: five objections from the brand kit as native
  `<details>`, with FAQPage JSON-LD.

## Dark chapter (phase 4)

- `AISection.tsx` (`data-surface="dark"`): heading, lead, a pinned phone
  whose screen is the real chat exchange rendered as UI (`ChatTranscript.tsx`,
  messages reveal once on entry), and three cards that scroll past: sees
  everything at once, proactive check-ins, specialist-ready summaries.
  Standards line and badge close the chapter.

## Removed

`StickyTabSection`, `WhatYouGetSection`, `FeatureScrollShowcase`,
`FeatureShowcaseController`, `TestimonialsSection`, `OutcomeCarousel`,
`OnboardingChecklist`, `VerticalDrum`, `InsightPreview`,
`IntegrationLogosStrip`, `ApplauseLabBadge`.
`FeatureImageSlideshow` and `FeatureDeviceFrame` remain for the feature-page
template; `MedicalStandardsBadge` and `ComplianceBadges` were retired in
phase 5 (see below). `HeroVideo` and the
v2 hero video encodes were removed with the move to a frame sequence. The homepage JSON-LD
no longer carries `aggregateRating`; the feature-page hero no longer shows
"Rated 5.0".

## Copy

New namespaces `Problem`, `Signals`, `Bento`, `Closing`, `Proof`, `FAQ`; new
keys in `Navbar`, `Hero`, `Integrations`, `Footer`, `Newsletter`, `HowItWorks`,
`AI`. English and Bulgarian have key parity. Bulgarian copy is a first draft
for review.

## Hero phone sequence

The hero phone is a scroll-driven frame sequence on a canvas. It was first
built from an After Effects alpha export and is now rendered in Blender; the
AE route is kept below because the pipeline and the measurements still apply.

Superseded source: `~/Documents/hero-alpha`, 275 PNG frames, 1080 x 1920 RGBA
straight, 60 fps.

- `scripts/build-hero-sequence.mjs` converts it. It detects the phone's
  bounding box from the alpha channel (730 x 1160 here), keeps every third
  frame of the intro and exit, and writes WebP with alpha at two widths plus a
  separate hold still, with a `manifest.json`. Output is clamped to the source
  width, since upscaling at build time adds bytes and no detail.

  ```
  node scripts/build-hero-sequence.mjs ~/Documents/hero-alpha \
    --step 3 --keep 0-69,204-256 --hold 69
  ```

  Result: 42 frames at 730 x 1160, 849 KB desktop and 580 KB mobile, plus a
  37 KB hold still. 1.7 MB in the export.

- Beat boundaries were measured from the render (alpha motion energy per
  frame), not assumed: the phone settles at source frame 69, holds to 206, and
  leaves by 254. The build script records them in the manifest as `beats`, and
  the component reads them, so a re-render with different timing needs a new
  `--keep` and no code change.

- `components/ui/HeroSequence.tsx` draws the frames on a canvas. The intro
  plays once on load (1.0 s, power2.out) so a visitor who never scrolls still
  sees the screen face them; scrolling the hero out scrubs the exit after a
  15 % hold; reduced motion shows the hold frame only. GSAP ScrollTrigger
  drives the scrub, and the easing toward each target frame lives in the
  component's own rAF loop.

- The resting pose ships as its own still and is drawn whenever the sequence
  settles on the hold frame. It is what a visitor looks at for most of the
  page, so it gets the resolution budget; motion frames flash past in ~20 ms.

### Why the After Effects source was replaced

The AE mockup had a hard resolution ceiling. `iPhone 15 Pro Max` is a
1920 x 1080 precomp scaled to 151% inside the 1080 x 1920 `Render` comp, so the
phone rasterised at roughly 443 x 734 and was then upscaled — about 2x in total
once the browser's device pixel ratio is counted. Measured at 3x magnification,
that left a stair-stepped silhouette and soft screen text. Raising it means
enlarging the precomp, which shifts its internal camera framing, and even then
a flat PSD caps the edge quality.

Two problems were diagnosed at the same time, and one was ours: the intro was
playing 24 frames over 1.4 s, which is 17 fps and reads as stepping. It now
runs 35 frames over 1.0 s.

## Hero phone in 3D (`scripts/hero-phone.blend.py`)

The phone is now modelled rather than mocked up, which removes the ceiling
entirely. The script runs Blender headlessly and needs no GUI work:

```
/Applications/Blender.app/Contents/MacOS/Blender --background \
  --python scripts/hero-phone.blend.py -- \
  --screen ~/Documents/xHeal/BusinessCards/Logo/DASHBOARDWEB.png \
  --out ~/Documents/hero-3d --res 1800x3200 --samples 128 \
  --save-blend ~/Documents/hero-phone.blend
```

- The device is built in layers the way the real one is: a titanium frame
  (metallic, anisotropic, small edge bevel), a black cover glass inset by the
  frame with the display inset again inside it, a matte frosted back glass,
  the camera plateau with three lens rings and lenses and a flash, and the
  action, volume and power buttons on the edges. All geometry comes from
  bmesh rounded-rectangle profiles and cylinders, so corners and edges are
  exact rather than modifier approximations.
- Proportions follow the screenshot's own aspect ratio, so the UI is never
  stretched: display width is fixed at 69.6 mm, height follows the image, and
  glass border and frame are added outward. The screen texture is
  `DASHBOARDWEB.png` at 2412 x 5136, twice the resolution of the earlier
  `strian.png`; its alpha is multiplied into the emission so transparent
  corners read as black glass.
- The display is a **flat** face with a **pure emission** shader. Both were
  corrections from test renders: a Principled surface reflected the studio
  world across the whole screen and veiled the UI grey, and a screen with
  thickness glowed along its side walls as a rim inside the bezel. Colour
  management is Standard, not AgX, so the screenshot's colours survive.
- The environment is a vertical gradient (dark below, bright above) that only
  appears in reflections, which is where metal and glass need it, plus a
  four-light rig with a low kicker for the back glass when the phone faces
  away.
- The intro is a whole 360° flip over 120 source frames (2.0 s): the phone
  rises from below the frame while turning, so the back with the camera
  plateau and both edges pass the camera before it eases out to face front.
  Beat lengths and the flip angle are CLI flags (`--flip`, `--intro-frames`,
  `--hold-frames`, `--exit-frames`); the script prints the resulting `--keep`
  and `--hold` for the build step. Defaults: intro 0–120, hold 120–256, exit
  256–308, last frame 326. The web component plays the intro at the render's
  own speed (introEnd / 60 fps), read from the manifest.
- Film is transparent, output is PNG RGBA, and `--frame N` renders a single
  frame for a fast look-see. `~/Documents/hero-phone.blend` is saved for
  hand-tweaking.

### Result

```
node scripts/build-hero-sequence.mjs ~/Documents/hero-3d \
  --step 2 --keep 0-120,256-308 --hold 120 --crop 1494:2364:186:286
```

| | After Effects | Blender, 360° flip |
| --- | --- | --- |
| Phone native width | 730 px | 1378 px |
| Browser scaling | ~1.3x upscale | 0.7x downsample |
| Silhouette | stair-stepped | clean |
| Intro | 80° turn, 17 fps | whole flip, 61 frames at 30 fps over 2.8 s |
| Desktop weight | 849 KB | 1,570 KB (+ 89 KB hold still) |

The explicit `--crop` is deliberate. Auto-crop returns the full union of the
phone's travel (1378 x 2856 here), which at 480 CSS px would make the canvas
about 1,000 px tall and break the hero. The crop clips the bottom to a 0.632
aspect, reproducing the framing where the device runs off the panel edge and
holding the canvas at 760 px, so the layout is untouched. Height for a new
render is `width / 0.632`.

The intro plays at 1.4x the render's own length with `power1.out` and a 0.35 s
beat before it starts, so the flip is seen rather than finishing during
hydration; the earlier 1.0 s `power2.out` version was measurably over before
the page had settled. Motion frames are written at WebP quality 80 and the resting still at 92,
and both get a mild unsharp (0.55) after the lanczos downscale. Measured at
the exact on-screen scale of a Retina display, the screen text in the hold
still and in a motion frame now scores at or slightly above the source
screenshot (sobel mean 34.3 / 35.3 against 31.8 for the source), where the
first web pass had scored below it. The EEVEE film filter is set to 1.0 px
(default 1.5) for future renders, though a test showed it made little
difference at this scale. The canvas draws with `imageSmoothingQuality:
"high"`. The remaining ceiling is the layout itself: the display is about
440 CSS px wide, so UI text is small by design; making the phone larger on the
page is the only lever left for perceived sharpness.

## Inner pages (phase 5)

Date: 2026-09-04. Every non-home template now opens the way the homepage
does and carries no dark-era decoration.

- `ui/PageHeader.tsx`: shared inner-page header. Mono eyebrow, left-aligned
  display heading (`display1`, or `display2` for Guides), one lead sentence,
  optional children row, inside `x-container` and clear of the capsule nav.
  Used by About, Blog, blog posts (eyebrow = category, the "new" badge is
  gone), Support, Guides, Team, Terms, Privacy and Cookie policy. The centred
  `bg-radial-glow` hero blocks are gone; the class is kept as a no-op.
- `ui/ProofLine.tsx`: standards and compliance as mono text marks with indigo
  dots. Replaces the shield and seal imagery (`MedicalStandardsBadge`,
  `ComplianceBadges`, both deleted) in the feature-page hero and trust block.
- About: the animated DNA helix (`DnaTimeline.tsx`, ~360 lines of `.dna-*`
  CSS) is replaced by `about/MilestoneTimeline.tsx`, a vertical rail with mono
  dates on the left and cards on the right. Team and advisors sections are
  left-aligned under eyebrows. New keys: `About.eyebrow`, `timelineEyebrow`,
  `timelineHeading`, `teamEyebrow`, `advisorsEyebrow`, plus `eyebrow` in
  `Blog`, `Support`, `Guides`, `Team`, `Legal`, `FeatureLanding` (en + bg).
- Feature template (`FeatureLandingPage.tsx`, `ComparisonSection.tsx`,
  `FeatureDeviceFrame.tsx`): radial glow, dot matrix, pulsing circle, phone
  glow and float animation removed; every section sits on
  `x-container x-section` with left-aligned `t-display2` headings (the closing
  CTA stays centred); step-number and comparison-card shadows dropped; the
  device frame keeps only a hairline ring. Section headings whose catalog
  strings carry `<accent>` markup render it plain through a `plain()` helper
  in each feature page, so the accent phrase appears once per page, in the
  hero. Passing them through `t()` throws `FORMATTING_ERROR`.
- Blog: `BlogCard` loses the "clinical scanner" treatment (scan sweep, node
  pulse, teal glow, ~230 lines of CSS and four keyframes). Category and
  reading time are one mono `t-data` line; titles use `t-h4`, the featured
  card is a two-column image + text card with `t-h2`. Two posts pointed at
  `/images/xheal-v2-hero-poster-v6.png`, which never existed in the repo;
  they now use `blog-default-cover.avif`.
- CSS: every `box-shadow` and `drop-shadow` on marketing surfaces removed
  (chat slider, feature showcase, launch sweep, feature card hover). The two
  survivors are hairline rings: `.phone-frame` and the timeline dot's
  ground-coloured ring.
- Guides: `GuideCard` hover shadow and the mobile sidebar toggle's
  `shadow-lg` removed.

Verified in the dev server at 1440 and 390 px for about, blog, a post,
support, guides, a guide article, team, terms and the chat feature page: no
console errors, no broken images, no non-ring shadows. `npm run build` and
`validate:export` pass (151 HTML files).

## Audit pass (phase 5b)

Date: 2026-09-04. A playwriter sweep of 25 routes (every template, all nine
feature pages, the 404, three Bulgarian pages) at 1440 and 390 px checked
console errors, broken images, horizontal overflow, heading order, shadows,
centred display headings, weights of 700 and up, and text under 12 px.
Findings and fixes:

- Heading order skipped a level on Blog (h1 to h3), Guides (h2 to h4) and
  every feature page (h2 to h4 in the comparison table). Blog cards are now
  `h2`, guide cards and comparison rows `h3`.
- Four templates still used the old `max-w-[1440px] px-10` wrapper: the
  cross-links section, the guide article, the reports page's extra section
  and the locale 404. All sit on `x-container` now, and the cross-links
  heading is left-aligned like the rest.
- Weight 700 was still declared in seven places (`.rich-text h3/h4/strong`,
  chat-slider eyebrow, the two legacy buttons, `.badge`) and as `font-bold`
  on three comparison chips. All are 600 or the mono `t-data` voice now, so
  the type scale is 400–600 everywhere, as the brief asks.
- The feature hero accent used the pale dark-ground tint
  (`text-xbrand-light`) on a light ground. It is brand indigo now on all nine
  pages; the comparison table's highlight column and link hover follow.
- One hover shadow survived on the Guides CTA button; removed.
- The static `out/404.html` was still the dark site (`#000e1b` card) and
  overflowed by 9 px on mobile because its inline styles lacked
  `box-sizing`. It now uses the light palette, a mono eyebrow and a
  left-aligned card. The locale 404 uses the inner-page header grammar.

Left as is, on purpose: the closing CTA on feature pages stays centred; the
chat card text inside the homepage phone is 11.5 px because it reproduces
the app UI at device scale. The one intermittent hydration warning seen on
the team page did not reproduce in three reloads. Note that Turbopack served
the stale `.rich-text h3` weight after this edit; the production CSS is
correct.

## Page dome (`ui/DotDome.tsx`)

Date: 2026-09-04. Samuil pointed at tranquil-495tmg.peachworlds.com, whose
hero has a Three.js dome of glowing particles behind the copy, and asked for
something similar; then asked for it denser and running through the whole
page rather than the hero only. The reference is a `pwb-scene` canvas
(three r170, a `model.glb` plus an alpha map, additive cyan on black).

Ours is the light-ground reading of the same idea, without the library:

- A fixed, full-viewport 2D canvas mounted once in the homepage `page.tsx`,
  inside a `.home-dome` wrapper with `isolation: isolate` so the canvas can
  sit at z -1: above the body ground, below every section. Light sections
  go translucent under `.home-dome` (`section.bg-xbg` transparent,
  `section.bg-xbg-2` at 62 % of ground-2, the hero wash fading to clear), so
  the lattice runs under all of them. Dark sections keep opaque surfaces and
  simply cover it.
- It draws short dashes on latitude rings of a sphere whose centre sits just
  below the viewport (`cy = 1.06 × height`), so the upper cap rises behind
  the content with the horizon visible left and right. Radius is
  `max(0.66 × height, 0.56 × width)`; ring spacing 9 px on desktop, 12 on
  phones (roughly 35k points, about half drawn per frame after culling).
- Perspective is a hand-rolled projection (camera at 2.6 radii). Volume comes
  from opacity, not bloom: front-facing dashes reach 0.5 alpha, the
  silhouette 0.07, back faces vanish; a quadratic weight toward the horizon
  keeps the apex quieter than the base. Brand indigo only.
- Motion: scroll drives the pose, and the poses are anchored to sections
  rather than page fractions, so the shape answers the content beside it and
  survives copy changes. Each key names a section (`KEYS` in the component)
  and is reached when that section's top or centre meets the viewport's;
  poses ease with smoothstep between keys. Besides centre, radius and tilt,
  a pose carries `squash` (scale of the unit sphere per axis: globe → disc)
  and `band` (the latitude range drawn, with soft edges: dome, ring, bowl):
  a horizon dome under the hero; a flat disc seen from above under "Normal
  tests. Real symptoms."; a whole globe behind the How-it-works phone; a
  wide tilted ring around the three Signals cards; a large globe low-left
  under Features; a pass through the centre while the dark chapter covers
  it; a bowl hanging from the top edge behind Proof; a disc from above at
  the FAQ. On top of the pose it idles round its vertical axis (one
  revolution per ~2 minutes) and turns with scroll (one per ~10,000 px).
- Render: front alpha 0.62, 1.6 px strokes, and `filter: blur(1.1px)` on the
  canvas so the dashes read as light rather than ink (Samuil asked for
  "a bit blurred and a bit brighter"). Dashes are bucketed into ten `Path2D`
  objects per frame; measured at 61 fps at five scroll depths at 1440 px.
  It pauses off-screen and in hidden tabs; under reduced motion there is no
  idle spin, but the pose still follows the scroll.
- Layering: the closing and footer live outside the homepage wrapper, and
  their dark background belongs to the wrapper `div` in `Footer.tsx`, which
  was painting under the fixed canvas (non-positioned block backgrounds paint
  before positioned descendants), so the lattice showed over the dark close.
  That wrapper now carries `relative z-[1]` and covers it; the dome ends
  where the closing begins.
- `three` would have added ~150 KB gzipped for a decoration; the component is
  about 220 lines with no dependency. Inner pages do not carry it.

If the dome should carry the reference's glow instead, the dark chapter
(`AISection`, "Digital Twin") is where an additive version would read
correctly; the light surfaces stay flat by the phase-1 rule. Note that
Turbopack served stale CSS for the `.home-dome` rules until `.next` was
cleared and the dev server restarted, the third time this session.

## Nav: mobile controls leaked to desktop

The menu button and the full-screen sheet carried `md:hidden`, but their own
unlayered rules set `display`, which beats a layered Tailwind utility. The
hamburger therefore showed at every width, and tapping it on desktop opened
the mobile sheet over the page. The breakpoint is restated in the same
unlayered block now (`@media (min-width: 48rem)`), so both are gone from
768 px up. Samuil reported "always ending up in the mobile version on
refresh"; a 1440 px window did not reproduce a layout change across reloads,
so this leak is the closest confirmed cause. If it persists, the window
width at load is the next thing to check.

## Known follow-ups

- Dev server: Turbopack served stale CSS after whole-file rewrites of
  `globals.css` twice in this session; `rm -rf .next` and a restart fixed it
  both times. Production builds were unaffected.
- Six domains named in Proof (`Proof.numeral2Note`) are taken from the old
  hero copy; confirm against the app.
