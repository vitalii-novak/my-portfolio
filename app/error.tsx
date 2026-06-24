"use client";

// Global error boundary — catches uncaught runtime errors in the app.
// Must be a Client Component so React can catch rendering errors.
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface ErrorPageProps {
  error:  Error & { digest?: string };
  reset:  () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to your error-monitoring service here (e.g. Sentry)
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6 gap-6">
      <p className="font-mono text-[12.5px] tracking-[.14em] text-muted">
        / ERROR
      </p>

      <h1 className="font-display font-semibold text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.04em] leading-none">
        Something went wrong.
      </h1>

      <p className="text-secondary text-[clamp(1rem,2vw,1.2rem)] max-w-[420px] leading-[1.7]">
        An unexpected error occurred. Please try again — if the problem persists,
        reach out directly.
      </p>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 h-[50px] px-7 rounded-[13px] bg-accent text-accent-contrast font-semibold text-[15px] border-0 cursor-pointer transition-opacity duration-200 hover:opacity-85"
        >
          Try again <ArrowRight size={16} />
        </button>

        <a
          href="/"
          className="inline-flex items-center h-[50px] px-7 rounded-[13px] border border-border-default text-primary font-medium text-[15px] no-underline transition-[border-color] duration-200 hover:border-border-subtle"
        >
          Go home
        </a>
      </div>
    </main>
  );
}
