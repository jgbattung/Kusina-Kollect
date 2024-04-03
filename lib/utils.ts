import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDate(dateInput: Date | string): string {
  const date = new Date(dateInput);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day:'numeric' }
  return date.toLocaleDateString('en-US', options);
}