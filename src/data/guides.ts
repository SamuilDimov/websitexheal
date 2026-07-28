// Guides data - centralized source of truth for user guides and tutorials
// Organized by category with full content.
//
// The module is locale-aware in the same shape as `src/data/blog-posts.ts`:
// per-locale arrays behind accessors that take a `locale` as their final
// parameter and default to English.

import type { GuideNavigationCategory } from "@/types/content";

export type GuideCategory =
  | "getting-started"
  | "understanding-your-health"
  | "daily-routine"
  | "vitals-tracking"
  | "nutrition"
  | "workouts"
  | "mindfulness"
  | "ai-companion"
  | "advanced-features"
  | "account-rewards";

export interface GuideCategoryInfo {
  slug: GuideCategory;
  label: string;
  description: string;
  icon: string;
}

const guideCategoriesEn: GuideCategoryInfo[] = [
  {
    slug: "getting-started",
    label: "Getting Started",
    description: "First steps with xHeal - setup, onboarding, and connecting your health data.",
    icon: "rocket_launch",
  },
  {
    slug: "understanding-your-health",
    label: "Understanding Your Health",
    description: "Learn about your health scores, bio age, and personalized insights.",
    icon: "monitoring",
  },
  {
    slug: "daily-routine",
    label: "Daily Routine",
    description: "Set up and complete your personalized daily health tasks.",
    icon: "event_note",
  },
  {
    slug: "vitals-tracking",
    label: "Vitals & Tracking",
    description: "Monitor your health metrics and understand trends over time.",
    icon: "vital_signs",
  },
  {
    slug: "nutrition",
    label: "Nutrition",
    description: "Meal planning, food logging, and calorie tracking features.",
    icon: "restaurant",
  },
  {
    slug: "workouts",
    label: "Workouts",
    description: "Fitness tracking, workout recommendations, and exercise progress.",
    icon: "fitness_center",
  },
  {
    slug: "mindfulness",
    label: "Mindfulness",
    description: "Breathing exercises, mood tracking, and mental wellness tools.",
    icon: "self_improvement",
  },
  {
    slug: "ai-companion",
    label: "AI Companion",
    description: "Chat with your personal health AI and get personalized answers.",
    icon: "smart_toy",
  },
  {
    slug: "advanced-features",
    label: "Advanced Features",
    description: "Flare-up tracking, skin analysis, document uploads, and integrations.",
    icon: "tune",
  },
  {
    slug: "account-rewards",
    label: "Account & Rewards",
    description: "Manage your account, subscriptions, and earn Orbs rewards.",
    icon: "account_circle",
  },
];

export interface Guide {
  slug: string;
  category: GuideCategory;
  title: string;
  description: string;
  readingTime: number;
  content: string;
  order: number;
  prerequisites?: string[];
}

type GuideOverrides = Record<
  string,
  Partial<Pick<Guide, "title" | "description" | "content">>
>;

// Corrections layered over the original English guide definitions, mostly to
// narrow claims down to what the product actually ships today. Bulgarian guides
// are authored directly against the corrected text, so they need no equivalent
// patch layer.
const guideOverridesEn: GuideOverrides = {
  "nutrition/nutrition-overview": {
    content: "<h2>Your Nutrition Hub</h2><p>xHeal combines calorie and macro tracking with seven-day meal planning.</p><h3>Nutrition Dashboard</h3><p>See calories, protein, carbohydrates, and fat against your daily targets, review logged meals, and open an active meal plan.</p><h3>Meal Planning</h3><p>Build a plan from your eating style, calorie and macro targets, allergies, dietary restrictions, and ingredient preferences. Swap individual meals and view the aggregated shopping list.</p><h3>Food Logging</h3><p>Log calories and macros manually or photograph a meal for AI-estimated foods, portions, calories, and macros. You can edit the resulting meal after analysis.</p><h3>Recipe Catalog</h3><p>Browse nearly 500 recipes whose nutrition is calculated from USDA-based ingredient data.</p><blockquote><strong>Current scope:</strong> Database search, barcode lookup, favorites, and a dedicated hydration workflow are not currently available.</blockquote>",
  },
  "nutrition/creating-meal-plans": {
    content: "<h2>Personalized Meal Planning</h2><p>xHeal creates a seven-day plan around the nutrition profile you provide.</p><h3>Set Your Profile</h3><p>Choose an eating style, record allergies and dietary restrictions, set calorie and macro targets, and mark ingredient and food preferences.</p><h3>Generate and Review</h3><p>xHeal selects recipes that fit those requirements and shows daily meals with nutrition totals.</p><h3>Customize the Week</h3><p>Swap an individual meal for an available alternative without rebuilding the rest of the plan.</p><h3>Activate the Plan</h3><p>Activating saves the week as your current plan and produces an aggregated shopping list.</p><blockquote><strong>Note:</strong> Meal plans are informational wellness tools, not medical nutrition therapy.</blockquote>",
  },
  "nutrition/logging-food": {
    title: "Logging Food and Meals",
    description: "Track meals with photo analysis or manual calorie and macro entry.",
    content: "<h2>Track What You Eat</h2><p>The current logging flow supports AI photo analysis and manual calorie and macro entry.</p><h3>Photo Analysis</h3><p>Take or upload a meal photo. xHeal estimates foods, portions, calories, protein, carbohydrates, and fat, then creates a food log you can review and edit.</p><h3>Manual Entry</h3><p>Choose the meal and date, then enter calories and macros for the meal.</p><h3>History</h3><p>Review previous food logs and edit or remove entries when needed.</p><blockquote><strong>Current scope:</strong> Food-database search, product lookup from a barcode, recent foods, favorites, and reusable custom foods are not currently available.</blockquote>",
  },
  "nutrition/calorie-tracker": {
    title: "Using Photo Food Analysis",
    description: "Understand xHeal photo-based calorie and macro estimates.",
    content: "<h2>Photo-Based Food Analysis</h2><p>xHeal can analyze a meal photo to estimate visible food items, portions, calories, and macronutrients.</p><h3>Taking a Useful Photo</h3><p>Use even lighting, include the whole plate, and keep foods visible where possible.</p><h3>Reviewing the Log</h3><p>Photo analysis creates a food log after processing. Review the estimate and edit the resulting meal if the foods, portion, or totals need correction.</p><h3>Limits</h3><p>Mixed dishes, hidden ingredients, sauces, and unusual portions can reduce estimate quality. Treat photo results as estimates rather than laboratory measurements.</p>",
  },
  "nutrition/shopping-list": {
    content: "<h2>Your Plan Shopping List</h2><p>When a nutrition plan is active, xHeal aggregates the ingredients required by its recipes into a shopping list.</p><h3>Open the List</h3><p>Use the shopping-list action from the active meal plan to review the ingredients needed for the week.</p><h3>How It Is Built</h3><p>Ingredients from planned recipes are combined so repeated items appear together.</p><blockquote><strong>Current scope:</strong> Manual list editing, quantity adjustment, pantry management, reliable clipboard export, and sharing are not currently available.</blockquote>",
  },
  "workouts/workout-overview": {
    content: "<h2>Your Fitness Companion</h2><p>xHeal combines readiness-based workout guidance, session logging, and strength progress.</p><h3>Body Today</h3><p>Readiness uses HRV, resting heart rate, sleep, stress, recent active-energy training load, and relevant health constraints.</p><h3>Workout Guidance</h3><p>Recommendations consider readiness fit, goals, equipment, recent movement balance, safety restrictions, and saved plans.</p><h3>Following a Workout</h3><p>Track exercises, sets, reps, weight, duration, distance, rest, notes, and photos as supported by the exercise type.</p><h3>Progress</h3><p>Review workout history, personal records, max weight, volume, and estimated 1RM charts.</p><h3>Apple Health</h3><p>Completed sessions can save workout type, duration, estimated active calories, and optional distance to Apple Health.</p>",
  },
  "workouts/readiness-score": {
    content: "<h2>Train with More Context</h2><p>Body Today is an informational readiness score that helps frame today's training decision.</p><h3>Current Inputs</h3><p>HRV contributes 30%, resting heart rate 10%, sleep 20%, stress 10%, training load 20%, and relevant health constraints 10%. Availability and confidence depend on the data in your profile.</p><h3>Health Context</h3><p>Active flare-ups and selected surgery or medication contexts can cap readiness and steer recommendations toward a more conservative option.</p><h3>Using the Score</h3><p>Use readiness with how you feel and the advice of qualified professionals. It is not medical clearance and does not diagnose fatigue, illness, or injury.</p>",
  },
  "workouts/following-workouts": {
    content: "<h2>Guided Workout Sessions</h2><p>Start a recommended or saved workout and log the session as you go.</p><h3>During the Session</h3><p>Complete exercises and record the supported fields, including sets, reps, weight, duration, distance, rest, notes, and photos.</p><h3>Adjusting the Workout</h3><p>Replace an exercise when the movement or available equipment does not fit. Rest timers help pace strength sets.</p><h3>Completing the Session</h3><p>Finish the workout to save its duration, completed work, notes, and detected personal records. The app can also save a workout summary to Apple Health.</p><blockquote><strong>Note:</strong> Live heart rate can be displayed during a session, but heart-rate samples are not currently attached to the saved Apple Health workout.</blockquote>",
  },
  "workouts/tracking-progress": {
    content: "<h2>See Your Training Progress</h2><p>xHeal keeps completed sessions and exercise history together.</p><h3>Workout History</h3><p>Review previous sessions, completed exercises, sets, reps, weights, duration, notes, and photos when available.</p><h3>Exercise Charts</h3><p>Exercise detail views can chart max weight, total volume, and estimated one-rep max over time.</p><h3>Personal Records</h3><p>xHeal detects supported personal records from logged sets and surfaces them in your training history.</p><blockquote><strong>Current scope:</strong> Body-measurement tracking, deadline-based strength goals, trainer PDF exports, and social sharing are not currently part of this progress flow.</blockquote>",
  },
  "mindfulness/mindfulness-overview": {
    content: "<h2>Mindfulness and Wellbeing</h2><p>xHeal combines guided breathing, mood check-ins, activity history, and Mind Readiness.</p><h3>Mind Readiness</h3><p>Readiness uses recent mood and stress check-ins and other supported context when available to provide informational guidance for a suggested action.</p><h3>Breathing</h3><p>Follow timed phases with animation, haptic transitions, and optional ambient audio. Completed sessions can be written to Apple Health as Mindful Minutes.</p><h3>Mood Check-Ins</h3><p>Record mood, energy, stress, and anxiety on a five-point scale.</p><h3>Activity</h3><p>Review breathing and mood entries by date.</p><blockquote><strong>Current scope:</strong> xHeal does not currently provide real-time HRV biofeedback, a guided meditation library, journaling, or mindfulness plans.</blockquote>",
  },
  "mindfulness/breathing-exercises": {
    content: "<h2>Guided Breathing</h2><p>xHeal guides each breathing phase with animation, timing, haptic transitions, and optional ambient sound.</p><h3>Starting a Session</h3><p>Open Mindfulness, choose one of the available patterns and duration options, select an ambient sound if desired, and start.</p><h3>During the Session</h3><p>Follow the on-screen inhale, hold, exhale, and rest phases. Stop if you feel dizzy or uncomfortable.</p><h3>Completion</h3><p>The session is saved to xHeal activity history and can be written to Apple Health as Mindful Minutes when permission is enabled.</p><blockquote><strong>Current scope:</strong> Custom patterns, arbitrary 1-20 minute duration selection, pause and resume, and live HRV biofeedback are not currently available.</blockquote>",
  },
  "mindfulness/mood-check-ins": {
    content: "<h2>Track Your Emotional Context</h2><p>A full xHeal check-in records four dimensions on a five-point scale.</p><h3>The Four Dimensions</h3><p>Record mood, energy, stress, and anxiety. The shorter dashboard flow records mood, energy, and stress while leaving anxiety neutral.</p><h3>Reviewing Activity</h3><p>Use the Mindfulness dashboard to review mood and breathing entries by date.</p><h3>Using Check-Ins</h3><p>Check-ins can contribute context to Mind Readiness when available. They support awareness and do not diagnose a mental-health condition.</p><blockquote><strong>Current scope:</strong> Focus ratings, mood notes, and 7/30/90-day trend charts are not currently available.</blockquote>",
  },
  "mindfulness/hrv-biofeedback": {
    title: "HRV and Live Biofeedback Boundaries",
    description: "Understand what xHeal does and does not measure during mindfulness.",
    content: "<h2>No Live HRV Biofeedback</h2><p>Mind Readiness provides informational guidance from supported check-in context. It is not a live measurement of your nervous system.</p><h3>During Breathing</h3><p>The breathing screen guides timed phases with animation, haptics, and ambient audio, but it does not display real-time HRV or calculate coherence.</p><h3>After a Session</h3><p>Completed breathing is retained in activity history and can be written to Apple Health as Mindful Minutes when permission is enabled.</p><blockquote><strong>Current scope:</strong> xHeal does not connect to Apple Watch for live HRV, display an HRV trend during breathing, calculate coherence, or provide a post-session HRV summary.</blockquote>",
  },
};

function applyGuideOverrides(
  definitions: Guide[],
  overrides: GuideOverrides
): Guide[] {
  return definitions.map((guide) => {
    const override = overrides[`${guide.category}/${guide.slug}`];
    return override ? { ...guide, ...override } : guide;
  });
}

export function getGuideCategories(locale: string = "en"): GuideCategoryInfo[] {
  return locale === "bg" ? guideCategoriesBg : guideCategoriesEn;
}

export function getAllGuides(locale: string = "en"): Guide[] {
  return locale === "bg" ? guidesBg : guidesEn;
}

export function getCategoryLabel(
  slug: GuideCategory,
  locale: string = "en"
): string {
  return getGuideCategories(locale).find((c) => c.slug === slug)?.label || slug;
}

export function getCategoryInfo(
  slug: GuideCategory,
  locale: string = "en"
): GuideCategoryInfo | undefined {
  return getGuideCategories(locale).find((c) => c.slug === slug);
}

export function getGuidesByCategory(
  category: GuideCategory,
  locale: string = "en"
): Guide[] {
  return getAllGuides(locale)
    .filter((g) => g.category === category)
    .sort((a, b) => a.order - b.order);
}

export function getGuide(
  category: string,
  slug: string,
  locale: string = "en"
): Guide | undefined {
  return getAllGuides(locale).find(
    (g) => g.category === category && g.slug === slug
  );
}

export function getGuideNavigation(
  locale: string = "en"
): GuideNavigationCategory[] {
  return getGuideCategories(locale).map(({ slug, label, icon }) => ({
    slug,
    label,
    icon,
    guides: getGuidesByCategory(slug, locale).map((guide) => ({
      slug: guide.slug,
      title: guide.title,
    })),
  }));
}

export function getNextGuide(
  currentCategory: string,
  currentSlug: string,
  locale: string = "en"
): Guide | undefined {
  const localeGuides = getAllGuides(locale);
  const categories = getGuideCategories(locale);
  const categoryGuides = localeGuides
    .filter((g) => g.category === currentCategory)
    .sort((a, b) => a.order - b.order);

  const currentIndex = categoryGuides.findIndex((g) => g.slug === currentSlug);
  if (currentIndex >= 0 && currentIndex < categoryGuides.length - 1) {
    return categoryGuides[currentIndex + 1];
  }

  const categoryIndex = categories.findIndex((c) => c.slug === currentCategory);
  if (categoryIndex >= 0 && categoryIndex < categories.length - 1) {
    const nextCategory = categories[categoryIndex + 1];
    const nextCategoryGuides = localeGuides
      .filter((g) => g.category === nextCategory.slug)
      .sort((a, b) => a.order - b.order);
    return nextCategoryGuides[0];
  }

  return undefined;
}

export function getPreviousGuide(
  currentCategory: string,
  currentSlug: string,
  locale: string = "en"
): Guide | undefined {
  const localeGuides = getAllGuides(locale);
  const categories = getGuideCategories(locale);
  const categoryGuides = localeGuides
    .filter((g) => g.category === currentCategory)
    .sort((a, b) => a.order - b.order);

  const currentIndex = categoryGuides.findIndex((g) => g.slug === currentSlug);
  if (currentIndex > 0) {
    return categoryGuides[currentIndex - 1];
  }

  const categoryIndex = categories.findIndex((c) => c.slug === currentCategory);
  if (categoryIndex > 0) {
    const prevCategory = categories[categoryIndex - 1];
    const prevCategoryGuides = localeGuides
      .filter((g) => g.category === prevCategory.slug)
      .sort((a, b) => a.order - b.order);
    return prevCategoryGuides[prevCategoryGuides.length - 1];
  }

  return undefined;
}

const guideDefinitionsEn: Guide[] = [
  {
    slug: "welcome",
    category: "getting-started",
    title: "Welcome to xHeal",
    description: "An overview of xHeal and what you can achieve with your personal health companion.",
    readingTime: 3,
    order: 1,
    content: "<h2>What is xHeal?</h2><p>xHeal is your personal health intelligence platform that brings together all your health data into one place. Think of it as a Digital Twin of your health - an AI that actually knows you and can help you understand patterns, predict issues, and make better health decisions.</p><h3>What Makes xHeal Different</h3><p>Unlike traditional health apps that track just one thing, xHeal connects the dots between:</p><ul><li><strong>Wearable data</strong> - steps, heart rate, sleep, HRV, and more from Apple Health</li><li><strong>Medical records</strong> - lab results, medications, conditions, and doctor visits</li><li><strong>Daily habits</strong> - nutrition, exercise, mindfulness, and lifestyle factors</li><li><strong>Self-reported data</strong> - symptoms, mood, energy levels, and flare-ups</li></ul><h3>Key Features at a Glance</h3><h4>Your Health Dashboard</h4><p>See your overall xHeal Score, biological age, and domain-specific health scores (Fitness, Medical, Mental, Nutrition) all in one place.</p><h4>Personalized Daily Routine</h4><p>Get a customized set of daily tasks including meals, workouts, mindfulness exercises, and medication reminders based on your health goals and conditions.</p><h4>AI Health Companion</h4><p>Ask questions about your health data in plain language and get answers grounded in your actual metrics and history.</p><h4>Health Reports</h4><p>Generate comprehensive reports like the My Snapshot wellness assessment, Health Gaps analysis, and Why Finder for pattern detection.</p><h4>Vitals Tracking</h4><p>Monitor 50+ health metrics with detailed visualizations and trend analysis.</p><h3>Ready to Get Started?</h3><p>Continue to the next guide to create your account and begin your health journey with xHeal.</p>",
  },
  {
    slug: "creating-your-account",
    category: "getting-started",
    title: "Creating Your Account",
    description: "Sign up for xHeal using your email, Apple, Google, or Facebook account.",
    readingTime: 2,
    order: 2,
    prerequisites: ["welcome"],
    content: "<h2>Sign Up Options</h2><p>xHeal offers multiple ways to create your account. Choose the method that is most convenient for you:</p><h3>Option 1: Email Sign Up</h3><ol><li>Open the xHeal app and tap <strong>Create Account</strong></li><li>Enter your email address and create a secure password</li><li>Check your email for a verification code</li><li>Enter the code in the app to verify your email</li><li>You are ready to start onboarding!</li></ol><h3>Option 2: Sign Up with Apple</h3><p>The fastest option for iPhone users:</p><ol><li>Tap <strong>Continue with Apple</strong></li><li>Use Face ID or Touch ID to authenticate</li><li>Choose whether to share or hide your email</li><li>Your account is created instantly</li></ol><blockquote><strong>Tip:</strong> Sign in with Apple lets you create an account without sharing your real email address. Apple generates a unique, random email that forwards to your real inbox.</blockquote><h3>Option 3: Google or Facebook</h3><ol><li>Tap <strong>Continue with Google</strong> or <strong>Continue with Facebook</strong></li><li>Sign in to your Google or Facebook account</li><li>Grant xHeal permission to access your basic profile</li><li>Your account is created using your social profile</li></ol><h3>Password Requirements</h3><p>If you sign up with email, your password must:</p><ul><li>Be at least 8 characters long</li><li>Include at least one uppercase letter</li><li>Include at least one number</li></ul><h3>Already Have an Account?</h3><p>Tap <strong>Sign In</strong> at the bottom of the screen and use your existing credentials to log in.</p><h3>Forgot Your Password?</h3><p>On the sign-in screen, tap <strong>Forgot Password?</strong> and enter your email. You will receive a link to reset your password.</p>",
  },
  {
    slug: "completing-onboarding",
    category: "getting-started",
    title: "Completing Onboarding",
    description: "Walk through the xHeal onboarding process to set up your health profile.",
    readingTime: 5,
    order: 3,
    prerequisites: ["creating-your-account"],
    content: "<h2>Your Onboarding Journey</h2><p>After creating your account, xHeal guides you through a personalized onboarding process. This takes about 5 minutes and helps us understand your health needs.</p><h3>Step 1: Welcome Screens</h3><p>You will see a brief introduction to xHeal key features including how your Digital Twin works, the types of data xHeal connects, and what you can achieve with the app.</p><h3>Step 2: Terms and Privacy</h3><p>Review and accept xHeal Terms of Service and Privacy Policy. Your health data is encrypted and never sold to third parties.</p><h3>Step 3: Create Your Profile</h3><p>Enter your basic health information including name, date of birth, biological sex, height, weight, and optionally race/ethnicity for certain health risk assessments.</p><h3>Step 4: Set Your Health Goals</h3><p>Choose what matters most to you right now: managing a chronic condition, improving fitness and energy, better sleep and recovery, weight management, stress reduction, or general wellness optimization. You can select multiple goals.</p><h3>Step 5: Name Your AI Companion</h3><p>Give your xHeal AI a custom name! This is the AI you will chat with about your health.</p><h3>Step 6: Connect Apple Health</h3><p>This is a crucial step for getting the most out of xHeal. See the Connecting Apple Health guide for detailed instructions.</p><h3>Step 7: Enable Notifications</h3><p>Allow notifications to receive daily task reminders, health insights and alerts, streak notifications, and report completion alerts.</p><h3>Step 8: Choose Your Plan</h3><p>Select your subscription tier: Free (basic features), Basic Monthly ($12.99/mo), or Basic Annual ($124.99/yr with ~20% savings).</p><h3>Step 9: You are In!</h3><p>After completing onboarding, you will land on your personalized Dashboard. Complete your Health Stories for deeper personalization within your first week.</p>",
  },
  {
    slug: "connecting-apple-health",
    category: "getting-started",
    title: "Connecting Apple Health",
    description: "Set up Apple Health integration to sync your wearable and health data automatically.",
    readingTime: 4,
    order: 4,
    prerequisites: ["creating-your-account"],
    content: "<h2>Why Connect Apple Health?</h2><p>Apple Health acts as a central hub for all your health data on iPhone. By connecting xHeal to Apple Health, you automatically sync steps, heart rate, HRV, sleep data, active energy, workouts, blood pressure, blood glucose, and data from connected devices like Apple Watch, Oura, and Whoop.</p><h3>Setting Up the Connection</h3><h4>During Onboarding</h4><ol><li>When you reach the Apple Health step, tap <strong>Connect Apple Health</strong></li><li>iOS will show the Health access screen</li><li>Tap <strong>Turn On All</strong> to grant xHeal access to all health categories</li><li>Tap <strong>Allow</strong> to confirm</li></ol><h4>After Onboarding</h4><p>Go to Settings, tap Data Sources, tap Apple Health, then tap Manage Permissions to adjust toggles for each data type.</p><h3>Recommended Permissions</h3><p>For the best experience, enable: Steps, Distance, Active Energy, Exercise Minutes, Stand Hours, Flights Climbed, Weight, Height, BMI, Body Fat, Heart Rate, Resting Heart Rate, HRV, Walking Heart Rate, Sleep Analysis, Blood Pressure, Blood Glucose, Body Temperature, Respiratory Rate, and Oxygen Saturation.</p><h3>How Sync Works</h3><p>Once connected, xHeal automatically syncs your data with real-time sync (new data appears within minutes), background sync (even when the app is closed), and historical import of your existing health history.</p><h3>Troubleshooting</h3><p>If data is not syncing, open iOS Settings, tap Health, tap Data Access and Devices, tap xHeal, and ensure the data types you want are toggled on.</p><blockquote><strong>Privacy Note:</strong> xHeal only reads the data you explicitly allow. We never write to Apple Health without your permission, and your data is encrypted both in transit and at rest.</blockquote>",
  },
  {
    slug: "dashboard-overview",
    category: "understanding-your-health",
    title: "Dashboard Overview",
    description: "Understand your personalized health dashboard and what each widget shows.",
    readingTime: 4,
    order: 1,
    content: "<h2>Your Health Command Center</h2><p>The Dashboard is the first thing you see when you open xHeal. It is designed to give you a quick snapshot of your overall health status and what needs your attention today.</p><h3>Dashboard Widgets</h3><h4>xHeal Score</h4><p>Your overall wellness score from 0-100, calculated from all your health data. Tap to see the breakdown and factors affecting your score.</p><h4>Domain Scores</h4><p>Four key health domains, each scored 0-100: Fitness (activity, exercise, physical performance), Medical (vital signs, lab results, clinical markers), Mental (mood, stress, sleep quality, mindfulness), and Nutrition (diet quality, macro balance, eating habits).</p><h4>Bio Age</h4><p>Your biological age compared to your chronological age. A lower bio age indicates better overall health.</p><h4>Daily Activity</h4><p>Today activity summary showing steps taken vs goal, active calories burned, and exercise minutes.</p><h4>Streak</h4><p>Your consecutive days of completing your Daily Routine. Building a streak helps form healthy habits and earns bonus Orbs.</p><h4>Quick Actions</h4><p>Fast access to common tasks like logging food, starting a workout, or checking in on your mood.</p><h3>Customizing Your Dashboard</h3><p>Scroll to the bottom of the Dashboard, tap Edit Dashboard, drag widgets to reorder them, toggle widgets on/off based on your preferences, and tap Done to save.</p><h3>Understanding Your Numbers</h3><p>Color coding helps you quickly understand your status: Green means optimal range, Yellow/Orange needs attention, Red is below optimal, and Purple/Blue is neutral or informational.</p>",
  },
  {
    slug: "xheal-score",
    category: "understanding-your-health",
    title: "Understanding Your xHeal Score",
    description: "Learn how your overall wellness score is calculated and how to improve it.",
    readingTime: 4,
    order: 2,
    content: "<h2>What is the xHeal Score?</h2><p>The xHeal Score is a comprehensive wellness metric that combines data from all aspects of your health into a single number from 0-100. Think of it as your overall health grade - higher is better.</p><h3>How It is Calculated</h3><p>Your xHeal Score is a weighted combination of your four domain scores: Fitness Score (25%) for activity levels, workout consistency, and cardiovascular fitness; Medical Score (25%) for vital signs, lab results, and medication adherence; Mental Score (25%) for sleep quality, stress levels, and mood stability; and Nutrition Score (25%) for diet quality, macro balance, and hydration.</p><h3>Score Ranges</h3><p>80-100 is Excellent, 60-79 is Good, 40-59 is Fair, and 0-39 Needs Work.</p><h3>Viewing Score Details</h3><p>Tap your xHeal Score on the Dashboard to see score breakdown by domain, trend over time, top factors helping your score, areas with improvement potential, and personalized recommendations.</p><h3>What Affects Your Score</h3><p>Positive factors include consistent sleep (7-9 hours), regular physical activity, completing Daily Routine tasks, balanced nutrition, mindfulness practice, and vital signs in healthy ranges. Negative factors include poor or irregular sleep, sedentary behavior, high stress indicators, missed medications, skipped meals, and elevated vital signs.</p><h3>Improving Your Score</h3><p>Complete your Health Stories, follow your Daily Routine, connect more data sources, focus on sleep, and address red flags first.</p><blockquote><strong>Remember:</strong> Your score will fluctuate day to day. Focus on the trend over weeks and months rather than daily variations.</blockquote>",
  },
  {
    slug: "setting-up-your-routine",
    category: "daily-routine",
    title: "Setting Up Your Routine",
    description: "Configure your personalized daily health routine based on your goals and conditions.",
    readingTime: 5,
    order: 1,
    content: "<h2>Your Personalized Daily Routine</h2><p>xHeal creates a customized daily routine tailored to your health goals, conditions, and preferences. Your routine includes tasks for nutrition, exercise, mindfulness, medications, and self-care.</p><h3>Initial Setup</h3><h4>Step 1: Select Your Goals</h4><p>Choose what you want to focus on: weight loss or gain, build muscle or improve fitness, manage chronic condition, reduce stress and anxiety, improve sleep quality, boost energy levels, or general wellness.</p><h4>Step 2: Add Health Conditions</h4><p>Select any conditions you are managing such as diabetes, hypertension, heart disease, autoimmune conditions, digestive issues, chronic fatigue, or anxiety/depression. xHeal uses this to customize recommendations.</p><h4>Step 3: Set Your Pace</h4><p>Choose your preferred intensity: Steady (fewer tasks, build habits slowly), Balanced (moderate number, recommended for most), or Intense (more tasks for faster progress).</p><h4>Step 4: Choose Week Start Day</h4><p>Select whether your week starts on Sunday or Monday for weekly progress tracking.</p><h3>Routine Structure</h3><p>Your daily routine is organized by time of day. Morning tasks include vitals check, breakfast logging, and supplements. Afternoon tasks include lunch logging, midday medications, and activity reminders. Evening tasks include dinner logging, evening medications, mood check-in, mindfulness practice, and sleep preparation.</p><h3>Modifying Your Routine</h3><p>Go to the Routine tab, tap the gear icon, adjust goals, conditions, or pace as needed, and tap Regenerate Routine to apply changes.</p><blockquote><strong>Tip:</strong> Start with Steady pace if you are new to health tracking. It is better to build consistent habits with fewer tasks than to overwhelm yourself.</blockquote>",
  },
  {
    slug: "completing-tasks",
    category: "daily-routine",
    title: "Completing Daily Tasks",
    description: "Learn how to work through your daily routine tasks and track your progress.",
    readingTime: 4,
    order: 2,
    prerequisites: ["setting-up-your-routine"],
    content: "<h2>Working Through Your Tasks</h2><p>Each day, your Routine tab shows the tasks you need to complete. Here is how to work through them efficiently.</p><h3>Viewing Your Tasks</h3><p>Open the Routine tab to see today tasks organized by time of day. Each task shows its icon and name, estimated time to complete, and completion status.</p><h3>Completing a Task</h3><ol><li>Tap on any task to open it</li><li>Follow the prompts or enter the required data</li><li>Tap Complete or Done</li><li>The task will be marked with a checkmark</li></ol><h3>Task Types</h3><p>Meal Tasks let you log meals using photo analysis, searching the food database, logging from your meal plan, or quick-logging saved meals. Workout Tasks show suggested workouts with exercise instructions and set/rep/weight logging. Medication Tasks let you confirm medication taken with time and optional side effect notes. Mindfulness Tasks include guided breathing and mood check-ins. Self-Assessment Tasks cover pain levels, energy levels, symptom tracking, and flare-up logging.</p><h3>Skipping Tasks</h3><p>Skip Today means the task will appear again tomorrow. Skip Indefinitely removes it from your routine until you manually add it back. Try to maintain at least 80% completion for the best results.</p><h3>Progress Calendar</h3><p>At the top of the Routine tab, you will see a weekly calendar showing green dots for completed days, partial fills for some tasks done, and empty circles for incomplete days.</p><h3>Building Your Streak</h3><p>Complete all your tasks for the day to maintain your streak: 7-day streak earns Bronze badge plus bonus Orbs, 30-day streak earns Silver badge plus more Orbs, and 90-day streak earns Gold badge plus significant Orbs reward.</p>",
  },
  {
    slug: "vitals-overview",
    category: "vitals-tracking",
    title: "Vitals Overview",
    description: "Explore all the health metrics xHeal tracks and how to view them.",
    readingTime: 5,
    order: 1,
    content: "<h2>Your Health Metrics Dashboard</h2><p>xHeal tracks over 50 different health metrics, organized into categories for easy navigation. Access your vitals by tapping the Vitals tab or selecting a metric from your Dashboard.</p><h3>Metric Categories</h3><h4>Activity</h4><p>Steps, Distance, Active Energy Burned, Exercise Minutes, Stand Hours, and Flights Climbed.</p><h4>Heart</h4><p>Heart Rate (current, resting, walking average), Heart Rate Variability (HRV), and Blood Pressure.</p><h4>Body</h4><p>Weight, Body Fat Percentage, BMI, and Body Temperature.</p><h4>Sleep</h4><p>Sleep Duration, Sleep Stages (REM, Deep, Light, Awake), and Sleep Quality Score.</p><h4>Respiratory</h4><p>Respiratory Rate and Blood Oxygen (SpO2).</p><h4>Lab Results</h4><p>Blood Glucose, Cholesterol Panel, Complete Blood Count, Metabolic Panel, and many more from uploaded lab reports.</p><h3>Viewing Vital Details</h3><p>Tap any metric to see its detailed view with Current Value, Trend Chart (7/30/90 days), Statistics (average, min, max), Healthy Range for your age/sex, and Related Insights from AI.</p><h3>Pinning Favorite Vitals</h3><p>Navigate to any vital detail page, tap the pin icon in the top right, and pinned vitals appear at the top of your Vitals tab.</p><h3>Adding Manual Readings</h3><p>Go to the vital detail page, tap Add Reading, enter the value and timestamp, and tap Save. Manual readings sync to Apple Health if enabled.</p><h3>Understanding Your Ranges</h3><p>Green means within optimal range, Yellow means slightly outside optimal, Orange needs attention, and Red is significantly outside healthy range. Ranges are personalized based on your age, sex, and health conditions.</p>",
  },
  {
    slug: "viewing-trends",
    category: "vitals-tracking",
    title: "Viewing Health Trends",
    description: "Learn how to analyze your health data trends over time with charts and statistics.",
    readingTime: 4,
    order: 2,
    prerequisites: ["vitals-overview"],
    content: "<h2>Understanding Your Health Trends</h2><p>Seeing a single data point is useful, but the real power of health tracking comes from understanding how your metrics change over time. xHeal provides powerful trend visualization tools.</p><h3>Accessing Trend Charts</h3><p>Navigate to any vital from the Vitals tab, tap on the metric to open its detail view, and the trend chart is displayed prominently at the top.</p><h3>Time Range Options</h3><p>Switch between different time ranges: 7 Days for recent daily variations, 30 Days for monthly patterns and weekly cycles, 90 Days for quarterly trends and seasonal effects, 1 Year for long-term progress, and All Time for your complete history.</p><h3>Reading the Charts</h3><p>Line Charts are used for continuous metrics like heart rate, weight, and HRV. The line shows your values over time, shaded areas indicate healthy ranges, tap any point to see exact value and date, and pinch to zoom. Bar Charts are used for daily totals like steps and calories. Each bar represents one day total, color indicates goal achievement, and tap for detailed breakdown.</p><h3>Statistics Panel</h3><p>Below the chart, you will find key statistics: Average (mean value), Minimum, Maximum, Trend (increasing, decreasing, or stable), and Variability (how much values fluctuate).</p><h3>Identifying Patterns</h3><p>Look for weekly cycles (steps often drop on weekends), correlations (poor sleep precedes lower HRV), and anomalies (sudden spikes indicating illness or stress).</p><h3>Exporting Trend Data</h3><p>Open the vital detail view, tap the share icon, choose export format (PDF or CSV), select date range, and share via email, message, or save to files.</p>",
  },
  {
    slug: "pinning-favorites",
    category: "vitals-tracking",
    title: "Pinning Favorite Vitals",
    description: "Customize your Vitals tab by pinning the metrics that matter most to you.",
    readingTime: 2,
    order: 3,
    prerequisites: ["vitals-overview"],
    content: "<h2>Quick Access to What Matters</h2><p>With 50+ health metrics available, you do not want to scroll through everything to find the ones you check daily. Pinning lets you customize which vitals appear at the top.</p><h3>How to Pin a Vital</h3><ol><li>Navigate to the vital you want to pin</li><li>Tap to open its detail view</li><li>Tap the pin icon in the top right corner</li><li>The vital is now pinned in your Favorites section</li></ol><h3>Managing Pinned Vitals</h3><p>Your pinned metrics appear at the very top in the Favorites section, showing current value, mini trend indicator, and status color. To reorder, tap Edit in the Favorites section, drag vitals to reorder, and tap Done. To unpin, tap the pin icon again or tap Edit and use the minus icon.</p><h3>Suggested Vitals to Pin</h3><p>For General Wellness: Steps, Sleep Duration, Resting Heart Rate, and Weight. For Fitness Focus: Active Energy, Exercise Minutes, HRV, and VO2 Max. For Chronic Condition Management: Blood Pressure, Blood Glucose, Heart Rate, and Sleep Quality. For Mental Wellness: HRV, Sleep Duration, Mood Score, and Mindful Minutes.</p><blockquote><strong>Tip:</strong> Start with 4-6 pinned vitals. Too many defeats the purpose of having quick access to the most important ones.</blockquote>",
  },
  {
    slug: "health-indicators",
    category: "vitals-tracking",
    title: "Understanding Health Indicators",
    description: "Learn about xHeal health indicators and risk scores derived from your data.",
    readingTime: 4,
    order: 4,
    prerequisites: ["vitals-overview"],
    content: "<h2>Beyond Raw Numbers</h2><p>Health indicators are calculated metrics that combine multiple data points to give you meaningful insights about your health status. They are more actionable than individual vital signs.</p><h3>Types of Health Indicators</h3><h4>Composite Scores</h4><p>Sleep Quality Score combines duration, efficiency, stages, and consistency. Recovery Score combines HRV, resting HR, sleep, and activity balance. Stress Index analyzes HRV patterns, heart rate, and sleep disruption. Fitness Level considers activity trends, workout performance, and recovery.</p><h4>Risk Indicators</h4><p>Cardiovascular Risk is based on blood pressure, heart rate trends, and activity. Metabolic Health considers blood glucose patterns, weight trends, and activity. Inflammation Markers include HRV depression, elevated resting HR, and poor sleep.</p><h4>Trend Alerts</h4><p>Notifications when metrics show concerning patterns like sustained elevation in resting heart rate, declining HRV over multiple days, sleep duration consistently below target, or blood pressure trending upward.</p><h3>Viewing Indicator Details</h3><p>Go to the Dashboard or Vitals tab, find the indicator widget, and tap to see the full breakdown including Current Score, Contributing Factors, Trend, and Recommendations.</p><h3>Acting on Indicators</h3><p>Green (Optimal) means keep doing what you are doing. Yellow (Attention) is not urgent but worth monitoring. Orange (Caution) means take action soon. Red (Alert) requires immediate attention - consider consulting a healthcare provider.</p><blockquote><strong>Important:</strong> Health indicators are informational tools, not medical diagnoses. Always consult healthcare professionals for medical concerns.</blockquote>",
  },
  {
    slug: "nutrition-overview",
    category: "nutrition",
    title: "Nutrition Overview",
    description: "Get started with xHeal nutrition features including meal planning and food logging.",
    readingTime: 4,
    order: 1,
    content: "<h2>Your Nutrition Hub</h2><p>xHeal nutrition features help you eat better with personalized meal plans, easy food logging, and detailed macro tracking.</p><h3>Nutrition Dashboard</h3><p>Access nutrition from the Nutrition section. The dashboard shows Daily Progress Rings (calories, protein, carbs, fat vs targets), Meals Logged Today, Weekly Summary, and Current Meal Plan if active.</p><h3>Key Features</h3><h4>Meal Planning</h4><p>Get a personalized weekly meal plan by setting dietary preferences, swiping through ingredients to indicate likes/dislikes, generating a custom 7-day plan, swapping recipes if needed, and auto-generating a shopping list.</p><h4>Food Logging</h4><p>Multiple ways to log: Photo Analysis (AI estimates calories/macros), Manual Search (1M+ foods database), From Meal Plan (one-tap logging), Recent Foods (quick-log frequent items), and Barcode Scan.</p><h4>Calorie Tracker</h4><p>Tap Log Food, Take Photo, photograph your meal, AI identifies foods and estimates portions, review and adjust, then confirm to log.</p><h4>Macro Targets</h4><p>Set personalized daily targets for calories based on your goals, protein target (typically 0.8-1.2g per pound), and carb/fat distribution based on diet type.</p><h3>Recipe Catalog</h3><p>Browse 500+ healthy recipes with filtering by cuisine, diet type, and prep time. See full nutrition information and step-by-step instructions.</p><h3>Shopping List</h3><p>When you activate a meal plan, ingredients are automatically aggregated, you can check off items as you shop, and it is organized by grocery store section.</p><blockquote><strong>Tip:</strong> Logging food consistently is more important than perfect accuracy. Even rough estimates help xHeal understand your eating patterns.</blockquote>",
  },
  {
    slug: "creating-meal-plans",
    category: "nutrition",
    title: "Creating Meal Plans",
    description: "Generate personalized weekly meal plans based on your preferences and goals.",
    readingTime: 5,
    order: 2,
    prerequisites: ["nutrition-overview"],
    content: "<h2>Personalized Meal Planning</h2><p>xHeal meal planning feature creates a complete weekly meal plan tailored to your dietary preferences, restrictions, and nutritional goals.</p><h3>Getting Started</h3><p>Go to the Nutrition section, tap Create Meal Plan or Generate Plan, and follow the setup wizard.</p><h3>Step 1: Dietary Preferences</h3><p>Select your eating style: Standard (no restrictions), Vegetarian, Vegan, Pescatarian, Keto (very low carb), Low Carb, Mediterranean, or Paleo.</p><h3>Step 2: Allergies and Restrictions</h3><p>Mark any foods to avoid: Gluten, Dairy, Nuts, Eggs, Soy, Shellfish, and more.</p><h3>Step 3: Ingredient Preferences</h3><p>The swipe feature helps xHeal understand your tastes. Swipe right for likes, left for dislikes. Aim to swipe through 30-50 ingredients for best results.</p><h3>Step 4: Macro Targets</h3><p>Confirm or adjust your daily targets for Calories (based on goals), Protein, Carbs, and Fat.</p><h3>Step 5: Generate Your Plan</h3><p>Tap Generate Plan and wait while xHeal creates your personalized 7-day meal plan (30-60 seconds).</p><h3>Reviewing Your Plan</h3><p>You will see 7 days of breakfast, lunch, dinner, and snacks with daily calorie and macro totals. Each recipe shows prep time and difficulty.</p><h3>Customizing Your Plan</h3><p>To swap recipes, tap any meal you do not like, tap Swap Recipe, and choose from alternatives or search the catalog. You can also adjust portions by tapping the meal.</p><h3>Activating Your Plan</h3><p>Tap Activate Plan when ready. Your plan is now live, meals appear in your Daily Routine, and the shopping list generates automatically.</p><h3>Plan Costs</h3><p>Free plan requires 100 Orbs per plan. Basic subscription includes unlimited plans.</p><blockquote><strong>Tip:</strong> Generate your meal plan on Saturday or Sunday so you can shop and prep before the week starts.</blockquote>",
  },
  {
    slug: "logging-food",
    category: "nutrition",
    title: "Logging Food and Meals",
    description: "Multiple ways to track what you eat - photo, search, scan, or from your meal plan.",
    readingTime: 4,
    order: 3,
    prerequisites: ["nutrition-overview"],
    content: "<h2>Track What You Eat</h2><p>Consistent food logging helps xHeal understand your nutrition patterns and provide better recommendations.</p><h3>Method 1: Photo Analysis (Fastest)</h3><ol><li>Tap Log Food from Dashboard or Routine</li><li>Tap Take Photo</li><li>Photograph your plate from above</li><li>AI identifies foods and estimates portions</li><li>Review and adjust if needed</li><li>Tap Log Meal</li></ol><p>Tips: Good lighting improves accuracy, capture the full plate, separate items if possible.</p><h3>Method 2: Search Database</h3><p>Tap Log Food, tap Search Foods, type the food name, select from results, adjust serving size, and tap Add. The database includes 1M+ foods.</p><h3>Method 3: Barcode Scan</h3><p>For packaged foods, tap Log Food, tap Scan Barcode, point camera at barcode, product info appears automatically, adjust serving and add.</p><h3>Method 4: From Meal Plan</h3><p>If following an xHeal meal plan, open your Routine, tap the meal task, and if the planned meal matches, tap Log as Planned for one-tap logging.</p><h3>Method 5: Recent and Favorites</h3><p>Recent shows your last 20 logged items. Favorites are foods you have starred. Custom Foods are items you created. Tap any to log instantly.</p><h3>Creating Custom Foods</h3><p>Tap Log Food, Create Custom Food, enter name, enter nutrition info (calories, protein, carbs, fat), set serving size, and save.</p><h3>Editing Logged Meals</h3><p>Go to Nutrition History or tap the logged meal, tap Edit, adjust foods/portions or remove items, and save changes.</p><h3>Logging Meals for Different Times</h3><p>Before confirming, tap Meal to select Breakfast, Lunch, Dinner, or Snack, and optionally change date/time.</p><blockquote><strong>Pro Tip:</strong> Logging does not have to be perfect. Rough estimates are far better than not logging at all.</blockquote>",
  },
  {
    slug: "calorie-tracker",
    category: "nutrition",
    title: "Using the Calorie Tracker",
    description: "Deep dive into xHeal AI-powered photo food analysis feature.",
    readingTime: 3,
    order: 4,
    prerequisites: ["logging-food"],
    content: "<h2>AI-Powered Food Analysis</h2><p>The Calorie Tracker is xHeal smart camera feature that analyzes photos of your food to estimate calories and macronutrients instantly.</p><h3>How It Works</h3><p>You take a photo, AI identifies individual food items, portion sizes are estimated using visual cues, nutritional data is calculated, and you review, adjust, and confirm.</p><h3>Taking the Best Photos</h3><p>For Lighting, natural daylight is ideal with even lighting without shadows. For Angle, top-down (bird's eye view) gives most accurate portion estimates. For Framing, include the entire plate with a small margin. For Background, a contrasting plate helps AI identify food boundaries.</p><h3>Reviewing Results</h3><p>After analysis, you will see list of identified foods, estimated portion for each, calories and macros per item, and total meal nutrition.</p><h3>Making Adjustments</h3><p>For wrong food, tap the item, tap Change Food, search for correct food, and select. For wrong portion, tap the item and adjust the serving size slider. For missing food, tap Add Item and search. For extra item, tap the item and tap Remove.</p><h3>Accuracy Expectations</h3><p>Food identification is approximately 85-90% accurate for common foods. Calorie estimation has approximately 15-25% margin of error. Accuracy improves with simple, separated foods, good lighting, and standard presentations.</p><h3>What It Handles Well</h3><p>Fruits and vegetables, grilled meats and fish, rice, pasta, bread, salads, and common restaurant dishes.</p><h3>What Is More Challenging</h3><p>Mixed casseroles and stews, foods with hidden ingredients, unusual or regional dishes, and very small portions.</p><blockquote><strong>Tip:</strong> For mixed dishes like stir-fry, consider logging the main ingredients separately using manual search for better accuracy.</blockquote>",
  },
  {
    slug: "shopping-list",
    category: "nutrition",
    title: "Using the Shopping List",
    description: "Generate and use shopping lists from your meal plans.",
    readingTime: 3,
    order: 5,
    prerequisites: ["creating-meal-plans"],
    content: "<h2>Streamlined Grocery Shopping</h2><p>When you activate a meal plan, xHeal automatically generates a shopping list with all the ingredients you will need for the week.</p><h3>Accessing Your Shopping List</h3><p>Go to the Nutrition section, tap Shopping List, or tap the cart icon from your active meal plan.</p><h3>How the List Is Organized</h3><p>Ingredients are grouped by grocery store section: Produce, Meat and Seafood, Dairy and Eggs, Bakery, Pantry, Frozen, Condiments and Spices, and Beverages.</p><h3>Using the List While Shopping</h3><p>Tap any item to mark it as purchased - checked items move to the bottom. Each item shows the total amount needed for the week. Tap and hold any ingredient to see which recipes use it.</p><h3>Editing the Shopping List</h3><p>To add items, scroll to the bottom and tap Add Item, type the item name, optionally select category, and add. To remove items, swipe left and tap Remove. To adjust quantities, tap the quantity to edit manually.</p><h3>Sharing Your List</h3><p>Tap the share icon, choose format (text list or app link), and share via Messages, Email, or other apps.</p><h3>Pantry Items</h3><p>Some ingredients are assumed (salt, pepper, cooking oil). These appear in a separate Pantry Staples section you can expand.</p><h3>Resetting the List</h3><p>After shopping, use Clear Checked to remove purchased items, or Reset All to uncheck everything.</p><blockquote><strong>Tip:</strong> Review the shopping list before leaving for the store. Remove items you already have to avoid buying duplicates.</blockquote>",
  },
  {
    slug: "workout-overview",
    category: "workouts",
    title: "Workout Overview",
    description: "Learn how to use xHeal workout features for personalized fitness.",
    readingTime: 4,
    order: 1,
    content: "<h2>Your Fitness Companion</h2><p>xHeal helps you exercise smarter with readiness-based recommendations, guided workouts, and progress tracking.</p><h3>Workout Dashboard</h3><p>The workout section shows Body Today / Readiness (your recovery status and workout recommendation), Recommended Workout (AI-selected based on readiness and goals), Recent Sessions (your workout history), and Progress Stats (volume, frequency, personal records).</p><h3>Readiness Score</h3><p>Before suggesting a workout, xHeal calculates your readiness based on sleep quality and duration, heart rate variability (HRV), resting heart rate, recent workout volume, and reported fatigue or soreness. Readiness determines whether you should push hard, do moderate exercise, or focus on recovery.</p><h3>Following a Workout</h3><ol><li>View your recommended workout or choose from the library</li><li>Tap Start Workout</li><li>Follow along with each exercise</li><li>Log sets, reps, and weights as you go</li><li>Complete the session and see your summary</li></ol><h3>Workout Types</h3><p>Strength Training includes resistance exercises with weight tracking. Cardio includes running, cycling, rowing. HIIT is high-intensity interval training. Flexibility includes stretching and mobility work. Recovery includes light movement and foam rolling.</p><h3>Tracking Progress</h3><p>xHeal tracks Personal Records (your best lifts), Volume Trends (total weight per week), Consistency (workout frequency), and Exercise History (performance on individual exercises).</p><h3>Apple Health Integration</h3><p>Completed workouts automatically sync to Apple Health including workout type and duration, calories burned, and heart rate data if wearing Apple Watch.</p>",
  },
  {
    slug: "readiness-score",
    category: "workouts",
    title: "Understanding Your Readiness Score",
    description: "Learn how xHeal determines if you should push hard or take it easy.",
    readingTime: 4,
    order: 2,
    prerequisites: ["workout-overview"],
    content: "<h2>Train Smarter with Readiness</h2><p>Your Readiness Score tells you how recovered your body is and whether you should push hard, train moderately, or focus on rest and recovery.</p><h3>What Is Readiness?</h3><p>Readiness is a daily score (0-100) that reflects your body ability to perform and adapt to training stress. Higher score means more recovered and ready for intense exercise.</p><h3>How It Is Calculated</h3><p>Sleep (40% weight) considers duration, quality, efficiency, stages, and consistency. HRV (30% weight) considers morning reading, 7-day trend, and comparison to baseline. Resting Heart Rate (15% weight) considers morning RHR and deviation from baseline. Training Load (15% weight) considers recent volume and intensity, days since rest, and cumulative fatigue.</p><h3>Score Interpretation</h3><p>80-100 (Peak Readiness) is great for high-intensity, PR attempts, long sessions, and competition. 60-79 (Good Readiness) suits moderate-intensity, regular sessions, and skill work. 40-59 (Reduced Readiness) suggests light exercise only, active recovery, and mobility work. Below 40 (Rest Recommended) means take a full rest day with gentle movement only, focusing on sleep and nutrition.</p><h3>Viewing Your Readiness</h3><p>Open the Workout section, your Readiness Score appears at the top, and tap to see the breakdown.</p><h3>Improving Your Readiness</h3><p>Prioritize sleep quality and duration, balance hard training with rest days, manage life stress, stay hydrated and well-nourished, and use active recovery strategically.</p><blockquote><strong>Remember:</strong> The best athletes are not those who train hardest every day - they are the ones who train hard when ready and recover when needed.</blockquote>",
  },
  {
    slug: "following-workouts",
    category: "workouts",
    title: "Following Workouts",
    description: "How to use xHeal guided workout feature during your training sessions.",
    readingTime: 4,
    order: 3,
    prerequisites: ["workout-overview"],
    content: "<h2>Guided Workout Sessions</h2><p>xHeal provides structured workouts you can follow step-by-step, with automatic tracking of your exercises, sets, and progress.</p><h3>Starting a Workout</h3><p>From Recommended Workout: go to Workout section, view your Recommended Workout, review exercises and duration, and tap Start Workout. From Workout Library: tap Browse Workouts, filter by type/duration/muscle group, select a workout, and tap Start Workout.</p><h3>During Your Workout</h3><p>Each exercise shows name and demo, target sets/reps/weight, rest timer, and notes or form cues. To log sets, complete a set, enter weight and actual reps, tap Log Set, and rest timer starts automatically.</p><h3>Navigation</h3><p>Swipe or tap arrows to move between exercises. Tap overview icon to see all exercises. Jump to any exercise by tapping it.</p><h3>Modifying On-the-Fly</h3><p>To change weight, tap the weight field and adjust. Log actual reps completed, not necessarily target. Tap + to add extra sets or swipe to remove. To swap exercises, tap exercise name, tap Swap Exercise, and choose an alternative. Tap Skip to move past an exercise.</p><h3>Rest Timers</h3><p>Rest timer starts automatically after logging. Adjust rest duration by tapping the timer. Tap Skip Rest when ready. Phone vibrates when rest is complete.</p><h3>Completing Your Workout</h3><p>After the last exercise, tap Finish Workout, add optional notes, rate difficulty, and view session summary showing total duration, exercises completed, total volume, PRs achieved, and estimated calories.</p><blockquote><strong>Pro Tip:</strong> If you have an Apple Watch, workout data including heart rate syncs automatically for more accurate calorie estimates.</blockquote>",
  },
  {
    slug: "tracking-progress",
    category: "workouts",
    title: "Tracking Workout Progress",
    description: "Monitor your fitness gains with exercise history and personal records.",
    readingTime: 4,
    order: 4,
    prerequisites: ["following-workouts"],
    content: "<h2>See Your Fitness Gains</h2><p>Consistent tracking reveals your progress over time. xHeal automatically records your workout history and highlights personal achievements.</p><h3>Workout History</h3><p>Go to Workout section, tap History, and browse past sessions by date.</p><h3>Session Details</h3><p>Tap any past workout to see all exercises performed, sets/reps/weights, total volume and duration, notes, and heart rate data.</p><h3>Personal Records</h3><p>xHeal automatically tracks PRs: 1RM (One Rep Max) is heaviest weight for one rep, Volume PR is most total weight in a workout, and Reps PR is most reps at a given weight. View PRs in Workout, Progress, Personal Records, browsing by exercise. When you hit a new PR, xHeal shows a celebration, marks it in history, and awards bonus Orbs.</p><h3>Exercise Progress Charts</h3><p>Go to Progress, tap Exercise Progress, select an exercise, and view charts showing weight and rep progression.</p><h3>Volume Tracking</h3><p>Total volume equals weight times reps times sets. Track weekly volume, volume by muscle group, and volume trends for progressive overload.</p><h3>Workout Frequency</h3><p>Monitor workouts per week, streak of consecutive workout weeks, and distribution by workout type.</p><h3>Body Measurements</h3><p>Track physical changes alongside workout progress including weight, body measurements (arms, chest, waist), and progress photos if enabled.</p><h3>Setting Goals</h3><p>Go to Progress, tap Set Goal, choose exercise and target, and optionally set deadline. xHeal tracks progress and notifies when achieved.</p><h3>Sharing Progress</h3><p>Export progress reports as PDF, share PR achievements to social media, and send summaries to trainers.</p><blockquote><strong>Key Principle:</strong> Progressive overload is the foundation of strength gains. Aim to gradually increase weight, reps, or volume over time.</blockquote>",
  },
  {
    slug: "mindfulness-overview",
    category: "mindfulness",
    title: "Mindfulness Overview",
    description: "Discover xHeal mental wellness features including breathing and mood tracking.",
    readingTime: 4,
    order: 1,
    content: "<h2>Mental Wellness Features</h2><p>xHeal supports your mental health with breathing exercises, mood tracking, and mindfulness tools that integrate with your overall health picture.</p><h3>Your Mind Today</h3><p>The mindfulness dashboard shows your current mental wellness score based on recent mood check-ins, sleep quality, HRV trends (stress indicator), activity levels, and mindfulness practice frequency.</p><h3>Breathing Exercises</h3><p>xHeal includes 6 science-backed breathing patterns: Box Breathing (4-4-4-4 for focus and calm), 4-7-8 Breathing (inhale 4, hold 7, exhale 8 for sleep and anxiety), Coherent Breathing (5-second inhales and exhales for HRV optimization), Energizing Breath (quick inhales, longer exhales for alertness), Calming Breath (extended exhales for parasympathetic activation), and Custom Pattern (create your own).</p><h3>Ambient Sounds</h3><p>Enhance your practice with 10 background soundscapes: Rain, Ocean waves, Forest, Fireplace, White noise, and more.</p><h3>Mood Check-Ins</h3><p>Track your emotional state across 5 dimensions rated 1-10: Mood (overall emotional state), Energy (physical and mental), Stress (current level), Anxiety (anxious feelings), and Focus (mental clarity). Check in daily to build a picture of your mental wellness patterns.</p><h3>HRV Biofeedback</h3><p>If you have an Apple Watch, xHeal can display real-time HRV during breathing exercises. This helps you see the immediate impact on your nervous system.</p><h3>Mindful Minutes</h3><p>Completed mindfulness sessions count toward your Apple Health Mindful Minutes and contribute to your Mental domain score.</p>",
  },
  {
    slug: "breathing-exercises",
    category: "mindfulness",
    title: "Breathing Exercises Guide",
    description: "Detailed guide to all breathing patterns available in xHeal.",
    readingTime: 5,
    order: 2,
    prerequisites: ["mindfulness-overview"],
    content: "<h2>The Science of Breathing</h2><p>Controlled breathing directly influences your nervous system. Different patterns activate either the sympathetic (fight-or-flight) or parasympathetic (rest-and-digest) response.</p><h3>Starting a Breathing Session</h3><p>Go to Mindfulness, tap Breathing, choose a pattern, select duration (1-20 minutes), optionally add ambient sounds, and tap Start.</p><h3>Available Patterns</h3><p>Box Breathing (4-4-4-4): Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Best for focus and stress reduction. 4-7-8 Breathing: Inhale 4s, Hold 7s, Exhale 8s. Best for sleep and anxiety. Coherent Breathing: Inhale 5s, Exhale 5s with no holds. Best for HRV optimization at 6 breaths per minute. Energizing Breath: Quick inhale 2s, Slow exhale 6s. Best for morning alertness. Calming Breath: Inhale 4s, Exhale 8s. Best for anxiety relief with 1:2 ratio. Custom Pattern: Create your own with custom inhale, hold, exhale, and post-exhale hold durations.</p><h3>During Your Session</h3><p>Visual animation guides your breath, haptic feedback marks transitions, session timer shows remaining time, and tap to pause/resume.</p><h3>Ambient Sounds</h3><p>Rain, Ocean, Forest, Fireplace, Stream, Wind, Night, White Noise, Pink Noise, and Brown Noise.</p><h3>Tips for Effective Practice</h3><p>Find a comfortable position, close your eyes or soften gaze, breathe through nose when possible, let belly expand on inhales, do not strain, and maintain consistency over duration.</p><blockquote><strong>Pro Tip:</strong> If you have an Apple Watch, enable HRV biofeedback to see your heart rate variability change in real-time during exercises.</blockquote>",
  },
  {
    slug: "mood-check-ins",
    category: "mindfulness",
    title: "Mood Check-Ins",
    description: "How to track your emotional state and understand patterns over time.",
    readingTime: 3,
    order: 3,
    prerequisites: ["mindfulness-overview"],
    content: "<h2>Track Your Emotional Wellness</h2><p>Regular mood tracking helps you understand your emotional patterns and identify factors that influence how you feel.</p><h3>The 5-Dimension Model</h3><p>Mood (overall emotional state): 1-3 is low/down, 4-6 is neutral, 7-10 is good/great. Energy (physical and mental): 1-3 is exhausted, 4-6 is moderate, 7-10 is energized. Stress (reverse scored): 1-3 is calm, 4-6 is some stress, 7-10 is high stress. Anxiety (worry/nervousness): 1-3 is calm, 4-6 is mild, 7-10 is significant. Focus (mental clarity): 1-3 is scattered, 4-6 is moderate, 7-10 is sharp.</p><h3>How to Check In</h3><p>Go to Mindfulness or Routine, tap Mood Check-In, rate each dimension using the slider, add optional notes, and tap Save.</p><h3>When to Check In</h3><p>Daily at least once per day, same time if possible. Morning captures baseline. Evening reflects on the day. After significant events good or bad.</p><h3>Using Notes</h3><p>Add context: what happened today, how you slept, significant stressors, activities, and social interactions.</p><h3>Viewing Mood History</h3><p>Go to Mindfulness, tap Mood History, view charts for each dimension, and switch between 7/30/90 day views.</p><h3>Understanding Patterns</h3><p>Look for correlations between mood and sleep quality, energy and exercise, stress and work days vs weekends, anxiety and specific events, and focus and sleep duration.</p><h3>Mood and Your xHeal Score</h3><p>Mood check-ins contribute to your Mental domain score. Consistent positive mood, low stress, and good energy improve your overall wellness assessment.</p><blockquote><strong>Tip:</strong> Do not judge yourself for low scores. The purpose of tracking is awareness and understanding, not achieving perfect numbers.</blockquote>",
  },
  {
    slug: "hrv-biofeedback",
    category: "mindfulness",
    title: "HRV Biofeedback",
    description: "Use real-time heart rate variability to enhance your mindfulness practice.",
    readingTime: 4,
    order: 4,
    prerequisites: ["breathing-exercises"],
    content: "<h2>Real-Time Nervous System Feedback</h2><p>HRV biofeedback shows you how your breathing directly affects your nervous system, turning mindfulness from a subjective experience into something you can see and measure.</p><h3>What Is HRV?</h3><p>Heart Rate Variability measures the variation in time between heartbeats. Higher HRV generally indicates better stress resilience, stronger parasympathetic tone, good recovery status, and cardiovascular fitness.</p><h3>Requirements</h3><p>Apple Watch (Series 4 or newer recommended), watch worn during session, and HRV permissions enabled in Apple Health.</p><h3>How It Works</h3><p>Start a breathing session, xHeal connects to your Apple Watch, real-time HRV appears on screen, and you watch how HRV responds to your breathing.</p><h3>Reading the Display</h3><p>HRV Value (in milliseconds): below 20ms is low/stressed, 20-50ms is moderate, above 50ms is good parasympathetic activation. Individual baselines vary - compare to your own average. HRV Trend Line shows how HRV changes throughout session. Ideally see HRV increasing, rhythmic fluctuations aligned with breath, and gradual overall increase. Coherence Indicator shows how well heart rhythm is synchronized with breathing.</p><h3>Using Biofeedback Effectively</h3><p>Start without looking - begin normally. After a few minutes, glance at the display. Experiment with slower vs faster breathing, longer exhales, visualization, and different sounds. Do not force it - paradoxically, trying too hard can lower HRV.</p><h3>Post-Session Summary</h3><p>Shows average HRV, starting vs ending HRV, peak HRV, and time in high-coherence state.</p><h3>Building Skill Over Time</h3><p>With practice, you will reach higher HRV faster, maintain coherence longer, improve baseline HRV, and transfer the skill to stressful situations.</p><blockquote><strong>Pro Tip:</strong> Use HRV biofeedback a few times per week to learn, but do not become dependent. The goal is internal awareness you can access anywhere.</blockquote>",
  },
  {
    slug: "chatting-with-xheal",
    category: "ai-companion",
    title: "Chatting with Your AI",
    description: "Learn how to get the most out of conversations with your xHeal AI companion.",
    readingTime: 4,
    order: 1,
    content: "<h2>Your Personal Health AI</h2><p>The xHeal AI companion is your personal health assistant that understands your complete health picture and can answer questions grounded in your actual data.</p><h3>Starting a Conversation</h3><ol><li>Tap the Chat tab at the bottom of the app</li><li>Tap New Conversation or continue an existing one</li><li>Type your question or use voice input</li><li>The AI responds with personalized insights</li></ol><h3>What You Can Ask</h3><p>Data Questions: How was my sleep last week? What is my average heart rate this month? Show me my weight trend over 90 days. When was my last blood pressure reading? Pattern Analysis: Why was my energy low Tuesday? What correlates with my good sleep nights? Do my headaches follow any pattern? How does stress relate to my HRV? Recommendations: What should I focus on to improve my score? Should I work out today based on recovery? What foods might help with inflammation? Health Education: What is HRV and why does it matter? Explain my cholesterol numbers. What is a healthy blood pressure range?</p><h3>Getting Better Answers</h3><p>Be specific (How was my sleep last Tuesday vs How is my sleep). Include timeframes (this week, past month, since January). Ask follow-ups. Provide context (I felt tired today, what might explain it).</p><h3>Conversation History</h3><p>View past conversations from Chat History, continue previous conversations for context, and delete conversations you no longer need.</p><h3>Limitations</h3><p>Cannot diagnose conditions, cannot prescribe treatments, should not be used for emergencies, and always consult healthcare providers for medical decisions.</p><blockquote><strong>Remember:</strong> The AI is helpful and informative, but responses are based on patterns in your data, not medical expertise. When in doubt, ask your doctor.</blockquote>",
  },
  {
    slug: "asking-health-questions",
    category: "ai-companion",
    title: "Asking Better Health Questions",
    description: "Tips and examples for getting the most useful answers from your AI companion.",
    readingTime: 4,
    order: 2,
    prerequisites: ["chatting-with-xheal"],
    content: "<h2>Get More From Your AI</h2><p>The quality of answers depends largely on how you ask. Here is how to frame questions for the most useful, personalized responses.</p><h3>Be Specific</h3><p>Instead of How is my health, try How has my sleep quality changed over the past month, What is my average resting heart rate this week compared to last month, or Am I meeting my step goals consistently.</p><h3>Include Time Frames</h3><p>Be clear about the period: in the past week, over the last 30 days, since I started using xHeal, compared to January, or on weekdays vs weekends.</p><h3>Ask About Patterns</h3><p>The AI excels at finding patterns: Is there a pattern to when I sleep best? What days do I have most energy? Do my flare-ups correlate with anything? What typically happens to my HRV after poor sleep?</p><h3>Provide Context</h3><p>Instead of Why am I tired, try I have felt tired the last 3 days even though I think I slept well. Can you look at my sleep data and other factors that might explain it?</p><h3>Ask Follow-Up Questions</h3><p>Can you explain that in simpler terms? What specifically should I do? How does that compare to normal? What other factors might be involved?</p><h3>Example Question Categories</h3><p>Data Queries: What was my average blood pressure last month? Show me my weight trend over 6 months. How many hours of sleep did I get on average last week? Pattern Analysis: What factors affect my sleep quality most? Is there a relationship between my stress and HRV? Recommendations: Based on my data, what should I focus on? Should I work out today given my readiness? Education: What does HRV mean? Explain my cholesterol results in plain language.</p><h3>What the AI Cannot Do</h3><p>No diagnosis, no prescriptions, not for emergencies, and not a replacement for healthcare providers.</p><h3>When to Ask Your Doctor Instead</h3><p>Persistent abnormal readings, new or worsening symptoms, questions about medications, mental health concerns requiring professional support, or any situation where you would normally see a doctor.</p><blockquote><strong>Pro Tip:</strong> Before a doctor appointment, ask the AI to summarize your key health trends. This helps have more productive conversations with your provider.</blockquote>",
  },
  {
    slug: "flare-up-tracking",
    category: "advanced-features",
    title: "Flare-Up Tracking",
    description: "Log and analyze symptom flare-ups to identify patterns and triggers.",
    readingTime: 4,
    order: 1,
    content: "<h2>Understanding Your Flare-Ups</h2><p>If you live with a chronic condition, tracking flare-ups helps identify triggers and patterns. xHeal makes it easy to log flare-ups and analyze what might be causing them.</p><h3>Logging a Flare-Up</h3><ol><li>Go to your Daily Routine or Dashboard</li><li>Tap Log Flare-Up</li><li>Select the type (pain, fatigue, digestive, skin, etc.)</li><li>Rate the severity (1-10)</li><li>Note the time it started</li><li>Add relevant details or notes</li><li>Save the entry</li></ol><h3>What to Track</h3><p>Symptoms (what you are experiencing), Severity (1-10), Duration (how long it lasts), Location (where in your body), and Suspected triggers.</p><h3>Flare-Up Insights</h3><p>After logging several flare-ups, xHeal analyzes: Time patterns (do they occur at certain times), Activity correlations (what did you do before), Sleep relationships (did poor sleep precede it), Food connections, and Weather impacts (barometric pressure, temperature).</p><h3>Why Finder Report</h3><p>Generate a comprehensive analysis: Go to Reports, select Why Finder, xHeal analyzes all flare-up data against health metrics, and receive a detailed report identifying potential triggers. The Why Finder looks at patterns across all your data to find correlations you might not notice.</p><h3>Tips for Effective Tracking</h3><p>Log consistently (even mild ones), log promptly (when details are fresh), be honest about severity, track good days too (for baselines), and review patterns monthly.</p>",
  },
  {
    slug: "skin-analysis",
    category: "advanced-features",
    title: "Using Skin Analysis (Skinspect)",
    description: "Analyze skin conditions with AI-powered photo analysis.",
    readingTime: 4,
    order: 2,
    content: "<h2>AI-Powered Skin Analysis</h2><p>Skinspect uses computer vision to analyze photos of your skin and provide insights about potential conditions, changes, and recommendations.</p><h3>What Skinspect Can Assess</h3><p>Skin texture and tone, acne and blemishes, redness and inflammation, dryness and hydration, signs of aging, moles and spots (for monitoring changes), and rashes and irritation.</p><h3>Taking Analysis Photos</h3><p>Go to Skinspect from menu, tap New Analysis, select body area, follow positioning guide, and capture photo.</p><h3>Photo Tips for Best Results</h3><p>For Lighting, natural daylight is ideal without harsh direct sunlight or flash. For Distance, close enough to see detail but far enough for context. For Focus, tap to focus and hold steady. For Clean Skin, remove makeup if possible.</p><h3>Understanding Your Results</h3><p>Identified concerns (what AI detected), Severity assessment (mild, moderate, significant), Recommendations (suggested actions), and When to see a doctor.</p><h3>Tracking Changes Over Time</h3><p>Take photos of same areas periodically, AI compares to previous photos, alerts to significant changes, and track improvement with treatments.</p><h3>Mole Monitoring</h3><p>Document each mole with a photo, set reminders for regular re-checks, AI alerts if size/shape/color changes, and concerning changes prompt dermatologist visit.</p><h3>Important Limitations</h3><p>Not a diagnosis, cannot detect everything, and should supplement not replace dermatologist visits.</p><h3>When to See a Dermatologist</h3><p>Moles that change, new unusual growths, persistent rashes, any concerning symptoms, or when Skinspect recommends evaluation.</p><blockquote><strong>Important:</strong> Skinspect is a monitoring tool, not a diagnostic tool. It helps track skin health and know when to seek professional care.</blockquote>",
  },
  {
    slug: "document-upload",
    category: "advanced-features",
    title: "Uploading Health Documents",
    description: "Import lab results, medical records, and health documents into xHeal.",
    readingTime: 4,
    order: 3,
    content: "<h2>Centralize Your Health Records</h2><p>xHeal can extract and organize data from your health documents, bringing lab results, medical records, and other information into your unified health profile.</p><h3>Supported Document Types</h3><p>Lab Results (blood tests, metabolic panels), Medical Records (doctor notes, visit summaries), Imaging Reports (X-ray, MRI, CT reports), Prescription Records, and Vaccination Records.</p><h3>Supported Formats</h3><p>PDF documents, Images (JPG, PNG), and Photos of paper documents.</p><h3>How to Upload</h3><p>From Files: Go to Settings, Data Sources, Upload Document, Choose File, navigate to your PDF or image. From Camera: Tap Upload Document, Take Photo, photograph document, crop and adjust, confirm. From Email: Open email with attachment, tap attachment, share to xHeal using share sheet.</p><h3>AI Data Extraction</h3><p>After upload, AI reads document using OCR, identifies data fields, extracts structured data, and presents for your review.</p><h3>Reviewing Extracted Data</h3><p>Review extracted values, correct any errors, confirm date of results, and approve to add to health data.</p><h3>Where Extracted Data Goes</h3><p>Lab values go to Vitals section, Medications go to Medications list, Conditions go to Health conditions, and Reports go to Documents library.</p><h3>Viewing Uploaded Documents</h3><p>Go to Settings, Data Sources, Documents, browse uploaded documents, tap any to view, and see associated extracted data.</p><h3>Tips for Better Extraction</h3><p>Use high-quality scans or photos, ensure text is readable, include all pages, and standard lab formats work best.</p><h3>Privacy and Security</h3><p>Documents are encrypted during upload and storage, processing happens securely, you control what is saved, and delete documents anytime.</p><blockquote><strong>Tip:</strong> After your next doctor visit or lab test, upload results right away to keep your xHeal profile current.</blockquote>",
  },
  {
    slug: "health-integrations",
    category: "advanced-features",
    title: "Health System Integrations",
    description: "Connect to healthcare providers via Epic and FHIR for automatic record sync.",
    readingTime: 4,
    order: 4,
    content: "<h2>Connect to Your Healthcare Providers</h2><p>xHeal can connect directly to supported healthcare systems to automatically import your medical records, lab results, and clinical data.</p><h3>What Is FHIR?</h3><p>FHIR (Fast Healthcare Interoperability Resources) is a standard that allows health apps to securely exchange data with healthcare providers. Many major health systems now support FHIR.</p><h3>Supported Health Systems</h3><p>xHeal supports Epic-powered health systems including major academic medical centers, large hospital networks, and many regional healthcare systems.</p><h3>Setting Up a Connection</h3><p>Go to Settings, Integrations, tap Connect Health System, search for your provider, select from list, and tap Connect.</p><h3>Authentication</h3><p>You will be redirected to your health system login. Enter patient portal credentials, complete two-factor authentication, review data access request, and approve connection.</p><h3>What Data Is Imported</h3><p>Demographics, Conditions (diagnosed problems), Medications (current and past), Allergies, Lab Results, Vital Signs (from clinical visits), Immunizations, and Procedures.</p><h3>Sync Frequency</h3><p>Initial sync imports available history, ongoing sync checks periodically, and manual refresh is available anytime.</p><h3>Managing Connections</h3><p>Go to Settings, Integrations, see connected systems, tap any for details, and disconnect anytime with Remove Connection.</p><h3>Multiple Health Systems</h3><p>Connect multiple providers (primary care, specialists, hospitals, labs). Data from all sources merges into your unified profile.</p><h3>Troubleshooting</h3><p>If you cannot find your provider, not all systems support FHIR yet - you can upload documents manually or check back later. If connection failed, verify credentials work, check if app connection is enabled, and try disconnecting and reconnecting.</p><h3>Privacy and Control</h3><p>You initiate and control the connection, xHeal only accesses authorized data, revoke access anytime, and data is encrypted and never sold.</p><blockquote><strong>Pro Tip:</strong> Connecting your primary care provider gives xHeal access to your most comprehensive record, significantly improving insights.</blockquote>",
  },
  {
    slug: "orbs-rewards",
    category: "account-rewards",
    title: "Orbs Rewards System",
    description: "Learn how to earn and use Orbs, xHeal reward currency.",
    readingTime: 3,
    order: 1,
    content: "<h2>Earn While You Heal</h2><p>Orbs are xHeal reward currency that you earn by engaging with the app and completing healthy activities. Use them to unlock premium features.</p><h3>How to Earn Orbs</h3><p>Daily Activities: Complete Daily Routine (10-50 Orbs based on completion), Log meals (5 Orbs per meal), Complete workouts (10-25 Orbs based on duration), Mood check-ins (5 Orbs each), Breathing exercises (5-10 Orbs per session). Streaks: 7-day streak (50 bonus Orbs), 30-day streak (200 bonus Orbs), 90-day streak (500 bonus Orbs). Milestones: Complete onboarding (100 Orbs), Complete all Health Stories (250 Orbs), First meal plan generated (50 Orbs), Connect Apple Health (50 Orbs).</p><h3>Using Orbs</h3><p>Generate meal plan (100 Orbs), Generate health report (50-100 Orbs depending on type), Additional AI chat queries (10 Orbs per query on free plan), Premium features access (varies).</p><h3>Checking Your Balance</h3><p>Go to Settings, tap Wallet, view current Orbs balance, and see transaction history.</p><h3>Orbs vs Subscription</h3><p>With paid subscription, most features are unlimited. Orbs are most valuable for free plan users accessing premium occasionally, extra meal plans beyond limits, and unlocking special reports.</p><blockquote><strong>Note:</strong> Orbs have no cash value and cannot be transferred or sold. They are purely an in-app reward system to encourage healthy habits.</blockquote>",
  },
  {
    slug: "subscription-plans",
    category: "account-rewards",
    title: "Subscription Plans",
    description: "Compare xHeal subscription tiers and choose the right plan for you.",
    readingTime: 3,
    order: 2,
    content: "<h2>Choose Your Plan</h2><p>xHeal offers flexible subscription options to fit different needs and budgets.</p><h3>Available Plans</h3><p>Free ($0/month) includes basic health tracking, Apple Health sync, limited AI chat (10/month), basic daily routine, vitals dashboard, and mood tracking. Limitations: no meal plan generation, limited reports, no advanced AI, use Orbs for premium. Basic Monthly ($12.99/month) includes everything in Free plus unlimited AI chat, unlimited meal plans, all health reports, advanced insights, priority support, full workout library, and advanced mindfulness. Basic Annual ($124.99/year, approximately $10.42/month) has same features as monthly with approximately 20% savings, one annual payment, and price locked for 12 months.</p><h3>Subscribing</h3><p>Go to Settings, Subscription, view plans, tap Subscribe on chosen plan, confirm with Apple Pay or Apple ID, and subscription activates immediately.</p><h3>Managing Your Subscription</h3><p>View Current Plan in Settings, Subscription shows plan, renewal date, and price. To change plans, upgrade from Free anytime or switch Monthly/Annual when period ends. To cancel, go to Settings, Subscription, Manage Subscription (opens Apple subscription management), and cancel there. You keep access until paid period ends.</p><h3>Free Trial</h3><p>New users may be eligible for 7-day free trial of Basic with full access, cancel anytime during trial, and no charge if cancelled before trial ends.</p><h3>Which Plan Is Right for You?</h3><p>Choose Free if you want to try xHeal first, basic tracking meets needs, or you will use Orbs for premium. Choose Basic if you want AI meal planning, will use AI chat frequently, want comprehensive reports, or are serious about health optimization.</p><blockquote><strong>Tip:</strong> Start with Free to explore xHeal. Upgrade to Basic when you want features like unlimited AI chat or meal planning.</blockquote>",
  },
  {
    slug: "managing-settings",
    category: "account-rewards",
    title: "Managing Your Settings",
    description: "Navigate account settings, preferences, and app configuration options.",
    readingTime: 4,
    order: 3,
    content: "<h2>Customize Your xHeal Experience</h2><p>The Settings menu gives you control over your account, preferences, connected services, and app behavior.</p><h3>Accessing Settings</h3><p>Tap the gear icon in the top corner of Dashboard or navigate to Settings tab.</p><h3>Account Settings</h3><p>Edit Profile: update name, date of birth, height, weight, sex, and photo. Email and Password: change email, update password, manage auth methods. Subscription: view plan, upgrade, view usage, manage payment.</p><h3>Health Settings</h3><p>Medications: add medications, set dosages and schedules, mark current/past, set reminders. Supplements: add supplements, set dosages, configure reminders. Allergies: record food, medication, and environmental allergies. Conditions: add diagnosed conditions, mark active/resolved. Life Events: log surgeries, injuries, and major changes for health context.</p><h3>Data Sources</h3><p>Apple Health: view connection, manage permissions, force sync. Integrations: connect health systems, manage FHIR connections. Documents: view uploaded documents, upload new, delete old.</p><h3>Notifications</h3><p>Control task reminders (morning, afternoon, evening), streak reminders, health insights, report alerts, and weekly summaries.</p><h3>Preferences</h3><p>Units: weight (kg/lbs), height (cm/ft-in), temperature (C/F), distance (km/miles). Week Start: Sunday or Monday. Appearance: dark mode (default) or match system.</p><h3>Support and Info</h3><p>FAQs, Contact Support, and About (version, legal, licenses).</p><h3>Account Actions</h3><p>Log Out signs out on this device. Delete Account permanently deletes account and all data (cannot be undone).</p><h3>Privacy Controls</h3><p>Download your data, review data sharing settings, and manage analytics preferences.</p><blockquote><strong>Tip:</strong> Review notification settings after initial setup. Adjust to find the right balance - enough reminders to stay on track without feeling overwhelmed.</blockquote>",
  },
];

const guidesEn: Guide[] = applyGuideOverrides(
  guideDefinitionsEn,
  guideOverridesEn
);

// Bulgarian guides are authored directly against the corrected English content,
// so they carry no override layer of their own. Slug, category, order,
// readingTime, icon and prerequisites are locale-invariant and stay in lockstep
// with the English set; only the prose differs.
const guideCategoriesBg: GuideCategoryInfo[] = [
  {
    slug: "getting-started",
    label: "Първи стъпки",
    description: "Първи стъпки с xHeal — настройка, onboarding и свързване на здравните ви данни.",
    icon: "rocket_launch",
  },
  {
    slug: "understanding-your-health",
    label: "Разбиране на здравето",
    description: "Научете за здравните си резултати, биологичната възраст и персонализираните прозрения.",
    icon: "monitoring",
  },
  {
    slug: "daily-routine",
    label: "Дневна рутина",
    description: "Настройте и изпълнявайте персонализираните си дневни здравни задачи.",
    icon: "event_note",
  },
  {
    slug: "vitals-tracking",
    label: "Жизнени показатели",
    description: "Следете здравните си показатели и разбирайте тенденциите с течение на времето.",
    icon: "vital_signs",
  },
  {
    slug: "nutrition",
    label: "Хранене",
    description: "Планиране на хранения, записване на храна и проследяване на калории.",
    icon: "restaurant",
  },
  {
    slug: "workouts",
    label: "Тренировки",
    description: "Проследяване на фитнес, препоръки за тренировки и напредък в упражненията.",
    icon: "fitness_center",
  },
  {
    slug: "mindfulness",
    label: "Осъзнатост",
    description: "Дихателни упражнения, проследяване на настроението и инструменти за психично благополучие.",
    icon: "self_improvement",
  },
  {
    slug: "ai-companion",
    label: "AI асистент",
    description: "Разговаряйте с личния си здравен AI и получавайте персонализирани отговори.",
    icon: "smart_toy",
  },
  {
    slug: "advanced-features",
    label: "Разширени функции",
    description: "Проследяване на обостряния, анализ на кожата, качване на документи и интеграции.",
    icon: "tune",
  },
  {
    slug: "account-rewards",
    label: "Профил и награди",
    description: "Управлявайте профила и абонаментите си и печелете награди Orbs.",
    icon: "account_circle",
  },
];

const guideDefinitionsBg: Guide[] = [
  {
    slug: "welcome",
    category: "getting-started",
    title: "Добре дошли в xHeal",
    description: "Научете как xHeal обединява здравните ви данни и ви помага да разбирате по-добре своето здраве.",
    readingTime: 3,
    order: 1,
    content: "<h2>Какво е xHeal?</h2><p>xHeal е вашата лична платформа за здравна информация, която събира всичките ви здравни данни на едно място. Представете си я като Digital Twin на вашето здраве — AI, който наистина ви познава и може да ви помогне да разбирате модели, да предвиждате проблеми и да вземате по-добри решения за здравето си.</p><h3>С какво xHeal е различен</h3><p>За разлика от традиционните приложения за здраве, които следят само едно нещо, xHeal свързва данните от:</p><ul><li><strong>Носими устройства</strong> — крачки, пулс, сън, HRV и други от Apple Health</li><li><strong>Медицински записи</strong> — лабораторни резултати, медикаменти, състояния и посещения при лекар</li><li><strong>Ежедневни навици</strong> — хранене, упражнения, осъзнатост и фактори от начина на живот</li><li><strong>Данни, които записвате сами</strong> — симптоми, настроение, нива на енергия и обостряния</li></ul><h3>Основни функции накратко</h3><h4>Вашето здравно табло</h4><p>Виждайте на едно място общия си xHeal Score, биологичната си възраст и резултатите по отделни здравни области (физическа форма, медицинско здраве, психично здраве и хранене).</p><h4>Персонализирана дневна рутина</h4><p>Получавайте персонализиран набор от дневни задачи, включително хранения, тренировки, упражнения за осъзнатост и напомняния за медикаменти според здравните ви цели и състояния.</p><h4>Здравен AI помощник</h4><p>Задавайте на разбираем език въпроси за здравните си данни и получавайте отговори, основани на действителните ви показатели и история.</p><h4>Здравни доклади</h4><p>Създавайте подробни доклади като оценката на благосъстоянието My Snapshot, анализа Health Gaps и Why Finder за откриване на модели.</p><h4>Проследяване на жизнени показатели</h4><p>Следете над 50 здравни показателя с подробни визуализации и анализ на тенденциите.</p><h3>Готови ли сте да започнете?</h3><p>Продължете към следващото ръководство, за да създадете профила си и да започнете своя път към по-добро здраве с xHeal.</p>",
  },
  {
    slug: "creating-your-account",
    category: "getting-started",
    title: "Създаване на профил",
    description: "Регистрирайте се в xHeal с имейл или чрез профила си в Apple, Google или Facebook.",
    readingTime: 2,
    order: 2,
    prerequisites: ["welcome"],
    content: "<h2>Начини за регистрация</h2><p>xHeal предлага няколко начина да създадете профила си. Изберете най-удобния за вас:</p><h3>Вариант 1: Регистрация с имейл</h3><ol><li>Отворете приложението xHeal и докоснете <strong>Създаване на профил</strong></li><li>Въведете имейл адреса си и създайте сигурна парола</li><li>Проверете имейла си за код за потвърждение</li><li>Въведете кода в приложението, за да потвърдите имейла си</li><li>Готови сте да започнете onboarding-а!</li></ol><h3>Вариант 2: Регистрация с Apple</h3><p>Най-бързият вариант за потребители на iPhone:</p><ol><li>Докоснете <strong>Продължаване с Apple</strong></li><li>Удостоверете самоличността си чрез лицево разпознаване или пръстов отпечатък</li><li>Изберете дали да споделите, или да скриете имейла си</li><li>Профилът ви се създава веднага</li></ol><blockquote><strong>Съвет:</strong> Входът с Apple ви позволява да създадете профил, без да споделяте истинския си имейл адрес. Apple генерира уникален случаен имейл, който препраща съобщенията към истинската ви пощенска кутия.</blockquote><h3>Вариант 3: Google или Facebook</h3><ol><li>Докоснете <strong>Продължаване с Google</strong> или <strong>Продължаване с Facebook</strong></li><li>Влезте в профила си в Google или Facebook</li><li>Разрешете на xHeal достъп до основната информация в профила ви</li><li>Профилът ви се създава чрез профила ви в социалната мрежа</li></ol><h3>Изисквания към паролата</h3><p>Ако се регистрирате с имейл, паролата ви трябва:</p><ul><li>Да съдържа поне 8 знака</li><li>Да съдържа поне една главна буква</li><li>Да съдържа поне една цифра</li></ul><h3>Вече имате профил?</h3><p>Докоснете <strong>Вход</strong> в долната част на екрана и използвайте съществуващите си данни за вход.</p><h3>Забравили сте паролата си?</h3><p>На екрана за вход докоснете <strong>Забравена парола?</strong> и въведете имейла си. Ще получите връзка за задаване на нова парола.</p>",
  },
  {
    slug: "completing-onboarding",
    category: "getting-started",
    title: "Завършване на onboarding-а",
    description: "Преминете през onboarding-а на xHeal, за да настроите своя здравен профил.",
    readingTime: 5,
    order: 3,
    prerequisites: ["creating-your-account"],
    content: "<h2>Вашият onboarding</h2><p>След като създадете профила си, xHeal ви превежда през персонализиран onboarding. Той отнема около 5 минути и ни помага да разберем здравните ви потребности.</p><h3>Стъпка 1: Начални екрани</h3><p>Ще видите кратко представяне на основните функции на xHeal, включително как работи вашият Digital Twin, какви видове данни свързва xHeal и какво можете да постигнете с приложението.</p><h3>Стъпка 2: Условия и поверителност</h3><p>Прегледайте и приемете Условията за ползване и Политиката за поверителност на xHeal. Здравните ви данни са криптирани и никога не се продават на трети страни.</p><h3>Стъпка 3: Създайте своя профил</h3><p>Въведете основната си здравна информация, включително име, дата на раждане, биологичен пол, ръст, тегло и по желание раса или етническа принадлежност за някои оценки на здравния риск.</p><h3>Стъпка 4: Задайте здравните си цели</h3><p>Изберете какво е най-важно за вас в момента: управление на хронично състояние, подобряване на физическата форма и енергията, по-добър сън и възстановяване, управление на теглото, намаляване на стреса или общо подобряване на благосъстоянието. Можете да изберете няколко цели.</p><h3>Стъпка 5: Дайте име на своя помощник</h3><p>Дайте избрано от вас име на AI асистента на xHeal! С него ще разговаряте за здравето си.</p><h3>Стъпка 6: Свържете Apple Health</h3><p>Това е важна стъпка, за да се възползвате пълноценно от xHeal. За подробни указания вижте ръководството за свързване с Apple Health.</p><h3>Стъпка 7: Включете известията</h3><p>Разрешете известията, за да получавате напомняния за дневните задачи, здравни прозрения и сигнали, известия за серията последователни дни и сигнали за готови доклади.</p><h3>Стъпка 8: Изберете своя план</h3><p>Изберете абонаментен план: безплатен (основни функции), основен месечен (12,99 щ.д. на месец) или основен годишен (124,99 щ.д. на година със спестяване около 20%).</p><h3>Стъпка 9: Вече сте вътре!</h3><p>След като завършите onboarding-а, ще попаднете на персонализираното си табло. Попълнете своите здравни истории през първата седмица, за да получите по-задълбочено персонализиране.</p>",
  },
  {
    slug: "connecting-apple-health",
    category: "getting-started",
    title: "Свързване с Apple Health",
    description: "Настройте интеграцията с Apple Health за автоматично синхронизиране на данните от носими устройства и за здравето ви.",
    readingTime: 4,
    order: 4,
    prerequisites: ["creating-your-account"],
    content: "<h2>Защо да свържете Apple Health?</h2><p>Apple Health служи като централен източник за всички здравни данни на вашия iPhone. Когато свържете xHeal с Apple Health, автоматично синхронизирате крачки, пулс, HRV, данни за съня, активна енергия, тренировки, кръвно налягане, кръвна захар и данни от свързани устройства като Apple Watch, Oura и Whoop.</p><h3>Настройване на връзката</h3><h4>По време на onboarding-а</h4><ol><li>Когато стигнете до стъпката за Apple Health, докоснете <strong>Свързване с Apple Health</strong></li><li>Системата на iPhone ще покаже екрана за достъп до здравни данни</li><li>Докоснете <strong>Включване на всичко</strong>, за да предоставите на xHeal достъп до всички категории здравни данни</li><li>Докоснете <strong>Разрешаване</strong>, за да потвърдите</li></ol><h4>След onboarding-а</h4><p>Отворете Настройки, докоснете Източници на данни, после Apple Health и след това Управление на разрешенията, за да настроите превключвателите за всеки вид данни.</p><h3>Препоръчителни разрешения</h3><p>За най-добро изживяване включете: крачки, разстояние, активна енергия, минути упражнения, часове в изправено положение, изкачени етажи, тегло, ръст, индекс на телесната маса, телесни мазнини, пулс, пулс в покой, HRV, пулс при ходене, анализ на съня, кръвно налягане, кръвна захар, телесна температура, честота на дишане и насищане с кислород.</p><h3>Как работи синхронизирането</h3><p>След свързването xHeal автоматично синхронизира данните ви в реално време (новите данни се появяват до няколко минути), във фонов режим (дори когато приложението е затворено) и импортира съществуващата ви здравна история.</p><h3>Отстраняване на проблеми</h3><p>Ако данните не се синхронизират, отворете Настройки на iPhone, докоснете Здраве, после Достъп до данни и устройства и xHeal, след което се уверете, че желаните видове данни са включени.</p><blockquote><strong>Забележка за поверителността:</strong> xHeal чете само данните, до които изрично сте разрешили достъп. Никога не записваме в Apple Health без ваше разрешение, а данните ви са криптирани както при пренос, така и при съхранение.</blockquote>",
  },
  {
    slug: "dashboard-overview",
    category: "understanding-your-health",
    title: "Преглед на таблото",
    description: "Разберете какво показва персонализираното ви здравно табло във всяка от своите секции.",
    readingTime: 4,
    order: 1,
    content: "<h2>Вашият здравен команден център</h2><p>Таблото е първото, което виждате, когато отворите xHeal. То е създадено, за да ви даде бърз поглед върху общото ви здравословно състояние и онова, което изисква вниманието ви днес.</p><h3>Елементи на таблото</h3><h4>xHeal Score</h4><p>Общият ви резултат за благосъстояние от 0 до 100, изчислен въз основа на всичките ви здравни данни. Докоснете го, за да видите разбивката и факторите, които влияят върху резултата ви.</p><h4>Резултати по области</h4><p>Четири основни здравни области, всяка с резултат от 0 до 100: физическа форма (активност, упражнения, физическо представяне), медицински показатели (жизнени показатели, лабораторни резултати, клинични маркери), психично здраве (настроение, стрес, качество на съня, осъзнатост) и хранене (качество на храненето, баланс на макронутриентите, хранителни навици).</p><h4>Биологична възраст</h4><p>Вашата биологична възраст спрямо хронологичната ви възраст. По-ниската биологична възраст показва по-добро общо здраве.</p><h4>Дневна активност</h4><p>Обобщение на активността ви днес, което показва направените крачки спрямо целта, изгорените активни калории и минутите с упражнения.</p><h4>Серия последователни дни</h4><p>Броят последователни дни, в които изпълнявате дневната си рутина. Поддържането на такава серия помага за изграждането на здравословни навици и носи допълнителни Orbs.</p><h4>Бързи действия</h4><p>Бърз достъп до често срещани задачи, като записване на храна, започване на тренировка или проверка на настроението.</p><h3>Персонализиране на таблото</h3><p>Превъртете до долната част на таблото, докоснете „Редактиране на таблото“, плъзнете елементите, за да промените реда им, включете или изключете елементи според предпочитанията си и докоснете „Готово“, за да запазите промените.</p><h3>Как да разбирате стойностите</h3><p>Цветовото кодиране ви помага бързо да разберете състоянието си: зеленото означава оптимален диапазон, жълтото и оранжевото означават, че е необходимо внимание, червеното показва стойност под оптималната, а лилавото и синьото са неутрални или информационни.</p>",
  },
  {
    slug: "xheal-score",
    category: "understanding-your-health",
    title: "Какво показва xHeal Score",
    description: "Научете как се изчислява общият ви резултат за благосъстояние и как да го подобрите.",
    readingTime: 4,
    order: 2,
    content: "<h2>Какво представлява xHeal Score?</h2><p>xHeal Score е цялостен показател за благосъстояние, който обединява данни от всички аспекти на здравето ви в едно число от 0 до 100. Мислете за него като за обща оценка на здравето си — по-високата стойност е по-добра.</p><h3>Как се изчислява</h3><p>Вашият xHeal Score е претеглена комбинация от резултатите ви в четири области: резултат за физическа форма (25%) за нивата на активност, постоянството в тренировките и сърдечносъдовата форма; резултат за медицински показатели (25%) за жизнените показатели, лабораторните резултати и спазването на приема на медикаменти; резултат за психично здраве (25%) за качеството на съня, нивата на стрес и устойчивостта на настроението; и резултат за хранене (25%) за качеството на храненето, баланса на макронутриентите и хидратацията.</p><h3>Диапазони на резултата</h3><p>От 80 до 100 е отличен резултат, от 60 до 79 е добър, от 40 до 59 е задоволителен, а от 0 до 39 означава, че е необходимо подобрение.</p><h3>Преглед на подробностите</h3><p>Докоснете своя xHeal Score на таблото, за да видите разбивка на резултата по области, тенденцията във времето, основните фактори, които го подобряват, областите с потенциал за подобрение и персонализирани препоръки.</p><h3>Какво влияе върху резултата</h3><p>Положителните фактори включват постоянен режим на сън (7–9 часа), редовна физическа активност, изпълнение на задачите от дневната рутина, балансирано хранене, практикуване на осъзнатост и жизнени показатели в здравословни диапазони. Отрицателните фактори включват недостатъчен или нередовен сън, заседнал начин на живот, признаци на силен стрес, пропуснат прием на медикаменти, пропуснати хранения и повишени жизнени показатели.</p><h3>Как да подобрите резултата си</h3><p>Попълнете своите здравни истории, следвайте дневната си рутина, свържете повече източници на данни, обърнете внимание на съня и първо се погрижете за предупредителните сигнали.</p><blockquote><strong>Запомнете:</strong> Резултатът ви ще се променя всеки ден. Съсредоточете се върху тенденцията в продължение на седмици и месеци, а не върху ежедневните колебания.</blockquote>",
  },
  {
    slug: "setting-up-your-routine",
    category: "daily-routine",
    title: "Настройване на дневната ви рутина",
    description: "Настройте персонализирана дневна здравна рутина според вашите цели и състояния.",
    readingTime: 5,
    order: 1,
    content: "<h2>Вашата персонализирана дневна рутина</h2><p>xHeal създава персонализирана дневна рутина, съобразена с вашите здравни цели, състояния и предпочитания. Рутината ви включва задачи за хранене, упражнения, осъзнатост, медикаменти и грижа за себе си.</p><h3>Първоначална настройка</h3><h4>Стъпка 1: Изберете целите си</h4><p>Изберете върху какво искате да се съсредоточите: намаляване или увеличаване на теглото, изграждане на мускули или подобряване на физическата форма, управление на хронично състояние, намаляване на стреса и тревожността, подобряване на качеството на съня, повишаване на енергията или общо благосъстояние.</p><h4>Стъпка 2: Добавете здравни състояния</h4><p>Изберете всички състояния, които управлявате, като диабет, хипертония, сърдечно заболяване, автоимунни състояния, храносмилателни проблеми, хронична умора или тревожност/депресия. xHeal използва тази информация, за да персонализира препоръките.</p><h4>Стъпка 3: Задайте темпото си</h4><p>Изберете предпочитаната интензивност: Постепенно (по-малко задачи, бавно изграждане на навици), Балансирано (умерен брой задачи, препоръчва се за повечето хора) или Интензивно (повече задачи за по-бърз напредък).</p><h4>Стъпка 4: Изберете начален ден на седмицата</h4><p>Изберете дали седмицата ви да започва в неделя или понеделник за проследяване на седмичния напредък.</p><h3>Структура на рутината</h3><p>Дневната ви рутина е организирана по части на деня. Сутрешните задачи включват проверка на жизнените показатели, записване на закуската и прием на добавки. Следобедните задачи включват записване на обяда, прием на медикаменти по обяд и напомняния за активност. Вечерните задачи включват записване на вечерята, прием на вечерните медикаменти, проверка на настроението, практика за осъзнатост и подготовка за сън.</p><h3>Промяна на рутината ви</h3><p>Отворете раздела „Рутина“, докоснете иконата със зъбно колело, коригирайте целите, състоянията или темпото според нуждите си и докоснете „Генериране на рутината отново“, за да приложите промените.</p><blockquote><strong>Съвет:</strong> Ако сега започвате да проследявате здравето си, изберете постепенно темпо. По-добре е да изградите устойчиви навици с по-малко задачи, отколкото да се претоварите.</blockquote>",
  },
  {
    slug: "completing-tasks",
    category: "daily-routine",
    title: "Изпълнение на ежедневните задачи",
    description: "Научете как да изпълнявате задачите от дневната си рутина и да проследявате напредъка си.",
    readingTime: 4,
    order: 2,
    prerequisites: ["setting-up-your-routine"],
    content: "<h2>Изпълнение на задачите ви</h2><p>Всеки ден разделът „Рутина“ показва задачите, които трябва да изпълните. Ето как да преминавате през тях ефективно.</p><h3>Преглед на задачите ви</h3><p>Отворете раздела „Рутина“, за да видите днешните задачи, организирани по части на деня. Всяка задача показва своята икона и име, очакваното време за изпълнение и състоянието си.</p><h3>Изпълнение на задача</h3><ol><li>Докоснете някоя задача, за да я отворите</li><li>Следвайте указанията или въведете необходимите данни</li><li>Докоснете „Завършване“ или „Готово“</li><li>Задачата ще бъде отбелязана с отметка</li></ol><h3>Видове задачи</h3><p>Задачите за хранене ви позволяват да записвате хранения чрез анализ на снимка, търсене в базата данни с храни, записване от хранителния ви план или бързо записване на запазени хранения. Задачите за тренировки показват предложени тренировки с инструкции за упражненията и записване на серии/повторения/тежест. Задачите за медикаменти ви позволяват да потвърдите приема на медикамент, като посочите часа и по желание добавите бележки за странични ефекти. Задачите за осъзнатост включват дихателни упражнения с насоки и проверки на настроението. Задачите за самооценка обхващат нивата на болка, нивата на енергия, проследяването на симптоми и записването на обостряния.</p><h3>Пропускане на задачи</h3><p>„Пропускане днес“ означава, че задачата ще се появи отново утре. „Пропускане за неопределено време“ я премахва от рутината ви, докато не я добавите отново ръчно. Стремете се да изпълнявате поне 80% от задачите за най-добри резултати.</p><h3>Календар на напредъка</h3><p>В горната част на раздела „Рутина“ ще видите седмичен календар със зелени точки за завършените дни, частично запълнени кръгове за дни с изпълнени някои задачи и празни кръгове за незавършените дни.</p><h3>Изграждане на серията ви</h3><p>Изпълнете всичките си задачи за деня, за да поддържате серията си последователни дни: серия от 7 дни носи бронзова значка и допълнителни Orbs, серия от 30 дни носи сребърна значка и повече Orbs, а серия от 90 дни носи златна значка и значителна награда в Orbs.</p>",
  },
  {
    slug: "vitals-overview",
    category: "vitals-tracking",
    title: "Преглед на жизнените показатели",
    description: "Разгледайте всички здравни показатели, които xHeal проследява, и научете как да ги преглеждате.",
    readingTime: 5,
    order: 1,
    content: "<h2>Вашето табло със здравни показатели</h2><p>xHeal проследява над 50 различни здравни показателя, организирани в категории за лесна навигация. Отворете жизнените си показатели, като докоснете раздела за тях или изберете показател от таблото си.</p><h3>Категории показатели</h3><h4>Активност</h4><p>Крачки, разстояние, изгорена активна енергия, минути упражнения, часове в изправено положение и изкачени етажи.</p><h4>Сърце</h4><p>Пулс (текущ, в покой и среден при ходене), вариабилност на сърдечната честота (HRV) и кръвно налягане.</p><h4>Тяло</h4><p>Тегло, процент телесни мазнини, индекс на телесната маса и телесна температура.</p><h4>Сън</h4><p>Продължителност на съня, фази на съня (бърз, дълбок, лек и будно състояние) и резултат за качество на съня.</p><h4>Дишане</h4><p>Честота на дишане и насищане на кръвта с кислород.</p><h4>Лабораторни резултати</h4><p>Кръвна глюкоза, липиден профил, пълна кръвна картина, метаболитен панел и много други показатели от качени лабораторни доклади.</p><h3>Преглед на подробности за показател</h3><p>Докоснете който и да е показател, за да видите подробен изглед с текуща стойност, графика на тенденцията (за 7, 30 или 90 дни), статистика (средна, минимална и максимална стойност), здравословен диапазон за вашата възраст и пол и свързани прозрения от AI.</p><h3>Закачане на любими показатели</h3><p>Отворете страницата с подробности за желания жизнен показател и докоснете иконата за закачане горе вдясно. Закачените показатели ще се показват в горната част на раздела ви с жизнени показатели.</p><h3>Ръчно добавяне на измервания</h3><p>Отворете страницата с подробности за показателя, докоснете „Добавяне на измерване“, въведете стойността и часа на измерването и докоснете „Запазване“. Ако синхронизирането е включено, ръчно добавените измервания се синхронизират с Apple Health.</p><h3>Разбиране на вашите диапазони</h3><p>Зеленото означава стойност в оптималния диапазон, жълтото — малко извън него, оранжевото — нужда от внимание, а червеното — стойност значително извън здравословния диапазон. Диапазоните са персонализирани според вашата възраст, пол и здравословни състояния.</p>",
  },
  {
    slug: "viewing-trends",
    category: "vitals-tracking",
    title: "Преглед на здравните тенденции",
    description: "Научете как да анализирате тенденциите в здравните си данни във времето чрез графики и статистика.",
    readingTime: 4,
    order: 2,
    prerequisites: ["vitals-overview"],
    content: "<h2>Разбиране на здравните ви тенденции</h2><p>Една отделна стойност е полезна, но истинската полза от проследяването на здравето идва от разбирането как показателите ви се променят във времето. xHeal предлага мощни инструменти за визуализиране на тенденции.</p><h3>Достъп до графиките на тенденциите</h3><p>Отворете който и да е жизнен показател от съответния раздел и го докоснете, за да отворите подробния му изглед. Графиката на тенденцията е показана на видно място в горната част.</p><h3>Възможности за период</h3><p>Превключвайте между различни периоди: 7 дни за скорошни дневни изменения, 30 дни за месечни модели и седмични цикли, 90 дни за тримесечни тенденции и сезонни влияния, 1 година за дългосрочен напредък и целия период за пълната ви история.</p><h3>Разчитане на графиките</h3><p>Линейните графики се използват за непрекъснати показатели като пулс, тегло и HRV. Линията показва стойностите ви във времето, оцветените области обозначават здравословните диапазони, можете да докоснете произволна точка, за да видите точната стойност и дата, както и да увеличавате с жест с два пръста. Стълбовидните графики се използват за дневни сборове като крачки и калории. Всеки стълб представя общата стойност за един ден, цветът показва дали целта е постигната, а с докосване можете да видите подробна разбивка.</p><h3>Панел със статистика</h3><p>Под графиката ще намерите основна статистика: средна стойност, минимум, максимум, тенденция (повишаваща се, понижаваща се или стабилна) и вариабилност (колко се колебаят стойностите).</p><h3>Разпознаване на модели</h3><p>Търсете седмични цикли (крачките често намаляват през почивните дни), взаимовръзки (лошият сън предхожда по-ниска HRV) и отклонения (внезапни пикове, които сочат заболяване или стрес).</p><h3>Експортиране на данните за тенденции</h3><p>Отворете подробния изглед на показателя, докоснете иконата за споделяне, изберете формат за документ или таблични данни и период, след което споделете по имейл или чрез съобщение, или запазете във файловете си.</p>",
  },
  {
    slug: "pinning-favorites",
    category: "vitals-tracking",
    title: "Закачане на любими показатели",
    description: "Настройте раздела с жизнени показатели, като закачите най-важните за вас измервания.",
    readingTime: 2,
    order: 3,
    prerequisites: ["vitals-overview"],
    content: "<h2>Бърз достъп до важното</h2><p>При налични над 50 здравни показателя едва ли искате да преглеждате всички, за да намерите онези, които проверявате всеки ден. Чрез закачането избирате кои жизнени показатели да се показват най-отгоре.</p><h3>Как да закачите жизнен показател</h3><ol><li>Отворете жизнения показател, който искате да закачите</li><li>Докоснете го, за да отворите подробния му изглед</li><li>Докоснете иконата за закачане в горния десен ъгъл</li><li>Жизненият показател вече е закачен в раздела ви с любими</li></ol><h3>Управление на закачените показатели</h3><p>Закачените показатели се показват най-отгоре в раздела с любими заедно с текущата стойност, миниатюрен индикатор за тенденцията и цвят за състоянието. За да промените реда им, докоснете „Редактиране“ в раздела с любими, плъзнете показателите до желаните позиции и докоснете „Готово“. За да откачите показател, докоснете отново иконата за закачане или докоснете „Редактиране“ и използвайте иконата с минус.</p><h3>Предложени показатели за закачане</h3><p>За общо благосъстояние: крачки, продължителност на съня, пулс в покой и тегло. При фокус върху физическата форма: активна енергия, минути упражнения, HRV и максимално кислородно потребление. За управление на хронично състояние: кръвно налягане, кръвна глюкоза, пулс и качество на съня. За психично благосъстояние: HRV, продължителност на съня, резултат за настроението и Mindful Minutes.</p><blockquote><strong>Съвет:</strong> Започнете с 4–6 закачени жизнени показателя. Ако са твърде много, се губи смисълът на бързия достъп до най-важните.</blockquote>",
  },
  {
    slug: "health-indicators",
    category: "vitals-tracking",
    title: "Разбиране на здравните индикатори",
    description: "Научете за здравните индикатори и оценките на риска, които xHeal извежда от вашите данни.",
    readingTime: 4,
    order: 4,
    prerequisites: ["vitals-overview"],
    content: "<h2>Отвъд необработените числа</h2><p>Здравните индикатори са изчислени показатели, които обединяват множество данни, за да ви дадат смислени прозрения за здравословното ви състояние. Те предлагат по-ясни насоки за действие от отделните жизнени показатели.</p><h3>Видове здравни индикатори</h3><h4>Съставни резултати</h4><p>Резултатът за качество на съня обединява продължителност, ефективност, фази и постоянство. Резултатът за възстановяване обединява HRV, пулс в покой, сън и баланс на активността. Индексът на стреса анализира моделите на HRV, пулса и нарушенията на съня. Нивото на физическа форма отчита тенденциите в активността, представянето по време на тренировки и възстановяването.</p><h4>Индикатори за риск</h4><p>Сърдечносъдовият риск се основава на кръвното налягане, тенденциите в пулса и активността. Метаболитното здраве отчита моделите на кръвната глюкоза, тенденциите в теглото и активността. Маркерите за възпаление включват понижена HRV, повишен пулс в покой и лош сън.</p><h4>Сигнали за тенденции</h4><p>Известия, когато показателите разкриват обезпокоителни модели, като трайно повишен пулс в покой, понижаване на HRV в продължение на няколко дни, продължителност на съня, която постоянно е под целта, или тенденция към повишаване на кръвното налягане.</p><h3>Преглед на подробностите за индикатор</h3><p>Отворете таблото или раздела с жизнени показатели, намерете модула на индикатора и го докоснете, за да видите пълната разбивка, включително текущ резултат, допринасящи фактори, тенденция и препоръки.</p><h3>Действия според индикаторите</h3><p>Зелено (оптимално) означава да продължите по същия начин. Жълто (внимание) не е спешно, но си струва да се наблюдава. Оранжево (предупреждение) означава да предприемете действия скоро. Червено (тревога) изисква незабавно внимание — обмислете консултация със здравен специалист.</p><blockquote><strong>Важно:</strong> Здравните индикатори са информационни инструменти, а не медицински диагнози. Винаги се консултирайте със здравни специалисти при медицински притеснения.</blockquote>",
  },
  {
    slug: "nutrition-overview",
    category: "nutrition",
    title: "Преглед на храненето",
    description: "Запознайте се с функциите на xHeal за хранителни планове и водене на хранителен дневник.",
    readingTime: 4,
    order: 1,
    content: "<h2>Вашият център за хранене</h2><p>xHeal съчетава проследяване на калории и макронутриенти със седемдневно планиране на храненията.</p><h3>Табло за хранене</h3><p>Сравнявайте калориите, протеините, въглехидратите и мазнините с дневните си цели, преглеждайте записаните хранения и отваряйте активен хранителен план.</p><h3>Планиране на храненията</h3><p>Създайте план според начина си на хранене, целите за калории и макронутриенти, алергиите, хранителните ограничения и предпочитанията за съставки. Заменяйте отделни хранения и преглеждайте обобщения списък за пазаруване.</p><h3>Записване на храната</h3><p>Записвайте калориите и макронутриентите ръчно или снимайте хранене, за да получите изчислени от AI храни, порции, калории и макронутриенти. След анализа можете да редактирате полученото хранене.</p><h3>Каталог с рецепти</h3><p>Разгледайте близо 500 рецепти, чиито хранителни стойности са изчислени въз основа на данни за съставките от USDA.</p><blockquote><strong>Текущ обхват:</strong> В момента не се предлагат търсене в база данни, търсене по баркод, любими и специализиран процес за проследяване на приема на течности.</blockquote>",
  },
  {
    slug: "creating-meal-plans",
    category: "nutrition",
    title: "Създаване на хранителни планове",
    description: "Създавайте персонализирани седмични хранителни планове според предпочитанията и целите си.",
    readingTime: 5,
    order: 2,
    prerequisites: ["nutrition-overview"],
    content: "<h2>Персонализирано планиране на храненията</h2><p>xHeal създава седемдневен план въз основа на предоставения от вас хранителен профил.</p><h3>Задайте своя профил</h3><p>Изберете начин на хранене, запишете алергиите и хранителните си ограничения, задайте цели за калории и макронутриенти и отбележете предпочитанията си за съставки и храни.</p><h3>Създайте и прегледайте плана</h3><p>xHeal избира рецепти, които отговарят на тези изисквания, и показва храненията за всеки ден с общите им хранителни стойности.</p><h3>Персонализирайте седмицата</h3><p>Заменете отделно хранене с налична алтернатива, без да създавате отново останалата част от плана.</p><h3>Активирайте плана</h3><p>При активиране седмицата се запазва като текущия ви план и се създава обобщен списък за пазаруване.</p><blockquote><strong>Забележка:</strong> Хранителните планове са информационни инструменти за благосъстояние, а не медицинска нутритивна терапия.</blockquote>",
  },
  {
    slug: "logging-food",
    category: "nutrition",
    title: "Записване на храна и хранения",
    description: "Проследявайте храненията чрез анализ на снимка или ръчно въвеждане на калории и макронутриенти.",
    readingTime: 4,
    order: 3,
    prerequisites: ["nutrition-overview"],
    content: "<h2>Проследявайте какво ядете</h2><p>Текущият процес за записване поддържа анализ на снимки с AI и ръчно въвеждане на калории и макронутриенти.</p><h3>Анализ на снимка</h3><p>Направете или качете снимка на храненето. xHeal изчислява храните, порциите, калориите, протеините, въглехидратите и мазнините, след което създава запис в хранителния дневник, който можете да прегледате и редактирате.</p><h3>Ръчно въвеждане</h3><p>Изберете храненето и датата, след което въведете калориите и макронутриентите за храненето.</p><h3>История</h3><p>Преглеждайте предишните записи в хранителния дневник и ги редактирайте или премахвайте при необходимост.</p><blockquote><strong>Текущ обхват:</strong> В момента не се предлагат търсене в база данни с храни, търсене на продукт по баркод, наскоро използвани храни, любими и създадени от вас храни за повторна употреба.</blockquote>",
  },
  {
    slug: "calorie-tracker",
    category: "nutrition",
    title: "Анализ на храната по снимка",
    description: "Разберете как xHeal изчислява калориите и макронутриентите въз основа на снимка.",
    readingTime: 3,
    order: 4,
    prerequisites: ["logging-food"],
    content: "<h2>Анализ на храната по снимка</h2><p>xHeal може да анализира снимка на хранене, за да изчисли видимите храни, порциите, калориите и макронутриентите.</p><h3>Как да направите подходяща снимка</h3><p>Използвайте равномерно осветление, включете цялата чиния в кадъра и се постарайте храните да се виждат ясно.</p><h3>Преглед на записа</h3><p>След обработката анализът на снимката създава запис в хранителния дневник. Прегледайте изчислението и редактирайте полученото хранене, ако храните, порцията или общите стойности се нуждаят от корекция.</p><h3>Ограничения</h3><p>Смесените ястия, скритите съставки, сосовете и необичайните порции могат да понижат качеството на изчислението. Приемайте резултатите от снимките като приблизителни оценки, а не като лабораторни измервания.</p>",
  },
  {
    slug: "shopping-list",
    category: "nutrition",
    title: "Използване на списъка за пазаруване",
    description: "Създавайте и използвайте списъци за пазаруване от своите хранителни планове.",
    readingTime: 3,
    order: 5,
    prerequisites: ["creating-meal-plans"],
    content: "<h2>Списък за пазаруване към вашия план</h2><p>Когато има активен хранителен план, xHeal обединява необходимите за рецептите му съставки в списък за пазаруване.</p><h3>Отворете списъка</h3><p>Използвайте действието за списък за пазаруване от активния хранителен план, за да прегледате необходимите съставки за седмицата.</p><h3>Как се съставя</h3><p>Съставките от планираните рецепти се обединяват, така че повтарящите се продукти да се показват заедно.</p><blockquote><strong>Текущ обхват:</strong> В момента не се предлагат ръчно редактиране на списъка, коригиране на количествата, управление на наличностите у дома, надеждно експортиране в системния буфер и споделяне.</blockquote>",
  },
  {
    slug: "workout-overview",
    category: "workouts",
    title: "Преглед на тренировките",
    description: "Научете как да използвате функциите за тренировки на xHeal за персонализирана физическа активност.",
    readingTime: 4,
    order: 1,
    content: "<h2>Вашият помощник за добра форма</h2><p>xHeal съчетава насоки за тренировки според готовността, записване на заниманията и напредък в силовите упражнения.</p><h3>Body Today</h3><p>Готовността използва HRV, пулса в покой, съня, стреса, тренировъчното натоварване според скорошната активна енергия и приложимите здравни ограничения.</p><h3>Насоки за тренировки</h3><p>Препоръките отчитат съответствието с готовността, целите, оборудването, баланса на скорошните движения, ограниченията за безопасност и запазените планове.</p><h3>Следване на тренировка</h3><p>Проследявайте упражнения, серии, повторения, тежест, продължителност, разстояние, почивка, бележки и снимки според поддържаните от вида упражнение данни.</p><h3>Напредък</h3><p>Преглеждайте хронологията на тренировките, личните рекорди, максималната тежест, обема и графиките с изчисления 1RM.</p><h3>Apple Health</h3><p>Завършените занимания могат да запазват в Apple Health вида на тренировката, продължителността, изчислените активни калории и разстоянието, ако е въведено.</p>",
  },
  {
    slug: "readiness-score",
    category: "workouts",
    title: "Как да разбирате готовността си",
    description: "Научете как xHeal преценява дали да тренирате усилено, или да намалите натоварването.",
    readingTime: 4,
    order: 2,
    prerequisites: ["workout-overview"],
    content: "<h2>Тренирайте с повече контекст</h2><p>Body Today е информационен резултат за готовност, който помага да поставите днешното решение за тренировка в контекст.</p><h3>Текущи входни данни</h3><p>HRV допринася с 30%, пулсът в покой с 10%, сънят с 20%, стресът с 10%, тренировъчното натоварване с 20%, а приложимите здравни ограничения с 10%. Наличността и степента на надеждност зависят от данните в профила ви.</p><h3>Здравен контекст</h3><p>Активните обостряния и определени обстоятелства, свързани с операция или медикаменти, могат да ограничат готовността и да насочат препоръките към по-предпазлив вариант.</p><h3>Използване на резултата</h3><p>Използвайте готовността заедно с това как се чувствате и със съветите на квалифицирани специалисти. Тя не представлява медицинско разрешение и не диагностицира умора, заболяване или травма.</p>",
  },
  {
    slug: "following-workouts",
    category: "workouts",
    title: "Следване на тренировки",
    description: "Как да използвате тренировките с насоки от xHeal по време на вашите тренировъчни занимания.",
    readingTime: 4,
    order: 3,
    prerequisites: ["workout-overview"],
    content: "<h2>Тренировъчни занимания с насоки</h2><p>Започнете препоръчана или запазена тренировка и записвайте заниманието в движение.</p><h3>По време на заниманието</h3><p>Изпълнявайте упражненията и записвайте поддържаните данни, включително серии, повторения, тежест, продължителност, разстояние, почивка, бележки и снимки.</p><h3>Промяна на тренировката</h3><p>Заменете дадено упражнение, когато движението или наличното оборудване не са подходящи. Таймерите за почивка помагат да поддържате темпото между силовите серии.</p><h3>Завършване на заниманието</h3><p>Завършете тренировката, за да запазите нейната продължителност, извършената работа, бележките и откритите лични рекорди. Приложението може също да запази обобщение на тренировката в Apple Health.</p><blockquote><strong>Забележка:</strong> Пулсът в реално време може да се показва по време на занимание, но понастоящем отделните измервания на пулса не се прикачват към запазената тренировка в Apple Health.</blockquote>",
  },
  {
    slug: "tracking-progress",
    category: "workouts",
    title: "Проследяване на напредъка",
    description: "Следете подобряването на физическата си форма чрез хронологията на упражненията и личните рекорди.",
    readingTime: 4,
    order: 4,
    prerequisites: ["following-workouts"],
    content: "<h2>Вижте напредъка в тренировките си</h2><p>xHeal съхранява на едно място завършените занимания и хронологията на упражненията.</p><h3>Хронология на тренировките</h3><p>Преглеждайте предишни занимания, изпълнени упражнения, серии, повторения, тежести, продължителност, бележки и снимки, когато са налични.</p><h3>Графики на упражненията</h3><p>Подробните изгледи на упражненията могат да показват в графики максималната тежест, общия обем и изчисления 1RM във времето.</p><h3>Лични рекорди</h3><p>xHeal открива поддържаните видове лични рекорди от записаните серии и ги показва в хронологията на тренировките ви.</p><blockquote><strong>Текущ обхват:</strong> Проследяването на телесни мерки, силовите цели с краен срок, извеждането на треньорски PDF доклади и споделянето в социални мрежи понастоящем не са част от този процес за проследяване на напредъка.</blockquote>",
  },
  {
    slug: "mindfulness-overview",
    category: "mindfulness",
    title: "Осъзнатост и благополучие",
    description: "Открийте функциите на xHeal за психично благополучие, включително дишане и проследяване на настроението.",
    readingTime: 4,
    order: 1,
    content: "<h2>Осъзнатост и благополучие</h2><p>xHeal съчетава водено дишане, проверки на настроението, хронология на активността и Mind Readiness.</p><h3>Mind Readiness</h3><p>Mind Readiness използва скорошните проверки на настроението и стреса, както и друг поддържан контекст, когато е наличен, за да предостави информационни насоки за предложено действие.</p><h3>Дишане</h3><p>Следвайте фазите с определена продължителност чрез анимация, хаптични преходи и допълнителен фонов звук. Завършените сесии могат да се записват в Apple Health като Mindful Minutes.</p><h3>Проверки на настроението</h3><p>Записвайте настроението, енергията, стреса и тревожността си по петстепенна скала.</p><h3>Активност</h3><p>Преглеждайте записите за дишане и настроение по дата.</p><blockquote><strong>Текущ обхват:</strong> Понастоящем xHeal не предлага HRV обратна връзка в реално време, библиотека с водени медитации, водене на дневник или планове за осъзнатост.</blockquote>",
  },
  {
    slug: "breathing-exercises",
    category: "mindfulness",
    title: "Ръководство за дихателни упражнения",
    description: "Подробно ръководство за всички модели на дишане, налични в xHeal.",
    readingTime: 5,
    order: 2,
    prerequisites: ["mindfulness-overview"],
    content: "<h2>Водено дишане</h2><p>xHeal ви води през всяка фаза на дишането с анимация, зададено време, хаптични преходи и допълнителен фонов звук.</p><h3>Започване на сесия</h3><p>Отворете „Осъзнатост“, изберете един от наличните модели и варианти за продължителност, посочете фонов звук, ако желаете, и започнете.</p><h3>По време на сесията</h3><p>Следвайте показаните на екрана фази за вдишване, задържане, издишване и почивка. Спрете, ако почувствате замайване или дискомфорт.</p><h3>Завършване</h3><p>Сесията се запазва в хронологията на активността в xHeal и може да се запише в Apple Health като Mindful Minutes, когато е дадено разрешение.</p><blockquote><strong>Текущ обхват:</strong> Понастоящем не са налични персонализирани модели, произволен избор на продължителност от 1 до 20 минути, поставяне на пауза и продължаване, както и HRV обратна връзка на живо.</blockquote>",
  },
  {
    slug: "mood-check-ins",
    category: "mindfulness",
    title: "Проверки на настроението",
    description: "Научете как да проследявате емоционалното си състояние и да разпознавате модели с времето.",
    readingTime: 3,
    order: 3,
    prerequisites: ["mindfulness-overview"],
    content: "<h2>Проследявайте емоционалния си контекст</h2><p>Пълната проверка в xHeal записва четири измерения по петстепенна скала.</p><h3>Четирите измерения</h3><p>Записвайте настроение, енергия, стрес и тревожност. По-краткият процес в таблото записва настроението, енергията и стреса, а тревожността остава с неутрална стойност.</p><h3>Преглед на активността</h3><p>Използвайте таблото за осъзнатост, за да преглеждате записите за настроение и дишане по дата.</p><h3>Използване на проверките</h3><p>Проверките могат да допринасят с контекст за Mind Readiness, когато тази функция е налична. Те подпомагат осъзнаването и не диагностицират състояние на психичното здраве.</p><blockquote><strong>Текущ обхват:</strong> Понастоящем не са налични оценки на концентрацията, бележки за настроението и графики на тенденциите за 7, 30 и 90 дни.</blockquote>",
  },
  {
    slug: "hrv-biofeedback",
    category: "mindfulness",
    title: "Граници на HRV обратната връзка на живо",
    description: "Разберете какво xHeal измерва и какво не измерва по време на практиките за осъзнатост.",
    readingTime: 4,
    order: 4,
    prerequisites: ["breathing-exercises"],
    content: "<h2>Без HRV обратна връзка на живо</h2><p>Mind Readiness предоставя информационни насоки въз основа на поддържания контекст от проверките. Това не е измерване на нервната ви система в реално време.</p><h3>По време на дишане</h3><p>Екранът за дишане ви води през фази с определена продължителност чрез анимация, хаптични сигнали и фонов звук, но не показва HRV в реално време и не изчислява кохерентност.</p><h3>След сесия</h3><p>Завършеното дихателно упражнение се запазва в хронологията на активността и може да се запише в Apple Health като Mindful Minutes, когато е дадено разрешение.</p><blockquote><strong>Текущ обхват:</strong> xHeal не се свързва с Apple Watch за HRV на живо, не показва тенденция на HRV по време на дишане, не изчислява кохерентност и не предоставя обобщение на HRV след сесията.</blockquote>",
  },
  {
    slug: "chatting-with-xheal",
    category: "ai-companion",
    title: "Разговори с вашия AI",
    description: "Научете как да извлечете максимална полза от разговорите с вашия AI асистент в xHeal.",
    readingTime: 4,
    order: 1,
    content: "<h2>Вашият личен здравен AI</h2><p>AI асистентът на xHeal е вашият личен здравен помощник, който разбира цялостната картина на здравето ви и може да отговаря на въпроси въз основа на действителните ви данни.</p><h3>Започване на разговор</h3><ol><li>Докоснете раздела за чат в долната част на приложението</li><li>Докоснете „Нов разговор“ или продължете съществуващ</li><li>Въведете въпроса си или използвайте гласово въвеждане</li><li>AI отговаря с персонализирани прозрения</li></ol><h3>Какво можете да попитате</h3><p>Въпроси за данните: Как спах миналата седмица? Какъв е средният ми пулс този месец? Покажете ми тенденцията в теглото ми за последните 90 дни. Кога беше последното измерване на кръвното ми налягане? Анализ на модели: Защо енергията ми беше ниска във вторник? Какво е свързано с нощите, в които спя добре? Има ли някакъв модел при главоболието ми? Как стресът е свързан с моя HRV? Препоръки: Върху какво да се съсредоточа, за да подобря резултата си? Трябва ли да тренирам днес предвид възстановяването си? Кои храни биха могли да помогнат при възпаление? Здравна информация: Какво е HRV и защо е важно? Обяснете стойностите на холестерола ми. Какъв е здравословният диапазон на кръвното налягане?</p><h3>Как да получавате по-добри отговори</h3><p>Бъдете конкретни („Как спах миналия вторник?“ вместо „Как спя?“). Посочвайте период („тази седмица“, „миналия месец“, „от януари насам“). Задавайте уточняващи въпроси. Давайте контекст („Днес се чувствах уморен. Какво би могло да го обясни?“).</p><h3>История на разговорите</h3><p>Преглеждайте минали разговори от историята на чатовете, продължавайте предишни разговори, за да запазите контекста, и изтривайте тези, които вече не са ви нужни.</p><h3>Ограничения</h3><p>Не може да диагностицира състояния или да предписва лечение, не трябва да се използва при спешни случаи и винаги трябва да се консултирате с медицински специалист при решения, свързани със здравето.</p><blockquote><strong>Помнете:</strong> AI е полезен и предоставя информация, но отговорите се основават на модели във вашите данни, а не на медицинска експертиза. При съмнение се обърнете към своя лекар.</blockquote>",
  },
  {
    slug: "asking-health-questions",
    category: "ai-companion",
    title: "По-добри въпроси за здравето",
    description: "Съвети и примери как да получавате най-полезните отговори от своя AI асистент.",
    readingTime: 4,
    order: 2,
    prerequisites: ["chatting-with-xheal"],
    content: "<h2>Получавайте повече от своя AI</h2><p>Качеството на отговорите зависи до голяма степен от начина, по който питате. Ето как да формулирате въпросите си, за да получавате най-полезните и персонализирани отговори.</p><h3>Бъдете конкретни</h3><p>Вместо „Как е здравето ми?“ опитайте с „Как се промени качеството на съня ми през последния месец?“, „Какъв е средният ми пулс в покой тази седмица в сравнение с миналия месец?“ или „Постигам ли редовно целите си за брой крачки?“.</p><h3>Посочвайте период</h3><p>Уточнявайте периода: през изминалата седмица, през последните 30 дни, откакто започнах да използвам xHeal, в сравнение с януари или през делничните дни спрямо почивните.</p><h3>Питайте за модели</h3><p>AI е особено добър в откриването на модели: Има ли модел в това кога спя най-добре? В кои дни имам най-много енергия? Свързани ли са обострянията ми с нещо? Какво обикновено се случва с моя HRV след лош сън?</p><h3>Давайте контекст</h3><p>Вместо „Защо съм уморен?“ опитайте с „През последните 3 дни се чувствам уморен, въпреки че мисля, че спах добре. Можете ли да разгледате данните ми за съня и други фактори, които биха могли да го обяснят?“.</p><h3>Задавайте уточняващи въпроси</h3><p>Можете ли да го обясните по-просто? Какво конкретно трябва да направя? Как се сравнява това с нормалното? Какви други фактори може да имат значение?</p><h3>Примерни категории въпроси</h3><p>Въпроси за данните: Какво беше средното ми кръвно налягане миналия месец? Покажете ми тенденцията в теглото ми за 6 месеца. По колко часа средно спах миналата седмица? Анализ на модели: Кои фактори влияят най-много върху качеството на съня ми? Има ли връзка между стреса ми и HRV? Препоръки: Въз основа на данните ми върху какво трябва да се съсредоточа? Трябва ли да тренирам днес предвид готовността си? Здравна информация: Какво означава HRV? Обяснете резултатите ми за холестерола на разбираем език.</p><h3>Какво не може да прави AI</h3><p>Не поставя диагнози, не издава предписания, не е предназначен за спешни случаи и не замества медицинските специалисти.</p><h3>Кога вместо това да попитате лекаря си</h3><p>При трайно необичайни стойности, нови или влошаващи се симптоми, въпроси за медикаменти, притеснения за психичното здраве, изискващи професионална подкрепа, или всяка ситуация, в която обичайно бихте посетили лекар.</p><blockquote><strong>Полезен съвет:</strong> Преди преглед при лекар помолете AI да обобщи основните тенденции в здравето ви. Това помага за по-ползотворни разговори с вашия медицински специалист.</blockquote>",
  },
  {
    slug: "flare-up-tracking",
    category: "advanced-features",
    title: "Проследяване на обостряния",
    description: "Записвайте и анализирайте обострянията на симптомите, за да откривате модели и тригери.",
    readingTime: 4,
    order: 1,
    content: "<h2>Разбиране на вашите обостряния</h2><p>Ако живеете с хронично състояние, проследяването на обострянията помага да откривате тригери и модели. xHeal улеснява записването на обострянията и анализа на възможните причини за тях.</p><h3>Записване на обостряне</h3><ol><li>Отворете дневната си рутина или таблото</li><li>Докоснете „Записване на обостряне“</li><li>Изберете вида (болка, умора, храносмилателно, кожно и т.н.)</li><li>Оценете тежестта (1–10)</li><li>Отбележете началния час</li><li>Добавете подходящи подробности или бележки</li><li>Запазете записа</li></ol><h3>Какво да проследявате</h3><p>Симптоми (какво изпитвате), тежест (1–10), продължителност (колко дълго трае), местоположение (къде по тялото) и предполагаеми тригери.</p><h3>Прозрения за обострянията</h3><p>След като запишете няколко обостряния, xHeal анализира: времеви модели (дали възникват в определени часове), връзки с дейности (какво сте правили преди това), връзки със съня (дали са предшествани от лош сън), връзки с храната и въздействия на времето (атмосферно налягане, температура).</p><h3>Доклад Why Finder</h3><p>Създайте цялостен анализ: отворете „Доклади“, изберете Why Finder, xHeal ще анализира всички данни за обострянията спрямо здравните показатели и ще получите подробен доклад, който посочва потенциални тригери. Why Finder разглежда моделите във всичките ви данни, за да открие взаимовръзки, които може да не забележите.</p><h3>Съвети за ефективно проследяване</h3><p>Записвайте редовно (дори леките обостряния), записвайте своевременно (докато подробностите са пресни), бъдете откровени за тежестта, проследявайте и добрите дни (за изходни стойности) и преглеждайте моделите всеки месец.</p>",
  },
  {
    slug: "skin-analysis",
    category: "advanced-features",
    title: "Кожен анализ със Skinspect",
    description: "Анализирайте състоянието на кожата чрез снимки с помощта на AI.",
    readingTime: 4,
    order: 2,
    content: "<h2>Кожен анализ с AI</h2><p>Skinspect използва компютърно зрение, за да анализира снимки на кожата ви и да предоставя прозрения за потенциални състояния, промени и препоръки.</p><h3>Какво може да оцени Skinspect</h3><p>Текстура и тен на кожата, акне и несъвършенства, зачервяване и възпаление, сухота и хидратация, признаци на стареене, бенки и петна (за наблюдение на промени), както и обриви и раздразнения.</p><h3>Заснемане на снимки за анализ</h3><p>Отворете Skinspect от менюто, докоснете „Нов анализ“, изберете зона от тялото, следвайте указанията за позициониране и направете снимка.</p><h3>Съвети за снимки с най-добри резултати</h3><p>За осветлението естествената дневна светлина е идеална, без силна пряка слънчева светлина или светкавица. За разстоянието застанете достатъчно близо, за да се виждат подробностите, но и достатъчно далеч за общ изглед. За фокуса докоснете екрана, за да фокусирате, и дръжте неподвижно. За чиста кожа премахнете грима, ако е възможно.</p><h3>Разбиране на резултатите ви</h3><p>Установени притеснения (какво е открил AI), оценка на тежестта (лека, умерена, значителна), препоръки (предложени действия) и кога да посетите лекар.</p><h3>Проследяване на промените във времето</h3><p>Периодично снимайте едни и същи зони, AI сравнява с предишни снимки, предупреждава за значителни промени и проследява подобрението при лечение.</p><h3>Наблюдение на бенки</h3><p>Документирайте всяка бенка със снимка, задайте напомняния за редовни повторни проверки, AI предупреждава при промени в размера, формата или цвета, а притеснителните промени са основание за посещение при дерматолог.</p><h3>Важни ограничения</h3><p>Това не е диагноза, не може да открие всичко и трябва да допълва, а не да заменя посещенията при дерматолог.</p><h3>Кога да посетите дерматолог</h3><p>При бенки, които се променят, нови необичайни образувания, упорити обриви, всякакви притеснителни симптоми или когато Skinspect препоръча преглед.</p><blockquote><strong>Важно:</strong> Skinspect е инструмент за наблюдение, а не за диагностика. Той помага да проследявате здравето на кожата и да разберете кога да потърсите професионална медицинска помощ.</blockquote>",
  },
  {
    slug: "document-upload",
    category: "advanced-features",
    title: "Качване на здравни документи",
    description: "Внасяйте лабораторни резултати, медицински записи и здравни документи в xHeal.",
    readingTime: 4,
    order: 3,
    content: "<h2>Съберете здравните си записи на едно място</h2><p>xHeal може да извлича и организира данни от вашите здравни документи, като добавя лабораторни резултати, медицински записи и друга информация към единния ви здравен профил.</p><h3>Поддържани видове документи</h3><p>Лабораторни резултати (кръвни изследвания, метаболитни панели), медицински записи (лекарски бележки, обобщения от посещения), доклади от образна диагностика (рентгенови изследвания, ядрено-магнитен резонанс, компютърна томография), записи за предписания и записи за ваксинации.</p><h3>Поддържани формати</h3><p>PDF документи, изображения (формати за изображения) и снимки на хартиени документи.</p><h3>Как да качите документ</h3><p>От файлове: отворете „Настройки“, „Източници на данни“, „Качване на документ“, „Избор на файл“, след което намерете документа или изображението си. От камерата: докоснете „Качване на документ“, „Снимане“, снимайте документа, изрежете и коригирайте, след което потвърдете. От електронна поща: отворете писмото с прикачения файл, докоснете файла и го споделете с xHeal чрез менюто за споделяне.</p><h3>Извличане на данни с AI</h3><p>След качването AI прочита документа чрез оптично разпознаване на знаци, открива полетата с данни, извлича структурирани данни и ви ги представя за преглед.</p><h3>Преглед на извлечените данни</h3><p>Прегледайте извлечените стойности, поправете евентуалните грешки, потвърдете датата на резултатите и одобрете добавянето към здравните данни.</p><h3>Къде се добавят извлечените данни</h3><p>Лабораторните стойности се добавят в раздела „Жизнени показатели“, медикаментите — в списъка „Медикаменти“, състоянията — в „Здравни състояния“, а докладите — в библиотеката „Документи“.</p><h3>Преглед на качените документи</h3><p>Отворете „Настройки“, „Източници на данни“, „Документи“, прегледайте качените документи, докоснете някой от тях, за да го отворите, и вижте свързаните извлечени данни.</p><h3>Съвети за по-добро извличане</h3><p>Използвайте висококачествени сканирания или снимки, уверете се, че текстът е четлив, включете всички страници и имайте предвид, че стандартните лабораторни формати дават най-добри резултати.</p><h3>Поверителност и сигурност</h3><p>Документите се шифроват при качване и съхранение, обработката се извършва сигурно, вие определяте какво да бъде запазено и можете да изтриете документите по всяко време.</p><blockquote><strong>Съвет:</strong> След следващото посещение при лекар или лабораторно изследване качете резултатите веднага, за да поддържате профила си в xHeal актуален.</blockquote>",
  },
  {
    slug: "health-integrations",
    category: "advanced-features",
    title: "Интеграции със здравни системи",
    description: "Свържете се с доставчици на здравни услуги чрез Епик и FHIR за автоматично синхронизиране на записи.",
    readingTime: 4,
    order: 4,
    content: "<h2>Свързване с доставчиците ви на здравни услуги</h2><p>xHeal може да се свързва директно с поддържани здравни системи, за да внася автоматично вашите медицински записи, лабораторни резултати и клинични данни.</p><h3>Какво представлява FHIR?</h3><p>FHIR (ресурси за оперативна съвместимост в здравеопазването) е стандарт, който позволява на здравните приложения сигурно да обменят данни с доставчици на здравни услуги. Много големи здравни системи вече поддържат FHIR.</p><h3>Поддържани здравни системи</h3><p>xHeal поддържа здравни системи, работещи с Епик, включително големи университетски медицински центрове, обширни болнични мрежи и много регионални здравни системи.</p><h3>Настройване на връзка</h3><p>Отворете „Настройки“, „Интеграции“, докоснете „Свързване със здравна система“, потърсете своя доставчик, изберете го от списъка и докоснете „Свързване“.</p><h3>Удостоверяване</h3><p>Ще бъдете пренасочени към страницата за вход на здравната ви система. Въведете данните си за достъп до пациентския портал, завършете двуфакторното удостоверяване, прегледайте заявката за достъп до данни и одобрете връзката.</p><h3>Какви данни се внасят</h3><p>Демографски данни, състояния (диагностицирани проблеми), медикаменти (настоящи и минали), алергии, лабораторни резултати, жизнени показатели (от клинични посещения), имунизации и процедури.</p><h3>Честота на синхронизиране</h3><p>Първоначалното синхронизиране внася наличната история, текущото синхронизиране проверява периодично, а ръчно опресняване е достъпно по всяко време.</p><h3>Управление на връзките</h3><p>Отворете „Настройки“, „Интеграции“, вижте свързаните системи, докоснете някоя от тях за подробности и прекъснете връзката по всяко време чрез „Премахване на връзката“.</p><h3>Няколко здравни системи</h3><p>Свържете няколко доставчици (първична медицинска помощ, специалисти, болници, лаборатории). Данните от всички източници се обединяват в единния ви профил.</p><h3>Отстраняване на проблеми</h3><p>Ако не можете да откриете своя доставчик, все още не всички системи поддържат FHIR — можете да качите документите ръчно или да проверите отново по-късно. Ако свързването е неуспешно, проверете дали данните ви за достъп работят, дали свързването на приложения е разрешено и опитайте да прекъснете и възстановите връзката.</p><h3>Поверителност и контрол</h3><p>Вие започвате и управлявате връзката, xHeal има достъп само до разрешените данни, можете да оттеглите достъпа по всяко време, а данните са шифровани и никога не се продават.</p><blockquote><strong>Полезен съвет:</strong> Свързването с вашия доставчик на първична медицинска помощ дава на xHeal достъп до най-пълния ви запис, което значително подобрява прозренията.</blockquote>",
  },
  {
    slug: "orbs-rewards",
    category: "account-rewards",
    title: "Награди с Orbs",
    description: "Научете как да печелите и използвате Orbs, валутата за награди в xHeal.",
    readingTime: 3,
    order: 1,
    content: "<h2>Печелете, докато се грижите за здравето си</h2><p>Orbs са валутата за награди в xHeal, която печелите, като използвате приложението и изпълнявате полезни за здравето дейности. Използвайте ги, за да отключвате платени функции.</p><h3>Как да печелите Orbs</h3><p>Ежедневни дейности: изпълнете дневната рутина (10–50 Orbs според степента на изпълнение), запишете хранене (5 Orbs за всяко хранене), завършете тренировка (10–25 Orbs според продължителността), направете проверка на настроението (5 Orbs за всяка) или дихателно упражнение (5–10 Orbs на сесия). Серии последователни дни: 7-дневна серия (50 бонус Orbs), 30-дневна серия (200 бонус Orbs), 90-дневна серия (500 бонус Orbs). Важни етапи: завършете onboarding-а (100 Orbs), завършете всички здравни истории (250 Orbs), създайте първия си хранителен план (50 Orbs), свържете Apple Health (50 Orbs).</p><h3>Използване на Orbs</h3><p>Създаване на хранителен план (100 Orbs), създаване на здравен доклад (50–100 Orbs според вида), допълнителни запитвания в AI чат (10 Orbs на запитване при безплатния план), достъп до платени функции (стойността варира).</p><h3>Проверка на наличността</h3><p>Отворете „Настройки“, докоснете „Портфейл“, вижте текущата наличност от Orbs и прегледайте историята на трансакциите.</p><h3>Orbs или абонамент</h3><p>При платен абонамент повечето функции са неограничени. Orbs са най-полезни за потребителите с безплатен план, които ползват платени функции от време на време, създават допълнителни хранителни планове над лимита или отключват специални доклади.</p><blockquote><strong>Забележка:</strong> Orbs нямат парична стойност и не могат да бъдат прехвърляни или продавани. Те са единствено система за награди в приложението, която насърчава здравословните навици.</blockquote>",
  },
  {
    slug: "subscription-plans",
    category: "account-rewards",
    title: "Абонаментни планове",
    description: "Сравнете абонаментните нива на xHeal и изберете най-подходящия план за вас.",
    readingTime: 3,
    order: 2,
    content: "<h2>Изберете своя план</h2><p>xHeal предлага гъвкави варианти за абонамент, съобразени с различни нужди и бюджети.</p><h3>Налични планове</h3><p>Безплатният план (0 $/месец) включва основно проследяване на здравето, синхронизиране с Apple Health, ограничен AI чат (10 пъти месечно), основна дневна рутина, табло с жизнени показатели и проследяване на настроението. Ограничения: без създаване на хранителни планове, ограничени доклади, без усъвършенствани AI функции; използвайте Orbs за платени функции. Основният месечен план (12,99 $/месец) включва всичко от безплатния план, както и неограничен AI чат, неограничени хранителни планове, всички здравни доклади, задълбочени прозрения, приоритетна поддръжка, пълна библиотека с тренировки и усъвършенствани практики за осъзнатост. Основният годишен план (124,99 $/година, приблизително 10,42 $/месец) предлага същите функции като месечния с приблизително 20% спестяване, едно годишно плащане и фиксирана цена за 12 месеца.</p><h3>Абониране</h3><p>Отворете „Настройки“, после „Абонамент“, разгледайте плановете, докоснете „Абониране“ при избрания план, потвърдете с платежната услуга или профила си в Apple и абонаментът ще се активира веднага.</p><h3>Управление на абонамента</h3><p>„Текущ план“ в „Настройки“, „Абонамент“ показва плана, датата на подновяване и цената. За да смените плана, преминете от безплатния към платен план по всяко време или сменете месечния с годишен и обратно след края на периода. За да прекратите абонамента, отворете „Настройки“, „Абонамент“, „Управление на абонамента“ (отваря управлението на абонаменти на Apple) и го прекратете там. Запазвате достъпа си до края на платения период.</p><h3>Безплатен пробен период</h3><p>Новите потребители може да отговарят на условията за 7-дневен безплатен пробен период на основния план с пълен достъп. Можете да го прекратите по всяко време по време на пробния период и няма да бъдете таксувани, ако го направите преди края му.</p><h3>Кой план е подходящ за вас?</h3><p>Изберете безплатния план, ако първо искате да изпробвате xHeal, основното проследяване отговаря на нуждите ви или ще използвате Orbs за платени функции. Изберете основния план, ако искате AI хранителни планове, ще използвате често чата с AI, желаете подробни доклади или подхождате сериозно към подобряването на здравето си.</p><blockquote><strong>Съвет:</strong> Започнете с безплатния план, за да разгледате xHeal. Преминете към основния план, когато поискате функции като неограничен AI чат или планиране на храненето.</blockquote>",
  },
  {
    slug: "managing-settings",
    category: "account-rewards",
    title: "Управление на настройките",
    description: "Научете как да управлявате профила, предпочитанията и настройките на приложението.",
    readingTime: 4,
    order: 3,
    content: "<h2>Персонализирайте работата си с xHeal</h2><p>Менюто „Настройки“ ви дава контрол върху профила, предпочитанията, свързаните услуги и поведението на приложението.</p><h3>Достъп до настройките</h3><p>Докоснете иконата със зъбно колело в горния ъгъл на таблото или отворете раздела „Настройки“.</p><h3>Настройки на профила</h3><p>Редактиране на профила: актуализирайте името, датата на раждане, височината, теглото, пола и снимката. Имейл и парола: сменете имейла, актуализирайте паролата и управлявайте начините за удостоверяване. Абонамент: вижте плана, преминете към по-висок план, прегледайте използването и управлявайте плащането.</p><h3>Здравни настройки</h3><p>Медикаменти: добавяйте медикаменти, задавайте дози и графици, отбелязвайте ги като текущи или минали и настройвайте напомняния. Добавки: добавяйте добавки, задавайте дози и конфигурирайте напомняния. Алергии: записвайте хранителни, медикаментозни и причинени от околната среда алергии. Състояния: добавяйте диагностицирани състояния и ги отбелязвайте като активни или отшумели. Жизнени събития: записвайте операции, наранявания и значими промени за контекст към здравната информация.</p><h3>Източници на данни</h3><p>Apple Health: вижте връзката, управлявайте разрешенията и задействайте синхронизиране. Интеграции: свързвайте здравни системи и управлявайте връзките чрез FHIR. Документи: преглеждайте качените документи, качвайте нови и изтривайте стари.</p><h3>Известия</h3><p>Управлявайте напомнянията за задачи (сутрин, следобед, вечер), напомнянията за серии последователни дни, здравните прозрения, известията за доклади и седмичните обобщения.</p><h3>Предпочитания</h3><p>Мерни единици: тегло (kg/lbs), височина (cm/ft-in), температура (C/F), разстояние (km/miles). Начало на седмицата: неделя или понеделник. Изглед: тъмен режим (по подразбиране) или според системните настройки.</p><h3>Поддръжка и информация</h3><p>Често задавани въпроси, връзка с поддръжката и информация за приложението (версия, правна информация, лицензи).</p><h3>Действия с профила</h3><p>„Изход“ прекратява сесията ви на това устройство. „Изтриване на профила“ изтрива завинаги профила и всички данни (действието не може да бъде отменено).</p><h3>Контроли за поверителност</h3><p>Изтеглете данните си, прегледайте настройките за споделяне на данни и управлявайте предпочитанията за анализи.</p><blockquote><strong>Съвет:</strong> Прегледайте настройките за известия след първоначалната настройка. Коригирайте ги, за да намерите точния баланс — достатъчно напомняния, за да следвате целите си, без да се чувствате претоварени.</blockquote>",
  },
];

const guidesBg: Guide[] = guideDefinitionsBg;
