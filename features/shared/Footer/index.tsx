"use client";

import { type MouseEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siGithub } from "simple-icons";
import { site } from "@/config/site";

// ── Data ──────────────────────────────────────────────────────────────────────

// LinkedIn path hardcoded (removed from simple-icons v16)
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

interface Social {
  label: string;
  href: string;
  path: string;
  brandColor: string; // hover accent
}

const SOCIALS: Social[] = [
  { label: "GitHub",   href: site.socials.github,  path: siGithub.path, brandColor: "#6e40c9" },
  { label: "LinkedIn", href: site.socials.linkedin, path: LINKEDIN_PATH, brandColor: "#0A66C2" },
  // { label: "X",       href: site.socials.x,       path: siX.path,         brandColor: "#1d9bf0" },
  // { label: "Read.cv", href: site.socials.readcv,  path: siReaddotcv.path, brandColor: "#10b981" },
];

const NAV = [
  { href: "/",         label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact",  label: "Contact" },
] as const;

const EMAIL = site.email;

// ── Component ─────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  // Magnetic move for CTA button
  function onMagneticMove(e: MouseEvent<HTMLAnchorElement>) {
    const buttonEl = e.currentTarget;
    const bounds = buttonEl.getBoundingClientRect();
    // Normalize cursor position within the button to [-1, 1]
    const normalizedX = ((e.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const normalizedY = ((e.clientY - bounds.top) / bounds.height - 0.5) * 2;
    buttonEl.style.transform = `translate(${normalizedX * 6}px, ${normalizedY * 4}px)`;
  }

  return (
    <footer className="bg-panel" style={{ marginTop: 0, borderTop: "1px solid var(--border)" }}>
      <div
        style={{ maxWidth: "1120px", margin: "0 auto", padding: "clamp(40px, 6vw, 72px) 24px clamp(20px, 3vw, 32px)" }}
      >
        {/* ── Statement + CTA ─────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "clamp(20px, 3vw, 32px)",
            marginBottom: "clamp(28px, 4vw, 44px)",
          }}
        >
          <div>
            {/* Availability */}
            <div className="font-mono text-muted" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "12px" }}>
              <span
                style={{ width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0, background: "#22c55e", animation: "pulseDot 2.4s ease-in-out infinite" }}
              />
              Available for new projects · Opens {site.availabilityDate}
            </div>

            {/* Heading */}
            <h2
              className="font-display"
              style={{ fontWeight: 600, letterSpacing: "-0.04em", fontSize: "clamp(1.9rem, 3.8vw, 3.4rem)", lineHeight: 1.06 }}
            >
              Let&apos;s build something{" "}
              {/* Animated gradient word + dashed SVG underline */}
              <span style={{ position: "relative", display: "inline-block" }}>
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #60a5fa, #a78bfa, #e879f9, #f472b6, #a78bfa, #60a5fa)",
                    backgroundSize: "200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gradientFlow 5s linear infinite",
                    filter: "drop-shadow(0 0 22px rgba(167,139,250,0.35))",
                    display: "inline",
                  }}
                >
                  extraordinary.
                </span>

                {/* Dashed gradient underline */}
                <span
                  aria-hidden
                  style={{ position: "absolute", left: 0, right: 0, bottom: "-6px", display: "block", lineHeight: 1, pointerEvents: "none" }}
                >
                  <svg
                    width="100%"
                    height="5"
                    style={{ display: "block", overflow: "visible" }}
                  >
                    <defs>
                      <linearGradient
                        id="dash-grad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="35%" stopColor="#a78bfa" />
                        <stop offset="65%" stopColor="#e879f9" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                    </defs>
                    <line
                      x1="0"
                      y1="2.5"
                      x2="100%"
                      y2="2.5"
                      stroke="url(#dash-grad)"
                      strokeWidth="2.5"
                      strokeDasharray="8 10"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h2>
          </div>

          {/* Magnetic CTA */}
          <Link
            href="/contact"
            className="bg-accent text-accent-contrast"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              height: "48px",
              padding: "0 24px",
              borderRadius: "13px",
              fontSize: "14.5px",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              willChange: "transform",
              transition: "transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease, opacity .2s ease",
            }}
            onMouseMove={onMagneticMove}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.22)";
              e.currentTarget.style.opacity = "0.92";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0,0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.opacity = "1";
            }}
          >
            Start a project
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* ── Gradient divider ────────────────────────────────────────── */}
        <div
          aria-hidden
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--border) 20%, var(--border) 80%, transparent)",
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}
        />

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          {/* Logo + copyright */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <Link
              href="/"
              className="bg-accent text-accent-contrast font-display"
              style={{ display: "grid", placeItems: "center", width: "28px", height: "28px", borderRadius: "8px", fontWeight: 700, fontSize: "13.5px", textDecoration: "none", flexShrink: 0, transition: "opacity 200ms ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.75";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              V
            </Link>
            <span className="text-muted" style={{ fontSize: "12.5px", whiteSpace: "nowrap" }}>
              © {year} {site.name}
            </span>
          </div>

          {/* Nav links */}
          <nav style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            {NAV.map(({ href, label }, navIndex) => (
              <span
                key={href}
                style={{ display: "flex", alignItems: "center" }}
              >
                {navIndex > 0 && (
                  <span
                    aria-hidden
                    style={{ width: "3px", height: "3px", borderRadius: "50%", flexShrink: 0, margin: "0 10px", background: "var(--border)" }}
                  />
                )}
                <Link
                  href={href}
                  className="text-muted"
                  style={{ fontSize: "13px", textDecoration: "none", whiteSpace: "nowrap", transition: "color 200ms ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-3)";
                  }}
                >
                  {label}
                </Link>
              </span>
            ))}
          </nav>

          {/* Social icon buttons */}
          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            {SOCIALS.map((social) => (
              <SocialBtn key={social.label} {...social} />
            ))}
          </div>
        </div>

        {/* ── Tagline ──────────────────────────────────────────────────── */}
        <div style={{ marginTop: "14px", textAlign: "right" }}>
          <span className="font-mono text-muted" style={{ fontSize: "11.5px", letterSpacing: ".04em" }}>
            Built with Next.js & care.
          </span>
        </div>
      </div>
    </footer>
  );
}

// ── SocialBtn ─────────────────────────────────────────────────────────────────

function SocialBtn({ href, path, label, brandColor }: Social) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="border-border-default bg-elevated text-muted"
      style={{
        display: "grid",
        placeItems: "center",
        width: "34px",
        height: "34px",
        borderRadius: "9px",
        border: "1px solid var(--border)",
        textDecoration: "none",
        flexShrink: 0,
        transition: "border-color .22s ease, background .22s ease, color .22s ease, transform .22s cubic-bezier(.2,.8,.2,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = brandColor;
        el.style.background = `${brandColor}18`;
        el.style.color = brandColor;
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--border)";
        el.style.background = "var(--bg-elev)";
        el.style.color = "var(--text-3)";
        el.style.transform = "translateY(0)";
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        style={{ display: "block", fill: "currentColor" }}
        aria-hidden
      >
        <path d={path} />
      </svg>
    </a>
  );
}
