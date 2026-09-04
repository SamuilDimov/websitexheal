"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PhoneFrame from "@/components/ui/PhoneFrame";
import DeviceCanvas from "@/components/ui/DeviceCanvas";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SCREENS = [
  {
    src: "/images/screenshots/timeline-dashboard.png",
    width: 1290,
    height: 2796,
  },
  {
    src: "/images/screenshots/health-awareness.webp",
    width: 730,
    height: 1583,
  },
  {
    src: "/images/screenshots/flare-up-insights.png",
    width: 730,
    height: 1583,
  },
] as const;

/**
 * How xHeal works: three steps scroll past a pinned phone whose screen
 * crossfades to the active step. The pin is CSS `position: sticky`, the
 * active step comes from an IntersectionObserver on a band around the
 * viewport centre, so there is nothing to tear down and reduced-motion
 * simply gets no crossfade. Under 900 px each step carries its own screen.
 */
export default function HowItWorksSection() {
  const t = useTranslations("HowItWorks");
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  const steps = [1, 2, 3].map((n, index) => ({
    label: t(`step${n}Label`),
    title: t(`step${n}Heading`),
    text: t(`step${n}Text`),
    alt: t(`step${n}Alt`),
    screen: SCREENS[index],
  }));

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.step);
            if (!Number.isNaN(index)) setActive(index);
          }
        }
      },
      // A 20 % band around the viewport centre decides the active step.
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="how-heading" className="bg-xbg">
      <div className="x-container x-section">
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <h2 id="how-heading" className="t-display2 text-xprimary max-w-[18ch]">
              {t("title")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
          <ol role="list" className="flex flex-col md:col-span-6 lg:col-span-6">
            {steps.map((step, index) => (
              <li
                key={step.label}
                data-step={index}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                className="how-step flex flex-col gap-5 border-t x-hairline py-10 md:min-h-[56vh] md:justify-center md:py-14"
                data-active={active === index ? "true" : "false"}
              >
                <h3 className="t-h2 text-xprimary max-w-[20ch]">{step.title}</h3>
                <p className="t-body1 text-xsecondary max-w-[46ch]">{step.text}</p>

                {/* Mobile: each step carries its own screen */}
                <div className="mt-4 md:hidden">
                  <PhoneFrame
                    className="mx-auto w-[52%] max-w-[220px]"
                    aspectRatio={`${step.screen.width} / ${step.screen.height}`}
                    tilt
                    chrome
                  >
                    <Image
                      src={step.screen.src}
                      alt={step.alt}
                      width={step.screen.width}
                      height={step.screen.height}
                      sizes="62vw"
                      className="h-full w-full object-cover"
                    />
                  </PhoneFrame>
                </div>
              </li>
            ))}
          </ol>

          {/* Desktop: pinned phone, live. The step change swaps the screen
              texture on the same device rather than crossfading two flat
              images, so the phone stays one object through the section. */}
          <div className="hidden md:col-span-6 md:flex md:items-start md:justify-center lg:col-span-5 lg:col-start-8">
            <div className="sticky top-[14vh] w-[min(360px,86%)] self-start">
              <DeviceCanvas
                screen={steps[active].screen.src}
                poster={steps[0].screen.src}
                entrance="settle"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
