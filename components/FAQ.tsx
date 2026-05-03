"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ITEMS = [
  {
    q: "How do I book?",
    a: "Send a message via WhatsApp (+1 408 794 5667) or fill out the contact form on this page. Include your idea, references if you have any, and the approximate size and placement. I respond within 48 hours.",
  },
  {
    q: "Do you require a deposit?",
    a: "Yes — a $100 non-refundable deposit secures your appointment date. The deposit applies toward the final session price.",
  },
  {
    q: "What if I need to reschedule?",
    a: "No problem — life happens. Reschedule with at least 72 hours notice and we'll find a new slot together. We don't do cancellations, only reschedules. Your deposit moves with you to the new date.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "No — appointments only. Custom realism work needs preparation; walk-in slots don't allow the design and consultation time the work deserves.",
  },
  {
    q: "How much does a piece cost?",
    a: "Pricing depends on size, placement, and complexity. Send me your idea and I'll send a personalized quote — no surprise pricing, and the consultation is free.",
  },
  {
    q: "How long does a session take?",
    a: "Single sessions usually run 3–6 hours. Larger pieces — sleeves, back work, full chest — take 4 to 12 sessions spread over several months.",
  },
  {
    q: "What styles do you specialize in?",
    a: "Black & gray realism — with a focus on portraits, religious imagery, and memorial pieces. I take projects of any size or placement within my style.",
  },
  {
    q: "¿Hablas español?",
    a: "Sí — atiendo en inglés y español. Mándame tu mensaje en el idioma que se te haga más cómodo.",
  },
  {
    q: "Where is your studio?",
    a: "I work at Premium Clan Tattoo Studio — 1621 Alum Rock Ave, San Jose, CA 95116. The studio is licensed, sterile, and well-reviewed locally.",
  },
  {
    q: "Is there a minimum age?",
    a: "Yes — 18 or older with a valid government-issued ID. No exceptions.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 border-t border-brand-gold/10"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow mb-4">FAQ</div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-brand-text">
            The questions <span className="text-gold-gradient">everyone asks</span>.
          </h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="card-dark overflow-hidden rounded-xl"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-brand-cream">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-brand-gold transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pr-12 text-sm sm:text-base text-brand-muted leading-relaxed sm:px-6 sm:pb-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
