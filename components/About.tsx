import { Reveal } from "@/components/Reveal";
import { getYouTubeEmbedUrl } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

// PRD §4.4 — 2–3 משפטים + קרדיט ללייבל. התוכן נטען מה-store (נערך ב-/admin/site).
export function About({ about }: { about: SiteContent["about"] }) {
  const videoEmbedUrl = getYouTubeEmbedUrl(about.videoUrl);

  return (
    <section id="about" className="scroll-mt-14 px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="wordmark text-4xl sm:text-5xl">About</h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/80">
            {about.body}
          </p>

          {videoEmbedUrl && (
            <div className="mx-auto mt-8 aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-card">
              <iframe
                title="Atla Batla — video"
                src={videoEmbedUrl}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}

          {about.creditLabel && (
            <p className="mt-4 text-sm text-cream/50">
              {about.creditPrefix}
              <a
                href={about.creditHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan transition-colors hover:text-gold"
              >
                {about.creditLabel}
              </a>
              {about.creditSuffix}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
