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
      image: "/images/flare-up.png",
      alt: t("tab1Alt"),
    },
    {
      id: "unified",
      label: t("tab2Label"),
      description: t("tab2Description"),
      image: "/images/vitals.png",
      alt: t("tab2Alt"),
    },
    {
      id: "specialists",
      label: t("tab3Label"),
      description: t("tab3Description"),
      image: "/images/routine.png",
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
    <section className="sticky top-0">
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <div className="grid grid-cols-[1.65fr_1fr] gap-[40px] rounded-[12px] max-[767px]:grid-cols-1">
          {/* Section heading */}
          <ScrollReveal>
            <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack max-w-[20ch] max-[991px]:text-[3rem]">
              {t("heading")}{" "}
              <span className="text-xdark-blue">{t("headingAccent")}</span>
            </h2>
          </ScrollReveal>

          {/* Timer bar (mobile) */}
          <div className="md:hidden relative h-[4px] bg-xlight-blue-low rounded-full overflow-hidden">
            <div
              key={timerKey}
              className="absolute left-0 top-0 h-full bg-xdark-blue animate-tab-timer"
            />
          </div>

          {/* Tab content grid */}
          <div className="col-span-full grid grid-cols-[1.65fr_1fr] gap-[80px] max-[991px]:gap-[40px] max-[767px]:grid-cols-1">
            {/* Tab Menu */}
            <div className="flex flex-col gap-0">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(index)}
                  className={`text-left grid grid-cols-[0.3fr_1fr] gap-[40px] rounded-[16px] p-[40px] transition-all duration-200 max-[991px]:grid-cols-1 max-[991px]:gap-[20px] max-[991px]:p-[20px] ${
                    activeTab === index
                      ? "border border-xlight-blue-low bg-xwhite opacity-100 shadow-[0_4px_4px_#1419331a]"
                      : "opacity-20 hover:opacity-100 border border-transparent bg-transparent"
                  } ${
                    activeTab !== index ? "max-[767px]:hidden" : ""
                  }`}
                >
                  <div className="text-[1.5rem] font-medium leading-[1] tracking-[-0.01em] text-xdark-blue">
                    {tab.label}
                  </div>
                  <p className="text-xblack-70 text-[1.125rem] max-w-[42ch]">
                    {tab.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Phone display */}
            <div className="relative h-full flex items-start justify-center">
              <div className="relative">
                <Image
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].alt}
                  width={932}
                  height={1600}
                  className="w-[24em] max-w-[400px] transition-opacity duration-500 max-[767px]:w-full max-[767px]:max-w-[300px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
