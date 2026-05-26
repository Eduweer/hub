import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Background from "@/components/shared/Background";
import Footer from "@/components/shared/Footer";
import styles from "./PrivacyPage.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy.meta" });
  return { title: t("title"), description: t("description") };
}

interface Section {
  title: string;
  body: string;
}

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const sections = t.raw("sections") as Section[];

  return (
    <>
      <Background
        glowStyle={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(180,210,195,0.18) 0%, transparent 60%)
          `,
        }}
      />
      <div className={styles.page}>
        <div className={styles.wrap}>

          <Link href="/" className={styles.backLink}>
            ← Eduweer
          </Link>

          <span className={styles.eyebrow}>{t("eyebrow")}</span>
          <h1 className={styles.title}>{t("title")}</h1>
          <span className={styles.updated}>{t("updated")}</span>

          <p className={styles.intro}>{t("intro")}</p>

          <div className={styles.sections}>
            {sections.map((section, i) => (
              <div key={i} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.sectionBody}>{section.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.contactBar}>
            {t("contact")}
          </div>

        </div>
        <Footer />
      </div>
    </>
  );
}
