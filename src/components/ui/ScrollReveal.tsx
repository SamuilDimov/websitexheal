"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // delay in ms
  threshold?: number; // 0–1, how much of the element should be visible
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotion.matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * (1 - threshold)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    let motionFrame: number | null = null;
    const preparationFrame = window.requestAnimationFrame(() => {
      setIsVisible(false);
      motionFrame = window.requestAnimationFrame(() => {
        setMotionEnabled(true);
        observer.observe(el);
      });
    });
    const showWithoutMotion = () => {
      if (!reducedMotion.matches) return;
      window.cancelAnimationFrame(preparationFrame);
      if (motionFrame !== null) window.cancelAnimationFrame(motionFrame);
      observer.disconnect();
      setMotionEnabled(false);
      setIsVisible(true);
    };
    reducedMotion.addEventListener("change", showWithoutMotion);

    return () => {
      window.cancelAnimationFrame(preparationFrame);
      if (motionFrame !== null) window.cancelAnimationFrame(motionFrame);
      observer.disconnect();
      reducedMotion.removeEventListener("change", showWithoutMotion);
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: motionEnabled
          ? `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`
          : "none",
      }}
    >
      {children}
    </div>
  );
}
