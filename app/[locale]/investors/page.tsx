import type { Metadata } from "next";
import type React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Background from "@/components/shared/Background";
import Motes from "@/components/shared/Motes";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
import styles from "./InvestorsPage.module.css";
import { assetUrl } from "@/lib/cdn";

const LOOP_ICONS = [
  "/images/i_book_icon_2.webp",
  "/images/i_workbook_icon_2.webp",
  "/images/i_mentor_icon_1.webp",
  "/images/i_order_icon_1.webp",
  "/images/i_scale_icon_1.webp",
  "/images/i_loop_icon_1.webp",
] as const;

const LOOP_COLORS = ["#C8963C", "#2A5C8A", "#2A5C8A", "#C8963C", "#6A4CA8", "#6A4CA8"] as const;
const LOOP_NODE_CLASSES = ["ln0", "ln1", "ln2", "ln3", "ln4", "ln5"] as const;

const BIZ_ICONS = [
  "/images/i_books_icon_1.webp",
  "/images/i_app_icon_1.webp",
  "/images/i_game_icon_1.webp",
  "/images/i_schools_icon_1.webp",
  "/images/i_merch_icon_1.webp",
] as const;

const ECO_HEADERS = [
  "/images/i_book_header.webp",
  "/images/i_mentor_app_header.webp",
  "/images/i_mobile_game.webp",
  "/images/i_portal_header.webp",
] as const;

const ORBIT_NODES = [
  { icon: "/images/i_book_icon_1.webp",     name: "BOOK",            desc: "Historia świata\ni bohaterów" },
  { icon: "/images/i_workbook_icon_1.webp", name: "WORKBOOK",        desc: "Zadania\ni ćwiczenia" },
  { icon: "/images/i_phone_icon_1.webp",    name: "MENTOR APP",      desc: "Ocena, progres\ni raporty" },
  { icon: "/images/i_pad_icon_1.webp",      name: "ADVENTURE GAME",  desc: "Przygoda, questy\ni nagrody" },
  { icon: "/images/i_web_icon_1.webp",      name: "WEB PORTAL",      desc: "Społeczność,\nszkoły, partnerzy" },
  { icon: "/images/i_parent_icon_1.webp",   name: "PARENT / MENTOR", desc: "Rodzic prowadzi,\nwspiera, inspiruje" },
] as const;

const NODE_CLASSES = ["on0", "on1", "on2", "on3", "on4", "on5"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("investor.meta");
  return { title: t("title"), description: t("description") };
}

const INVESTOR_MOTES = [
  { left: "10%", top: "72%", size: "2.5px", color: "#2A5C8A", duration: "12s", delay: "0s" },
  { left: "25%", top: "66%", size: "2px",   color: "#6AAAD4", duration: "15s", delay: "2.5s" },
  { left: "75%", top: "74%", size: "3px",   color: "#2A5C8A", duration: "11s", delay: "4s" },
  { left: "88%", top: "62%", size: "2px",   color: "#6AAAD4", duration: "13s", delay: "1.5s" },
  { left: "52%", top: "82%", size: "2px",   color: "#C8963C", duration: "14s", delay: "3.2s" },
  { left: "63%", top: "70%", size: "2.5px", color: "#2A5C8A", duration: "9s",  delay: "5.5s" },
];

export default function InvestorsPage() {
  const t = useTranslations("investor");

  const gold = (chunks: React.ReactNode) => <em>{chunks}</em>;

  // Arrays from t.raw()
  const probCards    = t.raw("problem.cards")    as Array<{ title: string; body: string }>;
  const loopSteps    = t.raw("loop.steps")       as Array<{ num: string; title: string; desc: string }>;
  const loopWhyPts   = t.raw("loop.why.points")  as string[];
  const ecoCards     = t.raw("ecosystem.cards")  as Array<{ label: string; title: string; body: string; pill: string }>;
  const flowSteps    = t.raw("flow.steps")       as Array<{ num: string; title: string; desc: string }>;
  const tractionDone = t.raw("traction.done.items") as string[];
  const tractionWip  = t.raw("traction.wip.items")  as string[];
  const tractionNext = t.raw("traction.next.items")  as string[];
  const scaleLands   = t.raw("scale.lands")      as Array<{ name: string; tag: string; body: string; variant: string }>;
  const scaleDims    = t.raw("scale.dims")       as Array<{ n: string; title: string; body: string }>;
  const techLayers   = t.raw("tech.layers")      as Array<{ label: string; tags: string[] }>;
  const bizStreams    = t.raw("biz.streams")      as Array<{ num: string; title: string; body: string }>;
  const trustRules   = t.raw("biz.trust.rules")  as string[];
  const navLabels = t.raw("navLabels") as string[];
  const NAV_HREFS = ["#loop", "#ecosystem", "#biz", "#roadmap", "#cta"] as const;
  const navLinks  = navLabels.map((label, i) => ({ label, href: NAV_HREFS[i] ?? "#" }));

  const rdStages  = t.raw("roadmap.stages") as Array<{
    marker: string; tag: string; date: string; items: string[];
  }>;
  const rdStatus  = t.raw("roadmap.status.items") as string[];

  const landClass = (v: string) => {
    if (v === "active") return `${styles.land} ${styles.landActive}`;
    if (v === "future") return `${styles.land} ${styles.landFuture}`;
    if (v === "final")  return `${styles.land} ${styles.landFinal}`;
    return `${styles.land} ${styles.landLocked}`;
  };

  const tlClass = (i: number) => {
    const map = [styles.tlExp, styles.tlApp, styles.tlData, styles.tlAi, styles.tlInf];
    return `${styles.tl} ${map[i] ?? ""}`;
  };

  return (
    <>
      <Background
        glowStyle={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(42,92,138,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 15% 65%, rgba(100,160,200,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 65%, rgba(100,160,200,0.08) 0%, transparent 55%)
          `,
        }}
      />
      <Motes motes={INVESTOR_MOTES} />
      <ScrollReveal revClass={styles.rev} visClass={styles.vis} />

      <div className={styles.pageWrap} style={{ backgroundImage: `url('${assetUrl("/images/bg_3.webp")}')` }}>
        <Header navLinks={navLinks} />

        {/* ── S1 HERO ── */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div>
                <div className={styles.heroEye}>{t("hero.eyebrow")}</div>
                <h1 className={styles.heroTitle}>
                  {t.rich("hero.title", { gold })}
                </h1>
                <p className={styles.heroSub}>{t("hero.subtitle")}</p>
                <p className={styles.heroSupport}>{t("hero.support")}</p>
                <div className={styles.heroCtas}>
                  <a href="#loop"   className={styles.btnP}>{t("hero.cta1")}</a>
                </div>
              </div>

              {/* Hero visual — orbit diagram */}
              <div className={styles.heroVis} aria-hidden="true">
                <div className={styles.orbitWrap}>
                  {/* SVG rings + connectors */}
                  <svg className={styles.orbitSvg} viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="og1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%"   stopColor="#C8963C" stopOpacity="0.32"/>
                        <stop offset="100%" stopColor="#2A5C8A" stopOpacity="0.18"/>
                      </linearGradient>
                    </defs>
                    <circle cx="230" cy="230" r="175" stroke="rgba(200,150,60,0.07)" strokeWidth="18"/>
                    <circle cx="230" cy="230" r="175" stroke="url(#og1)" strokeWidth="1.5" strokeDasharray="5,9"/>
                    <circle cx="230" cy="230" r="90"  stroke="rgba(42,92,138,0.10)" strokeWidth="1" strokeDasharray="2,8"/>
                    <line x1="230" y1="230" x2="230" y2="55"  stroke="rgba(42,92,138,0.07)" strokeWidth="1" strokeDasharray="3,6"/>
                    <line x1="230" y1="230" x2="382" y2="143" stroke="rgba(42,92,138,0.07)" strokeWidth="1" strokeDasharray="3,6"/>
                    <line x1="230" y1="230" x2="382" y2="317" stroke="rgba(42,92,138,0.07)" strokeWidth="1" strokeDasharray="3,6"/>
                    <line x1="230" y1="230" x2="230" y2="405" stroke="rgba(42,92,138,0.07)" strokeWidth="1" strokeDasharray="3,6"/>
                    <line x1="230" y1="230" x2="78"  y2="317" stroke="rgba(42,92,138,0.07)" strokeWidth="1" strokeDasharray="3,6"/>
                    <line x1="230" y1="230" x2="78"  y2="143" stroke="rgba(42,92,138,0.07)" strokeWidth="1" strokeDasharray="3,6"/>
                  </svg>

                  {/* Centre hexagon badge */}
                  <div className={styles.orbitCenter}>
                    <div className={styles.centerHex}>
                      <span className={styles.centerStar}>✦</span>
                      <span className={styles.centerText}>EDUWEER</span>
                    </div>
                  </div>

                  {/* Orbit nodes */}
                  {ORBIT_NODES.map((node, i) => (
                    <div key={i} className={`${styles.orbitNode} ${styles[NODE_CLASSES[i]]}`}>
                      <div className={styles.nodeCircle}>
                        <Image
                          src={node.icon}
                          alt={node.name}
                          width={30}
                          height={30}
                          style={{ width: "30px", height: "30px", objectFit: "contain" }}
                        />
                      </div>
                      <div className={styles.nodeLbl}>
                        <span className={styles.nodeName}>{node.name}</span>
                        <span className={styles.nodeDesc}>{node.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges — full width below the grid */}
            <div className={styles.heroBadges}>
              {[
                ["Cross-platform IP",           "bGold"],
                ["Global localization ready",    "bBlue"],
                ["Story-driven learning",        "bGreen"],
                ["Parent-guided model",          "bGreen"],
                ["Physical + digital ecosystem", "bBlue"],
                ["Ethical monetization",         "bGold"],
                ["Expandable world",             "bViolet"],
                ["Designed for ages 6–12",       "bViolet"],
                ["No ads / no pay-to-win",       "bGreen"],
              ].map(([label, color]) => (
                <span key={label} className={`${styles.badge} ${styles[color]}`}>
                  <span className={styles.bDot} />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.divLine} />

        {/* ── S2 PROBLEM ── */}
        <section className={`${styles.section} ${styles.sAlt} ${styles.sBg}`} id="problem">
          <div className={styles.wrap}>
            <span className={`${styles.eye} ${styles.rev}`}>{t("problem.eyebrow")}</span>
            <h2 className={`${styles.sectionTitle} ${styles.rev}`}>
              {t.rich("problem.title", { gold })}
            </h2>
            <p className={`${styles.sectionSub} ${styles.rev}`}>{t("problem.subtitle")}</p>
            <div className={styles.probGrid}>
              {probCards.map((c, i) => (
                <div key={i} className={`${styles.probCard} ${styles.rev} ${i > 0 ? (i === 1 ? styles.d1 : styles.d2) : ""}`}>
                  <div className={styles.probIcon}>
                    {i === 0 && (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M11 2L13.5 8H20L14.5 11.8L17 18L11 14.2L5 18L7.5 11.8L2 8H8.5L11 2Z" stroke="#A85028" strokeWidth="1.5"/>
                      </svg>
                    )}
                    {i === 1 && (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <circle cx="11" cy="11" r="9" stroke="#A85028" strokeWidth="1.5"/>
                        <path d="M7 11h4M11 7v4" stroke="#A85028" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="15" cy="15" r="2" stroke="#A85028" strokeWidth="1.2" strokeDasharray="2,2"/>
                      </svg>
                    )}
                    {i === 2 && (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M11 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 18c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#A85028" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.divLine} />

        {/* ── S3 LOOP ── */}
        <section className={`${styles.section} ${styles.sLoopBg}`} id="loop" style={{ backgroundImage: `url('${assetUrl("/images/bg_5.webp")}')` }}>
          <div className={styles.wrap}>
            <span className={`${styles.eye} ${styles.eyeGold} ${styles.rev}`}>{t("loop.eyebrow")}</span>
            <h2 className={`${styles.sectionTitle} ${styles.rev}`}>
              {t.rich("loop.title", { gold })}
            </h2>
            <p className={`${styles.sectionSub} ${styles.rev}`}>{t("loop.subtitle")}</p>

            <div className={styles.loopGrid}>
              {/* Loop orbit diagram */}
              <div className={`${styles.loopVis} ${styles.rev}`}>
                <div className={styles.loopOrbit}>
                  <svg className={styles.loopOrbitSvg} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%"   stopColor="#C8963C" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#2A5C8A" stopOpacity="0.18"/>
                      </linearGradient>
                    </defs>
                    {/* Outer glow */}
                    <circle cx="200" cy="200" r="160" stroke="rgba(200,150,60,0.06)" strokeWidth="16"/>
                    {/* Orbit ring */}
                    <circle cx="200" cy="200" r="160" stroke="url(#lg1)" strokeWidth="1.5" strokeDasharray="5,9"/>
                    {/* Animated arc */}
                    <circle cx="200" cy="200" r="160" stroke="rgba(42,92,138,0.28)" strokeWidth="2" strokeDasharray="40,260" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="10s" repeatCount="indefinite"/>
                    </circle>
                    {/* Inner ring */}
                    <circle cx="200" cy="200" r="84" stroke="rgba(200,150,60,0.15)" strokeWidth="1" strokeDasharray="2,7"/>
                    {/* Spokes */}
                    <line x1="200" y1="200" x2="200" y2="40"  stroke="rgba(200,150,60,0.14)"  strokeWidth="0.8"/>
                    <line x1="200" y1="200" x2="339" y2="120" stroke="rgba(42,92,138,0.14)"   strokeWidth="0.8"/>
                    <line x1="200" y1="200" x2="339" y2="280" stroke="rgba(42,92,138,0.14)"   strokeWidth="0.8"/>
                    <line x1="200" y1="200" x2="200" y2="360" stroke="rgba(200,150,60,0.14)"  strokeWidth="0.8"/>
                    <line x1="200" y1="200" x2="61"  y2="280" stroke="rgba(106,76,168,0.14)"  strokeWidth="0.8"/>
                    <line x1="200" y1="200" x2="61"  y2="120" stroke="rgba(106,76,168,0.14)"  strokeWidth="0.8"/>
                  </svg>

                  {/* Centre hex */}
                  <div className={styles.loopCenter}>
                    <div className={styles.centerHex}>
                      <span className={styles.centerStar}>✦</span>
                      <span className={styles.centerText}>LOOP</span>
                    </div>
                  </div>

                  {/* 6 icon nodes */}
                  {loopSteps.map((step, i) => (
                    <div key={i} className={`${styles.loopNode} ${styles[LOOP_NODE_CLASSES[i]]}`}>
                      <div className={styles.loopCircle} style={{ borderColor: LOOP_COLORS[i] }}>
                        <Image
                          src={LOOP_ICONS[i]}
                          alt={step.title}
                          width={26}
                          height={26}
                          style={{ width: "26px", height: "26px", objectFit: "contain" }}
                        />
                      </div>
                      <div className={styles.loopLbl}>
                        <span className={styles.loopNum} style={{ color: LOOP_COLORS[i] }}>{step.num}</span>
                        <span className={styles.loopName}>{step.title}</span>
                        <span className={styles.loopDesc}>{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why card */}
              <div className={`${styles.whyCard} ${styles.rev} ${styles.d1}`}>
                <h3 className={styles.whyTitle}>{t("loop.why.title")}</h3>
                <div className={styles.whyAccent} />
                <ul className={styles.whyList}>
                  {loopWhyPts.map((pt, i) => (
                    <li key={i} className={styles.whyItem}>
                      <span className={styles.whyCheck}>✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.whyQuote}>{t("loop.quote")}</div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.divLine} />

        {/* ── S4 ECOSYSTEM ── */}
        <section className={`${styles.section} ${styles.sEcoBg}`} id="ecosystem">
          <div className={styles.wrap}>
            <span className={`${styles.eye} ${styles.rev}`}>{t("ecosystem.eyebrow")}</span>
            <div className={`${styles.ecoTop} ${styles.rev}`}>
              <h2 className={styles.ecoTopTitle}>
                {t.rich("ecosystem.title", { gold })}
              </h2>
              <p className={styles.ecoTopSub}>{t("ecosystem.subtitle")}</p>
            </div>
            <div className={styles.ecoCards}>
              {ecoCards.map((c, i) => (
                <div key={i} className={`${styles.ecoCard} ${styles.rev} ${i > 0 ? (styles[`d${i}` as keyof typeof styles] ?? "") : ""}`}>
                  <div className={styles.ecoCardImg}>
                    <Image
                      src={ECO_HEADERS[i]}
                      alt={c.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.ecoCardBody}>
                    <span className={styles.ecoCardLabel}>{c.label}</span>
                    <h3 className={styles.ecoCardTitle}>{c.title}</h3>
                    <p className={styles.ecoCardDesc}>{c.body}</p>
                    <div className={styles.ecoCardPills}>
                      {c.pill.split(" · ").map((p, j) => (
                        <span key={j} className={styles.ecoCardPill}>{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.divLine} />

        {/* ── S9 BUSINESS MODEL ── */}
        <section className={`${styles.section} ${styles.sBizBg}`} id="biz" style={{ backgroundImage: `url('${assetUrl("/images/bg_6.webp")}')` }}>
          <div className={styles.wrap}>
            <div className={styles.bizLayout}>
              {/* Left: eyebrow + title + subtitle */}
              <div className={styles.bizLeft}>
                <span className={`${styles.eye} ${styles.eyeGold} ${styles.rev}`}>{t("biz.eyebrow")}</span>
                <h2 className={`${styles.bizTitle} ${styles.rev}`}>
                  {t.rich("biz.title", { gold })}
                </h2>
                <p className={`${styles.bizSub} ${styles.rev} ${styles.d1}`}>{t("biz.subtitle")}</p>
              </div>

              {/* Right: 5 stream cards */}
              <div className={`${styles.bizStreams} ${styles.rev} ${styles.d1}`}>
                {bizStreams.map((s, i) => (
                  <div key={i} className={styles.bizCard}>
                    <div className={styles.bizIcon}>
                      <Image
                        src={BIZ_ICONS[i]}
                        alt={s.title}
                        width={48}
                        height={48}
                        style={{ width: "48px", height: "48px", objectFit: "contain" }}
                      />
                    </div>
                    <div className={styles.bizNum}>{s.num}</div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust box */}
            <div className={`${styles.trustBox} ${styles.rev}`}>
              <h3>{t("biz.trust.title")}</h3>
              <div className={styles.trustRules}>
                {trustRules.map((rule, i) => (
                  <div key={i} className={styles.trustRule}>
                    <div className={styles.trDot} />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className={styles.divLine} />

                {/* ── S10 ROADMAP ── */}
                <section className={`${styles.section} ${styles.sEcoBg}`} id="roadmap">
          <div className={styles.wrap}>
            <div className={styles.rdLayout}>

              {/* ── Left: title + horizontal timeline ── */}
              <div className={styles.rdLeft}>
                <span className={`${styles.eye} ${styles.rev}`}>{t("roadmap.eyebrow")}</span>
                <h2 className={`${styles.rdTitle} ${styles.rev}`}>
                  {t.rich("roadmap.title", { gold })}
                </h2>

                <div className={`${styles.rdTimeline} ${styles.rev} ${styles.d1}`}>
                  <div className={styles.rdTrack} />
                  <div className={styles.rdSteps}>
                    {rdStages.map((stage, i) => (
                      <div key={i} className={`${styles.rdStep} ${i === 0 ? styles.rdStepActive : ""}`}>
                        <div className={styles.rdStepNum}>{stage.marker}</div>
                        <div className={styles.rdStepTag}>{stage.tag}</div>
                        <div className={styles.rdStepDate}>{stage.date}</div>
                        <ul className={styles.rdStepItems}>
                          {stage.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Right: current status + book ── */}
              <div className={`${styles.rdRight} ${styles.rev} ${styles.d2}`}>
                <span className={`${styles.eye} ${styles.rev}`}>{t("roadmap.status.eyebrow")}</span>
                <h2 className={`${styles.rdStatusTitle} ${styles.rev} ${styles.d1}`}>
                  {t("roadmap.status.title")}
                </h2>
                <ul className={styles.rdStatusList}>
                  {rdStatus.map((item, i) => (
                    <li key={i} className={`${styles.rdStatusItem} ${styles.rev} ${styles[`d${i}` as keyof typeof styles] ?? ""}`}>
                      <span className={styles.rdStatusCheck}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        <div className={styles.divLine} />

        {/* ── S7 SCALE ── */}
        <section className={styles.section} id="scale">
          <div className={styles.wrap}>
            <span className={`${styles.eye} ${styles.eyeGold} ${styles.rev}`}>{t("scale.eyebrow")}</span>
            <h2 className={`${styles.sectionTitle} ${styles.rev}`}>
              {t.rich("scale.title", { gold })}
            </h2>
            <p className={`${styles.sectionSub} ${styles.rev}`}>{t("scale.subtitle")}</p>
            <div className={styles.scaleGrid}>
              <div>
                <div className={`${styles.landsGrid} ${styles.rev}`}>
                  {scaleLands.map((l, i) => (
                    <div key={i} className={landClass(l.variant)}>
                      <div className={styles.landName}>{l.name}</div>
                      <span className={styles.landTag}>{l.tag}</span>
                      <p>{l.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.scaleRight}>
                <h3 className={styles.rev}>{t("scale.dimsTitle")}</h3>
                <p className={styles.rev}>{t("scale.dimsSubtitle")}</p>
                <div className={`${styles.dimsGrid} ${styles.rev}`}>
                  {scaleDims.map((d, i) => (
                    <div key={i} className={styles.dim}>
                      <div className={styles.dimN}>{d.n}</div>
                      <h4>{d.title}</h4>
                      <p>{d.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.divLine} />

        {/* ── S11 CTA ── */}
        <section className={`${styles.cta} ${styles.sEcoBg}`} id="cta">
          <div className={styles.wrap}>
            <div className={`${styles.ctaGlyph} ${styles.rev}`} aria-hidden="true">
              <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="gfCta" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="4" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <circle cx="55" cy="55" r="48" stroke="rgba(42,92,138,0.2)" strokeWidth="1.5" strokeDasharray="4,8"/>
                <circle cx="55" cy="55" r="48" stroke="rgba(42,92,138,0.45)" strokeWidth="1.8" strokeDasharray="28,108" strokeLinecap="round" filter="url(#gfCta)">
                  <animateTransform attributeName="transform" type="rotate" from="0 55 55" to="360 55 55" dur="10s" repeatCount="indefinite"/>
                </circle>
                <circle cx="55" cy="55" r="32" stroke="rgba(200,150,60,0.2)" strokeWidth="1" strokeDasharray="2,6"/>
                <g transform="translate(33,33)" filter="url(#gfCta)">
                  <polygon points="22,0 44,14 44,36 22,50 0,36 0,14" fill="#E8E0C4" stroke="#2A5C8A" strokeWidth="1.2"/>
                  <polygon points="22,5 38,15 38,35 22,45 6,35 6,15" fill="#DDD4B0" opacity="0.7"/>
                  <circle cx="22" cy="25" r="6" fill="#2A5C8A" opacity="0.7"/>
                  <circle cx="22" cy="25" r="2.5" fill="#c4dcf0"/>
                </g>
                <circle cx="55" cy="7"   r="3.5" fill="#2A5C8A" opacity="0.75" filter="url(#gfCta)"/>
                <circle cx="103" cy="55" r="3.5" fill="#2A5C8A" opacity="0.75" filter="url(#gfCta)"/>
                <circle cx="55" cy="103" r="3.5" fill="#2A5C8A" opacity="0.75" filter="url(#gfCta)"/>
                <circle cx="7"  cy="55"  r="3.5" fill="#2A5C8A" opacity="0.75" filter="url(#gfCta)"/>
              </svg>
            </div>
            <h2 className={`${styles.ctaTitle} ${styles.rev}`}>
              {t.rich("cta.title", { gold })}
            </h2>
            <p className={`${styles.ctaSub} ${styles.rev}`}>{t("cta.subtitle")}</p>
            <div className={`${styles.ctaBtns} ${styles.rev}`}>
              <a href="mailto:radoslaw.kamysz@gmail.com" className={styles.btnP}>{t("cta.btn1")}</a>
              <a href={assetUrl("/docs/pitch-deck.pdf")} target="_blank" rel="noopener noreferrer" className={styles.btnS}>{t("cta.btn2")}</a>
              <a href="/parents" className={styles.btnLink}>{t("cta.btn3")} →</a>
            </div>
            <div className={`${styles.ctaInfo} ${styles.rev}`}>
              <div className={styles.ciItem}><div className={styles.ciDot} />{t("cta.info1")}</div>
              <div className={styles.ciItem}><div className={styles.ciDot} />{t("cta.info2")}</div>
              <div className={styles.ciItem}><div className={styles.ciDot} />{t("cta.info3")}</div>
            </div>
          </div>
        </section>

        <div style={{ padding: "0 0 80px", width: "100%" }}>
          <Footer />
        </div>
      </div>
    </>
  );
}

