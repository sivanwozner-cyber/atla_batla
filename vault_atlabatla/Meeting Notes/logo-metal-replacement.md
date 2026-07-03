# Logo Metal Replacement

## Overview
החלפת ה-wordmark של האתר (הנוכחי: "ATLA ⚡ BATLA" בסגנון Power Rangers, `public/generated/wordmark.png`, רחב 2638×846) בלוגו חדש שהמשתמשת סיפקה: **"ATLA BATLA" בסגנון מטאל/אש** — אותיות תראש עם מילוי להבות כתום-אדום, קו-מתאר כרום, וקו-מתאר שחור חיצוני (die-cut sticker). המקור: `examples/logo/WhatsApp Image 2026-07-02 at 20.23.43.jpeg` (JPEG על **רקע לבן** 252,252,252). כרגע ב-**טיוטה** תחת `app/draft/logo/` — ממתין לאישור לפני קידום. הלוגו החדש כמעט-ריבועי (~1.21:1, שתי שורות) לעומת הישן הרחב (3.12:1) — זה משפיע על גובה הלוגו בהדר.

## Open Questions
- האם לאשר את הלוגו החדש ולקדם לפרודקשן (להחליף את `wordmark.png` בכל 4 השימושים)? — ממתין להוראת "תעלה לורסל".
- גודל סופי: גובה בהדר (ברירת-מחדל טיוטה 40px — הישן היה 28px/`h-7`; הריבועי צריך גבוה יותר לקריאוּת) ורוחב ב-Hero (ברירת-מחדל טיוטה 420px).
- לשמור את קו-המתאר הלבן (sticker die-cut) או לחתוך צמוד יותר? כרגע נשמר — נותן "פופ" על הרקע הכהה.
- עמודי האדמין (`app/admin/login`, `app/admin/(protected)/layout`) משתמשים גם הם ב-`wordmark.png` — קידום ע"י דריסת אותו קובץ יעדכן גם אותם, אבל ה-`width/height` בקומפוננטות (2638×846) שגויים ליחס החדש וידרשו עדכון.

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
