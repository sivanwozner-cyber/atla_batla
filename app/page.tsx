// PRD §4 — הרכבת עמוד הנחיתה מ-6 הסקשנים + הדר דביק.
// התוכן נטען מ-lib/content (data/site-content.json) — נערך דרך /admin.
import { getContent } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { PsychedelicBackground } from "@/components/PsychedelicBackground";
import { MovingObjects } from "@/components/MovingObjects";
import { UpcomingShows } from "@/components/UpcomingShows";
import { MusicEmbeds } from "@/components/MusicEmbeds";
import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { SiteFooter } from "@/components/SiteFooter";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        {/* החלק העליון — ללא נגיעה */}
        <Hero hero={content.hero} />

        {/* אמצע+תחתית: אזור עם רקע שקיעת-מדבר משלו. הפס העליון של הרקע == --night
            (כמו תחתית ה-Hero) → מעבר גרדיאנט חלק בלי חיתוך. isolation יוצר
            stacking-context מקומי: הרקע (‎-z-20) וה-MovingObjects (‎-z-10) יושבים
            מאחורי הסקשנים אך מכסים את בסיס הלילה. flex-1 דוחף את ה-footer לתחתית. */}
        <div className="pb-region flex flex-1 flex-col">
          <PsychedelicBackground />
          {/* פס-תפר: night→שקוף בדיוק על גבול ה-Hero, ביטוח כפול נגד חיתוך */}
          <div className="pb-seam" aria-hidden />
          <MovingObjects />

          <div className="flex-1">
            <UpcomingShows shows={content.shows} />
            <MusicEmbeds music={content.music} />
            <About about={content.about} />
            <Booking booking={content.booking} />
          </div>

          <SiteFooter socials={content.socials} />
        </div>
      </main>
    </>
  );
}
