"use client";

import Image from "next/image";
import Link from "next/link";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import {
  MapPin,
  Clock,
  Users,
  ArrowRight,
  PhoneCall,
  QrCode,
  Map,
} from "lucide-react";


export default function Tourism({ wisataList = [] }: { wisataList?: any[] }) {
  const getWisataFallback = (slug: string) => {
    if (slug === 'konservasi-dugong-pantai-mali') return '/images/dugong.jpg';
    if (slug === 'pantai-deere') return '/images/view-2.jpg';
    if (slug === 'desa-tradisional-kabola') return '/images/view-1.jpg';
    return '/images/view-4.jpg';
  };

  return (
    <>
      {/* Hero Section */}
      <section id="wisata-hero" className="relative bg-forest pt-32 pb-28 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "28px 28px"
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-kabola-teal/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10 text-center">
          <SlideUp delay={0}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <Map className="w-8 h-8 text-kabola-teal-light" />
            </div>
            <span className="inline-block bg-white/10 text-white/70 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-white/10">
              Katalog Wisata Interaktif
            </span>
            <h2 className="font-title text-4xl md:text-5xl text-white mb-4">
              Jelajahi <span className="text-kabola-teal-light">Kabola</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Paket wisata yang dikurasi, terhubung langsung ke Pokdarwis Kabola.
              Reservasi mudah melalui WhatsApp.
            </p>
          </SlideUp>
        </div>

        <div className="wave-bottom pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20"><path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#F7F3EB" /></svg>
        </div>
      </section>

      {/* Content Section */}
      <section id="wisata" className="py-16 md:py-24 dot-pattern relative">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          
          {/* Package cards */}
          {wisataList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {wisataList.map((pkg, i) => {
                const slug = pkg.slug?.current || pkg.slug || pkg._id;
                return (
                <SlideUp
                  key={pkg._id}
                  delay={i * 0.1}
                  inView={true}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-kabola-teal/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-500"
                >
                  <Link href={`/wisata/${slug}`} className="block h-full w-full">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <Image
                         src={pkg.imageUrl || getWisataFallback(slug)}
                         alt={pkg.nama}
                         fill
                         className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />

                    {/* Badge durasi */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-sm text-forest text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                        <Clock className="w-3 h-3 text-kabola-teal" />
                        {pkg.durasiWisata || "Setengah Hari"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="font-title text-xl text-forest mb-2">{pkg.nama}</h4>
                    {pkg.deskripsi && (
                      <p className="text-earth/60 text-sm mb-5 line-clamp-2 leading-relaxed">
                        {pkg.deskripsi}
                      </p>
                    )}

                    {/* Highlights */}
                    {pkg.fasilitas && pkg.fasilitas.length > 0 && (
                      <ul className="grid grid-cols-2 gap-3 mb-6">
                        {pkg.fasilitas.slice(0, 4).map((h: string, hi: number) => (
                          <li key={hi} className="flex items-start gap-1.5 text-xs text-earth/70 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-kabola-teal flex-shrink-0" />
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-forest font-semibold text-sm">
                        {pkg.hargaTiket || "Hubungi Pokdarwis"}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const waNumber = pkg.kontakWa || "6283117149096";
                          window.open(`https://wa.me/${waNumber}?text=Halo, saya tertarik berkunjung ke wisata "${pkg.nama}" yang ada di Kabola Digital Hub.`, '_blank', 'noopener,noreferrer');
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kabola-teal text-white text-xs font-semibold hover:bg-kabola-teal-dark transition-all duration-300 group/btn hover:-translate-y-0.5 shadow-md shadow-kabola-teal/20"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        Reservasi WA
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                  </Link>
                </SlideUp>
              )})}
            </div>
          ) : (
            <SlideUp delay={0.2} inView={true} className="bg-white border border-kabola-teal/10 rounded-3xl p-8 text-center max-w-3xl mx-auto mb-12 shadow-sm">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-kabola-teal animate-pulse" />
                Katalog Segera Diperbarui
              </span>
              <p className="text-earth/60 text-sm leading-relaxed max-w-sm mx-auto">
                Data pariwisata sedang disusun melalui sistem Sanity CMS.
              </p>
            </SlideUp>
          )}

          {/* Pokdarwis info */}
          <SlideUp
            delay={0.3}
            inView={true}
            className="rounded-3xl bg-white border border-kabola-teal/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center">
                  <Users className="w-5 h-5 text-forest" />
                </div>
                <h4 className="font-title text-xl text-forest">Pokdarwis Kabola</h4>
              </div>
              <p className="text-earth/60 text-sm max-w-md mt-3 leading-relaxed">
                Kelompok Sadar Wisata (Pokdarwis) Kabola adalah mitra lokal yang mengelola 
                dan memandu seluruh paket wisata di wilayah Kabola.
              </p>
            </div>
            <a
              href="https://wa.me/6283117149096"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-white font-semibold text-sm hover:bg-ocean-blue-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
              </svg>
              Hubungi Pokdarwis
            </a>
          </SlideUp>

          {/* Papan Informasi & QR Code Integration */}
          <SlideUp
            delay={0.4}
            inView={true}
            className="mt-6 rounded-3xl bg-white border border-kabola-teal/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-kabola-teal/10 flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-kabola-teal" />
                </div>
                <h4 className="font-title text-xl text-forest">Integrasi Papan Informasi Fisik</h4>
              </div>
              <p className="text-earth/60 text-sm max-w-3xl leading-relaxed">
                Katalog wisata digital ini terhubung langsung dengan Papan Informasi Wisata fisik berbahan akrilik tahan cuaca yang tersebar di titik-titik strategis Kabola. Wisatawan di lapangan cukup memindai <strong className="text-forest">QR Code</strong> pada papan tersebut untuk langsung mengakses halaman reservasi ini tanpa perlu mengunduh aplikasi tambahan.
              </p>
            </div>
            <div className="flex-shrink-0 w-28 h-28 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center shadow-inner">
              <QrCode className="w-12 h-12 text-forest mb-1.5" />
              <span className="text-[10px] font-bold tracking-widest text-kabola-teal uppercase">Scan Me</span>
            </div>
          </SlideUp>
        </div>
      </section>
    </>
  );
}

