"use client";

import { useEffect, useRef } from "react";
import HeroVideo from "./HeroVideo";
import Header from "@/components/shared/Header";
import styles from "./StickyHero.module.css";

interface NavLink { label: string; href: string; }

interface StickyHeroProps {
  title: string;
  subtitle: string;
  cta: string;
  navLinks?: NavLink[];
}

export default function StickyHero({
  title, subtitle, cta, navLinks,
}: StickyHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const onScroll = () => {
      // Fade out hero content over first 50% of viewport scrolled
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.5), 1);
      content.style.opacity = String(1 - progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.hero}>
      <HeroVideo />

      <div className={styles.heroHeader}>
        <Header navLinks={navLinks} />
      </div>

      <div ref={contentRef} className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
        {title}
        </h1>
        <p className={styles.heroSub}>{subtitle}</p>
        <div className={styles.heroCtas}>
          <a href="#transition" className={styles.btnPrimary}>
            {cta}
          </a>
          {/* <a href="#jak-dziala" className={styles.btnSecondary}>
            {ctaSecondary}
          </a> */}
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
