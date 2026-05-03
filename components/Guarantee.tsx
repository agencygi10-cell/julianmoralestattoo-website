"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Repeat, Eye } from "lucide-react";

const PILLARS = [
  {
    icon: Eye,
    title: "Unlimited pre-tattoo adjustments",
    body: "We review the design together before the needle touches skin. If anything feels off, we adjust until you're 100% sure.",
  },
  {
    icon: ShieldCheck,
    title: "Black Ink 90-day touch-up",
    body: "If a line or shade needs evening out within 90 days of healing, the touch-up is on me. No questions, no fees.",
  },
  {
    icon: Repeat,
    title: "Reschedule, never cancel",
    body: "Life happens. With 72 hours notice you can move your date as many times as needed — your deposit travels with you.",
  },
];

export default function Guarantee() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-brand-gold/10">
      {/* Subtle gold radial */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="eyebrow mb-4">My Commitment</div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-brand-text">
            The <span className="text-gold-gradient">Black Ink Guarantee</span>.
          </h2>
          <p className="mt-5 text-brand-muted text-base sm:text-lg leading-relaxed">
            A tattoo is permanent — your peace of mind shouldn&apos;t depend
            on hope. Three commitments that take the risk out of the decision.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="card-dark rounded-2xl p-7 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-gold/5 border border-brand-gold/40 text-brand-gold">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-brand-cream">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
