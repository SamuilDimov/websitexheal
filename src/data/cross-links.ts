/**
 * Cross-link data for feature landing pages.
 * Each page links to 3 related features with a one-liner explaining the connection.
 */

export interface CrossLinkFeature {
  slug: string;
  title: string;
  oneLiner: string;
  icon: string; // MaterialSymbolsRounded icon name
  image: string; // Feature landing page image
}

export const featureMeta: Record<
  string,
  { title: string; icon: string; image: string }
> = {
  "chat-with-your-health": {
    title: "Chat with Your Health",
    icon: "chat_bubble",
    image: "/images/chat-landing.png",
  },
  "flare-up-trigger-patterns": {
    title: "Flare-Up Trigger Patterns",
    icon: "show_chart",
    image: "/images/flare-up.png",
  },
  "health-awareness": {
    title: "Health Awareness Score",
    icon: "speed",
    image: "/images/reports-landing.png",
  },
  "specialist-ready-reports": {
    title: "Specialist-Ready Reports",
    icon: "description",
    image: "/images/get-reports.png",
  },
  "health-timeline": {
    title: "Health Timeline",
    icon: "timeline",
    image: "/images/records-landing.png",
  },
  "log-life-events": {
    title: "Log Life Events",
    icon: "edit_note",
    image: "/images/log-medication.png",
  },
};

export const crossLinks: Record<
  string,
  { slug: string; oneLiner: string }[]
> = {
  "chat-with-your-health": [
    {
      slug: "flare-up-trigger-patterns",
      oneLiner:
        "Your Digital Twin detects patterns you would miss. Ask it why.",
    },
    {
      slug: "specialist-ready-reports",
      oneLiner:
        "Turn chat insights into reports your doctor can act on.",
    },
    {
      slug: "log-life-events",
      oneLiner: "The more you log, the smarter your chat becomes.",
    },
  ],
  "flare-up-trigger-patterns": [
    {
      slug: "chat-with-your-health",
      oneLiner:
        "Ask your Digital Twin what your patterns mean.",
    },
    {
      slug: "log-life-events",
      oneLiner: "Every log entry helps detect triggers earlier.",
    },
    {
      slug: "health-awareness",
      oneLiner:
        "Track how your flare-up prevention improves your score.",
    },
  ],
  "health-awareness": [
    {
      slug: "chat-with-your-health",
      oneLiner:
        "Ask your Digital Twin why your score changed.",
    },
    {
      slug: "specialist-ready-reports",
      oneLiner: "Share your health profile with your care team.",
    },
    {
      slug: "flare-up-trigger-patterns",
      oneLiner:
        "Patterns affect your score. Understand them.",
    },
  ],
  "specialist-ready-reports": [
    {
      slug: "health-awareness",
      oneLiner: "Your score powers the data in your reports.",
    },
    {
      slug: "health-timeline",
      oneLiner: "Reports draw from your complete health history.",
    },
    {
      slug: "chat-with-your-health",
      oneLiner:
        "Prepare for appointments by asking your Digital Twin.",
    },
  ],
  "health-timeline": [
    {
      slug: "log-life-events",
      oneLiner: "Every life event enriches your timeline.",
    },
    {
      slug: "specialist-ready-reports",
      oneLiner: "Your timeline data feeds into reports.",
    },
    {
      slug: "chat-with-your-health",
      oneLiner: "Search your timeline with natural language.",
    },
  ],
  "log-life-events": [
    {
      slug: "health-timeline",
      oneLiner: "Every log appears in your chronological story.",
    },
    {
      slug: "flare-up-trigger-patterns",
      oneLiner: "Your logs help detect what triggers flare-ups.",
    },
    {
      slug: "chat-with-your-health",
      oneLiner: "Every log makes your Digital Twin smarter.",
    },
  ],
};

/**
 * Get fully resolved cross-link features for a given page slug.
 */
export function getCrossLinks(pageSlug: string): CrossLinkFeature[] {
  const links = crossLinks[pageSlug];
  if (!links) return [];

  return links.map((link) => {
    const meta = featureMeta[link.slug];
    return {
      slug: link.slug,
      title: meta?.title ?? link.slug,
      oneLiner: link.oneLiner,
      icon: meta?.icon ?? "arrow_forward",
      image: meta?.image ?? "",
    };
  });
}
