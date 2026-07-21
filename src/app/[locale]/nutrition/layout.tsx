import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/site";
import ClientMessagesProvider from "@/components/ClientMessagesProvider";
import { featureVisuals } from "@/data/feature-visuals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WhatYouGet" });

  return buildMetadata({
    locale,
    path: "/nutrition",
    title: `${t("nutritionTitle")} | xHeal`,
    description: t("nutritionDescription"),
    image: featureVisuals.nutrition.images[0].src,
    translated: true,
  });
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ClientMessagesProvider
      locale={locale}
      namespaces={[
        "Feature_Nutrition",
        "WhatYouGet",
        "FeatureLanding",
        "CrossLinks",
        "MedicalStandards",
        "Compliance",
      ]}
    >
      {children}
    </ClientMessagesProvider>
  );
}
