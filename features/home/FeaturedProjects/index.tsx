"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/features/shared/SectionHeading";
import { useReveal } from "@/features/shared/hooks/useReveal";

const PROJECTS = [
  {
    title: "StreamSync",
    year: "2024",
    category: "SaaS / Real-time",
    desc: "Real-time collaborative document editor with CRDT-based conflict resolution, supporting 10 000+ concurrent users without data loss.",
    tags: ["Next.js", "Go", "WebSockets", "Redis"],
    shot: "STREAMSYNC",
    href: "/projects/streamsync",
  },
  {
    title: "DataFlow",
    year: "2024",
    category: "Platform / Data",
    desc: "High-throughput streaming pipeline processing 2M+ events per day with sub-100 ms latency and zero-downtime rolling deploys.",
    tags: ["Rust", "Kafka", "PostgreSQL", "Kubernetes"],
    shot: "DATAFLOW",
    href: "/projects/dataflow",
  },
  {
    title: "ShopKit",
    year: "2023",
    category: "E-commerce / B2C",
    desc: "Headless commerce platform with edge-deployed storefronts achieving 98+ Lighthouse scores across 40+ merchant sites.",
    tags: ["React", "TypeScript", "Stripe", "Vercel"],
    shot: "SHOPKIT",
    href: "/projects/shopkit",
  },
] as const;

export function FeaturedProjects() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <section
      ref={rootRef}
      style={{ maxWidth: "1120px", margin: "0 auto", padding: "clamp(80px, 12vw, 140px) 24px 0" }}
    >
      <SectionHeading
        label="SELECTED WORK"
        title="Featured projects"
        action={
          <Link
            href="/projects"
            className="border-border-default text-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "44px", padding: "0 18px", border: "1px solid var(--border)", borderRadius: "11px", background: "transparent", fontSize: "14px", fontWeight: 600, textDecoration: "none", transition: "border-color 200ms ease, transform 200ms ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--text-3)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            All projects <ArrowRight size={15} style={{ display: "inline", verticalAlign: "middle", marginLeft: "2px" }} />
          </Link>
        }
      />

      <div
        style={{ display: "grid", gap: "22px", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}

// ── ProjectCard ──────────────────────────────────────────────────────────────

interface ProjectCardProps {
  title: string;
  year: string;
  category: string;
  desc: string;
  tags: readonly string[];
  shot: string;
  href: string;
}

function ProjectCard({ title, year, category, desc, tags, shot, href }: ProjectCardProps) {
  return (
    <Link
      href={href}
      data-reveal
      className="border-border-default bg-elevated text-inherit"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        borderRadius: "18px",
        overflow: "hidden",
        textDecoration: "none",
        transition: "transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease, border-color .35s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-5px)";
        el.style.boxShadow = "var(--shadow)";
        el.style.borderColor = "var(--text-3)";
        const pattern = el.querySelector<HTMLElement>("[data-pattern]");
        if (pattern) pattern.style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.borderColor = "var(--border)";
        const pattern = el.querySelector<HTMLElement>("[data-pattern]");
        if (pattern) pattern.style.transform = "scale(1)";
      }}
    >
      {/* ── Screenshot placeholder ── */}
      <div className="bg-panel" style={{ position: "relative", overflow: "hidden", aspectRatio: "16 / 10" }}>
        <div
          data-pattern
          style={{
            position: "absolute",
            inset: 0,
            transition: "transform 500ms cubic-bezier(.2,.8,.2,1)",
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--border) 0, var(--border) 1px, transparent 1px, transparent 13px)",
          }}
        />
        <div className="font-mono text-muted" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: "12px", letterSpacing: ".06em" }}>
          {shot}
        </div>
        <div
          className="font-mono text-secondary"
          style={{ position: "absolute", top: "12px", left: "12px", fontSize: "11.5px", borderRadius: "999px",
            padding: "5px 10px",
            background: "var(--glass-bg)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid var(--glass-border)",
          }}
        >
          {category}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px" }}>
          <h3 className="font-display" style={{ fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-0.01em" }}>
            {title}
          </h3>
          <span className="font-mono text-muted" style={{ fontSize: "12px", flexShrink: 0 }}>
            {year}
          </span>
        </div>

        <p className="text-secondary" style={{ fontSize: "14.5px", flex: 1, lineHeight: 1.55 }}>
          {desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-secondary bg-panel border-border-default"
              style={{ fontSize: "11.5px", border: "1px solid var(--border)", borderRadius: "7px", transition: "border-color 200ms ease, transform 200ms ease", padding: "4px 9px" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
