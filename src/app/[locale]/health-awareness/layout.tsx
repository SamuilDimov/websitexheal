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
    path: "/health-awareness",
    title: `${t("feature3Title")} | xHeal`,
    description: t("feature3Description"),
    image: featureVisuals["health-awareness"].images[0].src,
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
        "Feature_HealthAwareness",
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
