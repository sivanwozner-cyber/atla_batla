#!/usr/bin/env node
// scripts/cutout.mjs — הפיכת רקע שחור אחיד לשקוף עבור ארטוורק מ-Gemini.
// Gemini מזייף שקיפות (ראה memory), אז מייצרים את האובייקט על רקע שחור מלא
// ואז מסירים כאן את השחור ל-alpha אמיתי. flood-fill מהשוליים מסיר רק את השחור
// המחובר לרקע — קווי המתאר השחורים *בתוך* האובייקט נשמרים (הם מוקפים בצבע).
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
const cleared = new Uint8Array(W * H); // 1 = רקע (יהפוך שקוף)
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

// אלפא: 0 לרקע, 255 לאובייקט; טשטוש קל ל-feather
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

// bounding-box של הפיקסלים האטומים + padding, וחיתוך ידני (sharp.trim לא אמין כאן)
let minx = W, miny = H, maxx = -1, maxy = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (alpha[y * W + x] > 8) {
      if (x < minx) minx = x;
      if (x > maxx) maxx = x;
      if (y < miny) miny = y;
      if (y > maxy) maxy = y;
    }
  }
}
if (maxx < 0) {
  console.error("cutout: nothing left (threshold too high?)");
  process.exit(1);
}
const PAD = 8;
minx = Math.max(0, minx - PAD);
miny = Math.max(0, miny - PAD);
maxx = Math.min(W - 1, maxx + PAD);
maxy = Math.min(H - 1, maxy + PAD);

await sharp(data, { raw: { width: W, height: H, channels: C } })
  .extract({ left: minx, top: miny, width: maxx - minx + 1, height: maxy - miny + 1 })
  .png()
  .toFile(outPath);
console.log(`✓ cutout → ${outPath} (${maxx - minx + 1}x${maxy - miny + 1})`);
