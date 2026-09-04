import { getTranslations, setRequestLocale } from "next-intl/server";
import { blogCategories, getBlogSummaries } from "@/data/blog-posts";
import BlogGrid from "@/components/blog/BlogGrid";

import PageHeader from "@/components/ui/PageHeader";
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
      <PageHeader eyebrow={t("eyebrow")} title={t("heroTitle")} lead={t("heroSubtitle")} />

      {/* Category filter + Posts */}
      <section className="bg-xbg">
        <div className="x-container flex flex-col gap-10 pb-20 pt-4">
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
