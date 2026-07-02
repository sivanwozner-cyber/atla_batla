# gemini-art-script — scripts/generate-art.mjs

## Overview
סקריפט CLI ליצירת ארטוורק ל-Atla Batla דרך Gemini (PRD §7). נכתב ב-Phase 4 ו**הורץ בהצלחה** ב-Phase 5 (2026-07-01) — ייצר את `public/generated/hero.png` שחובר ל-[[landing-page-components]] `Hero.tsx`. מריצים דרך `npm run generate:art -- "<prompt>" [options]`. קורא `GEMINI_API_KEY` מ-`.env.local` (דרך `process.loadEnvFile`). מזין תמונות רפרנס מ-`examples/` לשמירת עקביות ויזואלית (אותו גמל/אוטובוס/טון).

**משויך ל:** Sisu (מריצה כדי לג'נרט ארטוורק), Claude Code (כתב). נגזר מ-[[prd-document]] §7. פלט → `public/generated/` (gitignored).

**API אמיתי (@google/genai v2.10.0):** `ai.models.generateContent({ model, contents:[{text},{inlineData}], config:{ responseModalities:[Modality.IMAGE], imageConfig:{ aspectRatio, imageSize } } })`; התמונה ב-`response.candidates[0].content.parts[].inlineData.data` (base64). זה שונה מה-skeleton הבדיוני ב-PRD (`ai.interactions.create`).

**CLI:** `--prompt`/פוזישיונל · `--ref` (חזרתי/פסיקים, עד 14) · `--out` (ברירת מחדל `public/generated/output.png`) · `--model` · `--aspect` (16:9…) · `--size` (1K/2K/4K) · `--help`.

## Open Questions
- `gemini-3.1-flash-image` (ברירת המחדל) **אומת ועובד** (Phase 5). `gemini-3-pro-image` (4K hi-fi) עדיין לא נוסה. fallback `gemini-2.5-flash-image` זמין דרך `--model`/`GEMINI_IMAGE_MODEL`.
- נבדקו aspect 16:9 (hero + wordmark). **21:9 עבר timeout (>4min)** — עדיף 16:9. 9:16/1:1 טרם נוסו.

## ⚠️ Gotchas ידועים
- **שקיפות מזויפת:** בקשת רקע שקוף (alpha) → המודל **מצייר דפוס שח-מט אפור אטום** (כל הפיקסלים A=255, ~RGB 240/240/240) במקום alpha אמיתי. פתרון: chroma-key בקוד להסרת האפור (רוויה נמוכה + בהירות גבוהה → alpha 0) ואז חיתוך לגבולות. שימוש ב-C# inline + GDI+ `LockBits` (מהיר; לולאת PowerShell על מיליוני פיקסלים איטית מדי). ר' Phase 6 ב-[[project-skeleton-and-documentation]].
- **טקסט:** מודלי תמונה נוטים לשבש איות — תמיד לאמת ב-`view`. בלוגו "ATLA BATLA" זה יצא נכון (עם הנחיה מפורשת של האיות אות-אות). **באיור סצנה (hero)** להפך — המודל נוטה לצייר טקסט משובש על אביזרים (ה-hero הראשון קיבל "ATLA BATLA" מעוות על האוטובוס); לכן ב-prompt של סצנה יש **לאסור טקסט מפורשות** ("no text/letters/words, vehicles completely blank") — עבד ב-2026-07-02.

## Session Log

### 2026-06-30 — כתיבת הסקריפט [shipped]
- **What was done:** נכתב הסקריפט מול ה-SDK האמיתי (v2.10.0) + `generate:art` ב-package.json. אומת `node --check` (exit 0). לא הורץ.
- **Decisions:** API אמיתי ולא ה-skeleton של ה-PRD; `apiKey` מפורש; override + fallback למודל.
- **Notes / Caveats:** דורש `GEMINI_API_KEY` ב-`.env.local` (כבר הוזן ע"י המשתמשת). כל תמונה כוללת SynthID watermark (PRD §7).
- **Related:** [[prd-document]], [[nextjs-app-scaffold]], [[project-skeleton-and-documentation]]

### 2026-07-01 — הרצה ראשונה: hero.png [shipped]
- **What was done:** `npm run generate:art` הורץ בהצלחה. prompt ל-hero banner 16:9 (לילה מדברי, אוטובוסי מפלצת + מסקוט גמל, שטח שמיים פנוי ל-wordmark, ללא טקסט מוטבע) + 5 רפרנסים אמיתיים (`82040,81697,11070,11251,11254`). נשמר `public/generated/hero.png` (2752×1536) וחובר ל-`Hero.tsx`.
- **Decisions:** מודל ברירת המחדל `gemini-3.1-flash-image` — עבד מיד, ללא צורך ב-fallback. aspect 16:9, size 2K.
- **Notes / Caveats:** SynthID watermark שקוף נכלל. `public/generated/` gitignored — הקובץ מקומי בלבד.
- **Related:** [[landing-page-components]], [[prd-document]], [[project-skeleton-and-documentation]]

### 2026-07-01 — לוגו wordmark.png (Power Rangers + ברק) [shipped]
- **What was done:** ג'ונרוט לוגו "ATLA ⚡ BATLA" 16:9 (סגנון PR, גרדיאנט המותג, ברק זהוב, ללא רפרנסים). המודל צייר שח-מט אפור במקום שקיפות → הוסר בקוד (chroma-key + crop, GDI+/C#) → `wordmark.png` 2638×846 שקוף. חובר ב-`Hero.tsx` + `SiteHeader.tsx`.
- **Decisions:** לוגו כתמונה ולא CSS (צורת PR מדויקת); keying ולא blend-mode. איות אומת ב-view (תקין).
- **Notes / Caveats:** ר' Gotchas למעלה. 21:9 עבר timeout → נעשה ב-16:9 ונחתך.
- **Related:** [[landing-page-components]], [[project-skeleton-and-documentation]]

### 2026-07-02 — רה-ג'ינרוט hero (prompt נקי-מטקסט) [shipped]
- **What was done:** הורץ שוב `generate:art` → `public/generated/hero-2.png`, ואז הוחלף פנימה כ-`hero.png` (הישן נשמר כ-`hero-prev.png` לריוורט קל). אותם 5 רפרנסים (82040/81697/11070/11251/11254), flash, 16:9, 2K. אומת דרך curl: `/`=200, ה-hero מוגש דרך `/_next/image`=200 (image/jpeg), והסטטי `/generated/hero.png`=200 (3,125,867B).
- **Decisions:** prompt מחוזק עם איסור טקסט מפורש ("no text/letters/words, vehicles completely blank") — לתיקון הכיתוב המשובש "ATLA BATLA" שהמודל צייר על האוטובוס ב-hero הקודם. שמירת שטח שמיים פנוי במרכז-עליון ל-wordmark. נשאר flash (מוכח), לא pro. יצירה לקובץ חדש ואז swap — כי `public/generated/` gitignored (אין גיבוי git) והארטוורק הקיים היה טוב.
- **Notes / Caveats:** הפלט החדש נקי מטקסט לגמרי (אומת ב-view). `.env.local` מכיל 2 שורות `GEMINI_API_KEY` — השנייה (`AQ.Ab8…`, OAuth-style) גוברת (last-wins ב-loadEnvFile) ו**עובדת** (לא צריך את ה-`AIza…`). `hero-prev.png`+`hero.png` שניהם gitignored.
- **Related:** [[landing-page-components]], [[project-skeleton-and-documentation]], [[prd-document]]
