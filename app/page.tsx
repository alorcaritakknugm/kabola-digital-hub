import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ExploreKabola from "@/components/sections/ExploreKabola";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kabola Digital Hub | KKN-PPM UGM 2026",
  description:
    "Portal digital resmi KKN-PPM UGM 2026 Kecamatan Kabola, Alor NTT. Akses data statistik demografi, kesehatan (CKG), peternakan, potensi wisata, produk UMKM lokal, cerita budaya, dan peta GIS interaktif. Program Alor Carita UGM.",
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com" },
  openGraph: {
    title: "Kabola Digital Hub | KKN-PPM UGM 2026",
    description:
      "Portal digital resmi KKN-PPM UGM 2026 Kecamatan Kabola, Alor NTT. Data statistik demografi, kesehatan, peternakan, wisata, produk UMKM, cerita budaya, dan peta interaktif.",
    url: "https://kaboladigitalhub.alorcarita.com",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <ExploreKabola />
      <Contact />
      <Footer />
    </main>
  );
}
