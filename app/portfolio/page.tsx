import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";

export const metadata: Metadata = {
  title: "Portfolio — Julian Morales Tattoo",
  description:
    "Selected work from Julian Morales — black & gray realism tattoo pieces. Portraits, religious imagery, and memorial work.",
};

export default function PortfolioPage() {
  return (
    <main className="relative bg-brand-black">
      <Portfolio />
    </main>
  );
}
