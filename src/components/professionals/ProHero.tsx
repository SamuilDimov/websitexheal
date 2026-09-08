import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Icon from "@/components/ui/Icon";
import DeviceCanvas from "@/components/ui/DeviceCanvas";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Professionals hero.
 *
 * Laid out the way the consumer hero is: copy and the ask on the left, the
 * device on the right. It was centred with the machine underneath until
 * Samuil asked for the two to match — one company, one hero shape, and the
 * switch between them should change the audience, not the furniture.
 *
 * The device is a laptop rather than a phone because the thing being sold is
 * a screen somebody sits in front of all day, and the screen on it is the
 * real Analytics view — everything the page claims below is visible in it. It
 * runs the same live 3D pipeline as the phone (`hero-laptop.blend.py` ->
 * `laptop.glb` -> `DeviceModel`) for one reason: a laptop's gesture is the
 * lid, and a CSS bezel around a screenshot cannot open. The `open` entrance
 * brings it in nearly shut and swings the lid up as the hero settles.
 *
 * The columns are 6/6 rather than the consumer hero's 7/5. A phone is
 * portrait and takes the narrow half happily; a laptop in that slot is a
 * postage stamp.
 */
export default function ProHero() {
  const t = useTranslations("Pro");

  const stats = [1, 2, 3].map((n) => ({
    value: t(`heroStat${n}Value`),
    label: t(`heroStat${n}Label`),
  }));

  return (
    <section id="pro-hero" className="pro-hero relative overflow-hidden pt-[72px]">
      <div className="x-container relative">
        {/* Three items rather than two columns, for the reason the consumer
            hero gives: stacked on a phone the DOM order is what runs, and
            heading -> device -> ask puts the machine between the claim and
            the button instead of after it. On md the two text blocks go back
            into one column by row and the device spans both rows on the
            right. Rows are pinned `auto 1fr` because a row-spanning item
            otherwise shares its height across the rows it spans and pushes
            the buttons halfway down the column. */}
        <div className="grid gap-10 pt-14 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-8 md:gap-y-6 md:pt-24">
          <div className="flex flex-col items-start gap-5 md:col-span-6 md:col-start-1 md:row-start-1">
            <h1 className="t-display1 text-xprimary max-w-[15ch]">
              {t("heroHeading")}
            </h1>
            <p className="t-lead text-xsecondary max-w-[46ch]">{t("heroLead")}</p>
          </div>

          <div className="relative flex items-center md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-1">
            <div className="pro-laptop">
              <DeviceCanvas
                device="laptop"
                entrance="open"
                screen="/images/provider-workspace.webp"
                poster="/images/provider-workspace-laptop.webp"
                aspect="1.3 / 1"
                fill={0.79}
                envIntensity={0.45}
                parallax={0.03}
                tilt={7}
                className="w-full"
              />
            </div>
            <span className="sr-only">{t("heroShotAlt")}</span>
          </div>

          <div className="flex flex-col items-start gap-6 pb-2 md:col-span-6 md:col-start-1 md:row-start-2 md:self-start md:pb-16">
            <div className="flex flex-wrap items-center gap-6">
              <Link href="#early-access" className="x-btn x-btn--primary" data-magnetic>
                <span data-magnetic-inner>{t("heroCta")}</span>
              </Link>
              <Link href="#workspace" className="x-link t-button-sm" data-magnetic>
                <span data-magnetic-inner>
                  {t("heroSecondary")}
                  <Icon name="arrow_forward" size={16} />
                </span>
              </Link>
            </div>

            <p className="t-caption text-xtertiary max-w-[46ch]">{t("heroNote")}</p>
          </div>
        </div>

        <ul role="list" className="pro-hero__stats">
          {stats.map((stat, index) => (
            <li key={stat.label}>
              <ScrollReveal delay={index * 80}>
                <p className="t-h3 text-xprimary">{stat.value}</p>
                <p className="t-data text-xtertiary mt-2">{stat.label}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
