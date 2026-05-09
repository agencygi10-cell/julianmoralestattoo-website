"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { ARTIST } from "@/lib/site";

/**
 * Gallery — full archive in masonry layout. CSS columns preserve each
 * image's natural aspect ratio (no distortion, no forced cropping).
 *
 * To add new pieces:
 *   1. Drop the file in /public/portfolio/ (or /public/gallery/)
 *   2. Append an entry to ITEMS below with src + width + height + alt
 *   3. For videos use { type: "video", src, w, h, alt }
 */
type ImageItem = {
  type?: "image";
  src: string;
  w: number;
  h: number;
  alt: string;
};
type VideoItem = {
  type: "video";
  src: string;
  w: number;
  h: number;
  alt: string;
};
type Item = ImageItem | VideoItem;

const ITEMS: Item[] = [
  { src: "/portfolio/tattoo-01.webp", w: 1600, h: 2071, alt: "Christ portrait — black & gray realism" },
  { src: "/portfolio/tattoo-02.webp", w: 1600, h: 2071, alt: "Realism portrait by Julián Morales" },
  { src: "/portfolio/tattoo-03.webp", w: 1600, h: 2071, alt: "Religious imagery, black & gray" },
  { src: "/portfolio/tattoo-04.jpg",  w: 1080, h: 1440, alt: "Black & gray realism work" },
  { src: "/portfolio/tattoo-05.jpg",  w: 1080, h: 1440, alt: "Memorial portrait by Julián Morales" },
  { src: "/portfolio/tattoo-06.jpeg", w: 384,  h: 699,  alt: "Realism detail by Julián Morales" },
  { src: "/portfolio/tattoo-07.jpeg", w: 473,  h: 809,  alt: "Religious figure tattoo" },
  { src: "/portfolio/tattoo-08.jpeg", w: 388,  h: 642,  alt: "Portrait piece" },
  { src: "/portfolio/tattoo-09.jpeg", w: 327,  h: 771,  alt: "Black & gray sleeve detail" },
  // New pieces — append below as files arrive in /public/portfolio/
];

export default function Gallery() {
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
          <div className="eyebrow mb-4">Gallery</div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight text-white">
            The full <span className="text-gold-gradient">archive</span>.
          </h1>
          <p className="mt-5 text-white/60 text-base sm:text-lg leading-relaxed">
            Every piece I&apos;ve documented — fresh and healed. Each tattoo
            here was a months-long conversation with a client about something
            that mattered.
          </p>
        </motion.div>

        {/* Masonry — preserves natural aspect ratios, no distortion */}
        <div className="mt-12 columns-2 md:columns-3 gap-3 sm:gap-4 [column-fill:balance]">
          {ITEMS.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.06 }}
              className="group relative mb-3 sm:mb-4 break-inside-avoid overflow-hidden rounded-xl border border-brand-gold/15 bg-brand-deep"
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={item.alt}
                  width={item.w}
                  height={item.h}
                  className="block h-auto w-full"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.w}
                  height={item.h}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
                  className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(10, 10, 10, 0.55) 100%)",
                }}
              />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-brand-gold/40"
              />
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-white/60 text-sm sm:text-base mb-6">
            Want a piece in this style?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-gold group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
            >
              Send me your idea
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={ARTIST.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
            >
              <Instagram size={16} />
              See healed work on IG
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
