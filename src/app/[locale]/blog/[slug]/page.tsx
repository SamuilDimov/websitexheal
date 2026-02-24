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
  // Use English slugs — they're the same for both locales
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
    title: post ? `${post.title} | xHeal Blog` : "Blog Post | xHeal",
    description: post?.excerpt || "xHeal blog post",
    openGraph: post
      ? {
          title: post.title,
          description: post.excerpt,
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
        <section
          className="relative"
          style={{
            backgroundImage:
              "linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
          }}
        >
          <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[5em] flex flex-col items-center gap-[40px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
            <h1 className="text-[4.5rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3.5rem] max-[479px]:text-[3rem]">
              {t("postNotFoundTitle")}
            </h1>
          </div>
        </section>
        <section>
          <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[40px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
            <div className="max-w-[800px] mx-auto w-full">
              <p className="text-xblack-70 mb-[20px]" style={{ fontSize: "16px" }}>
                {t("postNotFoundDescription")}
              </p>
              <Link
                href="/blog"
                className="text-xdark-blue hover:underline"
                style={{ fontSize: "16px" }}
              >
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
      <section
        className="relative"
        style={{
          backgroundImage:
            "linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
        }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[5em] flex flex-col items-center gap-[20px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
          {/* Category badge */}
          <span
            className="px-[12px] py-[5px] rounded-full border border-white/30"
            style={{ fontSize: "13px", color: "rgba(248,248,250,0.8)" }}
          >
            {t(`categories.${post.category}`)}
          </span>
          <h1 className="text-[4rem] font-medium leading-[1.05] tracking-[-0.04em] text-center max-w-[18ch] max-[991px]:text-[3rem] max-[479px]:text-[2.5rem]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[3em] flex flex-col items-center text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="max-w-[800px] mx-auto w-full flex flex-col gap-[24px]">
            {/* Cover image */}
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full object-cover rounded-[16px] max-h-[28rem]"
            />

            {/* Meta row */}
            <div className="flex items-center gap-[16px] flex-wrap pb-[8px] border-b border-xlight-blue-low/50">
              {/* Author */}
              <div className="flex items-center gap-[8px]">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                  style={{ width: 36, height: 36 }}
                />
                <div>
                  <span
                    className="font-medium block"
                    style={{ fontSize: "14px" }}
                  >
                    {post.author.name}
                  </span>
                  {post.author.role && (
                    <span
                      className="text-xblack-70 block"
                      style={{ fontSize: "12px" }}
                    >
                      {post.author.role}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-xblack-70/30">|</span>

              {/* Date */}
              <div className="flex items-center gap-[6px]">
                <span
                  className="font-icons text-xblack-70"
                  style={{ fontSize: "16px" }}
                >
                  calendar_today
                </span>
                <span className="text-xblack-70" style={{ fontSize: "14px" }}>
                  {post.date}
                </span>
              </div>

              <span className="text-xblack-70/30">|</span>

              {/* Reading time */}
              <div className="flex items-center gap-[6px]">
                <span
                  className="font-icons text-xblack-70"
                  style={{ fontSize: "16px" }}
                >
                  schedule
                </span>
                <span className="text-xblack-70" style={{ fontSize: "14px" }}>
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

            {/* Back link */}
            <Link
              href="/blog"
              className="text-xdark-blue hover:underline mt-[20px]"
              style={{ fontSize: "16px" }}
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
