import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://xheal.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/en/",
          "/bg/",
          "/en/about",
          "/bg/about",
          "/en/blog",
          "/bg/blog",
          "/en/blog/",
          "/bg/blog/",
          "/en/team/",
          "/bg/team/",
          "/en/privacy-policy",
          "/bg/privacy-policy",
          "/en/terms-conditions",
          "/bg/terms-conditions",
          "/en/cookie-policy",
          "/bg/cookie-policy",
          "/en/support",
          "/bg/support",
        ],
        disallow: [
          "/en/chat-with-your-health",
          "/bg/chat-with-your-health",
          "/en/flare-up-trigger-patterns",
          "/bg/flare-up-trigger-patterns",
          "/en/health-awareness",
          "/bg/health-awareness",
          "/en/health-timeline",
          "/bg/health-timeline",
          "/en/log-life-events",
          "/bg/log-life-events",
          "/en/specialist-ready-reports",
          "/bg/specialist-ready-reports",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
