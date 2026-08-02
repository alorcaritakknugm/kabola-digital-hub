"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ImageWithSkeleton from "../ui/ImageWithSkeleton";
import { Utensils, TreePine, Theater, Camera, ArrowRight, Search, BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

function getPaginationRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

/* ─── Tabs (4 bersih) ────────────────────────────────────────── */
const tabs = [
  { id: "gastronomi", label: "Gastronomi", icon: Utensils, color: "#198D8D" },
  { id: "eko-naratif", label: "Eko-Naratif", icon: TreePine, color: "#126666" },
  { id: "tradisi-budaya", label: "Tradisi & Budaya", icon: Theater, color: "#0A3D62" },
  { id: "lensa-kabola", label: "Lensa Kabola", icon: Camera, color: "#2BB5B5" },
];



/* ─── Component ─────────────────────────────────────────────── */
export default function CeritaKabola({ ceritaKabolaList = [] }: { ceritaKabolaList?: any[] }) {
  const ref = useRef(null);
  const ceritaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState("gastronomi");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && tabs.some(t => t.id === tab)) {
        setActiveTab(tab);
        setCurrentPage(1);
      }
    }
  }, []);

  const getFallbackImage = (slug: string, kategori: string) => {
    if (slug === 'jagung-bose') return '/images/culture-1.jpg';
    if (slug === 'sei-ikan-sei-daging') return '/images/culture-2.jpg';
    if (slug === 'tuak-sopi') return '/images/culture-3.jpg';
    if (slug === 'hutan-mangrove-nelayan-kabola') return '/images/view-3.jpg';
    if (slug === 'perubahan-musim-pertanian-lokal') return '/images/view-5.jpg';
    if (slug === 'tenun-ikat-alor') return '/images/dugong.jpg';
    if (slug === 'tarian-upacara-adat') return '/images/view-1.jpg';
    if (slug === 'tradisi-lisan-kabola') return '/images/view-5.jpg';
    if (slug === 'moko-motif-tradisional') return '/images/culture-2.jpg';
    if (slug === 'bahasa-sastra-lisan') return '/images/culture-3.jpg';
    if (slug === 'wajah-wajah-kabola') return '/images/view-1.jpg';
    if (slug === 'alam-yang-hidup') return '/images/view-3.jpg';
    if (slug === 'tangan-yang-berkarya') return '/images/culture-3.jpg';

    if (kategori === 'lensa-kabola') return '/images/view-3.jpg';
    if (kategori === 'eko-naratif') return '/images/view-1.jpg';
    return '/images/culture-1.jpg';
  };

  const activeTab_ = tabs.find((t) => t.id === activeTab)!;

  const cmsItems = ceritaKabolaList
    .filter((item) => item.kategori === activeTab)
    .map((item) => ({
      _id: item._id,
      title: item.judul,
      slug: item.slug?.current || item.slug,
      subtitle: item.subtitle,
      desc: item.deskripsi,
      image: item.imageUrl || getFallbackImage(item.slug?.current || item.slug, item.kategori),
      tag: item.tag || activeTab_.label,
    }));

  const activeStories = cmsItems.filter((item: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.desc?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(activeStories.length / ITEMS_PER_PAGE);
  const paginatedStories = activeStories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (ceritaRef.current) {
      ceritaRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Hero Section Header (Unified Dark Hero) */}
      <section className="relative bg-forest pt-32 pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-kabola-teal/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10 text-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-kabola-teal-light" />
            </div>
            <span className="inline-block bg-white/10 text-white/70 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
              Dokumentasi Budaya &amp; Kehidupan Lokal
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">
              Kabola <span className="text-kabola-teal-light">dalam Cerita</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Jelajahi budaya, tradisi, dan kehidupan sehari-hari warga Kabola. Dikurasi dalam narasi, foto, dan video yang dapat dinikmati masyarakat maupun wisatawan.
            </p>
          </motion.div>
        </div>

        <div className="wave-bottom pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#F7F3EB" />
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="cerita-kabola" ref={ceritaRef} className="relative py-12 md:py-20 overflow-hidden bg-sand">
        <div className="absolute inset-0 batik-pattern opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

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
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${isActive
                      ? "text-white"
                      : "bg-white text-earth/70 hover:bg-kabola-teal/10 hover:text-kabola-teal border border-kabola-teal/15"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCeritaTabPill"
                      className="absolute inset-0 bg-kabola-teal rounded-full shadow-md shadow-kabola-teal/25"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full max-w-xl mx-auto mb-10"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-kabola-teal/50" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="block w-full pl-12 pr-10 py-3.5 bg-white border border-kabola-teal/15 rounded-full text-earth focus:ring-2 focus:ring-kabola-teal focus:border-kabola-teal transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] focus:shadow-[0_4px_24px_rgba(25,141,141,0.08)] outline-none"
              placeholder="Cari cerita, judul, atau deskripsi..."
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-earth/40 hover:text-earth transition-colors"
                aria-label="Hapus pencarian"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>

          {/* Story cards */}
          <AnimatePresence mode="popLayout">
            {paginatedStories.length > 0 ? (
              <>
                <motion.div
                  layout
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
                >
                  {paginatedStories.map((story, i) => (
                    <motion.div
                      layout
                      key={story._id || story.slug || i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      onHoverStart={() => setHoveredCard(i)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="group relative rounded-2xl overflow-hidden bg-white border border-kabola-teal/10 shadow-[0_4px_20px_rgba(201,136,42,0.06)] hover:shadow-[0_12px_40px_rgba(201,136,42,0.15)] transition-all duration-500 cursor-pointer"
                    >
                      <Link href={`/cerita-kabola/${story.slug || story._id}?from=${activeTab}`} className="block h-full w-full">
                        <ImageWithSkeleton
                          wrapperClassName="h-48 w-full"
                          src={story.image}
                          alt={story.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span
                              className="text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                              style={{ backgroundColor: activeTab_.color }}
                            >
                              {story.tag}
                            </span>
                          </div>
                        </ImageWithSkeleton>

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
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mb-12">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-full bg-white border border-earth/15 text-forest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sand transition-all shadow-sm"
                      aria-label="Halaman Sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {getPaginationRange(currentPage, totalPages).map((page, idx) =>
                        page === "..." ? (
                          <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-earth/40 text-sm select-none">…</span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page as number)}
                            className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${currentPage === page
                                ? "bg-kabola-teal text-white shadow-md shadow-kabola-teal/20"
                                : "bg-white text-earth/70 hover:bg-sand border border-earth/10"
                              }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-full bg-white border border-earth/15 text-forest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sand transition-all shadow-sm"
                      aria-label="Halaman Selanjutnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white rounded-2xl border border-kabola-teal/12 p-8 text-center max-w-3xl mx-auto"
              >
                {searchQuery ? (
                  <>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1.5 rounded-full mb-4">
                      Pencarian Tidak Ditemukan
                    </span>
                    <p className="text-earth/60 text-sm leading-relaxed max-w-sm mx-auto">
                      Maaf, tidak ada cerita atau artikel yang sesuai dengan kata kunci "{searchQuery}" pada kategori ini.
                    </p>
                  </>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1.5 rounded-full mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-kabola-teal animate-pulse" />
                      Belum Ada Cerita
                    </span>
                    <p className="text-earth/60 text-sm leading-relaxed max-w-sm mx-auto">
                      Konten cerita pada kategori ini sedang dalam tahap dokumentasi lapangan.
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </>
  );
}
