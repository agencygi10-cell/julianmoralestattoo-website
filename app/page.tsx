"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import TattooMachine from "@/components/TattooMachine";
import TrustStrip from "@/components/TrustStrip";
import { ARTIST } from "@/lib/site";

export default function Home() {
  // The hero container is 250vh tall. As the user scrolls through it, the
  // sticky panel inside pins to the viewport while scrollYProgress goes
  // 0 → 1 — driving every machine part's disassembly transform.
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Typography fades slightly as you scroll into the machine animation,
  // so the disassembled parts have visual breathing room.
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.4]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="relative bg-white text-brand-black">
      {/* ── Paper texture overlay (subtle) ──────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ─────────────────────────────────────────────────────────
          HERO SECTION — 250vh tall, machine pinned, disassembles
          on scroll. Inside: split layout (typography left, machine
          right), wrapped in a sticky pinned panel.
         ───────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Typography */}
              <motion.div
                style={{ opacity: headlineOpacity }}
                className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1"
              >
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
                  className="mt-10 text-xs uppercase tracking-[0.3em] text-brand-black/40"
                >
                  By appointment only · English &amp; Español
                </motion.p>
              </motion.div>

              {/* Machine — scroll-driven disassembly */}
              <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[400px]">
                  {/* Soft gold halo behind machine */}
                  <div
                    aria-hidden
                    className="absolute inset-0 -m-8 rounded-full blur-3xl opacity-60"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <TattooMachine progress={scrollYProgress} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll-down hint */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-black/40">
              Scroll to disassemble
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-6 w-px bg-gradient-to-b from-brand-gold to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          BELOW HERO — trust strip + closing CTA, still on white
         ───────────────────────────────────────────────────────── */}
      <TrustStrip light />

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow mb-4">Next</div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-brand-black">
              A tattoo machine is{" "}
              <span className="text-gold-gradient">just a tool</span>.
              <br />
              The art is in the hands that hold it.
            </h2>
            <p className="mt-6 text-brand-black/60 text-base sm:text-lg leading-relaxed">
              See the work, the story behind it, and how to book your piece.
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
                className="inline-flex items-center gap-2 rounded-full border border-brand-black/20 bg-transparent text-brand-black/80 px-7 py-3.5 text-sm font-semibold transition-all hover:border-brand-black hover:text-brand-black"
              >
                About the artist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
