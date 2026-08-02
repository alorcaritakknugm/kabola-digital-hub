import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatistikKesehatanView from "@/components/pages/StatistikKesehatanView";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "Statistik Kesehatan Kabola | Data CKG & Visualisasi · KKN-PPM UGM 2026",
  description:
    "Data hasil Cek Kesehatan Gratis (CKG) masyarakat Kabola dalam bentuk visualisasi statistik. Informasi status gizi, tekanan darah, dan kondisi kesehatan masyarakat Kabola, Alor NTT.",
  keywords: [
    "Statistik Kesehatan Kabola",
    "Cek Kesehatan Gratis Kabola",
    "CKG Kabola",
    "IMT Kabola",
    "Tekanan Darah Kabola",
    "Kesehatan Masyarakat Alor",
    "KKN UGM Kabola 2026",
  ],
  alternates: {
    canonical: "https://kaboladigitalhub.alorcarita.com/statistik/kesehatan",
  },
  openGraph: {
    title: "Statistik Kesehatan Kabola | Data CKG & Visualisasi Kesehatan",
    description:
      "Visualisasi data hasil Cek Kesehatan Gratis (CKG) masyarakat Kabola. Status gizi, tekanan darah, dan kondisi kesehatan dalam grafik interaktif.",
    url: "https://kaboladigitalhub.alorcarita.com/statistik/kesehatan",
  },
};

export default function StatistikKesehatanPage() {
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
              <HeartPulse className="w-8 h-8 text-kabola-teal-light" />
            </div>
            <span className="inline-block bg-white/10 text-white/70 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
              Cek Kesehatan Gratis (CKG)
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">
              Statistik <span className="text-kabola-teal-light">Kesehatan</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Data hasil pemeriksaan kesehatan gratis masyarakat Kabola disajikan dalam bentuk visualisasi statistik interaktif.
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
          <StatistikKesehatanView />
        </div>
      </section>

      <Footer />
    </main>
  );
}
