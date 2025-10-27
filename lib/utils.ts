import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const keyRandomizer = (key: string) => {
  return `${key}-${crypto.randomUUID()}`;
};
