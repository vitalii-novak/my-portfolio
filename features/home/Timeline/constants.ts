import type { TimelineItem } from "./types";

// ── Accent colour for the current role ───────────────────────────────────────
export const ACCENT = "#22c55e";

// ── Layout constants ──────────────────────────────────────────────────────────
export const PERIOD_W = 160; // period column width (px)
export const MARKER_W = 44; // marker column width (px)
export const LINE_LEFT = PERIOD_W + MARKER_W / 2; // dashed line left offset (px)

// ── Timeline data ─────────────────────────────────────────────────────────────
export const TIMELINE: TimelineItem[] = [
  {
    period: "2023 — now",
    role: "Full-stack Developer",
    company: "Atlasiko Inc.",
    desc: "Working as a full-stack developer on a range of client products — from internal tooling to customer-facing platforms. Driving frontend architecture decisions, building scalable React and Next.js applications, and collaborating closely with design and product teams to deliver polished, production-ready software.",
    current: true,
  },
  {
    period: "2022 — 2023",
    role: "Junior Frontend Developer",
    company: "Five System Development",
    desc: "Joined as a junior developer and quickly took ownership of frontend features across multiple projects. Built component-driven UIs with React and TypeScript, contributed to code reviews, and developed a strong foundation in modern JavaScript tooling and team-based workflows.",
    current: false,
  },
  {
    period: "2021 — 2022",
    role: "Freelance Developer",
    company: "Self-employed",
    desc: "Started out as a freelancer — designing and building websites and small web apps for individual clients and local businesses. Handled projects end-to-end, from scoping requirements to final delivery, which gave me a strong sense of ownership and problem-solving early on.",
    current: false,
  },
];
