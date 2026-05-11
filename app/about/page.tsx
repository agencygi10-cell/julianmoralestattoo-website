import type { Metadata } from "next";
import About from "@/components/About";
import Process from "@/components/Process";

export const metadata: Metadata = {
  title: "About — Julián Morales Tattoo",
  description:
    "About Julián Morales — black & gray realism tattoo artist in San José, California. Specialty in portraits, religious imagery, and memorial pieces.",
};

export default function AboutPage() {
  return (
    <main className="relative bg-white">
      <About light />
      <Process light />
    </main>
  );
}
