"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function AnimatedCounter({
  target,
  suffix = "+",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(Math.floor(current));
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="flex items-center gap-[5px]">
      <div className="text-inherit font-medium">
        {count.toLocaleString()}
      </div>
      <div className="text-inherit font-medium"> {suffix}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative"
      style={{
        backgroundImage:
          "url(/images/dot-matrix.svg), linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
        backgroundPosition: "50%, 0 0",
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "contain, auto",
      }}
    >
      <div
        className="w-full max-w-[100em] mx-auto px-[5em] flex flex-col justify-center items-stretch min-h-screen max-h-[1080px] pt-[20em] pb-[10em] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[991px]:pb-[60px] max-[991px]:min-h-0 max-[991px]:max-h-none max-[479px]:px-[20px]"
        style={{
          backgroundImage: "url(/images/hero-bg.svg)",
          backgroundPosition: "0%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
        }}
      >
        <div className="grid grid-cols-[1.65fr_1fr] gap-[80px] rounded-[12px] max-[991px]:gap-[40px] max-[767px]:grid-cols-1">
          {/* Left Column */}
          <div className="grid grid-cols-1 gap-[40px]">
            {/* Heading */}
            <h1 className="text-[7em] font-medium leading-[1] tracking-[-0.05em] max-[991px]:text-[3.75rem]">
              Welcome to{" "}
              <span className="text-xblack">your all in one Healthcare</span>
            </h1>

            {/* Subtitle */}
            <div className="text-[1.5rem] font-medium leading-[1] tracking-[-0.01em] max-w-[48ch]">
              From every heartbeat to every habit. xHeal connects{" "}
              <strong>250+</strong> health parameters to bring your wellbeing
              into one clear view
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-[40px] max-[991px]:grid-cols-1 max-[991px]:gap-[20px]">
              <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] p-[20px] leading-[1] flex flex-col gap-[10px] shadow-[0_4px_4px_#1419330d]">
                <AnimatedCounter target={5000} />
                <p className="text-xdark-blue text-[1.125rem]">
                  People improving their health
                </p>
              </div>
              <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] p-[20px] leading-[1] flex flex-col gap-[10px] shadow-[0_4px_4px_#1419330d]">
                <AnimatedCounter target={300000} />
                <p className="text-xdark-blue text-[1.125rem]">
                  Personalized routines completed
                </p>
              </div>
              <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] p-[20px] leading-[1] flex flex-col gap-[10px] shadow-[0_4px_4px_#1419330d]">
                <AnimatedCounter target={20000} />
                <p className="text-xdark-blue text-[1.125rem]">
                  Flare-up triggers detected
                </p>
              </div>
            </div>

            {/* App Store Badge */}
            <div className="flex flex-col gap-[40px]">
              <a
                href="https://apps.apple.com/us/app/xheal/id6748074977"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={200}
                  height={67}
                  priority
                />
              </a>
            </div>

            {/* QR Code - Desktop only */}
            <div className="hidden lg:flex">
              <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] p-[20px] leading-[1] shadow-[0_4px_4px_#1419330d] w-[200px]">
                <Image
                  src="/images/qr-code.avif"
                  alt="Download App QR Code"
                  width={160}
                  height={160}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Phone */}
          <div className="relative h-full max-[767px]:flex max-[767px]:justify-center">
            <Image
              src="/images/dashboard.png"
              alt="Smartphone screen displaying a health app dashboard with xHeal Score of 25, flare ups, streak of 5 days, health awareness report score of 75 out of 100, and navigation icons for Home, Routine, Add, Records, and Chat."
              width={932}
              height={1600}
              className="w-[24em] max-w-[400px] object-cover object-top max-[767px]:w-full max-[767px]:max-w-[300px]"
              priority
            />
            <div
              className="absolute inset-0 hidden"
              style={{
                backgroundImage:
                  "linear-gradient(#4764ff00 69%, #7a8eff)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
