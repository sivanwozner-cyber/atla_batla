# landing-page-components — components/*.tsx

## Overview
7 קומפוננטות ה-UI של אתר הנחיתה + עטיפת אנימציה, ב-`components/`. מומשו ב-Phase 3 לפי PRD §4. כולן server components פרט ל-`SiteHeader`, `Booking`, `Reveal` (client). מורכבות יחד ב-[[nextjs-app-scaffold]] `app/page.tsx`. כל התוכן placeholder מסומן.

**משויך ל:** אתר Atla Batla. נגזר מ-[[prd-document]] §4, בפלטה/פונטים מ-Phase 2.

**קובץ-קובץ — מה עושה, למי:**
- `SiteHeader.tsx` (client) — הדר sticky. ה-brand וכותרת ה-Sheet = **תמונת הלוגו** `wordmark.png` (`next/image`, `sizes="120px"`, `alt="Atla Batla"`) במקום טקסט CSS. ניווט עוגנים (Shows/Music/About/Booking); במובייל תפריט `Sheet` (shadcn/Base UI) שנסגר ב-state. PRD §4.
- `Hero.tsx` (server) — **לוגו wordmark = תמונה** `wordmark.png` (Power Rangers + ברק, מ-Gemini) בתוך `<h1>` דרך `next/image` (`alt="Atla Batla"`, `w-[88vw] max-w-[760px]`) — במקום טקסט CSS. טאגליין (הוזן ע"י המשתמשת), CTA "Listen" → `#music`. **רקע = ארטוורק Gemini** `hero.png` (`next/image` fill/priority/object-cover) + scrim gradient + דהייה לרקע הלילה; טוויקול כוכבים CSS מעל. ר' [[gemini-art-script]]. PRD §4.1 / §7.
- `UpcomingShows.tsx` (server) — קורא `data/events.ts`, מסנן `date>=today`, ממיין עולה, ראשון=featured (badge+glow). **מחזיר null כשאין אירועים** → הסקשן נעלם (PRD §4.2). כרגע נעלם (מערך ריק).
- `MusicEmbeds.tsx` (server) — 2 כרטיסי EP (Smoke This EP, Funk Them All) עם placeholder ל-iframe של Bandcamp. הערה: שמות טראקים יישמרו בדיוק (שגיאות מכוונות). PRD §4.3.
- `About.tsx` (server) — 2–3 משפטים placeholder, בלי Random Records. PRD §4.4.
- `Booking.tsx` (client) — מייל גדול (placeholder) עם `mailto` + כפתור copy-to-clipboard עם feedback. PRD §4.5.
- `SiteFooter.tsx` (server) — 4 אייקוני רשתות (`react-icons/fa6`: Instagram/Facebook/Bandcamp/SoundCloud, קישורים placeholder) + קרדיט. PRD §4.6.
- `Reveal.tsx` (client) — עטיפת scroll-reveal (`motion/react` `whileInView`), מכבדת `prefers-reduced-motion`. PRD §5.

## Open Questions
- כל הטקסט/קישורים placeholder — ממתין לתוכן אמיתי (PRD §9): מייל בוקינג, embeds, רשתות, ביו, תאריכי הופעות.
- רקע ה-Hero — **הוחלף בארטוורק Gemini אמיתי** (Phase 5, `hero.png`). לוגו ה-wordmark הוחלף בתמונה (Phase 6, `wordmark.png`). `.starfield`/`.hero-horizon`/`.wordmark` ב-globals.css כעת ללא שימוש (לא הוסרו — fallback אפשרי).
- `Reveal` גורם ל-hydration mismatch ב-console (motion `initial` ב-SSR, סקשנים Music/About/Booking) — קיים מ-Phase 3, טרם תוקן.
- Bandcamp embeds הם placeholder — צריך קודי iframe אמיתיים.

## Session Log

### 2026-06-30 — מימוש הקומפוננטות [shipped]
- **What was done:** נכתבו 8 הקבצים והורכבו ב-`page.tsx`. `npm run build` עבר; אומת ב-dev (מבנה נכון, `#shows` נעלם, אפס שגיאות console).
- **Decisions:** כפתורים = `buttonVariants` על `<a>`; ניווט עוגנים; motion עם reduced-motion; placeholder מסומן בכל מקום.
- **Notes / Caveats:** shadcn כאן מבוסס Base UI (לא Radix) — Trigger מרנדר `<button>` עם className; ל-polymorphism `render` prop.
- **Related:** [[nextjs-app-scaffold]], [[prd-document]], [[project-skeleton-and-documentation]]
