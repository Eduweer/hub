"use client";

import { useState, FormEvent } from "react";
import { useLocale } from "next-intl";
import styles from "./InvestorContact.module.css";

export interface InvestorContactT {
  eyebrow: string;
  title: string;
  lead: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  errorRequired: string;
  errorEmail: string;
  errorShort: string;
  errorGeneric: string;
}

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

export default function InvestorContact({ t }: { t: InvestorContactT }) {
  const locale                  = useLocale();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [message, setMessage]   = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus]     = useState<"idle" | "success">("idle");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    // Front-end validation
    if (!name.trim())    { setErrorMsg(t.errorRequired); return; }
    if (!email.trim())   { setErrorMsg(t.errorRequired); return; }
    if (!message.trim()) { setErrorMsg(t.errorRequired); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg(t.errorEmail);
      return;
    }
    if (message.trim().length < 10) {
      setErrorMsg(t.errorShort);
      return;
    }

    // Honeypot
    const form = e.currentTarget;
    const hp = (form.elements.namedItem("website") as HTMLInputElement)?.value ?? "";

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), hp, locale }),
      });

      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok) {
        setErrorMsg(data.error ?? t.errorGeneric);
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMsg(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <span className={styles.eye}>{t.eyebrow}</span>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.lead}>{t.lead}</p>

      {status === "success" ? (
        <div className={styles.success}>{t.success}</div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
          />

          {errorMsg && <p className={styles.error}>{errorMsg}</p>}

          <div className={styles.fieldRow}>
            <input
              type="text"
              className={styles.input}
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => { setName(e.target.value); setErrorMsg(""); }}
              disabled={loading}
              required
            />
            <input
              type="email"
              className={styles.input}
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); }}
              disabled={loading}
              required
            />
          </div>
          <textarea
            className={styles.textarea}
            placeholder={t.messagePlaceholder}
            value={message}
            onChange={(e) => { setMessage(e.target.value); setErrorMsg(""); }}
            disabled={loading}
            required
            rows={5}
          />
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Spinner /> {t.sending}
              </span>
            ) : t.submit}
          </button>
        </form>
      )}
    </div>
  );
}
