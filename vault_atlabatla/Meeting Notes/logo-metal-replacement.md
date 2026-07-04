# Logo Metal Replacement

## Overview
החלפת ה-wordmark של האתר (הנוכחי: "ATLA ⚡ BATLA" בסגנון Power Rangers, `public/generated/wordmark.png`, רחב 2638×846) בלוגו חדש שהמשתמשת סיפקה: **"ATLA BATLA" בסגנון מטאל/אש** — אותיות תראש עם מילוי להבות כתום-אדום, קו-מתאר כרום, וקו-מתאר שחור חיצוני (die-cut sticker). המקור: `examples/logo/WhatsApp Image 2026-07-02 at 20.23.43.jpeg` (JPEG על **רקע לבן** 252,252,252). **אושר וקודם לפרודקשן** (2026-07-03, commit `5c02c12`): `wordmark.png` הוחלף + עודכנו הממדים/גדלים ב-5 השימושים; טיוטת המקור נשארה ב-`app/draft/logo/`. הלוגו החדש כמעט-ריבועי (~1.21:1, שתי שורות) לעומת הישן הרחב (3.12:1) — לכן הגדלתי את גובה הלוגו בהדר.

## Open Questions
- לאמת שה-deploy ב-Vercel עלה ומציג את הלוגו נכון. **ה-next/image dev optimizer נתקע לוקאלית** (גם על `hero.png` שלא נגעתי בו) — כנראה מגבלת סביבת ה-sandbox, לא הקוד; Vercel מייצר אופטימיזציה טרייה. אם בפרודקשן משהו נראה חתוך/מעוות — לבדוק שם.
- אולי כיוונון עדין של גובה הלוגו (הדר/מובייל/אדמין) אחרי צפייה בפרודקשן. הערכים הנוכחיים: הדר `h-10`, sheet `h-8`, admin-layout `h-9`, admin-login `h-10`, Hero `max-w-[440px]`.

## Session Log

### 2026-07-03 — הסרת-רקע-לבן + טיוטת לוגו מטאל [spiked]
- **What was done:** בניתי pipeline להסרת הרקע הלבן מהלוגו החדש → `public/generated/wordmark-metal.png` שקוף (1229×1015, gitignored — לא ב-whitelist של `.gitignore`). בניתי עמוד טיוטה `app/draft/logo/page.tsx` (מוק הדר + Hero + השוואה ישן/חדש, עם סליידרים לכיול גודל) והוספתי אותו ל-hub הטיוטות. אומת: הדף מגיש 200, ה-PNG מגיש `image/png`, אין שגיאות קונסול.
- **Decisions:**
  - **אלגוריתם ה-cutout** (נגזר מ-[[gemini-art-script]] `scripts/cutout.mjs` אבל הפוך — רקע לבן במקום שחור): key פר-פיקסל `min(r,g,b) >= 200 && saturation <= 25` → רקע. זה תופס גם את הכיסים הלבנים ה**כלואים** בין האותיות (ש-flood-fill מהשוליים משאיר), בלי לאכול את הלהבות (רוויות) או הכרום/קו-המתאר השחור (כהים). אחריו **connected-components**: שומרים רק רכיבים ≥1500px (הלוגו = רכיב ענק אחד דרך קו-המתאר השחור) → מוחק ~27 נקודות רעש-JPEG ברקע.
  - **בלי erode/feather** — בדיוק כמו ש-`cutout.mjs` מוותר עליהם: הרזולוציה הגבוהה + ההקטנה באתר נותנות anti-alias טבעי.
- **Notes / Caveats:**
  - **gotcha מרכזי (עלה הרבה זמן):** שלב ה-`feather` (blur על ערוץ אלפא גולמי 1-channel דרך sharp) הכניס **shift-שורה** → פיקסלים לבנים ירשו אלפא של שורת-לוגו שכנה → "רפאים" בפסים אופקיים. הפתרון: לוותר על feather לגמרי. אימות: פיקסל לבן טהור (252,252,252,sat0) שיצא אטום = הבאג. סקריפט מינימלי (key→apply→save בלי feather) נתן 0 פיקסלים "לבן-אבל-אטום".
  - הרקע במקור הוא 252 אחיד, אבל עם רעש-JPEG קל (סאטורציה/כהות) בפיזור — לכן threshold גלובלי גרידא לא הספיק וצריך connected-components.
  - כלי הטיוטה (סקריפטי cutout) יושבים ב-scratchpad, לא ב-repo. הפלט `wordmark-metal.png` gitignored (רק `wordmark.png`/`hero.png`/`obj-*.png` ב-whitelist) → לא עולה לורסל עד קידום מפורש.
  - `mcp preview_screenshot` נכשל (timeout) בסביבה הזו — כנראה אנימציות ה-aurora הרציפות לא נותנות ל-capture להתייצב. אומת דרך curl + DOM snapshot + קומפוזיט sharp ידני.
- **Related:** [[gemini-art-script]] (מקור טכניקת ה-cutout + היסטוריית ה-wordmark המקורי), [[landing-page-components]] (`SiteHeader`/`Hero` שמשתמשים ב-wordmark), [[draft-sandbox-environment]] (סביבת `app/draft/` + מנגנון `@promote-to`), [[project-skeleton-and-documentation]]

### 2026-07-03 — קידום לפרודקשן ("תעלה לורסל") [shipped]
- **What was done:** אושר. החלפתי `public/generated/wordmark.png` (git-tracked/whitelisted → מגיע לורסל) בלוגו החדש, עם גיבוי לוקאלי `wordmark-prev.png` (כמו `hero-prev.png`). עדכנתי `width/height`+`sizes`+`className` ב-5 השימושים (SiteHeader הדר+sheet, Hero, admin login, admin layout) ליחס 1229×1015. Commit `5c02c12` נדחף ל-`main` → Vercel deploy.
- **Decisions:** דריסת `wordmark.png` (ולא קובץ חדש) כי רק הוא ב-whitelist של `.gitignore` שמגיע לורסל (`wordmark-metal.png` נשאר ignored, מזין רק את הטיוטה). גדלים: הדר 28→40px. **קומיט סלקטיבי** — רק קבצי הלוגו; השארתי בחוץ WIP לא-קשור (`globals.css`/`layout.tsx`/`page.tsx`/`PsychedelicBackground.tsx` = עבודת [[psychedelic-background-redesign]], + מצב obsidian).
- **Notes / Caveats:** אימות לוקאלי חלקי — ה-next/image dev optimizer נתקע (env, לא הקוד: נתקע גם על `hero.png` שלא שונה, וזו הסיבה ל-timeout ב-`preview_screenshot`/eval). אומת: הנכס הגולמי מוגש 1229×1015 שקוף + הקומפוננטות פולטות `width/height` נכונים ב-DOM + מראה ויזואלי דרך קומפוזיט sharp ידני.
- **Related:** [[gemini-art-script]], [[landing-page-components]], [[draft-sandbox-environment]], [[psychedelic-background-redesign]]
