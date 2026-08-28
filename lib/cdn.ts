/**
 * Asset URL helper.
 *
 * When NEXT_PUBLIC_ASSETS_CDN is set (e.g. in production),
 * all asset paths are prefixed with the CDN base URL.
 * Otherwise the path is returned as-is (served locally from /public).
 *
 * Usage:
 *   assetUrl("/images/bg_3.webp")
 *   → "https://pub-xxx.r2.dev/images/bg_3.webp"  (with CDN)
 *   → "/images/bg_3.webp"                          (without CDN)
 */
const CDN = (process.env.NEXT_PUBLIC_ASSETS_CDN ?? "").replace(/\/$/, "");

export function assetUrl(path: string): string {
  return CDN ? `${CDN}${path}` : path;
}

/**
 * Returns a locale-suffixed variant of an asset path when the current locale
 * is in `localizedLocales`, otherwise returns the original path.
 *
 * Example:
 *   localizedAsset("/images/workbook_cover.webp", "pl")
 *   → "/images/workbook_cover_pl.webp"
 *
 *   localizedAsset("/images/workbook_cover.webp", "fr")
 *   → "/images/workbook_cover.webp"   // fallback to default
 */
export function localizedAsset(
  path: string,
  locale: string,
  localizedLocales: readonly string[] = ["pl", "de", "en"],
): string {
  if (!localizedLocales.includes(locale)) return path;
  return path.replace(/(\.[^./]+)$/, `_${locale}$1`);
}
