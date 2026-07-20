import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, PhoneCall, Tag, User, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { umkmBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 0;

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
        <div className="container mx-auto px-4 max-w-4xl">
          
          <Link href={backHref} className="inline-flex items-center gap-2 text-earth/60 hover:text-kabola-teal mb-8 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>

          <div className="bg-white rounded-3xl overflow-hidden border border-kabola-teal/10 shadow-xl shadow-kabola-teal/5">
            <div className="flex flex-col lg:flex-row">
              {/* Product Image */}
              <div className="lg:w-1/2 relative h-64 lg:h-auto min-h-[300px] bg-slate-100">
                <Image src={displayImage} alt={umkm.nama} fill className="object-cover" />
                {umkm.kategori && (
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-forest text-[10px] font-bold tracking-wider uppercase px-4 py-2 rounded-full shadow-sm">
                    {umkm.kategori}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h1 className="font-title text-3xl md:text-5xl text-forest mb-4">{umkm.nama}</h1>
                
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
                  <p className="text-xs text-earth/50 mb-3 text-center lg:text-left">Dukung UMKM Lokal Kabola</p>
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
