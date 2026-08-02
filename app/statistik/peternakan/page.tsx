import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatistikPeternakanView from "@/components/pages/StatistikPeternakanView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistik Hewan Ternak | Kabola Digital Hub · KKN-PPM UGM 2026",
  description:
    "Data statistik dan persebaran klaster populasi hewan ternak (Sapi, Kambing, Babi, Ayam, dll) di Kabupaten Alor berdasarkan analisis K-Medoids Clustering.",
  keywords: [
    "statistik hewan ternak", "peternakan alor", "populasi ternak kabola",
    "clustering peternakan", "KKN UGM peternakan"
  ],
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com/statistik/peternakan" },
};

export default function StatistikPeternakanPage() {
  return (
    <main className="min-h-screen bg-sand flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-kabola-teal/5" />
        <div className="absolute inset-0 bg-[url('/ornaments/ornament-cyan.svg')] opacity-10 bg-repeat bg-[length:120px]" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-[1200px] text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-kabola-teal/10 text-kabola-teal font-medium text-xs sm:text-sm mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-kabola-teal" />
            Data Peternakan
          </div>
          <h1 className="font-title text-4xl sm:text-5xl md:text-6xl text-ocean-blue leading-tight mb-4 sm:mb-6">
            Statistik Hewan Ternak
          </h1>
          <p className="text-earth text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Eksplorasi data dan analisis pengelompokan wilayah Kabupaten Alor berdasarkan potensi hewan ternak.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 md:py-20 relative z-10 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-[1200px]">
          <StatistikPeternakanView />
        </div>
      </section>

      <Footer />
    </main>
  );
}
