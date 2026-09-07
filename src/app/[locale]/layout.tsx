import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import { routing } from "@/i18n/routing";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MagneticHover from "@/components/ui/MagneticHover";
import PointerTilt from "@/components/ui/PointerTilt";
import ClientMessagesProvider from "@/components/ClientMessagesProvider";
import { buildMetadata } from "@/lib/site";

// Redesign phase 1: display weight is 600; 800 is no longer loaded.
// Cyrillic is required for the bg locale.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
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
    ...buildMetadata({
      locale,
      title: t("home.title"),
      description: t("home.description"),
      translated: true,
    }),
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
    <html
      lang={locale}
      className={manrope.variable}
      data-surface="light"
      data-scroll-behavior="smooth"
    >
      <head>
        {/*
          The hero's device cannot start loading until the lazy three.js chunk
          has parsed, so its model and screen are fetched here in parallel with
          the JavaScript instead of behind it.

          `crossorigin` is load-bearing. A preload is reused only if the
          eventual request agrees with it on mode and credentials, and
          anonymous means credentials mode *same-origin* — which is what both
          of three's loaders already use (`ImageLoader` sets the attribute on
          the element, `FileLoader` builds its Request with same-origin). The
          first attempt at this omitted `crossorigin` and Chrome downloaded
          both assets twice, reporting the mismatch in the console.
        */}
        <link rel="preload" href="/models/phone.glb" as="fetch" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/images/screens-hero.webp"
          as="image"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
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
        <MagneticHover />
        <PointerTilt />
        <ClientMessagesProvider
          locale={locale}
          namespaces={[
            "Navbar",
            "ProNavbar",
            "AudienceSwitch",
            "Footer",
            "Newsletter",
            "Closing",
            "Compliance",
          ]}
        >
          <div className="page-wrapper w-full relative overflow-x-clip">
            <Navbar />
            <main className="main-wrapper">{children}</main>
            <Footer />
          </div>
        </ClientMessagesProvider>
      </body>
    </html>
  );
}
