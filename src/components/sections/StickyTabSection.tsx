"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function StickyTabSection() {
  const t = useTranslations("StickyTab");
  const [activeTab, setActiveTab] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const INTERVAL_MS = 4000;

  const tabs = [
    {
      id: "prevention",
      label: t("tab1Label"),
      description: t("tab1Description"),
      image: "/images/screenshots/flare-up-insights.png",
      alt: t("tab1Alt"),
    },
    {
      id: "unified",
      label: t("tab2Label"),
      description: t("tab2Description"),
      image: "/images/screenshots/timeline.png",
      alt: t("tab2Alt"),
    },
    {
      id: "specialists",
      label: t("tab3Label"),
      description: t("tab3Description"),
      image: "/images/screenshots/chat-flare-up.png",
      alt: t("tab3Alt"),
    },
  ];

  const switchTab = useCallback((index: number) => {
    setActiveTab(index);
    setTimerKey((k) => k + 1);
  }, []);

  const startRotation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => {
        const next = (prev + 1) % tabs.length;
        setTimerKey((k) => k + 1);
        return next;
      });
    }, INTERVAL_MS);
  }, [tabs.length]);

  useEffect(() => {
    startRotation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startRotation]);

  const handleTabClick = (index: number) => {
    switchTab(index);
    startRotation();
  };

  return (
    <section className="bg-xbg relative">
      <div className="w-full max-w-[1440px] mx-auto px-10 py-24 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
        <div className="grid grid-cols-1 gap-12">
          {/* Section heading */}
          <ScrollReveal>
            <h2 className="t-display2 text-xprimary max-w-[24ch]">
              {t("heading")}{" "}
              <span className="text-xbrand">{t("headingAccent")}</span>
            </h2>
          </ScrollReveal>

          {/* Timer bar (mobile) */}
          <div className="md:hidden relative h-[4px] bg-xn-700 rounded-full overflow-hidden">
            <div
              key={timerKey}
              className="absolute left-0 top-0 h-full bg-xbrand animate-tab-timer"
            />
          </div>

          {/* Tab content grid */}
          <div className="grid grid-cols-[1.4fr_1fr] gap-[60px] max-[991px]:gap-10 max-[767px]:grid-cols-1">
            {/* Tab Menu */}
            <div className="flex flex-col gap-3">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(index)}
                  className={`text-left grid grid-cols-[0.4fr_1fr] gap-8 rounded-[20px] p-7 transition-all duration-300 max-[991px]:grid-cols-1 max-[991px]:gap-3 max-[991px]:p-5 relative overflow-hidden ${
                    activeTab === index
                      ? "border border-xborder-medium bg-xcard"
                      : "opacity-50 hover:opacity-100 border border-transparent bg-transparent"
                  } ${activeTab !== index ? "max-[767px]:hidden" : ""}`}
                >
                  {activeTab === index && (
                    <div
                      key={`bar-${timerKey}`}
                      className="absolute top-0 left-0 right-0 h-[3px] bg-xbrand"
                      style={{ width: "100%" }}
                    />
                  )}
                  <div className="t-h4 text-xprimary">{tab.label}</div>
                  <p className="t-body2 text-xsecondary max-w-[42ch]">
                    {tab.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Phone display */}
            <div className="relative h-full flex items-start justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 -z-10 blur-[60px] opacity-50"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(71, 100, 255, 0.35) 0%, transparent 70%)",
                  }}
                />
                <Image
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].alt}
                  width={808}
                  height={1660}
                  className="w-[360px] max-w-full transition-opacity duration-500 max-[767px]:max-w-[300px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
