"use client";

import { useState, useRef, useEffect } from "react";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { Tag, ArrowRight, Search, ShieldCheck, CheckCircle2, Award, ChevronLeft, ChevronRight, ChevronDown, Filter, ArrowUpDown, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;

function getPaginationRange(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 2) return [1, 2, 3, "...", total];
  if (current >= total - 1) return [1, "...", total - 2, total - 1, total];
  return [1, "...", current, "...", total];
}


function CustomDropdown({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  className = ""
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
        <ChevronDown className={`w-4 h-4 text-kabola-teal/60 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 sm:left-auto sm:right-0 mt-2 min-w-[200px] max-w-[280px] bg-white border border-kabola-teal/15 rounded-2xl shadow-xl py-2 z-50 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-kabola-teal/20"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors flex items-center justify-between gap-2 ${
                  value === opt.value
                    ? "bg-kabola-teal/10 text-kabola-teal font-semibold"
                    : "text-earth/80 hover:bg-kabola-teal/5 hover:text-earth"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {value === opt.value && <CheckCircle2 className="w-3.5 h-3.5 text-kabola-teal shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UmkmGrid({ 
  umkmList = [], 
  isNttMart = false 
}: { 
  umkmList: any[], 
  isNttMart?: boolean 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");
  const [ikmFilter, setIkmFilter] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const isCertified = (val?: string) => {
    if (!val) return false;
    const v = val.trim().toLowerCase();
    return v !== "" && v !== "tidak" && v !== "tidak ada" && v !== "belum" && v !== "false" && v !== "no" && v !== "-";
  };

  const parsePrice = (priceStr?: string | number): number => {
    if (typeof priceStr === "number") return priceStr;
    if (!priceStr) return 0;
    const digits = priceStr.toString().replace(/[^0-9]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  const uniqueIkms = Array.from(
    new Set(umkmList.filter((item: any) => item.namaIkm).map((item: any) => item.namaIkm))
  ).sort();

  let filteredList = umkmList.filter((item: any) => {
    // 1. Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = (
        item.nama?.toLowerCase().includes(q) || 
        (item.namaIkm && item.namaIkm.toLowerCase().includes(q)) ||
        item.kategori?.toLowerCase().includes(q) ||
        item.pemilik?.toLowerCase().includes(q) ||
        item.deskripsi?.toLowerCase().includes(q) ||
        (isCertified(item.nib) && (q === "nib" || item.nib.toLowerCase().includes(q))) ||
        (isCertified(item.pirt) && (q === "pirt" || item.pirt.toLowerCase().includes(q))) ||
        (isCertified(item.halal) && (q === "halal" || item.halal.toLowerCase().includes(q)))
      );
      if (!match) return false;
    }
    
    // 2. IKM Filter (khusus NTT Mart)
    if (isNttMart && ikmFilter !== "all") {
      if (item.namaIkm !== ikmFilter) return false;
    }

    return true;
  });

  // 3. Sorting
  filteredList.sort((a, b) => {
    if (sortOrder === "az") {
      return (a.nama || "").localeCompare(b.nama || "");
    } else if (sortOrder === "za") {
      return (b.nama || "").localeCompare(a.nama || "");
    } else if (sortOrder === "price_asc") {
      return parsePrice(a.harga) - parsePrice(b.harga);
    } else if (sortOrder === "price_desc") {
      return parsePrice(b.harga) - parsePrice(a.harga);
    }
    // "default" / Terbaru
    return 0;
  });

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getUmkmFallback = (slug: string, kategori: string) => {
    if (slug === 'tenun-ikat-alor-bunda') return '/images/culture-2.jpg';
    if (slug === 'kerajinan-anyaman-lontar') return '/images/culture-3.jpg';
    if (slug === 'kopi-alor-kalabahi') return '/images/culture-1.jpg';
    if (slug === 'kacang-kenari-kupas') return '/images/view-5.jpg';
    if (slug === 'ikan-kering-kayu-alor') return '/images/culture-4.jpg';
    if (kategori === 'kriya') return '/images/culture-2.jpg';
    if (kategori === 'pangan' || kategori === 'kuliner') return '/images/culture-1.jpg';
    return '/images/culture-1.jpg';
  };

  const formatKategoriLabel = (kat: string) => {
    if (!kat) return "";
    if (kat.toLowerCase() === "pangan") return "Pangan";
    if (kat.toLowerCase() === "kriya") return "Kriya";
    if (kat.toLowerCase() === "kuliner") return "Pangan / Kuliner";
    return kat.charAt(0).toUpperCase() + kat.slice(1);
  };

  return (
    <div ref={gridRef}>
      <div className="w-full max-w-5xl mx-auto mb-12 flex flex-col md:flex-row items-center gap-3">
        {/* Search Bar */}
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
            placeholder={isNttMart ? "Cari produk NTT Mart, NIB, PIRT, Halal, atau IKM..." : "Cari produk lokal, NIB, Halal, kategori..."}
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
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
          {isNttMart && uniqueIkms.length > 0 && (
            <CustomDropdown
              label="Semua IKM"
              icon={Filter}
              value={ikmFilter}
              onChange={(val) => {
                setIkmFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { label: "Semua IKM", value: "all" },
                ...uniqueIkms.map((ikm: any) => ({ label: ikm, value: ikm }))
              ]}
              className="w-full md:w-[200px]"
            />
          )}

          <CustomDropdown
            label="Urutkan"
            icon={ArrowUpDown}
            value={sortOrder}
            onChange={(val) => {
              setSortOrder(val);
              setCurrentPage(1);
            }}
            options={[
              { label: "Terbaru", value: "default" },
              { label: "Abjad (A-Z)", value: "az" },
              { label: "Abjad (Z-A)", value: "za" },
              { label: "Harga Terendah", value: "price_asc" },
              { label: "Harga Tertinggi", value: "price_desc" },
            ]}
            className="w-full md:w-[170px]"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {paginatedList.length > 0 ? (
          <>
            <motion.div 
              key={`${sortOrder}-${ikmFilter}-${currentPage}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {paginatedList.map((umkm: any) => {
                const slug = umkm.slug?.current || umkm.slug || umkm._id;
                const hasNib = isCertified(umkm.nib);
                const hasPirt = isCertified(umkm.pirt);
                const hasHalal = isCertified(umkm.halal);
                const hasCertifications = hasNib || hasPirt || hasHalal;

                return (
                  <div
                    key={umkm._id || slug || umkm.nama}
                    className="bg-white rounded-3xl overflow-hidden border border-kabola-teal/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] group hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all flex flex-col h-full"
                  >
                    <Link href={`/umkm/${slug}`} className="flex flex-col h-full">
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100 flex-shrink-0">
                        <Image 
                          src={umkm.imageUrl || getUmkmFallback(slug, umkm.kategori)} 
                          alt={umkm.nama} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        {/* Top Left: Category Badge */}
                        {umkm.kategori && (
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-ocean-blue text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md z-10 border border-white/50">
                            {formatKategoriLabel(umkm.kategori)}
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-title text-xl text-forest mb-1 group-hover:text-kabola-teal transition-colors line-clamp-1">{umkm.nama}</h3>
                        {umkm.namaIkm && <p className="text-xs font-semibold text-kabola-teal mb-2 tracking-wide uppercase">{umkm.namaIkm}</p>}
                        {umkm.pemilik && <p className="text-xs text-earth/60 mb-3">Oleh: <span className="font-medium text-earth/80">{umkm.pemilik}</span></p>}
                        {umkm.deskripsi && <p className="text-sm text-earth/70 line-clamp-2 mb-4 leading-relaxed">{umkm.deskripsi}</p>}

                        {/* Certification Chip Labels Row matching site palette */}
                        {hasCertifications && (
                          <div className="flex flex-wrap items-center gap-1.5 mb-4 pt-1">
                            {hasPirt && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-ocean-blue/10 text-ocean-blue border border-ocean-blue/20 px-2.5 py-1 rounded-full">
                                <Award className="w-3.5 h-3.5 text-ocean-blue" />
                                <span>P-IRT</span>
                              </span>
                            )}
                            {hasHalal && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-kabola-teal/10 text-kabola-teal-dark border border-kabola-teal/20 px-2.5 py-1 rounded-full">
                                <CheckCircle2 className="w-3.5 h-3.5 text-kabola-teal-dark" />
                                <span>Halal</span>
                              </span>
                            )}
                            {hasNib && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-teal text-kabola-teal border border-kabola-teal/25 px-2.5 py-1 rounded-full">
                                <ShieldCheck className="w-3.5 h-3.5 text-kabola-teal" />
                                <span>NIB</span>
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-2 text-kabola-teal font-semibold text-sm">
                            <Tag className="w-4 h-4" />
                            {umkm.harga || "Harga bervariasi"}
                          </div>
                          <div className="w-9 h-9 rounded-full bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
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
                        className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
                          currentPage === page
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
            className="bg-white rounded-2xl border border-kabola-teal/12 p-8 text-center max-w-3xl mx-auto shadow-sm"
          >
            {searchQuery || (isNttMart && ikmFilter !== "all") ? (
              <>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1.5 rounded-full mb-4">
                  Pencarian Tidak Ditemukan
                </span>
                <p className="text-earth/60 text-sm leading-relaxed max-w-sm mx-auto">
                  Maaf, tidak ada {isNttMart ? "produk NTT Mart" : "produk UMKM"} yang sesuai dengan kriteria filter.
                </p>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-kabola-teal animate-pulse" />
                  {isNttMart ? "Segera Hadir: Produk NTT Mart" : "Segera Hadir: Foto & Desain Menyusul"}
                </span>
                <p className="text-earth/60 text-sm leading-relaxed max-w-sm mx-auto">
                  {isNttMart 
                    ? "Katalog produk NTT Mart akan segera diisi dengan dokumentasi produk pilihan." 
                    : "Katalog produk UMKM akan diisi setelah sesi dokumentasi lapangan saat KKN berlangsung."}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
