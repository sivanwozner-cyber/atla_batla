# Landing Page SEO + GEO

## Overview
חבילת אופטימיזציה לעמוד הנחיתה למנועי חיפוש (SEO) ולמנועי AI — ChatGPT/Claude/Perplexity (GEO). חיה כרגע **בטיוטה בלבד** תחת `app/draft/seo/` (לא קודמה), עם תצוגה מקדימה מלאה ב-`/draft/seo`. כוללת: `generateMetadata` CMS-driven ב-root layout (title עם ז'אנר+מקום, description מ-`site.description`, ‏metadataBase/canonical/OG/Twitter/robots/keywords + ‏viewport.themeColor), ‏JSON-LD ב-`app/page.tsx` (גרף schema.org: ‏MusicGroup עם ז'אנרים/נגב/מייל בוקינג/sameAs + ‏MusicAlbum×2 עם טראקים + ‏MusicEvent להופעות עתידיות + WebSite), ‏`app/robots.ts` (הכל פתוח חוץ מ-/admin, היתר מפורש ל-12 סורקי AI), ‏`app/sitemap.ts` (רשומה אחת), ותמונת OG ‏1200×630 (‏og.jpg, ‏256KB, ‏hero+wordmark ב-GDI+). כתובת האתר לא מקודדת — `NEXT_PUBLIC_SITE_URL` → ‏`VERCEL_PROJECT_PRODUCTION_URL` → ‏localhost (הדומיין הסופי טרם נקבע, PRD §9).

## Open Questions
- הדומיין הסופי טרם נקבע — ה-canonical נגזר בינתיים מדומיין ורסל אוטומטית; כשיוחלט, לחבר בורסל (או לקבע `NEXT_PUBLIC_SITE_URL`).
- `site.description` הנוכחי מסתיים ב-"(placeholder)" — בקידום צריך לעדכן דרך /admin (טקסט מוצע מוכן בעמוד `/draft/seo` סעיף 1).
- `og.jpg` בינארי — סקריפט הקידום מדלג על בינאריים (TEXT_EXT); בקידום להעתיק ידנית ל-`public/og.jpg`.
- `app/favicon.ico` — כנראה עדיין ברירת המחדל של create-next-app; שווה להחליף לגמל/wordmark בעתיד.
- ורסל MCP: ‏team ‏"sivan" (slug ‏atlabatla) מחזיר 0 פרויקטים — הפרויקט כנראה על חשבון אחר; לא הצלחתי לאמת את ה-production URL בפועל.

## Session Log

### 2026-07-03 — חבילת SEO+GEO בטיוטה [spiked]
- **What was done:** נבנו ב-`app/draft/seo/` (הכל gitignored, אומת `git check-ignore`): ‏`root-layout.tsx` (→‏app/layout.tsx) — ‏generateMetadata מ-`getContent()` + ‏viewport.themeColor ‏#0b0420; ‏`home-page.tsx` (→‏app/page.tsx) — עותק Home + ‏buildJsonLd (exported למניעת drift מול התצוגה) + ‏script ‏ld+json מחוטא (`<`); ‏`robots-file.ts` (→‏app/robots.ts) ו-`sitemap-file.ts` (→‏app/sitemap.ts) — שמות לא-קונבנציוניים בכוונה כדי ש-Next יתעלם מהם תחת /draft; ‏`og.jpg` — ‏1200×630 ‏JPEG ‏q85 מ-hero+wordmark ‏(GDI+ ‏PowerShell, ‏262KB); ‏`page.tsx` — עמוד תצוגה RTL עם SERP mock, ‏OG card, ‏JSON-LD מלא, פלט robots/sitemap משוחזר, וצ'קליסט קידום. נוסף לרשימת הניסויים ב-hub. אומת ב-dev: כל התגים ב-head של /draft/seo (עם noindex override), ‏JSON-LD נפרס תקין, ‏og.jpg נטען, אפס שגיאות מהטיוטה.
- **Decisions:** (1) קבצים מקודמים = self-contained (אין `lib/seo.ts` משותף) — סקריפט הקידום לא משכתב imports, ומודול משותף היה נשבר או בטיוטה או אחרי קידום; מחיר: קטע `SITE_URL` משוכפל ×4. (2) ‏`import "@/app/globals.css"` ב-layout (alias במקום יחסי) — עובד גם מהטיוטה וגם אחרי קידום. (3) עמוד התצוגה מייבא `generateMetadata` מ-root-layout ודורס רק robots ל-noindex — ה-head המוצע נבדק חי בלי סיכון אינדוקס. (4) ‏metadata נשאר CMS-driven (title/description מ-/admin) עם suffix ז'אנר קבוע בקוד. (5) ‏og.jpg ייעודי ולא hero.png — ‏3MB חורג ממגבלות תצוגת preview של וואטסאפ. (6) היתר מפורש לסורקי AI ב-robots לצד `*` — תיעוד כוונה, שרידות אם `*` יוקשח.
- **Notes / Caveats:** בדיקת ורסל: ‏team ‏atlabatla ללא פרויקטים (חשבון אחר?). שגיאות hydration בקונסול הן הבעיה הידועה מ-Phase 3 ‏(MusicEmbeds/Reveal) — לא קשורות. ‏og:image בטיוטה מצביע ל-`/og.jpg` שעדיין לא קיים ב-public (יווצר רק בקידום) — תג ה-meta תקין, הקובץ 404 עד אז. קידום מלא = ‏`npm run promote:draft -- seo` + העתקת og.jpg + עדכון description ב-admin.
- **Related:** [[draft-sandbox-environment]], [[landing-page-components]], [[nextjs-app-scaffold]], [[prd-document]], [[project-skeleton-and-documentation]]
