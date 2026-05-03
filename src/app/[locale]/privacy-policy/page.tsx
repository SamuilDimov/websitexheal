import { getLocale } from "next-intl/server";
import { getLegalContent } from "@/data/legal-content";

export async function generateMetadata() {
  const locale = await getLocale();
  const legal = getLegalContent(locale);
  return { title: legal.privacyPolicy.metaTitle };
}

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const legal = getLegalContent(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-xbg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-radial-glow" aria-hidden />
        <div className="relative w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-16 flex flex-col items-center gap-10 max-[991px]:px-8 max-[991px]:pt-[120px] max-[479px]:px-5">
          <h1 className="t-display1 text-xprimary text-center">
            {legal.privacyPolicy.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-xbg">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-10 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
          <div
            className="rich-text w-full max-w-[800px]"
            dangerouslySetInnerHTML={{ __html: legal.privacyPolicy.content }}
          />
        </div>
      </section>
    </>
  );
}
