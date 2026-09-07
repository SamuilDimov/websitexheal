"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { APP_STORE_URL } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import AppleLogo from "@/components/ui/AppleLogo";
import RollText from "@/components/ui/RollText";
import AudienceSwitch, {
  PROFESSIONAL_PATH,
  isProfessionalPath,
} from "@/components/ui/AudienceSwitch";

/**
 * Capsule navigation (redesign phase 2).
 *
 * A fixed, transparent shell holds a centred capsule. After 48 px of scroll
 * the capsule gains a translucent card background, a blur and a hairline.
 * When a dark section (`data-surface="dark"`) sits under the capsule the
 * capsule itself switches to the dark token set so it stays legible.
 *
 * The capsule is audience-aware. `/professionals` is the same company seen
 * from the buying side, so the switch, the links and the call to action all
 * change with it: the consumer view asks for a download, the professional
 * view asks for early access. Only the switch itself stays in both.
 */
export default function Navbar() {
  const t = useTranslations("Navbar");
  const tPro = useTranslations("ProNavbar");
  const locale = useLocale();
  const pathname = usePathname();
  const isPro = isProfessionalPath(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const shellRef = useRef<HTMLElement>(null);

  const consumerLinks = [
    { href: "/#features", label: t("features") },
    { href: "/#how-it-works", label: t("howItWorks") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
  ];
  // Three anchors on the professional side: the capsule also carries the
  // switch there, and a fourth link pushes the early-access pill off the row
  // on a 13-inch laptop.
  const professionalLinks = [
    { href: `${PROFESSIONAL_PATH}#workspace`, label: tPro("workspace") },
    { href: `${PROFESSIONAL_PATH}#consent`, label: tPro("consent") },
    { href: `${PROFESSIONAL_PATH}#faq`, label: tPro("faq") },
  ];
  const links = isPro ? professionalLinks : consumerLinks;

  // Scroll state: 48 px threshold, the same trigger Bright uses.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 48);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Surface detection: is a dark section under the capsule right now?
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !("IntersectionObserver" in window)) return;

    const darkSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-surface="dark"]'),
    );
    if (darkSections.length === 0) return;

    const intersecting = new Set<Element>();
    const bandHeight = shell.getBoundingClientRect().height || 72;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        setOverDark(intersecting.size > 0);
      },
      {
        // Only the band the capsule occupies counts.
        rootMargin: `0px 0px -${Math.max(0, window.innerHeight - bandHeight)}px 0px`,
        threshold: 0,
      },
    );
    darkSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const otherLocale = routing.locales.find((l) => l !== locale) ?? locale;
  // The open sheet paints its own ground, so the capsule matches the sheet
  // rather than whatever section is scrolled under it. On the professional
  // view that ground is dark end to end.
  const sheetSurface = isPro ? "dark" : "light";
  const capsuleSurface = isOpen ? sheetSurface : overDark ? "dark" : "light";

  return (
    <>
      <header
        ref={shellRef}
        className="fixed inset-x-0 top-0 z-[1000] pointer-events-none"
        role="banner"
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-center px-4 max-[479px]:px-3">
          <nav
            aria-label={t("primaryNavigation")}
            data-surface={capsuleSurface}
            data-scrolled={scrolled || isOpen ? "true" : "false"}
            className="nav-capsule pointer-events-auto"
          >
            <Link href="/" className="nav-capsule__logo" aria-label="xHeal">
              <Image
                src="/images/logo.svg"
                alt=""
                width={120}
                height={34}
                className="nav-logo h-[26px] w-auto"
                priority
              />
            </Link>

            <AudienceSwitch />

            <ul className="nav-capsule__links hidden md:flex" role="list">
              {links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-capsule__link t-nav">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="ml-auto flex items-center gap-1.5 md:ml-1">
              <Link
                href={pathname || "/"}
                locale={otherLocale}
                className="nav-capsule__locale t-eyebrow hidden md:inline-flex"
                aria-label={t("switchLocale", { locale: otherLocale.toUpperCase() })}
                hrefLang={otherLocale}
              >
                {otherLocale.toUpperCase()}
              </Link>

              {isPro ? (
                <Link
                  href={`${PROFESSIONAL_PATH}#early-access`}
                  className="nav-capsule__cta"
                  data-magnetic
                >
                  <span data-magnetic-inner>
                    <RollText>{tPro("cta")}</RollText>
                    <Icon name="arrow_forward" size={15} />
                  </span>
                </Link>
              ) : (
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-capsule__cta"
                  data-magnetic
                >
                  <span data-magnetic-inner>
                    <AppleLogo size={15} className="nav-capsule__cta-icon" />
                    <span className="max-[359px]:sr-only">
                      <RollText>{t("getApp")}</RollText>
                    </span>
                  </span>
                </a>
              )}

              <button
                type="button"
                className="nav-capsule__menu md:hidden"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? t("closeMenu") : t("toggleMenu")}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Icon name={isOpen ? "close" : "menu"} size={20} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        data-surface={sheetSurface}
        className={`nav-sheet md:hidden ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <nav aria-label={t("primaryNavigation")} className="nav-sheet__inner">
          <AudienceSwitch
            variant="sheet"
            className="mb-6"
            onNavigate={() => setIsOpen(false)}
          />
          <ul role="list" className="nav-sheet__links">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="nav-sheet__link t-h3"
                  tabIndex={isOpen ? 0 : -1}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/support"
                onClick={() => setIsOpen(false)}
                className="nav-sheet__link t-h3"
                tabIndex={isOpen ? 0 : -1}
              >
                {t("support")}
              </Link>
            </li>
          </ul>

          <div className="nav-sheet__footer">
            <Link
              href={pathname || "/"}
              locale={otherLocale}
              onClick={() => setIsOpen(false)}
              className="nav-sheet__locale t-eyebrow"
              tabIndex={isOpen ? 0 : -1}
            >
              {t("switchLocale", { locale: otherLocale.toUpperCase() })}
            </Link>
            {isPro ? (
              <Link
                href={`${PROFESSIONAL_PATH}#early-access`}
                onClick={() => setIsOpen(false)}
                className="nav-sheet__cta"
                tabIndex={isOpen ? 0 : -1}
                data-magnetic
              >
                <span data-magnetic-inner>
                  <RollText>{tPro("cta")}</RollText>
                  <Icon name="arrow_forward" size={18} />
                </span>
              </Link>
            ) : (
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-sheet__cta"
                tabIndex={isOpen ? 0 : -1}
                data-magnetic
              >
                <span data-magnetic-inner>
                  <AppleLogo size={18} />
                  <RollText>{t("getApp")}</RollText>
                </span>
              </a>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
