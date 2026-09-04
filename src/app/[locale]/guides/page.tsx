import { getTranslations } from "next-intl/server";
import {
  getCategoryLabel,
  getGuideCategories,
  getGuideNavigation,
  getGuidesByCategory,
} from "@/data/guides";
import { GuideCategoryCard, GuideListCard } from "@/components/guides/GuideCard";
import GuidesSidebar from "@/components/guides/GuidesSidebar";
import { Link } from "@/i18n/navigation";

import Icon from "@/components/ui/Icon";
import PageHeader from "@/components/ui/PageHeader";
export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides" });
  // Get first 4 guides from "getting-started" for featured section
  const gettingStartedGuides = getGuidesByCategory(
    "getting-started",
    locale
  ).slice(0, 4);
  const navigation = getGuideNavigation(locale);
  const categories = getGuideCategories(locale);

  return (
    <div className="bg-xbg min-h-screen">
      <PageHeader title={t("heading")} lead={t("subheading")} size="display2" />

      {/* Main content with sidebar */}
      <section className="x-container pb-20 pt-2">
        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar */}
          <GuidesSidebar
            navigation={navigation}
            allGuidesLabel={t("allGuides")}
            toggleNavigationLabel={t("toggleNavigation")}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Getting Started - Featured */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="t-h2 text-xprimary">
                  {getCategoryLabel("getting-started", locale)}
                </h2>
                <Link
                  href="/guides/getting-started/welcome"
                  className="t-button-sm text-xbrand hover:underline flex items-center gap-1"
                >
                  {t("viewAll")}
                  <Icon name="arrow_forward" size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gettingStartedGuides.map((guide) => (
                  <GuideListCard
                    key={guide.slug}
                    category={guide.category}
                    slug={guide.slug}
                    title={guide.title}
                    description={guide.description}
                    readingTime={guide.readingTime}
                    minReadLabel={t("minRead")}
                  />
                ))}
              </div>
            </div>

            {/* All Categories */}
            <div>
              <h2 className="t-h2 text-xprimary mb-6">{t("browseByTopic")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((category) => (
                  <GuideCategoryCard
                    key={category.slug}
                    category={category}
                    locale={locale}
                  />
                ))}
              </div>
            </div>

            {/* Help CTA */}
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-xbrand/10 to-transparent border border-xbrand/20">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-xbrand/20 flex items-center justify-center">
                  <Icon name="help" size={32} className="text-xbrand" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="t-h4 text-xprimary mb-2">
                    {t("helpHeading")}
                  </h3>
                  <p className="t-body2 text-xsecondary">{t("helpBody")}</p>
                </div>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center bg-xbrand text-white t-button-sm h-[44px] px-6 rounded-[10px] transition-all duration-200 hover:bg-[#5a73ff]"
                >
                  {t("helpCta")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
