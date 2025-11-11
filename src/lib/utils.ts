import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number | string): string => {
  if (!value) return "₦0";
  const number = typeof value === "string" ? parseFloat(value.replace(/[^\d.-]/g, "")) : value;
  return `₦${number.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;
};
