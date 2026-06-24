import type { TechMeta, SkillGroupData } from "./types";

// ── Brand colour + abbreviation for technologies without a simple-icons entry ─
export const TECH_META: Record<string, TechMeta> = {
  "Zustand":  { color: "#ff6b35", abbr: "Zs" },
  "PM2":      { color: "#2B037A", abbr: "PM" },
};

// ── Skill groups ──────────────────────────────────────────────────────────────
// Edit items here to update what's displayed on the site.
export const SKILL_GROUPS: SkillGroupData[] = [
  {
    num: "01",
    name: "Frontend",
    accent: "#6366f1",
    glow: "rgba(99,102,241,0.1)",
    items: [
      "TypeScript", "React", "Next.js",
      "Redux", "Zustand", "Tailwind",
      "Material UI", "SASS/SCSS", "Vite",
      "Webpack",
    ],
  },
  {
    num: "02",
    name: "Backend",
    accent: "#10b981",
    glow: "rgba(16,185,129,0.1)",
    items: [
      "Node.js", "Express",
      "MongoDB", "PostgreSQL", "Firebase",
      "JWT", "Docker", "Nginx", "PM2",
    ],
  },
  {
    num: "03",
    name: "Testing & Tools",
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.1)",
    items: [
      "Jest", "Cypress", "Mocha",
      "GitHub Actions", "Git", "GitHub", "Bitbucket",
    ],
  },
];
