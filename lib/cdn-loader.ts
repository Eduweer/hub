/**
 * Next.js custom image loader.
 *
 * When NEXT_PUBLIC_ASSETS_CDN is set, images are served directly
 * from the CDN (bypassing Next.js optimisation — the CDN already
 * stores pre-optimised .webp files).
 *
 * Without the env var the local path is returned as-is.
 */
interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function cdnLoader({ src, width, quality }: LoaderParams): string {
  const cdn = (process.env.NEXT_PUBLIC_ASSETS_CDN ?? "").replace(/\/$/, "");
  const url = cdn ? `${cdn}${src}` : src;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&q=${quality ?? 75}`;
}
