"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Map, BookOpen, Compass, Home, QrCode, ShoppingBag, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: Map,
    title: "Peta Interaktif GIS",
    desc: "Peta digital wilayah Kabola — administrasi, sebaran komoditas, dan fasilitas kesehatan dalam satu platform interaktif.",
    href: "/peta",
  },
  {
    icon: BookOpen,
    title: "Storynomics Digital",
    desc: "Digitalisasi budaya, gastronomi, dan etnofarmakologi Kabola untuk melestarikan warisan lokal di era digital.",
    href: "/storynomics",
  },
  {
    icon: Compass,
    title: "Wisata & Reservasi",
    desc: "Katalog paket wisata tematik Kabola dengan sistem reservasi langsung ke Pokdarwis via WhatsApp.",
    href: "/wisata",
  },
  {
    icon: Home,
    title: "Profil Desa Pante Deere",
    desc: "Website profil desa modern (Astro + Tailwind) di-deploy ke GitHub Pages dengan Decap CMS untuk update mandiri.",
    href: "/pante-deere",
  },
  {
    icon: QrCode,
    title: "Papan Info & QR Code",
    desc: "Papan akrilik tahan cuaca terintegrasi QR Code yang mengarah langsung ke halaman wisata Kabola Digital Hub.",
    href: "/wisata",
  },
  {
    icon: ShoppingBag,
    title: "Katalog Visual UMKM",
    desc: "Dokumentasi produk lokal UMKM Kabola dalam katalog PDF yang didistribusikan via WhatsApp dan cetak fisik.",
    href: "/umkm",
  },
];

export default function ProgramOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative section-padding bg-sand dot-pattern overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-kabola-teal/10 text-kabola-teal text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Program Kerja
          </span>
          <h2 className="font-title text-4xl md:text-5xl text-forest mb-4">
            Enam <span className="text-gradient-teal">Program</span>
          </h2>
          <p className="text-earth/55 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Kabola Digital Hub mengintegrasikan enam program kerja KKN-PPM UGM 2026
            yang tersebar di Kelurahan Kabola dan Desa Pante Deere, Kecamatan Kabola — sebagai satu ekosistem informasi digital.
          </p>
        </motion.div>

        {/* Cards grid — flat, no grouping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={item.href}
                className="group flex flex-col h-full bg-white rounded-2xl border border-kabola-teal/10 p-6 shadow-[0_2px_12px_rgba(25,141,141,0.05)] hover:shadow-[0_8px_32px_rgba(25,141,141,0.12)] hover:border-kabola-teal/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-kabola-teal/10 flex items-center justify-center group-hover:bg-kabola-teal/20 transition-colors mb-4">
                  <item.icon className="w-5 h-5 text-kabola-teal" />
                </div>

                <h4 className="font-title text-[15px] text-earth mb-2 leading-snug group-hover:text-kabola-teal transition-colors">
                  {item.title}
                </h4>
                <p className="text-earth/50 text-sm leading-relaxed flex-1">{item.desc}</p>

                <div className="flex items-center gap-1 mt-5 text-kabola-teal text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Lihat detail
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
