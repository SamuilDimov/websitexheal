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
      <section
        className="relative"
        style={{
          backgroundImage:
            "linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
        }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[5em] flex flex-col items-center gap-[80px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
          <h1 className="text-[4.5rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3.5rem] max-[479px]:text-[3rem]">
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="timeline relative w-full">
            {/* Vertical divider line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[0.125rem] -ml-[0.0625rem] bg-xlight-blue-low max-[767px]:hidden" />

            {timelineKeys.map((eventKey, index) => {
              const isLeft = index % 2 === 0;
              const date = t(`timeline.${eventKey}.date`);
              const title = t(`timeline.${eventKey}.title`);
              const description = t(`timeline.${eventKey}.description`);

              return (
                <div
                  key={index}
                  className="timeline-item grid grid-cols-[1fr_1fr] gap-[60px] py-[20px] relative max-[767px]:grid-cols-1 max-[767px]:gap-[20px]"
                >
                  {isLeft ? (
                    <>
                      {/* Left card */}
                      <div className="border border-xlight-blue-low bg-xwhite rounded-[16px] p-[20px] shadow-[0_4px_4px_#1419330d] text-right flex flex-col gap-[10px] leading-[1] relative max-[767px]:text-left">
                        <p className="text-xdark-blue text-[1rem]">{date}</p>
                        <h3 className="text-[1.5rem] font-medium leading-[1] tracking-[-0.01em] max-w-[42ch] ml-auto max-[767px]:ml-0">
                          {title}
                        </h3>
                        <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                          {description}
                        </p>
                        {/* Dot */}
                        <div className="absolute top-1/2 -mt-[4px] -right-[35px] w-[8px] h-[8px] bg-xdark-blue rounded-full max-[767px]:hidden" />
                      </div>
                      {/* Empty right column */}
                      <div className="max-[767px]:hidden" />
                    </>
                  ) : (
                    <>
                      {/* Empty left column */}
                      <div className="max-[767px]:hidden" />
                      {/* Right card */}
                      <div className="border border-xlight-blue-low bg-xwhite rounded-[16px] p-[20px] shadow-[0_4px_4px_#1419330d] text-left flex flex-col gap-[10px] leading-[1] relative">
                        <p className="text-xdark-blue text-[1rem]">{date}</p>
                        <h3 className="text-[1.5rem] font-medium leading-[1] tracking-[-0.01em] max-w-[42ch]">
                          {title}
                        </h3>
                        <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                          {description}
                        </p>
                        {/* Dot */}
                        <div className="absolute top-1/2 -mt-[4px] -left-[35px] w-[8px] h-[8px] bg-xdark-blue rounded-full max-[767px]:hidden" />
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
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            {t("teamHeading")}
          </h2>

          <div className="grid grid-cols-2 gap-[40px] max-[767px]:grid-cols-1">
            {teamKeys.map((member) => (
              <div
                key={member.key}
                className="grid grid-cols-[auto_1fr] gap-[40px] max-[767px]:grid-cols-1"
              >
                <Image
                  src={member.image}
                  alt={t(`team.${member.key}.name`)}
                  width={200}
                  height={280}
                  className="w-[10em] h-[14em] object-cover rounded-[16px] max-[767px]:w-[20em] max-[767px]:h-[26em]"
                />
                <div className="flex flex-col gap-[10px]">
                  <h3 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em]">
                    {t(`team.${member.key}.name`)}
                  </h3>
                  <p className="text-xdark-blue font-medium text-[1.125rem]">
                    {t(`team.${member.key}.role`)}
                  </p>
                  <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                    {t(`team.${member.key}.bio`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            {t("advisorsHeading")}
          </h2>

          <div className="grid grid-cols-2 gap-[40px] max-[767px]:grid-cols-1">
            {advisorKeys.map((advisor) => (
              <div
                key={advisor.key}
                className="grid grid-cols-[auto_1fr] gap-[40px] max-[767px]:grid-cols-1"
              >
                <Image
                  src={advisor.image}
                  alt={t(`advisors.${advisor.key}.name`)}
                  width={200}
                  height={280}
                  className="w-[10em] h-[14em] object-cover rounded-[16px] max-[767px]:w-[20em] max-[767px]:h-[26em]"
                />
                <div className="flex flex-col gap-[10px]">
                  <h3 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em]">
                    {t(`advisors.${advisor.key}.name`)}
                  </h3>
                  <p className="text-xdark-blue font-medium text-[1.125rem]">
                    {t(`advisors.${advisor.key}.role`)}
                  </p>
                  <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
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
