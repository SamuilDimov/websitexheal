import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BLOG_IMAGE_SLIDER_MARKER,
  getBlogPosts,
} from "@/data/blog-posts";
import ArticleCTA from "@/components/blog/ArticleCTA";
import ChatScreenshotSlider from "@/components/blog/ChatScreenshotSlider";
import RelatedPosts from "@/components/blog/RelatedPosts";
import MedicalDisclaimer from "@/components/blog/MedicalDisclaimer";
import { buildMetadata } from "@/lib/site";

import Icon from "@/components/ui/Icon";
import PageHeader from "@/components/ui/PageHeader";
export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogPosts("en").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const posts = getBlogPosts(locale);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const title = `${post.seoTitle || post.title} | xHeal Blog`;
  const description = post.metaDescription || post.excerpt;

  return buildMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title,
    description,
    image: post.image,
    translated: true,
    article: {
      publishedTime: new Date(post.publishAt || post.date).toISOString(),
      modifiedTime: post.lastUpdated
        ? new Date(post.lastUpdated).toISOString()
        : undefined,
      authors: [post.author.name],
    },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = getBlogPosts(locale);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const sliderContent = post.imageSlider
    ? post.content.split(BLOG_IMAGE_SLIDER_MARKER)
    : null;

  if (sliderContent && sliderContent.length !== 2) {
    throw new Error(
      `Blog post ${post.slug} must contain exactly one image slider marker`,
    );
  }

  return (
    <>
      <PageHeader title={post.title} />

      {/* Content */}
      <section className="bg-xbg">
        <div className="x-container pb-20 pt-2">
          <div className="w-full max-w-[760px] flex flex-col gap-6">
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
                <Icon name="calendar_today" size={16} />
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
                <Icon name="schedule" size={16} />
                <span className="t-body3">
                  {post.readingTime} {t("minRead")}
                </span>
              </div>
            </div>

            {/* Article content */}
            {post.imageSlider && sliderContent ? (
              <div className="rich-text">
                <div
                  dangerouslySetInnerHTML={{ __html: sliderContent[0] }}
                />
                <ChatScreenshotSlider
                  slides={post.imageSlider.slides}
                  labels={{
                    ariaLabel: t("sliderAriaLabel"),
                    carouselDescription: t("sliderCarouselDescription"),
                    slideDescription: t("sliderSlideDescription"),
                    eyebrow: t("sliderEyebrow"),
                    previous: t("sliderPrevious"),
                    next: t("sliderNext"),
                    screenshot: t("sliderScreenshot"),
                    of: t("sliderOf"),
                    hint: t("sliderHint"),
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{ __html: sliderContent[1] }}
                />
              </div>
            ) : (
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

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
