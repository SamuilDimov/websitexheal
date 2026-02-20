"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

const tabs = [
  {
    id: "unified",
    label: "Unified",
    description:
      "Your health, all connected. xHeal combines your medical records, lab results, and lifestyle data into one simple, secure space. Built for peace of mind and effortless collaboration, it lets you and your healthcare team see the same story - your story.",
    image: "/images/vitals.png",
    alt: "xHealth Vitals",
  },
  {
    id: "actionable",
    label: "Actionable",
    description:
      "Our specialized AI models turn your health data into daily direction. xHeal transforms health insights into small, gamified actions that make building healthier habits simple, motivating, and rewarding - turning progress into part of your everyday life.",
    image: "/images/routine.png",
    alt: "xHealth Routine",
  },
  {
    id: "personalised",
    label: "Personalised",
    description:
      "Every recommendation is made uniquely for you! From bespoke nutrition plans and mental health exercises to tailored fitness routines. xHeal understands your patterns, adapts as you evolve, and shapes a health journey that truly fits you.",
    image: "/images/report-summary.png",
    alt: "Mobile app screen showing a routine schedule for November 2025 with daily progress circles and morning and afternoon tasks like conscious breathing, heavy breakfast, strength training, drinking electrolytes, all marked done.",
  },
];

export default function StickyTabSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const INTERVAL_MS = 4000;

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
  }, []);

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
            <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack max-w-[18ch] max-[991px]:text-[3rem]">
              The first mobile platform to provide{" "}
              <span className="text-xdark-blue">
                a complete overview of an individual&apos;s health
              </span>
              .
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
