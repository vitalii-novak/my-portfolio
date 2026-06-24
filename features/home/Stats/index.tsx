"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { value: 5, suffix: "+", label: "Years experience" },
  { value: 32, suffix: "+", label: "Projects shipped" },
  { value: 18, suffix: "+", label: "Happy clients" },
  { value: 500, suffix: "k+", label: "Lines of code" },
] as const;

export function Stats() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const counters = Array.from(
      root.querySelectorAll<HTMLSpanElement>("[data-count]"),
    );
    if (!counters.length) return;

    let started = false;

    function startCounting() {
      if (started) return;
      started = true;

      counters.forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const duration = 1600;
        const startTime = performance.now();

        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // cubic ease-out
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      });
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) startCounting();
      },
      { threshold: 0.4 },
    );

    obs.observe(root);

    // Scroll-reveal for the grid itself
    const r = root.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      root.style.opacity = "1";
    } else {
      root.style.opacity = "0";
      root.style.transform = "translateY(26px)";
      root.style.transition =
        "opacity .7s cubic-bezier(.2,.8,.2,1), transform .7s cubic-bezier(.2,.8,.2,1)";

      const revealObs = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          root.style.opacity = "1";
          root.style.transform = "none";
          revealObs.disconnect();
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );
      revealObs.observe(root);
    }

    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
      <div
        ref={rootRef}
        className="border-border-default"
        style={{
          display: "grid",
          border: "1px solid var(--border)",
          borderRadius: "18px",
          overflow: "hidden",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1px",
          background: "var(--border)",
        }}
      >
        {STATS.map((st) => (
          <div
            key={st.label}
            className="bg-elevated"
            style={{ padding: "30px 24px", textAlign: "center", cursor: "default", transition: "background 200ms ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--panel)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--bg-elev)";
            }}
          >
            <div className="font-display" style={{ fontWeight: 600, letterSpacing: "-0.02em", fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
              <span data-count={st.value} data-suffix={st.suffix}>
                {st.value}
                {st.suffix}
              </span>
            </div>
            <div className="text-secondary" style={{ marginTop: "6px", fontSize: "13.5px" }}>
              {st.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
