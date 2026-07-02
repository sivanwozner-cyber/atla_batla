import type { Metadata } from "next";
import { Rubik, Bungee, Geist_Mono } from "next/font/google";
import "./globals.css";

// Rubik — פונט ה-UI הראשי (PRD §5): תמיכת עברית מצוינת, אופי עגול-משחקי.
// variable: "--font-sans" כדי שיזרום אל token ה-font-sans של shadcn ב-globals.css.
const rubik = Rubik({
  variable: "--font-sans",
  subsets: ["latin", "hebrew"],
  display: "swap",
});

// Bungee — פונט ה-wordmark/display ל-"ATLA BATLA". צורת בלוקים מרובעים-זוויתיים
// (all-caps) שמשחזרת את ה-shape של לוגו Power Rangers (לבקשת המשתמשת) — הצבעים
// (גרדיאנט + קו מתאר) נשארים כמו שהם ב-.wordmark ב-globals.css.
const bungee = Bungee({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atla Batla",
  description:
    "Atla Batla — from the blazing deserts of the Negev to the global underground. (placeholder)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${rubik.variable} ${bungee.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
