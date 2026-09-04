"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Single-row CSS marquee. Content is duplicated for a seamless loop; the
 * animation pauses when the row is off-screen and on hover, and does not run
 * under reduced motion (the row becomes a plain horizontal scroller).
 */
export default function Marquee({
  children,
  ariaLabel,
  durationSeconds = 40,
}: {
  children: ReactNode;
  ariaLabel: string;
  durationSeconds?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      // No observer available: run unconditionally (set from a task, not the effect body).
      const id = window.setTimeout(() => setRunning(true), 0);
      return () => window.clearTimeout(id);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="marquee"
      aria-label={ariaLabel}
      data-running={running ? "true" : "false"}
      style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
    >
      <div className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
