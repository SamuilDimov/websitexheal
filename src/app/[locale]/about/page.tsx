import { use } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("about.title"),
    description: t("about.description"),
  };
}

const timelineKeys = [
  "event1", "event2", "event3", "event4", "event5", "event6", "event7",
  "event8", "event9", "event10", "event11", "event12", "event13", "event14",
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
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-xbg">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-12 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
          <div className="timeline relative w-full">
            {/* Vertical divider line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-px bg-xborder max-[767px]:hidden" />

            {timelineKeys.map((eventKey, index) => {
              const isLeft = index % 2 === 0;
              const date = t(`timeline.${eventKey}.date`);
              const title = t(`timeline.${eventKey}.title`);
              const description = t(`timeline.${eventKey}.description`);

              return (
                <div
                  key={index}
                  className="timeline-item grid grid-cols-[1fr_1fr] gap-16 py-5 relative max-[767px]:grid-cols-1 max-[767px]:gap-5"
                >
                  {isLeft ? (
                    <>
                      <div className="surface-card-feature p-6 text-right flex flex-col gap-2 relative max-[767px]:text-left">
                        <p className="t-overline text-xbrand">{date}</p>
                        <h3 className="t-h4 text-xprimary max-w-[42ch] ml-auto max-[767px]:ml-0">
                          {title}
                        </h3>
                        <p className="t-body2 text-xsecondary">{description}</p>
                        {/* Dot */}
                        <div className="absolute top-1/2 -mt-1 -right-[39px] w-2 h-2 bg-xbrand rounded-full ring-2 ring-xbg max-[767px]:hidden" />
                      </div>
                      <div className="max-[767px]:hidden" />
                    </>
                  ) : (
                    <>
                      <div className="max-[767px]:hidden" />
                      <div className="surface-card-feature p-6 text-left flex flex-col gap-2 relative">
                        <p className="t-overline text-xbrand">{date}</p>
                        <h3 className="t-h4 text-xprimary max-w-[42ch]">
                          {title}
                        </h3>
                        <p className="t-body2 text-xsecondary">{description}</p>
                        {/* Dot */}
                        <div className="absolute top-1/2 -mt-1 -left-[39px] w-2 h-2 bg-xbrand rounded-full ring-2 ring-xbg max-[767px]:hidden" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
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
