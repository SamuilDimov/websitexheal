import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Blog post data (in production this would come from MDX files or a CMS)
const blogPosts: Record<
  string,
  {
    title: string;
    date: string;
    image: string;
    author: { name: string; image: string };
    content: string;
  }
> = {
  "2026-02-15-flareup-awareness-10-helpful-updates-for-daytoday-health": {
    title: "Flare-up Awareness: 10 Helpful Updates for Day-to-Day Health",
    date: "Feb 15, 2026",
    image: "/images/blog-default-cover.avif",
    author: { name: "xHeal Team", image: "/images/testimonial-kris.jpeg" },
    content: `<p>Staying on top of your health means being aware of the latest developments that could affect your day-to-day wellbeing. Here are ten practical updates to help you spot, prevent, and manage health flare-ups.</p>
    <h2>1. Wearable Signals Can Predict Flare-Ups Earlier</h2>
    <p>Recent studies show that subtle changes in heart rate variability (HRV), skin temperature, and sleep patterns detected by wearables can signal an approaching flare-up 24-48 hours before symptoms appear. This is exactly the kind of pattern detection xHeal specializes in.</p>
    <h2>2. Gut Health Remains Central</h2>
    <p>New research continues to confirm the gut-inflammation connection. Maintaining microbiome diversity through varied fiber intake and fermented foods remains one of the most effective preventive strategies.</p>
    <h2>3. Stress Management Is Non-Negotiable</h2>
    <p>Chronic stress elevates cortisol, which directly triggers inflammatory cascades. Even 10 minutes of daily breathwork or meditation has been shown to reduce flare-up frequency by up to 30%.</p>
    <h2>4. Sleep Quality Over Quantity</h2>
    <p>It's not just about getting 8 hours. Sleep efficiency - the percentage of time in bed actually spent sleeping - is a stronger predictor of next-day symptoms than total sleep time.</p>
    <h2>5. Seasonal Patterns Matter</h2>
    <p>Many chronic conditions show seasonal variation. Tracking your symptoms alongside environmental factors helps identify these patterns and prepare accordingly.</p>`,
  },
  "case-study-how-xheal-helped-me-reduce-early-insulin-resistance": {
    title: "How xHeal Helped Me Reduce Early Insulin Resistance",
    date: "Nov 02, 2025",
    image: "/images/blog-insulin-resistance.jpg",
    author: { name: "Trifon Getsov", image: "/images/trifon.png" },
    content: `<p>xHeal helped me lower my HOMA-IR from 3.83 to 2.0 using simple personalized daily routines before it became a real problem.</p>
    <h2>The Discovery</h2>
    <p>During beta testing of xHeal, the AI suggested I check my HOMA-IR levels. I had no symptoms, no reason to suspect anything was wrong. But the data patterns xHeal was seeing in my vitals told a different story.</p>
    <h2>The Results</h2>
    <p>My HOMA-IR came back at 3.83 - elevated, indicating early-stage insulin resistance. This was a wake-up call. Without xHeal's pattern detection, I might not have caught this for years.</p>
    <h2>The Plan</h2>
    <p>xHeal created a personalized routine focused on three areas: nutrition timing, specific exercise types, and stress management. Small, daily actions that fit into my existing life.</p>
    <h2>The Outcome</h2>
    <p>Within 12 weeks, my HOMA-IR dropped to 2.0 - well within the healthy range. No medication needed. Just informed action based on data-driven insights.</p>`,
  },
  "how-xheal-improved-my-health-awareness-and-guided-me-to-the-right-lab-tests":
    {
      title:
        "How xHeal Improved My Health Awareness and Guided Me to the Right Lab Tests",
      date: "Nov 02, 2025",
      image: "/images/blog-health-awareness.jpg",
      author: { name: "Trifon Getsov", image: "/images/trifon.png" },
      content: `<p>xHeal taught me exactly which labs matter, helping me understand my health better and make smarter decisions early.</p>
      <h2>Beyond Standard Panels</h2>
      <p>Most routine bloodwork covers the basics, but misses important markers. xHeal analyzed my symptoms, lifestyle data, and vitals to recommend specific tests that my care team hadn't considered.</p>
      <h2>Connecting the Dots</h2>
      <p>What made the difference was seeing how different markers related to each other. xHeal didn't just show me numbers - it showed me the story behind them.</p>`,
    },
};

// Fallback for posts without detailed content
const defaultContent = `<p>This article is part of our ongoing series on health awareness and flare-up prevention. Check back soon for the full article.</p>
<p>In the meantime, download xHeal to start tracking your health patterns and receive personalized insights.</p>`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  return {
    title: post?.title || "Blog Post | xHeal",
    description: post
      ? `Read "${post.title}" on the xHeal blog.`
      : "xHeal blog post",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    // Generic fallback for posts we haven't fully written yet
    return (
      <>
        <section
          className="relative"
          style={{
            backgroundImage:
              "linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
          }}
        >
          <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[5em] flex flex-col items-center gap-[40px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
            <h1 className="text-[4.5rem] font-medium leading-[1] tracking-[-0.04em] text-center max-w-[18ch] max-[991px]:text-[3.5rem] max-[767px]:text-[3.5rem] max-[479px]:text-[3rem]">
              Blog Post
            </h1>
          </div>
        </section>
        <section>
          <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[40px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
            <div className="blog-heading flex flex-col gap-[20px] max-w-[800px] mx-auto">
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: defaultContent }}
              />
              <Link
                href="/blog"
                className="text-xdark-blue hover:underline text-[1.125rem]"
              >
                &larr; Back to Blog
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

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
        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[5em] flex flex-col items-center gap-[40px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
          <h1 className="text-[4.5rem] font-medium leading-[1] tracking-[-0.04em] text-center max-w-[18ch] max-[991px]:text-[3.5rem] max-[767px]:text-[3.5rem] max-[479px]:text-[3rem]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[40px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="blog-heading flex flex-col gap-[20px] max-w-[800px] mx-auto w-full">
            {/* Cover image */}
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full object-cover rounded-[16px] max-h-[40rem]"
            />

            {/* Date */}
            <div className="flex items-center gap-[6px]">
              <span className="font-icons text-xblack-70">calendar_today</span>
              <span className="text-xblack-70 text-[1rem]">{post.date}</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-[10px]">
              <div className="w-[48px] h-[48px] rounded-full overflow-clip">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={90}
                  height={90}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="text-[1rem] font-medium">
                {post.author.name}
              </span>
            </div>

            {/* Article content */}
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back link */}
            <Link
              href="/blog"
              className="text-xdark-blue hover:underline text-[1.125rem] mt-[40px]"
            >
              &larr; Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
