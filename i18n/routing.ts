import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "en", "de", "fr", "es", "it", "ja", "da", "nl", "pt"],
  defaultLocale: "pl",
  localePrefix: "as-needed",
});
