"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Music,
  FileText,
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "לוח בקרה", icon: LayoutDashboard },
  { href: "/admin/shows", label: "הופעות", icon: CalendarDays },
  { href: "/admin/music", label: "מוזיקה", icon: Music },
  { href: "/admin/site", label: "תוכן ועיצוב", icon: FileText },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex max-w-4xl items-center gap-1 overflow-x-auto px-3 pb-2">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold whitespace-nowrap transition-colors",
              active
                ? "bg-gold text-night"
                : "text-cream/70 hover:bg-white/5 hover:text-gold"
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}

      <form action={logoutAction} className="ms-auto shrink-0 ps-2">
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold whitespace-nowrap text-cream/60 transition-colors hover:bg-destructive/15 hover:text-destructive"
        >
          <LogOut className="size-4" />
          יציאה
        </button>
      </form>
    </nav>
  );
}
