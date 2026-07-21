import { getLocale, getTranslations } from "next-intl/server";
import { getRelatedPosts } from "@/data/blog-posts";
import BlogCard from "./BlogCard";
import type { BlogCategory, BlogSummary } from "@/types/content";

interface RelatedPostsProps {
  currentSlug: string;
}

export default async function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const [t, locale] = await Promise.all([
    getTranslations("Blog"),
    getLocale(),
  ]);
  const related: BlogSummary[] = getRelatedPosts(currentSlug, 3, locale).map(
    ({ slug, title, date, excerpt, image, category, author, readingTime, featured }) => ({
      slug,
      title,
      date,
      excerpt,
      image,
      category,
      author: { name: author.name, image: author.image },
      readingTime,
      featured,
    })
  );
  if (related.length === 0) return null;

  const categoryLabels = Object.fromEntries(
    [...new Set(related.map((post) => post.category))].map((category) => [
      category,
      t(`categories.${category}`),
    ])
  ) as Record<BlogCategory, string>;

  return (
    <div className="mt-16 pt-10 border-t border-xborder">
      <h2 className="t-h2 text-xprimary mb-6">{t("keepReading")}</h2>
      <div className="grid grid-cols-3 gap-5 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1">
        {related.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            categoryLabels={categoryLabels}
            minReadLabel={t("minRead")}
          />
        ))}
      </div>
    </div>
  );
}
