"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

// ── Page view tracker ─────────────────────────────────────────────────────────
// Next.js App Router doesn't trigger full page reloads on navigation,
// so we track page views manually by watching the pathname.

function PageViewTracker() {
  const pathname   = usePathname();
  const searchParams = useSearchParams();
  const ph         = usePostHog();

  useEffect(() => {
    if (!ph || !pathname) return;
    const url = window.origin + pathname +
      (searchParams.toString() ? `?${searchParams.toString()}` : "");
    ph.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, ph]);

  return null;
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key  = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

    if (!key) return; // analytics disabled when key is not set

    posthog.init(key, {
      api_host:              host,
      ui_host:               "https://us.posthog.com",
      person_profiles:       "identified_only", // no anonymous profile creation
      capture_pageview:      false,             // we track manually above
      capture_pageleave:     true,              // track when user leaves a page
      autocapture:           false,             // manual events only — less noise
      // Remove `debug` line after verifying everything works
      debug:                 process.env.NODE_ENV === "development",
      session_recording: {
        maskAllInputs: true, // never record what users type
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      {/* Suspense required because useSearchParams is used inside */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
