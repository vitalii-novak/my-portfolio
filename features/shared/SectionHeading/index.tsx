import type { CSSProperties, ReactNode } from "react";

interface SectionHeadingProps {
  label: string;
  title: string;
  action?: ReactNode;
  style?: CSSProperties;
}

export function SectionHeading({ label, title, action, style }: SectionHeadingProps) {
  return (
    <div
      data-reveal
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "40px",
        justifyContent: action ? "space-between" : "flex-start",
        ...style,
      }}
    >
      <div>
        <div className="font-mono text-muted" style={{ fontSize: "12.5px", letterSpacing: ".14em", marginBottom: "14px" }}>
          / {label}
        </div>
        <h2
          className="font-display"
          style={{ fontWeight: 600, letterSpacing: "-0.025em", fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
