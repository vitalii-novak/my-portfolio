import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/features/shared";
import { PostHogProvider } from "@/features/shared/PostHogProvider";
import { site } from "@/config/site";
import "./globals.css";

// ── Fonts ─────────────────────────────────────────────────────────────────────

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // prevent invisible text during font load (FOIT)
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// ── Viewport (separate from metadata per Next.js 14+ best practice) ───────────

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)",  color: "#0a0a0b" },
  ],
};

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default:  site.title,
    template: `%s | ${site.name}`,
  },
  description:  site.description,
  metadataBase: new URL(site.url),
  robots:       { index: true, follow: true },
  icons:        { icon: "/favicon.ico" },
  openGraph: {
    type:        "website",
    siteName:    site.name,
    title:       site.title,
    description: site.description,
    url:         site.url,
  },
  twitter: {
    card:        "summary_large_image",
    title:       site.title,
    description: site.description,
  },
};

// ── Theme initialisation script ───────────────────────────────────────────────
//
// WHY THIS EXISTS
// ───────────────
// React and ThemeProvider run only after JS hydration (~100-300 ms after paint).
// Without this script a user who saved "dark" mode would briefly see the light
// theme — a jarring flash known as FOUC (Flash of Unstyled Content).
//
// HOW IT WORKS
// ─────────────
// 1. Reads the saved preference from localStorage (key: "vn-theme").
// 2. If "system" or no value → resolves against prefers-color-scheme.
// 3. Writes data-theme="light" | "dark" on <html> BEFORE the first paint.
//
// WHY dangerouslySetInnerHTML
// ────────────────────────────
// The script must be synchronous and inline — using <script src> or async/defer
// would execute too late (after the browser has already painted the page).
// The try/catch silently handles environments where localStorage is blocked
// (e.g. private browsing with strict settings).

const THEME_KEY    = "vn-theme";
const SYSTEM_THEME = "system";

const themeInitScript = `(function () {
  try {
    var savedTheme   = localStorage.getItem('${THEME_KEY}') || '${SYSTEM_THEME}';
    var systemIsDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
    var resolvedTheme = savedTheme === '${SYSTEM_THEME}'
      ? (systemIsDark ? 'dark' : 'light')
      : savedTheme;
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  } catch (_) {}
})();`;

// ── Root layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVariables = [
    spaceGrotesk.variable,
    manrope.variable,
    jetbrainsMono.variable,
  ].join(" ");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs synchronously before first paint — prevents theme flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${fontVariables} antialiased`}>
        <PostHogProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </PostHogProvider>
      </body>

      {/* Vercel Analytics — tracks page views and custom events */}
      <Analytics />

      {/* Vercel Speed Insights — real-user Core Web Vitals monitoring */}
      <SpeedInsights />
    </html>
  );
}
