"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getBlogPosts, type BlogCategory } from "@/data/blog-posts";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";

export default function BlogPage() {
  const t = useTranslations("Blog");
  const locale = useLocale();
  const posts = getBlogPosts(locale);
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">(
    "all"
  );

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featuredPost = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => p !== featuredPost);

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
          {/* Category Filter */}
          <CategoryFilter
            onCategoryChange={setActiveCategory}
            activeCategory={activeCategory}
          />

          {/* Featured post */}
          {featuredPost && activeCategory === "all" && (
            <div className="grid grid-cols-1">
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          {/* Post grid */}
          <div className="grid grid-cols-3 gap-5 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1">
            {(activeCategory === "all" ? regularPosts : filteredPosts).map(
              (post) => (
                <BlogCard key={post.slug} post={post} />
              )
            )}
          </div>

          {filteredPosts.length === 0 && (
            <p className="t-body1 text-xtertiary text-center py-10">
              {t("noPosts")}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
