"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The affordance a horizontal snap row needs: something that says it scrolls
 * and how far through you are. Without it the row reads as cards that happen
 * to be cut off by the viewport rather than as a carousel.
 *
 * It watches the row it is given rather than owning it, so the row stays plain
 * markup — a `ul` that is a grid on desktop and a snap row below it — and this
 * hides itself whenever the row is not actually scrollable, which is what
 * happens at `md` when the same list becomes a three-column grid.
 *
 * Position comes from scroll offset, not from an IntersectionObserver: the
 * dots should track the drag continuously rather than flipping when a card
 * crosses a threshold.
 */
export default function SnapDots({
  target,
  count,
  className = "",
  label,
}: {
  /** CSS selector of the scrolling row. */
  target: string;
  count: number;
  className?: string;
  label: string;
}) {
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const rowRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const row = document.querySelector<HTMLElement>(target);
    if (!row) return;
    rowRef.current = row;

    const read = () => {
      const max = row.scrollWidth - row.clientWidth;
      setScrollable(max > 4);
      if (max <= 4) {
        setActive(0);
        return;
      }
      // Spread the travel across the dots rather than dividing by card width,
      // which is wrong for the last card: it never scrolls a full width.
      setActive(Math.round((row.scrollLeft / max) * (count - 1)));
    };

    read();
    row.addEventListener("scroll", read, { passive: true });
    const observer = new ResizeObserver(read);
    observer.observe(row);
    return () => {
      row.removeEventListener("scroll", read);
      observer.disconnect();
    };
  }, [target, count]);

  if (!scrollable) return null;

  const go = (index: number) => {
    const row = rowRef.current;
    if (!row) return;
    const max = row.scrollWidth - row.clientWidth;
    row.scrollTo({ left: (index / (count - 1)) * max, behavior: "smooth" });
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} role="tablist" aria-label={label}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === active}
          aria-label={`${index + 1} / ${count}`}
          onClick={() => go(index)}
          className="snap-dot"
          data-active={index === active ? "true" : "false"}
        />
      ))}
    </div>
  );
}
