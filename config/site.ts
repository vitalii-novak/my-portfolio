// ── Site-wide configuration ───────────────────────────────────────────────────
// Import this in any component (client or server) instead of hardcoding values.
// Sensitive keys (RESEND_API_KEY, OWNER_EMAIL, FROM_EMAIL) stay in .env only.

export const site = {
  // ── Identity ────────────────────────────────────────────────────────────────
  name: "Vitalii Novak",
  tagline: "Full-stack engineer",
  title: "Vitalii Novak | Fullstack Developer",
  description:
    "Full-stack engineer crafting high-performance web applications with clean architecture and exceptional UX.",

  // ── URLs ────────────────────────────────────────────────────────────────────
  // Fallbacks ensure the type is always `string` (not `string | undefined`).
  url: process.env.NEXT_PUBLIC_SITE_URL as string,
  email: process.env.NEXT_PUBLIC_OWNER_EMAIL as string,

  // ── Availability ────────────────────────────────────────────────────────────
  availabilityDate: "July 2026",
  projectsLaunchDate: "Q3 2026",

  // ── Social links ─────────────────────────────────────────────────────────────
  socials: {
    github: "https://github.com/vitalii-novak",
    linkedin: "https://www.linkedin.com/in/vitalii-novak",
    // x:      "https://x.com",
    // readcv: "https://read.cv",
  },
} as const;
