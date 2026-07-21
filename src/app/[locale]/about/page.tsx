import { use } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/site";
import DnaTimeline from "@/components/about/DnaTimeline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    locale,
    path: "/about",
    title: t("about.title"),
    description: t("about.description"),
    translated: true,
  });
}

const timelineKeys = [
  "event1", "event3", "eventPersonalTrainer", "eventWellnessClinics", "event4", "event5", "eventDoctorPilots", "event6", "event7",
  "event8", "event9", "event10", "event11", "event12", "event13", "event14",
  "event15", "event16", "event17", "event18", "event19", "event20",
] as const;

const teamKeys = [
  { key: "trifon" as const, image: "/images/trifon.png" },
  { key: "kristiyan" as const, image: "/images/kristiyan.png" },
  { key: "kalin" as const, image: "/images/kalin.png" },
  { key: "nikolayK" as const, image: "/images/nikolay-k.png" },
];

const advisorKeys = [
  { key: "rayna" as const, image: "/images/rayna.jpg" },
  { key: "nikolayM" as const, image: "/images/nikolay-m.png" },
];

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("About");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-xbg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-radial-glow" aria-hidden />
        <div className="relative w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-16 flex flex-col items-center gap-12 max-[991px]:px-8 max-[991px]:pt-[120px] max-[479px]:px-5">
          <h1 className="t-display1 text-xprimary text-center">
            {t("heroTitle")}
          </h1>
          <p className="t-body1 text-xsecondary text-center max-w-[680px]">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Timeline — rotating DNA helix, one event open at a time */}
      <section className="bg-xbg">
        <div className="w-full max-w-[1440px] mx-auto px-10 max-[991px]:px-8 max-[479px]:px-5">
          <DnaTimeline
            events={timelineKeys.map((eventKey) => ({
              key: eventKey,
              date: t(`timeline.${eventKey}.date`),
              title: t(`timeline.${eventKey}.title`),
              description: t(`timeline.${eventKey}.description`),
            }))}
            labels={{
              ariaLabel: t("timelineAriaLabel"),
              hint: t("timelineHint"),
              event: t("timelineEventLabel"),
              of: t("timelineOfLabel"),
            }}
          />
        </div>
      </section>

      {/* Team */}
      <section className="bg-xbg-2">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-12 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
          <h2 className="t-display2 text-xprimary text-center">
            {t("teamHeading")}
          </h2>

          <div className="grid grid-cols-2 gap-10 w-full max-[767px]:grid-cols-1">
            {teamKeys.map((member) => (
              <div
                key={member.key}
                className="grid grid-cols-[auto_1fr] gap-6 max-[767px]:grid-cols-1"
              >
                <Image
                  src={member.image}
                  alt={t(`team.${member.key}.name`)}
                  width={200}
                  height={280}
                  className="w-[160px] h-[224px] object-cover rounded-[16px] ring-1 ring-xborder max-[767px]:w-full max-[767px]:h-auto max-[767px]:max-w-[280px]"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="t-h2 text-xprimary">
                    {t(`team.${member.key}.name`)}
                  </h3>
                  <p className="t-h6 text-xbrand">
                    {t(`team.${member.key}.role`)}
                  </p>
                  <p className="t-body1 text-xsecondary">
                    {t(`team.${member.key}.bio`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="bg-xbg">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-12 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
          <h2 className="t-display2 text-xprimary text-center">
            {t("advisorsHeading")}
          </h2>

          <div className="grid grid-cols-2 gap-10 w-full max-[767px]:grid-cols-1">
            {advisorKeys.map((advisor) => (
              <div
                key={advisor.key}
                className="grid grid-cols-[auto_1fr] gap-6 max-[767px]:grid-cols-1"
              >
                <Image
                  src={advisor.image}
                  alt={t(`advisors.${advisor.key}.name`)}
                  width={200}
                  height={280}
                  className="w-[160px] h-[224px] object-cover rounded-[16px] ring-1 ring-xborder max-[767px]:w-full max-[767px]:h-auto max-[767px]:max-w-[280px]"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="t-h2 text-xprimary">
                    {t(`advisors.${advisor.key}.name`)}
                  </h3>
                  <p className="t-h6 text-xbrand">
                    {t(`advisors.${advisor.key}.role`)}
                  </p>
                  <p className="t-body1 text-xsecondary">
                    {t(`advisors.${advisor.key}.bio`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
