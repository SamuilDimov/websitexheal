"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import CategoryFilter from "./CategoryFilter";
import type { BlogCategory, BlogSummary } from "@/types/content";

interface BlogGridProps {
  posts: BlogSummary[];
  categories: Array<{ slug: BlogCategory; label: string }>;
  labels: {
    allCategory: string;
    minRead: string;
    noPosts: string;
  };
}

export default function BlogGrid({ posts, categories, labels }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">(
    "all"
  );
  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);
  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => post !== featuredPost);
  const categoryLabels = Object.fromEntries(
    categories.map(({ slug, label }) => [slug, label])
  ) as Record<BlogCategory, string>;

  return (
    <>
      <CategoryFilter
        categories={categories}
        allLabel={labels.allCategory}
        onCategoryChange={setActiveCategory}
        activeCategory={activeCategory}
      />

      {featuredPost && activeCategory === "all" && (
        <div className="grid grid-cols-1">
          <BlogCard
            post={featuredPost}
            categoryLabels={categoryLabels}
            minReadLabel={labels.minRead}
            featured
            clinical
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-5 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1">
        {(activeCategory === "all" ? regularPosts : filteredPosts).map(
          (post) => (
            <BlogCard
              key={post.slug}
              post={post}
              categoryLabels={categoryLabels}
              minReadLabel={labels.minRead}
              clinical
            />
          )
        )}
      </div>

      {filteredPosts.length === 0 && (
        <p className="t-body1 text-xtertiary text-center py-10">
          {labels.noPosts}
        </p>
      )}
    </>
  );
}
