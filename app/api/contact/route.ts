import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  newsletter?: boolean;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, newsletter } = body as ContactPayload;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 422 });
  }

  // TODO: integrate Resend (npm install resend)
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Eduweer <noreply@eduweer.com>",
  //   to: process.env.CONTACT_EMAIL!,
  //   subject: `Wiadomość od ${name}`,
  //   text: `Od: ${name} <${email}>\n\n${message}`,
  // });

  console.log("[contact]", { name, email, newsletter, messageLength: message.length });

  return NextResponse.json({ ok: true });
}
