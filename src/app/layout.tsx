import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsentProvider from "@/components/CookieConsentProvider";

export const metadata: Metadata = {
  title: "xHeal | Welcome to 360° Healthcare",
  description:
    "Bring together disparate data from wearables, health app, dietary info and medical reports in one easy-to-use platform.",
  openGraph: {
    title: "xHeal | Welcome to 360° Healthcare",
    description:
      "Bring together disparate data from wearables, health app, dietary info and medical reports in one easy-to-use platform.",
    type: "website",
  },
  twitter: {
    title: "xHeal | Welcome to 360° Healthcare",
    description:
      "Bring together disparate data from wearables, health app, dietary info and medical reports in one easy-to-use platform.",
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page-wrapper w-full text-[1em] relative overflow-hidden">
          <Navbar />
          <main className="main-wrapper">{children}</main>
          <Footer />
        </div>
        <CookieConsentProvider />
      </body>
    </html>
  );
}
