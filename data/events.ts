// data/events.ts — מודל אירועים (PRD §6)

export interface ShowEvent {
  id: string;
  date: string; // "YYYY-MM-DD"
  venue: string;
  city: string;
  ticketUrl?: string;
  setType: "Live" | "DJ Set" | "Hybrid";
}

// לוגיקה (Phase 3): לסנן date >= today, למיין עולה, להציג רק אם יש לפחות
// אירוע אחד, ואת הראשון לסמן כ-featured אוטומטית. כשהמערך ריק — הסקשן נעלם.
//
// מקור התאריך: פוסט פליייר ב-Instagram הרשמי (@atlabatla_suomi, 18.06.2026).
// המיקום המדויק לא פורסם ("in Israel"), וקישור הכרטוס (web.vibez.io) נמצא
// מאחורי login/JS ולא אומת ברמת ביטחון גבוהה — לכן ticketUrl הושמט בכוונה
// עד לאימות. להוסיף כשיפורסם venue/כרטוס רשמי.
export const events: ShowEvent[] = [
  {
    id: "back2mad-2026-09",
    date: "2026-09-12",
    venue: "Back2Mad — Time To SuomiSaundi",
    city: "Israel",
    setType: "Live",
  },
];
