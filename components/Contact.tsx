"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  User,
  Camera,
  Pencil,
  Building2,
  CalendarCheck,
  DollarSign,
} from "lucide-react";
import { ARTIST, MAILTO_LINK } from "@/lib/site";

// ─────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────

type FormValues = {
  // Step 1 — Qualifier
  firstTattoo: "" | "yes" | "no";
  bodyArea: string;
  appointmentType: "" | "consultation" | "appointment";
  // Step 2 — Tattoo details
  description: string;
  budget: string;
  // Step 3 — Contact info + consent
  fullName: string;
  phone: string;
  city: string;
  preferredDay: string;
  email: string;
  smsServiceConsent: boolean;
  smsMarketingConsent: boolean;
};

const BODY_AREAS = [
  "Upper arm",
  "Forearm",
  "Leg thigh",
  "Leg calf",
  "Chest",
  "Back",
  "Other",
];

const BUDGET_RANGES = [
  { value: "1000-2500", label: "$1,000 – $2,500" },
  { value: "2500-5000", label: "$2,500 – $5,000" },
  { value: "5000+", label: "$5,000+" },
];

// ─────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    reset,
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      firstTattoo: "",
      bodyArea: "",
      appointmentType: "",
      description: "",
      budget: "",
      fullName: "",
      phone: "",
      city: "",
      preferredDay: "",
      email: "",
      smsServiceConsent: false,
      smsMarketingConsent: false,
    },
  });

  // Validate just the current step's fields before advancing
  const nextStep = async () => {
    let fields: (keyof FormValues)[] = [];
    if (step === 1) fields = ["firstTattoo", "bodyArea", "appointmentType"];
    if (step === 2) fields = ["description"];
    const valid = await trigger(fields);
    if (valid) setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s));
  };

  const prevStep = () =>
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      reset();
      setStep(1);
    } catch {
      setServerError(
        "Network error. Please try again or DM us on Instagram."
      );
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Wine glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(201, 169, 97, 0.40) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 text-center sm:text-left"
        >
          <div className="eyebrow mb-4">Contact · Bookings Open</div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] text-white">
            Book a <span className="text-gold-gradient">Session</span>
          </h1>

          {/* Gold diamond divider */}
          <div
            aria-hidden
            className="mt-6 flex items-center justify-center sm:justify-start gap-3"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-brand-gold to-brand-gold" />
            <span
              className="h-2.5 w-2.5 rotate-45"
              style={{
                background:
                  "linear-gradient(135deg, #E8C97A 0%, #C9A961 50%, #A88B2C 100%)",
                boxShadow: "0 0 14px rgba(201, 169, 97, 0.55)",
              }}
            />
            <span className="h-px w-12 bg-gradient-to-l from-transparent via-brand-gold to-brand-gold" />
          </div>

          <p className="mt-6 max-w-2xl mx-auto sm:mx-0 text-base sm:text-lg italic leading-relaxed text-white/80">
            Free consultation. Custom design. A premium experience from sketch
            to skin.
          </p>
          <p className="mt-4 max-w-2xl mx-auto sm:mx-0 text-sm sm:text-base leading-relaxed text-white/55">
            Three quick steps — I respond personally within 48 hours, in
            English or Spanish.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left on desktop, second on mobile — contact methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4 order-2 lg:order-1"
          >
            <ContactCard
              icon={<Phone size={20} />}
              label="Call or Text"
              value={ARTIST.phone}
              href={`tel:${ARTIST.phoneRaw}`}
            />
            <ContactCard
              icon={<Mail size={20} />}
              label="Email"
              value={ARTIST.email}
              href={MAILTO_LINK}
            />
            <ContactCard
              icon={<Instagram size={20} />}
              label="Instagram · DM"
              value={ARTIST.social.instagramHandle}
              href={ARTIST.social.instagram}
              external
            />
            <div className="card-dark rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-gold/30"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201, 169, 97, 0.3) 0%, rgba(74, 10, 18, 0.5) 100%)",
                  }}
                >
                  <MapPin size={20} className="text-brand-gold-light" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/45">
                    Based in
                  </div>
                  <div className="mt-1 text-sm text-white">
                    {ARTIST.location}
                  </div>
                  <div className="text-xs text-white/55 mt-0.5">
                    By appointment only
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-brand-gold/15 bg-brand-deep/60 p-5 text-xs leading-relaxed text-white/55 backdrop-blur-sm">
              <div className="text-brand-gold-light uppercase tracking-widest mb-2 text-[10px]">
                Good to know
              </div>
              No walk-ins · 18+ with valid ID · English &amp; Spanish · 48h
              response · Deposit required to book · Pricing varies by size,
              placement and design
            </div>
          </motion.div>

          {/* Right on desktop, first on mobile — 3-step wizard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            {submitted ? (
              <SuccessState onReset={() => setSubmitted(false)} />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="card-dark rounded-2xl p-6 sm:p-8"
              >
                <Stepper step={step} />

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-5 mt-2"
                    >
                      <StepHeader
                        title="A few quick questions"
                        subtitle="So I can tailor the consultation to what you want."
                      />

                      <Field
                        label="Is this your first tattoo?"
                        icon={<Sparkles size={14} />}
                        error={errors.firstTattoo?.message}
                        required
                      >
                        <select
                          className="form-input"
                          {...register("firstTattoo", {
                            required: "Please choose one",
                          })}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </Field>

                      <Field
                        label="In what area of the body?"
                        icon={<MapPin size={14} />}
                        error={errors.bodyArea?.message}
                        required
                      >
                        <select
                          className="form-input"
                          {...register("bodyArea", {
                            required: "Please select a body area",
                          })}
                        >
                          <option value="">Select an area</option>
                          {BODY_AREAS.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </select>
                      </Field>

                      {/* Julian works exclusively in black & grey — no color
                          selector; the API stamps "Black and Grey". */}
                      <Field
                        label="What kind of appointment do you want?"
                        icon={<CalendarCheck size={14} />}
                        error={errors.appointmentType?.message}
                        required
                      >
                        <select
                          className="form-input"
                          {...register("appointmentType", {
                            required: "Please choose one",
                          })}
                        >
                          <option value="">Appointment type</option>
                          <option value="consultation">
                            Consultation appointment
                          </option>
                          <option value="appointment">Appointment</option>
                        </select>
                      </Field>

                      <WizardNav onNext={nextStep} />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-5 mt-2"
                    >
                      <StepHeader
                        title="Tattoo details"
                        subtitle="The more details you share, the better the sketch."
                      />

                      <ReferenceImagesField />

                      <Field
                        label="Design description"
                        icon={<Pencil size={14} />}
                        error={errors.description?.message}
                        required
                      >
                        <textarea
                          rows={4}
                          placeholder="Briefly describe your idea or design details…"
                          className="form-input resize-none"
                          {...register("description", {
                            required: "Tell me a bit about the idea",
                            minLength: {
                              value: 10,
                              message: "A little more detail helps",
                            },
                          })}
                        />
                      </Field>

                      <Field
                        label="Budget range"
                        icon={<DollarSign size={14} />}
                        hint="Optional"
                      >
                        <select className="form-input" {...register("budget")}>
                          <option value="">Select a range</option>
                          {BUDGET_RANGES.map((b) => (
                            <option key={b.value} value={b.value}>
                              {b.label}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <WizardNav onPrev={prevStep} onNext={nextStep} />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-5 mt-2"
                    >
                      <StepHeader
                        title="Your contact info"
                        subtitle="So I can confirm your booking and reach out."
                      />

                      <Field
                        label="Full name"
                        icon={<User size={14} />}
                        error={errors.fullName?.message}
                        required
                      >
                        <input
                          type="text"
                          autoComplete="name"
                          placeholder="Your name"
                          className="form-input"
                          {...register("fullName", {
                            required: "Please enter your name",
                            minLength: { value: 2, message: "Too short" },
                          })}
                        />
                      </Field>

                      <Field
                        label="Phone number"
                        icon={<Phone size={14} />}
                        error={errors.phone?.message}
                        required
                      >
                        <input
                          type="tel"
                          autoComplete="tel"
                          placeholder="+1 (___) ___-____"
                          className="form-input"
                          {...register("phone", {
                            required: "Please enter your phone",
                            minLength: { value: 7, message: "Too short" },
                          })}
                        />
                      </Field>

                      <Field label="City" icon={<Building2 size={14} />}>
                        <input
                          type="text"
                          placeholder="Enter your city"
                          className="form-input"
                          {...register("city")}
                        />
                      </Field>

                      <Field
                        label="Preferred day"
                        icon={<CalendarCheck size={14} />}
                        hint="Optional"
                      >
                        <input
                          type="text"
                          placeholder="E.g. Weekday or weekend"
                          className="form-input"
                          {...register("preferredDay")}
                        />
                      </Field>

                      <Field
                        label="Email"
                        icon={<Mail size={14} />}
                        error={errors.email?.message}
                        required
                      >
                        <input
                          type="email"
                          autoComplete="email"
                          placeholder="example@mail.com"
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

                      {/* A2P 10DLC compliance — SMS consents */}
                      <fieldset className="space-y-4 pt-2">
                        <legend className="text-xs uppercase tracking-widest text-brand-gold mb-2">
                          SMS Communication Preferences
                        </legend>

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 shrink-0 rounded border-brand-gold/40 bg-brand-ink accent-brand-gold cursor-pointer"
                            {...register("smsServiceConsent")}
                          />
                          <span className="text-xs sm:text-sm text-white/70 leading-relaxed">
                            <span className="text-white font-medium">
                              I agree to receive transactional SMS messages
                              from Julian Morales at the phone number provided
                            </span>{" "}
                            — appointment confirmations, reminders and
                            follow-up alerts, rescheduling updates, and
                            customer support. Message frequency may vary.
                            Message and data rates may apply. Reply{" "}
                            <strong className="text-white">STOP</strong> to
                            opt out,{" "}
                            <strong className="text-white">HELP</strong> for
                            help.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 shrink-0 rounded border-brand-gold/40 bg-brand-ink accent-brand-gold cursor-pointer"
                            {...register("smsMarketingConsent")}
                          />
                          <span className="text-xs sm:text-sm text-white/70 leading-relaxed">
                            <span className="text-white font-medium">
                              (Optional)
                            </span>{" "}
                            I agree to receive occasional promotional and
                            marketing SMS messages from Julian Morales at the
                            phone number provided, about special offers and
                            openings. Not required for booking. Message
                            frequency may vary. Message and data rates may
                            apply. Reply{" "}
                            <strong className="text-white">STOP</strong> to
                            opt out,{" "}
                            <strong className="text-white">HELP</strong> for
                            help.
                          </span>
                        </label>
                      </fieldset>

                      <p className="text-xs text-white/50 leading-relaxed pt-2">
                        SMS consent is optional and is collected only through
                        the checkboxes above — you can send your booking
                        request without opting in, and declining texts does
                        not affect your booking in any way. Consent is not a
                        condition of any purchase or service. See our{" "}
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
                        . Mobile information is never shared with third
                        parties for marketing purposes.
                      </p>

                      {serverError && (
                        <p
                          role="alert"
                          className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                        >
                          {serverError}
                        </p>
                      )}

                      <WizardNav
                        onPrev={prevStep}
                        submitting={isSubmitting}
                        submitLabel="Request Now"
                        isSubmit
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const dots = [1, 2, 3] as const;
  return (
    <div className="flex items-center justify-center gap-3 mb-7">
      {dots.map((n, i) => {
        const active = step === n;
        const done = step > n;
        return (
          <div key={n} className="flex items-center gap-3">
            <div
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border text-xs font-display font-semibold transition-all ${
                done
                  ? "border-brand-gold/70 bg-brand-gold/40 text-brand-gold-light"
                  : active
                  ? "border-brand-gold/80 bg-gradient-to-br from-brand-gold to-brand-gold-dark text-white shadow-2xl"
                  : "border-brand-gold/15 bg-brand-deep text-white/35"
              }`}
            >
              {done ? <Check size={14} strokeWidth={3} /> : n}
              {active && (
                <span
                  aria-hidden
                  className="absolute -inset-1.5 rounded-full opacity-50 blur-md"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(201, 169, 97, 0.55) 0%, transparent 70%)",
                  }}
                />
              )}
            </div>
            {i < dots.length - 1 && (
              <div
                aria-hidden
                className={`h-px w-12 sm:w-16 transition-colors ${
                  step > n ? "bg-brand-gold/50" : "bg-brand-gold/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-2">
      <h2 className="font-display text-xl sm:text-2xl text-white">{title}</h2>
      <p className="text-sm text-white/55 mt-1">{subtitle}</p>
    </div>
  );
}

function WizardNav({
  onPrev,
  onNext,
  submitLabel,
  isSubmit,
  submitting,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  submitLabel?: string;
  isSubmit?: boolean;
  submitting?: boolean;
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4">
      {onPrev ? (
        <button
          type="button"
          onClick={onPrev}
          className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-widest w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={14} />
          Previous
        </button>
      ) : (
        <span />
      )}

      {isSubmit ? (
        <button
          type="submit"
          disabled={submitting}
          className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-widest w-full sm:w-auto justify-center disabled:opacity-60"
        >
          {submitting ? "Sending…" : submitLabel || "Send"}
          {!submitting && <ArrowRight size={14} />}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-widest w-full sm:w-auto justify-center"
        >
          Continue
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

function ReferenceImagesField() {
  // Visual-only file input. Real upload will be wired when we connect a
  // backend (GHL form / Vercel function / S3). Keeping it native for UX parity
  // with the brief while we do not yet have a destination for the file bytes.
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
        <span className="text-brand-gold-light">
          <Camera size={14} />
        </span>
        Reference images
        <span className="ml-auto text-[11px] text-white/40">Optional</span>
      </div>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          multiple
          className="block w-full text-sm text-white/65 file:mr-4 file:rounded-md file:border file:border-brand-gold/30 file:bg-brand-gold/15 file:px-3.5 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-brand-gold-light hover:file:bg-brand-gold/25 cursor-pointer rounded-lg border border-brand-gold/22 bg-brand-deep/70 px-3 py-2.5"
        />
      </div>
      <p className="mt-1.5 text-[11px] text-white/40">
        JPG, PNG up to ~10MB each. Multiple files allowed.
      </p>
    </label>
  );
}

function Field({
  label,
  hint,
  error,
  required,
  icon,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
          {icon && (
            <span className="text-brand-gold-light translate-y-[1px]">
              {icon}
            </span>
          )}
          {label}
          {required && <span className="text-brand-gold ml-0.5">*</span>}
        </span>
        {hint && !error && (
          <span className="text-[11px] text-white/40">{hint}</span>
        )}
        {error && (
          <span className="text-[11px] text-brand-crimson/90">{error}</span>
        )}
      </div>
      {children}
    </label>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-4 rounded-xl card-dark p-5 transition-all hover:border-brand-gold/55"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold-light transition-colors group-hover:border-brand-gold"
        style={{
          background:
            "linear-gradient(135deg, rgba(201, 169, 97, 0.3) 0%, rgba(74, 10, 18, 0.5) 100%)",
        }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest text-white/45">
          {label}
        </div>
        <div className="mt-1 text-sm text-white truncate">{value}</div>
      </div>
    </a>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="card-dark rounded-2xl p-10 text-center">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white"
        style={{
          background:
            "linear-gradient(135deg, #9A1B2E 0%, #6B1019 60%, #4A0A12 100%)",
          boxShadow: "0 0 30px -8px rgba(201, 169, 97, 0.6)",
        }}
      >
        <Check size={28} strokeWidth={3} />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-white">
        Request received.
      </h3>
      <p className="mt-3 text-white/65 leading-relaxed max-w-sm mx-auto">
        Thanks for reaching out. I&apos;ll review your request and reply
        within 48 hours.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
      >
        Send another request
      </button>
    </div>
  );
}
