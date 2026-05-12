import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";

export const metadata: Metadata = {
  title: "Portfolio — Julián Morales Tattoo",
  description:
    "Selected work from Julián Morales — black & gray realism tattoo pieces. Portraits, religious imagery, and memorial work.",
};

export default function PortfolioPage() {
  return (
    <main className="relative bg-white">
      <Portfolio light />
    </main>
  );
}
