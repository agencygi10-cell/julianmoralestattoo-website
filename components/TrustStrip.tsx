"use client";

import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Sparkles, Languages } from "lucide-react";
import { ARTIST } from "@/lib/site";

const items = [
  {
    icon: BadgeCheck,
    label: "Verified Instagram",
    sub: ARTIST.social.instagramHandle,
  },
  {
    icon: MapPin,
    label: ARTIST.studio.name,
    sub: `${ARTIST.studio.city}, ${ARTIST.studio.state}`,
  },
  {
    icon: Sparkles,
    label: `${ARTIST.stats.healedPieces} Healed Pieces`,
    sub: "Documented in Highlights",
  },
  {
    icon: Languages,
    label: "Bilingual Service",
    sub: "English & Español",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-brand-gold/15 bg-brand-deep/60 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-3 sm:gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm sm:text-base font-semibold text-brand-cream truncate">
                    {it.label}
                  </div>
                  <div className="text-xs text-brand-dim truncate">{it.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
