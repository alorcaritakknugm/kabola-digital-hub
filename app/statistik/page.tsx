import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatistikView from "@/components/pages/StatistikView";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Statistik Digital Kabola | Data Demografi & Grafik Interaktif · KKN-PPM UGM 2026",
  description:
    "Data dan grafik statistik interaktif Kecamatan Kabola dan Kelurahan Kabola, Kabupaten Alor, NTT. Informasi lengkap jumlah penduduk, kependudukan, gender, agama, pendidikan, dan pekerjaan.",
  keywords: [
    "Statistik Kabola",
    "Data Penduduk Kabola",
    "Demografi Kelurahan Kabola",
    "Grafik Statistik Alor",
    "Pendidikan Kabola",
    "Pekerjaan Penduduk Kabola",
    "KKN UGM Kabola 2026",
  ],
  alternates: {
    canonical: "https://kaboladigitalhub.alorcarita.com/statistik",
  },
  openGraph: {
    title: "Statistik Digital Kabola | Data & Grafik Demografi Interaktif",
    description:
      "Portal statistik resmi Kecamatan Kabola dan Kelurahan Kabola, Alor NTT. Data interaktif kependudukan, gender, agama, pendidikan, dan pekerjaan.",
    url: "https://kaboladigitalhub.alorcarita.com/statistik",
  },
};

export default function StatistikPage() {
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
              Visualisasi Data & Demografi
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">
              Statistik <span className="text-kabola-teal-light">Kabola</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Eksplorasi data demografi, geografis, pendidikan, dan pekerjaan untuk Kecamatan Kabola, Kelurahan Kabola, serta Desa Pante Deere.
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
          <StatistikView />
        </div>
      </section>

      <Footer />
    </main>
  );
}
