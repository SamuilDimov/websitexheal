import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/data/blog-posts";
import { guides } from "@/data/guides";
import { routing } from "@/i18n/routing";
import { absoluteUrl, localizedPath } from "@/lib/site";

const LOCALES = routing.locales;
const ENGLISH_LOCALE = routing.defaultLocale;
const LAST_MODIFIED = new Date("2026-07-13");

export const dynamic = "force-static";

type StaticPage = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const TRANSLATED_STATIC_PAGES: StaticPage[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/support", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-conditions", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/workouts", changeFrequency: "monthly", priority: 0.8 },
  { path: "/nutrition", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mindfulness", changeFrequency: "monthly", priority: 0.8 },
  { path: "/chat-with-your-health", changeFrequency: "monthly", priority: 0.8 },
  { path: "/flare-up-trigger-patterns", changeFrequency: "monthly", priority: 0.8 },
  { path: "/health-awareness", changeFrequency: "monthly", priority: 0.8 },
  { path: "/health-timeline", changeFrequency: "monthly", priority: 0.8 },
  { path: "/log-life-events", changeFrequency: "monthly", priority: 0.8 },
  { path: "/specialist-ready-reports", changeFrequency: "monthly", priority: 0.8 },
];

const ENGLISH_ONLY_STATIC_PAGES: StaticPage[] = [
  { path: "/team/trifon-getsov", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides", changeFrequency: "weekly", priority: 0.9 },
];

function staticEntry(
  page: StaticPage,
  locale: string
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(localizedPath(locale, page.path)),
    lastModified: LAST_MODIFIED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = TRANSLATED_STATIC_PAGES.flatMap((page) =>
    LOCALES.map((locale) => staticEntry(page, locale))
  );

  const englishOnlyStaticPages = ENGLISH_ONLY_STATIC_PAGES.map((page) =>
    staticEntry(page, ENGLISH_LOCALE)
  );

  const blogPages: MetadataRoute.Sitemap = getBlogPosts("en").flatMap((post) => {
    const lastMod = post.lastUpdated
      ? new Date(post.lastUpdated)
      : new Date(post.date);

    return LOCALES.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, `/blog/${post.slug}`)),
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.9 : 0.7,
    }));
  });

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.category}/${guide.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...englishOnlyStaticPages,
    ...blogPages,
    ...guidePages,
  ];
}
