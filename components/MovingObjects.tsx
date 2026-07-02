// Moving Objects (בחירת המשתמשת: SVG מצויר) — סצנה מונפשת לאמצע+תחתית בלבד.
// אובייקטים על-מותגיים שנעים על הרקע: צלחת מעופפת, אוטובוס-מפלצת, פטריות זוהרות,
// כוכב נופל וכוכבים מנצנצים. השכבה ממוקמת absolute מאחורי התוכן — ב-page.tsx היא
// עטופה ב-wrapper אחרי ה-Hero, כך שהיא חלה רק על אמצע+תחתית (ה-Hero לא מושפע).
// קומפוננטת שרת, דקורטיבית: aria-hidden, בלי JS. כל האנימציה ב-CSS (‎.mo-* ב-globals.css)
// ומכבדת prefers-reduced-motion.

// צלחת מעופפת. uid נדרש כדי שמזהי הגרדיאנט יהיו ייחודיים כשהיא מרונדרת כמה פעמים.
function Ufo({ uid }: { uid: string }) {
  return (
    <svg width="78" height="66" viewBox="0 0 78 66">
      <defs>
        <linearGradient id={`mo-ub-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ffff0" />
          <stop offset="1" stopColor="#2bb6d6" />
        </linearGradient>
        <linearGradient id={`mo-bm-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#44eeff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#44eeff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon className="mo-beam" points="39,32 22,64 56,64" fill={`url(#mo-bm-${uid})`} />
      <ellipse cx="39" cy="31" rx="31" ry="9" fill={`url(#mo-ub-${uid})`} stroke="#0b0420" strokeWidth="1.6" />
      <ellipse cx="39" cy="22" rx="15" ry="12" fill="#c7f8ff" stroke="#0b0420" strokeWidth="1.6" />
      <circle cx="20" cy="32" r="2.6" fill="#ff44aa" />
      <circle cx="31" cy="35" r="2.6" fill="#ffe44a" />
      <circle cx="47" cy="35" r="2.6" fill="#44ff88" />
      <circle cx="58" cy="32" r="2.6" fill="#ff9500" />
    </svg>
  );
}

// אוטובוס-מפלצת — עיניים גדולות, חיוך שיניים, כובע קונוס קשת ורמקולים על הגג.
function Bus() {
  return (
    <svg width="140" height="92" viewBox="0 0 140 92">
      <defs>
        <linearGradient id="mo-bd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb43a" />
          <stop offset="1" stopColor="#ff44aa" />
        </linearGradient>
        <linearGradient id="mo-rb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff4444" />
          <stop offset="0.35" stopColor="#ffe44a" />
          <stop offset="0.7" stopColor="#44ff88" />
          <stop offset="1" stopColor="#44eeff" />
        </linearGradient>
      </defs>
      <polygon points="30,20 40,-2 50,20" fill="url(#mo-rb)" stroke="#0b0420" strokeWidth="1.5" />
      <circle cx="64" cy="16" r="5" fill="#7a2bd6" stroke="#0b0420" strokeWidth="1.5" />
      <circle cx="80" cy="15" r="5" fill="#ff9500" stroke="#0b0420" strokeWidth="1.5" />
      <rect x="8" y="20" width="124" height="52" rx="16" fill="url(#mo-bd)" stroke="#0b0420" strokeWidth="2" />
      <circle cx="46" cy="40" r="13" fill="#fff" stroke="#0b0420" strokeWidth="2" />
      <circle cx="46" cy="41" r="6" fill="#44eeff" />
      <circle cx="46" cy="41" r="2.6" fill="#0b0420" />
      <circle cx="86" cy="40" r="13" fill="#fff" stroke="#0b0420" strokeWidth="2" />
      <circle cx="86" cy="41" r="6" fill="#ff44aa" />
      <circle cx="86" cy="41" r="2.6" fill="#0b0420" />
      <path d="M34 58 Q66 82 98 58 Z" fill="#3a0b2a" stroke="#0b0420" strokeWidth="2" />
      <polygon points="40,60 47,71 54,60 61,72 68,60 75,72 82,60 89,70 94,60" fill="#fff" />
      <circle cx="70" cy="30" r="3" fill="#44ff88" />
      <circle cx="24" cy="34" r="3" fill="#ffe44a" />
      <circle cx="112" cy="34" r="3" fill="#44eeff" />
      <circle cx="40" cy="76" r="11" fill="#1b0b1f" stroke="#0b0420" strokeWidth="2" />
      <circle cx="40" cy="76" r="4" fill="#ff9500" />
      <circle cx="98" cy="76" r="11" fill="#1b0b1f" stroke="#0b0420" strokeWidth="2" />
      <circle cx="98" cy="76" r="4" fill="#ff9500" />
    </svg>
  );
}

// פטרייה זוהרת — צבע הכובע פרמטרי.
function Mushroom({ color }: { color: string }) {
  return (
    <svg width="30" height="40" viewBox="0 0 30 40">
      <rect x="11" y="17" width="8" height="20" rx="4" fill="#fdf6e3" stroke="#0b0420" strokeWidth="1.4" />
      <path d="M2 18 Q15 -3 28 18 Z" fill={color} stroke="#0b0420" strokeWidth="1.6" />
      <circle cx="11" cy="11" r="2" fill="#fff" />
      <circle cx="19" cy="9" r="2" fill="#fff" />
      <circle cx="16" cy="15" r="1.6" fill="#ffe44a" />
    </svg>
  );
}

export function MovingObjects() {
  return (
    <div className="mo-layer" aria-hidden>
      <div className="mo-stars" />
      <div className="mo-shoot" style={{ top: "4%" }} />

      {/* צלחת עליונה חוצה שמאל→ימין */}
      <div className="mo-cross mo-ufo" style={{ top: "5%", animationDuration: "20s" }}>
        <div className="mo-bob">
          <Ufo uid="a" />
        </div>
      </div>

      {/* אוטובוס חוצה ימין→שמאל, איטי יותר (parallax) */}
      <div className="mo-crossR mo-bus" style={{ top: "35%", animationDuration: "34s" }}>
        <div className="mo-bob">
          <Bus />
        </div>
      </div>

      {/* צלחת שנייה, נמוך יותר */}
      <div className="mo-cross mo-ufo" style={{ top: "62%", animationDuration: "26s" }}>
        <div className="mo-bob">
          <Ufo uid="b" />
        </div>
      </div>

      {/* פטריות מרחפות, מפוזרות (שתיים בבסיס התחתון) */}
      <div className="mo-mush" style={{ top: "24%", left: "6%" }}>
        <Mushroom color="#ff44aa" />
      </div>
      <div className="mo-mush" style={{ top: "50%", left: "88%" }}>
        <Mushroom color="#44eeff" />
      </div>
      <div className="mo-mush" style={{ bottom: "16px", left: "9%" }}>
        <Mushroom color="#44ff88" />
      </div>
      <div className="mo-mush" style={{ bottom: "10px", left: "83%" }}>
        <Mushroom color="#ffe44a" />
      </div>
    </div>
  );
}
