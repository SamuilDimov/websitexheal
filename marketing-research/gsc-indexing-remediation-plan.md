# Google Search Console Indexing Remediation Plan

## Context

- Source: Google Search Console page indexing report, property `https://xheal.ai`
- Export: `xheal.ai-Coverage-2026-07-28/` (`Chart.csv`, `Critical issues.csv`,
  `Non-critical issues.csv`, `Metadata.csv`)
- GSC last update: July 24, 2026
- Audited against commit: `3069dab`
- Canonical public origin: `https://xheal.ai`
- Status: Planned, not started

Search Console emailed two new indexing reasons: `Blocked by robots.txt` and
`Alternate page with proper canonical tag`. The report shows 122 indexed and 62
not indexed pages across seven reasons.

`Chart.csv` is the decisive artifact. `Not indexed` has been frozen at 62 and
`Indexed` at 122 for fourteen consecutive days from July 11 through July 24.
The report therefore describes the site as it existed on or before July 11,
2026.

On July 11 the deployed commit was `437f48e` (May 20, 2026). At that commit the
site had no canonical tags and no hreflang annotations at all:

```
git grep -l -iE "canonical|hreflang|alternates" 437f48e -- src   # no matches
git ls-tree 437f48e src/lib/                                     # does not exist
```

`src/lib/site.ts` and `buildMetadata()` were introduced in `dd80c4f` on July 21,
ten days after the reported data froze. The same commit removed a twelve-entry
`disallow` list from `src/app/robots.ts`.

Sixty-one of the sixty-two not-indexed pages are therefore already remediated in
source and are waiting on a Google recrawl. One issue is a live defect.

## Live Verification Performed

Executed against production on July 28, 2026.

| Check | Result |
| --- | --- |
| `robots.txt` served to Googlebot | `User-Agent: *` / `Allow: /`, HTTP 200, nothing disallowed |
| All 112 sitemap URLs | HTTP 200, direct, no redirect hops |
| Canonical on all 112 sitemap URLs | Self-referencing |
| hreflang on translated pages | `en`, `bg`, `x-default` all present and reciprocal |
| `www.xheal.ai` | 308 to apex |
| Legacy `/en/*` | 308 to unprefixed |
| Trailing slash and `.html` variants | 308 to clean URL |
| Unknown path | Genuine HTTP 404 |
| Internal links to `/en/*` in built HTML | 0 occurrences |
| Bulgarian sitemap pages (41) | All genuinely translated, no English fallbacks |
| `/404.html` | **HTTP 200 with 404 content — defect** |
| RSC `.txt` payloads (681 files) | **HTTP 200 `text/plain`, no canonical, no noindex — exposure** |

## Baseline Findings

| GSC reason | Pages | Cause on July 11, 2026 | Status in source |
| --- | --- | --- | --- |
| Duplicate without user-selected canonical | 14 | No canonical tag anywhere on the site; `/bg/guides/*` served untranslated English | Fixed in `dd80c4f` |
| Page with redirect | 14 | Legacy `/en/*` URLs predating the `localePrefix: "as-needed"` switch in `1d6d247` | Fixed, 308s in place |
| Blocked by robots.txt | 7 | `robots.ts` disallowed six wellness paths across both locales | Fixed in `dd80c4f` |
| Soft 404 | 1 | `/404.html` returns HTTP 200 | **Open** |
| Alternate page with proper canonical tag | 1 | No canonical tag anywhere on the site | Fixed in `dd80c4f` |
| Crawled - currently not indexed | 9 | Orphaned `/bg/guides/*` and `/bg/team/*` pages | Partially open |
| Discovered - currently not indexed | 16 | Same orphan set, not yet crawled | Partially open |
| Indexed, though blocked by robots.txt | 0 | Resolved when the `disallow` list was removed | Fixed |

The 14 duplicates plus 25 crawled-or-discovered pages closely track the 36
orphaned Bulgarian pages that exist in the build but not in the sitemap: 34
guide detail pages, `/bg/guides`, and `/bg/team/trifon-getsov`.

## Product Decisions

- Fix the `/404.html` soft 404 with both a `noindex` document and an edge
  redirect, rather than relying on either alone.
- Keep Next.js RSC `.txt` payloads reachable for client navigation but exclude
  them from indexing.
- **Supersede** the decision recorded in `semrush-site-audit-implementation-plan.md`
  to "keep Bulgarian guides accessible but exclude them from indexing until they
  have genuine Bulgarian content." The guides will be translated and indexed.
- Translate all 34 guides and the Bulgarian author page rather than removing
  them from the build, converting 36 wasted crawl targets into indexable
  content.
- Keep `/smart-devices` campaign-only and `noindex`, unchanged.
- Ship the two defect fixes as standalone commits ahead of the translation work
  so Search Console validation can begin immediately.

## Guide Inventory

34 guide detail pages across 10 categories.

| Category | Guides |
| --- | --- |
| `nutrition` | 5 |
| `workouts` | 4 |
| `vitals-tracking` | 4 |
| `mindfulness` | 4 |
| `getting-started` | 4 |
| `advanced-features` | 4 |
| `account-rewards` | 3 |
| `understanding-your-health` | 2 |
| `daily-routine` | 2 |
| `ai-companion` | 2 |

`src/data/guides.ts` is 86 KB of English content and is entirely locale-unaware.
Neither `src/messages/en.json` nor `src/messages/bg.json` contains a `Guides`
namespace.

---

## Workstream 1: Soft 404 Remediation

Status: Not started.
Commit: `fix(seo): stop serving /404.html as an indexable 200`

### User Story

As a search engine crawler, when I request a URL that does not exist, I receive a
genuine 404 status and no indexable document, so that the site's error page never
competes with real content in the index.

### Rationale

`infra/aws/cloudfront/url-router.js` exempts `/404.html` from the `.html` to
clean-URL redirect at line 94, so a direct request reaches S3 and returns HTTP
200 with 404 body content. There is no `not-found.tsx` in the app, so Next.js
renders its built-in 404 page with no `robots` directive.

CloudFront generates custom error responses on the origin-response path.
Viewer-request functions do not execute for them, so redirecting `/404.html` in
the router does not break the custom error page.

### Scope

- Add `src/app/not-found.tsx` and `src/app/[locale]/not-found.tsx`, each
  exporting `metadata.robots = { index: false, follow: false }`.
- Remove the `/404.html` exemption from `infra/aws/cloudfront/url-router.js` so
  direct requests return a 308 to `/`.
- Extend `infra/aws/cloudfront/url-router.test.mjs`.
- Extend `scripts/validate-production.mjs`.

### Acceptance Criteria

- [ ] `GET https://xheal.ai/404.html` returns HTTP 308 with `location: /`.
- [ ] `GET https://xheal.ai/this-path-does-not-exist` returns HTTP 404.
- [ ] The 404 response body contains `<meta name="robots" content="noindex, nofollow">`.
- [ ] `GET https://xheal.ai/bg/this-path-does-not-exist` returns HTTP 404 with the
      same `noindex` directive.
- [ ] `url-router.test.mjs` asserts the `/404.html`, `/404`, and
      `/bg/404.html` cases and `npm run test:infra` passes.
- [ ] `scripts/validate-production.mjs` fails the build if `/404.html` returns an
      indexable HTTP 200.
- [ ] `npm run validate:release` passes.
- [ ] No sitemap URL changes.

---

## Workstream 2: RSC Payload Exposure

Status: Not started.
Commit: `fix(seo): keep Next.js RSC payloads out of the index`

### User Story

As a site owner, I want the framework's internal React Server Component payloads
excluded from search indexing, so that 681 uncanonicalized `text/plain` mirrors of
my pages cannot be indexed as duplicate content.

### Rationale

The static export emits an RSC payload beside every route. The CloudFront router
serves them at HTTP 200 as `text/plain`: `/about.txt`, `/en/about.txt`,
`/en/about/__next.*.txt`. They carry no canonical tag and no `noindex`. Nothing
links to them today, so this is latent rather than active, but it is a
duplicate-content landmine.

Blocking them in `robots.txt` is safe. Browsers ignore `robots.txt`, so
client-side navigation and prefetch are unaffected. Every page is fully
server-rendered in the static export, so Googlebot never needs a payload to
render a page.

### Scope

- `src/app/robots.ts`: `disallow: ["/*.txt$"]` with `allow: ["/", "/llms.txt"]`.
- Extend `scripts/validate-production.mjs` with robots-rule assertions.

### Acceptance Criteria

- [ ] `https://xheal.ai/robots.txt` contains `Disallow: /*.txt$` and
      `Allow: /llms.txt`.
- [ ] The Search Console robots.txt tester reports `/llms.txt` as **allowed**.
- [ ] The tester reports `/about.txt` and `/en/about/__next._tree.txt` as
      **blocked**.
- [ ] `https://xheal.ai/llms.txt` still returns HTTP 200.
- [ ] `https://xheal.ai/sitemap.xml` still returns HTTP 200 and is unaffected.
- [ ] `scripts/validate-production.mjs` fails if `/about.txt` becomes crawlable or
      `/llms.txt` becomes blocked.
- [ ] Playwright chromium suite passes, confirming client-side navigation between
      pages is unbroken.
- [ ] `npm run validate:release` passes.

### Risk

`Allow: /llms.txt` relies on Google's longest-match precedence to override
`Disallow: /*.txt$`. If the live robots.txt tester disagrees, fall back to
enumerating RSC payload paths explicitly instead of a wildcard.

---

## Workstream 3: Locale-Aware Guides Module

Status: Not started.
Commit: `refactor(guides): make the guides module locale-aware`

### User Story

As a developer, I want the guides data module to accept a locale the same way the
blog module does, so that Bulgarian guide content can be added without changing
any component or route.

### Rationale

`src/data/guides.ts` exports `guideCategories`, `guides`, and seven helpers that
take no locale parameter. `src/data/blog-posts.ts` already solves this with
`blogPostsEn` / `blogPostsBg` arrays behind `getBlogPosts(locale)`. Mirroring
that pattern keeps the codebase consistent and isolates the refactor from the
translation work.

### Scope

- Split `guideDefinitions` into `guideDefinitionsEn` and `guideDefinitionsBg`.
- Split `guideCategories` into `guideCategoriesEn` and `guideCategoriesBg`.
- Thread `locale` through `getCategoryLabel`, `getCategoryInfo`,
  `getGuidesByCategory`, `getGuide`, `getAllGuides`, `getGuideNavigation`,
  `getNextGuide`, `getPreviousGuide`.
- Update all call sites in `src/app/[locale]/guides/**` and
  `src/components/guides/**`.

### Acceptance Criteria

- [ ] Every exported guides helper accepts `locale: string = "en"` as its final
      parameter.
- [ ] `guideDefinitionsBg` exists and, in this commit only, falls back to English
      content so the change is behaviour-neutral.
- [ ] Bulgarian guide pages retain `noindex, follow` in this commit.
- [ ] Rendered HTML for all 34 English guide pages is byte-identical to the
      pre-refactor build.
- [ ] `sitemap.xml` still contains exactly 112 URLs.
- [ ] `npm run validate:release` passes with no changes to
      `EXCLUDED_ROUTES`.

---

## Workstream 4: Bulgarian Guide Content

Status: Not started.
Commit: `feat(guides): add Bulgarian guide content`

### User Story

As a Bulgarian-speaking xHeal user, I want the product guides in Bulgarian, so
that I can learn how to use the app in my own language instead of reading English
copy under a `/bg/` URL.

### Rationale

The 36 orphaned Bulgarian pages are the largest identified contributor to the
`Duplicate without user-selected canonical`, `Crawled - currently not indexed`,
and `Discovered - currently not indexed` buckets. Translating them converts
wasted crawl budget into indexable content in a market xHeal already serves with
24 translated blog posts.

### Scope

- Populate `guideDefinitionsBg` with Bulgarian `title`, `description`, and
  `content` for all 34 guides.
- Populate `guideCategoriesBg` with Bulgarian `label` and `description` for all
  10 categories.
- Preserve every guide's `slug`, `category`, `order`, `readingTime`, `icon`, and
  `prerequisites` unchanged.
- Apply `guideOverrides` to the Bulgarian set as well.

### Acceptance Criteria

- [ ] All 34 Bulgarian guides have a non-empty Bulgarian `title`, `description`,
      and `content`.
- [ ] No Bulgarian `title`, `description`, or `content` is byte-identical to its
      English counterpart.
- [ ] Every Bulgarian `content` string contains Cyrillic characters.
- [ ] The HTML tag sequence of each Bulgarian `content` string matches its English
      counterpart exactly; only text nodes differ.
- [ ] Bulgarian slugs are unchanged, so `/bg/guides/<category>/<slug>` continues to
      pair 1:1 with `/guides/<category>/<slug>`.
- [ ] Terminology matches the glossary already established in
      `src/messages/bg.json` and the Bulgarian blog posts.
- [ ] All 10 Bulgarian category labels and descriptions are translated.
- [ ] `npm run validate:release` passes.

---

## Workstream 5: Guides UI Localization

Status: Not started.
Commit: `feat(guides): localize guides UI chrome`

### User Story

As a Bulgarian-speaking user reading a translated guide, I want the surrounding
navigation, headings, and labels in Bulgarian too, so that the page is not a
mix of two languages.

### Rationale

The guide content is only part of the page. `guides/page.tsx` hardcodes
"User Guides", "Getting Started", and "View all". `GuidesSidebar`, `GuideCard`,
`GuideBreadcrumb`, and `GuideNav` hardcode further English strings. Translating
content without the chrome produces a visibly bilingual page.

### Scope

- Add a `Guides` namespace to `src/messages/en.json` and `src/messages/bg.json`.
- Replace hardcoded strings in `src/app/[locale]/guides/page.tsx`,
  `src/app/[locale]/guides/[category]/[slug]/page.tsx`, and all four components
  in `src/components/guides/`.

### Acceptance Criteria

- [ ] `Guides` namespace exists in both message files with identical key sets.
- [ ] No user-visible English string literal remains in
      `src/app/[locale]/guides/**` or `src/components/guides/**`.
- [ ] `/bg/guides` renders no English text in headings, sidebar, breadcrumbs,
      cards, or previous/next navigation.
- [ ] `/guides` renders identically to the pre-change build.
- [ ] `npm run validate:boundaries` passes.
- [ ] `npm run validate:release` passes.

---

## Workstream 6: Index The Bulgarian Guides

Status: Not started.
Commit: `feat(seo): index Bulgarian guides`

### User Story

As a site owner, I want the translated Bulgarian guides indexed and paired with
their English equivalents via hreflang, so that Bulgarian searchers reach the
Bulgarian page and Google no longer treats these URLs as unindexable orphans.

### Rationale

This is the commit that converts the work in Workstreams 3 through 5 into search
visibility. It must land only after the content and chrome are complete, because
flipping `noindex` on untranslated pages would reintroduce the exact duplicate
signal this plan is fixing.

### Scope

- Remove the `locale === "bg"` noindex branch in
  `src/app/[locale]/guides/[category]/[slug]/page.tsx` and the equivalent in
  `src/app/[locale]/guides/layout.tsx`.
- Set `translated: true` in the relevant `buildMetadata` calls.
- Move guides from `ENGLISH_ONLY_STATIC_PAGES` to the translated set in
  `src/app/sitemap.ts`; emit both locales in `guidePages`.
- Remove `/bg/guides` and `/bg/guides/workouts/workout-overview` from
  `EXCLUDED_ROUTES` in `scripts/validate-production.mjs`.

### Acceptance Criteria

- [ ] `/bg/guides` and all 34 `/bg/guides/*` pages return HTTP 200 with no
      `noindex` directive and no `x-robots-tag` header.
- [ ] Each Bulgarian guide page carries a self-referencing canonical.
- [ ] Each guide page emits reciprocal `hreflang` for `en`, `bg`, and
      `x-default`, verified in both directions.
- [ ] `sitemap.xml` contains all 35 Bulgarian guide URLs.
- [ ] `sitemap.xml` contains no duplicate URLs and no `/en` prefix.
- [ ] `EXCLUDED_ROUTES` no longer references any `/bg/guides` path.
- [ ] The existing `validate-production.mjs` sitemap, canonical, and hreflang
      assertions cover the new URLs with no exemptions.
- [ ] `npm run validate:release` passes.

---

## Workstream 7: Bulgarian Author Page

Status: Not started.
Commit: `feat(seo): index Bulgarian team bio`

### User Story

As a Bulgarian reader evaluating xHeal's medical credibility, I want the founder
and author biography in Bulgarian, so that author attribution on Bulgarian blog
posts leads to a page I can read.

### Rationale

`/bg/team/trifon-getsov` is the last orphan in the set. It is currently English
content under a Bulgarian URL with `noindex, follow`, and it is the author
attribution target for 24 translated Bulgarian blog posts.

### Scope

- Translate `src/app/[locale]/team/trifon-getsov/page.tsx` content to Bulgarian
  via the message catalog.
- Remove its `noindex`, set `translated: true`.
- Move `/team/trifon-getsov` from `ENGLISH_ONLY_STATIC_PAGES` to the translated
  set in `src/app/sitemap.ts`.
- Remove `/bg/team/trifon-getsov` from `EXCLUDED_ROUTES`.

### Acceptance Criteria

- [ ] `/bg/team/trifon-getsov` renders Bulgarian content with no English body text.
- [ ] The page returns HTTP 200 with no `noindex` directive.
- [ ] The page carries a self-referencing canonical and reciprocal `hreflang`.
- [ ] `sitemap.xml` contains `https://xheal.ai/bg/team/trifon-getsov`.
- [ ] `EXCLUDED_ROUTES` no longer references any `/bg/team` path.
- [ ] Author links on Bulgarian blog posts resolve to the Bulgarian bio.
- [ ] `npm run validate:release` passes.

---

## Workstream 8: Search Console Validation

Status: Not started. Manual, performed after Workstreams 1 and 2 deploy.

### User Story

As a site owner, I want Google to recrawl and revalidate the pages it flagged, so
that the 61 already-remediated issues clear from the report instead of persisting
on stale July 11 data.

### Rationale

Every `Validation` field in `Critical issues.csv` reads `Not Started` except
`Discovered - currently not indexed`, which reads `Passed`. Google will not
reprocess these buckets on its own schedule quickly. Requesting validation is
required to clear them.

The sitemap grows from 112 to approximately 147 URLs once Workstreams 6 and 7
land, so the resubmission step must follow those deploys.

### Scope

- Request validation for each Website-source reason.
- Resubmit the sitemap.
- Request indexing for the highest-value previously-blocked URLs.

### Acceptance Criteria

- [ ] `Validation` moves from `Not Started` to `Started` for: Duplicate without
      user-selected canonical, Page with redirect, Blocked by robots.txt, Soft 404,
      Alternate page with proper canonical tag.
- [ ] `sitemap.xml` resubmitted and reported as read with approximately 147
      discovered URLs and 0 errors.
- [ ] URL Inspection returns "URL is on Google" or "Indexing requested" for the six
      previously disallowed wellness pages: `/chat-with-your-health`,
      `/flare-up-trigger-patterns`, `/health-awareness`, `/health-timeline`,
      `/log-life-events`, `/specialist-ready-reports`.
- [ ] URL Inspection confirms `/bg/guides` is crawlable and indexable.
- [ ] `Indexed, though blocked by robots.txt` remains at 0.

---

## Definition Of Done

The plan is complete when all of the following hold.

- [ ] `Blocked by robots.txt` reports 0 pages.
- [ ] `Soft 404` reports 0 pages.
- [ ] `Duplicate without user-selected canonical` reports 0 pages.
- [ ] `Alternate page with proper canonical tag` reports 0 pages, or only URLs
      that are intentionally canonicalized elsewhere.
- [ ] `Page with redirect` trends toward 0 as legacy `/en/*` URLs age out.
- [ ] Indexed page count exceeds 140.
- [ ] No indexable page exists outside `sitemap.xml`, and no sitemap URL is
      `noindex`, redirecting, or non-200.
- [ ] `scripts/validate-production.mjs` enforces every invariant above, so a
      regression fails CI rather than surfacing in a Search Console email weeks
      later.

## Verification Gate

Every commit in Workstreams 1 through 7 must pass `npm run validate:release`:

```
lint → validate:source → test:infra → build → validate:export
     → playwright chromium → validate:production
```

Deployment is automatic via `.github/workflows/deploy-aws.yml` on push to `main`,
with an hourly cron reconciliation. No manual deploy step is required.

## Sequencing

Workstreams 1 and 2 are independent of each other and of everything else, and
ship first so Search Console validation can start immediately.

Workstreams 3 through 6 are strictly ordered: the module must accept a locale
before content can be added, content and chrome must both be complete before
`noindex` is removed. Workstream 7 is independent of 3 through 6 and can land at
any point after Workstream 1.

Workstream 8 runs twice: once after Workstreams 1 and 2 for the defect
validations, and once after Workstreams 6 and 7 for the sitemap resubmission.

## Superseded Decisions

This plan reverses one decision from
`marketing-research/semrush-site-audit-implementation-plan.md`:

> Keep Bulgarian guides accessible but exclude them from indexing until they have
> genuine Bulgarian content.
>
> Apply the same temporary exclusion to the untranslated Bulgarian author page.

Workstreams 4 through 7 satisfy the stated precondition by supplying the genuine
Bulgarian content, then remove the exclusion. The `/smart-devices` exclusion from
that plan remains in force.
