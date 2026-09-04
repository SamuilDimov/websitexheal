"use client";

import { useEffect, useRef } from "react";

/**
 * Page background: a sphere of short indigo dashes laid out on latitude
 * rings, drawn on a fixed layer behind the homepage. Scroll drives it: a set
 * of keyframes moves the sphere's centre, radius, tilt and surface, and a
 * separate envelope (see `WINDOWS`) decides where on the page it is visible
 * at all — one stretch at the end, Proof through the FAQ. It also idles round
 * its vertical axis and turns with the scroll.
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
 * names a section and a fraction `p` through that section's own travel past
 * the viewport, and poses ease (smoothstep) between keys.
 *
 * `cx`/`cy`: centre as viewport fractions. `r`: radius as fractions of
 * [height, width], the larger wins. `tilt`: rotation toward the viewer.
 * `shape`: which surface the points sit on; every shape is built from the
 * same (latitude, longitude) grid, so the points themselves travel between
 * shapes as the scroll moves from one key to the next: the sphere collapses
 * into a needle, the needle opens into a funnel, the funnel flattens into a
 * lens. That is the reference's behaviour, where the cloud pinches to a
 * point under the dashboard and re-expands as a swirling column. `band`: the
 * latitude range drawn, with soft edges, which turns a sphere into a dome or
 * a bowl. `gain`: overall opacity.
 */
type Shape = "sphere" | "needle" | "funnel" | "lens" | "ring";
type Key = {
  sel: string;
  /**
   * Where in the section's own travel the pose lands: 0 as its top reaches
   * the bottom of the viewport, 1 as its bottom clears the top, 0.5 when the
   * two centres meet. Expressing it as a fraction of `height + viewport`
   * rather than as a pixel anchor is what makes the sequence hold its order
   * on any screen — with fixed anchors, a viewport taller than the section
   * reorders the keys and the shapes play out of sequence. Several keys per
   * section is what keeps it moving: with one, the lattice reached its pose
   * and then sat still until the next section, and the taller the screen the
   * longer it sat.
   */
  p: number;
  cx: number;
  cy: number;
  r: readonly [number, number];
  tilt: number;
  shape: Shape;
  band: readonly [number, number];
  gain: number;
};

const KEYS: readonly Key[] = [
  // Above the window, so never drawn. They still matter: the lattice grows
  // out of the pose it is holding when Proof arrives, so the last of these is
  // the shape it opens from.
  { sel: "#hero", p: 0.5, cx: 0.5, cy: 1.06, r: [0.66, 0.56], tilt: 0, shape: "sphere", band: [0, 1], gain: 1 },
  { sel: '[aria-labelledby="problem-heading"]', p: 0.5, cx: 0.5, cy: 0.6, r: [0.5, 0.36], tilt: 0.15, shape: "needle", band: [-1, 1], gain: 1.3 },
  { sel: "#how-it-works", p: 0.5, cx: 0.38, cy: 0.55, r: [0.6, 0.42], tilt: 0.25, shape: "funnel", band: [-1, 1], gain: 1.05 },
  { sel: '[aria-labelledby="signals-heading"]', p: 0.5, cx: 0.5, cy: 0.62, r: [0.55, 0.45], tilt: 1.15, shape: "lens", band: [-1, 1], gain: 1.1 },
  { sel: "#features", p: 0.5, cx: 0.15, cy: 0.85, r: [0.62, 0.46], tilt: 0.7, shape: "sphere", band: [-1, 1], gain: 0.85 },
  { sel: "#digital-twin", p: 0.5, cx: 0.5, cy: 0.5, r: [0.3, 0.2], tilt: 0.5, shape: "needle", band: [-1, 1], gain: 0.6 },

  // The visible run: five poses across Proof and the FAQ, so the shape is
  // still travelling when the closing arrives. It rises as a funnel from the
  // bottom edge, opens into a bowl hanging from the top, swings down into a
  // globe, flattens into a lens behind the questions, then tips into a ring
  // and drifts off to the left as the page ends.
  { sel: '[aria-labelledby="proof-heading"]', p: 0.2, cx: 0.58, cy: 1.05, r: [0.55, 0.4], tilt: 0.1, shape: "funnel", band: [-1, 1], gain: 0.8 },
  { sel: '[aria-labelledby="proof-heading"]', p: 0.45, cx: 0.5, cy: -0.08, r: [0.62, 0.52], tilt: 0, shape: "sphere", band: [-1, 0], gain: 0.95 },
  { sel: '[aria-labelledby="proof-heading"]', p: 0.78, cx: 0.44, cy: 0.34, r: [0.66, 0.5], tilt: 0.55, shape: "sphere", band: [-1, 1], gain: 1 },
  { sel: "#faq", p: 0.45, cx: 0.5, cy: 0.52, r: [0.6, 0.46], tilt: 1.15, shape: "lens", band: [-1, 1], gain: 1.05 },
  { sel: "#faq", p: 0.9, cx: 0.3, cy: 0.72, r: [0.54, 0.44], tilt: 0.85, shape: "ring", band: [-1, 1], gain: 1 },
];

/**
 * Where the lattice is allowed to show: one stretch at the end of the page,
 * Proof through the FAQ, the last thing before the dark close. Everything
 * above it — hero, Problem, How it works, Signals, Features, Digital Twin —
 * is plain light ground with nothing drawn. Ranges are read from the live
 * layout (`from` element's top to `to` element's bottom).
 */
const WINDOWS: readonly { from: string; to: string }[] = [
  { from: '[aria-labelledby="proof-heading"]', to: "#faq" },
];

type Pose = {
  cx: number;
  cy: number;
  r: number;
  tilt: number;
  gain: number;
  shapeA: Shape;
  shapeB: Shape;
  /** 0 = shapeA, 1 = shapeB. */
  mix: number;
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
    out.push({ key, y: top - vh + (rect.height + vh) * key.p });
  }
  return out.sort((a, b) => a.y - b.y);
}

/** Document-space [start, end] of each window, from the live layout. */
function windowRanges(): [number, number][] {
  const out: [number, number][] = [];
  for (const w of WINDOWS) {
    const a = document.querySelector(w.from);
    const b = document.querySelector(w.to);
    if (!a || !b) continue;
    out.push([a.getBoundingClientRect().top + window.scrollY, b.getBoundingClientRect().bottom + window.scrollY]);
  }
  return out;
}

const smooth = (u: number) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));

/**
 * Overall opacity from the windows, tied to how much of the screen the range
 * owns rather than to a scroll fraction: it rises as the range's top travels
 * from the bottom of the viewport to the top, and falls again over the last
 * viewport before its end. So the lattice is invisible while Features still
 * holds the screen, is at full strength once Proof fills it, and is gone by
 * the time the closing has risen into place.
 */
function envelopeAt(ranges: [number, number][], scrollY: number, vh: number): number {
  const fade = Math.max(1, vh * 0.9);
  let out = 0;
  for (const [start, end] of ranges) {
    const rise = (scrollY + vh - start) / fade;
    const fall = (end - scrollY) / fade;
    const c = smooth(Math.min(rise, fall));
    if (c > out) out = c;
  }
  return out;
}


function poseAt(stops: { key: Key; y: number }[], scrollY: number, width: number, height: number): Pose {
  const toPose = (k: Key): Pose => ({
    cx: k.cx * width,
    cy: k.cy * height,
    r: Math.max(height * k.r[0], width * k.r[1]),
    tilt: k.tilt,
    gain: k.gain,
    shapeA: k.shape,
    shapeB: k.shape,
    mix: 0,
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
    shapeA: a.shapeA,
    shapeB: b.shapeA,
    mix: u,
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
    // One (latitude, longitude) grid, realised as several surfaces. `sphere`
    // doubles as the band reference (its y is sin(latitude)).
    const empty = new Float32Array(0);
    const shapes: Record<Shape, Float32Array> = { sphere: empty, needle: empty, funnel: empty, lens: empty, ring: empty };
    let count3 = 0;
    let visible = true;
    let raf = 0;
    let last = 0;
    let angle = 0;
    let scrollY = window.scrollY;
    let stops: { key: Key; y: number }[] = [];
    let ranges: [number, number][] = [];
    let dirty = true;
    const measure = () => {
      stops = keyStops();
      ranges = windowRanges();
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
      const spacing = width < 768 ? 12 : 9;
      const latStep = spacing / radius;
      const sphere: number[] = [];
      const needle: number[] = [];
      const funnel: number[] = [];
      const lens: number[] = [];
      const ring: number[] = [];
      // Whole sphere grid: the tilt keyframes bring the pole and the underside
      // into view. Ring counts follow cos(latitude) but keep 45 % at the
      // poles, so the shapes that are wide where the sphere is narrow (the
      // funnel's mouth) still have points to spend.
      for (let lat = -Math.PI / 2 + latStep; lat < Math.PI / 2 - latStep / 2; lat += latStep) {
        const c = Math.cos(lat);
        const v = Math.sin(lat); // -1 (bottom) .. 1 (top)
        const count = Math.max(8, Math.round(((2 * Math.PI * radius) / spacing) * (0.45 + 0.55 * c)));
        // Offset alternate rings by half a step so the grid reads as a lattice.
        const phase = (Math.round(lat / latStep) % 2) * (Math.PI / count);
        for (let i = 0; i < count; i++) {
          const lon = (i / count) * Math.PI * 2 + phase;
          const sl = Math.sin(lon);
          const cl = Math.cos(lon);
          sphere.push(c * sl, v, c * cl);
          // Needle: a thin dense column, slightly wider at the ends.
          const rn = 0.035 + 0.06 * v * v;
          needle.push(rn * sl, 0.7 * v, rn * cl);
          // Funnel: narrow at the top, opening downward, with a twist so the
          // meridians swirl the way the reference's column does.
          const t = (1 - v) / 2;
          const rf = 0.05 + 0.95 * Math.pow(t, 1.9);
          const tw = lon + 2.4 * (1 - t);
          funnel.push(rf * Math.sin(tw), 1.05 * v, rf * Math.cos(tw));
          // Lens: a flat disc, circle profile, a tenth of the height.
          lens.push(c * sl, 0.1 * v, c * cl);
          // Ring: a torus; latitude becomes the angle round the tube.
          const th = lat * 2;
          const rr = 0.82 + 0.18 * Math.cos(th);
          ring.push(rr * sl, 0.18 * Math.sin(th), rr * cl);
        }
      }
      shapes.sphere = new Float32Array(sphere);
      shapes.needle = new Float32Array(needle);
      shapes.funnel = new Float32Array(funnel);
      shapes.lens = new Float32Array(lens);
      shapes.ring = new Float32Array(ring);
      count3 = shapes.sphere.length;
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Outside the two windows there is nothing to draw; a cleared canvas
      // costs a fill and skips the ~3k projections.
      const env = envelopeAt(ranges, scrollY, height);
      if (env <= 0.004) return;

      const pose = poseAt(stops, scrollY, width, height);
      const [bandLo, bandHi] = pose.band;
      const bandSoft = 0.16;
      const A = shapes[pose.shapeA];
      const B = shapes[pose.shapeB];
      const ref = shapes.sphere;
      const m = pose.mix;
      const m1 = 1 - m;
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

      // Alpha buckets so each stroke style is set once per frame. Twenty-eight
      // steps put the banding below what the eye picks up on a full-height
      // sphere; ten showed as visible contour rings.
      const buckets = 28;
      const paths: Path2D[] = Array.from({ length: buckets }, () => new Path2D());

      for (let i = 0; i < count3; i += 3) {
        const lat = ref[i + 1];
        // Latitude band with soft edges: dome, ring or bowl.
        const bandA =
          Math.min(1, Math.max(0, (lat - bandLo + bandSoft) / bandSoft)) *
          Math.min(1, Math.max(0, (bandHi + bandSoft - lat) / bandSoft));
        if (bandA <= 0) continue;
        // The point travels between the two shapes, then spins about the
        // vertical axis, then tilts toward the viewer.
        const x0 = A[i] * m1 + B[i] * m;
        const y1 = A[i + 1] * m1 + B[i + 1] * m;
        const z0 = A[i + 2] * m1 + B[i + 2] * m;
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
        a *= (0.4 + 0.6 * drop * drop) * pose.gain * env;
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
      // A true hairline at 2x: the canvas is no longer blurred, so the stroke
      // carries the softness itself rather than borrowing it from a filter.
      ctx.lineWidth = 1.15;
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
