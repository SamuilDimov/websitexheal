import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides" });

  return buildMetadata({
    locale,
    path: "/guides",
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots:
      locale === "bg"
        ? {
            index: false,
            follow: true,
          }
        : undefined,
  });
}

export default function GuidesLayout({ children }: Props) {
  return <>{children}</>;
}
