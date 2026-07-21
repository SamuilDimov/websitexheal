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
const output = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const blogModule = { exports: {} };

Function("exports", "module", "require", output)(
  blogModule.exports,
  blogModule,
  require
);

const { BLOG_IMAGE_SLIDER_MARKER, getBlogPosts, getRelatedPosts } =
  blogModule.exports;
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

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Blog metadata and related-post behavior are valid.");
}
