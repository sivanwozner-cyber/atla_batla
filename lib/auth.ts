// lib/auth.ts — לוגיקת התחברות + חתימת session, crypto טהור (node:crypto בלבד).
// אין תלות ב-next/headers כאן בכוונה, כדי שאפשר יהיה לייבא את verifyToken גם
// מתוך proxy.ts (שרץ ב-Node.js runtime). ניהול ה-cookie עצמו יושב ב-lib/session.ts.

import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "atlabatla_admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // שבוע

export interface SessionPayload {
  sub: string; // שם המשתמש
  exp: number; // תוקף (Unix seconds)
}

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    // fallback לפיתוח מקומי בלבד — בפרודקשן חובה להגדיר ADMIN_SESSION_SECRET.
    "dev-only-insecure-secret-please-set-ADMIN_SESSION_SECRET"
  );
}

function sign(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

/** יוצר token חתום: base64url(payload).hmac */
export function createToken(username: string): string {
  const payload: SessionPayload = {
    sub: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

/** מאמת token: חתימה תקינה + לא פג תוקף. מחזיר את ה-payload או null. */
export function verifyToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8")
    ) as SessionPayload;
    if (
      typeof payload.exp !== "number" ||
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

/** השוואה עמידה-לתזמון של שתי מחרוזות. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/**
 * בודק פרטי התחברות מול משתני הסביבה ADMIN_USERNAME / ADMIN_PASSWORD.
 * ברירת מחדל (admin / atlabatla) קיימת רק כדי שהמערכת תעבוד מיד בפיתוח —
 * מומלץ מאוד להחליף אותם ב-.env.local.
 */
export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME ?? "admin";
  const p = process.env.ADMIN_PASSWORD ?? "atlabatla";
  // מחשבים את שתי ההשוואות תמיד (בלי short-circuit) כדי לצמצם דליפת תזמון.
  const okUser = safeEqual(username, u);
  const okPass = safeEqual(password, p);
  return okUser && okPass;
}
