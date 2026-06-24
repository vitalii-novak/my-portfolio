"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { site } from "@/config/site";
import type { GhostCardData } from "./types";
import { PHRASES, GHOST_CARDS } from "./constants";

// ── Component ─────────────────────────────────────────────────────────────────

export function ProjectsComingSoon() {
  // Parallax orbs
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);

  // Rotating phrase
  const [phraseIdx,    setPhraseIdx]    = useState(0);
  const [phraseFading, setPhraseFading] = useState(false);

  // Email form
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [notifyErr, setNotifyErr] = useState(false);

  // Orb parallax
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const dx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const dy = (e.clientY / window.innerHeight - 0.5) * 2;
      if (orb1.current) orb1.current.style.transform = `translate(${dx * -30}px, ${dy * -20}px)`;
      if (orb2.current) orb2.current.style.transform = `translate(${dx *  24}px, ${dy *  18}px)`;
      if (orb3.current) orb3.current.style.transform = `translate(${dx * -18}px, ${dy *  26}px)`;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Phrase rotator
  useEffect(() => {
    const id = setInterval(() => {
      setPhraseFading(true);
      setTimeout(() => {
        setPhraseIdx(i => (i + 1) % PHRASES.length);
        setPhraseFading(false);
      }, 320);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setNotifyErr(false);
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setNotifyErr(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <main style={{ position: "relative", overflow: "hidden" }}>
      {/* ── Background orbs ──────────────────────────────────────────── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div ref={orb1} style={{ position: "absolute", borderRadius: "50%", willChange: "transform", animation: "orbBreath 11s ease-in-out infinite", top: "-10%", left: "-8%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 68%)", filter: "blur(60px)", transition: "transform 1.5s cubic-bezier(.2,.8,.2,1)" }} />
        <div ref={orb2} style={{ position: "absolute", borderRadius: "50%", willChange: "transform", animation: "orbBreath 14s ease-in-out 2s infinite", top: "20%", right: "-6%", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 68%)", filter: "blur(56px)", transition: "transform 1.5s cubic-bezier(.2,.8,.2,1)" }} />
        <div ref={orb3} style={{ position: "absolute", borderRadius: "50%", willChange: "transform", animation: "orbBreath 10s ease-in-out 4s infinite", bottom: "10%", left: "35%", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(245,158,11,0.13) 0%, transparent 68%)", filter: "blur(64px)", transition: "transform 1.5s cubic-bezier(.2,.8,.2,1)" }} />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", maxWidth: "820px", margin: "0 auto", padding: "clamp(100px, 15vh, 140px) 24px clamp(60px, 8vw, 100px)" }}
      >
        {/* Label */}
        <p
          className="font-mono text-muted"
          style={{ fontSize: "12.5px", letterSpacing: ".14em", marginBottom: "28px", animation: "pageIn .6s ease both" }}
        >
          / PROJECTS
        </p>

        {/* Heading */}
        <h1
          className="font-display"
          style={{
            fontWeight: 600,
            letterSpacing: "-0.04em",
            marginBottom: "16px",
            fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)",
            lineHeight: 1.06,
            animation: "pageIn .7s ease .08s both",
          }}
        >
          We&apos;re building
        </h1>

        {/* Animated rotating phrase with gradient */}
        <div
          className="font-display"
          style={{ fontWeight: 600, letterSpacing: "-0.04em", marginBottom: "32px",
            fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)",
            lineHeight: 1.06,
            minHeight: "1.2em",
            animation: "pageIn .7s ease .12s both",
          }}
        >
          <span style={{
            background: "linear-gradient(90deg, #60a5fa, #a78bfa, #e879f9, #f472b6, #a78bfa, #60a5fa)",
            backgroundSize: "200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientFlow 5s linear infinite",
            filter: "drop-shadow(0 0 20px rgba(167,139,250,0.3))",
            display: "inline-block",
            transition: "opacity .3s ease",
            opacity: phraseFading ? 0 : 1,
          }}>
            {PHRASES[phraseIdx]}
          </span>
        </div>

        {/* Subtitle */}
        <p
          className="text-secondary"
          style={{
            marginBottom: "12px",
            maxWidth: "480px",
            fontSize: "clamp(1rem, 2vw, 1.18rem)",
            lineHeight: 1.65,
            animation: "pageIn .7s ease .18s both",
          }}
        >
          Carefully crafted case studies are on their way. New projects landing in {site.projectsLaunchDate}.
        </p>

        {/* Status badge */}
        <div
          className="font-mono text-muted"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "40px", fontSize: "12px", animation: "pageIn .7s ease .22s both" }}
        >
          <span
            style={{ width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0, background: "#22c55e", animation: "pulseDot 2.4s ease-in-out infinite" }}
          />
          3 projects in active development
        </div>

        {/* Email notify form */}
        <div
          style={{ width: "100%", maxWidth: "420px", animation: "pageIn .7s ease .28s both" }}
        >
          {submitted ? (
            <div
              className="bg-elevated"
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "18px",
                borderRadius: "20px",
                overflow: "hidden",
                padding: "28px 24px",
                border: "1px solid #22c55e33",
                animation: "scaleIn .45s cubic-bezier(.2,.8,.2,1) both",
              }}
            >
              {/* Glow */}
              <div aria-hidden style={{ position: "absolute", top: "-50px", left: "50%", transform: "translateX(-50%)", width: "200px", height: "200px", borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)" }} />

              {/* Animated check */}
              <div style={{ position: "relative" }}>
                <div aria-hidden style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid #22c55e55", animation: "rippleOut 1.6s ease-out .1s both" }} />
                <div aria-hidden style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid #22c55e33", animation: "rippleOut 1.6s ease-out .4s both" }} />
                <CheckCircle2
                  size={52}
                  strokeWidth={1.5}
                  style={{
                    display: "block",
                    color: "#22c55e",
                    filter: "drop-shadow(0 0 12px rgba(34,197,94,0.5))",
                    animation: "scaleIn .4s cubic-bezier(.2,.8,.2,1) .1s both",
                  }}
                />
              </div>

              <div style={{ textAlign: "center", animation: "pageIn .4s ease .25s both" }}>
                <p className="font-display" style={{ fontWeight: 600, fontSize: "1.15rem", letterSpacing: "-0.015em", marginBottom: "7px" }}>
                  You&apos;re on the list!
                </p>
                <p className="text-secondary" style={{ fontSize: "13.5px", lineHeight: 1.55 }}>
                  I&apos;ll send you an email the moment projects go live.
                  <br />
                  <span className="font-mono" style={{ fontSize: "12px", color: "#22c55e" }}>
                    ↗ Check your inbox for a confirmation
                  </span>
                </p>
              </div>

              <div
                className="font-mono text-muted border-border-default"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11.5px",
                  borderRadius: "50px",
                  border: "1px solid var(--border)",
                  padding: "5px 12px",
                  animation: "pageIn .4s ease .35s both",
                }}
              >
                🚀 Expected {site.projectsLaunchDate}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-elevated text-primary"
                style={{
                  flex: 1,
                  height: "52px",
                  borderRadius: "13px",
                  fontSize: "15px",
                  outline: "none",
                  transition: "border-color 200ms ease, box-shadow 200ms ease",
                  padding: "0 18px",
                  border: "1px solid var(--border)",
                  fontFamily: "inherit",
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = "var(--text-3)";
                  e.currentTarget.style.boxShadow  = "0 0 0 3px var(--border)";
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow  = "none";
                }}
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-accent text-accent-contrast"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "52px",
                  padding: "0 22px",
                  borderRadius: "13px",
                  border: 0,
                  fontSize: "14px",
                  fontWeight: 600,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  transition: "opacity 200ms ease",
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.7 : 1,
                }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.opacity = "1"; }}
              >
                {sending ? (
                  <>
                    <Loader2 size={15} style={{ flexShrink: 0, animation: "spin .7s linear infinite" }} />
                    Sending…
                  </>
                ) : (
                  <>Notify me <ArrowRight size={15} /></>
                )}
              </button>
            </form>
          )}
          {notifyErr && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                marginTop: "10px",
                borderRadius: "12px",
                padding: "11px 14px",
                border: "1px solid #ef444433",
                background: "#ef44440d",
                animation: "scaleIn .3s ease both",
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: "1px", color: "#ef4444" }} />
              <p className="text-secondary" style={{ fontSize: "12.5px", lineHeight: 1.5 }}>
                Failed to subscribe. Try again or email me at{" "}
                <a href={`mailto:${site.email}`} style={{ textDecoration: "none", color: "#ef4444" }}>
                  {site.email}
                </a>
              </p>
            </div>
          )}
          <p className="font-mono text-muted" style={{ fontSize: "12px", marginTop: "10px", textAlign: "center" }}>
            No spam, ever. Unsubscribe any time.
          </p>
        </div>
      </section>

      {/* ── Ghost project cards ───────────────────────────────────────── */}
      <section
        style={{ position: "relative", zIndex: 1, maxWidth: "1120px", margin: "0 auto", padding: "0 24px clamp(80px, 12vw, 140px)" }}
      >
        <div className="font-mono text-muted" style={{ fontSize: "11px", letterSpacing: ".14em", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
          / SNEAK PEEK
          <span style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        <div
          style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {GHOST_CARDS.map((card, i) => (
            <GhostCard key={i} card={card} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

// ── GhostCard ─────────────────────────────────────────────────────────────────

function GhostCard({
  card,
  index,
}: {
  card: GhostCardData;
  index: number;
}) {
  return (
    <div
      className="border-border-default bg-elevated"
      style={{
        position: "relative",
        border: "1px solid var(--border)",
        borderRadius: "18px",
        padding: "24px",
        cursor: "default",
        overflow: "hidden",
        filter: "blur(3px)",
        opacity: 0.45,
        transform: "scale(0.98)",
        transition: "filter .4s ease, opacity .4s ease, transform .4s ease, border-color .3s ease",
        animation: `pageIn .7s ease ${0.32 + index * 0.08}s both`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.filter = "blur(0px)";
        el.style.opacity = "0.7";
        el.style.transform = "scale(1) translateY(-4px)";
        el.style.borderColor = `${card.accent}55`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.filter = "blur(3px)";
        el.style.opacity = "0.45";
        el.style.transform = "scale(0.98) translateY(0)";
        el.style.borderColor = "var(--border)";
      }}
    >
      {/* Accent top bar */}
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", borderRadius: "18px 18px 0 0", background: `linear-gradient(to right, ${card.accent}, ${card.accent}88)` }}
      />

      {/* Lock overlay */}
      <div className="bg-panel border-border-default text-muted" style={{ position: "absolute", top: "16px", right: "16px", width: "28px", height: "28px", borderRadius: "8px", border: "1px solid var(--border)", display: "grid", placeItems: "center" }}>
        <Lock size={13} />
      </div>

      {/* Placeholder content */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ width: "65%", height: "20px", borderRadius: "6px", marginBottom: "10px", background: "var(--border)" }} />
        <div style={{ width: "85%", height: "13px", borderRadius: "5px", marginBottom: "6px", background: "var(--border-2)" }} />
        <div style={{ width: "70%", height: "13px", borderRadius: "5px", background: "var(--border-2)" }} />
      </div>

      {/* Tech tags (readable — creates intrigue) */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "18px" }}>
        {card.tags.map(tag => (
          <span
            key={tag}
            className="font-mono text-muted border-border-default bg-panel"
            style={{ fontSize: "12px", border: "1px solid var(--border)", borderRadius: "7px", padding: "4px 10px" }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="font-mono"
        style={{ marginTop: "18px", fontSize: "11px", letterSpacing: ".06em", color: `${card.accent}aa` }}
      >
        Coming {site.projectsLaunchDate}
      </div>
    </div>
  );
}
