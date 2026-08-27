import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Background from "@/components/shared/Background";
import Motes from "@/components/shared/Motes";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hub.portals.campaign" });

  return createPageMetadata({
    locale,
    path: "/kampania",
    title: `${t("name")} — Eduria`,
    description: t("desc"),
    noIndex: true,
  });
}

export default function KampaniaPage() {
  return (
    <>
      <Background />
      <Motes />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 32px 80px" }}>
        <Header />
        <section style={{ padding: "120px 0", textAlign: "center" }}>
          <span style={{
            fontFamily: "var(--f-head)", fontSize: "10px", letterSpacing: "5px",
            textTransform: "uppercase", color: "var(--copper)", display: "block", marginBottom: "16px"
          }}>
            Kampania
          </span>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(36px,5vw,60px)", color: "var(--ink)", marginBottom: "20px" }}>
            Wkrótce
          </h1>
          <p style={{ fontFamily: "var(--f-body)", fontSize: "18px", color: "var(--ink-soft)", maxWidth: "480px", margin: "0 auto" }}>
            Strona kampanii jest w przygotowaniu. Zapisz się do newslettera, żeby być pierwszym.
          </p>
        </section>
        <Footer />
      </div>
    </>
  );
}
