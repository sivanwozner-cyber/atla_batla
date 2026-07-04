import Image from "next/image";
import { Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

// Hero (PRD §4.1) — wordmark ענק, טאגליין, CTA → #music. הטקסטים נטענים מה-store
// (נערכים ב-/admin/site). רקע: איור AI מ-Gemini (§7, public/generated/hero.png).
//
// תיקון רספונסיביות מובייל: במסכים נמוכים/צרים (למשל iPhone SE, 320×568)
// ה-padding/spacing הקבועים דחפו את כפתור ה-CTA מתחת לגובה המסך — מוקטנים
// ב-mobile (ברירת המחדל) וגדלים חזרה מ-sm ומעלה. וביחס הצר של מובייל הקרופ
// של הרקע (object-center) חתך בדיוק דרך הפה של המפלצת השמאלית — object-position
// זז במובייל כדי להראות פחות מהאוטובוס ויותר מהשמיים/מדבר הפתוחים, וחוזר
// למרכז המקורי מ-sm ומעלה.
export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92svh] scroll-mt-14 flex-col items-center justify-center overflow-hidden px-6 py-10 text-center sm:py-20"
    >
      {/* רקע האיור (Gemini). שני המפלצות/אוטובוסים בתמונה נמצאות בקצוות עם
          פער-שמיים ריק ביניהן — object-[58%_50%] ממרכז את הקרופ במובייל בדיוק
          על הפער הזה, כך שרואים בעיקר שמיים/שקיעה פתוחים ורק קצה קטן של כל
          מפלצת בשוליים, במקום פרצוף שלם וצפוף. מ-sm ומעלה חוזרים למרכז המקורי,
          ששם הקרופ הרחב יותר כבר מציג את שתי המפלצות יפה */}
      <Image
        src="/generated/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_50%] sm:object-center"
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
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-cyan drop-shadow-[0_1px_6px_rgba(11,4,32,0.9)] sm:mb-4">
          {hero.eyebrow}
        </p>
        <h1 className="mt-1 flex justify-center">
          <Image
            src="/generated/wordmark.png"
            alt="Atla Batla"
            width={2340}
            height={1755}
            priority
            sizes="(max-width: 640px) 65vw, (max-width: 768px) 80vw, 440px"
            className="h-auto w-[65vw] max-w-[300px] drop-shadow-[0_8px_28px_rgba(11,4,32,0.6)] sm:w-[80vw] sm:max-w-[440px]"
          />
        </h1>
        <p className="mt-4 max-w-xl text-base text-cream/85 drop-shadow-[0_1px_8px_rgba(11,4,32,0.95)] sm:mt-6 sm:text-lg">
          {hero.tagline}
        </p>
        <a
          href={hero.ctaHref}
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-5 h-12 gap-2 rounded-full px-8 text-base sm:mt-8"
          )}
        >
          <Play className="size-5" />
          {hero.ctaLabel}
        </a>
      </div>
    </section>
  );
}
