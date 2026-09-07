import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/site";
import ClientMessagesProvider from "@/components/ClientMessagesProvider";
import ProHero from "@/components/professionals/ProHero";
import ProBuiltFor from "@/components/professionals/ProBuiltFor";
import ProBridge from "@/components/professionals/ProBridge";
import ProStack from "@/components/professionals/ProStack";
import ProAnalytics from "@/components/professionals/ProAnalytics";
import ProConsent from "@/components/professionals/ProConsent";
import ProCompare from "@/components/professionals/ProCompare";
import ProFaq from "@/components/professionals/ProFaq";
import ProClosing from "@/components/professionals/ProClosing";

/**
 * The professional view.
 *
 * The same company from the buying side: the consumer site sells the app a
 * person keeps, this page sells the workspace a practice works in. It is one
 * page, not a section, and the switch in the nav is the seam between the two.
 *
 * `data-surface="dark"` flips the whole page onto the v2 dark token set. The
 * consumer redesign is a light site with one dark chapter; this is its
 * mirror, and it also means the Provider Workspace screenshots sit on their
 * own ground instead of floating on lavender.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pro" });

  return buildMetadata({
    locale,
    path: "/professionals",
    title: t("metaTitle"),
    description: t("metaDescription"),
    translated: true,
  });
}

export default async function ProfessionalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pro" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "xHeal Provider Workspace",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: t("metaDescription"),
    inLanguage: locale,
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Clinics, practitioners and wellness studios",
    },
    image: "/images/provider-workspace.webp",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* The hero's laptop cannot start loading until the lazy three.js chunk
          has parsed, so the model is fetched here in parallel with the
          JavaScript instead of behind it. Route-scoped rather than in the
          layout: no other page has a laptop on it.

          `crossOrigin` is load-bearing and must match what three's FileLoader
          asks for — see the same note in `[locale]/layout.tsx`, where the
          first attempt without it downloaded the phone twice. */}
      <link
        rel="preload"
        href="/models/laptop.glb"
        as="fetch"
        crossOrigin="anonymous"
      />
      {/* `<html>` is `data-surface="light"` for the site as a whole, and an
          overscroll bounce paints the document ground, not the page. This
          route is dark end to end, so it repaints that ground for as long as
          it is mounted. Server-rendered, so there is no flash. */}
      <style>{`html[data-surface="light"]{background-color:#000e1b;}`}</style>
      <div data-surface="dark" className="pro-view relative isolate bg-xbg">
        <ProHero />
        <ProBuiltFor />
        <ProBridge />
        <ProStack />
        <ProAnalytics />
        <ProConsent />
        <ProCompare />
        <ProFaq />
        <ClientMessagesProvider locale={locale} namespaces={["Pro"]}>
          <ProClosing />
        </ClientMessagesProvider>
      </div>
    </>
  );
}
