import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides | xHeal",
  description:
    "Learn how to use xHeal with step-by-step tutorials, feature guides, and tips for getting the most out of your personal health companion.",
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
