"use client";

import { useState } from "react";
import { blogCategories, type BlogCategory } from "@/data/blog-posts";

interface CategoryFilterProps {
  onCategoryChange: (category: BlogCategory | "all") => void;
  activeCategory: BlogCategory | "all";
}

export default function CategoryFilter({
  onCategoryChange,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-[8px] justify-center">
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-[16px] py-[8px] rounded-full transition-all duration-200 ${
          activeCategory === "all"
            ? "bg-xdark-blue text-xwhite"
            : "bg-xwhite text-xblack border border-xlight-blue-low hover:border-xdark-blue"
        }`}
        style={{ fontSize: "14px" }}
      >
        All
      </button>
      {blogCategories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onCategoryChange(cat.slug)}
          className={`px-[16px] py-[8px] rounded-full transition-all duration-200 ${
            activeCategory === cat.slug
              ? "bg-xdark-blue text-xwhite"
              : "bg-xwhite text-xblack border border-xlight-blue-low hover:border-xdark-blue"
          }`}
          style={{ fontSize: "14px" }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
