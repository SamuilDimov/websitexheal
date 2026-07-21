import { access } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";

const PUBLIC_ORIGIN = "https://xheal.ai";
// next-intl builds internal rewrite URLs with localhost. Matching that hostname
// keeps Next from treating its own locale rewrite as an external proxy request.
const HOST = "localhost";
const PORT = Number(process.env.VALIDATION_PORT ?? 4173);
const EXPORT_DIR = process.env.EXPORT_DIR ?? "out";
const EXTERNAL_VALIDATION_ORIGIN = process.env.VALIDATION_ORIGIN?.replace(
  /\/$/,
  "",
);
const LOCAL_ORIGIN =
  EXTERNAL_VALIDATION_ORIGIN ?? `http://${HOST}:${PORT}`;
const SUPPORTED_HREFLANGS = new Set(["en", "bg", "x-default"]);
const EXPECTED_SHOWCASE_HREFS = [
  "/workouts",
  "/nutrition",
  "/mindfulness",
  "/chat-with-your-health",
  "/flare-up-trigger-patterns",
  "/health-awareness",
  "/specialist-ready-reports",
  "/health-timeline",
  "/log-life-events",
];
const EXPECTED_SHOWCASE_IMAGES = new Map([
  [
    "/workouts",
    [
      "/images/screenshots/workout-dashboard.png",
      "/images/screenshots/workout-session.webp",
      "/images/screenshots/workout-exercises.webp",
    ],
  ],
  [
    "/nutrition",
    [
      "/images/screenshots/nutrition-dashboard.png",
      "/images/screenshots/nutrition-photo-analysis.webp",
      "/images/screenshots/nutrition-meal-analysis.webp",
    ],
  ],
  [
    "/mindfulness",
    [
      "/images/screenshots/mindfulness-dashboard.png",
      "/images/screenshots/mindfulness-breathing.webp",
    ],
  ],
  ["/chat-with-your-health", ["/images/screenshots/chat-flare-up.png"]],
  [
    "/flare-up-trigger-patterns",
    [
      "/images/screenshots/flare-up-insights.png",
      "/images/screenshots/log-flare-up.webp",
    ],
  ],
  ["/health-awareness", ["/images/screenshots/health-awareness.webp"]],
  ["/specialist-ready-reports", ["/images/screenshots/doctor-report.webp"]],
  ["/health-timeline", ["/images/screenshots/timeline-dashboard.png"]],
  [
    "/log-life-events",
    [
      "/images/screenshots/log-life-event.webp",
      "/images/screenshots/log-medication.png",
      "/images/screenshots/log-supplement.webp",
      "/images/screenshots/log-peptide.webp",
      "/images/screenshots/log-flare-up.webp",
    ],
  ],
]);
const EXCLUDED_ROUTES = [
  "/smart-devices",
  "/bg/guides",
  "/bg/guides/workouts/workout-overview",
  "/bg/team/trifon-getsov",
];
const HISTORICAL_REDIRECTS = new Map([
  [
    "/blog/how-xheal-guided-me-to-the-right-lab-tests",
    "/blog/how-to-know-which-lab-tests-to-order",
  ],
  [
    "/en/blog/how-xheal-guided-me-to-the-right-lab-tests",
    "/blog/how-to-know-which-lab-tests-to-order",
  ],
  [
    "/bg/blog/how-xheal-guided-me-to-the-right-lab-tests",
    "/bg/blog/how-to-know-which-lab-tests-to-order",
  ],
]);

const errors = [];
const responseCache = new Map();
let server;
let serverOutput = "";

function fail(message) {
  errors.push(message);
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    );
}

function attributes(tag) {
  const result = new Map();
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

  for (const match of tag.replace(/^<\/?[^\s>]+/, "").matchAll(pattern)) {
    result.set(
      match[1].toLowerCase(),
      decodeHtml(match[2] ?? match[3] ?? match[4] ?? ""),
    );
  }
  return result;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(
    (match) => ({ tag: match[0], attributes: attributes(match[0]) }),
  );
}

function metadataValues(html, selectorName, selectorValue, valueName) {
  return tags(html, "meta")
    .filter(
      ({ attributes: attrs }) =>
        attrs.get(selectorName)?.toLowerCase() === selectorValue,
    )
    .map(({ attributes: attrs }) => attrs.get(valueName)?.trim() ?? "");
}

function linkValues(html, relation) {
  return tags(html, "link")
    .filter(({ attributes: attrs }) =>
      (attrs.get("rel") ?? "")
        .toLowerCase()
        .split(/\s+/)
        .includes(relation),
    )
    .map(({ attributes: attrs }) => attrs);
}

function titleValues(html) {
  return [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(
    (match) => decodeHtml(match[1]).trim(),
  );
}

function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function localeFor(url) {
  return new URL(url).pathname.startsWith("/bg") ? "bg" : "en";
}

function publicUrlToLocal(url) {
  const publicUrl = new URL(url, PUBLIC_ORIGIN);
  return `${LOCAL_ORIGIN}${publicUrl.pathname}${publicUrl.search}`;
}

function urlsEqual(left, right) {
  try {
    return new URL(left).toString() === new URL(right).toString();
  } catch {
    return false;
  }
}

async function requestPublic(url) {
  const publicUrl = new URL(url, PUBLIC_ORIGIN);
  publicUrl.hash = "";
  const key = publicUrl.toString();
  if (!responseCache.has(key)) {
    responseCache.set(
      key,
      fetch(publicUrlToLocal(publicUrl), { redirect: "manual" }).then(
        async (response) => ({
          body: await response.text(),
          headers: response.headers,
          status: response.status,
        }),
      ),
    );
  }
  return responseCache.get(key);
}

function isNoindex(page) {
  const metaRobots = [
    ...metadataValues(page.body, "name", "robots", "content"),
    ...metadataValues(page.body, "name", "googlebot", "content"),
  ];
  const headerRobots = page.headers.get("x-robots-tag") ?? "";
  return [...metaRobots, headerRobots].some((value) => {
    const directives = value.toLowerCase().split(/[\s,]+/);
    return directives.includes("noindex") || directives.includes("none");
  });
}

function onlyNonempty(values, label, url) {
  if (values.length !== 1 || !values[0]) {
    fail(`${url}: expected exactly one nonempty ${label}, found ${values.length}`);
    return null;
  }
  return values[0];
}

function assertMetadata(url, page, duplicateMetadata) {
  if (isNoindex(page)) fail(`${url}: sitemap page is noindex`);

  const title = onlyNonempty(titleValues(page.body), "title", url);
  const description = onlyNonempty(
    metadataValues(page.body, "name", "description", "content"),
    "meta description",
    url,
  );
  const canonical = onlyNonempty(
    linkValues(page.body, "canonical").map((attrs) => attrs.get("href") ?? ""),
    "canonical",
    url,
  );
  const ogTitle = onlyNonempty(
    metadataValues(page.body, "property", "og:title", "content"),
    "og:title",
    url,
  );
  const ogDescription = onlyNonempty(
    metadataValues(page.body, "property", "og:description", "content"),
    "og:description",
    url,
  );
  const ogUrl = onlyNonempty(
    metadataValues(page.body, "property", "og:url", "content"),
    "og:url",
    url,
  );
  const twitterTitle = onlyNonempty(
    metadataValues(page.body, "name", "twitter:title", "content"),
    "twitter:title",
    url,
  );
  const twitterDescription = onlyNonempty(
    metadataValues(page.body, "name", "twitter:description", "content"),
    "twitter:description",
    url,
  );

  if (canonical && !urlsEqual(canonical, url)) {
    fail(`${url}: canonical is ${canonical}, expected a self-reference`);
  }
  if (ogUrl && !urlsEqual(ogUrl, url)) fail(`${url}: og:url is ${ogUrl}`);
  if (title && Array.from(title).length > 70) {
    fail(`${url}: title is ${Array.from(title).length} characters (maximum 70)`);
  }
  for (const [label, actual, expected] of [
    ["og:title", ogTitle, title],
    ["og:description", ogDescription, description],
    ["twitter:title", twitterTitle, title],
    ["twitter:description", twitterDescription, description],
  ]) {
    if (actual && expected && actual !== expected) {
      fail(`${url}: ${label} does not match the page metadata`);
    }
  }

  if (title && description) {
    const locale = localeFor(url);
    for (const [kind, value] of [
      ["title", title],
      ["description", description],
    ]) {
      const key = `${locale}:${kind}:${value}`;
      const duplicate = duplicateMetadata.get(key);
      if (duplicate) fail(`${url}: duplicate ${kind} also used by ${duplicate}`);
      else duplicateMetadata.set(key, url);
    }
  }
}

function extractAlternates(html) {
  return linkValues(html, "alternate")
    .filter((attrs) => attrs.has("hreflang"))
    .map((attrs) => ({
      href: attrs.get("href")?.trim() ?? "",
      hreflang: attrs.get("hreflang")?.trim().toLowerCase() ?? "",
    }));
}

async function assertHreflang(url, page) {
  const alternates = extractAlternates(page.body);
  if (alternates.length === 0) return;

  const byLanguage = new Map();
  for (const alternate of alternates) {
    if (!SUPPORTED_HREFLANGS.has(alternate.hreflang)) {
      fail(`${url}: unsupported hreflang "${alternate.hreflang}"`);
      continue;
    }
    if (byLanguage.has(alternate.hreflang)) {
      fail(`${url}: duplicate ${alternate.hreflang} hreflang`);
      continue;
    }
    byLanguage.set(alternate.hreflang, alternate.href);
  }

  const englishUrl = byLanguage.get("en");
  const bulgarianUrl = byLanguage.get("bg");
  const defaultUrl = byLanguage.get("x-default");
  if (!englishUrl || !bulgarianUrl || !defaultUrl) {
    fail(`${url}: hreflang set must contain en, bg, and x-default`);
  }
  if (englishUrl && defaultUrl && defaultUrl !== englishUrl) {
    fail(`${url}: x-default must match the English alternate`);
  }

  for (const [language, target] of byLanguage) {
    let targetUrl;
    try {
      targetUrl = new URL(target);
    } catch {
      fail(`${url}: ${language} hreflang has invalid target "${target}"`);
      continue;
    }
    if (targetUrl.origin !== PUBLIC_ORIGIN) {
      fail(`${url}: ${language} hreflang target must use ${PUBLIC_ORIGIN}`);
      continue;
    }
    if (language === "en" && /^\/en(?:\/|$)/.test(targetUrl.pathname)) {
      fail(`${url}: English hreflang target has an /en prefix`);
    }
    if (language === "bg" && !/^\/bg(?:\/|$)/.test(targetUrl.pathname)) {
      fail(`${url}: Bulgarian hreflang target is not under /bg`);
    }

    const targetPage = await requestPublic(targetUrl);
    if (targetPage.status !== 200) {
      fail(`${url}: ${language} hreflang target returned ${targetPage.status}`);
      continue;
    }
    if (language === "x-default") continue;

    const sourceLanguage = localeFor(url);
    const reciprocal = extractAlternates(targetPage.body).find(
      (candidate) => candidate.hreflang === sourceLanguage,
    );
    if (!reciprocal || !urlsEqual(reciprocal.href, url)) {
      fail(
        `${url}: ${language} target does not reciprocate its ${sourceLanguage} alternate`,
      );
    }
  }
}

function extractAnchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(
    (match) => ({ attributes: attributes(`<a ${match[1]}>`), body: match[2] }),
  );
}

function assertAnchorName(anchor, pageUrl, href) {
  if (
    anchor.attributes.get("aria-hidden")?.toLowerCase() === "true" ||
    anchor.attributes.has("hidden")
  ) {
    return;
  }

  const ariaLabel = anchor.attributes.get("aria-label")?.trim() ?? "";
  const text = visibleText(
    anchor.body.replace(/<[^>]+aria-hidden=["']?true["']?[^>]*>[\s\S]*?<\/[^>]+>/gi, ""),
  );
  const imageAlts = tags(anchor.body, "img")
    .map(({ attributes: attrs }) => attrs.get("alt")?.trim() ?? "")
    .filter(Boolean);
  const name = ariaLabel || text || imageAlts.join(" ");

  if (!name) fail(`${pageUrl}: anchor to ${href} has no accessible name`);
  if (/^https?:\/\/\S+$/i.test(text)) {
    fail(`${pageUrl}: anchor to ${href} exposes a naked URL as its text`);
  }
}

async function assertInternalLinks(pageUrl, page, internalTargets) {
  for (const anchor of extractAnchors(page.body)) {
    const href = anchor.attributes.get("href")?.trim() ?? "";
    assertAnchorName(anchor, pageUrl, href || "(missing href)");
    if (!href || href.startsWith("#") || /^(?:mailto|tel):/i.test(href)) continue;

    let target;
    try {
      target = new URL(href, pageUrl);
    } catch {
      fail(`${pageUrl}: anchor has invalid href "${href}"`);
      continue;
    }
    if (target.origin !== PUBLIC_ORIGIN) continue;
    if (/^\/en(?:\/|$)/.test(target.pathname)) {
      fail(`${pageUrl}: anchor targets runtime /en URL ${target.pathname}`);
    }
    target.hash = "";
    internalTargets.add(target.toString());
  }
}

async function assertInternalTarget(url) {
  const page = await requestPublic(url);
  if (page.status >= 300 && page.status < 400) {
    fail(`${url}: internal link redirects (${page.status})`);
  } else if (page.status >= 400) {
    fail(`${url}: internal link returned ${page.status}`);
  }
}

async function assertExcludedRoutes(sitemapUrls) {
  for (const route of EXCLUDED_ROUTES) {
    const url = `${PUBLIC_ORIGIN}${route}`;
    if (sitemapUrls.has(url)) fail(`${route}: excluded route appears in sitemap`);
    const page = await requestPublic(url);
    if (page.status !== 200) fail(`${route}: expected 200, received ${page.status}`);
    if (!isNoindex(page)) fail(`${route}: excluded route is missing noindex`);
  }
}

async function assertSpecialRoutes() {
  const unknown = await requestPublic(
    `${PUBLIC_ORIGIN}/blog/phase-6-validation-route-that-does-not-exist`,
  );
  if (unknown.status !== 404) {
    fail(`/blog/<unknown>: expected 404, received ${unknown.status}`);
  }

  for (const [source, destination] of HISTORICAL_REDIRECTS) {
    const page = await requestPublic(`${PUBLIC_ORIGIN}${source}`);
    if (page.status !== 308) {
      fail(`${source}: expected 308, received ${page.status}`);
    }
    const location = page.headers.get("location");
    const resolvedLocation = location
      ? new URL(location, PUBLIC_ORIGIN).toString()
      : "(missing)";
    if (resolvedLocation !== `${PUBLIC_ORIGIN}${destination}`) {
      fail(`${source}: redirects to ${resolvedLocation}, expected ${destination}`);
    }
  }

  for (const route of ["/robots.txt", "/llms.txt"]) {
    const page = await requestPublic(`${PUBLIC_ORIGIN}${route}`);
    if (page.status !== 200) fail(`${route}: expected 200, received ${page.status}`);
    const urls = [...page.body.matchAll(/https?:\/\/[^\s<>"]+/g)].map(
      (match) => match[0].replace(/[),.;]+$/, ""),
    );
    if (urls.length === 0) fail(`${route}: expected at least one public URL`);
    for (const value of urls) {
      const url = new URL(value);
      if (url.origin !== PUBLIC_ORIGIN) {
        fail(`${route}: public URL must use ${PUBLIC_ORIGIN}`);
      }
      if (/^\/en(?:\/|$)/.test(url.pathname)) {
        fail(`${route}: public URL contains an /en prefix`);
      }
    }
  }
}

function countExact(values, expected) {
  return values.filter((value) => value === expected).length;
}

function decodedImageSources(html) {
  return tags(html, "img")
    .flatMap(({ attributes: attrs }) => [
      attrs.get("src") ?? "",
      attrs.get("srcset") ?? "",
    ])
    .map((value) => decodeURIComponent(value))
    .join(" ");
}

function assertOrderedImages(context, html, expectedImages) {
  const imageSources = decodedImageSources(html);
  let previousPosition = -1;

  for (const image of expectedImages) {
    const position = imageSources.indexOf(image);
    if (position === -1) {
      fail(`${context}: missing image ${image}`);
    } else if (position <= previousPosition) {
      fail(`${context}: image ${image} is out of order`);
    }
    previousPosition = position;
  }
}

async function assertNoJsShowcase() {
  const homepage = await requestPublic(`${PUBLIC_ORIGIN}/`);
  if (homepage.status !== 200) {
    fail(`/: cannot validate showcase because homepage returned ${homepage.status}`);
    return;
  }

  const trackMatch = homepage.body.match(
    /<ol\b[^>]*data-feature-track[^>]*>([\s\S]*?)<\/ol>/i,
  );
  if (!trackMatch) {
    fail("/: no server-rendered feature showcase track found");
    return;
  }
  const track = trackMatch[1];
  const slides = [...track.matchAll(/<li\b[^>]*data-feature-slide[^>]*>/gi)];
  const ids = slides.map((match) => attributes(match[0]).get("id") ?? "");
  if (slides.length !== 9) fail(`/: expected 9 feature slides, found ${slides.length}`);
  if (new Set(ids).size !== 9 || ids.some((id) => !id)) {
    fail("/: feature slides must have 9 unique nonempty IDs");
  }

  const showcaseAnchors = extractAnchors(track);
  const hrefs = showcaseAnchors.map((anchor) => {
    const href = anchor.attributes.get("href") ?? "";
    try {
      return new URL(href, PUBLIC_ORIGIN).pathname;
    } catch {
      return href;
    }
  });
  for (const href of EXPECTED_SHOWCASE_HREFS) {
    const count = countExact(hrefs, href);
    if (count !== 1) fail(`/: showcase href ${href} appears ${count} times`);
  }
  for (const [href, expectedImages] of EXPECTED_SHOWCASE_IMAGES) {
    const anchor = showcaseAnchors[hrefs.indexOf(href)];
    const context = `/: showcase card ${href}`;
    if (!anchor) {
      fail(`${context} not found`);
      continue;
    }

    assertOrderedImages(context, anchor.body, expectedImages);
    if (
      expectedImages.length > 1 &&
      !/data-slideshow-interval=["']1200["']/.test(anchor.body)
    ) {
      fail(`${context}: expected a 1200ms slideshow interval`);
    }
  }

  const cards = [...track.matchAll(/<article\b/gi)].length;
  const headings = [...track.matchAll(/<h4\b[^>]*>([\s\S]*?)<\/h4>/gi)].filter(
    (match) => visibleText(match[1]),
  ).length;
  const descriptions = [
    ...track.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi),
  ].filter((match) => visibleText(match[1])).length;
  if (cards !== 9 || headings !== 9 || descriptions !== 9) {
    fail(
      `/: no-JS showcase content incomplete (${cards} cards, ${headings} headings, ${descriptions} descriptions)`,
    );
  }

  const sectionTag = homepage.body.match(
    /<section\b[^>]*class=["'][^"']*feature-showcase[^"']*["'][^>]*>/i,
  )?.[0];
  if (!sectionTag) fail("/: feature showcase section not found");
  else if (attributes(sectionTag).has("data-cinematic")) {
    fail("/: cinematic mode is enabled in server HTML");
  }
  if (/feature-showcase-controls/.test(track)) {
    fail("/: cinematic controls are present in server HTML");
  }
}

async function assertFeatureDetailVisuals() {
  for (const localePrefix of ["", "/bg"]) {
    for (const [href, expectedImages] of EXPECTED_SHOWCASE_IMAGES) {
      const route = `${localePrefix}${href}`;
      const page = await requestPublic(`${PUBLIC_ORIGIN}${route}`);
      if (page.status !== 200) {
        fail(`${route}: cannot validate feature hero because page returned ${page.status}`);
        continue;
      }

      const marker = `data-feature-hero="${href.slice(1)}"`;
      const heroStart = page.body.indexOf(marker);
      const heroEnd = page.body.indexOf("</section>", heroStart);
      if (heroStart === -1 || heroEnd === -1) {
        fail(`${route}: feature hero marker not found`);
        continue;
      }

      const hero = page.body.slice(heroStart, heroEnd);
      assertOrderedImages(`${route}: feature hero`, hero, expectedImages);
      if (!/data-slideshow-variant=["']landing["']/.test(hero)) {
        fail(`${route}: feature hero is missing the landing presentation`);
      }
      if (
        expectedImages.length > 1 &&
        !/data-slideshow-interval=["']2500["']/.test(hero)
      ) {
        fail(`${route}: expected a 2500ms slideshow interval`);
      }
    }
  }
}

async function mapWithConcurrency(values, concurrency, callback) {
  let index = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, async () => {
      while (index < values.length) {
        const current = values[index++];
        try {
          await callback(current);
        } catch (error) {
          fail(`${current}: request failed (${error.message})`);
        }
      }
    }),
  );
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Static server exited early.\n${serverOutput.trim()}`);
    }
    try {
      const response = await fetch(`${LOCAL_ORIGIN}/robots.txt`, {
        redirect: "manual",
      });
      if (response.status > 0) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Static server was not ready within 30 seconds.\n${serverOutput.trim()}`);
}

async function assertPortAvailable() {
  await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once("error", (error) =>
      reject(
        new Error(
          `Validation port ${PORT} is unavailable (${error.code}). Set VALIDATION_PORT to another local port.`,
        ),
      ),
    );
    probe.listen(PORT, HOST, () => probe.close(resolve));
  });
}

async function stopServer() {
  if (!server || server.exitCode !== null) return;
  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
  if (server.exitCode === null) server.kill("SIGKILL");
}

async function run() {
  if (!EXTERNAL_VALIDATION_ORIGIN) {
    if (!Number.isInteger(PORT) || PORT < 1024 || PORT > 65535) {
      throw new Error(`VALIDATION_PORT must be an integer from 1024 to 65535`);
    }
    await access(path.join(process.cwd(), EXPORT_DIR, "404.html"));
    await assertPortAvailable();

    const staticServer = path.join(
      process.cwd(),
      "scripts",
      "serve-static-export.mjs",
    );
    server = spawn(
      process.execPath,
      [staticServer],
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          EXPORT_DIR,
          HOST,
          NODE_ENV: "production",
          PORT: String(PORT),
        },
      },
    );
    for (const stream of [server.stdout, server.stderr]) {
      stream.setEncoding("utf8");
      stream.on("data", (chunk) => {
        serverOutput = `${serverOutput}${chunk}`.slice(-8_000);
      });
    }
    await waitForServer();
  }

  const sitemap = await requestPublic(`${PUBLIC_ORIGIN}/sitemap.xml`);
  if (sitemap.status !== 200) {
    throw new Error(`Sitemap returned ${sitemap.status}`);
  }
  const sitemapUrls = [
    ...sitemap.body.matchAll(/<loc>([\s\S]*?)<\/loc>/gi),
  ].map((match) => decodeHtml(match[1]).trim());
  const sitemapSet = new Set(sitemapUrls);
  if (sitemapUrls.length === 0) fail("/sitemap.xml: contains no URLs");
  if (sitemapSet.size !== sitemapUrls.length) {
    fail("/sitemap.xml: contains duplicate URLs");
  }

  for (const url of sitemapUrls) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      fail(`/sitemap.xml: invalid URL "${url}"`);
      continue;
    }
    if (parsed.origin !== PUBLIC_ORIGIN) {
      fail(`${url}: sitemap URL must use ${PUBLIC_ORIGIN}`);
    }
    if (/^\/en(?:\/|$)/.test(parsed.pathname)) {
      fail(`${url}: sitemap URL has an /en prefix`);
    }
  }

  const duplicateMetadata = new Map();
  const internalTargets = new Set();
  await mapWithConcurrency(sitemapUrls, 8, async (url) => {
    const page = await requestPublic(url);
    if (page.status !== 200) {
      fail(`${url}: sitemap URL returned ${page.status} instead of direct 200`);
      return;
    }
    assertMetadata(url, page, duplicateMetadata);
    await assertHreflang(url, page);
    await assertInternalLinks(url, page, internalTargets);
  });

  await mapWithConcurrency([...internalTargets], 8, assertInternalTarget);
  await assertExcludedRoutes(sitemapSet);
  await assertSpecialRoutes();
  await assertNoJsShowcase();
  await assertFeatureDetailVisuals();

  if (errors.length > 0) {
    console.error(`Production validation failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log(
      `Production validation passed (${sitemapUrls.length} sitemap URLs, ${internalTargets.size} internal targets).`,
    );
  }
}

try {
  await run();
} catch (error) {
  console.error(`Production validation could not run: ${error.message}`);
  process.exitCode = 1;
} finally {
  await stopServer();
}
