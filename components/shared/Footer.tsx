import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="ft">
      <div className="ft-brand">Eduweer · Harvoria &amp; Beyond</div>
      <div className="ft-copy">© 2026 Radosław Kamysz</div>
      <nav className="ft-links">
        <a href="#">{t("about")}</a>
        <a href="#">{t("contact")}</a>
        <Link href="/privacy">{t("privacy")}</Link>
      </nav>
    </footer>
  );
}
