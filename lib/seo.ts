import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_NAME = "Eduria";
export const SITE_URL = "https://eduria.io";
export const SITE_CREATOR = "Radosław Kamysz";

const SOCIAL_IMAGE_ALT =
  "Eduria — edukacyjna przygoda łącząca książkę, zeszyt ćwiczeń i aplikację";

export type AppLocale = (typeof routing.locales)[number];

const OPEN_GRAPH_LOCALES: Record<AppLocale, string> = {
  pl: "pl_PL",
  en: "en_GB",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
  ja: "ja_JP",
  da: "da_DK",
  nl: "nl_NL",
  pt: "pt_PT",
};

function normalizeLocale(locale: string): AppLocale {
  return routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;
}

function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function getLocalizedUrl(locale: string, path = "/"): string {
  const validLocale = normalizeLocale(locale);
  const localePrefix =
    validLocale === routing.defaultLocale ? "" : `/${validLocale}`;

  return `${SITE_URL}${localePrefix}${normalizePath(path)}`;
}

export function getLanguageAlternates(path = "/"): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, getLocalizedUrl(locale, path)]),
  );

  return {
    ...languages,
    "x-default": getLocalizedUrl(routing.defaultLocale, path),
  };
}

interface PageMetadataInput {
  locale: string;
  path?: string;
  title: string;
  description: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  locale,
  path = "/",
  title,
  description,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const validLocale = normalizeLocale(locale);
  const canonical = getLocalizedUrl(validLocale, path);
  const alternateLocale = routing.locales
    .filter((item) => item !== validLocale)
    .map((item) => OPEN_GRAPH_LOCALES[item]);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: OPEN_GRAPH_LOCALES[validLocale],
      alternateLocale,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/twitter-image",
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function createWebsiteJsonLd(locale: string, description: string) {
  const validLocale = normalizeLocale(locale);
  const localizedUrl = getLocalizedUrl(validLocale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#creator`,
        name: SITE_CREATOR,
        url: SITE_URL,
      },
      {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/#project`,
        name: SITE_NAME,
        description,
        inLanguage: validLocale,
        educationalUse: "learning through stories, play and shared activities",
        learningResourceType: ["Book", "Workbook", "Mobile application"],
        creator: {
          "@id": `${SITE_URL}/#creator`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: [...routing.locales],
        creator: {
          "@id": `${SITE_URL}/#creator`,
        },
        about: {
          "@id": `${SITE_URL}/#project`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${localizedUrl}/#webpage`,
        url: localizedUrl,
        name: SITE_NAME,
        description,
        inLanguage: validLocale,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#project`,
        },
      },
    ],
  };
}

export function createFaqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
