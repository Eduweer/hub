"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "next-intl";
import styles from "./TeacherNewsletter.module.css";

export interface TeacherNewsletterCopy {
  email: string;
  emailPlaceholder: string;
  country: string;
  countryPlaceholder: string;
  countries: string[];
  stage: string;
  stagePlaceholder: string;
  stages: string[];
  pilot: string;
  consent: string;
  submit: string;
  loading: string;
  success: string;
  errorEmail: string;
  errorRequired: string;
  errorGeneric: string;
}

export default function TeacherNewsletter({ copy }: { copy: TeacherNewsletterCopy }) {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const country = String(form.get("country") ?? "").trim();
    const stage = String(form.get("stage") ?? "").trim();
    const consent = form.get("consent") === "on";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError(copy.errorEmail);
    if (!country || !stage || !consent) return setError(copy.errorRequired);

    setLoading(true);
    try {
      const response = await fetch("/api/teachers-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, country, stage,
          pilot: form.get("pilot") === "on",
          consent,
          hp: form.get("website"),
          locale,
        }),
      });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || copy.errorGeneric);
      setSuccess(true);
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  if (success) return <div className={styles.success}>{copy.success}</div>;

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className={styles.grid}>
        <label><span>{copy.email}</span><input name="email" type="email" placeholder={copy.emailPlaceholder} required /></label>
        <label><span>{copy.country}</span><select name="country" defaultValue="" required><option value="" disabled>{copy.countryPlaceholder}</option>{copy.countries.map((country) => <option key={country} value={country}>{country}</option>)}</select></label>
        <label className={styles.full}><span>{copy.stage}</span><select name="stage" defaultValue="" required><option value="" disabled>{copy.stagePlaceholder}</option>{copy.stages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}</select></label>
      </div>
      <label className={styles.check}><input name="pilot" type="checkbox" /><span>{copy.pilot}</span></label>
      <label className={styles.check}><input name="consent" type="checkbox" required /><span>{copy.consent}</span></label>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.button} type="submit" disabled={loading}>{loading ? copy.loading : copy.submit}</button>
    </form>
  );
}
