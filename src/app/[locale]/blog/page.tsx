import { getTranslations, setRequestLocale } from "next-intl/server";
import { blogCategories, getBlogSummaries } from "@/data/blog-posts";
import BlogGrid from "@/components/blog/BlogGrid";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = getBlogSummaries(locale);
  const availableCategories = new Set(posts.map((post) => post.category));
  const categories = blogCategories
    .filter(({ slug }) => availableCategories.has(slug))
    .map(({ slug }) => ({
      slug,
      label: t(`categories.${slug}`),
    }));

  return (
    <>
      {/* Hero */}
      <section className="relative bg-xbg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-radial-glow" aria-hidden />
        <div className="relative w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-12 flex flex-col items-center gap-4 max-[991px]:px-8 max-[991px]:pt-[120px] max-[479px]:px-5">
          <h1 className="t-display1 text-xprimary text-center">
            {t("heroTitle")}
          </h1>
          <p className="t-body1 text-xsecondary text-center max-w-[600px]">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Category filter + Posts */}
      <section className="bg-xbg">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-12 flex flex-col gap-10 max-[991px]:px-8 max-[479px]:px-5">
          <BlogGrid
            posts={posts}
            categories={categories}
            labels={{
              allCategory: t("allCategory"),
              minRead: t("minRead"),
              noPosts: t("noPosts"),
            }}
          />
        </div>
      </section>
    </>
  );
}
