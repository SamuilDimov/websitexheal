"use client";

import { useTranslations, useLocale } from "next-intl";
import { getRelatedPosts } from "@/data/blog-posts";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
  currentSlug: string;
}

export default function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const t = useTranslations("Blog");
  const locale = useLocale();
  const related = getRelatedPosts(currentSlug, 3, locale);
  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-xborder">
      <h2 className="t-h2 text-xprimary mb-6">{t("keepReading")}</h2>
      <div className="grid grid-cols-3 gap-5 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1">
        {related.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
