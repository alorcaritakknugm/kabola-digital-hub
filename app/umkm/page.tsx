import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { ShoppingBag, ArrowRight, Phone, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { umkmQuery } from "@/sanity/lib/queries";

export const revalidate = 0;

export default async function UmkmPage() {
  const umkmList = await client.fetch(umkmQuery);

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      <section className="relative bg-ocean-blue pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <SlideUp delay={0}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-kabola-teal-light" />
            </div>
            <span className="inline-block bg-white/10 text-white/60 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
              Kecamatan Kabola · Ekonomi Lokal
            </span>
            <h1 className="font-title text-4xl md:text-5xl text-white mb-4">Katalog Visual UMKM</h1>
            <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed">
              Dokumentasi produk lokal UMKM Kabola. Dukung ekonomi lokal dengan membeli langsung dari para perajin dan pembuatnya.
            </p>
          </SlideUp>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16"><path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#F7F3EB" /></svg>
        </div>
      </section>
      
      <section className="py-16 md:py-24 dot-pattern">
        <div className="container mx-auto px-4 max-w-6xl">
          {umkmList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {umkmList.map((umkm: any, index: number) => (
                <SlideUp key={umkm._id} delay={index * 0.1} inView={true} className="bg-white rounded-3xl overflow-hidden border border-kabola-teal/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] group">
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    {umkm.imageUrl ? (
                      <Image src={umkm.imageUrl} alt={umkm.nama} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400">Belum ada foto</div>
                    )}
                    {umkm.kategori && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                        {umkm.kategori}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-title text-xl text-forest mb-2">{umkm.nama}</h3>
                    {umkm.pemilik && <p className="text-sm text-earth/60 mb-3">Oleh: {umkm.pemilik}</p>}
                    {umkm.deskripsi && <p className="text-sm text-earth/70 line-clamp-2 mb-4 leading-relaxed">{umkm.deskripsi}</p>}
                    
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-kabola-teal font-medium text-sm">
                        <Tag className="w-4 h-4" />
                        {umkm.harga || "Harga bervariasi"}
                      </div>
                      {umkm.kontakWa && (
                        <a 
                          href={`https://wa.me/${umkm.kontakWa}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center text-forest hover:bg-forest hover:text-white transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </SlideUp>
              ))}
            </div>
          ) : (
            <SlideUp delay={0.2} inView={true} className="bg-white rounded-2xl border border-kabola-teal/12 p-8 text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-kabola-teal animate-pulse" />
                Segera Hadir — Foto & Desain Menyusul
              </span>
              <p className="text-earth/60 text-sm leading-relaxed max-w-sm mx-auto">
                Katalog produk UMKM akan diisi setelah sesi dokumentasi lapangan saat KKN berlangsung.
              </p>
            </SlideUp>
          )}
          
          <div className="mt-16 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-kabola-teal font-medium hover:text-kabola-teal-dark transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

