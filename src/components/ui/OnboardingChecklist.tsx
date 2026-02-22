"use client";

import { useState, useEffect, useRef } from "react";

const steps = [
  { icon: "quiz", label: "Health questionnaire", done: "Done" },
  { icon: "favorite", label: "Apple Health connected", done: "Synced" },
  { icon: "upload_file", label: "Medical records uploaded", done: "Uploaded" },
  { icon: "routine", label: "Personalized routine started", done: "Logging" },
];

export default function OnboardingChecklist() {
  const [completedCount, setCompletedCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsInView(true);
          hasAnimated.current = true;
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (completedCount >= steps.length) return;
    const timer = setTimeout(
      () => setCompletedCount((c) => c + 1),
      completedCount === 0 ? 600 : 800
    );
    return () => clearTimeout(timer);
  }, [isInView, completedCount]);

  return (
    <div ref={ref} className="flex flex-col gap-[6px]" aria-hidden="true">
      {steps.map((step, i) => {
        const isDone = i < completedCount;
        const isCurrent = i === completedCount;
        return (
          <div
            key={step.label}
            className="flex items-center gap-[10px] rounded-[8px] transition-all duration-500"
            style={{
              padding: "8px 10px",
              backgroundColor: isDone
                ? "rgba(16, 185, 129, 0.06)"
                : isCurrent
                ? "rgba(71, 100, 255, 0.06)"
                : "transparent",
              opacity: isDone ? 0.7 : isCurrent ? 1 : 0.35,
              transform:
                isDone || isCurrent ? "translateX(0)" : "translateX(4px)",
            }}
          >
            {/* Icon / check */}
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-400"
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: isDone
                  ? "rgba(16, 185, 129, 0.15)"
                  : isCurrent
                  ? "rgba(71, 100, 255, 0.12)"
                  : "rgba(71, 100, 255, 0.05)",
              }}
            >
              <span
                style={{
                  fontFamily: "MaterialSymbolsRounded",
                  fontSize: "16px",
                  color: isDone
                    ? "#10b981"
                    : isCurrent
                    ? "#4764FF"
                    : "rgba(71, 100, 255, 0.35)",
                  transition: "color 0.3s ease",
                }}
              >
                {isDone ? "check" : step.icon}
              </span>
            </div>

            {/* Label + status */}
            <span
              className="leading-[1.3] transition-all duration-300"
              style={{
                fontSize: "14px",
                color: isDone
                  ? "rgba(20, 25, 51, 0.5)"
                  : isCurrent
                  ? "#141933"
                  : "rgba(20, 25, 51, 0.35)",
                fontWeight: isCurrent ? 500 : 400,
              }}
            >
              {step.label}
            </span>

            {isDone && (
              <span
                className="ml-auto flex-shrink-0"
                style={{
                  fontSize: "12px",
                  color: "#10b981",
                  fontWeight: 500,
                }}
              >
                {step.done}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
