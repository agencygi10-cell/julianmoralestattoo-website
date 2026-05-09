"use client";

import { motion } from "framer-motion";

/**
 * Showreel-style video block. The vertical 720x1280 home.mp4 is shown
 * inside an elegant phone-style gold-rimmed frame, autoplaying on loop.
 */
export default function VideoShowcase() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-brand-gold/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="eyebrow mb-4">In motion</div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-white">
              See me <span className="text-gold-gradient">at work</span>.
            </h2>
            <p className="mt-5 text-white/60 text-base sm:text-lg leading-relaxed max-w-xl">
              A short clip from a recent session. Realism is patience —
              every shade you see was placed with intention. There&apos;s no
              shortcut to a piece that ages well.
            </p>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xl">
              For more clips, full sessions, and healed work check my{" "}
              <a
                href="https://www.instagram.com/julianmoralest_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
              >
                Instagram
              </a>{" "}
              and{" "}
              <a
                href="https://www.tiktok.com/@julianmoralestattoo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
              >
                TikTok
              </a>
              .
            </p>
          </motion.div>

          {/* Right: vertical video in phone frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 flex justify-center"
          >
            <PhoneFrame />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PhoneFrame() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(212, 175, 55, 0.35) 0%, transparent 65%)",
        }}
      />

      <div
        className="relative mx-auto rounded-[2.4rem] p-[2px] shadow-gold-lg"
        style={{
          width: "min(280px, 75vw)",
          background:
            "linear-gradient(140deg, rgba(232, 201, 122, 0.9) 0%, rgba(168, 139, 44, 0.5) 50%, rgba(232, 201, 122, 0.9) 100%)",
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
              aria-label="Julian Morales tattoo work showcase"
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
