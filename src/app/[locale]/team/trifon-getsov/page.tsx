import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/data/blog-posts";
import { buildMetadata } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Team" });

  return buildMetadata({
    locale,
    path: "/team/trifon-getsov",
    title: t("trifon.metaTitle"),
    description: t("trifon.metaDescription"),
    image: "/images/trifon.png",
    translated: true,
  });
}

const CREDENTIAL_KEYS = [
  "credential1",
  "credential2",
  "credential3",
  "credential4",
  "credential5",
] as const;

export default async function TrifonBioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, tBlog] = await Promise.all([
    getTranslations({ locale, namespace: "Team.trifon" }),
    getTranslations({ locale, namespace: "Blog" }),
  ]);
  const posts = getBlogPosts(locale);
  const trifonPosts = posts.filter(
    (p) =>
      p.author.name === "Trifon Getsov" &&
      !p.slug.includes("newsletter")
  );

  return (
    <>
      {/* Hero */}
      <section className="relative bg-xbg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-radial-glow" aria-hidden />
        <div className="relative w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-16 flex flex-col items-center gap-5 max-[991px]:px-8 max-[991px]:pt-[120px] max-[479px]:px-5">
          <Image
            src="/images/trifon.png"
            alt={t("name")}
            width={120}
            height={120}
            className="rounded-full object-cover ring-2 ring-xborder-medium"
            style={{ width: 120, height: 120 }}
          />
          <h1 className="t-display1 text-xprimary text-center">{t("name")}</h1>
          <p className="t-h4 text-xbrand">{t("role")}</p>
        </div>
      </section>

      {/* Bio content */}
      <section className="bg-xbg">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
          <div className="max-w-[800px] mx-auto w-full flex flex-col gap-12">
            {/* About */}
            <div className="flex flex-col gap-5">
              <h2 className="t-h1 text-xprimary">{t("aboutHeading")}</h2>
              <p className="t-body1 text-xsecondary">{t("aboutParagraph1")}</p>
              <p className="t-body1 text-xsecondary">{t("aboutParagraph2")}</p>
              <p className="t-body1 text-xsecondary">{t("aboutParagraph3")}</p>
            </div>

            {/* Credentials */}
            <div className="surface-card-feature p-7 flex flex-col gap-4">
              <h3 className="t-h4 text-xprimary">{t("credentialsHeading")}</h3>
              <ul className="flex flex-col gap-3">
                {CREDENTIAL_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-3 t-body2 text-xsecondary">
                    <span className="text-xsuccess mt-0.5 flex-shrink-0">✓</span>
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medical review */}
            <div className="p-5 rounded-[16px] bg-xbg-3 border border-xborder">
              <p className="t-body3 text-xsecondary">
                {t.rich("medicalReview", {
                  reviewer: (chunks) => (
                    <strong className="text-xprimary">{chunks}</strong>
                  ),
                })}
              </p>
            </div>

            {/* Published articles */}
            {trifonPosts.length > 0 && (
              <div className="flex flex-col gap-6">
                <h2 className="t-h1 text-xprimary">{t("articlesHeading")}</h2>
                <div className="flex flex-col gap-3">
                  {trifonPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="flex flex-col gap-1 p-5 rounded-[16px] border border-xborder bg-xcard hover:border-xborder-medium transition-colors duration-200 group"
                    >
                      <span className="t-h6 text-xprimary group-hover:text-xbrand transition-colors duration-200">
                        {post.title}
                      </span>
                      <span className="t-caption text-xtertiary">
                        {post.date} · {post.readingTime} {tBlog("minRead")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/blog"
              className="t-button text-xbrand hover:underline"
            >
              &larr; {tBlog("backToBlog")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
