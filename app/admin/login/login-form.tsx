"use client";

import { useActionState } from "react";
import { LogIn, Loader2 } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import type { LoginState } from "@/app/admin/form-state";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Field } from "@/app/admin/_components/ui";

export function LoginForm({ from }: { from?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    undefined
  );

  return (
    <form
      action={action}
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-card/60 p-6"
    >
      <input type="hidden" name="from" value={from ?? "/admin"} />

      <Field label="שם משתמש" name="username" required dir="ltr" />
      <Field label="סיסמה" name="password" type="password" required dir="ltr" />

      {state?.error && (
        <p className="text-sm font-bold text-destructive" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-1 h-11 gap-2 text-base"
        )}
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <LogIn className="size-4" />
        )}
        כניסה
      </button>
    </form>
  );
}
