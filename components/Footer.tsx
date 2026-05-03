import Link from "next/link";
import { Instagram } from "lucide-react";
import Logo from "./Logo";
import { ARTIST, FULL_ADDRESS } from "@/lib/site";

const TIKTOK_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const NAV = [
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-brand-gold/15 bg-brand-deep/60 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm text-brand-muted leading-relaxed">
              Black &amp; gray realism tattoo artist. Custom portraits,
              religious imagery, and memorial pieces. By appointment only —
              English &amp; Español.
            </p>
            <div className="mt-5 text-sm text-brand-muted">
              <div className="text-brand-cream">{ARTIST.studio.name}</div>
              <div>{FULL_ADDRESS}</div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest text-brand-gold mb-4">
              Navigate
            </div>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-brand-muted transition-colors hover:text-brand-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-widest text-brand-gold mb-4">
              Contact
            </div>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <a
                  href={`mailto:${ARTIST.email}`}
                  className="transition-colors hover:text-brand-gold break-all"
                >
                  {ARTIST.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${ARTIST.phoneRaw}`}
                  className="transition-colors hover:text-brand-gold"
                >
                  {ARTIST.phone}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={ARTIST.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold transition-all hover:border-brand-gold hover:bg-brand-gold/10"
              >
                <Instagram size={18} />
              </a>
              <a
                href={ARTIST.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold transition-all hover:border-brand-gold hover:bg-brand-gold/10"
              >
                {TIKTOK_ICON}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-gold/10 pt-6 sm:flex-row">
          <p className="text-xs text-brand-dim">
            © {year} {ARTIST.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs">
            <Link
              href="/privacy"
              className="text-brand-muted transition-colors hover:text-brand-gold"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-brand-muted transition-colors hover:text-brand-gold"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
