import { getContent } from "@/lib/content";
import { ShowsEditor } from "./shows-editor";

export default async function ShowsPage() {
  const content = await getContent();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-cream">הופעות קרובות</h1>
        <p className="mt-1 text-sm text-cream/60">
          רק הופעות עם תאריך מהיום והלאה מוצגות באתר. ההופעה הקרובה ביותר מודגשת
          אוטומטית. אם אין הופעות עתידיות — המקטע נעלם מהאתר.
        </p>
      </div>
      <ShowsEditor initial={content.shows} />
    </div>
  );
}
