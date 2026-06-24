/**
 * Projects feature — micro-frontend ready.
 * This feature is intentionally self-contained so it can be extracted
 * to a separate Next.js app (Module Federation) when projects go live.
 */

export interface GhostCardData {
  tags: readonly string[];
  accent: string;
}
