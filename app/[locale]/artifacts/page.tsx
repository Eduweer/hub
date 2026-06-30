import type { Metadata } from "next";
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Background from "@/components/shared/Background";
import Motes from "@/components/shared/Motes";
import Footer from "@/components/shared/Footer";
import FaqAccordion from "@/components/parent/FaqAccordion";
import ArtifactsHero from "@/components/artifacts/ArtifactsHero";
import ArtifactPathNav from "@/components/artifacts/ArtifactPathNav";
import ArtifactGuardianSection, {
  type ArtifactGuardianText,
  type ArtifactGuardianLabels,
} from "@/components/artifacts/ArtifactGuardianSection";
import { artifactGuardians, artifactLinks } from "@/lib/artifacts";
import styles from "./ArtifactsPage.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "artifacts.meta" });
  return { title: t("title"), description: t("description") };
}

// Gold/amber motes to match the collector identity (distinct from /parents green)
const ARTIFACT_MOTES = [
  { left: "10%", top: "68%", size: "2.5px", color: "#C8963C", duration: "12s", delay: "0s" },
  { left: "24%", top: "62%", size: "2px",   color: "#E8BB6A", duration: "15s", delay: "2s" },
  { left: "76%", top: "70%", size: "3px",   color: "#C8963C", duration: "11s", delay: "4s" },
  { left: "88%", top: "58%", size: "2px",   color: "#E8BB6A", duration: "13s", delay: "1.5s" },
  { left: "52%", top: "78%", size: "2px",   color: "#C8963C", duration: "14s", delay: "3s" },
  { left: "64%", top: "66%", size: "2.5px", color: "#E8BB6A", duration: "10s", delay: "6s" },
];

export default function ArtifactsPage() {
  const t = useTranslations("artifacts");

  // Translated arrays / objects
  const howSteps = t.raw("how.steps") as Array<{ title: string; description: string }>;
  const pathItems = t.raw("pathNav.items") as Array<{ name: string; label: string }>;
  const parentFeatures = t.raw("parentBenefits.features") as Array<{ title: string; description: string }>;
  const worldItems = t.raw("world.items") as Array<{ title: string; description: string }>;
  const faqItems = (t.raw("faq.items") as Array<{ q: string; a: string }>);
  const guardianLabels = t.raw("guardianLabels") as ArtifactGuardianLabels;

  return (
    <>
      <Background
        glowStyle={{
          background: `
            radial-gradient(ellipse 100% 55% at 50% 0%, rgba(200,150,60,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 10% 60%, rgba(150,110,180,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 90% 60%, rgba(200,150,60,0.08) 0%, transparent 55%)
          `,
        }}
      />
      <Motes motes={ARTIFACT_MOTES} />

      {/* Hero — fixed, stays behind while content scrolls over */}
      <ArtifactsHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        navLinks={[
          { label: t("navLinks.how"), href: "#how" },
          { label: t("navLinks.artifacts"), href: "#paths" },
          { label: t("navLinks.parent"), href: "#parent" },
          { label: t("navLinks.world"), href: "#world" },
        ]}
      />

      {/* Everything below scrolls over the fixed hero */}
      <div className={styles.pageContent}>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className={`${styles.section} ${styles.wrap}`}>
          <div className={styles.centered}>
            <span className={styles.eye}>{t("how.eyebrow")}</span>
            <h2 className={styles.sectionTitle}>{t("how.title")}</h2>
            <p className={styles.lead}>{t("how.description")}</p>
          </div>
          <ol className={styles.howSteps}>
            {howSteps.map((step, i) => (
              <li key={i} className={styles.howCard}>
                <span className={styles.howNum}>{i + 1}</span>
                <h3 className={styles.howCardTitle}>{step.title}</h3>
                <p className={styles.howCardDesc}>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <Ornament />

        {/* ── PATH NAV ── */}
        <section id="paths" className={`${styles.section} ${styles.wrap}`}>
          <ArtifactPathNav title={t("pathNav.title")} items={pathItems} />
        </section>

        {/* ── SIX GUARDIAN SECTIONS (full-bleed, themed) ── */}
        <div className={styles.guardians}>
          {artifactGuardians.map((config, i) => (
            <ArtifactGuardianSection
              key={config.id}
              config={config}
              text={t.raw(`guardians.${config.id}`) as ArtifactGuardianText}
              labels={guardianLabels}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        {/* ── PARENT ACCOUNT BENEFITS ── */}
        <section id="parent" className={`${styles.section} ${styles.wrap} ${styles.bandSoft}`}>
          <div className={styles.centered}>
            <span className={styles.eye}>{t("parentBenefits.eyebrow")}</span>
            <h2 className={styles.sectionTitle}>{t("parentBenefits.title")}</h2>
            <p className={styles.lead}>{t("parentBenefits.description")}</p>
          </div>
          <div className={styles.featureGrid}>
            {parentFeatures.map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <span className={styles.featureNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.centeredCta}>
            <a href={artifactLinks.parentSignup} className={styles.btnPrimary}>
              {t("parentBenefits.cta")}
            </a>
          </div>
        </section>

        <Ornament />

        {/* ── EDUWEER WORLD BRIDGE ── */}
        <section id="world" className={`${styles.section} ${styles.wrap}`}>
          <div className={styles.centered}>
            <span className={styles.eye}>{t("world.eyebrow")}</span>
            <h2 className={styles.sectionTitle}>{t("world.title")}</h2>
            <p className={styles.lead}>{t("world.description")}</p>
          </div>
          <ol className={styles.worldFlow}>
            {worldItems.map((item, i) => (
              <li key={i} className={styles.worldStep}>
                <span className={styles.worldNum}>{i + 1}</span>
                <h3 className={styles.worldStepTitle}>{item.title}</h3>
                <p className={styles.worldStepDesc}>{item.description}</p>
              </li>
            ))}
          </ol>
          <div className={styles.centeredCta}>
            <a href={artifactLinks.parentsPage} className={styles.btnSecondary}>
              {t("world.cta")}
            </a>
          </div>
        </section>

        <Ornament />

        {/* ── FAQ ── */}
        <section id="faq" className={`${styles.section} ${styles.wrap} ${styles.bandSoft}`}>
          <div className={styles.centered}>
            <span className={styles.eye}>{t("faq.eyebrow")}</span>
            <h2 className={styles.sectionTitle}>{t("faq.title")}</h2>
          </div>
          <div className={styles.faqWrap}>
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className={`${styles.section} ${styles.wrap}`}>
          <div className={styles.finalCta}>
            <h2 className={styles.finalTitle}>{t("finalCta.title")}</h2>
            <p className={styles.finalDesc}>{t("finalCta.description")}</p>
            <div className={styles.finalCtas}>
              <a href={artifactLinks.parentSignup} className={styles.btnPrimary}>
                {t("finalCta.primaryCta")}
              </a>
              <a href="#paths" className={styles.btnSecondary}>
                {t("finalCta.secondaryCta")}
              </a>
            </div>
            <a href={artifactLinks.parentsPage} className={styles.finalTertiary}>
              {t("finalCta.tertiaryCta")}
            </a>
          </div>
        </section>

        <div className={styles.footerWrap}>
          <Footer />
        </div>
      </div>
    </>
  );
}

/** Shared gold-diamond divider between content bands. */
function Ornament() {
  return (
    <div className={styles.orn} aria-hidden="true">
      <div className={styles.ornLine} />
      <div className={styles.ornDiamond} />
      <div className={styles.ornLine} />
    </div>
  );
}
