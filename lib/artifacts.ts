/**
 * Artifacts page configuration.
 *
 * Holds only the *non-translatable* data for the /artifacts one-pager:
 * guardian order, visual theme, asset paths, anchor ids and external links.
 * All copy (titles, descriptions, supports/inside lists, quotes …) lives in
 * the i18n message files under the `artifacts` namespace and is merged in by id
 * at render time. This keeps the page ready for translation while letting us
 * swap artwork and store links from a single place.
 */

import storeData from "./artifact-store.json";

export type ArtifactTheme =
  | "blue"
  | "green"
  | "purple"
  | "amber"
  | "nature"
  | "warm"
  | "red";

/** Per-guardian visual + linking config (text comes from translations). */
export interface ArtifactGuardianConfig {
  id: string;
  theme: ArtifactTheme;
  /** Anchor id used by the path nav. */
  anchor: string;
  /** 16:9 guardian illustration that fills the graphic half of the section. */
  image: string;
}

/** Shared, configurable links used across the page. */
export const artifactLinks = {
  parentSignup: "/parents#signup",
  parentsPage: "/parents",
  artifactsDetailsBase: "/artifacts",
} as const;

/** Theme color tokens per section. Consumed as inline CSS variables. */
export const artifactThemes: Record<
  ArtifactTheme,
  { background: string; accent: string; softAccent: string }
> = {
  blue: {
    background: "linear-gradient(135deg, #eaf6ff 0%, #f7fbff 100%)",
    accent: "#2f80c8",
    softAccent: "#d8ecff",
  },
  green: {
    background: "linear-gradient(135deg, #edf8ef 0%, #f8fff8 100%)",
    accent: "#3c7a4b",
    softAccent: "#dcefdc",
  },
  purple: {
    background: "linear-gradient(135deg, #f1ecfb 0%, #faf7ff 100%)",
    accent: "#6a4ca8",
    softAccent: "#e6dcf5",
  },
  amber: {
    background: "linear-gradient(135deg, #fff3d8 0%, #fffaf0 100%)",
    accent: "#c77b1a",
    softAccent: "#ffe6b8",
  },
  nature: {
    background: "linear-gradient(135deg, #eef8e8 0%, #fff8f2 100%)",
    accent: "#5f8f3f",
    softAccent: "#e2f0d4",
  },
  warm: {
    background: "linear-gradient(135deg, #fff3e7 0%, #fffaf5 100%)",
    accent: "#c27a42",
    softAccent: "#ffe5cc",
  },
  red: {
    background: "linear-gradient(135deg, #fff0ed 0%, #fff8f6 100%)",
    accent: "#b8483d",
    softAccent: "#ffd8d2",
  },
};

/** Hero background assets (flat under public/videos and public/images). */
export const artifactHeroMedia = {
  video: "/videos/hero-radomir-guardians.mp4",
  poster: "/images/hero-radomir-guardians.jpg",
};

/**
 * Guardian sections in display order. The `id` is the join key with the
 * `artifacts.guardians.<id>` translation entry.
 */
export const artifactGuardians: ArtifactGuardianConfig[] = [
  {
    id: "auralis",
    theme: "blue",
    anchor: "auralis",
    image: "/images/auralis_preview.webp",
  },
  {
    id: "narin",
    theme: "purple",
    anchor: "narin",
    image: "/images/narin_preview.webp",
  },
  {
    id: "tivia",
    theme: "amber",
    anchor: "tivia",
    image: "/images/tivia_preview.webp",
  },
  {
    id: "liora",
    theme: "nature",
    anchor: "liora",
    image: "/images/liora_preview.webp",
  },
  {
    id: "maela",
    theme: "warm",
    anchor: "maela",
    image: "/images/maela_preview.webp",
  },
  {
    id: "boran",
    theme: "red",
    anchor: "boran",
    image: "/images/boran_preview.webp",
  },
];

/* ── Store data ──────────────────────────────────────────────────────────────
   Buy links live in artifact-store.json (per guardian, per locale) so that
   platforms, prices, languages and release timing can change without touching
   the page or components. */

/** A single store button. */
export interface ArtifactStoreLink {
  title: string;
  link: string;
}

/** Availability for one workbook in one locale. */
export interface ArtifactStoreEntry {
  /** Optional demo download; when set, shown before the store buttons. */
  demo?: ArtifactStoreLink | null;
  /** Shown when there are no `links` yet (e.g. "Coming soon"). */
  soon?: string;
  /** Ordered buy buttons; first is the primary CTA. */
  links: ArtifactStoreLink[];
}

type ArtifactStore = Record<string, Record<string, ArtifactStoreEntry>>;

// The JSON carries a leading "_comment" key; strip anything non-object defensively.
const store = storeData as unknown as ArtifactStore & { _comment?: string };

const EMPTY_ENTRY: ArtifactStoreEntry = { links: [] };

/**
 * Resolve the store entry for a guardian in a given locale.
 * Falls back to English, then to the first defined locale, then to an empty
 * entry — so a missing translation never breaks the page.
 */
export function getArtifactStoreEntry(id: string, locale: string): ArtifactStoreEntry {
  const byLocale = store[id];
  if (!byLocale || typeof byLocale !== "object") return EMPTY_ENTRY;
  return (
    byLocale[locale] ??
    byLocale.en ??
    byLocale[Object.keys(byLocale)[0]] ??
    EMPTY_ENTRY
  );
}
