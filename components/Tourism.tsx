"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Star,
  Users,
  ArrowRight,
  Mountain,
  Waves,
  Camera,
  Leaf,
  PhoneCall,
} from "lucide-react";

type PackageType = "alam" | "budaya" | "kuliner" | "petualangan";

const tourCategories: { id: PackageType; label: string; icon: typeof Mountain }[] = [
  { id: "alam", label: "Wisata Alam", icon: Mountain },
  { id: "budaya", label: "Wisata Budaya", icon: Camera },
  { id: "kuliner", label: "Wisata Kuliner", icon: Leaf },
  { id: "petualangan", label: "Petualangan", icon: Waves },
];

const tourPackages: Record<
  PackageType,
  {
    id: string;
    title: string;
    subtitle: string;
    duration: string;
    minPax: number;
    rating: number;
    image: string;
    highlights: string[];
    price: string;
    whatsapp: string;
  }[]
> = {
  alam: [
    {
      id: "bukit-kabola",
      title: "Panorama Bukit Kabola",
      subtitle: "Menikmati cakrawala Alor dari ketinggian",
      duration: "Setengah Hari",
      minPax: 2,
      rating: 4.9,
      image: "/images/view-2.jpg",
      highlights: ["Sunrise view Alor", "Hamparan hijau pegunungan", "Spot foto premium", "Pemandu lokal"],
      price: "Hubungi Pokdarwis",
      whatsapp: "6283117149096",
    },
    {
      id: "hutan-bakau",
      title: "Eksplorasi Mangrove Kabola",
      subtitle: "Jelajahi ekosistem mangrove yang unik",
      duration: "3–4 Jam",
      minPax: 2,
      rating: 4.7,
      image: "/images/view-4.jpg",
      highlights: ["Ekosistem mangrove alami", "Bird watching", "Edukasi lingkungan", "Kano tradisional"],
      price: "Hubungi Pokdarwis",
      whatsapp: "6283117149096",
    },
  ],
  budaya: [
    {
      id: "kampung-adat",
      title: "Wisata Kampung Adat",
      subtitle: "Menyelami kehidupan autentik masyarakat Alor",
      duration: "Seharian",
      minPax: 4,
      rating: 4.8,
      image: "/images/culture-1.jpg",
      highlights: ["Rumah adat tradisional", "Demonstrasi tenun ikat", "Ritual adat lokal", "Makan siang tradisional"],
      price: "Hubungi Pokdarwis",
      whatsapp: "6283117149096",
    },
    {
      id: "tenun-workshop",
      title: "Workshop Tenun Ikat Alor",
      subtitle: "Belajar seni tenun langsung dari pengrajin",
      duration: "2–3 Jam",
      minPax: 2,
      rating: 4.9,
      image: "/images/culture-4.jpg",
      highlights: ["Belajar teknik dasar menenun", "Mengenal motif khas Alor", "Bawa hasil tenun sendiri", "Sertifikat pengalaman"],
      price: "Hubungi Pokdarwis",
      whatsapp: "6283117149096",
    },
  ],
  kuliner: [
    {
      id: "wisata-kuliner",
      title: "Tur Kuliner Kabola",
      subtitle: "Menjelajahi cita rasa autentik Alor",
      duration: "4–5 Jam",
      minPax: 2,
      rating: 4.8,
      image: "/images/culture-2.jpg",
      highlights: ["Jagung bose tradisional", "Se'i ikan lokal", "Pasar tradisional Kabola", "Memasak bersama warga"],
      price: "Hubungi Pokdarwis",
      whatsapp: "6283117149096",
    },
    {
      id: "dapur-tradisional",
      title: "Kelas Masak Tradisional",
      subtitle: "Belajar memasak masakan khas Alor",
      duration: "3 Jam",
      minPax: 2,
      rating: 4.7,
      image: "/images/culture-3.jpg",
      highlights: ["Resep masakan autentik Alor", "Bahan-bahan lokal segar", "Makan bersama keluarga tuan rumah", "Resep dibawa pulang"],
      price: "Hubungi Pokdarwis",
      whatsapp: "6283117149096",
    },
  ],
  petualangan: [
    {
      id: "trekking-kabola",
      title: "Trekking Pegunungan Kabola",
      subtitle: "Mendaki jalur hijau dengan pemandangan memukau",
      duration: "Seharian",
      minPax: 3,
      rating: 4.9,
      image: "/images/view-5.jpg",
      highlights: ["Jalur trekking alam", "Pemandangan laut Alor", "Bertemu fauna endemik", "Piknik alam terbuka"],
      price: "Hubungi Pokdarwis",
      whatsapp: "6283117149096",
    },
    {
      id: "bahari-alor",
      title: "Petualangan Bahari Alor",
      subtitle: "Menyelam & snorkeling di perairan Alor",
      duration: "Seharian",
      minPax: 2,
      rating: 5.0,
      image: "/images/dugong.jpg",
      highlights: ["Snorkeling spot premium", "Terumbu karang alami", "Pemandu berpengalaman", "Peralatan disediakan"],
      price: "Hubungi Pokdarwis",
      whatsapp: "6283117149096",
    },
  ],
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.floor(rating) ? "text-kabola-teal fill-kabola-teal" : "text-earth/20"}`}
        />
      ))}
      <span className="text-xs text-earth/60 ml-1">{rating}</span>
    </div>
  );
}

export default function Tourism() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeType, setActiveType] = useState<PackageType>("alam");

  const packages = tourPackages[activeType];

  return (
    <section id="wisata" className="relative bg-forest section-padding overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: "28px 28px"
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-kabola-teal/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-white/10 text-white/70 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
            Katalog Wisata Interaktif
          </span>
          <h2 className="font-title text-4xl md:text-5xl text-white mb-4">
            Jelajahi <span className="text-kabola-teal-light">Kabola</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Paket wisata tematik yang dikurasi tim Soshum, terhubung langsung ke Pokdarwis Kabola.
            Reservasi mudah melalui WhatsApp.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2.5 mb-10"
        >
          {tourCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveType(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeType === cat.id
                  ? "bg-kabola-teal text-white shadow-lg shadow-kabola-teal/30"
                  : "bg-white/10 text-white/60 border border-white/10 hover:bg-white/20 hover:text-white"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Package cards */}
        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-kabola-teal/40 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_20px_60px_rgba(26,122,94,0.2)]"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-kabola-teal text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {pkg.duration}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                    <Users className="w-2.5 h-2.5" />
                    Min. {pkg.minPax} orang
                  </span>
                </div>

                <div className="absolute bottom-3 left-3">
                  <StarRating rating={pkg.rating} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="font-title text-lg text-white mb-1">{pkg.title}</h4>
                <p className="text-white/50 text-sm mb-4">{pkg.subtitle}</p>

                {/* Highlights */}
                <ul className="grid grid-cols-2 gap-1.5 mb-5">
                  {pkg.highlights.map((h, hi) => (
                    <li key={hi} className="flex items-start gap-1.5 text-xs text-white/60">
                      <MapPin className="w-3 h-3 text-kabola-teal mt-0.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-white/40 text-xs">{pkg.price}</span>
                  <a
                    href={`https://wa.me/${pkg.whatsapp}?text=Halo, saya tertarik dengan paket wisata "${pkg.title}" di Kabola Digital Hub.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kabola-teal text-white text-xs font-semibold hover:bg-kabola-teal-dark transition-all duration-300 group/btn hover:-translate-y-0.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Reservasi WA
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pokdarwis info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-kabola-teal/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-kabola-teal" />
              </div>
              <h4 className="font-title text-xl text-white">Pokdarwis Kabola</h4>
            </div>
            <p className="text-white/60 text-sm max-w-md">
              Kelompok Sadar Wisata (Pokdarwis) Kabola adalah mitra lokal yang mengelola 
              dan memandu seluruh paket wisata di wilayah Kabola.
            </p>
          </div>
          <a
            href="https://wa.me/6283117149096"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-kabola-teal text-white font-semibold text-sm hover:bg-kabola-teal-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-kabola-teal/30"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
            </svg>
            Hubungi Pokdarwis
          </a>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="wave-bottom pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,40 C300,10 700,70 1000,30 C1200,10 1350,55 1440,40 L1440,80 L0,80 Z" fill="#FDFAF4" />
        </svg>
      </div>
    </section>
  );
}

