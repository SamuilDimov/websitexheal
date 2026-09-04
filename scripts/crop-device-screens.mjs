import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "node:fs";

/**
 * The ten 810x1654 screenshots are the same device-render template: a
 * titanium body with the app screen inset at a fixed rect. Measured on three
 * of them independently (x 40..769, y 35..1617, +-1px of antialiasing), so
 * one constant rect is applied to all rather than detecting per file —
 * per-file detection keyed off the app's dark background and mis-fired on
 * screens that open a light sheet.
 */
const RECT = { left: 40, top: 35, width: 730, height: 1583 };
const dir = "public/images/screenshots";

for (const f of readdirSync(dir).sort()) {
  if (!/\.(png|webp)$/.test(f)) continue;
  const path = `${dir}/${f}`;
  const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const midY = Math.round(h / 2);
  const edgeAlpha = data[(midY * w + 2) * c + 3];
  if (!(w === 810 && h === 1654 && edgeAlpha === 0)) { console.log(`skip  ${f.padEnd(30)} ${w}x${h} (bare screen already)`); continue; }

  const before = statSync(path).size;
  const pipe = sharp(path).extract(RECT);
  const buf = await (f.endsWith(".webp") ? pipe.webp({ quality: 90 }) : pipe.png({ compressionLevel: 9 })).toBuffer();
  writeFileSync(path, buf);
  console.log(`crop  ${f.padEnd(30)} 810x1654 -> ${RECT.width}x${RECT.height}   ${(before/1024|0)}K -> ${(buf.length/1024|0)}K`);
}
