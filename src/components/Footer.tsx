"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <footer className="bg-xdark-blue text-xwhite">
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] grid-rows-[auto_auto] gap-[80px] max-[991px]:grid-cols-[1fr_auto_auto] max-[767px]:grid-cols-1 max-[767px]:gap-[40px]">
            {/* Logo */}
            <div className="flex flex-col gap-[40px]">
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  alt="xHeal logo"
                  width={248}
                  height={40}
                  className="w-[15.5em]"
                />
              </Link>
            </div>

            {/* Nav Links */}
            <Link
              href="/#what-you-get"
              className="text-[1.25rem] transition-all duration-200 hover:underline"
            >
              How it works
            </Link>
            <Link
              href="/support"
              className="text-[1.25rem] transition-all duration-200 hover:underline"
            >
              Support
            </Link>

            {/* Bottom row - copyright + legal */}
            <div className="col-span-full flex flex-wrap items-center gap-[40px] max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-[20px]">
              <span className="text-[1rem] opacity-60">
                &copy; {new Date().getFullYear()} xHeal. All rights reserved.
              </span>
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
      description: "Lab results explained, health scores, what to ask your doctor",
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
              <p className="text-[1.125rem] text-xblack-70 mt-[20px] max-w-[42ch]">
                Watch your inbox for your first health update soon.
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
        <div className="grid grid-cols-[1.2fr_1fr] gap-[80px] max-[991px]:gap-[40px] max-[767px]:grid-cols-1">
          {/* Left Column — Heading + Description + App Store */}
          <div className="flex flex-col justify-between gap-[40px]">
            <div>
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
                    className="bg-xlight-blue text-xwhite text-[1.125rem] text-center rounded-full px-[48px] py-[14px] transition-all duration-200 hover:shadow-[0_4px_12px_0_var(--light-blue-low)]"
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
                    className="bg-xlight-blue text-xwhite text-[1.125rem] text-center rounded-full px-[48px] py-[14px] transition-all duration-200 hover:shadow-[0_4px_12px_0_var(--light-blue-low)]"
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
