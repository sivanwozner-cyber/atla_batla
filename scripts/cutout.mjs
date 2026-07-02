#!/usr/bin/env node
// scripts/cutout.mjs — הפיכת רקע שחור אחיד לשקוף עבור ארטוורק מ-Gemini.
// Gemini מזייף שקיפות (ראה memory), אז מייצרים את האובייקט על רקע שחור מלא
// ואז מסירים כאן את השחור ל-alpha אמיתי. משתמשים ב-flood-fill מהשוליים כדי
// שרק השחור המחובר לרקע יוסר — קווי המתאר השחורים *בתוך* האובייקט נשמרים.
//
// שימוש: node scripts/cutout.mjs <in.png> <out.png> [threshold=64] [feather=1.2]
import sharp from "sharp";

const [, , inPath, outPath, thrArg, featherArg] = process.argv;
if (!inPath || !outPath) {
  console.error(
    "usage: node scripts/cutout.mjs <in.png> <out.png> [threshold=64] [feather=1.2]"
  );
  process.exit(1);
}
const THRESH = Number(thrArg ?? 64); // סף בהירות שמתחתיו פיקסל נחשב "רקע שחור"
const FEATHER = Number(featherArg ?? 1.2); // טשטוש קל לאלפא לקצוות רכים

const { data, info } = await sharp(inPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const bright = (i) => Math.max(data[i], data[i + 1], data[i + 2]);
const cleared = new Uint8Array(W * H); // 1 = הפך שקוף (רקע)
const stack = [];
const visit = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const p = y * W + x;
  if (cleared[p]) return;
  if (bright(p * C) > THRESH) return; // הגענו לאובייקט — עוצרים
  cleared[p] = 1;
  stack.push(x, y);
};
for (let x = 0; x < W; x++) {
  visit(x, 0);
  visit(x, H - 1);
}
for (let y = 0; y < H; y++) {
  visit(0, y);
  visit(W - 1, y);
}
while (stack.length) {
  const y = stack.pop();
  const x = stack.pop();
  visit(x + 1, y);
  visit(x - 1, y);
  visit(x, y + 1);
  visit(x, y - 1);
}

// בונים ערוץ אלפא, מטשטשים אותו מעט (feather), ומחזירים למקורי
const a = Buffer.alloc(W * H);
for (let p = 0; p < W * H; p++) a[p] = cleared[p] ? 0 : 255;
const alpha =
  FEATHER > 0
    ? await sharp(a, { raw: { width: W, height: H, channels: 1 } })
        .blur(FEATHER)
        .raw()
        .toBuffer()
    : a;
for (let p = 0; p < W * H; p++) data[p * C + 3] = alpha[p];

await sharp(data, { raw: { width: W, height: H, channels: C } })
  .png()
  .trim({ threshold: 1 }) // חיתוך שוליים שקופים כדי ש-sprite יהיה צמוד
  .toFile(outPath);
console.log(`✓ cutout → ${outPath}`);
