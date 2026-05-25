"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Utensils, Leaf, Music, ChevronRight, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "gastronomi",
    icon: Utensils,
    label: "Gastronomi",
    color: "text-kabola-teal",
    bg: "bg-kabola-teal/10",
    activeBg: "bg-kabola-teal",
  },
  {
    id: "etnofarmakologi",
    icon: Leaf,
    label: "Etnofarmakologi",
    color: "text-kabola-teal",
    bg: "bg-kabola-teal/10",
    activeBg: "bg-kabola-teal",
  },
  {
    id: "budaya",
    icon: Music,
    label: "Budaya",
    color: "text-kabola-teal",
    bg: "bg-kabola-teal/10",
    activeBg: "bg-kabola-teal",
  },
];

const fallbackStories = {
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
  etnofarmakologi: [
    {
      title: "Tanaman Obat Lokal",
      subtitle: "Kearifan Penyembuhan Tradisional",
      desc: "Masyarakat Kabola memiliki pengetahuan mendalam tentang tanaman obat lokal yang digunakan turun-temurun. Berbagai tumbuhan di sekitar Alor dimanfaatkan untuk pengobatan tradisional.",
      image: "/images/view-3.jpg",
      tag: "Pengobatan Tradisional",
    },
    {
      title: "Kunyit & Rempah Alor",
      subtitle: "Apotek Alam Nusantara",
      desc: "Rempah-rempah yang tumbuh subur di Alor tidak hanya menjadi bumbu masakan, tetapi juga memiliki khasiat medis yang telah diakui oleh masyarakat lokal sejak lama.",
      image: "/images/culture-4.jpg",
      tag: "Rempah Herbal",
    },
  ],
  budaya: [
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
      desc: "Berbagai tarian adat dan upacara ritual menjadi ekspresi identitas budaya masyarakat Kabola yang masih lestari hingga kini, dari tari perang hingga tari penyambutan.",
      image: "/images/view-1.jpg",
      tag: "Seni Pertunjukan",
    },
    {
      title: "Bahasa & Sastra Lisan",
      subtitle: "Tradisi Oral Nusantara",
      desc: "Masyarakat Kabola menyimpan kekayaan tradisi lisan — dari syair, cerita rakyat, hingga peribahasa — yang menjadi cerminan nilai-nilai kearifan lokal yang mendalam.",
      image: "/images/view-5.jpg",
      tag: "Tradisi Lisan",
    },
  ],
};

export default function Storynomics({ storynomicsList = [] }: { storynomicsList?: any[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<keyof typeof fallbackStories>("gastronomi");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Filter items from CMS based on the active category
  const activeCmsItems = storynomicsList.filter((item) => item.kategori === activeCategory).map(item => ({
    title: item.judul,
    subtitle: item.subtitle,
    desc: item.deskripsi,
    image: item.imageUrl || "/images/culture-1.jpg",
    tag: item.tag || "Storynomics",
  }));

  // Use CMS items if available, otherwise use fallback data
  const activeStories = activeCmsItems.length > 0 ? activeCmsItems : fallbackStories[activeCategory];

  return (
    <section id="storynomics" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-cream-dark">
      {/* Decorative background */}
      <div className="absolute inset-0 batik-pattern opacity-50" />
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
            Storynomics Digital
          </span>
          <h2 className="font-title text-4xl md:text-5xl text-forest mb-4">
            Jiwa & Rasa <span className="text-gradient-teal">Kabola</span>
          </h2>
          <p className="text-earth/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Digitalisasi kekayaan budaya, gastronomi, dan etnofarmakologi Kabola — 
            mengabadikan nilai-nilai tradisi agar tetap hidup di era digital.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as keyof typeof fallbackStories)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? `${cat.activeBg} text-white shadow-lg`
                  : `${cat.bg} ${cat.color} hover:opacity-80`
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Story cards */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {activeStories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onHoverStart={() => setHoveredCard(i)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-kabola-teal/10 shadow-[0_4px_20px_rgba(201,136,42,0.06)] hover:shadow-[0_12px_40px_rgba(201,136,42,0.15)] transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-kabola-teal text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                    {story.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
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

              {/* Hover shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                initial={{ x: "-100%" }}
                animate={hoveredCard === i ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </motion.div>

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

