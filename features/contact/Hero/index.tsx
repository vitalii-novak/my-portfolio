"use client";

import { useRef } from "react";
import { useReveal } from "@/features/shared/hooks/useReveal";

export function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      style={{ maxWidth: "1120px", margin: "0 auto", padding: "clamp(120px, 18vh, 180px) 24px clamp(40px, 6vw, 64px)" }}
    >
      <p
        data-reveal
        className="font-mono text-muted"
        style={{ fontSize: "12.5px", letterSpacing: ".14em", marginBottom: "20px" }}
      >
        / CONTACT
      </p>

      <h1
        data-reveal
        className="font-display"
        style={{ fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "28px", fontSize: "clamp(3rem, 7.5vw, 5.5rem)" }}
      >
        Let&apos;s work
        <br />
        together.
      </h1>

      <p
        data-reveal
        className="text-secondary"
        style={{ maxWidth: "520px", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7 }}
      >
        Have a project in mind, a question, or just want to say hello? I read
        every message and reply within 24 hours.
      </p>
    </section>
  );
}
