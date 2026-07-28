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
      <section className="w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-24 max-[991px]:px-8 max-[991px]:pt-[120px] max-[479px]:px-5">
        <div className="mx-auto max-w-[600px] rounded-2xl bg-xcard border border-xborder p-8 text-center">
          <p className="t-caption text-xbrand font-semibold uppercase tracking-[0.12em]">
            {t("eyebrow")}
          </p>
          <h1 className="t-h2 text-xprimary mt-3">{t("title")}</h1>
          <p className="t-body2 text-xsecondary mt-4">{t("description")}</p>
          <nav className="mt-8 flex flex-wrap justify-center gap-3">
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
