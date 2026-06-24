"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/features/shared/SectionHeading";
import { useReveal } from "@/features/shared/hooks/useReveal";

// ── Data ──────────────────────────────────────────────────────────────────────

const POSTS = [
  {
    category: "Engineering",
    readTime: 8,
    title: "Why I Stopped Using ORMs for Complex Queries",
    excerpt:
      "ORMs are great — until they aren't. Here's where raw SQL wins and what I reach for instead in production Go services.",
    date: "Jun 2025",
    href: "/blog/no-orm",
  },
  {
    category: "Architecture",
    readTime: 12,
    title: "CRDT-Based Collaboration Without the PhD",
    excerpt:
      "A practical walkthrough of building real-time sync with Yjs — pitfalls, performance benchmarks, and hard-won production lessons.",
    date: "Apr 2025",
    href: "/blog/crdt-practical",
  },
  {
    category: "Frontend",
    readTime: 6,
    title: "The Case for Zero-Runtime CSS in 2025",
    excerpt:
      "Tailwind v4, vanilla-extract, and why I think runtime CSS-in-JS has had its moment — and why it's probably over.",
    date: "Feb 2025",
    href: "/blog/zero-runtime-css",
  },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export function LatestPosts() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <section
      ref={rootRef}
      style={{ maxWidth: "1120px", margin: "0 auto", padding: "clamp(80px, 12vw, 140px) 24px 0" }}
    >
      <SectionHeading
        label="WRITING"
        title="From the blog"
        action={
          <Link
            href="/blog"
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
            All posts <ArrowRight size={15} style={{ display: "inline", verticalAlign: "middle", marginLeft: "2px" }} />
          </Link>
        }
      />

      <div
        style={{ display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
      >
        {POSTS.map((post) => (
          <PostCard key={post.href} {...post} />
        ))}
      </div>
    </section>
  );
}

// ── PostCard ──────────────────────────────────────────────────────────────────

interface PostCardProps {
  category: string;
  readTime: number;
  title: string;
  excerpt: string;
  date: string;
  href: string;
}

function PostCard({ category, readTime, title, excerpt, date, href }: PostCardProps) {
  return (
    <Link
      href={href}
      data-reveal
      className="border-border-default bg-elevated text-inherit"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "13px",
        padding: "24px",
        border: "1px solid var(--border)",
        borderRadius: "18px",
        textDecoration: "none",
        transition: "transform .3s cubic-bezier(.2,.8,.2,1), border-color .3s ease, box-shadow .3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = "var(--text-3)";
        el.style.boxShadow = "var(--shadow)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Meta row */}
      <div className="font-mono text-muted" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px" }}>
        <span className="text-secondary">{category}</span>
        <span>·</span>
        <span>{readTime} min read</span>
      </div>

      {/* Title */}
      <h3
        className="font-display"
        style={{ fontWeight: 600, fontSize: "1.2rem", lineHeight: 1.25, letterSpacing: "-0.01em" }}
      >
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-secondary" style={{ fontSize: "14px", flex: 1, lineHeight: 1.55 }}>
        {excerpt}
      </p>

      {/* Date */}
      <div className="font-mono text-muted" style={{ fontSize: "12.5px" }}>
        {date}
      </div>
    </Link>
  );
}
