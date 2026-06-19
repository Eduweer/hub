"use client";

import { useState, FormEvent } from "react";
import { useLocale } from "next-intl";
import styles from "./ContactSection.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NewsletterT {
  eyebrow: string;
  title: string;
  lead: string;
  emailPlaceholder: string;
  cta: string;
  success: string;
  trust: string[];
}

interface ContactT {
  eyebrow: string;
  title: string;
  lead: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  success: string;
  error: string;
}

interface ContactSectionProps {
  newsletter: NewsletterT;
  contact: ContactT;
}

// ─── Newsletter Form ──────────────────────────────────────────────────────────
function NewsletterForm({ t }: { t: NewsletterT }) {
  const locale = useLocale();
  const [email, setEmail]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Front-end email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Podaj poprawny adres email");
      return;
    }

    // Read honeypot value from the hidden input
    const form = e.currentTarget;
    const hp = (form.elements.namedItem("website") as HTMLInputElement)?.value ?? "";

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), hp, locale }),
      });

      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Coś poszło nie tak. Spróbuj ponownie.");
        return;
      }

      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Coś poszło nie tak. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.half}>
      <span className={styles.eye}>{t.eyebrow}</span>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.lead}>{t.lead}</p>

      {submitted ? (
        <div className={styles.success}>{t.success}</div>
      ) : (
        <form className={styles.nlForm} onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from real users, bots fill it */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
          />

          <div className={styles.nlRow}>
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
                  <Spinner /> Zapisuję…
                </span>
              ) : t.cta}
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.trustRow}>
            {t.trust.map((item, i) => (
              <span key={i} className={styles.trustItem}>
                <span className={styles.trustDot} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </form>
      )}
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm({ t }: { t: ContactT }) {
  const locale = useLocale();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [message, setMessage]   = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus]     = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    // Front-end validation
    if (!name.trim())    { setErrorMsg("To pole jest wymagane"); return; }
    if (!email.trim())   { setErrorMsg("To pole jest wymagane"); return; }
    if (!message.trim()) { setErrorMsg("To pole jest wymagane"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg("Podaj poprawny adres email");
      return;
    }
    if (message.trim().length < 10) {
      setErrorMsg("Wiadomość jest za krótka (minimum 10 znaków)");
      return;
    }

    // Honeypot
    const form = e.currentTarget;
    const hp = (form.elements.namedItem("website2") as HTMLInputElement)?.value ?? "";

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), hp, locale }),
      });

      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok) {
        setErrorMsg(data.error ?? t.error);
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMsg(t.error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.half}>
      <span className={styles.eye}>{t.eyebrow}</span>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.lead}>{t.lead}</p>

      {status === "success" ? (
        <div className={styles.success}>{t.success}</div>
      ) : (
        <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
          {/* Honeypot */}
          <input
            type="text"
            name="website2"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
          />

          {errorMsg && <p className={styles.error}>{errorMsg}</p>}

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
          <textarea
            className={styles.textarea}
            placeholder={t.messagePlaceholder}
            value={message}
            onChange={(e) => { setMessage(e.target.value); setErrorMsg(""); }}
            disabled={loading}
            required
            rows={5}
            style={{ minHeight: 140 }}
          />
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Spinner /> Wysyłam…
              </span>
            ) : t.submit}
          </button>
        </form>
      )}
    </div>
  );
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

// ─── Exported section ─────────────────────────────────────────────────────────
export default function ContactSection({ newsletter, contact }: ContactSectionProps) {
  return (
    <div className={styles.layout}>
      <NewsletterForm t={newsletter} />
      <ContactForm t={contact} />
    </div>
  );
}
