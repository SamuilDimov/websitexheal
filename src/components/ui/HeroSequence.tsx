"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import manifest from "../../../public/images/hero-seq/manifest.json";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero phone as a scroll-driven frame sequence (the Ultrahuman pattern).
 *
 * Frames come from the Blender render (scripts/hero-phone.blend.py) via
 * scripts/build-hero-sequence.mjs. Three beats, recorded in the manifest: the
 * phone rises through a whole flip to face the camera, holds, then tilts away
 * and leaves.
 *
 * - Beats 1 and 2 play once on load, so a visitor who never scrolls still
 *   sees the screen face them.
 * - Beat 3 is scrubbed: scrolling the hero out drives the exit frames.
 * - Reduced motion draws the hold frame and does nothing else.
 *
 * Frames are decoded lazily in priority order (hold frame, intro, exit) and
 * the canvas is drawn at device pixel ratio. Choose `sm` under 768 px.
 */
const COUNT = manifest.count;
const SOURCE: number[] = manifest.frames;
/** Index of the kept frame nearest to a source frame number. */
const toIndex = (sourceFrame: number) => {
  let best = 0;
  for (let i = 0; i < SOURCE.length; i++) {
    if (Math.abs(SOURCE[i] - sourceFrame) < Math.abs(SOURCE[best] - sourceFrame)) best = i;
  }
  return best;
};
// Beat boundaries come from the manifest, which the build script derives from
// the measured render, so re-rendering with a different timing needs no code change.
const BEATS = manifest.beats;
const INTRO_END = manifest.hold ? manifest.hold.index : toIndex(BEATS ? BEATS.introEnd : 90);
const EXIT_START = toIndex(BEATS ? BEATS.exitStart : 190);
const EXIT_END = toIndex(BEATS ? BEATS.exitEnd : 252);
/** Twice the sequence width, so the resting pose is crisp on a Retina display. */
const HOLD = manifest.hold;

export default function HeroSequence({
  className = "",
  scrollScope,
}: {
  className?: string;
  /** CSS selector of the hero section; the exit is scrubbed while it leaves the viewport. */
  scrollScope: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = window.innerWidth < 768 ? "sm" : "lg";
    const frames: Array<HTMLImageElement | null> = Array(COUNT).fill(null);
    const src = (i: number) => `/images/hero-seq/${size}/f${String(i + 1).padStart(3, "0")}.webp`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let current = -1;
    let disposed = false;
    let raf = 0;

    const aspect = manifest.aspect.width / manifest.aspect.height;
    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round((rect.width / aspect) * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        current = -1;
      }
    };

    // -2 marks "the high-resolution hold still is on screen".
    const HOLD_DRAWN = -2;
    let holdImg: HTMLImageElement | null = null;

    const paint = (img: HTMLImageElement, marker: number) => {
      fit();
      // The hold still is downsampled into the canvas; ask for the good resampler.
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      current = marker;
    };

    const draw = (i: number) => {
      const img = frames[i];
      if (!img || !img.complete || i === current) return;
      paint(img, i);
    };

    const drawHold = () => {
      if (current === HOLD_DRAWN || !holdImg?.complete || !holdImg.naturalWidth) return false;
      paint(holdImg, HOLD_DRAWN);
      return true;
    };

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        if (frames[i]) return resolve();
        const img = new Image();
        img.decoding = "async";
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src(i);
        frames[i] = img;
      });

    // Nearest loaded frame at or before i, so scrubbing never blanks.
    const drawNearest = (i: number) => {
      for (let k = i; k >= 0; k--) {
        if (frames[k]?.complete && frames[k]?.naturalWidth) return draw(k);
      }
    };

    let target = reduced ? INTRO_END : 0;
    let shown = target;
    const tick = () => {
      raf = 0;
      if (disposed) return;
      // Ease toward the target frame; the scrub smoothing lives here rather than in ScrollTrigger.
      shown += (target - shown) * 0.35;
      const settled = Math.abs(target - shown) <= 0.4;
      // At rest on the hold pose, swap in the double-resolution still.
      if (settled && Math.round(target) === INTRO_END && drawHold()) return;
      drawNearest(Math.round(shown));
      if (!settled) raf = window.requestAnimationFrame(tick);
    };
    const setTarget = (i: number) => {
      target = Math.max(0, Math.min(COUNT - 1, i));
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    let trigger: ScrollTrigger | undefined;
    let introTween: gsap.core.Tween | undefined;

    // The hold still loads alongside the frames rather than ahead of them, so
    // it never delays the intro. Whenever it arrives, if the sequence is
    // already resting on the hold pose, it replaces that frame in place.
    if (HOLD) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (!disposed && Math.round(target) === INTRO_END) drawHold();
      };
      img.src = `/images/hero-seq/hold-${size}.webp`;
      holdImg = img;
    }

    (async () => {
      await load(INTRO_END);
      if (disposed) return;
      if (reduced) {
        if (!drawHold()) draw(INTRO_END);
      }
      // Intro frames next, then exit frames, then the rest.
      const intro = Array.from({ length: INTRO_END }, (_, k) => k);
      const exit = Array.from({ length: EXIT_END - EXIT_START + 1 }, (_, k) => EXIT_START + k);
      await Promise.all(intro.map(load));
      if (disposed) return;

      if (!reduced) {
        // The flip is the hero moment, so give it room: 1.4x the render's own
        // length with an even ease, and a short beat first so it starts after
        // the visitor's eyes have landed rather than during hydration.
        const introSeconds = BEATS ? BEATS.introEnd / manifest.sourceFps : 1;
        const state = { f: 0 };
        introTween = gsap.to(state, {
          f: INTRO_END,
          duration: Math.max(1.2, Math.min(3.2, introSeconds * 1.4)),
          delay: 0.35,
          ease: "power1.out",
          onUpdate: () => setTarget(state.f),
        });
      }

      await Promise.all(exit.map(load));
      if (disposed) return;
      Promise.all(Array.from({ length: COUNT }, (_, k) => k).map(load)).catch(() => undefined);

      if (reduced) return;
      trigger = ScrollTrigger.create({
        trigger: scrollScope,
        start: "top top",
        end: "bottom 20%",
        onUpdate: (self) => {
          if (introTween?.isActive()) return;
          // The first 15 % of the hero's exit keeps the hold pose, then the phone tilts away.
          const p = Math.max(0, (self.progress - 0.15) / 0.85);
          setTarget(p <= 0 ? INTRO_END : EXIT_START + (EXIT_END - EXIT_START) * p);
        },
      });
    })();

    const onResize = () => {
      current = -1;
      if (Math.round(target) === INTRO_END && drawHold()) return;
      drawNearest(Math.round(shown));
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      if (raf) window.cancelAnimationFrame(raf);
      trigger?.kill();
      introTween?.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [scrollScope]);

  return (
    <canvas
      ref={canvasRef}
      className={`hero-seq ${className}`}
      style={{ aspectRatio: `${manifest.aspect.width} / ${manifest.aspect.height}` }}
      aria-hidden="true"
    />
  );
}
