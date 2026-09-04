"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { BlogCategory, BlogSummary } from "@/types/content";

interface BlogCardProps {
  post: BlogSummary;
  featured?: boolean;
  categoryLabels: Record<BlogCategory, string>;
  minReadLabel: string;
}

export default function BlogCard({
  post,
  featured,
  categoryLabels,
  minReadLabel,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`surface-card-feature group flex h-full flex-col overflow-hidden no-underline ${
        featured ? "col-span-full md:grid md:grid-cols-2 max-[767px]:col-span-1" : ""
      }`}
    >

      {/* Cover image */}
      <div className="overflow-hidden bg-xbg-2">
        <Image
          src={post.image}
          alt=""
          width={featured ? 1200 : 600}
          height={featured ? 500 : 400}
          className={`w-full object-cover ${
            featured ? "h-full min-h-[16rem] md:min-h-[24rem]" : "aspect-[3/2] h-auto"
          }`}
        />
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col gap-3 p-6 ${featured ? "md:justify-center md:p-10" : ""}`}>
        {/* Category + reading time, in the site's mono data voice */}
        <div className="t-data flex flex-wrap items-center gap-x-3 text-xtertiary">
          <span className="text-xbrand">{categoryLabels[post.category]}</span>
          <span>
            {post.readingTime} {minReadLabel}
          </span>
        </div>

        {/* Title */}
        <h2 className={`text-xprimary ${featured ? "t-h2 max-w-[22ch]" : "t-h4"}`}>{post.title}</h2>

        {/* Excerpt */}
        <p className="t-body2 text-xsecondary flex-1">{post.excerpt}</p>

        {/* Date + Author */}
        <div className="flex items-center gap-2.5 pt-3 mt-1 border-t border-xborder">
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={28}
            height={28}
            className="rounded-full object-cover ring-1 ring-xborder"
            style={{ width: 28, height: 28 }}
          />
          <span className="t-body3 text-xsecondary">{post.author.name}</span>
          {/* The dot between these two is gone, so the space has to do the
              separating; the row's 2.5 gap is enough for avatar-to-name but
              reads as one phrase between name and date. */}
          <span className="t-body3 text-xtertiary ms-1.5">{post.date}</span>
        </div>
      </div>
    </Link>
  );
}
