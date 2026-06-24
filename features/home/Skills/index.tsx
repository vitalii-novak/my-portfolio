"use client";

import { useRef } from "react";
import {
  siTypescript, siReact, siNextdotjs, siRedux, siVite, siWebpack,
  siTailwindcss, siSass, siMui,
  siNodedotjs, siExpress, siMongodb, siPostgresql, siFirebase,
  siJsonwebtokens, siDocker, siNginx, siPm2,
  siJest, siCypress, siMocha, siGithubactions, siGit, siGithub, siBitbucket,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { SectionHeading } from "@/features/shared/SectionHeading";
import { useReveal } from "@/features/shared/hooks/useReveal";

// ── Icon helpers ──────────────────────────────────────────────────────────────

function luminance(hex: string): number {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Resolve icon fill: near-black icons (GitHub, Express, JWT…) get theme text
// so they stay visible in both light and dark mode.
function iconFill(icon: SimpleIcon): string {
  return luminance(icon.hex) < 0.12 ? "var(--text)" : `#${icon.hex}`;
}

// ── Tech icon map ─────────────────────────────────────────────────────────────

const TECH_ICON: Record<string, SimpleIcon> = {
  // Frontend
  "TypeScript":   siTypescript,
  "React":        siReact,
  "Next.js":      siNextdotjs,
  "Redux":        siRedux,
  "Tailwind":     siTailwindcss,
  "Material UI":  siMui,
  "SASS/SCSS":    siSass,
  "Vite":         siVite,
  "Webpack":      siWebpack,
  // Backend
  "Node.js":    siNodedotjs,
  "Express":    siExpress,
  "MongoDB":    siMongodb,
  "PostgreSQL": siPostgresql,
  "Firebase":   siFirebase,
  "JWT":        siJsonwebtokens,
  "Docker":     siDocker,
  "Nginx":      siNginx,
  "PM2":        siPm2,
  // Testing & Tools
  "Jest":           siJest,
  "Cypress":        siCypress,
  "Mocha":          siMocha,
  "GitHub Actions": siGithubactions,
  "Git":            siGit,
  "GitHub":         siGithub,
  "Bitbucket":      siBitbucket,
};

import { SKILL_GROUPS, TECH_META } from "./constants";

// ── Component ─────────────────────────────────────────────────────────────────

export function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <section
      ref={rootRef}
      style={{ maxWidth: "1120px", margin: "0 auto", padding: "clamp(80px, 12vw, 140px) 24px 0" }}
    >
      <SectionHeading label="CAPABILITIES" title="What I work with" />

      <div
        style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {SKILL_GROUPS.map((group) => (
          <SkillGroup key={group.num} {...group} />
        ))}
      </div>
    </section>
  );
}

// ── SkillGroup ────────────────────────────────────────────────────────────────

interface SkillGroupProps {
  num: string;
  name: string;
  accent: string;
  glow: string;
  items: readonly string[];
}

function SkillGroup({ num, name, accent, glow, items }: SkillGroupProps) {
  return (
    <div
      data-reveal
      className="border-border-default bg-elevated"
      style={{ position: "relative", border: "1px solid var(--border)", borderRadius: "20px", padding: "24px", overflow: "hidden", transition: "border-color 300ms ease, box-shadow 300ms ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accent}55`;
        e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}22, var(--shadow)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Colored top bar */}
      <div
        aria-hidden
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", borderRadius: "20px 20px 0 0", background: `linear-gradient(to right, ${accent}, ${accent}66)` }}
      />

      {/* Subtle top glow */}
      <div
        aria-hidden
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "80px", pointerEvents: "none", background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${glow}, transparent)` }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", position: "relative" }}>
        <span
          className="font-mono"
          style={{ fontSize: "11.5px", color: accent, opacity: 0.7 }}
        >
          {num}
        </span>
        <h3 className="font-display" style={{ fontWeight: 600, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
          {name}
        </h3>
      </div>

      {/* Chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", position: "relative" }}>
        {items.map((skill) => (
          <SkillTag key={skill} label={skill} />
        ))}
      </div>
    </div>
  );
}

// ── SkillTag ──────────────────────────────────────────────────────────────────

// AWS isn't in simple-icons v16 — render as styled text fallback
const AWS_TAG = (
  <span
    className="font-mono text-white"
    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", borderRadius: "5px", fontSize: "7.5px", fontWeight: 700, flexShrink: 0, lineHeight: 1, background: "#FF9900" }}
  >
    AW
  </span>
);

function SkillTag({ label }: { label: string }) {
  const icon    = TECH_ICON[label];
  const meta    = TECH_META[label];
  const fill    = icon ? iconFill(icon) : "var(--text-3)";
  const bgTint  = icon && luminance(icon.hex) >= 0.12
    ? `#${icon.hex}18`
    : "transparent";
  // Hover accent — prefer icon brand color, fall back to TECH_META color
  const hoverColor = icon ? `#${icon.hex}` : meta?.color ?? "#FF9900";

  return (
    <span
      className="bg-panel border-border-default text-secondary"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        borderRadius: "10px",
        border: "1px solid var(--border)",
        fontSize: "12.5px",
        fontWeight: 500,
        cursor: "default",
        userSelect: "none",
        padding: "5px 11px 5px 7px",
        transition: "transform .2s cubic-bezier(.2,.8,.2,1), border-color .2s ease, color .2s ease, background .2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-2px)";
        el.style.color = "var(--text)";
        el.style.borderColor = `${hoverColor}55`;
        el.style.background  = `${hoverColor}0e`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.color = "var(--text-2)";
        el.style.borderColor = "var(--border)";
        el.style.background = "var(--panel)";
      }}
    >
      {/* Icon — SVG from simple-icons, custom badge from TECH_META, or AWS fallback */}
      {label === "AWS" ? (
        AWS_TAG
      ) : icon ? (
        <span
          aria-hidden
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", borderRadius: "5px", flexShrink: 0, background: bgTint }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" style={{ display: "block", flexShrink: 0, fill }} aria-hidden>
            <path d={icon.path} />
          </svg>
        </span>
      ) : meta ? (
        <span
          aria-hidden
          className="font-mono"
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", borderRadius: "5px", fontSize: "7px", fontWeight: 700, flexShrink: 0, lineHeight: 1, color: "#fff", background: meta.color }}
        >
          {meta.abbr}
        </span>
      ) : null}

      {label}
    </span>
  );
}
