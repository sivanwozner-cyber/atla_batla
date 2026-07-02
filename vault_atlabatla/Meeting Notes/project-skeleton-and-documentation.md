# Project Skeleton & Documentation

## Overview
הקמת פרויקט Atla Batla: תיקיות `.claude/`, vault תיעודי ב-`vault_atlabatla/`, ובניית אתר הנחיתה ב-Next.js 16 (App Router, TS, Tailwind v4, shadcn/ui) בשלבים עם אישור. **הושלמו:** Phase 1 (scaffold), Phase 2 (design tokens מ-15 תמונות ב-/examples → פלטת לילה + wordmark), Phase 3 (6 סקשנים + הדר דביק, motion, starfield), Phase 4 (סקריפט Gemini `scripts/generate-art.mjs`), Phase 5 (**הרצת ה-pipeline** → `public/generated/hero.png` נוצר וחובר כרקע ה-Hero), Phase 6 (לוגו wordmark מ-Gemini בסגנון Power Rangers + ברק → `wordmark.png`, חובר ב-Hero+הדר). כל שאר התוכן placeholder עד שיוזן תוכן אמיתי. השלב הבא: הזנת תוכן אמיתי (תאריכים, מייל, embeds, רשתות, ביו).

## Open Questions
- גרסת Next: הותקן **Next 16.2.9**; ה-PRD §3 כותב "Next.js 14". המשתמשת המשיכה בלי להתנגד (אישור implicit), אך לא נאמר מפורשות.
- `CLAUDE.md` בשורש כרגע גנרי (create-next-app → `AGENTS.md`) — גרסה ספציפית-לפרויקט טרם נכתבה (ב-TODO.md).
- כל התוכן placeholder — ממתין לתוכן אמיתי: תאריכי הופעות, מייל בוקינג, Bandcamp embeds, קישורי רשתות, ביו/טאגליין (PRD §9).
- מודל `gemini-3.1-flash-image` **אומת ועובד** (הרצה 2026-07-01, hero נוצר). fallback `gemini-2.5-flash-image` עדיין זמין דרך `--model`/`GEMINI_IMAGE_MODEL`.
- שגיאות hydration mismatch ב-console מ-[[landing-page-components]] `Reveal` (motion `initial` מרונדר ב-SSR) — קיימות מ-Phase 3, לא נגרמו מ-Phase 5. טרם תוקנו.
- אילו agents/skills/commands ספציפיים יידרשו ב-`.claude/` — טרם הוחלט.

## Session Log

### 2026-06-30 — יצירת שלד `.claude/` [shipped]
- **What was done:** נוצרו `.claude/agents/`, `.claude/skills/`, `.claude/commands/` ריקות בשורש הריפו.
- **Decisions:** נשארות ריקות עד שתתברר הצורך בפועל מתוך העבודה על ה-PRD.
- **Notes / Caveats:** ניסיון לעדכן `CLAUDE.md` במקביל נכנס ל-Plan Mode ובוטל ע"י המשתמש לפני ביצוע — עדיין לא קיים.
- **Related:** [[claude-directory]], [[prd-document]]

### 2026-06-30 — בניית vault_atlabatla ותיעוד קבצי הפרויקט [shipped]
- **What was done:** הופעל סקיל `obsidian-vault-workflow` על vault בשם `vault_atlabatla` (לא `vault_sisu` הדיפולטי). נסרק כל הפרויקט בפועל (`atla-batla-website-prd.md` + תיקיית `.claude/`), ונוצרו קבצי תיעוד ב-`vault_atlabatla/Project Files/`: [[prd-document]] עבור ה-PRD, [[claude-directory]] עבור `.claude/`. נוצרו גם `_index.md` בתיקיות `Project Files/` ו-`Meeting Notes/`.
- **Decisions:** במקום למפות כל קובץ לפי הקונבנציה הסטנדרטית (Meeting Notes/Content Briefs/Publishing Log/Brand Guidelines בלבד), נוספה תיקייה ייעודית `Project Files/` שמכילה תיעוד 1:1 לכל קובץ ממשי בריפו, כפי שביקש המשתמש במפורש ("קובץ MD לכל קובץ — מה עושה, למי משויך"). זה משלים, לא מחליף, את ה-Meeting Notes הרגיל.
- **Notes / Caveats:** הפרויקט כרגע מינימלי מאוד (PRD + תיקיות ריקות) — אין עדיין components/data/scripts לתעד. ה-vault יורחב אוטומטית ככל שייווצרו קבצים חדשים (כל קובץ חדש בפרויקט אמור לקבל note מקביל ב-`Project Files/`).
- **Related:** [[prd-document]], [[claude-directory]]

### 2026-06-30 — Phase 1: scaffold של Next.js [shipped]
- **What was done:** הוקם scaffold מלא בשורש. `create-next-app@latest` (יצא **Next 16.2.9**, React 19, TS, Tailwind v4, App Router, ללא src/, alias `@/*`) הורץ לתת-תיקייה זמנית והקבצים הועברו לשורש (mv = rename מיידי, חסך התקנה חוזרת). `shadcn init` + `button/sheet/dialog`. הותקנו `motion`, `react-icons`, `@google/genai` (ו-clsx/tailwind-merge/lucide-react דרך shadcn). נוצרו שלד 7 קומפוננטות (Hero, SiteHeader, UpcomingShows, MusicEmbeds, About, Booking, SiteFooter), `data/events.ts` (interface `ShowEvent` + מערך ריק), `examples/README.md`, `scripts/.gitkeep`, `public/generated/.gitkeep`, `.env.local`. `layout.tsx` עודכן ל-Rubik (subset latin+hebrew, `--font-sans`) + `dir="ltr"`. `npm run build` עבר נקי (TypeScript ✓, 4 עמודים סטטיים).
- **Decisions:** (1) Scaffold בשורש דרך תיקייה זמנית — כי create-next-app מסרב לרוץ בתיקייה עם קבצים לא-מוכרים. (2) שימוש ב-`@latest` לפי הפקודה ב-PRD למרות ש"Next 14" כתוב שם — יצא Next 16; הוצג לאישור. (3) Rubik.variable=`--font-sans` כדי להזרים אל ה-token של shadcn בלי לערוך את globals. (4) `git init` נדחה לבקשת המשתמשת. (5) הכל placeholder; Gemini script ייכתב ב-Phase 4 בלי הרצה.
- **Notes / Caveats:** עצירה לאישור לפני Phase 2. `examples/` כבר מולא ב-15 תמונות ע"י המשתמשת. `CLAUDE.md` הנוכחי גנרי (→`AGENTS.md` עם אזהרת Next 16).
- **Related:** [[prd-document]], [[claude-directory]], [[nextjs-app-scaffold]]

### 2026-06-30 — Phase 2: design tokens מ-/examples [shipped]
- **What was done:** צפייה בכל 15 התמונות ב-`examples/` (פליירים/ארטוורק אמיתיים). גזירת design tokens ל-`globals.css`: פלטת לילה (מאשרת PRD §5 + הוסיף `violet`, `sunset`, `cream`), פונט wordmark **Titan One** (בועתי — הכי קרוב לפליירים), Rubik ל-UI/עברית. wordmark עם גרדיאנט rainbow + קו מתאר כהה ב-CSS. רקע לילה + זוהרי שקיעה/סגול. עמוד preview זמני ל-page.tsx. אומת דרך eval (screenshot תקול בסביבה).
- **Decisions:** הפלטה הזמנית של PRD §5 אושרה כמעט כלשונה (נגזרה מ-5 מאותן תמונות). Titan One על פני Bungee (מרובע מדי) ו-Fredoka (רך מדי). האתר dark-first. tokens של shadcn מופו לפלטת המותג בלי לשבור את המערכת.
- **Notes / Caveats:** התמונות מאששות: גמל-מסקוט, מדבר נגב, פסיכדליה מקסימליסטית, סאונד-סיסטם, קשר פיני (Suomi) — לא "גואה מינימליסטי". אושר ע"י המשתמשת.
- **Related:** [[nextjs-app-scaffold]], [[landing-page-components]], [[prd-document]]

### 2026-06-30 — Phase 3: מימוש 6 הסקשנים + הדר [shipped]
- **What was done:** קריאת docs של Next 16 (`node_modules/next/dist/docs/`) ו-API של shadcn (Base UI) לפני קוד. מומשו: `SiteHeader` (sticky + Sheet מובייל), `Hero` (wordmark, CTA→#music, starfield CSS), `UpcomingShows` (סינון date>=today, featured, נעלם כשריק), `MusicEmbeds` (2 placeholders Bandcamp), `About`, `Booking` (mailto + copy-to-clipboard), `SiteFooter` (react-icons/fa6), ו-`Reveal` (motion whileInView + prefers-reduced-motion). הורכב ב-`app/page.tsx`. `npm run build` עבר (exit 0, TS ✓, 4 עמודים). אומת ב-dev: מבנה נכון, אפס שגיאות, `#shows` נעדר (מערך ריק), mailto+4 רשתות.
- **Decisions:** ניווט עוגנים (Shows/Music/About/Booking). כפתורים דרך `buttonVariants` על `<a>` (נמנע מ-render-prop של Base UI במקומות מיותרים). סגירת Sheet ב-onClick+state ולא SheetClose. כל הטקסט placeholder מסומן. Random Records לא נכלל (החלטת משתמשת).
- **Notes / Caveats:** ה-build איטי מאוד (~65s קומפילציה, ~73s TS) — הפרויקט על דיסק איטי (OneDrive/"New folder"); Next הזהיר "Slow filesystem". אין להריץ `next build` ו-`next dev` במקביל (שניהם על `.next` → תקיעה). screenshot של Preview MCP לא עובד בסביבה (renderer לא מגיע ל-localhost) — אומת דרך eval.
- **Related:** [[landing-page-components]], [[nextjs-app-scaffold]], [[prd-document]]

### 2026-06-30 — wordmark: Titan One → Bungee (צורת Power Rangers) [shipped]
- **What was done:** לבקשת המשתמשת (עם רפרנס לפליר "Acid Rangers"), פונט ה-wordmark הוחלף מ-Titan One (בועה עגולה) ל-**Bungee** (בלוקים מרובעים-זוויתיים, all-caps) לשחזור ה-shape של לוגו Power Rangers. נוסף `font-style: italic` (מסונתז) לנטייה, ריווח מהודק (-0.01em), stroke 0.05em. אומת דרך eval (fontFamily=Bungee, italic, clip=text). קומפילציה חוזרת ~43s (דיסק איטי).
- **Decisions:** Bungee = ההתאמה הקרובה ביותר ל-PR מבין Google Fonts. **הצבעים (גרדיאנט rainbow + קו מתאר) ללא שינוי** — המשתמשת ביקשה מפורשות "הצורה בלבד ולא הצבעים". לא נוסף chrome/ברק ⚡ (מעבר לצורת הפונט) — זמין כתוספת אם תרצה.
- **Notes / Caveats:** הנטייה היא italic מסונתז (ל-Bungee אין face נטוי) — אם האיכות לא מספקת אפשר להחליף ל-skewX. אופציה: להוסיף ברק ⚡ בין המילים + חיתוך chrome כדי להתקרב עוד לרפרנס.
- **Related:** [[landing-page-components]], [[nextjs-app-scaffold]], [[prd-document]]

### 2026-06-30 — Phase 4: סקריפט Gemini (בלי הרצה) [shipped]
- **What was done:** נכתב `scripts/generate-art.mjs` + npm script `generate:art`. בדיקת ה-SDK המותקן (`@google/genai` **v2.10.0**) גילתה שה-skeleton ב-PRD §7 בדיוני — נכתב מול ה-API האמיתי: `ai.models.generateContent({ model, contents, config: { responseModalities:[Modality.IMAGE], imageConfig:{ aspectRatio, imageSize } } })`, וחילוץ מ-`response.candidates[0].content.parts[].inlineData.data`. CLI: prompt (פוזישיונל/`--prompt`), `--ref` (חזרתי/פסיקים, עד 14), `--out`, `--model`, `--aspect`, `--size`. טעינת `.env.local` דרך `process.loadEnvFile`. אומת `node --check` (exit 0). **לא הורץ.**
- **Decisions:** מול ה-API האמיתי ולא ה-skeleton של ה-PRD. ברירת מודל מ-PRD (`gemini-3.1-flash-image`, Nano Banana) עם override דרך `--model`/`GEMINI_IMAGE_MODEL` ו-fallback מתועד (`gemini-2.5-flash-image`). `apiKey` מועבר מפורשות (לא הסתמכות על auto-read).
- **Notes / Caveats:** שמות המודלים לא אומתו מול ה-API (לא הורץ). הסקריפט לא חלק מ-build של Next (לא מיובא). כל 4 השלבים המתוכננים הושלמו.
- **Related:** [[gemini-art-script]], [[nextjs-app-scaffold]], [[prd-document]]

### 2026-07-01 — Phase 6: לוגו wordmark מ-Gemini (Power Rangers + ברק) [shipped]
- **What was done:** המשתמשת ביקשה לוגו בצורת פונט Power Rangers עם ברק באמצע (Bungee ב-CSS לא קלע). ג'ונרטתי דרך `generate:art` לוגו "ATLA ⚡ BATLA" (סגנון PR: בלוקי/נטוי/bevel, גרדיאנט זהב→כתום→מגנטה→סגול, קו מתאר כהה, ברק זהוב). **גילוי:** המודל התעלם מבקשת רקע שקוף וצייר דפוס שח-מט אפור אטום (A=255). תוקן בקוד: chroma-key להסרת האפור (C# inline + GDI+ LockBits, רוויה<30 ובהירות>168 → אלפא 0) + חיתוך לגבולות הלוגו → `public/generated/wordmark.png` (2638×846, שקיפות אמיתית). חובר ב-3 מקומות: `Hero.tsx` (`<h1>` עם `<Image>` + `alt`), `SiteHeader.tsx` (brand + כותרת Sheet מובייל), כולם `next/image` עם `sizes` מתאים. אומת דרך eval: 3 התמונות `complete:true` במידות נכונות, אפס שגיאות/אזהרות image.
- **Decisions:** לוגו כתמונה (לא CSS/פונט) — הדרך האמינה היחידה לצורת PR המדויקת + ברק; שקיפות אמיתית ע"י keying (לא blend-mode, שהיה הורס את הקו הכהה). `sizes="120px"` בהדר למניעת טעינת וריאנט 4K ללוגו זעיר. סמנטיקה נשמרה: `<h1>`+`alt="Atla Batla"`.
- **Notes / Caveats:** `.wordmark` ב-globals.css כעת ללא שימוש (לא הוסר — fallback אפשרי). ה-gotcha של שקיפות מזויפת רלוונטי לכל ג'ינרוט לוגו עתידי. ניסיון aspect 21:9 עבר timeout (>4min) — 16:9 יציב.
- **Related:** [[gemini-art-script]], [[landing-page-components]], [[prd-document]]

### 2026-07-01 — Phase 5: הרצת ה-pipeline + חיבור ארטוורק Hero [shipped]
- **What was done:** לבקשת המשתמשת ("רוץ על 2") הורץ `npm run generate:art` בפעם הראשונה. prompt ל-hero banner 16:9 בפלטת הלילה (מדבר נגב לילי, אוטובוסי מפלצת, מסקוט גמל, פטריות/מנדלות/צלחת מעופפת, שטח שמיים פנוי במרכז-עליון ל-wordmark, ללא טקסט מוטבע), עם 5 פליירים אמיתיים כרפרנס (`82040/81697/11070/11251/11254`). נשמר `public/generated/hero.png` (2752×1536). חובר ל-`Hero.tsx` כ-`next/image` (fill, priority, object-cover) + scrim gradient לקריאוּת + דהייה לרקע הלילה, טוויקול כוכבים נשמר מעל. אומת דרך eval: התמונה נטענת (`imgComplete`, דרך `/_next/image`), wordmark מעליה.
- **Decisions:** מודל `gemini-3.1-flash-image` (ברירת המחדל מ-PRD) — **עבד בהרצה ראשונה**, לא נדרש fallback. הוסרו שכבות ה-CSS הסטטיות (`starfield`,`hero-horizon`) שהתייתרו; טוויקול נשמר לכיבוד PRD §5. הזנת פליירים אמיתיים כרפרנס (PRD §7) לשמירת עקביות (אותו גמל/אוטובוס/טון).
- **Notes / Caveats:** האיור כולל SynthID watermark שקוף. screenshot של Preview עדיין תקול בסביבה (אומת דרך eval). שגיאות hydration של `Reveal` צצו ב-console — קיימות מ-Phase 3, לא קשורות לשינוי, טרם תוקנו. `.starfield`/`.hero-horizon` ב-globals.css כעת ללא שימוש (לא הוסרו).
- **Related:** [[gemini-art-script]], [[landing-page-components]], [[prd-document]]

### 2026-07-02 — רה-ג'ינרוט ארטוורק ה-Hero [shipped]
- **What was done:** לבקשת המשתמשת ("להריץ generate:art ולחבר ארטוורק Hero אמיתי") הורץ מחדש ה-pipeline. נוצר hero חדש (flash `gemini-3.1-flash-image`, 16:9, 2K, אותם 5 רפרנסים 82040/81697/11070/11251/11254) עם prompt שאוסר טקסט מפורשות; נכתב תחילה ל-`hero-2.png` ואז הוחלף פנימה כ-`public/generated/hero.png` (הקודם → `hero-prev.png`). `Hero.tsx` ללא שינוי (כבר מצביע ל-`/generated/hero.png`). אומת דרך dev server + curl: `/`=200, `/_next/image` של ה-hero=200 (image/jpeg), הסטטי `/generated/hero.png`=200 (3,125,867B).
- **Decisions:** קובץ חדש קודם ואז swap — כדי לא להרוס את הארטוורק הטוב הקיים (`public/generated/` gitignored, אין גיבוי git). prompt נקי-מטקסט לתיקון הכיתוב המשובש "ATLA BATLA" שהמודל צייר על האוטובוס ב-hero הקודם. נשאר flash (מוכח), לא pro.
- **Notes / Caveats:** הפלט החדש נקי מטקסט לגמרי + שמיים פנויים במרכז-עליון ל-wordmark (אומת ב-view). screenshot של Preview עדיין לא אמין — אומת דרך curl. `.env.local` מכיל 2 שורות `GEMINI_API_KEY`; השנייה (`AQ.Ab8…`, OAuth-style) גוברת (last-wins) ו**עובדת**. `hero-prev.png` שמור לריוורט (gitignored).
- **Related:** [[gemini-art-script]], [[landing-page-components]], [[prd-document]]
