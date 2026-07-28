import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // `/llms.txt` is published content and has to outrank the wildcard below.
      // Google resolves conflicts by the longest matching path, and "/llms.txt"
      // is longer than "/*.txt$", so the allow wins.
      allow: ["/", "/llms.txt"],
      // The static export writes a React Server Component payload beside every
      // route (`/about.txt`, `/en/about/__next._tree.txt`). CloudFront serves
      // them as text/plain with no canonical tag and no noindex, which makes
      // them uncanonicalized duplicates of every page on the site. Browsers
      // ignore robots.txt, so client-side navigation and prefetch still work,
      // and every page is fully server-rendered in the export, so Googlebot
      // never needs a payload to render one.
      disallow: ["/*.txt$"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_ORIGIN,
  };
}
