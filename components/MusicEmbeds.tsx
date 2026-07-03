import { Reveal } from "@/components/Reveal";
import { FaBandcamp } from "react-icons/fa6";
import type { SiteContent } from "@/lib/content";

// PRD §4.3 — EPs ב-Bandcamp (Random Records). התוכן נטען מה-store (נערך ב-/admin/music).
// שמות הטראקים נשמרים בדיוק כפי שהם, כולל שגיאות כתיב מכוונות — אסור "לתקן".
// הוסר: פסקת ה-intro ("שני EPs ב-Bandcamp...") — טקסט placeholder לא רלוונטי.
export function MusicEmbeds({ music }: { music: SiteContent["music"] }) {
  return (
    <section id="music" className="scroll-mt-14 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="wordmark text-4xl sm:text-5xl">Music</h2>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {music.eps.map((ep, i) => (
            <Reveal key={ep.id} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-card p-4">
                <iframe
                  title={`${ep.title} — Atla Batla on Bandcamp`}
                  className="aspect-square w-full rounded-xl border-0"
                  src={`https://bandcamp.com/EmbeddedPlayer/album=${ep.albumId}/size=large/bgcol=181a1f/linkcol=e0a343/artwork=small/transparent=true/`}
                  seamless
                  loading="lazy"
                >
                  <a href={ep.href}>
                    {ep.title} by Atla Batla
                  </a>
                </iframe>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="font-display text-xl">{ep.title}</h3>
                  <a
                    href={ep.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-cyan transition-colors hover:text-gold"
                  >
                    <FaBandcamp /> Bandcamp
                  </a>
                </div>
                <ol className="mt-3 space-y-1 text-sm text-cream/60">
                  {ep.tracks.map((track, t) => (
                    <li key={track} className="flex gap-2">
                      <span className="text-cream/30 tabular-nums">
                        {String(t + 1).padStart(2, "0")}
                      </span>
                      {track}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
