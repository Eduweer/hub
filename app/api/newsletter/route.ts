import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { subscribeToLists } from "@/lib/newsletter-signup";
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

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { email, hp, locale, earlyList, consent } = body as Record<string, unknown>;
  if (typeof email !== "string" || (locale !== undefined && typeof locale !== "string") ||
      (earlyList !== undefined && (typeof earlyList !== "boolean" || consent !== true))) {
    return NextResponse.json({ error: "Invalid request" }, { status: 422 });
  }

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

  try {
    const result = await subscribeToLists(
      { email: cleanEmail, earlyList: earlyList === true },
      { newsletter: process.env.RESEND_SEGMENT_ID, early: process.env.RESEND_EARLY_LIST_SEGMENT_ID },
      {
        create: email => resend.contacts.create({ email, unsubscribed: false }),
        add: (email, segmentId) => resend.contacts.segments.add({ email, segmentId }),
      },
    );
    if (result !== "ok") {
      console.error("[newsletter] subscription failed:", result);
      return NextResponse.json({ error: "Subscription could not be completed" }, { status: result === "configuration" ? 503 : 502 });
    }
  } catch {
    return NextResponse.json({ error: "Subscription service unavailable" }, { status: 502 });
  }

  // Send welcome email (non-blocking — failure doesn't abort signup)
  try {
    const { subject, html } = await newsletterWelcomeEmail(locale, cleanEmail);
    await resend.emails.send({
      from: "Eduria <hello@eduria.io>",
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
