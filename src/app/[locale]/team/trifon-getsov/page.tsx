import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/data/blog-posts";
import { buildMetadata } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale,
    path: "/team/trifon-getsov",
    title: "Trifon Getsov — Author & Co-founder | xHeal",
    description:
      "CEO & Co-founder of xHeal. After a 4-year personal health crisis, Trifon built xHeal to help people understand their health data before symptoms appear. xHeal AI validated against 5,000+ patients.",
    image: "/images/trifon.png",
    robots:
      locale === "bg"
        ? {
            index: false,
            follow: true,
          }
        : undefined,
  });
}

export default async function TrifonBioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = getBlogPosts(locale);
  const trifonPosts = posts.filter(
    (p) =>
      p.author.name === "Trifon Getsov" &&
      !p.slug.includes("newsletter")
  );

  return (
    <>
      {/* Hero */}
      <section className="relative bg-xbg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-radial-glow" aria-hidden />
        <div className="relative w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-16 flex flex-col items-center gap-5 max-[991px]:px-8 max-[991px]:pt-[120px] max-[479px]:px-5">
          <Image
            src="/images/trifon.png"
            alt="Trifon Getsov"
            width={120}
            height={120}
            className="rounded-full object-cover ring-2 ring-xborder-medium"
            style={{ width: 120, height: 120 }}
          />
          <h1 className="t-display1 text-xprimary text-center">Trifon Getsov</h1>
          <p className="t-h4 text-xbrand">CEO &amp; Co-founder, xHeal</p>
        </div>
      </section>

      {/* Bio content */}
      <section className="bg-xbg">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
          <div className="max-w-[800px] mx-auto w-full flex flex-col gap-12">
            {/* About */}
            <div className="flex flex-col gap-5">
              <h2 className="t-h1 text-xprimary">About Trifon</h2>
              <p className="t-body1 text-xsecondary">
                Trifon Getsov is CEO and Co-founder of xHeal, a health intelligence platform that connects wearable data, lab results, and symptom patterns to detect health issues before symptoms appear. He brings experience as a 3x CEO across biotechnology, software, and product development.
              </p>
              <p className="t-body1 text-xsecondary">
                In 2019, at age 27, Trifon experienced recurring prostatitis that resisted nine rounds of antibiotics and left his immune system severely compromised. After visiting specialists in Bulgaria and abroad without identifying a root cause, he spent four years investigating his own health data. He eventually identified gut dysbiosis driving chronic inflammation as the underlying issue — a finding that would have been visible much earlier with the right data connections.
              </p>
              <p className="t-body1 text-xsecondary">
                That experience became the founding insight behind xHeal. During beta testing, xHeal&apos;s predictive engine detected elevated HOMA-IR (early-stage insulin resistance) in Trifon before he had any symptoms — the kind of early warning that standard annual bloodwork would have missed entirely. xHeal&apos;s AI has since been validated against more than 5,000 patient records.
              </p>
            </div>

            {/* Credentials */}
            <div className="surface-card-feature p-7 flex flex-col gap-4">
              <h3 className="t-h4 text-xprimary">Credentials &amp; Experience</h3>
              <ul className="flex flex-col gap-3">
                {[
                  "CEO & Co-founder, xHeal",
                  "3x CEO — biotechnology and product development",
                  "4-year personal chronic illness recovery: identified gut dysbiosis as root cause after 9 rounds of antibiotics failed",
                  "xHeal AI validated against 5,000+ patient records",
                  "Personal case study: early insulin resistance detected by xHeal before symptoms appeared",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 t-body2 text-xsecondary">
                    <span className="text-xsuccess mt-0.5 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medical review */}
            <div className="p-5 rounded-[16px] bg-xbg-3 border border-xborder">
              <p className="t-body3 text-xsecondary">
                All health content authored by Trifon Getsov on the xHeal blog is medically reviewed by{" "}
                <strong className="text-xprimary">Dr. Rayna Mihaylova, MD</strong> before publication, in line with E-E-A-T guidelines for health and medical content.
              </p>
            </div>

            {/* Published articles */}
            {trifonPosts.length > 0 && (
              <div className="flex flex-col gap-6">
                <h2 className="t-h1 text-xprimary">Published Articles</h2>
                <div className="flex flex-col gap-3">
                  {trifonPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="flex flex-col gap-1 p-5 rounded-[16px] border border-xborder bg-xcard hover:border-xborder-medium transition-colors duration-200 group"
                    >
                      <span className="t-h6 text-xprimary group-hover:text-xbrand transition-colors duration-200">
                        {post.title}
                      </span>
                      <span className="t-caption text-xtertiary">
                        {post.date} · {post.readingTime} min read
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/blog"
              className="t-button text-xbrand hover:underline"
            >
              &larr; Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
