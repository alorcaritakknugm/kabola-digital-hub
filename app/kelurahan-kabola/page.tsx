import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { MapPin, Mountain, Trees, ArrowRight } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { profilDesaQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelurahan Kabola | Profil & Potensi Desa Alor NTT · KKN-PPM UGM 2026",
  description:
    "Profil lengkap Kelurahan Kabola sebagai pusat administrasi Kecamatan Kabola, Kabupaten Alor, NTT. Potensi pariwisata, budaya, dan agrikultur. Program KKN-PPM UGM 2026.",
  keywords: [
    "Kelurahan Kabola", "profil desa Kabola", "Kecamatan Kabola Alor",
    "potensi desa NTT", "administrasi Kabola", "KKN UGM Kelurahan Kabola",
  ],
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com/kelurahan-kabola" },
  openGraph: {
    title: "Kelurahan Kabola | Profil & Potensi Desa Alor NTT",
    description: "Profil Kelurahan Kabola sebagai pusat administrasi Kecamatan Kabola, Alor NTT.",
    url: "https://kaboladigitalhub.alorcarita.com/kelurahan-kabola",
  },
};

export const revalidate = 60;

// Fallback statis jika data Sanity belum diisi
const FALLBACK_JUDUL = "Kelurahan Kabola";
const FALLBACK_KONTEN =
  "Pusat administrasi dari Kecamatan Kabola, Kabupaten Alor. Terletak di dataran yang lebih tinggi, kelurahan ini menyuguhkan panorama perbukitan hijau yang berpadu dengan udara sejuk, memberikan pengalaman tersendiri bagi siapa saja yang berkunjung.\n\nMasyarakat Kelurahan Kabola sangat erat memegang tradisi leluhur. Mulai dari gastronomi tradisional hingga pengetahuan tentang tanaman obat (etnofarmakologi), kearifan lokal masih menjadi bagian tak terpisahkan dari denyut nadi kehidupan sehari-hari warga.";
const FALLBACK_POTENSI = [
  {
    judulPotensi: "Pariwisata Terintegrasi",
    deskripsiPotensi:
      "Kelurahan Kabola menjadi pintu gerbang bagi wisatawan yang ingin menjelajahi wisata alam dan budaya Alor. Dengan terbentuknya rute-rute tematik, pengunjung diajak menikmati pesona alam sekaligus interaksi langsung dengan budaya masyarakat lokal.",
  },
  {
    judulPotensi: "Budaya & Tradisi",
    deskripsiPotensi:
      "Kekayaan cerita budaya berupa makanan khas, dongeng rakyat, hingga pemanfaatan tanaman lokal terus dilestarikan. Hal ini bukan saja menjadi kebanggaan warga, tetapi juga nilai tambah bagi identitas Kabola di kancah yang lebih luas.",
  },
];

export default async function KelurahanKabola() {
  // Fetch dari Sanity; jika gagal/kosong, gunakan fallback
  let data: any = null;
  try {
    data = await client.fetch(profilDesaQuery, { tipe: "kabola" });
  } catch (_) { }

  const judul = data?.judul || FALLBACK_JUDUL;
  const konten = data?.konten || FALLBACK_KONTEN;
  const potensiList =
    data?.potensi && data.potensi.length > 0 ? data.potensi : FALLBACK_POTENSI;

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-forest pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10 text-center">
          <SlideUp delay={0}>
            <span className="inline-block bg-white/10 text-white/70 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
              Kecamatan Kabola
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">
              {judul}
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Pusat administrasi dengan bentang alam menawan, kekayaan budaya yang otentik, dan semangat masyarakat yang terus bergerak maju.
            </p>
          </SlideUp>
        </div>
        <div className="wave-bottom pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#F7F3EB" />
          </svg>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16 md:py-20 dot-pattern">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-12">

          {/* Main Description */}
          <SlideUp
            delay={0.1}
            inView={true}
            className="bg-white rounded-3xl p-8 md:p-12 border border-kabola-teal/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
          >
            <h2 className="font-title text-2xl md:text-3xl text-forest mb-6">Sekilas Tentang {judul}</h2>
            <div className="space-y-4 text-earth/70 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
              {konten}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-forest/5">
                <Mountain className="w-6 h-6 text-forest mb-2" />
                <span className="font-medium text-forest text-sm">Topografi Berbukit</span>
                <span className="text-xs text-earth/60 mt-1">Panorama alam hijau</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-kabola-teal/5">
                <Trees className="w-6 h-6 text-kabola-teal mb-2" />
                <span className="font-medium text-forest text-sm">Kekayaan Alam</span>
                <span className="text-xs text-earth/60 mt-1">Potensi agrikultur</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-ocean-blue/5">
                <MapPin className="w-6 h-6 text-ocean-blue mb-2" />
                <span className="font-medium text-forest text-sm">Pusat Administrasi</span>
                <span className="text-xs text-earth/60 mt-1">Jantung Kecamatan Kabola</span>
              </div>
            </div>
          </SlideUp>

          {/* Potensi Kelurahan */}
          {potensiList && potensiList.length > 0 && (
            <SlideUp
              delay={0.2}
              inView={true}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {potensiList.map((potensi: any, idx: number) => (
                <div key={idx} className="bg-white rounded-3xl p-8 border border-kabola-teal/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <h3 className="font-title text-xl text-forest mb-4">{potensi.judulPotensi}</h3>
                  <p className="text-earth/65 text-sm leading-relaxed whitespace-pre-wrap">
                    {potensi.deskripsiPotensi}
                  </p>
                </div>
              ))}
            </SlideUp>
          )}

          <div className="text-center pt-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-kabola-teal hover:text-kabola-teal-dark transition-colors font-medium">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
