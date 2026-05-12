"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Home, QrCode, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    icon: Home,
    title: "Profil Desa Pante Deere",
    tag: "Infrastruktur Digital",
    desc: "Website profil desa modern dibangun dengan Astro + Tailwind CSS, di-deploy ke GitHub Pages — gratis permanen tanpa biaya hosting. Dilengkapi Decap CMS agar perangkat desa bisa update konten mandiri via browser.",
    features: [
      "Astro + Tailwind CSS",
      "Deploy GitHub Pages (gratis permanen)",
      "Decap CMS — update tanpa koding",
      "Pengembangan pre-KKN dari Jogja",
    ],
    href: "/pante-deere",
  },
  {
    icon: QrCode,
    title: "Papan Informasi Wisata & QR Code",
    tag: "Media Fisik",
    desc: "Papan akrilik tahan cuaca berisi informasi wisata yang bisa dibaca siapapun tanpa HP. QR Code terintegrasi mengarah ke halaman /wisata di Kabola Digital Hub — konten bisa diupdate tanpa ganti papan.",
    features: [
      "Papan akrilik tahan cuaca",
      "QR Code → /wisata Kabola Hub",
      "Bisa dibaca tanpa HP",
      "Target: wisatawan Alor & diver",
    ],
    href: "/pante-deere/papan-info",
  },
  {
    icon: ShoppingBag,
    title: "Katalog Visual UMKM",
    tag: "Ekonomi Lokal",
    desc: "Dokumentasi produk lokal UMKM Kabola dalam visual yang layak pakai HP + cahaya alami. Katalog PDF didistribusikan via WhatsApp dan print fisik terbatas dipasang di titik strategis desa.",
    features: [
      "Foto produk (HP + cahaya alami)",
      "Katalog PDF via WhatsApp",
      "Print fisik di printer kelurahan",
      "Dipasang di titik strategis desa",
    ],
    href: "/pante-deere/umkm",
  },
];

export default function PanteDeere() {
  return (
    <main className="min-h-screen bg-sand pt-28">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-ocean-blue pt-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 md:px-8 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-white/10 text-white/60 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-white/10">
              Kec. Kabola · Desa Pante Deere
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">
              Desa <span className="text-kabola-teal-light">Pante Deere</span>
            </h1>
            <p className="text-white/55 max-w-lg mx-auto text-sm leading-relaxed">
              Tiga program kerja KKN-PPM UGM 2026 yang membangun infrastruktur digital,
              media informasi wisata, dan promosi ekonomi lokal di Desa Pante Deere.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#FFFAF6" />
          </svg>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 md:py-20 dot-pattern">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-5">
          {programs.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-kabola-teal/10 shadow-[0_2px_16px_rgba(25,141,141,0.05)] p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-kabola-teal/10 flex items-center justify-center">
                  <prog.icon className="w-5 h-5 text-kabola-teal" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-kabola-teal/55 bg-kabola-teal/8 px-2.5 py-1 rounded-full">
                  {prog.tag}
                </span>
              </div>
              <h3 className="font-title text-xl md:text-2xl text-forest mb-3">{prog.title}</h3>
              <p className="text-earth/60 text-sm leading-relaxed mb-5">{prog.desc}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {prog.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-xs text-earth/55">
                    <div className="w-1.5 h-1.5 rounded-full bg-kabola-teal mt-1.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <div className="text-center pt-4">
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

