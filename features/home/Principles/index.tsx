"use client";

import { useEffect, useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    num: "01",
    title: "Ship fast, iterate faster",
    desc: "A polished product in users' hands beats a perfect product in a backlog. I favour small, reversible decisions validated with real feedback over long speculation cycles.",
  },
  {
    num: "02",
    title: "Complexity is a liability",
    desc: "Every line of code is debt. I resist premature abstraction and always prefer the simplest solution that genuinely solves the problem — nothing more.",
  },
  {
    num: "03",
    title: "Performance is a feature",
    desc: "Slow software is broken software. Core Web Vitals, bundle budgets, and query plans are first-class concerns from the very first commit, not an afterthought.",
  },
  {
    num: "04",
    title: "Own the full stack",
    desc: "Great products require fluency across UI, API, and infrastructure. I stay comfortable at every layer so problems are solved at the right level of the stack.",
  },
  {
    num: "05",
    title: "Write for the next engineer",
    desc: "Code is read far more often than it is written. Clarity, precise naming, and minimal surprise are non-negotiable — the best comment is code that needs none.",
  },
] as const;

const TOTAL = PRINCIPLES.length;
const MOBILE_BREAKPOINT = 768; // mobile breakpoint px

// ── Component ─────────────────────────────────────────────────────────────────

export function Principles() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const countEl = countRef.current;
    const barEl = barRef.current;
    if (!section || !track || !countEl || !barEl) return;

    let maxScrollOffset = 0;

    function recalc() {
      maxScrollOffset = Math.max(
        0,
        track!.offsetWidth -
          (track!.parentElement?.clientWidth ?? window.innerWidth),
      );
    }

    function update() {
      // On mobile: reset track to natural touch-scroll position, skip animation
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        track!.style.transform = "translateX(0)";
        return;
      }

      const rect = section!.getBoundingClientRect();
      const scrollRange = section!.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));
      track!.style.transform = `translateX(${-progress * maxScrollOffset}px)`;

      const idx = Math.round(progress * (TOTAL - 1));
      countEl!.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`;
      barEl!.style.width = `${progress * 100}%`;
    }

    function onResize() {
      recalc();
      update();
    }

    recalc();
    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    // CSS class handles: position:relative, height:300vh (desktop) / height:auto (mobile)
    <section ref={sectionRef} className="principles-outer">
      {/* CSS class handles: position:sticky top:0 height:100vh (desktop) / position:relative (mobile) */}
      <div className="principles-sticky">
        {/* ── Section header ── */}
        <div
          style={{ maxWidth: "1120px", width: "100%", margin: "0 auto", flexShrink: 0, padding: "clamp(104px, 15vh, 160px) 24px 0" }}
        >
          <div className="font-mono text-muted" style={{ fontSize: "12.5px", letterSpacing: ".14em", marginBottom: "18px" }}>
            / HOW I THINK
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "28px", flexWrap: "wrap" }}>
            <h2
              className="font-display"
              style={{ fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.04, margin: 0, fontSize: "clamp(2rem, 4.6vw, 3rem)" }}
            >
              Principles I build by
            </h2>

            {/* Counter + progress bar — CSS class hides on mobile */}
            <div className="principles-counter">
              <span
                ref={countRef}
                className="font-mono text-secondary"
                style={{ fontSize: "13px", letterSpacing: ".04em", minWidth: "58px" }}
              >
                01 / 05
              </span>
              <div
                style={{ height: "3px", borderRadius: "3px", overflow: "hidden", width: "clamp(80px, 16vw, 160px)", background: "var(--border)" }}
              >
                <div
                  ref={barRef}
                  style={{ height: "100%", width: 0, borderRadius: "3px", transition: "width 100ms linear", background: "var(--text)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Card track ── */}
        {/* CSS class: overflow:hidden + flex (desktop) / overflow-x:auto + scroll-snap (mobile) */}
        <div className="principles-track-wrap">
          <div
            ref={trackRef}
            style={{ display: "flex", gap: "24px", flexShrink: 0, willChange: "transform", padding: "0 max(24px, calc((100vw - 1120px) / 2 + 24px))" }}
          >
            {PRINCIPLES.map((pr) => (
              <PrincipleCard key={pr.num} {...pr} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PrincipleCard ─────────────────────────────────────────────────────────────

interface PrincipleCardProps {
  num: string;
  title: string;
  desc: string;
}

function PrincipleCard({ num, title, desc }: PrincipleCardProps) {
  return (
    <article
      className="border-border-default bg-elevated"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid var(--border)",
        borderRadius: "24px",
        cursor: "default",
        transition: "border-color 350ms cubic-bezier(.2,.8,.2,1), transform 350ms cubic-bezier(.2,.8,.2,1), box-shadow 350ms cubic-bezier(.2,.8,.2,1)",
        flex: "0 0 clamp(280px, 34vw, 380px)",
        height: "clamp(300px, 44vh, 420px)",
        padding: "clamp(28px, 2.6vw, 38px)",
        scrollSnapAlign: "start",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--text-3)";
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "var(--shadow)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--border)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="font-mono text-muted" style={{ fontSize: "11.5px", letterSpacing: ".14em" }}>
          PRINCIPLE
        </span>
        <span className="font-display text-muted" style={{ fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
          {num}
        </span>
      </div>

      {/* Body */}
      <div>
        <h3
          className="font-display"
          style={{ fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "12px", fontSize: "clamp(1.35rem, 2.2vw, 1.7rem)" }}
        >
          {title}
        </h3>
        <p className="text-secondary" style={{ fontSize: "15px", lineHeight: 1.65 }}>
          {desc}
        </p>
      </div>
    </article>
  );
}
