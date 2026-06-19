import { createTranslator } from "next-intl";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

/** Validate an incoming locale string, falling back to the site default. */
function normalizeLocale(locale?: string | null): AppLocale {
  if (locale && (routing.locales as readonly string[]).includes(locale)) {
    return locale as AppLocale;
  }
  return routing.defaultLocale;
}

async function getTranslator(locale: AppLocale) {
  const messages = (await import(`../messages/${locale}.json`)).default;
  return createTranslator({ locale, messages });
}

// ─── Shared chrome ────────────────────────────────────────────────────────────
const GREEN = "#3A8A62";
const GREEN_DARK = "#2A5C3F";

function gradientHeader(title: string, tagline: string): string {
  return `
        <tr>
          <td style="background:linear-gradient(135deg,${GREEN_DARK} 0%,${GREEN} 100%);padding:40px 48px;text-align:center;">
            <h1 style="color:#fff;font-size:26px;margin:0;letter-spacing:3px;font-family:Georgia,serif;font-weight:normal;">
              ${title}
            </h1>
            ${tagline ? `<p style="color:rgba(255,255,255,0.75);margin:10px 0 0;font-size:11px;letter-spacing:4px;text-transform:uppercase;">${tagline}</p>` : ""}
          </td>
        </tr>`;
}

// ─── Newsletter welcome ───────────────────────────────────────────────────────
export async function newsletterWelcomeEmail(locale: string | undefined, email: string) {
  const loc = normalizeLocale(locale);
  const t = await getTranslator(loc);
  const k = (key: string) => t(`emails.newsletter.${key}`);
  const unsubUrl = `https://eduweer.com/unsubscribe?email=${encodeURIComponent(email)}`;

  const html = `<!DOCTYPE html>
<html lang="${loc}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${k("subject")}</title>
</head>
<body style="margin:0;padding:0;background:#F5F6FA;font-family:'Lato',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F5F6FA;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation"
             style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E8E0CC;max-width:560px;">
        ${gradientHeader("EDUWEER", k("tagline"))}
        <tr>
          <td style="padding:48px 48px 36px;">
            <p style="font-size:18px;color:#2A1F0F;margin:0 0 20px;line-height:1.5;font-weight:300;">${k("greeting")}</p>
            <p style="font-size:15px;color:#4A3F30;margin:0 0 18px;line-height:1.85;font-weight:300;">${k("thanks")}</p>
            <p style="font-size:15px;color:#4A3F30;margin:0 0 18px;line-height:1.85;font-weight:300;">
              ${k("bodyLine1")}<br>${k("bodyLine2")}
            </p>
            <p style="font-size:15px;color:#4A3F30;margin:0 0 36px;line-height:1.85;font-weight:300;">
              ${k("signoff")}<br>
              <strong style="color:#2A1F0F;font-weight:600;">${k("team")}</strong>
            </p>
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="background:${GREEN};border-radius:999px;">
                  <a href="https://eduweer.com"
                     style="display:inline-block;padding:14px 36px;color:#fff;text-decoration:none;
                            font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
                            font-family:Georgia,serif;">
                    ${k("cta")}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 48px 28px;border-top:1px solid #F0E8D8;background:#FAFAF7;">
            <p style="font-size:11px;color:#9B9080;margin:0;line-height:1.7;text-align:center;">
              ${k("footerReason")}<br>
              <a href="${unsubUrl}" style="color:#9B9080;text-decoration:underline;">${k("unsubscribe")}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject: k("subject"), html };
}

// ─── Early-list welcome ───────────────────────────────────────────────────────
export async function earlyListWelcomeEmail(locale: string | undefined, email: string) {
  const loc = normalizeLocale(locale);
  const t = await getTranslator(loc);
  const k = (key: string) => t(`emails.earlyList.${key}`);
  const unsubUrl = `https://eduweer.com/unsubscribe?email=${encodeURIComponent(email)}`;

  const html = `<!DOCTYPE html>
<html lang="${loc}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${k("subject")}</title>
</head>
<body style="margin:0;padding:0;background:#F5F6FA;font-family:'Lato',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F5F6FA;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation"
             style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E8E0CC;max-width:560px;">
        ${gradientHeader("EDUWEER", k("tagline"))}
        <tr>
          <td style="padding:48px 48px 36px;">
            <p style="font-size:18px;color:#2A1F0F;margin:0 0 20px;line-height:1.5;font-weight:300;">${k("greeting")}</p>
            <p style="font-size:15px;color:#4A3F30;margin:0 0 18px;line-height:1.85;font-weight:300;">${k("thanks")}</p>
            <p style="font-size:15px;color:#4A3F30;margin:0 0 18px;line-height:1.85;font-weight:300;">
              ${k("bodyLine1")}<br>${k("bodyLine2")}
            </p>
            <p style="font-size:15px;color:#4A3F30;margin:0 0 36px;line-height:1.85;font-weight:300;">
              ${k("signoff")}<br>
              <strong style="color:#2A1F0F;font-weight:600;">${k("team")}</strong>
            </p>
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="background:${GREEN};border-radius:999px;">
                  <a href="https://eduweer.com"
                     style="display:inline-block;padding:14px 36px;color:#fff;text-decoration:none;
                            font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
                            font-family:Georgia,serif;">
                    ${k("cta")}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 48px 28px;border-top:1px solid #F0E8D8;background:#FAFAF7;">
            <p style="font-size:11px;color:#9B9080;margin:0;line-height:1.7;text-align:center;">
              ${k("footerReason")}<br>
              <a href="${unsubUrl}" style="color:#9B9080;text-decoration:underline;">${k("unsubscribe")}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject: k("subject"), html };
}

// ─── Contact confirmation (to the sender) ─────────────────────────────────────
export async function contactConfirmEmail(locale: string | undefined, name: string) {
  const loc = normalizeLocale(locale);
  const t = await getTranslator(loc);
  const k = (key: string, values?: Record<string, string>) => t(`emails.contactConfirm.${key}`, values);

  const html = `<!DOCTYPE html>
<html lang="${loc}">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F5F6FA;font-family:'Lato',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F6FA;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0"
             style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E8E0CC;max-width:560px;">
        ${gradientHeader("EDUWEER", "")}
        <tr>
          <td style="padding:48px 48px 36px;">
            <p style="font-size:18px;color:#2A1F0F;margin:0 0 20px;line-height:1.5;font-weight:300;">${k("greeting", { name })}</p>
            <p style="font-size:15px;color:#4A3F30;margin:0 0 18px;line-height:1.85;font-weight:300;">${k("body")}</p>
            <p style="font-size:15px;color:#4A3F30;margin:0;line-height:1.85;font-weight:300;">
              ${k("signoff")}<br>
              <strong style="color:#2A1F0F;font-weight:600;">${k("team")}</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 48px 28px;border-top:1px solid #F0E8D8;background:#FAFAF7;">
            <p style="font-size:11px;color:#9B9080;margin:0;line-height:1.7;text-align:center;">${k("footerAuto")}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject: k("subject"), html };
}
