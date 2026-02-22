import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "xHeal Blog: Health Intelligence, Not Just Health Tracking",
  description:
    "Stories, research, and practical strategies for chronic condition management, fitness, wellness, lab results, and smarter doctor visits.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
