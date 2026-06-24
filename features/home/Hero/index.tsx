"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/features/shared/ThemeProvider";
import { Button } from "@/features/shared/Button";
import { site } from "@/config/site";

// ── Static data ────────────────────────────────────────────────────────────────

const ROTOR_WORDS = [
  "blazing fast.",
  "rock-solid.",
  "built to scale.",
  "a joy to use.",
];

// Vibrant gradient per word — order matches ROTOR_WORDS
const WORD_GRADIENTS = [
  "linear-gradient(to right, #dc2626 0%, #f97316 48%, #fbbf24 100%)", // red → orange → amber
  "linear-gradient(to right, #4338ca 0%, #6366f1 45%, #e879f9 100%)", // deep indigo → violet → fuchsia
  "linear-gradient(to right, #047857 0%, #10b981 50%, #22d3ee 100%)", // deep green → emerald → cyan
  "linear-gradient(to right, #e11d48 0%, #f43f5e 45%, #e879f9 100%)", // deep rose → rose → fuchsia
];

interface Social {
  label: string;
  href: string;
  iconColor: string;
  hoverBorder: string;
  viewBox: string;
  path: string;
}

const SOCIALS: Social[] = [
  {
    label: "GitHub",
    href: site.socials.github,
    iconColor: "var(--text)",
    hoverBorder: "var(--text-3)",
    viewBox: "0 0 24 24",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "LinkedIn",
    href: site.socials.linkedin,
    iconColor: "#0A66C2",
    hoverBorder: "#0A66C2",
    viewBox: "0 0 24 24",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  // { label: "X / Twitter", href: site.socials.x, ... },
  // { label: "Read.cv",     href: site.socials.readcv, ... },
];

const CANVAS_COLORS = {
  light: { dot: "rgba(0,0,0,.36)", line: "rgba(0,0,0,.18)" },
  dark: { dot: "rgba(255,255,255,.40)", line: "rgba(255,255,255,.18)" },
};

// ── Component ──────────────────────────────────────────────────────────────────

export function Hero() {
  const { resolvedTheme } = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const themeRef = useRef(resolvedTheme);

  const [wordIdx, setWordIdx] = useState(0);
  // Lazy initializer — reads matchMedia once on client mount, avoids setState-in-effect
  const [reduced] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  // Keep theme ref in sync so the animation loop doesn't close over a stale value
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  // Rotating headline word
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setWordIdx((currentIdx) => (currentIdx + 1) % ROTOR_WORDS.length),
      2300,
    );
    return () => clearInterval(id);
  }, [reduced]);

  // Scroll-reveal (IntersectionObserver)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) {
      section.querySelectorAll<HTMLElement>("[data-reveal]").forEach((revealEl) => {
        revealEl.style.opacity = "1";
        revealEl.style.transform = "none";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const revealEl = entry.target as HTMLElement;
          revealEl.style.opacity = "1";
          revealEl.style.transform = "none";
          observer.unobserve(revealEl);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    section.querySelectorAll<HTMLElement>("[data-reveal]").forEach((revealEl, revealIndex) => {
      const bounds = revealEl.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        revealEl.style.opacity = "1";
        return;
      }
      revealEl.style.opacity = "0";
      revealEl.style.transform = "translateY(26px)";
      const transitionDelay = Math.min(revealIndex * 0.06, 0.28);
      revealEl.style.transition = [
        `opacity .7s cubic-bezier(.2,.8,.2,1) ${transitionDelay}s`,
        `transform .7s cubic-bezier(.2,.8,.2,1) ${transitionDelay}s`,
      ].join(", ");
      observer.observe(revealEl);
    });

    return () => observer.disconnect();
  }, [reduced]);

  // Canvas particles + mouse parallax + scroll parallax
  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let ctx: CanvasRenderingContext2D | null = null;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let dots: { x: number; y: number; vx: number; vy: number; r: number }[] =
      [];
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let animationFrameId = 0;

    function sizeCanvas() {
      const bounds = canvas!.getBoundingClientRect();
      if (bounds.width === 0) return;
      canvasWidth = bounds.width;
      canvasHeight = bounds.height;
      canvas!.width = canvasWidth * pixelRatio;
      canvas!.height = canvasHeight * pixelRatio;
      ctx = canvas!.getContext("2d");
      ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const dotCount = Math.max(45, Math.min(118, Math.floor((canvasWidth * canvasHeight) / 11000)));
      if (!dots.length) {
        dots = Array.from({ length: dotCount }, () => ({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: Math.random() * 1.9 + 0.75,
        }));
      }
    }

    function loop() {
      animationFrameId = requestAnimationFrame(loop);
      if (!ctx || !dots.length) return;

      const colors = CANVAS_COLORS[themeRef.current];
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Lerp mouse position toward target for smooth follow
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      const mouseX = mouse.x;
      const mouseY = mouse.y;

      for (let dotIndex = 0; dotIndex < dots.length; dotIndex++) {
        const dot = dots[dotIndex];
        dot.x += dot.vx;
        dot.y += dot.vy;
        // wrap around canvas edges
        if (dot.x < 0) dot.x = canvasWidth;
        if (dot.x > canvasWidth) dot.x = 0;
        if (dot.y < 0) dot.y = canvasHeight;
        if (dot.y > canvasHeight) dot.y = 0;
        // repel from cursor
        const dirX = dot.x - mouseX;
        const dirY = dot.y - mouseY;
        const distanceToMouse = Math.hypot(dirX, dirY);
        if (distanceToMouse < 152 && distanceToMouse > 0) {
          dot.x += (dirX / distanceToMouse) * (152 - distanceToMouse) * 0.019;
          dot.y += (dirY / distanceToMouse) * (152 - distanceToMouse) * 0.019;
        }
        // dot grows slightly when near cursor
        const nearFactor = distanceToMouse < 110 ? 1 + (1 - distanceToMouse / 110) * 0.75 : 1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r * nearFactor, 0, Math.PI * 2);
        ctx.fillStyle = colors.dot;
        ctx.fill();
        // line from dot to cursor
        if (distanceToMouse < 175) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = colors.line;
          ctx.globalAlpha = (1 - distanceToMouse / 175) * 1.0;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        // lines between nearby dots
        for (let neighborIndex = dotIndex + 1; neighborIndex < dots.length; neighborIndex++) {
          const neighborDot = dots[neighborIndex];
          const deltaX = dot.x - neighborDot.x;
          const deltaY = dot.y - neighborDot.y;
          const distanceBetweenDots = Math.hypot(deltaX, deltaY);
          if (distanceBetweenDots < 124) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(neighborDot.x, neighborDot.y);
            ctx.strokeStyle = colors.line;
            ctx.globalAlpha = (1 - distanceBetweenDots / 124) * 0.72;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function onMove(e: MouseEvent) {
      // Cursor glow follows pointer
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }

      // Update canvas mouse target position
      const bounds = canvas!.getBoundingClientRect();
      mouse.targetX = e.clientX - bounds.left;
      mouse.targetY = e.clientY - bounds.top;
    }

    function onScroll() {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      if (canvas) canvas.style.transform = `translateY(${scrollY * 0.22}px)`;
    }

    function onResize() {
      sizeCanvas();
    }

    sizeCanvas();
    loop();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ── Styles ─────────────────────────────────────────────────────────────────

  // JS-driven: depends on wordIdx state — must stay inline
  const rotorStyle: CSSProperties = {
    display: "inline-block",
    transform: `translateY(-${wordIdx * 1.2}em)`,
    transition: reduced ? "none" : "transform .6s cubic-bezier(.65,0,.2,1)",
  };

  return (
    <>
      {/* ── Cursor ambient glow (fixed, global) ── */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "fixed",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "top, left",
          background: "radial-gradient(circle, var(--glow), transparent 68%)",
          transform: "translate(-50%, -50%)",
          top: "-9999px",
          left: "-9999px",
          transition: "top 0s, left 0s",
        }}
      />

      {/* ── Scroll progress bar ── */}
      <ScrollProgress />

      {/* ── Hero section ── */}
      <section
        ref={sectionRef}
        style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 20px 80px", overflow: "hidden" }}
      >
        {/* Particle canvas — JS-driven transform stays inline */}
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
        />

        {/* Radial vignette fades canvas into background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent, var(--bg) 78%)",
          }}
        />

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "880px", textAlign: "center", willChange: "transform" }}>
          {/* Available badge */}
          <div
            data-reveal
            className="text-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              borderRadius: "999px",
              fontSize: "13px",
              marginBottom: "30px",
              padding: "7px 14px 7px 11px",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <span style={{ position: "relative", display: "inline-flex", width: "7px", height: "7px" }}>
              <span
                style={{ position: "absolute", inset: 0, borderRadius: "50%", animation: "pulseDot 2s ease-in-out infinite", background: "#1f8a5b" }}
              />
            </span>
            <span className="font-mono" style={{ letterSpacing: ".02em" }}>
              Available for new projects
            </span>
          </div>

          {/* Main headline */}
          <h1
            data-reveal
            className="font-display"
            style={{ fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.03em", marginBottom: "4px", fontSize: "clamp(2.6rem, 7vw, 5.2rem)" }}
          >
            Full-stack engineer crafting
            <br />
            products that are
          </h1>

          {/* Rotating word strip — height & overflow MUST be inline to guarantee
              the clip works across all browsers after the Tailwind migration   */}
          <div
            data-reveal
            className="font-display"
            style={{
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              marginBottom: "26px",
              display: "flex",
              justifyContent: "center",
              fontSize: "clamp(2.6rem, 7vw, 5.2rem)",
              height: "1.2em",
              overflow: "hidden",
            }}
          >
            {/* rotorStyle uses JS state — must stay inline */}
            <div style={rotorStyle}>
              {ROTOR_WORDS.map((word, wordIndex) => (
                <div
                  key={word}
                  style={{
                    height: "1.2em",
                    lineHeight: 1.2,
                    background: WORD_GRADIENTS[wordIndex],
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <p
            data-reveal
            className="text-secondary"
            style={{ maxWidth: "620px", margin: "0 auto", marginBottom: "38px", fontSize: "clamp(1.05rem, 2vw, 1.32rem)", lineHeight: 1.6 }}
          >
            Full-stack developer with 5+ years of experience. I take ownership
            of what I build, care about the details, and focus on shipping
            software that&apos;s reliable, maintainable, and built to last.
          </p>

          {/* CTA buttons */}
          <div
            data-reveal
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "40px" }}
          >
            <Button variant="primary" size="lg" magnetic href="/projects">
              View work <ArrowRight size={16} style={{ display: "inline", verticalAlign: "middle", marginLeft: "2px" }} />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              magnetic
              href="/contact"
              style={
                {
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                } as CSSProperties
              }
            >
              Get in touch
            </Button>
          </div>

          {/* Social links */}
          <div
            data-reveal
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            {SOCIALS.map((social) => (
              <SocialLink key={social.label} {...social} />
            ))}
          </div>
        </div>

      </section>
    </>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SocialLink({ label, href, iconColor, hoverBorder, viewBox, path }: Social) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="border-border-default bg-elevated"
      style={{ display: "grid", placeItems: "center", width: "44px", height: "44px", borderRadius: "11px", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease" }}
      onMouseEnter={(e) => {
        const linkEl = e.currentTarget;
        linkEl.style.borderColor = hoverBorder;
        linkEl.style.transform = "translateY(-3px)";
        linkEl.style.boxShadow = "0 6px 20px rgba(0,0,0,.12)";
      }}
      onMouseLeave={(e) => {
        const linkEl = e.currentTarget;
        linkEl.style.borderColor = "var(--border)";
        linkEl.style.transform = "translateY(0)";
        linkEl.style.boxShadow = "none";
      }}
    >
      <svg
        viewBox={viewBox}
        width="18"
        height="18"
        fill={iconColor}
        aria-hidden
        style={{ display: "block", flexShrink: 0 }}
      >
        <path d={path} />
      </svg>
    </a>
  );
}

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    function update() {
      const docEl = document.documentElement;
      const maxScrollHeight = docEl.scrollHeight - docEl.clientHeight || 1;
      const scrollPercent = Math.min(100, ((window.scrollY || docEl.scrollTop) / maxScrollHeight) * 100);
      if (bar) bar.style.width = `${scrollPercent}%`;
    }

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden
      style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 120, pointerEvents: "none" }}
    >
      <div
        ref={barRef}
        style={{ height: "100%", width: 0, transformOrigin: "left", transition: "width 80ms linear", background: "var(--text)" }}
      />
    </div>
  );
}
