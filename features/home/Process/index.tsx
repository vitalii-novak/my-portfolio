"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Map user needs, business constraints, and technical risks before writing a single line of code. Good questions save weeks of wrong work.",
  },
  {
    num: "02",
    title: "Architecture",
    desc: "Design the system in broad strokes — API contracts, data models, component boundaries — so the team can move fast without collisions.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Iterate in short cycles with continuous feedback. Tests ship alongside features; code review is a conversation, not a gatekeeper.",
  },
  {
    num: "04",
    title: "Ship & Iterate",
    desc: "Deploy with confidence via feature flags and canary releases. Real-time monitoring turns launch day into a data-gathering opportunity.",
  },
] as const;

const STEP_COUNT = STEPS.length;
const MOBILE_BREAKPOINT = 768; // mobile breakpoint px

// ── Component ─────────────────────────────────────────────────────────────────

// Radial glow per step — matches each card's accent color
const STEP_GLOWS = [
  "radial-gradient(ellipse 80% 72% at 50% 48%, rgba(99,102,241,0.18) 0%, transparent 68%)",
  "radial-gradient(ellipse 80% 72% at 50% 48%, rgba(14,165,233,0.16) 0%, transparent 68%)",
  "radial-gradient(ellipse 80% 72% at 50% 48%, rgba(16,185,129,0.16) 0%, transparent 68%)",
  "radial-gradient(ellipse 80% 72% at 50% 48%, rgba(245,158,11,0.18) 0%, transparent 68%)",
];

const STEP_BORDERS = [
  "rgba(99,102,241,0.28)",
  "rgba(14,165,233,0.26)",
  "rgba(16,185,129,0.26)",
  "rgba(245,158,11,0.28)",
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    let lastIdx = 0;

    function setGlow(idx: number) {
      if (bgGlowRef.current) bgGlowRef.current.style.background = STEP_GLOWS[idx];
      if (visualContainerRef.current)
        visualContainerRef.current.style.boxShadow = `var(--shadow), inset 0 0 0 1px ${STEP_BORDERS[idx]}`;
    }

    // Show all steps at full opacity — used on mobile
    function applyMobile() {
      line!.style.transform = "scaleY(1)";
      stepRefs.current.forEach((stepEl) => {
        if (!stepEl) return;
        stepEl.style.opacity = "1";
        stepEl.style.transform = "none";
      });
      visualRefs.current.forEach((panelEl, panelIndex) => {
        if (!panelEl) return;
        panelEl.style.opacity = panelIndex === 0 ? "1" : "0";
        panelEl.style.transform = panelIndex === 0 ? "none" : "scale(1.03) translateY(8px)";
      });
      setGlow(0);
    }

    // Restore desktop initial state (first step active, rest dim)
    function resetDesktop() {
      lastIdx = 0;
      line!.style.transform = "scaleY(0)";
      stepRefs.current.forEach((stepEl, stepIndex) => {
        if (!stepEl) return;
        stepEl.style.opacity = stepIndex === 0 ? "1" : "0.35";
        stepEl.style.transform = stepIndex === 0 ? "none" : "translateX(-4px)";
      });
      visualRefs.current.forEach((panelEl, panelIndex) => {
        if (!panelEl) return;
        panelEl.style.opacity = panelIndex === 0 ? "1" : "0";
        panelEl.style.transform = panelIndex === 0 ? "none" : "scale(1.03) translateY(8px)";
      });
      setGlow(0);
    }

    function update() {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        applyMobile();
        return;
      }

      const rect = section!.getBoundingClientRect();
      const scrollRange = section!.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));
      line!.style.transform = `scaleY(${progress})`;

      const activeStepIndex = Math.min(Math.floor(progress * STEP_COUNT), STEP_COUNT - 1);
      if (activeStepIndex === lastIdx) return;
      lastIdx = activeStepIndex;

      stepRefs.current.forEach((stepEl, stepIndex) => {
        if (!stepEl) return;
        const active = stepIndex <= activeStepIndex;
        stepEl.style.opacity = active ? "1" : "0.35";
        stepEl.style.transform = active ? "translateX(0)" : "translateX(-4px)";
      });

      visualRefs.current.forEach((panelEl, panelIndex) => {
        if (!panelEl) return;
        const visible = panelIndex === activeStepIndex;
        panelEl.style.opacity = visible ? "1" : "0";
        panelEl.style.transform = visible ? "none" : "scale(1.03) translateY(8px)";
      });

      setGlow(activeStepIndex);
    }

    function onResize() {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        applyMobile();
      } else {
        resetDesktop();
        update();
      }
    }

    // Initial state
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      applyMobile();
    } else {
      resetDesktop();
      update();
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    // CSS class handles: position:relative, height:340vh (desktop) / height:auto (mobile), margin-top
    <section ref={sectionRef} className="process-outer">
      {/* CSS class handles: position:sticky top:0 min-height:100vh (desktop) / position:relative (mobile) */}
      <div className="process-sticky">
        <div
          style={{
            maxWidth: "1120px",
            width: "100%",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            alignItems: "center",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(36px, 6vw, 80px)",
          }}
        >
          {/* ── Left: steps ── */}
          <div>
            <div className="font-mono text-muted" style={{ fontSize: "12.5px", letterSpacing: ".14em", marginBottom: "14px" }}>
              / PROCESS
            </div>
            <h2
              className="font-display"
              style={{ fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "34px", fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            >
              How I work
            </h2>

            <div style={{ display: "flex", gap: "22px" }}>
              {/* Vertical progress line */}
              <div className="bg-border-default" style={{ position: "relative", width: "2px", borderRadius: "2px", flexShrink: 0 }}>
                <div
                  ref={lineRef}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "2px",
                    transformOrigin: "top",
                    transition: "transform 120ms linear",
                    background: "var(--text)",
                    transform: "scaleY(0)",
                  }}
                />
              </div>

              {/* Steps list */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                {STEPS.map((step, stepIndex) => (
                  <div
                    key={step.num}
                    ref={(el) => {
                      stepRefs.current[stepIndex] = el;
                    }}
                    style={{
                      paddingTop: "14px",
                      paddingBottom: "14px",
                      transition: "opacity 450ms ease, transform 450ms ease",
                      opacity: stepIndex === 0 ? 1 : 0.35,
                      transform: stepIndex === 0 ? "none" : "translateX(-4px)",
                    }}
                  >
                    <div className="font-mono text-muted" style={{ fontSize: "12px", marginBottom: "6px" }}>
                      {step.num}
                    </div>
                    <h3 className="font-display" style={{ fontWeight: 600, fontSize: "1.3rem", letterSpacing: "-0.01em", marginBottom: "6px" }}>
                      {step.title}
                    </h3>
                    <p className="text-secondary" style={{ fontSize: "14.5px", maxWidth: "420px", lineHeight: 1.55 }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: visual card (hidden on mobile via CSS class) ── */}
          <div
            ref={visualContainerRef}
            className="process-visual border-border-default bg-elevated"
            style={{
              position: "relative",
              width: "100%",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              overflow: "hidden",
              transition: "box-shadow 600ms ease",
              height: "clamp(300px, 42vh, 500px)",
              boxShadow: "var(--shadow)",
            }}
          >
            {/* Step-colour ambient glow — updates on scroll */}
            <div
              ref={bgGlowRef}
              aria-hidden
              style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, transition: "background 600ms ease", background: STEP_GLOWS[0] }}
            />

            <VisualDiscovery
              ref={(el) => {
                visualRefs.current[0] = el;
              }}
              visible
            />
            <VisualArchitecture
              ref={(el) => {
                visualRefs.current[1] = el;
              }}
            />
            <VisualBuild
              ref={(el) => {
                visualRefs.current[2] = el;
              }}
            />
            <VisualShip
              ref={(el) => {
                visualRefs.current[3] = el;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Visual panels ─────────────────────────────────────────────────────────────

interface VisualPanelProps {
  ref: (el: HTMLDivElement | null) => void;
  visible?: boolean;
}

const panelBase: React.CSSProperties = {
  position: "absolute",
  inset: "5% 6%",
  display: "grid",
  placeItems: "center",
  transition: "opacity .5s ease, transform .5s ease",
};

// Shared 3D floating card wrapper
function FloatCard({
  children,
  accent,
  label,
  delay = "0s",
  compact = false,
}: {
  children: React.ReactNode;
  accent: string;
  label: string;
  delay?: string;
  compact?: boolean;
}) {
  return (
    <div
      className="border-border-default"
      style={{
        position: "relative",
        borderRadius: "20px",
        border: "1px solid var(--border)",
        overflow: "hidden",
        boxSizing: "border-box",
        width: "clamp(185px, 82%, 260px)",
        background: "linear-gradient(155deg, var(--bg-elev) 0%, var(--panel) 100%)",
        padding: compact ? "clamp(12px, 1.8vw, 20px)" : "clamp(16px, 2.4vw, 26px)",
        animationName: "float3D",
        animationDuration: "5.6s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationFillMode: "both",
        animationDelay: delay,
      }}
    >
      {/* Accent top bar */}
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", borderRadius: "20px 20px 0 0", background: accent }}
      />

      {/* File label */}
      <div className="font-mono text-muted" style={{ fontSize: "11px", letterSpacing: ".12em", marginBottom: "18px" }}>
        {label}
      </div>

      {children}
    </div>
  );
}

// Panel 0 — Discovery
function VisualDiscovery({ ref, visible }: VisualPanelProps) {
  const items = [
    { done: true,  label: "Define user problem" },
    { done: true,  label: "List constraints" },
    { done: false, label: "Identify key risks" },
    { done: false, label: "Estimate scope" },
  ];

  return (
    <div
      ref={ref}
      style={{
        ...panelBase,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "scale(1.04) translateY(10px)",
      }}
    >
      <FloatCard accent="linear-gradient(90deg,#6366f1,#8b5cf6)" label="discovery.md">
        {/* Icon */}
        <div style={{ marginBottom: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "48px", height: "48px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "3px solid #6366f1", boxShadow: "0 0 16px rgba(99,102,241,0.45)" }} />
            <div style={{ position: "absolute", bottom: "2px", right: "2px", width: "3px", height: "17px", borderRadius: "2px", background: "#6366f1", transform: "rotate(45deg)", transformOrigin: "top center", boxShadow: "0 0 6px rgba(99,102,241,0.5)" }} />
          </div>
        </div>

        {/* Checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item, itemIndex) => (
            <div key={itemIndex} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={item.done
                  ? { flexShrink: 0, width: "18px", height: "18px", borderRadius: "5px", display: "grid", placeItems: "center", background: "#6366f1", color: "#fff", boxShadow: "0 0 8px rgba(99,102,241,0.4)" }
                  : { flexShrink: 0, width: "18px", height: "18px", borderRadius: "5px", display: "grid", placeItems: "center", border: "1.5px solid var(--border)" }}
              >
                {item.done ? <Check size={11} strokeWidth={3} /> : null}
              </span>
              <span className="font-mono" style={{ fontSize: "12.5px", color: item.done ? "var(--text-2)" : "var(--text-3)" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </FloatCard>
    </div>
  );
}

// Panel 1 — Architecture
function VisualArchitecture({ ref }: VisualPanelProps) {
  const layers = [
    { label: "UI", color: "#0ea5e9", opacity: 1 },
    { label: "API", color: "#0ea5e9", opacity: 0.7 },
    { label: "DB", color: "#0ea5e9", opacity: 0.45 },
  ];

  return (
    <div ref={ref} style={{ ...panelBase, opacity: 0, transform: "scale(1.04) translateY(10px)" }}>
      <FloatCard accent="linear-gradient(90deg,#0ea5e9,#38bdf8)" label="system.arch" delay="0.8s">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {layers.map((layer, layerIndex) => (
            <div key={layerIndex} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {layerIndex > 0 && (
                <div style={{ width: "2px", height: "16px", background: `rgba(14,165,233,${0.4 - layerIndex * 0.1})` }} />
              )}
              <div
                className="font-mono"
                style={{
                  fontSize: "12.5px",
                  letterSpacing: ".06em",
                  borderRadius: "10px",
                  padding: "9px 28px",
                  border: `1px solid rgba(14,165,233,${layer.opacity * 0.5})`,
                  background: `rgba(14,165,233,${layer.opacity * 0.1})`,
                  color: `rgba(14,165,233,${0.7 + layerIndex * 0.1})`,
                  boxShadow: layerIndex === 0 ? "0 0 12px rgba(14,165,233,0.2)" : "none",
                }}
              >
                {layer.label}
              </div>
            </div>
          ))}
        </div>
      </FloatCard>
    </div>
  );
}

// Panel 2 — Build (code editor)
function VisualBuild({ ref }: VisualPanelProps) {
  const lines: { segs: { w: string; color: string }[]; indent?: boolean }[] = [
    { segs: [{ w: "22%", color: "#818cf8" }, { w: "36%", color: "var(--border)" }] },
    { indent: true, segs: [{ w: "28%", color: "#34d399" }, { w: "28%", color: "#fbbf24" }] },
    { indent: true, segs: [{ w: "44%", color: "var(--border)" }] },
    { segs: [{ w: "18%", color: "#818cf8" }, { w: "22%", color: "#fb7185" }] },
    { segs: [{ w: "16%", color: "var(--border)" }, { w: "40%", color: "#34d399" }] },
  ];

  return (
    <div ref={ref} style={{ ...panelBase, opacity: 0, transform: "scale(1.04) translateY(10px)" }}>
      <FloatCard accent="linear-gradient(90deg,#10b981,#34d399)" label="build.ts" delay="1.6s">
        {/* Chrome dots */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
          {["#ef4444","#f59e0b","#22c55e"].map((dotColor, dotIndex) => (
            <span key={dotIndex} style={{ width: "9px", height: "9px", borderRadius: "50%", background: dotColor, opacity: 0.7 }} />
          ))}
        </div>

        {/* Code lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          {lines.map((codeLine, lineIndex) => (
            <div key={lineIndex} style={{ display: "flex", gap: "8px", paddingLeft: codeLine.indent ? "20px" : 0 }}>
              {codeLine.segs.map((seg, segIndex) => (
                <span key={segIndex} style={{ height: "8px", borderRadius: "4px", flexShrink: 0, width: seg.w, background: seg.color }} />
              ))}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ marginTop: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span className="font-mono text-muted" style={{ fontSize: "11px" }}>build progress</span>
            <span className="font-mono" style={{ fontSize: "11px", color: "#10b981" }}>82%</span>
          </div>
          <div style={{ height: "5px", borderRadius: "5px", overflow: "hidden", background: "var(--border)" }}>
            <div style={{ height: "100%", width: "82%", borderRadius: "5px", background: "linear-gradient(90deg,#10b981,#34d399)", boxShadow: "0 0 8px rgba(16,185,129,0.4)" }} />
          </div>
        </div>
      </FloatCard>
    </div>
  );
}

// Panel 3 — Ship
const SHIP_ROWS = [
  { label: "build",  color: "#22c55e", glow: "rgba(34,197,94,0.45)",   pct: "100%" },
  { label: "tests",  color: "#3b82f6", glow: "rgba(59,130,246,0.45)",  pct: "100%" },
  { label: "deploy", color: "#f59e0b", glow: "rgba(245,158,11,0.5)",   pct: "100%" },
] as const;

function VisualShip({ ref }: VisualPanelProps) {
  return (
    <div ref={ref} style={{ ...panelBase, opacity: 0, transform: "scale(1.04) translateY(10px)" }}>
      <FloatCard accent="linear-gradient(90deg,#f59e0b,#fbbf24)" label="deploy.log" delay="2.4s" compact>

        {/* Layered glow + checkmark — compact heights */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "clamp(8px, 1.6vw, 14px)",
            height: "clamp(52px, 8vw, 68px)",
          }}
        >
          <div aria-hidden style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", width: "clamp(72px, 14vw, 104px)", height: "clamp(72px, 14vw, 104px)", background: "radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 68%)" }} />
          <div aria-hidden style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", width: "clamp(48px, 9vw, 68px)", height: "clamp(48px, 9vw, 68px)", background: "radial-gradient(circle, rgba(245,158,11,0.42) 0%, transparent 70%)" }} />
          <div
            style={{
              position: "relative",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              animation: "successPulse 2.8s ease-in-out infinite",
              width: "clamp(40px, 6.5vw, 52px)",
              height: "clamp(40px, 6.5vw, 52px)",
              background: "linear-gradient(145deg, #f59e0b 0%, #fbbf24 55%, #fde047 100%)",
              color: "#1a0e00",
            }}
          >
            <Check size={19} strokeWidth={2.8} />
          </div>
        </div>

        {/* Progress rows */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "clamp(6px, 1.1vw, 9px)", marginBottom: "clamp(8px, 1.5vw, 12px)" }}
        >
          {SHIP_ROWS.map(({ label, color, glow, pct }) => (
            <div key={label}>
              <div
                className="font-mono text-secondary"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3px", fontSize: "clamp(10px, 1.5vw, 11.5px)" }}
              >
                <span>{label}</span>
                <Check size={10} strokeWidth={2.8} style={{ flexShrink: 0, color }} />
              </div>
              <div style={{ borderRadius: "3px", overflow: "hidden", height: "2.5px", background: "var(--border)" }}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: "3px",
                    width: pct,
                    background: `linear-gradient(to right, ${color}88, ${color})`,
                    boxShadow: `0 0 5px ${glow}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Shipped badge */}
        <div
          className="font-mono"
          style={{
            textAlign: "center",
            letterSpacing: ".08em",
            borderRadius: "50px",
            whiteSpace: "nowrap",
            fontSize: "clamp(9px, 1.5vw, 11px)",
            color: "#f59e0b",
            padding: "5px clamp(8px, 2vw, 14px)",
            border: "1px solid rgba(245,158,11,0.4)",
            background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(253,224,71,0.06))",
            boxShadow: "0 0 10px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          shipped · 100%
        </div>
      </FloatCard>
    </div>
  );
}
