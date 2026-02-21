import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    image: "/images/chat-landing-card.png",
    alt: "xHeal Chat - ask your Digital Twin about your health data and get personalized answers",
    title: "Chat With Your Health",
    description:
      "Ask your Digital Twin anything about your vitals, your labs, your symptoms, your patterns. Get answers grounded in your actual health data, not generic web results.",
    href: "/chat-with-your-health",
    featured: true,
  },
  {
    image: "/images/flare-up-card.png",
    alt: "xHeal flare-up trigger pattern detection with calendar and activity charts",
    title: "Flare-Up Trigger Patterns",
    description:
      "xHeal cross-references your symptoms, sleep, stress, and activity to detect what triggers your flare-ups and warns you before the next one hits.",
    href: "/flare-up-trigger-patterns",
    featured: true,
  },
  {
    image: "/images/reports-landing-card.png",
    alt: "xHeal Health Awareness score showing 75 out of 100 across six health domains",
    title: "Health Awareness Score",
    description:
      "A single 0-100 score that reflects your health across six domains. Know exactly where you stand and which area needs attention first.",
    href: "/health-awareness",
  },
  {
    image: "/images/get-reports-card.png",
    alt: "xHeal specialist-ready health reports for doctors and care teams",
    title: "Specialist-Ready Reports",
    description:
      "Four report types designed for doctors, nutritionists, and trainers. Walk into your next appointment with the context your care team has never had.",
    href: "/specialist-ready-reports",
  },
  {
    image: "/images/records-landing-card.png",
    alt: "xHeal health timeline with organized medical records and lab results",
    title: "Health Timeline",
    description:
      "Every medical record, lab result, and life event organized chronologically in one searchable place. Find anything in seconds.",
    href: "/health-timeline",
  },
  {
    image: "/images/log-medication-card.png",
    alt: "xHeal life event logging for medications, supplements, and health context",
    title: "Log Life Events",
    description:
      "Supplements, medications, diet changes, stress. Log the context your wearable can't capture. Every entry makes your Digital Twin smarter.",
    href: "/log-life-events",
  },
];

export default function WhatYouGetSection() {
  return (
    <section id="what-you-get">
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <ScrollReveal>
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            Everything your health app{" "}
            <span className="text-xdark-blue">is missing</span>
          </h2>
        </ScrollReveal>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-[40px] max-[767px]:grid-cols-1">
          {features.map((feature) => {
            const cardContent = (
              <>
                {/* Image */}
                <div className="overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={1788}
                    height={1200}
                    className="w-full object-cover"
                  />
                </div>

                {/* Text content */}
                <div className="flex flex-col gap-[20px] px-[20px] pb-[20px]">
                  <h3 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em]">
                    {feature.title}
                  </h3>
                  <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                    {feature.description}
                  </p>
                </div>
              </>
            );

            const cardClass =
              "border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] flex flex-col gap-[20px] shadow-[0_4px_4px_#1419330d] max-w-[36rem] overflow-hidden transition-shadow duration-200";

            return feature.href ? (
              <Link
                key={feature.title}
                href={feature.href}
                className={`${cardClass} hover:shadow-[0_8px_24px_#1419331a]`}
              >
                {cardContent}
              </Link>
            ) : (
              <div key={feature.title} className={cardClass}>
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* App Store Badge */}
        <div>
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
            />
          </a>
        </div>
      </div>
    </section>
  );
}
