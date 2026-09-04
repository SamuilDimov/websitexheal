"use client";

import { useEffect, useRef } from "react";

/**
 * Page background: a sphere of short indigo dashes laid out on latitude
 * rings, drawn on a fixed layer behind the whole homepage. Scroll drives it:
 * a set of keyframes over page progress moves the sphere's centre, radius and
 * tilt, so it opens as a horizon dome under the hero, drifts up behind the
 * phone, sits large and low under the features, and hangs from the top edge
 * with its pole toward the viewer by the FAQ. It also idles round its
 * vertical axis and turns with the scroll.
 *
 * Reference: the Three.js particle dome on tranquil-495tmg.peachworlds.com
 * (black ground, additive cyan glow). This is the light-ground reading of the
 * same idea: one brand colour, opacity by depth instead of bloom, no library.
 * It is a 2D canvas with a hand-rolled perspective projection; ~3k dashes
 * per frame is cheap, and the dependency-free route keeps `three` (≈150 KB
 * gzipped) out of the bundle for a decoration.
 *
 * - Front-facing dashes are darker, back-facing ones fade to nothing, which
 *   is what reads as volume without any glow.
 * - A vertical weight keeps the apex quieter than the horizon, so headlines
 *   sit on calmer ground than the base of the viewport.
 * - Pauses off-screen and when the tab is hidden; `prefers-reduced-motion`
 *   draws a single still frame.
 */
/**
 * Poses are anchored to the homepage sections, not to page fractions, so the
 * shape answers the content beside it and survives copy changes. Each key
 * names a section; its pose is reached when that section's anchor (`top` or
 * `center`) meets the viewport's, and poses ease (smoothstep) between keys.
 *
 * `cx`/`cy`: centre as viewport fractions. `r`: radius as fractions of
 * [height, width], the larger wins. `tilt`: rotation toward the viewer.
 * `squash`: scale of the unit sphere on [x, y, z] before rotation, which is
 * what turns the globe into a disc or a pill. `band`: the latitude range
 * (y in −1..1) that is drawn, with soft edges, which is what turns it into a
 * dome, a ring or a bowl. `gain`: overall opacity.
 */
type Key = {
  sel: string;
  at: "top" | "center";
  cx: number;
  cy: number;
  r: readonly [number, number];
  tilt: number;
  squash: readonly [number, number, number];
  band: readonly [number, number];
  gain: number;
};

const KEYS: readonly Key[] = [
  // Hero: the horizon dome the reference opens with.
  { sel: "#hero", at: "top", cx: 0.5, cy: 1.06, r: [0.66, 0.56], tilt: 0, squash: [1, 1, 1], band: [0, 1], gain: 1 },
  // Problem ("normal tests, real symptoms"): the data flattened to a disc, seen from above.
  { sel: '[aria-labelledby="problem-heading"]', at: "center", cx: 0.5, cy: 0.58, r: [0.56, 0.44], tilt: 1.15, squash: [1.25, 0.3, 1.25], band: [-1, 1], gain: 0.9 },
  // How it works: the twin assembles into a whole globe behind the phone.
  { sel: "#how-it-works", at: "center", cx: 0.78, cy: 0.5, r: [0.42, 0.3], tilt: 0.45, squash: [1, 1, 1], band: [-1, 1], gain: 0.95 },
  // Signals: a wide tilted ring around the three cards.
  { sel: '[aria-labelledby="signals-heading"]', at: "center", cx: 0.5, cy: 0.62, r: [0.44, 0.32], tilt: 1.2, squash: [1.25, 1, 1.25], band: [-0.3, 0.3], gain: 1.15 },
  // Features: large and low-left, the lattice behind the bento.
  { sel: "#features", at: "center", cx: 0.15, cy: 0.85, r: [0.62, 0.46], tilt: 0.7, squash: [1, 1, 1], band: [-1, 1], gain: 0.85 },
  // Digital Twin chapter covers the layer; pass through the centre unseen.
  { sel: "#digital-twin", at: "center", cx: 0.5, cy: 0.5, r: [0.4, 0.3], tilt: 1, squash: [1, 1, 1], band: [-1, 1], gain: 0.6 },
  // Proof: a bowl hanging from the top edge.
  { sel: '[aria-labelledby="proof-heading"]', at: "center", cx: 0.5, cy: -0.08, r: [0.62, 0.52], tilt: 0, squash: [1, 1, 1], band: [-1, 0], gain: 0.95 },
  // FAQ: a flat disc from above, settling before the footer covers it.
  { sel: "#faq", at: "center", cx: 0.5, cy: 0.12, r: [0.6, 0.5], tilt: 1.3, squash: [1.3, 0.4, 1.3], band: [-1, 1], gain: 0.85 },
];

type Pose = {
  cx: number;
  cy: number;
  r: number;
  tilt: number;
  gain: number;
  squash: [number, number, number];
  band: [number, number];
};

/** Scroll position at which each key's pose is reached, from the live layout. */
function keyStops(): { key: Key; y: number }[] {
  const vh = window.innerHeight;
  const out: { key: Key; y: number }[] = [];
  for (const key of KEYS) {
    const el = document.querySelector(key.sel);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    out.push({ key, y: key.at === "top" ? top : top + rect.height / 2 - vh / 2 });
  }
  return out.sort((a, b) => a.y - b.y);
}

function poseAt(stops: { key: Key; y: number }[], scrollY: number, width: number, height: number): Pose {
  const toPose = (k: Key): Pose => ({
    cx: k.cx * width,
    cy: k.cy * height,
    r: Math.max(height * k.r[0], width * k.r[1]),
    tilt: k.tilt,
    gain: k.gain,
    squash: [k.squash[0], k.squash[1], k.squash[2]],
    band: [k.band[0], k.band[1]],
  });
  if (stops.length === 0) return toPose(KEYS[0]);
  if (scrollY <= stops[0].y) return toPose(stops[0].key);
  const last = stops[stops.length - 1];
  if (scrollY >= last.y) return toPose(last.key);
  let i = 0;
  while (i < stops.length - 2 && scrollY > stops[i + 1].y) i++;
  const a = toPose(stops[i].key);
  const b = toPose(stops[i + 1].key);
  const u0 = (scrollY - stops[i].y) / Math.max(1, stops[i + 1].y - stops[i].y);
  const u = u0 <= 0 ? 0 : u0 >= 1 ? 1 : u0 * u0 * (3 - 2 * u0);
  const mix = (x: number, y: number) => x + (y - x) * u;
  return {
    cx: mix(a.cx, b.cx),
    cy: mix(a.cy, b.cy),
    r: mix(a.r, b.r),
    tilt: mix(a.tilt, b.tilt),
    gain: mix(a.gain, b.gain),
    squash: [mix(a.squash[0], b.squash[0]), mix(a.squash[1], b.squash[1]), mix(a.squash[2], b.squash[2])],
    band: [mix(a.band[0], b.band[0]), mix(a.band[1], b.band[1])],
  };
}

export default function DotDome({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const BRAND = "71, 100, 255";

    let width = 0;
    let height = 0;
    let dpr = 1;
    // Unit-sphere points: [x, y, z] with y up.
    let points: Float32Array = new Float32Array(0);
    let visible = true;
    let raf = 0;
    let last = 0;
    let angle = 0;
    let scrollY = window.scrollY;
    let stops: { key: Key; y: number }[] = [];
    let dirty = true;
    const measure = () => {
      stops = keyStops();
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      // Ring spacing in screen px at the largest radius the keyframes use;
      // denser on wide screens, sparser on phones so the frame stays cheap.
      const radius = Math.max(height * 0.7, width * 0.6);
      const spacing = width < 768 ? 13 : 10;
      const latStep = spacing / radius;
      const out: number[] = [];
      // Whole sphere: the tilt keyframes bring the pole and the underside
      // into view.
      for (let lat = -Math.PI / 2 + latStep; lat < Math.PI / 2 - latStep / 2; lat += latStep) {
        const ringR = Math.cos(lat);
        const count = Math.max(6, Math.round((2 * Math.PI * ringR * radius) / spacing));
        // Offset alternate rings by half a step so the grid reads as a lattice.
        const phase = (Math.round(lat / latStep) % 2) * (Math.PI / count);
        for (let i = 0; i < count; i++) {
          const lon = (i / count) * Math.PI * 2 + phase;
          out.push(ringR * Math.sin(lon), Math.sin(lat), ringR * Math.cos(lon));
        }
      }
      points = new Float32Array(out);
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const pose = poseAt(stops, scrollY, width, height);
      const [qx, qy, qz] = pose.squash;
      const [bandLo, bandHi] = pose.band;
      const bandSoft = 0.16;
      const radius = pose.r;
      const cx = pose.cx;
      const cy = pose.cy;
      // Camera distance in sphere units; smaller = more curvature.
      const camera = 2.6;
      const dashLen = width < 768 ? 4 : 5;
      // Idle spin plus scroll: one revolution per ~10,000 px of page.
      const theta = angle + scrollY * 0.00063;
      const cosA = Math.cos(theta);
      const sinA = Math.sin(theta);
      const cosT = Math.cos(pose.tilt);
      const sinT = Math.sin(pose.tilt);

      // Alpha buckets so each stroke style is set once per frame.
      const buckets = 10;
      const paths: Path2D[] = Array.from({ length: buckets }, () => new Path2D());

      for (let i = 0; i < points.length; i += 3) {
        const lat = points[i + 1];
        // Latitude band with soft edges: dome, ring or bowl.
        const bandA =
          Math.min(1, Math.max(0, (lat - bandLo + bandSoft) / bandSoft)) *
          Math.min(1, Math.max(0, (bandHi + bandSoft - lat) / bandSoft));
        if (bandA <= 0) continue;
        // Squash the unit sphere (disc, pill), then spin about the vertical
        // axis, then tilt the pole toward the viewer.
        const x0 = points[i] * qx;
        const y1 = lat * qy;
        const z0 = points[i + 2] * qz;
        const x = x0 * cosA + z0 * sinA;
        const z1 = -x0 * sinA + z0 * cosA;
        const y = y1 * cosT - z1 * sinT;
        const z = y1 * sinT + z1 * cosT;
        if (z < -0.15) continue; // behind the silhouette: nearly invisible

        const scale = camera / (camera - z);
        const sx = cx + x * radius * scale;
        const sy = cy - y * radius * scale;
        if (sy < -dashLen || sy > height + dashLen || sx < -dashLen || sx > width + dashLen) continue;

        // Depth: 1 at the front, 0 at the silhouette, negative behind.
        let a = 0.1 + 0.52 * Math.max(0, z);
        if (z < 0) a = 0.1 * (1 + z / 0.15);
        a *= bandA;
        // Weight toward the lower part of the sphere: quieter at the top,
        // full at the base, the way the reference dome brightens downward.
        const drop = Math.min(1, Math.max(0, (sy - (cy - radius)) / (2 * radius)));
        a *= (0.4 + 0.6 * drop * drop) * pose.gain;
        if (a < 0.01) continue;

        // Dash along the meridian: the screen direction toward the pole.
        const len = dashLen * (0.6 + 0.4 * scale);
        const dx = sx - cx;
        const dy = sy - cy;
        const d = Math.hypot(dx, dy) || 1;
        const ux = (dx / d) * len * 0.5;
        const uy = (dy / d) * len * 0.5;
        const b = Math.min(buckets - 1, Math.floor(a * buckets * 1.6));
        paths[b].moveTo(sx - ux, sy - uy);
        paths[b].lineTo(sx + ux, sy + uy);
      }

      ctx.lineCap = "round";
      ctx.lineWidth = 1.6;
      for (let b = 0; b < buckets; b++) {
        const alpha = ((b + 0.5) / buckets) / 1.6;
        ctx.strokeStyle = `rgba(${BRAND}, ${alpha.toFixed(3)})`;
        ctx.stroke(paths[b]);
      }
    };

    const tick = (now: number) => {
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      // Idle: one revolution in roughly two minutes.
      angle += dt * 0.05;
      draw();
      dirty = false;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduced) {
        // No idle spin, but the lattice still follows the scroll position.
        if (dirty) {
          draw();
          dirty = false;
        }
        return;
      }
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    build();
    measure();
    start();

    const ro = new ResizeObserver(() => {
      build();
      measure();
      draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onScroll = () => {
      scrollY = window.scrollY;
      measure();
      dirty = true;
      if (reduced && visible) start();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", measure);

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`dot-dome pointer-events-none ${className}`} />;
}
