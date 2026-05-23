"use client";

import { useState, FormEvent } from "react";
import styles from "./ContactSection.module.css";

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

function NewsletterForm({ t }: { t: NewsletterT }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // TODO: integrate newsletter provider
      console.log("Newsletter signup:", email);
      setSubmitted(true);
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
        <form className={styles.nlForm} onSubmit={handleSubmit}>
          <div className={styles.nlRow}>
            <input
              type="email"
              className={styles.input}
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.btnPrimary}>
              {t.cta}
            </button>
          </div>
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

function ContactForm({ t }: { t: ContactT }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
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
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          {status === "error" && (
            <div className={styles.error}>{t.error}</div>
          )}
          <input
            type="text"
            className={styles.input}
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className={styles.input}
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            className={styles.textarea}
            placeholder={t.messagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
          />
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={loading}
          >
            {loading ? "…" : t.submit}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactSection({ newsletter, contact }: ContactSectionProps) {
  return (
    <div className={styles.layout}>
      <NewsletterForm t={newsletter} />
      <ContactForm t={contact} />
    </div>
  );
}
