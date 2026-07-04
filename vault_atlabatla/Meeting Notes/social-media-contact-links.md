# Social Media & Contact Links

## Overview
עדכון רשתות חברתיות ופרטי יצירת קשר באתר: הוספת TikTok ו-YouTube לפוטר (רכיב `SiteFooter`, מודל `SocialLabel`/`socials` ב-`lib/content-types.ts`/`lib/content.ts`/`data/site-content.json`), ועדכון מייל ה-Booking לכתובת האמיתית `atlabatlasuomi@gmail.com`. הכל נבנה תחילה בסביבת הטיוטה (`app/draft/social-links/`, ר' [[draft-sandbox-environment]]) ואומת ב-dev server, ואז קודם לקבצי הפרודקשן עם `npm run promote:draft` לבקשת המשתמשת המפורשת ("לדחוף לורסל").

## Open Questions
- none

## Session Log

### 2026-07-04 — הוספת TikTok/YouTube + עדכון מייל Booking [shipped]
- **What was done:** נוספו שני ערכים חדשים ל-`SocialLabel` (`TikTok`, `YouTube`) ב-`lib/content-types.ts` + `SOCIAL_LABELS`; מיפוי אייקונים חדש ב-`components/SiteFooter.tsx` (`FaTiktok`, `FaYoutube` מ-`react-icons/fa6`); ערכי `socials` חדשים ב-`lib/content.ts` (defaultContent) וב-`data/site-content.json` עם ה-hrefs שסופקו (`https://www.tiktok.com/@atla.batla`, `https://youtube.com/shorts/GINrPIkcOIE`); עדכון `booking.email` ל-`atlabatlasuomi@gmail.com` והסרת ה-"(מייל placeholder)" מה-blurb בשני המקומות. כל השינוי נבנה קודם כטיוטה תחת `app/draft/social-links/` (עותקי הקבצים + עמוד preview), נבדק ב-`next dev` (curl אישר שהקישורים/המייל מופיעים ב-HTML), ורק אז קודם בפועל דרך `npm run promote:draft` (מסיר את שורות ה-`@promote-to`). נפתח PR #1 (`main` ← `claude/social-media-contact-links-hjzdaz`) שכולל גם commits קודמים שכבר היו על הענף (draft-sandbox workflow, TODO, SEO/GEO notes).
- **Decisions:** (1) כיבדתי את מדיניות ה-draft-first מ-`CLAUDE.md` — לא נגעתי ב-`components/`/`lib/`/`data/` ישירות עד שנאמר במפורש "לדחוף לורסל". (2) סדר האייקונים בפוטר: Instagram, Facebook, TikTok, YouTube, Bandcamp, SoundCloud — TikTok/YouTube הוכנסו אחרי Facebook (רשתות חברתיות כלליות) ולפני Bandcamp/SoundCloud (פלטפורמות מוזיקה). (3) אימתתי טיפוסי `SocialLabel`/אייקונים קיימים בפועל ב-`react-icons/fa6` (`FaTiktok`, `FaYoutube`) לפני הקידום, לא רק הנחתי.
- **Notes / Caveats:** `npx tsc --noEmit` ו-`npx eslint` על הקבצים ששונו — נקי; שגיאות ה-TS הקיימות ב-`components/MovingObjects.tsx` אומתו כקיימות-מראש (נבדק עם `git stash`), לא קשורות לשינוי הזה. טופס האדמין (`app/admin/(protected)/site/site-forms.tsx`) גוזר את רשימת התוויות מ-`SOCIAL_LABELS` אז TikTok/YouTube זמינים שם אוטומטית בלי שינוי נוסף.
- **Related:** [[draft-sandbox-environment]]

### 2026-07-04 — תיקון: PR מוזג אבל ה-deploy נכשל עד עכשיו [shipped]
- **What was done:** PR #1 אכן מוזג (מוצא כ-commit `34d202e` ב-`main`), אבל בדיקת Vercel MCP (ר' [[vercel-deploy-health]]) גילתה שה-deployment של אותו merge חזר `state: ERROR` — אותה שגיאת type ב-`components/MovingObjects.tsx` שהסשן הזה בדיוק זיהה עם `tsc --noEmit` וסיווג כ"לא קשור" (נכון לגבי הקשר, אבל היא כן שברה את ה-deploy בפועל). התיקון בא רק ב-`cc58df7` (2026-07-04, ר' [[psychedelic-background-redesign]]). רשתות TikTok/YouTube+מייל-בוקינג **לא היו חיים בפרודקשן** עד אז; עכשיו כן.
- **Decisions:** לא נמחקה הרשומה הישנה — נוספה רשומה מתקנת, לפי כללי ה-vault.
- **Notes / Caveats:** ר' [[vercel-deploy-health]] לפירוט המלא.
- **Related:** [[vercel-deploy-health]], [[psychedelic-background-redesign]]

### 2026-07-04 — עדכון YouTube לערוץ + הוספת Spotify [shipped]
- **What was done:** לבקשת המשתמשת: קישור ה-YouTube הוחלף מה-Short הבודד (`youtube.com/shorts/GINrPIkcOIE`) לערוץ (`https://www.youtube.com/@atlabatlacrew3533`); נוסף ערך חדש `Spotify` ל-`SocialLabel`/`SOCIAL_LABELS` (`lib/content-types.ts`), אייקון `FaSpotify` ב-`components/SiteFooter.tsx`, וערך `socials` חדש ב-`lib/content.ts`+`data/site-content.json` עם ה-href שסופק. נבנה כטיוטה (`app/draft/social-links-v2/`), אומת ב-`next dev`+curl, קודם עם `npm run promote:draft -- social-links-v2` אחרי אישור מפורש ("נראה טוב תמזג"). שתי תיקיות הטיוטה הישנות (`social-links/`, `social-links-v2/`) נמחקו אחרי הקידום כדי לא להשאיר סימוני `@promote-to` לא-רלוונטיים.
- **Decisions:** (1) מיקום Spotify בפוטר: אחרי YouTube ולפני Bandcamp — יחד עם שאר פלטפורמות המוזיקה (Bandcamp/SoundCloud). (2) לפני הריצה בפועל, סוננה הפעולה (`promote:draft -- social-links-v2`) כדי לא להריץ בטעות גם את תיקיית הטיוטה הישנה `social-links/` שעדיין נשאה סימוני `@promote-to` מהסשן הקודם.
- **Notes / Caveats:** `rm -rf .next` נדרש לפני `tsc --noEmit` כי ה-route type validator של Next הצביע על עמודי הטיוטה שנמחקו; אחרי הניקוי — typecheck+eslint נקיים לגמרי (גם שגיאות ה-`MovingObjects.tsx` הישנות כבר לא מופיעות, תוקנו ב-session קודם, ר' [[psychedelic-background-redesign]]).
- **Related:** [[vercel-deploy-health]], [[psychedelic-background-redesign]], [[draft-sandbox-environment]]
