"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-brand-text/80 transition-colors hover:text-brand-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-gold rounded-full px-5 py-2 text-sm font-semibold"
          >
            Book a Consultation
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          className="md:hidden text-brand-text"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-brand-gold/15 bg-brand-black/95 backdrop-blur-md">
          <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-brand-text/90 transition-colors hover:bg-brand-gold/10 hover:text-brand-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-gold mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
