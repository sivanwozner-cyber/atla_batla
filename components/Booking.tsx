"use client";

import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

// PRD §4.5 — מייל בולט, גדול, קליק-להעתקה. התוכן מה-store (נערך ב-/admin/site).
export function Booking({ booking }: { booking: SiteContent["booking"] }) {
  const { email: EMAIL, blurb } = booking;
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard לא זמין — נשאר את ה-mailto ככפתור הראשי
    }
  }

  return (
    <section id="booking" className="scroll-mt-14 px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="wordmark text-4xl sm:text-5xl">Booking</h2>
          <p className="mt-3 text-cream/70">
            Promoters — get in touch. (מייל placeholder)
          </p>

          <a
            href={`mailto:${EMAIL}`}
            className="mt-8 block break-all font-display text-3xl text-gold transition-colors hover:text-ember sm:text-4xl"
          >
            {EMAIL}
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-6")}
            >
              <Mail className="size-4" /> Email us
            </a>
            <button
              type="button"
              onClick={copy}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 gap-2 px-6"
              )}
            >
              {copied ? (
                <>
                  <Check className="size-4 text-lime" /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" /> Copy email
                </>
              )}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
