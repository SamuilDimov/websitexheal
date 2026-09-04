import ScrollReveal from "@/components/ui/ScrollReveal";

export type Milestone = {
  key: string;
  date: string;
  title: string;
  description: string;
};

/**
 * Company timeline as a plain vertical rail: mono date on the left, card on
 * the right, a hairline down the middle with a dot per milestone. Replaces the
 * animated DNA helix, which was decorative and fought the light surface. The
 * order carries information here (it is a real chronology), so the rail and
 * the dates earn their place.
 */
export default function MilestoneTimeline({
  events,
  ariaLabel,
}: {
  events: Milestone[];
  ariaLabel: string;
}) {
  return (
    <ol role="list" aria-label={ariaLabel} className="timeline relative m-0 list-none p-0">
      {events.map((event, index) => (
        <li key={event.key} className="timeline__item grid gap-4 md:grid-cols-[180px_1fr] md:gap-10">
          <ScrollReveal delay={Math.min(index, 6) * 40} className="contents">
            <div className="timeline__date t-data text-xtertiary md:pt-7 md:text-right">{event.date}</div>
            <article className="timeline__card x-card p-6 md:p-7">
              <h3 className="t-h4 text-xprimary">{event.title}</h3>
              <p className="t-body2 text-xsecondary mt-2 max-w-[60ch]">{event.description}</p>
            </article>
          </ScrollReveal>
        </li>
      ))}
    </ol>
  );
}
