"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CrossLinkSection from "@/components/feature-landing/CrossLinkSection";
import ComparisonSection from "@/components/feature-landing/ComparisonSection";
import MedicalStandardsBadge from "@/components/ui/MedicalStandardsBadge";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const painPoints = [
  {
    icon: "casino",
    title: "Flare-ups feel random",
    detail:
      "One week you're fine, the next you're wiped out. Without clear patterns, every flare-up feels like it comes from nowhere - and you're left reacting instead of preventing.",
  },
  {
    icon: "visibility_off",
    title: "Triggers hide in plain sight",
    detail:
      "Was it the meal you had two days ago? The bad night of sleep? The stress at work? Triggers are subtle and stack up. Spotting them manually is nearly impossible.",
  },
  {
    icon: "emergency",
    title: "Reactive instead of proactive",
    detail:
      "By the time you feel a flare-up, it's already happening. Without early detection, you're always one step behind your own body.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Log symptoms and daily activities",
    description:
      "Track how you feel, what you eat, how you sleep, and what you do. xHeal makes logging fast and frictionless - a few taps, not a journal entry.",
  },
  {
    step: "02",
    title: "xHeal cross-references your patterns",
    description:
      "Our AI analyzes your symptom logs alongside sleep, stress, nutrition, activity, and wearable data to find correlations you'd never spot on your own.",
  },
  {
    step: "03",
    title: "Get early warnings and insights",
    description:
      "xHeal alerts you when your data suggests a flare-up may be developing - giving you time to adjust before symptoms escalate.",
  },
];

const useCases = [
  {
    question: "What triggered my last flare-up?",
    tag: "Root cause",
    description:
      "xHeal traces back through your recent data to identify the most likely contributing factors.",
  },
  {
    question: "Are my flare-ups seasonal?",
    tag: "Seasonality",
    description:
      "See long-term patterns across months and seasons. Some triggers are cyclical - xHeal helps you spot them.",
  },
  {
    question: "How does stress affect my symptoms?",
    tag: "Stress link",
    description:
      "Correlate stress levels from your logs and wearable data with symptom severity over time.",
  },
  {
    question: "What can I do to prevent the next one?",
    tag: "Prevention",
    description:
      "Get personalised suggestions based on what's worked before and what your current trends show.",
  },
  {
    question: "Is a flare-up coming?",
    tag: "Early warning",
    description:
      "When your HRV drops, sleep worsens, or activity patterns shift, xHeal connects the dots before you feel it.",
  },
  {
    question: "Are my flare-ups getting less frequent?",
    tag: "Progress",
    description:
      "Track your flare-up frequency over time to see if your preventive actions are working.",
  },
];

const testimonials = [
  {
    quote:
      "xHeal predicted my last three IBS flares 48 hours in advance. I adjusted my diet each time and two of the three never fully hit.",
    name: "Larry K.",
    age: 38,
    image: "/images/testimonials/t-102.png",
  },
  {
    quote:
      "Migraine prediction is the killer feature for me. xHeal catches the HRV and sleep pattern that precedes my migraines by 36 hours.",
    name: "Deborah W.",
    age: 44,
    image: "/images/testimonials/t-104.png",
  },
  {
    quote:
      "Gout attacks used to blindside me. xHeal connected them to dehydration and specific protein intake patterns. Prevention beats treatment.",
    name: "Howard J.",
    age: 52,
    image: "/images/testimonials/t-106.png",
  },
];

const trustItems = [
  {
    title: "Your patterns stay on your terms",
    detail:
      "Flare-up data is analyzed using zero-retention AI. Your symptom patterns are never stored by our AI partner or used to train models.",
  },
  {
    title: "Clinically grounded detection",
    detail:
      "Pattern analysis is interpreted through WHO, ADA, and EASD guidelines, not unverified correlations.",
  },
  {
    title: "Only you see your triggers",
    detail:
      "Your trigger patterns, symptom logs, and early warnings are visible only to you unless you choose to share them.",
  },
  {
    title: "Built for accuracy, not assumptions",
    detail:
      "xHeal cross-references multiple data sources before surfacing a pattern. The more context you provide, the fewer false signals.",
  },
];

const faqs = [
  {
    q: "What counts as a flare-up?",
    a: "A flare-up is any significant worsening of your symptoms. xHeal lets you define what that means for you - whether it's pain, fatigue, inflammation, or mood changes.",
  },
  {
    q: "How long until patterns emerge?",
    a: "It depends on your logging consistency. Most users start seeing meaningful patterns within 2-4 weeks of regular tracking.",
  },
  {
    q: "Can xHeal predict flare-ups?",
    a: "xHeal identifies early warning signs based on your historical patterns. It's not a crystal ball, but it can flag when your data looks similar to past pre-flare-up periods.",
  },
  {
    q: "What data helps with flare-up detection?",
    a: "The more context, the better. Symptom logs, sleep data, stress levels, nutrition, activity, and wearable metrics all contribute to more accurate pattern detection.",
  },
  {
    q: "Is this a replacement for my doctor?",
    a: "No. xHeal is a health companion that helps you understand your patterns and prepare better conversations with your care team.",
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
        <h3 className="text-[1.25rem] font-medium leading-[1.3] tracking-[-0.01em] text-xwhite group-hover:text-xlight-blue transition-colors duration-200">
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
        <p className="text-[1.125rem] leading-[1.6] max-w-[60ch]" style={{ color: "#ffffffcc" }}>
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

export default function FlareUpTriggerPatternsPage() {
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
                Know your flare-ups{" "}
                <span className="text-xlight-blue">before they happen</span>
              </h1>

              <div className="text-[1.75rem] font-medium leading-[1.35] tracking-[-0.01em] max-w-[38ch] max-[479px]:text-[1.25rem]" style={{ color: "#ffffff" }}>
                xHeal detects early warning signs by cross-referencing your
                symptoms, habits, and health data - so you can take control
                before a flare-up takes over.
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
                <span className="text-[1.125rem]" style={{ color: "#ffffff" }}>
                  Rated 5.0 on the App Store
                </span>
              </div>

              {/* CTA */}
              <div
                style={{ animation: "fadeInUp 0.6s ease-out 0.6s both" }}
              >
                <div className="flex items-center gap-[24px] flex-wrap">
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
                  <MedicalStandardsBadge className="text-xwhite" />
                </div>
                <p className="text-[0.875rem] mt-[8px]" style={{ color: "#ffffffdd" }}>
                  Free to download. Your data stays yours.
                </p>
              </div>
            </div>

            {/* Phone - floats and slides in from right */}
            <div
              className="relative flex justify-end self-start max-[767px]:justify-center"
              style={{ animation: "slideInRight 0.8s ease-out 0.3s both" }}
            >
              <div style={{ animation: "floatPhone 5s ease-in-out infinite" }}>
                <Image
                  src="/images/flare-up.png"
                  alt="xHeal Flare-up Trigger Patterns - detect early warning signs and prevent flare-ups"
                  width={978}
                  height={1998}
                  className="w-[28em] max-w-[460px] drop-shadow-[0_20px_60px_#4764ff55] max-[767px]:w-full max-[767px]:max-w-[300px] max-[767px]:mx-auto"
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
              Your body sends warning signs.{" "}
              <span className="text-xdark-blue">
                The problem is seeing them in time.
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
              From tracking to preventing,{" "}
              <span className="text-xdark-blue">in three steps</span>
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
              Questions your body{" "}
              <span className="text-xdark-blue">
                can finally answer
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

      <ComparisonSection
        heading="Other apps track symptoms."
        headingAccent="xHeal predicts what's coming."
        intro="Wellness trackers help you record how you feel. That's useful. But recording isn't preventing. xHeal goes further: it cross-references your symptoms with your sleep, stress, nutrition, activity, and clinical data to find patterns and warns you before a flare-up develops."
        columns={["WHOOP", "Bevel Health", "Olivia Health", "xHeal"]}
        rows={[
          { feature: "Log symptoms", values: ["no", "no", "yes", "yes"] },
          { feature: "Track daily habits", values: ["yes", "yes", "Limited", "yes"] },
          { feature: "Import medical records", values: ["no", "no", "yes", "yes"] },
          { feature: "Lab result analysis", values: ["no", "no", "no", "yes"] },
          { feature: "AI pattern detection", values: ["no", "no", "no", "yes"] },
          { feature: "Early flare-up warnings", values: ["no", "no", "no", "yes"] },
          { feature: "Correlate across data types", values: ["Fitness only", "Lifestyle only", "Records only", "250+ parameters"] },
          { feature: "Works without proprietary hardware", values: ["no", "Apple Watch only", "yes", "yes"] },
          { feature: "Clinical AI reasoning (WHO, ADA, EASD)", values: ["no", "no", "no", "yes"] },
          { feature: "Generate doctor reports", values: ["no", "no", "no", "4 report types"] },
        ]}
        closingLine="WHOOP tracks your strain. Bevel tracks your recovery. Olivia organizes your records. Only xHeal connects it all to predict what's coming."
        highlightColumn={3}
      />

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
              From reacting to flare-ups{" "}
              <span className="text-xlight-blue">to preventing them</span>
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
                    <p className="text-[1.125rem] leading-[1.6] font-medium max-[767px]:text-[1rem]" style={{ color: "#ffffff" }}>
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
                    <span className="text-[1rem] font-medium" style={{ color: "#ffffff" }}>
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
                  How pattern detection{" "}
                  <span className="text-xdark-blue">stays private</span>
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
              About flare-up detection
            </h2>
          </ScrollReveal>

          <div className="w-full max-w-[720px]">
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <CrossLinkSection pageSlug="flare-up-trigger-patterns" />

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
              Stop guessing.{" "}
              <span className="text-xlight-blue">Start preventing.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-[1.25rem] max-w-[44ch] leading-[1.5] mx-auto" style={{ color: "#ffffffcc" }}>
              Download xHeal and let your Digital Twin help you get ahead of
              your flare-ups.
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
