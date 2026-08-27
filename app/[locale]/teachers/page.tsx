import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Footer from "@/components/shared/Footer";
import JsonLd from "@/components/shared/JsonLd";
import ScrollReveal from "@/components/shared/ScrollReveal";
import TeacherHero from "@/components/teacher/TeacherHero";
import TeacherNewsletter, { TeacherNewsletterCopy } from "@/components/teacher/TeacherNewsletter";
import styles from "./TeachersPage.module.css";
import { assetUrl } from "@/lib/cdn";
import { createFaqJsonLd, createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "teacher.meta" });
  return createPageMetadata({
    locale,
    path: "/teachers",
    title: t("title"),
    description: t("description"),
  });
}

type Card = { title: string; body: string };
type EventCard = Card & { label: string };

export default function TeachersPage() {
  const t = useTranslations("teacher");
  const storyCards = t.raw("intro.cards") as Card[];
  const guildLevels = t.raw("guild.levels") as Card[];
  const benefits = t.raw("benefits.cards") as Card[];
  const events = t.raw("events.cards") as EventCard[];
  const teacherTools = t.raw("role.tools") as string[];
  const cooperation = t.raw("cooperation.items") as string[];
  const artifactUses = t.raw("artifacts.items") as string[];
  const futureTools = t.raw("future.items") as string[];
  const safety = t.raw("safety.items") as string[];
  const faq = t.raw("faq.items") as Array<{ q: string; a: string }>;
  const newsletterBenefits = t.raw("newsletter.benefits") as string[];
  const form = t.raw("newsletter.form") as TeacherNewsletterCopy;
  const nav = t.raw("nav") as string[];
  const navLinks = ["#vision", "#guild", "#teacher-role", "#events", "#newsletter"].map((href, i) => ({ href, label: nav[i] }));

  return (
    <div className={styles.page} style={{ backgroundImage: `url('${assetUrl("/images/bg_3.webp")}')` }}>
      <JsonLd data={createFaqJsonLd(faq)} />
      <ScrollReveal revClass={styles.rev} visClass={styles.vis} />

      <main>
        <TeacherHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          lead={t("hero.lead")}
          primaryCta={t("hero.ctaPrimary")}
          secondaryCta={t("hero.ctaSecondary")}
          navLinks={navLinks}
        />

        <section id="vision" className={`${styles.section} ${styles.light}`}><div className={styles.wrap}>
          <div className={styles.heading}><div><span className={styles.eye}>{t("intro.eyebrow")}</span><h2>{t("intro.title")}</h2></div><div><p>{t("intro.p1")}</p><p>{t("intro.p2")}</p></div></div>
          <div className={styles.cardGrid}>{storyCards.map((card, i) => <article className={`${styles.card} ${styles.rev}`} key={card.title}><span className={styles.cardNo}>0{i + 1}</span><h3>{card.title}</h3><p>{card.body}</p></article>)}</div>
        </div></section>

        <section
          id="home-school"
          className={`${styles.section} ${styles.homeSchool}`}
          style={{
            backgroundImage: `linear-gradient(rgba(245, 247, 251, 0.22), rgba(245, 247, 251, 0.22)), url('${assetUrl("/images/one_adventure_two_envs.webp")}')`,
          }}
        ><div className={styles.wrap}><div className={styles.split}>
          <div className={styles.rev}><span className={styles.eye}>{t("homeSchool.eyebrow")}</span><h2>{t("homeSchool.title")}</h2><p>{t("homeSchool.p1")}</p><p>{t("homeSchool.p2")}</p><blockquote>{t("homeSchool.quote")}</blockquote></div>
        </div></div></section>

        <section id="guild" className={`${styles.section} ${styles.guild}`}><div className={styles.wrap}>
          <div className={styles.centerHeading}><span className={styles.eye}>{t("guild.eyebrow")}</span><h2>{t("guild.title")}</h2><p>{t("guild.lead")}</p></div>
          <div className={styles.levels}>{guildLevels.map((level, i) => <article className={styles.rev} key={level.title}><div className={styles.levelIcon}>{i + 1}</div><h3>{level.title}</h3><p>{level.body}</p></article>)}</div>
        </div></section>

        <section id="teacher-role" className={`${styles.section} ${styles.light}`}><div className={styles.wrap}><div className={styles.split}>
          <div><span className={styles.eye}>{t("role.eyebrow")}</span><h2>{t("role.title")}</h2><p>{t("role.p1")}</p><p>{t("role.p2")}</p></div>
          <div className={styles.listCard}><h3>{t("role.listTitle")}</h3><ul>{teacherTools.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div></div></section>

        <section
          id="for-kids"
          className={`${styles.section} ${styles.kidsBackdrop}`}
          style={{
            backgroundImage: `linear-gradient(rgba(245, 247, 251, 0.22), rgba(245, 247, 251, 0.22)), url('${assetUrl("/images/for_kids.webp")}')`,
          }}
        ><div className={styles.wrap}><div className={styles.centerHeading}><span className={styles.eye}>{t("benefits.eyebrow")}</span><h2>{t("benefits.title")}</h2><p>{t("benefits.lead")}</p></div><div className={styles.benefitGrid}>{benefits.map((card) => <article className={`${styles.card} ${styles.rev}`} key={card.title}><h3>{card.title}</h3><p>{card.body}</p></article>)}</div></div></section>

        <section className={`${styles.section} ${styles.light}`}><div className={styles.wrap}><div className={styles.split}>
          <div><span className={styles.eye}>{t("competition.eyebrow")}</span><h2>{t("competition.title")}</h2><p>{t("competition.body")}</p><blockquote>{t("competition.quote")}</blockquote></div>
          <div className={styles.listCard}><h3>{t("competition.listTitle")}</h3><ul>{(t.raw("competition.items") as string[]).map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div></div></section>

        <section
          id="events"
          className={`${styles.section} ${styles.eventsBackdrop}`}
          style={{
            backgroundImage: `linear-gradient(rgba(245, 247, 251, 0.22), rgba(245, 247, 251, 0.22)), url('${assetUrl("/images/schools.webp")}')`,
          }}
        ><div className={styles.wrap}><div className={styles.heading}><div><span className={styles.eye}>{t("events.eyebrow")}</span><h2>{t("events.title")}</h2></div><p>{t("events.lead")}</p></div><div className={styles.eventGrid}>{events.map((event) => <article className={`${styles.eventCard} ${styles.rev}`} key={event.title}><span>{event.label}</span><h3>{event.title}</h3><p>{event.body}</p></article>)}</div><p className={styles.notice}>{t("events.note")}</p></div></section>

        <section className={`${styles.section} ${styles.artifact}`}><div className={styles.wrap}><div className={styles.split}><div><span className={styles.eye}>{t("artifacts.eyebrow")}</span><h2>{t("artifacts.title")}</h2><p>{t("artifacts.body")}</p><blockquote>{t("artifacts.quote")}</blockquote></div><div className={styles.listCard}><h3>{t("artifacts.listTitle")}</h3><ul>{artifactUses.map((item) => <li key={item}>{item}</li>)}</ul></div></div></div></section>

        <section className={`${styles.section} ${styles.light}`}><div className={styles.wrap}><div className={styles.heading}><div><span className={styles.eye}>{t("future.eyebrow")}</span><h2>{t("future.title")}</h2></div><p>{t("future.lead")}</p></div><div className={styles.chips}>{futureTools.map((item) => <span key={item}>{item}</span>)}</div><p className={styles.notice}>{t("future.note")}</p></div></section>

        <section
          id="cooperation"
          className={`${styles.section} ${styles.cooperationBackdrop}`}
          style={{
            backgroundImage: `linear-gradient(rgba(245, 247, 251, 0.22), rgba(245, 247, 251, 0.22)), url('${assetUrl("/images/coop.webp")}')`,
          }}
        ><div className={styles.wrap}><div className={styles.split}><div><span className={styles.eye}>{t("cooperation.eyebrow")}</span><h2>{t("cooperation.title")}</h2><p>{t("cooperation.body")}</p><blockquote>{t("cooperation.quote")}</blockquote></div><div className={styles.listCard}><ul>{cooperation.map((item) => <li key={item}>{item}</li>)}</ul></div></div></div></section>

        <section
          id="security"
          className={`${styles.section} ${styles.safety} ${styles.safetyBackdrop}`}
          style={{
            backgroundImage: `linear-gradient(rgba(233, 241, 237, 0.16), rgba(233, 241, 237, 0.16)), url('${assetUrl("/images/security_tech.webp")}')`,
          }}
        ><div className={styles.wrap}><div className={styles.split}><div><span className={styles.eye}>{t("safety.eyebrow")}</span><h2>{t("safety.title")}</h2><p>{t("safety.body")}</p><strong className={styles.summary}>{t("safety.summary")}</strong></div><div className={styles.safetyGrid}>{safety.map((item) => <div key={item}><span>✓</span>{item}</div>)}</div></div></div></section>

        <section id="newsletter" className={`${styles.section} ${styles.newsletter}`}><div className={styles.wrap}><div className={styles.newsGrid}><div><span className={styles.eye}>{t("newsletter.eyebrow")}</span><h2>{t("newsletter.title")}</h2><p>{t("newsletter.lead")}</p><ul>{newsletterBenefits.map((item) => <li key={item}>{item}</li>)}</ul><small>{t("newsletter.note")}</small></div><div className={styles.formCard}><TeacherNewsletter copy={form} /></div></div></div></section>

        <section className={`${styles.section} ${styles.light}`}><div className={styles.wrap}><div className={styles.centerHeading}><span className={styles.eye}>{t("faq.eyebrow")}</span><h2>{t("faq.title")}</h2></div><div className={styles.faq}>{faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>

        <section className={styles.cta}><div className={styles.wrap}><span className={styles.eye}>{t("final.eyebrow")}</span><h2>{t("final.title")}</h2><p>{t("final.body")}</p><div className={styles.actions}><a className={styles.primary} href="#newsletter">{t("final.ctaNewsletter")}</a><Link className={styles.secondary} href="/">{t("final.ctaWorld")}</Link></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
