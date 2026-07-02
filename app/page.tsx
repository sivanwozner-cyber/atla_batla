// PRD §4 — הרכבת עמוד הנחיתה מ-6 הסקשנים + הדר דביק.
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { UpcomingShows } from "@/components/UpcomingShows";
import { MusicEmbeds } from "@/components/MusicEmbeds";
import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <UpcomingShows />
        <MusicEmbeds />
        <About />
        <Booking />
      </main>
      <SiteFooter />
    </>
  );
}
