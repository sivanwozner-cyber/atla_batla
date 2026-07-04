// Psychedelic Desert Sunset — שכבת הרקע לאמצע+תחתית העמוד (הסגנון ב-.pb-* ב-globals.css).
// מוצב בתוך .pb-region ב-app/page.tsx, מתחת לסקשנים ומעל בסיס הלילה. דקורטיבי בלבד
// (aria-hidden), קומפוננטת שרת, בלי JS — כל הסגנון/אנימציה CSS (מכבד reduced-motion).
export function PsychedelicBackground() {
  return (
    <div className="pb-backdrop" aria-hidden>
      <div className="pb-sky" />
      <div className="pb-stars" />
      <div className="pb-sun" />
      <div className="pb-rays" />
      <div className="pb-blob pb-blob-1" />
      <div className="pb-blob pb-blob-2" />
      <div className="pb-blob pb-blob-3" />
      <div className="pb-vignette" />
    </div>
  );
}
