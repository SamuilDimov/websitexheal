import {
  guideCategories,
  getGuideNavigation,
  getGuidesByCategory,
} from "@/data/guides";
import { GuideCategoryCard, GuideListCard } from "@/components/guides/GuideCard";
import GuidesSidebar from "@/components/guides/GuidesSidebar";
import { Link } from "@/i18n/navigation";

export default function GuidesPage() {
  // Get first 4 guides from "getting-started" for featured section
  const gettingStartedGuides = getGuidesByCategory("getting-started").slice(0, 4);
  const navigation = getGuideNavigation();

  return (
    <div className="bg-xbg min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-radial-glow" aria-hidden />
        <div className="relative w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-12 flex flex-col items-center gap-4 max-[991px]:px-8 max-[991px]:pt-[120px] max-[479px]:px-5">
          <h1 className="t-display2 text-xprimary text-center">
            User Guides
          </h1>
          <p className="t-body1 text-xsecondary text-center max-w-[600px]">
            Step-by-step tutorials and guides to help you get the most out of xHeal.
          </p>
        </div>
      </section>

      {/* Main content with sidebar */}
      <section className="w-full max-w-[1440px] mx-auto px-10 py-12 max-[991px]:px-8 max-[479px]:px-5">
        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar */}
          <GuidesSidebar navigation={navigation} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Getting Started - Featured */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="t-h2 text-xprimary">Getting Started</h2>
                <Link
                  href="/guides/getting-started/welcome"
                  className="t-button-sm text-xbrand hover:underline flex items-center gap-1"
                >
                  View all
                  <span className="font-icons text-[16px]">arrow_forward</span>
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
                  />
                ))}
              </div>
            </div>

            {/* All Categories */}
            <div>
              <h2 className="t-h2 text-xprimary mb-6">Browse by Topic</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {guideCategories.map((category) => (
                  <GuideCategoryCard key={category.slug} category={category} />
                ))}
              </div>
            </div>

            {/* Help CTA */}
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-xbrand/10 to-transparent border border-xbrand/20">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-xbrand/20 flex items-center justify-center">
                  <span className="font-icons text-[32px] text-xbrand">
                    help
                  </span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="t-h4 text-xprimary mb-2">
                    Can&apos;t find what you&apos;re looking for?
                  </h3>
                  <p className="t-body2 text-xsecondary">
                    Check out our FAQ or reach out to our support team for help.
                  </p>
                </div>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center bg-xbrand text-white t-button-sm h-[44px] px-6 rounded-[10px] transition-all duration-200 hover:bg-[#5a73ff] hover:shadow-[0_8px_24px_rgba(71,100,255,0.4)]"
                >
                  Visit Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
