import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/data/blog-posts";
import { buildMetadata } from "@/lib/site";

import PageHeader from "@/components/ui/PageHeader";
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
      <PageHeader title={t("name")} lead={t("role")}>
        <Image
          src="/images/trifon.png"
          alt={t("name")}
          width={96}
          height={96}
          className="mt-2 rounded-full object-cover ring-1 ring-xborder"
          style={{ width: 96, height: 96 }}
        />
      </PageHeader>

      {/* Bio content */}
      <section className="bg-xbg">
        <div className="x-container pb-24 pt-4">
          <div className="w-full max-w-[760px] flex flex-col gap-12">
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
                      <span className="t-caption text-xtertiary flex flex-wrap items-center gap-x-3">
                        <span>{post.date}</span>
                        <span>
                          {post.readingTime} {tBlog("minRead")}
                        </span>
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
