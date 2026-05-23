"use client";

import { Fragment, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import styles from "./Header.module.css";

const LANGUAGES = [
  { code: "pl", flag: "🇵🇱", name: "Polski" },
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "ja", flag: "🇯🇵", name: "日本語" },
];

interface NavLink { label: string; href: string; }

export default function Header({ navLinks }: { navLinks?: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  function switchLocale(code: string) {
    router.replace(pathname, { locale: code });
    setOpen(false);
  }

  return (
    <header className={styles.hdr}>
      <div className={styles.logo}>Eduweer</div>

      {/* <nav className={styles.nav} aria-label={t("mainNav")}>
        {(navLinks ?? [
          { label: t("about"),   href: "#" },
          { label: "Harvoria",   href: "#" },
          { label: t("contact"), href: "#" },
        ]).map((link, i) => (
          <a key={i} href={link.href}>{link.label}</a>
        ))}
      </nav> */}

      <div className={`${styles.langWrap} ${open ? styles.open : ""}`}>
        <button
          className={styles.langBtn}
          onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={styles.flag}>{current.flag}</span>
          <span className={styles.code}>{current.code.toUpperCase()}</span>
          <span className={styles.caret} aria-hidden="true">▾</span>
        </button>

        <div className={`${styles.langDd} ${open ? styles.langDdOpen : ""}`} role="listbox">
          {LANGUAGES.map((lang, i) => (
            <Fragment key={lang.code}>
              {i > 0 && i % 6 === 0 && <div className={styles.sep} />}
              <button
                role="option"
                aria-selected={lang.code === locale}
                className={`${styles.langItem} ${lang.code === locale ? styles.active : ""}`}
                onClick={(e) => { e.stopPropagation(); switchLocale(lang.code); }}
              >
                <span className={styles.liFlag}>{lang.flag}</span>
                <span className={styles.liName}>{lang.name}</span>
                <span className={styles.liCode}>{lang.code.toUpperCase()}</span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>
    </header>
  );
}
