"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { ARTIST } from "@/lib/site";

/**
 * Portfolio grid — currently displaying placeholder tiles with subject hints.
 *
 * To replace with real images:
 * 1. Drop JPGs into /public/portfolio/ named tattoo-01.jpg, tattoo-02.jpg, etc.
 * 2. Replace the PLACEHOLDER_ITEMS array below with real entries:
 *      { src: "/portfolio/tattoo-01.jpg", alt: "Realistic lion portrait" }
 * 3. Swap the placeholder div for an <img> or next/image in the map below.
 */
const PLACEHOLDER_ITEMS = [
  { label: "Portrait", subject: "Memorial portrait" },
  { label: "Religious", subject: "Saint figure" },
  { label: "Realism", subject: "Lion portrait" },
  { label: "Portrait", subject: "Family member" },
  { label: "Realism", subject: "Eye detail" },
  { label: "Religious", subject: "Praying hands" },
  { label: "Portrait", subject: "Greek statue" },
  { label: "Realism", subject: "Animal portrait" },
  { label: "Memorial", subject: "Tribute piece" },
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
              A small selection. The full portfolio — including healed pieces
              months after the session — lives on Instagram.
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

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {PLACEHOLDER_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-brand-gold/15 bg-gradient-to-br from-brand-charcoal via-brand-deep to-brand-black"
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.15) 0%, transparent 60%)",
                  }}
                />
                <span className="relative text-[10px] uppercase tracking-[0.3em] text-brand-gold">
                  {item.label}
                </span>
                <span className="relative mt-3 font-display text-sm text-brand-muted">
                  {item.subject}
                </span>
                <span className="relative mt-2 text-[10px] text-brand-dim italic">
                  Image coming soon
                </span>
              </div>

              {/* Subtle hover gold border */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent transition-all group-hover:ring-brand-gold/40"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
