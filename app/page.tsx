"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Instagram, Star } from "lucide-react";
import TrustStrip from "@/components/TrustStrip";
import { ARTIST } from "@/lib/site";

export default function Home() {
  return (
    <main className="relative bg-brand-black">
      <Hero />
      <Marquee />
      <Manifesto />
      <TrustStrip />
    </main>
  );
}

/* ─────────────────────────────────────────────
   HERO — dark editorial. Full-bleed image of the
   artist working, type overlaid on the left.
   ───────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yType = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-[100svh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Full-bleed background image of Julian at work */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <Image
          src="/about/julian-home.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center]"
        />
      </motion.div>

      {/* Mobile darken: stronger because photo is behind type */}
      <div className="absolute inset-0 bg-brand-black/65 lg:hidden" />

      {/* Desktop directional darken — heavy on left, fades to reveal photo on right */}
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.88) 30%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Top/bottom fade so the hero blends into the next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/35 via-transparent to-brand-black" />

      {/* Gold grid + radial accent + grain */}
      <div aria-hidden className="grid-bg absolute inset-0 opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(212, 175, 55, 0.16) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 10% 80%, rgba(212, 175, 55, 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <FloatingGoldDots />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          style={{ y: yType }}
          className="max-w-3xl text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow inline-flex items-center gap-2"
          >
            <span className="h-px w-8 bg-brand-gold/60" />
            Tattoo Artist · {ARTIST.location}
            <span className="h-px w-8 bg-brand-gold/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="display-mega mt-6 text-[3rem] sm:text-7xl lg:text-[8rem] xl:text-[9rem] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            <span className="block text-white">JULIAN</span>
            <span className="block text-gold-gradient">MORALES</span>
          </motion.h1>

          {/* Animated drawn line — separate element so it doesn't fight the text gradient */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
            className="mx-auto lg:mx-0 mt-7 h-[2px] w-40 sm:w-56 origin-left rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #E8C97A 0%, #D4AF37 60%, transparent 100%)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-7 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-white/80 leading-relaxed"
          >
            Custom{" "}
            <span className="text-white font-semibold">
              black &amp; gray realism
            </span>{" "}
            — portraits, religious imagery, and memorial pieces. Based in{" "}
            <span className="text-white">{ARTIST.location}</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/contact"
              className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold"
            >
              Book a Consultation
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href={ARTIST.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm text-white/85 px-7 py-3.5 text-sm font-semibold transition-all hover:border-brand-gold hover:text-white"
            >
              <Instagram size={16} />
              View Instagram
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 text-xs uppercase tracking-[0.3em] text-white/50"
          >
            By appointment only · English &amp; Español
          </motion.p>
        </motion.div>

        {/* Side stats — small editorial detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-8 text-xs uppercase tracking-[0.25em] text-white/55"
        >
          <span>{ARTIST.stats.yearsExperience} years</span>
          <span className="h-3 w-px bg-white/25" />
          <span>{ARTIST.stats.healedPieces} healed pieces</span>
          <span className="h-3 w-px bg-white/25" />
          <span>{ARTIST.social.instagramHandle}</span>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingGoldDots() {
  const dots = [
    { top: "12%", left: "8%", size: 4, delay: 0 },
    { top: "28%", left: "92%", size: 3, delay: 0.6 },
    { top: "72%", left: "4%", size: 5, delay: 1.1 },
    { top: "82%", left: "60%", size: 3, delay: 1.5 },
    { top: "40%", left: "55%", size: 2, delay: 2 },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-brand-gold shadow-gold"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: 3.5,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE BAND
   ───────────────────────────────────────────── */
function Marquee() {
  const items = [
    "Black & Gray Realism",
    "Portraits",
    "Religious Imagery",
    "Memorial Pieces",
    "By Appointment Only",
    "San José · California",
    "English & Español",
  ];
  // Duplicate for seamless loop
  const all = [...items, ...items];
  return (
    <section
      aria-hidden
      className="relative border-y border-brand-gold/20 bg-brand-ink/60 py-5"
    >
      <div className="marquee">
        <div className="marquee-track">
          {all.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-white/70 whitespace-nowrap"
            >
              {t}
              <Star size={12} className="text-brand-gold shrink-0" fill="currentColor" />
            </span>
          ))}
        </div>
        <div className="marquee-track" aria-hidden>
          {all.map((t, i) => (
            <span
              key={`b-${i}`}
              className="inline-flex items-center gap-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-white/70 whitespace-nowrap"
            >
              {t}
              <Star size={12} className="text-brand-gold shrink-0" fill="currentColor" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MANIFESTO — editorial pull-quote with parallax
   ───────────────────────────────────────────── */
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yQuote = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yBg = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background image — Julian at work, parallaxed */}
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src="/about/julian-working.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-100 grayscale"
          priority={false}
        />
      </motion.div>

      {/* Light dim + readable vignette so the text stays legible */}
      <div className="absolute inset-0 bg-brand-black/15" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />

      <motion.div
        style={{ y: yQuote }}
        className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="eyebrow mb-4">Next</div>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
          See the work,{" "}
          <span className="text-gold-gradient">read the story</span>,
          <br />
          book your piece.
        </h2>
        <p className="mt-6 text-white/75 text-base sm:text-lg leading-relaxed">
          Three steps. Start wherever feels right.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/portfolio"
            className="btn-gold group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
          >
            View Portfolio
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm text-white/85 px-7 py-3.5 text-sm font-semibold transition-all hover:border-white hover:text-white"
          >
            About the artist
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-brand-gold/60 bg-brand-gold/10 backdrop-blur-sm text-white px-7 py-3.5 text-sm font-semibold transition-all hover:border-brand-gold hover:bg-brand-gold/25"
          >
            Contact
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
