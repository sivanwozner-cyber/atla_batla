import type { IconType } from "react-icons";
import {
  FaInstagram,
  FaFacebookF,
  FaBandcamp,
  FaSoundcloud,
} from "react-icons/fa6";
import type { SiteContent, SocialLabel } from "@/lib/content";

// PRD §4.6 — אייקוני רשתות (react-icons/fa6) + קרדיט קצר. הרשתות נטענות מה-store
// (נערכות ב-/admin/site); האייקון נגזר משם הרשת דרך המפה הזו.
const ICONS: Record<SocialLabel, IconType> = {
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  Bandcamp: FaBandcamp,
  SoundCloud: FaSoundcloud,
};

export function SiteFooter({ socials }: { socials: SiteContent["socials"] }) {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
        <div className="flex gap-3">
          {socials.map(({ id, label, href }) => {
            const Icon = ICONS[label] ?? FaInstagram;
            return (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-11 items-center justify-center rounded-full border border-white/10 text-cream/80 transition-colors hover:border-gold hover:text-gold"
            >
              <Icon className="size-5" />
            </a>
            );
          })}
        </div>
        <p className="text-center text-xs text-cream/40">
          © {new Date().getFullYear()} Atla Batla · Negev underground · Random
          Records
        </p>
      </div>
    </footer>
  );
}
