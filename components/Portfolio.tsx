"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { ARTIST } from "@/lib/site";

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
  { src: "/portfolio/tattoo-01.webp", w: 1600, h: 2071, alt: "Christ portrait with crown of thorns — black & gray realism" },
  { src: "/portfolio/tattoo-10.jpg",  w: 1350, h: 1800, alt: "Roaring lion and rose forearm — black & gray realism" },
  { src: "/portfolio/tattoo-18.jpg",  w: 1350, h: 1800, alt: "Knight helmet and roses full sleeve — black & gray realism" },
  { type: "video", src: "/videos/portfolio-jesus.mp4", w: 720, h: 1280, alt: "Process clip — Christ tattoo by Julián Morales" },
  { src: "/portfolio/tattoo-15.jpg",  w: 1350, h: 1800, alt: "Medusa with serpents — black & gray realism" },
  { src: "/portfolio/tattoo-02.webp", w: 1600, h: 2071, alt: "Spartan helmet and lion shoulder piece — black & gray realism" },
  { src: "/portfolio/tattoo-11.jpg",  w: 1350, h: 1800, alt: "Pair of roses with filigree — black & gray forearm piece" },
  { src: "/portfolio/tattoo-03.webp", w: 1600, h: 2071, alt: "Archangel Michael with sword — black & gray realism" },
  { src: "/portfolio/tattoo-12.jpg",  w: 1350, h: 1800, alt: "Aztec warrior with jaguar helmet — full sleeve" },
  { src: "/portfolio/tattoo-16.jpg",  w: 1383, h: 1800, alt: "Virgin Mary praying — black & gray realism" },
  { src: "/portfolio/tattoo-04.jpg",  w: 1080, h: 1440, alt: "Virgin of Guadalupe with detailed veil — black & gray realism" },
  { src: "/portfolio/tattoo-13.jpg",  w: 1350, h: 1800, alt: "Knight helmet and roses sleeve — front view" },
  { src: "/portfolio/tattoo-17.jpg",  w: 1350, h: 1800, alt: "Roman numeral clock with baroque scrollwork — black & gray" },
  { src: "/portfolio/tattoo-05.jpg",  w: 1080, h: 1440, alt: "Skull with hourglass — black & gray realism" },
  { src: "/portfolio/tattoo-06.jpeg", w: 384,  h: 699,  alt: "Anubis with pyramid and ankh — Egyptian piece" },
  { src: "/portfolio/tattoo-08.jpeg", w: 388,  h: 642,  alt: "Eagle and horse with clock — sleeve detail" },
];

export default function Portfolio({ light = false }: { light?: boolean }) {
  const headingColor = light ? "text-brand-black" : "text-white";
  const subtitleColor = light ? "text-brand-black/60" : "text-white/60";
  const tileBorder = light ? "border-brand-black/15" : "border-brand-gold/15";
  const ctaText = light ? "text-brand-black/60" : "text-white/60";

  return (
    <section className={`relative pt-32 pb-20 lg:pt-36 lg:pb-24 ${light ? "bg-white text-brand-black" : ""}`}>
      {light && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-4">Portfolio</div>
          <h1 className={`font-display text-4xl sm:text-6xl font-bold leading-tight ${headingColor}`}>
            The full <span className="text-gold-gradient">archive</span>.
          </h1>
          <p className={`mt-5 text-base sm:text-lg leading-relaxed ${subtitleColor}`}>
            Every piece I&apos;ve documented — fresh and healed. Each tattoo
            here was a months-long conversation with a client about something
            that mattered.
          </p>
        </motion.div>

        <div className="mt-12 columns-2 md:columns-3 gap-3 sm:gap-4 [column-fill:balance]">
          {ITEMS.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.06 }}
              className={`group relative mb-3 sm:mb-4 break-inside-avoid overflow-hidden rounded-xl border bg-brand-ink ${tileBorder} ${
                light ? "shadow-xl" : ""
              }`}
            >
              {item.type === "video" ? (
                <>
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
                  <span className="absolute top-3 left-3 rounded-full border border-brand-gold/40 bg-black/70 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-brand-gold backdrop-blur-sm">
                    Process
                  </span>
                </>
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
                    "linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.55) 100%)",
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
          <p className={`text-sm sm:text-base mb-6 ${ctaText}`}>
            Want a piece in this style?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-gold group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
            >
              Send me your idea
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href={ARTIST.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all ${
                light
                  ? "border border-brand-black/25 text-brand-black/80 hover:border-brand-black hover:text-brand-black"
                  : "btn-ghost"
              }`}
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
