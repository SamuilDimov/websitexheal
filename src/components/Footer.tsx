"use client";

import { useState } from "react";
import Image from "next/image";
import DeviceCanvas from "@/components/ui/DeviceCanvas";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { isProfessionalPath } from "@/components/ui/AudienceSwitch";
import { APP_STORE_URL } from "@/lib/site";
import Icon from "@/components/ui/Icon";

/**
 * Closing chapter and footer (redesign phase 2).
 *
 * The page ends on the download, not on a form. A dark closing section carries
 * the App Store call to action with a QR code for desktop visitors, then the
 * footer holds the sitemap, a one-field newsletter, socials, the compliance
 * disclaimer and the wordmark.
 *
 * The professional view ends on its own ask instead — the page renders
 * `ProClosing` (early access) as its last section, so the App Store closing
 * is dropped there rather than asking a clinic to download a consumer app.
 * The sitemap footer below it is the same on both views.
 */
export default function Footer() {
  const isPro = isProfessionalPath(usePathname());

  return (
    <div data-surface="dark" className="relative z-[1] bg-xbg text-xprimary">
      {isPro ? null : <ClosingSection />}
      <SiteFooter />
    </div>
  );
}

function ClosingSection() {
  const t = useTranslations("Closing");

  return (
    <section aria-labelledby="closing-heading" className="relative overflow-hidden">
      <div className="x-container x-section">
        <div className="grid items-center gap-12 md:grid-cols-[7fr_5fr] md:gap-16">
          <div className="flex flex-col items-start gap-6">
            <h2 id="closing-heading" className="t-display2 text-xprimary max-w-[16ch]">
              {t("heading")}
            </h2>
            <p className="t-lead text-xsecondary max-w-[44ch]">{t("body")}</p>
            <div className="mt-2 flex flex-wrap items-center gap-6">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="x-store-badge"
              >
                <Image
                  src="/images/app-store-badge.svg"
                  alt={t("downloadOnAppStore")}
                  width={168}
                  height={56}
                />
              </a>
              <div className="hidden items-center gap-3 md:flex">
                <Image
                  src="/images/qr-code.avif"
                  alt={t("qrAlt")}
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] rounded-[12px] border x-hairline bg-white p-1.5"
                />
                <span className="t-data text-xtertiary max-w-[14ch]">{t("qrHint")}</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[380px] justify-center md:max-w-none md:justify-end">
            <DeviceCanvas
              screen="/images/screens-hero.webp"
              poster="/images/closing-phone.webp"
              entrance="settle"
              className="w-[62%] max-w-[260px] md:w-full md:max-w-[300px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const t = useTranslations("Footer");

  const columns = [
    {
      heading: t("colProduct"),
      links: [
        { href: "/flare-up-trigger-patterns", label: t("linkFlareUps") },
        { href: "/chat-with-your-health", label: t("linkChat") },
        { href: "/health-awareness", label: t("linkScore") },
        { href: "/health-timeline", label: t("linkTimeline") },
        { href: "/specialist-ready-reports", label: t("linkReports") },
        { href: "/log-life-events", label: t("linkLog") },
      ],
    },
    {
      heading: t("colPlans"),
      links: [
        { href: "/workouts", label: t("linkWorkouts") },
        { href: "/nutrition", label: t("linkNutrition") },
        { href: "/mindfulness", label: t("linkMindfulness") },
        { href: "/guides", label: t("guides") },
      ],
    },
    {
      heading: t("colCompany"),
      links: [
        { href: "/professionals", label: t("linkProfessionals") },
        { href: "/about", label: t("linkAbout") },
        { href: "/blog", label: t("linkBlog") },
        { href: "/support", label: t("linkSupport") },
      ],
    },
    {
      heading: t("colLegal"),
      links: [
        { href: "/terms-conditions", label: t("termsConditions") },
        { href: "/privacy-policy", label: t("privacyPolicy") },
        { href: "/cookie-policy", label: t("cookiePolicy") },
      ],
    },
  ] as const;

  return (
    <footer className="border-t x-hairline">
      <div className="x-container flex flex-col gap-14 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.4fr)] md:gap-8">
          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-4">
              <span className="t-eyebrow text-xtertiary">{column.heading}</span>
              <ul role="list" className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="t-body3 text-xsecondary transition-colors duration-200 hover:text-xprimary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <NewsletterField />
        </div>

        <div className="flex flex-col gap-8 border-t x-hairline pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <p className="t-body3 text-xtertiary max-w-[68ch]">{t("disclaimer")}</p>
            <SocialLinks />
          </div>
          <div className="flex flex-col gap-2 text-xtertiary md:flex-row md:items-center md:justify-between">
            <span className="t-data">{t("copyright", { year: new Date().getFullYear() })}</span>
            <span className="t-data">{t("compliance")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterField() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div id="sign-up" className="flex flex-col gap-4">
      {submitted ? (
        <p className="t-body3 text-xsecondary">{t("successHeading")}</p>
      ) : (
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (email) setSubmitted(true);
          }}
        >
          <label className="sr-only" htmlFor="footer-email">
            {t("emailPlaceholder")}
          </label>
          <div className="flex items-center gap-2 rounded-full border x-hairline bg-xbg-2 p-1 pl-4 focus-within:border-xbrand transition-colors">
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("emailPlaceholder")}
              required
              className="min-w-0 flex-1 bg-transparent text-[15px] text-xprimary outline-none placeholder:text-xtertiary"
            />
            <button
              type="submit"
              aria-label={t("subscribe")}
              className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-xbrand text-white transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_88%,#000)]"
            >
              <Icon name="arrow_forward" size={16} />
            </button>
          </div>
          <p className="t-caption text-xtertiary">{t("shortDescription")}</p>
        </form>
      )}
    </div>
  );
}

function SocialLinks() {
  const socials = [
    { label: "Instagram", href: "https://instagram.com/xheal.ai", d: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61579136920687", d: "M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.93 3.78-3.93 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7A10 10 0 0 0 22 12.06c0-5.53-4.5-10.02-10-10.02Z" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/xheal-ai/", d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" },
    { label: "YouTube", href: "https://www.youtube.com/@xheal-ai", d: "M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42A2.51 2.51 0 0 0 2.42 7.19 26.38 26.38 0 0 0 2 12a26.38 26.38 0 0 0 .42 4.81 2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77A26.38 26.38 0 0 0 22 12a26.38 26.38 0 0 0-.42-4.81ZM10 15.5v-7l5.2 3.5L10 15.5Z" },
    { label: "Reddit", href: "https://www.reddit.com/r/xHeal/", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm5.8 11.33c.02.16.03.33.03.5 0 2.55-2.97 4.62-6.63 4.62s-6.63-2.07-6.63-4.62c0-.17.01-.34.03-.5a1.38 1.38 0 0 1-.53-1.09 1.4 1.4 0 0 1 2.39-.98c1.16-.83 2.73-1.36 4.48-1.42l.84-3.96a.3.3 0 0 1 .36-.24l2.82.6a1 1 0 1 1-.11.52l-2.53-.54-.75 3.54c1.73.07 3.27.6 4.41 1.42a1.4 1.4 0 0 1 2.39.98c0 .43-.2.82-.53 1.08ZM9.5 13a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm-4.74 3.42c-.1-.1-.1-.26 0-.36a.26.26 0 0 1 .36 0c.6.6 1.49.81 1.88.81s1.28-.21 1.88-.81a.26.26 0 0 1 .36 0c.1.1.1.26 0 .36-.72.72-1.73.96-2.24.96s-1.52-.24-2.24-.96Z" },
    { label: "TikTok", href: "https://www.tiktok.com/@xheal.ai", d: "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.13 2.56 5.52 5.6 5.52 3.3 0 5.78-2.59 5.78-5.52V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" },
    { label: "Discord", href: "https://discord.gg/xqBzFraE", d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" },
  ];

  return (
    <ul role="list" className="flex flex-wrap items-center gap-4 text-xtertiary">
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border x-hairline transition-colors duration-200 hover:border-xborder-medium hover:text-xprimary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={social.d} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
