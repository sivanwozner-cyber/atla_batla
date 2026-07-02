# PRD — אתר נחיתה ל-Atla Batla

**סטטוס:** מוכן ל-Plan Mode ב-Claude Code
**עדכון אחרון:** 30.06.2026

מסמך זה מיועד להיקרא ע"י Claude Code לפני תכנון ובנייה. כל ה-paths, השמות הטכניים והקוד נשארים באנגלית; ההסברים בעברית.

---

## 0. תקציר

עמוד נחיתה יחיד (single page), mobile-first, ל-Atla Batla — הרכב/פרויקט הפקה מהנגב שמשלב סואומיסאונדי פיני, גואה, ופאנק. הקהל אנדרגראונד, לא EDM מיינסטרים. שישה סקשנים בלבד, פוקוס על מוזיקה + הופעות קרובות + בוקינג. **לפני כל עבודת עיצוב — חובה לעבור על תיקיית `/examples` (סעיף 2). אסור לנחש אסתטיקת "גואה-טראנס" גנרית.**

---

## 1. רקע וקהל יעד

Atla Batla פעילים מ-2007, מוציאים ב-Random Records (לייבל לא-למטרת-רווח שתומך בקהילות ילידיות), מנגנים בגאת'רינגים אנדרגראונד (Back2Mad, Samadhi Transcendence). הטון: אנרכיסטי, משעשע, DIY — לא רוחני-רציני.

האתר משרת שלוש מטרות בלבד:
1. **Promoter** שבודק את ההרכב לפני בוקינג — צריך לשמוע מוזיקה ולמצוא מייל מהר.
2. **מאזין** שרוצה לשמוע את ה-EPs.
3. **מי שראה פלייר** ורוצה לדעת מתי/איפה ההופעה הבאה.

---

## 2. שלב 0 (חובה) — תיקיית Examples

לפני שורת קוד אחת של UI:

1. ליצור תיקייה `/examples` בשורש הפרויקט, עם `/examples/README.md` שמסביר: "פליירים, ארטוורק ריליסים וצילומי מסך אמיתיים של Atla Batla. כל החלטת עיצוב חייבת להיגזר מהתמונות כאן."
2. Sisu ימלא את התיקייה ידנית בתמונות.
3. **Claude Code חייב `view` על כל קובץ בתיקייה לפני קביעת design tokens** — פלטה, טיפוגרפיה, מוטיבים.

**למה זה לא רק נחמד-להיות:** ניסיון קודם בפרויקט הזה הראה שניחוש "גואה-טראנס קלאסי" (כהה, גאומטריה קדושה, מינימליסטי, רוחני) פספס לגמרי. הפליירים האמיתיים: שמיים שחורים זרועי כוכבים, איורי AI **מקסימליסטיים וצבעוניים**, מסקוט גמל הומוריסטי (ראש על גוף אדם, מרים אגודל), אוטובוס-מפלצת עם שיניים ועיניים שכתוב עליו "ATLA BATLA", lineup בגרדיאנט rainbow על כל שם. סעיף 5 (Design Tokens) מציע נקודת פתיחה שכבר נגזרה מ-5 תמונות רפרנס אמיתיות — אך הוא **provisional**: אם בתיקייה יהיו תמונות נוספות שסותרות אותו, התמונות מנצחות.

---

## 3. Stack טכני מומלץ

| ספרייה | תפקיד | הערה |
|---|---|---|
| Next.js 14 (App Router) + TypeScript | פריימוורק | תואם לסטאק הקיים שלך |
| Tailwind CSS v4 | סטיילינג | |
| shadcn/ui | Button / Sheet / Dialog בלבד | זה לא אתר טפסים, שימוש מצומצם |
| `motion` | scroll reveals, hover micro-interactions | זה השם הנוכחי של framer-motion (הפרויקט עבר rebrand ב-2025; `framer-motion` עדיין קיים כ-alias אבל `motion` הוא השם הנכון להתקנה חדשה) |
| `next/font/google` | טעינת פונטים בלי CLS | |
| `lucide-react` | אייקונים גנריים (menu, mail, arrow) | |
| `react-icons/fa6` | אייקוני brand — Instagram, Facebook, Bandcamp, SoundCloud | lucide לא כולל אייקוני brand |
| `clsx` + `tailwind-merge` | utility `cn()` הסטנדרטי של shadcn | |
| **`@google/genai`** | SDK ל-Gemini API — pipeline ארטוורק | ר' סעיף 7. **לא** `@google/generative-ai` הישן |
| Vercel | דיפלוי | תואם לסטאק הקיים שלך |

```bash
npx create-next-app@latest atla-batla --typescript --tailwind --app
npx shadcn@latest init
npm install motion lucide-react react-icons clsx tailwind-merge @google/genai
```

---

## 4. מבנה האתר — שישה סקשנים בלבד

**4.1 Hero** — `components/Hero.tsx`
רקע: איור AI נגזר מ-/examples (ר' סעיף 7). Wordmark "ATLA BATLA" בטיפוגרפיית בועות/גרדיאנט ניאון. טאגליין שורה אחת (מהביו האמיתי בבנדקמפ: "From the blazing deserts to the global underground..."). כפתור CTA יחיד — "Listen" → גולל ל-Music או מקשר ישירות ל-Bandcamp.

**4.2 Upcoming Shows** — `components/UpcomingShows.tsx`
מוצג **רק אם יש** אירוע עתידי (date ≥ today) — אחרת הסקשן נעלם לגמרי, לא נשאר "אין הופעות" ריק. כל אירוע: תאריך, עיר/מקום, set type (Live / DJ Set), קישור כרטיסים אם קיים. האירוע הקרוב ביותר מודגש (badge + glow). מקור דאטה: `data/events.ts` (סעיף 6).

**4.3 Music** — `components/MusicEmbeds.tsx`
Embed ישיר (iframe) של נגן Bandcamp לשני ה-EPs: *Smoke This EP*, *Funk Them All*. קודי ה-embed המדויקים נמשכים מ-Bandcamp embed generator לכל ריליס. שמות הטראקים נשארים **בדיוק כפי שהם**, כולל שגיאות כתיב מכוונות ("Bethoven's Virusss", "Once Upone A Time In The Negev") — אסור "לתקן".

**4.4 About** — `components/About.tsx`
2–3 משפטים בלבד, קרוב לטקסט המקורי מהבנדקמפ. אופציונלי: קרדיט קצר ל-Random Records (לייבל non-profit שתומך בקהילות ילידיות — פרט אמיתי ומעניין, לא placeholder).

**4.5 Booking** — `components/Booking.tsx`
מייל בולט, גדול, קליק-להעתקה (`mailto:`). זה הסקשן שה-promoters מחפשים — לא לקבור בפוטר.

**4.6 Footer / Social** — `components/SiteFooter.tsx`
אייקוני Instagram, Facebook, Bandcamp, SoundCloud. שורת קרדיט קצרה.

**מחוץ לסקופ בכוונה** — ר' סעיף 8.

---

## 5. Design Tokens (provisional — לאשרר מול /examples)

נגזר מ-5 תמונות רפרנס אמיתיות שכבר נבדקו בשיחה. Claude Code מתבקש לאמת/לעדכן מול כל מה שיתווסף ל-/examples.

**פלטה:**
`--night: #0B0420` (רקע בסיס) · `--night-2: #1B0B3D` (אורורה) · `--dune-dark: #5C2E0A` · `--sand: #C4843A` · `--gold: #FFE44A` · `--ember: #FF9500` · `--magenta: #FF44AA` · `--cyan: #44EEFF` · `--lime: #44FF88`

**טיפוגרפיה:**
Display/Wordmark — פונט "בועות" עגול ובולט (Titan One / Bungee / Fredoka One) ל-"ATLA BATLA" עצמו, לטיני בלבד כמו במיתוג האמיתי. UI + טקסט עברי — **Rubik** (Black/Bold לכותרות, Regular לגוף): תמיכת עברית מצוינת, אופי עגול-משחקי שמתאים לטון, פונט יחיד מצמצם טעינה.

**Layout:** עמוד יחיד, גלילה אנכית, mobile-first (רוב התנועה דרך לינק ב-bio של אינסטגרם).

**Signature element:** מסקוט הגמל + "אוטובוס המפלצת" — מוטיב חוזר, לא חד-פעמי.

**Motion:** scroll-reveal לכל סקשן (`whileInView` של motion), טוויקול כוכבים עדין ברקע ה-hero (CSS, לא WebGL — שומר על ביצועים במובייל), `prefers-reduced-motion` מכובד.

---

## 6. מודל דאטה — אירועים

```typescript
// data/events.ts
export interface ShowEvent {
  id: string;
  date: string;          // "YYYY-MM-DD"
  venue: string;
  city: string;
  ticketUrl?: string;
  setType: "Live" | "DJ Set" | "Hybrid";
}

export const events: ShowEvent[] = [
  // למלא עם הופעות אמיתיות ומאושרות — ר' סעיף 9
];
```
לוגיקה: לסנן `date >= today`, למיין עולה, להציג רק אם יש לפחות אירוע אחד, את הראשון לסמן כ-featured אוטומטית (לא שדה ידני).

---

## 7. Pipeline ליצירת ארטוורק — Gemini

כל הארטוורק הקיים של ההרכב נוצר ב-Gemini — לא DALL-E, לא Midjourney. כדי לשמור על המשכיות ויזואלית, כל ארטוורק חדש לאתר עובר באותו כלי.

**עובדות מאומתות נכון ל-29.6.2026** (תחום שמתעדכן מהר — שווה לוודא שוב בזמן implementation):

- SDK: **`@google/genai`** (npm), לא הפקג' הישן `@google/generative-ai`
- מודל ברירת מחדל: **`gemini-3.1-flash-image`** (כינוי "Nano Banana 2") — האיזון הכי טוב מהירות/עלות/איכות
- לאסטים בנאמנות גבוהה / 4K (כמו ה-hero image הראשי): **`gemini-3-pro-image`** (Nano Banana Pro)
- **לא Imagen** — מודלי Imagen בפרישה ונסגרים **17.8.2026**, כלומר תוך כשבעה שבועות מהיום. כל קוד חדש משתמש ב-Nano Banana, לא ב-Imagen.
- כל קריאה תומכת עד 14 תמונות רפרנס — **כאן בדיוק מתחבר ה-/examples folder לפייפליין**: אפשר להזין את הפליירים האמיתיים כתמונות רפרנס ישירות לקריאת ה-API כדי לשמר עקביות (אותו גמל, אותו אוטובוס, אותו טון), לא רק כהשראה אנושית.
- כל תמונה שמיוצרת כוללת SynthID watermark שקוף (לא משפיע ויזואלית). thinking tokens מחויבים גם כשלא מוצגים — שווה לדעת לצורך עלות באיטרציות.

env: `GEMINI_API_KEY` ב-`.env.local` (ב-`.gitignore`).

```javascript
// scripts/generate-art.mjs — שלד, Claude Code משלים CLI args parsing
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";

const ai = new GoogleGenAI({}); // קורא GEMINI_API_KEY מה-env אוטומטית

async function generateArt({
  prompt,
  refImages = [],        // נתיבים מתוך /examples
  outPath,
  model = "gemini-3.1-flash-image",
  aspectRatio = "16:9",  // 1:1 לפוסט אינסטגרם, 9:16 לסטורי, 16:9/21:9 ל-hero
  imageSize = "2K",
}) {
  const input = [{ type: "text", text: prompt }];
  for (const p of refImages) {
    input.push({
      type: "image",
      mime_type: p.endsWith(".png") ? "image/png" : "image/jpeg",
      data: fs.readFileSync(p).toString("base64"),
    });
  }

  const interaction = await ai.interactions.create({
    model,
    input,
    response_format: { type: "image", aspect_ratio: aspectRatio, image_size: imageSize },
  });

  fs.writeFileSync(outPath, Buffer.from(interaction.output_image.data, "base64"));
  console.log(`Saved → ${outPath}`);
}
```

שימוש מוצע: `npm run generate:art -- "hero background, desert night, camel hitchhiker" --ref examples/flyer3.jpg --out public/generated/hero.png`

---

## 8. מחוץ לסקופ (בכוונה)

- **Merch shop** — עד שיש מה למכור בפועל.
- **Gallery תמונות הופעות** — בסקייל הזה ייראה ריק וזנוח, גרוע יותר מאשר לא להיות שם.
- **Press kit / bio ארוך** — הקהל לא בא לקרוא.
- **CMS / database** — `data/events.ts` מספיק בסקייל הזה; אין צורך ב-headless CMS.
- **i18n routing מלא** (next-intl וכו') — התוכן מעורב עברית/אנגלית כמו בפליירים האמיתיים, לא צריך מתג שפה דינמי.

---

## 9. שאלות פתוחות לפני תחילת בנייה

- תאריכי הופעות אמיתיים ומאושרים ל-`data/events.ts` — ה-"Suomi Hafla 11/6" ששימש כדוגמה בשיחה הוא placeholder בלבד.
- כתובת המייל הסופית לבוקינג.
- domain סופי לאתר.

---

## 10. מבנה תיקיות

```
/app
  page.tsx
  layout.tsx
  globals.css
/components
  Hero.tsx
  UpcomingShows.tsx
  MusicEmbeds.tsx
  About.tsx
  Booking.tsx
  SiteFooter.tsx
  ui/                     ← shadcn
/data
  events.ts
/examples                 ← ר' סעיף 2, ממולא ידנית ע"י Sisu
  README.md
/scripts
  generate-art.mjs
/public
  generated/               ← פלט ה-pipeline של Gemini
.env.local                 ← GEMINI_API_KEY (gitignored)
```
