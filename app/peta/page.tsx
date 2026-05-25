import Navbar from "@/components/layout/Navbar";
import GisMap from "@/components/pages/GisMap";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Interaktif GIS | Kabola Digital Hub",
  description: "Peta digital interaktif Kelurahan Kabola — administrasi wilayah, tematik komoditas, dan fasilitas kesehatan.",
};

export default function PetaPage() {
  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      <GisMap />
      <Footer />
    </main>
  );
}

