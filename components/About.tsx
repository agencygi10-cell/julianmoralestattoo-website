"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ARTIST } from "@/lib/site";

const SPECIALTIES = [
  "Portraits",
  "Religious Imagery",
  "Memorial Pieces",
  "Realism",
  "Black & Gray",
];

export default function About({ light = false }: { light?: boolean }) {
  const headingColor = light ? "text-brand-black" : "text-white";
  const bodyColor = light ? "text-brand-black/70" : "text-white/70";
  const emphasis = light ? "text-brand-black" : "text-white";
  const dividerBorder = light ? "border-black/10" : "border-brand-gold/15";
  const statLabel = light ? "text-brand-black/50" : "text-white/50";

  return (
    <section
      className={`relative pt-32 pb-20 lg:pt-36 lg:pb-24 ${
        light ? "bg-white text-brand-black" : ""
      }`}
    >
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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[2rem] opacity-50 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(212, 175, 55, 0.3) 0%, transparent 70%)",
                }}
              />

              <div
                className="relative rounded-2xl p-[1.5px]"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(232, 201, 122, 0.7) 0%, rgba(168, 139, 44, 0.3) 50%, rgba(232, 201, 122, 0.7) 100%)",
                }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-brand-ink">
                  <Image
                    src="/about/julian-portrait.webp"
                    alt="Julián Morales — Black & Gray Realism Tattoo Artist"
                    width={1600}
                    height={2034}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    priority
                    className="block h-auto w-full"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent"
                  />
                </div>
              </div>

              <div
                aria-hidden
                className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-brand-gold shadow-gold"
              />
              <div
                aria-hidden
                className="absolute -bottom-2 -left-2 h-2 w-2 rounded-full bg-brand-gold-light shadow-gold"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="eyebrow mb-4">About</div>
            <h1
              className={`font-display text-4xl sm:text-6xl font-bold leading-tight ${headingColor}`}
            >
              Permanent art,{" "}
              <span className="text-gold-gradient">made with intention</span>.
            </h1>

            <div className={`mt-7 space-y-5 leading-relaxed text-base sm:text-lg ${bodyColor}`}>
              <p>
                I&apos;m Julián Morales, a black &amp; gray realism tattoo
                artist with{" "}
                <span className={emphasis}>{ARTIST.stats.yearsExperience} years</span>{" "}
                of experience and over{" "}
                <span className={emphasis}>{ARTIST.stats.healedPieces} healed pieces</span>{" "}
                documented on my Instagram.
              </p>
              <p>
                My focus is the kind of tattoo you carry for a reason —
                portraits of loved ones, religious imagery, and memorial pieces
                where every shadow has weight. I work slowly, with full respect
                for what the image means to you, because realism done right
                isn&apos;t a drawing — it&apos;s a memory rendered in skin.
              </p>
              <p>
                Based in <span className={emphasis}>{ARTIST.location}</span>, by
                appointment only, in <span className={emphasis}>English and Spanish</span>.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {SPECIALTIES.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-brand-gold/30 bg-brand-gold/5 px-4 py-1.5 text-xs uppercase tracking-wider text-brand-gold"
                >
                  {s}
                </span>
              ))}
            </div>

            <div
              className={`mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-4 border-t pt-8 ${dividerBorder}`}
            >
              <Stat value={ARTIST.stats.yearsExperience} label="Years" labelClass={statLabel} />
              <Stat value={ARTIST.stats.healedPieces} label="Healed" labelClass={statLabel} />
              <Stat value="100%" label="Custom" labelClass={statLabel} />
              <Stat value="EN/ES" label="Bilingual" labelClass={statLabel} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  labelClass,
}: {
  value: string;
  label: string;
  labelClass: string;
}) {
  return (
    <div>
      <div className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient leading-none">
        {value}
      </div>
      <div className={`mt-2 text-[10px] sm:text-xs uppercase tracking-widest ${labelClass}`}>
        {label}
      </div>
    </div>
  );
}
