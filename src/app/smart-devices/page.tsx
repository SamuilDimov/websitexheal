"use client";

import { useState } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────
// Small reusable atoms
// ─────────────────────────────────────────────

function Logo() {
  return (
    <a href="/" aria-label="xHeal home">
      <Image
        src="/images/logo.svg"
        alt="xHeal logo"
        width={120}
        height={38}
        className="w-[7.5em] min-w-[120px]"
        priority
      />
    </a>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded-full border border-white/30 px-[14px] py-[5px] text-[0.8rem] tracking-[0.12em] uppercase text-white/70"
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────
// Pre-order form
// ─────────────────────────────────────────────

type FormState = "idle" | "loading" | "success" | "error";

function PreOrderForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !firstName) return;
    setFormState("loading");

    // Simulate API call — swap with real endpoint later
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
  }

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center gap-[20px] text-center py-[40px]">
        {/* Animated check */}
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M8 18l7 7 13-13"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-[2rem] font-medium tracking-[-0.03em] text-white">
          You&rsquo;re on the list.
        </h3>
        <p className="text-white/60 max-w-[36ch] leading-[1.5] text-[1rem]">
          We&rsquo;ll reach out to <span className="text-white">{email}</span> when
          it&rsquo;s time to confirm your pre-order. Thank you, {firstName}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] w-full">
      <div className="grid grid-cols-2 gap-[16px] max-[479px]:grid-cols-1">
        <div className="flex flex-col gap-[8px]">
          <label className="text-[0.8rem] text-white/50 uppercase tracking-[0.08em]">
            First name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Alex"
            required
            className="bg-white/10 border border-white/20 rounded-[12px] px-[16px] py-[14px] text-white placeholder:text-white/30 text-[1rem] outline-none focus:border-white/60 transition-colors duration-200 w-full"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="text-[0.8rem] text-white/50 uppercase tracking-[0.08em]">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@email.com"
            required
            className="bg-white/10 border border-white/20 rounded-[12px] px-[16px] py-[14px] text-white placeholder:text-white/30 text-[1rem] outline-none focus:border-white/60 transition-colors duration-200 w-full"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={formState === "loading"}
        className="w-full rounded-[16px] py-[18px] font-medium text-[1.125rem] tracking-[-0.01em] transition-all duration-200 active:scale-[0.98] disabled:opacity-60"
        style={{ backgroundColor: "#ffffff", color: "#4764ff" }}
      >
        {formState === "loading" ? "Reserving your spot…" : "Reserve My xHeal Band"}
      </button>

      <p className="text-center text-[0.8rem] leading-[1.5]" style={{ color: "rgba(255,255,255,0.75)" }}>
        No payment now. We&rsquo;ll contact you to confirm before shipping.
        <br />
        By joining you agree to our{" "}
        <a href="/privacy-policy" className="underline hover:text-white/70 transition-colors">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────
// Feature chips
// ─────────────────────────────────────────────

const features = [
  {
    icon: "favorite",
    title: "Continuous HRV",
    detail: "Beat-by-beat heart rate variability tracked all day, not just overnight.",
  },
  {
    icon: "thermostat",
    title: "Skin Temperature",
    detail: "Catches subtle shifts hours before you feel them: illness, stress, or cycle changes.",
  },
  {
    icon: "bedtime",
    title: "Sleep Architecture",
    detail: "Light, deep, and REM breakdown with a proprietary recovery score.",
  },
  {
    icon: "water_drop",
    title: "Blood Oxygen (SpO₂)",
    detail: "Continuous overnight SpO₂ monitoring with trend alerts.",
  },
  {
    icon: "electric_bolt",
    title: "Strain & Activity",
    detail: "Real effort scoring that knows the difference between a walk and a workout, and weights recovery accordingly.",
  },
  {
    icon: "smartphone",
    title: "xHeal App Sync",
    detail: "All band data flows into your Digital Twin alongside your labs and records.",
  },
  {
    icon: "psychology",
    title: "Real-Time Stress Assessment",
    detail: "Tracks physiological stress markers continuously, so you see the load building before it peaks.",
  },
  {
    icon: "air",
    title: "Gas & Digestive Event Logging",
    detail: "Detects and logs gastrointestinal events to help identify food triggers and gut health patterns over time.",
  },
  {
    icon: "monitor_heart",
    title: "Cardiovascular Load Index",
    detail: "Goes beyond heart rate to measure cumulative cardiovascular strain across your day and night.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function SmartDevicesPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* ══════════════════════════════════════════
          HERO — full-bleed dark blue gradient
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-screen flex flex-col"
        style={{
          backgroundImage:
            "url(/images/dot-matrix.svg), linear-gradient(180deg, #4764ff 0%, #141933 70%, #1a2347 100%)",
          backgroundPosition: "50% 50%, 0 0",
          backgroundRepeat: "repeat, no-repeat",
          backgroundSize: "auto, cover",
          backgroundAttachment: "fixed, scroll",
        }}
      >
        {/* Minimal nav bar */}
        <header className="flex items-center justify-between px-[5em] pt-[2em] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <Logo />

        </header>

        {/* Hero content */}
        <div className="flex-1 w-full flex flex-col items-center justify-center px-[5em] py-[6em] text-center max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="flex flex-col items-center gap-[28px] max-w-[700px]">
            <Pill>Limited Pre-Orders Open</Pill>

            <h1
              className="text-[5.5rem] font-medium leading-[1] tracking-[-0.05em] text-white max-[991px]:text-[3.5rem] max-[479px]:text-[2.75rem]"
            >
              The band that
              <br />
              <span style={{ color: "#c9d2ff" }}>knows your body.</span>
            </h1>

            {/* Band video */}
            <div className="w-full max-w-[480px] max-[479px]:max-w-full rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              <video
                src="/videos/xheal-band.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block"
              />
            </div>

            {/* Value proposition */}
            <p className="text-[1rem] font-medium" style={{ color: "rgba(201,210,255,0.9)" }}>
              $199 one-time. xHeal app subscription included free, forever.
            </p>

            {/* CTA button */}
            <a
              href="#pre-order"
              className="rounded-[16px] px-[44px] py-[18px] text-[1.125rem] font-medium tracking-[-0.01em] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "#ffffff", color: "#4764ff" }}
            >
              Reserve Yours
            </a>

            <span className="text-[0.9rem] text-white/60">
              No payment required now &middot; Ships Summer 2026
            </span>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="w-full flex justify-center pb-[40px]">
          <div className="flex flex-col items-center gap-[8px] text-white/30">
            <span className="text-[0.75rem] tracking-[0.1em] uppercase">scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path
                d="M8 2v20M2 16l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <section className="w-full bg-xwhite py-[7em] max-[991px]:py-[4em]">
        <div className="w-full max-w-[100em] mx-auto px-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="flex flex-col gap-[16px] mb-[60px] max-w-[56ch]">
            <h2
              className="text-[3.5rem] font-medium leading-[1.05] tracking-[-0.04em] text-xblack max-[991px]:text-[2.5rem]"
            >
              Built for people who
              <br />
              <span className="text-xdark-blue">want answers, not noise.</span>
            </h2>
            <p className="text-[1.125rem] text-xblack leading-[1.5]">
              Every sensor on the xHeal Band was chosen because it directly feeds
              the pattern-detection engine inside the xHeal app.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-[24px] max-[991px]:grid-cols-2 max-[767px]:grid-cols-1">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-[20px] border border-xlight-blue-low bg-white p-[28px] flex flex-col gap-[16px] shadow-[0_4px_4px_#1419330d] hover:shadow-[0_12px_24px_#1419331a] hover:-translate-y-[4px] transition-all duration-200"
              >
                <span
                  className="font-icons text-xdark-blue"
                  style={{ fontSize: "28px" }}
                  aria-hidden
                >
                  {f.icon}
                </span>
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-[1.125rem] font-medium text-xblack tracking-[-0.01em]">
                    {f.title}
                  </h3>
                  <p className="text-[1rem] text-xblack leading-[1.6]" style={{ opacity: 0.65 }}>
                    {f.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT FITS IN
      ══════════════════════════════════════════ */}
      <section
        className="w-full py-[7em] max-[991px]:py-[4em]"
        style={{
          backgroundImage: "url(/images/dot-matrix.svg), linear-gradient(180deg, #1a2347 0%, #1e2a5e 50%, #1a2347 100%)",
          backgroundPosition: "50% 50%, 0 0",
          backgroundRepeat: "repeat, no-repeat",
          backgroundSize: "auto, cover",
          backgroundAttachment: "fixed, scroll",
        }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="grid grid-cols-[1fr_1fr] gap-[80px] items-center max-[767px]:grid-cols-1 max-[767px]:gap-[40px]">
            {/* Left */}
            <div className="flex flex-col gap-[28px]">
              <h2
                className="text-[3.5rem] font-medium leading-[1.05] tracking-[-0.04em] text-white max-[991px]:text-[2.5rem]"
              >
                One platform.
                <br />
                <span style={{ color: "#c9d2ff" }}>Complete picture.</span>
              </h2>
              <p className="text-[1.125rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.8)" }}>
                The xHeal app already connects your lab results, medical records,
                and Apple Health data. The xHeal Band fills in the gaps that other
                wearables leave, routing everything into a single intelligent
                view of your health.
              </p>

              <div className="flex flex-col gap-[20px]">
                {[
                  {
                    step: "01",
                    text: "Band streams biometrics to xHeal in real time.",
                  },
                  {
                    step: "02",
                    text: "Your Digital Twin cross-references band data with labs, records, and habits.",
                  },
                  {
                    step: "03",
                    text: "Patterns surface that no single source could reveal on its own.",
                  },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-[20px]">
                    <span
                      className="text-[0.8rem] font-medium tracking-[0.1em] pt-[3px] min-w-[24px]" style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {step}
                    </span>
                    <p className="text-[1.0625rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.8)" }}>
                       {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual mockup card */}
            <div className="flex justify-center">
              <div
                className="rounded-[24px] p-[40px] flex flex-col gap-[24px] w-full max-w-[420px]"
                style={{
                  background:
                    "linear-gradient(145deg, #4764ff 0%, #141933 100%)",
                }}
              >
                {/* Mini data cards */}
                {[
                  { label: "HRV", value: "67 ms", delta: "+12% vs baseline", good: true },
                  { label: "Recovery Score", value: "84 / 100", delta: "Above your average", good: true },
                  { label: "Sleep Efficiency", value: "91%", delta: "Deep sleep ↑ 18 min", good: true },
                  { label: "Skin Temp Shift", value: "+0.4°C", delta: "Flagged for review", good: false },
                ].map(({ label, value, delta, good }) => (
                    <div
                      key={label}
                      className="rounded-[16px] px-[20px] py-[16px] flex items-center justify-between gap-[12px]"
                      style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                    >
                      <div>
                        <p style={{ fontSize: "11px", color: "#ffffff", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                          {label}
                        </p>
                        <p style={{ fontSize: "22px", fontWeight: 500, color: "#ffffff" }}>
                          {value}
                        </p>
                      </div>
                    <span
                      className="text-[0.8rem] px-[10px] py-[4px] rounded-full"
                      style={{
                        backgroundColor: good
                          ? "rgba(100,220,140,0.18)"
                          : "rgba(255,140,80,0.18)",
                        color: good ? "#7aeaa0" : "#ffb07a",
                      }}
                    >
                      {delta}
                    </span>
                  </div>
                ))}

                {/* AI Insight card */}
                <div
                  className="rounded-[16px] px-[20px] py-[18px] flex flex-col gap-[10px]"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <div className="flex items-center gap-[8px]">
                    <span
                      className="text-[0.65rem] font-medium uppercase tracking-[0.12em] px-[8px] py-[3px] rounded-full"
                      style={{ backgroundColor: "rgba(199,160,255,0.2)", color: "#c7a0ff" }}
                    >
                      AI Insight
                    </span>
                    <span className="text-[0.7rem]" style={{ color: "rgba(255,255,255,0.35)" }}>89% confidence</span>
                  </div>
                  <p className="text-[0.9rem] leading-[1.55]" style={{ color: "rgba(255,255,255,0.85)" }}>
                    Your last flare-up of stiff neck may be linked to inconsistent sleep in the 3 days prior.
                  </p>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRE-ORDER FORM
      ══════════════════════════════════════════ */}
      <section
        id="pre-order"
        className="w-full py-[8em] max-[991px]:py-[5em]"
        style={{
          backgroundImage:
            "url(/images/dot-matrix.svg), linear-gradient(180deg, #1a2347 0%, #141933 30%, #4764ff 100%)",
          backgroundPosition: "50% 50%, 0 0",
          backgroundRepeat: "repeat, no-repeat",
          backgroundSize: "auto, cover",
          backgroundAttachment: "fixed, scroll",
        }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="grid grid-cols-[1.1fr_1fr] gap-[80px] items-start max-[767px]:grid-cols-1 max-[767px]:gap-[48px]">
            {/* Left — copy */}
            <div className="flex flex-col gap-[28px]">
              <Pill>Founding member spots open</Pill>
              <h2
                className="text-[3.5rem] font-medium leading-[1.05] tracking-[-0.04em] text-white max-[991px]:text-[2.5rem]"
              >
                Your health data,
                <br />
                finally working
                <br />
                <span style={{ color: "#c9d2ff" }}>for you.</span>
              </h2>
              <p className="text-[1.125rem] leading-[1.6] max-w-[44ch]" style={{ color: "#ffffff" }}>
                Reserve your xHeal Band now at no cost. No payment until your band ships. Founding members lock in their rate and ship first.
              </p>
              <p className="text-[1rem] font-medium" style={{ color: "rgba(201,210,255,0.9)" }}>
                $199 one-time. xHeal app subscription included free, forever.
              </p>

              {/* Trust bullets */}
              <div className="flex flex-col gap-[14px] mt-[8px]">
                {[
                  "No charge until shipping",
                  "Cancel before it ships",
                  "Founding rate locked in",
                  "Priority fulfilment guaranteed",
                  "Free app subscription, forever",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-[12px]">
                    <div
                      className="w-[20px] h-[20px] rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2.5 2.5 3.5-4"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[1rem] text-white/85">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form card */}
            <div
              className="rounded-[24px] p-[40px] max-[479px]:p-[24px]"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div className="flex flex-col gap-[24px] mb-[32px]">
                <h3 className="text-[1.75rem] font-medium text-white tracking-[-0.03em]">
                  Claim your spot
                </h3>
                <p className="text-[1rem] leading-[1.5]" style={{ color: "#ffffff" }}>
                  Enter your details. We hold your place and contact you before any payment is taken.
                </p>
                <p className="text-[0.875rem] font-medium" style={{ color: "rgba(201,210,255,0.8)" }}>
                  $199 one-time &middot; xHeal app subscription included free, forever
                </p>
              </div>
              <PreOrderForm />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MINIMAL FOOTER
      ══════════════════════════════════════════ */}
      <footer
        className="w-full py-[32px] border-t"
        style={{ borderColor: "rgba(71,100,255,0.12)" }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] flex items-center justify-between flex-wrap gap-[20px] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <Logo />
          <div className="flex items-center gap-[32px] flex-wrap">
            <a
              href="/privacy-policy"
              className="text-[0.875rem] text-xblack-70 hover:text-xblack transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-conditions"
              className="text-[0.875rem] text-xblack-70 hover:text-xblack transition-colors"
            >
              Terms &amp; Conditions
            </a>
            <span className="text-[0.875rem] text-xblack-70">
              © {new Date().getFullYear()} xHeal Corp.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
