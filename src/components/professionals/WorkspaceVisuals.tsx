"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/**
 * Live rebuilds of the Provider Workspace surfaces.
 *
 * These are the real screens redrawn as components rather than cropped out of
 * a screenshot: the figures are the workspace's own demonstration data, but
 * the labels come from the message catalog, so the Bulgarian locale gets
 * Bulgarian axes instead of English pixels, and everything stays sharp at any
 * density.
 *
 * Every animation here is entrance-only and gated on `useInView`, and every
 * one of them resolves to its finished state instantly under
 * `prefers-reduced-motion` — a chart that never draws is a chart that reads
 * as broken.
 */

/* `useLayoutEffect` warns when it runs during server rendering, and these
   components are prerendered. On the server the layout pass never happens, so
   the effect variant is the right no-op. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Entrance gate.
 *
 * Starts *finished*, the same way `ScrollReveal` does, so the server-rendered
 * HTML carries the real numbers and a fully drawn chart: a visitor with no
 * JavaScript, or a crawler that stops at the markup, must never be handed a
 * dashboard of zeros. On mount it steps back to the pre-entrance state for
 * one frame and then observes — unless the element is already on screen, in
 * which case there is nothing to animate into and it is left alone.
 */
function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top <= window.innerHeight * (1 - threshold))
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    const frame = window.requestAnimationFrame(() => {
      setInView(false);
      observer.observe(el);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, inView };
}

/* ===== Count-up ===== */

type CountUpProps = {
  value: number;
  /** Decimal places; 6.9 % needs one, £67,860 needs none. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale: string;
  run: boolean;
};

/**
 * The finished number is what React renders, so it is what ends up in the
 * HTML. The animation is written straight to the node instead of through
 * state: it keeps the markup honest, and it avoids a re-render per frame
 * across six tiles.
 */
function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale,
  run,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = useCallback(
    (n: number) =>
      `${prefix}${n.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`,
    [decimals, locale, prefix, suffix],
  );

  // Zero it before the browser paints, so the real value never flashes.
  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node || run) return;
    node.textContent = format(0);
  }, [format, run]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !run) return;

    const duration = 1100;
    let frame = 0;
    let start: number | null = null;

    const step = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min(1, (now - start) / duration);
      // easeOutExpo: fast commitment, long settle — the number lands rather
      // than coasting to a stop.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      node.textContent = format(value * eased);
      if (progress < 1) frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [format, run, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(value)}
    </span>
  );
}

/* ===== KPI strip ===== */

export type Kpi = {
  key: string;
  label: string;
  note: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

export function KpiStrip({ items, locale }: { items: Kpi[]; locale: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div ref={ref} className="pro-kpis">
      {items.map((item, index) => (
        <div
          key={item.key}
          className="pro-kpi"
          data-in={inView ? "true" : "false"}
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          <p className="pro-kpi__label">{item.label}</p>
          <p className="pro-kpi__value">
            <CountUp
              value={item.value}
              decimals={item.decimals}
              prefix={item.prefix}
              suffix={item.suffix}
              locale={locale}
              run={inView}
            />
          </p>
          <p className="pro-kpi__note">{item.note}</p>
        </div>
      ))}
    </div>
  );
}

/* ===== Revenue and visit flow ===== */

// Thirteen weeks of the workspace's demonstration data: completed revenue as
// bars against the left axis, all booked visits as a line against the right.
const REVENUE = [
  3950, 4750, 4600, 4250, 4400, 5050, 5300, 5200, 5300, 4900, 4700, 6100, 5250,
];
const VISITS = [40, 46, 43, 42, 45, 48, 50, 49, 51, 53, 54, 57, 45];
const CHART_W = 760;
const CHART_H = 300;
const PAD = { top: 16, right: 44, bottom: 34, left: 52 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;
const REVENUE_MAX = 7000;
const VISITS_MAX = 60;

export function RevenueChart({
  title,
  sub,
  range,
  legendRevenue,
  legendVisits,
  alt,
  weeks,
  locale,
}: {
  title: string;
  sub: string;
  range: string;
  legendRevenue: string;
  legendVisits: string;
  alt: string;
  /** Seven x-axis labels, one every other week. */
  weeks: string[];
  locale: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  const slotWidth = PLOT_W / REVENUE.length;
  const barWidth = slotWidth * 0.46;
  const x = (index: number) => PAD.left + slotWidth * (index + 0.5);
  const yRevenue = (value: number) =>
    PAD.top + PLOT_H - (value / REVENUE_MAX) * PLOT_H;
  const yVisits = (value: number) =>
    PAD.top + PLOT_H - (value / VISITS_MAX) * PLOT_H;

  const linePath = VISITS.map(
    (value, index) => `${index === 0 ? "M" : "L"}${x(index)} ${yVisits(value)}`,
  ).join(" ");

  const gridValues = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000];
  const currency = (value: number) =>
    `£${value.toLocaleString(locale === "bg" ? "bg-BG" : "en-GB")}`;

  return (
    <figure ref={ref} className="pro-panel" data-in={inView ? "true" : "false"}>
      <figcaption className="pro-panel__head">
        <div>
          <h3 className="pro-panel__title">{title}</h3>
          <p className="pro-panel__sub">{sub}</p>
        </div>
        <span className="pro-panel__badge">{range}</span>
      </figcaption>

      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="pro-chart"
        role="img"
        aria-label={alt}
      >
        {gridValues.map((value) => (
          <g key={value}>
            <line
              x1={PAD.left}
              x2={CHART_W - PAD.right}
              y1={yRevenue(value)}
              y2={yRevenue(value)}
              className="pro-chart__grid"
            />
            <text
              x={PAD.left - 10}
              y={yRevenue(value) + 4}
              textAnchor="end"
              className="pro-chart__tick"
            >
              {currency(value)}
            </text>
          </g>
        ))}

        {[0, 10, 20, 30, 40, 50, 60].map((value) => (
          <text
            key={value}
            x={CHART_W - PAD.right + 10}
            y={yVisits(value) + 4}
            className="pro-chart__tick"
          >
            {value}
          </text>
        ))}

        {REVENUE.map((value, index) => (
          <rect
            key={index}
            x={x(index) - barWidth / 2}
            y={yRevenue(value)}
            width={barWidth}
            height={PAD.top + PLOT_H - yRevenue(value)}
            rx={3}
            className="pro-chart__bar"
            data-in={inView ? "true" : "false"}
            style={{ transitionDelay: `${index * 45}ms` }}
          />
        ))}

        <path
          d={linePath}
          className="pro-chart__line"
          data-in={inView ? "true" : "false"}
        />

        {VISITS.map((value, index) => (
          <circle
            key={index}
            cx={x(index)}
            cy={yVisits(value)}
            r={4}
            className="pro-chart__dot"
            data-in={inView ? "true" : "false"}
            style={{ transitionDelay: `${600 + index * 40}ms` }}
          />
        ))}

        {weeks.map((label, index) => (
          <text
            key={label}
            x={x(index * 2)}
            y={CHART_H - 10}
            textAnchor="middle"
            className="pro-chart__tick"
          >
            {label}
          </text>
        ))}
      </svg>

      <div className="pro-legend">
        <span className="pro-legend__item">
          <i className="pro-legend__swatch pro-legend__swatch--revenue" />
          {legendRevenue}
        </span>
        <span className="pro-legend__item">
          <i className="pro-legend__swatch pro-legend__swatch--visits" />
          {legendVisits}
        </span>
      </div>
    </figure>
  );
}

/* ===== Capacity pulse ===== */

// Utilisation by weekday and appointment hour, read off the workspace's own
// heatmap: mornings run hot, afternoons thin out, Sunday is closed.
const PULSE: Array<{ day: string; slots: number[] }> = [
  { day: "Sun", slots: [0, 0, 0] },
  { day: "Sat", slots: [0.55, 0.34, 0.14] },
  { day: "Fri", slots: [0.74, 0.3, 0.12] },
  { day: "Thu", slots: [0.8, 0.29, 0.1] },
  { day: "Wed", slots: [0.86, 0.35, 0.1] },
  { day: "Tue", slots: [0.8, 0.3, 0.1] },
  { day: "Mon", slots: [0.78, 0.32, 0.1] },
];
const PULSE_HOURS = ["09:00", "11:00", "13:00"];

export function CapacityPulse({
  title,
  sub,
  days,
}: {
  title: string;
  sub: string;
  /** Weekday labels, Sunday first, so the Bulgarian locale reads нд…пн. */
  days: string[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className="pro-panel pro-panel--fill"
      data-in={inView ? "true" : "false"}
    >
      <div className="pro-panel__head">
        <div>
          <h3 className="pro-panel__title">{title}</h3>
          <p className="pro-panel__sub">{sub}</p>
        </div>
      </div>

      <div className="pro-pulse" aria-hidden="true">
        {PULSE.map((row, rowIndex) => (
          <div key={row.day} className="pro-pulse__row">
            <span className="pro-pulse__day">{days[rowIndex] ?? row.day}</span>
            {row.slots.map((load, slotIndex) => (
              <span
                key={slotIndex}
                className="pro-pulse__cell"
                data-in={inView ? "true" : "false"}
                style={{
                  // Mint at the load's own strength, over the panel ground.
                  ["--load" as string]: load,
                  transitionDelay: `${rowIndex * 45 + slotIndex * 70}ms`,
                }}
              />
            ))}
          </div>
        ))}
        <div className="pro-pulse__row pro-pulse__row--axis">
          <span className="pro-pulse__day" />
          {PULSE_HOURS.map((hour) => (
            <span key={hour} className="pro-pulse__hour">
              {hour}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Records-readiness card ===== */

export function ConsentCard({
  bannerTitle,
  bannerBody,
  meterLabel,
  meterCaption,
  locale,
}: {
  bannerTitle: string;
  bannerBody: string;
  meterLabel: string;
  meterCaption: string;
  locale: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const ready = 76;

  return (
    <div ref={ref} className="pro-consent-card">
      <div className="pro-consent-banner">
        <span className="pro-consent-banner__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 7.5v5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
        </span>
        <div className="pro-consent-banner__copy">
          <p className="pro-consent-banner__title">{bannerTitle}</p>
          <p className="pro-consent-banner__body">{bannerBody}</p>
        </div>
      </div>

      <div className="pro-meter">
        <div className="pro-meter__head">
          <span className="pro-meter__label">{meterLabel}</span>
          <span className="pro-meter__value">
            <CountUp value={ready} suffix="%" locale={locale} run={inView} />
          </span>
        </div>
        <div
          className="pro-meter__track"
          role="img"
          aria-label={`${meterLabel}: ${ready}%`}
        >
          <span
            className="pro-meter__fill"
            data-in={inView ? "true" : "false"}
            style={{ ["--ready" as string]: `${ready}%` }}
          />
        </div>
        <p className="pro-meter__caption">{meterCaption}</p>
      </div>
    </div>
  );
}
