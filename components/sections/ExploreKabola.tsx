import Link from "next/link";
import Image from "next/image";
import { Map, BookOpen, Compass, ShoppingBag, BarChart3, Store, ArrowRight } from "lucide-react";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { TenunAlorRibbon } from "@/components/ui/ornaments/TenunAlorOrnament";

const features = [
  {
    icon: Compass,
    title: "Wisata Kabola",
    desc: "Jelajahi destinasi wisata alam dan budaya Kabola mulai dari tepi pantai hingga perbukitan yang memukau. Reservasi langsung ke Pokdarwis.",
    href: "/wisata",
    cta: "Jelajahi Wisata",
  },
  {
    icon: BookOpen,
    title: "Cerita Kabola",
    desc: "Temukan kekayaan tradisi Kabola mulai dari gastronomi otentik, tanaman obat lokal, hingga cerita rakyat yang menghidupkan warisan leluhur.",
    href: "/cerita-kabola",
    cta: "Baca Cerita",
  },
  {
    icon: Map,
    title: "Peta Wilayah (GIS)",
    desc: "Orientasi wilayah Kabola melalui peta digital interaktif untuk menemukan lokasi, rute, kontur, serta informasi mitigasi bencana.",
    href: "/peta",
    cta: "Buka Peta GIS",
  },
  {
    icon: BarChart3,
    title: "Statistik Digital",
    desc: "Visualisasi data kependudukan, gender, agama, tingkat pendidikan, dan mata pencaharian warga Kabola interaktif.",
    href: "/statistik",
    cta: "Lihat Data Statistik",
  },
  {
    icon: ShoppingBag,
    title: "Produk Lokal UMKM",
    desc: "Dukung UMKM Kabola. Temukan produk-produk autentik buatan warga lokal dan bantu ekonomi komunitas berkembang.",
    href: "/umkm",
    cta: "Lihat Produk UMKM",
  },
  {
    icon: Store,
    title: "NTT Mart by Dekranasda Alor",
    desc: "Etalase produk-produk unggulan dan ekonomi kreatif pilihan khas Nusa Tenggara Timur di Kabupaten Alor.",
    href: "/umkm/ntt-mart",
    cta: "Kunjungi NTT Mart by Dekranasda Alor",
  },
];

export default function ExploreKabola() {
  return (
    <section id="eksplorasi" className="relative section-padding bg-surface-teal overflow-hidden">
      {/* Background Ornaments from project assets */}
      <div className="absolute top-12 -left-16 w-56 h-56 md:w-80 md:h-80 opacity-[0.07] pointer-events-none z-0 animate-[spin_100s_linear_infinite]">
        <Image src="/ornaments/ornament-cyan.svg" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-10 -right-16 w-60 h-60 md:w-84 md:h-84 opacity-[0.08] pointer-events-none z-0 animate-[spin_120s_linear_infinite_reverse]">
        <Image src="/ornaments/ornament-cyan.svg" alt="" fill className="object-contain" />
      </div>

      {/* Subtle topo background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          {[1, 2, 3, 4, 5].map(i => (
            <ellipse key={i} cx="720" cy="400" rx={200 + i * 140} ry={120 + i * 80} fill="none" stroke="#198D8D" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative">

        {/* Header */}
        <SlideUp
          inView
          yOffset={24}
          duration={0.6}
          className="text-center mb-14"
        >
          <span className="inline-block bg-kabola-teal/10 text-kabola-teal text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Temukan Kabola
          </span>
          <h2 className="font-title text-4xl md:text-5xl text-forest mb-4">
            Satu Pintu untuk <span className="text-gradient-teal">Segalanya</span>
          </h2>

          {/* Title Accent Ribbon */}
          <div className="w-56 md:w-80 mx-auto my-3 opacity-45">
            <TenunAlorRibbon color="#198D8D" />
          </div>

          <p className="text-earth/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Kabola Digital Hub menghadirkan data statistik, informasi demografi, cerita budaya, peta GIS, dan produk UMKM Kecamatan Kabola dalam satu platform.
          </p>
        </SlideUp>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, i) => (
            <SlideUp
              key={i}
              inView
              yOffset={28}
              duration={0.55}
              delay={i * 0.1}
              className="h-full"
            >
              <Link
                href={item.href}
                className="group flex gap-5 md:gap-6 h-full bg-white rounded-2xl border border-kabola-teal/10 p-6 md:p-8 shadow-[0_2px_12px_rgba(25,141,141,0.05)] hover:shadow-[0_8px_32px_rgba(25,141,141,0.12)] hover:border-kabola-teal/25 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-kabola-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-kabola-teal/20 transition-colors mt-0.5 md:mt-1">
                  <item.icon className="w-7 h-7 text-kabola-teal" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0">
                  <h4 className="font-title text-[18px] md:text-[20px] text-earth mb-2 group-hover:text-kabola-teal transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-earth/55 text-sm md:text-[15px] leading-relaxed mb-6 flex-1">{item.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-kabola-teal text-[11px] md:text-xs font-bold uppercase tracking-wider transition-colors mt-auto group-hover:text-ocean-blue">
                    {item.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </SlideUp>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="wave-bottom pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,40 C300,80 600,10 900,50 C1100,75 1300,30 1440,45 L1440,80 L0,80 Z" fill="#FFFAF6" />
        </svg>
      </div>
    </section>
  );
}
