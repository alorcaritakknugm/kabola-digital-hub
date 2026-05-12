"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Map, Heart, Globe, Database, ChevronRight, ExternalLink } from "lucide-react";

const services = [
  {
    id: "gis",
    icon: Map,
    title: "Peta Interaktif GIS",
    shortTitle: "Peta GIS",
    tag: "Peta Interaktif GIS",
    tagColor: "bg-kabola-teal/10 text-kabola-teal",
    description:
      "Peta digital interaktif berbasis GIS yang menampilkan administrasi wilayah, tematik komoditas lokal, dan lokasi fasilitas kesehatan di Kecamatan Kabola.",
    features: [
      "Peta administrasi wilayah Kabola",
      "Sebaran komoditas pertanian & perkebunan",
      "Lokasi fasilitas kesehatan (Puskesmas, Posyandu)",
      "Layer toggle untuk berbagai tematik",
    ],
    gradient: "from-kabola-teal/15 via-kabola-teal/5 to-transparent",
    borderColor: "border-kabola-teal/20",
    accentColor: "text-kabola-teal",
    bgIcon: "bg-kabola-teal/10",
    status: "Segera Hadir",
    href: "#",
  },
  {
    id: "storynomics",
    icon: Heart,
    title: "Storynomics Digital",
    shortTitle: "Storynomics",
    tag: "Storynomics",
    tagColor: "bg-kabola-teal/10 text-kabola-teal",
    description:
      "Digitalisasi kekayaan budaya Kabola — dari gastronomi lokal hingga etnofarmakologi — disajikan dalam tampilan interaktif yang menceritakan nilai-nilai tradisi autentik.",
    features: [
      "Dokumentasi budaya & tradisi Kabola",
      "Gastronomi lokal dan kuliner tradisional",
      "Etnofarmakologi tanaman obat lokal",
      "Display interaktif multimedia",
    ],
    gradient: "from-kabola-teal/15 via-kabola-teal/5 to-transparent",
    borderColor: "border-kabola-teal/20",
    accentColor: "text-kabola-teal",
    bgIcon: "bg-kabola-teal/10",
    status: "Segera Hadir",
    href: "#storynomics",
  },
  {
    id: "wisata",
    icon: Globe,
    title: "Katalog Wisata & Reservasi",
    shortTitle: "Wisata",
    tag: "Katalog Wisata",
    tagColor: "bg-forest/10 text-forest",
    description:
      "Katalog wisata tematik Kabola dengan sistem reservasi sederhana yang terhubung ke Pokdarwis. Temukan paket wisata alam, budaya, dan petualangan yang dikurasi tim Soshum.",
    features: [
      "Paket wisata tematik (alam, budaya, kuliner)",
      "Sistem reservasi via WhatsApp",
      "Profil destinasi wisata lokal",
      "Terintegrasi dengan Pokdarwis Kabola",
    ],
    gradient: "from-forest/15 via-forest/5 to-transparent",
    borderColor: "border-forest/20",
    accentColor: "text-forest",
    bgIcon: "bg-forest/10",
    status: "Lihat Sekarang",
    href: "#wisata",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="layanan" className="relative bg-forest section-padding overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }} />
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-kabola-teal/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-kabola-teal/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-white/10 text-white/70 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
            Layanan Digital
          </span>
          <h2 className="font-title text-4xl md:text-5xl text-white mb-4">
            Layanan <span className="text-kabola-teal-light">Digital</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Tiga program kerja utama yang diintegrasikan ke dalam platform Kabola Digital Hub
            untuk mendukung pembangunan Kecamatan Kabola secara holistik.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-10"
        >
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeTab === i
                  ? "bg-white text-forest shadow-lg"
                  : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-white/10"
              }`}
            >
              {s.shortTitle}
            </button>
          ))}
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              onClick={() => setActiveTab(i)}
              className={`relative rounded-2xl border cursor-pointer transition-all duration-500 overflow-hidden group ${
                activeTab === i
                  ? "border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.08)] scale-[1.02]"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {/* Card gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50`} />
              
              <div className="relative p-6 md:p-7">
                {/* Tag */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                    activeTab === i ? service.tagColor : "bg-white/10 text-white/50"
                  } transition-colors duration-300`}>
                    {service.tag}
                  </span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    activeTab === i ? service.bgIcon : "bg-white/5"
                  }`}>
                    <service.icon className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === i ? service.accentColor : "text-white/40"
                    }`} />
                  </div>
                </div>

                <h3 className="font-title text-xl text-white mb-3 leading-snug">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{service.description}</p>

                {/* Features (show when active) */}
                <motion.div
                  initial={false}
                  animate={{ height: activeTab === i ? "auto" : 0, opacity: activeTab === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 mb-5">
                    {service.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-xs text-white/70">
                        <ChevronRight className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${service.accentColor}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* CTA */}
                <a
                  href={service.href}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-300 group/link ${
                    activeTab === i ? service.accentColor : "text-white/40 hover:text-white/60"
                  }`}
                  onClick={(e) => {
                    if (service.href === "#" || service.href === "#storynomics" || service.href === "#wisata") {
                      e.preventDefault();
                      if (service.href !== "#") {
                        // @ts-ignore
                        if (window.lenis) window.lenis.scrollTo(service.href);
                      }
                    }
                  }}
                >
                  {service.status}
                  <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom wave to cream */}
      <div className="wave-bottom pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,20 C400,70 800,0 1200,50 C1320,70 1380,40 1440,30 L1440,80 L0,80 Z" fill="#FDFAF4" />
        </svg>
      </div>
    </section>
  );
}

