"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { ARTIST } from "@/lib/site";

/**
 * Portfolio — curated selection of best pieces. Selecting 6 of the
 * highest-resolution / strongest images for the showcase. Full archive
 * lives at /gallery.
 */
const FEATURED = [
  { src: "/portfolio/tattoo-01.webp", w: 1600, h: 2071, alt: "Christ portrait — black & gray realism", tag: "Religious" },
  { src: "/portfolio/tattoo-02.webp", w: 1600, h: 2071, alt: "Realism portrait piece", tag: "Portrait" },
  { src: "/portfolio/tattoo-03.webp", w: 1600, h: 2071, alt: "Religious imagery, black & gray", tag: "Religious" },
  { src: "/portfolio/tattoo-04.jpg",  w: 1080, h: 1440, alt: "Black & gray realism work", tag: "Realism" },
  { src: "/portfolio/tattoo-05.jpg",  w: 1080, h: 1440, alt: "Memorial portrait by Julián Morales", tag: "Memorial" },
  { src: "/portfolio/tattoo-07.jpeg", w: 473,  h: 809,  alt: "Religious figure tattoo", tag: "Religious" },
];

export default function Portfolio() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-4">Portfolio</div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight text-white">
            Selected <span className="text-gold-gradient">work</span>.
          </h1>
          <p className="mt-5 text-white/60 text-base sm:text-lg leading-relaxed">
            A curated selection of pieces I&apos;m proud of — the strongest
            examples of the realism I do every day. The full archive lives in
            the <Link href="/gallery" className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light">Gallery</Link>{" "}and on Instagram.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {FEATURED.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="group relative"
            >
              <div
                className="relative rounded-2xl p-[1px] transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(232, 201, 122, 0.4) 0%, rgba(168, 139, 44, 0.15) 50%, rgba(232, 201, 122, 0.4) 100%)",
                }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-brand-deep">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    {/* Bottom gradient */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                    />
                    {/* Tag pill */}
                    <div className="absolute left-3 bottom-3 rounded-full border border-brand-gold/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-widest text-brand-gold backdrop-blur-sm">
                      {p.tag}
                    </div>
                  </div>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/gallery"
            className="btn-gold group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
          >
            See full Gallery
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
      </div>
    </section>
  );
}
