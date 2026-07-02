// proxy.ts — שכבת ההגנה על אזור הניהול (בגרסת Next הזו "middleware" עבר rebrand
// ל-"proxy": אותו קובץ בשורש, אותו matcher, אבל רץ ב-Node.js runtime).
// כאן זו בדיקת-קדם אופטימיסטית: מאמתים את חתימת ה-session מה-cookie ומפנים
// לפי הצורך. האימות ה"אמיתי" נעשה שוב בכל server action (ר' lib/session.ts).

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = verifyToken(request.cookies.get(SESSION_COOKIE)?.value);
  const isLoginPage = pathname === "/admin/login";

  // מבקר לא-מחובר שמנסה להיכנס לאזור הניהול → מפנים ל-login (עם חזרה ליעד המקורי).
  if (!session && !isLoginPage) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // מחובר שמגיע לעמוד ההתחברות → ישר ללוח הבקרה.
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// רץ רק על נתיבי /admin — עמוד הנחיתה הציבורי לא מושפע.
export const config = {
  matcher: ["/admin/:path*"],
};
