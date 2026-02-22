import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel, type BlogPost } from "@/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] flex flex-col shadow-[0_4px_4px_#1419330d] transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_12px_24px_#1419331a] overflow-hidden ${
        featured ? "col-span-full max-[767px]:col-span-1" : ""
      }`}
    >
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
      <div className="flex flex-col gap-[12px] p-[20px] flex-1">
        {/* Category + Reading time */}
        <div className="flex items-center gap-[10px] flex-wrap">
          <span
            className="px-[10px] py-[4px] rounded-full bg-xdark-blue/10 text-xdark-blue"
            style={{ fontSize: "12px", fontWeight: 500 }}
          >
            {getCategoryLabel(post.category)}
          </span>
          <span className="text-xblack-70" style={{ fontSize: "13px" }}>
            {post.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-medium leading-[1.15] tracking-[-0.02em] ${
            featured
              ? "text-[2rem] max-[991px]:text-[1.5rem]"
              : "text-[1.5rem] max-[991px]:text-[1.25rem]"
          }`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="text-xblack-70 leading-[1.5] flex-1"
          style={{ fontSize: "15px" }}
        >
          {post.excerpt}
        </p>

        {/* Date + Author */}
        <div className="flex items-center gap-[10px] pt-[8px] border-t border-xlight-blue-low/50">
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={28}
            height={28}
            className="rounded-full object-cover"
            style={{ width: 28, height: 28 }}
          />
          <span className="text-xblack-70" style={{ fontSize: "13px" }}>
            {post.author.name}
          </span>
          <span className="text-xblack-70/50">·</span>
          <span className="text-xblack-70" style={{ fontSize: "13px" }}>
            {post.date}
          </span>
        </div>
      </div>
    </Link>
  );
}
