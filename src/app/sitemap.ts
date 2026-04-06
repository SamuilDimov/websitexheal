import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://xheal.com";
const LOCALES = ["en", "bg"] as const;
const LAST_MOD = new Date("2026-03-26");

function url(path: string) {
  return `${BASE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages — both locales
  const staticPages: MetadataRoute.Sitemap = [
    ...LOCALES.map((locale) => ({
      url: url(`/${locale}`),
      lastModified: LAST_MOD,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    })),
    ...LOCALES.map((locale) => ({
      url: url(`/${locale}/about`),
      lastModified: LAST_MOD,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...LOCALES.map((locale) => ({
      url: url(`/${locale}/blog`),
      lastModified: LAST_MOD,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...LOCALES.map((locale) => ({
      url: url(`/${locale}/team/trifon-getsov`),
      lastModified: LAST_MOD,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...LOCALES.map((locale) => ({
      url: url(`/${locale}/support`),
      lastModified: LAST_MOD,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...LOCALES.map((locale) => ({
      url: url(`/${locale}/privacy-policy`),
      lastModified: LAST_MOD,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...LOCALES.map((locale) => ({
      url: url(`/${locale}/terms-conditions`),
      lastModified: LAST_MOD,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...LOCALES.map((locale) => ({
      url: url(`/${locale}/cookie-policy`),
      lastModified: LAST_MOD,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  // Blog posts — same slugs for both locales
  const blogPages: MetadataRoute.Sitemap = blogPosts
    .filter((post) => !post.slug.startsWith("newsletter"))
    .flatMap((post) => {
      const lastMod = post.lastUpdated
        ? new Date(post.lastUpdated)
        : new Date(post.date);

      return LOCALES.map((locale) => ({
        url: url(`/${locale}/blog/${post.slug}`),
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: post.featured ? 0.9 : 0.7,
      }));
    });

  return [...staticPages, ...blogPages];
}
