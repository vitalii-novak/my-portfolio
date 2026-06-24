import type { NextConfig } from "next";

// ── Security headers ──────────────────────────────────────────────────────────
// Applied to every response. Harden the browser's trust model.

const securityHeaders = [
  // Prevent the page from being embedded in an iframe (clickjacking)
  { key: "X-Frame-Options",           value: "DENY" },
  // Stop the browser from guessing the MIME type (MIME-sniffing attacks)
  { key: "X-Content-Type-Options",    value: "nosniff" },
  // Only send origin (not full URL path) as Referer to third parties
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  // Disable browser features this portfolio doesn't need
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
  // Force HTTPS for 1 year after first visit
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Content Security Policy — whitelist exactly what resources are allowed
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",

      // Scripts: self + Next.js inline hydration + PostHog SDK (US CDN) + Vercel analytics
      "script-src 'self' 'unsafe-inline' https://us-assets.i.posthog.com https://va.vercel-scripts.com https://cdn.vercel-insights.com",

      // Styles: self + inline (Tailwind/Next.js) + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

      // Fonts: self + Google Fonts CDN
      "font-src 'self' https://fonts.gstatic.com data:",

      // Images: self + data URIs (SVG/favicon data URLs)
      "img-src 'self' data:",

      // Fetch/XHR: self + PostHog (analytics) + Vercel (analytics & speed-insights)
      "connect-src 'self' https://*.i.posthog.com https://*.posthog.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",

      // PostHog loads its bundle from their CDN
      "worker-src blob:",

      // Frames: none
      "frame-src 'none'",

      // Old plugins (Flash, etc.): none
      "object-src 'none'",

      // Restrict <base> tag to self
      "base-uri 'self'",

      // Form submissions only to self
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // ── Security headers on every route ─────────────────────────────────────────
  async headers() {
    return [
      {
        source:  "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // ── Images ───────────────────────────────────────────────────────────────────
  // Add external hostnames here when you add project screenshots, etc.
  images: {
    remotePatterns: [],
  },

  // ── Compiler ─────────────────────────────────────────────────────────────────
  compiler: {
    // Strip console.log in production; keep console.error and console.warn
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  // ── Performance ──────────────────────────────────────────────────────────────
  // Remove the X-Powered-By: Next.js response header (minor security hardening)
  poweredByHeader: false,
};

export default nextConfig;
