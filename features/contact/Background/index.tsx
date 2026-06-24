"use client";

import { useEffect, useRef, useState } from "react";
import type { Sym } from "./types";
import { SYMBOLS, PROX_RADIUS } from "./constants";

// ── Component ─────────────────────────────────────────────────────────────────

export function ContactBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const symRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ normalizedX: 0, normalizedY: 0 });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;

    // ── Mouse move: parallax + proximity scale/brightness + cursor glow ─────
    function onMove(e: MouseEvent) {
      // Normalize cursor position to [-1, 1] range for parallax calculations
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
      mousePos.current = { normalizedX, normalizedY };

      // Move cursor glow (instant follow, no transition on position)
      if (glow) {
        glow.style.opacity = "1";
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }

      symRefs.current.forEach((symEl, symIndex) => {
        if (!symEl) return;
        const { sx, sy } = SYMBOLS[symIndex];

        // Parallax via CSS individual 'translate' property (slow, dreamy lag)
        symEl.style.translate = `${normalizedX * sx}px ${normalizedY * sy}px`;

        // Proximity to cursor
        const bounds = symEl.getBoundingClientRect();
        const distanceToCursor = Math.hypot(
          e.clientX - (bounds.left + bounds.width / 2),
          e.clientY - (bounds.top + bounds.height / 2),
        );
        const proximityFactor = Math.max(0, 1 - distanceToCursor / PROX_RADIUS);

        // Scale via CSS individual 'scale' property (fast, snappy)
        symEl.style.scale = String(1 + proximityFactor * 0.55);

        // Brightness on the inner span
        const innerSpan = symEl.querySelector("span") as HTMLElement | null;
        if (innerSpan) {
          innerSpan.style.opacity = String(
            Math.min(1, SYMBOLS[symIndex].opacity + proximityFactor * (1 - SYMBOLS[symIndex].opacity)),
          );
        }
      });
    }

    // Fade out glow when cursor leaves the viewport
    function onLeave() {
      if (glow) glow.style.opacity = "0";
      // Reset proximity effects on all symbols
      symRefs.current.forEach((symEl, symIndex) => {
        if (!symEl) return;
        symEl.style.scale = "1";
        const innerSpan = symEl.querySelector("span") as HTMLElement | null;
        if (innerSpan) innerSpan.style.opacity = String(SYMBOLS[symIndex].opacity);
      });
    }

    // Clip fixed layer so it never overlaps the footer
    function clipToFooter() {
      if (!container) return;
      const footer = document.querySelector("footer");
      if (!footer) return;
      const overlap = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
      container.style.clipPath = overlap > 0 ? `inset(0 0 ${overlap}px 0)` : "";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", clipToFooter, { passive: true });
    window.addEventListener("resize", clipToFooter);
    clipToFooter();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", clipToFooter);
      window.removeEventListener("resize", clipToFooter);
    };
  }, []);

  // ── Click → shockwave ───────────────────────────────────────────────────────
  function handleClick(clickedIdx: number, e: React.MouseEvent) {
    const clickX = e.clientX;
    const clickY = e.clientY;
    const { normalizedX, normalizedY } = mousePos.current;

    setActiveIdx(clickedIdx);
    setTimeout(() => setActiveIdx(null), 580);

    symRefs.current.forEach((symEl, symIndex) => {
      if (!symEl) return;
      const sym = SYMBOLS[symIndex];
      // Parallax base offset the symbol was at before the click
      const parallaxBaseX = normalizedX * sym.sx;
      const parallaxBaseY = normalizedY * sym.sy;

      const bounds = symEl.getBoundingClientRect();
      const dirX = bounds.left + bounds.width / 2 - clickX;
      const dirY = bounds.top + bounds.height / 2 - clickY;
      const distanceFromClick = Math.hypot(dirX, dirY) || 1;
      const shockwaveForce = Math.max(0, 1 - distanceFromClick / 340) * 88;

      // Use CSS 'translate' individual property for shockwave too
      symEl.style.transition = "translate .11s ease-out";
      symEl.style.translate = `${parallaxBaseX + (dirX / distanceFromClick) * shockwaveForce}px ${parallaxBaseY + (dirY / distanceFromClick) * shockwaveForce}px`;

      setTimeout(() => {
        symEl.style.transition = "translate 1.5s cubic-bezier(.2,.8,.2,1)";
        symEl.style.translate = `${parallaxBaseX}px ${parallaxBaseY}px`;
      }, 120);
    });
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Cursor ambient glow — sits between page bg and symbols */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "fixed",
          width: "640px",
          height: "640px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1,
          top: 0,
          left: 0,
          willChange: "transform",
          background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, rgba(168,85,247,0.06) 38%, transparent 68%)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity .5s ease",
        }}
      />

      {/* Symbol layer */}
      <div
        ref={containerRef}
        aria-hidden
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2, overflow: "hidden" }}
      >
        {SYMBOLS.map((sym, i) => (
          <div
            key={i}
            ref={(el) => {
              symRefs.current[i] = el;
            }}
            onClick={(e) => handleClick(i, e)}
            style={{
              position: "absolute",
              pointerEvents: "auto",
              cursor: "pointer",
              top: sym.top,
              left: sym.left,
              transition: "translate 1.7s cubic-bezier(.25,.8,.25,1), scale .35s cubic-bezier(.2,.8,.2,1)",
              willChange: "translate, scale",
            }}
          >
            <span
              className={activeIdx === i ? "sym-pop" : undefined}
              style={{
                display: "block",
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: `${sym.size}px`,
                fontWeight: 400,
                lineHeight: 1,
                color: sym.color ?? "var(--text-3)",
                opacity: sym.opacity,
                userSelect: "none",
                transition: "opacity .22s ease",
              }}
            >
              {sym.ch}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
