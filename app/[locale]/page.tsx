import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/shared/JsonLd";
import WorldHub from "@/components/hub/WorldHub";
import { createPageMetadata, createWebsiteJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hub" });
  const title = `Eduria — ${t("titleBefore")}${t("titleAccent")}${t("titleAfter")} ${t("titleLine2")}`;

  return createPageMetadata({
    locale,
    title,
    description: t("subtitle"),
  });
}

export default function HubPage() {
  const t = useTranslations("hub");
  const locale = useLocale();
  return <><JsonLd data={createWebsiteJsonLd(locale, t("subtitle"))} /><WorldHub /></>;
}
