"use client";

import { useState } from "react";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { Tag, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function UmkmGrid({ 
  umkmList = [], 
  isNttMart = false 
}: { 
  umkmList: any[], 
  isNttMart?: boolean 
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = umkmList.filter((item: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.nama?.toLowerCase().includes(q) || 
      (item.namaIkm && item.namaIkm.toLowerCase().includes(q)) ||
      item.kategori?.toLowerCase().includes(q) ||
      item.pemilik?.toLowerCase().includes(q) ||
      item.deskripsi?.toLowerCase().includes(q)
    );
  });

  const getUmkmFallback = (slug: string, kategori: string) => {
    if (slug === 'tenun-ikat-alor-bunda') return '/images/culture-2.jpg';
    if (slug === 'kerajinan-anyaman-lontar') return '/images/culture-3.jpg';
    if (slug === 'kopi-alor-kalabahi') return '/images/culture-1.jpg';
    if (slug === 'kacang-kenari-kupas') return '/images/view-5.jpg';
    if (slug === 'ikan-kering-kayu-alor') return '/images/culture-4.jpg';
    if (kategori === 'kriya') return '/images/culture-2.jpg';
    if (kategori === 'kuliner') return '/images/culture-1.jpg';
    return '/images/culture-1.jpg';
  };

  return (
    <>
      <div className="relative w-full max-w-xl mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-kabola-teal/50" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-12 pr-4 py-3.5 bg-white border border-kabola-teal/15 rounded-full text-earth focus:ring-2 focus:ring-kabola-teal focus:border-kabola-teal transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] focus:shadow-[0_4px_24px_rgba(25,141,141,0.08)] outline-none"
          placeholder={isNttMart ? "Cari produk NTT Mart, nama IKM, atau deskripsi..." : "Cari produk lokal, kategori, atau nama pembuat..."}
        />
      </div>

      <AnimatePresence mode="popLayout">
        {filteredList.length > 0 ? (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredList.map((umkm: any, index: number) => {
              const slug = umkm.slug?.current || umkm.slug || umkm._id;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={umkm._id}
                  className="bg-white rounded-3xl overflow-hidden border border-kabola-teal/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] group hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  <Link href={`/umkm/${slug}`} className="block h-full">
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      <Image 
                        src={umkm.imageUrl || getUmkmFallback(slug, umkm.kategori)} 
                        alt={umkm.nama} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      {umkm.kategori && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                          {umkm.kategori}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-title text-xl text-forest mb-1 group-hover:text-kabola-teal transition-colors">{umkm.nama}</h3>
                      {umkm.namaIkm && <p className="text-sm font-medium text-kabola-teal mb-2">{umkm.namaIkm}</p>}
                      {umkm.pemilik && <p className="text-sm text-earth/60 mb-3">Oleh: {umkm.pemilik}</p>}
                      {umkm.deskripsi && <p className="text-sm text-earth/70 line-clamp-2 mb-4 leading-relaxed">{umkm.deskripsi}</p>}
                      
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-kabola-teal font-medium text-sm">
                          <Tag className="w-4 h-4" />
                          {umkm.harga || "Harga bervariasi"}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
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
                  Maaf, tidak ada {isNttMart ? "produk NTT Mart" : "produk UMKM"} yang sesuai dengan kata kunci "{searchQuery}".
                </p>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-kabola-teal animate-pulse" />
                  {isNttMart ? "Segera Hadir — Produk NTT Mart" : "Segera Hadir — Foto & Desain Menyusul"}
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
    </>
  );
}
