// Moving Objects — פרופים מצוירים (Gemini, בסגנון ה-Hero) שנעים על הרקע,
// לאמצע+תחתית בלבד. ה-sprites נוצרו דרך scripts/generate-art.mjs (על רקע שחור)
// ונחתכו לשקיפות ע"י scripts/cutout.mjs → public/generated/obj-*.png.
// השכבה absolute מאחורי התוכן (ב-page.tsx עטופה ב-wrapper אחרי ה-Hero).
// קומפוננטת שרת, דקורטיבית: aria-hidden. אנימציה ב-CSS (‎.mo-* ב-globals.css),
// מכבד prefers-reduced-motion. כוכבים + כוכב נופל נשארים CSS (קלים).

type Obj = {
  src: string;
  width: number;
  glow: "ufo" | "bus" | "mush";
  dir: "l" | "r"; // כיוון חציית המסך
  top?: string;
  bottom?: string;
  left?: string;
  dur: string;
  bob?: boolean;
};

// פיזור על פני כל אזור האמצע+תחתית (top ב-% של ה-wrapper הגבוה; bottom ל"קרקע").
const OBJECTS: Obj[] = [
  { src: "/generated/obj-ufo.png", width: 122, glow: "ufo", dir: "r", top: "3%", dur: "23s", bob: true },
  { src: "/generated/obj-bus.png", width: 184, glow: "bus", dir: "l", top: "30%", dur: "40s", bob: true },
  { src: "/generated/obj-ufo.png", width: 92, glow: "ufo", dir: "r", top: "58%", dur: "30s", bob: true },
  { src: "/generated/obj-mushroom.png", width: 54, glow: "mush", dir: "l", top: "20%", left: "5%" },
  { src: "/generated/obj-mushroom.png", width: 44, glow: "mush", dir: "l", top: "47%", left: "88%" },
  { src: "/generated/obj-mushroom.png", width: 60, glow: "mush", dir: "l", bottom: "14px", left: "8%" },
  { src: "/generated/obj-mushroom.png", width: 40, glow: "mush", dir: "l", bottom: "10px", left: "82%" },
];

export function MovingObjects() {
  return (
    <div className="mo-layer" aria-hidden>
      <div className="mo-stars" />
      <div className="mo-shoot" style={{ top: "4%" }} />

      {OBJECTS.map((o, i) => {
        // פטריות (בלי dur) = מרחפות במקום; אחרות = חוצות את המסך.
        const moving = o.dir === "r" ? "mo-cross" : "mo-crossR";
        const isMover = !!o.dur;
        const wrapCls = `${isMover ? moving : "mo-mush"} mo-${o.glow}`;
        const img = (
          <img
            className="mo-img"
            src={o.src}
            alt=""
            draggable={false}
            style={{ width: o.width }}
          />
        );
        return (
          <div
            key={i}
            className={wrapCls}
            style={{
              top: o.top,
              bottom: o.bottom,
              left: o.left,
              width: o.width,
              animationDuration: o.dur,
            }}
          >
            {isMover && o.bob ? <div className="mo-bob">{img}</div> : img}
          </div>
        );
      })}
    </div>
  );
}
