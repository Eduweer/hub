import type { Metadata } from "next";
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Background from "@/components/shared/Background";
import Motes from "@/components/shared/Motes";
import Footer from "@/components/shared/Footer";
import StickyHero from "@/components/parent/StickyHero";
import FaqAccordion from "@/components/parent/FaqAccordion";
import ContactSection from "@/components/parent/ContactSection";
import ScrollReveal from "@/components/shared/ScrollReveal";
import styles from "./ParentsPage.module.css";
import { assetUrl } from "@/lib/cdn";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("parent.meta");
  return { title: t("title"), description: t("description") };
}

const PARENT_MOTES = [
  { left: "8%",  top: "70%", size: "2.5px", color: "#3A8A62", duration: "12s", delay: "0s" },
  { left: "20%", top: "65%", size: "2px",   color: "#72C49A", duration: "15s", delay: "2s" },
  { left: "78%", top: "72%", size: "3px",   color: "#3A8A62", duration: "11s", delay: "4s" },
  { left: "90%", top: "60%", size: "2px",   color: "#72C49A", duration: "13s", delay: "1.5s" },
  { left: "50%", top: "80%", size: "2px",   color: "#C8963C", duration: "14s", delay: "3s" },
  { left: "65%", top: "68%", size: "2.5px", color: "#3A8A62", duration: "10s", delay: "6s" },
];

export default function ParentsPage() {
  const t = useTranslations("parent");

  // Rich-text renderers for <accent> → green em, <gold> → gold span
  const accent = (chunks: React.ReactNode) => <em>{chunks}</em>;
  const gold   = (chunks: React.ReactNode) => <span className={styles.accentGold}>{chunks}</span>;

  // Arrays from translations
  const problemPoints = t.raw("problem.points") as string[];
  const flowItems = t.raw("what.flow") as Array<{ icon: string; title: string; desc: string }>;
  const bookBullets = t.raw("elements.book.bullets") as string[];
  const workbookBullets = t.raw("elements.workbook.bullets") as string[];
  const appBullets = t.raw("elements.app.bullets") as string[];
  const gameBullets = t.raw("elements.game.bullets") as string[];
  const advSteps = t.raw("advHow.steps") as Array<{ num: string; title: string; desc: string }>;
  const childCards = t.raw("benefits.child.cards") as Array<{ icon: string; title: string; desc: string }>;
  const parentCards = t.raw("benefits.parent.cards") as Array<{ num: string; title: string; desc: string }>;
  const safetyPoints = t.raw("safety.points") as string[];
  const safetyBadges = t.raw("safety.badges") as Array<{ icon: string; title: string; desc: string }>;
  const dayMoments = t.raw("day.moments") as Array<{ icon: string; num: string; title: string; desc: string }>;
  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;
  const newsletterTrust = t.raw("join.newsletter.trust") as string[];

  // Icon image maps (ordered to match translation array positions)
  const childIconSrcs = [
    "/images/curiosity_icon.png",   // 0 — Ciekawość
    "/images/doership_icon.png",    // 1 — Sprawczość
    "/images/motivation_icon.png",  // 2 — Motywacja
    "/images/growth_icon.png",      // 3 — Rozwój
  ];
  const safetyIconSrcs = [
    "/images/safe_icon.png",        // 0 — Bez reklam
    "/images/no_ptw_icon.png",      // 1 — Bez pay-to-win
    "/images/pin_lock_icon.png",    // 2 — PIN rodzica
    "/images/book_icon.png",        // 3 — Fizyczne centrum
  ];

  const dayCardStyle = (i: number) => {
    if (i >= 3 && i < 5) return styles.cardG;
    if (i === 5) return styles.cardGold;
    return styles.card;
  };

  return (
    <>
      <Background
        glowStyle={{
          background: `
            radial-gradient(ellipse 100% 55% at 50% 0%, rgba(140,190,120,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 10% 60%, rgba(100,160,120,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 90% 60%, rgba(100,160,120,0.08) 0%, transparent 55%)
          `,
        }}
      />
      <Motes motes={PARENT_MOTES} />

      {/* Hero — fixed, stays behind while content scrolls over */}
      <StickyHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        cta={t("cta.primary")}
        navLinks={[
          { label: t("navLinks.howItWorks"), href: "#jak-dziala" },
          { label: t("navLinks.forParents"),  href: "#benefits"  },
          { label: t("navLinks.safety"),      href: "#safety"    },
          { label: t("navLinks.join"),         href: "#dolacz"    },
        ]}
      />

      {/* Everything below slides over the hero */}
      <div className={styles.pageContent}>

        {/* ── TRANSITION — webp blends video into page, bridge copy overlaid ── */}
        <section id="transition" className={styles.transition}>
          <Image
            src="/images/transition.webp"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          <div className={styles.bridgeText}>
            <h2 className={styles.bridgeQuestion}>{t.rich("bridge.question", { gold })}</h2>
            <p className={styles.bridgeLead}>{t("bridge.lead")}</p>
          </div>
        </section>

        <div className={styles.wrap}>

          {/* ── S2 — PROBLEM ── */}
          <section id="problem" className={`${styles.section} ${styles.sAlt} ${styles.probWithBg}`} style={{ '--bg-url': `url('${assetUrl("/images/bg_1.webp")}')` } as React.CSSProperties}>
            <div className={styles.probLayout}>
              <div className={styles.probText}>
                <span className={styles.eye} style={{ color: "var(--green)" }}>
                  {t("problem.eyebrow")}
                </span>
                <h2 className={styles.sectionTitle}>{t.rich("problem.title", { accent })}</h2>
                <p>{t("problem.p1")}</p>
                <p>{t("problem.p2")}</p>
                <div className={styles.probPoints}>
                  {problemPoints.map((point, i) => (
                    <div key={i} className={styles.probPoint}>
                      <div className={styles.ppDot} />
                      <span className={styles.ppTxt}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.probVisual}>
                  <Image
                    src="/images/together.webp"
                    alt="Rodzic i dziecko razem przy stole w kuchni"
                    width={760}
                    height={640}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    priority
                  />
              </div>
            </div>
          </section>

          <div className={styles.orn} aria-hidden="true">
            <div className={styles.ornLine} /><div className={styles.ornDiamond} /><div className={styles.ornLine} />
          </div>

          {/* ── S3 — WHAT IS EDUWEER ── */}
          <section id="what" className={styles.section}>
            <div className={styles.whatCentered}>
              <span className={styles.eye} style={{ color: "var(--green)" }}>
                {t("what.eyebrow")}
              </span>
              <h2 className={styles.whatTitle}>{t.rich("what.title", { accent })}</h2>
                {flowItems.map((item, i) => (
                  <p key={i} className={styles.whatLead}>{item.desc}</p>
                ))}
            </div>
          </section>

          <div className={styles.orn} aria-hidden="true">
            <div className={styles.ornLine} /><div className={styles.ornDiamond} /><div className={styles.ornLine} />
          </div>

          {/* ── S4 — THREE ELEMENTS ── */}
          <section id="elements" className={`${styles.section} ${styles.sAlt} ${styles.elemWithBg}`} style={{ '--bg-url': `url('${assetUrl("/images/bg_1.webp")}')` } as React.CSSProperties}>
            <div style={{ textAlign: "center" }}>
              <span className={styles.eye} style={{ color: "var(--green)" }}>
                {t("elements.eyebrow")}
              </span>
              <h2 className={styles.sectionTitle} style={{ maxWidth: 700, margin: "0 auto 14px" }}>
                {t.rich("elements.title", { accent })}
              </h2>
              <p className={styles.sectionLeadCenter}>{t("elements.lead")}</p>
            </div>

            {/* Book */}
            <div className={styles.productBlock}>
              <div>
                <span className={styles.pbEyebrow}>{t("elements.book.eyebrow")}</span>
                <h3 className={styles.pbTitle}>{t("elements.book.title")}</h3>
                <p className={styles.pbBody}>{t("elements.book.body")}</p>
                <div className={styles.pbBullets}>
                  {bookBullets.map((b, i) => (
                    <div key={i} className={styles.pbBullet}>
                      <div className={styles.pbDot} />
                      <span className={styles.pbBulletText}>{b}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.pbCaption}>{t("elements.book.caption")}</p>
              </div>
              <div className={styles.pbVisual}>
                <div className={styles.pbMockup}>
                  <Image
                    src="/images/book_cover.png"
                    alt="Okładka książki Eduweer — Harvoria"
                    width={360}
                    height={460}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>

            {/* Workbook — reversed */}
            <div className={`${styles.productBlock} ${styles.productBlockReverse}`}>
              <div>
                <span className={styles.pbEyebrow}>{t("elements.workbook.eyebrow")}</span>
                <h3 className={styles.pbTitle}>{t("elements.workbook.title")}</h3>
                <p className={styles.pbBody}>{t("elements.workbook.body")}</p>
                <div className={styles.pbBullets}>
                  {workbookBullets.map((b, i) => (
                    <div key={i} className={styles.pbBullet}>
                      <div className={styles.pbDot} />
                      <span className={styles.pbBulletText}>{b}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.pbCaption}>{t("elements.workbook.caption")}</p>
              </div>
              <div className={styles.pbVisual}>
                <div className={styles.pbMockup}>
                  <Image
                    src="/images/workbook_cover.png"
                    alt="Okładka Dziennika Bohatera — zeszyt ćwiczeń Eduweer"
                    width={360}
                    height={460}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>

            {/* Mentor App */}
            <div className={styles.productBlock}>
              <div>
                <span className={styles.pbEyebrow}>{t("elements.app.eyebrow")}</span>
                <h3 className={styles.pbTitle}>{t("elements.app.title")}</h3>
                <p className={styles.pbBody}>{t("elements.app.body")}</p>
                <div className={styles.pbBullets}>
                  {appBullets.map((b, i) => (
                    <div key={i} className={styles.pbBullet}>
                      <div className={styles.pbDot} />
                      <span className={styles.pbBulletText}>{b}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.pbCaption}>{t("elements.app.caption")}</p>
              </div>
              <div className={styles.pbVisual}>
                <div className={styles.appScreens}>
                  {[
                    { src: "/images/mobile_app_path.webp",    alt: "Mapa ścieżki w aplikacji Mentor" },
                    { src: "/images/mobile_app_tasks.webp",   alt: "Lista zadań w aplikacji Mentor" },
                    { src: "/images/mobile_app_stars.webp",   alt: "Ocenianie zadań gwiazdkami", main: true },
                    { src: "/images/mobile_app_rewards.webp", alt: "Nagrody i EXP w aplikacji Mentor" },
                    { src: "/images/mobile_app_guild.webp",   alt: "Gildia i postaci w aplikacji Mentor" },
                  ].map((screen, i) => (
                    <div key={i} className={`${styles.appScreen} ${screen.main ? styles.appScreenMain : ""}`}>
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        width={390}
                        height={844}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Eduweer Adventure — Game (4th element, reversed) */}
            <div className={`${styles.productBlock} ${styles.productBlockReverse}`}>
              <div>
                <span className={styles.pbEyebrow}>{t("elements.game.eyebrow")}</span>
                <h3 className={styles.pbTitle}>{t.rich("elements.game.title", { accent })}</h3>
                <p className={styles.pbBody}>{t("elements.game.body")}</p>
                <div className={styles.pbBullets}>
                  {gameBullets.map((b, i) => (
                    <div key={i} className={styles.pbBullet}>
                      <div className={styles.pbDot} />
                      <span className={styles.pbBulletText}>{b}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.pbCaption}>{t("elements.game.caption")}</p>
              </div>
              <div className={styles.pbVisual}>
                <div className={styles.gameTablet}>
                  <Image
                    src="/images/game_concept_godot_2.webp"
                    alt="Eduweer Adventure — koncepcja gry mobilnej w Godot, widok horyzontalny"
                    width={1280}
                    height={800}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>

          </section>

          <div className={styles.orn} aria-hidden="true">
            <div className={styles.ornLine} /><div className={styles.ornDiamond} /><div className={styles.ornLine} />
          </div>

          {/* ── S5 — HOW IT WORKS ── */}
          <section id="jak-dziala" className={styles.section}>
            <ScrollReveal revClass={styles.rev} visClass={styles.vis} />
            <span className={styles.eye} style={{ color: "var(--green)" }}>
              {t("advHow.eyebrow")}
            </span>
            <h2 className={styles.sectionTitle}>{t.rich("advHow.title", { accent })}</h2>

            <div className={styles.howSteps}>
              {advSteps.map((step, i) => {
                const isAlt = i % 2 === 1;
                return (
                  <React.Fragment key={i}>
                    <div className={`${styles.howStep} ${isAlt ? styles.howStepAlt : ""}`}>
                      {/* Text column */}
                      <div className={`${styles.howStepText} ${styles.rev} ${isAlt ? styles.slideR : styles.slideL}`}>
                        <div className={styles.howWatermark} aria-hidden="true">{step.num}</div>
                        <span className={styles.howEye}>Krok {step.num}</span>
                        <h3 className={styles.howTitle}>{step.title}</h3>
                        <p className={styles.howDesc}>{step.desc}</p>
                      </div>
                      {/* Image column */}
                      <div className={`${styles.howStepImg} ${styles.rev} ${isAlt ? styles.slideL : styles.slideR}`}>
                          <Image
                            src={`/images/step__${i + 1}.webp`}
                            alt={step.title}
                            width={800}
                            height={600}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                      </div>
                    </div>
                    {/* Gold ornament between steps (not after last) */}
                    {i < advSteps.length - 1 && (
                      <div className={styles.orn} aria-hidden="true">
                        <div className={styles.ornLine} />
                        <div className={styles.ornDiamond} />
                        <div className={styles.ornLine} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </section>

          <div className={styles.orn} aria-hidden="true">
            <div className={styles.ornLine} /><div className={styles.ornDiamond} /><div className={styles.ornLine} />
          </div>

          {/* ── S9+S10 — BENEFITS ── */}
          <section id="benefits" className={`${styles.section} ${styles.sAlt} ${styles.benefitsWithBg}`} style={{ '--bg-url': `url('${assetUrl("/images/bg_1.webp")}')` } as React.CSSProperties}>
            <div className={styles.benefitsGrid}>
              {/* Child benefits */}
              <div>
                <span className={styles.eye} style={{ color: "var(--green)" }}>
                  {t("benefits.child.eyebrow")}
                </span>
                <h2 className={styles.sectionTitle} style={{ fontSize: "clamp(22px,2.5vw,32px)" }}>
                  {t.rich("benefits.child.title", { accent })}
                </h2>
                <p className={styles.benefitsSectionLead}>{t("benefits.child.lead")}</p>
                <div className={styles.benefitCards}>
                  {childCards.map((card, i) => (
                    <div key={i} className={`${styles.benefitCard} ${styles.cardG}`}>
                      <span className={styles.bcIcon}>
                        <Image
                          src={childIconSrcs[i]}
                          alt={card.title}
                          width={52}
                          height={52}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </span>
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Parent benefits */}
              <div>
                <span className={styles.eye} style={{ color: "var(--green)" }}>
                  {t("benefits.parent.eyebrow")}
                </span>
                <h2 className={styles.sectionTitle} style={{ fontSize: "clamp(22px,2.5vw,32px)" }}>
                  {t.rich("benefits.parent.title", { accent })}
                </h2>
                <p className={styles.benefitsSectionLead}>{t("benefits.parent.lead")}</p>
                <div className={styles.parentCards}>
                  {parentCards.map((card, i) => (
                    <div key={i} className={`${styles.pb2Card} ${styles.card}`}>
                      <div className={styles.pb2Num}>{card.num}</div>
                      <div>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className={styles.orn} aria-hidden="true">
            <div className={styles.ornLine} /><div className={styles.ornDiamond} /><div className={styles.ornLine} />
          </div>

          {/* ── S11 — SAFETY ── */}
          <section id="safety" className={styles.section}>
            <div className={styles.safetyLayout}>
              <div>
                <span className={styles.eye} style={{ color: "var(--green)" }}>
                  {t("safety.eyebrow")}
                </span>
                <h2 className={styles.sectionTitle}>{t.rich("safety.title", { accent })}</h2>
                <p style={{
                  fontFamily: "var(--f-body)", fontSize: 16, lineHeight: 1.85,
                  color: "var(--ink-soft)", fontWeight: 300, marginBottom: 28
                }}>
                  {t("safety.lead")}
                </p>
                <div className={styles.safetyPoints}>
                  {safetyPoints.map((point, i) => (
                    <div key={i} className={styles.sp}>
                      <div className={styles.spDot} />
                      <span className={styles.spText}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.safetyVis}>
                <div className={styles.badgesCard}>
                  <div className={styles.badgesCardTitle}>{t("safety.principles")}</div>
                  <div className={styles.badgesCardAccent} />
                  <div className={styles.badgeGroup}>
                    {safetyBadges.map((badge, i) => (
                      <div key={i} className={styles.badgeItem}>
                        <span className={styles.badgeIcon}>
                          <Image
                            src={safetyIconSrcs[i]}
                            alt={badge.title}
                            width={56}
                            height={56}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </span>
                        <div>
                          <div className={styles.badgeTitle}>{badge.title}</div>
                          <div className={styles.badgeDesc}>{badge.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className={styles.orn} aria-hidden="true">
            <div className={styles.ornLine} /><div className={styles.ornDiamond} /><div className={styles.ornLine} />
          </div>

          {/* ── S12 — EXAMPLE EVENING ── */}
          {/* <section id="wieczor" className={`${styles.section} ${styles.sAlt}`}>
            <div style={{ textAlign: "center" }}>
              <span className={styles.eye} style={{ color: "var(--green)" }}>
                {t("day.eyebrow")}
              </span>
              <h2 className={styles.sectionTitle} style={{ maxWidth: 600, margin: "0 auto 14px" }}>
                {t.rich("day.title", { gold })}
              </h2>
              <p className={styles.sectionLeadCenter}>{t("day.lead")}</p>
            </div>
            <div className={styles.dayFlow}>
              {dayMoments.map((moment, i) => (
                <div key={i} className={`${styles.dayCard} ${dayCardStyle(i)}`}>
                  <span className={styles.dayIcon}>{moment.icon}</span>
                  <span className={styles.dayNum}>{moment.num}</span>
                  <h3>{moment.title}</h3>
                  <p>{moment.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.orn} aria-hidden="true">
            <div className={styles.ornLine} /><div className={styles.ornDiamond} /><div className={styles.ornLine} />
          </div> */}

          {/* ── S13 — FAQ ── */}
          <section id="faq" className={`${styles.section} ${styles.sAlt} ${styles.faqWithBg}`} style={{ '--bg-url': `url('${assetUrl("/images/bg_1.webp")}')` } as React.CSSProperties}>
            <span className={styles.eye} style={{ color: "var(--green)" }}>
              {t("faq.eyebrow")}
            </span>
            <h2 className={styles.sectionTitle}>{t.rich("faq.title", { accent })}</h2>
            <FaqAccordion items={faqItems} />
          </section>

          <div className={styles.orn} aria-hidden="true">
            <div className={styles.ornLine} /><div className={styles.ornDiamond} /><div className={styles.ornLine} />
          </div>

          {/* ── JOIN — NEWSLETTER + CONTACT ── */}
          <section id="dolacz" className={styles.section}>
            <ContactSection
              newsletter={{
                eyebrow: t("join.newsletter.eyebrow"),
                title: t("join.newsletter.title"),
                lead: t("join.newsletter.lead"),
                emailPlaceholder: t("join.newsletter.emailPlaceholder"),
                cta: t("join.newsletter.cta"),
                success: t("join.newsletter.success"),
                trust: newsletterTrust,
              }}
              contact={{
                eyebrow: t("join.contact.eyebrow"),
                title: t("join.contact.title"),
                lead: t("join.contact.lead"),
                namePlaceholder: t("join.contact.namePlaceholder"),
                emailPlaceholder: t("join.contact.emailPlaceholder"),
                messagePlaceholder: t("join.contact.messagePlaceholder"),
                submit: t("join.contact.submit"),
                success: t("join.contact.success"),
                error: t("join.contact.error"),
              }}
            />
          </section>

          <div style={{ paddingBottom: "80px" }}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
