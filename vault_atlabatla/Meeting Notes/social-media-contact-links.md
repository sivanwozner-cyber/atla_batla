# Social Media & Contact Links

## Overview
עדכון רשתות חברתיות ופרטי יצירת קשר באתר: הוספת TikTok ו-YouTube לפוטר (רכיב `SiteFooter`, מודל `SocialLabel`/`socials` ב-`lib/content-types.ts`/`lib/content.ts`/`data/site-content.json`), ועדכון מייל ה-Booking לכתובת האמיתית `atlabatlasuomi@gmail.com`. הכל נבנה תחילה בסביבת הטיוטה (`app/draft/social-links/`, ר' [[draft-sandbox-environment]]) ואומת ב-dev server, ואז קודם לקבצי הפרודקשן עם `npm run promote:draft` לבקשת המשתמשת המפורשת ("לדחוף לורסל").

## Open Questions
- מיזוג ה-PR (#1, `claude/social-media-contact-links-hjzdaz` → `main`) עדיין תלוי ועומד — הדיפלוי בפועל לורסל יקרה רק אחרי מיזוג.
- קישור ה-YouTube שסופק הוא Shorts ספציפי (`youtube.com/shorts/GINrPIkcOIE`), לא ערוץ — לבדוק מול המשתמשת אם בעתיד רוצים להחליף לקישור לערוץ הכללי כשיהיה.

## Session Log

### 2026-07-04 — הוספת TikTok/YouTube + עדכון מייל Booking [shipped]
- **What was done:** נוספו שני ערכים חדשים ל-`SocialLabel` (`TikTok`, `YouTube`) ב-`lib/content-types.ts` + `SOCIAL_LABELS`; מיפוי אייקונים חדש ב-`components/SiteFooter.tsx` (`FaTiktok`, `FaYoutube` מ-`react-icons/fa6`); ערכי `socials` חדשים ב-`lib/content.ts` (defaultContent) וב-`data/site-content.json` עם ה-hrefs שסופקו (`https://www.tiktok.com/@atla.batla`, `https://youtube.com/shorts/GINrPIkcOIE`); עדכון `booking.email` ל-`atlabatlasuomi@gmail.com` והסרת ה-"(מייל placeholder)" מה-blurb בשני המקומות. כל השינוי נבנה קודם כטיוטה תחת `app/draft/social-links/` (עותקי הקבצים + עמוד preview), נבדק ב-`next dev` (curl אישר שהקישורים/המייל מופיעים ב-HTML), ורק אז קודם בפועל דרך `npm run promote:draft` (מסיר את שורות ה-`@promote-to`). נפתח PR #1 (`main` ← `claude/social-media-contact-links-hjzdaz`) שכולל גם commits קודמים שכבר היו על הענף (draft-sandbox workflow, TODO, SEO/GEO notes).
- **Decisions:** (1) כיבדתי את מדיניות ה-draft-first מ-`CLAUDE.md` — לא נגעתי ב-`components/`/`lib/`/`data/` ישירות עד שנאמר במפורש "לדחוף לורסל". (2) סדר האייקונים בפוטר: Instagram, Facebook, TikTok, YouTube, Bandcamp, SoundCloud — TikTok/YouTube הוכנסו אחרי Facebook (רשתות חברתיות כלליות) ולפני Bandcamp/SoundCloud (פלטפורמות מוזיקה). (3) אימתתי טיפוסי `SocialLabel`/אייקונים קיימים בפועל ב-`react-icons/fa6` (`FaTiktok`, `FaYoutube`) לפני הקידום, לא רק הנחתי.
- **Notes / Caveats:** `npx tsc --noEmit` ו-`npx eslint` על הקבצים ששונו — נקי; שגיאות ה-TS הקיימות ב-`components/MovingObjects.tsx` אומתו כקיימות-מראש (נבדק עם `git stash`), לא קשורות לשינוי הזה. טופס האדמין (`app/admin/(protected)/site/site-forms.tsx`) גוזר את רשימת התוויות מ-`SOCIAL_LABELS` אז TikTok/YouTube זמינים שם אוטומטית בלי שינוי נוסף.
- **Related:** [[draft-sandbox-environment]]
