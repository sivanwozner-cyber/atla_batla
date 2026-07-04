"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#shows", label: "Shows" },
  { href: "#music", label: "Music" },
  { href: "#about", label: "About" },
];

// הדר sticky (PRD §4) — wordmark משמאל, ניווט עוגנים מימין, כפתור Booking בולט,
// ובמובייל תפריט Sheet (shadcn/Base UI).
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-white/10 bg-night/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a
          href="#top"
          aria-label="Atla Batla — back to top"
          className="flex items-center"
        >
          <Image
            src="/generated/wordmark.png"
            alt="Atla Batla"
            width={1229}
            height={1015}
            sizes="48px"
            className="h-10 w-auto"
          />
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden items-center gap-6 sm:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-bold uppercase tracking-wide text-cream/80 transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* כפתור Booking בולט — גלוי גם במובייל, לצד תפריט ה-Sheet */}
          <a
            href="#booking"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-9 px-4 text-sm font-bold uppercase tracking-wide"
            )}
          >
            Booking
          </a>

          <div className="sm:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                aria-label="Open menu"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "text-cream"
                )}
              >
                <Menu />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-white/10 bg-night text-cream"
              >
                <SheetTitle className="px-4 pt-5">
                  <Image
                    src="/generated/wordmark.png"
                    alt="Atla Batla"
                    width={1229}
                    height={1015}
                    sizes="40px"
                    className="h-8 w-auto"
                  />
                </SheetTitle>
                <nav className="mt-4 flex flex-col gap-1 px-2">
                  {[...NAV, { href: "#booking", label: "Booking" }].map((n) => (
                    <a
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 text-lg font-bold uppercase tracking-wide text-cream/90 transition-colors hover:bg-white/5 hover:text-gold"
                    >
                      {n.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
