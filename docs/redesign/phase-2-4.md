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
  poses ease with smoothstep between keys.
- Shape: every pose names a surface, and all surfaces are built from one
  (latitude, longitude) grid, so between keys the points themselves travel
  from one surface to the next. That is what the reference does: its cloud
  pinches to a point under the dashboard and re-expands as a swirling
  column. Ours: a horizon dome under the hero (sphere, upper band); the whole
  cloud collapsing into a dense needle at "Normal tests. Real symptoms."; the
  needle opening into a twisted funnel beside the How-it-works steps; the
  funnel flattening into a wide lens behind the Signals cards; a large globe
  low-left under Features; a needle again while the dark chapter covers it;
  a bowl hanging from the top edge behind Proof; a tilted ring at the FAQ.
  Ring counts follow cos(latitude) but keep 45 % at the poles so the shapes
  that are wide where the sphere is narrow still have points. On top of the
  pose it idles round its vertical axis (one revolution per ~2 minutes) and
  turns with scroll (one per ~10,000 px). An earlier version only moved and
  clipped a rigid sphere; Samuil rightly said it "still doesn't change shape".
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

## Every mockup is the same live device

Samuil asked for the rest of the mockups to be Blender-rendered GLBs with a
different entrance. They are not separate models: `--bare-screen` exports the
phone with no image on the display — `emissiveFactor` white over a black base,
no embedded texture — and each instance hangs its own screenshot on it as an
`emissiveMap` at runtime. One 161 KB geometry serves the whole site, the
screens stay ordinary cached WebP, and `hero-phone.glb` (418 KB, its texture
baked in) is deleted.

`ui/DeviceModel.tsx` is the renderer and `ui/DeviceCanvas.tsx` the lazy
boundary; `HeroModel`/`HeroPhone` are gone, folded into them. The GLB is
fetched once per page and the loaded scene is cloned per device, with only the
Display material cloned so each can carry a different screen.

Two entrances, in `ENTRANCES`:

- `flip` — the hero's, the render sequence's choreography beat for beat.
- `settle` — everywhere else. The phone is already there, turned away
  three-quarters, and swings round to face you when it scrolls into view
  (IntersectionObserver at 0.3, not on load — an entrance you scrolled past is
  not an entrance). A second full flip on every section would read as a tic.

Converted: the How-it-works pinned phone, the close, and the feature pages'
slideshows. `sections/FeatureDeviceFrame.tsx` is deleted with them. Left as
flat images on purpose: the Features bento tiles (small cards inside links —
a WebGL context each is not worth it), the mobile per-step phones in
How-it-works (three contexts on a phone), and the Digital Twin chat, which is
live DOM with a typing animation, not a screenshot.

**Swapping screens without a rebuild.** How-it-works and the slideshows change
screen as you scroll, and `screen` being an effect dependency would tear down
and rebuild a WebGL context to change a texture. It is read through a ref
instead; the effect publishes a swap function and a second effect calls it.
The swap dips the display's emissive to 0.06 and back over ~0.46 s rather than
cutting — the display is the only emissive surface, so dimming and returning
reads as the screen itself changing, which is the one transition a phone can
honestly make. A true crossfade would need two display quads or a custom
shader. The slideshow beat goes from 2 s to 3.8 s to give each screen room.

## The flat mockups needed a device back

Stripping the bezel site-wide was right for the screenshots that were device
renders, and wrong for everything else. The Digital Twin chat is live DOM and
the bento phones are cropped screens, so once the frame went they were bare
slabs — and beside real 3D devices on the same page that reads as broken,
which is what Samuil pointed at.

`PhoneFrame` takes `chrome` and `island` now, both off by default:

- `chrome` puts the device back. It was a CSS gradient first, which was an
  approximation and looked like one; it is the same Blender phone now,
  rendered once as a flat asset by `--export-frame` (orthographic, face-on,
  matte black screen, transparent surround, 21 KB) so the flat mockups and the
  3D ones are literally the same object. Orthographic matters: the page insets
  its content into the screen rect by percentage, and under perspective the
  display plane — nearer the camera than the body's silhouette — projects
  larger than its true share. The script prints the frame aspect and the
  screen rect (89.382 % x 93.385 %, inset 5.309 % / 3.308 %) for the CSS to
  use, which also means the asset must never be trimmed: trimming cuts at the
  alpha bounds and breaks the correspondence. It is only correct at all
  because the screenshots are cropped to bare screens; over a device render it
  would be the second frame that started all this.
- `island` is separate: the screenshots keep their own status bar, the chat
  has none. Where it is drawn the screen gets a 10 % top inset, the way an app
  clears the status bar — without it the island sat on top of the chat's
  header.

Applied to the chat (`chrome island`), the bento phones and the How-it-works
mobile steps (`chrome`). The bento phone still hangs out of its card and is
clipped at the bottom edge — that is the design, and it reads as deliberate
again now that the thing being clipped is visibly a phone.

## Flat mockups turn too

The mockups that are not 3D — the Digital Twin chat (live DOM), the Features
bento phones (small cards inside links) and the How-it-works step screens on
mobile (three at once) — do not earn a WebGL context each, but they still have
to behave like the rest of the page. `ui/PointerTilt.tsx` gives them the same
gesture in CSS: one delegated pointer listener, anything marked `data-tilt`
joins in, and the turn is written as `--tilt-x` / `--tilt-y` and composed into
a per-element `perspective(1400px) translate3d() rotateX() rotateY()`. Ten
degrees of yaw at the viewport edge, two thirds in pitch, 0.9 px of slide per
degree, eased 11 % a frame — tuned alongside `DeviceModel`, so the flat
mockups and the real ones read as one system.
`PhoneFrame` takes a `tilt` prop; the bento phone sets the attribute directly.

## Everything motion is gated on prefers-reduced-motion

Worth writing down because it has now cost three rounds. `MagneticHover`,
`PointerTilt` and `DeviceModel`'s entrances and tilt all return early under
`prefers-reduced-motion: reduce`, and `DotDome` drops its idle spin. Verified
in Playwright: with the media feature emulated, every `--mag-x` and `--tilt-y`
stays unset and no custom property is ever written. So a machine with macOS
Reduce Motion on sees a completely static page, which is exactly the report
"it doesnt react on my cursor" — indistinguishable from the feature being
broken. If those micro-interactions should survive that setting, the gate has
to be split: keep it on the entrances and the scroll parallax, drop it for an
8 px lean and a 6 degree turn.

## The entrance flashed on load

Samuil: "when i refresh the page i see a flash of the mockup, then disappears
and the animation plays". Exactly what the code did. On load `DeviceModel`
set the resting pose, painted one synchronous frame so the slot was never
blank, and only then handed over to the entrance — which begins by jumping to
its start pose. So: a finished phone for one frame, then nothing, then the
flip. The flip's 0.35 s lead-in held that gap open long enough to read as a
bug rather than as a glitch.

The first painted frame is the entrance's start pose now, not the resting one
(and the resting one only under reduced motion, which plays no entrance).
`play()` just runs the tween; the pose is already where it should be.

The evidence here was the code, not the measurement. Screenshotting the hero
canvas on a tight loop through playwriter did show a dip in PNG size before
the animation ramped, and that looked like the flash — but a 360 flip narrows
the silhouette as the phone turns edge-on, so it dips on every run, fix or no
fix. The reliable signal is the first painted frame: it used to be a
full-size, fully-posed device and is now near-empty, because the phone starts
below the frame.

The lead-in came down with it, 0.35 s to 0.1 s, and the flip itself from
2.8 s to 1.8 s — Samuil found the wait long, and rightly: 2.8 s was the frame
sequence's length, chosen when the animation was the whole of the wait. As a
live model the flip is the tail of a wait that already includes a lazy chunk,
a GLB and a texture, about 1.7 s before the first frame.

The model and the hero texture are preloaded in the head to shorten that
first 1.7 s, and getting it right took two goes. The first attempt had both
assets requested **twice**: a preload is reused only if the eventual request
agrees with it on mode and credentials, and the link tags carried no
`crossorigin`. The fix was one attribute, not code — `crossorigin="anonymous"`
means credentials mode *same-origin*, which is exactly what both of three's
loaders already use (`ImageLoader` puts the attribute on the element,
`FileLoader` builds its Request with `credentials: "same-origin"`). Chrome had
been saying so all along in the console: "the request credentials mode does
not match."

Worth recording because the intuition is backwards: anonymous does not mean
omit. An intermediate version replaced `GLTFLoader.load` with a hand-rolled
`fetch(..., { mode: "cors", credentials: "omit" })` to force a match, and that
mismatched too. The stock loader was correct from the start.

Measured after: both assets finish at 391 ms while the three.js chunk does not
mount its canvas until 1254 ms, so the device has everything it needs the
moment it exists, and neither asset is fetched twice. No preload warnings. The frame sequence waited so
the flip did not start during hydration; the model is lazy-loaded, so by the
time it can play the page has long settled and the beat was only an empty
slot where the hero's phone belongs.

Worth noting for anyone tempted to add a poster image to `DeviceCanvas` while
the lazy chunk loads: for `flip` that would reintroduce this exactly, a phone
on screen that vanishes the moment the model takes over.

## Pointer parallax

The first pass at "parallax" was scroll-driven, which was the wrong reading:
Samuil meant the mockups should follow the cursor ("it doesnt react on my
cursor"). Both exist now — the scroll drift below, and this.

Each device turns toward the pointer: 12 degrees of yaw at the edge of the
viewport, two thirds of that in pitch, and slides a little with the turn
(0.22 of its height per radian of yaw). Rotation on its own reads as a hinge;
the small travel is what makes it read as the object leaning. It started at 7
degrees with no slide, which was too faint to register. The aim comes from the cursor's
position across the whole viewport rather than across the device's own box —
tracking the box makes the device snap as the cursor crosses its edge, and
tracking the viewport means it is already turned toward you before you get
there. The easing happens in the render loop rather than in the pointer
handler, at 8 % a frame, so the device keeps turning after the cursor stops
instead of snapping to wherever it was last seen.

Pose, scroll drift and pointer tilt are three separate stores summed at
placement. Folding any of them together makes the entrance tween and the
pointer fight over the same property frame by frame. Off under reduced motion
and for coarse pointers, where there is no cursor to follow.

## Scroll parallax, and a lighter magnetic pull

The devices drift against the page as their slot crosses the viewport: `p`
runs -1 to 1 about the moment the slot is centred, so the motion is symmetric
and there is no jump on entry, and the offset is in the device's own height
units, so it is the same gesture whether the mockup is drawn at 300 px or 480.
Default 0.06 of the device's height; the hero sets 0 because its scrubbed exit
already owns the scroll. Pose and drift are summed at placement rather than
folded together, or the entrance tween and the scroll would overwrite each
other frame by frame.

The magnetic pull came down with it, and overshot. 0.2 with a 6 px cap
measured correctly and read as nothing: Samuil reported the buttons not
reacting at all. A 131 x 40 pill needs more than 6 px before the lean is
legible. It sits at 0.26 with an 8 px cap (inner 0.45, reach 40) — a step
below Bright's 0.3/10 rather than the 40 % cut I made.

Diagnosed with Playwright rather than by eye, since the Browser pane never
runs `requestAnimationFrame` and the Chrome extension was not connected: drive
a real Chromium to the pill's left and right edges and read `--mag-x` off the
element. Two things came out of it. The pull was symmetric and correct all
along (+8 / -8 / 0), so nothing was broken — and an early reading that looked
asymmetric (+6 / -3.5) was headless rAF throttling, not a bug, which a longer
settle confirmed. The rects are measured every frame now regardless: they were
cached at mount and refreshed only on scroll, so a font swap or a lazy section
landing left a stale centre and a genuinely lopsided pull. Six
`getBoundingClientRect` calls per frame, only while the loop runs, is cheaper
than being wrong.

## Hero: the render sequence became a live model

Samuil asked whether the Blender phone could be a GLB the site animates
instead of 88 pre-rendered frames. It can, and it is smaller.

`scripts/hero-phone.blend.py --export-glb` builds the same scene and exports
it rather than rendering: 8,390 triangles, 4,476 vertices, one embedded
1024 px screen texture, **418 KB against 2.9 MB of frames**. Three things
needed care:

- **Not `export_yup`.** The exporter's Z-up to Y-up conversion assumes a scene
  laid out in Blender's world convention. This one is in camera space already
  (the phone's top is +Y, its face +Z, the camera on +Z looking back), which
  is three.js's convention verbatim. Converting lays the phone on its back.
- **A second display material.** The render's is an Emission shader behind a
  Mix node, and the glTF exporter walks a fixed set of node patterns — it
  would drop the texture and leave a flat colour. `mat_display_gltf` puts the
  image on a Principled BSDF's Emission Color instead, which exports as
  `emissiveTexture` with a white `emissiveFactor`: an unlit screen, same
  result. glTF ignores an emissive texture's alpha, so the source is
  flattened onto `#000e1b` before export rather than multiplied in.
- **The lighting does not come with it.** glTF has no area light and the scene
  is lit by four, so `HeroModel` rebuilds the rig from the numbers in
  `build_lights()` as three.js `RectAreaLight`s, and rebuilds the world's
  vertical gradient as an environment map. That gradient is most of what makes
  the titanium read as metal; without it the frame is flat grey. Blender's
  watts over a rectangle map to three's luminance as `W / (w * h)`, with one
  `EXPOSURE` constant for the absolute level. Tone mapping is off and the
  output space is sRGB, which is Blender's Standard view transform.

Framing is derived rather than guessed: 58 mm lens on a vertical-fit 24 mm
sensor gives a 23.2 degree FOV. The fill started as an exact match for the
frames — 0.78 of a 3200 px render, cropped to 2364, which is 1.056 of what the
page sees — but matching the frames was the wrong goal. At 1.056 the device is
751 px tall in a 698 px canvas, so ~26 px is sliced off each end, the corner
curves end flat and the phone reads as a cut-out. Samuil called it: "its still
cut out which is not good". At 0.9 there are ~32 px of clearance at each end
and the device is whole. The
choreography is unchanged: a 0.35 s beat, a 2.8 s rise through a whole flip
easing into the hold, then a scroll-scrubbed tilt away, with the hold pose
rendered once synchronously so the first paint is never an empty canvas.

**three.js is lazy-loaded.** It is 296 KB gzipped with GLTFLoader — more than
the rest of the site's JavaScript together — so `ui/HeroPhone.tsx` pulls
`HeroModel` in with `next/dynamic` and `ssr: false`, showing the hold still
until it arrives. The homepage entry is 205 KB gz and contains none of it.

Retired with it: `ui/HeroSequence.tsx`, `public/images/hero-seq/lg` and `sm`
and the manifest. The hold stills stay — they are the placeholder and the
no-WebGL fallback. `git checkout aed5e46 -- public/images/hero-seq
src/components/ui/HeroSequence.tsx` brings the sequence back if the live model
does not hold up.

The rig's absolute level was then set by measurement. Samuil spotted a hard
white line down the phone's left edge: at `EXPOSURE = 1.9` the Key's specular
on the frame's left bevel clipped to 255,255,252 while the right edge peaked
at 182 — the bevel's gradient was gone, so it read as a drawn line rather than
as metal. Sampling the 28 px band inside each silhouette edge at three heights
(geometry checked symmetric first: both edges 736 px apart, centred on the
canvas, so it was lighting and not the camera), 1.18 puts the left peak at
~206 and the right at ~145. The back glass reads as matte grey at that level
instead of near-white. The screen is emissive, so none of this touches it.

Not verified here: the animation itself. The Browser pane never runs
`requestAnimationFrame`, so GSAP cannot advance and the phone sits at its
first pose. Poses were checked by driving them by hand and screenshotting —
face, back and edge all light correctly.

## Screenshots: the device frame was doubled

Samuil sent the pinned How-it-works phone and said he did not like the
background. It turned out to be a real defect rather than a taste call: ten of
the nineteen app screenshots are 810 x 1654 device *renders* — titanium body,
side buttons, a baked dynamic island — and `PhoneFrame` was wrapping them in a
second graphite bezel and drawing a second island on top of the first. The
other nine are raw 1290 x 2796 captures, which got one frame, so the same
component produced two different objects depending on which file it held.

`scripts/crop-device-screens.mjs` crops the renders to their screen rect. The
rect is a constant (x 40..769, y 35..1617 -> 730 x 1583) rather than detected
per file: all ten come from the same template, three measured identically to
within a pixel of antialiasing, and per-file detection keyed off the app's
`#000e1b` background mis-fired on the screens that open a light sheet — it
cropped `log-life-event` to 666 x 1091, halfway up the modal. Files keep their
own format; the crop halves most of them (chat-flare-up 310K -> 173K,
doctor-report 192K -> 50K).

Both frame components are now just the clip:

- `ui/PhoneFrame.tsx` — bezel, padding, hairline ring and island gone.
- `sections/FeatureDeviceFrame.tsx` — the feature pages' own device, which had
  a 4-5 px border, an island and two gradient side buttons. Same treatment, or
  the feature pages would have kept a heavier frame than the homepage.

The clip radius is `14% / 6.4%`. That is the screen's own baked corner radius
measured off the renders (a horizontal inset of 79 px two pixels down from the
top edge implies r ~ 100 px on a 730 px screen), so the rounding lands on the
pixels rather than beside them and no dark corner slivers survive. It reads
the same on the 1290 x 2796 captures because both aspect ratios are ~0.46.
Declared `width`/`height` updated in `feature-visuals.ts` (10 entries), the
bento, How-it-works and the two frame defaults.

## Middots removed

Samuil asked for the interpunct separators to go. Two kinds, handled
differently, because a `·` is doing two different jobs on this site.

Where it separated two elements it was structural, and the fix was spacing:
the blog card's category / reading-time row and its author / date byline (one
of which was `&middot;`, so it survived the first grep), the team page's date
/ reading-time line, and `ProofLine`, whose standards and label are now two
list items and get the brand dot markers the other items already had. The
byline needed its gap widened afterwards — 2.5 is right between avatar and
name and reads as one phrase between name and date.

Where it sat inside a sentence it was punctuation, and the copy was rewritten
in both catalogs: lists take "A, B and C", clauses take a full stop.
`MedicalStandards`, `Compliance`, the Signals metas and both `standards`
lines. `Hero.eyebrow` and `Hero.proof2` were done too even though nothing
renders them now, so they do not bring the character back if they return.

Verified: zero in the whole export, and zero in rendered text on the home,
blog, feature and bg pages.

## Chat overflow, and the carousel had no affordance

**The Digital Twin chat was clipped on a phone.** It is DOM at a flat 12 px,
which fits the 286 px screen a 320 px frame gives on a desktop; at 390 px wide
the frame is 261 px and the content ran 35 px past the screen, cutting the
input bar in half. The screen is a container now (`container-type:
inline-size`) and the chat's whole stylesheet is in `em` against one root size
of `clamp(8.5px, 4.2cqw, 12px)` — 4.2 cqw being that same 12 px at the design
width, floored so it stays legible and capped so it never grows past what was
drawn. Measured at 320, 390, 430 and 1440: zero overflow at every width, and
still exactly 12 px on the desktop, so nothing there moved.

**The Signals row did not look like a carousel and its cards did not line up.**
Two separate things. The alignment was scroll snapping ignoring the row's own
padding — it aligns a card's start edge to the scrollport's, so the row rested
at `scrollLeft: 24` with the first card flush against the viewport while the
heading above it was indented; `scroll-padding-inline: 1.5rem` is what puts
them on the same line, and an `::after` spacer gives the last card the same
clearance. The affordance is `ui/SnapDots.tsx`, which watches a row by
selector rather than owning it — so the list stays plain markup that is a grid
at `md` and a snap row below — and hides itself when there is nothing to
scroll, which is exactly what happens at `md`. Position comes from scroll
offset rather than an IntersectionObserver, so the dots track a drag instead
of flipping at a threshold, and dividing the travel by dot count rather than
by card width is what makes the last card reach the last dot.

## Hero order on a phone

Stacked, the device belonged above the call to action, not below the
disclaimer — the way the competitors in the brief do it, and the reason is
straightforward: the phone is what earns the scroll to the App Store button,
so arriving after it is the wrong way round.

The hero is three grid items now rather than two columns — copy, device,
buttons — because the device sits between the two text blocks on a phone and
beside both of them on a desktop. Stacked, DOM order does the work. From `md`
the text blocks are placed back into one column by row and the device spans
both rows on the right.

The rows are pinned `auto 1fr`. Without that a row-spanning item shares its
height out across the rows it spans, and the device is tall enough to push the
buttons halfway down the column; measured, the gap between the lead and the
App Store badge went from 24 px to well over a hundred. Pinned, it is 24 px
again, which is the `gap-6` the single flex column used to give it.

## Section eyebrows removed

Samuil pointed at CONNECT, THE PROBLEM and CONNECTS and said he does not like
"those labels, all of those, type of stuff". So every decorative eyebrow is
gone: the section tags on Problem, How-it-works, Signals, Works-with,
Features, Digital Twin, Proof, the FAQ and the close; the per-item labels on
the How-it-works steps and the Signals cards; the three on About; the bento
CTA's; the use-case tags on the feature pages; and `PageHeader`'s, which took
the prop with it and nine call sites and four orphaned translators after it.
Headings now open their own sections.

Three things that look like eyebrows are kept, because they are controls or
structure rather than decoration: the navbar's locale switch, the footer's
column headings (a link list needs its heading) and the comparison table's
column headers. Proof's standards line is kept too but restyled from
`t-eyebrow` to `t-data` — it is a compliance claim that happened to be
wearing a label's uppercase, and deleting it would have deleted the claim.

Strings stay in the catalogs. Nothing renders them, and they are the cheap way
back if a section wants its tag again.

## Type: one face

IBM Plex Mono is out. Samuil clocked the eyebrows as somebody else's
typeface — the phase-1 brief had it carrying a "data voice", but a borrowed
mono is a borrowed brand. `--font-mono-stack` became `--font-data-stack` and
resolves to Manrope; the eyebrows keep their job through case and tracking
instead, uppercase at 12 px, weight 600, `0.14em` where the mono needed only
`0.08em` (mono is wide on its own, Manrope caps are not). `.t-data` and the
chat card subtitles follow the same token, and the 404's error line, which
hardcoded the family, follows too. The font is no longer loaded: six Manrope
woff2 subsets ship and nothing else.

The `01 · 02 · 03` prefixes on the How-it-works steps are gone with it —
"looks too vibed". The labels stand alone.

## Buttons: magnetic hover and rolling labels

Modelled on thebrightapp.xyz, which Samuil pointed at. Reading their markup:
each button carries `data-magnetic-strength="30"` with
`data-magnetic-strength-inner="15"` — the shell leans toward the cursor and
the content leans half as much again — and the label is a clipped box holding
two copies of the text, the duplicate one line below, both sliding up a line
on hover.

Ours is the same relationship in two parts:

- `ui/MagneticHover.tsx`, mounted once in the layout, is a single delegated
  pointer listener over everything marked `data-magnetic`. It reaches 44 px
  beyond a control's own box, follows 30 % of the cursor's offset capped at
  10 px, eases 16 % of the way each frame, and gives any `[data-magnetic-inner]`
  child half that again. Rects are cached and refreshed on scroll; a
  MutationObserver picks up markup that arrives later (the mobile sheet). The
  offsets are written as custom properties, not as an inline transform, so
  the press scale still composes in CSS. Off for coarse pointers and under
  reduced motion.
- `ui/RollText.tsx` is pure CSS: the label, a duplicate at `translateY(100%)`,
  and a hover rule on the enclosing `[data-magnetic]`. The duplicate is
  `aria-hidden`, so the accessible name stays singular.

Marked: both nav CTAs, the hero App Store badge and its "See how it works"
link, and the App Store badges in the Digital Twin section, the close and the
article CTA. Not the Features bento tile — that one is a whole grid cell, and
a leaning card reads as a layout glitch rather than as a button. One thing the
wiring needed: `.nav-capsule__cta` and `.x-store-badge` both transitioned
`transform`, which smoothed the already-eased pull into a lag, so
`[data-magnetic]` restates the transition without it.

## Dome: more frames, and keys that hold their order

"It stops" — correct. With one key per section the lattice reached its pose
and then sat there, and `poseAt` clamps past the last stop, so the whole tail
of the FAQ was a still shape spinning slowly. There are five keys across the
visible run now: a funnel rising from the bottom edge at Proof, a bowl hung
from the top, a globe swinging down, a lens behind the questions, a ring
drifting off left as the page ends.

He also guessed it would behave differently at different resolutions, and it
would have. Keys were anchored at a section's `top` or `center` in pixels,
which reorders as soon as the viewport is taller than the section — three
keys in one section could play in any sequence. Each key now carries `p`, a
fraction of that section's own travel past the viewport (`top - vh + (height +
vh) * p`), which is monotonic in `p` at every viewport height. Checked at
600, 720 and 1400 px tall: the eleven stops stay strictly increasing.

## Dome: Proof and the FAQ only, and the twin chapter goes light

Samuil narrowed it again and reversed the dark chapter with it. The lattice
now runs across one stretch — Proof through the FAQ, the last thing before the
close — and the Digital Twin section has lost `data-surface="dark"`, so the
black ground behind the pinned mockup is gone and the page carries one dark
chapter, the close, rather than two. The phone's own screen stays `#000e1b`:
that is the app, not the page. Its icon chip moved from `bg-xbrand/15
text-xbrand-light` to the `bg-xbrand/10 text-xbrand` the other light sections
use.

With no dark surface under the lattice, the colour crossfade and the
`::before` ground trick below both came out again; the dashes are plain
`71,100,255` ink. The `:not([data-surface="dark"])` guard on the transparency
rule stays, because that rule out-specifies the token rule that paints
`--bg-primary` and would silently strip the ground from any dark section
placed inside the wrapper later.

Measured at 1440 x 720: the window is 6991-8740 px, the envelope is 0 at the
centre of every section from the hero to Digital Twin and at the twin's bottom
edge, 1 across Proof and the FAQ, and easing off through the FAQ's last screen.

## Dome: second half only, and on the dark ground (superseded)

Samuil cut the How-it-works appearance entirely: the lattice now runs from the
Digital Twin chapter to the end of the FAQ and nowhere else, so the whole
first half of the page is plain light ground. `WINDOWS` in `DotDome.tsx` is a
single range, `#digital-twin` to `#faq`.

That put the lattice on the dark chapter, which had been covering it. Two
things followed:

- **Layering.** `.home-dome section.bg-xbg { background-color: transparent }`
  had been stripping the dark chapter's ground as well — it out-specifies the
  `[data-surface="dark"]` rule that paints `--bg-primary`, so that chapter was
  rendering light-text-on-light-ground. A real bug, not just a dome question.
  The rule now excludes `[data-surface="dark"]`, and the chapter paints its
  ground on a `::before` at `z-index: -20`, which is behind the canvas
  (`-10`) and still behind its own text, because non-positioned content paints
  above every negative-z descendant. So the dashes sit on the dark surface
  rather than under it.
- **Colour.** Indigo ink disappears into `#000e1b`. `darkAt()` measures how
  much of the viewport the dark chapter covers and crossfades the stroke from
  `71,100,255` to `150,178,255`, with a 30 % gain lift, so the same lattice
  reads as ink on the light bands and as light on the dark one.

The envelope was rewritten with it. It used to key off the viewport centre,
which let the lattice bleed onto the bottom of the section before the window.
It now rises as the range's top travels from the bottom of the viewport to the
top, and falls over the last viewport before the range ends: invisible while
Features still owns the screen, full once the dark chapter fills it, gone by
the time the closing has risen into place. Measured at 1440 x 720 the envelope
is 0 at the centre of the hero, Problem, How-it-works, Signals, Features *and*
at the bottom edge of Features, and 1 across Digital Twin, Proof and the FAQ.

The Digital Twin poses were retuned, since a key written to be invisible is
now the opening shot: a funnel beside the pinned phone at the top of the
chapter, opening into a globe behind it by its middle.

## Render quality

Samuil called the lattice blurry and pixelated. Both came from the same place:
`filter: blur(1.1px)` on the canvas. A CSS filter forces the layer through a
separate rasterisation that does not always run at device resolution, so the
blur was costing sharpness twice — once by design and once by accident. It is
gone, and the softness is carried by the stroke instead: hairline `1.15px`
rather than `1.6px`, lattice spacing `9px` rather than `10px` desktop
(`12` rather than `13` on phones) to hold the same density with the thinner
line. Alpha buckets went from 10 to 28 — ten steps banded into visible
contour rings across a full-height sphere.

## Dome: two visibility windows (superseded)

Samuil asked for the lattice in two places only: the run from *How xHeal
works* to the end of *Features*, and again at *Proof*. `WINDOWS` in
`DotDome.tsx` names those ranges by the same section selectors the poses use,
so they follow the layout rather than page fractions. An envelope keyed to the
viewport centre multiplies the whole frame's alpha: 1 while the centre is
inside a window, easing to 0 over a third of a viewport either side, and the
draw returns straight after `clearRect` when it is closed, so the ~3k
projections are skipped on the hero, the Problem band, the dark chapter and
the FAQ. Measured at 1440 x 900: the windows are 1586-5520 px and 7641-8751 px,
the envelope reads 1 at the centre of How-it-works, Signals, Features and
Proof, and 0 at the centre of the hero, Problem, Digital Twin and the FAQ.

The poses are unchanged. Keeping the hero, Problem, twin and FAQ keys means
the shape is still mid-morph as it fades in — the funnel arrives out of the
needle at How-it-works, the bowl out of the needle at Proof — rather than
appearing already settled.

`.home-dome` translucency was scoped down with it. It weakened every light
band so the lattice could run under all of them; now only Features (the one
`bg-xbg-2` section inside a window) stays at 62 %. Problem and the FAQ have
their full `--ground-2` band back and the hero has its full `--hero-wash`,
which the dome override had been flattening to 85 %.

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

## Closing phone

The closing section reused the hero's `hero-phone.webp`, which is a crop
(the render runs off the bottom of the frame). Samuil supplied a whole-device
render (`scene_2026-08-04 (2).png`, 6000 × 4500 RGBA); it is cropped to the
device's alpha bounds with a small margin, downscaled to 1100 × 2548 and
encoded as `closing-phone.webp` (167 KB, quality 88, lossless alpha). The old
file is removed; nothing else referenced it.

## Known follow-ups

- Dev server: Turbopack served stale CSS after whole-file rewrites of
  `globals.css` twice in this session; `rm -rf .next` and a restart fixed it
  both times. Production builds were unaffected.
- Six domains named in Proof (`Proof.numeral2Note`) are taken from the old
  hero copy; confirm against the app.
