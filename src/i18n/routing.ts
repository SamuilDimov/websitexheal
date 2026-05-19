import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All supported locales
  locales: ["en", "bg"],

  // Default locale — no prefix in URL
  defaultLocale: "en",

  // Only show locale prefix for non-default locales (e.g., /bg/about but /about for English)
  localePrefix: "as-needed",
});
