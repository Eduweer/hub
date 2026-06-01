"use client";

import { Fragment, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import styles from "./Header.module.css";

const LANGUAGES = [
  { code: "pl", name: "Polski" },
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "日本語" },
  { code: "da", name: "Dansk" },
  { code: "nl", name: "Nederlands" },
  { code: "pt", name: "Português" },
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
      <a
        href={locale === "pl" ? "https://eduweer.com" : `https://eduweer.com/${locale}`}
        className={styles.logo}
      >
        Eduweer
      </a>

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
