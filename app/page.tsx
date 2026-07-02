// PRD §4 — הרכבת עמוד הנחיתה מ-6 הסקשנים + הדר דביק.
// התוכן נטען מ-lib/content (data/site-content.json) — נערך דרך /admin.
import { getContent } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
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
      <main className="flex-1">
        <Hero hero={content.hero} />
        <UpcomingShows shows={content.shows} />
        <MusicEmbeds music={content.music} />
        <About about={content.about} />
        <Booking booking={content.booking} />
      </main>
      <SiteFooter socials={content.socials} />
    </>
  );
}
