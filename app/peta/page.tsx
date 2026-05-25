import Navbar from "@/components/layout/Navbar";
import GisMap from "@/components/pages/GisMap";
import HerbalMap from "@/components/pages/HerbalMap";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Interaktif GIS | Kabola Digital Hub",
  description: "Peta digital interaktif Kelurahan Kabola — administrasi wilayah, tematik komoditas, destinasi wisata, dan Peta Herbal Digital etnofarmakologi.",
};

export default function PetaPage() {
  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      <GisMap />
      <HerbalMap />
      <Footer />
    </main>
  );
}
