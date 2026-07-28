"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { GuideNavigationCategory } from "@/types/content";

interface GuidesSidebarProps {
  currentCategory?: string;
  currentSlug?: string;
  navigation: GuideNavigationCategory[];
  // Passed in from the server rather than read from a client message catalog so
  // guide copy never has to ship in the shared client bundle.
  allGuidesLabel: string;
  toggleNavigationLabel: string;
}

export default function GuidesSidebar({
  currentCategory,
  currentSlug,
  navigation,
  allGuidesLabel,
  toggleNavigationLabel,
}: GuidesSidebarProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(currentCategory ? [currentCategory] : ["getting-started"])
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const isActiveGuide = (category: string, slug: string) => {
    return currentCategory === category && currentSlug === slug;
  };

  const sidebarContent = (
    <nav className="flex flex-col gap-1">
      {navigation.map((category) => {
        const guides = category.guides;
        const isExpanded = expandedCategories.has(category.slug);
        const hasActiveGuide =
          currentCategory === category.slug && guides.length > 0;

        return (
          <div key={category.slug} className="flex flex-col">
            {/* Category header */}
            <button
              onClick={() => toggleCategory(category.slug)}
              className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-left transition-colors ${
                hasActiveGuide
                  ? "text-xprimary bg-xcard"
                  : "text-xsecondary hover:text-xprimary hover:bg-xcard/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="font-icons text-[18px] opacity-70"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  {category.icon}
                </span>
                <span className="t-body3 font-semibold">{category.label}</span>
              </div>
              <span
                className={`font-icons text-[16px] opacity-50 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            {/* Guides list */}
            {isExpanded && guides.length > 0 && (
              <div className="flex flex-col gap-0.5 ml-3 pl-4 border-l border-xborder mt-1 mb-2">
                {guides.map((guide) => {
                  const isActive = isActiveGuide(category.slug, guide.slug);
                  return (
                    <Link
                      key={guide.slug}
                      href={`/guides/${category.slug}/${guide.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2 rounded-md t-body3 transition-colors ${
                        isActive
                          ? "text-xbrand bg-xbrand/10 font-medium"
                          : "text-xtertiary hover:text-xprimary hover:bg-xcard/30"
                      }`}
                    >
                      {guide.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-xbrand text-white shadow-lg hover:bg-[#5a73ff] transition-colors"
        aria-label={toggleNavigationLabel}
      >
        <span className="font-icons text-[24px]">
          {mobileOpen ? "close" : "menu_book"}
        </span>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-[64px] left-0 z-40 lg:z-auto
          w-[280px] h-[calc(100vh-64px)] lg:h-auto lg:max-h-[calc(100vh-64px)]
          bg-xbg lg:bg-transparent
          border-r border-xborder lg:border-r-0
          overflow-y-auto
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4 lg:p-0 lg:pr-6">
          {/* All guides link */}
          <Link
            href="/guides"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 px-3 py-2.5 mb-3 rounded-lg t-body3 font-semibold transition-colors ${
              pathname === "/guides"
                ? "text-xbrand bg-xbrand/10"
                : "text-xsecondary hover:text-xprimary hover:bg-xcard/50"
            }`}
          >
            <span className="font-icons text-[18px]">home</span>
            {allGuidesLabel}
          </Link>

          {/* Divider */}
          <div className="h-px bg-xborder mb-3" />

          {sidebarContent}
        </div>
      </aside>
    </>
  );
}
