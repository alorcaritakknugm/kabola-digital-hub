import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Users,
  PhoneCall,
  ArrowLeft,
  Sparkles,
  Ticket,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GaleriLightbox from "@/components/ui/GaleriLightbox";
import { client } from "@/sanity/lib/client";
import { wisataBySlugQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const wisata = await client.fetch(wisataBySlugQuery, { slug });
  if (!wisata) return { title: "Kegiatan Wisata | Kabola Digital Hub" };
  return {
    title: `${wisata.nama} | Kegiatan Wisata Alor NTT · Kabola Digital Hub`,
    description: wisata.deskripsi
      ? `${wisata.deskripsi.slice(0, 155)}...`
      : `Temukan kegiatan wisata ${wisata.nama} di Kecamatan Kabola, Alor NTT. Program KKN-PPM UGM 2026.`,
    keywords: [wisata.nama, "wisata Alor", "destinasi Kabola", "KKN UGM Alor", "Alor NTT"],
    alternates: { canonical: `https://kaboladigitalhub.alorcarita.com/wisata/${slug}` },
    openGraph: {
      title: `${wisata.nama} | Kegiatan Wisata Alor NTT`,
      description: wisata.deskripsi ? wisata.deskripsi.slice(0, 155) : `Kegiatan wisata ${wisata.nama}, Kabola Alor NTT.`,
      url: `https://kaboladigitalhub.alorcarita.com/wisata/${slug}`,
      images: wisata.imageUrl ? [{ url: wisata.imageUrl, alt: wisata.nama }] : [],
    },
  };
}

const DEFAULT_PAKET_MAP: Record<string, any> = {
  "jejak-laut-kabola": {
    id: "jejak-laut-kabola",
    nama: "Jejak Laut Kabola",
    slug: "jejak-laut-kabola",
    kategori: "Ekowisata Bahari",
    deskripsi: "Pengamatan Dugong Mawar di Teluk Mali, Penyeberangan Muara ke Pulau Sika, dan Pembibitan Mangrove Boiko.",
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
    fotoUtama: "/images/poster-jejak-laut-kabola.png",
    lokasiMaps: "https://maps.google.com/?q=Pantai+Mali+Kabola+Alor",
    galleryUrls: [
      "/images/poster-jejak-laut-kabola.png",
      "/images/dugong.jpg",
      "/images/view-3.jpg",
      "/images/view-4.jpg",
      "/images/view-2.jpg",
    ],
  },
  "jejak-warisan-kabola": {
    id: "jejak-warisan-kabola",
    nama: "Jejak Warisan Kabola",
    slug: "jejak-warisan-kabola",
    kategori: "Wisata Budaya",
    deskripsi: "Eksplorasi Kampung Tradisional Monbang, Rumah Adat Sanggar Ehenghulu, Pakaian Kulit Kayu, dan Tarian Lego-Lego.",
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
    fotoUtama: "/images/poster-jejak-warisan-kabola.png",
    lokasiMaps: "https://maps.google.com/?q=Kampung+Tradisional+Monbang+Kabola+Alor",
    galleryUrls: [
      "/images/poster-jejak-warisan-kabola.png",
      "/images/view-1.jpg",
      "/images/culture-1.jpg",
      "/images/culture-2.jpg",
      "/images/culture-3.jpg",
    ],
  },
};

function getEmbedMapUrl(lokasiMaps?: string, namaWisata?: string, slug?: string) {
  if (slug === "jejak-laut-kabola") {
    return "https://maps.google.com/maps?q=Pantai+Mali+Kabola+Alor&t=&z=13&ie=UTF8&iwloc=&output=embed";
  }
  if (slug === "jejak-warisan-kabola") {
    return "https://maps.google.com/maps?q=Kampung+Tradisional+Monbang+Kabola+Alor&t=&z=13&ie=UTF8&iwloc=&output=embed";
  }
  if (lokasiMaps) {
    try {
      const url = new URL(lokasiMaps);
      const q = url.searchParams.get("q") || url.searchParams.get("query");
      if (q) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
      }
    } catch (e) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(lokasiMaps)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
    }
  }
  const searchQuery = `${namaWisata || "Kabola"}, Alor, Nusa Tenggara Timur`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

export default async function WisataDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let wisata = await client.fetch(wisataBySlugQuery, { slug: resolvedParams.slug });

  if (!wisata && DEFAULT_PAKET_MAP[resolvedParams.slug]) {
    wisata = DEFAULT_PAKET_MAP[resolvedParams.slug];
  }

  if (!wisata) {
    notFound();
  }

  const displayImage =
    wisata.imageUrl || wisata.fotoUtama || `/images/poster-${resolvedParams.slug}.png`;
  const waNumber = wisata.kontakWa || "6283117149096";
  const pengelolaName = wisata.namaPengelola || "Pengelola Kegiatan Wisata";
  const embedMapUrl = getEmbedMapUrl(wisata.lokasiMaps, wisata.nama, resolvedParams.slug);

  return (
    <main className="min-h-screen bg-sand flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Banner Header */}
        <section className="relative bg-forest pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-kabola-teal/20 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
            <Link
              href="/wisata"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-xs font-semibold uppercase tracking-wider bg-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-all border border-white/15 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Kegiatan Wisata
            </Link>

            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-kabola-teal/30 text-kabola-teal-light text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-kabola-teal/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-kabola-teal-light" />
                {wisata.kategori || "Kegiatan Wisata Kabola"}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-kabola-teal-light" />
                {wisata.durasiWisata || "Setengah Hari"}
              </span>
              {pengelolaName && (
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                  <Users className="w-3.5 h-3.5 text-kabola-teal-light" />
                  Pengelola: {pengelolaName}
                </span>
              )}
            </div>

            <h1 className="font-title text-3xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
              {wisata.nama}
            </h1>

            {wisata.deskripsi && (
              <p className="text-white/80 text-base md:text-lg max-w-3xl leading-relaxed font-medium">
                {wisata.deskripsi}
              </p>
            )}
          </div>

          <div className="wave-bottom pointer-events-none">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 md:h-16">
              <path d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z" fill="#F7F3EB" />
            </svg>
          </div>
        </section>

        {/* Main Content & Sidebar Container */}
        <section className="py-12 md:py-20 dot-pattern">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

              {/* Main Column */}
              <div className="lg:col-span-2 space-y-10">

                {/* Poster / Hero Image Display */}
                <div className="bg-white rounded-3xl p-3 md:p-4 border border-kabola-teal/10 shadow-[0_2px_16px_rgba(0,0,0,0.02)]">
                  <div className="w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img
                      src={displayImage}
                      alt={wisata.nama}
                      className="w-full h-auto max-h-[700px] object-contain mx-auto block"
                    />
                  </div>
                </div>

                {/* Overview Narasi Pengalaman */}
                <div className="bg-white rounded-3xl p-8 md:p-10 border border-kabola-teal/10 shadow-[0_2px_16px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand">
                    <span className="w-2.5 h-8 rounded-full bg-kabola-teal" />
                    <h2 className="font-title text-2xl md:text-3xl text-forest">
                      Overview Pengalaman
                    </h2>
                  </div>
                  <div className="text-earth/80 leading-relaxed text-base md:text-lg space-y-5 whitespace-pre-line font-normal">
                    {wisata.overview || wisata.deskripsi}
                  </div>
                </div>

                {/* Highlight Pengalaman */}
                {((wisata.highlights && wisata.highlights.length > 0) ||
                  (wisata.fasilitas && wisata.fasilitas.length > 0)) && (
                  <div className="bg-white rounded-3xl p-8 md:p-10 border border-kabola-teal/10 shadow-[0_2px_16px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand">
                      <span className="w-2.5 h-7 rounded-full bg-kabola-teal" />
                      <h3 className="font-title text-2xl text-forest">
                        Highlight Pengalaman Wisata
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {(wisata.highlights || wisata.fasilitas).map((item: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 bg-sand/60 p-4 rounded-2xl border border-kabola-teal/10 hover:border-kabola-teal/30 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-kabola-teal/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-kabola-teal">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-xs md:text-sm font-semibold text-forest leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Spot Location Embed Map Section */}
                <div className="bg-white rounded-3xl p-8 md:p-10 border border-kabola-teal/10 shadow-[0_2px_16px_rgba(0,0,0,0.02)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-sand">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-7 rounded-full bg-kabola-teal" />
                      <div>
                        <h3 className="font-title text-2xl text-forest">Lokasi Spot Wisata</h3>
                        <p className="text-xs text-earth/60">Kecamatan Kabola, Kabupaten Alor, NTT</p>
                      </div>
                    </div>
                    {wisata.lokasiMaps && (
                      <a
                        href={wisata.lokasiMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-kabola-teal hover:text-kabola-teal-dark bg-kabola-teal/10 px-3.5 py-2 rounded-full border border-kabola-teal/20 transition-all hover:bg-kabola-teal/15 self-start sm:self-auto"
                      >
                        Buka di Google Maps <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Responsive Embedded Map Iframe */}
                  <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden border border-kabola-teal/15 shadow-sm bg-slate-100">
                    <iframe
                      src={embedMapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Peta Lokasi ${wisata.nama}`}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Interactive Fullscreen Gallery */}
                {wisata.galleryUrls && wisata.galleryUrls.length > 0 && (
                  <GaleriLightbox images={wisata.galleryUrls} title="Galeri Foto Kegiatan" />
                )}
              </div>

              {/* Sidebar Column */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-kabola-teal/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sticky top-24 space-y-6">
                  <div className="border-b border-sand pb-4">
                    <span className="text-[11px] font-bold text-kabola-teal uppercase tracking-widest block mb-1">
                      Informasi Reservasi
                    </span>
                    <h3 className="font-title text-2xl text-forest">{wisata.nama}</h3>
                  </div>

                  <div className="space-y-4">
                    {pengelolaName && (
                      <div className="flex items-start gap-3 bg-sand/60 p-4 rounded-2xl border border-kabola-teal/10">
                        <div className="w-10 h-10 rounded-xl bg-kabola-teal/10 flex items-center justify-center flex-shrink-0 text-kabola-teal">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[11px] text-earth/60 font-semibold uppercase tracking-wider">
                            Pengelola Kegiatan
                          </p>
                          <p className="text-sm font-bold text-forest">{pengelolaName}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 bg-sand/60 p-4 rounded-2xl border border-kabola-teal/10">
                      <div className="w-10 h-10 rounded-xl bg-kabola-teal/10 flex items-center justify-center flex-shrink-0 text-kabola-teal">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] text-earth/60 font-semibold uppercase tracking-wider">
                          Biaya / Harga
                        </p>
                        <p className="text-sm font-bold text-forest">
                          {wisata.hargaTiket || "Hubungi Pengelola"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-sand/60 p-4 rounded-2xl border border-kabola-teal/10">
                      <div className="w-10 h-10 rounded-xl bg-kabola-teal/10 flex items-center justify-center flex-shrink-0 text-kabola-teal">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] text-earth/60 font-semibold uppercase tracking-wider">
                          Jaminan Pengalaman
                        </p>
                        <p className="text-xs text-earth/70 font-medium leading-relaxed">
                          Pemandu lokal asli Kabola &amp; pengalaman otentik ramah lingkungan.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Direct Reservation Button */}
                  <a
                    href={`https://wa.me/${waNumber}?text=Halo ${pengelolaName}, saya tertarik reservasi kegiatan "${wisata.nama}" yang ada di Kabola Digital Hub.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 bg-kabola-teal hover:bg-kabola-teal-dark text-white text-sm py-3.5 px-6 rounded-full font-bold transition-all shadow-md shadow-kabola-teal/20 hover:-translate-y-0.5"
                  >
                    <PhoneCall className="w-4 h-4 flex-shrink-0" />
                    <span>Reservasi WA ({pengelolaName})</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
