"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { ARTIST } from "@/lib/site";

const PIECES = [
  { src: "/portfolio/tattoo-01.webp", w: 1600, h: 2071, alt: "Black & gray realism tattoo by Julián Morales" },
  { src: "/portfolio/tattoo-02.webp", w: 1600, h: 2071, alt: "Portrait realism piece by Julián Morales" },
  { src: "/portfolio/tattoo-03.webp", w: 1600, h: 2071, alt: "Religious imagery tattoo, black and gray" },
  { src: "/portfolio/tattoo-04.jpg",  w: 1080, h: 1440, alt: "Black & gray realism work in progress" },
  { src: "/portfolio/tattoo-05.jpg",  w: 1080, h: 1440, alt: "Memorial portrait tattoo by Julián Morales" },
  { src: "/portfolio/tattoo-06.jpeg", w: 384,  h: 699,  alt: "Realism detail by Julián Morales" },
  { src: "/portfolio/tattoo-07.jpeg", w: 473,  h: 809,  alt: "Religious figure tattoo, black and gray" },
  { src: "/portfolio/tattoo-08.jpeg", w: 388,  h: 642,  alt: "Portrait tattoo piece" },
  { src: "/portfolio/tattoo-09.jpeg", w: 327,  h: 771,  alt: "Black & gray sleeve detail" },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative py-20 sm:py-28 border-t border-brand-gold/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 max-w-5xl"
        >
          <div>
            <div className="eyebrow mb-4">Portfolio</div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-brand-text">
              Selected <span className="text-gold-gradient">work</span>.
            </h2>
            <p className="mt-5 text-brand-muted text-base sm:text-lg leading-relaxed max-w-xl">
              A curated selection of recent pieces. The full archive — including
              healed work months after the session — lives on Instagram.
            </p>
          </div>
          <a
            href={ARTIST.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold self-start sm:self-end"
          >
            <Instagram size={16} />
            See full portfolio
          </a>
        </motion.div>

        {/* Masonry — preserves natural aspect ratios, no distortion */}
        <div className="mt-12 columns-2 md:columns-3 gap-3 sm:gap-4 [column-fill:balance]">
          {PIECES.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="group relative mb-3 sm:mb-4 break-inside-avoid overflow-hidden rounded-xl border border-brand-gold/15 bg-brand-deep"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Hover overlay with subtle gold gradient */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(10, 10, 10, 0.55) 100%)",
                }}
              />

              {/* Hover ring */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-brand-gold/40"
              />
            </motion.figure>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-brand-muted text-sm sm:text-base">
            Want a piece in this style?{" "}
            <a
              href="#contact"
              className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
            >
              Send me your idea →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
