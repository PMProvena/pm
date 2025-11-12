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

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  // Format as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

