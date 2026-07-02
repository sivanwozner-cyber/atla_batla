// app/admin/form-state.ts — טיפוסי המצב שמוחזרים מה-Server Actions.
// מופרד מ-actions.ts כי קובץ "use server" אמור לייצא רק פונקציות async.

export type LoginState = { error?: string } | undefined;
export type SaveState = { ok?: boolean; error?: string; savedAt?: number };
