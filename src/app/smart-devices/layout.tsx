import type { Metadata } from "next";
import "../[locale]/globals.css";

export const metadata: Metadata = {
  title: "xHeal Band — Pre-Order | xHeal",
  description:
    "Be first in line for the xHeal Band — the wearable built for people who take their health seriously. Reserve yours today.",
  openGraph: {
    title: "xHeal Band — Pre-Order",
    description:
      "Be first in line for the xHeal Band. Reserve yours today.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function SmartDevicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ width: "100%", overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
