"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/features/shared/hooks/useReveal";
import { site } from "@/config/site";

const SOCIALS = [
  { label: "GitHub",   href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  // { label: "X / Twitter", href: site.socials.x },
  // { label: "Read.cv",     href: site.socials.readcv },
] as const;

const NEXT_STEPS = [
  {
    num: "01",
    text: "I read your message carefully and get back to you within 24 hours.",
  },
  {
    num: "02",
    text: "We hop on a short discovery call to align on scope and goals.",
  },
  {
    num: "03",
    text: "I send a clear proposal with timeline, deliverables, and pricing.",
  },
] as const;

export function ContactInfo() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <aside
      ref={ref}
      style={{ display: "flex", flexDirection: "column", gap: "44px", paddingTop: "4px" }}
    >
      {/* Availability */}
      <div data-reveal>
        <InfoLabel>Availability</InfoLabel>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <span
            style={{ width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, background: "#22c55e", animation: "pulseDot 2.4s ease-in-out infinite" }}
          />
          <span style={{ fontWeight: 600, fontSize: "15px" }}>
            Available for new projects
          </span>
        </div>
        <p className="text-secondary" style={{ fontSize: "14.5px", lineHeight: 1.6 }}>
          Currently open to freelance and contract work. Earliest start: July
          2026.
        </p>
      </div>

      {/* Socials */}
      <div data-reveal>
        <InfoLabel>Find me on</InfoLabel>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border-subtle text-secondary"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid var(--border-2)", textDecoration: "none", fontSize: "15px", transition: "color 200ms ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text)";
                const arrow =
                  e.currentTarget.querySelector<HTMLSpanElement>("[data-arrow]");
                if (arrow) arrow.style.transform = "translate(3px, -3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-2)";
                const arrow =
                  e.currentTarget.querySelector<HTMLSpanElement>("[data-arrow]");
                if (arrow) arrow.style.transform = "translate(0, 0)";
              }}
            >
              {social.label}
              <ArrowUpRight
                data-arrow
                size={14}
                className="text-muted"
                style={{ flexShrink: 0, transition: "transform 200ms ease" }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* What happens next */}
      <div data-reveal>
        <InfoLabel>What happens next</InfoLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {NEXT_STEPS.map((step) => (
            <div
              key={step.num}
              style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
            >
              <span className="font-mono text-muted" style={{ fontSize: "11.5px", flexShrink: 0, marginTop: "2px", letterSpacing: ".06em" }}>
                {step.num}
              </span>
              <p className="text-secondary" style={{ fontSize: "14.5px", lineHeight: 1.6 }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function InfoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-muted" style={{ fontSize: "11px", letterSpacing: ".14em", marginBottom: "14px", textTransform: "uppercase" }}>
      / {children}
    </div>
  );
}
