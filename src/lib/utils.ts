import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Tailwind class merger ────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Skill type colors ────────────────────────────────────────────────────
export const SKILL_COLORS = {
  technical: { bg: "#E1F5EE", dot: "#1D9E75", bar: "#5DCAA5", text: "#085041" },
  tools:     { bg: "#E6F1FB", dot: "#185FA5", bar: "#378ADD", text: "#042C53" },
  soft:      { bg: "#EEEDFE", dot: "#534AB7", bar: "#7F77DD", text: "#26215C" },
  domain:    { bg: "#FAEEDA", dot: "#854F0B", bar: "#EF9F27", text: "#412402" },
} as const;

// ─── Level colors (career ladder) ────────────────────────────────────────
export const LEVEL_COLORS = [
  { circle: "#1D9E75", circleBg: "#E1F5EE", line: "#9FE1CB", expBg: "#E1F5EE", expText: "#085041" },
  { circle: "#185FA5", circleBg: "#E6F1FB", line: "#B5D4F4", expBg: "#E6F1FB", expText: "#042C53" },
  { circle: "#534AB7", circleBg: "#EEEDFE", line: "#CECBF6", expBg: "#EEEDFE", expText: "#26215C" },
  { circle: "#993C1D", circleBg: "#FAECE7", line: "#F5C4B3", expBg: "#FAECE7", expText: "#4A1B0C" },
  { circle: "#854F0B", circleBg: "#FAEEDA", line: "#FAC775", expBg: "#FAEEDA", expText: "#412402" },
];

// ─── Phase colors ─────────────────────────────────────────────────────────
export const PHASE_COLORS = ["#5DCAA5", "#378ADD", "#7F77DD", "#D85A30", "#EF9F27"];

// ─── Future trend colors ──────────────────────────────────────────────────
export const FUTURE_THEMES = {
  teal:   { bg: "#E1F5EE", border: "#9FE1CB", title: "#085041", desc: "#0F6E56" },
  blue:   { bg: "#E6F1FB", border: "#B5D4F4", title: "#042C53", desc: "#185FA5" },
  purple: { bg: "#EEEDFE", border: "#CECBF6", title: "#26215C", desc: "#534AB7" },
  amber:  { bg: "#FAEEDA", border: "#FAC775", title: "#412402", desc: "#854F0B" },
};

// ─── Demand badge ─────────────────────────────────────────────────────────
export function getDemandColor(demand: string) {
  if (demand === "High")   return "bg-emerald-100 text-emerald-800 border-emerald-300";
  if (demand === "Medium") return "bg-amber-100 text-amber-800 border-amber-300";
  return "bg-red-100 text-red-800 border-red-300";
}

// ─── Misc ─────────────────────────────────────────────────────────────────
export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
