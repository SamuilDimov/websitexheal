"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface DnaTimelineEvent {
  key: string;
  date: string;
  title: string;
  description: string;
}

interface DnaTimelineLabels {
  ariaLabel: string;
  hint: string;
  event: string;
  of: string;
}

interface DnaTimelineProps {
  events: DnaTimelineEvent[];
  labels: DnaTimelineLabels;
}

const VIEW_PER_EVENT_VH = 42;

export default function DnaTimeline({ events, labels }: DnaTimelineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = events.length;

  const readActiveIndex = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const scrollable = wrapper.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
    setActiveIndex(Math.min(count - 1, Math.floor(progress * count)));
  }, [count]);

  useEffect(() => {
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        readActiveIndex();
      });
    };

    readActiveIndex();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [readActiveIndex]);

  const jumpTo = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const scrollable = wrapper.offsetHeight - window.innerHeight;
    const top =
      window.scrollY +
      wrapper.getBoundingClientRect().top +
      ((index + 0.5) / count) * scrollable;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div
      ref={wrapperRef}
      className="dna-timeline"
      data-active-index={activeIndex}
      style={{ height: `${count * VIEW_PER_EVENT_VH + 58}vh` }}
    >
      <section
        className="dna-timeline-sticky"
        role="region"
        aria-label={labels.ariaLabel}
      >
        <div className="dna-timeline-layout">
          {/* Helix strand — one base pair per event */}
          <div className="dna-helix">
            <div className="dna-helix-axis" aria-hidden="true" />
            {events.map((event, index) => (
              <button
                key={event.key}
                type="button"
                className="dna-rung"
                data-active={index === activeIndex}
                style={
                  {
                    "--dna-i": index,
                    top: `${(index / Math.max(count - 1, 1)) * 100}%`,
                  } as React.CSSProperties
                }
                onClick={() => jumpTo(index)}
                aria-label={`${labels.event} ${index + 1} ${labels.of} ${count}: ${event.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span className="dna-bar" aria-hidden="true" />
                <span className="dna-node dna-node-a" aria-hidden="true" />
                <span className="dna-node dna-node-b" aria-hidden="true" />
                <span className="dna-rung-ring" aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* One open event at a time */}
          <div className="dna-panel">
            <p className="dna-panel-counter t-overline text-xsecondary">
              <span className="dna-panel-pulse" aria-hidden="true" />
              {labels.event} {activeIndex + 1} {labels.of} {count}
            </p>
            <ol className="dna-panel-stack m-0 p-0 list-none">
              {events.map((event, index) => (
                <li
                  key={event.key}
                  className="dna-panel-item"
                  data-active={index === activeIndex}
                  aria-hidden={index !== activeIndex}
                >
                  <article className="dna-panel-card surface-card-feature p-8 flex flex-col gap-3 max-[479px]:p-6">
                    <p className="t-overline text-xbrand">{event.date}</p>
                    <h3 className="t-h3 text-xprimary max-w-[42ch]">
                      {event.title}
                    </h3>
                    <p className="t-body1 text-xsecondary">
                      {event.description}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
            <p className="dna-panel-hint t-body2 text-xsecondary" aria-hidden="true">
              <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
              {labels.hint}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
