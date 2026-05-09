"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { ARTIST } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-28 pb-12 lg:pt-36 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT — typography */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="eyebrow inline-block"
            >
              ✦ Tattoo Artist · San Jose, CA ✦
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-6 font-display text-5xl sm:text-7xl lg:text-[6.5rem] font-bold tracking-wide leading-[0.95]"
            >
              <span className="block text-white">JULIÁN</span>
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
              className="mt-7 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-white/70 leading-relaxed"
            >
              Custom <span className="text-white">black &amp; gray realism</span> —
              portraits, religious imagery, and memorial pieces. Based at{" "}
              <span className="text-white">Premium Clan Tattoo Studio</span>, San Jose.
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
              className="mt-10 text-xs uppercase tracking-[0.3em] text-white/40"
            >
              By appointment only · English &amp; Español
            </motion.p>
          </div>

          {/* RIGHT — featured tattoo piece (Christ portrait) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
          >
            <FeaturedFrame />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturedFrame() {
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
        className="relative mx-auto rounded-2xl p-[1.5px] shadow-gold-lg"
        style={{
          width: "min(360px, 80vw)",
          background:
            "linear-gradient(140deg, rgba(232, 201, 122, 0.9) 0%, rgba(168, 139, 44, 0.5) 50%, rgba(232, 201, 122, 0.9) 100%)",
        }}
      >
        {/* Inner frame */}
        <div className="relative overflow-hidden rounded-2xl bg-brand-black">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/portfolio/tattoo-01.webp"
              alt="Black & gray realism tattoo by Julián Morales — Christ portrait"
              fill
              priority
              sizes="(min-width: 1024px) 360px, 80vw"
              className="object-cover"
            />
            {/* Subtle bottom gradient for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
            />

            {/* Caption pill */}
            <div className="absolute left-3 bottom-3 rounded-full border border-brand-gold/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-widest text-brand-gold backdrop-blur-sm">
              Featured Work
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative gold dots */}
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
