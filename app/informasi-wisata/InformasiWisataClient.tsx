"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { INFORMASI_WISATA_LIST } from "@/data/informasiWisataData";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import {
  Compass,
  Search,
  ArrowRight,
  Sparkles,
  BookOpen,
  Info,
  X,
  ArrowUpDown,
  ChevronDown,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  QrCode,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 6;

function getPaginationRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

function CustomDropdown({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  className = "",
}: {
  label: string;
  icon: any;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3.5 bg-white border border-kabola-teal/15 hover:border-kabola-teal/40 rounded-full text-earth text-sm font-medium transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(25,141,141,0.08)] outline-none"
      >
        <div className="flex items-center gap-2 truncate">
          <Icon className="w-4 h-4 text-kabola-teal shrink-0" />
          <span className="truncate">{selectedOption?.label || label}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-kabola-teal/60 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 min-w-[180px] max-w-[240px] bg-white border border-kabola-teal/15 rounded-2xl shadow-lg py-2 z-50 max-h-56 overflow-y-auto"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors flex items-center justify-between gap-2 ${value === opt.value
                  ? "bg-kabola-teal/10 text-kabola-teal font-semibold"
                  : "text-earth/80 hover:bg-kabola-teal/5 hover:text-earth"
                  }`}
              >
                <span className="truncate">{opt.label}</span>
                {value === opt.value && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-kabola-teal shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InformasiWisataClient({
  sanityArticles = [],
}: {
  sanityArticles?: any[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState<"terbaru" | "az" | "za">("terbaru");
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  const articlesList = (sanityArticles || []).map((art) => ({
    id: art._id || art.slug,
    slug: art.slug,
    judul: art.judul,
    subjudul: art.subjudul,
    kategori: art.kategori || "Bahari",
    ringkasan: art.ringkasan,
    fotoUtama: art.fotoUtama || "/images/view-4.jpg",
    tanggalDiperbarui: art.tanggalDiperbarui,
    konten: art.konten || [],
  }));

  const categories = [
    "Semua",
    ...Array.from(new Set(articlesList.map((item) => item.kategori))),
  ];

  const filteredList = articlesList.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.kategori === selectedCategory;

    if (!searchQuery) return matchesCategory;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.judul?.toLowerCase().includes(q) ||
      (item.subjudul && item.subjudul.toLowerCase().includes(q)) ||
      item.ringkasan?.toLowerCase().includes(q) ||
      (item.konten &&
        item.konten.some(
          (c: any) =>
            (c.judulSection && c.judulSection.toLowerCase().includes(q)) ||
            (c.isiSection && c.isiSection.toLowerCase().includes(q))
        ));

    return matchesCategory && matchesSearch;
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === "az") {
      return (a.judul || "").localeCompare(b.judul || "");
    }
    if (sortBy === "za") {
      return (b.judul || "").localeCompare(a.judul || "");
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedList.length / ITEMS_PER_PAGE);
  const paginatedList = sortedList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Hero Header */}
      <section className="relative bg-forest pt-32 pb-24 overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-kabola-teal/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10 text-center">
          <SlideUp delay={0}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <BookOpen className="w-8 h-8 text-kabola-teal-light" />
            </div>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/15 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-kabola-teal-light" />
              Direktori & Artikel Wisata
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">
              <span className="text-kabola-teal-light">Informasi Wisata</span> Kabola
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Kumpulan artikel informatif umum mengenai destinasi pesisir, rute angkutan umum, spot bersantai, dan pesona alam eksotis di Kecamatan Kabola, Alor.
            </p>
          </SlideUp>
        </div>

        <div className="wave-bottom pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 md:h-16">
            <path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#F7F3EB" />
          </svg>
        </div>
      </section>

      {/* Main Catalog Content */}
      <section id="informasi-wisata" ref={sectionRef} className="py-12 md:py-20 dot-pattern relative">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

          {/* Controls: Category Filter (TOP) -> Search & Sorting (BELOW) */}
          <div className="max-w-4xl mx-auto mb-12 space-y-8">

            {/* 1. Category Filter Pills (matching Kegiatan Wisata style) */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/80 backdrop-blur-md border border-kabola-teal/15 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.03)] w-fit mx-auto">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${isActive ? "text-white" : "text-earth/70 hover:text-kabola-teal"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeInformasiWisataTabPill"
                        className="absolute inset-0 bg-kabola-teal rounded-full shadow-md shadow-kabola-teal/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* 2. Search Input & Custom Dropdown (BELOW CATEGORIES - matching site behavior) */}
            <div className="flex flex-col md:flex-row items-center gap-3 max-w-3xl mx-auto">
              <div className="relative flex-1 w-full">
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
                  className="block w-full pl-12 pr-10 py-3.5 bg-white border border-kabola-teal/15 rounded-full text-earth focus:ring-2 focus:ring-kabola-teal focus:border-kabola-teal transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)] focus:shadow-[0_4px_20px_rgba(25,141,141,0.08)] outline-none text-sm md:text-base"
                  placeholder="Cari pantai, rute bemo, atau info lokasi..."
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-earth/40 hover:text-earth transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
                <CustomDropdown
                  label="Urutkan"
                  icon={ArrowUpDown}
                  value={sortBy}
                  onChange={(val) => {
                    setSortBy(val as any);
                    setCurrentPage(1);
                  }}
                  options={[
                    { label: "Terbaru", value: "terbaru" },
                    { label: "Abjad (A-Z)", value: "az" },
                    { label: "Abjad (Z-A)", value: "za" },
                  ]}
                  className="w-full md:w-[170px]"
                />
              </div>
            </div>

          </div>

          {/* Cards Grid */}
          <AnimatePresence mode="popLayout">
            {paginatedList.length > 0 ? (
              <>
                <motion.div
                  layout
                  key={`${selectedCategory}-${sortBy}-${currentPage}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                >
                  {paginatedList.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={item.id}
                      className="group relative rounded-3xl overflow-hidden bg-white border border-kabola-teal/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
                    >
                      <Link href={`/informasi-wisata/${item.slug}`} className="block h-full flex flex-col justify-between">
                        <div>
                          {/* Image Thumbnail */}
                          <ImageWithSkeleton
                            wrapperClassName="h-56 w-full relative"
                            src={item.fotoUtama}
                            alt={item.judul}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          >
                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                              <span className="bg-white/90 backdrop-blur-md text-forest text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                {item.kategori}
                              </span>
                            </div>
                          </ImageWithSkeleton>

                          {/* Content Card Body */}
                          <div className="p-6">
                            <h2 className="font-title text-2xl text-forest mb-2 group-hover:text-kabola-teal transition-colors">
                              {item.judul}
                            </h2>
                            {item.subjudul && (
                              <p className="text-kabola-teal font-medium text-xs mb-3 italic">
                                {item.subjudul}
                              </p>
                            )}
                            <p className="text-earth/70 text-sm line-clamp-3 leading-relaxed">
                              {item.ringkasan || (item.konten && item.konten[0]?.isiSection)}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer Button */}
                        <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100/60 mt-4">
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-kabola-teal text-white text-xs font-semibold hover:bg-kabola-teal-dark transition-all duration-300 shadow-sm group-hover:bg-forest">
                            Baca Selengkapnya
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
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
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white rounded-3xl border border-kabola-teal/12 p-10 text-center max-w-xl mx-auto mb-16 shadow-sm"
              >
                <Info className="w-10 h-10 text-kabola-teal mx-auto mb-3 opacity-60" />
                {searchQuery ? (
                  <>
                    <h3 className="font-title text-xl text-forest mb-2">Artikel Tidak Ditemukan</h3>
                    <p className="text-earth/60 text-sm leading-relaxed">
                      Tidak ada informasi wisata yang cocok dengan pencarian "{searchQuery}". Silakan coba kata kunci lain.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-title text-xl text-forest mb-2">Belum Ada Informasi Wisata</h3>
                    <p className="text-earth/60 text-sm leading-relaxed">
                      Informasi destinasi dan artikel wisata di Kecamatan Kabola akan segera diperbarui.
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* QR Code Board Integration Banner */}
          <SlideUp
            delay={0.2}
            inView={true}
            className="rounded-3xl bg-white border border-kabola-teal/12 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] mb-6"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-kabola-teal/10 flex items-center justify-center text-kabola-teal">
                  <QrCode className="w-5 h-5" />
                </div>
                <h4 className="font-title text-xl text-forest">Integrasi Papan Informasi Fisik (QR Code)</h4>
              </div>
              <p className="text-earth/60 text-sm max-w-3xl leading-relaxed">
                Informasi wisata ini terhubung langsung dengan Papan Informasi Wisata fisik berbahan akrilik tahan cuaca yang tersebar di titik-titik lokasi Kabola. Wisatawan cukup memindai <strong className="text-forest">QR Code </strong> pada papan lokasi untuk langsung membaca informasi &amp; ulasan lengkap destinasi.
              </p>
            </div>
            <div className="flex-shrink-0 w-24 h-24 bg-sand/70 rounded-2xl border border-kabola-teal/15 flex flex-col items-center justify-center shadow-inner">
              <QrCode className="w-10 h-10 text-forest mb-1" />
              <span className="text-[9px] font-bold tracking-widest text-kabola-teal uppercase">Scan QR</span>
            </div>
          </SlideUp>

          {/* Bottom Info Note */}
          <div className="bg-white rounded-3xl border border-kabola-teal/12 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-kabola-teal/10 flex items-center justify-center flex-shrink-0 text-kabola-teal">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-title text-lg text-forest mb-1">
                  Ingin Reservasi Kegiatan Wisata?
                </h4>
                <p className="text-earth/60 text-xs md:text-sm leading-relaxed">
                  Yuk, lihat katalog kegiatan wisata resmi di menu Wisata.
                </p>
              </div>
            </div>
            <Link
              href="/wisata"
              className="w-full sm:w-auto text-center flex-shrink-0 px-6 py-3 rounded-full bg-forest hover:bg-ocean-blue-light text-white text-xs font-bold transition-all shadow-md hover:-translate-y-0.5 whitespace-nowrap"
            >
              Lihat Kegiatan Wisata
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
