export interface Sym {
  ch: string;
  top: string;
  left: string;
  sx: number;       // max parallax X (px)
  sy: number;       // max parallax Y (px)
  size: number;     // font size (px)
  opacity: number;
  color?: string;   // accent color; defaults to var(--text-3)
}
