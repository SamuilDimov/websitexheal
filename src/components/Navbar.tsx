"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { APP_STORE_URL } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import AppleLogo from "@/components/ui/AppleLogo";

/**
 * Capsule navigation (redesign phase 2).
 *
 * A fixed, transparent shell holds a centred capsule. After 48 px of scroll
 * the capsule gains a translucent card background, a blur and a hairline.
 * When a dark section (`data-surface="dark"`) sits under the capsule the
 * capsule itself switches to the dark token set so it stays legible.
 */
export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const shellRef = useRef<HTMLElement>(null);

  const links = [
    { href: "/#features", label: t("features") },
    { href: "/#how-it-works", label: t("howItWorks") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
  ] as const;

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
  const capsuleSurface = overDark && !isOpen ? "dark" : "light";

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

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-capsule__cta"
              >
                <AppleLogo size={15} className="nav-capsule__cta-icon" />
                <span className="max-[359px]:sr-only">{t("getApp")}</span>
              </a>

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
        className={`nav-sheet md:hidden ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <nav aria-label={t("primaryNavigation")} className="nav-sheet__inner">
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
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-sheet__cta"
              tabIndex={isOpen ? 0 : -1}
            >
              <AppleLogo size={18} />
              {t("getApp")}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
