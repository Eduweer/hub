import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getLanguageAlternates, getLocalizedUrl } from "@/lib/seo";

const INDEXABLE_PATHS = [
  "/",
  "/parents",
  "/artifacts",
  "/teachers",
  "/investors",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: getLocalizedUrl(locale, path),
      alternates: {
        languages: getLanguageAlternates(path),
      },
    })),
  );
}
