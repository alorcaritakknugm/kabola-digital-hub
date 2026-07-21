"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map,
  Layers,
  Download,
  ExternalLink,
  Maximize2,
  X,
  Search,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  Move,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { SlideUp } from "@/components/ui/animations/SlideUp";

export type MapItem = {
  id: string;
  title: string;
  category: "administrasi" | "mitigasi";
  categoryLabel: string;
  image: string;
  description: string;
  village: string;
};

const DRIVE_DOWNLOAD_LINK = "https://bit.ly/PemetaanKabolaPander";
const ITEMS_PER_PAGE = 6;

const MAP_ITEMS: MapItem[] = [
  {
    id: "batas-rt",
    title: "Peta Batas RT Kelurahan Kabola",
    category: "administrasi",
    categoryLabel: "Administrasi & Batas",
    image: "/images/peta-batas-rt-kabola.png",
    description: "Pemetaan rukun tetangga (RT), rukun warga (RW), serta tata kelola administrasi batas wilayah di Kelurahan Kabola.",
    village: "Kelurahan Kabola"
  },
  {
    id: "kontur",
    title: "Peta Kontur & Topografi Kabola",
    category: "administrasi",
    categoryLabel: "Geografi & Elevasi",
    image: "/images/peta-kontur-kabola.png",
    description: "Visualisasi garis kontur ketinggian lahan, garis kemiringan lereng, dan profil morfo-topografi perbukitan Kabola.",
    village: "Kelurahan Kabola"
  },
  {
    id: "jenis-tanah",
    title: "Peta Jenis Tanah Kabola",
    category: "administrasi",
    categoryLabel: "Geografi & Tanah",
    image: "/images/peta-jenis-tanah-kabola.png",
    description: "Klasifikasi jenis dan orde tanah serta peta persebaran sifat tanah untuk potensi pertanian dan pemukiman.",
    village: "Kelurahan Kabola"
  },
  {
    id: "tutupan-lahan",
    title: "Peta Tutupan Lahan Kabola",
    category: "administrasi",
    categoryLabel: "Penggunaan Lahan",
    image: "/images/peta-tutupan-lahan-kabola.png",
    description: "Distribusi penggunaan dan tutupan lahan mencakup kawasan pemukiman, kebun warga, vegetasi hutan, dan pesisir.",
    village: "Kelurahan Kabola"
  },
  {
    id: "bahaya-bencana",
    title: "Peta Bahaya Bencana Multi-Risiko",
    category: "mitigasi",
    categoryLabel: "Mitigasi Bencana",
    image: "/images/peta-bahaya-bencana-kabola.png",
    description: "Peta integrasi komprehensif tingkat ancaman dan kerawanan multi-bencana di seluruh kawasan Kelurahan Kabola.",
    village: "Kelurahan Kabola"
  },
  {
    id: "cuaca-ekstrem",
    title: "Peta Bahaya Cuaca Ekstrem",
    category: "mitigasi",
    categoryLabel: "Mitigasi Bencana",
    image: "/images/peta-bahaya-cuaca-ekstrem-kabola.png",
    description: "Zonasi potensi terdampak cuaca ekstrem seperti angin kencang dan hujan lebat berintensitas tinggi.",
    village: "Kelurahan Kabola"
  },
  {
    id: "gelombang-abrasi",
    title: "Peta Bahaya Gelombang Ekstrem & Abrasi",
    category: "mitigasi",
    categoryLabel: "Mitigasi Pesisir",
    image: "/images/peta-bahaya-gelombang-ekstrem-dan-abrasi-kabola.png",
    description: "Pemetaan daerah garis pantai yang rentan terhadap gempuran gelombang tinggi laut dan dampak erosi/abrasi pesisir.",
    village: "Kelurahan Kabola"
  },
  {
    id: "kebakaran-hutan",
    title: "Peta Bahaya Kebakaran Hutan & Lahan",
    category: "mitigasi",
    categoryLabel: "Mitigasi Bencana",
    image: "/images/peta-bahaya-kebakaran-hutan-dan-lahan-kabola.png",
    description: "Tingkat kerawanan Karhutla di kawasan vegetasi kering, perbukitan, dan lahan perkebunan masyarakat.",
    village: "Kelurahan Kabola"
  },
  {
    id: "kekeringan",
    title: "Peta Bahaya Kekeringan",
    category: "mitigasi",
    categoryLabel: "Mitigasi Bencana",
    image: "/images/peta-bahaya-kekeringan-kabola.png",
    description: "Zonasi potensi ancaman kekeringan air bersih serta dampaknya bagi pertanian warga pada musim kemarau panjang.",
    village: "Kelurahan Kabola"
  },
  {
    id: "tanah-longsor",
    title: "Peta Bahaya Tanah Longsor",
    category: "mitigasi",
    categoryLabel: "Mitigasi Bencana",
    image: "/images/peta-bahaya-tanah-longsor-kabola.png",
    description: "Pemetaan wilayah rawan gerakan tanah dan titik bahaya tanah longsor pada lereng-lereng curam Kabola.",
    village: "Kelurahan Kabola"
  }
];

export default function GisMap() {
  const [activeCategory, setActiveCategory] = useState<"all" | "administrasi" | "mitigasi">("all");
  const [selectedMap, setSelectedMap] = useState<MapItem>(MAP_ITEMS[0]);
  const [isFullscreenViewer, setIsFullscreenViewer] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Smooth Interactive Map State (Zoom & Pan)
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Reset page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Lock body scroll when fullscreen modal is active
  useEffect(() => {
    if (isFullscreenViewer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreenViewer]);

  // Reset zoom & pan when map selection changes
  useEffect(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [selectedMap.id]);

  // Smooth & gentle zoom step
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.2, 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Mouse drag to pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Smooth wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const step = e.deltaY < 0 ? 0.15 : -0.15;
    setZoomLevel((prev) => {
      const next = Math.min(Math.max(prev + step, 1), 3.5);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const filteredMaps = MAP_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredMaps.length / ITEMS_PER_PAGE);
  const paginatedMaps = filteredMaps.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const categories = [
    { id: "all", label: `Semua Peta (${MAP_ITEMS.length})` },
    { id: "administrasi", label: `Administrasi (${MAP_ITEMS.filter((m) => m.category === "administrasi").length})` },
    { id: "mitigasi", label: `Mitigasi Bencana (${MAP_ITEMS.filter((m) => m.category === "mitigasi").length})` },
  ];

  return (
    <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-sand-light/50">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-kabola-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 translate-y-1/4 -translate-x-1/3 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-sunburst/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Header Section */}
        <SlideUp inView yOffset={30} duration={0.7} className="text-center mb-8 sm:mb-10">
          <span className="inline-block bg-kabola-teal/10 text-kabola-teal text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3.5 sm:px-4 py-1.5 rounded-full mb-3 sm:mb-4 border border-kabola-teal/20">
            Sistem Informasi Geografis (GIS)
          </span>
          <h2 className="font-title text-3xl sm:text-4xl md:text-5xl text-forest mb-3 sm:mb-4 leading-tight">
            Peta Digital Interaktif <span className="text-gradient-teal">Kabola</span>
          </h2>
          <p className="text-earth/60 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2">
            Eksplorasi seluruh 10 peta administrasi wilayah, topografi, tutupan lahan, dan zonasi mitigasi bencana di Kecamatan Kabola. Gunakan kontrol zoom &amp; geser untuk inspeksi detail.
          </p>

          {/* Primary Download Button */}
          <div className="mt-5 sm:mt-6 flex items-center justify-center">
            <a
              href={DRIVE_DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-kabola-teal text-white text-xs sm:text-sm font-semibold hover:bg-kabola-teal-dark transition-all duration-300 shadow-md shadow-kabola-teal/20 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span className="truncate">Unduh Album Peta High-Res (Google Drive)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" />
            </a>
          </div>
        </SlideUp>

        {/* GIS Interactive Viewer Workspace */}
        <SlideUp inView yOffset={30} duration={0.7} delay={0.1} className="mb-12 sm:mb-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-kabola-teal/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
            
            {/* Toolbar Topbar */}
            <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-3.5 bg-forest border-b border-white/10 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Map className="w-4 h-4 text-kabola-teal-light shrink-0" />
                <span className="text-white text-xs sm:text-sm font-semibold tracking-wide truncate">
                  GIS Viewer · {selectedMap.title}
                </span>
              </div>
              <button
                onClick={() => setIsFullscreenViewer(true)}
                className="bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lihat Fullscreen</span>
                <span className="sm:hidden">Fullscreen</span>
              </button>
            </div>

            {/* Layer Selector Chips Bar for Mobile/Tablet (< lg) */}
            <div className="lg:hidden bg-forest/5 border-b border-kabola-teal/10 px-3 py-2.5 overflow-x-auto scrollbar-none flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest/60 shrink-0 flex items-center gap-1">
                <Layers className="w-3 h-3 text-kabola-teal" /> Layer:
              </span>
              {MAP_ITEMS.map((item) => {
                const isSelected = selectedMap.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMap(item)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all border ${
                      isSelected
                        ? "bg-kabola-teal text-white border-kabola-teal shadow-sm"
                        : "bg-white text-earth/70 border-earth/15 hover:border-kabola-teal/30"
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            {/* Viewer Workspace Layout */}
            <div className="flex flex-col lg:flex-row">
              
              {/* Left Layer Selector Panel for Desktop (>= lg) */}
              <div className="hidden lg:flex w-72 bg-forest/5 border-r border-kabola-teal/10 p-4 flex-col justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-kabola-teal/10">
                    <Layers className="w-4 h-4 text-kabola-teal" />
                    <span className="text-forest font-semibold text-xs uppercase tracking-wider">Pilih Layer Peta ({MAP_ITEMS.length})</span>
                  </div>
                  
                  {/* Map Selector List for Desktop */}
                  <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1 text-xs">
                    {MAP_ITEMS.map((item) => {
                      const isSelected = selectedMap.id === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedMap(item)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-2 border ${
                            isSelected
                              ? "bg-kabola-teal text-white border-kabola-teal shadow-md"
                              : "bg-white/60 hover:bg-white text-earth/80 border-earth/10 hover:border-kabola-teal/30"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <span className={`block font-semibold line-clamp-1 ${isSelected ? "text-white" : "text-forest"}`}>
                              {item.title}
                            </span>
                            <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-white/80" : "text-earth/50"}`}>
                              {item.categoryLabel}
                            </span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-earth/10 text-[11px] text-earth/60">
                  <p className="leading-snug">
                    Klik layer peta untuk berganti tampilan secara langsung.
                  </p>
                </div>
              </div>

              {/* Main Interactive Screen & Controls */}
              <div className="flex-1 flex flex-col min-w-0">
                
                {/* Interactive Canvas / Soft Forest Dark Screen */}
                <div
                  ref={containerRef}
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className={`relative flex-1 bg-[#0D2E27] min-h-[300px] sm:min-h-[380px] md:min-h-[440px] overflow-hidden flex items-center justify-center p-2 sm:p-3 select-none ${
                    zoomLevel > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
                  }`}
                >
                  {/* Background Topographic Pattern Overlay */}
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                      backgroundSize: "24px 24px"
                    }}
                  />

                  {/* High-Res Map Render Container with Dynamic Zoom & Pan */}
                  <div
                    className="relative w-full h-full min-h-[280px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                      transformOrigin: "center center",
                    }}
                  >
                    <Image
                      src={selectedMap.image}
                      alt={selectedMap.title}
                      fill
                      priority
                      className="object-contain pointer-events-none drop-shadow-lg"
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </div>

                  {/* Top Left Floating Compass & Coordinates */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-forest/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 sm:gap-2 pointer-events-none shadow-md z-20 max-w-[170px] sm:max-w-none truncate">
                    <Compass className="w-3.5 h-3.5 text-sunburst shrink-0" />
                    <span className="truncate">8°11'S, 124°31'E · {selectedMap.village}</span>
                  </div>

                  {/* Top Right Zoom Controls & Reset Button */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-1.5 bg-forest/90 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-md z-20">
                    <button
                      onClick={handleZoomIn}
                      className="p-1 sm:p-1.5 text-white hover:bg-white/20 rounded-full transition-colors"
                      title="Perbesar (Zoom In)"
                    >
                      <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <span className="text-white text-[10px] sm:text-[11px] font-mono font-semibold px-1 sm:px-1.5">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomOut}
                      className="p-1 sm:p-1.5 text-white hover:bg-white/20 rounded-full transition-colors"
                      title="Perkecil (Zoom Out)"
                    >
                      <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    {zoomLevel > 1 && (
                      <button
                        onClick={handleResetView}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-white hover:text-white bg-white/15 hover:bg-white/30 rounded-full transition-colors border border-white/20 flex items-center gap-1 text-[10px] font-semibold"
                        title="Reset Tampilan"
                      >
                        <RotateCcw className="w-3 h-3 text-emerald-300" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>

                  {/* Bottom Drag / Pan Helper Hint when zoomed */}
                  {zoomLevel > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-forest/90 text-white/90 text-[10px] sm:text-[11px] px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none flex items-center gap-1.5 shadow-md z-20 border border-white/10 whitespace-nowrap">
                      <Move className="w-3 h-3" />
                      <span>Geser Peta</span>
                    </div>
                  )}
                </div>

                {/* Map Summary Info Bar below viewer */}
                <div className="p-3.5 sm:p-5 bg-white border-t border-earth/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-title text-base sm:text-lg md:text-xl text-forest mb-0.5 sm:mb-1">
                      {selectedMap.title}
                    </h3>
                    <p className="text-earth/60 text-xs sm:text-sm leading-relaxed max-w-2xl">
                      {selectedMap.description}
                    </p>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1 rounded-full border border-kabola-teal/20 shrink-0 self-start sm:self-center">
                    {selectedMap.village}
                  </span>
                </div>

              </div>

            </div>
          </div>
        </SlideUp>

        {/* Tab Selector Buttons - CENTERED ON ALL SCREENS */}
        <div ref={galleryRef} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 text-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-kabola-teal text-white shadow-md scale-105"
                    : "bg-kabola-teal/10 text-kabola-teal hover:opacity-80"
                }`}
              >
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar matching Tourism.tsx & CeritaKabola.tsx */}
        <div className="relative w-full max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-kabola-teal/50" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 sm:pl-12 pr-9 sm:pr-10 py-3 sm:py-3.5 bg-white border border-kabola-teal/15 rounded-full text-earth text-xs sm:text-sm focus:ring-2 focus:ring-kabola-teal focus:border-kabola-teal transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] focus:shadow-[0_4px_24px_rgba(25,141,141,0.08)] outline-none"
            placeholder="Cari peta administrasi, kontur, jenis tanah, atau bencana..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 sm:pr-4 flex items-center text-earth/40 hover:text-earth"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Clean Animated Card Grid & Pagination */}
        <AnimatePresence mode="wait">
          {paginatedMaps.length > 0 ? (
            <div>
              <motion.div
                key={activeCategory + searchQuery + currentPage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10"
              >
                {paginatedMaps.map((mapItem) => {
                  const isSelected = selectedMap.id === mapItem.id;
                  return (
                    <motion.div
                      key={mapItem.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => {
                        setSelectedMap(mapItem);
                        setIsFullscreenViewer(true);
                      }}
                      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                        isSelected ? "border-kabola-teal ring-2 ring-kabola-teal/20" : "border-kabola-teal/10"
                      }`}
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-100">
                          <Image
                            src={mapItem.image}
                            alt={mapItem.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />

                          {/* Category Badge */}
                          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-2">
                            <span className="bg-white/90 backdrop-blur-sm text-forest text-[10px] font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                              <Layers className="w-3 h-3 text-kabola-teal" />
                              {mapItem.categoryLabel}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-6">
                          <h4 className="font-title text-lg sm:text-xl text-forest mb-2 group-hover:text-kabola-teal transition-colors">
                            {mapItem.title}
                          </h4>
                          <p className="text-earth/60 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                            {mapItem.description}
                          </p>
                        </div>
                      </div>

                      {/* Centered Card Action Footer */}
                      <div className="px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-t border-slate-100 mt-auto bg-sand-light/30">
                        <span className="text-forest font-semibold text-xs leading-none">
                          {mapItem.village}
                        </span>
                        <span className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-kabola-teal text-white text-xs font-semibold hover:bg-kabola-teal-dark transition-all duration-300 shadow-md shadow-kabola-teal/20 leading-none">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Lihat Fullscreen</span>
                        </span>
                      </div>
                    </motion.div>
                  );
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
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
                          currentPage === page
                            ? "bg-kabola-teal text-white shadow-md shadow-kabola-teal/20"
                            : "bg-white text-earth/70 hover:bg-sand border border-earth/10"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
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
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border border-kabola-teal/10 p-6 sm:p-8 shadow-sm">
              <Map className="w-10 h-10 sm:w-12 sm:h-12 text-earth/30 mx-auto mb-3" />
              <h4 className="font-title text-lg sm:text-xl text-forest mb-1">Peta tidak ditemukan</h4>
              <p className="text-earth/60 text-xs sm:text-sm max-w-md mx-auto mb-4">
                Tidak ada peta yang cocok dengan pencarian kata kunci "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs font-semibold text-kabola-teal underline"
              >
                Reset Filter
              </button>
            </div>
          )}
        </AnimatePresence>

      </div>

      {/* FULLSCREEN GIS VIEWER MODAL */}
      <AnimatePresence>
        {isFullscreenViewer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A2620]/95 backdrop-blur-md flex flex-col p-0 sm:p-4 md:p-6 overflow-hidden"
            onClick={() => setIsFullscreenViewer(false)}
          >
            <div
              className="flex-1 w-full h-full bg-white rounded-none sm:rounded-3xl border-0 sm:border border-kabola-teal/20 shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fullscreen Topbar with 'Unduh Peta' Text */}
              <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-4 bg-forest border-b border-white/10 shrink-0 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Map className="w-4 h-4 sm:w-5 sm:h-5 text-kabola-teal-light shrink-0" />
                  <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-wide truncate">
                    GIS Viewer · {selectedMap.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={DRIVE_DOWNLOAD_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-kabola-teal hover:bg-kabola-teal-dark text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Peta</span>
                  </a>
                  <button
                    onClick={() => setIsFullscreenViewer(false)}
                    className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-colors"
                    title="Tutup Fullscreen"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Fullscreen Layer Chips Bar for Mobile/Tablet (< lg) */}
              <div className="lg:hidden bg-forest/5 border-b border-kabola-teal/10 px-3 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest/60 shrink-0 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-kabola-teal" /> Layer:
                </span>
                {MAP_ITEMS.map((item) => {
                  const isSelected = selectedMap.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedMap(item)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap shrink-0 transition-all border ${
                        isSelected
                          ? "bg-kabola-teal text-white border-kabola-teal shadow-sm"
                          : "bg-white text-earth/70 border-earth/15 hover:border-kabola-teal/30"
                      }`}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>

              {/* Fullscreen GIS Workspace Layout */}
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Side Layer Selector in Fullscreen for Desktop (>= lg) */}
                <div className="hidden lg:flex w-80 bg-forest/5 border-r border-kabola-teal/10 p-4 flex-col justify-between overflow-y-auto shrink-0">
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-kabola-teal/10">
                      <Layers className="w-4 h-4 text-kabola-teal" />
                      <span className="text-forest font-semibold text-xs uppercase tracking-wider">Pilih Layer Peta ({MAP_ITEMS.length})</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {MAP_ITEMS.map((item) => {
                        const isSelected = selectedMap.id === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setSelectedMap(item)}
                            className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 border ${
                              isSelected
                                ? "bg-kabola-teal text-white border-kabola-teal shadow-md font-semibold"
                                : "bg-white/70 hover:bg-white text-earth/80 border-earth/10 hover:border-kabola-teal/30"
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <span className={`block line-clamp-1 ${isSelected ? "text-white" : "text-forest font-medium"}`}>
                                {item.title}
                              </span>
                              <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-white/80" : "text-earth/50"}`}>
                                {item.categoryLabel}
                              </span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Main Interactive Screen in Fullscreen */}
                <div
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className={`flex-1 flex flex-col bg-[#0D2E27] overflow-hidden relative p-2 sm:p-3 select-none ${
                    zoomLevel > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
                  }`}
                >
                  <div className="relative w-full h-full overflow-hidden flex items-center justify-center rounded-xl sm:rounded-2xl">
                    <div
                      className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                        transformOrigin: "center center",
                      }}
                    >
                      <Image
                        src={selectedMap.image}
                        alt={selectedMap.title}
                        fill
                        priority
                        className="object-contain pointer-events-none drop-shadow-lg"
                        sizes="100vw"
                      />
                    </div>

                    {/* Compass & Coordinates in Fullscreen */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-forest/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 sm:gap-2 pointer-events-none shadow-md max-w-[160px] sm:max-w-none truncate">
                      <Compass className="w-3.5 h-3.5 text-sunburst shrink-0" />
                      <span className="truncate">8°11'S, 124°31'E · {selectedMap.village}</span>
                    </div>

                    {/* Gentle Zoom Controls in Fullscreen */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-1.5 bg-forest/90 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-md z-30">
                      <button
                        onClick={handleZoomIn}
                        className="p-1 sm:p-1.5 text-white hover:bg-white/20 rounded-full transition-colors"
                        title="Perbesar (Zoom In)"
                      >
                        <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <span className="text-white text-[10px] sm:text-[11px] font-mono font-semibold px-1 sm:px-1.5">
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      <button
                        onClick={handleZoomOut}
                        className="p-1 sm:p-1.5 text-white hover:bg-white/20 rounded-full transition-colors"
                        title="Perkecil (Zoom Out)"
                      >
                        <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      {zoomLevel > 1 && (
                        <button
                          onClick={handleResetView}
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-white hover:text-white bg-white/15 hover:bg-white/30 rounded-full transition-colors border border-white/20 flex items-center gap-1 text-[10px] font-semibold"
                          title="Reset Tampilan"
                        >
                          <RotateCcw className="w-3 h-3 text-emerald-300" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>

                    {/* Drag hint when zoomed in Fullscreen */}
                    {zoomLevel > 1 && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-forest/90 text-white/90 text-[10px] sm:text-[11px] px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none flex items-center gap-1.5 shadow-md z-20 border border-white/10 whitespace-nowrap">
                        <Move className="w-3 h-3" />
                        <span>Geser Peta</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Map Info Footer in Fullscreen */}
                  <div className="p-3 sm:p-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 shrink-0">
                    <div>
                      <h4 className="font-title text-base sm:text-lg text-forest mb-0.5">{selectedMap.title}</h4>
                      <p className="text-earth/70 text-xs leading-relaxed max-w-3xl line-clamp-2 sm:line-clamp-none">{selectedMap.description}</p>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1 rounded-full border border-kabola-teal/20 shrink-0">
                      {selectedMap.village}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
