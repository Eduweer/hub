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
