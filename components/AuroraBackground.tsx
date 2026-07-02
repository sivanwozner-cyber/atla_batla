// Aurora Drift — רקע פסיכדלי-מדברי גלובלי (הסגנון ב-.aurora ב-globals.css).
// שכבת fixed אחת מתחת לכל התוכן: ה-Hero האטום מכסה אותה, והסקשנים
// האמצעיים/תחתונים (Shows/Music/About/Booking/Footer) חושפים אותה.
// קומפוננטת שרת, דקורטיבית בלבד — aria-hidden, בלי JS (האנימציה כולה CSS).
export function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden>
      <div className="aurora-stars" />
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
    </div>
  );
}
