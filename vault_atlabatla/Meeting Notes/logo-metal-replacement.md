# Logo Metal Replacement

## Overview
החלפת ה-wordmark של האתר (הנוכחי: "ATLA ⚡ BATLA" בסגנון Power Rangers, `public/generated/wordmark.png`, רחב 2638×846) בלוגו חדש שהמשתמשת סיפקה: **"ATLA BATLA" בסגנון מטאל/אש** — אותיות תראש עם מילוי להבות כתום-אדום, קו-מתאר כרום, וקו-מתאר שחור חיצוני (die-cut sticker). המקור: `examples/logo/WhatsApp Image 2026-07-02 at 20.23.43.jpeg` (JPEG על **רקע לבן** 252,252,252). **אושר וקודם לפרודקשן** (2026-07-03, commit `5c02c12`): `wordmark.png` הוחלף + עודכנו הממדים/גדלים ב-5 השימושים; טיוטת המקור נשארה ב-`app/draft/logo/`. הלוגו החדש כמעט-ריבועי (~1.21:1, שתי שורות) לעומת הישן הרחב (3.12:1) — לכן הגדלתי את גובה הלוגו בהדר.

## Open Questions
- אולי כיוונון עדין של גובה הלוגו (הדר/מובייל/אדמין) אחרי צפייה בפרודקשן, עכשיו עם היחס החדש (2340×1755).

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

### 2026-07-04 — תיקון: ה-deploy הזה מעולם לא עלה עד עכשיו [shipped]
- **What was done:** בדיקת Vercel MCP (ר' [[vercel-deploy-health]]) גילתה של-commit `5c02c12` (הרשומה למעלה) היה בפועל `state: ERROR` — שגיאת type ב-`components/MovingObjects.tsx` (לא קשור ללוגו) שברה את **כל** build עד `2026-07-04`. הלוגו המטאלי **לא היה חי בפרודקשן** מאז ה-`[shipped]` המקורי ועד שהבאג תוקן. עכשיו, אחרי commit `cc58df7`, האתר החי (`atla-batla.vercel.app`) אכן מציג את הלוגו החדש.
- **Decisions:** לא נמחקה הרשומה הישנה — נוספה רשומה מתקנת, לפי כללי ה-vault.
- **Notes / Caveats:** ר' [[vercel-deploy-health]] לפירוט המלא של הבאג ושרשרת ה-deployments.
- **Related:** [[vercel-deploy-health]], [[psychedelic-background-redesign]]

### 2026-07-04 — טיוטת V2: לוגו פסיכדלי חדש מ-`examples/logo/V2` [spiked]
- **What was done:** המשתמשת סיפקה תמונה חדשה (`examples/logo/V2/WhatsApp Image 2026-07-04 at 21.14.15.jpeg`) — "ATLA BATLA" בסגנון פסיכדלי-טרנס (אותיות מחודדות, קו-מתאר שחור, גרדיאנט סגול-ורוד למעלה/כחול-ירוק למטה, קווצ'ים ירוקים זוהרים וכוכביות מסביב) על **רקע עמוס** (פטריות, עיניים, עננים — לא רקע אחיד). ביקשה: לחלץ את הלוגו ולהשתמש בו; אם צריך — ליצור מחדש עם Gemini. בגלל שהרקע המקורי עמוס מדי לחיתוך אלגוריתמי נקי (בניגוד ל-V1 שהיה על רקע לבן אחיד), **יצרתי מחדש** את הלוגו דרך `scripts/generate-art.mjs` (מודל `gemini-3.1-flash-image`) עם התמונה כרפרנס, בבקשה לשמר צורת אותיות/גרדיאנט/קו-מתאר זהים אבל על **רקע שחור מלא** לחיתוך. אחרי אישור נוסף מהמשתמשת ("תשאיר רק כיתוב, תוריד את כל האלמנטים מסביב") — ניסיון שלישי הסיר גם את הקווצ'ים/כוכביות, השאיר רק 8 האותיות. חיתוך ל-PNG שקוף: `public/generated/wordmark-v2.png` (2340×1755, gitignored, טיוטה בלבד). נבנה עמוד השוואה `app/draft/logo-v2/page.tsx` (מוק הדר+Hero+השוואה מול V1, עם מתג הפעלה/כיבוי וסליידרים) ונוסף ל-hub הטיוטות. אומת: `/draft/logo-v2` מגיש 200 (דרך שרת dev של session אחר על פורט 3000 — כלי ה-Preview של ה-session הזה לא הצליחו לרשום שרת חדש), ה-`_next/image` optimizer מגיש את ה-PNG החדש 200.
- **Decisions:**
  - **יצירה-מחדש ולא חילוץ-מהמקור** — טכניקת ה-flood-fill/connected-components מ-V1 (הסרת רקע לבן) לא ישימה כאן כי הרקע הוא ציור עמוס בגוונים שחופפים לצבעי האותיות עצמן; הדרך האמינה היחידה הייתה לגרום ל-Gemini להפיק מחדש את אותו לוגו על רקע אחיד.
  - **מפתח החיתוך לרקע שחור: threshold ישיר על בהירות (`max(r,g,b) < 22`), לא flood-fill.** גילוי מרכזי: ב-V1 (רקע לבן) ה-flood-fill מהשוליים בלבד היה נכון כי "כיסים" לבנים כלואים בין אותיות היו חלק מהעיצוב שצריך לשמר. כאן ההפך — הפערים/רווחים הכלואים בין האותיות (למשל בתוך משולש ה-A, בין השורה העליונה לתחתונה) יצאו **גם הם שחורים טהורים** כי כך ביקשתי מ-Gemini, ומייצגים "חורים" שצריך להשקיף, לא חלק מהאמנות. קו-המתאר השחור-כהה של כל אות **אינו** שחור טהור (יש לו גוון כהה עם צבע, נבדק ידנית: ריצות "BLACK" מול "darkish" נפרדות ב-threshold~22) — לכן threshold ישיר על בהירות תפס את הרקע+הפערים ושימר את קווי-המתאר בלי לפגוע בהם.
  - **בלי feather/erode**, כמו ב-V1 — אותה סיבה (anti-alias טבעי מההקטנה באתר).
- **Notes / Caveats:**
  - כלי ה-Preview session הזה נכשלו לרשום שרת (`preview_list` החזיר ריק אחרי `preview_start` מוצלח, ו-curl לפורט שהוקצה נכשל לגמרי) — קרוב לוודאי בגלל ששרת dev אחר כבר רץ בתיקייה הזו (הוזכר ב-hook). אימות בפועל נעשה דרך curl ישיר לפורט 3000 (השרת של ה-session האחר) שהגיש את הדף/תמונה בהצלחה.
  - קבצי הביניים (`wordmark-v2-raw.png`, `-raw2.png`, `-raw3.png` — עם/בלי קישוטים, ניסיונות שונים) נמחקו אחרי שהתקבל הפלט הסופי; רק `wordmark-v2.png` נשאר (gitignored, לא ב-whitelist).
- **Related:** [[draft-sandbox-environment]], [[landing-page-components]], [[psychedelic-background-redesign]]

### 2026-07-04 — קידום V2 לפרודקשן ("מאשרת, תעלה לורסל") [shipped]
- **What was done:** אושר. גיבוי `wordmark.png` הקודם (V1 מטאל/אש) ל-`wordmark-prev.png` (כמו בקידום הקודם), ואז דריסת `wordmark.png` בלוגו הפסיכדלי החדש (`wordmark-v2.png`, 2340×1755, רק אותיות + רקע שקוף). עודכנו `width={2340} height={1755}` (במקום 1229×1015) ב-5 השימושים: `components/SiteHeader.tsx` (הדר + Sheet מובייל), `components/Hero.tsx`, `app/admin/(protected)/layout.tsx`, `app/admin/login/page.tsx`. ה-className (`h-10 w-auto` / `h-9 w-auto` וכו') לא שונה — היחס החדש (1.333:1, מעט רחב יותר מ-1.211:1 הישן) יתבטא אוטומטית ברוחב בפועל דרך `w-auto`. אומת דרך שרת ה-dev של session אחר על פורט 3000 (כלי ה-Preview של session זה לא הצליחו לרשום שרת חדש — כנראה קונפליקט עם השרת הרץ כבר): `/` ו-`/admin/login` מגישים 200, וה-HTML של `/` מפנה ל-`generated/wordmark.png` (הקובץ שנדרס).
- **Decisions:** קומיט סלקטיבי — רק קבצי הלוגו (`public/generated/wordmark.png`, `wordmark-prev.png`) וחמשת קבצי הקוד ששונו; לא נגעתי ב-WIP הלא-קשור שכבר היה בעץ (`data/site-content.json`, קבצי vault אחרים, מחיקת jpeg בישן). לפי בקשת המשתמשת המפורשת ("תדחוף לPR ומיזוג") — הזרימה כללה יצירת branch ייעודי, פתיחת PR ומיזוג, ולא רק push ישיר ל-main.
- **Notes / Caveats:** `app/draft/logo-v2/page.tsx` (הטיוטה) עדיין קיים ב-gitignored `app/draft/` ומצביע גם על `CURRENT`=`wordmark.png` (עכשיו = הלוגו החדש עצמו) — לא קריטי, זו טיוטת השוואה שכבר מיצתה את תפקידה.
- **Related:** [[draft-sandbox-environment]], [[landing-page-components]], [[psychedelic-background-redesign]]
