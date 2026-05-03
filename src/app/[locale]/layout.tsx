import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://xheal.com"),
    title: t("home.title"),
    description: t("home.description"),
    openGraph: {
      title: t("home.title"),
      description: t("home.description"),
      type: "website",
    },
    twitter: {
      title: t("home.title"),
      description: t("home.description"),
      card: "summary_large_image",
    },
    icons: {
      icon: "/favicon.png",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} className={manrope.variable}>
      <head>
        {/*
          One-time cleanup of legacy cookie-consent storage from the old
          deploy. The site is now cookieless and no longer reads or writes
          these keys; this purges them on first visit so returning users
          aren't left with stale data. Safe to remove after a few months.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                localStorage.removeItem('xheal_cookie_consent');
                document.cookie = 'xheal_consent=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-xbg text-xprimary antialiased">
        <NextIntlClientProvider>
          <div className="page-wrapper w-full relative overflow-hidden">
            <Navbar />
            <main className="main-wrapper">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
