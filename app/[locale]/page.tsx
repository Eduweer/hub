import { useTranslations } from "next-intl";
import Background from "@/components/shared/Background";
import Motes from "@/components/shared/Motes";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Portal from "@/components/hub/Portal";
import styles from "./HubPage.module.css";
import { assetUrl } from "@/lib/cdn";

export default function HubPage() {
  const t = useTranslations("hub");

  return (
    <>
      <Background
        glowStyle={{
          background: `
            radial-gradient(ellipse 90% 65% at 50% 35%, rgba(200,215,235,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 55% 40% at 15% 75%, rgba(100,140,190,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 55% 40% at 85% 75%, rgba(100,140,190,0.08) 0%, transparent 60%)
          `,
        }}
      />
      <Motes />

      <div className={styles.page} style={{ backgroundImage: `url('${assetUrl("/images/bg_0.webp")}')` }}>
        <Header />

        <section className={styles.hero} aria-labelledby="hub-title">
          <div className={styles.heroEye} aria-hidden="true">
            {t("eyebrow")}
          </div>
          <h1 className={styles.heroTitle} id="hub-title">
            {t("titleBefore")}<em>{t("titleAccent")}</em>{t("titleAfter")}
            <br />
            {t("titleLine2")}
          </h1>
          <p className={styles.heroSub}>{t("subtitle")}</p>
        </section>

        <section className={styles.portals} aria-label="Portale Eduweer">
          <Portal
            color="green"
            href="/parents"
            tag={t("portals.parent.tag")}
            name={t("portals.parent.name")}
            desc={t("portals.parent.desc")}
            cta={t("portals.parent.cta")}
            ariaLabel={t("portals.parent.name")}
            imageSrc="/images/parent.webp"
            ringColor="#72c49a"
            arcColor="#c8f0dc"
            dustColor="#72C49A"
            animDelay="0.14s"
          />
          <Portal
            color="blue"
            href="/investors"
            tag={t("portals.investor.tag")}
            name={t("portals.investor.name")}
            desc={t("portals.investor.desc")}
            cta={t("portals.investor.cta")}
            ariaLabel={t("portals.investor.name")}
            imageSrc="/images/tower_dream_stone.webp"
            ringColor="#6aaad4"
            arcColor="#c4dcf0"
            dustColor="#6AAAD4"
            animDelay="0.26s"
          />
          <Portal
            color="copper"
            href="/kampania"
            tag={t("portals.campaign.tag")}
            name={t("portals.campaign.name")}
            desc={t("portals.campaign.desc")}
            cta={t("portals.campaign.cta")}
            ariaLabel={t("portals.campaign.name")}
            imageSrc="/images/campaign.webp"
            ringColor="#e09860"
            arcColor="#f0d4b8"
            dustColor="#E09860"
            animDelay="0.38s"
            arcReverse
          />
        </section>

        <div className="orn" aria-hidden="true" style={{ margin: "52px 0 40px" }}>
          <div className="orn-line" />
          <div className="orn-d" />
          <div className="orn-d lg" />
          <div className="orn-d" />
          <div className="orn-line" />
        </div>

        <div className={styles.tagline}>
          {(["world", "paths", "harvoria"] as const).map((key) => (
            <div key={key} className={styles.tlItem}>
              <span className={styles.tlG}>{t(`tagline.${key}.icon`)}</span>
              <span className={styles.tlL}>{t(`tagline.${key}.label`)}</span>
              <span className={styles.tlT}>{t(`tagline.${key}.text`)}</span>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}
