# Professionals view — the second door

Date: 2026-09-04
Branch: `redesign/light-site`
Source of truth for the product: the Provider Workspace Analytics screenshot
(`public/images/provider-workspace.webp`)

The site now has two views of the same company. `/` sells the app a person
keeps; `/professionals` sells the workspace a practice works in. A switch in
the nav is the seam between them.

## Decisions

| Decision | Outcome |
| --- | --- |
| Ground | The professional view is dark end to end (`data-surface="dark"` on the page wrapper). It is the mirror of the light consumer site, it matches the Provider Workspace UI, and it lets the product shots sit on their own ground instead of floating on lavender. |
| Call to action | Early access, not a download and not a purchase. The product demos but does not self-serve, so the copy describes it in the present tense and promises no onboarding. |
| Product imagery | One real screenshot in the hero; the KPI strip, the revenue chart, the capacity heatmap and the consent card are rebuilt as components. Sharp at any density, and the Bulgarian locale gets Bulgarian axes rather than English pixels. |
| Claims | Every claim traces to something visible in the screenshot. The five modules are the five sidebar items. The consent language restates the workspace's own banner. Practice types are named as "built for", never as customers. |

## The switch

`src/components/ui/AudienceSwitch.tsx`. Two links dressed as a segmented
control, labelled **Consumer / Professionals** — each side is a real URL, so
back, middle-click and sharing all work.
The thumb is measured from the active anchor and animates `translateX` and
`width` together, because the two labels are different lengths in English and
further apart in Bulgarian. A zero-width measurement is discarded (the control
is `display: none` below the breakpoint), and the transition is withheld until
the first real measurement or the thumb slides in from the left on every load.

The nav is audience-aware around it:

- Links: Features / How it works / Blog / About → Workspace / Consent / FAQ.
- Pill: "Get the app" (App Store) → "Early access" (`#early-access`).
- The mobile sheet carries the switch at the top and takes the audience's
  surface, so a dark page does not open a white menu.
- `Footer` drops its App Store closing on `/professionals`; the page ends on
  `ProClosing` instead. The sitemap footer is the same on both views.
- The capsule's `max-width` went 880 → 1040 px, and between 768 and 1024 px
  everything in it tightens rather than wrapping.

## Page

`src/app/[locale]/professionals/page.tsx`, sections in
`src/components/professionals/`:

1. **Hero** — "The context arrives before the client does." Copy and the ask
   on the left, a live 3D laptop carrying the real Analytics screen on the
   right, three spec stats across the bottom. Same shape as the consumer hero
   — it was centred with the machine underneath until Samuil asked for the
   two to match — but 6/6 columns rather than 7/5, because a laptop in the
   narrow half is a postage stamp. See *The laptop* below.
2. **Built for** — five practice types as chips, on hairlines.
3. **One record. Two doors.** — the section that explains the switch: what the
   client holds, what the practice sees, and the lock on the seam between
   them. Links back to the consumer side.
4. **The workspace** (`#workspace`) — the five sidebar modules as a spec
   sheet: the module's own sidebar icon, its name, one line. A numbered
   01/02/03 rail was here first and came out — these are five places in one
   app, not five steps, and numbering promised an order the product has not
   got. Nothing on the site uses numbered labels now.
5. **Analytics** — six live KPI tiles, the revenue-and-visits chart and the
   capacity heatmap, labelled as demonstration data.
6. **Consent** (`#consent`) — readiness, revocability, and the rule that the
   workspace reports what is missing and never what is hidden.
7. **The difference** — three approaches and where each one's client context
   comes from. Categories, not named vendors.
8. **FAQ** (`#faq`) — five questions, with `FAQPage` JSON-LD.
9. **Early access** (`#early-access`) — practice name and work email.

## The laptop

`public/models/laptop.glb` (1.1 MB, 26,375 triangles), loaded by `DeviceModel`
exactly the way the phone is. It exists as a model rather than a CSS frame
because a laptop's gesture is the lid opening, and a bezel around a screenshot
cannot open.

**It is a modified CC-BY MacBook**, and the licence has to be honoured: the
source is *"macbook pro M3 16 inch 2024"* by
[jackbaeten](https://sketchfab.com/jackbaeten), CC-BY-4.0. The professionals
page carries a visible credit in its closing fine print (`Pro.credit`,
rendered by `ProClosing`). **If the model is ever swapped out, the credit goes
with it**, and if the pipeline is pointed at a different asset, check its terms
first.

`scripts/hero-laptop-mac.blend.py` does the conversion. The download is
10.6 MB, 112,625 triangles, 61 meshes, 18 baked textures, and no hinge, so the
script:

- splits it at z = 2 into lid and base — the two groups it actually has,
  though nothing in it is named;
- **finds the display by measurement, not by name** (the node names are
  Sketchfab hashes): the panel is the one lid part 34.4 cm wide, which is the
  16-inch active area, and the glass over it is a centimetre wider. A guard
  aborts the build if no part matches, rather than silently texturing the
  wrong face;
- throws away all 40 materials and 18 textures and assigns the site's own, so
  the machine sits in the same studio as the phone, with parts classified by
  where they sit on the deck (keyboard block, trackpad, speaker strips);
- **strips six leftover UV layers.** They cost 8 bytes on every vertex and
  were 2.6 MB of a 3.9 MB export, for maps being discarded. Only the display
  needs UVs and it gets a fresh planar set;
- decimates against an 800-triangle-per-object cap. At 1,500 the export is
  1.5 MB and looks identical in the browser, so 800 is 450 KB for nothing
  lost;
- joins 61 meshes into 2 nodes and **builds the hinge the model has not got**:
  the lid becomes a node named `Lid`, its origin moved to the hinge line and
  its 22 deg of lean baked out, so `Lid.rotation.x` is the opening angle on
  the same convention the built model used — 0 upright, +90 shut, negative
  leaning back;
- rotates the assembly out of Blender's Z-up into the camera space the site's
  models are authored in.

Nothing about the opening is baked into the GLB. The `open` entrance tweens
that one number from +58 deg down to **-5 deg** while the body rises and
squares up, which keeps it interruptible and skippable under
`prefers-reduced-motion` in the way a baked clip would not be. It rested at
-20 deg until Samuil said the screen was too open: at that angle the panel was
so foreshortened that the deck became the subject and the workspace — the
thing the page is selling — read edge-on. The body's 7 deg of pitch is what
shows the keyboard; the lid's job is to face you.

`scripts/hero-laptop.blend.py` builds a laptop from scratch and **is still the
fallback**: 226 KB, 6,282 triangles, no licence obligation, no Apple trade
dress, and the same `Lid` contract, so swapping back is one export and
deleting the credit. It was the shipped asset until Samuil compared the two
and said the Mac looks like a Mac. It does; it costs about five times the
bytes.

Two things `DeviceModel` gained for either of them, both additive: `MODELS`
(the GLB cache is keyed by URL rather than hard-coded to the phone) and
`fitBy`, because a laptop is wider than it is tall and fitting it on height
pushes it off both sides. `DevicePose` gained an optional `lid`; devices with
no `Lid` node ignore it.

### Lighting

**Albedos are authored for three.js, not for EEVEE, and look wrong in a
Blender viewport on purpose.** three's `RectAreaLight` casts no shadows and
there is no ambient occlusion, so the deck never sits in the open lid's shadow
and every surface is lit as though nothing were above it. Three things had to
change from plausible values, in this order:

1. **The clearcoat came off.** Blender renders a 0.12 coat as a whisper, but
   glTF exports it as `KHR_materials_clearcoat` and three.js gives that layer
   a white near-mirror reflection of the environment which ignores the metal's
   base colour — on a near-black body it was most of what reached the screen.
   Halving the albedo twice barely moved a pixel until the coat went.
2. **The albedos came down** by about an order of magnitude.
3. **The environment is damped** — `envIntensity={0.45}` on this canvas, which
   `DeviceModel` applies to every material except `Display`. A phone's slab
   takes the bright top of the gradient and looks fine; a laptop's deck is
   four times the area and came out as flat grey clay, brighter than the
   screen it exists to frame. Damping it leaves the area lights' speculars
   doing the shaping, which is what gives the metal its edges back.

Damping alone was not enough: with the environment down, the area lights laid
a hard bright streak straight across the deck. Shell roughness went 0.46 ->
0.64, which spreads that same energy into the soft back-to-front gradient a
machined top case actually has.

`public/images/provider-workspace-laptop.webp` is the same scene rendered at
the resting pose (`--export-still`, pitch 7, yaw -4, lid 5, aspect 1.3, fill
0.79 — matching the `open` entrance's `to` and the canvas it sits in). It is the poster `DeviceModel` falls back to when
WebGL is missing, and it is darker than the live model — the right way round
for a fallback on a black page.

## Motion

Entrances only, all gated on a shared `useInView`, all resolved instantly
under `prefers-reduced-motion`:

- KPI tiles rise and stagger; their numbers count up on `easeOutExpo`.
- Chart bars grow from the baseline on a 45 ms stagger, the visits line draws
  itself, the dots fade in behind it.
- Heatmap cells wipe in by weekday.
- The readiness meter fills to 76 %.
- The hero laptop rises, squares up and opens its lid (see above).

Framing is measured rather than eyeballed: `fill` and the model's `REST_LIFT`
are set so the drawn object leaves roughly 3-6 % margin at the sides and 13 %
top and bottom inside its canvas. The side margin has to survive the pointer
tilt, which slides the device about 1.6 % of the canvas width at full
deflection — at `fill` 0.84 the left margin fell to 0.4 % and the base clipped.

`useInView` starts *finished* and steps back one frame after mount, the same
way `ScrollReveal` does, and `CountUp` renders its final value in JSX and
writes the animation straight to the node. Both exist so the server-rendered
HTML carries real numbers and a drawn chart: a visitor with no JavaScript, or
a crawler that stops at the markup, must never be handed a dashboard of zeros.

## Open

- **The early-access form has nowhere to post.** It sends JSON to
  `NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT` when that is set and otherwise opens the
  visitor's mail client with the details filled in. Pointing the preorder
  Lambda in `infra/aws/lambda/preorder` at this page would close it. It must
  not be turned into a success message for a request nobody receives.
- **`support@xheal.ai` is a placeholder** for the contact line and the mailto
  fallback. Swap it for a partnerships address if one exists.
- **Practice types beyond dental** (functional medicine, physio, nutrition,
  recovery studios) are plausible fits, not evidenced ones. The screenshot
  evidences a dental clinic. Cut or confirm.
- **The hero laptop cannot be checked in the Browser pane.** That pane is
  hidden, so `requestAnimationFrame` never ticks and no WebGL frame is ever
  drawn — the canvas reads as empty and a frozen tween reads as a finished
  one. Drive a real headless Chromium instead (`playwright`), and give the
  context `reducedMotion: "no-preference"`: headless Chrome reports *reduce*
  by default, which skips every entrance on the site. Screenshots are too
  slow there to catch a 1.7 s tween mid-flight; sample the pose from the DOM
  instead if you need to prove it moves.
- `npm run validate:production` fails on this branch with 274 issues, all in
  categories that predate this work (internal `/en` links redirecting 308,
  missing feature screenshots, the retired slideshow interval). The
  professional page contributes three of them, in two of those existing
  categories, and introduces no new category.
