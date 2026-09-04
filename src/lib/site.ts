import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = new URL("https://xheal.ai");
export const SITE_ORIGIN = SITE_URL.origin;
export const DEFAULT_SOCIAL_IMAGE = "/images/hero-health-data.jpg";
export const APP_STORE_URL = "https://apps.apple.com/us/app/xheal/id6748074977";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function localizedPath(locale: string, path = "/") {
  const normalizedPath =
    path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

  if (locale === routing.defaultLocale) {
    return normalizedPath || "/";
  }

  return `/${locale}${normalizedPath}`;
}

type SiteMetadataOptions = {
  locale: string;
  path?: string;
  title: string;
  description: string;
  image?: string;
  translated?: boolean;
  robots?: Metadata["robots"];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
};

export function buildMetadata({
  locale,
  path = "/",
  title,
  description,
  image = DEFAULT_SOCIAL_IMAGE,
  translated = false,
  robots,
  article,
}: SiteMetadataOptions): Metadata {
  const url = absoluteUrl(localizedPath(locale, path));
  const imageUrl = absoluteUrl(image);
  const languages = translated
    ? {
        ...Object.fromEntries(
          routing.locales.map((supportedLocale) => [
            supportedLocale,
            absoluteUrl(localizedPath(supportedLocale, path)),
          ])
        ),
        "x-default": absoluteUrl(localizedPath(routing.defaultLocale, path)),
      }
    : undefined;
  const openGraphBase = {
    title,
    description,
    url,
    siteName: "xHeal",
    locale: locale === "bg" ? "bg_BG" : "en_US",
    alternateLocale: translated
      ? routing.locales
          .filter((supportedLocale) => supportedLocale !== locale)
          .map((supportedLocale) =>
            supportedLocale === "bg" ? "bg_BG" : "en_US"
          )
      : undefined,
    images: [{ url: imageUrl, alt: title }],
  };

  return {
    metadataBase: SITE_URL,
    title,
    description,
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    openGraph: article
      ? {
          ...openGraphBase,
          type: "article",
          ...(article.publishedTime
            ? { publishedTime: article.publishedTime }
            : {}),
          ...(article.modifiedTime
            ? { modifiedTime: article.modifiedTime }
            : {}),
          ...(article.authors ? { authors: article.authors } : {}),
        }
      : {
          ...openGraphBase,
          type: "website",
        },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, alt: title }],
    },
    // Twitter cards resolve the page URL from the canonical URL. This keeps an
    // explicit URL available for consumers that also read twitter:url.
    other: {
      "twitter:url": url,
    },
    ...(robots ? { robots } : {}),
  };
}
