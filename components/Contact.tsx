"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm, type SubmitHandler, type UseFormRegisterReturn } from "react-hook-form";
import { forwardRef, useState } from "react";
import {
  Send,
  Check,
  ArrowLeft,
  ArrowRight,
  Mail,
  MapPin,
  Camera,
  Link as LinkIcon,
  FileText,
  User,
  Phone,
  Calendar,
  Ruler,
  MapPinned,
  AtSign,
} from "lucide-react";
import { ARTIST, MAILTO_LINK } from "@/lib/site";

type FormValues = {
  // Step 1
  firstTattoo: "" | "Yes" | "No";
  bodyArea: string;
  appointmentType: string;
  // Step 2
  size: string;
  referenceImages: FileList | null;
  socialReference: string;
  description: string;
  // Step 3
  name: string;
  phone: string;
  age: string;
  city: string;
  preferredDay: string;
  email: string;
  smsServiceConsent: boolean;
  smsMarketingConsent: boolean;
};

const BODY_AREAS = [
  "Upper arm",
  "Forearm",
  "Leg Thigh",
  "Leg Calf",
  "Chest",
  "Back",
  "Other",
];

const APPOINTMENT_TYPES = ["New tattoo", "Consultation"];

const STEP_FIELDS: Record<1 | 2 | 3, (keyof FormValues)[]> = {
  1: ["firstTattoo", "bodyArea", "appointmentType"],
  2: ["description"],
  3: ["name", "phone", "email"],
};

export default function Contact() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      firstTattoo: "",
      bodyArea: "",
      appointmentType: "",
      size: "",
      referenceImages: null,
      socialReference: "",
      description: "",
      name: "",
      phone: "",
      age: "",
      city: "",
      preferredDay: "",
      email: "",
      smsServiceConsent: false,
      smsMarketingConsent: false,
    },
  });

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;
    setDirection(1);
    setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s));
  };

  const goPrev = () => {
    setDirection(-1);
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));
  };

  // POSTs straight to the GoHighLevel Inbound Webhook (public endpoint by
  // design). Reference images are summarized by name — not uploaded.
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setServerError(null);
    const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
    if (!webhookUrl) {
      setServerError(
        "This form isn't connected yet. Please reach us on Instagram."
      );
      return;
    }

    const nowIso = new Date().toISOString();
    const firstName = data.name.trim().split(/\s+/)[0];
    const lastName = data.name.trim().split(/\s+/).slice(1).join(" ");
    const fileSummary = data.referenceImages
      ? Array.from(data.referenceImages)
          .map((f) => `${f.name} (${Math.round(f.size / 1024)}KB)`)
          .join(", ")
      : "";

    const summary = [
      "New tattoo request — julianmoralestattoo.com",
      "",
      `Idea: ${data.description}`,
      `First tattoo: ${data.firstTattoo}`,
      `Body area: ${data.bodyArea}`,
      `Appointment: ${data.appointmentType}`,
      data.size ? `Approx. size: ${data.size}` : null,
      data.socialReference ? `Social / reference: ${data.socialReference}` : null,
      fileSummary ? `Reference files: ${fileSummary}` : null,
      data.age ? `Age: ${data.age}` : null,
      data.city ? `City: ${data.city}` : null,
      data.preferredDay ? `Preferred day: ${data.preferredDay}` : null,
      "",
      `Contact: ${data.name} · ${data.phone} · ${data.email}`,
      `SMS consent — transactional: ${data.smsServiceConsent ? "YES" : "no"} · promotional: ${data.smsMarketingConsent ? "YES" : "no"}`,
      `Submitted: ${nowIso}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.description,
          summary,
          bodyArea: data.bodyArea,
          appointmentType: data.appointmentType,
          size: data.size,
          preferredDay: data.preferredDay,
          transactionalSmsConsent: data.smsServiceConsent ? "yes" : "no",
          marketingSmsConsent: data.smsMarketingConsent ? "yes" : "no",
          smsConsentTimestamp:
            data.smsServiceConsent || data.smsMarketingConsent ? nowIso : "",
          source: "julianmoralestattoo.com",
          tags: [
            "website-lead",
            ...(data.smsServiceConsent ? ["sms-consent-given"] : []),
            ...(data.smsMarketingConsent ? ["promo-sms-opt-in"] : []),
          ],
        }),
      });
      if (!res.ok) {
        setServerError(
          "Something went wrong sending your request. Please try again."
        );
        return;
      }
      setSubmitted(true);
      reset();
      setStep(1);
    } catch {
      setServerError("Network error. Please try again in a moment.");
    }
  };

  const sideCardClass =
    "border border-brand-gold/20 bg-brand-ink/50 backdrop-blur-sm";
  const noteClass =
    "border border-brand-gold/15 bg-brand-ink/30 text-white/55";

  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading — editorial centered, with gold divider diamond */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <div className="eyebrow mb-5">Let&apos;s create something timeless</div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
            Book a <span className="text-gold-gradient">Session</span>
          </h1>

          {/* Gold divider with center diamond */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-brand-gold/70" />
            <span
              aria-hidden
              className="block h-2 w-2 rotate-45 bg-brand-gold shadow-gold"
            />
            <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-brand-gold/70" />
          </div>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/65">
            Free consultation. Custom design. A premium experience from sketch
            to skin — replies within 48 hours, in English or Spanish.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left on desktop / BOTTOM on mobile: contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-5 order-2 lg:order-1"
          >
            <a
              href={MAILTO_LINK}
              className={`flex items-center gap-4 rounded-xl p-4 transition-all hover:border-brand-gold/60 ${sideCardClass}`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                <Mail size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-white/40">
                  Email
                </div>
                <div className="text-sm text-white truncate">{ARTIST.email}</div>
              </div>
            </a>

            <div className={`flex items-start gap-4 rounded-xl p-4 ${sideCardClass}`}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/40">
                  Based in
                </div>
                <div className="text-sm text-white">{ARTIST.location}</div>
                <div className="text-sm text-white/60">By appointment only</div>
              </div>
            </div>

            <div className={`rounded-xl p-4 text-xs leading-relaxed ${noteClass}`}>
              No walk-ins · 18+ with valid ID · English &amp; Español · Response
              within 48 hours
            </div>
          </motion.div>

          {/* Right on desktop / TOP on mobile: 3-step form */}
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
                className="rounded-2xl p-6 sm:p-8 bg-brand-black border border-brand-gold/20 shadow-2xl"
              >
                {/* Stepper */}
                <Stepper current={step} />

                <div className="mt-8 relative overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    {step === 1 && (
                      <StepShell key="s1" direction={direction}>
                        <SelectField
                          label="Is this your first tattoo?"
                          placeholder="Select an option"
                          error={errors.firstTattoo?.message}
                          required
                          {...register("firstTattoo", {
                            required: "Please choose an option",
                          })}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </SelectField>

                        <SelectField
                          label="In what area of the body?"
                          placeholder="Select an area"
                          error={errors.bodyArea?.message}
                          required
                          {...register("bodyArea", {
                            required: "Please choose a body area",
                          })}
                        >
                          {BODY_AREAS.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </SelectField>

                        <div className="block">
                          <div className="mb-2 text-sm font-medium text-white">
                            What color tattoo?
                          </div>
                          <div className="rounded-lg border border-brand-gold/40 bg-gradient-to-r from-brand-gold/15 via-transparent to-brand-gold/15 px-4 py-3.5 text-sm text-white">
                            Only Black and Grey tattoos.
                          </div>
                        </div>

                        <SelectField
                          label="What kind of appointment do you want?"
                          placeholder="Appointment type"
                          error={errors.appointmentType?.message}
                          required
                          {...register("appointmentType", {
                            required: "Please choose appointment type",
                          })}
                        >
                          {APPOINTMENT_TYPES.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </SelectField>
                      </StepShell>
                    )}

                    {step === 2 && (
                      <StepShell key="s2" direction={direction}>
                        <Field
                          icon={<Ruler size={16} />}
                          label="Approximate size of the tattoo"
                        >
                          <input
                            type="text"
                            placeholder={'E.g. 10" x 5" (inches), palm-sized'}
                            className="form-input"
                            {...register("size")}
                          />
                        </Field>

                        <Field icon={<Camera size={16} />} label="Reference images">
                          <FileInput register={register("referenceImages")} />
                        </Field>

                        <Field
                          icon={<LinkIcon size={16} />}
                          label="Social media reference"
                        >
                          <input
                            type="text"
                            placeholder="E.g. @username or link to profile"
                            className="form-input"
                            {...register("socialReference")}
                          />
                        </Field>

                        <Field
                          icon={<FileText size={16} />}
                          label="Design Description"
                          error={errors.description?.message}
                        >
                          <textarea
                            rows={5}
                            placeholder="Briefly describe your idea or design details..."
                            className="form-input resize-none"
                            {...register("description", {
                              minLength: {
                                value: 10,
                                message: "A little more detail helps",
                              },
                            })}
                          />
                        </Field>
                      </StepShell>
                    )}

                    {step === 3 && (
                      <StepShell key="s3" direction={direction}>
                        <Field
                          icon={<User size={16} />}
                          label="Full names"
                          error={errors.name?.message}
                          required
                        >
                          <input
                            type="text"
                            autoComplete="name"
                            placeholder="Your names"
                            className="form-input"
                            {...register("name", {
                              required: "Please enter your name",
                              minLength: { value: 2, message: "Too short" },
                            })}
                          />
                        </Field>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <Field
                            icon={<Phone size={16} />}
                            label="Phone number"
                            error={errors.phone?.message}
                            required
                          >
                            <input
                              type="tel"
                              autoComplete="tel"
                              placeholder="Your number"
                              className="form-input"
                              {...register("phone", {
                                required: "Please enter your phone number",
                                minLength: { value: 7, message: "Too short" },
                              })}
                            />
                          </Field>
                          <Field label="Age">
                            <input
                              type="number"
                              min={18}
                              placeholder="Your Age"
                              className="form-input"
                              {...register("age")}
                            />
                          </Field>
                        </div>

                        <Field icon={<MapPinned size={16} />} label="City">
                          <input
                            type="text"
                            autoComplete="address-level2"
                            placeholder="Enter your City"
                            className="form-input"
                            {...register("city")}
                          />
                        </Field>

                        <Field icon={<Calendar size={16} />} label="Preferred day">
                          <input
                            type="text"
                            placeholder="E.g. Weekday or weekend"
                            className="form-input"
                            {...register("preferredDay")}
                          />
                        </Field>

                        <Field
                          icon={<AtSign size={16} />}
                          label="Email"
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

                        {/* A2P 10DLC SMS consent — required for GoHighLevel */}
                        <fieldset className="space-y-4 pt-3 border-t border-brand-gold/15">
                          <legend className="text-xs uppercase tracking-widest text-brand-gold mt-3 mb-2">
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
                              <strong className="text-white">STOP</strong> to opt
                              out, <strong className="text-white">HELP</strong>{" "}
                              for help.
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
                              <strong className="text-white">STOP</strong> to opt
                              out, <strong className="text-white">HELP</strong>{" "}
                              for help.
                            </span>
                          </label>

                          <p className="text-xs text-white/50 leading-relaxed pt-1">
                            SMS consent is optional and is collected only
                            through the checkboxes above — you can send your
                            booking request without opting in, and declining
                            texts does not affect your booking in any way.
                            Consent is not a condition of any purchase or
                            service. See our{" "}
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
                        </fieldset>
                      </StepShell>
                    )}
                  </AnimatePresence>
                </div>

                {serverError && (
                  <p className="mt-6 text-center text-sm text-brand-gold">
                    {serverError}
                  </p>
                )}

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={goPrev}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] text-white/80 px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all hover:border-white/40 hover:text-white"
                    >
                      <ArrowLeft size={14} />
                      Previous
                    </button>
                  )}

                  {step < 3 && (
                    <button
                      type="button"
                      onClick={goNext}
                      className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold tracking-widest uppercase"
                    >
                      Step {step + 1}
                      <ArrowRight size={14} />
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-brand-gold bg-transparent text-brand-gold px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all hover:bg-brand-gold hover:text-brand-black disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending…" : "Request now"}
                      {!isSubmitting && <Send size={14} />}
                    </button>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

function Stepper({ current }: { current: 1 | 2 | 3 }) {
  const steps = [1, 2, 3] as const;
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((n, i) => {
        const active = n <= current;
        const isCurrent = n === current;
        return (
          <div key={n} className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              {isCurrent && (
                <motion.span
                  aria-hidden
                  layoutId="step-ring"
                  className="absolute inset-0 rounded-full ring-2 ring-brand-gold/60"
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
              )}
              <div
                className={`relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-xs sm:text-sm font-semibold transition-colors duration-500 ${
                  active
                    ? "bg-brand-black text-white shadow-gold"
                    : "bg-white/10 text-white/50"
                }`}
                style={
                  active
                    ? { boxShadow: "0 0 0 1px rgba(212,175,55,0.55)" }
                    : undefined
                }
              >
                {n}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="relative h-[2px] w-16 sm:w-24 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={false}
                  animate={{ scaleX: current > n ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ originX: 0 }}
                  className="absolute inset-0 bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepShell({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: 1 | -1;
}) {
  return (
    <motion.div
      custom={direction}
      initial={{ opacity: 0, x: direction * 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -30, position: "absolute" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-5 w-full"
    >
      {children}
    </motion.div>
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
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
          {icon && <span className="text-brand-gold">{icon}</span>}
          {label}
          {required && <span className="text-brand-gold ml-0.5">*</span>}
        </span>
        {hint && !error && (
          <span className="text-[11px] text-white/40">{hint}</span>
        )}
        {error && (
          <span className="text-[11px] text-red-400/90">{error}</span>
        )}
      </div>
      {children}
    </label>
  );
}

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  placeholder: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
};

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(
    { label, placeholder, error, required, children, ...rest },
    ref
  ) {
    return (
      <Field label={label} error={error} required={required}>
        <div className="relative">
          <select
            {...rest}
            ref={ref}
            defaultValue=""
            className="form-input appearance-none pr-10 cursor-pointer"
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {children}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-gold"
          >
            <path
              d="M5 8l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Field>
    );
  }
);

function FileInput({ register }: { register: UseFormRegisterReturn }) {
  return (
    <label className="group flex items-center gap-3 rounded-lg border border-dashed border-brand-gold/40 bg-brand-ink/40 px-4 py-3.5 text-sm text-white/60 cursor-pointer transition-all hover:border-brand-gold hover:bg-brand-ink/60">
      <span className="inline-flex items-center gap-2 rounded-md bg-brand-gold/15 px-3 py-1.5 text-xs font-semibold text-brand-gold border border-brand-gold/30">
        <Camera size={14} />
        Choose files
      </span>
      <span className="truncate">
        PNG, JPG up to ~10MB each — references help a lot
      </span>
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        {...register}
      />
    </label>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl p-10 text-center bg-brand-black border border-brand-gold/20 shadow-2xl"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark text-brand-black">
        <Check size={28} strokeWidth={3} />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-white">
        Request received.
      </h3>
      <p className="mt-3 text-white/60 leading-relaxed max-w-sm mx-auto">
        Thanks for reaching out. I&apos;ll review your idea and reply within 48
        hours.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
      >
        Send another request
      </button>
    </motion.div>
  );
}
