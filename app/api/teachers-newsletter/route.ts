import { NextRequest, NextResponse } from "next/server";
import { Resend, type ErrorResponse } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const attempts = new Map<string, { count: number; until: number }>();

const CONTACT_PROPERTIES = [
  { key: "country", type: "string" as const },
  { key: "education_stage", type: "string" as const },
  { key: "pilot_interest", type: "string" as const },
  { key: "locale", type: "string" as const },
  { key: "source", type: "string" as const },
  { key: "consent_at", type: "string" as const },
];

let contactPropertiesPromise: Promise<void> | undefined;

const clean = (value: unknown) =>
  String(value ?? "")
    .trim()
    .replace(/<[^>]*>/g, "")
    .slice(0, 240);

function isConfigured() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const segmentId = process.env.RESEND_TEACHERS_SEGMENT_ID?.trim();

  return Boolean(
    apiKey &&
      apiKey !== "re_xxxxxxxxxxxx" &&
      segmentId &&
      !segmentId.startsWith("your_")
  );
}

async function ensureContactProperties() {
  const { data, error } = await resend.contactProperties.list({ limit: 100 });
  if (error) throw error;

  const existingProperties = new Set(data.data.map((property) => property.key));

  for (const property of CONTACT_PROPERTIES) {
    if (existingProperties.has(property.key)) continue;

    const { error: createError } = await resend.contactProperties.create(property);
    if (!createError) continue;

    // A parallel cold start may have created the property in the meantime.
    const { data: refreshedData, error: refreshError } =
      await resend.contactProperties.list({ limit: 100 });

    if (
      refreshError ||
      !refreshedData.data.some((item) => item.key === property.key)
    ) {
      throw createError;
    }
  }
}

function prepareContactProperties() {
  if (!contactPropertiesPromise) {
    contactPropertiesPromise = ensureContactProperties().catch((error) => {
      contactPropertiesPromise = undefined;
      throw error;
    });
  }

  return contactPropertiesPromise;
}

async function saveContact({
  email,
  country,
  stage,
  pilot,
  locale,
  consentAt,
  segmentId,
}: {
  email: string;
  country: string;
  stage: string;
  pilot: boolean;
  locale: string;
  consentAt: string;
  segmentId: string;
}) {
  const properties = {
    country,
    education_stage: stage,
    pilot_interest: pilot ? "yes" : "no",
    locale,
    source: "teachers_newsletter",
    consent_at: consentAt,
  };

  const { data: existingContact, error: getError } =
    await resend.contacts.get({ email });

  if (existingContact) {
    const { error: updateError } = await resend.contacts.update({
      email,
      unsubscribed: false,
      properties,
    });
    if (updateError) throw updateError;
  } else {
    if (getError?.name !== "not_found") throw getError;

    const { error: createError } = await resend.contacts.create({
      email,
      unsubscribed: false,
      properties,
      segments: [{ id: segmentId }],
    });

    if (createError) {
      // If two requests created the same contact simultaneously, update the winner.
      const { error: updateError } = await resend.contacts.update({
        email,
        unsubscribed: false,
        properties,
      });
      if (updateError) throw createError;
    }
  }

  const { data: segmentsData, error: segmentsError } =
    await resend.contacts.segments.list({ email, limit: 100 });
  if (segmentsError) throw segmentsError;

  if (!segmentsData.data.some((segment) => segment.id === segmentId)) {
    const { error: addSegmentError } = await resend.contacts.segments.add({
      email,
      segmentId,
    });
    if (addSegmentError) throw addSegmentError;
  }
}

function logResendError(context: string, error: unknown) {
  const resendError = error as ErrorResponse | undefined;
  console.error(`[teachers-newsletter] ${context}`, {
    name: resendError?.name,
    message: resendError?.message,
    statusCode: resendError?.statusCode,
  });
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const now = Date.now();
  const entry = attempts.get(ip);
  if (entry && entry.until > now && entry.count >= 3) {
    return NextResponse.json(
      { error: "Zbyt wiele prób. Poczekaj chwilę." },
      { status: 429 }
    );
  }
  attempts.set(
    ip,
    !entry || entry.until <= now
      ? { count: 1, until: now + 3_600_000 }
      : { ...entry, count: entry.count + 1 }
  );

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.hp) return NextResponse.json({ success: true });

  const email = clean(body.email).toLowerCase();
  const country = clean(body.country);
  const stage = clean(body.stage);
  const locale = clean(body.locale) || "pl";
  const pilot = body.pilot === true;
  const consent = body.consent === true;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres email" },
      { status: 422 }
    );
  }
  if (!country || !stage || !consent) {
    return NextResponse.json(
      { error: "To pole jest wymagane" },
      { status: 422 }
    );
  }

  if (!isConfigured()) {
    console.error(
      "[teachers-newsletter] Missing RESEND_API_KEY or RESEND_TEACHERS_SEGMENT_ID"
    );
    return NextResponse.json(
      { error: "Newsletter nie jest jeszcze skonfigurowany." },
      { status: 503 }
    );
  }

  const segmentId = process.env.RESEND_TEACHERS_SEGMENT_ID!.trim();

  try {
    await prepareContactProperties();
    await saveContact({
      email,
      country,
      stage,
      pilot,
      locale,
      consentAt: new Date().toISOString(),
      segmentId,
    });
  } catch (error) {
    logResendError("contact save error", error);
    return NextResponse.json(
      { error: "Coś poszło nie tak. Spróbuj ponownie." },
      { status: 500 }
    );
  }

  const { error: emailError } = await resend.emails.send({
    from: "Eduria <hello@eduria.io>",
    to: email,
    subject:
      locale === "pl"
        ? "Witaj w gronie nauczycieli Eduria!"
        : "Welcome to Eduria for Teachers!",
    html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:40px;color:#24352d"><h1 style="color:#3A8A62">Eduria for Teachers</h1><p>${locale === "pl" ? "Dziękujemy za dołączenie do newslettera dla nauczycieli i szkół." : "Thank you for joining our newsletter for teachers and schools."}</p><p><b>${country}</b> · ${stage}</p><p>${locale === "pl" ? "Będziemy informować Cię o materiałach, konsultacjach i przyszłych pilotażach." : "We will share updates about materials, consultations and future pilots."}</p><p>Eduria Team</p></div>`,
  });

  if (emailError) logResendError("welcome email error", emailError);

  return NextResponse.json({ success: true });
}
