import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { INFORMASI_WISATA_LIST } from "@/data/informasiWisataData";
import { client } from "@/sanity/lib/client";
import { informasiWisataBySlugQuery, informasiWisataQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const revalidate = 0;

async function getArticle(slug: string) {
  try {
    const sanityDoc = await client.fetch(informasiWisataBySlugQuery, { slug });
    if (sanityDoc) {
      return {
        id: sanityDoc._id,
        slug: sanityDoc.slug,
        judul: sanityDoc.judul,
        subjudul: sanityDoc.subjudul,
        kategori: sanityDoc.kategori || "Bahari",
        ringkasan: sanityDoc.ringkasan,
        fotoUtama: sanityDoc.fotoUtama || "/images/view-4.jpg",
        tanggalDiperbarui: sanityDoc.tanggalDiperbarui,
        tags: sanityDoc.tags,
        konten: sanityDoc.konten || [],
      };
    }
  } catch (e) {
    console.error("Sanity fetch error:", e);
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getArticle(slug);
  if (!item) return { title: "Informasi Wisata | Kabola Digital Hub" };

  return {
    title: `${item.judul} - ${item.subjudul || "Informasi Wisata Alor"} | Kabola Digital Hub`,
    description: item.ringkasan,
    keywords: [item.judul, item.kategori, "wisata Alor", "Kabola Alor NTT"],
    alternates: { canonical: `https://kaboladigitalhub.alorcarita.com/informasi-wisata/${slug}` },
    openGraph: {
      title: `${item.judul} - Informasi Wisata Alor`,
      description: item.ringkasan,
      url: `https://kaboladigitalhub.alorcarita.com/informasi-wisata/${slug}`,
      images: item.fotoUtama ? [{ url: item.fotoUtama, alt: item.judul }] : [],
    },
  };
}

export default async function InformasiWisataDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getArticle(slug);

  if (!item) {
    notFound();
  }

  let allArticles: any[] = [];
  try {
    const sanityAll = await client.fetch(informasiWisataQuery);
    if (sanityAll && sanityAll.length > 0) {
      allArticles = sanityAll.map((art: any) => ({
        id: art._id,
        slug: art.slug,
        judul: art.judul,
        subjudul: art.subjudul,
        kategori: art.kategori || "Bahari",
        ringkasan: art.ringkasan,
        fotoUtama: art.fotoUtama || "/images/view-4.jpg",
      }));
    }
  } catch (e) { }

  const relatedArticles = allArticles.filter((i) => i.slug !== slug).slice(0, 4);

  return (
    <main className="min-h-screen bg-sand flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Header */}
        <section className="relative h-[65vh] min-h-[440px] w-full bg-forest overflow-hidden">
          <Image
            src={item.fotoUtama}
            alt={item.judul}
            fill
            className="object-cover opacity-55"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end pb-14">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
              <Link
                href="/informasi-wisata"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-xs font-semibold uppercase tracking-wider bg-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-colors border border-white/15"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali ke Informasi Wisata
              </Link>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-kabola-teal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.kategori}
                </span>
                {item.tanggalDiperbarui && (
                  <span className="flex items-center gap-1 text-white/70 text-xs">
                    <Calendar className="w-3.5 h-3.5" /> Diperbarui {item.tanggalDiperbarui}
                  </span>
                )}
              </div>
              <h1 className="font-title text-4xl md:text-6xl text-white mb-3 leading-tight">
                {item.judul}
              </h1>
              {item.subjudul && (
                <p className="text-kabola-teal-light text-lg md:text-xl font-medium italic">
                  {item.subjudul}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-12 md:py-20 dot-pattern">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">

            {/* Dynamic Content Sections Looping */}
            <div className="space-y-12 bg-white rounded-3xl p-8 md:p-12 border border-kabola-teal/10 shadow-[0_2px_16px_rgba(0,0,0,0.02)] mb-12">
              {item.konten && item.konten.length > 0 ? (
                item.konten.map((sec: any, idx: number) => (
                  <div key={idx} className="prose prose-lg max-w-none">
                    {sec.judulSection && (
                      <h2 className="font-title text-2xl md:text-3xl text-forest mb-4 pb-2 border-b border-sand flex items-center gap-3">
                        <span className="w-2.5 h-7 rounded-full bg-kabola-teal inline-block" />
                        {sec.judulSection}
                      </h2>
                    )}
                    <div className="text-earth/80 leading-relaxed text-base md:text-lg space-y-4 whitespace-pre-line">
                      {sec.isiSection}
                    </div>
                    {sec.fotoSection && (
                      <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden my-6 border border-slate-100">
                        <Image
                          src={sec.fotoSection}
                          alt={sec.judulSection || `Ilustrasi ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="prose prose-lg max-w-none text-earth/80">
                  <p>{item.ringkasan}</p>
                </div>
              )}
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-8 border-t border-slate-200/60">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-title text-2xl md:text-3xl text-forest">Informasi Wisata Lainnya</h3>
                  <Link
                    href="/informasi-wisata"
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-kabola-teal hover:text-kabola-teal-dark transition-colors bg-white border border-kabola-teal/20 px-4 py-2 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  >
                    Lihat Semua <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/informasi-wisata/${rel.slug}`}
                      className="group bg-white rounded-2xl p-5 border border-kabola-teal/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all flex items-center gap-4"
                    >
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={rel.fotoUtama} alt={rel.judul} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-kabola-teal uppercase">
                          {rel.kategori}
                        </span>
                        <h4 className="font-title text-base text-forest group-hover:text-kabola-teal transition-colors line-clamp-1">
                          {rel.judul}
                        </h4>
                        <p className="text-earth/60 text-xs line-clamp-2 mt-1">{rel.ringkasan}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
