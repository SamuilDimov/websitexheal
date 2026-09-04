import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Rendered when a route inside the `[locale]` segment calls `notFound()`. The
// static export serves `out/404.html` (see `src/app/not-found.tsx`) for paths
// that never reach Next at all, so this page exists to keep in-app 404s
// localized and non-indexable rather than to back a physical artifact.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const LINKS = [
  { href: "/", key: "home" },
  { href: "/guides", key: "guides" },
  { href: "/blog", key: "blog" },
  { href: "/support", key: "support" },
] as const;

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="bg-xbg min-h-screen">
      <section className="x-container pt-[72px] pb-24">
        <div className="flex max-w-[64ch] flex-col items-start gap-4 pt-12 md:pt-20">
          <p className="t-eyebrow text-xtertiary">{t("eyebrow")}</p>
          <h1 className="t-display2 text-xprimary">{t("title")}</h1>
          <p className="t-lead text-xsecondary">{t("description")}</p>
          <nav className="mt-4 flex flex-wrap gap-3">
            {LINKS.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center justify-center h-[44px] px-5 rounded-[10px] border border-xbrand text-xbrand t-button-sm transition-colors hover:bg-[rgba(71,100,255,0.08)]"
              >
                {t(`links.${key}`)}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
