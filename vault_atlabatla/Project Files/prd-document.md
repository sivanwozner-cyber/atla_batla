# prd-document — atla-batla-website-prd.md

## Overview
קובץ ה-PRD היחיד והמרכזי של הפרויקט, יושב בשורש הריפו (`atla-batla-website-prd.md`). מגדיר עמוד נחיתה single-page, mobile-first, ל-Atla Batla — הרכב/פרויקט הפקה מהנגב (סואומיסאונדי, גואה, פאנק). הקובץ מיועד להיקרא ע"י Claude Code **לפני** כל עבודת תכנון/קוד.

**משויך ל:** כל מי שעובד על implementation — Claude Code (כקורא ראשי), Sisu (כבעל/ת הפרויקט וממלא/ת `/examples`).

**מבנה הקובץ (10 סעיפים):**
0. תקציר
1. רקע וקהל יעד (3 personas: promoter, מאזין, רואה-פלייר)
2. שלב 0 חובה — תיקיית `/examples` (חייבת להתמלא ולהיקרא לפני design tokens)
3. Stack טכני (Next.js 14 + TS, Tailwind v4, shadcn/ui, motion, lucide-react, react-icons/fa6, clsx+tailwind-merge, `@google/genai`, Vercel)
4. מבנה האתר — 6 קומפוננטות: Hero, UpcomingShows, MusicEmbeds, About, Booking, SiteFooter
5. Design Tokens — provisional, חייב לאשרר מול `/examples`
6. מודל דאטה — `ShowEvent` interface ב-`data/events.ts`
7. Pipeline ארטוורק — Gemini (`gemini-3.1-flash-image` / `gemini-3-pro-image`), **לא** Imagen (נסגר 17.8.2026)
8. מחוץ לסקופ — merch, gallery, press kit, CMS, i18n מלא
9. שאלות פתוחות — תאריכי הופעות, מייל בוקינג, domain
10. מבנה תיקיות מתוכנן (`/app`, `/components`, `/data`, `/examples`, `/scripts`, `/public/generated`)

## Open Questions
- תאריכי הופעות אמיתיים ל-`data/events.ts` עדיין לא קיימים (PRD §9)
- כתובת מייל בוקינג סופית לא נקבעה (PRD §9)
- domain סופי לא נקבע (PRD §9)
- תיקיית `/examples` עדיין לא קיימת/ממולאת בפועל — בלעדיה אסור להתחיל עיצוב UI (PRD §2)

## Session Log

### 2026-06-30 — תיעוד ראשוני של ה-PRD ב-vault [planned]
- **What was done:** קריאת ה-PRD המלא ותיעודו בתור topic file ב-vault, כחלק מהקמת מבנה תיעוד לפני תחילת קוד.
- **Decisions:** הקובץ מתועד כ"מקור אמת" יחיד (single source of truth) שכל קובץ עתידי בפרויקט (components, data, scripts) יקשר אליו חזרה.
- **Notes / Caveats:** ה-PRD מציין מפורשות שסעיף 5 (Design Tokens) הוא provisional — תמונות אמיתיות ב-`/examples` גוברות על הניחושים שבו.
- **Related:** [[claude-directory]]
