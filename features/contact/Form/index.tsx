"use client";

import { type FormEvent, useState, useRef } from "react";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { useReveal } from "@/features/shared/hooks/useReveal";
import { site } from "@/config/site";
import type { FormValues, FormStatus, FormFieldProps } from "./types";
import { MAX_MSG, validate } from "./constants";

// ── ContactForm ───────────────────────────────────────────────────────────────


export function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot — must stay empty
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [touched, setTouched] = useState<Set<keyof FormValues>>(new Set());
  const [status, setStatus] = useState<FormStatus>("idle");
  const [msgFocused, setMsgFocused] = useState(false);

  function setField(field: keyof FormValues, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched.has(field)) {
      const errs = validate(next);
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  }

  function touchField(field: keyof FormValues) {
    setTouched((prev) => new Set([...prev, field]));
    const errs = validate(values);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const allFields = new Set<keyof FormValues>([
      "name",
      "email",
      "subject",
      "message",
    ]);
    setTouched(allFields);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  if (status === "success") {
    const firstName = values.name.split(" ")[0];
    return (
      <section
        className="bg-elevated"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "28px",
          borderRadius: "24px",
          overflow: "hidden",
          padding: "clamp(36px, 5vw, 52px)",
          border: "1px solid #22c55e33",
          animation: "scaleIn .45s cubic-bezier(.2,.8,.2,1) both",
        }}
      >
        {/* Subtle green ambient glow */}
        <div aria-hidden style={{ position: "absolute", top: "-60px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)" }} />

        {/* Success icon with ripple rings */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid #22c55e55", animation: "rippleOut 1.8s ease-out .2s both" }} />
          <div aria-hidden style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid #22c55e33", animation: "rippleOut 1.8s ease-out .5s both" }} />
          <CheckCircle2
            size={56}
            strokeWidth={1.5}
            style={{
              display: "block",
              color: "#22c55e",
              filter: "drop-shadow(0 0 14px rgba(34,197,94,0.5))",
              animation: "scaleIn .4s cubic-bezier(.2,.8,.2,1) .1s both",
            }}
          />
        </div>

        {/* Text content — staggered */}
        <div>
          <h2
            className="font-display"
            style={{
              fontWeight: 600,
              letterSpacing: "-0.025em",
              marginBottom: "10px",
              fontSize: "clamp(1.4rem, 3vw, 1.75rem)",
              animation: "pageIn .5s ease .2s both",
            }}
          >
            Message sent!
          </h2>
          <p
            className="text-secondary"
            style={{
              fontSize: "15px",
              maxWidth: "400px",
              lineHeight: 1.65,
              animation: "pageIn .5s ease .3s both",
            }}
          >
            Thanks for reaching out, <strong>{firstName}</strong>. I read every
            message personally and will reply within 24 hours.
          </p>
        </div>

        {/* 24h badge */}
        <div
          className="font-mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            borderRadius: "50px",
            padding: "7px 14px",
            border: "1px solid #22c55e33",
            background: "#22c55e0d",
            color: "#22c55e",
            animation: "pageIn .5s ease .38s both",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0, background: "#22c55e", animation: "pulseDot 2.4s ease-in-out infinite" }} />
          Typically responds within 24 hours
        </div>

        {/* Reset button */}
        <button
          onClick={() => {
            setStatus("idle");
            setValues({ name: "", email: "", subject: "", message: "", website: "" });
            setErrors({});
            setTouched(new Set());
          }}
          className="text-secondary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            background: "transparent",
            borderRadius: "10px",
            fontSize: "13.5px",
            fontWeight: 500,
            cursor: "pointer",
            border: "1px solid var(--border)",
            padding: "9px 18px",
            transition: "border-color .2s ease, color .2s ease, background .2s ease",
            animation: "pageIn .5s ease .44s both",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--text-3)";
            e.currentTarget.style.color = "var(--text)";
            e.currentTarget.style.background = "var(--panel)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-2)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          Send another message
        </button>
      </section>
    );
  }

  return (
    <section ref={ref}>
      <form onSubmit={handleSubmit} noValidate>
        {/*
          Honeypot field — completely hidden from real users via CSS.
          Bots that auto-fill forms will populate this field.
          The server rejects any submission where `website` is non-empty.
          Do NOT use display:none — some bots skip those. Use visual hiding instead.
        */}
        <div style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden>
          <label htmlFor="hp-website">Website</label>
          <input
            id="hp-website"
            name="website"
            type="text"
            value={values.website}
            onChange={(e) => setField("website", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        {/* Name + Email */}
        <div
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <FormField
            label="Name"
            name="name"
            value={values.name}
            placeholder="Your name"
            error={errors.name}
            onChange={(v) => setField("name", v)}
            onBlur={() => touchField("name")}
            disabled={isSubmitting}
            required
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            placeholder="your@email.com"
            error={errors.email}
            onChange={(v) => setField("email", v)}
            onBlur={() => touchField("email")}
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Subject */}
        <div data-reveal style={{ marginBottom: "16px" }}>
          <FormField
            label="Subject (optional)"
            name="subject"
            value={values.subject}
            placeholder="What's this about?"
            onChange={(v) => setField("subject", v)}
            disabled={isSubmitting}
          />
        </div>

        {/* Message */}
        <div data-reveal style={{ marginBottom: "32px" }}>
          <label
            htmlFor="message"
            className="font-mono"
            style={{ display: "block", fontSize: "11px", letterSpacing: ".12em", marginBottom: "8px", textTransform: "uppercase", transition: "color 200ms ease", color: msgFocused ? "var(--text-2)" : "var(--text-3)" }}
          >
            Message{" "}
            <span className="text-muted">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
            onFocus={() => setMsgFocused(true)}
            onBlur={() => {
              setMsgFocused(false);
              touchField("message");
            }}
            placeholder="Tell me about your project, timeline, and what you're looking to achieve..."
            rows={7}
            maxLength={MAX_MSG}
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "16px 18px",
              background: "var(--bg-elev)",
              border: `1.5px solid ${
                errors.message
                  ? "#ef4444"
                  : msgFocused
                    ? "var(--text)"
                    : "var(--border)"
              }`,
              borderRadius: "14px",
              color: "var(--text)",
              fontSize: "15px",
              fontFamily: "inherit",
              lineHeight: 1.6,
              resize: "vertical",
              outline: "none",
              boxShadow:
                msgFocused && !errors.message ? "0 0 0 3px var(--border)" : "none",
              transition: "border-color .2s ease, box-shadow .2s ease",
              minHeight: "160px",
              opacity: isSubmitting ? 0.6 : 1,
            }}
          />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginTop: "6px", gap: "12px" }}>
            {errors.message ? (
              <span style={{ fontSize: "12.5px", color: "#ef4444", lineHeight: 1.4 }}>
                {errors.message}
              </span>
            ) : (
              <span />
            )}
            <span
              className="font-mono"
              style={{ fontSize: "12px", flexShrink: 0,
                color:
                  values.message.length > MAX_MSG * 0.9
                    ? "#f59e0b"
                    : "var(--text-3)",
              }}
            >
              {values.message.length}/{MAX_MSG}
            </span>
          </div>
        </div>

        {/* Submit row */}
        <div data-reveal style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-accent-contrast"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              height: "52px",
              padding: "0 32px",
              borderRadius: "14px",
              fontSize: "15px",
              fontWeight: 600,
              border: 0,
              letterSpacing: "-0.01em",
              transition: "opacity 200ms ease",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.currentTarget.style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) e.currentTarget.style.opacity = "1";
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2
                  size={16}
                  style={{ flexShrink: 0, animation: "spin .7s linear infinite" }}
                />
                Sending…
              </>
            ) : (
              <>Send message <ArrowRight size={15} style={{ display: "inline", verticalAlign: "middle", marginLeft: "2px" }} /></>
            )}
          </button>

          {status === "error" && (
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              borderRadius: "12px",
              padding: "12px 16px",
              border: "1px solid #ef444433",
              background: "#ef44440d",
              animation: "scaleIn .35s ease both",
            }}>
              <AlertCircle
                size={20}
                style={{ flexShrink: 0, color: "#ef4444" }}
              />
              <div>
                <p style={{ fontSize: "13.5px", fontWeight: 600, marginBottom: "3px", color: "#ef4444" }}>
                  Failed to send
                </p>
                <p className="text-muted" style={{ fontSize: "12.5px" }}>
                  Please try again or reach me directly at{" "}
                  <a href={`mailto:${site.email}`} style={{ textDecoration: "none", color: "#ef4444" }}>
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

// ── FormField ─────────────────────────────────────────────────────────────────

function FormField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
  onBlur,
  disabled,
  required,
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        htmlFor={name}
        className="font-mono"
        style={{ fontSize: "11px", letterSpacing: ".12em", textTransform: "uppercase", transition: "color 200ms ease", color: focused ? "var(--text-2)" : "var(--text-3)" }}
      >
        {label}
        {required && (
          <span className="text-muted" style={{ marginLeft: "3px" }}>*</span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={
          name === "email" ? "email" : name === "name" ? "name" : "off"
        }
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        style={{
          width: "100%",
          height: "52px",
          padding: "0 18px",
          background: "var(--bg-elev)",
          border: `1.5px solid ${
            error ? "#ef4444" : focused ? "var(--text)" : "var(--border)"
          }`,
          borderRadius: "14px",
          color: "var(--text)",
          fontSize: "15px",
          fontFamily: "inherit",
          outline: "none",
          boxShadow: focused && !error ? "0 0 0 3px var(--border)" : "none",
          transition: "border-color .2s ease, box-shadow .2s ease",
          opacity: disabled ? 0.6 : 1,
        }}
      />
      {error && (
        <span style={{ fontSize: "12.5px", color: "#ef4444", lineHeight: 1.4 }}>
          {error}
        </span>
      )}
    </div>
  );
}
