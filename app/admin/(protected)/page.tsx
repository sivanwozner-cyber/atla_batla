import Link from "next/link";
import {
  CalendarDays,
  Music,
  FileText,
  ArrowLeft,
  Mail,
  Share2,
} from "lucide-react";
import { getContent, upcomingShows } from "@/lib/content";

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AdminDashboard() {
  const content = await getContent();
  const upcoming = upcomingShows(content.shows);
  const next = upcoming[0];

  const stats = [
    {
      label: "הופעות עתידיות",
      value: String(upcoming.length),
      sub: next ? `הקרובה: ${formatDate(next.date)}` : "אין הופעות מתוכננות",
      icon: CalendarDays,
    },
    { label: "אלבומים (EPs)", value: String(content.music.eps.length), sub: "ב-Bandcamp", icon: Music },
    { label: "רשתות חברתיות", value: String(content.socials.length), sub: "בפוטר", icon: Share2 },
  ];

  const sections = [
    {
      href: "/admin/shows",
      title: "הופעות קרובות",
      desc: "הוספה, עריכה ומחיקה של הופעות. רק הופעות עתידיות מוצגות באתר.",
      icon: CalendarDays,
    },
    {
      href: "/admin/music",
      title: "מוזיקה",
      desc: "טקסט הפתיחה והאלבומים (EPs) עם רשימות הטראקים.",
      icon: Music,
    },
    {
      href: "/admin/site",
      title: "תוכן ועיצוב",
      desc: "כותרת ראשית, אודות, בוקינג, רשתות חברתיות וכותרת האתר.",
      icon: FileText,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black text-cream">שלום 👋</h1>
        <p className="mt-1 text-sm text-cream/60">
          כאן עורכים את כל התוכן שמופיע באתר. שינויים נשמרים ומתעדכנים מיד.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, sub, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-card/60 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-cream/60">{label}</span>
              <Icon className="size-4 text-cyan" />
            </div>
            <p className="mt-2 font-display text-3xl text-gold">{value}</p>
            <p className="mt-1 text-xs text-cream/40">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map(({ href, title, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-card/60 p-5 transition-colors hover:border-gold/50"
          >
            <div className="flex items-center gap-2">
              <Icon className="size-5 text-magenta" />
              <h2 className="font-display text-lg text-cream">{title}</h2>
            </div>
            <p className="text-sm text-cream/60">{desc}</p>
            <span className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-gold">
              עריכה
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </span>
          </Link>
        ))}

        <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-card/40 p-5">
          <div className="flex items-center gap-2">
            <Mail className="size-5 text-lime" />
            <h2 className="font-display text-lg text-cream">מייל לבוקינג</h2>
          </div>
          <p dir="ltr" className="text-start text-sm break-all text-cream/60">
            {content.booking.email || "—"}
          </p>
          <Link
            href="/admin/site"
            className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-gold"
          >
            עריכה
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
