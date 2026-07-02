# claude-directory — .claude/

## Overview
תיקיית קונפיגורציה לכלי Claude Code, יושבת בשורש הריפו. מכילה שלוש תתי-תיקיות: `.claude/agents/`, `.claude/skills/`, `.claude/commands/` — כרגע **ריקות בכוונה**, כחלק משלב הקמת השלד (skeleton) של הפרויקט, לפני תחילת קוד אפליקציה.

**משויך ל:** Claude Code עצמו (סוכן ה-AI שעובד על הריפו) — לא קוד runtime של האתר.

**ייעוד כל תת-תיקייה (מתוכנן, טרם ממומש):**
- `agents/` — סוכנים מותאמים אישית לפרויקט (למשל סוכן ייעודי לבדיקת התאמה ל-`/examples` לפני אישור design tokens)
- `skills/` — skills מותאמים לזרימת העבודה הספציפית של הפרויקט (כמו ה-pipeline של Gemini ב-PRD §7)
- `commands/` — slash commands מותאמים (למשל הרצת `scripts/generate-art.mjs` בקלות)

## Open Questions
- אין עדיין תוכן בפועל בשלוש התיקיות — ימולאו בהמשך לפי הצורך שיתגלה תוך כדי עבודה על ה-PRD
- `CLAUDE.md` בשורש (שאמור להפנות לתיקייה הזו ולתאר את הפרויקט/סטאק) טרם נכתב בפועל

## Session Log

### 2026-06-30 — יצירת שלד התיקיות [shipped]
- **What was done:** נוצרו שלוש התיקיות הריקות `.claude/agents`, `.claude/skills`, `.claude/commands` בשורש הריפו, כהכנה לקבלת agents/skills/commands ייעודיים לפרויקט בהמשך.
- **Decisions:** התיקיות נשארות ריקות בשלב זה לפי בקשה מפורשת — אין עדיין החלטה איזה agents/skills/commands יידרשו, זה ייגזר מהעבודה בפועל על ה-PRD.
- **Notes / Caveats:** `CLAUDE.md` שאמור להפנות לתיקייה הזו טרם נכתב בפועל (תכנון לכך קיים אך בוטל לפני ביצוע).
- **Related:** [[prd-document]]
