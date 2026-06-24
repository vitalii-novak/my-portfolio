// ── Shared UI types used across features ──────────────────────────────────────

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

/** Generic section reveal data attribute shape */
export interface RevealItem {
  "data-reveal"?: boolean;
  "data-index"?: number;
}
