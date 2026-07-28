import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  getAllGuides,
  getGuide,
  getCategoryInfo,
  getGuideNavigation,
  getNextGuide,
  getPreviousGuide,
  type GuideCategory,
} from "@/data/guides";
import GuidesSidebar from "@/components/guides/GuidesSidebar";
import GuideBreadcrumb from "@/components/guides/GuideBreadcrumb";
import GuideNav from "@/components/guides/GuideNav";
import { buildMetadata } from "@/lib/site";

// Generate static params for all guides. Slugs are locale-invariant, so the
// English set covers every locale.
export function generateStaticParams() {
  return getAllGuides().map((guide) => ({
    category: guide.category,
    slug: guide.slug,
  }));
}

// Generate metadata for each guide
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string; locale: string }>;
}): Promise<Metadata> {
  const { category, slug, locale } = await params;
  const guide = getGuide(category, slug, locale);
  const categoryInfo = getCategoryInfo(category as GuideCategory, locale);

  if (!guide) {
    return {
      title: "Guide Not Found | xHeal",
    };
  }

  return buildMetadata({
    locale,
    path: `/guides/${category}/${slug}`,
    title: `${guide.title} | ${categoryInfo?.label || "Guides"} | xHeal`,
    description: guide.description,
    robots:
      locale === "bg"
        ? {
            index: false,
            follow: true,
          }
        : undefined,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ category: string; slug: string; locale: string }>;
}) {
  const { category, slug, locale } = await params;
  const guide = getGuide(category, slug, locale);
  const categoryInfo = getCategoryInfo(category as GuideCategory, locale);

  if (!guide) {
    notFound();
  }

  const previousGuide = getPreviousGuide(category, slug, locale);
  const nextGuide = getNextGuide(category, slug, locale);
  const navigation = getGuideNavigation(locale);
  const localeGuides = getAllGuides(locale);

  return (
    <div className="bg-xbg min-h-screen">
      {/* Spacer for fixed navbar */}
      <div className="h-[64px]" />

      {/* Main content with sidebar */}
      <section className="w-full max-w-[1440px] mx-auto px-10 py-8 max-[991px]:px-8 max-[479px]:px-5">
        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar */}
          <GuidesSidebar
            navigation={navigation}
            currentCategory={category}
            currentSlug={slug}
          />

          {/* Content */}
          <article className="flex-1 min-w-0 max-w-[800px]">
            {/* Breadcrumb */}
            <GuideBreadcrumb
              category={category}
              guideTitle={guide.title}
              locale={locale}
            />

            {/* Header */}
            <header className="mt-6 mb-8 pb-6 border-b border-xborder">
              {/* Category badge */}
              {categoryInfo && (
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-icons text-[16px] text-xbrand"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    {categoryInfo.icon}
                  </span>
                  <span className="t-caption text-xbrand font-medium">
                    {categoryInfo.label}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="t-h1 text-xprimary mb-4">{guide.title}</h1>

              {/* Meta */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-xtertiary">
                  <span className="font-icons text-[16px]">schedule</span>
                  <span className="t-body3">{guide.readingTime} min read</span>
                </div>

                {guide.prerequisites && guide.prerequisites.length > 0 && (
                  <>
                    <span className="text-xtertiary opacity-50">|</span>
                    <div className="flex items-center gap-1.5 text-xtertiary">
                      <span className="font-icons text-[16px]">
                        checklist
                      </span>
                      <span className="t-body3">
                        {guide.prerequisites.length} prerequisite
                        {guide.prerequisites.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </header>

            {/* Prerequisites notice */}
            {guide.prerequisites && guide.prerequisites.length > 0 && (
              <div className="mb-8 p-4 rounded-xl bg-xcard border border-xborder">
                <div className="flex items-start gap-3">
                  <span className="font-icons text-[20px] text-xbrand mt-0.5">
                    info
                  </span>
                  <div>
                    <p className="t-body3 font-semibold text-xprimary mb-2">
                      Before you start
                    </p>
                    <p className="t-body3 text-xsecondary mb-2">
                      We recommend reading these guides first:
                    </p>
                    <ul className="flex flex-col gap-1">
                      {guide.prerequisites.map((prereqSlug) => {
                        const prereqGuide = localeGuides.find(
                          (g) => g.slug === prereqSlug
                        );
                        if (!prereqGuide) return null;
                        return (
                          <li key={prereqSlug}>
                            <Link
                              href={`/guides/${prereqGuide.category}/${prereqGuide.slug}`}
                              className="t-body3 text-xbrand hover:underline"
                            >
                              {prereqGuide.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Guide content */}
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />

            {/* Navigation */}
            <GuideNav previousGuide={previousGuide} nextGuide={nextGuide} />

            {/* Back to guides link */}
            <div className="mt-8 pt-6 border-t border-xborder">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 t-button text-xbrand hover:underline"
              >
                <span className="font-icons text-[18px]">arrow_back</span>
                Back to all guides
              </Link>
            </div>
          </article>
        </div>
      </section>

    </div>
  );
}
