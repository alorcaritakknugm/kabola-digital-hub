import Navbar from "@/components/layout/Navbar";
import GisMap from "@/components/pages/GisMap";
import HerbalMap from "@/components/pages/HerbalMap";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Album & Peta Interaktif GIS Kabola | Peta Wilayah Alor NTT · KKN-PPM UGM 2026",
  description:
    "Album Peta Digital GIS Kelurahan Kabola & Pante Deere, Alor NTT yang menyajikan peta administrasi batas RT, kontur, jenis tanah, tutupan lahan, serta zonasi mitigasi bencana alam (cuaca ekstrem, karhutla, abrasi, longsor, kekeringan). Unduh peta resolusi tinggi.",
  keywords: [
    "peta GIS Alor", "peta interaktif Kabola", "peta wilayah Alor NTT",
    "peta mitigasi bencana Kabola", "peta bahaya bencana Alor", "peta batas RT Kabola",
    "peta herbal Alor", "GIS Kabola", "KKN UGM peta digital",
    "etnofarmakologi peta NTT",
  ],
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com/peta" },
  openGraph: {
    title: "Album & Peta Interaktif GIS Kabola | Alor NTT",
    description: "Peta digital GIS Kelurahan Kabola & Pante Deere, Alor NTT yang mencakup administrasi, geografi, mitigasi bencana, dan herbal digital.",
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
