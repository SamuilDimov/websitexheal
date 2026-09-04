"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import type { BlogImageSlide } from "@/data/blog-posts";

import Icon from "@/components/ui/Icon";
interface ChatScreenshotSliderLabels {
  ariaLabel: string;
  carouselDescription: string;
  slideDescription: string;
  eyebrow: string;
  previous: string;
  next: string;
  screenshot: string;
  of: string;
  hint: string;
}

interface ChatScreenshotSliderProps {
  slides: BlogImageSlide[];
  labels: ChatScreenshotSliderLabels;
}

export default function ChatScreenshotSlider({
  slides,
  labels,
}: ChatScreenshotSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastIndex = slides.length - 1;
  const activeSlide = slides[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex(Math.min(lastIndex, Math.max(0, index)));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touchStart.current.x - touch.clientX;
    const deltaY = touchStart.current.y - touch.clientY;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      goTo(activeIndex + (deltaX > 0 ? 1 : -1));
    }

    touchStart.current = null;
  };

  const status = `${labels.screenshot} ${activeIndex + 1} ${labels.of} ${slides.length}`;

  return (
    <section
      className="chat-slider"
      data-chat-slider
      data-active-index={activeIndex}
      role="region"
      aria-roledescription={labels.carouselDescription}
      aria-label={labels.ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="chat-slider-ambient" aria-hidden="true" />
      <div className="chat-slider-grid" aria-hidden="true" />

      <div className="chat-slider-header">
        <div className="chat-slider-eyebrow">
          <span className="chat-slider-pulse" aria-hidden="true" />
          <span>{labels.eyebrow}</span>
        </div>
        <span className="chat-slider-counter" aria-hidden="true">
          {status}
        </span>
      </div>

      <div className="chat-slider-progress" aria-hidden="true">
        <span
          style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
        />
      </div>

      <div
        className="chat-slider-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
      >
        <div
          className="chat-slider-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <figure
              key={slide.src}
              className="chat-slider-slide"
              data-chat-slide
              aria-roledescription={labels.slideDescription}
              aria-label={`${labels.screenshot} ${index + 1} ${labels.of} ${slides.length}`}
              aria-hidden={index !== activeIndex}
            >
              <div className="chat-slider-image-frame">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  sizes="(max-width: 479px) calc(100vw - 72px), 460px"
                  className="chat-slider-image"
                />
              </div>
              <figcaption>{slide.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="chat-slider-controls">
        <button
          type="button"
          className="chat-slider-arrow"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label={labels.previous}
        >
          <Icon name="arrow_back" />
        </button>

        <div className="chat-slider-dots" aria-label={status}>
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${labels.screenshot} ${index + 1} ${labels.of} ${slides.length}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="chat-slider-arrow"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === lastIndex}
          aria-label={labels.next}
        >
          <Icon name="arrow_forward" />
        </button>
      </div>

      <div className="chat-slider-hint" aria-hidden="true">
        <Icon name="swipe" />
        <span>{labels.hint}</span>
      </div>

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {status}. {activeSlide.caption}
      </span>
    </section>
  );
}
