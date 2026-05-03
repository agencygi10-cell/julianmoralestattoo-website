"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { ARTIST } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden flex items-center pt-28 pb-20 md:pt-36">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 grid-bg opacity-80" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(212, 175, 55, 0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 90%, rgba(212, 175, 55, 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="grain" aria-hidden />

      {/* Gold corner accents */}
      <div
        aria-hidden
        className="absolute top-32 left-0 h-24 w-px bg-gradient-to-b from-transparent via-brand-gold/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute top-32 right-0 h-24 w-px bg-gradient-to-b from-transparent via-brand-gold/40 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-6 inline-block"
          >
            ✦ Tattoo Artist · San Jose, CA ✦
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wide leading-[0.95]"
          >
            <span className="block text-brand-text">JULIÁN</span>
            <span className="block text-gold-gradient">MORALES</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-8 max-w-2xl text-base sm:text-lg text-brand-muted leading-relaxed"
          >
            Custom <span className="text-brand-cream">black &amp; gray realism</span> — portraits,
            religious imagery, and memorial pieces. Based at{" "}
            <span className="text-brand-cream">Premium Clan Tattoo Studio</span>, San Jose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold"
            >
              Book a Consultation
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={ARTIST.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
            >
              <Instagram size={16} />
              View Instagram
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 text-xs uppercase tracking-[0.3em] text-brand-dim"
          >
            By appointment only · English &amp; Español
          </motion.p>
        </div>
      </div>
    </section>
  );
}
