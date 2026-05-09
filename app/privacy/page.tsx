import type { Metadata } from "next";
import { ARTIST, FULL_ADDRESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Julián Morales Tattoo",
  description:
    "Privacy Policy for Julián Morales Tattoo — how we collect, use, and protect your personal and SMS information.",
};

export default function PrivacyPage() {
  return (
    <main>
      <article className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6 lg:px-8 lg:pt-36">
        <div className="eyebrow mb-3">Legal</div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
          Privacy Policy
        </h1>
        <p className="mt-3 text-white/60">
          {ARTIST.legalName}
          <br />
          <span className="text-sm">Effective Date: January 1, 2026</span>
        </p>

        <div className="mt-10 space-y-7 text-white/85 leading-relaxed">
          <p>
            {ARTIST.legalName} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your
            privacy and is committed to protecting your personal information.
          </p>

          <Section title="1. Information We Collect">
            <p>
              We may collect the following information when you use our website
              or book an appointment:
            </p>

            <h3 className="legal-h3">Personal Information</h3>
            <ul className="legal-list">
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Tattoo design details</li>
              <li>Appointment information</li>
              <li>Uploaded images</li>
              <li>Communication consent records and timestamps</li>
            </ul>

            <h3 className="legal-h3">Technical Information</h3>
            <ul className="legal-list">
              <li>IP address</li>
              <li>Browser and device information</li>
              <li>Website usage data through cookies and analytics tools</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use your information to:</p>
            <ul className="legal-list">
              <li>Schedule and manage appointments</li>
              <li>Send appointment confirmations and reminders</li>
              <li>Respond to inquiries</li>
              <li>Provide customer support</li>
              <li>Send service-related notifications</li>
              <li>Maintain records of communication consent</li>
            </ul>
            <p>We do not sell or rent your personal information.</p>
          </Section>

          <Section title="3. SMS Messaging & Consent">
            <p>
              By submitting a form on our website and selecting one of the SMS
              consent checkboxes, you consent to receive SMS messages from{" "}
              {ARTIST.legalName} related to:
            </p>
            <ul className="legal-list">
              <li>Appointment confirmations</li>
              <li>Appointment reminders</li>
              <li>Rescheduling updates</li>
              <li>Service-related notifications</li>
              <li>Customer support responses</li>
            </ul>

            <h3 className="legal-h3">Important SMS Disclosures:</h3>
            <ul className="legal-list">
              <li>Message frequency may vary.</li>
              <li>Message and data rates may apply.</li>
              <li>You may reply STOP at any time to opt out.</li>
              <li>You may reply HELP for assistance.</li>
              <li>Opt-out requests are processed immediately.</li>
              <li>
                We maintain timestamped records of all SMS opt-ins for
                compliance purposes.
              </li>
            </ul>
          </Section>

          <Section title="4. Mobile Information Protection">
            <p>
              We DO NOT share mobile information, phone numbers, or SMS consent
              data with third parties for marketing or promotional purposes.
            </p>
            <p>
              All text messaging originator opt-in data and consent records are
              kept strictly confidential.
            </p>
            <p>
              Mobile information is used only to send messages that you have
              opted in to receive (appointment/service messages, and
              promotional messages only if you selected marketing consent).
            </p>
          </Section>

          <Section title="5. Information Sharing">
            <p>We may share information only with:</p>
            <ul className="legal-list">
              <li>Payment processors (if applicable)</li>
              <li>Scheduling and CRM platforms</li>
              <li>SMS delivery providers for message transmission</li>
            </ul>
            <p>
              All service providers are required to protect your information
              and use it only for operational purposes.
            </p>
            <p>SMS opt-in data is never shared beyond message delivery providers.</p>
          </Section>

          <Section title="6. Data Security">
            <p>
              We implement reasonable administrative, technical, and physical
              safeguards to protect your personal information.
            </p>
            <p>
              However, no online transmission can be guaranteed to be 100%
              secure.
            </p>
          </Section>

          <Section title="7. Cookies & Analytics">
            <p>Our website may use cookies and similar technologies to:</p>
            <ul className="legal-list">
              <li>Improve user experience</li>
              <li>Analyze website traffic</li>
              <li>Enhance site functionality</li>
            </ul>
            <p>You may disable cookies in your browser settings.</p>
          </Section>

          <Section title="8. Your Rights">
            <p>You may:</p>
            <ul className="legal-list">
              <li>Request access to your personal information</li>
              <li>Request correction or deletion</li>
              <li>Withdraw SMS consent at any time by replying STOP</li>
            </ul>
            <p>To exercise your rights, contact us using the information below.</p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy periodically. The updated
              version will include the effective date.
            </p>
          </Section>

          <Section title="10. Contact Information">
            <p>
              {ARTIST.legalName}
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
              <br />
              Address: {FULL_ADDRESS}
            </p>
          </Section>
        </div>
      </article>

      <style>{`
        .legal-h3 {
          margin-top: 1.5rem;
          font-family: var(--font-cinzel);
          font-size: 1.05rem;
          font-weight: 600;
          color: #ffffff;
        }
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
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
        {title}
      </h2>
      <div className="space-y-3 text-white/85">{children}</div>
    </section>
  );
}
