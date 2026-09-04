import { useTranslations } from "next-intl";

/**
 * Standards and compliance as text marks, in the hero's mono proof-strip
 * style. Replaces the shield and seal imagery (`MedicalStandardsBadge`,
 * `ComplianceBadges`) on the feature pages, per the redesign brief.
 */
export default function ProofLine({ className = "" }: { className?: string }) {
  const s = useTranslations("MedicalStandards");
  const c = useTranslations("Compliance");
  const items = [
    s("standards"),
    s("label"),
    `${c("hipaa")} ${c("compliant")}`,
    `${c("gdpr")} ${c("compliant")}`,
  ];
  return (
    <ul role="list" className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="t-data flex items-center gap-2.5 text-xsecondary">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-xbrand" />
          {item}
        </li>
      ))}
    </ul>
  );
}
