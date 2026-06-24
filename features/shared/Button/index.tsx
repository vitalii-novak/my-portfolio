"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: CSSProperties;
}

const SIZE_STYLES: Record<ButtonSize, CSSProperties> = {
  sm: { height: "36px", padding: "0 14px", fontSize: "13.5px" },
  md: { height: "42px", padding: "0 20px", fontSize: "14.5px" },
  lg: { height: "50px", padding: "0 26px", fontSize: "15.5px" },
};

const VARIANT_STYLES: Record<ButtonVariant, CSSProperties> = {
  primary: {
    border: "none",
    background: "var(--accent)",
    color: "var(--accent-contrast)",
  },
  secondary: {
    border: "1px solid var(--border)",
    background: "var(--glass-bg)",
    color: "var(--text)",
  },
  ghost: {
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--text-2)",
  },
};

const BASE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "9px",
  borderRadius: "13px",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  whiteSpace: "nowrap",
  userSelect: "none",
  transition:
    "transform .3s cubic-bezier(.2,.8,.2,1), opacity .2s, border-color .2s",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  magnetic = false,
  href,
  onClick,
  type = "button",
  disabled,
  style,
}: ButtonProps) {
  const composed: CSSProperties = {
    ...BASE,
    ...SIZE_STYLES[size],
    ...VARIANT_STYLES[variant],
    ...style,
  };

  function onMove(e: MouseEvent<HTMLElement>) {
    if (!magnetic) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    const clamp = (v: number, limit: number) => Math.max(-limit, Math.min(limit, v));
    el.style.transform = `translate(${clamp(x * 0.08, 5)}px, ${clamp(y * 0.1, 4)}px)`;
  }

  function onEnter(e: MouseEvent<HTMLElement>) {
    if (variant === "primary") e.currentTarget.style.opacity = "0.9";
    if (variant === "secondary" || variant === "ghost")
      e.currentTarget.style.borderColor = "var(--text-3)";
  }

  function onLeave(e: MouseEvent<HTMLElement>) {
    if (magnetic) e.currentTarget.style.transform = "translate(0,0)";
    if (variant === "primary") e.currentTarget.style.opacity = "1";
    if (variant === "secondary" || variant === "ghost")
      e.currentTarget.style.borderColor = "var(--border)";
  }

  const handlers = {
    onMouseMove: onMove,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
  };

  if (href) {
    return (
      <Link href={href} style={composed} {...handlers}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={composed}
      {...handlers}
    >
      {children}
    </button>
  );
}
