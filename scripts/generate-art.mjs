#!/usr/bin/env node
// scripts/generate-art.mjs — יצירת ארטוורק ל-Atla Batla דרך Gemini (PRD §7).
//
// ⚠️ הערה על ה-API: ה-skeleton ב-PRD §7 השתמש ב-API בדיוני
// (`ai.interactions.create` / `response_format`) שלא קיים ב-SDK. הסקריפט הזה
// משתמש ב-API האמיתי של @google/genai v2.10.0:
//   ai.models.generateContent({
//     model,
//     contents,                       // [{ text }, { inlineData }, ...]
//     config: {
//       responseModalities: [Modality.IMAGE],
//       imageConfig: { aspectRatio, imageSize },
//     },
//   })
// והתמונה מחולצת מ-response.candidates[0].content.parts[].inlineData.data (base64).
//
// ⚠️ הסקריפט עדיין לא הורץ. דורש GEMINI_API_KEY ב-.env.local (gitignored).

import { GoogleGenAI, Modality } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

// ── טעינת .env.local ידנית (node רגיל לא טוען אותו כמו Next.js) ──────────
// Node 20+/24 תומך ב-process.loadEnvFile. אם הקובץ חסר (למשל ב-CI עם env מוזרק)
// פשוט מדלגים ומסתמכים על משתני הסביבה הקיימים.
try {
  process.loadEnvFile(path.resolve(process.cwd(), ".env.local"));
} catch {
  // no .env.local — ok
}

// ── ברירות מחדל ─────────────────────────────────────────────────────────
// מודלים מ-PRD §7 (Nano Banana — לא Imagen, שנסגר 17.8.2026).
// ניתן לעקוף עם --model או GEMINI_IMAGE_MODEL. אם ה-API דוחה את שם המודל
// (התחום מתעדכן מהר), נסי: gemini-3-pro-image (4K / hi-fi) או
// gemini-2.5-flash-image כ-fallback זמין.
const DEFAULTS = {
  model: process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image",
  out: "public/generated/output.png",
  aspect: "16:9", // 1:1 לפוסט אינסטגרם, 9:16 לסטורי, 16:9/21:9 ל-hero
  size: "2K", // 1K | 2K | 4K
};

const MAX_REFS = 14; // PRD §7 — עד 14 תמונות רפרנס לקריאה

const HELP = `
Atla Batla — Gemini art generator (PRD §7)

Usage:
  npm run generate:art -- "<prompt>" [options]

Options:
  --prompt <text>    ה-prompt (או פוזישיונלית כארגומנט הראשון)
  --ref <path>       תמונת רפרנס מ-/examples (חזרתי, או מופרד בפסיקים). עד ${MAX_REFS}.
  --out <path>       נתיב פלט (ברירת מחדל: ${DEFAULTS.out})
  --model <id>       מודל (ברירת מחדל: ${DEFAULTS.model})
  --aspect <ratio>   1:1 | 3:4 | 4:3 | 9:16 | 16:9 | 21:9 (ברירת מחדל: ${DEFAULTS.aspect})
  --size <size>      1K | 2K | 4K (ברירת מחדל: ${DEFAULTS.size})
  -h, --help         עזרה

Example:
  npm run generate:art -- "hero background, desert night, camel hitchhiker, monster bus" \\
    --ref examples/11070.png --ref examples/82040.jpg \\
    --out public/generated/hero.png --aspect 16:9 --size 2K

Env:
  GEMINI_API_KEY     חובה. ב-.env.local (gitignored).
`;

function parseArgs(argv) {
  const args = {
    prompt: "",
    refs: [],
    out: DEFAULTS.out,
    model: DEFAULTS.model,
    aspect: DEFAULTS.aspect,
    size: DEFAULTS.size,
    help: false,
  };
  const rest = argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    switch (a) {
      case "-h":
      case "--help":
        args.help = true;
        break;
      case "--prompt":
        args.prompt = rest[++i] ?? "";
        break;
      case "--ref":
        (rest[++i] ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((p) => args.refs.push(p));
        break;
      case "--out":
        args.out = rest[++i] ?? args.out;
        break;
      case "--model":
        args.model = rest[++i] ?? args.model;
        break;
      case "--aspect":
        args.aspect = rest[++i] ?? args.aspect;
        break;
      case "--size":
        args.size = rest[++i] ?? args.size;
        break;
      default:
        if (a.startsWith("-")) {
          console.error(`Unknown flag: ${a}\nRun with --help.`);
          process.exit(1);
        }
        // פוזישיונל = ה-prompt (מצטבר אם הועבר בלי מרכאות)
        args.prompt = args.prompt ? `${args.prompt} ${a}` : a;
    }
  }
  return args;
}

function mimeFromPath(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  return "application/octet-stream";
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    console.log(HELP);
    return;
  }
  if (!args.prompt) {
    console.error("Missing prompt. Run with --help.");
    process.exit(1);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(
      "Missing GEMINI_API_KEY — add it to .env.local (see PRD §7)."
    );
    process.exit(1);
  }

  // בניית ה-contents: prompt + תמונות רפרנס (הזנת הפליירים האמיתיים שומרת
  // עקביות ויזואלית — אותו גמל, אותו אוטובוס, אותו טון; PRD §7).
  const refs = args.refs.slice(0, MAX_REFS);
  if (args.refs.length > MAX_REFS) {
    console.warn(`Too many refs — using first ${MAX_REFS}.`);
  }
  const contents = [{ text: args.prompt }];
  for (const p of refs) {
    if (!fs.existsSync(p)) {
      console.error(`Ref image not found: ${p}`);
      process.exit(1);
    }
    contents.push({
      inlineData: {
        mimeType: mimeFromPath(p),
        data: fs.readFileSync(p).toString("base64"),
      },
    });
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log(
    `→ model=${args.model} aspect=${args.aspect} size=${args.size} refs=${refs.length}`
  );

  const response = await ai.models.generateContent({
    model: args.model,
    contents,
    config: {
      responseModalities: [Modality.IMAGE],
      imageConfig: { aspectRatio: args.aspect, imageSize: args.size },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];
  const image = parts.find((p) => p.inlineData?.data);
  if (!image) {
    console.error(
      "No image in response. Text (if any):",
      response.text ?? "(none)"
    );
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, Buffer.from(image.inlineData.data, "base64"));
  console.log(`✓ Saved → ${args.out}`);
  // הערה: כל תמונה כוללת SynthID watermark שקוף (PRD §7).
}

main().catch((err) => {
  console.error("generate:art failed:", err?.message ?? err);
  process.exit(1);
});
