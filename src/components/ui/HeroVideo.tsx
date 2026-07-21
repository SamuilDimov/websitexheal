"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroVideoProps = {
  description: string;
};

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export default function HeroVideo({ description }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(true);
  const [videoEnabled, setVideoEnabled] = useState<boolean | null>(null);
  const [preferHevc, setPreferHevc] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateVideoPreference = () => {
      const connection = (navigator as NavigatorWithConnection).connection;
      const userAgent = navigator.userAgent;
      const isIos = /iPad|iPhone|iPod/.test(userAgent);
      const isSafari =
        /Safari/.test(userAgent) &&
        !/Chrome|Chromium|CriOS|Android/.test(userAgent);

      setPreferHevc(isIos || isSafari);
      setVideoEnabled(!motionQuery.matches && !connection?.saveData);
    };

    updateVideoPreference();
    motionQuery.addEventListener("change", updateVideoPreference);

    return () => {
      motionQuery.removeEventListener("change", updateVideoPreference);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!videoEnabled || !video) return;

    const syncPlayback = () => {
      const shouldPlay =
        isVisibleRef.current &&
        document.visibilityState === "visible";

      if (shouldPlay) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.15 },
    );

    const handleVisibilityChange = () => syncPlayback();

    observer.observe(video);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.pause();
    };
  }, [videoEnabled]);

  return (
    <div className="relative aspect-[9/16] w-full">
      <span className="sr-only">{description}</span>
      {videoEnabled === false && (
        <Image
          src="/images/xheal-v2-hero-poster-v6.png"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 991px) 44vw, 500px"
          className="pointer-events-none object-contain"
        />
      )}

      {videoEnabled === true && (
        <video
          key={preferHevc ? "hevc" : "webm"}
          ref={videoRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => {
            setVideoEnabled(false);
          }}
        >
          {preferHevc ? (
            <>
              <source
                src="/videos/xheal-v2-hero.mov?v=6"
                type='video/quicktime; codecs="hvc1"'
              />
              <source src="/videos/xheal-v2-hero.mp4?v=6" type="video/mp4" />
            </>
          ) : (
            <>
              <source src="/videos/xheal-v2-hero.webm?v=6" type="video/webm" />
              <source src="/videos/xheal-v2-hero.mp4?v=6" type="video/mp4" />
            </>
          )}
        </video>
      )}
    </div>
  );
}
