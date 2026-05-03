import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../[locale]/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

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
    <html lang="en" className={manrope.variable}>
      <body className="bg-xbg text-xprimary antialiased" style={{ width: "100%", overflowX: "hidden" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
