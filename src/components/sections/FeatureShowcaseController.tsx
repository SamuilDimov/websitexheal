"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type ReactNode,
} from "react";

const STICKY_TOP = 64;
const SCROLL_PER_FEATURE_VH = 70;
const CINEMATIC_MEDIA_QUERY =
  "(min-width: 768px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)";

interface FeatureShowcaseControllerProps {
  children: ReactNode;
  itemCount: number;
  titles: string[];
  accents: string[];
  slideLabels: string[];
  announcements: string[];
  progressLabels: string[];
  ariaLabel: string;
  carouselDescription: string;
  slideDescription: string;
  scrollPrompt: string;
  previousLabel: string;
  nextLabel: string;
  activeHeadings: ReactNode[];
}

export default function FeatureShowcaseController({
  children,
  itemCount,
  titles,
  accents,
  slideLabels,
  announcements,
  progressLabels,
  ariaLabel,
  carouselDescription,
  slideDescription,
  scrollPrompt,
  previousLabel,
  nextLabel,
  activeHeadings,
}: FeatureShowcaseControllerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [isCinematic, setIsCinematic] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(CINEMATIC_MEDIA_QUERY);
    const syncMode = () => {
      if (!mediaQuery.matches) {
        activeIndexRef.current = 0;
        setActiveIndex(0);
        setHasEntered(false);
      }

      setIsCinematic(mediaQuery.matches);
    };

    syncMode();
    mediaQuery.addEventListener("change", syncMode);
    return () => mediaQuery.removeEventListener("change", syncMode);
  }, []);

  useEffect(() => {
    if (!isCinematic) return;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const sticky = section?.querySelector<HTMLElement>(
      ".feature-showcase-sticky",
    );
    const track = section?.querySelector<HTMLOListElement>(
      "[data-feature-track]",
    );
    const slides = Array.from(
      section?.querySelectorAll<HTMLElement>("[data-feature-slide]") ?? [],
    );
    if (
      !section ||
      !viewport ||
      !sticky ||
      !track ||
      slides.length !== itemCount
    ) {
      return;
    }

    let animationFrame: number | null = null;
    let slideOffsets: number[] = [];
    let maxTranslate = 0;
    let lastTranslate = Number.NaN;
    let isTrackingScroll = false;
    let needsMeasure = true;

    const setActiveSlide = (nextIndex: number) => {
      const previousIndex = activeIndexRef.current;
      if (previousIndex === nextIndex) return;

      slides[previousIndex]?.removeAttribute("data-active");
      slides[previousIndex]?.removeAttribute("aria-current");
      slides[nextIndex]?.setAttribute("data-active", "true");
      slides[nextIndex]?.setAttribute("aria-current", "true");
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    const measure = () => {
      const firstOffset = slides[0]?.offsetLeft ?? 0;
      slideOffsets = slides.map((slide) =>
        Math.max(0, slide.offsetLeft - firstOffset),
      );
      maxTranslate = slideOffsets[slideOffsets.length - 1] ?? 0;
      lastTranslate = Number.NaN;
      needsMeasure = false;
    };

    const update = () => {
      animationFrame = null;
      if (needsMeasure) measure();

      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(
        1,
        section.offsetHeight - sticky.offsetHeight,
      );
      const progress = Math.min(
        1,
        Math.max(0, (STICKY_TOP - rect.top) / scrollDistance),
      );
      const rawPosition = progress * (itemCount - 1);
      const currentCard = Math.floor(rawPosition);
      const localProgress = rawPosition - currentCard;
      const transitionProgress = Math.min(
        1,
        Math.max(0, (localProgress - 0.48) / 0.28),
      );
      const easedProgress =
        transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
      const cardPosition = Math.min(
        itemCount - 1,
        currentCard + easedProgress,
      );
      const nextCard = Math.min(itemCount - 1, currentCard + 1);
      const currentOffset = slideOffsets[currentCard] ?? 0;
      const nextOffset = slideOffsets[nextCard] ?? currentOffset;
      const translate = Math.min(
        maxTranslate,
        currentOffset + (nextOffset - currentOffset) * easedProgress,
      );

      if (
        !Number.isFinite(lastTranslate) ||
        Math.abs(translate - lastTranslate) >= 0.1
      ) {
        track.style.transform = `translate3d(${-translate}px, 0, 0)`;
        lastTranslate = translate;
      }

      setActiveSlide(Math.min(itemCount - 1, Math.round(cardPosition)));
    };

    const requestUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    const requestMeasure = () => {
      needsMeasure = true;
      requestUpdate();
    };

    const startScrollTracking = () => {
      if (isTrackingScroll) return;
      isTrackingScroll = true;
      track.style.willChange = "transform";
      window.addEventListener("scroll", requestUpdate, { passive: true });
      requestUpdate();
    };

    const stopScrollTracking = () => {
      if (!isTrackingScroll) return;
      isTrackingScroll = false;
      track.style.removeProperty("will-change");
      window.removeEventListener("scroll", requestUpdate);
    };

    slides.forEach((slide, index) => {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", slideDescription);
      slide.setAttribute("aria-label", slideLabels[index]);
      slide.removeAttribute("data-active");
      slide.removeAttribute("aria-current");
    });
    slides[0].setAttribute("data-active", "true");
    slides[0].setAttribute("aria-current", "true");
    activeIndexRef.current = 0;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          startScrollTracking();
        } else {
          stopScrollTracking();
        }
      },
      { rootMargin: "100% 0px" },
    );
    const resizeObserver = new ResizeObserver(requestMeasure);

    intersectionObserver.observe(section);
    resizeObserver.observe(sticky);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener("resize", requestMeasure, { passive: true });
    requestUpdate();

    return () => {
      stopScrollTracking();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", requestMeasure);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      track.style.removeProperty("transform");
      track.style.removeProperty("will-change");
      slides.forEach((slide) => {
        slide.removeAttribute("role");
        slide.removeAttribute("aria-roledescription");
        slide.removeAttribute("aria-label");
        slide.removeAttribute("aria-current");
        slide.removeAttribute("data-active");
      });
    };
  }, [isCinematic, itemCount, slideDescription, slideLabels]);

  const goToFeature = (
    index: number,
    behavior: ScrollBehavior = "smooth",
  ) => {
    const section = sectionRef.current;
    if (!section || !isCinematic) return;

    const sticky = section.querySelector<HTMLElement>(
      ".feature-showcase-sticky",
    );
    if (!sticky) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollDistance = Math.max(
      1,
      section.offsetHeight - sticky.offsetHeight,
    );

    window.scrollTo({
      top:
        sectionTop -
        STICKY_TOP +
        (index / Math.max(1, itemCount - 1)) * scrollDistance,
      behavior,
    });
  };

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (!isCinematic) return;

    const slide = event.target.closest<HTMLElement>("[data-feature-slide]");
    const index = Number(slide?.dataset.featureIndex);
    if (Number.isInteger(index) && index !== activeIndexRef.current) {
      goToFeature(index, "auto");
    }
  };

  const previousTitle = titles[Math.max(0, activeIndex - 1)];
  const nextTitle = titles[Math.min(itemCount - 1, activeIndex + 1)];

  return (
    <section
      ref={sectionRef}
      className="feature-showcase relative w-full"
      data-cinematic={isCinematic ? "true" : undefined}
      role={isCinematic ? "region" : undefined}
      aria-roledescription={isCinematic ? carouselDescription : undefined}
      aria-label={ariaLabel}
      onFocusCapture={handleFocus}
      style={
        {
          "--feature-scroll-height": `calc(100svh + ${(itemCount - 1) * SCROLL_PER_FEATURE_VH}svh)`,
          "--feature-active-accent": accents[activeIndex],
        } as CSSProperties
      }
    >
      <div className="feature-showcase-sticky">
        <div className="feature-showcase-shell">
          <div className="feature-showcase-ambient" aria-hidden="true" />
          {isCinematic && hasEntered && (
            <div className="feature-launch-sweep" aria-hidden="true" />
          )}
          <div className="feature-showcase-dots" aria-hidden="true" />

          {isCinematic && (
            <div className="feature-showcase-header">
              <div className="feature-showcase-heading-frame">
                <div
                  key={activeIndex}
                  className="feature-showcase-heading feature-showcase-heading-enter"
                >
                  {activeHeadings[activeIndex]}
                </div>
              </div>
              <div className="feature-showcase-scroll-prompt">
                <span className="material-symbols-outlined" aria-hidden="true">
                  swipe_down
                </span>
                {scrollPrompt}
              </div>
            </div>
          )}

          <div ref={viewportRef} className="feature-showcase-viewport">
            {children}
          </div>

          {isCinematic && (
            <div className="feature-showcase-controls">
              <span
                key={activeIndex}
                className="feature-counter-enter t-button-sm text-xprimary tabular-nums min-w-[58px]"
                aria-hidden="true"
              >
                {progressLabels[activeIndex]}
              </span>

              <div className="feature-showcase-progress" aria-hidden="true">
                {accents.map((accent, index) => (
                  <span
                    key={`${accent}-${index}`}
                    data-state={
                      index < activeIndex
                        ? "complete"
                        : index === activeIndex
                          ? "active"
                          : "pending"
                    }
                    style={{ "--feature-progress-accent": accent } as CSSProperties}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToFeature(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-full border border-xborder-medium flex items-center justify-center text-xprimary transition-colors hover:border-xbrand hover:text-xbrand disabled:opacity-30 disabled:pointer-events-none"
                  aria-label={`${previousLabel}: ${previousTitle}`}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    arrow_back
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    goToFeature(Math.min(itemCount - 1, activeIndex + 1))
                  }
                  disabled={activeIndex === itemCount - 1}
                  className="w-10 h-10 rounded-full border border-xborder-medium flex items-center justify-center text-xprimary transition-colors hover:border-xbrand hover:text-xbrand disabled:opacity-30 disabled:pointer-events-none"
                  aria-label={`${nextLabel}: ${nextTitle}`}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    arrow_forward
                  </span>
                </button>
              </div>

              <span className="sr-only" aria-live="polite" aria-atomic="true">
                {announcements[activeIndex]}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
