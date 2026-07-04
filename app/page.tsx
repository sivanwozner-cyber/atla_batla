// PRD §4 — הרכבת עמוד הנחיתה מ-6 הסקשנים + הדר דביק.
// התוכן נטען מ-lib/content (data/site-content.json) — נערך דרך /admin.
import { getContent } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { ImageBackdrop } from "@/components/ImageBackdrop";
import { UpcomingShows } from "@/components/UpcomingShows";
import { MusicEmbeds } from "@/components/MusicEmbeds";
import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { SiteFooter } from "@/components/SiteFooter";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <ImageBackdrop />
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        {/* החלק העליון — ללא נגיעה */}
        <Hero hero={content.hero} />

        {/* אמצע+תחתית: שקוף → חושף את הרקע המרותק. flex-1 דוחף את ה-footer לתחתית. */}
        <div className="pb-region flex flex-1 flex-col">
          {/* פס-תפר: night→שקוף בדיוק על גבול ה-Hero, ביטוח נגד חיתוך */}
          <div className="pb-seam" aria-hidden />

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
