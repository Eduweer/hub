"use client";

import { useEffect, useRef } from "react";
import ArtifactsHeroVideo from "./ArtifactsHeroVideo";
import Header from "@/components/shared/Header";
import styles from "./ArtifactsHero.module.css";

interface NavLink {
  label: string;
  href: string;
}

interface ArtifactsHeroProps {
  eyebrow: string;
  title: string;
  navLinks?: NavLink[];
}

/**
 * Fixed hero for /artifacts. Same scroll-over pattern as the parent StickyHero
 * (content fades as the page scrolls over the fixed video). Kept intentionally
 * minimal — just the eyebrow and title over the video; supporting copy, CTAs
 * and the process flow live further down the page.
 */
export default function ArtifactsHero({
  eyebrow,
  title,
  navLinks,
}: ArtifactsHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.5), 1);
      content.style.opacity = String(1 - progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.hero}>
      <ArtifactsHeroVideo />

      <div className={styles.heroHeader}>
        <Header navLinks={navLinks} />
      </div>

      <div ref={contentRef} className={styles.heroContent}>
        <span className={styles.heroEye}>{eyebrow}</span>
        <h1 className={styles.heroTitle}>{title}</h1>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
