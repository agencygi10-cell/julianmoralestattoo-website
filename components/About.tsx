"use client";

import { motion } from "framer-motion";
import { ARTIST } from "@/lib/site";

const SPECIALTIES = [
  "Portraits",
  "Religious Imagery",
  "Memorial Pieces",
  "Realism",
  "Black & Gray",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 border-t border-brand-gold/10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="eyebrow mb-4">About</div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-brand-text">
              Permanent art,{" "}
              <span className="text-gold-gradient">made with intention</span>.
            </h2>

            <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-base sm:text-lg">
              <p>
                I&apos;m Julián Morales, a black &amp; gray realism tattoo artist
                with <span className="text-brand-cream">{ARTIST.stats.yearsExperience} years</span>{" "}
                of experience and over{" "}
                <span className="text-brand-cream">
                  {ARTIST.stats.healedPieces} healed pieces
                </span>{" "}
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
                I work by appointment only at{" "}
                <span className="text-brand-cream">
                  {ARTIST.studio.name}
                </span>{" "}
                in San Jose, and I attend clients in{" "}
                <span className="text-brand-cream">English and Spanish</span>.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {SPECIALTIES.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-brand-gold/30 bg-brand-gold/5 px-4 py-1.5 text-xs uppercase tracking-wider text-brand-gold"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: stats card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="card-dark rounded-2xl p-7 sm:p-9">
              <div className="space-y-6">
                <Stat
                  value={ARTIST.stats.yearsExperience}
                  label="Years Specializing in Black &amp; Gray"
                />
                <div className="divider-gold" />
                <Stat
                  value={ARTIST.stats.healedPieces}
                  label="Healed Pieces Documented"
                />
                <div className="divider-gold" />
                <Stat value="100%" label="Custom Drawn — No Flash" />
                <div className="divider-gold" />
                <Stat value="EN / ES" label="Bilingual Consultation" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-brand-gold/20 bg-brand-deep/40 p-5 text-sm text-brand-muted">
              <span className="text-brand-gold">✦</span>{" "}
              Verified on Instagram —{" "}
              <a
                href={ARTIST.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold"
              >
                {ARTIST.social.instagramHandle}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl sm:text-5xl font-bold text-gold-gradient leading-none">
        {value}
      </div>
      <div
        className="mt-2 text-xs uppercase tracking-wider text-brand-muted"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
}
