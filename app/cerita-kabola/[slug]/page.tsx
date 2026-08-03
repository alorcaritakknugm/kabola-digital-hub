import { notFound } from "next/navigation";
import { ArrowLeft, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { ceritaKabolaBySlugQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { staticGastronomi } from "@/lib/data/staticGastronomi";

export const revalidate = 0;

const SECTIONS_PER_PAGE = 2;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let cerita = await client.fetch(ceritaKabolaBySlugQuery, { slug });
  
  if (!cerita) {
    cerita = staticGastronomi.find(item => item.slug === slug);
  }

  if (!cerita) return { title: "Cerita Kabola | Kabola Digital Hub" };
  return {
    title: `${cerita.judul} | Cerita Kabola · Alor NTT`,
    description: cerita.subtitle
      ? `${cerita.subtitle} | Kabola Digital Hub, program KKN-PPM UGM 2026 Alor.`
      : cerita.deskripsi
        ? `${cerita.deskripsi.slice(0, 150)}...`
        : `${cerita.judul}, cerita budaya dan tradisi Kabola, Alor NTT.`,
    keywords: [cerita.judul, "cerita Kabola", "budaya Alor", "KKN UGM Alor", cerita.tag || "", cerita.kategori || ""].filter(Boolean),
    alternates: { canonical: `https://kaboladigitalhub.alorcarita.com/cerita-kabola/${slug}` },
    openGraph: {
      title: `${cerita.judul} | Cerita Kabola · Alor NTT`,
      description: cerita.subtitle || (cerita.deskripsi ? cerita.deskripsi.slice(0, 150) : ""),
      url: `https://kaboladigitalhub.alorcarita.com/cerita-kabola/${slug}`,
      type: "article",
      images: cerita.imageUrl ? [{ url: cerita.imageUrl, alt: cerita.judul }] : [],
    },
  };
}

export default async function CeritaKabolaDetail({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const fromTab = resolvedSearchParams.from || "gastronomi";

  // Parse page param (1-indexed)
  const rawPage = Number(resolvedSearchParams.page ?? 1);

  let cerita = await client.fetch(ceritaKabolaBySlugQuery, { slug: resolvedParams.slug });

  if (!cerita) {
    cerita = staticGastronomi.find(item => item.slug === resolvedParams.slug);
  }

  if (!cerita) {
    notFound();
  }

  const getFallbackImage = (slug: string, kategori: string) => {
    if (slug === 'jagung-bose') return '/images/culture-1.jpg';
    if (slug === 'sei-ikan-sei-daging') return '/images/culture-2.jpg';
    if (slug === 'tuak-sopi') return '/images/culture-3.jpg';
    if (slug === 'jagung-titi') return '/images/culture-1.jpg';
    if (slug === 'kue-rambut') return '/images/culture-2.jpg';
    if (slug === 'hutan-mangrove-nelayan-kabola') return '/images/view-3.jpg';
    if (slug === 'perubahan-musim-pertanian-lokal') return '/images/view-5.jpg';
    if (slug === 'tenun-ikat-alor') return '/images/dugong.jpg';
    if (slug === 'tarian-upacara-adat') return '/images/view-1.jpg';
    if (slug === 'tradisi-lisan-kabola') return '/images/view-5.jpg';
    if (slug === 'moko-motif-tradisional') return '/images/culture-2.jpg';
    if (slug === 'bahasa-sastra-lisan') return '/images/culture-3.jpg';
    if (slug === 'wajah-wajah-kabola') return '/images/view-1.jpg';
    if (slug === 'alam-yang-hidup') return '/images/view-3.jpg';
    if (slug === 'tangan-yang-berkarya') return '/images/culture-3.jpg';

    if (kategori === 'lensa-kabola') return '/images/view-3.jpg';
    if (kategori === 'eko-naratif') return '/images/view-1.jpg';
    return '/images/culture-1.jpg';
  };

  const displayImage = cerita.imageUrl || getFallbackImage(resolvedParams.slug, cerita.kategori);

  // ── Pagination logic ─────────────────────────────────────────────
  const hasKonten = cerita.konten && cerita.konten.length > 0;
  const totalSections = hasKonten ? cerita.konten.length : 0;
  const totalPages = hasKonten ? Math.ceil(totalSections / SECTIONS_PER_PAGE) : 1;
  const paginated = totalPages > 1; // only paginate if more than 1 page needed
  const currentPage = Math.min(Math.max(rawPage, 1), totalPages);

  const currentSections: any[] = hasKonten
    ? paginated
      ? cerita.konten.slice(
          (currentPage - 1) * SECTIONS_PER_PAGE,
          currentPage * SECTIONS_PER_PAGE
        )
      : cerita.konten
    : [];

  // Build URL helper preserving from param
  const pageUrl = (p: number) =>
    `?from=${fromTab}&page=${p}`;

  return (
    <main className="min-h-screen bg-sand selection:bg-kabola-teal/20">
      <Navbar />

      <article className="pt-32 pb-20 md:pt-40 md:pb-32 dot-pattern">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Breadcrumb & Navigation */}
          <Link
            href={`/cerita-kabola?tab=${fromTab}`}
            className="inline-flex items-center gap-2 text-earth/60 hover:text-kabola-teal transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Cerita Kabola
          </Link>

          {/* Header Content */}
          <header className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 bg-kabola-teal/10 text-kabola-teal text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6 border border-kabola-teal/20">
              <Tag className="w-3 h-3" /> {cerita.tag || 'Artikel'}
            </span>
            <h1 className="font-title text-4xl md:text-5xl lg:text-6xl text-forest mb-6 leading-tight">
              {cerita.judul}
            </h1>
            <p className="text-lg md:text-xl text-earth/60 max-w-2xl mx-auto font-medium">
              {cerita.subtitle}
            </p>

          </header>

          {/* Featured Image — only on first page */}
          {currentPage === 1 && (
            <div className="mb-12">
              <div className="w-full rounded-3xl overflow-hidden shadow-xl shadow-kabola-teal/5 border border-kabola-teal/10 bg-slate-50">
                <img
                  src={displayImage}
                  alt={cerita.judul}
                  className="w-full h-auto max-h-[700px] object-contain mx-auto block"
                />
              </div>
              {cerita.keteranganGambar && (
                <p className="text-center text-xs text-earth/60 italic mt-3">
                  Sumber: {cerita.keteranganGambar}
                </p>
              )}
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-kabola-teal/10 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border border-kabola-teal/10 flex items-center justify-center shadow-sm">
              <span className="w-3 h-3 rounded-full bg-kabola-teal" />
            </div>

            {hasKonten ? (
              <div className="space-y-10">
                {currentSections.map((sec: any, idx: number) => (
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
                      <div className="my-6">
                        <div className="w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                          <img
                            src={sec.fotoSection}
                            alt={sec.judulSection || `Ilustrasi ${idx + 1}`}
                            className="w-full h-auto max-h-[650px] object-contain mx-auto block"
                          />
                        </div>
                        {sec.keteranganFotoSection && (
                          <p className="text-center text-xs text-earth/60 italic mt-2.5">
                            Sumber: {sec.keteranganFotoSection}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-lg md:prose-xl prose-stone max-w-none prose-headings:font-title prose-headings:text-forest prose-p:text-earth/80 prose-p:leading-relaxed prose-a:text-kabola-teal hover:prose-a:text-kabola-teal-dark first-letter:text-5xl first-letter:font-title first-letter:text-kabola-teal first-letter:float-left first-letter:mr-3 first-letter:mt-1 whitespace-pre-line">
                <p>{cerita.deskripsi}</p>
              </div>
            )}

            {/* ── Pagination Nav ── */}
            {paginated && (
              <div className="mt-12 pt-8 border-t border-slate-100">
                {/* Page dots */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={pageUrl(p)}
                      scroll={true}
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                        p === currentPage
                          ? "bg-kabola-teal text-white shadow-md"
                          : "bg-sand text-earth/60 hover:bg-kabola-teal/10 hover:text-kabola-teal border border-kabola-teal/15"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>

                {/* Prev / Next buttons */}
                <div className="flex items-center justify-between gap-4">
                  {currentPage > 1 ? (
                    <Link
                      href={pageUrl(currentPage - 1)}
                      scroll={true}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-kabola-teal/20 text-sm font-semibold text-earth hover:border-kabola-teal hover:text-kabola-teal transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" /> Sebelumnya
                    </Link>
                  ) : (
                    <div />
                  )}

                  {currentPage < totalPages ? (
                    <Link
                      href={pageUrl(currentPage + 1)}
                      scroll={true}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-kabola-teal text-white text-sm font-semibold hover:bg-kabola-teal-dark transition-all"
                    >
                      Berikutnya <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            )}

            {/* Share / Footer Article */}
            <div className={`${paginated ? "mt-8" : "mt-16"} pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4`}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-earth/60">Kategori:</span>
                <span className="px-3 py-1 bg-slate-100 text-forest text-xs font-bold uppercase rounded-md">
                  {cerita.kategori}
                </span>
              </div>
            </div>
          </div>

        </div>
      </article>

      <Footer />
    </main>
  );
}
