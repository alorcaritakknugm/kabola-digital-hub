import Navbar from "@/components/layout/Navbar";
import GisMap from "@/components/pages/GisMap";
import HerbalMap from "@/components/pages/HerbalMap";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Interaktif GIS Kabola | Peta Wilayah Alor NTT · KKN-PPM UGM 2026",
  description:
    "Peta digital interaktif GIS Kecamatan Kabola, Alor NTT — peta administrasi wilayah, tematik komoditas, destinasi wisata, dan Peta Herbal Digital etnofarmakologi. Program KKN-PPM UGM 2026.",
  keywords: [
    "peta GIS Alor", "peta interaktif Kabola", "peta wilayah Alor NTT",
    "peta herbal Alor", "GIS Kabola", "KKN UGM peta digital",
    "etnofarmakologi peta NTT",
  ],
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com/peta" },
  openGraph: {
    title: "Peta Interaktif GIS Kabola | Alor NTT",
    description: "Peta digital GIS Kecamatan Kabola, Alor NTT — wilayah, wisata, dan herbal digital.",
    url: "https://kaboladigitalhub.alorcarita.com/peta",
  },
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
