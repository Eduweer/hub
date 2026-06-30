import Image from "next/image";
import styles from "./ArtifactGuardianSection.module.css";
import { artifactThemes, type ArtifactGuardianConfig } from "@/lib/artifacts";

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
  buyAmazon: string;
  buyEmpik: string;
}

interface ArtifactGuardianSectionProps {
  config: ArtifactGuardianConfig;
  text: ArtifactGuardianText;
  labels: ArtifactGuardianLabels;
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
  reverse = false,
}: ArtifactGuardianSectionProps) {
  const theme = artifactThemes[config.theme];

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

          <div className={styles.ctas}>
            <a
              href={config.amazonUrl}
              className={styles.btnPrimary}
              target={config.amazonUrl.startsWith("http") ? "_blank" : undefined}
              rel={config.amazonUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {labels.buyAmazon}
            </a>
            <a
              href={config.empikUrl}
              className={styles.btnSecondary}
              target={config.empikUrl.startsWith("http") ? "_blank" : undefined}
              rel={config.empikUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {labels.buyEmpik}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
