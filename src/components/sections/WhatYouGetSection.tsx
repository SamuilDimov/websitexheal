import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    image: "/images/flare-up.png",
    alt: "Mobile app screen showing flare-up insights for November 2025, featuring a calendar with daily flare-up indicators and a bar chart comparing routine and flare-up activities by day.",
    title: "Flare-up Trigger Patterns",
    description:
      "Flare-ups don't have to catch you by surprise! xHeal helps you detect early warning signs, track symptoms, and understand what triggers your flare-ups - so you can take control before they take over.",
    href: "/flare-up-trigger-patterns",
  },
  {
    image: "/images/reports-landing.png",
    alt: "Smartphone screen showing a health report with a 75 out of 100 score for Health Awareness, summary of mental, physical, nutrition, and medical wellness, and a button to download the full report.",
    title: "Health Awareness",
    description:
      "Understanding is the first step to better health! See the bigger picture. xHeal connects your sleep, mood, nutrition, activity, medical records, and lab results - revealing patterns you'd never spot on your own.",
    href: "/health-awareness",
  },
  {
    image: "/images/chat-landing.png",
    alt: 'Smartphone screen displaying a chat conversation where the user asks to summarize and explain the next 5 tasks, and the assistant replies listing 2 tasks: taking Vitamin A and doing yoga exercises.',
    title: "Chat with Your Own Health",
    description:
      '"What were my vitals last year?" or "What\'s next for my health?" - just ask. Your Digital Twin knows your history and helps you understand patterns, track progress, and plan ahead.',
    href: "/chat-with-your-health",
  },
  {
    image: "/images/records-landing.png",
    alt: "Mobile app screen showing a Records page with tabs for All files, Reports, and My files, and reports including Weekly Analysis with a score of 78, Hormone Tests PDF, and Flare-up incident with a score of 40.",
    title: "Health Timeline",
    description:
      "Your medical records and personal stories - all in one place. See doctor visits, diagnoses, treatments, and life events that shaped your wellness journey, organized chronologically.",
    href: "/health-timeline",
  },
  {
    image: "/images/get-reports.png",
    alt: "Mobile app screen showing a Records page with tabs for All files, Reports, and My files.",
    title: "Specialist-Ready Reports",
    description:
      "Why Finder, My Snapshot, Clinical Report, and Health Gaps - four reports designed to share with your doctors, nutritionists, and trainers. Give your care team the full picture, ready for your next appointment.",
    href: "/specialist-ready-reports",
  },
  {
    image: "/images/log-medication.png",
    alt: "Mobile app screen showing logging options for medications and supplements.",
    title: "Log Life Events & More",
    description:
      "Track supplements, medications, and life events that impact your health. Stressful week? New medication? Diet change? Log it all so your Digital Twin can connect the dots.",
    href: "/log-life-events",
  },
];

export default function WhatYouGetSection() {
  return (
    <section id="what-you-get">
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <ScrollReveal>
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            What <span className="text-xdark-blue">you get</span>
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
