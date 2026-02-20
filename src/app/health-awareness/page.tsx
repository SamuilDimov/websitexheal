"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CrossLinkSection from "@/components/feature-landing/CrossLinkSection";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const painPoints = [
  {
    icon: "pie_chart",
    title: "Health is more than one number",
    detail:
      "Your doctor checks cholesterol. Your watch tracks steps. Your app counts calories. But no one connects them. Real health awareness means seeing how everything fits together.",
  },
  {
    icon: "content_cut",
    title: "Doctors see fragments",
    detail:
      "Each specialist sees their slice. Your GP gets 15 minutes. Nobody has the time or tools to connect your sleep patterns with your lab results and your stress levels.",
  },
  {
    icon: "visibility_off",
    title: "You can\u2019t improve what you can\u2019t see",
    detail:
      "Without a unified view, you\u2019re guessing which area of your health needs attention most. Small issues go unnoticed until they become big problems.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Connect your data sources",
    description:
      "Import medical records, sync Apple Health, connect wearables, log symptoms and lifestyle data. xHeal brings it all into one secure place.",
  },
  {
    step: "02",
    title: "xHeal builds your health profile",
    description:
      "Our AI analyzes data across six domains \u2013 mental, physical, nutrition, medical, sleep, and activity \u2013 to create a comprehensive picture of your wellbeing.",
  },
  {
    step: "03",
    title: "Get your Health Awareness score",
    description:
      "See a clear 0\u2013100 score that reflects your overall health awareness, with breakdowns by domain and specific recommendations to improve.",
  },
];

const useCases = [
  {
    question: "How is my overall health trending?",
    tag: "Overview",
    description:
      "See your Health Awareness score over time and understand whether you\u2019re moving in the right direction.",
  },
  {
    question: "What area needs the most attention?",
    tag: "Priority",
    description:
      "xHeal highlights which health domain is lagging and suggests where to focus your energy for the biggest impact.",
  },
  {
    question: "Am I actually improving?",
    tag: "Progress",
    description:
      "Track changes week over week and month over month. See concrete evidence of your progress, not just feelings.",
  },
  {
    question: "How does my sleep affect everything else?",
    tag: "Connections",
    description:
      "Understand how one area of your health ripples across others. Sleep, stress, nutrition, and activity are more connected than you think.",
  },
  {
    question: "What am I missing?",
    tag: "Gaps",
    description:
      "xHeal identifies blind spots in your health data and suggests what to track or test next for a more complete picture.",
  },
  {
    question: "Can I share this with my doctor?",
    tag: "Sharing",
    description:
      "Generate a Health Awareness report to bring to your next appointment. Give your doctor context they\u2019ve never had before.",
  },
];

const testimonials = [
  {
    quote:
      "I finally stopped juggling four apps. Everything I need is in one place, and xHeal shows me how my patterns actually connect.",
    name: "Kristiyan Nikolov",
    age: 34,
    image: "/images/testimonial-kris.jpeg",
  },
  {
    quote:
      "Simple, visual, and motivating. xHeal turns scattered data into clear insights I can actually act on.",
    name: "Jessica Miller",
    age: 28,
    image: "/images/testimonial-jessica.jpeg",
  },
  {
    quote:
      "xHeal finally helped me see the full picture of my health: sleep, activity, and check-ups in one clear dashboard. It keeps me proactive instead of guessing.",
    name: "Emily Carter",
    age: 36,
    image: "/images/testimonial-michael.jpeg",
  },
];

const trustItems = [
  {
    title: "Six-domain framework",
    detail:
      "Your score reflects mental wellness, physical activity, nutrition, medical records, sleep quality, and lifestyle, not a single metric.",
  },
  {
    title: "Clinically referenced scoring",
    detail:
      "Domain weights and thresholds follow WHO, ADA, and EASD guidelines. This isn't a gamified fitness score.",
  },
  {
    title: "Score improves with data, not purchases",
    detail:
      "Your Health Awareness score reflects your actual health profile completeness. There's no pay-to-improve mechanic.",
  },
  {
    title: "Private by default",
    detail:
      "Your score and domain breakdowns are visible only to you. Share them with your care team when and if you choose.",
  },
];

const faqs = [
  {
    q: "What is the Health Awareness score?",
    a: "It\u2019s a 0\u2013100 score that reflects how well you understand and track your health across six key domains: mental wellness, physical activity, nutrition, medical records, sleep quality, and overall lifestyle.",
  },
  {
    q: "How is the score calculated?",
    a: "xHeal analyzes the breadth and depth of your health data, your tracking consistency, and the patterns it finds across domains. The more complete your profile, the more accurate your score.",
  },
  {
    q: "Can the score replace a medical diagnosis?",
    a: "No. The Health Awareness score is a personal wellness metric, not a clinical assessment. It helps you understand your health better and prepare more informed conversations with your doctor.",
  },
  {
    q: "How often does the score update?",
    a: "Your score updates as new data comes in \u2013 after syncing wearable data, logging symptoms, or uploading new records. You\u2019ll see trends over days, weeks, and months.",
  },
  {
    q: "What if my score is low?",
    a: "A low score usually means there are gaps in your health data or areas that need attention. xHeal will highlight specific actions you can take to improve.",
  },
];

/* ------------------------------------------------------------------ */
/*  SMALL COMPONENTS                                                   */
/* ------------------------------------------------------------------ */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#ffffff1a]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-[28px] flex justify-between items-start gap-[20px] group"
      >
        <h3
          className="text-[1.25rem] font-medium leading-[1.3] tracking-[-0.01em] group-hover:text-xlight-blue transition-colors duration-200"
          style={{ color: "#ffffff" }}
        >
          {q}
        </h3>
        <span
          className="text-xlight-blue text-[1.5rem] font-light leading-[1] flex-shrink-0 mt-[2px] transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ${
          open ? "max-h-[500px] pb-[28px]" : "max-h-0"
        }`}
      >
        <p
          className="text-[1.125rem] leading-[1.6] max-w-[60ch]"
          style={{ color: "#ffffffcc" }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex gap-[6px]">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}

/* Scroll-triggered visibility hook */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function HealthAwarenessPage() {
  const lineAnim = useInView(0.1);

  return (
    <>
      {/* ============================================================ */}
      {/* 1. HERO - Full viewport, cinematic entrance                   */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden min-h-screen flex items-center"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 30% 40%, #4764ff 0%, #141933 55%, #0a0e1f 100%)",
        }}
      >
        {/* Dot matrix texture overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "url(/images/dot-matrix.svg)",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

        {/* Ambient glow behind phone */}
        <div
          className="absolute right-[10%] top-[50%] -translate-y-[50%] w-[500px] h-[500px] rounded-full pointer-events-none max-[767px]:right-[50%] max-[767px]:translate-x-[50%] max-[767px]:top-[60%]"
          style={{
            background:
              "radial-gradient(circle, #4764ff44 0%, transparent 70%)",
            animation: "pulseGlow 4s ease-in-out infinite",
          }}
        />

        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[16em] pb-[10em] relative z-10 max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[991px]:pb-[80px] max-[479px]:px-[20px]">
          <div className="grid grid-cols-[1.4fr_1fr] gap-[60px] items-center max-[767px]:grid-cols-1 max-[767px]:gap-[60px]">
            {/* Copy - slides in from left */}
            <div
              className="flex flex-col gap-[40px] text-xwhite"
              style={{ animation: "slideInLeft 0.8s ease-out both" }}
            >
              <h1 className="text-[7em] font-medium leading-[0.95] tracking-[-0.05em] max-[991px]:text-[3.75rem] max-[479px]:text-[2.75rem]">
                See the{" "}
                <span className="text-xlight-blue">full picture</span> of
                your health
              </h1>

              <div
                className="text-[1.75rem] font-medium leading-[1.35] tracking-[-0.01em] max-w-[38ch]"
                style={{ color: "#ffffff" }}
              >
                xHeal connects your sleep, mood, nutrition, activity, medical
                records, and lab results into one clear Health Awareness score
                &ndash; so you always know where you stand.
              </div>

              {/* Social proof */}
              <div
                className="flex items-center gap-[16px] flex-wrap"
                style={{
                  animation: "fadeInUp 0.6s ease-out 0.4s both",
                }}
              >
                <div className="flex -space-x-[10px]">
                  {[
                    "/images/testimonial-kris.jpeg",
                    "/images/testimonial-jessica.jpeg",
                    "/images/testimonial-michael.jpeg",
                  ].map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt=""
                      width={44}
                      height={44}
                      className="w-[44px] h-[44px] rounded-full border-[2px] border-[#4764ff] object-cover"
                    />
                  ))}
                </div>
                <span
                  className="text-[1.125rem]"
                  style={{ color: "#ffffffdd" }}
                >
                  Rated 5.0 on the App Store
                </span>
              </div>

              {/* CTA */}
              <div style={{ animation: "fadeInUp 0.6s ease-out 0.6s both" }}>
                <a
                  href="https://apps.apple.com/us/app/xheal/id6748074977"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Image
                    src="/images/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={200}
                    height={67}
                    priority
                  />
                </a>
                <p className="text-[0.875rem] mt-[8px]" style={{ color: "#ffffffaa" }}>
                  Free to download. Your data stays yours.
                </p>
              </div>
            </div>

            {/* Phone - floats and slides in from right */}
            <div
              className="relative flex justify-center max-[767px]:justify-center"
              style={{ animation: "slideInRight 0.8s ease-out 0.3s both" }}
            >
              <div style={{ animation: "floatPhone 5s ease-in-out infinite" }}>
                <Image
                  src="/images/reports-landing.png"
                  alt="xHeal Health Awareness - see your complete health score across all domains"
                  width={932}
                  height={1600}
                  className="w-[28em] max-w-[480px] drop-shadow-[0_20px_60px_#4764ff55] max-[767px]:w-full max-[767px]:max-w-[340px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to top, var(--white) 0%, transparent 100%)",
          }}
        />
      </section>

      {/* ============================================================ */}
      {/* 2. PAIN - Big dramatic typography                             */}
      {/* ============================================================ */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[5em] pb-[5em] flex flex-col gap-[80px] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <ScrollReveal>
            <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack max-w-[52rem] max-[991px]:text-[3rem]">
              Six health domains. Zero places that connect them,{" "}
              <span className="text-xdark-blue">
                until now.
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-[24px] max-[991px]:grid-cols-1">
            {painPoints.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 120}>
                <div className="border border-xlight-blue-low bg-xwhite rounded-[16px] p-[32px] shadow-[0_4px_4px_#1419330d] flex flex-col gap-[20px] h-full transition-all duration-300 hover:shadow-[0_12px_40px_#14193318] hover:-translate-y-[4px]">
                  {/* Icon */}
                  <span
                    className="text-xdark-blue text-[2rem]"
                    style={{ fontFamily: "MaterialSymbolsRounded" }}
                  >
                    {p.icon}
                  </span>
                  <h3 className="text-[1.5rem] font-medium leading-[1.1] tracking-[-0.01em] text-xblack">
                    {p.title}
                  </h3>
                  <p className="text-xblack-70 text-[1.125rem] leading-[1.5] max-[767px]:text-[1rem]">
                    {p.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. HOW IT WORKS - Vertical timeline with animated line        */}
      {/* ============================================================ */}
      <section
        className="relative"
        style={{
          backgroundImage: "url(/images/wave.svg)",
          backgroundPosition: "50% 60%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto 24em",
        }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <ScrollReveal>
            <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack text-center max-[991px]:text-[3rem]">
              From scattered data to{" "}
              <span className="text-xdark-blue">a single score</span>
            </h2>
          </ScrollReveal>

          {/* Steps with vertical connector */}
          <div
            className="relative w-full max-w-[900px]"
            ref={lineAnim.ref}
          >
            {/* Animated vertical line */}
            <div className="absolute left-[32px] top-[20px] bottom-[20px] w-[2px] bg-xlight-blue-low overflow-hidden max-[767px]:left-[24px]">
              <div
                className="w-full bg-xdark-blue"
                style={{
                  height: lineAnim.visible ? "100%" : "0%",
                  transition: "height 1.5s ease-out 0.3s",
                }}
              />
            </div>

            <div className="flex flex-col gap-[40px]">
              {howItWorks.map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 200}>
                  <div className="grid grid-cols-[64px_1fr] gap-[32px] items-start max-[767px]:grid-cols-[48px_1fr] max-[767px]:gap-[20px]">
                    {/* Step number circle */}
                    <div className="w-[64px] h-[64px] rounded-full bg-xdark-blue text-xwhite flex items-center justify-center text-[1.25rem] font-medium flex-shrink-0 relative z-10 shadow-[0_4px_20px_#4764ff44] max-[767px]:w-[48px] max-[767px]:h-[48px] max-[767px]:text-[1rem]">
                      {s.step}
                    </div>
                    {/* Content card */}
                    <div className="border border-xlight-blue-low bg-xwhite rounded-[16px] p-[32px] shadow-[0_4px_4px_#1419330d] flex flex-col gap-[12px]">
                      <h3 className="text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-xblack max-[767px]:text-[1.5rem]">
                        {s.title}
                      </h3>
                      <p className="text-xblack-70 text-[1.125rem] leading-[1.5] max-[767px]:text-[1rem]">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. USE CASES - Chat-bubble style with glow hover              */}
      {/* ============================================================ */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col gap-[80px] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <ScrollReveal>
            <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack max-w-[52rem] max-[991px]:text-[3rem]">
              See where you stand.{" "}
              <span className="text-xdark-blue">
                Know where to focus.
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-[20px] max-[991px]:grid-cols-2 max-[767px]:grid-cols-1">
            {useCases.map((uc, i) => (
              <ScrollReveal key={uc.question} delay={i * 80}>
                <div className="group border border-xlight-blue-low bg-xwhite rounded-[16px] p-[28px] shadow-[0_4px_4px_#1419330d] flex flex-col gap-[16px] h-full transition-all duration-300 hover:shadow-[0_8px_32px_#4764ff22] hover:-translate-y-[3px] hover:border-xlight-blue">
                  <span className="text-xdark-blue text-[0.85rem] font-medium tracking-[0.04em] uppercase">
                    {uc.tag}
                  </span>
                  <h3 className="text-[1.375rem] font-medium leading-[1.2] tracking-[-0.01em] text-xblack">
                    &ldquo;{uc.question}&rdquo;
                  </h3>
                  <p className="text-xblack-70 text-[1.125rem] leading-[1.5] max-[767px]:text-[1rem]">
                    {uc.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. TESTIMONIALS - Dark cinematic strip                        */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #141933 0%, #1e2548 50%, #141933 100%)",
        }}
      >
        {/* Subtle glow accent */}
        <div
          className="absolute top-[-100px] left-[20%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #4764ff22 0%, transparent 70%)",
          }}
        />

        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[60px] relative z-10 max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <ScrollReveal>
            <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xwhite text-center max-[991px]:text-[3rem]">
              The full picture{" "}
              <span className="text-xlight-blue">changed everything</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-[24px] w-full max-[991px]:grid-cols-1">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 150}>
                <div className="border border-[#ffffff14] bg-[#ffffff0a] backdrop-blur-sm rounded-[16px] p-[32px] flex flex-col justify-between gap-[28px] h-full transition-all duration-300 hover:border-[#ffffff22] hover:bg-[#ffffff10]">
                  <div className="flex flex-col gap-[16px]">
                    <div className="text-xlight-blue">
                      <StarRating />
                    </div>
                    <p
                      className="text-[1.125rem] leading-[1.6] font-medium max-[767px]:text-[1rem]"
                      style={{ color: "#ffffff" }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="w-[48px] h-[48px] rounded-full object-cover border border-[#ffffff22]"
                    />
                    <span
                      className="text-[1rem] font-medium"
                      style={{ color: "#ffffff" }}
                    >
                      {t.name}, {t.age}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. TRUST & SECURITY - Split layout with 360 visual            */}
      {/* ============================================================ */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="grid grid-cols-[1.4fr_1fr] gap-[80px] items-center max-[991px]:gap-[40px] max-[767px]:grid-cols-1">
            <ScrollReveal>
              <div className="flex flex-col gap-[40px]">
                <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack max-[991px]:text-[3rem]">
                  How we calculate your score, and{" "}
                  <span className="text-xdark-blue">protect your data</span>
                </h2>

                <div className="flex flex-col gap-[28px]">
                  {trustItems.map((item, i) => (
                    <div key={item.title} className="flex gap-[16px]">
                      <div className="w-[3px] bg-xdark-blue rounded-full flex-shrink-0 mt-[6px] self-stretch" />
                      <div>
                        <h3 className="text-xblack text-[1.25rem] font-medium leading-[1.3] mb-[6px]">
                          {item.title}
                        </h3>
                        <p className="text-xblack-70 text-[1.125rem] leading-[1.5] max-[767px]:text-[1rem]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Image
                src="/images/xheal-360.svg"
                alt="xHeal 360-degree health analysis"
                width={600}
                height={600}
                className="w-full max-w-[500px] mx-auto"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FAQ - Dark cinematic section                               */}
      {/* ============================================================ */}
      <section
        style={{
          background:
            "linear-gradient(180deg, #141933 0%, #1a2040 50%, #141933 100%)",
        }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[60px] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <ScrollReveal>
            <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xwhite text-center max-[991px]:text-[3rem]">
              About your Health Awareness score
            </h2>
          </ScrollReveal>

          <div className="w-full max-w-[720px]">
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <CrossLinkSection pageSlug="health-awareness" />

      {/* ============================================================ */}
      {/* 8. FINAL CTA - Cinematic gradient with large type             */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 100% 120% at 50% 100%, #4764ff 0%, #141933 60%, #0a0e1f 100%)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute bottom-[-100px] left-[50%] -translate-x-[50%] w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, #4764ff33 0%, transparent 70%)",
            animation: "pulseGlow 5s ease-in-out infinite",
          }}
        />

        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[10em] flex flex-col items-center gap-[40px] text-center relative z-10 max-[991px]:px-[40px] max-[991px]:py-[6em] max-[479px]:px-[20px]">
          <ScrollReveal>
            <h2 className="text-[4.5rem] font-medium leading-[1] tracking-[-0.04em] text-xwhite max-w-[48rem] mx-auto max-[991px]:text-[3rem]">
              Understand your health.{" "}
              <span className="text-xlight-blue">All of it.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p
              className="text-[1.25rem] max-w-[44ch] leading-[1.5] mx-auto"
              style={{ color: "#ffffffcc" }}
            >
              Download xHeal and get a complete picture of your wellbeing
              &ndash; not just pieces.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <a
              href="https://apps.apple.com/us/app/xheal/id6748074977"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src="/images/app-store-badge.svg"
                alt="Download on the App Store"
                width={200}
                height={67}
              />
            </a>
            <p className="text-[0.875rem] mt-[8px]" style={{ color: "#ffffffaa" }}>
              Free to download. Your data stays yours.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
