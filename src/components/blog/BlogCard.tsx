"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { BlogCategory, BlogSummary } from "@/types/content";

interface BlogCardProps {
  post: BlogSummary;
  featured?: boolean;
  clinical?: boolean;
  categoryLabels: Record<BlogCategory, string>;
  minReadLabel: string;
}

export default function BlogCard({
  post,
  featured,
  clinical,
  categoryLabels,
  minReadLabel,
}: BlogCardProps) {
  const card = (
    <Link
      href={`/blog/${post.slug}`}
      className={`surface-card-feature flex flex-col overflow-hidden no-underline ${clinical ? "blog-card-clinical relative h-full" : ""} ${
        featured && !clinical ? "col-span-full max-[767px]:col-span-1" : ""
      }`}
    >
      {clinical && (
        <>
          <span className="blog-card-clinical-scan" aria-hidden="true" />
          <span
            className="blog-card-clinical-node absolute top-4 right-4 z-20 w-2 h-2 bg-xbrand rounded-full ring-2 ring-xbg"
            aria-hidden="true"
          />
        </>
      )}

      {/* Cover image */}
      <div className="overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          width={featured ? 1200 : 600}
          height={featured ? 500 : 400}
          className={`w-full object-cover ${
            featured ? "h-[24rem] max-[767px]:h-[16rem]" : "h-[18rem]"
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        {/* Category + Reading time */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="badge badge-new">
            {categoryLabels[post.category]}
          </span>
          <span className="t-body3 text-xtertiary">
            {post.readingTime} {minReadLabel}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-xprimary font-bold leading-[1.2] tracking-[-0.5px] ${
            featured
              ? "text-[32px] max-[991px]:text-[24px]"
              : "text-[22px] max-[991px]:text-[20px]"
          }`}
        >
          {post.title}
        </h3>

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
          <span className="text-xtertiary">&middot;</span>
          <span className="t-body3 text-xtertiary">{post.date}</span>
        </div>
      </div>
    </Link>
  );

  if (!clinical) return card;

  return (
    <article
      className={`blog-card-clinical-entry h-full ${featured ? "col-span-full max-[767px]:col-span-1" : ""}`}
    >
      {card}
    </article>
  );
}
