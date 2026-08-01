import type { Metadata } from "next";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Contact — Julian Morales Tattoo",
  description:
    "Book a consultation with Julian Morales. Send your tattoo idea, references, and details — response within 48 hours, in English or Spanish.",
};

export default function ContactPage() {
  return (
    <main className="relative bg-brand-black">
      <Contact />
      <FAQ />
    </main>
  );
}
