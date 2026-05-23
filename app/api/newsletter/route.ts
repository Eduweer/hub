import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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
    return false; // not limited
  }
  if (entry.count >= RL_MAX) return true; // limited
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

// ─── Welcome email HTML ───────────────────────────────────────────────────────
function buildWelcomeEmail(email: string): string {
  const unsubUrl = `https://eduweer.com/unsubscribe?email=${encodeURIComponent(email)}`;
  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Witaj w świecie Eduweer!</title>
</head>
<body style="margin:0;padding:0;background:#F5F6FA;font-family:'Lato',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F5F6FA;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation"
             style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E8E0CC;max-width:560px;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#2A5C3F 0%,#3A8A62 100%);padding:40px 48px;text-align:center;">
            <h1 style="color:#fff;font-size:26px;margin:0;letter-spacing:3px;font-family:Georgia,serif;font-weight:normal;">
              EDUWEER
            </h1>
            <p style="color:rgba(255,255,255,0.75);margin:10px 0 0;font-size:11px;letter-spacing:4px;text-transform:uppercase;">
              Przygoda · Wiedza · Harvoria
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:48px 48px 36px;">
            <p style="font-size:18px;color:#2A1F0F;margin:0 0 20px;line-height:1.5;font-weight:300;">
              Cześć!
            </p>
            <p style="font-size:15px;color:#4A3F30;margin:0 0 18px;line-height:1.85;font-weight:300;">
              Dziękujemy, że dołączasz do świata Eduweer. 🌿
            </p>
            <p style="font-size:15px;color:#4A3F30;margin:0 0 18px;line-height:1.85;font-weight:300;">
              Pierwsze przygody w <strong style="color:#3A8A62;font-weight:600;">Harvorii</strong> już czekają.<br>
              Będziemy Cię informować o nowościach, premierze książki i aplikacji Mentor.
            </p>
            <p style="font-size:15px;color:#4A3F30;margin:0 0 36px;line-height:1.85;font-weight:300;">
              Do zobaczenia w przygodzie,<br>
              <strong style="color:#2A1F0F;font-weight:600;">Zespół Eduweer</strong>
            </p>

            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="background:#3A8A62;border-radius:999px;">
                  <a href="https://eduweer.com"
                     style="display:inline-block;padding:14px 36px;color:#fff;text-decoration:none;
                            font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
                            font-family:Georgia,serif;">
                    Odkryj Eduweer →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 48px 28px;border-top:1px solid #F0E8D8;background:#FAFAF7;">
            <p style="font-size:11px;color:#9B9080;margin:0;line-height:1.7;text-align:center;">
              Otrzymujesz tę wiadomość, ponieważ zapisałeś/aś się na liście Eduweer.<br>
              <a href="${unsubUrl}"
                 style="color:#9B9080;text-decoration:underline;">
                Zrezygnuj z subskrypcji
              </a>
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

  const { email, hp } = body as { email?: string; hp?: string };

  // Honeypot — bot filled a hidden field → silent success
  if (hp) {
    return NextResponse.json({ success: true });
  }

  // Validate email
  if (!email?.trim()) {
    return NextResponse.json(
      { error: "To pole jest wymagane" },
      { status: 422 }
    );
  }

  const cleanEmail = sanitize(email);

  if (!isValidEmail(cleanEmail)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres email" },
      { status: 422 }
    );
  }

  // Add to Resend Audience (upserts — no duplicate error)
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    try {
      await resend.contacts.create({
        email: cleanEmail,
        audienceId,
        unsubscribed: false,
      });
    } catch (err) {
      console.error("[newsletter] audience error:", err);
      return NextResponse.json(
        { error: "Coś poszło nie tak. Spróbuj ponownie." },
        { status: 500 }
      );
    }
  }

  // Send welcome email (non-blocking — failure doesn't abort signup)
  try {
    await resend.emails.send({
      from: "Eduweer <hello@support.eduweer.com>",
      to: cleanEmail,
      subject: "Witaj w świecie Eduweer! 🌿",
      html: buildWelcomeEmail(cleanEmail),
    });
  } catch (err) {
    // Log but don't fail — contact was already added
    console.error("[newsletter] welcome email error:", err);
  }

  return NextResponse.json({ success: true });
}
