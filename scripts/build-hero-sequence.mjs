#!/usr/bin/env node
/**
 * Build the hero phone frame sequence.
 *
 *   node scripts/build-hero-sequence.mjs <input> [--step 3] [--crop W:H:X:Y] [--key]
 *
 * With an alpha source and no --crop, the phone's bounding box is detected
 * from the alpha channel automatically.
 *
 * <input> is either an .mp4/.mov render or a directory of PNG frames with
 * alpha (the After Effects "PNG Sequence, RGB + Alpha, Straight" export).
 * Every `step`-th frame is kept, cropped to the phone's bounding box, and
 * written as WebP with alpha at two widths (lg for desktop, sm for mobile)
 * into public/images/hero-seq/. A manifest.json records the frame count and
 * sizes for the HeroSequence component.
 *
 * --key removes a black background (for renders without alpha). It is a
 * stand-in until the alpha export exists: pure-black UI areas get keyed too.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const input = args.find((a) => !a.startsWith("--"));
if (!input) {
  console.error("usage: build-hero-sequence.mjs <input.mp4|frames-dir> [--step 3] [--crop W:H:X:Y] [--keep 0-90,190-252] [--lg 960] [--sm 480] [--quality 80] [--sharpen 0.55] [--key]");
  process.exit(1);
}
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};
const step = Number(opt("step", "3"));
const crop = opt("crop", "");
const key = args.includes("--key");
// Motion frames are on screen for ~20 ms each, so they carry a lower quality
// than the resting still, which is studied.
const seqQuality = opt("quality", "80");
// Two lanczos passes (render -> WebP -> canvas) soften UI text at small sizes.
// A mild unsharp after the downscale restores the edge contrast of the source
// screenshot. 0 disables it.
const sharpen = Number(opt("sharpen", "0.55"));
const sharpenFilter = sharpen > 0 ? `,unsharp=5:5:${sharpen}:3:3:0` : "";
// Source-frame ranges to keep, e.g. "0-90,190-252". Frames outside are never shown
// (the hold pose is static), so they are not generated.
const keep = opt("keep", "").split(",").filter(Boolean).map((r) => r.split("-").map(Number));
const outRoot = path.resolve("public/images/hero-seq");
// Output widths. The canvas is at most 480 CSS px wide and draws at up to 2x
// device pixel ratio, so 960 is the point where a Retina display stops
// upscaling. Defaults suit a 2x AE render (2160 x 3840); pass --lg/--sm lower
// for a 1x source, where a larger output would only upscale.
const sizes = { lg: Number(opt("lg", "960")), sm: Number(opt("sm", "480")) };

const isDir = statSync(input).isDirectory();
let inputArgs;
let stagingDir;
if (isDir) {
  const files = readdirSync(input).filter((f) => /\.png$/i.test(f)).sort();
  if (files.length === 0) throw new Error("no PNG frames in " + input);
  // ffmpeg's image2 demuxer needs a printf pattern, and AE names frames
  // "Comp_00000.png" with an arbitrary prefix, so stage symlinks with a clean
  // pattern. This must live outside outRoot, which is wiped below.
  stagingDir = mkdtempSync(path.join(tmpdir(), "hero-seq-"));
  const tmp = stagingDir;
  files.forEach((f, i) => {
    spawnSync("ln", ["-s", path.resolve(input, f), path.join(tmp, `in${String(i).padStart(5, "0")}.png`)]);
  });
  inputArgs = ["-framerate", "60", "-i", path.join(tmp, "in%05d.png")];
} else {
  inputArgs = ["-i", input];
}

const keepExpr = keep.length ? "*(" + keep.map(([a, b]) => `between(n\\,${a}\\,${b})`).join("+") + ")" : "";
// Auto-crop: find the union bounding box of non-transparent pixels across the
// kept frames, so an alpha export needs no manual --crop. cropdetect on the
// alpha channel with reset=0 accumulates one box over the whole range.
// skip=0 matters: the default skips the first frames, where the phone is
// often at its topmost position, which would clip it.
function detectAlphaCrop() {
  const probe = spawnSync(
    "ffmpeg",
    ["-hide_banner", "-y", ...inputArgs, "-vf", `select='not(mod(n\\,${step}))${keepExpr}',alphaextract,cropdetect=limit=0:round=2:reset=0:skip=0`, "-f", "null", "-"],
    { encoding: "utf8" },
  );
  const boxes = [...(probe.stderr || "").matchAll(/crop=(\d+):(\d+):(\d+):(\d+)/g)];
  if (boxes.length === 0) return "";
  const [w, h, x, y] = boxes[boxes.length - 1].slice(1).map(Number);
  // Pad by 1 % so anti-aliased edges are never clipped.
  const pad = Math.round(Math.max(w, h) * 0.01) * 2;
  return `${w + pad * 2}:${h + pad * 2}:${Math.max(0, x - pad)}:${Math.max(0, y - pad)}`;
}

let cropSpec = crop;
if (!cropSpec && !key) {
  cropSpec = detectAlphaCrop();
  if (cropSpec) console.log(`auto-crop from alpha: ${cropSpec}`);
}

// Source width of the cropped phone. Upscaling past it adds bytes, not detail,
// so both the sequence and the hold still are capped here.
const sourceWidth = cropSpec ? Number(cropSpec.split(":")[0]) : Infinity;

const filters = [`select='not(mod(n\\,${step}))${keepExpr}'`, "setpts=N/FRAME_RATE/TB"];
if (cropSpec) filters.push(`crop=${cropSpec}`);
if (key) filters.push("colorkey=0x000000:0.03:0.02");
filters.push("format=rgba");

rmSync(outRoot, { recursive: true, force: true });
// ffmpeg here may lack libwebp, so frames go out as RGBA PNG and cwebp converts them.
for (const [name, width] of Object.entries(sizes)) {
  const dir = path.join(outRoot, name);
  const tmp = path.join(outRoot, `.tmp-${name}`);
  mkdirSync(dir, { recursive: true });
  mkdirSync(tmp, { recursive: true });
  const vf = [...filters, `scale=${Math.min(width, sourceWidth)}:-2:flags=lanczos`].join(",") + sharpenFilter;
  const result = spawnSync(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", "-y", ...inputArgs, "-vf", vf, "-vsync", "0", path.join(tmp, "f%03d.png")],
    { stdio: "inherit" },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
  for (const f of readdirSync(tmp).filter((x) => x.endsWith(".png")).sort()) {
    const out = path.join(dir, f.replace(/\.png$/, ".webp"));
    const r = spawnSync("cwebp", ["-quiet", "-q", seqQuality, "-alpha_q", "88", "-m", "6", path.join(tmp, f), "-o", out], { stdio: "inherit" });
    if (r.status !== 0) process.exit(r.status ?? 1);
  }
  rmSync(tmp, { recursive: true, force: true });
}
// The resting pose is on screen for as long as the visitor reads the hero, so
// it gets its own still at twice the sequence width. Motion frames flash past
// in ~20 ms each and can stay smaller.
const holdSource = Number(opt("hold", keep.length ? String(keep[0][1]) : "90"));
const holdFrames = {};
for (const [name, width] of Object.entries(sizes)) {
  const tmp = mkdtempSync(path.join(tmpdir(), `hero-hold-${name}-`));
  const holdFilters = [...filters.filter((f) => !f.startsWith("select=") && !f.startsWith("setpts="))];
  const holdWidth = Math.min(width * 2, sourceWidth);
  const vf = [`select='eq(n\\,${holdSource})'`, ...holdFilters, `scale=${holdWidth}:-2:flags=lanczos`].join(",") + sharpenFilter;
  const png = path.join(tmp, "hold.png");
  const r = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...inputArgs, "-vf", vf, "-frames:v", "1", png], { stdio: "inherit" });
  if (r.status === 0) {
    const out = path.join(outRoot, `hold-${name}.webp`);
    const c = spawnSync("cwebp", ["-quiet", "-q", "92", "-alpha_q", "98", "-m", "6", png, "-o", out], { stdio: "inherit" });
    if (c.status === 0) holdFrames[name] = { width: holdWidth, bytes: statSync(out).size };
  }
  rmSync(tmp, { recursive: true, force: true });
}

if (stagingDir) rmSync(stagingDir, { recursive: true, force: true });

const frames = readdirSync(path.join(outRoot, "lg")).filter((f) => f.endsWith(".webp")).sort();
const probe = spawnSync("webpinfo", [path.join(outRoot, "lg", frames[0])], { encoding: "utf8" });
const w = Number(/Width:\s*(\d+)/.exec(probe.stdout)?.[1]);
const h = Number(/Height:\s*(\d+)/.exec(probe.stdout)?.[1]);
const bytes = (dir) => readdirSync(dir).reduce((a, f) => a + statSync(path.join(dir, f)).size, 0);
const sourceFrames = [];
{
  // Reproduce the select expression to know which source frame each output is.
  const total = 100000;
  for (let n = 0; n < total && sourceFrames.length < frames.length; n++) {
    if (n % step !== 0) continue;
    if (keep.length && !keep.some(([a, b]) => n >= a && n <= b)) continue;
    sourceFrames.push(n);
  }
}
const manifest = {
  count: frames.length,
  step,
  frames: sourceFrames,
  sourceFps: 60,
  aspect: { width: w, height: h },
  // Record the width actually written, which may be clamped to the source.
  sizes: Object.fromEntries(
    Object.entries(sizes).map(([k, width]) => {
      const first = readdirSync(path.join(outRoot, k)).filter((f) => f.endsWith(".webp")).sort()[0];
      const info = spawnSync("webpinfo", [path.join(outRoot, k, first)], { encoding: "utf8" }).stdout || "";
      const actual = Number(/Width:\s*(\d+)/.exec(info)?.[1]) || Math.min(width, sourceWidth);
      return [k, { width: actual, requested: width, bytes: bytes(path.join(outRoot, k)) }];
    }),
  ),
  // Beat boundaries in source frames, taken from the --keep ranges, so the
  // component never hardcodes them.
  beats: keep.length >= 2
    ? { introEnd: keep[0][1], exitStart: keep[1][0], exitEnd: keep[1][1] }
    : null,
  hold: Object.keys(holdFrames).length
    ? { sourceFrame: holdSource, index: sourceFrames.indexOf(holdSource), sizes: holdFrames }
    : null,
  crop: cropSpec || null,
  keyed: key,
  generatedAt: new Date().toISOString(),
};
writeFileSync(path.join(outRoot, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
const holdKB = manifest.hold ? ` + hold still ${(manifest.hold.sizes.lg.bytes / 1024).toFixed(0)} KB @ ${manifest.hold.sizes.lg.width}px` : "";
console.log(`hero-seq: ${frames.length} frames, ${w}x${h}, lg ${(manifest.sizes.lg.bytes / 1024).toFixed(0)} KB, sm ${(manifest.sizes.sm.bytes / 1024).toFixed(0)} KB${holdKB}${key ? " (black-keyed stand-in)" : ""}`);
