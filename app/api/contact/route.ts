import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactEmail } from "@/emails/ContactEmail";
import { isAllowed, getClientIp } from "@/lib/rate-limit";

// ── Validation constants ──────────────────────────────────────────────────────

const MAX_NAME_LENGTH    = 100;
const MAX_EMAIL_LENGTH   = 254; // RFC 5321
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

// ── Resend client ─────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const OWNER_EMAIL    = process.env.OWNER_EMAIL;
const FROM_EMAIL     = process.env.FROM_EMAIL;

// Instantiate once at module level — not inside the handler —
// so the SDK connection is reused across warm invocations.
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// ── Helpers ───────────────────────────────────────────────────────────────────

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── 1. Env guard ─────────────────────────────────────────────────────────
  if (!resend || !OWNER_EMAIL || !FROM_EMAIL) {
    console.error("[contact] Missing required environment variables");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // ── 2. Rate limiting ──────────────────────────────────────────────────────
  const clientIp = getClientIp(req);
  if (!isAllowed(clientIp, "contact")) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429 },
    );
  }

  // ── 3. Parse + honeypot check ─────────────────────────────────────────────
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, message, website } = body;

  // Honeypot: bots fill this hidden field, humans leave it blank
  if (website) {
    // Silently succeed so bots think the submission worked
    return NextResponse.json({ success: true });
  }

  // ── 4. Server-side validation ─────────────────────────────────────────────
  const trimmedName    = name?.trim()    ?? "";
  const trimmedEmail   = email?.trim()   ?? "";
  const trimmedSubject = subject?.trim() ?? "";
  const trimmedMessage = message?.trim() ?? "";

  if (!trimmedName || trimmedName.length < 2)
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  if (trimmedName.length > MAX_NAME_LENGTH)
    return NextResponse.json({ error: "Name too long" }, { status: 400 });

  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail))
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  if (trimmedEmail.length > MAX_EMAIL_LENGTH)
    return NextResponse.json({ error: "Email too long" }, { status: 400 });

  if (trimmedSubject.length > MAX_SUBJECT_LENGTH)
    return NextResponse.json({ error: "Subject too long" }, { status: 400 });

  if (!trimmedMessage || trimmedMessage.length < 20)
    return NextResponse.json({ error: "Message too short" }, { status: 400 });
  if (trimmedMessage.length > MAX_MESSAGE_LENGTH)
    return NextResponse.json({ error: "Message too long" }, { status: 400 });

  // ── 5. Send email ─────────────────────────────────────────────────────────
  try {
    const safeName    = escapeHtml(trimmedName);
    const safeSubject = escapeHtml(trimmedSubject || "No subject");
    const safeMessage = trimmedMessage; // React Email handles its own escaping

    await resend.emails.send({
      from:    `Portfolio Contact <${FROM_EMAIL}>`,
      to:      [OWNER_EMAIL],
      replyTo: trimmedEmail,
      subject: `[Portfolio] ${safeSubject} — from ${safeName}`,
      react:   ContactEmail({
        name:    safeName,
        email:   trimmedEmail,
        subject: safeSubject,
        message: safeMessage,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    // Log safely — avoid logging request data that may contain PII
    console.error("[contact] Email send failed:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
