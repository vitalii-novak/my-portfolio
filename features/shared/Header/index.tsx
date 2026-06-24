"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/features/shared/ThemeProvider";
import { NAV_LINKS, THEME_BTNS } from "./constants";

// ── Component ─────────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Sticky nav pill ───────────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "center", padding: "14px 20px", pointerEvents: "none" }}>
        <div
          style={{
            background: "var(--nav-glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(24px) saturate(1.8)",
            WebkitBackdropFilter: "blur(24px) saturate(1.8)",
            boxShadow: "var(--nav-shadow)",
            width: "100%",
            maxWidth: "1120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "8px 8px 8px 18px",
            borderRadius: "16px",
            pointerEvents: "auto",
          }}
        >
          {/* ── Logo ──────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="text-primary"
            style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none", flexShrink: 0, transition: "opacity 200ms ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            <span className="font-display bg-accent text-accent-contrast" style={{ display: "grid", placeItems: "center", width: "28px", height: "28px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
              V
            </span>
            <span className="font-display" style={{ fontWeight: 600, fontSize: "14.5px", letterSpacing: "-.01em" }}>
              Vitalii Novak
            </span>
          </Link>

          {/* ── Nav links (desktop) ───────────────────────────────────── */}
          <div className="header-nav-links" style={{ display: "flex", alignItems: "center", gap: "1px" }}>
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "34px",
                    padding: "0 13px",
                    borderRadius: "9px",
                    fontWeight: active ? 600 : 500,
                    color: active ? "var(--text)" : "var(--text-2)",
                    background: active ? "var(--panel)" : "transparent",
                    transition: "color .18s ease, background .18s ease",
                    textDecoration: "none",
                    fontSize: "13.5px",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "var(--text)";
                      e.currentTarget.style.background = "var(--panel)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "var(--text-2)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* ── Right controls ────────────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            {/* Theme switcher — minimal pill */}
            <div className="header-theme-switcher bg-panel border-border-default" style={{ display: "flex", alignItems: "center", gap: "1px", padding: "3px", borderRadius: "10px", border: "1px solid var(--border)" }}>
              {THEME_BTNS.map(({ value, icon, title }) => {
                const active = theme === value;
                return (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    title={title}
                    className="font-mono"
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: "28px",
                      height: "28px",
                      borderRadius: "7px",
                      border: 0,
                      cursor: "pointer",
                      transition: "background .18s ease, color .18s ease",
                      background: active ? "var(--bg-elev)" : "transparent",
                      color: active ? "var(--text)" : "var(--text-3)",
                      boxShadow: active ? "0 1px 3px rgba(0,0,0,.1)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!active)
                        e.currentTarget.style.color = "var(--text-2)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        e.currentTarget.style.color = "var(--text-3)";
                    }}
                  >
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Get in touch (desktop) */}
            <Link
              href="/contact"
              className="header-nav-links bg-accent text-accent-contrast"
              style={{
                display: "flex",
                alignItems: "center",
                height: "34px",
                padding: "0 15px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "opacity 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Get in touch
            </Link>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setOpen((isOpen) => !isOpen)}
              className="header-hamburger border-border-default text-primary"
              aria-label={open ? "Close menu" : "Open menu"}
              style={{
                display: "grid",
                placeItems: "center",
                width: "36px",
                height: "36px",
                border: "1px solid var(--border)",
                background: "transparent",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "background .18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--panel)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile dropdown ────────────────────────────────────────────── */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: "74px",
            left: "20px",
            right: "20px",
            zIndex: 99,
            background: "var(--nav-glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(24px) saturate(1.8)",
            WebkitBackdropFilter: "blur(24px) saturate(1.8)",
            boxShadow: "var(--shadow)",
            animation: "pageIn .28s ease both",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            padding: "8px",
            borderRadius: "16px",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "42px",
                  padding: "0 14px",
                  borderRadius: "10px",
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--text)" : "var(--text-2)",
                  background: active ? "var(--panel)" : "transparent",
                  transition: "background .18s ease, color .18s ease",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "var(--panel)";
                    e.currentTarget.style.color = "var(--text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-2)";
                  }
                }}
              >
                {label}
              </Link>
            );
          })}

          {/* Mobile theme row */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "8px 14px 4px", marginTop: "2px", borderTop: "1px solid var(--border)" }}>
            <span className="font-mono text-muted" style={{ fontSize: "10.5px", letterSpacing: ".12em", marginRight: "6px" }}>
              THEME
            </span>
            {THEME_BTNS.map(({ value, icon, title }) => {
              const active = theme === value;
              return (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  title={title}
                  className="font-mono"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    border: 0,
                    cursor: "pointer",
                    background: active ? "var(--bg-elev)" : "transparent",
                    color: active ? "var(--text)" : "var(--text-3)",
                    boxShadow: active ? "0 1px 3px rgba(0,0,0,.1)" : "none",
                    transition: "background .18s ease, color .18s ease",
                  }}
                >
                  {icon}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
