import Image from "next/image";
import styles from "./ArtifactGuardianSection.module.css";
import {
  artifactThemes,
  type ArtifactGuardianConfig,
  type ArtifactStoreEntry,
} from "@/lib/artifacts";

/** Translated copy for one guardian (joined with config by id). */
export interface ArtifactGuardianText {
  guardianRole: string;
  artifactName: string;
  title: string;
  description: string;
  parentDescription: string;
  supports: string[];
  inside: string[];
}

/** Shared, language-specific labels reused across every guardian. */
export interface ArtifactGuardianLabels {
  supports: string;
  inside: string;
  parent: string;
}

interface ArtifactGuardianSectionProps {
  config: ArtifactGuardianConfig;
  text: ArtifactGuardianText;
  labels: ArtifactGuardianLabels;
  /** Buy links / availability for this workbook in the current locale. */
  store: ArtifactStoreEntry;
  /** Reverse media/text columns for visual rhythm between sections. */
  reverse?: boolean;
}

/**
 * One full-width guardian/workbook section. Visual identity is driven entirely
 * by the guardian's theme (passed in as inline CSS variables), so the same
 * component renders six distinct color worlds. Media (guardian illustration +
 * workbook cover mockup) sits on one side, copy + CTAs on the other.
 */
export default function ArtifactGuardianSection({
  config,
  text,
  labels,
  store,
  reverse = false,
}: ArtifactGuardianSectionProps) {
  const theme = artifactThemes[config.theme];
  const hasLinks = store.links.length > 0;
  // Demo is optional — only render when both title and link are provided.
  const demo = store.demo && store.demo.title && store.demo.link ? store.demo : null;
  const demoExternal = demo ? /^https?:\/\//.test(demo.link) : false;

  const sectionStyle = {
    "--accent": theme.accent,
    "--soft-accent": theme.softAccent,
    "--theme-bg": theme.background,
  } as React.CSSProperties;

  return (
    <section
      id={config.anchor}
      className={`${styles.section} ${reverse ? styles.reverse : ""}`}
      style={sectionStyle}
      aria-labelledby={`${config.id}-title`}
    >
      <div className={styles.layout}>
        {/* Graphic half — guardian preview illustration (1448×1086, 4:3),
            cropped vertically as needed. The gradient seam (handled in CSS)
            blends its inner edge into the content panel. */}
        <div className={styles.media}>
          <Image
            src={config.image}
            alt={text.title}
            width={1448}
            height={1086}
            loading="lazy"
            sizes="(max-width: 960px) 100vw, 50vw"
            className={styles.mediaImg}
          />
        </div>

        {/* Content half */}
        <div className={styles.body}>
          <span className={styles.artifactBadge}>{text.artifactName}</span>
          <span className={styles.role}>{text.guardianRole}</span>
          <h3 id={`${config.id}-title`} className={styles.title}>
            {text.title}
          </h3>
          <p className={styles.desc}>{text.description}</p>

          <div className={styles.tagGroups}>
            <div className={styles.tagGroup}>
              <h4 className={styles.tagLabel}>{labels.supports}</h4>
              <ul className={styles.tags}>
                {text.supports.map((s, i) => (
                  <li key={i} className={styles.tag}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.tagGroup}>
              <h4 className={styles.tagLabel}>{labels.inside}</h4>
              <ul className={styles.insideList}>
                {text.inside.map((s, i) => (
                  <li key={i} className={styles.insideItem}>
                    <span className={styles.insideDot} aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.parentNote}>
            <span className={styles.parentNoteLabel}>{labels.parent}</span>
            <p className={styles.parentNoteText}>{text.parentDescription}</p>
          </div>

          {/* Optional demo download + buy buttons from the store. When no buy
              links are set yet, the locale's "coming soon" note is shown. */}
          {(demo || hasLinks) && (
            <div className={styles.ctas}>
              {demo && (
                <a
                  href={demo.link}
                  className={styles.btnDemo}
                  target={demoExternal ? "_blank" : undefined}
                  rel={demoExternal ? "noopener noreferrer" : undefined}
                >
                  {demo.title}
                </a>
              )}
              {store.links.map((l, i) => {
                const external = /^https?:\/\//.test(l.link);
                return (
                  <a
                    key={i}
                    href={l.link}
                    className={i === 0 ? styles.btnPrimary : styles.btnSecondary}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {l.title}
                  </a>
                );
              })}
            </div>
          )}
          {!hasLinks && store.soon && <p className={styles.soonNote}>{store.soon}</p>}
        </div>
      </div>
    </section>
  );
}
