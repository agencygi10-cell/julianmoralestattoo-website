import type { Metadata } from "next";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Gallery — Julián Morales Tattoo",
  description:
    "Full gallery archive of black & gray realism tattoo work by Julián Morales. Documented pieces — fresh and healed.",
};

export default function GalleryPage() {
  return (
    <main>
      <Gallery />
    </main>
  );
}
