import type { GhostCardData } from "./types";

export const PHRASES = [
  "something great.",
  "something durable.",
  "something remarkable.",
  "something worth the wait.",
] as const;

export const GHOST_CARDS: GhostCardData[] = [
  { tags: ["Next.js", "Node.js", "MongoDB"],    accent: "#6366f1" },
  { tags: ["React", "TypeScript", "Docker"],    accent: "#10b981" },
  { tags: ["Express", "PostgreSQL", "Firebase"], accent: "#f59e0b" },
];
