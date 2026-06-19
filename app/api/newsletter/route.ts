import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { newsletterWelcomeEmail } from "@/lib/emails";

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

  const { email, hp, locale } = body as { email?: string; hp?: string; locale?: string };

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

  // KROK 1 — dodaj kontakt do globalnej listy
  const { error: contactError } = await resend.contacts.create({
    email: cleanEmail,
    unsubscribed: false,
  });

  if (contactError) {
    console.error("[newsletter] contact error:", contactError);
    return NextResponse.json(
      { error: "Błąd zapisu kontaktu" },
      { status: 500 }
    );
  }

  // KROK 2 — przypisz do segmentu Newsletter
  const { error: segmentError } = await resend.contacts.segments.add({
    email: cleanEmail,
    segmentId: process.env.RESEND_SEGMENT_ID!,
  });

  if (segmentError) {
    console.error("[newsletter] segment error:", segmentError);
    // Nie przerywaj — kontakt jest zapisany, tylko segment nie działa
  }

  // Send welcome email (non-blocking — failure doesn't abort signup)
  try {
    const { subject, html } = await newsletterWelcomeEmail(locale, cleanEmail);
    await resend.emails.send({
      from: "Eduweer <hello@support.eduweer.com>",
      to: cleanEmail,
      subject,
      html,
    });
  } catch (err) {
    // Log but don't fail — contact was already added
    console.error("[newsletter] welcome email error:", err);
  }

  return NextResponse.json({ success: true });
}
