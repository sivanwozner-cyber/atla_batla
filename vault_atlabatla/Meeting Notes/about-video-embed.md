# About Video Embed

## Overview
בקשת המשתמשת: להטמיע סרטון YouTube (`https://youtube.com/shorts/GINrPIkcOIE`)
כאייפריים בתוך סקשן About, כך שאפשר לצפות בו בלי לצאת מהאתר, ולעדכן את מסך
הניהול (`/admin/site`) כדי שינהלו את הקישור בלי מפתח. **אושר וקודם לפרודקשן**
(2026-07-04) — שדה `about.videoUrl` חדש (ברירת-מחדל: קישור ה-Shorts שהמשתמשת
נתנה) עם helper `getYouTubeEmbedUrl` ב-`lib/utils.ts` שמחלץ מזהה מכל צורת קישור
יוטיוב. זה **נפרד** מקישור ה-YouTube הכללי ב-`socials` (הפוטר) — אותו קישור
עודכן במקביל ע"י session אחר לכתובת הערוץ (`@atlabatlacrew3533`), ללא קשר
לתכונה הזו.

## Open Questions
- אימות ויזואלי חי בדפדפן לא בוצע לפני הקידום (ר' Session Log 2026-07-04 —
  Next.js 16 חסם הרצת שרת שני על הפרויקט). כדאי לבדוק ב-Vercel preview/prod
  אחרי הדיפלוי שהסרטון אכן נטען ומנגן כמצופה.
- מיקום השדה בטופס "אודות" נקבע: מיד אחרי טקסט האודות, לפני שדות הקרדיט.

## Session Log

### 2026-07-04 — טיוטת הטמעת סרטון YouTube בסקשן About [spiked]
- **What was done:** בניתי טיוטה אינטרקטיבית ב-`/draft/about-video`
  (`app/draft/about-video/{page.tsx,AboutVideoDemo.tsx,youtube.ts}`) שמטמיעה את
  הסרטון כאייפריים בתוך סקשן About (יחס 9:16, עד 280px רוחב, עיצוב תואם ל-card
  הקיים באתר), עם helper (`getYouTubeEmbedUrl`) לחילוץ מזהה מכל צורת קישור
  יוטיוב נפוצה (shorts/watch/youtu.be/embed). מתחת לסקשן הוספתי תצוגה מקדימה
  אינטרקטיבית של השדה שיתווסף לטופס "אודות" ב-`/admin/site` — עריכת ה-URL שם
  מעדכנת את התצוגה למעלה מיידית (state לוקאלי בזיכרון, לא נשמר לשום מקום).
  הוספתי רשומה ל-hub הטיוטות (`app/draft/page.tsx`).
- **Decisions:**
  - לא נגעתי בקבצי המקור בשלב הטיוטה — לפי כלל טיוטה-תחילה כל השינוי חי רק
    תחת `app/draft/` עד אישור מפורש.
  - שדה ה-URL מתוכנן כ-`about.videoUrl: string` גולמי (לא embed-id נפרד כמו
    ה-`albumId` של Bandcamp ב-EPs) כי אפשר לגזור embed-id מכל צורת URL של
    יוטיוב באמצעות regex בזמן-רנדר — פחות שדות, פחות מקום לטעות בעריכה ידנית.
  - מנגנון `@promote-to` (script `promote-draft.mjs`) עושה **החלפת-קובץ-שלם**,
    לא merge — לא מתאים כאן כי כל הקבצים האמיתיים דרשו תוספת-שדה חלקית לתוך
    קובץ קיים. קידום בפועל נעשה כ-delta ידני בכל קובץ.
- **Notes / Caveats:**
  - **לא הצלחתי להריץ preview חי בדפדפן בסשן הזה.** Next.js 16 (הפרויקט על
    16.2.9) מציג מנגנון lockfile חדש שחוסם כמה מופעי `next dev`/`next build`
    בו-זמנית על אותו פרויקט (ר' `node_modules/next/dist/docs/01-app/02-guides/
    upgrading/version-16.md` §"Concurrent dev and build") — וסשן-צ'אט אחר כבר
    מחזיק שרת dev פתוח על התיקייה הזו. אימתתי סטטית במקום: `npx tsc --noEmit`
    נקי לגמרי; `eslint` נקי על כל הקבצים החדשים. הצגתי למשתמשת מוקאפ ויזואלי
    סטטי (widget) של הפריסה במקום תצוגה חיה.
  - ממתין לאישור המשתמשת + הוראה מפורשת לפני קידום.
- **Related:** [[draft-sandbox-environment]], [[project-skeleton-and-documentation]]

### 2026-07-04 — קידום לפרודקשן ("מאשרת, תדחוף ל-PR ותמזג") [shipped]
- **What was done:** המשתמשת אישרה את הטיוטה ("סבבה מאשרת תדחוף לPR ותמזג").
  החלתי את הדלתא ב-6 קבצי המקור: `lib/content-types.ts` (`about.videoUrl:
  string`), `lib/content.ts` (ברירת-מחדל = קישור ה-Shorts), `lib/utils.ts`
  (`getYouTubeEmbedUrl` הועבר לכאן מהטיוטה), `components/About.tsx` (רינדור
  האייפריים), `app/admin/(protected)/site/site-forms.tsx` (שדה "קישור לסרטון
  (YouTube)" ב-`AboutForm`, אחרי טקסט האודות), `app/admin/actions.ts`
  (`saveAboutAction` שומר `videoUrl`), ו-`data/site-content.json` (הערך
  בפועל). טיוטת המקור נשארה ב-`app/draft/about-video/`.
- **Decisions:**
  - **בניתי את ה-commit ידנית דרך git plumbing** (`read-tree`/`hash-object`/
    `update-index --cacheinfo`/`write-tree`/`commit-tree`/`update-ref`) על
    בסיס `origin/main` העדכני, **בלי לגעת ב-branch/HEAD/working-tree המשותפים**
    של הסשן הנוכחי. הסיבה: תוך כדי העבודה התגלה שה-repo הזה נגיש **במקביל
    מכמה session/agent שונים** — היו checkout על branch אחר (
    `claude/hero-mobile-responsive-fix`, עם commit לא-קשור `da38004` +
    שינוי לא-committed נוסף ב-`components/Hero.tsx`), ו-`origin/main` התקדם
    4 commits תוך כדי השיחה (כולל שינוי לא-קשור לקישור ה-YouTube הכללי
    ב-`socials`→ ערוץ, והוספת Spotify — **לא** נגעתי בזה, רק שימרתי את הערכים
    העדכניים). `git checkout`/`git switch` בתיקיית-עבודה משותפת היו מסוכנים
    (יכלו לשבש את ה-session האחר) — לכן העדפתי plumbing טהור שלא נוגע כלל
    בעץ-העבודה או ב-HEAD המשותפים.
  - `data/site-content.json` היה לו גם שינוי-לא-קשור ממתין ב-working tree
    (הסרת "(placeholder)" מ-`site.description`, מ-session אחר, טרם נדחף) —
    ה-commit שלי מבוסס על `origin/main` הנקי ולכן **לא** כלל את השינוי הזה
    בטעות; ה-working tree של הסשן האחר נשאר עם השינוי הממתין שלו בלי לגעת בו.
  - Branch חדש `about-video-embed` מ-`origin/main`, PR נפרד, ומיזוג ל-`main`
    — לפי בקשת המשתמשת המפורשת ("תדחוף לPR ותמזג"), ולא push ישיר.
- **Notes / Caveats:** מספר PR/commit SHA — ר' התוצאה בפועל בשיחה/ב-GitHub.
  עדיין לא אומת ויזואלית בפרודקשן (ר' Open Questions).
- **Related:** [[draft-sandbox-environment]], [[project-skeleton-and-documentation]], [[social-media-contact-links]], [[vercel-deploy-health]]
