"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FeatureDeviceFrame from "@/components/sections/FeatureDeviceFrame";

const DEFAULT_SLIDE_INTERVAL_MS = 2000;

export interface FeatureSlideshowImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function FeatureImageSlideshow({
  images,
  deviceFrame = false,
  intervalMs = DEFAULT_SLIDE_INTERVAL_MS,
  variant = "showcase",
  priority = false,
}: {
  images: FeatureSlideshowImage[];
  deviceFrame?: boolean;
  intervalMs?: number;
  variant?: "showcase" | "landing";
  priority?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || images.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;

    const syncPlayback = () => {
      const canPlay = isVisible && !reducedMotion.matches;
      setShouldPlay(canPlay);
      if (!canPlay) setActiveIndex(0);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.5 },
    );

    observer.observe(container);
    reducedMotion.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
    };
  }, [images.length]);

  useEffect(() => {
    if (!shouldPlay || images.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [images.length, intervalMs, shouldPlay]);

  const firstImage = images[0];
  const isLanding = variant === "landing";
  const slideshowInterval = images.length > 1 ? intervalMs : undefined;
  const renderedImages = images.map((image, index) => {
    const isActive = index === activeIndex;

    return (
      <Image
        key={image.src}
        src={image.src}
        alt={isActive ? image.alt : ""}
        fill
        sizes={
          isLanding
            ? "(max-width: 767px) 300px, 420px"
            : "(min-width: 768px) and (min-height: 800px) 230px, 150px"
        }
        className={`feature-showcase-slideshow-image ${deviceFrame ? "object-cover" : "object-contain"}`}
        style={{ opacity: isActive ? 1 : 0 }}
        aria-hidden={!isActive}
        loading={isLanding ? "eager" : undefined}
        priority={priority && index === 0}
      />
    );
  });

  if (deviceFrame) {
    return (
      <FeatureDeviceFrame
        containerRef={containerRef}
        variant={variant}
        aspectRatio={isLanding ? `${firstImage.width} / ${firstImage.height}` : undefined}
        slideshowIntervalMs={slideshowInterval}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ borderRadius: isLanding ? 37 : 24 }}
        >
          {renderedImages}
        </div>
      </FeatureDeviceFrame>
    );
  }

  return (
    <div
      ref={containerRef}
      className={
        isLanding
          ? "relative flex-none w-[420px] max-w-full max-[767px]:w-[300px] max-[767px]:mx-auto"
          : "feature-showcase-slideshow relative flex-none"
      }
      data-slideshow-interval={slideshowInterval}
      data-slideshow-variant={variant}
      style={{ aspectRatio: `${firstImage.width} / ${firstImage.height}` }}
    >
      {renderedImages}
    </div>
  );
}
