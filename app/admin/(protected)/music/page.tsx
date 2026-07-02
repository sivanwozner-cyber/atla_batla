import { getContent } from "@/lib/content";
import { MusicEditor } from "./music-editor";

export default async function MusicPage() {
  const content = await getContent();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-cream">מוזיקה</h1>
        <p className="mt-1 text-sm text-cream/60">
          טקסט הפתיחה של המקטע והאלבומים (EPs). ה-Album ID נלקח מקוד ה-embed של
          Bandcamp (המספר שאחרי <code dir="ltr">album=</code>).
        </p>
      </div>
      <MusicEditor intro={content.music.intro} eps={content.music.eps} />
    </div>
  );
}
