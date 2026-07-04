import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const YOUTUBE_ID_PATTERNS = [
  /youtube\.com\/shorts\/([\w-]{11})/,
  /youtube\.com\/watch\?v=([\w-]{11})/,
  /youtu\.be\/([\w-]{11})/,
  /youtube\.com\/embed\/([\w-]{11})/,
];

/** מחלץ מזהה סרטון מכל צורת קישור יוטיוב נפוצה ומחזיר קישור embed מוכן לאייפריים. */
export function getYouTubeEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  for (const re of YOUTUBE_ID_PATTERNS) {
    const m = trimmed.match(re);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
  }
  return null;
}
