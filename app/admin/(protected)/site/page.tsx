import { getContent } from "@/lib/content";
import {
  HeroForm,
  AboutForm,
  BookingForm,
  SocialsEditor,
  MetaForm,
} from "./site-forms";

export default async function SitePage() {
  const content = await getContent();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-cream">תוכן ועיצוב</h1>
        <p className="mt-1 text-sm text-cream/60">
          כל הטקסטים והקישורים של האתר. כל מקטע נשמר בנפרד.
        </p>
      </div>

      <HeroForm hero={content.hero} />
      <AboutForm about={content.about} />
      <BookingForm booking={content.booking} />
      <SocialsEditor socials={content.socials} />
      <MetaForm site={content.site} />
    </div>
  );
}
