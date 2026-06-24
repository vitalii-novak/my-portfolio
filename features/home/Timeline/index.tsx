"use client";

import { useRef } from "react";
import { SectionHeading } from "@/features/shared/SectionHeading";
import { useReveal } from "@/features/shared/hooks/useReveal";
import type { TimelineItem } from "./types";
import { TIMELINE, ACCENT, PERIOD_W, MARKER_W, LINE_LEFT } from "./constants";

// ── Component ─────────────────────────────────────────────────────────────────

export function Timeline() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <section
      ref={rootRef}
      style={{ maxWidth: "1120px", margin: "0 auto", padding: "clamp(80px, 12vw, 140px) 24px 0" }}
    >
      <SectionHeading label="EXPERIENCE" title="The journey so far" />

      <div className="tl-outer">
        {/* Single continuous dashed vertical line */}
        <div
          aria-hidden
          className="tl-line"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "2px",
            pointerEvents: "none",
            left: `${LINE_LEFT}px`,
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              var(--text-3) 0px,
              var(--text-3) 6px,
              transparent 6px,
              transparent 14px
            )`,
            opacity: 0.55,
          }}
        />

        {TIMELINE.map((item, i) => (
          <TimelineRow
            key={item.period}
            item={item}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

// ── TimelineRow ───────────────────────────────────────────────────────────────

function TimelineRow({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  return (
    <div
      data-reveal
      data-index={index}
      className="tl-row"
      style={{ padding: "clamp(20px, 3vw, 32px) 0", alignItems: "flex-start" }}
    >
      {/* ── Period ─────────────────────────────────────────────────────── */}
      <div className="tl-period" style={{ paddingRight: "12px" }}>
        <div
          className="font-mono"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11.5px", whiteSpace: "nowrap", borderRadius: "50px",
            padding: "4px 10px",
            border: `1px solid ${item.current ? ACCENT + "55" : "var(--border)"}`,
            background: item.current ? ACCENT + "0e" : "var(--panel)",
            color: item.current ? ACCENT : "var(--text-3)",
          }}
        >
          {item.current && (
            <span
              style={{ width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0, background: ACCENT, animation: "pulseDot 2.4s ease-in-out infinite" }}
            />
          )}
          {item.period}
        </div>
      </div>

      {/* ── Marker ─────────────────────────────────────────────────────── */}
      <div className="tl-marker" style={{ justifyContent: "center", paddingTop: "15px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: "13px",
            height: "13px",
            borderRadius: "3px",
            flexShrink: 0,
            transform: "rotate(45deg)",
            background: item.current ? ACCENT : "var(--bg-elev)",
            border: `2px solid ${item.current ? ACCENT : "var(--text-3)"}`,
            boxShadow: item.current
              ? `0 0 0 4px ${ACCENT}22, 0 0 16px ${ACCENT}55`
              : `0 0 0 3px var(--bg)`,
          }}
        />
      </div>

      {/* ── Content card ───────────────────────────────────────────────── */}
      <div
        className="tl-card bg-elevated"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
          cursor: "default",
          marginLeft: "clamp(16px, 2.5vw, 28px)",
          border: `1px solid ${item.current ? ACCENT + "44" : "var(--border)"}`,
          padding: "clamp(18px, 2.4vw, 26px)",
          transition: "border-color .25s ease, box-shadow .25s ease, transform .25s cubic-bezier(.2,.8,.2,1)",
          borderLeft: item.current
            ? `3px solid ${ACCENT}`
            : `1px solid ${item.current ? ACCENT + "44" : "var(--border)"}`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = item.current ? ACCENT + "88" : "var(--text-3)";
          el.style.boxShadow = "var(--shadow)";
          el.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = item.current ? ACCENT + "44" : "var(--border)";
          el.style.boxShadow = "none";
          el.style.transform = "translateY(0)";
        }}
      >
        {/* Subtle accent glow for current entry */}
        {item.current && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "60px",
              pointerEvents: "none",
              background: `radial-gradient(ellipse 80% 100% at 0% 0%, ${ACCENT}0e, transparent)`,
            }}
          />
        )}

        <h3
          className="font-display"
          style={{ fontWeight: 600, marginBottom: "5px", letterSpacing: "-0.01em", position: "relative", fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}
        >
          {item.role}
        </h3>

        <div className="text-muted font-mono" style={{ fontSize: "12px", marginBottom: "12px", letterSpacing: ".04em", position: "relative" }}>
          {item.company}
        </div>

        <p
          className="text-secondary"
          style={{ fontSize: "14.5px", maxWidth: "560px", lineHeight: 1.65, position: "relative" }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
}
