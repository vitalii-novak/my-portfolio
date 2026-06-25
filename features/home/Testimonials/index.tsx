"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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

// ── Component ─────────────────────────────────────────────────────────────────

export function Testimonials() {
  const rootRef   = useRef<HTMLElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const orb1Ref   = useRef<HTMLDivElement>(null);
  const orb2Ref   = useRef<HTMLDivElement>(null);
  const spotRef   = useRef<HTMLDivElement>(null);
  // Keep active colors accessible inside event listeners without re-binding
  const colorRef  = useRef<{ from: string; to: string }>({ from: TESTIMONIALS[0].from, to: TESTIMONIALS[0].to });
  useReveal(rootRef);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelectedIndex(idx);
    colorRef.current = { from: TESTIMONIALS[idx].from, to: TESTIMONIALS[idx].to };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); emblaApi.off("reInit", onSelect); };
  }, [emblaApi, onSelect]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft")  emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [emblaApi]);

  // ── Interactive background: cursor spotlight + orb parallax ────────────────
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    function onMove(e: MouseEvent) {
      const rect = card!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Out of card bounds
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        if (spotRef.current) spotRef.current.style.opacity = "0";
        return;
      }

      // Normalised [-1, 1] for parallax
      const nx = (x / rect.width  - 0.5) * 2;
      const ny = (y / rect.height - 0.5) * 2;

      // Cursor spotlight — uses active testimonial colour
      if (spotRef.current) {
        spotRef.current.style.opacity = "1";
        spotRef.current.style.backgroundImage =
          `radial-gradient(520px circle at ${x}px ${y}px, ${colorRef.current.from}16 0%, transparent 65%)`;
      }

      // Orb parallax — subtle depth effect
      if (orb1Ref.current)
        orb1Ref.current.style.transform = `translate(${nx * -28}px, ${ny * -20}px)`;
      if (orb2Ref.current)
        orb2Ref.current.style.transform = `translate(${nx * 22}px, ${ny * 16}px)`;
    }

    function onLeave() {
      if (spotRef.current)  spotRef.current.style.opacity = "0";
      if (orb1Ref.current)  orb1Ref.current.style.transform  = "translate(0,0)";
      if (orb2Ref.current)  orb2Ref.current.style.transform  = "translate(0,0)";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    card.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []); // refs handle updates — no re-binding needed

  const activeTestimonial = TESTIMONIALS[selectedIndex];

  return (
    <section
      ref={rootRef}
      style={{ maxWidth: "1120px", margin: "0 auto", padding: "clamp(40px, 6vw, 72px) 24px clamp(80px, 12vw, 140px)" }}
    >
      <p
        data-reveal
        className="font-mono text-muted"
        style={{ fontSize: "12.5px", letterSpacing: ".14em", marginBottom: "32px" }}
      >
        / WHAT CLIENTS SAY
      </p>

      {/* ── Outer card ── */}
      <div
        ref={cardRef}
        data-reveal
        className="border-border-default bg-elevated"
        style={{ position: "relative", border: "1px solid var(--border)", borderRadius: "24px", overflow: "hidden" }}
      >
        {/* ── BACKGROUND LAYER ─────────────────────────────────────────────── */}

        {/* Accent top bar — colour-shifts with active slide */}
        <div
          aria-hidden
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px",
            borderRadius: "24px 24px 0 0",
            transition: "background 600ms ease",
            background: `linear-gradient(to right, ${activeTestimonial.from}, ${activeTestimonial.to})`,
          }}
        />

        {/* Orb 1 — large, top-right, uses `from` colour */}
        <div
          ref={orb1Ref}
          aria-hidden
          style={{
            position: "absolute",
            top: "-30%", right: "-10%",
            width: "55%", height: "130%",
            borderRadius: "50%",
            filter: "blur(72px)",
            pointerEvents: "none",
            transition: "background 600ms ease, transform 1.4s cubic-bezier(.2,.8,.2,1)",
            willChange: "transform",
            animation: "orbBreath 9s ease-in-out infinite",
            background: `radial-gradient(circle, ${activeTestimonial.from}24 0%, ${activeTestimonial.from}08 50%, transparent 70%)`,
          }}
        />

        {/* Orb 2 — medium, bottom-left, uses `to` colour */}
        <div
          ref={orb2Ref}
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-20%", left: "-8%",
            width: "45%", height: "110%",
            borderRadius: "50%",
            filter: "blur(64px)",
            pointerEvents: "none",
            transition: "background 600ms ease, transform 1.4s cubic-bezier(.2,.8,.2,1)",
            willChange: "transform",
            animation: "orbBreath 12s ease-in-out 2s infinite",
            background: `radial-gradient(circle, ${activeTestimonial.to}20 0%, ${activeTestimonial.to}06 50%, transparent 70%)`,
          }}
        />

        {/* Cursor spotlight — follows mouse, colour-reactive */}
        <div
          ref={spotRef}
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity .4s ease",
          }}
        />

        {/* Subtle noise grain overlay for depth */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            pointerEvents: "none",
            opacity: 0.025,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Thin animated rings — use active colour */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "220px", height: "220px", borderRadius: "50%",
            transition: "border-color 600ms ease",
            border: `1px solid ${activeTestimonial.from}20`,
            animation: "floatY 11s ease-in-out infinite",
            willChange: "transform",
          }} />
          <div style={{
            position: "absolute", top: "0px", right: "60px",
            width: "110px", height: "110px", borderRadius: "50%",
            transition: "border-color 600ms ease",
            border: `1px solid ${activeTestimonial.to}18`,
            animation: "floatY 8s ease-in-out 1.5s infinite",
            willChange: "transform",
          }} />
          <div style={{
            position: "absolute", bottom: "18%", left: "2%",
            width: "12px", height: "12px", borderRadius: "3px",
            transition: "background 600ms ease",
            background: `${activeTestimonial.from}28`,
            transform: "rotate(45deg)",
            animation: "floatY 7s ease-in-out 3s infinite",
            willChange: "transform",
          }} />
          <div style={{
            position: "absolute", bottom: "32%", left: "36%",
            width: "6px", height: "6px", borderRadius: "50%",
            transition: "background 600ms ease",
            background: `${activeTestimonial.to}22`,
            animation: "floatY 10s ease-in-out 0.8s infinite",
            willChange: "transform",
          }} />
        </div>

        {/* Decorative quote glyph — hidden on small screens to avoid text overlap */}
        <div
          aria-hidden
          className="font-display text-border-default testimonial-quote-glyph"
          style={{
            position: "absolute", top: "18px", right: "clamp(24px, 4vw, 44px)",
            fontWeight: 700, pointerEvents: "none", userSelect: "none",
            letterSpacing: "-0.04em",
            fontSize: "clamp(72px, 14vw, 110px)", lineHeight: 0.8,
          }}
        >
          &ldquo;
        </div>

        {/* ── Embla carousel ── */}
        <div ref={emblaRef} style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", userSelect: "none", touchAction: "pan-y pinch-zoom" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ flex: "0 0 100%", minWidth: 0, padding: "clamp(28px, 5vw, 56px)" }}>
                <p
                  className="font-display"
                  style={{
                    fontWeight: 500, letterSpacing: "-0.02em", maxWidth: "70ch",
                    fontSize: "clamp(1.15rem, 2.8vw, 1.82rem)",
                    lineHeight: 1.38, textWrap: "balance" as never,
                    marginBottom: "clamp(22px, 3.5vw, 34px)",
                  }}
                >
                  {t.quote}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    className="font-mono text-white"
                    style={{
                      width: "44px", height: "44px", borderRadius: "50%",
                      display: "grid", placeItems: "center",
                      fontSize: "13px", fontWeight: 700, flexShrink: 0,
                      background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                      boxShadow: `0 0 0 3px ${t.ring}`,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14.5px", lineHeight: 1.3 }}>{t.name}</div>
                    <div className="text-muted" style={{ fontSize: "13px", marginTop: "2px" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Controls ── */}
        <div
          style={{
            position: "relative", zIndex: 1,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "12px",
            padding: "0 clamp(28px, 5vw, 56px) clamp(28px, 5vw, 56px)",
          }}
        >
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Testimonial ${i + 1}`}
                style={{
                  height: "6px", borderRadius: "3px", border: 0, padding: 0, cursor: "pointer",
                  width: i === selectedIndex ? "22px" : "6px",
                  background: i === selectedIndex
                    ? `linear-gradient(to right, ${t.from}, ${t.to})`
                    : "var(--border)",
                  transition: "width .3s cubic-bezier(.2,.8,.2,1), background .55s ease",
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <NavBtn onClick={() => emblaApi?.scrollPrev()} title="Previous"><ArrowLeft size={16} /></NavBtn>
            <NavBtn onClick={() => emblaApi?.scrollNext()} title="Next"><ArrowRight size={16} /></NavBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

function NavBtn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="border-border-default text-primary"
      style={{ display: "grid", placeItems: "center", width: "40px", height: "40px", borderRadius: "10px", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", transition: "border-color 200ms ease, background 200ms ease" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--text-3)"; e.currentTarget.style.background = "var(--panel)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "transparent"; }}
    >
      {children}
    </button>
  );
}
