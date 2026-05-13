import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import {
  blogPosts,
  getBlogPosts,
} from "@/data/blog-posts";
import ArticleCTA from "@/components/blog/ArticleCTA";
import RelatedPosts from "@/components/blog/RelatedPosts";
import MedicalDisclaimer from "@/components/blog/MedicalDisclaimer";

export function generateStaticParams() {
  // Use English slugs, they're the same for both locales
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const posts = getBlogPosts(locale);
  const post = posts.find((p) => p.slug === slug);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://xheal.com"),
    title: post ? `${post.title} | xHeal Blog` : "Blog Post | xHeal",
    description: post?.metaDescription || post?.excerpt || "xHeal blog post",
    openGraph: post
      ? {
          title: post.title,
          description: post.metaDescription || post.excerpt,
          images: [{ url: post.image }],
          type: "article",
          publishedTime: post.date,
          authors: [post.author.name],
        }
      : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("Blog");
  const locale = await getLocale();
  const posts = getBlogPosts(locale);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <section className="relative bg-xbg overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-radial-glow" aria-hidden />
          <div className="relative w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-16 flex flex-col items-center gap-10 max-[991px]:px-8 max-[991px]:pt-[120px] max-[479px]:px-5">
            <h1 className="t-display1 text-xprimary text-center">
              {t("postNotFoundTitle")}
            </h1>
          </div>
        </section>
        <section className="bg-xbg">
          <div className="w-full max-w-[1440px] mx-auto px-10 py-16 flex flex-col items-center gap-10 max-[991px]:px-8 max-[479px]:px-5">
            <div className="max-w-[800px] mx-auto w-full">
              <p className="t-body1 text-xsecondary mb-5">
                {t("postNotFoundDescription")}
              </p>
              <Link href="/blog" className="t-button text-xbrand hover:underline">
                &larr; {t("backToBlog")}
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-xbg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-radial-glow" aria-hidden />
        <div className="relative w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-16 flex flex-col items-center gap-5 max-[991px]:px-8 max-[991px]:pt-[120px] max-[479px]:px-5">
          {/* Category badge */}
          <span className="badge badge-new">
            {t(`categories.${post.category}`)}
          </span>
          <h1 className="t-display1 text-xprimary text-center max-w-[20ch]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-xbg">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-12 flex flex-col items-center max-[991px]:px-8 max-[479px]:px-5">
          <div className="max-w-[800px] mx-auto w-full flex flex-col gap-6">
            {/* Cover image */}
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full object-cover rounded-[16px] max-h-[28rem] ring-1 ring-xborder"
            />

            {/* Meta row */}
            <div className="flex items-center gap-4 flex-wrap pb-3 border-b border-xborder">
              {/* Author */}
              <div className="flex items-center gap-2">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={36}
                  height={36}
                  className="rounded-full object-cover ring-1 ring-xborder"
                  style={{ width: 36, height: 36 }}
                />
                <div>
                  <span className="t-body3 font-semibold text-xprimary block">
                    {post.author.name}
                  </span>
                  {post.author.role && (
                    <span className="t-caption text-xtertiary block">
                      {post.author.role}
                    </span>
                  )}
                  {post.reviewedBy && (
                    <span className="t-caption text-xtertiary block">
                      Reviewed by {post.reviewedBy}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-xtertiary opacity-50">|</span>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xtertiary">
                <span className="font-icons" style={{ fontSize: "16px" }}>
                  calendar_today
                </span>
                <span className="t-body3">
                  {post.date}
                  {post.lastUpdated && (
                    <span className="t-caption ml-1 opacity-60">
                      (Updated {post.lastUpdated})
                    </span>
                  )}
                </span>
              </div>

              <span className="text-xtertiary opacity-50">|</span>

              {/* Reading time */}
              <div className="flex items-center gap-1.5 text-xtertiary">
                <span className="font-icons" style={{ fontSize: "16px" }}>
                  schedule
                </span>
                <span className="t-body3">
                  {post.readingTime} {t("minRead")}
                </span>
              </div>
            </div>

            {/* Article content */}
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Medical disclaimer */}
            <MedicalDisclaimer />

            {/* Author byline */}
            {post.author.name === "Trifon Getsov" && (
              <div className="flex items-start gap-5 p-6 rounded-[16px] border border-xborder bg-xcard">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={72}
                  height={72}
                  className="rounded-full object-cover flex-shrink-0 ring-1 ring-xborder"
                  style={{ width: 72, height: 72 }}
                />
                <div className="flex flex-col gap-1.5">
                  <span className="t-h6 text-xprimary">
                    {post.author.name}
                  </span>
                  {post.author.role && (
                    <span className="t-body3 text-xtertiary">
                      {post.author.role}
                    </span>
                  )}
                  <p className="t-body3 text-xsecondary">
                    3x CEO and co-founder of xHeal. After a 4-year personal health crisis, he built xHeal to help people understand their health data before symptoms appear. xHeal AI validated against 5,000+ patients.
                  </p>
                  <Link
                    href="/team/trifon-getsov"
                    className="t-body3 text-xbrand hover:underline mt-1"
                  >
                    View full bio &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* Back link */}
            <Link
              href="/blog"
              className="t-button text-xbrand hover:underline mt-5"
            >
              &larr; {t("backToBlog")}
            </Link>

            {/* CTA */}
            <ArticleCTA />

            {/* Related posts */}
            <RelatedPosts currentSlug={slug} />
          </div>
        </div>
      </section>
    </>
  );
}
