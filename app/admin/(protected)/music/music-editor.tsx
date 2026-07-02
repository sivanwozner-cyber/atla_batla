"use client";

import { useActionState, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { saveMusicAction, type SaveState } from "@/app/admin/actions";
import type { EP } from "@/lib/content";
import {
  inputClass,
  labelClass,
  cardClass,
  TextArea,
  SubmitButton,
  FormResult,
} from "@/app/admin/_components/ui";

// שורה פנימית: כמו EP אבל עם הטראקים כטקסט (שורה לכל טראק) לעריכה נוחה.
type Row = { id: string; title: string; albumId: string; href: string; tracksText: string };

function toRow(ep: EP): Row {
  return {
    id: ep.id,
    title: ep.title,
    albumId: ep.albumId,
    href: ep.href,
    tracksText: ep.tracks.join("\n"),
  };
}

function emptyRow(): Row {
  return {
    id: `new-${Math.random().toString(36).slice(2, 9)}`,
    title: "",
    albumId: "",
    href: "",
    tracksText: "",
  };
}

export function MusicEditor({ intro, eps }: { intro: string; eps: EP[] }) {
  const [rows, setRows] = useState<Row[]>(eps.map(toRow));
  const [state, action] = useActionState<SaveState, FormData>(saveMusicAction, {});

  function update(id: string, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  const epsPayload = rows.map((r) => ({
    id: r.id,
    title: r.title,
    albumId: r.albumId,
    href: r.href,
    tracks: r.tracksText.split("\n"),
  }));

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="eps" value={JSON.stringify(epsPayload)} />

      <div className={cardClass}>
        <TextArea
          label="טקסט פתיחה למקטע המוזיקה"
          name="intro"
          defaultValue={intro}
          rows={3}
        />
      </div>

      {rows.map((row, i) => (
        <div key={row.id} className={cardClass}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-cream/50">אלבום {i + 1}</span>
            <button
              type="button"
              onClick={() => setRows((rs) => rs.filter((r) => r.id !== row.id))}
              aria-label="מחיקת אלבום"
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-destructive transition-colors hover:bg-destructive/15"
            >
              <Trash2 className="size-4" /> מחיקה
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>שם האלבום</span>
              <input
                value={row.title}
                onChange={(e) => update(row.id, { title: e.target.value })}
                placeholder="Smoke This EP"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Bandcamp Album ID</span>
              <input
                value={row.albumId}
                onChange={(e) => update(row.id, { albumId: e.target.value })}
                placeholder="2666857562"
                dir="ltr"
                className={inputClass}
              />
            </label>

            <label className="block sm:col-span-2">
              <span className={labelClass}>קישור לאלבום ב-Bandcamp</span>
              <input
                value={row.href}
                onChange={(e) => update(row.id, { href: e.target.value })}
                placeholder="https://randomrecords.bandcamp.com/album/..."
                dir="ltr"
                className={inputClass}
              />
            </label>

            <label className="block sm:col-span-2">
              <span className={labelClass}>רשימת טראקים (טראק בכל שורה)</span>
              <textarea
                value={row.tracksText}
                onChange={(e) => update(row.id, { tracksText: e.target.value })}
                rows={4}
                dir="ltr"
                placeholder={"Tripi Tipi\nBethoven's Virusss\nSmoke This"}
                className={`${inputClass} resize-y leading-relaxed`}
              />
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setRows((rs) => [...rs, emptyRow()])}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 px-4 py-3 text-sm font-bold text-cream/70 transition-colors hover:border-gold/50 hover:text-gold"
      >
        <Plus className="size-4" /> הוספת אלבום
      </button>

      <div className="sticky bottom-4 mt-2 flex items-center gap-4 rounded-2xl border border-white/10 bg-night/90 p-3 backdrop-blur">
        <SubmitButton>שמירת מוזיקה</SubmitButton>
        <FormResult state={state} />
      </div>
    </form>
  );
}
