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
