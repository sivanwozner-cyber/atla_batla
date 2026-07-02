// lib/session.ts — ניהול ה-cookie של ה-session (server-only, משתמש ב-next/headers).
// מיובא מ-server actions ומרכיבי-שרת של האדמין. לא לייבא מ-proxy.ts.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createToken,
  verifyToken,
  type SessionPayload,
} from "@/lib/auth";

/** יוצר session חדש למשתמש ושומר cookie httpOnly חתום. */
export async function createSession(username: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

/** מוחק את ה-session (התנתקות). */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** מחזיר את ה-session הנוכחי אם תקין, אחרת null. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return verifyToken(cookieStore.get(SESSION_COOKIE)?.value);
}

/**
 * מוודא session תקין — אחרת מפנה ל-login. מחזיר את ה-payload למי שכן מחובר.
 * הגנה בעומק: נקרא בכל server action וברכיבי-השרת של האדמין, לא מסתמכים על proxy בלבד.
 */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
