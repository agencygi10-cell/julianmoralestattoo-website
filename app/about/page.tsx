import type { Metadata } from "next";
import About from "@/components/About";
import Process from "@/components/Process";
import Guarantee from "@/components/Guarantee";
import VideoShowcase from "@/components/VideoShowcase";

export const metadata: Metadata = {
  title: "About — Julián Morales Tattoo",
  description:
    "About Julián Morales — black & gray realism tattoo artist in San Jose, CA. Specialty in portraits, religious imagery, and memorial pieces. The process, the Black Ink Guarantee, and how I work.",
};

export default function AboutPage() {
  return (
    <main>
      <About />
      <Process />
      <Guarantee />
      <VideoShowcase />
    </main>
  );
}
