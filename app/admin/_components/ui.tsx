"use client";

// app/admin/_components/ui.tsx — פרימיטיבים משותפים לטפסי האדמין.
// תיקיית _components (עם קו תחתון) לא הופכת ל-route.

import { useFormStatus } from "react-dom";
import { Check, Loader2, Save } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SaveState } from "@/app/admin/actions";

export const inputClass =
  "w-full rounded-lg border border-white/15 bg-night/50 px-3 py-2 text-sm text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-gold/60 focus:ring-2 focus:ring-gold/20";

export const labelClass = "mb-1.5 block text-sm font-bold text-cream/80";

export const cardClass =
  "rounded-2xl border border-white/10 bg-card/60 p-5 sm:p-6";

export function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
  dir,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
  hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="text-magenta"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        dir={dir}
        className={inputClass}
      />
      {hint && <span className="mt-1 block text-xs text-cream/40">{hint}</span>}
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
  dir,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  dir?: "ltr" | "rtl";
  hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        dir={dir}
        className={cn(inputClass, "resize-y leading-relaxed")}
      />
      {hint && <span className="mt-1 block text-xs text-cream/40">{hint}</span>}
    </label>
  );
}

export function SubmitButton({
  children = "שמירה",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(buttonVariants({ size: "lg" }), "h-10 gap-2 px-5", className)}
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Save className="size-4" />
      )}
      {children}
    </button>
  );
}

export function FormResult({ state }: { state: SaveState }) {
  if (state?.error) {
    return (
      <p className="text-sm font-bold text-destructive" role="alert">
        {state.error}
      </p>
    );
  }
  if (state?.ok) {
    return (
      <p className="flex items-center gap-1.5 text-sm font-bold text-lime">
        <Check className="size-4" /> נשמר
      </p>
    );
  }
  return null;
}
