"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";

interface OutcomeItem {
  icon: string;
  label: string;
  text: string;
  color: string;
}

export default function OutcomeCarousel() {
  const t = useTranslations("HowItWorks");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const outcomes: OutcomeItem[] = [
    {
      icon: "shield",
      label: t("outcome1Label"),
      text: t("outcome1Text"),
      color: "#ef4444",
    },
    {
      icon: "speed",
      label: t("outcome2Label"),
      text: t("outcome2Text"),
      color: "#4764FF",
    },
    {
      icon: "clinical_notes",
      label: t("outcome3Label"),
      text: t("outcome3Text"),
      color: "#10b981",
    },
    {
      icon: "nights_stay",
      label: t("outcome4Label"),
      text: t("outcome4Text"),
      color: "#6366f1",
    },
    {
      icon: "mystery",
      label: t("outcome5Label"),
      text: t("outcome5Text"),
      color: "#ec4899",
    },
    {
      icon: "timeline",
      label: t("outcome6Label"),
      text: t("outcome6Text"),
      color: "#f59e0b",
    },
    {
      icon: "self_improvement",
      label: t("outcome7Label"),
      text: t("outcome7Text"),
      color: "#14b8a6",
    },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const advance = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % outcomes.length);
      setIsTransitioning(false);
    }, 300);
  }, [outcomes.length]);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(advance, 4000);
    return () => clearInterval(timer);
  }, [isInView, advance]);

  const current = outcomes[activeIndex];
  const next = outcomes[(activeIndex + 1) % outcomes.length];

  return (
    <div
      ref={ref}
      className="flex flex-col gap-[14px]"
      aria-hidden="true"
    >
      {/* Main card */}
      <div
        className="relative rounded-[16px] overflow-hidden cursor-default"
        onClick={advance}
        style={{
          padding: "28px",
          backgroundColor: `${current.color}0a`,
          border: `1px solid ${current.color}20`,
          transition: "background-color 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Colored accent bar */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: "3px",
            background: `linear-gradient(90deg, ${current.color}, ${current.color}60)`,
            transition: "background 0.4s ease",
          }}
        />

        <div className="flex items-start gap-[18px]">
          {/* Large icon */}
          <div
            className="flex items-center justify-center rounded-[14px] flex-shrink-0"
            style={{
              width: "56px",
              height: "56px",
              backgroundColor: `${current.color}15`,
              transition: "background-color 0.4s ease",
            }}
          >
            <span
              style={{
                fontFamily: "MaterialSymbolsRounded",
                fontSize: "28px",
                color: current.color,
                transition: "color 0.4s ease",
              }}
            >
              {current.icon}
            </span>
          </div>

          {/* Text content */}
          <div
            className="flex flex-col gap-[8px] min-w-0"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning
                ? "translateY(8px)"
                : "translateY(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <span
              className="font-semibold leading-[1.2]"
              style={{
                fontSize: "13px",
                color: current.color,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {current.label}
            </span>
            <span
              className="font-medium leading-[1.4]"
              style={{
                fontSize: "22px",
                color: "#141933",
              }}
            >
              {current.text}
            </span>
          </div>
        </div>
      </div>

      {/* Peeking next card */}
      <div
        className="rounded-[12px] cursor-default"
        onClick={advance}
        style={{
          padding: "14px 24px",
          backgroundColor: `${next.color}06`,
          border: `1px solid ${next.color}10`,
          opacity: 0.5,
          transition:
            "background-color 0.4s ease, border-color 0.4s ease, opacity 0.4s ease",
        }}
      >
        <div className="flex items-center gap-[14px]">
          <div
            className="flex items-center justify-center rounded-[10px] flex-shrink-0"
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: `${next.color}10`,
              transition: "background-color 0.4s ease",
            }}
          >
            <span
              style={{
                fontFamily: "MaterialSymbolsRounded",
                fontSize: "18px",
                color: `${next.color}80`,
                transition: "color 0.4s ease",
              }}
            >
              {next.icon}
            </span>
          </div>
          <span
            className="leading-[1.3]"
            style={{
              fontSize: "15px",
              color: "rgba(20, 25, 51, 0.35)",
            }}
          >
            {next.label}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-[8px] pt-[4px]">
        {outcomes.map((item, i) => (
          <button
            key={item.label}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setActiveIndex(i);
                setIsTransitioning(false);
              }, 200);
            }}
            className="rounded-full"
            style={{
              width: i === activeIndex ? "24px" : "8px",
              height: "8px",
              backgroundColor:
                i === activeIndex ? current.color : "rgba(71, 100, 255, 0.15)",
              border: "none",
              cursor: "pointer",
              transition:
                "width 0.4s ease, background-color 0.4s ease",
            }}
            aria-label={`Show ${item.label}`}
          />
        ))}
      </div>
    </div>
  );
}
