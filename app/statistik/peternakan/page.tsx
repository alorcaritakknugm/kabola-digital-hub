import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatistikPeternakanView from "@/components/pages/StatistikPeternakanView";
import type { Metadata } from "next";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { BarChart3 } from "lucide-react";

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
    <main className="min-h-screen bg-sand text-navy">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-forest pt-32 pb-28 overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-kabola-teal/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10 text-center">
          <SlideUp delay={0}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-kabola-teal-light" />
            </div>
            <span className="inline-block bg-white/10 text-white/70 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
              Visualisasi Data Peternakan
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">
              Statistik <span className="text-kabola-teal-light">Hewan Ternak</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Eksplorasi data dan analisis pengelompokan wilayah Kabupaten Alor berdasarkan potensi hewan ternak.
            </p>
          </SlideUp>
        </div>

        <div className="wave-bottom pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#F7F3EB" />
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 dot-pattern relative">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <StatistikPeternakanView />
        </div>
      </section>

      <Footer />
    </main>
  );
}
