import { upcomingShows, type ShowEvent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { MapPin, Ticket } from "lucide-react";

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function UpcomingShows() {
  const shows = getUpcoming(events);
  // אם אין אירוע עתידי — הסקשן נעלם לגמרי (PRD §4.2), לא נשאר "אין הופעות" ריק.
  if (shows.length === 0) return null;

  return (
    <section id="shows" className="scroll-mt-14 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="wordmark text-4xl sm:text-5xl">Upcoming Shows</h2>
        </Reveal>
        <ul className="mt-8 flex flex-col gap-4">
          {shows.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.06}>
              <li
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border border-white/10 bg-card p-5 sm:flex-row sm:items-center sm:justify-between",
                  i === 0 && "glow-featured"
                )}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg text-gold">
                      {formatDate(e.date)}
                    </span>
                    {i === 0 && (
                      <span className="rounded-full bg-magenta px-2 py-0.5 text-xs font-bold text-night">
                        Next up
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1.5 text-cream/80">
                    <MapPin className="size-4 text-cyan" />
                    {e.venue}, {e.city}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cream/70">
                    {e.setType}
                  </span>
                  {e.ticketUrl && (
                    <a
                      href={e.ticketUrl}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-lime hover:text-gold"
                    >
                      <Ticket className="size-4" /> Tickets
                    </a>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
