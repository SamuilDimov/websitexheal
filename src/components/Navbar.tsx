"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  // Close menu on route change or ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when menu is open
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
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled ? "bg-[#141933]/80 backdrop-blur-md" : "bg-transparent"
      }`}
      role="banner"
    >
      {/* Nav gradient overlay — subtle, fades from dark to transparent */}
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

        {/* Desktop Nav Menu */}
        <div className="hidden md:flex items-center gap-[48px]">
          {[
            { href: "/about", label: "About" },
            { href: "/#what-you-get", label: "What you get" },
            { href: "/#how-it-works", label: "How it works" },
            { href: "/blog", label: "Blog" },
            { href: "/support", label: "Support" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[1.5rem] px-[10px] py-[10px] border border-transparent rounded-[12px] transition-all duration-200 hover:border-xlight-blue hover:bg-xlight-blue-low"
              style={{ color: "#ffffff" }}
            >
              {item.label}
            </Link>
          ))}
          <div>
            <a
              href="https://apps.apple.com/us/app/xheal/id6748074977"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[1.375rem] text-center rounded-[16px] px-[32px] py-[14px] transition-all duration-200 hover:shadow-[0_4px_4px_0_var(--light-blue-low)] inline-block"
              style={{ backgroundColor: "#ffffff", color: "#4764ff" }}
            >
              Download App
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xwhite p-[8px] text-[1.25rem]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-gradient-to-b from-xdark-blue to-xlight-blue z-[999] pt-[100px] px-[40px] max-[479px]:px-[20px] overflow-y-auto">
          {/* Close button at top */}
          <button
            className="absolute top-[1em] right-[40px] max-[479px]:right-[20px] text-xwhite text-[1.25rem] p-[8px]"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>

          <div className="flex flex-col">
            <Link
              href="/"
              className="text-xwhite text-[2rem] mb-[40px]"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-xwhite text-[2rem] mb-[40px]"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#what-you-get"
              className="text-xwhite text-[2rem] mb-[40px]"
              onClick={() => setIsOpen(false)}
            >
              What you get
            </Link>
            <Link
              href="/#how-it-works"
              className="text-xwhite text-[2rem] mb-[40px]"
              onClick={() => setIsOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/blog"
              className="text-xwhite text-[2rem] mb-[40px]"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/support"
              className="text-xwhite text-[2rem] mb-[40px]"
              onClick={() => setIsOpen(false)}
            >
              Support
            </Link>
            <a
              href="https://apps.apple.com/us/app/xheal/id6748074977"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-xwhite text-xdark-blue text-[1.125rem] text-center rounded-[12px] px-[24px] py-[10px] inline-block mt-[20px]"
              onClick={() => setIsOpen(false)}
            >
              Download App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
