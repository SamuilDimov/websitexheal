import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Icon from "@/components/ui/Icon";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * The section that explains the switch in the nav.
 *
 * A visitor who lands here from the consumer side needs to know why one
 * company has two front doors, and a practice needs to know that the record
 * it will see is the client's, not a copy it now owns. Both answers are the
 * same answer, so they sit side by side, and the link back to `/` makes the
 * switch reciprocal rather than a one-way exit into B2B.
 */
export default function ProBridge() {
  const t = useTranslations("Pro");

  const doors = [
    { key: "app", title: t("bridgeAppTitle"), body: t("bridgeAppBody") },
    { key: "workspace", title: t("bridgeWorkTitle"), body: t("bridgeWorkBody") },
  ];

  return (
    <section aria-labelledby="pro-bridge-heading" className="bg-xbg-2">
      <div className="x-container x-section flex flex-col gap-12 md:gap-16">
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <p className="t-eyebrow text-xtertiary">{t("bridgeEyebrow")}</p>
            <h2
              id="pro-bridge-heading"
              className="t-display2 text-xprimary max-w-[16ch]"
            >
              {t("bridgeHeading")}
            </h2>
            <p className="t-lead text-xsecondary max-w-[56ch]">
              {t("bridgeLead")}
            </p>
          </div>
        </ScrollReveal>

        <div className="pro-doors">
          {doors.map((door, index) => (
            <ScrollReveal key={door.key} delay={index * 90}>
              <div className="pro-door">
                <p className="t-h4 text-xprimary">{door.title}</p>
                <p className="t-body1 text-xsecondary mt-3 max-w-[46ch]">
                  {door.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
          {/* The seam between the two doors, with the thing that governs it
              sitting on the line. Decorative: the copy already says it. */}
          <span className="pro-doors__lock" aria-hidden="true">
            <Icon name="lock" size={15} />
          </span>
        </div>

        <ScrollReveal>
          <Link href="/" className="x-link t-button-sm" data-magnetic>
            <span data-magnetic-inner>
              {t("bridgeLink")}
              <Icon name="arrow_forward" size={16} />
            </span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
