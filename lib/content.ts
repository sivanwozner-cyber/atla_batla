// lib/content.ts — מקור-האמת היחיד לתוכן האתר (CMS קליל מבוסס-JSON).
// נקרא ע"י עמוד הנחיתה (Server Components) ונכתב ע"י פאנל הניהול (/admin).
// שרת בלבד — אין לייבא את הקובץ הזה מרכיב "use client" (הוא משתמש ב-node:fs);
// רכיבי client מייבאים טיפוסים וקבועים מ-lib/content-types.ts.

import { promises as fs } from "node:fs";
import path from "node:path";
import type { SiteContent } from "@/lib/content-types";

export * from "@/lib/content-types";

// ברירת מחדל — משמשת גם כ-fallback אם קובץ ה-JSON חסר/פגום, וגם למיזוג שדות
// חסרים כשמוסיפים שדה חדש למודל. משוכפל מהערכים שהיו hard-coded ברכיבים.
export const defaultContent: SiteContent = {
  hero: {
    eyebrow: "Negev · Suomisaundi · Goa · Funk",
    tagline:
      "From the blazing deserts to the global underground — pure Suomisoundi madness and deep psychedelic energy.",
    ctaLabel: "Listen",
    ctaHref: "#music",
  },
  shows: [
    {
      id: "back2mad-2026-09",
      date: "2026-09-12",
      venue: "Back2Mad — Time To SuomiSaundi",
      city: "Israel",
      setType: "Live",
    },
  ],
  music: {
    intro:
      "שני EPs ב-Bandcamp. שמות הטראקים נשמרים בדיוק כפי שהם — כולל שגיאות כתיב מכוונות.",
    eps: [
      {
        id: "smoke-this-ep",
        title: "Smoke This EP",
        href: "https://randomrecords.bandcamp.com/album/smoke-this-ep",
        albumId: "2666857562",
        tracks: ["Tripi Tipi", "Bethoven's Virusss", "Smoke This"],
      },
      {
        id: "funk-them-all",
        title: "Funk Them All",
        href: "https://randomrecords.bandcamp.com/album/funk-them-all",
        albumId: "3936240832",
        tracks: [
          "Slappy Nights",
          "Angelic Camels",
          "Power Rangers (Tribute)",
          "Black Crows",
        ],
      },
    ],
  },
  about: {
    body: "From the blazing deserts to the global underground, Atla Batla delivers a wild blend of pure Suomisoundi madness and deep psychedelic energy — funky leads, driving basslines, and that unmistakable Finnish-inspired groove with a dusty desert twist.",
    creditPrefix: "Released on ",
    creditLabel: "Random Records",
    creditHref: "https://randomrecords.bandcamp.com",
    creditSuffix: " — a non-profit label supporting indigenous communities.",
  },
  booking: {
    email: "atlabatlasuomi@gmail.com",
    blurb: "Promoters — get in touch.",
  },
  socials: [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/atlabatla_suomi/",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/people/Atla-Batla-suomi/61578955019841/",
    },
    {
      id: "tiktok",
      label: "TikTok",
      href: "https://www.tiktok.com/@atla.batla",
    },
    {
      id: "youtube",
      label: "YouTube",
      href: "https://youtube.com/shorts/GINrPIkcOIE",
    },
    { id: "bandcamp", label: "Bandcamp", href: "https://atlabatla.bandcamp.com" },
    {
      id: "soundcloud",
      label: "SoundCloud",
      href: "https://soundcloud.com/atla-batla",
    },
  ],
  site: {
    title: "Atla Batla",
    description:
      "Atla Batla — from the blazing deserts of the Negev to the global underground. (placeholder)",
  },
};

const DATA_PATH = path.join(process.cwd(), "data", "site-content.json");

// מיזוג עמוק-רדוד מול ברירת המחדל — סובלני לקובץ חלקי/ישן.
function mergeContent(p: Partial<SiteContent>): SiteContent {
  return {
    hero: { ...defaultContent.hero, ...p.hero },
    shows: Array.isArray(p.shows) ? p.shows : defaultContent.shows,
    music: {
      intro: p.music?.intro ?? defaultContent.music.intro,
      eps: Array.isArray(p.music?.eps) ? p.music.eps : defaultContent.music.eps,
    },
    about: { ...defaultContent.about, ...p.about },
    booking: { ...defaultContent.booking, ...p.booking },
    socials: Array.isArray(p.socials) ? p.socials : defaultContent.socials,
    site: { ...defaultContent.site, ...p.site },
  };
}

/** קורא את תוכן האתר מ-data/site-content.json. אם חסר/פגום — מחזיר ברירת מחדל. */
export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return mergeContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return defaultContent;
  }
}

/** כותב את תוכן האתר בחזרה לדיסק (נקרא רק מ-server actions מאומתות). */
export async function saveContent(content: SiteContent): Promise<void> {
  const json = JSON.stringify(content, null, 2);
  await fs.writeFile(DATA_PATH, json + "\n", "utf8");
}
