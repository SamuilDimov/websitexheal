"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/#what-you-get", label: "What you get" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          scrolled ? "bg-[#141933]/80 backdrop-blur-md" : "bg-transparent"
        }`}
        role="banner"
      >
        {/* Nav gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(20, 25, 51, 0.35) 0%, rgba(20, 25, 51, 0) 100%)",
          }}
        />

        <div className="w-full max-w-[100em] mx-auto px-[5em] flex flex-row justify-between items-center pt-[1.25em] pb-[2.5em] max-[991px]:px-[40px] max-[479px]:px-[20px] relative z-10">
          {/* Logo */}
          <Link href="/" className="pl-0">
            <Image
              src="/images/logo.svg"
              alt="xHeal logo"
              width={140}
              height={45}
              className="w-[8.75em] min-w-[140px]"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-[36px]">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-[10px] py-[10px] border border-transparent rounded-[12px] transition-all duration-200 hover:border-xlight-blue hover:bg-xlight-blue-low"
                style={{ color: "#ffffff", fontSize: "1.125rem" }}
              >
                {item.label}
              </Link>
            ))}
            <div>
              <a
                href="https://apps.apple.com/us/app/xheal/id6748074977"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center rounded-[16px] px-[28px] py-[12px] transition-all duration-200 hover:shadow-[0_4px_4px_0_var(--light-blue-low)] inline-block"
                style={{ backgroundColor: "#ffffff", color: "#4764ff", fontSize: "1.0625rem" }}
              >
                Download App
              </a>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden relative w-[28px] h-[20px] flex flex-col justify-between items-stretch z-[1002]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
                isOpen
                  ? "rotate-45 translate-y-[9px]"
                  : ""
              }`}
            />
            <span
              className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
                isOpen
                  ? "-rotate-45 -translate-y-[9px]"
                  : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-[1003] flex flex-col"
          style={{ backgroundColor: "#141933" }}
        >
          {/* Top bar with logo + close */}
          <div className="flex items-center justify-between px-[20px] pt-[1.25em] pb-[12px]">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/images/logo.svg"
                alt="xHeal logo"
                width={140}
                height={45}
                className="w-[8.75em] min-w-[140px]"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="w-[32px] h-[32px] relative"
            >
              <span className="absolute top-1/2 left-0 w-full h-[2.5px] bg-white rounded-full rotate-45 -translate-y-1/2" />
              <span className="absolute top-1/2 left-0 w-full h-[2.5px] bg-white rounded-full -rotate-45 -translate-y-1/2" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-white/10 mx-[20px]" />

          {/* Links */}
          <nav className="flex-1 flex flex-col justify-center px-[20px] gap-[4px]">
            {[{ href: "/", label: "Home" }, ...navLinks].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-[14px] text-center rounded-[12px] active:bg-white/10"
              >
                <span
                  className="text-[1.5rem] font-medium tracking-[-0.01em]"
                  style={{ color: "#ffffff" }}
                >
                  {item.label}
                </span>
              </Link>
            ))}

            {/* CTA button inside nav flow */}
            <div className="mt-[20px]">
              <a
                href="https://apps.apple.com/us/app/xheal/id6748074977"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block text-center py-[20px] rounded-[16px] font-medium"
                style={{ backgroundColor: "#4764ff", color: "#ffffff", fontSize: "24px" }}
              >
                Download App
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
