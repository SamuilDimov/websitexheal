"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ComplianceBadges from "@/components/ui/ComplianceBadges";
import ApplauseLabBadge from "@/components/ui/ApplauseLabBadge";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <>
      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <footer className="bg-xbg border-t border-xborder text-xprimary">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-12 max-[991px]:px-8 max-[479px]:px-5">
          <div className="flex flex-col gap-10">
            {/* Main row — Logo left, Socials right */}
            <div className="flex justify-between items-start gap-[60px] max-[767px]:flex-col max-[767px]:gap-[40px]">
              {/* Left — Logo + Copyright + Compliance */}
              <div className="flex flex-col gap-6">
                <Link href="/">
                  <Image
                    src="/images/logo.svg"
                    alt="xHeal logo"
                    width={140}
                    height={32}
                    className="h-[28px] w-auto"
                  />
                </Link>
                <span className="t-body3 text-xtertiary">
                  {t("copyright", { year: new Date().getFullYear() })}
                </span>
                <ComplianceBadges size="sm" />
              </div>

              {/* Right — Social Links */}
              <div className="flex flex-col gap-4 max-[767px]:items-start">
                <span className="t-overline text-xtertiary">
                  {t("findUs")}
                </span>
                <div className="flex items-center gap-5 text-xsecondary">
                  <a
                    href="https://instagram.com/xheal.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-xprimary transition-colors duration-200"
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
                    className="hover:text-xprimary transition-colors duration-200"
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
                    className="hover:text-xprimary transition-colors duration-200"
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
                    className="hover:text-xprimary transition-colors duration-200"
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
                    className="hover:text-xprimary transition-colors duration-200"
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
                    className="hover:text-xprimary transition-colors duration-200"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.13 2.56 5.52 5.6 5.52 3.3 0 5.78-2.59 5.78-5.52V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z"/>
                    </svg>
                  </a>
                  <a
                    href="https://discord.gg/xqBzFraE"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord"
                    className="hover:text-xprimary transition-colors duration-200"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linktr.ee/xheal.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Linktree"
                    className="hover:text-xprimary transition-colors duration-200"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="m13.736 5.853 4.063-4.197 2.105 2.058-4.186 4.063h6.039v2.895h-6.073l4.22 4.129-2.105 2.058L12 11.12l-5.799 5.739-2.105-2.058 4.22-4.129H2.243V7.777h6.039L4.096 3.714l2.105-2.058 4.063 4.197V0h2.898v5.853ZM10.867 16.8h2.898v7.2h-2.898z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom row - legal links */}
            <div className="flex flex-wrap items-center gap-10 border-t border-xborder pt-8 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-5">
              <Link
                href="/guides"
                className="t-body3 text-xtertiary transition-colors duration-200 hover:text-xprimary"
              >
                {t("guides")}
              </Link>
              <Link
                href="/terms-conditions"
                className="t-body3 text-xtertiary transition-colors duration-200 hover:text-xprimary"
              >
                {t("termsConditions")}
              </Link>
              <Link
                href="/privacy-policy"
                className="t-body3 text-xtertiary transition-colors duration-200 hover:text-xprimary"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/cookie-policy"
                className="t-body3 text-xtertiary transition-colors duration-200 hover:text-xprimary"
              >
                {t("cookiePolicy")}
              </Link>
              <ApplauseLabBadge className="ml-auto max-[767px]:ml-0" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function NewsletterSection() {
  const t = useTranslations("Newsletter");
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const topics = [
    {
      id: "chronic",
      label: t("topicChronic"),
      description: t("topicChronicDesc"),
    },
    {
      id: "optimize",
      label: t("topicOptimize"),
      description: t("topicOptimizeDesc"),
    },
    {
      id: "understand",
      label: t("topicUnderstand"),
      description: t("topicUnderstandDesc"),
    },
  ];

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((topic) => topic !== id) : [...prev, id]
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
      <section id="sign-up" className="bg-xbg">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-24 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
          <div className="cta-surface p-16 max-[767px]:p-8">
            <div className="grid grid-cols-[1.2fr_1fr] gap-[60px] max-[991px]:gap-10 max-[767px]:grid-cols-1">
              <div>
                <h2 className="t-display2 text-xprimary">{t("successHeading")}</h2>
                <p className="t-body1 text-xsecondary mt-5 max-w-[42ch]">
                  {t("description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sign-up" className="bg-xbg">
      <div className="w-full max-w-[1440px] mx-auto px-10 py-24 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
        <div className="cta-surface p-16 max-[767px]:p-8">
          <div className="grid grid-cols-[1.2fr_1fr] gap-[60px] items-stretch max-[991px]:gap-10 max-[767px]:grid-cols-1">
            {/* Left Column — Heading + Description */}
            <div className="flex flex-col justify-between gap-6">
              <h2 className="t-display2 text-xprimary">
                {t("heading")} <span className="text-xbrand">{t("headingAccent")}</span>
              </h2>
              <p className="t-body1 text-xsecondary max-w-[42ch]">
                {t("description")}
              </p>
            </div>

            {/* Right Column — Form */}
            <div>
              {step === 1 ? (
                <form
                  onSubmit={handleSubmitEmail}
                  className="flex flex-col gap-5 w-full"
                >
                  <div className="grid grid-cols-2 gap-4 max-[479px]:grid-cols-1">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={t("firstNamePlaceholder")}
                      required
                      className="bg-xbg border border-xborder hover:border-xborder-medium focus:border-xbrand outline-none text-xprimary placeholder:text-xtertiary h-[48px] px-4 rounded-[12px] t-body2 transition-colors"
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={t("lastNamePlaceholder")}
                      required
                      className="bg-xbg border border-xborder hover:border-xborder-medium focus:border-xbrand outline-none text-xprimary placeholder:text-xtertiary h-[48px] px-4 rounded-[12px] t-body2 transition-colors"
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    required
                    className="bg-xbg border border-xborder hover:border-xborder-medium focus:border-xbrand outline-none text-xprimary placeholder:text-xtertiary h-[48px] px-4 rounded-[12px] t-body2 transition-colors"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-xbrand text-white t-button h-[48px] px-8 rounded-[12px] transition-all duration-200 hover:bg-[#5a73ff] hover:shadow-[0_8px_24px_rgba(71,100,255,0.4)] active:scale-[0.97]"
                    >
                      {t("submit")}
                    </button>
                  </div>
                  <p className="t-body3 text-xtertiary">
                    {t.rich("consent", {
                      terms: (chunks) => (
                        <Link
                          href="/terms-conditions"
                          className="text-xprimary underline hover:text-xbrand"
                        >
                          {chunks}
                        </Link>
                      ),
                      privacy: (chunks) => (
                        <Link
                          href="/privacy-policy"
                          className="text-xprimary underline hover:text-xbrand"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>
                </form>
              ) : (
                <form
                  onSubmit={handleSubmitTopics}
                  className="flex flex-col gap-4 w-full"
                >
                  <p className="t-h5 text-xprimary">
                    {t("topicsHeading")}
                  </p>
                  {topics.map((topic) => (
                    <label
                      key={topic.id}
                      className="surface-card-feature p-4 cursor-pointer flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(topic.id)}
                          onChange={() => toggleTopic(topic.id)}
                          className="w-[20px] h-[20px] rounded-[4px] accent-xbrand flex-shrink-0"
                        />
                        <span className="text-xprimary t-h6">{topic.label}</span>
                      </div>
                      <p className="t-body3 text-xtertiary ml-8">
                        {topic.description}
                      </p>
                    </label>
                  ))}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-xbrand text-white t-button h-[48px] px-8 rounded-[12px] transition-all duration-200 hover:bg-[#5a73ff] active:scale-[0.97]"
                    >
                      {t("subscribe")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
