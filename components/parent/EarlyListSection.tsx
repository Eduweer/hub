"use client";

import { useState, useEffect, useMemo, FormEvent } from "react";
import { useLocale } from "next-intl";
import styles from "./EarlyListSection.module.css";

// ─── Ambient sparkles (A) ─────────────────────────────────────────────────────
// Slow-drifting glints scattered behind the card content. Pure CSS, paused for
// users who prefer reduced motion (handled in the stylesheet).
type Spark = { left: string; top: string; size: number; color: string; dur: string; delay: string; star: boolean };

const GOLD = "#C8963C";
const GOLD_LT = "#E8BB6A";
const GREEN = "#3A8A62";
const GREEN_LT = "#72C49A";

const SPARKS: Spark[] = [
  { left: "8%",  top: "22%", size: 6,  color: GOLD,     dur: "7s",  delay: "0s",   star: true  },
  { left: "16%", top: "60%", size: 3,  color: GREEN_LT, dur: "9s",  delay: "1.4s", star: false },
  { left: "12%", top: "82%", size: 5,  color: GOLD_LT,  dur: "8s",  delay: "3.1s", star: true  },
  { left: "26%", top: "14%", size: 3,  color: GREEN,    dur: "10s", delay: "0.7s", star: false },
  { left: "33%", top: "78%", size: 4,  color: GOLD,     dur: "8.5s",delay: "2.2s", star: false },
  { left: "44%", top: "10%", size: 7,  color: GOLD_LT,  dur: "9s",  delay: "1.1s", star: true  },
  { left: "50%", top: "90%", size: 3,  color: GREEN_LT, dur: "7.5s",delay: "4s",   star: false },
  { left: "60%", top: "16%", size: 4,  color: GREEN,    dur: "11s", delay: "2.6s", star: false },
  { left: "67%", top: "74%", size: 6,  color: GOLD,     dur: "8s",  delay: "0.4s", star: true  },
  { left: "75%", top: "30%", size: 3,  color: GOLD_LT,  dur: "9.5s",delay: "3.4s", star: false },
  { left: "84%", top: "62%", size: 5,  color: GREEN_LT, dur: "8.5s",delay: "1.8s", star: true  },
  { left: "90%", top: "20%", size: 3,  color: GOLD,     dur: "10s", delay: "0.9s", star: false },
  { left: "92%", top: "84%", size: 4,  color: GOLD_LT,  dur: "7s",  delay: "2.9s", star: false },
  { left: "54%", top: "46%", size: 3,  color: GREEN_LT, dur: "9s",  delay: "5s",   star: false },
];

function StarGlyph({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
         style={{ fill: color, filter: `drop-shadow(0 0 4px ${color})` }}>
      <path d="M12 0c.6 6 5.4 10.8 11.4 12-6 .6-10.8 5.4-11.4 12-.6-6.6-5.4-11.4-11.4-12C6.6 10.8 11.4 6 12 0z" />
    </svg>
  );
}

function AmbientSparkles() {
  return (
    <div className={styles.sparkleLayer} aria-hidden="true">
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className={styles.spark}
          style={{ left: s.left, top: s.top, animationDuration: s.dur, animationDelay: s.delay }}
        >
          {s.star ? (
            <StarGlyph size={s.size} color={s.color} />
          ) : (
            <span
              className={styles.sparkDot}
              style={{ width: s.size, height: s.size, background: s.color, boxShadow: `0 0 6px ${s.color}` }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

// ─── Success payoff burst (C) ─────────────────────────────────────────────────
// One-shot spray of glints fired from the card centre when a sign-up lands.
function SuccessBurst() {
  const particles = useMemo(() => {
    const N = 22;
    return Array.from({ length: N }, (_, i) => {
      const angle = (i / N) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 70 + Math.random() * 90;
      const palette = [GOLD, GOLD_LT, GREEN, GREEN_LT];
      const size = 4 + Math.random() * 5;
      return {
        tx: `${Math.cos(angle) * dist}px`,
        ty: `${Math.sin(angle) * dist}px`,
        color: palette[i % palette.length],
        size,
        delay: `${Math.random() * 0.08}s`,
        star: i % 3 === 0,
      };
    });
  }, []);

  return (
    <div className={styles.burst} aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className={styles.burstParticle}
          style={{
            // CSS custom props consumed by the burst keyframe
            ["--tx" as string]: p.tx,
            ["--ty" as string]: p.ty,
            animationDelay: p.delay,
          }}
        >
          {p.star ? (
            <StarGlyph size={p.size} color={p.color} />
          ) : (
            <span
              className={styles.sparkDot}
              style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 6px ${p.color}` }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface EarlyListT {
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  emailPlaceholder: string;
  cta: string;
  loading: string;
  success: string;
  errorEmail: string;
  errorGeneric: string;
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      style={{ animation: "spin 0.8s linear infinite" }}
      aria-hidden="true"
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor"
              strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" />
    </svg>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function EarlyListSection({ t }: { t: EarlyListT }) {
  const locale                    = useLocale();
  const [email, setEmail]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const reducedMotion             = usePrefersReducedMotion();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Front-end email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t.errorEmail);
      return;
    }

    // Read honeypot value from the hidden input
    const form = e.currentTarget;
    const hp = (form.elements.namedItem("website") as HTMLInputElement)?.value ?? "";

    setLoading(true);
    try {
      const res = await fetch("/api/early-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), hp, locale }),
      });

      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok) {
        setError(data.error ?? t.errorGeneric);
        return;
      }

      setSubmitted(true);
      setEmail("");
    } catch {
      setError(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      {!reducedMotion && <AmbientSparkles />}

      <div className={styles.cardInner}>
      <span className={styles.eye}>{t.eyebrow}</span>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.lead}>{t.lead}</p>
      <p className={styles.body}>{t.body}</p>

      {submitted ? (
        <div className={styles.success}>
          {!reducedMotion && <SuccessBurst />}
          {t.success}
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from real users, bots fill it */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
          />

          <div className={styles.row}>
            <input
              type="email"
              className={styles.input}
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              disabled={loading}
              required
            />
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Spinner /> {t.loading}
                </span>
              ) : t.cta}
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
      </div>
    </div>
  );
}
