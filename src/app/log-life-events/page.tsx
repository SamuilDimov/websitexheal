"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CrossLinkSection from "@/components/feature-landing/CrossLinkSection";
import MedicalStandardsBadge from "@/components/ui/MedicalStandardsBadge";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const painPoints = [
  {
    icon: "change_history",
    title: "Small changes have big effects",
    detail:
      "Started a new supplement? Changed your diet? Moved to a new city? These moments shape your health, but they're invisible to your doctor and easy to forget.",
  },
  {
    icon: "psychology",
    title: "Memory is unreliable",
    detail:
      "Three months from now, you won't remember when you started that medication or what happened the week your symptoms got worse. Without logs, context disappears.",
  },
  {
    icon: "broken_image",
    title: "Context gets lost",
    detail:
      "Your wearable tracks steps and heart rate automatically, but it can't track a stressful week, a medication change, or a food sensitivity. The most important context is manual.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Log what matters",
    description:
      "Track medications, supplements, life events, diet changes, stressful periods, and anything else that might affect your health. A few taps is all it takes.",
  },
  {
    step: "02",
    title: "xHeal timestamps everything",
    description:
      "Every log entry is placed on your health timeline alongside your vitals, symptoms, and records - creating a complete, chronological picture.",
  },
  {
    step: "03",
    title: "Patterns emerge automatically",
    description:
      "Your Digital Twin connects your logs with your health data. That supplement you started? xHeal can show you what changed after.",
  },
];

const useCases = [
  {
    tag: "Supplements",
    question: "Did changing my supplement help?",
    description:
      "Compare your health metrics before and after starting a new supplement. xHeal shows the data, not guesswork.",
  },
  {
    tag: "Medications",
    question: "What happened after I started that medication?",
    description:
      "Track side effects, symptom changes, and vital sign shifts correlated with medication start dates.",
  },
  {
    tag: "Stress",
    question: "How did that stressful week affect me?",
    description:
      "Log high-stress periods and see how they correlate with sleep quality, symptoms, and energy levels.",
  },
  {
    tag: "Diet",
    question: "Is my new diet making a difference?",
    description:
      "Mark when you started a dietary change and watch how your body responds over days and weeks.",
  },
  {
    tag: "Life events",
    question: "How did moving affect my health?",
    description:
      "Major life changes ripple through your wellbeing. Log them so your Digital Twin can factor them in.",
  },
  {
    tag: "Patterns",
    question: "What keeps making me feel worse?",
    description:
      "When you log consistently, xHeal surfaces correlations between your habits and your symptoms that you'd never spot alone.",
  },
];

const testimonials = [
  {
    quote:
      "My supplement stack was expensive and I had no idea what was working. xHeal helped me cut 4 supplements and keep the 3 that actually moved my labs.",
    name: "Dana K.",
    age: 37,
    image: "/images/testimonials/t-112.png",
  },
  {
    quote:
      "I started a new antidepressant and xHeal tracked my sleep, mood, and energy through the transition. Showed my doctor exactly how I responded.",
    name: "Wesley F.",
    age: 34,
    image: "/images/testimonials/t-111.png",
  },
  {
    quote:
      "Magnesium timing matters. xHeal proved that taking it at night vs morning makes a measurable difference in my sleep quality.",
    name: "Kelly N.",
    age: 29,
    image: "/images/testimonials/t-117.png",
  },
];

const trustItems = [
  {
    title: "Manual data stays manual",
    detail:
      "What you log is what you choose to log. xHeal never auto-generates life event entries or infers sensitive details without your input.",
  },
  {
    title: "Logs feed your AI, not ours",
    detail:
      "Your log entries make your Digital Twin smarter. They're never shared with our AI partner for training or stored externally.",
  },
  {
    title: "Share selectively",
    detail:
      "Include log data in specialist reports or keep it private. You control which logs are visible and to whom.",
  },
  {
    title: "Context without surveillance",
    detail:
      "xHeal captures what your wearable can't: stress, medications, life changes. But only what you decide to record.",
  },
];

const faqs = [
  {
    q: "What can I log?",
    a: "Medications, supplements, life events (moves, job changes, relationship changes), diet changes, stress periods, symptoms, and any custom notes you want your Digital Twin to know about.",
  },
  {
    q: "How long does logging take?",
    a: "Most entries take under 30 seconds. xHeal is designed for quick, frictionless logging - not journaling.",
  },
  {
    q: "Does xHeal log anything automatically?",
    a: "Yes. Wearable data (steps, heart rate, sleep, HRV) syncs automatically via Apple Health. Manual logs are for context that wearables can't capture.",
  },
  {
    q: "How does logging help my health?",
    a: "The more context your Digital Twin has, the better it can detect patterns, predict flare-ups, and give you personalised recommendations.",
  },
  {
    q: "Can my doctor see my logs?",
    a: "Only if you choose to share them. You can include log data in your specialist-ready reports or keep it private.",
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
          className="text-[1.25rem] font-medium leading-[1.3] tracking-[-0.01em] text-xwhite group-hover:text-xlight-blue transition-colors duration-200"
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

export default function LogLifeEventsPage() {
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
                Every detail{" "}
                <span className="text-xlight-blue">matters</span> for your
                health
              </h1>

              <div
                className="text-[1.75rem] font-medium leading-[1.35] tracking-[-0.01em] max-w-[38ch] max-[479px]:text-[1.25rem]"
                style={{ color: "#ffffff" }}
              >
                Track supplements, medications, and life events so your Digital
                Twin can connect the dots you&apos;d never spot on your own.
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
                  style={{ color: "#ffffff" }}
                >
                  Rated 5.0 on the App Store
                </span>
              </div>

              {/* CTA */}
              <div style={{ animation: "fadeInUp 0.6s ease-out 0.6s both" }}>
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
                  src="/images/log-medication.png"
                  alt="xHeal Log Life Events - track medications, supplements, and life events on your health timeline"
                  width={1106}
                  height={2172}
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
              Your Apple Watch tracks your heart rate.{" "}
              <span className="text-xdark-blue">
                It can&apos;t track a stressful week.
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
              30 seconds to log.{" "}
              <span className="text-xdark-blue">Months of insight.</span>
            </h2>
          </ScrollReveal>

          {/* Steps with vertical connector */}
          <div className="relative w-full max-w-[900px]" ref={lineAnim.ref}>
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
              Every log makes your Digital Twin{" "}
              <span className="text-xdark-blue">
                smarter
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
              The small things turned out{" "}
              <span className="text-xlight-blue">to be the big things</span>
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
                  Your logs. Your choice{" "}
                  <span className="text-xdark-blue">who sees them.</span>
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
              About logging life events
            </h2>
          </ScrollReveal>

          <div className="w-full max-w-[720px]">
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <CrossLinkSection pageSlug="log-life-events" />

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
              The context your health data is missing.{" "}
              <span className="text-xlight-blue">Start logging.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p
              className="text-[1.25rem] max-w-[44ch] leading-[1.5] mx-auto"
              style={{ color: "#ffffffcc" }}
            >
              Download xHeal and give your Digital Twin the context it needs to
              truly understand your health.
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
