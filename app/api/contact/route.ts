import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactConfirmEmail } from "@/lib/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── In-memory rate limiter ───────────────────────────────────────────────────
// Note: resets on cold start (serverless). Fine for basic spam protection.
const rlMap = new Map<string, { count: number; resetAt: number }>();
const RL_MAX = 3;
const RL_WINDOW = 60 * 60 * 1000; // 1 hour

function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rlMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rlMap.set(ip, { count: 1, resetAt: now + RL_WINDOW });
    return false;
  }
  if (entry.count >= RL_MAX) return true;
  entry.count++;
  return false;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str: string): string {
  return str.trim().replace(/<[^>]*>/g, "");
}

// ─── Email HTML: notification to owner ───────────────────────────────────────
function buildOwnerEmail(name: string, email: string, message: string): string {
  const safeMsg = message.replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F5F6FA;font-family:'Lato',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F6FA;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0"
             style="background:#fff;border-radius:14px;overflow:hidden;border:1px solid #E8E0CC;max-width:560px;">
        <tr>
          <td style="background:#2A5C3F;padding:28px 40px;">
            <p style="color:#fff;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0;font-family:Georgia,serif;">
              EDUWEER · Nowa wiadomość
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:16px;border-bottom:1px solid #F0E8D8;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9B9080;">Nadawca</p>
                  <p style="margin:0;font-size:15px;color:#2A1F0F;font-weight:600;">${name}</p>
                  <p style="margin:4px 0 0;font-size:14px;color:#3A8A62;">${email}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-top:20px;">
                  <p style="margin:0 0 12px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9B9080;">Wiadomość</p>
                  <p style="margin:0;font-size:15px;color:#4A3F30;line-height:1.8;font-weight:300;">${safeMsg}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 40px;background:#FAFAF7;border-top:1px solid #F0E8D8;">
            <p style="margin:0;font-size:11px;color:#9B9080;text-align:center;">
              Kliknij Odpowiedz, aby skontaktować się z ${name}.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  hp?: string; // honeypot
  locale?: string;
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = getIp(req);
  if (checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Zbyt wiele prób. Poczekaj chwilę." },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, hp, locale } = body as ContactPayload;

  // Honeypot — silent success for bots
  if (hp) {
    return NextResponse.json({ success: true });
  }

  // Validate fields
  if (!name?.trim()) {
    return NextResponse.json({ error: "To pole jest wymagane" }, { status: 422 });
  }
  if (!email?.trim()) {
    return NextResponse.json({ error: "To pole jest wymagane" }, { status: 422 });
  }
  if (!message?.trim()) {
    return NextResponse.json({ error: "To pole jest wymagane" }, { status: 422 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres email" },
      { status: 422 }
    );
  }

  if (message.trim().length < 10) {
    return NextResponse.json(
      { error: "Wiadomość jest za krótka (minimum 10 znaków)" },
      { status: 422 }
    );
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Wiadomość jest za długa (maksimum 5000 znaków)" },
      { status: 422 }
    );
  }

  // Sanitize
  const cleanName    = sanitize(name);
  const cleanEmail   = sanitize(email);
  const cleanMessage = sanitize(message);

  // Send notification to owner
  try {
    await resend.emails.send({
      from: "Eduweer Contact <hello@support.eduweer.com>",
      to: "radoslaw.kamysz@gmail.com",
      replyTo: cleanEmail,
      subject: `Wiadomość od ${cleanName} — Eduweer`,
      html: buildOwnerEmail(cleanName, cleanEmail, cleanMessage),
    });
  } catch (err) {
    console.error("[contact] owner email error:", err);
    return NextResponse.json(
      { error: "Coś poszło nie tak. Spróbuj ponownie." },
      { status: 500 }
    );
  }

  // Send confirmation to sender (non-blocking — owner email already sent)
  try {
    const { subject, html } = await contactConfirmEmail(locale, cleanName);
    await resend.emails.send({
      from: "Eduweer <hello@support.eduweer.com>",
      to: cleanEmail,
      subject,
      html,
    });
  } catch (err) {
    console.error("[contact] confirm email error:", err);
  }

  return NextResponse.json({ success: true });
}
