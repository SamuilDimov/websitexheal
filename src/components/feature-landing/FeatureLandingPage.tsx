"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import FeatureImageSlideshow from "@/components/sections/FeatureImageSlideshow";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CrossLinkSection from "@/components/feature-landing/CrossLinkSection";
import ComparisonSection from "@/components/feature-landing/ComparisonSection";
import ProofLine from "@/components/ui/ProofLine";
import Icon from "@/components/ui/Icon";
import { APP_STORE_URL } from "@/lib/site";
import {
  featureVisuals,
  type FeatureVisualSlug,
} from "@/data/feature-visuals";

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

interface PainPoint {
  icon: string;
  title: string;
  detail: string;
}

interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

interface UseCase {
  question: string;
  tag: string;
  description: string;
}

interface Testimonial {
  quote: string;
  name: string;
  age: number;
  image: string;
}

interface TrustItem {
  title: string;
  detail: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface ComparisonData {
  heading: string;
  headingAccent: string;
  intro: string;
  columns: string[];
  rows: { feature: string; values: string[] }[];
  closingLine: string;
  highlightColumn?: number;
  highlightLabel?: string;
  methodology?: string;
  sources?: { label: string; url: string }[];
  disclaimer?: string;
}

export interface FeatureLandingPageProps {
  /* Hero */
  heroTitle: ReactNode;
  heroSubtitle: ReactNode;

  /* Section 2: Pain Points */
  painHeading: ReactNode;
  painPoints: PainPoint[];

  /* Section 3: How It Works */
  howHeading: ReactNode;
  howItWorks: HowItWorksStep[];

  /* Section 4 (optional): Extra section between How It Works and Use Cases */
  extraSection?: ReactNode;

  /* Section 5: Use Cases */
  useCasesHeading: ReactNode;
  useCases: UseCase[];

  /* Comparison Table */
  comparison: ComparisonData;

  /* Testimonials */
  testimonialsHeading: ReactNode;
  testimonials: Testimonial[];

  /* Trust & Security */
  trustHeading: ReactNode;
  trustItems: TrustItem[];

  /* FAQ */
  faqHeading: string;
  faqs: FAQ[];

  /* Cross-link */
  pageSlug: FeatureVisualSlug;

  /* Final CTA */
  ctaHeading: ReactNode;
  ctaSubtitle: string;
}

/* ------------------------------------------------------------------ */
/*  SMALL COMPONENTS                                                   */
/* ------------------------------------------------------------------ */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-xborder">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left py-7 flex justify-between items-start gap-5 group"
      >
        <h3 className="t-h4 text-xprimary group-hover:text-xbrand transition-colors duration-200">
          {q}
        </h3>
        <span
          className="text-xbrand text-[24px] font-light leading-none flex-shrink-0 mt-1 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] pb-7" : "max-h-0"
        }`}
      >
        <p className="t-body1 text-xsecondary max-w-[60ch]">{a}</p>
      </div>
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex gap-1.5 text-[#F6A724]">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="16"
          height="15"
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
/*  MAIN TEMPLATE                                                      */
/* ------------------------------------------------------------------ */

export default function FeatureLandingPage(props: FeatureLandingPageProps) {
  const lineAnim = useInView(0.1);
  const t = useTranslations("FeatureLanding");
  const visualT = useTranslations("WhatYouGet");
  const visual = featureVisuals[props.pageSlug];
  const heroImages = visual.images.map((image) => ({
    src: image.src,
    alt: visualT(image.altKey),
    width: image.width,
    height: image.height,
  }));

  return (
    <>
      {/* ============================================================ */}
      {/* 1. HERO                                                       */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-xbg">

        <div className="relative z-10 x-container pt-[72px] pb-20"><div className="pt-12 md:pt-20">
          <div className="grid grid-cols-[1.4fr_1fr] gap-16 items-center max-[767px]:grid-cols-1 max-[767px]:gap-10">
            <div
              className="flex flex-col gap-8 text-xprimary"
              style={{ animation: "slideInLeft 0.8s ease-out both" }}
            >
              <h1 className="t-display1 text-xprimary">{props.heroTitle}</h1>

              <div className="t-h3 text-xsecondary max-w-[44ch] font-normal">
                {props.heroSubtitle}
              </div>

              {/* Social proof */}
              {/* Rating held until the App Store count clears 100 (redesign decision 4). */}

              {/* CTA */}
              <div style={{ animation: "fadeInUp 0.6s ease-out 0.6s both" }}>
                <div className="flex items-center gap-6 flex-wrap">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src="/images/app-store-badge.svg"
                      alt={t("downloadOnAppStore")}
                      width={180}
                      height={60}
                      priority
                    />
                  </a>
                </div>
                <p className="t-body3 text-xtertiary mt-2">{t("freeToDownload")}</p>
                <ProofLine className="mt-5 border-t x-hairline pt-5" />
              </div>
            </div>

            {/* Phone */}
            <div
              className="relative flex justify-end self-start max-[767px]:justify-center"
              style={{ animation: "slideInRight 0.8s ease-out 0.3s both" }}
            >
              <div
                className="relative"
                data-feature-hero={props.pageSlug}
                
              >
                <FeatureImageSlideshow
                  images={heroImages}
                  deviceFrame={visual.deviceFrame}
                  intervalMs={2500}
                  variant="landing"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PAIN POINTS                                                */}
      {/* ============================================================ */}
      <section className="bg-xbg">
        <div className="x-container x-section flex flex-col gap-12">
          <ScrollReveal>
            <h2 className="t-display2 text-xprimary max-w-[52rem]">
              {props.painHeading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-6 max-[991px]:grid-cols-1">
            {props.painPoints.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 120}>
                <div className="surface-card-feature p-8 flex flex-col gap-5 h-full">
                  <Icon name={p.icon} size={32} className="text-xbrand" />
                  <h3 className="t-h3 text-xprimary">{p.title}</h3>
                  <p className="t-body1 text-xsecondary">{p.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. HOW IT WORKS                                               */}
      {/* ============================================================ */}
      <section className="relative bg-xbg">

        <div className="relative x-container x-section flex flex-col gap-12">
          <ScrollReveal>
            <h2 className="t-display2 text-xprimary max-w-[52rem]">
              {props.howHeading}
            </h2>
          </ScrollReveal>

          <div className="relative w-full max-w-[900px]" ref={lineAnim.ref}>
            <div className="absolute left-[32px] top-5 bottom-5 w-[2px] bg-xborder overflow-hidden max-[767px]:left-6">
              <div
                className="w-full bg-xbrand"
                style={{
                  height: lineAnim.visible ? "100%" : "0%",
                  transition: "height 1.5s ease-out 0.3s",
                }}
              />
            </div>

            <div className="flex flex-col gap-10">
              {props.howItWorks.map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 200}>
                  <div className="grid grid-cols-[64px_1fr] gap-8 items-start max-[767px]:grid-cols-[48px_1fr] max-[767px]:gap-5">
                    <div className="w-16 h-16 rounded-full bg-xbrand text-white flex items-center justify-center t-h5 flex-shrink-0 relative z-10 max-[767px]:w-12 max-[767px]:h-12 max-[767px]:text-[14px]">
                      {s.step}
                    </div>
                    <div className="surface-card-feature p-8 flex flex-col gap-3">
                      <h3 className="t-h2 text-xprimary max-[767px]:text-[24px]">
                        {s.title}
                      </h3>
                      <p className="t-body1 text-xsecondary">{s.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Optional extra section (e.g., Four Reports grid) */}
      {props.extraSection}

      {/* ============================================================ */}
      {/* 4. USE CASES                                                  */}
      {/* ============================================================ */}
      <section className="bg-xbg">
        <div className="x-container x-section flex flex-col gap-12">
          <ScrollReveal>
            <h2 className="t-display2 text-xprimary max-w-[52rem]">
              {props.useCasesHeading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-5 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1">
            {props.useCases.map((uc, i) => (
              <ScrollReveal key={uc.question} delay={i * 80}>
                <div className="group surface-card-feature p-7 flex flex-col gap-4 h-full">
                  <h3 className="t-h4 text-xprimary">
                    &ldquo;{uc.question}&rdquo;
                  </h3>
                  <p className="t-body2 text-xsecondary">{uc.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPARISON TABLE                                              */}
      {/* ============================================================ */}
      <ComparisonSection
        heading={props.comparison.heading}
        headingAccent={props.comparison.headingAccent}
        intro={props.comparison.intro}
        columns={props.comparison.columns}
        rows={props.comparison.rows}
        closingLine={props.comparison.closingLine}
        highlightColumn={props.comparison.highlightColumn ?? 3}
        highlightLabel={props.comparison.highlightLabel}
        methodology={props.comparison.methodology}
        sources={props.comparison.sources}
        disclaimer={props.comparison.disclaimer}
      />

      {/* ============================================================ */}
      {/* TESTIMONIALS                                                  */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-xbg-2">


        <div className="relative x-container x-section flex flex-col gap-12">
          <ScrollReveal>
            <h2 className="t-display2 text-xprimary max-w-[52rem]">
              {props.testimonialsHeading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-6 w-full max-[991px]:grid-cols-1">
            {props.testimonials.map((tm, i) => (
              <ScrollReveal key={tm.name} delay={i * 150}>
                <div className="border border-xborder bg-xcard rounded-[20px] p-8 flex flex-col justify-between gap-7 h-full transition-all duration-300 hover:border-xborder-medium">
                  <div className="flex flex-col gap-4">
                    <StarRating />
                    <p className="t-body1 text-xprimary">
                      &ldquo;{tm.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src={tm.image}
                      alt={tm.name}
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full object-cover ring-1 ring-xborder"
                    />
                    <span className="t-h6 text-xprimary">
                      {tm.name}, {tm.age}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TRUST & SECURITY                                              */}
      {/* ============================================================ */}
      <section className="bg-xbg">
        <div className="x-container x-section">
          <div className="grid grid-cols-[1.4fr_1fr] gap-16 items-center max-[991px]:gap-10 max-[767px]:grid-cols-1">
            <ScrollReveal>
              <div className="flex flex-col gap-8">
                <h2 className="t-display2 text-xprimary">{props.trustHeading}</h2>

                <div className="flex flex-col gap-7">
                  {props.trustItems.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-[3px] bg-xbrand rounded-full flex-shrink-0 mt-1.5 self-stretch" />
                      <div>
                        <h3 className="t-h4 text-xprimary mb-1.5">
                          {item.title}
                        </h3>
                        <p className="t-body1 text-xsecondary">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <ProofLine />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">

                <Image
                  src="/images/xheal-360.svg"
                  alt="xHeal 360-degree health analysis"
                  width={600}
                  height={600}
                  className="w-full max-w-[500px] mx-auto"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ                                                           */}
      {/* ============================================================ */}
      <section className="bg-xbg-2">
        <div className="x-container x-section flex flex-col gap-12">
          <ScrollReveal>
            <h2 className="t-display2 text-xprimary max-w-[52rem]">
              {props.faqHeading}
            </h2>
          </ScrollReveal>

          <div className="w-full max-w-[720px]">
            {props.faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <CrossLinkSection pageSlug={props.pageSlug} />

      {/* ============================================================ */}
      {/* FINAL CTA                                                     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-xbg">



        <div className="relative z-10 x-container flex flex-col items-center gap-8 py-32 text-center max-[991px]:py-24">
          <ScrollReveal>
            <h2 className="t-display1 text-xprimary max-w-[48rem] mx-auto">
              {props.ctaHeading}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="t-h4 text-xsecondary max-w-[44ch] mx-auto font-normal">
              {props.ctaSubtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src="/images/app-store-badge.svg"
                alt={t("downloadOnAppStore")}
                width={200}
                height={67}
              />
            </a>
            <p className="t-body3 text-xtertiary mt-2">{t("freeToDownload")}</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
