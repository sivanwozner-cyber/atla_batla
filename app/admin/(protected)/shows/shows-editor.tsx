"use client";

import { useActionState, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { saveShowsAction, type SaveState } from "@/app/admin/actions";
import { SET_TYPES, type ShowEvent, type SetType } from "@/lib/content";
import {
  inputClass,
  labelClass,
  cardClass,
  SubmitButton,
  FormResult,
} from "@/app/admin/_components/ui";

type Row = ShowEvent;

function emptyRow(): Row {
  return {
    id: `new-${Math.random().toString(36).slice(2, 9)}`,
    date: "",
    venue: "",
    city: "",
    setType: "Live",
    ticketUrl: "",
  };
}

export function ShowsEditor({ initial }: { initial: ShowEvent[] }) {
  const [rows, setRows] = useState<Row[]>(
    initial.length ? initial.map((r) => ({ ticketUrl: "", ...r })) : []
  );
  const [state, action] = useActionState<SaveState, FormData>(
    saveShowsAction,
    {}
  );

  function update(id: string, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function remove(id: string) {
    setRows((rs) => rs.filter((r) => r.id !== id));
  }
  function add() {
    setRows((rs) => [...rs, emptyRow()]);
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="shows" value={JSON.stringify(rows)} />

      {rows.length === 0 && (
        <p className="rounded-2xl border border-dashed border-white/15 bg-card/40 p-6 text-center text-sm text-cream/50">
          אין הופעות. הוסיפו הופעה חדשה למטה.
        </p>
      )}

      {rows.map((row, i) => {
        const isPast = row.date !== "" && row.date < today;
        return (
          <div key={row.id} className={cardClass}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-cream/50">
                הופעה {i + 1}
                {isPast && (
                  <span className="ms-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-cream/50">
                    עבר — לא יוצג
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={() => remove(row.id)}
                aria-label="מחיקת הופעה"
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-destructive transition-colors hover:bg-destructive/15"
              >
                <Trash2 className="size-4" /> מחיקה
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>תאריך</span>
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) => update(row.id, { date: e.target.value })}
                  dir="ltr"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>סוג סט</span>
                <select
                  value={row.setType}
                  onChange={(e) =>
                    update(row.id, { setType: e.target.value as SetType })
                  }
                  className={inputClass}
                >
                  {SET_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className={labelClass}>מקום / אירוע</span>
                <input
                  value={row.venue}
                  onChange={(e) => update(row.id, { venue: e.target.value })}
                  placeholder="Back2Mad — Time To SuomiSaundi"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>עיר</span>
                <input
                  value={row.city}
                  onChange={(e) => update(row.id, { city: e.target.value })}
                  placeholder="Israel"
                  className={inputClass}
                />
              </label>

              <label className="block sm:col-span-2">
                <span className={labelClass}>קישור לכרטיסים (אופציונלי)</span>
                <input
                  value={row.ticketUrl ?? ""}
                  onChange={(e) => update(row.id, { ticketUrl: e.target.value })}
                  placeholder="https://..."
                  dir="ltr"
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 px-4 py-3 text-sm font-bold text-cream/70 transition-colors hover:border-gold/50 hover:text-gold"
      >
        <Plus className="size-4" /> הוספת הופעה
      </button>

      <div className="sticky bottom-4 mt-2 flex items-center gap-4 rounded-2xl border border-white/10 bg-night/90 p-3 backdrop-blur">
        <SubmitButton>שמירת הופעות</SubmitButton>
        <FormResult state={state} />
      </div>
    </form>
  );
}
