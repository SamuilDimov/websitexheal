"use client";

import { useEffect } from "react";

/**
 * Magnetic hover, the way thebrightapp.xyz does it: a control leans toward
 * the cursor while it is near, and the content inside it leans a little
 * further, so the two layers separate slightly and the button reads as a
 * physical thing rather than a rectangle that changes colour. Bright marks
 * its buttons `data-magnetic-strength="30"` with `-inner="15"`, an outer pull
 * and half as much again on the label; this is the same relationship.
 *
 * Paired with `RollText`, whose label rolls up to its duplicate on the same
 * hover — that half is pure CSS and needs no script.
 *
 * One delegated listener rather than a hook per button: anything marked
 * `data-magnetic` joins in, including markup rendered later, and rects are
 * cached between scrolls so a pointermove costs arithmetic and nothing else.
 * The offsets are written as custom properties, not as an inline transform,
 * so a button's own transforms (the press scale) still compose in CSS.
 *
 * Off entirely for coarse pointers — there is no cursor to lean toward — and
 * under `prefers-reduced-motion`.
 */

/** How far outside its own box a control starts reaching for the cursor. */
const REACH = 40;
/**
 * Fraction of the cursor's offset the shell follows, and its cap. Bright's
 * own numbers read heavier on our pills than on theirs, which are larger, so
 * this is a step below: a pill should lean, not chase. It was briefly 0.2/6,
 * which measured correctly but is under the threshold where a 131 x 40 pill
 * visibly moves — Samuil read it as not reacting at all.
 */
const PULL = 0.26;
const MAX = 8;
/** The inner content adds a little of the shell's travel again. */
const INNER = 0.45;
/** Per-frame approach to the target; low enough to lag the cursor visibly. */
const EASE = 0.16;

type Item = {
  el: HTMLElement;
  inner: HTMLElement | null;
  rect: DOMRect;
  x: number;
  y: number;
};

export default function MagneticHover() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let items: Item[] = [];
    let raf = 0;
    let px = -1e5;
    let py = -1e5;

    const collect = () => {
      const previous = new Map(items.map((i) => [i.el, i]));
      items = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]")).map((el) => {
        const was = previous.get(el);
        return {
          el,
          inner: el.querySelector<HTMLElement>("[data-magnetic-inner]"),
          rect: el.getBoundingClientRect(),
          x: was?.x ?? 0,
          y: was?.y ?? 0,
        };
      });
    };

    const remeasure = () => {
      for (const item of items) item.rect = item.el.getBoundingClientRect();
    };

    const clamp = (v: number, max: number) => (v > max ? max : v < -max ? -max : v);

    const tick = () => {
      let busy = false;
      for (const item of items) {
        // Measured every frame rather than cached. Rects taken at mount go
        // stale the moment a font swaps or a lazy section lands, and a stale
        // centre makes the pull lopsided — the button leans further one way
        // than the other. Six elements per frame, and only while the loop is
        // actually running, is cheaper than being wrong.
        const rect = item.el.getBoundingClientRect();
        item.rect = rect;
        const dx = px - (rect.left + rect.width / 2);
        const dy = py - (rect.top + rect.height / 2);
        const near =
          Math.abs(dx) < rect.width / 2 + REACH && Math.abs(dy) < rect.height / 2 + REACH;
        const tx = near ? clamp(dx * PULL, MAX) : 0;
        const ty = near ? clamp(dy * PULL, MAX) : 0;

        item.x += (tx - item.x) * EASE;
        item.y += (ty - item.y) * EASE;
        if (Math.abs(tx - item.x) < 0.02 && Math.abs(ty - item.y) < 0.02) {
          item.x = tx;
          item.y = ty;
        } else {
          busy = true;
        }

        item.el.style.setProperty("--mag-x", `${item.x.toFixed(2)}px`);
        item.el.style.setProperty("--mag-y", `${item.y.toFixed(2)}px`);
        if (item.inner) {
          item.inner.style.setProperty("--mag-x", `${(item.x * INNER).toFixed(2)}px`);
          item.inner.style.setProperty("--mag-y", `${(item.y * INNER).toFixed(2)}px`);
        }
      }
      raf = busy ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      px = event.clientX;
      py = event.clientY;
      start();
    };
    const onLeave = () => {
      px = -1e5;
      py = -1e5;
      start();
    };
    const onScroll = () => {
      remeasure();
      start();
    };

    collect();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Markup can arrive after mount (the mobile sheet, a client section), so
    // the list is rebuilt when the tree changes rather than only once.
    let pending = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(pending);
      pending = window.setTimeout(collect, 200);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      window.clearTimeout(pending);
      if (raf) cancelAnimationFrame(raf);
      for (const item of items) {
        item.el.style.removeProperty("--mag-x");
        item.el.style.removeProperty("--mag-y");
      }
    };
  }, []);

  return null;
}
