"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ComplianceBadges from "@/components/ui/ComplianceBadges";

export default function Footer() {
  return (
    <>
      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <footer className="bg-xdark-blue text-xwhite">
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="flex flex-col gap-[40px]">
            {/* Main row — Logo left, Socials right */}
            <div className="flex justify-between items-start gap-[60px] max-[767px]:flex-col max-[767px]:gap-[40px]">
              {/* Left — Logo + Copyright + Compliance */}
              <div className="flex flex-col gap-[24px]">
                <Link href="/">
                  <Image
                    src="/images/logo.svg"
                    alt="xHeal logo"
                    width={248}
                    height={40}
                    className="w-[15.5em]"
                  />
                </Link>
                <span className="text-[1rem] opacity-60">
                  &copy; {new Date().getFullYear()} xHeal Corp. All rights reserved.
                </span>
                <ComplianceBadges size="sm" />
              </div>

              {/* Right — Social Links */}
              <div className="flex flex-col gap-[16px] max-[767px]:items-start">
                <span className="text-[1.125rem] opacity-70">
                  This is where you can find us
                </span>
                <div className="flex items-center gap-[20px]">
                  <a
                    href="https://instagram.com/xheal.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="opacity-70 transition-opacity duration-200 hover:opacity-100"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61579136920687"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="opacity-70 transition-opacity duration-200 hover:opacity-100"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.93 3.78-3.93 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7A10 10 0 0 0 22 12.06c0-5.53-4.5-10.02-10-10.02Z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/xheal-ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="opacity-70 transition-opacity duration-200 hover:opacity-100"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@xheal-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="opacity-70 transition-opacity duration-200 hover:opacity-100"
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42A2.51 2.51 0 0 0 2.42 7.19 26.38 26.38 0 0 0 2 12a26.38 26.38 0 0 0 .42 4.81 2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77A26.38 26.38 0 0 0 22 12a26.38 26.38 0 0 0-.42-4.81ZM10 15.5v-7l5.2 3.5L10 15.5Z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.reddit.com/r/xHeal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Reddit"
                    className="opacity-70 transition-opacity duration-200 hover:opacity-100"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm5.8 11.33c.02.16.03.33.03.5 0 2.55-2.97 4.62-6.63 4.62s-6.63-2.07-6.63-4.62c0-.17.01-.34.03-.5a1.38 1.38 0 0 1-.53-1.09 1.4 1.4 0 0 1 2.39-.98c1.16-.83 2.73-1.36 4.48-1.42l.84-3.96a.3.3 0 0 1 .36-.24l2.82.6a1 1 0 1 1-.11.52l-2.53-.54-.75 3.54c1.73.07 3.27.6 4.41 1.42a1.4 1.4 0 0 1 2.39.98c0 .43-.2.82-.53 1.08ZM9.5 13a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm-4.74 3.42c-.1-.1-.1-.26 0-.36a.26.26 0 0 1 .36 0c.6.6 1.49.81 1.88.81s1.28-.21 1.88-.81a.26.26 0 0 1 .36 0c.1.1.1.26 0 .36-.72.72-1.73.96-2.24.96s-1.52-.24-2.24-.96Z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@xheal.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="opacity-70 transition-opacity duration-200 hover:opacity-100"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.13 2.56 5.52 5.6 5.52 3.3 0 5.78-2.59 5.78-5.52V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linktr.ee/xheal.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Linktree"
                    className="opacity-70 transition-opacity duration-200 hover:opacity-100"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="m13.736 5.853 4.063-4.197 2.105 2.058-4.186 4.063h6.039v2.895h-6.073l4.22 4.129-2.105 2.058L12 11.12l-5.799 5.739-2.105-2.058 4.22-4.129H2.243V7.777h6.039L4.096 3.714l2.105-2.058 4.063 4.197V0h2.898v5.853ZM10.867 16.8h2.898v7.2h-2.898z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom row - legal links */}
            <div className="flex flex-wrap items-center gap-[40px] border-t border-white/10 pt-[32px] max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-[20px]">
              <Link
                href="/terms-conditions"
                className="text-[1rem] opacity-60 transition-all duration-200 hover:underline hover:opacity-100"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="text-[1rem] opacity-60 transition-all duration-200 hover:underline hover:opacity-100"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie-policy"
                className="text-[1rem] opacity-60 transition-all duration-200 hover:underline hover:opacity-100"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function NewsletterSection() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const topics = [
    {
      id: "chronic",
      label: "Living with a chronic condition",
      description: "Flare-up prevention, trigger patterns, energy management",
    },
    {
      id: "optimize",
      label: "Optimizing health & performance",
      description: "Sleep, nutrition, activity, and how they connect",
    },
    {
      id: "understand",
      label: "Understanding my body better",
      description: "Lab results explained, health scores, what to ask your care team",
    },
  ];

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handleSubmitTopics = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="sign-up" className="bg-gradient-to-b from-transparent to-xdark-blue">
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="grid grid-cols-[1.2fr_1fr] gap-[80px] max-[991px]:gap-[40px] max-[767px]:grid-cols-1">
            <div>
              <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack max-[991px]:text-[3rem]">
                Welcome to xHeal!
              </h2>
            <p className="text-[1.375rem] text-xblack-70 max-w-[42ch]">
              One email per week with patterns, insights, and strategies that
              help you understand your body better, whether you&apos;re
              managing a condition, optimizing your wellness, or just paying
              closer attention.
            </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sign-up" className="bg-gradient-to-b from-transparent to-xdark-blue">
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <div className="grid grid-cols-[1.2fr_1fr] gap-[80px] items-stretch max-[991px]:gap-[40px] max-[767px]:grid-cols-1">
          {/* Left Column — Heading + Description */}
          <div className="flex flex-col justify-between">
            <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack max-[991px]:text-[3rem]">
              Get smarter about your health.{" "}
              <span className="text-xdark-blue">Every week.</span>
            </h2>
            <p className="text-[1.125rem] text-xblack-70 mt-[20px] max-w-[42ch]">
              One email per week with patterns, insights, and strategies that
              help you understand your body better, whether you&apos;re
              managing a condition, optimizing your wellness, or just paying
              closer attention.
            </p>
          </div>

          {/* Right Column — Form */}
          <div>
            {step === 1 ? (
              <form
                onSubmit={handleSubmitEmail}
                className="flex flex-col gap-[24px] w-full"
              >
                <div className="grid grid-cols-2 gap-[40px] max-[479px]:grid-cols-1">
                  <div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name*"
                      required
                      className="border-b border-b-xdark-blue bg-transparent text-xblack text-[1.25rem] h-[3em] px-0 py-0 outline-none placeholder:text-xblack-70 w-full"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name*"
                      required
                      className="border-b border-b-xdark-blue bg-transparent text-xblack text-[1.25rem] h-[3em] px-0 py-0 outline-none placeholder:text-xblack-70 w-full"
                    />
                  </div>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email*"
                  required
                  className="border-b border-b-xdark-blue bg-transparent text-xblack text-[1.25rem] h-[3em] px-0 py-0 outline-none placeholder:text-xblack-70 w-full"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-xdark-blue text-xwhite text-[1.125rem] text-center rounded-full px-[48px] py-[14px] transition-all duration-200 hover:opacity-70 active:opacity-50 active:scale-[0.97]"
                  >
                    Submit
                  </button>
                </div>
                <p className="text-[0.9rem] text-xblack-70">
                  By subscribing, I agree to the{" "}
                  <Link
                    href="/terms-conditions"
                    className="text-xblack underline hover:text-xdark-blue"
                  >
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-xblack underline hover:text-xdark-blue"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and to receive the newsletter.
                </p>
              </form>
            ) : (
              <form
                onSubmit={handleSubmitTopics}
                className="flex flex-col gap-[20px] w-full"
              >
                <p className="text-xblack font-medium text-[1.25rem]">
                  What matters most to you?
                </p>
                {topics.map((topic) => (
                  <label
                    key={topic.id}
                    className="flex flex-col gap-[8px] border-b border-b-xdark-blue pt-[16px] pb-[16px] cursor-pointer text-[1.125rem] leading-[1.3]"
                  >
                    <div className="flex items-center gap-[12px]">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic.id)}
                        onChange={() => toggleTopic(topic.id)}
                        className="w-[20px] h-[20px] border border-xdark-blue rounded-[4px] accent-xdark-blue flex-shrink-0"
                      />
                      <span className="text-xblack font-medium">{topic.label}</span>
                    </div>
                    <p className="text-[0.9rem] text-xblack-70 ml-[32px]">
                      {topic.description}
                    </p>
                  </label>
                ))}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-xdark-blue text-xwhite text-[1.125rem] text-center rounded-full px-[48px] py-[14px] transition-all duration-200 hover:opacity-70 active:opacity-50 active:scale-[0.97]"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
