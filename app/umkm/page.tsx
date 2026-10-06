import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { umkmLokalQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import UmkmGrid from "@/components/pages/UmkmGrid";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Katalog UMKM Lokal | Produk Khas Alor · KKN-PPM UGM 2026",
  description:
    "Katalog visual UMKM lokal Kecamatan Kabola, Alor NTT. Produk kerajinan, kuliner, dan karya warga asli Kabola hasil program KKN-PPM UGM 2026. Beli langsung dari perajin dan pendukung UMKM Alor.",
  keywords: [
    "UMKM Alor", "produk lokal Alor", "kerajinan NTT", "kuliner Alor",
    "UMKM Kabola", "KKN UGM UMKM", "beli produk Alor",
  ],
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com/umkm" },
  openGraph: {
    title: "Katalog UMKM Lokal Kabola, Alor | Kabola Digital Hub",
    description: "Produk kerajinan, kuliner, dan karya warga asli Kabola, Alor NTT.",
    url: "https://kaboladigitalhub.alorcarita.com/umkm",
  },
};

export default async function UmkmPage() {
  let umkmList: any[] = [];
  try {
    const res = await client.fetch(umkmLokalQuery);
    if (Array.isArray(res)) {
      umkmList = res;
    }
  } catch (e) {
    console.error("Sanity fetch error umkmLokal:", e);
  }

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      <section className="relative bg-ocean-blue pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center relative z-10">
          <SlideUp delay={0}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-kabola-teal-light" />
            </div>
            <span className="inline-block bg-white/10 text-white/70 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
              Kecamatan Kabola · Ekonomi Lokal
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">Katalog Visual <span className="text-kabola-teal-light">UMKM Lokal</span></h1>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Dokumentasi produk lokal UMKM Kabola. Dukung ekonomi lokal dengan membeli langsung dari para perajin dan pembuatnya.
            </p>
          </SlideUp>
        </div>
        <div className="wave-bottom pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20"><path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#F7F3EB" /></svg>
        </div>
      </section>
      
      <section className="py-16 md:py-24 dot-pattern">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <UmkmGrid umkmList={umkmList} isNttMart={false} />
          
          {/* Banner Promo CatatIn POS */}
          <div className="mt-14 bg-gradient-to-br from-forest to-forest-light text-white rounded-3xl p-6 sm:p-10 border border-kabola-teal/20 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-kabola-teal/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center md:text-left max-w-xl">
                <span className="inline-block bg-kabola-teal/20 text-kabola-teal-light text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-kabola-teal/30">
                  Inovasi Digitalisasi UMKM
                </span>
                <h3 className="font-title text-2xl sm:text-3xl text-white">
                  Kelola Kasir & Pembukuan Praktis dengan CatatIn
                </h3>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed font-body">
                  Aplikasi kasir (POS) dan pembukuan offline-first untuk Android & Windows. 100% tanpa kuota internet, gratis, dan menjaga kerahasiaan data usaha Anda.
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <Link
                  href="/umkm/catatin"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-kabola-teal hover:bg-kabola-teal-light text-white text-sm font-semibold text-center transition-all duration-200 shadow-md hover:scale-105"
                >
                  Lihat Detail & Unduh
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-kabola-teal font-medium hover:text-kabola-teal-dark transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

