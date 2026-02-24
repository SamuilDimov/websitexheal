import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All supported locales
  locales: ["en", "bg"],

  // Default locale — no prefix in URL
  defaultLocale: "en",
});
