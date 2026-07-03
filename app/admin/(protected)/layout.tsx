import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { requireSession } from "@/lib/session";
import { AdminNav } from "./admin-nav";

export const metadata: Metadata = {
  title: "ניהול · Atla Batla",
  robots: { index: false, follow: false },
};

// המעטפת המאובטחת של כל עמודי הניהול. requireSession כאן = הגנה בעומק
// (proxy כבר חוסם, אבל לא מסתמכים עליו לבד).
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  return (
    <div dir="rtl" className="flex min-h-svh flex-col bg-night text-cream">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-night/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/generated/wordmark.png"
              alt="Atla Batla"
              width={1229}
              height={1015}
              sizes="44px"
              className="h-9 w-auto"
            />
            <span className="hidden text-sm font-bold text-cream/50 sm:inline">
              ניהול
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cream/60 transition-colors hover:text-gold"
            >
              <ExternalLink className="size-3.5" /> צפייה באתר
            </a>
            <span className="hidden text-xs text-cream/40 sm:inline">
              {session.sub}
            </span>
          </div>
        </div>
        <AdminNav />
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}
