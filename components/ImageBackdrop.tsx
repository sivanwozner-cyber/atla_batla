// Psychedelic Background — ארטוורק Gemini לאמצע+תחתית העמוד (הסגנון ב-.pb-*
// ב-globals.css). שכבה מרותקת (fixed) מאחורי הכל: ה-Hero האטום מכסה אותה למעלה,
// הסקשנים השקופים חושפים אותה. דקורטיבית בלבד (aria-hidden), קומפוננטת שרת, בלי JS.
import Image from "next/image";

export function ImageBackdrop() {
  return (
    <div className="pb-backdrop" aria-hidden>
      <Image
        src="/generated/background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pb-img"
      />
      <div className="pb-scrim" />
      <div className="pb-top" />
    </div>
  );
}
