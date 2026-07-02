import { Reveal } from "@/components/Reveal";

// PRD §4.4 — 2–3 משפטים בלבד (placeholder), בלי קרדיט Random Records.
export function About() {
  return (
    <section id="about" className="scroll-mt-14 px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="wordmark text-4xl sm:text-5xl">About</h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/80">
            From the blazing deserts to the global underground, Atla Batla
            delivers a wild blend of pure Suomisoundi madness and deep
            psychedelic energy — funky leads, driving basslines, and that
            unmistakable Finnish-inspired groove with a dusty desert twist.
          </p>
          <p className="mt-4 text-sm text-cream/50">
            Released on{" "}
            <a
              href="https://randomrecords.bandcamp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan transition-colors hover:text-gold"
            >
              Random Records
            </a>{" "}
            — a non-profit label supporting indigenous communities.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
