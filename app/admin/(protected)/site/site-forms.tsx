"use client";

import { useActionState, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  saveHeroAction,
  saveAboutAction,
  saveBookingAction,
  saveSocialsAction,
  saveSiteAction,
} from "@/app/admin/actions";
import type { SaveState } from "@/app/admin/form-state";
import {
  SOCIAL_LABELS,
  type SiteContent,
  type SocialLabel,
  type SocialLink,
} from "@/lib/content-types";
import {
  Field,
  TextArea,
  inputClass,
  labelClass,
  SubmitButton,
  FormResult,
} from "@/app/admin/_components/ui";

function SectionCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-card/60 p-5 sm:p-6">
      <h2 className="font-display text-xl text-cream">{title}</h2>
      {desc && <p className="mt-1 mb-4 text-sm text-cream/50">{desc}</p>}
      <div className={desc ? "" : "mt-4"}>{children}</div>
    </section>
  );
}

function SaveBar({ state }: { state: SaveState }) {
  return (
    <div className="mt-4 flex items-center gap-4">
      <SubmitButton />
      <FormResult state={state} />
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────
export function HeroForm({ hero }: { hero: SiteContent["hero"] }) {
  const [state, action] = useActionState<SaveState, FormData>(saveHeroAction, {});
  return (
    <SectionCard
      title="כותרת ראשית (Hero)"
      desc="הטקסטים בראש העמוד — מעל ומתחת ללוגו, וכפתור ה-CTA."
    >
      <form action={action} className="flex flex-col gap-4">
        <Field
          label="שורת-על (מעל הלוגו)"
          name="eyebrow"
          defaultValue={hero.eyebrow}
          dir="ltr"
        />
        <TextArea
          label="טאגליין (מתחת ללוגו)"
          name="tagline"
          defaultValue={hero.tagline}
          rows={2}
          dir="ltr"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="טקסט הכפתור" name="ctaLabel" defaultValue={hero.ctaLabel} />
          <Field
            label="יעד הכפתור"
            name="ctaHref"
            defaultValue={hero.ctaHref}
            dir="ltr"
            hint="עוגן פנימי (#music) או קישור מלא"
          />
        </div>
        <SaveBar state={state} />
      </form>
    </SectionCard>
  );
}

// ── About ────────────────────────────────────────────────────────────────
export function AboutForm({ about }: { about: SiteContent["about"] }) {
  const [state, action] = useActionState<SaveState, FormData>(saveAboutAction, {});
  return (
    <SectionCard title="אודות" desc="2–3 משפטים + קרדיט ללייבל.">
      <form action={action} className="flex flex-col gap-4">
        <TextArea
          label="טקסט האודות"
          name="body"
          defaultValue={about.body}
          rows={4}
          dir="ltr"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field
            label="טקסט לפני הקישור"
            name="creditPrefix"
            defaultValue={about.creditPrefix}
            dir="ltr"
          />
          <Field
            label="שם הלייבל (הקישור)"
            name="creditLabel"
            defaultValue={about.creditLabel}
            dir="ltr"
          />
          <Field
            label="טקסט אחרי הקישור"
            name="creditSuffix"
            defaultValue={about.creditSuffix}
            dir="ltr"
          />
        </div>
        <Field
          label="כתובת הקישור של הלייבל"
          name="creditHref"
          defaultValue={about.creditHref}
          dir="ltr"
        />
        <SaveBar state={state} />
      </form>
    </SectionCard>
  );
}

// ── Booking ──────────────────────────────────────────────────────────────
export function BookingForm({ booking }: { booking: SiteContent["booking"] }) {
  const [state, action] = useActionState<SaveState, FormData>(
    saveBookingAction,
    {}
  );
  return (
    <SectionCard
      title="בוקינג"
      desc="המייל שהמפיקים מחפשים — מוצג גדול ובולט, עם כפתור העתקה."
    >
      <form action={action} className="flex flex-col gap-4">
        <Field
          label="כתובת מייל"
          name="email"
          type="email"
          defaultValue={booking.email}
          dir="ltr"
          required
        />
        <Field
          label="משפט הזמנה קצר"
          name="blurb"
          defaultValue={booking.blurb}
        />
        <SaveBar state={state} />
      </form>
    </SectionCard>
  );
}

// ── Site meta ────────────────────────────────────────────────────────────
export function MetaForm({ site }: { site: SiteContent["site"] }) {
  const [state, action] = useActionState<SaveState, FormData>(saveSiteAction, {});
  return (
    <SectionCard
      title="כותרת האתר (SEO)"
      desc="הכותרת והתיאור שמופיעים בלשונית הדפדפן ובתוצאות חיפוש."
    >
      <form action={action} className="flex flex-col gap-4">
        <Field label="כותרת (title)" name="title" defaultValue={site.title} />
        <TextArea
          label="תיאור (description)"
          name="description"
          defaultValue={site.description}
          rows={2}
        />
        <SaveBar state={state} />
      </form>
    </SectionCard>
  );
}

// ── Social links (מערך) ──────────────────────────────────────────────────
type SocialRow = SocialLink;

export function SocialsEditor({ socials }: { socials: SocialLink[] }) {
  const [rows, setRows] = useState<SocialRow[]>(socials);
  const [state, action] = useActionState<SaveState, FormData>(
    saveSocialsAction,
    {}
  );

  function update(id: string, patch: Partial<SocialRow>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  return (
    <SectionCard
      title="רשתות חברתיות"
      desc="האייקונים בפוטר. האייקון נקבע לפי שם הרשת."
    >
      <form action={action} className="flex flex-col gap-3">
        <input type="hidden" name="socials" value={JSON.stringify(rows)} />

        {rows.map((row) => (
          <div
            key={row.id}
            className="flex flex-col gap-2 rounded-xl border border-white/10 bg-night/40 p-3 sm:flex-row sm:items-end"
          >
            <label className="block sm:w-40">
              <span className={labelClass}>רשת</span>
              <select
                value={row.label}
                onChange={(e) =>
                  update(row.id, { label: e.target.value as SocialLabel })
                }
                className={inputClass}
              >
                {SOCIAL_LABELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
            <label className="block flex-1">
              <span className={labelClass}>קישור</span>
              <input
                value={row.href}
                onChange={(e) => update(row.id, { href: e.target.value })}
                placeholder="https://..."
                dir="ltr"
                className={inputClass}
              />
            </label>
            <button
              type="button"
              onClick={() => setRows((rs) => rs.filter((r) => r.id !== row.id))}
              aria-label="מחיקה"
              className="inline-flex h-10 items-center justify-center gap-1 rounded-lg px-3 text-xs font-bold text-destructive transition-colors hover:bg-destructive/15"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setRows((rs) => [
              ...rs,
              {
                id: `new-${Math.random().toString(36).slice(2, 9)}`,
                label: "Instagram",
                href: "",
              },
            ])
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-2.5 text-sm font-bold text-cream/70 transition-colors hover:border-gold/50 hover:text-gold"
        >
          <Plus className="size-4" /> הוספת רשת
        </button>

        <SaveBar state={state} />
      </form>
    </SectionCard>
  );
}
