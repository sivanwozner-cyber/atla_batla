// lib/content-types.ts — הטיפוסים והקבועים של תוכן האתר, בלי תלות ב-node:fs.
// בטוח לייבוא מרכיבי "use client" (עורכי האדמין). הלוגיקה שקוראת/כותבת לדיסק
// יושבת ב-lib/content.ts, שמייבא ומייצא-מחדש את הכול מכאן.

export type SetType = "Live" | "DJ Set" | "Hybrid";
export const SET_TYPES: SetType[] = ["Live", "DJ Set", "Hybrid"];

export interface ShowEvent {
  id: string;
  date: string; // "YYYY-MM-DD"
  venue: string;
  city: string;
  ticketUrl?: string;
  setType: SetType;
}

export interface EP {
  id: string;
  title: string;
  href: string;
  albumId: string;
  tracks: string[];
}

export type SocialLabel = "Instagram" | "Facebook" | "Bandcamp" | "SoundCloud";
export const SOCIAL_LABELS: SocialLabel[] = [
  "Instagram",
  "Facebook",
  "Bandcamp",
  "SoundCloud",
];

export interface SocialLink {
  id: string;
  label: SocialLabel;
  href: string;
}

export interface SiteContent {
  hero: {
    eyebrow: string;
    tagline: string;
    ctaLabel: string;
    ctaHref: string;
  };
  shows: ShowEvent[];
  music: {
    intro: string;
    eps: EP[];
  };
  about: {
    body: string;
    creditPrefix: string;
    creditLabel: string;
    creditHref: string;
    creditSuffix: string;
  };
  booking: {
    email: string;
    blurb: string;
  };
  socials: SocialLink[];
  site: {
    title: string;
    description: string;
  };
}

/** סינון להופעות עתידיות בלבד, ממוינות עולה (date >= today). כמו ב-PRD §6. */
export function upcomingShows(list: ShowEvent[]): ShowEvent[] {
  const today = new Date().toISOString().slice(0, 10);
  return [...list]
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
