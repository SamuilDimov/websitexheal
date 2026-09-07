import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * The five modules.
 *
 * One entry per item in the workspace's own sidebar — Analytics, Services,
 * Appointments, Clients, Documents — in the order the product lists them.
 * Nothing here is aspirational; if a module is not in the sidebar it is not
 * on this page.
 *
 * The sidebar's own icon is the marker. An 01/02/03 rail was here first and
 * came out: these are five places in one app, not five steps in a sequence,
 * and numbering them promised an order the product does not have.
 */
const MODULES = [
  { key: "analytics", icon: "monitoring" },
  { key: "services", icon: "storefront" },
  { key: "appointments", icon: "event_note" },
  { key: "clients", icon: "groups" },
  { key: "documents", icon: "description" },
] as const;

export default function ProStack() {
  const t = useTranslations("Pro");

  return (
    <section id="workspace" aria-labelledby="pro-stack-heading" className="scroll-mt-[88px] bg-xbg">
      <div className="x-container x-section flex flex-col gap-12 md:gap-16">
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <p className="t-eyebrow text-xtertiary">{t("stackEyebrow")}</p>
            <h2
              id="pro-stack-heading"
              className="t-display2 text-xprimary max-w-[18ch]"
            >
              {t("stackHeading")}
            </h2>
            <p className="t-lead text-xsecondary max-w-[54ch]">
              {t("stackLead")}
            </p>
          </div>
        </ScrollReveal>

        <ul role="list" className="pro-stack">
          {MODULES.map((module, index) => (
            <li key={module.key}>
              <ScrollReveal delay={index * 70}>
                <div className="pro-stack__item">
                  <span className="pro-stack__icon">
                    <Icon name={module.icon} size={19} />
                  </span>
                  <p className="pro-stack__title">{t(`stack${index + 1}Title`)}</p>
                  <p className="pro-stack__body">{t(`stack${index + 1}Body`)}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
