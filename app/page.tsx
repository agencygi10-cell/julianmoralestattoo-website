"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import TrustStrip from "@/components/TrustStrip";
import { ARTIST } from "@/lib/site";

export default function Home() {
  return (
    <main className="relative">
      {/* ─────────────────────────────────────────────────────────
          HERO — single viewport, WHITE background. Typography on
          the left, autoplay video on the right inside a gold-rim
          phone-style frame. Subtle paper-grain texture overlay.
         ───────────────────────────────────────────────────────── */}
      <section className="relative bg-white text-brand-black overflow-hidden min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-20">
        {/* Subtle paper grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Soft gold radial accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(212, 175, 55, 0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 80%, rgba(212, 175, 55, 0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Typography */}
            <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="eyebrow inline-block"
              >
                ✦ Tattoo Artist · {ARTIST.location} ✦
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="mt-6 font-display text-5xl sm:text-7xl lg:text-[6.5rem] font-bold tracking-wide leading-[0.95]"
              >
                <span className="block text-brand-black">JULIÁN</span>
                <span className="block text-gold-gradient">MORALES</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mx-auto lg:mx-0 mt-7 h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent lg:from-brand-gold lg:via-brand-gold lg:to-transparent"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-7 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-brand-black/70 leading-relaxed"
              >
                Custom{" "}
                <span className="text-brand-black">
                  black &amp; gray realism
                </span>{" "}
                — portraits, religious imagery, and memorial pieces. Based in{" "}
                <span className="text-brand-black">{ARTIST.location}</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
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
                  className="inline-flex items-center gap-2 rounded-full border border-brand-black/25 bg-transparent text-brand-black/80 px-7 py-3.5 text-sm font-semibold transition-all hover:border-brand-black hover:text-brand-black"
                >
                  <Instagram size={16} />
                  View Instagram
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-10 text-xs uppercase tracking-[0.3em] text-brand-black/40"
              >
                By appointment only · English &amp; Español
              </motion.p>
            </div>

            {/* Video — vertical 720x1280 in gold-rim phone frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="lg:col-span-5 flex justify-center order-1 lg:order-2"
            >
              <PhoneFrame />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          BELOW HERO — black background. Trust strip + closing CTA.
         ───────────────────────────────────────────────────────── */}
      <TrustStrip />

      <section className="relative py-20 sm:py-28 bg-brand-black">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow mb-4">Next</div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-white">
              See the work,{" "}
              <span className="text-gold-gradient">read the story</span>,
              <br />
              book your piece.
            </h2>
            <p className="mt-6 text-white/60 text-base sm:text-lg leading-relaxed">
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
                className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
              >
                About the artist
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent text-white/80 px-7 py-3.5 text-sm font-semibold transition-all hover:border-white hover:text-white"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function PhoneFrame() {
  return (
    <div className="relative">
      {/* Glow halo */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(212, 175, 55, 0.35) 0%, transparent 65%)",
        }}
      />

      {/* Outer gold rim */}
      <div
        className="relative mx-auto rounded-[2.4rem] p-[2px] shadow-gold-lg"
        style={{
          width: "min(300px, 78vw)",
          background:
            "linear-gradient(140deg, rgba(232, 201, 122, 0.95) 0%, rgba(168, 139, 44, 0.55) 50%, rgba(232, 201, 122, 0.95) 100%)",
        }}
      >
        <div className="relative overflow-hidden rounded-[2.3rem] bg-brand-black">
          <div className="relative aspect-[9/16] w-full">
            <video
              src="/videos/home.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Julián Morales — work showcase"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-brand-gold shadow-gold animate-shimmer"
      />
      <div
        aria-hidden
        className="absolute -bottom-2 -left-2 h-2 w-2 rounded-full bg-brand-gold-light/80 shadow-gold animate-shimmer"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
}
