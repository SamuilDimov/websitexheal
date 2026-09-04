import type { ReactNode } from "react";

/**
 * Inner-page header, shared by About, Blog, Support, Guides, Team and the
 * legal pages so they open the way the homepage does: a mono eyebrow, a
 * left-aligned display heading and one lead sentence, inside the standard
 * container and clear of the fixed capsule nav. Replaces the centred hero
 * blocks with radial glows that the dark site used.
 */
export default function PageHeader({
  title,
  lead,
  size = "display1",
  children,
  id,
}: {
  title: string;
  lead?: string;
  size?: "display1" | "display2";
  /** Optional row under the lead: meta line, avatar, actions. */
  children?: ReactNode;
  id?: string;
}) {
  return (
    <header className="bg-xbg pt-[72px]">
      <div className="x-container pb-10 pt-12 md:pb-14 md:pt-20">
        <div className="flex max-w-[64ch] flex-col items-start gap-4">
          <h1 id={id} className={`text-xprimary ${size === "display1" ? "t-display1" : "t-display2"}`}>
            {title}
          </h1>
          {lead ? <p className="t-lead text-xsecondary">{lead}</p> : null}
          {children}
        </div>
      </div>
    </header>
  );
}
