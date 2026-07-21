# Semrush Site Audit Implementation Plan

## Context

- Audit: `Semrush-Site_Audit__Issues-xheal_ai-9th_Jul_2026.pdf`
- Audit date: July 9, 2026
- Revised against homepage commit: `133a62b`
- Canonical public origin: `https://xheal.ai`
- Status: Phases 1-6 completed on July 10, 2026

The Semrush report predates the refreshed homepage feature showcase. Its issue
counts remain a baseline rather than a description of the current deployment.
A fresh crawl is required after the revised homepage and the work below are
deployed.

## Product Decisions

- Index the six feature landing pages.
- Keep `/smart-devices` campaign-only and emit `noindex, follow`.
- Keep Bulgarian guides accessible but exclude them from indexing until they
  have genuine Bulgarian content.
- Apply the same temporary exclusion to the untranslated Bulgarian author page.
- Link the new Workouts, Nutrition, and Mindfulness cards to their existing
  guide overview pages.
- Preserve the cinematic feature showcase, but rebuild it as progressive
  enhancement over one semantic card list.

## Baseline Findings

| Semrush finding | Current assessment |
| --- | --- |
| 11 duplicate descriptions | Ten final English pages inherit the homepage description; localized duplicates increase the current exposure. |
| 8 duplicate titles | The homepage and six feature pages form a confirmed seven-page cluster; localized duplicates add more. |
| 64 low text-to-HTML pages | Full locale catalogs and blog, guide, testimonial, and showcase data inflate HTML and RSC payloads. |
| 17 unminified assets | Next.js production output is minified; affected resource URLs are needed before changing the build pipeline. |
| 11 temporary redirects | Eleven raw `/en/blog/...` links remain, while all 57 English sitemap entries also use redirecting `/en` URLs. |
| 10 overlong titles | A current strict audit finds 14 English and 13 Bulgarian blog titles over 70 characters. |
| 2 broken external links | An invalid BMC citation is the strongest match; all reported targets still require URL-level verification. |
| 2 weakly linked pages | The January and February newsletters receive only one distinct English inbound source. |
| 2 links without anchor text | Naked legal URL anchors are the strongest match; image-only links are secondary candidates. |
| 2 content-optimization pages | The two pillar articles are the likely candidates, pending the Semrush details. |
| 1 sitemap orphan | Not reproducible in the canonical graph; likely caused by the wrong-host or redirecting sitemap. |

## Phase 0: Baseline And Security

Status: Source remediation completed. The exposed Resend key must still be
revoked in the Resend dashboard because removing it from source does not remove
it from Git history.

- Freeze the implementation target and capture a clean production baseline.
- Export the URL-level and resource-level details from Semrush.
- Measure HTML, RSC, DOM, JavaScript, images, and Core Web Vitals.
- Rotate the hard-coded Resend credential and load it from a server-only
  environment variable as a separate security hotfix.

## Phase 1: Canonical And Crawl Integrity

Status: Completed and verified on July 10, 2026.

- Centralize `https://xheal.ai` as the public origin.
- Remove all runtime `xheal.com` SEO fallbacks.
- Generate unprefixed English sitemap URLs and `/bg` Bulgarian URLs.
- Include indexable feature pages and newsletters in the sitemap.
- Exclude `/smart-devices`, Bulgarian guides, and the untranslated Bulgarian
  author page from the sitemap.
- Simplify robots rules and point them to the canonical sitemap.
- Update `llms.txt` to canonical `.ai` URLs without `/en`.
- Emit `noindex, follow` on intentionally excluded pages.
- Add direct permanent redirects for historical blog URLs.
- Return a real 404 for unknown blog slugs.

### Phase 1 Acceptance

- Every sitemap URL uses `xheal.ai`, returns 200, and does not redirect.
- No internal crawl surface generates an `/en` URL.
- Robots and sitemap use the same public origin.
- Feature pages are crawlable and included in the sitemap.
- Campaign-only and untranslated routes emit `noindex` and are absent from the
  sitemap.
- Unknown blog slugs return 404.

Verification completed with a production build and local HTTP checks covering
all 94 sitemap URLs, excluded-route index policies, legacy redirects, host
normalization, and unknown blog slugs.

## Phase 2: Metadata And Structured Data

Status: Completed and verified on July 10, 2026.

- Add a shared builder for titles, descriptions, canonicals, language
  alternates, Open Graph, and Twitter metadata.
- Give all six feature pages unique localized metadata.
- Use localized legal descriptions instead of the homepage description.
- Emit language alternates only for genuinely translated content.
- Add concise SEO titles for all overlong localized blog titles.
- Localize homepage SoftwareApplication structured data.

## Phase 3: Links, Citations, And Discovery

Status: Completed and verified on July 10, 2026.

- Replace all raw `/en/blog/...` links with canonical English paths.
- Link the three new homepage features to their guide overview pages.
- Preserve configured related posts and fill only missing positions.
- Add contextual links to both newsletter posts.
- Replace naked legal anchors with descriptive text.
- Make Bulgarian legal links locale-aware.
- Repair the broken BMC citation and validate all medical references against
  the claims they support.

## Phase 4: Feature Showcase Refactor

Status: Completed and verified on July 10, 2026.

- Render one server-generated semantic card list.
- Use the static list as the default and no-JavaScript experience.
- Enhance that same DOM into cinematic mode after hydration.
- Replace continuous broad style mutation with a lightweight controller.
- Add carousel semantics, current-slide state, announcements, and safe focus
  handling.
- Add accurate image sizes and limit `will-change` to active elements.
- Respect reduced motion across the showcase and other animated sections.

## Phase 5: Site-Wide Payload Reduction

Status: Completed and verified on July 10, 2026.

- Curate a small testimonial set and hide only the repeated marquee copy from
  assistive technology.
- Keep full blog bodies server-only and send summaries to client filters.
- Split guide navigation records from complete guide content.
- Restrict client translation providers to required namespaces.
- Move static presentation back to Server Components where practical.
- Keep structured data separate from editorial HTML.

## Phase 6: Automated Guardrails

Status: Completed and verified on July 10, 2026.

- Validate sitemap statuses, hostnames, redirects, and indexability.
- Validate canonical and language-alternate relationships.
- Enforce unique titles/descriptions and title-length budgets.
- Check unknown dynamic routes, stale `/en` references, and broken links.
- Test the showcase without JavaScript, with keyboard navigation, and with
  reduced motion.
- Run lint, production build, SEO checks, and representative browser tests
  before deployment.

## Success Targets

| Area | Target |
| --- | --- |
| Duplicate titles and descriptions | 0 |
| Overlong titles | 0 |
| Internal temporary redirects | 0 |
| Broken external links | 0 |
| Empty or naked anchor warnings | 0 |
| Sitemap orphans | 0 |
| Homepage DOM | Fewer than approximately 1,500 nodes |
| Feature-card DOM instances | One per feature |
| Full content datasets in client bundles | None |
| LCP | Under 2.5 seconds |
| CLS | Under 0.1 |
| INP | Under 200 milliseconds |

## Implementation Results

- All 94 sitemap URLs pass direct-status, indexability, metadata, canonical,
  social metadata, title-length, duplicate, and hreflang checks.
- All 99 discovered internal targets return without redirects or errors.
- The no-JavaScript homepage contains one semantic list with nine unique
  feature cards and no server-enabled cinematic state.
- Browser static output decreased by 464 KiB, or 27.4%.
- Full blog, testimonial, and guide corpora no longer appear in browser chunks.
- Root client translation payload decreased from 69,596 to 1,587 bytes in
  English and from 121,314 to 2,572 bytes in Bulgarian.
- The release validation command now runs lint, source SEO checks, client
  boundary checks, secret checks, a production build, and a production crawl.
- A fresh Semrush crawl and field Core Web Vitals remain post-deployment work.
