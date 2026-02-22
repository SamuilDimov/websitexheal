"use client";

import { useState } from "react";
import { blogPosts, blogCategories, type BlogCategory } from "@/data/blog-posts";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">(
    "all"
  );

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featuredPost = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => p !== featuredPost);

  return (
    <>
      {/* Hero */}
      <section
        className="relative"
        style={{
          backgroundImage:
            "linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
        }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[3em] flex flex-col items-center gap-[16px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
          <h1 className="text-[4.5rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3.5rem] max-[479px]:text-[3rem]">
            Health intelligence starts here
          </h1>
          <p
            className="text-center max-w-[600px] leading-[1.5]"
            style={{ fontSize: "18px", color: "rgba(20, 25, 51, 0.6)" }}
          >
            Stories, research, and practical strategies for people who want to
            understand their health, not just track it.
          </p>
        </div>
      </section>

      {/* Category filter + Posts */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[3em] flex flex-col gap-[40px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
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
          <div className="grid grid-cols-3 gap-[20px] max-[991px]:grid-cols-2 max-[767px]:grid-cols-1">
            {(activeCategory === "all" ? regularPosts : filteredPosts).map(
              (post) => (
                <BlogCard key={post.slug} post={post} />
              )
            )}
          </div>

          {filteredPosts.length === 0 && (
            <p
              className="text-center text-xblack-70 py-[40px]"
              style={{ fontSize: "16px" }}
            >
              No posts in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
