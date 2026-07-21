import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, PhoneCall, Tag, User, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { umkmBySlugQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const umkm = await client.fetch(umkmBySlugQuery, { slug });
  if (!umkm) return { title: "UMKM | Kabola Digital Hub" };
  const isNttMart = umkm.jenis === "nttMart";
  const sectionLabel = isNttMart ? "NTT Mart" : "UMKM Lokal";
  const canonicalBase = isNttMart ? "/umkm/ntt-mart" : "/umkm";
  return {
    title: `${umkm.nama} | ${sectionLabel} Kabola · Alor NTT`,
    description: umkm.deskripsi
      ? `${umkm.deskripsi.slice(0, 155)}...`
      : `${umkm.nama} — produk ${sectionLabel} dari Kecamatan Kabola, Alor NTT. ${umkm.harga ? `Harga: ${umkm.harga}.` : ""} Program KKN-PPM UGM 2026.`,
    keywords: [umkm.nama, sectionLabel, "UMKM Alor", "produk lokal NTT", "KKN UGM Alor", umkm.kategori || ""].filter(Boolean),
    alternates: { canonical: `https://kaboladigitalhub.alorcarita.com/umkm/${slug}` },
    openGraph: {
      title: `${umkm.nama} | ${sectionLabel} Kabola`,
      description: umkm.deskripsi ? umkm.deskripsi.slice(0, 155) : `Produk ${sectionLabel} dari Kabola, Alor NTT.`,
      url: `https://kaboladigitalhub.alorcarita.com/umkm/${slug}`,
      images: umkm.imageUrl ? [{ url: umkm.imageUrl, alt: umkm.nama }] : [],
    },
  };
}

export default async function UmkmDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const umkm = await client.fetch(umkmBySlugQuery, { slug: resolvedParams.slug });

  if (!umkm) {
    notFound();
  }

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

  const displayImage = umkm.imageUrl || getUmkmFallback(resolvedParams.slug, umkm.kategori);

  const backHref = umkm.jenis === 'nttMart' ? '/umkm/ntt-mart' : '/umkm';
  const backLabel = umkm.jenis === 'nttMart' ? 'Kembali ke Katalog NTT Mart' : 'Kembali ke Katalog UMKM';

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 dot-pattern">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <Link href={backHref} className="inline-flex items-center gap-2 text-earth/60 hover:text-kabola-teal mb-8 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Image Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-4 border border-kabola-teal/10 shadow-xl shadow-kabola-teal/5 lg:sticky lg:top-32">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-50">
                <Image src={displayImage} alt={umkm.nama} fill className="object-cover" />
                {umkm.kategori && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm z-20">
                    {umkm.kategori}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Content Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-kabola-teal/10 shadow-xl shadow-kabola-teal/5">
              <h1 className="font-title text-3xl md:text-5xl text-forest mb-2">{umkm.nama}</h1>
              {umkm.namaIkm && (
                <h2 className="text-xl font-medium text-kabola-teal mb-6">{umkm.namaIkm}</h2>
              )}
              
              <div className="space-y-4 mb-8">
                {umkm.pemilik && (
                  <div className="flex items-center gap-3 text-earth/80">
                    <div className="w-10 h-10 rounded-full bg-kabola-teal/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-kabola-teal" />
                    </div>
                    <div>
                      <p className="text-xs text-earth/50">Pemilik Usaha</p>
                      <p className="font-medium text-forest">{umkm.pemilik}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 text-earth/80">
                  <div className="w-10 h-10 rounded-full bg-kabola-teal/10 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-kabola-teal" />
                  </div>
                  <div>
                    <p className="text-xs text-earth/50">Harga</p>
                    <p className="font-medium text-forest">{umkm.harga || "Hubungi Penjual"}</p>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="font-title text-xl text-forest mb-3">Deskripsi Produk</h3>
                <div className="text-earth/70 leading-relaxed text-sm">
                  <p>{umkm.deskripsi}</p>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-slate-100">
                <p className="text-xs text-earth/50 mb-3 text-center">Dukung UMKM Lokal Kabola</p>
                {umkm.kontakWa ? (
                  <a
                    href={`https://wa.me/${umkm.kontakWa}?text=Halo, saya tertarik dengan produk ${umkm.nama} dari Kabola Digital Hub.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold shadow-md transition-all bg-kabola-teal text-white hover:bg-kabola-teal-dark shadow-kabola-teal/20 hover:-translate-y-0.5"
                  >
                    <PhoneCall className="w-4 h-4" /> 
                    Pesan via WhatsApp
                  </a>
                ) : (
                  <span className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold shadow-md transition-all bg-slate-100 text-slate-400 cursor-not-allowed">
                    <PhoneCall className="w-4 h-4" /> 
                    Kontak Belum Tersedia
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
