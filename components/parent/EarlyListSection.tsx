"use client";

import { useState, FormEvent } from "react";
import styles from "./EarlyListSection.module.css";

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
  const [email, setEmail]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

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
        body: JSON.stringify({ email: email.trim(), hp }),
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
      <span className={styles.eye}>{t.eyebrow}</span>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.lead}>{t.lead}</p>
      <p className={styles.body}>{t.body}</p>

      {submitted ? (
        <div className={styles.success}>{t.success}</div>
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
  );
}
