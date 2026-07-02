import Image from "next/image";
import { Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Hero (PRD §4.1) — wordmark ענק, טאגליין (placeholder), CTA "Listen" → #music.
// רקע: איור AI נוצר ב-Gemini (§7, public/generated/hero.png) — לילה מדברי,
// אוטובוסי מפלצת + מסקוט הגמל. מעליו scrim לקריאוּת + טוויקול כוכבים עדין (CSS).
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92svh] scroll-mt-14 flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
    >
      {/* רקע האיור (Gemini). object-center שומר את הגמל/האוטובוסים גם בקרופ מובייל */}
      <Image
        src="/generated/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      {/* scrim: כהה קל למעלה (מחדד את ה-wordmark) + זוהר מרכזי לטקסט + דהייה
          לרקע הלילה בתחתית כדי להתמזג עם הסקשן הבא */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/10 to-night"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_42%,rgba(11,4,32,0.6),transparent_70%)]"
        aria-hidden
      />
      {/* טוויקול כוכבים עדין מעל השמיים (PRD §5, מכובד prefers-reduced-motion) */}
      <div className="starfield-twinkle opacity-60" aria-hidden />

      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan drop-shadow-[0_1px_6px_rgba(11,4,32,0.9)]">
          Negev · Suomisaundi · Goa · Funk
        </p>
        <h1 className="mt-1 flex justify-center">
          <Image
            src="/generated/wordmark.png"
            alt="Atla Batla"
            width={2638}
            height={846}
            priority
            sizes="(max-width: 768px) 88vw, 760px"
            className="h-auto w-[88vw] max-w-[760px] drop-shadow-[0_8px_28px_rgba(11,4,32,0.6)]"
          />
        </h1>
        <p className="mt-6 max-w-xl text-lg text-cream/85 drop-shadow-[0_1px_8px_rgba(11,4,32,0.95)]">
          From the blazing deserts to the global underground — pure Suomisoundi
          madness and deep psychedelic energy.
        </p>
        <a
          href="#music"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-8 h-12 gap-2 rounded-full px-8 text-base"
          )}
        >
          <Play className="size-5" />
          Listen
        </a>
      </div>
    </section>
  );
}
