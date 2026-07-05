import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Clock, Users, PhoneCall, ArrowLeft, Star, Ticket } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { wisataBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 0;

export default async function WisataDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const wisata = await client.fetch(wisataBySlugQuery, { slug: resolvedParams.slug });

  if (!wisata) {
    notFound();
  }

  const getWisataFallback = (slug: string) => {
    if (slug === 'konservasi-dugong-pantai-mali') return '/images/dugong.jpg';
    if (slug === 'pantai-deere') return '/images/view-2.jpg';
    if (slug === 'desa-tradisional-kabola') return '/images/view-1.jpg';
    return '/images/view-4.jpg';
  };

  const displayImage = wisata.imageUrl || getWisataFallback(resolvedParams.slug);

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-forest overflow-hidden">
        <Image 
          src={displayImage} 
          alt={wisata.nama} 
          fill 
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link href="/#wisata" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm font-medium transition-colors">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Wisata
            </Link>
            <h1 className="font-title text-4xl md:text-6xl text-white mb-4">{wisata.nama}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Clock className="w-4 h-4 text-kabola-teal-light" /> Buka Setiap Hari
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Users className="w-4 h-4 text-kabola-teal-light" /> Dikelola Pokdarwis
              </div>
              {wisata.hargaTiket && (
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Ticket className="w-4 h-4 text-kabola-teal-light" /> {wisata.hargaTiket}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 dot-pattern">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-title text-3xl text-forest mb-6">Tentang Destinasi</h2>
                <div className="prose prose-lg text-earth/70 leading-relaxed">
                  <p>{wisata.deskripsi}</p>
                </div>
              </div>

              {wisata.fasilitas && wisata.fasilitas.length > 0 && (
                <div>
                  <h3 className="font-title text-2xl text-forest mb-6">Fasilitas Tersedia</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {wisata.fasilitas.map((fasilitas: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-kabola-teal/10">
                        <div className="w-8 h-8 rounded-full bg-kabola-teal/10 flex items-center justify-center flex-shrink-0">
                          <Star className="w-4 h-4 text-kabola-teal" />
                        </div>
                        <span className="text-sm font-medium text-forest">{fasilitas}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {wisata.galleryUrls && wisata.galleryUrls.length > 0 && (
                <div>
                  <h3 className="font-title text-2xl text-forest mb-6">Galeri Foto</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {wisata.galleryUrls.map((url: string, index: number) => (
                      <div key={index} className="relative h-48 rounded-xl overflow-hidden shadow-sm">
                        <Image src={url} alt={`Galeri ${index + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-kabola-teal/5 border border-kabola-teal/10 sticky top-24">
                <h3 className="font-title text-xl text-forest mb-6">Informasi & Reservasi</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <Ticket className="w-5 h-5 text-kabola-teal flex-shrink-0" />
                    <div>
                      <p className="text-xs text-earth/60 mb-1">Tiket Masuk</p>
                      <p className="text-sm font-semibold text-forest">{wisata.hargaTiket || "Hubungi Pokdarwis"}</p>
                    </div>
                  </div>
                  {wisata.lokasiMaps && (
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-kabola-teal flex-shrink-0" />
                      <div>
                        <p className="text-xs text-earth/60 mb-1">Lokasi</p>
                        <a href={wisata.lokasiMaps} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-kabola-teal hover:underline">
                          Lihat di Google Maps
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href={`https://wa.me/${wisata.kontakWa || "6283117149096"}?text=Halo, saya tertarik berkunjung ke wisata "${wisata.nama}" yang ada di Kabola Digital Hub.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-forest text-white text-sm py-3 px-5 rounded-full font-semibold whitespace-nowrap hover:bg-ocean-blue-light transition-all shadow-md shadow-forest/20 hover:-translate-y-0.5"
                >
                  <PhoneCall className="w-4 h-4 flex-shrink-0" /> Reservasi via WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
