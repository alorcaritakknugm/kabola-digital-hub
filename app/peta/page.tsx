import Navbar from "@/components/Navbar";
import GisMap from "@/components/GisMap";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Interaktif GIS | Kabola Digital Hub",
  description: "Peta digital interaktif Kelurahan Kabola — administrasi wilayah, tematik komoditas, dan fasilitas kesehatan.",
};

export default function PetaPage() {
  return (
    <main className="min-h-screen bg-sand pt-28">
      <Navbar />
      <GisMap />
      <Footer />
    </main>
  );
}

