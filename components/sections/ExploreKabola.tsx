import Link from "next/link";
import { Map, BookOpen, Compass, ShoppingBag, ArrowRight } from "lucide-react";
import { SlideUp } from "@/components/ui/animations/SlideUp";

const features = [
  {
    icon: Compass,
    title: "Wisata Kabola",
    desc: "Jelajahi destinasi wisata alam dan budaya Kabola — dari tepi pantai hingga perbukitan yang memukau. Reservasi langsung ke Pokdarwis.",
    href: "/wisata",
    cta: "Jelajahi Wisata",
  },
  {
    icon: BookOpen,
    title: "Cerita Kabola",
    desc: "Temukan kekayaan tradisi Kabola — gastronomi otentik, tanaman obat lokal, dan cerita rakyat yang menghidupkan warisan leluhur.",
    href: "/cerita-kabola",
    cta: "Baca Cerita",
  },
  {
    icon: Map,
    title: "Peta Wilayah",
    desc: "Orientasi wilayah Kabola melalui peta digital interaktif — temukan lokasi, rute, dan informasi geografis dengan mudah.",
    href: "/peta",
    cta: "Buka Peta",
  },
  {
    icon: ShoppingBag,
    title: "Produk Lokal",
    desc: "Dukung UMKM Kabola. Temukan produk-produk autentik buatan warga lokal dan bantu ekonomi komunitas berkembang.",
    href: "/umkm",
    cta: "Lihat Produk",
  },
];

export default function ExploreKabola() {
  return (
    <section className="relative section-padding bg-surface-teal overflow-hidden">
      {/* Subtle topo background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          {[1,2,3,4,5].map(i => (
            <ellipse key={i} cx="720" cy="400" rx={200 + i*140} ry={120 + i*80} fill="none" stroke="#198D8D" strokeWidth="1" />
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
          <p className="text-earth/55 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Kabola Digital Hub menghadirkan informasi, cerita, dan layanan Kecamatan Kabola
            dalam satu platform — mudah diakses, lengkap, dan selalu diperbarui.
          </p>
        </SlideUp>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                className="group flex gap-5 h-full bg-white rounded-2xl border border-kabola-teal/10 p-6 shadow-[0_2px_12px_rgba(25,141,141,0.05)] hover:shadow-[0_8px_32px_rgba(25,141,141,0.12)] hover:border-kabola-teal/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-kabola-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-kabola-teal/20 transition-colors mt-0.5">
                  <item.icon className="w-6 h-6 text-kabola-teal" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0">
                  <h4 className="font-title text-[17px] text-earth mb-1.5 group-hover:text-kabola-teal transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-earth/50 text-sm leading-relaxed mb-4 flex-1">{item.desc}</p>
                  <span className="inline-flex items-center gap-1 text-kabola-teal text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all mt-auto">
                    {item.cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
