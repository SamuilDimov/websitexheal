"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface DrumItem {
  icon: string;
  label: string;
  description: string;
}

interface VerticalDrumProps {
  items: DrumItem[];
  intervalMs?: number;
}

export default function VerticalDrum({
  items,
  intervalMs = 3500,
}: VerticalDrumProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goTo = useCallback(
    (direction: "next" | "prev") => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setActiveIndex((prev) => {
        if (direction === "next") return (prev + 1) % items.length;
        return (prev - 1 + items.length) % items.length;
      });
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [items.length, isTransitioning]
  );

  // Auto-rotate
  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => goTo("next"), intervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, intervalMs, goTo]);

  // Touch handling for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 30) {
      goTo(diff > 0 ? "next" : "prev");
    }
    touchStartY.current = null;
  };

  const getItem = (offset: number) => {
    const idx = (activeIndex + offset + items.length) % items.length;
    return items[idx];
  };

  return (
    <div
      className="flex flex-col gap-[16px] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Drum window */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "260px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      >
        <div
          className="flex flex-col items-stretch transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: "translateY(0)" }}
        >
          {/* Previous item */}
          <DrumSlot
            item={getItem(-1)}
            opacity={0.25}
            scale={0.92}
          />
          {/* Active item */}
          <DrumSlot
            item={getItem(0)}
            opacity={1}
            scale={1}
            isActive
          />
          {/* Next item */}
          <DrumSlot
            item={getItem(1)}
            opacity={0.25}
            scale={0.92}
          />
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-[6px]">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setActiveIndex(i);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === activeIndex ? "22px" : "7px",
              height: "7px",
              backgroundColor:
                i === activeIndex ? "#4764FF" : "rgba(71, 100, 255, 0.25)",
            }}
            aria-label={`Go to item ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center gap-[8px]">
        <button
          onClick={() => goTo("prev")}
          className="w-[36px] h-[36px] rounded-full border border-xlight-blue-low flex items-center justify-center transition-all duration-200 hover:bg-xdark-blue/10 active:scale-95"
          aria-label="Previous"
        >
          <span
            style={{
              fontFamily: "MaterialSymbolsRounded",
              fontSize: "20px",
              color: "#4764FF",
            }}
          >
            keyboard_arrow_up
          </span>
        </button>
        <button
          onClick={() => goTo("next")}
          className="w-[36px] h-[36px] rounded-full border border-xlight-blue-low flex items-center justify-center transition-all duration-200 hover:bg-xdark-blue/10 active:scale-95"
          aria-label="Next"
        >
          <span
            style={{
              fontFamily: "MaterialSymbolsRounded",
              fontSize: "20px",
              color: "#4764FF",
            }}
          >
            keyboard_arrow_down
          </span>
        </button>
      </div>
    </div>
  );
}

function DrumSlot({
  item,
  opacity,
  scale,
  isActive = false,
}: {
  item: DrumItem;
  opacity: number;
  scale: number;
  isActive?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-[16px] px-[4px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        opacity,
        transform: `scale(${scale})`,
        height: "86px",
        flexShrink: 0,
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-[12px] flex-shrink-0"
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: isActive
            ? "rgba(71, 100, 255, 0.12)"
            : "rgba(71, 100, 255, 0.06)",
        }}
      >
        <span
          style={{
            fontFamily: "MaterialSymbolsRounded",
            fontSize: "24px",
            color: "#4764FF",
          }}
        >
          {item.icon}
        </span>
      </div>
      {/* Text */}
      <div className="flex flex-col gap-[3px] min-w-0">
        <span
          className="font-medium leading-[1.2] tracking-[-0.01em]"
          style={{
            fontSize: "17px",
            color: "#141933",
          }}
        >
          {item.label}
        </span>
        {isActive && (
          <span
            className="leading-[1.4]"
            style={{
              fontSize: "14px",
              color: "rgba(20, 25, 51, 0.55)",
            }}
          >
            {item.description}
          </span>
        )}
      </div>
    </div>
  );
}
