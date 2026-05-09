import type { Metadata } from "next";
import { ARTIST, FULL_ADDRESS, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — Julián Morales Tattoo",
  description:
    "Terms of Service for Julián Morales Tattoo — SMS messaging terms, services, deposits, and general terms.",
};

export default function TermsPage() {
  const PRIVACY_URL = `${SITE_URL}/privacy`;

  return (
    <main>
      <article className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6 lg:px-8 lg:pt-36">
        <div className="eyebrow mb-3">Legal</div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
          Terms of Service
        </h1>
        <p className="mt-3 text-white/60">
          {ARTIST.legalName}
          <br />
          <span className="text-sm">Effective Date: January 1, 2026</span>
        </p>

        <div className="mt-10 space-y-7 text-white/85 leading-relaxed">
          <h2 className="font-display text-2xl font-semibold text-white">
            SMS Messaging Terms &amp; Compliance
          </h2>

          <Section title="1. Program Description">
            <p>
              This messaging program sends appointment confirmation and
              reminder messages, as well as marketing messages when applicable,
              to customers who have interacted with {ARTIST.legalName} through
              our website at{" "}
              <a
                href={SITE_URL}
                className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
              >
                {SITE_URL}
              </a>{" "}
              and have explicitly opted in to receive SMS notifications.
            </p>
            <p>
              Opt-in is collected via web forms with separate dedicated
              checkboxes for:
            </p>
            <ul className="legal-list">
              <li>
                Service-related SMS consent (appointments, confirmations,
                reminders, rescheduling, customer support)
              </li>
              <li>
                Marketing SMS consent (promotions, special offers, and service
                updates)
              </li>
            </ul>
            <p>
              Marketing messages are sent only to users who have explicitly
              opted in through the marketing consent checkbox.
            </p>
            <p>Messages may include:</p>
            <ul className="legal-list">
              <li>Appointment confirmations</li>
              <li>Appointment reminders</li>
              <li>Rescheduling updates</li>
              <li>Customer support communications</li>
              <li>Promotions and special offers (only with explicit marketing consent)</li>
            </ul>
            <p>Consent is not a condition of purchase</p>
          </Section>

          <Section title="2. Cancellation Instructions">
            <p>
              You can cancel the SMS service at any time. Simply text
              &quot;STOP&quot; to the same number that sent you messages.
            </p>
            <p>
              Upon sending &quot;STOP,&quot; we will confirm your unsubscribe
              status via SMS. Following this confirmation, you will no longer
              receive SMS messages from us unless you re-opt in through our
              website.
            </p>
          </Section>

          <Section title="3. Support Information">
            <p>
              If you experience issues with the messaging program, reply with
              the keyword &quot;HELP&quot; for more assistance, or reach out
              directly to:
            </p>
            <p>
              Phone:{" "}
              <a
                href={`tel:${ARTIST.phoneRaw}`}
                className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
              >
                {ARTIST.phone}
              </a>
              <br />
              Email:{" "}
              <a
                href={`mailto:${ARTIST.email}`}
                className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
              >
                {ARTIST.email}
              </a>
            </p>
            <p>Customer support is available during regular business hours.</p>
          </Section>

          <Section title="4. Carrier Liability">
            <p>Carriers are not liable for delayed or undelivered messages.</p>
          </Section>

          <Section title="5. Message & Data Rates">
            <p>
              Message and data rates may apply for messages sent to you from us
              and to us from you.
            </p>
            <p>
              Message frequency varies based on your appointment schedule,
              service interactions, and marketing preferences.
            </p>
            <p>
              For questions about your text plan or data plan, contact your
              wireless provider.
            </p>
          </Section>

          <Section title="6. Age Restriction">
            <p>
              You must be 18 years or older to participate in our SMS program
              and receive tattoo services.
            </p>
          </Section>

          <Section title="7. Privacy Policy">
            <p>For privacy-related inquiries, please refer to our Privacy Policy at:</p>
            <p>
              <a
                href={PRIVACY_URL}
                className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
              >
                {PRIVACY_URL}
              </a>
            </p>
            <p>
              We comply with all applicable laws and regulations, including the
              Telephone Consumer Protection Act (TCPA) and CTIA guidelines,
              regarding the use of SMS communications.
            </p>
          </Section>

          <h2 className="font-display text-2xl font-semibold text-white pt-6">
            General Terms
          </h2>

          <p>
            This website (the &quot;Site&quot;) is owned and operated by{" "}
            {ARTIST.legalName} (&quot;Company,&quot; &quot;we,&quot; or
            &quot;us&quot;).
          </p>
          <p>
            By using the Site, you agree to be bound by these Terms of Service
            and our Privacy Policy.
          </p>

          <Section title="Services">
            <p>
              {ARTIST.legalName} provides professional tattoo services by
              appointment only.
            </p>
            <p>All tattoo designs require client approval prior to service.</p>
          </Section>

          <Section title="Appointments & Deposits">
            <p>Appointments must be scheduled in advance.</p>
            <p>Deposits may be required to secure a booking.</p>
            <p>Deposits are non-refundable unless otherwise agreed in writing.</p>
            <p>
              Failure to appear or late cancellation may result in loss of
              deposit.
            </p>
          </Section>

          <Section title="Intellectual Property Rights">
            <p>
              All artwork, branding, website content, and designs are the
              property of {ARTIST.legalName} unless otherwise agreed in writing.
            </p>
            <p>Unauthorized reproduction or distribution is prohibited.</p>
          </Section>

          <Section title="Disclaimers">
            <p>Tattoo services are provided &quot;as is.&quot;</p>
            <p>{ARTIST.legalName} is not responsible for:</p>
            <ul className="legal-list">
              <li>Allergic reactions</li>
              <li>Healing complications</li>
              <li>Failure to follow aftercare instructions</li>
              <li>Dissatisfaction after final design approval</li>
            </ul>
            <p>Clients are responsible for disclosing relevant medical conditions.</p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms of Service shall be governed by the laws of the State
              of California.
            </p>
          </Section>

          <Section title="Changes to Terms of Service">
            <p>
              We may update these Terms of Service from time to time. The
              latest version will always be available on our website with the
              effective date.
            </p>
          </Section>

          <Section title="Contact Information">
            <p>
              {ARTIST.legalName}
              <br />
              {FULL_ADDRESS}
              <br />
              Phone:{" "}
              <a
                href={`tel:${ARTIST.phoneRaw}`}
                className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
              >
                {ARTIST.phone}
              </a>
              <br />
              Email:{" "}
              <a
                href={`mailto:${ARTIST.email}`}
                className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold-light"
              >
                {ARTIST.email}
              </a>
            </p>
          </Section>

          <p className="pt-4 text-white/60 italic">
            By using our website and services, you consent to these Terms of
            Service.
          </p>
        </div>
      </article>

      <style>{`
        .legal-list {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 0.75rem 0;
          color: rgba(255, 255, 255, 0.85);
        }
        .legal-list li { margin: 0.4rem 0; }
      `}</style>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-display text-xl font-semibold text-white mb-3 mt-6">
        {title}
      </h3>
      <div className="space-y-3 text-white/85">{children}</div>
    </section>
  );
}
