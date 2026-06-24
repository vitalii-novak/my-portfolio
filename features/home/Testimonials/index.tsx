"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReveal } from "@/features/shared/hooks/useReveal";

// ── Data ──────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      "Vitalii delivered in record time without cutting corners. The codebase he left behind is a genuine pleasure to work with — clear, fast, and well-tested.",
    name: "Sarah Chen",
    role: "CTO at StreamSync",
    initials: "SC",
    from: "#6366f1",
    to: "#8b5cf6",
    ring: "rgba(99,102,241,0.22)",
  },
  {
    quote:
      "Rare to find someone equally strong on architecture and pixel-perfect UI. A genuine full-stack mind who makes the right tradeoffs under pressure.",
    name: "Marcus Reinholt",
    role: "Founder, DataFlow Labs",
    initials: "MR",
    from: "#0ea5e9",
    to: "#14b8a6",
    ring: "rgba(14,165,233,0.22)",
  },
  {
    quote:
      "He took our vague brief and turned it into a system we still rely on two years later. No hand-holding needed — just results.",
    name: "Priya Anand",
    role: "Product Lead, ShopKit",
    initials: "PA",
    from: "#10b981",
    to: "#22d3ee",
    ring: "rgba(16,185,129,0.22)",
  },
] as const;

const TOTAL = TESTIMONIALS.length;

// ── Component ─────────────────────────────────────────────────────────────────

export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (fading) return;
      setFading(true);
      timerRef.current = setTimeout(() => {
        setIdx(next);
        setFading(false);
      }, 260);
    },
    [fading],
  );

  const prev = useCallback(() => goTo((idx - 1 + TOTAL) % TOTAL), [idx, goTo]);
  const next = useCallback(() => goTo((idx + 1) % TOTAL), [idx, goTo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const activeTestimonial = TESTIMONIALS[idx];

  return (
    <section
      ref={rootRef}
      style={{ maxWidth: "1120px", margin: "0 auto", padding: "clamp(40px, 6vw, 72px) 24px clamp(80px, 12vw, 140px)" }}
    >
      {/* Section label */}
      <p
        data-reveal
        className="font-mono text-muted"
        style={{ fontSize: "12.5px", letterSpacing: ".14em", marginBottom: "32px" }}
      >
        / WHAT CLIENTS SAY
      </p>

      {/* Card */}
      <div
        data-reveal
        className="border-border-default bg-elevated"
        style={{ position: "relative", border: "1px solid var(--border)", borderRadius: "24px", overflow: "hidden", padding: "clamp(28px, 5vw, 56px)" }}
      >
        {/* Color accent bar — changes with active author */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            borderRadius: "24px 24px 0 0",
            transition: "background 550ms ease",
            background: `linear-gradient(to right, ${activeTestimonial.from}, ${activeTestimonial.to})`,
          }}
        />

        {/* ── Decorative background shapes ───────────────────────────────
             All use activeTestimonial.from for colour so they shift smoothly with the
             active author (transition on border/background props).
             floatY animation is GPU-composited (transform only).      */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {/* Dot grid — top-right corner, CSS-only */}
          <div style={{
            position: "absolute", top: "5%", right: "2%",
            width: "160px", height: "160px",
            backgroundImage: "radial-gradient(circle, #f9731628 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
            maskImage: "radial-gradient(ellipse at 90% 10%, black 20%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse at 90% 10%, black 20%, transparent 65%)",
          }} />

          {/* Large ring — top-right, slow float */}
          <div style={{ position: "absolute", borderRadius: "50%", willChange: "transform", animation: "floatY 10s ease-in-out infinite", top: "-55px", right: "-55px", width: "200px", height: "200px", border: "1.5px solid #f973161c" }} />

          {/* Medium ring — slightly inset, different phase */}
          <div style={{ position: "absolute", borderRadius: "50%", willChange: "transform", animation: "floatY 7.5s ease-in-out 1.8s infinite", top: "8px", right: "80px", width: "96px", height: "96px", border: "1.5px solid #f9731614" }} />

          {/* Small filled circle — middle-right */}
          <div style={{ position: "absolute", borderRadius: "50%", willChange: "transform", animation: "floatY 6.5s ease-in-out 0.6s infinite", top: "50%", right: "4%", width: "8px", height: "8px", background: "#f9731630" }} />

          {/* Diamond — bottom-left */}
          <div style={{ position: "absolute", borderRadius: "2px", willChange: "transform", animation: "floatY 8.5s ease-in-out 2.4s infinite", bottom: "22%", left: "3%", width: "10px", height: "10px", background: "#f9731626", transform: "rotate(45deg)" }} />

          {/* Tiny dot — bottom-center */}
          <div style={{ position: "absolute", borderRadius: "50%", willChange: "transform", animation: "floatY 9s ease-in-out 1.1s infinite", bottom: "30%", left: "35%", width: "5px", height: "5px", background: "#f9731620" }} />

          {/* Ambient glow — top-left corner */}
          <div style={{ position: "absolute", borderRadius: "50%", top: "-80px", left: "-80px", width: "300px", height: "300px", background: "radial-gradient(circle, #f973160a 0%, transparent 70%)" }} />
        </div>

        {/* Decorative quote glyph */}
        <div
          aria-hidden
          className="font-display text-border-default"
          style={{
            position: "absolute",
            top: "18px",
            right: "clamp(24px, 4vw, 44px)",
            fontWeight: 700,
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "-0.04em",
            fontSize: "clamp(72px, 14vw, 110px)",
            lineHeight: 0.8,
          }}
        >
          &ldquo;
        </div>

        {/* Fading content */}
        <div style={{ transition: "opacity .28s ease", opacity: fading ? 0 : 1 }}>
          {/* Quote */}
          <p
            className="font-display"
            style={{
              fontWeight: 500,
              letterSpacing: "-0.02em",
              maxWidth: "70ch",
              fontSize: "clamp(1.15rem, 2.8vw, 1.82rem)",
              lineHeight: 1.38,
              textWrap: "balance" as never,
              marginBottom: "clamp(22px, 3.5vw, 34px)",
            }}
          >
            {activeTestimonial.quote}
          </p>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Gradient avatar */}
            <div
              className="font-mono text-white"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontSize: "13px",
                fontWeight: 700,
                flexShrink: 0,
                transition: "background 550ms ease, box-shadow 550ms ease",
                background: `linear-gradient(135deg, ${activeTestimonial.from}, ${activeTestimonial.to})`,
                boxShadow: `0 0 0 3px ${activeTestimonial.ring}`,
              }}
            >
              {activeTestimonial.initials}
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: "14.5px", lineHeight: 1.3 }}>
                {activeTestimonial.name}
              </div>
              <div className="text-muted" style={{ fontSize: "13px", marginTop: "2px" }}>
                {activeTestimonial.role}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginTop: "clamp(22px, 4vw, 38px)" }}
        >
          {/* Dot indicators */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {TESTIMONIALS.map((testimonial, testimonialIndex) => (
              <button
                key={testimonialIndex}
                onClick={() => goTo(testimonialIndex)}
                aria-label={`Testimonial ${testimonialIndex + 1}`}
                style={{
                  height: "6px",
                  borderRadius: "3px",
                  border: 0,
                  padding: 0,
                  cursor: "pointer",
                  width: testimonialIndex === idx ? "22px" : "6px",
                  background:
                    testimonialIndex === idx
                      ? `linear-gradient(to right, ${testimonial.from}, ${testimonial.to})`
                      : "var(--border)",
                  transition: "width .3s cubic-bezier(.2,.8,.2,1), background .55s ease",
                }}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div style={{ display: "flex", gap: "8px" }}>
            <NavBtn onClick={prev} title="Previous">
              <ArrowLeft size={16} />
            </NavBtn>
            <NavBtn onClick={next} title="Next">
              <ArrowRight size={16} />
            </NavBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── NavBtn ────────────────────────────────────────────────────────────────────

function NavBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="border-border-default text-primary"
      style={{ display: "grid", placeItems: "center", width: "40px", height: "40px", borderRadius: "10px", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", transition: "border-color 200ms ease, background 200ms ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--text-3)";
        e.currentTarget.style.background = "var(--panel)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
}
