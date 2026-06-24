import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { NotifyOwnerEmail } from "@/emails/NotifyOwnerEmail";
import { NotifyConfirmEmail } from "@/emails/NotifyConfirmEmail";
import { site } from "@/config/site";
import { isAllowed, getClientIp } from "@/lib/rate-limit";

const MAX_EMAIL_LENGTH = 254; // RFC 5321

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const OWNER_EMAIL    = process.env.OWNER_EMAIL;
const FROM_EMAIL     = process.env.FROM_EMAIL;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  // ── 1. Env guard ─────────────────────────────────────────────────────────
  if (!resend || !OWNER_EMAIL || !FROM_EMAIL) {
    console.error("[notify] Missing required environment variables");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // ── 2. Rate limiting ──────────────────────────────────────────────────────
  const clientIp = getClientIp(req);
  if (!isAllowed(clientIp, "notify")) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429 },
    );
  }

  // ── 3. Parse body ─────────────────────────────────────────────────────────
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // ── 4. Validate email ─────────────────────────────────────────────────────
  const trimmedEmail = body.email?.trim() ?? "";

  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail))
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  if (trimmedEmail.length > MAX_EMAIL_LENGTH)
    return NextResponse.json({ error: "Email too long" }, { status: 400 });

  // ── 5. Send both emails ───────────────────────────────────────────────────
  try {
    await Promise.all([
      resend.emails.send({
        from:    `Portfolio <${FROM_EMAIL}>`,
        to:      [OWNER_EMAIL],
        subject: "[Portfolio] New project notification signup",
        react:   NotifyOwnerEmail({ subscriberEmail: trimmedEmail }),
      }),
      resend.emails.send({
        from:    `${site.name} <${FROM_EMAIL}>`,
        to:      [trimmedEmail],
        subject: "You're on the list 🚀",
        react:   NotifyConfirmEmail({ email: trimmedEmail }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[notify] Email send failed:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
