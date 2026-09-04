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
    path: "/privacy-policy",
    title: legal.privacyPolicy.metaTitle,
    description: t("privacyPolicy.description"),
    translated: true,
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const legal = getLegalContent(locale);
  const tLegal = await getTranslations({ locale, namespace: "Legal" });

  return (
    <>
      <PageHeader eyebrow={tLegal("eyebrow")} title={legal.privacyPolicy.title} />

      {/* Content */}
      <section className="bg-xbg">
        <div className="x-container pb-24 pt-2">
          <div
            className="rich-text w-full max-w-[72ch]"
            dangerouslySetInnerHTML={{ __html: legal.privacyPolicy.content }}
          />
        </div>
      </section>
    </>
  );
}
