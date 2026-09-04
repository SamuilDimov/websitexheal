export type FeatureVisualSlug =
  | "workouts"
  | "nutrition"
  | "mindfulness"
  | "chat-with-your-health"
  | "flare-up-trigger-patterns"
  | "health-awareness"
  | "specialist-ready-reports"
  | "health-timeline"
  | "log-life-events";

export const featureVisuals = {
  workouts: {
    deviceFrame: true,
    images: [
      {
        src: "/images/screenshots/workout-dashboard.png",
        width: 1290,
        height: 2796,
        altKey: "workoutsAlt",
      },
      {
        src: "/images/screenshots/workout-session.webp",
        width: 1290,
        height: 2796,
        altKey: "workoutsSessionAlt",
      },
      {
        src: "/images/screenshots/workout-exercises.webp",
        width: 1290,
        height: 2796,
        altKey: "workoutsExercisesAlt",
      },
    ],
  },
  nutrition: {
    deviceFrame: true,
    images: [
      {
        src: "/images/screenshots/nutrition-dashboard.png",
        width: 1290,
        height: 2796,
        altKey: "nutritionAlt",
      },
      {
        src: "/images/screenshots/nutrition-photo-analysis.webp",
        width: 1206,
        height: 2622,
        altKey: "nutritionPhotoAnalysisAlt",
      },
      {
        src: "/images/screenshots/nutrition-meal-analysis.webp",
        width: 1206,
        height: 2622,
        altKey: "nutritionMealAnalysisAlt",
      },
    ],
  },
  mindfulness: {
    deviceFrame: true,
    images: [
      {
        src: "/images/screenshots/mindfulness-dashboard.png",
        width: 1290,
        height: 2796,
        altKey: "mindfulnessAlt",
      },
      {
        src: "/images/screenshots/mindfulness-breathing.webp",
        width: 1290,
        height: 2796,
        altKey: "mindfulnessBreathingAlt",
      },
    ],
  },
  "chat-with-your-health": {
    deviceFrame: true,
    images: [
      {
        src: "/images/screenshots/chat-flare-up.png",
        width: 730,
        height: 1583,
        altKey: "feature1Alt",
      },
    ],
  },
  "flare-up-trigger-patterns": {
    deviceFrame: true,
    images: [
      {
        src: "/images/screenshots/flare-up-insights.png",
        width: 730,
        height: 1583,
        altKey: "feature2Alt",
      },
      {
        src: "/images/screenshots/log-flare-up.webp",
        width: 730,
        height: 1583,
        altKey: "feature2LogAlt",
      },
    ],
  },
  "health-awareness": {
    deviceFrame: true,
    images: [
      {
        src: "/images/screenshots/health-awareness.webp",
        width: 730,
        height: 1583,
        altKey: "feature3Alt",
      },
    ],
  },
  "specialist-ready-reports": {
    deviceFrame: true,
    images: [
      {
        src: "/images/screenshots/doctor-report.webp",
        width: 730,
        height: 1583,
        altKey: "feature4Alt",
      },
    ],
  },
  "health-timeline": {
    deviceFrame: true,
    images: [
      {
        src: "/images/screenshots/timeline-dashboard.png",
        width: 1290,
        height: 2796,
        altKey: "feature5Alt",
      },
    ],
  },
  "log-life-events": {
    deviceFrame: true,
    images: [
      {
        src: "/images/screenshots/log-life-event.webp",
        width: 730,
        height: 1583,
        altKey: "feature6Alt",
      },
      {
        src: "/images/screenshots/log-medication.png",
        width: 730,
        height: 1583,
        altKey: "feature6MedicationAlt",
      },
      {
        src: "/images/screenshots/log-supplement.webp",
        width: 730,
        height: 1583,
        altKey: "feature6SupplementAlt",
      },
      {
        src: "/images/screenshots/log-peptide.webp",
        width: 730,
        height: 1583,
        altKey: "feature6PeptideAlt",
      },
      {
        src: "/images/screenshots/log-flare-up.webp",
        width: 730,
        height: 1583,
        altKey: "feature6FlareUpAlt",
      },
    ],
  },
} as const satisfies Record<
  FeatureVisualSlug,
  {
    /**
     * Always true now. It used to be false for the features whose screenshots
     * were device renders — they carried their own body, so framing them again
     * doubled it up. Those renders are cropped to bare screens, so every visual
     * needs the device supplied. Kept as a flag because a future visual that is
     * not a phone screen (a chart, a report) would want it off.
     */
    deviceFrame: boolean;
    images: readonly {
      src: string;
      width: number;
      height: number;
      altKey: string;
    }[];
  }
>;
