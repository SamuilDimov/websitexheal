# Wellness Feature Competitor Analysis

Last reviewed: 2026-07-13

## Purpose

This document substantiates the named-product comparisons on `/workouts`,
`/nutrition`, and `/mindfulness`. It records the intended positioning, the
public sources checked, the xHeal implementation evidence, and the claims that
must not be published until the product changes.

Comparisons describe publicly documented consumer features. "Not documented"
means the capability was not found in the cited public product material on the
review date; it is not a claim that the product can never support it. Features
can vary by subscription, platform, and region.

## Positioning Principle

xHeal should not claim to have the largest exercise, food, or meditation
catalog. Specialist apps are stronger in those dimensions. The defensible
advantage is helping a user act with broader health context in view:

> Train, eat, and reset with the rest of your health in view.

This is not a neutral feature inventory. Each comparison should establish
xHeal as the stronger overall choice for the user's complete outcome. A
specialist may win one narrow dimension, but xHeal should win the decision by
connecting context, recommendation, action, and history in one health profile.

Use targeted superiority rather than an unsupported universal claim. Prefer
"the most complete health-aware workflow in this comparison" or "the stronger
choice when you want your health connected" over "better for everyone" or
"the only app that can do this."

## Workouts

### Intended Position

WHOOP is centered on continuous wearable recovery, Fitbod on adaptive strength
programming, and Hevy on strength logging and programming. xHeal is positioned
for people who want readiness-based workout guidance to account for sleep,
stress, training load, and relevant health constraints in the same health app.

### xHeal Competitive Advantage

xHeal connects the parts that the compared specialists separate: recovery
signals, relevant health constraints, a matched workout, live session logging,
and strength progress. It does this without proprietary hardware and keeps the
result beside symptoms, records, labs, nutrition, mood, and other health data.

**Marketing verdict:** Choose xHeal for the most complete health-aware training
workflow in this comparison. WHOOP measures recovery, Fitbod programs strength,
and Hevy logs lifting; xHeal turns today's wider context into an action and
keeps the outcome connected to the rest of the user's health.

### Public Competitor Sources

| Product | Source | Publicly documented evidence used |
| --- | --- | --- |
| WHOOP | https://www.whoop.com/ | 24/7 wearable monitoring, Recovery, Strain, sleep, coaching, Strength Trainer, proprietary device and membership |
| Fitbod | https://fitbod.me/ | Personalized workouts based on goals, equipment, progress, and muscle recovery; guided strength tracking |
| Hevy | https://www.hevyapp.com/features/ | Workout logging, progress statistics, routines, social features |
| Hevy Trainer | https://www.hevyapp.com/features/workout-plan-generator/ | Programs based on experience, goals, equipment, schedule, duration, and workout history; progressive programming |

### xHeal Implementation Evidence

| Capability | Implementation evidence |
| --- | --- |
| Readiness inputs and weights | `xheal-v2/packages/api/services/workout_readiness.py` |
| Health and recovery constraints | `xheal-v2/packages/api/services/workout_fingerprint.py` |
| Workout matching | `xheal-v2/packages/api/services/workout_scorer.py` |
| Session and set logging | `xheal-v2/packages/mobile/src/v2/screens/Workout/WorkoutSessionScreen.tsx` |
| Live heart-rate display | `xheal-v2/packages/mobile/src/v2/hooks/useLiveWorkoutHeartRate.ts` |
| Progress and estimated 1RM | `xheal-v2/packages/mobile/src/v2/screens/Workout/ExerciseDetailScreen.tsx` |

### Claim Boundaries

- Do not claim progressive overload currently influences xHeal recommendation ranking.
- Do not describe readiness as medical clearance or injury prevention.
- Do not claim heart-rate samples are attached to the saved Apple Health workout.
- Do not call the deterministic recommendation engine generative AI.
- Say that health constraints can limit recommendations, not that xHeal makes exercise safe for a condition.

## Nutrition

### Intended Position

MyFitnessPal is strongest in food-database scale and fast logging. Cronometer is
strongest in nutrient depth and source transparency. Lifesum combines polished
consumer logging, habits, and meal plans. xHeal is positioned around generating
a seven-day plan from macro targets, restrictions, allergies, eating style, and
ingredient preferences inside the user's wider health workspace.

### xHeal Competitive Advantage

xHeal should be presented as a plan-to-action product rather than another food
diary. It turns targets and exclusions into a seven-day plan, supports
individual meal swaps, aggregates the active plan into one shopping list, and
keeps tracking beside the user's wider health profile. Database size is an
input advantage for a tracker; completing the week is the user outcome xHeal
should own.

**Marketing verdict:** Choose xHeal when the goal is not merely to record food,
but to produce and follow a personalized week. The compared products are
stronger in individual logging or nutrient-analysis dimensions; xHeal offers
the clearest connected path from targets to meals, shopping, tracking, and the
rest of the user's health.

### Public Competitor Sources

| Product | Source | Publicly documented evidence used |
| --- | --- | --- |
| MyFitnessPal | https://www.myfitnesspal.com/ | 20M+ global foods, search, premium barcode and camera logging, voice logging, tailored weekly meal plans, 35+ integrations |
| Cronometer | https://cronometer.com/features/ | Barcode logging, up to 84 nutrients, exercise and biometric tracking, recipes, reports, device sync |
| Cronometer photo logging | https://cronometer.com/features/photo-voice-logging.html | AI photo and voice capture backed by established nutrition databases |
| Lifesum | https://lifesum.com/ | Photo, voice, text, barcode and quick tracking; meal plans, diets, water tracking, wearable sync |

### xHeal Implementation Evidence

| Capability | Implementation evidence |
| --- | --- |
| Nutrition entities and logged data | `xheal-v2/packages/data-model/data_model/nutrition.py` |
| Dietary profile and preferences | `xheal-v2/packages/mobile/src/v2/screens/Nutrition/DietaryPreferencesScreen.tsx` |
| Calorie and macro targets | `xheal-v2/packages/mobile/src/v2/screens/Nutrition/MacroTargetConfigScreen.tsx` |
| Seven-day planning and filtering | `xheal-v2/packages/temporal-workers/temporal_workers/workflows/nutrition_plan_workflow.py` |
| Deterministic plan generation | `xheal-v2/packages/temporal-workers/temporal_workers/activities/nutrition_activities.py` |
| Photo analysis | `xheal-v2/packages/agent_framework/agent_framework/agents/food_analysis.py` |
| Catalog counts and USDA basis | `xheal-v2/data/nutrition/README.md` |

### Claim Boundaries

- Use "Nutrition," not "Nutrition & Hydration." Water is currently only an imported Apple Health vital.
- Do not claim functional database search, barcode lookup, recent foods, favorites, or reusable custom foods.
- Do not claim a million-item xHeal food database.
- Do not claim detailed micronutrient tracking; the current flow focuses on calories and macros.
- Do not claim users review individual photo-analysis items before the initial log is created.
- Do not say the meal plan uses labs, workout load, sleep, mood, or medical records. Those data exist in xHeal, but do not currently drive plan generation.
- Use "nearly 500 recipes," not "500+ recipes."

## Mindfulness

### Intended Position

Calm and Headspace provide much larger meditation and sleep libraries.
Headspace also offers coaching and therapy products. Breathwrk specializes in a
large breathwork catalog and guided classes. xHeal is positioned around turning
a mood and stress check-in into a short breathing or check-in action, then
keeping that activity beside the rest of the user's health data.

### xHeal Competitive Advantage

xHeal should not compete on the number of sessions. Its advantage is reducing
choice and connecting the practice to the user: check in, see Mind Readiness,
receive a short next action, complete guided breathing, and retain the activity
beside sleep, workouts, nutrition, wearable data, and records.

**Marketing verdict:** Choose xHeal for a connected wellbeing workflow rather
than another standalone content subscription. Calm and Headspace provide more
content and Breathwrk provides more breathing exercises; xHeal provides the
stronger path from today's check-in to a completed action inside the user's
wider health profile.

### Public Competitor Sources

| Product | Source | Publicly documented evidence used |
| --- | --- | --- |
| Calm | https://www.calm.com/ | Guided meditation, Breathe Bubble, 500+ Sleep Stories, soundscapes, Sleep Check-In |
| Headspace | https://www.headspace.com/ | 1,000+ expert-led exercises, meditation, sleep, Ebb recommendations, coaching and therapy offerings |
| Breathwrk | https://www.breathwrk.com/ | 50+ breathing exercises, guided classes, haptics, sounds, habits, records and achievements |

### xHeal Implementation Evidence

| Capability | Implementation evidence |
| --- | --- |
| Breathing patterns | `xheal-v2/packages/domain/domain/mindfulness/breathing_patterns.py` |
| Guided breathing UI and session persistence | `xheal-v2/packages/mobile/src/v2/screens/Mindfulness/BreathingScreen.tsx` |
| Mood, energy, stress, and anxiety check-in | `xheal-v2/packages/mobile/src/v2/screens/Mindfulness/MoodCheckInScreen.tsx` |
| Mind Readiness inputs | `xheal-v2/packages/domain/domain/mindfulness/readiness.py` |
| Rule-based recommendation engine | `xheal-v2/packages/api/services/mindfulness_recommender.py` |
| Apple Health Mindful Minutes | `xheal-v2/packages/mobile/src/v2/services/healthkit/client.ts` |

### Claim Boundaries

- Do not claim real-time HRV biofeedback, an Apple Watch live connection, an HRV trend line, or a post-session HRV summary.
- Do not claim a guided meditation library, journaling, mindfulness plans, or custom breathing patterns.
- Describe four check-in dimensions on a five-point scale: mood, energy, stress, and anxiety.
- Do not claim that activity or practice frequency currently contributes to Mind Readiness.
- Avoid claiming flare-up-aware Mind Readiness until the flare-up resource lookup and no-data behavior are corrected.
- Do not claim that HRV or sleep currently drives practice selection until the
  mindfulness fingerprint queries match the stored vital names and granularity.
- Do not describe xHeal as therapy, diagnosis, crisis support, or treatment.

## Publishing Rules

1. Recheck every cited public source before changing a comparison cell.
2. Record the new review date and any platform, plan, or region limitation.
3. Prefer descriptive cells over unqualified yes/no assertions.
4. Keep competitor strengths visible for credibility, but organize the comparison around the complete user outcome and make xHeal's overall advantage explicit.
5. Avoid "only xHeal," "clinical-grade," guaranteed outcomes, and unqualified superiority claims.
6. Keep the visible comparison methodology, source links, and trademark disclaimer on each page.
7. Update English claims first, then translate them into Bulgarian without translating product names.
8. End every comparison with a direct choice statement explaining why xHeal is the stronger overall option for the target user.
