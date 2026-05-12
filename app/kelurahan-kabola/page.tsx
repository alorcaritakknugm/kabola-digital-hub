"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Mountain, Trees, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function KelurahanKabola() {
  return (
    <main className="min-h-screen bg-sand pt-28">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-forest pt-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 md:px-8 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-white/10 text-white/60 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-white/10">
              Kecamatan Kabola
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">
              Kelurahan <span className="text-kabola-teal-light">Kabola</span>
            </h1>
            <p className="text-white/55 max-w-lg mx-auto text-sm leading-relaxed">
              Pusat administrasi dengan bentang alam menawan, kekayaan budaya yang otentik, dan semangat masyarakat yang terus bergerak maju.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#FFFAF6" />
          </svg>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16 md:py-20 dot-pattern">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-12">
          
          {/* Main Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-kabola-teal/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
          >
            <h2 className="font-title text-2xl md:text-3xl text-forest mb-6">Sekilas Tentang Kelurahan Kabola</h2>
            <div className="space-y-4 text-earth/70 leading-relaxed text-sm md:text-base">
              <p>
                Kelurahan Kabola adalah pusat administrasi dari Kecamatan Kabola, Kabupaten Alor. Terletak di dataran yang lebih tinggi, kelurahan ini menyuguhkan panorama perbukitan hijau yang berpadu dengan udara sejuk, memberikan pengalaman tersendiri bagi siapa saja yang berkunjung.
              </p>
              <p>
                Masyarakat Kelurahan Kabola sangat erat memegang tradisi leluhur. Mulai dari gastronomi tradisional hingga pengetahuan tentang tanaman obat (etnofarmakologi), kearifan lokal masih menjadi bagian tak terpisahkan dari denyut nadi kehidupan sehari-hari warga.
              </p>
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
          </motion.div>

          {/* Potensi Kelurahan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-3xl p-8 border border-kabola-teal/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <h3 className="font-title text-xl text-forest mb-4">Pariwisata Terintegrasi</h3>
              <p className="text-earth/65 text-sm leading-relaxed">
                Kelurahan Kabola menjadi pintu gerbang bagi wisatawan yang ingin menjelajahi wisata alam dan budaya Alor. Dengan terbentuknya rute-rute tematik, pengunjung diajak menikmati pesona alam sekaligus interaksi langsung dengan budaya masyarakat lokal.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-kabola-teal/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <h3 className="font-title text-xl text-forest mb-4">Budaya & Tradisi</h3>
              <p className="text-earth/65 text-sm leading-relaxed">
                Kekayaan <i>storynomics</i> berupa makanan khas, dongeng rakyat, hingga pemanfaatan tanaman lokal terus dilestarikan. Hal ini bukan saja menjadi kebanggaan warga, tetapi juga nilai tambah (added value) bagi identitas Kabola di kancah yang lebih luas.
              </p>
            </div>
          </motion.div>

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
