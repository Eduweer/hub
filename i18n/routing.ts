import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "en", "de", "fr", "es", "it", "ja"],
  defaultLocale: "pl",
  localePrefix: "as-needed",
});
