import { getTranslations } from "next-intl/server";
import { getLegalContent } from "@/data/legal-content";
import { buildMetadata } from "@/lib/site";

import PageHeader from "@/components/ui/PageHeader";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const legal = getLegalContent(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return buildMetadata({
    locale,
    path: "/cookie-policy",
    title: legal.cookiePolicy.metaTitle,
    description: t("cookiePolicy.description"),
    translated: true,
  });
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const legal = getLegalContent(locale);

  return (
    <>
      <PageHeader title={legal.cookiePolicy.title} />

      {/* Content */}
      <section className="bg-xbg">
        <div className="x-container pb-24 pt-2">
          <div
            className="rich-text w-full max-w-[72ch]"
            dangerouslySetInnerHTML={{ __html: legal.cookiePolicy.content }}
          />
        </div>
      </section>
    </>
  );
}
