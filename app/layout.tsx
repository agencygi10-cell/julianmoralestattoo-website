import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundFX from "@/components/BackgroundFX";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Julián Morales — Black & Gray Realism Tattoo Artist · San José, CA",
  description:
    "Custom black & gray realism tattoos by Julián Morales — portraits, religious imagery, and memorial pieces. Based in San José, California. Bilingual EN/ES. By appointment only.",
  keywords: [
    "tattoo artist San Jose",
    "black and gray realism",
    "portrait tattoo",
    "memorial tattoo",
    "Bay Area tattoo artist",
    "Julian Morales tattoo",
  ],
  openGraph: {
    title: "Julián Morales — Black & Gray Realism Tattoo Artist",
    description:
      "Custom black & gray realism tattoos in San José, California. Portraits, religious imagery, memorial pieces.",
    type: "website",
    locale: "en_US",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body>
        <BackgroundFX />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
