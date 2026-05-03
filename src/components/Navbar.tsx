"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "/about" as const, label: t("about") },
    { href: "/#what-you-get" as const, label: t("whatYouGet") },
    { href: "/#how-it-works" as const, label: t("howItWorks") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/support" as const, label: t("support") },
  ];

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale as "en" | "bg" });
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(0,14,27,0.8)] backdrop-blur-[20px] border-b border-xborder"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="w-full max-w-[1440px] mx-auto px-10 flex flex-row justify-between items-center h-[64px] max-[991px]:px-8 max-[479px]:px-5 relative z-10">
          {/* Logo */}
          <Link href="/" className="pl-0 flex items-center">
            <Image
              src="/images/logo.svg"
              alt="xHeal logo"
              width={120}
              height={32}
              className="h-[28px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="t-nav text-xsecondary hover:text-xprimary px-3 py-2 rounded-md transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 ml-3 rounded-full border border-xborder p-[3px] bg-xcard">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`px-3 py-1 text-[12px] font-bold tracking-[0.5px] uppercase rounded-full transition-all duration-200 ${
                    locale === loc
                      ? "bg-xbrand text-white"
                      : "bg-transparent text-xtertiary hover:text-xprimary"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            <div className="ml-2">
              <a
                href="https://apps.apple.com/us/app/xheal/id6748074977"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-xbrand text-white t-button-sm h-[40px] px-5 rounded-[10px] transition-all duration-200 hover:bg-[#5a73ff] hover:shadow-[0_8px_24px_rgba(71,100,255,0.4)]"
              >
                {t("downloadApp")}
              </a>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden relative w-[28px] h-[20px] flex flex-col justify-between items-stretch z-[1002]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t("toggleMenu")}
            aria-expanded={isOpen}
          >
            <span
              className={`block h-[2px] bg-xprimary rounded-full transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] bg-xprimary rounded-full transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] bg-xprimary rounded-full transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[1003] flex flex-col bg-xbg">
          {/* Top bar with logo + close */}
          <div className="flex items-center justify-between px-5 h-[64px] border-b border-xborder">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/images/logo.svg"
                alt="xHeal logo"
                width={120}
                height={32}
                className="h-[28px] w-auto"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              aria-label={t("closeMenu")}
              className="w-[32px] h-[32px] relative"
            >
              <span className="absolute top-1/2 left-0 w-full h-[2.5px] bg-xprimary rounded-full rotate-45 -translate-y-1/2" />
              <span className="absolute top-1/2 left-0 w-full h-[2.5px] bg-xprimary rounded-full -rotate-45 -translate-y-1/2" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col justify-center px-5 gap-1">
            {[{ href: "/" as const, label: t("home") }, ...navLinks].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-4 text-center rounded-xl active:bg-xcard transition-colors"
              >
                <span className="t-h3 text-xprimary">{item.label}</span>
              </Link>
            ))}

            {/* Language Switcher (mobile) */}
            <div className="flex items-center justify-center gap-1 mt-6 rounded-full border border-xborder bg-xcard p-[3px] self-center">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    switchLocale(loc);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 text-[14px] font-bold tracking-[0.5px] uppercase rounded-full transition-all duration-200 ${
                    locale === loc
                      ? "bg-xbrand text-white"
                      : "bg-transparent text-xtertiary"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* CTA button inside nav flow */}
            <div className="mt-6">
              <a
                href="https://apps.apple.com/us/app/xheal/id6748074977"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block text-center py-4 rounded-[14px] bg-xbrand text-white t-button"
              >
                {t("downloadApp")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
