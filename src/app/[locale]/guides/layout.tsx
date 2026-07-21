import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale,
    path: "/guides",
    title: "Guides | xHeal",
    description:
      "Learn how to use xHeal with step-by-step tutorials, feature guides, and tips for getting the most out of your personal health companion.",
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
