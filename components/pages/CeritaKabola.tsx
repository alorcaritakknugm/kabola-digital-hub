"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Utensils, TreePine, Theater, Camera, ArrowRight } from "lucide-react";

/* ─── Tabs (4 bersih) ────────────────────────────────────────── */
const tabs = [
  { id: "gastronomi",       label: "Gastronomi",       icon: Utensils, color: "#C9882A" }, // Earthy Gold (dari shadow tema)
  { id: "eko-naratif",      label: "Eko-Naratif",      icon: TreePine, color: "#198D8D" }, // Kabola Teal
  { id: "tradisi-budaya",   label: "Tradisi & Budaya", icon: Theater,  color: "#A33B3B" }, // Terracotta / Brick Red
  { id: "lensa-kabola",     label: "Lensa Kabola",     icon: Camera,   color: "#0A3D62" }, // Ocean Blue / Forest
];

/* ─── Fallback content ───────────────────────────────────────── */
const fallbackContent: Record<string, { title: string; subtitle: string; desc: string; image: string; tag: string }[]> = {
  gastronomi: [
    {
      title: "Jagung Bose",
      subtitle: "Makanan Pokok Tradisional",
      desc: "Jagung bose adalah hidangan pokok masyarakat Alor yang dibuat dari jagung yang dimasak hingga lunak dengan tambahan kacang merah. Makanan ini telah menjadi identitas kuliner Alor selama berabad-abad.",
      image: "/images/culture-1.jpg",
      tag: "Kuliner Tradisional",
    },
    {
      title: "Se'i Ikan & Sei Daging",
      subtitle: "Olahan Asap Khas NTT",
      desc: "Teknik pengasapan tradisional yang menghasilkan cita rasa khas pada ikan dan daging. Proses pengolahan ini merupakan warisan leluhur yang masih dijaga masyarakat Kabola.",
      image: "/images/culture-2.jpg",
      tag: "Teknik Memasak",
    },
    {
      title: "Tuak & Sopi",
      subtitle: "Minuman Fermentasi Adat",
      desc: "Minuman fermentasi dari nira lontar yang memiliki nilai adat dan sosial dalam kehidupan masyarakat Alor. Sering hadir dalam upacara adat dan pertemuan komunitas.",
      image: "/images/culture-3.jpg",
      tag: "Tradisi Sosial",
    },
  ],
  "eko-naratif": [
    {
      title: "Hutan Mangrove & Nelayan Kabola",
      subtitle: "Ekologi Pesisir",
      desc: "Warga Kabola memiliki pengetahuan mendalam tentang ritme pasang-surut dan perubahan ekosistem mangrove yang menjadi sumber penghidupan mereka selama generasi.",
      image: "/images/view-3.jpg",
      tag: "Cerita Ekologi",
    },
    {
      title: "Perubahan Musim & Pertanian Lokal",
      subtitle: "Kearifan Agroekologi",
      desc: "Petani di Kabola membaca tanda-tanda alam — arah angin, warna langit, dan siklus bunga — sebagai panduan bertanam yang telah teruji ratusan tahun.",
      image: "/images/view-5.jpg",
      tag: "Pengetahuan Lokal",
    },
  ],
  "tradisi-budaya": [
    {
      title: "Tenun Ikat Alor",
      subtitle: "Warisan Tekstil Nusantara",
      desc: "Setiap motif tenun ikat Alor menceritakan sejarah dan identitas suku-suku yang mendiaminya. Kabola memiliki ragam motif khas yang menjadi simbol kebanggaan lokal.",
      image: "/images/dugong.jpg",
      tag: "Seni Tekstil",
    },
    {
      title: "Tarian & Upacara Adat",
      subtitle: "Ekspresi Jiwa Kabola",
      desc: "Berbagai tarian adat dan upacara ritual menjadi ekspresi identitas budaya masyarakat Kabola — dari tari lego-lego, tari perang, hingga upacara penyambutan.",
      image: "/images/view-1.jpg",
      tag: "Seni Pertunjukan",
    },
    {
      title: "Tradisi Lisan Kabola",
      subtitle: "Cara Pandang & Relasi Sosial",
      desc: "Eksplorasi tradisi lisan masyarakat Kabola — menggali cara pandang terhadap dunia, relasi sosial, serta keterhubungan antara manusia, leluhur, dan lingkungan hidup.",
      image: "/images/view-5.jpg",
      tag: "Tradisi Lisan",
    },
    {
      title: "Moko & Motif Tradisional",
      subtitle: "Seni Visual Kabola",
      desc: "Eksplorasi motif-motif tradisional Alor — dari ukiran moko hingga ornamen tenun — sebagai bahasa visual yang menyimpan kosmologi dan sejarah masyarakat Kabola.",
      image: "/images/culture-2.jpg",
      tag: "Seni Visual",
    },
    {
      title: "Bahasa & Sastra Lisan",
      subtitle: "Tradisi Oral Nusantara",
      desc: "Masyarakat Kabola menyimpan kekayaan tradisi lisan — dari syair, cerita rakyat, hingga peribahasa — yang menjadi cerminan nilai-nilai kearifan lokal yang mendalam.",
      image: "/images/culture-3.jpg",
      tag: "Sastra Lisan",
    },
  ],
  "lensa-kabola": [
    {
      title: "Wajah-Wajah Kabola",
      subtitle: "Potret Manusia & Ceritanya",
      desc: "Setiap wajah menyimpan cerita. Seri foto ini menangkap ekspresi, gestur, dan keseharian warga Kabola dari berbagai usia dan latar belakang.",
      image: "/images/view-1.jpg",
      tag: "Potret",
    },
    {
      title: "Alam yang Hidup",
      subtitle: "Lanskap & Ekosistem",
      desc: "Dokumentasi keindahan alam Kabola — dari pesisir berbatu hingga hutan tropis — sebagai saksi bisu kehidupan yang berjalan di dalamnya.",
      image: "/images/view-3.jpg",
      tag: "Lanskap",
    },
    {
      title: "Tangan yang Berkarya",
      subtitle: "Hasil Olah Tangan Lokal",
      desc: "Foto-foto close-up yang merayakan keahlian tangan warga Kabola dalam menenun, memasak, dan mengolah bahan alam menjadi karya bernilai.",
      image: "/images/culture-3.jpg",
      tag: "Kerajinan",
    },
  ],
};

/* ─── Component ─────────────────────────────────────────────── */
export default function CeritaKabola({ ceritaKabolaList = [] }: { ceritaKabolaList?: any[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState("gastronomi");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const activeTab_ = tabs.find((t) => t.id === activeTab)!;

  const cmsItems = ceritaKabolaList
    .filter((item) => item.kategori === activeTab)
    .map((item) => ({
      title: item.judul,
      subtitle: item.subtitle,
      desc: item.deskripsi,
      image: item.imageUrl || "/images/culture-1.jpg",
      tag: item.tag || activeTab_.label,
    }));
  const activeStories = cmsItems.length > 0 ? cmsItems : fallbackContent[activeTab] ?? [];

  return (
    <section id="cerita-kabola" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-cream-dark">
      <div className="absolute inset-0 batik-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-kabola-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-kabola-teal/10 text-kabola-teal text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-kabola-teal/20">
            Dokumentasi Budaya &amp; Kehidupan Lokal
          </span>
          <h2 className="font-title text-4xl md:text-5xl text-forest mb-4">
            Kabola <span className="text-gradient-teal">dalam Cerita</span>
          </h2>
          <p className="text-earth/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Jelajahi budaya, tradisi, dan kehidupan sehari-hari warga Kabola — dikurasi dalam narasi,
            foto, dan video yang dapat dinikmati masyarakat maupun wisatawan.
          </p>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-lg scale-105"
                    : "bg-kabola-teal/10 text-kabola-teal hover:opacity-80"
                }`}
                style={isActive ? { backgroundColor: tab.color } : {}}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Story cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {activeStories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-kabola-teal/10 shadow-[0_4px_20px_rgba(201,136,42,0.06)] hover:shadow-[0_12px_40px_rgba(201,136,42,0.15)] transition-all duration-500 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: activeTab_.color }}
                    >
                      {story.tag}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-kabola-teal text-xs font-semibold uppercase tracking-wider mb-1">
                    {story.subtitle}
                  </p>
                  <h4 className="font-title text-lg text-forest mb-2">{story.title}</h4>
                  <p className="text-earth/60 text-sm leading-relaxed line-clamp-3">{story.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-kabola-teal text-xs font-semibold group/btn">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                  initial={{ x: "-100%" }}
                  animate={hoveredCard === i ? { x: "100%" } : { x: "-100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Coming soon notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-kabola-teal/10 border border-kabola-teal/20 rounded-full px-5 py-2.5 text-sm text-kabola-teal">
            <span className="w-2 h-2 rounded-full bg-kabola-teal animate-pulse" />
            Konten lengkap akan diperbarui selama KKN berlangsung di lapangan
          </div>
        </motion.div>

      </div>
    </section>
  );
}
