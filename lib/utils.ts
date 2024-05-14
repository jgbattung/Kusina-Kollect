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

interface Params {
  value: number,
  unit: string
}

export function getTotalTime(prep: Params, cook: Params) {
  const prepInMinutes = prep.unit === 'hours' ? prep.value * 60 : prep.value;
  const cookInMinutes = cook.unit === 'hours' ? cook.value * 60 : cook.value;
  const totalMinutes = prepInMinutes + cookInMinutes;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours > 0 ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : ''} ${minutes > 0 ? `${minutes} ${minutes === 1 ? 'min' : 'mins'}` : ''}`.trim();
}

export interface RecipeOfTheDayProps {
  _id: string;
  name: string;
  images: string[];
  submittedBy: {
    _id: string;
    image: string;
    name: string;
    username: string;
  };
  description: string;
  category?: string;
}