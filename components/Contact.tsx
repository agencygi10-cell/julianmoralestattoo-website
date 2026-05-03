"use client";

import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Send, MessageCircle, Mail, MapPin, Check } from "lucide-react";
import { ARTIST, FULL_ADDRESS, WHATSAPP_LINK, MAILTO_LINK } from "@/lib/site";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  description: string;
  size: string;
  smsServiceConsent: boolean;
  smsMarketingConsent: boolean;
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
      size: "",
      smsServiceConsent: false,
      smsMarketingConsent: false,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (_data) => {
    // TODO: Wire to GHL form embed, webhook, or email service.
    // For now this just simulates a submission so the form is fully functional
    // for A2P 10DLC review (the SMS consent checkboxes are the critical part).
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    reset();
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 border-t border-brand-gold/10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: heading + contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="eyebrow mb-4">Contact</div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-brand-text">
              Tell me <span className="text-gold-gradient">your idea</span>.
            </h2>
            <p className="mt-5 text-brand-muted text-base sm:text-lg leading-relaxed">
              Send a message with your idea, references, and approximate size
              and placement. I respond within 48 hours, in English or Spanish.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-brand-gold/20 bg-brand-deep/50 p-4 transition-all hover:border-brand-gold/50 hover:bg-brand-deep/80"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-brand-dim">
                    WhatsApp
                  </div>
                  <div className="text-sm text-brand-cream">
                    {ARTIST.phone}
                  </div>
                </div>
              </a>

              <a
                href={MAILTO_LINK}
                className="flex items-center gap-4 rounded-xl border border-brand-gold/20 bg-brand-deep/50 p-4 transition-all hover:border-brand-gold/50 hover:bg-brand-deep/80"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-brand-dim">
                    Email
                  </div>
                  <div className="text-sm text-brand-cream truncate">
                    {ARTIST.email}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-xl border border-brand-gold/20 bg-brand-deep/50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-brand-dim">
                    Studio
                  </div>
                  <div className="text-sm text-brand-cream">
                    {ARTIST.studio.name}
                  </div>
                  <div className="text-sm text-brand-muted">
                    {FULL_ADDRESS}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <SuccessState onReset={() => setSubmitted(false)} />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="card-dark rounded-2xl p-6 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Full name"
                    error={errors.name?.message}
                    required
                  >
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className="form-input"
                      {...register("name", {
                        required: "Please enter your name",
                        minLength: { value: 2, message: "Too short" },
                      })}
                    />
                  </Field>

                  <Field
                    label="Email"
                    error={errors.email?.message}
                    required
                  >
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      className="form-input"
                      {...register("email", {
                        required: "Please enter your email",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email",
                        },
                      })}
                    />
                  </Field>
                </div>

                <Field
                  label="Phone"
                  hint="Required if you want SMS booking confirmations"
                  error={errors.phone?.message}
                  required
                >
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 (___) ___-____"
                    className="form-input"
                    {...register("phone", {
                      required: "Please enter your phone number",
                      minLength: { value: 7, message: "Too short" },
                    })}
                  />
                </Field>

                <Field
                  label="Tell me about your tattoo idea"
                  error={errors.description?.message}
                  required
                >
                  <textarea
                    rows={5}
                    placeholder="What do you want to tattoo? Include any reference, meaning, or details that help me visualize the piece."
                    className="form-input resize-none"
                    {...register("description", {
                      required: "Please describe your idea",
                      minLength: {
                        value: 10,
                        message: "A little more detail helps",
                      },
                    })}
                  />
                </Field>

                <Field label="Size & placement (optional)">
                  <input
                    type="text"
                    placeholder="e.g. forearm, ~6 inches"
                    className="form-input"
                    {...register("size")}
                  />
                </Field>

                {/* SMS consent — A2P 10DLC compliant */}
                <fieldset className="space-y-4 pt-2">
                  <legend className="text-xs uppercase tracking-widest text-brand-gold mb-2">
                    SMS Communication Preferences
                  </legend>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 rounded border-brand-gold/40 bg-brand-deep accent-brand-gold cursor-pointer"
                      {...register("smsServiceConsent")}
                    />
                    <span className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      <span className="text-brand-cream font-medium">
                        I agree to receive service SMS messages from Julián Morales
                      </span>{" "}
                      — appointment confirmations, reminders, rescheduling updates,
                      and customer support. Message frequency varies. Message and
                      data rates may apply. Reply <strong className="text-brand-cream">STOP</strong> to opt out, <strong className="text-brand-cream">HELP</strong> for help.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 rounded border-brand-gold/40 bg-brand-deep accent-brand-gold cursor-pointer"
                      {...register("smsMarketingConsent")}
                    />
                    <span className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      <span className="text-brand-cream font-medium">
                        (Optional)
                      </span>{" "}
                      I&apos;d also like to receive occasional promotional SMS messages
                      from Julián Morales about special offers and openings.
                      Not required for booking.
                    </span>
                  </label>
                </fieldset>

                <p className="text-xs text-brand-dim leading-relaxed pt-2">
                  Consent is not a condition of purchase. By submitting this
                  form you also agree to our{" "}
                  <a
                    href="/terms"
                    className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
                  >
                    Privacy Policy
                  </a>
                  . Mobile information is never shared with third parties for
                  marketing purposes.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Send message"}
                  {!isSubmitting && <Send size={16} />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-brand-cream">
          {label}
          {required && <span className="text-brand-gold ml-1">*</span>}
        </span>
        {hint && !error && (
          <span className="text-[11px] text-brand-dim">{hint}</span>
        )}
        {error && (
          <span className="text-[11px] text-red-400/90">{error}</span>
        )}
      </div>
      {children}
    </label>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="card-dark rounded-2xl p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark text-brand-black">
        <Check size={28} strokeWidth={3} />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-brand-cream">
        Message received.
      </h3>
      <p className="mt-3 text-brand-muted leading-relaxed max-w-sm mx-auto">
        Thanks for reaching out. I&apos;ll review your idea and reply within 48
        hours. If it&apos;s urgent, message me on WhatsApp.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
      >
        Send another message
      </button>
    </div>
  );
}
