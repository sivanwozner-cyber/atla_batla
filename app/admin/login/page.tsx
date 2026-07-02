import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "כניסת מנהל · Atla Batla",
  robots: { index: false, follow: false },
};

// עמוד ההתחברות — יושב מחוץ למעטפת המאובטחת (route group אחר), כדי שלא ייכנס
// ללולאת requireSession. proxy כבר מפנה מחובר מכאן ישר ל-/admin.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <main
      dir="rtl"
      className="flex min-h-svh flex-col items-center justify-center bg-night px-6 py-16"
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Image
            src="/generated/wordmark.png"
            alt="Atla Batla"
            width={2638}
            height={846}
            sizes="200px"
            className="h-10 w-auto"
            priority
          />
          <h1 className="text-lg font-bold text-cream">כניסה לניהול האתר</h1>
          <p className="text-sm text-cream/50">
            הזינו שם משתמש וסיסמה כדי לערוך את תוכן האתר.
          </p>
        </div>
        <LoginForm from={from} />
      </div>
    </main>
  );
}
