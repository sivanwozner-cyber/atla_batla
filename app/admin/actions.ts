"use server";

// app/admin/actions.ts — כל ה-Server Actions של אזור הניהול.
// כל פעולת-כתיבה מאמתת session תחילה (requireSession) — Server Actions נגישים
// גם ב-POST ישיר, לא רק דרך ה-UI, אז ההרשאה נבדקת כאן ולא רק ב-proxy.

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkCredentials } from "@/lib/auth";
import { createSession, destroySession, requireSession } from "@/lib/session";
import type { LoginState, SaveState } from "@/app/admin/form-state";
import {
  getContent,
  saveContent,
  SET_TYPES,
  SOCIAL_LABELS,
  type EP,
  type SetType,
  type ShowEvent,
  type SocialLabel,
  type SocialLink,
} from "@/lib/content";

// ── עזרי קלט ─────────────────────────────────────────────────────────────
function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function ok(): SaveState {
  return { ok: true, savedAt: Date.now() };
}

// מרענן את עמוד הנחיתה הציבורי כדי שהעריכה תופיע מיד.
function revalidateSite() {
  revalidatePath("/");
}

// ── התחברות / התנתקות ────────────────────────────────────────────────────
export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = str(formData, "username");
  const password = String(formData.get("password") ?? "");
  const from = str(formData, "from");

  if (!checkCredentials(username, password)) {
    return { error: "שם משתמש או סיסמה שגויים" };
  }

  await createSession(username);
  redirect(from.startsWith("/admin") && from !== "/admin/login" ? from : "/admin");
}

export async function logoutAction(): Promise<void> {
  await requireSession();
  await destroySession();
  redirect("/admin/login");
}

// ── Hero ─────────────────────────────────────────────────────────────────
export async function saveHeroAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireSession();
  const content = await getContent();
  content.hero = {
    eyebrow: str(formData, "eyebrow"),
    tagline: str(formData, "tagline"),
    ctaLabel: str(formData, "ctaLabel") || "Listen",
    ctaHref: str(formData, "ctaHref") || "#music",
  };
  await saveContent(content);
  revalidateSite();
  return ok();
}

// ── About ────────────────────────────────────────────────────────────────
export async function saveAboutAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireSession();
  const content = await getContent();
  content.about = {
    body: str(formData, "body"),
    creditPrefix: String(formData.get("creditPrefix") ?? ""),
    creditLabel: str(formData, "creditLabel"),
    creditHref: str(formData, "creditHref"),
    creditSuffix: String(formData.get("creditSuffix") ?? ""),
    videoUrl: str(formData, "videoUrl"),
  };
  await saveContent(content);
  revalidateSite();
  return ok();
}

// ── Booking ──────────────────────────────────────────────────────────────
export async function saveBookingAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireSession();
  const email = str(formData, "email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "כתובת המייל לא תקינה" };
  }
  const content = await getContent();
  content.booking = { email, blurb: str(formData, "blurb") };
  await saveContent(content);
  revalidateSite();
  return ok();
}

// ── Site meta ────────────────────────────────────────────────────────────
export async function saveSiteAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireSession();
  const content = await getContent();
  content.site = {
    title: str(formData, "title") || "Atla Batla",
    description: str(formData, "description"),
  };
  await saveContent(content);
  revalidateSite();
  return ok();
}

// ── Shows (מערך — מגיע כ-JSON מהעורך בצד לקוח) ────────────────────────────
export async function saveShowsAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireSession();

  let raw: unknown;
  try {
    raw = JSON.parse(str(formData, "shows") || "[]");
  } catch {
    return { error: "שגיאה בקריאת רשימת ההופעות" };
  }
  if (!Array.isArray(raw)) return { error: "פורמט הופעות לא תקין" };

  const shows: ShowEvent[] = [];
  for (const item of raw as Partial<ShowEvent>[]) {
    const date = String(item.date ?? "").trim();
    const venue = String(item.venue ?? "").trim();
    const city = String(item.city ?? "").trim();
    if (!date || !venue || !city) {
      return { error: "בכל הופעה חובה תאריך, מקום ועיר" };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return { error: `תאריך לא תקין: ${date} (נדרש YYYY-MM-DD)` };
    }
    const setType: SetType = SET_TYPES.includes(item.setType as SetType)
      ? (item.setType as SetType)
      : "Live";
    const ticketUrl = String(item.ticketUrl ?? "").trim();
    shows.push({
      id: String(item.id ?? "").trim() || randomUUID(),
      date,
      venue,
      city,
      setType,
      ...(ticketUrl ? { ticketUrl } : {}),
    });
  }

  const content = await getContent();
  content.shows = shows;
  await saveContent(content);
  revalidateSite();
  return ok();
}

// ── Music (intro + מערך EPs כ-JSON) ──────────────────────────────────────
export async function saveMusicAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireSession();

  let raw: unknown;
  try {
    raw = JSON.parse(str(formData, "eps") || "[]");
  } catch {
    return { error: "שגיאה בקריאת רשימת ה-EPs" };
  }
  if (!Array.isArray(raw)) return { error: "פורמט EPs לא תקין" };

  const eps: EP[] = [];
  for (const item of raw as Partial<EP>[]) {
    const title = String(item.title ?? "").trim();
    const albumId = String(item.albumId ?? "").trim();
    if (!title || !albumId) {
      return { error: "בכל EP חובה שם ו-Album ID של Bandcamp" };
    }
    const tracks = Array.isArray(item.tracks)
      ? item.tracks.map((t) => String(t)).filter((t) => t.trim() !== "")
      : [];
    eps.push({
      id: String(item.id ?? "").trim() || randomUUID(),
      title,
      href: String(item.href ?? "").trim(),
      albumId,
      tracks,
    });
  }

  const content = await getContent();
  content.music = { intro: str(formData, "intro"), eps };
  await saveContent(content);
  revalidateSite();
  return ok();
}

// ── Social links (מערך כ-JSON) ───────────────────────────────────────────
export async function saveSocialsAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireSession();

  let raw: unknown;
  try {
    raw = JSON.parse(str(formData, "socials") || "[]");
  } catch {
    return { error: "שגיאה בקריאת הרשתות החברתיות" };
  }
  if (!Array.isArray(raw)) return { error: "פורמט רשתות לא תקין" };

  const socials: SocialLink[] = [];
  for (const item of raw as Partial<SocialLink>[]) {
    const label: SocialLabel = SOCIAL_LABELS.includes(item.label as SocialLabel)
      ? (item.label as SocialLabel)
      : "Instagram";
    const href = String(item.href ?? "").trim();
    if (!href) continue; // מדלגים על שורות ריקות
    socials.push({
      id: String(item.id ?? "").trim() || randomUUID(),
      label,
      href,
    });
  }

  const content = await getContent();
  content.socials = socials;
  await saveContent(content);
  revalidateSite();
  return ok();
}
