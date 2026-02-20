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
            {/* Logo + App Store */}
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
                  className="w-[200px]"
                />
              </a>
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
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const topics = [
    {
      id: "wellness",
      label: "Everyday wellness & balance",
      description: "Better sleep, less stress, simple healthy habits",
    },
    {
      id: "active",
      label: "Active & training focused",
      description: "Workouts, sports, performance, physically demanding work",
    },
    {
      id: "reset",
      label: "Reset & rebuild",
      description: "Low energy, burnout, flare-ups, starting again",
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
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px] flex flex-col items-center">
          <div className="border border-xlight-blue text-xblack bg-transparent rounded-[12px] mx-auto px-[40px] py-[60px] text-center max-w-[600px]">
            <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack mb-[20px] max-[991px]:text-[3rem]">
              Welcome to xHeal!
            </h2>
            <p className="text-[1.125rem] text-xblack-70">
              Watch your inbox for your first health update soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sign-up" className="bg-gradient-to-b from-transparent to-xdark-blue">
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] max-[991px]:px-[40px] max-[479px]:px-[20px] flex flex-col items-center gap-[40px]">
        <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack text-center max-[991px]:text-[3rem]">
          Stay Informed. Stay Well.
        </h2>
        <p className="text-[1.125rem] text-xblack-70 text-center max-w-[51ch]">
          Discover stories, expert advice, and strategies that help real people
          live better with chronic conditions.
        </p>

        {step === 1 ? (
          <form
            onSubmit={handleSubmitEmail}
            className="flex flex-col gap-[20px] w-full max-w-[500px]"
          >
            <p className="text-xdark-blue font-medium text-[1rem]">Step 1</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="border-b border-b-xdark-blue bg-transparent text-xblack text-[1.25rem] h-[3em] px-0 py-0 outline-none placeholder:text-xblack-70"
            />
            <p className="text-[0.9rem] text-xblack-70">
              By subscribing, I agree to the{" "}
              <Link
                href="/terms-conditions"
                className="text-xlight-blue hover:underline"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-xlight-blue hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              and to receive the newsletter.
            </p>
            <button
              type="submit"
              className="bg-xdark-blue text-xwhite text-[1.125rem] text-center rounded-[12px] px-[24px] py-[10px] transition-all duration-200 hover:shadow-[0_4px_4px_0_var(--light-blue-low)] self-start"
            >
              Next
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitTopics}
            className="flex flex-col gap-[20px] w-full max-w-[500px]"
          >
            <p className="text-xdark-blue font-medium text-[1rem]">Step 2</p>
            <p className="text-xblack font-medium text-[1.25rem]">
              What do you want to read about most?
            </p>
            {topics.map((topic) => (
              <label
                key={topic.id}
                className="flex flex-col gap-[10px] border-b border-b-xdark-blue pt-[20px] pb-[20px] pl-[20px] cursor-pointer text-[1.25rem] leading-[1]"
              >
                <div className="flex items-center gap-[20px]">
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic.id)}
                    onChange={() => toggleTopic(topic.id)}
                    className="w-[22px] h-[22px] border border-xdark-blue rounded-[4px] accent-xdark-blue"
                  />
                  <span className="text-xblack font-medium">{topic.label}</span>
                </div>
                <p className="text-[1rem] text-xblack-70 ml-[42px]">
                  {topic.description}
                </p>
              </label>
            ))}
            <button
              type="submit"
              className="bg-xdark-blue text-xwhite text-[1.125rem] text-center rounded-[12px] px-[24px] py-[10px] transition-all duration-200 hover:shadow-[0_4px_4px_0_var(--light-blue-low)] self-start"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
