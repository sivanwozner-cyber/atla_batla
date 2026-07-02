import type { IconType } from "react-icons";
import {
  FaInstagram,
  FaFacebookF,
  FaBandcamp,
  FaSoundcloud,
} from "react-icons/fa6";

// PRD §4.6 — אייקוני רשתות (react-icons/fa6) + קרדיט קצר. קישורים אמיתיים,
// אומתו ע"י סריקת העמודים (הלהקה מהנגב — לא namesakes).
const SOCIALS: { icon: IconType; label: string; href: string }[] = [
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/atlabatla_suomi/" },
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/people/Atla-Batla-suomi/61578955019841/",
  },
  { icon: FaBandcamp, label: "Bandcamp", href: "https://atlabatla.bandcamp.com" },
  { icon: FaSoundcloud, label: "SoundCloud", href: "https://soundcloud.com/atla-batla" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
        <div className="flex gap-3">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-11 items-center justify-center rounded-full border border-white/10 text-cream/80 transition-colors hover:border-gold hover:text-gold"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-cream/40">
          © {new Date().getFullYear()} Atla Batla · Negev underground · Random
          Records
        </p>
      </div>
    </footer>
  );
}
