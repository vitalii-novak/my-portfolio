import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Shown when a URL doesn't match any route.
export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6 gap-6">
      <p className="font-mono text-[12.5px] tracking-[.14em] text-muted">
        / 404
      </p>

      <h1 className="font-display font-semibold text-[clamp(3rem,8vw,6rem)] tracking-[-0.04em] leading-none">
        Page not found.
      </h1>

      <p className="text-secondary text-[clamp(1rem,2vw,1.2rem)] max-w-[420px] leading-[1.7]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 h-[50px] px-7 rounded-[13px] bg-accent text-accent-contrast font-semibold text-[15px] no-underline transition-opacity duration-200 hover:opacity-85"
      >
        Go home <ArrowRight size={16} />
      </Link>
    </main>
  );
}
