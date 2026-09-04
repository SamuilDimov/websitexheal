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
    path: "/terms-conditions",
    title: legal.termsConditions.metaTitle,
    description: t("termsConditions.description"),
    // The Bulgarian page is a summary pointing to the English legal text.
    translated: false,
  });
}

export default async function TermsConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const legal = getLegalContent(locale);
  const tLegal = await getTranslations({ locale, namespace: "Legal" });

  return (
    <>
      <PageHeader eyebrow={tLegal("eyebrow")} title={legal.termsConditions.title} />

      {/* Content */}
      <section className="bg-xbg">
        <div className="x-container pb-24 pt-2">
          <div
            className="rich-text w-full max-w-[72ch]"
            dangerouslySetInnerHTML={{ __html: legal.termsConditions.content }}
          />
        </div>
      </section>
    </>
  );
}
