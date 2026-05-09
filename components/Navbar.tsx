"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-black/85 backdrop-blur-md border-b border-brand-gold/15"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Julián Morales — Home">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-sm transition-colors ${
                isActive(l.href)
                  ? "text-brand-gold"
                  : "text-white/80 hover:text-brand-gold"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 right-0 mx-auto h-px w-6 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
                />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-gold rounded-full px-5 py-2 text-sm font-semibold"
          >
            Book a Consultation
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-brand-gold/15 bg-brand-black/95 backdrop-blur-md">
          <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-3 text-sm transition-colors ${
                  isActive(l.href)
                    ? "bg-brand-gold/10 text-brand-gold"
                    : "text-white/90 hover:bg-brand-gold/10 hover:text-brand-gold"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-gold mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
