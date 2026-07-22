import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { Store, ArrowRight } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { nttMartQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import UmkmGrid from "@/components/pages/UmkmGrid";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "NTT Mart | Produk Pilihan NTT · Kabupaten Alor",
  description:
    "Katalog produk NTT Mart di Kabupaten Alor, NTT. Temukan produk-produk pilihan khas Nusa Tenggara Timur yang tersedia di NTT Mart, program KKN-PPM UGM 2026.",
  keywords: [
    "NTT Mart", "NTT Mart Alor", "produk NTT", "belanja NTT",
    "toko lokal Alor", "oleh-oleh Alor", "KKN UGM NTT Mart",
  ],
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com/umkm/ntt-mart" },
  openGraph: {
    title: "NTT Mart | Produk Pilihan NTT",
    description: "Produk pilihan khas NTT tersedia di NTT Mart, Kabupaten Alor.",
    url: "https://kaboladigitalhub.alorcarita.com/umkm/ntt-mart",
  },
};

export default async function NttMartPage() {
  const umkmList = await client.fetch(nttMartQuery);

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      <section className="relative bg-ocean-blue pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center relative z-10">
          <SlideUp delay={0}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-kabola-teal-light" />
            </div>
            <span className="inline-block bg-white/10 text-white/70 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
              Kabupaten Alor · NTT Mart
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">Katalog Visual <span className="text-kabola-teal-light">NTT Mart</span></h1>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Wadah produk-produk unggulan pilihan khas Nusa Tenggara Timur (NTT) buatan perajin dan pelaku usaha lokal dari seluruh Kabupaten Alor.
            </p>
          </SlideUp>
        </div>
        <div className="wave-bottom pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20"><path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#F7F3EB" /></svg>
        </div>
      </section>
      
      <section className="py-16 md:py-24 dot-pattern">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <UmkmGrid umkmList={umkmList} isNttMart={true} />
          
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
