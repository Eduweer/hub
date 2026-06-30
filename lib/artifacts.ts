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
  /** Store links — placeholders for now, configurable per guardian. */
  amazonUrl: string;
  empikUrl: string;
}

/** Shared, configurable links used across the page. */
export const artifactLinks = {
  parentSignup: "/parents#signup",
  parentsPage: "/parents",
  artifactsDetailsBase: "/artifacts",
  amazon: "#",
  empik: "#",
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

/** Hero background assets (placeholder paths — final media swapped later). */
export const artifactHeroMedia = {
  video: "/videos/artifacts/hero-radomir-guardians.mp4",
  poster: "/images/artifacts/hero-radomir-guardians.jpg",
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
    image: "/images/auralis.webp",
    amazonUrl: artifactLinks.amazon,
    empikUrl: artifactLinks.empik,
  },
  {
    id: "narin",
    theme: "purple",
    anchor: "narin",
    image: "/images/narin.webp",
    amazonUrl: artifactLinks.amazon,
    empikUrl: artifactLinks.empik,
  },
  {
    id: "tivia",
    theme: "amber",
    anchor: "tivia",
    image: "/images/tivia.webp",
    amazonUrl: artifactLinks.amazon,
    empikUrl: artifactLinks.empik,
  },
  {
    id: "liora",
    theme: "nature",
    anchor: "liora",
    image: "/images/liora.webp",
    amazonUrl: artifactLinks.amazon,
    empikUrl: artifactLinks.empik,
  },
  {
    id: "maela",
    theme: "warm",
    anchor: "maela",
    image: "/images/maela.webp",
    amazonUrl: artifactLinks.amazon,
    empikUrl: artifactLinks.empik,
  },
  {
    id: "boran",
    theme: "red",
    anchor: "boran",
    image: "/images/boran.webp",
    amazonUrl: artifactLinks.amazon,
    empikUrl: artifactLinks.empik,
  },
];
