"use client";

import { type MouseEvent, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/features/shared/hooks/useReveal";

// ── Component ─────────────────────────────────────────────────────────────────

export function ContactCTA() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useReveal(rootRef);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const clamp = (v: number, l: number) => Math.max(-l, Math.min(l, v));

    function onMove(e: globalThis.MouseEvent) {
      const rect = card!.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        card!.style.transition = "transform .55s cubic-bezier(.2,.8,.2,1)";
        card!.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        if (shineRef.current) shineRef.current.style.opacity = "0";
        if (orb1Ref.current) orb1Ref.current.style.transform = "translate(0,0)";
        if (orb2Ref.current) orb2Ref.current.style.transform = "translate(0,0)";
        if (orb3Ref.current) orb3Ref.current.style.transform = "translate(0,0)";
        return;
      }

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = (x - rect.width / 2) / (rect.width / 2);
      const dy = (y - rect.height / 2) / (rect.height / 2);

      // 3D tilt — instant while moving, smooth on leave
      card!.style.transition = "none";
      card!.style.transform = `perspective(1000px) rotateX(${clamp(dy * -3, 3)}deg) rotateY(${clamp(dx * 3.5, 3.5)}deg)`;

      // Cursor light reflection (shine)
      if (shineRef.current) {
        shineRef.current.style.opacity = "1";
        shineRef.current.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 52%)`;
      }

      // Orb parallax
      if (orb1Ref.current)
        orb1Ref.current.style.transform = `translate(${dx * -36}px, ${dy * -24}px)`;
      if (orb2Ref.current)
        orb2Ref.current.style.transform = `translate(${dx * 42}px, ${dy * 30}px)`;
      if (orb3Ref.current)
        orb3Ref.current.style.transform = `translate(${dx * -18}px, ${dy * 36}px)`;
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={rootRef}
      style={{ maxWidth: "1120px", margin: "0 auto", padding: "clamp(80px, 12vw, 140px) 24px clamp(60px, 8vw, 100px)" }}
    >
      {/* Reveal wrapper — no overflow so glass card edges stay crisp */}
      <div data-reveal>
        {/* ── Single liquid glass card ── */}
        <div
          ref={cardRef}
          style={{
            position: "relative",
            borderRadius: "28px",
            overflow: "hidden",
            textAlign: "center",
            willChange: "transform",
            backdropFilter: "blur(36px) saturate(2) brightness(1.02)",
            WebkitBackdropFilter: "blur(36px) saturate(2) brightness(1.02)",
            background: "var(--nav-glass-bg)",
            border: "1px solid rgba(255,185,80,0.2)",
            boxShadow:
              "inset 0 1.5px 0 rgba(255,230,140,0.2), " +
              "inset 0 -1px 0 rgba(200,110,40,0.08), " +
              "0 16px 64px rgba(251,191,36,0.1), " +
              "0 6px 24px rgba(249,115,22,0.07), " +
              "var(--nav-shadow)",
          }}
        >
          {/* ── Amber orb ── */}
          <div
            ref={orb1Ref}
            aria-hidden
            style={{
              position: "absolute",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 0,
              width: "560px",
              height: "560px",
              background:
                "radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(245,158,11,0.15) 50%, transparent 70%)",
              top: "-230px",
              left: "-145px",
              filter: "blur(12px)",
              animation: "orbBreath 9s ease-in-out infinite",
              transition: "transform 1.1s cubic-bezier(.2,.8,.2,1)",
            }}
          />

          {/* ── Orange orb ── */}
          <div
            ref={orb2Ref}
            aria-hidden
            style={{
              position: "absolute",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 0,
              width: "470px",
              height: "470px",
              background:
                "radial-gradient(circle, rgba(249,115,22,0.33) 0%, rgba(234,88,12,0.12) 50%, transparent 70%)",
              bottom: "-185px",
              right: "-125px",
              filter: "blur(16px)",
              animation: "orbBreath 11s ease-in-out 3s infinite",
              transition: "transform 1.1s cubic-bezier(.2,.8,.2,1)",
            }}
          />

          {/* ── Rose orb ── */}
          <div
            ref={orb3Ref}
            aria-hidden
            style={{
              position: "absolute",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 0,
              width: "350px",
              height: "350px",
              background:
                "radial-gradient(circle, rgba(236,72,153,0.24) 0%, rgba(219,39,119,0.09) 50%, transparent 70%)",
              top: "28%",
              left: "50%",
              filter: "blur(24px)",
              animation: "orbBreath 7s ease-in-out 1.5s infinite",
              transition: "transform 1.1s cubic-bezier(.2,.8,.2,1)",
            }}
          />

          {/* ── Cursor light reflection ── */}
          <div
            ref={shineRef}
            aria-hidden
            style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, transition: "opacity 350ms ease", opacity: 0 }}
          />

          {/* ── Periodic glass shimmer sweep ── */}
          <div
            aria-hidden
            style={{ position: "absolute", top: 0, bottom: 0, width: "22%", pointerEvents: "none", zIndex: 1,
              left: "-30%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
              animation: "glassShimmer 8s ease-in-out 1.5s infinite",
            }}
          />

          {/* ── Warm dot grid ── */}
          <div
            aria-hidden
            style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(200,150,60,0.13) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse at center, black 15%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 15%, transparent 72%)",
            }}
          />

          {/* ── Content ── */}
          <div
            style={{ position: "relative", zIndex: 2, padding: "clamp(60px, 9vw, 108px) clamp(28px, 5vw, 64px)" }}
          >
            <h2
              className="font-display text-primary"
              style={{
                fontWeight: 600,
                letterSpacing: "-0.03em",
                marginBottom: "20px",
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                textWrap: "balance" as never,
              }}
            >
              Let&apos;s build something durable.
            </h2>

            <p
              className="text-secondary"
              style={{ maxWidth: "480px", margin: "0 auto", marginBottom: "44px", fontSize: "clamp(1rem, 2vw, 1.18rem)", lineHeight: 1.65 }}
            >
              Have a project in mind or just want to talk shop? I&apos;m always
              open to a good conversation.
            </p>

            <CTAButton href="/contact">
              Start a conversation <ArrowRight size={16} style={{ display: "inline", verticalAlign: "middle", marginLeft: "2px" }} />
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTAButton — neutral accent color (same recipe as header "Log in") ─────────

function CTAButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    const clamp = (v: number, lim: number) => Math.max(-lim, Math.min(lim, v));
    el.style.transform = `translate(${clamp(x * 0.08, 5)}px, ${clamp(y * 0.1, 4)}px) translateY(-1px)`;
  }

  return (
    <Link
      href={href}
      className="bg-accent text-accent-contrast"
      style={{ display: "inline-flex", alignItems: "center", gap: "9px", height: "52px", padding: "0 32px", borderRadius: "14px", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em", willChange: "transform",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.1)",
        transition:
          "transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease, opacity .2s ease",
      }}
      onMouseMove={onMove}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.14)";
        e.currentTarget.style.opacity = "0.88";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow =
          "0 4px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.1)";
        e.currentTarget.style.opacity = "1";
      }}
    >
      {children}
    </Link>
  );
}
