"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Portal.module.css";

interface PortalProps {
  color: "green" | "blue" | "copper";
  href: string;
  tag: string;
  name: string;
  desc: string;
  cta: string;
  ariaLabel: string;
  imageSrc: string;
  ringColor: string;
  arcColor: string;
  dustColor: string;
  animDelay?: string;
  arcReverse?: boolean;
}

const DUST_MOTES = [
  { l: "22%", t: "24%", s: "2.5px", d: "5s",   dl: "0s" },
  { l: "68%", t: "30%", s: "2px",   d: "7s",   dl: "1.7s" },
  { l: "44%", t: "72%", s: "2.5px", d: "6s",   dl: "3s" },
  { l: "14%", t: "60%", s: "2px",   d: "8s",   dl: "0.8s" },
  { l: "80%", t: "54%", s: "3px",   d: "5.5s", dl: "2.4s" },
];

export default function Portal({
  color, href, tag, name, desc, cta, ariaLabel,
  imageSrc, ringColor, arcColor, dustColor,
  animDelay = "0s", arcReverse = false,
}: PortalProps) {
  return (
    <div
      className={`${styles.pw} ${styles[`c${color.charAt(0).toUpperCase()}${color.slice(1)}`]}`}
      style={{ animationDelay: animDelay }}
    >
      <Link href={href} className={styles.portal} aria-label={ariaLabel}>

        {/* Halo glow behind */}
        <div className={styles.halo} />

        {/* Illustration */}
        <div className={styles.scene}>
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="320px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Hover overlay — portal.webp */}
        <div className={styles.hoverOverlay}>
          <div className={styles.portalSpin}>
            <Image
              src="/images/portal.webp"
              alt=""
              fill
              sizes="320px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Edge fade — blends into background */}
        <div className={styles.edge} />

        {/* Ring */}
        <svg className={styles.ringSvg} viewBox="0 0 324 324" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`rg-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor={ringColor} stopOpacity="0.9"/>
              <stop offset="30%"  stopColor={ringColor} stopOpacity="1"/>
              <stop offset="65%"  stopColor={ringColor} stopOpacity="0.7"/>
              <stop offset="100%" stopColor={ringColor} stopOpacity="0.45"/>
            </linearGradient>
            <filter id={`fg-${color}`} x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <circle cx="162" cy="162" r="154" fill="none"
            stroke={ringColor} strokeOpacity="0.15" strokeWidth="12"
            filter={`url(#fg-${color})`}/>
          <circle cx="162" cy="162" r="154" fill="none"
            stroke={`url(#rg-${color})`} strokeWidth="2.5"
            filter={`url(#fg-${color})`}/>
          <circle cx="162" cy="162" r="148" fill="none"
            stroke={ringColor} strokeOpacity="0.18" strokeWidth="1"/>
          {/* Cardinal dots */}
          <circle cx="162" cy="8"   r="3.5" fill={ringColor} opacity="0.85" filter={`url(#fg-${color})`}/>
          <circle cx="316" cy="162" r="3.5" fill={ringColor} opacity="0.85" filter={`url(#fg-${color})`}/>
          <circle cx="162" cy="316" r="3.5" fill={ringColor} opacity="0.85" filter={`url(#fg-${color})`}/>
          <circle cx="8"   cy="162" r="3.5" fill={ringColor} opacity="0.85" filter={`url(#fg-${color})`}/>
        </svg>

        {/* Rotating arc */}
        <svg
          className={styles.arc}
          viewBox="0 0 332 332"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animationDirection: arcReverse ? "reverse" : "normal" }}
        >
          <defs>
            <linearGradient id={`ag-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={arcColor} stopOpacity="0"/>
              <stop offset="50%"  stopColor={arcColor} stopOpacity="0.9"/>
              <stop offset="100%" stopColor={arcColor} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M 166 8 A 158 158 0 0 1 324 166"
            fill="none" stroke={`url(#ag-${color})`} strokeWidth="3.5" strokeLinecap="round"/>
        </svg>

        {/* Dust particles */}
        <div className={styles.dust}>
          {DUST_MOTES.map((m, i) => (
            <div
              key={i}
              className={styles.dustParticle}
              style={{
                left: m.l, top: m.t,
                width: m.s, height: m.s,
                background: i === 4 ? "var(--gold)" : dustColor,
                animationDuration: m.d,
                animationDelay: m.dl,
              }}
            />
          ))}
        </div>
      </Link>

      {/* Label below portal */}
      <div className={styles.label}>
        <span className={styles.tag}>{tag}</span>
        <span className={styles.name}>{name}</span>
        <p className={styles.desc}>{desc}</p>
        <Link href={href} className={styles.btn} tabIndex={-1}>
          {cta} <span className={styles.btnArr}>→</span>
        </Link>
      </div>
    </div>
  );
}
