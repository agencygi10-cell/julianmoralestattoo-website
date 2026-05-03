"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, CalendarCheck, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Reach Out",
    body: "Message me via WhatsApp or this form with your idea, references, and approximate placement and size. I respond within 48 hours.",
  },
  {
    icon: FileText,
    title: "Quote & Consultation",
    body: "I review your idea and send a personalized quote based on size, placement, and complexity. Free initial consultation, in English or Spanish.",
  },
  {
    icon: CalendarCheck,
    title: "Lock Your Date",
    body: "A $100 non-refundable deposit secures your appointment. The deposit applies to the final session price. Reschedule with 72h notice anytime.",
  },
  {
    icon: Sparkles,
    title: "The Session",
    body: "We meet at Premium Clan Tattoo Studio. I review the design with you before we start — adjusting until you're 100% sure. Then we tattoo.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-20 sm:py-28 border-t border-brand-gold/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-4">The Process</div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-brand-text">
            From first message to{" "}
            <span className="text-gold-gradient">healed piece</span>.
          </h2>
          <p className="mt-5 text-brand-muted text-base sm:text-lg leading-relaxed">
            A clear path so you know exactly what to expect — no surprises,
            no rushed decisions.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="card-dark group relative rounded-2xl p-7 transition-all hover:border-brand-gold/30"
              >
                {/* Step number */}
                <div className="absolute -top-3 right-5 rounded-full border border-brand-gold/30 bg-brand-black px-3 py-1 text-[11px] uppercase tracking-widest text-brand-gold">
                  Step {i + 1}
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/30 text-brand-gold transition-all group-hover:scale-105">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-brand-cream">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
