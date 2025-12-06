import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import ls from "localstorage-slim";

ls.config.storage = sessionStorage;

export const setLS = (key: string, value: unknown) => {
  return ls.set(key, value, { encrypt: true });
};

export const getLS = <T>(key: string): T => {
  return ls.get(key, { decrypt: true }) as T;
};

export const removeLS = (key: string) => {
  return ls.remove(key);
};

export const clearLS = () => {
  return ls.clear();
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal", // Default, but can be 'currency', 'percent', etc.
  minimumFractionDigits: 2, // Ensures at least 2 decimal places
  maximumFractionDigits: 2, // Ensures at most 2 decimal places
});
