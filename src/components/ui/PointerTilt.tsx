"use client";

import { useEffect } from "react";

/**
 * Pointer parallax for the mockups that are not 3D.
 *
 * The Digital Twin chat is live DOM, the Features bento phones are small cards
 * inside links, and the How-it-works step screens on mobile are three at once —
 * none of them earns a WebGL context. They still have to behave like the rest
 * of the page, so they get the same gesture in CSS: a small turn toward the
 * cursor, on the same numbers and the same easing as `DeviceModel`'s tilt, so
 * the flat mockups and the real ones read as one system.
 *
 * One delegated listener, the same shape as `MagneticHover`: anything marked
 * `data-tilt` joins in, the offsets are written as custom properties, and the
 * transform is composed in CSS so an element's own transforms survive.
 *
 * Off under reduced motion and for coarse pointers — there is no cursor to
 * turn toward on a touchscreen.
 */

/** Degrees of yaw at the edge of the viewport; pitch is two thirds of it. */
const YAW = 10;
const PITCH_RATIO = 0.66;
/**
 * How far a mockup slides with its turn, in px per degree of yaw. Rotation
 * alone reads as a hinge; the small travel is what makes it lean.
 */
const SLIDE = 0.9;
/** Per-frame approach, matching DeviceModel so both settle at one rate. */
const EASE = 0.11;

type Item = { el: HTMLElement; yaw: number; pitch: number };

export default function PointerTilt() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let items: Item[] = [];
    let raf = 0;
    let aimYaw = 0;
    let aimPitch = 0;

    const collect = () => {
      const previous = new Map(items.map((i) => [i.el, i]));
      items = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]")).map((el) => {
        const was = previous.get(el);
        return { el, yaw: was?.yaw ?? 0, pitch: was?.pitch ?? 0 };
      });
    };

    const tick = () => {
      let busy = false;
      for (const item of items) {
        const dy = aimYaw - item.yaw;
        const dp = aimPitch - item.pitch;
        if (Math.abs(dy) > 0.002 || Math.abs(dp) > 0.002) {
          item.yaw += dy * EASE;
          item.pitch += dp * EASE;
          busy = true;
        } else {
          item.yaw = aimYaw;
          item.pitch = aimPitch;
        }
        item.el.style.setProperty("--tilt-y", `${item.yaw.toFixed(3)}deg`);
        item.el.style.setProperty("--tilt-x", `${item.pitch.toFixed(3)}deg`);
        item.el.style.setProperty("--tilt-tx", `${(item.yaw * SLIDE).toFixed(2)}px`);
        item.el.style.setProperty("--tilt-ty", `${(-item.pitch * SLIDE).toFixed(2)}px`);
      }
      raf = busy ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    /**
     * Aim from the cursor's place in the viewport, not in the element's own
     * box: tracking the box makes a mockup snap as the cursor crosses its
     * edge, and every mockup on screen should be looking the same way.
     */
    const onPointer = (event: PointerEvent) => {
      const nx = (event.clientX / (window.innerWidth || 1)) * 2 - 1;
      const ny = (event.clientY / (window.innerHeight || 1)) * 2 - 1;
      aimYaw = nx * YAW;
      aimPitch = -ny * YAW * PITCH_RATIO;
      wake();
    };
    const onLeave = () => {
      aimYaw = 0;
      aimPitch = 0;
      wake();
    };

    collect();
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let pending = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(pending);
      pending = window.setTimeout(collect, 200);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
      window.clearTimeout(pending);
      if (raf) cancelAnimationFrame(raf);
      for (const item of items) {
        item.el.style.removeProperty("--tilt-x");
        item.el.style.removeProperty("--tilt-y");
        item.el.style.removeProperty("--tilt-tx");
        item.el.style.removeProperty("--tilt-ty");
      }
    };
  }, []);

  return null;
}
