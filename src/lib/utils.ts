import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const levels = {
  L1: "L1",
  L2: "L2",
  L3: "L3",
  L4: "L4",
};

export const getSuperior = new Map<string, string>([
  ["L2", levels.L1],
  ["L3", levels.L2],
  ["L4", levels.L3],
]);

export const levelColors = new Map<string, string>([
  [levels.L1, "border-[#e76f51]"],
  [levels.L2, "border-[#0077b6]"],
  [levels.L3, "border-[#02c39a]"],
  [levels.L4, "border-[#d5bdaf] "],
]);

export const levelsToPosition = new Map<string, string>([
  [levels.L1, "CEO"],
  [levels.L2, "Department head"],
  [levels.L3, "Team lead"],
  [levels.L4, "Team member"],
]);
