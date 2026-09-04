import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const exportRoot = path.resolve(process.env.EXPORT_DIR ?? "out");
const errors = [];

function fail(message) {
  errors.push(message);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function internalRoute(publicPath) {
  if (publicPath === "/") return "/en";
  if (publicPath === "/bg" || publicPath.startsWith("/bg/")) return publicPath;
  return `/en${publicPath}`;
}

async function collectHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectHtml(entryPath);
      return entry.name.endsWith(".html") ? [entryPath] : [];
    }),
  );
  return files.flat();
}

for (const requiredFile of [
  "404.html",
  "en.html",
  "en.txt",
  "bg.html",
  "bg.txt",
  "google9d80d9bffb68e2b1.html",
  "robots.txt",
  "sitemap.xml",
]) {
  if (!(await fileExists(path.join(exportRoot, requiredFile)))) {
    fail(`missing ${requiredFile}`);
  }
}

const googleVerificationPath = path.join(
  exportRoot,
  "google9d80d9bffb68e2b1.html",
);
if (await fileExists(googleVerificationPath)) {
  const verification = (await readFile(googleVerificationPath, "utf8")).trim();
  if (
    verification !==
    "google-site-verification: google9d80d9bffb68e2b1.html"
  ) {
    fail("Google site verification file has unexpected content");
  }
}

const sitemapPath = path.join(exportRoot, "sitemap.xml");
if (await fileExists(sitemapPath)) {
  const sitemap = await readFile(sitemapPath, "utf8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map(
    (match) => match[1].trim().replaceAll("&amp;", "&"),
  );

  if (sitemapUrls.length === 0) fail("sitemap.xml contains no URLs");

  for (const sitemapUrl of sitemapUrls) {
    const url = new URL(sitemapUrl);
    const route = internalRoute(url.pathname);

    for (const extension of [".html", ".txt"]) {
      const artifact = path.join(exportRoot, `${route.slice(1)}${extension}`);
      if (!(await fileExists(artifact))) {
        fail(`${url.pathname} is missing ${path.relative(exportRoot, artifact)}`);
      }
    }
  }
}

const htmlFiles = await collectHtml(exportRoot);
for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  if (html.includes("/_next/image")) {
    fail(`${path.relative(exportRoot, htmlFile)} depends on Next image optimization`);
  }
}

// Every heavy asset shipped in the export must be referenced by something in
// it. Unreferenced fonts and video fail the build; unreferenced images are
// reported so they can be pruned (image paths are sometimes assembled at
// runtime, so they only warn).
async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
    }),
  );
  return files.flat();
}

const HEAVY_ASSET = /\.(mp4|webm|mov|woff2?|ttf|otf)$/i;
const IMAGE_ASSET = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const TEXT_SOURCE = /\.(html|css|js|mjs|txt|xml|json|webmanifest)$/i;

const allFiles = await collectFiles(exportRoot);
const corpus = (
  await Promise.all(
    allFiles
      .filter((file) => TEXT_SOURCE.test(file))
      .map((file) => readFile(file, "utf8")),
  )
).join("\n");

const unreferencedImages = [];
for (const file of allFiles) {
  const isHeavy = HEAVY_ASSET.test(file);
  const isImage = IMAGE_ASSET.test(file);
  if (!isHeavy && !isImage) continue;
  const publicPath = `/${path.relative(exportRoot, file).split(path.sep).join("/")}`;
  if (publicPath.startsWith("/_next/")) continue;
  // The hero frame sequence is addressed by pattern from HeroSequence.tsx.
  if (publicPath.startsWith("/images/hero-seq/")) continue;
  const referenced =
    corpus.includes(publicPath) ||
    corpus.includes(encodeURI(publicPath)) ||
    corpus.includes(publicPath.slice(1));
  if (referenced) continue;
  if (isHeavy) fail(`${publicPath} is shipped but referenced by nothing in the export`);
  else unreferencedImages.push(publicPath);
}
if (unreferencedImages.length > 0) {
  console.warn(
    `Warning: ${unreferencedImages.length} image(s) in the export are not referenced by any HTML, CSS or JS:`,
  );
  for (const image of unreferencedImages) console.warn(`- ${image}`);
}

if (errors.length > 0) {
  console.error(`Static export validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Static export validation passed (${htmlFiles.length} HTML files).`);
}
