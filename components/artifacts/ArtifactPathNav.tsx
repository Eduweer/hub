"use client";

import styles from "./ArtifactPathNav.module.css";
import { artifactGuardians, artifactThemes } from "@/lib/artifacts";

interface PathItem {
  name: string;
  label: string;
}

interface ArtifactPathNavProps {
  title: string;
  items: PathItem[];
}

/**
 * Quick-glance bar of the six trial paths. Each capsule anchors to its guardian
 * section and is tinted with that guardian's theme accent. Horizontal scroll on
 * mobile; centered wrap on desktop. Order follows `artifactGuardians`.
 */
export default function ArtifactPathNav({ title, items }: ArtifactPathNavProps) {
  return (
    <nav className={styles.nav} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.track}>
        {items.map((item, i) => {
          const cfg = artifactGuardians[i];
          const accent = cfg ? artifactThemes[cfg.theme].accent : "var(--gold)";
          const soft = cfg ? artifactThemes[cfg.theme].softAccent : "var(--gold-pale)";
          return (
            <li key={cfg?.id ?? i}>
              <a
                href={`#${cfg?.anchor ?? ""}`}
                className={styles.pill}
                style={{ "--pill-accent": accent, "--pill-soft": soft } as React.CSSProperties}
              >
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.pillName}>{item.name}</span>
                <span className={styles.pillSep} aria-hidden="true">·</span>
                <span className={styles.pillLabel}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
