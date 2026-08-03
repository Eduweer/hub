import Header from "@/components/shared/Header";
import TeacherHeroVideo from "./TeacherHeroVideo";
import styles from "./TeacherHero.module.css";

interface NavLink {
  label: string;
  href: string;
}

interface TeacherHeroProps {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  navLinks: NavLink[];
}

export default function TeacherHero({
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  navLinks,
}: TeacherHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="teachers-hero-title">
      <TeacherHeroVideo />

      <div className={styles.header}>
        <Header navLinks={navLinks} theme="light" />
      </div>

      <div className={styles.wrap}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 id="teachers-hero-title">{title}</h1>
          <p>{lead}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#vision">{primaryCta}</a>
            <a className={styles.secondary} href="#newsletter">{secondaryCta}</a>
          </div>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
