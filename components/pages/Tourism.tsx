"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ImageWithSkeleton from "../ui/ImageWithSkeleton";
import Link from "next/link";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  ArrowRight,
  PhoneCall,
  QrCode,
  Search,
  Compass,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  CheckCircle2,
  Tag,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

function getPaginationRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

const CATEGORIES = [
  { id: "Semua", label: "Semua Kegiatan" },
  { id: "Bahari", label: "Ekowisata Bahari" },
  { id: "Budaya", label: "Wisata Budaya" },
];

const DEFAULT_PAKET_WISATA = [
  {
    _id: "jejak-laut-kabola",
    nama: "Jejak Laut Kabola",
    slug: "jejak-laut-kabola",
    kategori: "Bahari",
    deskripsi:
      "Pengamatan Dugong Mawar di Teluk Mali, Penyeberangan Muara ke Pulau Sika, dan Pembibitan Mangrove Boiko.",
    overview: `Mengamati Dugong di Perairan Mali
Pagi itu, perahu kayu meluncur pelan meninggalkan dermaga, membelah air teluk yang masih tenang sebelum angin timur datang. Di kejauhan, garis pantai Mali mulai terlihat, dan suara mesin perahu berpadu dengan debur ombak kecil yang memecah di lambung kapal.
Suara kincir perahu memanggil sesuatu dari dasar laut. Perlahan, permukaan air bergerak, dan seekor dugong muncul ke udara, menyemburkan air sebelum kembali menyelam. Warga setempat mengenalnya sebagai Mawar, satu dari penghuni padang lamun di teluk ini, yang kehadirannya selalu terasa seperti kejutan meski sudah ditunggu. Ia tidak disentuh, tidak diberi makan, hanya dibiarkan berenang sesuka hatinya sementara pengunjung menyaksikan dari atas perahu dengan napas yang tertahan.

Menyeberangi Pulau Sika
Perjalanan berlanjut menyeberangi muara, mengarungi arus yang tenang menuju sebuah pulau yang oleh masyarakat dijaga dengan penuh hormat. Di sana bersemayam makam yang diyakini sebagai bagian dari sejarah panjang leluhur mereka, dijaga ketat oleh beberapa orang tertentu yang dipercaya merawatnya. Angin laut membawa aroma asin bercampur hangatnya matahari yang menyinari air jernih di sekitar pulau, sementara cerita tentang janji seorang sultan kepada masyarakat Mali mengalir dari mulut pemandu.

Pembibitan Mangrove
Bagi yang ingin menjejakkan kaki lebih lama di pesisir, di kawasan Boiko, bakau ditanam kembali satu demi satu, akarnya perlahan menancap pada tanah berpasir bercampur lumpur. Setiap dayung yang mengayuh air terasa seperti ikut merawat sesuatu yang lebih besar dari sekadar perjalanan.
Ketika perahu kembali, apapun rute yang dipilih, yang tertinggal bukan hanya cerita, melainkan rasa telah menjadi saksi kecil dari kehidupan laut yang masih bertahan.`,
    highlights: [
      "Menyaksikan interaksi alami dugong dengan perahu nelayan tanpa menyentuh atau mengganggunya",
      "Menyeberangi muara Mali menuju Pulau Sika dengan perahu",
      "Mendengar kisah sejarah dan kepercayaan lokal seputar makam Sultan Alamudin",
      "Menyusuri pesisir dengan kano melewati kawasan susur bakau",
      "Ikut serta dalam kegiatan pembibitan mangrove bersama warga setempat",
      "Melihat langsung area pesisir Kabola tempat bakau mulai tumbuh kembali",
    ],
    fasilitas: ["Pengamatan Dugong", "Penyeberangan Pulau Sika", "Susur Bakau Boiko"],
    durasiWisata: "Seharian / Setengah Hari",
    hargaTiket: "Hubungi Pengelola",
    namaPengelola: "Pak One",
    kontakWa: "6281236978212",
    imageUrl: "/images/poster-jejak-laut-kabola.png",
  },
  {
    _id: "jejak-warisan-kabola",
    nama: "Jejak Warisan Kabola",
    slug: "jejak-warisan-kabola",
    kategori: "Budaya",
    deskripsi:
      "Eksplorasi Kampung Tradisional Monbang, Rumah Adat Sanggar Ehenghulu, Pakaian Kulit Kayu, dan Tarian Lego-Lego.",
    overview: `Jalan setapak menuju Kampung Tradisional Monbang terasa seperti mengantar langkah menuju sebuah cerita yang belum pernah diceritakan. Di antara pepohonan, atap rumah adat mulai terlihat menjulang, suara gong mulai terdengar samar, seolah kampung ini sedang membuka pintunya untuk menyambut siapa saja yang datang.
Begitu tiba di sanggar Ehenghulu, mata akan tertuju pada rumah adat suku Kabola yang berdiri dengan atap alang-alang berbentuk bulat, dindingnya dari anyaman bambu dan daun lontar yang menyimpan jejak tangan-tangan lama. Di tengah kampung, terdapat susunan batu melingkar yang disebut mesbah, berdiri diam namun sarat makna. Tempat itu bukan sekadar batu yang tersusun, melainkan saksi doa-doa para tetua yang pernah dipanjatkan kepada alam dan para leluhur. Pengunjung juga berkesempatan mengenakan pakaian tradisional dari kulit kayu pohon ka, merasakan sendiri tekstur kasar namun hangat yang dulu membalut tubuh nenek moyang suku Kabola.
Suasana kian hidup ketika tarian Cakalele ditampilkan, penari bergerak gagah membawa parang diiringi tabuhan gong yang menggema di antara rumah-rumah adat. Tak lama kemudian, warga berkumpul mengelilingi mesbah, bergandengan tangan dalam formasi melingkar, menghentakkan kaki bersama dalam tarian Lego-lego sambil melantunkan nyanyian pujian, sebuah gambaran nyata dari persatuan yang diwariskan turun temurun.
Ketika langkah kaki meninggalkan Monbang, yang tertinggal bukan hanya foto atau catatan perjalanan, melainkan rasa terhubung dengan sebuah kisah yang masih hidup.`,
    highlights: [
      "Menjelajahi sanggar Ehenghulu dan mengamati arsitektur rumah adat suku Kabola dari dekat",
      "Mendengarkan makna sakral di balik mesbah, tempat doa leluhur dan simbol persatuan",
      "Mengenakan pakaian tradisional dari kulit kayu pohon ka",
      "Menyaksikan tarian penyambutan Cakalele yang diiringi gong",
      "Ikut merasakan kehangatan Tari Lego-lego dalam formasi melingkar bersama warga",
    ],
    fasilitas: ["Rumah Adat Monbang", "Pakaian Kulit Kayu Ka", "Tarian Lego-Lego"],
    durasiWisata: "Setengah Hari",
    hargaTiket: "Hubungi Pengelola",
    namaPengelola: "Pak Moses",
    kontakWa: "6281338619737",
    imageUrl: "/images/poster-jejak-warisan-kabola.png",
  },
];

export default function Tourism({ wisataList = [] }: { wisataList?: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeList = wisataList && wisataList.length > 0 ? wisataList : DEFAULT_PAKET_WISATA;

  const filteredList = activeList.filter((pkg) => {
    // Category match
    if (activeCategory !== "Semua") {
      const pkgKat = pkg.kategori || (pkg.slug?.includes("laut") ? "Bahari" : "Budaya");
      if (pkgKat !== activeCategory) return false;
    }
    // Search match
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      pkg.nama?.toLowerCase().includes(q) ||
      pkg.deskripsi?.toLowerCase().includes(q) ||
      pkg.overview?.toLowerCase().includes(q) ||
      pkg.namaPengelola?.toLowerCase().includes(q) ||
      (pkg.fasilitas && pkg.fasilitas.some((f: string) => f.toLowerCase().includes(q)))
    );
  });

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const paginatedList = filteredList.slice(
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
      {/* Hero Header Section */}
      <section id="wisata-hero" className="relative bg-forest pt-32 pb-28 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Radial Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-kabola-teal/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10 text-center">
          <SlideUp delay={0}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-md shadow-lg shadow-black/10">
              <Compass className="w-8 h-8 text-kabola-teal-light" />
            </div>
            <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/15 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-kabola-teal-light" />
              Direktori Kegiatan Wisata Kabola
            </span>
            <h1 className="font-title text-4xl md:text-6xl text-white mb-4 leading-tight">
              Jelajahi <span className="text-kabola-teal-light">Kegiatan Wisata</span>
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
              Pengalaman ekowisata bahari dan wisata budaya otentik Kecamatan Kabola. Terhubung langsung dengan pengelola lokal untuk reservasi instan.
            </p>
          </SlideUp>
        </div>

        <div className="wave-bottom pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#F7F3EB" />
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="wisata" ref={sectionRef} className="py-16 md:py-24 dot-pattern relative">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

          {/* Filter Pills & Search Bar */}
          <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto mb-14">

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/80 backdrop-blur-md border border-kabola-teal/15 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setCurrentPage(1);
                    }}
                    className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${isActive ? "text-white" : "text-earth/70 hover:text-kabola-teal"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryBg"
                        className="absolute inset-0 bg-kabola-teal rounded-full shadow-md shadow-kabola-teal/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-kabola-teal/50" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full pl-12 pr-10 py-3.5 bg-white border border-kabola-teal/15 rounded-full text-earth focus:ring-2 focus:ring-kabola-teal focus:border-kabola-teal transition-all shadow-[0_2px_16px_rgba(0,0,0,0.03)] focus:shadow-[0_4px_24px_rgba(25,141,141,0.08)] outline-none text-sm"
                placeholder="Cari kegiatan wisata, dugong, Monbang, atau nama pengelola..."
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-earth/40 hover:text-earth transition-colors"
                  aria-label="Hapus pencarian"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <AnimatePresence mode="popLayout">
            {paginatedList.length > 0 ? (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                >
                  {paginatedList.map((pkg) => {
                    const slug = pkg.slug?.current || pkg.slug || pkg._id;
                    const posterSrc = pkg.imageUrl || `/images/poster-${slug}.png`;
                    const waNumber = pkg.kontakWa || "6283117149096";
                    const pengelolaName = pkg.namaPengelola || "Pengelola Wisata";
                    const kategoriLabel = pkg.kategori || (slug.includes("laut") ? "Bahari" : "Budaya");

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                        key={pkg._id}
                        className="group relative rounded-3xl overflow-hidden bg-white border border-kabola-teal/12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(25,141,141,0.12)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
                      >
                        <Link
                          href={`/wisata/${slug}`}
                          className="block h-full w-full flex flex-col justify-between"
                        >
                          <div>
                            {/* Poster Image Container */}
                            <ImageWithSkeleton
                              wrapperClassName="h-48 md:h-52 w-full relative bg-slate-100 overflow-hidden"
                              src={posterSrc}
                              alt={pkg.nama}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            >
                              {/* Top Badges */}
                              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                                <span className="bg-forest/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-sm border border-white/20">
                                  <Tag className="w-3 h-3 text-kabola-teal-light" />
                                  {kategoriLabel}
                                </span>
                                <span className="bg-white/90 backdrop-blur-md text-forest text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-sm border border-white/40">
                                  <Clock className="w-3 h-3 text-kabola-teal" />
                                  {pkg.durasiWisata || "Setengah Hari"}
                                </span>
                              </div>
                            </ImageWithSkeleton>

                            {/* Card Content Body */}
                            <div className="p-5 md:p-6">
                              <h3 className="font-title text-xl text-forest mb-2 group-hover:text-kabola-teal transition-colors">
                                {pkg.nama}
                              </h3>

                              {pengelolaName && (
                                <div className="inline-flex items-center gap-1.5 text-kabola-teal text-[11px] font-bold uppercase tracking-wider mb-2.5 bg-kabola-teal/8 px-2.5 py-0.5 rounded-full border border-kabola-teal/15">
                                  <Users className="w-3 h-3 text-kabola-teal" />
                                  <span>Pengelola: <strong className="text-forest">{pengelolaName}</strong></span>
                                </div>
                              )}

                              {pkg.deskripsi && (
                                <p className="text-earth/70 text-xs md:text-sm mb-4 line-clamp-2 leading-relaxed">
                                  {pkg.deskripsi}
                                </p>
                              )}

                              {/* Highlight Badges */}
                              {pkg.fasilitas && pkg.fasilitas.length > 0 && (
                                <ul className="flex flex-wrap gap-1.5 mb-1">
                                  {pkg.fasilitas.slice(0, 3).map((f: string, fi: number) => (
                                    <li
                                      key={fi}
                                      className="inline-flex items-center gap-1 bg-sand/90 text-earth/80 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-kabola-teal/10"
                                    >
                                      <CheckCircle2 className="w-3 h-3 text-kabola-teal" />
                                      <span className="line-clamp-1">{f}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>

                          {/* Card Footer CTA */}
                          <div className="px-5 py-4 flex items-center justify-between border-t border-slate-100/80 mt-auto bg-slate-50/50">
                            <span className="text-earth/60 font-medium text-[11px]">
                              {pkg.hargaTiket || "Hubungi Pengelola"}
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  `https://wa.me/${waNumber}?text=Halo ${pengelolaName}, saya tertarik reservasi kegiatan "${pkg.nama}" yang ada di Kabola Digital Hub.`,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-kabola-teal hover:bg-kabola-teal-dark text-white text-[11px] font-bold transition-all duration-300 group/btn shadow-md shadow-kabola-teal/15 hover:-translate-y-0.5"
                            >
                              <PhoneCall className="w-3 h-3" />
                              <span>Reservasi WA</span>
                              <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mb-14">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2.5 rounded-full bg-white border border-earth/15 text-forest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sand transition-all shadow-sm"
                      aria-label="Halaman Sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {getPaginationRange(currentPage, totalPages).map((page, idx) =>
                        page === "..." ? (
                          <span
                            key={`ellipsis-${idx}`}
                            className="w-8 h-8 flex items-center justify-center text-earth/40 text-sm select-none"
                          >
                            …
                          </span>
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
                      className="p-2.5 rounded-full bg-white border border-earth/15 text-forest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sand transition-all shadow-sm"
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
                className="bg-white rounded-3xl border border-kabola-teal/12 p-10 text-center max-w-2xl mx-auto mb-14 shadow-sm"
              >
                {searchQuery ? (
                  <>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1.5 rounded-full mb-4">
                      Pencarian Tidak Ditemukan
                    </span>
                    <p className="text-earth/60 text-sm leading-relaxed max-w-sm mx-auto mb-4">
                      Maaf, tidak ada kegiatan wisata yang sesuai dengan kata kunci "{searchQuery}".
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kabola-teal/10 text-kabola-teal text-xs font-bold hover:bg-kabola-teal/20 transition-colors"
                    >
                      Reset Pencarian
                    </button>
                  </>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3.5 py-1.5 rounded-full mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-kabola-teal animate-pulse" />
                      Belum Ada Kegiatan Wisata
                    </span>
                    <p className="text-earth/60 text-sm leading-relaxed max-w-sm mx-auto">
                      Katalog kegiatan wisata pada kategori ini sedang dalam tahap penyusunan.
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Information Banners */}
          <div className="space-y-6 max-w-5xl mx-auto">

            {/* Pokdarwis Partner Banner */}
            <SlideUp
              delay={0.2}
              inView={true}
              className="rounded-3xl bg-white border border-kabola-teal/12 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-forest/8 flex items-center justify-center text-forest">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-title text-xl text-forest">Pokdarwis Kabola (Mitra Lokal)</h4>
                </div>
                <p className="text-earth/60 text-sm max-w-xl mt-2 leading-relaxed">
                  Kelompok Sadar Wisata (Pokdarwis) Kabola adalah mitra pengelola lokal yang memandu seluruh kegiatan wisata di wilayah Kabola secara ramah lingkungan &amp; berkelanjutan.
                </p>
              </div>
              <a
                href="https://wa.me/6283117149096"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-forest hover:bg-ocean-blue-light text-white font-bold text-xs md:text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-forest/20 whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Hubungi Pokdarwis</span>
              </a>
            </SlideUp>

            {/* QR Code Board Integration Banner */}
            <SlideUp
              delay={0.3}
              inView={true}
              className="rounded-3xl bg-white border border-kabola-teal/12 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-kabola-teal/10 flex items-center justify-center text-kabola-teal">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <h4 className="font-title text-xl text-forest">Integrasi Papan Informasi Fisik (QR Code)</h4>
                </div>
                <p className="text-earth/60 text-sm max-w-3xl leading-relaxed">
                  Katalog kegiatan wisata ini terhubung langsung dengan Papan Informasi Wisata fisik berbahan akrilik tahan cuaca yang tersebar di titik-titik lokasi Kabola. Wisatawan cukup memindai <strong className="text-forest">QR Code</strong> pada papan lokasi untuk langsung membaca informasi &amp; menghubungi pengelola secara instan.
                </p>
              </div>
              <div className="flex-shrink-0 w-24 h-24 bg-sand/70 rounded-2xl border border-kabola-teal/15 flex flex-col items-center justify-center shadow-inner">
                <QrCode className="w-10 h-10 text-forest mb-1" />
                <span className="text-[9px] font-bold tracking-widest text-kabola-teal uppercase">Scan QR</span>
              </div>
            </SlideUp>

          </div>

        </div>
      </section>
    </>
  );
}
