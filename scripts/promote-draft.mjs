// scripts/promote-draft.mjs
// ─────────────────────────────────────────────────────────────────────────────
// קידום טיוטה → פרודקשן (Vercel).
// מעתיק קבצים מסביבת הטיוטה (app/draft/, שנמצאת ב-.gitignore) אל מיקומם האמיתי
// בריפו. משם ה-auto-commit דוחף ל-main וורסל מדפלוי — כלומר "קידום" = "העלאה לורסל".
//
// איך מסמנים קובץ טיוטה כמוכן-להעלאה:
//   מוסיפים בראש הקובץ שורת-הערה עם היעד (נתיב יחסי לשורש הריפו):
//       // @promote-to: components/Hero.tsx
//   אפשר כמה שורות כאלה (כמה יעדים). שורת הסימון עצמה מוסרת מהקובץ המקודם.
//
// שימוש:
//   npm run promote:draft                 # מקדם את כל הקבצים המסומנים
//   npm run promote:draft -- --dry-run    # תצוגה מקדימה בלבד (לא כותב כלום)
//   npm run promote:draft -- Hero         # סינון: רק קבצי-מקור שנתיבם מכיל "Hero"
//   npm run promote:draft -- --push       # אחרי ההעתקה: git add+commit+push מיידי
// ─────────────────────────────────────────────────────────────────────────────

import { promises as fs } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const DRAFT_DIR = path.join(ROOT, "app", "draft");
const TEXT_EXT = new Set([
  ".tsx", ".ts", ".jsx", ".js", ".mjs", ".cjs",
  ".css", ".json", ".md", ".mdx", ".svg", ".txt",
]);
// שורת סימון: // @promote-to: <target>  (גם /* */, *, # נתמכים)
const ANNOT = /^\s*(?:\/\/|\/\*|\*|#)\s*@promote-to:\s*(.+?)\s*(?:\*\/)?\s*$/;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const doPush = args.includes("--push");
const filters = args.filter((a) => !a.startsWith("--"));

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out; // אין app/draft/ — אין מה לקדם
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function parseTargets(text) {
  const targets = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(ANNOT);
    if (m) targets.push(m[1].trim());
  }
  return targets;
}

// מסיר את שורות @promote-to מהקובץ המקודם כדי שקוד הפרודקשן יהיה נקי.
function stripAnnotations(text) {
  return text.split(/\r?\n/).filter((line) => !ANNOT.test(line)).join("\n");
}

function validateTarget(t) {
  const abs = path.resolve(ROOT, t);
  if (abs !== ROOT && !abs.startsWith(ROOT + path.sep)) return `היעד מחוץ לריפו: ${t}`;
  if (abs === DRAFT_DIR || abs.startsWith(DRAFT_DIR + path.sep))
    return `היעד בתוך app/draft/ (אין טעם לקדם לשם): ${t}`;
  return null;
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function main() {
  const files = await walk(DRAFT_DIR);
  const jobs = [];
  for (const src of files) {
    if (!TEXT_EXT.has(path.extname(src).toLowerCase())) continue;
    const srcRel = rel(src);
    if (filters.length && !filters.some((f) => srcRel.includes(f))) continue;
    let text;
    try { text = await fs.readFile(src, "utf8"); } catch { continue; }
    for (const target of parseTargets(text)) jobs.push({ srcRel, target, text });
  }

  if (jobs.length === 0) {
    const suffix = filters.length ? ` (עם הסינון: ${filters.join(", ")})` : "";
    console.log(`אין קבצי טיוטה מסומנים ב-@promote-to${suffix}.`);
    console.log('סמן קובץ ע"י הוספת שורה בראשו, למשל:  // @promote-to: components/Hero.tsx');
    return;
  }

  const applied = [];
  for (const job of jobs) {
    const err = validateTarget(job.target);
    const targetAbs = path.resolve(ROOT, job.target);
    const status = err ? "שגיאה" : (await exists(targetAbs)) ? "דריסה" : "חדש";
    console.log(
      `${dryRun ? "[יבש] " : ""}${status.padEnd(6)} ${job.srcRel}  →  ${job.target}` +
        (err ? `   ✗ ${err}` : "")
    );
    if (err || dryRun) continue;
    const out = stripAnnotations(job.text).replace(/\n*$/, "\n");
    await fs.mkdir(path.dirname(targetAbs), { recursive: true });
    await fs.writeFile(targetAbs, out, "utf8");
    applied.push(job.target);
  }

  if (dryRun) {
    console.log(`\nתצוגה מקדימה: ${jobs.length} פעולה/ות. הרץ בלי --dry-run כדי לבצע.`);
    return;
  }
  if (applied.length === 0) {
    console.log("\nלא קודם כלום (ר' שגיאות למעלה).");
    process.exitCode = 1;
    return;
  }
  console.log(`\n✓ קודמו ${applied.length} קבצים אל מיקומם האמיתי.`);

  if (doPush) {
    try {
      execFileSync("git", ["add", "--", ...applied], { cwd: ROOT, stdio: "inherit" });
      execFileSync("git", ["commit", "-m", `Promote from draft: ${applied.join(", ")}`], { cwd: ROOT, stdio: "inherit" });
      execFileSync("git", ["push"], { cwd: ROOT, stdio: "inherit" });
      console.log("✓ נדחף ל-git — וורסל ידפלוי.");
    } catch (e) {
      console.error("git push נכשל:", e.message);
      process.exitCode = 1;
    }
  } else {
    console.log('הקבצים כעת מנוהלים ע"י git. ה-auto-commit ידחוף אותם, או הרץ שוב עם --push לדחיפה מיידית.');
  }
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
