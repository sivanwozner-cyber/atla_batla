// lib/content-schema.ts — טיפוסים + קבועים משותפים לתוכן האתר. קובץ בטוח-ל-client
// (ללא תלות ב-node:fs) כדי שרכיבי "use client" (עורכי האדמין) יוכלו לייבא ממנו
// ערכי runtime כמו SET_TYPES/SOCIAL_LABELS בלי לגרור את lib/content.ts (שמשתמש
// ב-node:fs) לתוך ה-bundle של הדפדפן.

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
