# nextjs-app-scaffold — אפליקציית Next.js (שורש)

## Overview
ה-scaffold של אתר הנחיתה, יושב בשורש הריפו (Phase 1). **Next.js 16.2.9** + React 19, App Router, TypeScript, Tailwind v4, shadcn/ui. נבנה ע"י `create-next-app@latest` + `shadcn init`. כרגע שלד בלבד — הקומפוננטות הן stubs ריקים שימומשו ב-Phase 3, וכל התוכן placeholder.

**משויך ל:** Claude Code (בונה), Sisu (בעלת הפרויקט). נגזר מ-[[prd-document]].

**קבצים/תיקיות מרכזיים שנוצרו:**
- `app/layout.tsx` — root layout. טוען **Rubik** (`next/font/google`, subset latin+hebrew, `--font-sans`) + Geist_Mono; `<html lang="en" dir="ltr">`; metadata בסיסי.
- `app/page.tsx` — placeholder ל-Phase 1 (ייהפך להרכבת הסקשנים ב-Phase 3).
- `app/globals.css` — tokens של shadcn (neutral, oklch). יוחלף/יורחב ב-Phase 2 עם הפלטה מ-/examples.
- `components/` — 7 stubs: `SiteHeader`, `Hero`, `UpcomingShows`, `MusicEmbeds`, `About`, `Booking`, `SiteFooter` (named exports, עם `id` לעוגנים). `components/ui/` — shadcn: `button`, `sheet`, `dialog`.
- `data/events.ts` — `ShowEvent` interface (PRD §6) + `events: ShowEvent[] = []` ריק.
- `lib/utils.ts` — `cn()` (shadcn). `components.json` — קונפיג shadcn.
- `examples/` — 15 תמונות רפרנס + README (ר' [[prd-document]] §2). `scripts/` ו-`public/generated/` — placeholders ל-pipeline (PRD §7).
- `.env.local` — `GEMINI_API_KEY=` (placeholder, gitignored).
- `CLAUDE.md` → `AGENTS.md` — גנריים מ-create-next-app; `AGENTS.md` מזהיר ש-Next 16 שונה מהותית (לקרוא `node_modules/next/dist/docs/`).

**Stack מלא:** ר' [[prd-document]] §3. בפועל הותקנו גם: `motion`, `react-icons`, `@google/genai`, `class-variance-authority`, `tw-animate-css`, `@base-ui/react` (shadcn החדש מבוסס Base UI, לא Radix).

## Open Questions
- Next 16 (לא 14 כמו ב-PRD) — אישור implicit (המשתמשת המשיכה), לא מפורש.
- `app/globals.css` — כרגע כולל עמוד preview? לא: `page.tsx` מרכיב את הסקשנים האמיתיים (Phase 3). ה-tokens נגזרו (Phase 2, ר' [[landing-page-components]]).
- Phase 4: `scripts/generate-art.mjs` (Gemini) נכתב אך לא הורץ — ר' [[gemini-art-script]].

## Session Log

### 2026-06-30 — יצירת ה-scaffold [shipped]
- **What was done:** הקמת ה-Next.js app בשורש (ר' פירוט מלא ב-[[project-skeleton-and-documentation]] § "Phase 1: scaffold"). `npm run build` עבר נקי.
- **Decisions:** scaffold דרך תיקייה זמנית והעברה לשורש; Rubik כ-`--font-sans`; LTR; הכל placeholder.
- **Notes / Caveats:** עצירה לאישור לפני Phase 2 (design tokens).
- **Related:** [[prd-document]], [[claude-directory]], [[project-skeleton-and-documentation]]
