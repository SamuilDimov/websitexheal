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
      width: 810,
      height: 1654,
    },
    {
      id: "unified",
      label: t("tab2Label"),
      description: t("tab2Description"),
      image: "/images/screenshots/timeline-dashboard.png",
      alt: t("tab2Alt"),
      width: 1290,
      height: 2796,
      deviceFrame: true,
    },
    {
      id: "specialists",
      label: t("tab3Label"),
      description: t("tab3Description"),
      image: "/images/screenshots/chat-flare-up.png",
      alt: t("tab3Alt"),
      width: 810,
      height: 1654,
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
                {tabs[activeTab].deviceFrame ? (
                  <div
                    className="relative flex-none w-[360px] max-w-full max-[767px]:w-[300px]"
                    style={{
                      aspectRatio: `${tabs[activeTab].width} / ${tabs[activeTab].height}`,
                      padding: 6,
                      border: "5px solid #202229",
                      borderRadius: 42,
                      background: "#050609",
                      boxShadow:
                        "0 0 0 1px rgba(218, 222, 231, 0.42), inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 56px rgba(0, 0, 0, 0.48)",
                    }}
                  >
                    <Image
                      src={tabs[activeTab].image}
                      alt={tabs[activeTab].alt}
                      width={tabs[activeTab].width}
                      height={tabs[activeTab].height}
                      sizes="(max-width: 767px) 300px, 360px"
                      className="block h-full w-full object-cover transition-opacity duration-500"
                      style={{ borderRadius: 32 }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute z-[1]"
                      style={{
                        top: 13,
                        left: "50%",
                        width: "31%",
                        height: 18,
                        borderRadius: 9999,
                        background: "#020204",
                        boxShadow:
                          "inset 0 -1px 1px rgba(255, 255, 255, 0.08)",
                        transform: "translateX(-50%)",
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute"
                      style={{
                        top: "20%",
                        left: -9,
                        width: 4,
                        height: "11%",
                        borderRadius: 3,
                        background:
                          "linear-gradient(90deg, #15161b, #5c5f68 55%, #17181d)",
                        boxShadow: "0 56px 0 #34363e",
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute"
                      style={{
                        top: "31%",
                        right: -9,
                        width: 4,
                        height: "16%",
                        borderRadius: 3,
                        background:
                          "linear-gradient(90deg, #15161b, #5c5f68 55%, #17181d)",
                      }}
                    />
                  </div>
                ) : (
                  <Image
                    src={tabs[activeTab].image}
                    alt={tabs[activeTab].alt}
                    width={tabs[activeTab].width}
                    height={tabs[activeTab].height}
                    className="w-[360px] max-w-full transition-opacity duration-500 max-[767px]:max-w-[300px]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
