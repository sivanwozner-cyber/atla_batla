import { Reveal } from "@/components/Reveal";
import type { SiteContent } from "@/lib/content";

// PRD §4.4 — 2–3 משפטים + קרדיט ללייבל. התוכן נטען מה-store (נערך ב-/admin/site).
export function About({ about }: { about: SiteContent["about"] }) {
  return (
    <section id="about" className="scroll-mt-14 px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="wordmark text-4xl sm:text-5xl">About</h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/80">
            {about.body}
          </p>
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
