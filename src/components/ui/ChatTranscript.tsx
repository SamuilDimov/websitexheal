"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

/**
 * The real xHeal chat exchange from the app, rendered as UI so it stays
 * crisp and translates. Messages reveal one at a time the first time the
 * transcript enters the viewport, and never replay. Reduced motion shows
 * everything at once.
 */
export default function ChatTranscript() {
  const t = useTranslations("AI.chat");
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const total = 3;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      // Show everything at once (set from a task, not the effect body).
      const id = window.setTimeout(() => setShown(total), 0);
      return () => window.clearTimeout(id);
    }
    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timers = [1, 2, 3].map((step) =>
          window.setTimeout(() => setShown(step), 350 * step),
        );
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div ref={ref} className="chat flex h-full flex-col bg-[#000e1b] text-[#f0f2fd]" aria-hidden="true">
      <div className="chat__bar">
        <span className="chat__bar-dot" />
        <span className="chat__bar-title">{t("title")}</span>
      </div>
      <div className="chat__body">
        <div className="chat__msg chat__msg--user" data-shown={shown >= 1}>
          {t("user")}
        </div>
        <div className="chat__msg chat__msg--twin" data-shown={shown >= 2}>
          {t("reply")}
        </div>
        <div className="chat__card" data-shown={shown >= 3}>
          <div className="chat__card-head">
            <span className="chat__card-icon">
              <Icon name="warning" size={14} />
            </span>
            <div>
              <div className="chat__card-title">{t("cardTitle")}</div>
              <div className="chat__card-sub">{t("cardSub")}</div>
            </div>
          </div>
          <p className="chat__card-text">{t("cardText")}</p>
          <div className="chat__card-row">
            <span className="chat__card-label">{t("severity")}</span>
            <div className="chat__chips">
              <span className="chat__chip">{t("mild")}</span>
              <span className="chat__chip chat__chip--on">{t("moderate")}</span>
              <span className="chat__chip">{t("severe")}</span>
            </div>
          </div>
          <div className="chat__card-row">
            <span className="chat__card-label">{t("symptom")}</span>
            <span className="chat__card-value">{t("symptomValue")}</span>
          </div>
          <div className="chat__card-actions">
            <span className="chat__btn chat__btn--primary">{t("log")}</span>
            <span className="chat__btn">{t("dismiss")}</span>
          </div>
        </div>
      </div>
      <div className="chat__input">
        <span>{t("placeholder")}</span>
        <span className="chat__send">
          <Icon name="arrow_forward" size={14} />
        </span>
      </div>
    </div>
  );
}
