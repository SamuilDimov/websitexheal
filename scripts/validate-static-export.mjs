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
  "smart-devices.html",
  "smart-devices.txt",
  "robots.txt",
  "sitemap.xml",
]) {
  if (!(await fileExists(path.join(exportRoot, requiredFile)))) {
    fail(`missing ${requiredFile}`);
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

if (errors.length > 0) {
  console.error(`Static export validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Static export validation passed (${htmlFiles.length} HTML files).`);
}
