import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Guarantee from "@/components/Guarantee";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TrustStrip />
      <About />
      <Process />
      <Portfolio />
      <Guarantee />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
