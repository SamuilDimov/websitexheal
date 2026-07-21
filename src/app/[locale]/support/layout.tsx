import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/site";
import ClientMessagesProvider from "@/components/ClientMessagesProvider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    locale,
    path: "/support",
    title: t("support.title"),
    description: t("support.description"),
    translated: true,
  });
}

export default async function SupportLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ClientMessagesProvider locale={locale} namespaces={["Support"]}>
      {children}
    </ClientMessagesProvider>
  );
}
