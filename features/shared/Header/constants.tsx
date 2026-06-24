import { Sun, Moon, SunMoon } from "lucide-react";
import type { Theme } from "@/features/shared/ThemeProvider";
import type { NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { href: "/",         label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact",  label: "Contact" },
];

export const THEME_BTNS: { value: Theme; icon: React.ReactNode; title: string }[] = [
  { value: "system", icon: <SunMoon size={14} />, title: "System" },
  { value: "light",  icon: <Sun     size={14} />, title: "Light"  },
  { value: "dark",   icon: <Moon    size={14} />, title: "Dark"   },
];
