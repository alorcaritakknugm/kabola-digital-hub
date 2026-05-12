"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UmkmPage() {
  return (
    <main className="min-h-screen bg-sand pt-28">
      <Navbar />
      <section className="relative bg-ocean-blue pt-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-kabola-teal-light" />
            </div>
            <span className="inline-block bg-white/10 text-white/60 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
              Kecamatan Kabola · Ekonomi Lokal
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">Katalog Visual UMKM</h1>
            <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed">
              Dokumentasi produk lokal UMKM Kabola dalam katalog PDF yang mudah dibagikan via WhatsApp dan dicetak fisik.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16"><path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#FFFAF6" /></svg>
        </div>
      </section>
      <section className="py-16 dot-pattern">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-kabola-teal/12 p-8 text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-kabola-teal animate-pulse" />
              Segera Hadir — Foto & Desain Menyusul
            </span>
            <p className="text-earth/60 text-sm leading-relaxed max-w-sm mx-auto">
              Katalog produk UMKM akan diisi setelah sesi dokumentasi lapangan saat KKN berlangsung.
            </p>
          </motion.div>
          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-kabola-teal font-medium">
              <ArrowRight className="w-4 h-4 rotate-180" /> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

