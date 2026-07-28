import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = readFileSync(
  new URL("../src/data/blog-posts.ts", import.meta.url),
  "utf8"
);
const legalSource = readFileSync(
  new URL("../src/data/legal-content.ts", import.meta.url),
  "utf8"
);

function loadDataModule(relativePath) {
  const moduleSource = readFileSync(
    new URL(relativePath, import.meta.url),
    "utf8"
  );
  const transpiled = ts.transpileModule(moduleSource, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const loaded = { exports: {} };
  Function("exports", "module", "require", transpiled)(
    loaded.exports,
    loaded,
    require
  );
  return loaded.exports;
}

const { BLOG_IMAGE_SLIDER_MARKER, getBlogPosts, getRelatedPosts } =
  loadDataModule("../src/data/blog-posts.ts");
const { getAllGuides, getGuideCategories, getCategoryLabel } = loadDataModule(
  "../src/data/guides.ts"
);
const errors = [];

if (/href=["']\/en(?:\/|["'])/.test(source)) {
  errors.push("Blog content contains a redirecting /en link");
}

if (/<a\b[^>]*href=["']https?:\/\/[^"']+["'][^>]*>\s*https?:\/\//i.test(legalSource)) {
  errors.push("Legal content contains a naked visible URL anchor");
}

const bulgarianLegalSource = legalSource.split("const legalBg: LegalPages =")[1] ?? "";
for (const route of ["cookie-policy", "privacy-policy", "terms-conditions"]) {
  if (bulgarianLegalSource.includes(`href="/${route}`)) {
    errors.push(`Bulgarian legal content links to the unprefixed /${route} route`);
  }
}

for (const locale of ["en", "bg"]) {
  const renderedTitles = new Map();

  for (const post of getBlogPosts(locale)) {
    const sliderMarkerCount = post.content.split(
      BLOG_IMAGE_SLIDER_MARKER,
    ).length - 1;

    if (post.imageSlider && sliderMarkerCount !== 1) {
      errors.push(
        `${locale}/${post.slug} has an image slider but ${sliderMarkerCount} slider markers`,
      );
    }
    if (!post.imageSlider && sliderMarkerCount > 0) {
      errors.push(`${locale}/${post.slug} has a slider marker without slider data`);
    }
    if (post.imageSlider && post.imageSlider.slides.length < 2) {
      errors.push(`${locale}/${post.slug} image slider has fewer than 2 slides`);
    }
    if (
      post.imageSlider &&
      new Set(post.imageSlider.slides.map((slide) => slide.src)).size !==
        post.imageSlider.slides.length
    ) {
      errors.push(`${locale}/${post.slug} image slider has duplicate images`);
    }

    const editorialTitle = `${post.title} | xHeal Blog`;
    const renderedTitle = `${post.seoTitle ?? post.title} | xHeal Blog`;
    const titleLength = Array.from(renderedTitle).length;

    if (Array.from(editorialTitle).length > 70 && !post.seoTitle) {
      errors.push(`${locale}/${post.slug} is missing seoTitle`);
    }

    if (titleLength > 70) {
      errors.push(`${locale}/${post.slug} metadata title is ${titleLength} characters`);
    }

    const duplicateSlug = renderedTitles.get(renderedTitle);
    if (duplicateSlug) {
      errors.push(
        `${locale}/${post.slug} duplicates the metadata title used by ${duplicateSlug}`
      );
    }
    renderedTitles.set(renderedTitle, post.slug);

    const posts = getBlogPosts(locale);
    const postsBySlug = new Map(posts.map((candidate) => [candidate.slug, candidate]));
    const related = getRelatedPosts(post.slug, 3, locale);
    const explicit = [...new Set(post.relatedSlugs ?? [])]
      .filter((slug) => slug !== post.slug && postsBySlug.has(slug))
      .slice(0, 3);

    if (related.length !== Math.min(3, posts.length - 1)) {
      errors.push(`${locale}/${post.slug} has ${related.length} related posts instead of 3`);
    }
    if (new Set(related.map((candidate) => candidate.slug)).size !== related.length) {
      errors.push(`${locale}/${post.slug} has duplicate related posts`);
    }
    if (related.some((candidate) => candidate.slug === post.slug)) {
      errors.push(`${locale}/${post.slug} includes itself as a related post`);
    }
    if (explicit.some((slug, index) => related[index]?.slug !== slug)) {
      errors.push(`${locale}/${post.slug} does not preserve explicit related-post order`);
    }
  }
}

// Guides are published in both locales at the same URLs, so the two locale sets
// have to stay structurally identical while sharing no prose. A drift here would
// reintroduce exactly the duplicate-content signal that Search Console reported.
const GUIDE_TAG = /<\/?([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^\s=>]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*\/?>/g;

function tagSignature(html) {
  return [...html.matchAll(GUIDE_TAG)]
    .map((match) => `${match[0].startsWith("</") ? "/" : ""}${match[1].toLowerCase()}${match[2].trim()}`)
    .join(" ");
}

const hasCyrillic = (value) => /\p{Script=Cyrillic}/u.test(value);
const guidesEn = getAllGuides("en");
const guidesBg = getAllGuides("bg");
const categoriesEn = getGuideCategories("en");
const categoriesBg = getGuideCategories("bg");

if (guidesEn.length !== guidesBg.length) {
  errors.push(
    `guides: ${guidesBg.length} Bulgarian guides but ${guidesEn.length} English guides`
  );
}
if (categoriesEn.length !== categoriesBg.length) {
  errors.push(
    `guides: ${categoriesBg.length} Bulgarian categories but ${categoriesEn.length} English categories`
  );
}

for (const [index, en] of categoriesEn.entries()) {
  const bg = categoriesBg[index];
  if (!bg) continue;
  const key = `guides/${en.slug}`;
  if (bg.slug !== en.slug) {
    errors.push(`${key}: Bulgarian category ${index} is ${bg.slug}`);
    continue;
  }
  if (bg.icon !== en.icon) errors.push(`${key}: category icon differs by locale`);
  for (const field of ["label", "description"]) {
    if (!bg[field]) errors.push(`${key}: Bulgarian category ${field} is empty`);
    else if (bg[field] === en[field]) {
      errors.push(`${key}: Bulgarian category ${field} is identical to English`);
    } else if (!hasCyrillic(bg[field])) {
      errors.push(`${key}: Bulgarian category ${field} has no Cyrillic text`);
    }
  }
}

for (const [index, en] of guidesEn.entries()) {
  const bg = guidesBg[index];
  if (!bg) continue;
  const key = `guides/${en.category}/${en.slug}`;

  if (bg.slug !== en.slug || bg.category !== en.category) {
    errors.push(`${key}: Bulgarian guide ${index} is ${bg.category}/${bg.slug}`);
    continue;
  }
  if (bg.order !== en.order) errors.push(`${key}: order differs by locale`);
  if (bg.readingTime !== en.readingTime) {
    errors.push(`${key}: readingTime differs by locale`);
  }
  if (
    JSON.stringify(bg.prerequisites ?? null) !==
    JSON.stringify(en.prerequisites ?? null)
  ) {
    errors.push(`${key}: prerequisites differ by locale`);
  }

  for (const field of ["title", "description", "content"]) {
    if (!bg[field]) errors.push(`${key}: Bulgarian ${field} is empty`);
    else if (bg[field] === en[field]) {
      errors.push(`${key}: Bulgarian ${field} is identical to English`);
    } else if (!hasCyrillic(bg[field])) {
      errors.push(`${key}: Bulgarian ${field} has no Cyrillic text`);
    }
  }

  if (tagSignature(en.content) !== tagSignature(bg.content)) {
    errors.push(`${key}: Bulgarian content HTML structure differs from English`);
  }
}

// Mirrors the metadata title built by the guide detail route. validate-production
// rejects any sitemap page whose title exceeds 70 characters, and Bulgarian runs
// longer than English, so the budget is enforced here at the source.
for (const locale of ["en", "bg"]) {
  const renderedTitles = new Map();
  const renderedDescriptions = new Map();

  for (const guide of getAllGuides(locale)) {
    const key = `${locale}/guides/${guide.category}/${guide.slug}`;
    const title = `${guide.title} | ${getCategoryLabel(guide.category, locale)} | xHeal`;
    const length = Array.from(title).length;

    if (length > 70) {
      errors.push(`${key} metadata title is ${length} characters: ${title}`);
    }
    const duplicateTitle = renderedTitles.get(title);
    if (duplicateTitle) {
      errors.push(`${key} duplicates the metadata title used by ${duplicateTitle}`);
    } else renderedTitles.set(title, key);

    const duplicateDescription = renderedDescriptions.get(guide.description);
    if (duplicateDescription) {
      errors.push(
        `${key} duplicates the meta description used by ${duplicateDescription}`
      );
    } else renderedDescriptions.set(guide.description, key);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Blog metadata, related-post behavior, and ${guidesEn.length} guides in ${categoriesEn.length} categories across 2 locales are valid.`
  );
}
