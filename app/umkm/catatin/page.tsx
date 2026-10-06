import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Download,
  Smartphone,
  Monitor,
  ShieldCheck,
  WifiOff,
  Calculator,
  Package,
  BookOpen,
  TrendingUp,
  FileSpreadsheet,
  Database,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "CatatIn — Aplikasi Kasir (POS) & Keuangan UMKM Offline-First · KKN-PPM UGM 2026",
  description:
    "Aplikasi kasir (POS) dan pembukuan keuangan UMKM offline-first multiplatform (Android & Windows). Solusi digitalisasi UMKM Kecamatan Kabola tanpa kuota internet oleh Tim KKN-PPM UGM Alor Carita 2026.",
  keywords: [
    "CatatIn",
    "Aplikasi Kasir Offline",
    "POS Android Windows",
    "Pencatatan Keuangan UMKM",
    "Aplikasi UMKM Kabola",
    "KKN UGM Alor 2026",
    "Pembukuan UMKM Gratis",
    "Unduh CatatIn",
  ],
  alternates: {
    canonical: "https://kaboladigitalhub.alorcarita.com/umkm/catatin",
  },
  openGraph: {
    title: "CatatIn — Aplikasi Kasir (POS) & Keuangan UMKM Offline-First",
    description:
      "Aplikasi kasir POS dan pencatatan keuangan UMKM 100% offline-first untuk Android & Windows. Inovasi KKN-PPM UGM Alor Carita 2026.",
    url: "https://kaboladigitalhub.alorcarita.com/umkm/catatin",
    images: [
      {
        url: "/images/catatin.png",
        width: 1200,
        height: 675,
        alt: "Mockup Aplikasi CatatIn di Android dan Windows Desktop",
      },
    ],
  },
};

const DOWNLOAD_LINK = "https://s.id/UnduhAplikasiCatatin";

const keyFeatures = [
  {
    icon: WifiOff,
    title: "100% Offline-First",
    description:
      "Beroperasi penuh tanpa membutuhkan jaringan internet, kuota data, maupun pendaftaran akun. Seluruh data transaksi tersimpan aman di perangkat Anda.",
    tag: "Hemat Kuota",
  },
  {
    icon: Monitor,
    title: "Cross-Platform Adaptif",
    description:
      "Layout ringkas dan cepat untuk smartphone Android, serta tampilan layar terpisah (Split-Screen POS) dan navigasi sidebar untuk PC/Laptop Windows.",
    tag: "Android & Windows",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan PIN Lokal",
    description:
      "Dilengkapi enkripsi PIN 6-digit lokal, pemulihan pertanyaan keamanan, serta kompatibilitas keyboard & numpad fisik di komputer.",
    tag: "Privasi Aman",
  },
  {
    icon: Calculator,
    title: "Kasir (POS) Terpadu",
    description:
      "Kalkulasi total belanja & kembalian otomatis. Mendukung multi-metode pembayaran: Tunai, Non-Tunai (QRIS & Transfer), hingga Kasbon/Piutang.",
    tag: "Cepat & Praktis",
  },
  {
    icon: Package,
    title: "Manajemen Inventaris & Stok",
    description:
      "Katalog produk dengan kalkulator margin keuntungan otomatis, riwayat penambahan atau pengurangan stok, serta dukungan foto produk.",
    tag: "Stok Terkontrol",
  },
  {
    icon: BookOpen,
    title: "Buku Piutang & Kasbon",
    description:
      "Pencatatan kasbon pelanggan terintegrasi kasir. Mendukung pembayaran cicilan bertahap dan pembaruan status lunas secara otomatis.",
    tag: "Bebas Lupa Catat",
  },
  {
    icon: TrendingUp,
    title: "Grafik Tren & Rekapitulasi",
    description:
      "Visualisasi performa penjualan harian, mingguan, hingga bulanan dengan grafik interaktif untuk melihat pertumbuhan laba bersih.",
    tag: "Analisis Usaha",
  },
  {
    icon: FileSpreadsheet,
    title: "Ekspor PDF & Excel (.xlsx)",
    description:
      "Cetak laporan keuangan siap pakai ke dokumen PDF ukuran A4 atau lembar kerja Excel multi-sheet untuk arsip maupun pengajuan pembiayaan.",
    tag: "Laporan Rapi",
  },
  {
    icon: Database,
    title: "Backup & Restore Mandiri",
    description:
      "Pencadangan dan pemulihan data instan dalam format berkas JSON terstruktur, memberikan perlindungan data saat berpindah perangkat.",
    tag: "Data Terjaga",
  },
];

export default function CatatInPage() {
  return (
    <main className="min-h-screen bg-sand text-navy">
      <Navbar />

      {/* Hero Section — serasi dengan halaman UMKM/Wisata/Statistik */}
      <section className="relative bg-forest pt-32 pb-28 md:pt-36 md:pb-32 overflow-hidden">
        {/* Background Dot Texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-kabola-teal/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10 text-center">
          <SlideUp delay={0}>
            {/* Icon Card seragam dengan halaman lain */}
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-md shadow-lg shadow-black/10">
              <Calculator className="w-8 h-8 text-kabola-teal-light" />
            </div>

            {/* Pill Tag */}
            <span className="inline-block bg-white/10 text-white/80 text-[10px] sm:text-xs font-semibold sm:font-bold tracking-wider sm:tracking-widest uppercase px-3 py-1 sm:px-4 sm:py-1.5 rounded-full mb-3 sm:mb-4 border border-white/10 max-w-full truncate">
              Kecamatan Kabola · Digitalisasi UMKM
            </span>

            {/* Main Title */}
            <h1 className="font-title text-3xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
              Aplikasi Kasir <span className="text-kabola-teal-light">CatatIn</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/70 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed mb-6 font-body">
              Aplikasi POS dan pencatatan keuangan offline-first cross-platform untuk Android dan Windows Desktop. Dirancang khusus untuk mempermudah pembukuan pelaku UMKM tanpa kuota internet.
            </p>

            {/* Badges Info */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-8 text-[11px] sm:text-sm font-medium">
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 text-white/90 border border-white/15 flex items-center gap-1.5 backdrop-blur-sm">
                <WifiOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-kabola-teal-light" /> 100% Offline-First
              </span>
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 text-white/90 border border-white/15 flex items-center gap-1.5 backdrop-blur-sm">
                <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-kabola-teal-light" /> Android APK
              </span>
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 text-white/90 border border-white/15 flex items-center gap-1.5 backdrop-blur-sm">
                <Monitor className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-kabola-teal-light" /> Windows Desktop
              </span>
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 text-white/80 border border-white/15 backdrop-blur-sm">
                Versi 1.0.0
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 max-w-xl mx-auto w-full">
              <a
                href={DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-kabola-teal hover:bg-kabola-teal-light text-white font-semibold text-xs sm:text-base shadow-lg shadow-kabola-teal/20 transition-all duration-200"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="whitespace-nowrap">Unduh Aplikasi Sekarang</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-75 shrink-0" />
              </a>

              <a
                href="#fitur"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 hover:text-white font-medium text-xs sm:text-base border border-white/20 transition-all duration-200"
              >
                <span className="whitespace-nowrap">Pelajari Fitur</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </a>
            </div>
          </SlideUp>
        </div>

        {/* Wave Divider */}
        <div className="wave-bottom pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 md:h-20">
            <path
              d="M0,40 C400,80 900,10 1440,45 L1440,80 L0,80 Z"
              fill="#F7F3EB"
            />
          </svg>
        </div>
      </section>

      {/* Mockup Preview Section */}
      <section className="relative -mt-10 sm:-mt-16 md:-mt-20 z-20 container mx-auto px-4 md:px-8 max-w-5xl">
        <SlideUp delay={0.1} inView>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl border border-kabola-teal/15 overflow-hidden">
            <div className="relative aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900/5">
              <Image
                src="/images/catatin.png"
                alt="Tampilan Antarmuka Aplikasi CatatIn pada Android dan Windows Desktop"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-contain"
              />
            </div>
            <div className="pt-4 pb-1 px-2 text-center text-earth/70 text-xs sm:text-sm">
              Desain ergonomis mobile dan mode split-screen desktop untuk meja kasir.
            </div>
          </div>
        </SlideUp>
      </section>

      {/* Tentang Program Kerja Section */}
      <section className="py-16 sm:py-24 container mx-auto px-4 md:px-8 max-w-5xl">
        <SlideUp inView>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-kabola-teal/15 shadow-sm space-y-6">
            <div className="inline-block bg-kabola-teal/10 text-kabola-teal text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-kabola-teal/20">
              Tentang Program Kerja
            </div>
            <h2 className="font-title text-2xl sm:text-3xl md:text-4xl text-forest">
              Mendukung Digitalisasi Finansial UMKM Kabola
            </h2>
            <div className="prose prose-slate max-w-none text-earth/80 text-sm sm:text-base leading-relaxed space-y-4 font-body">
              <p>
                <strong>CatatIn</strong> dikembangkan secara khusus oleh mahasiswa{" "}
                <strong>KKN-PPM Universitas Gadjah Mada (UGM) Periode II Tahun 2026</strong> dalam unit{" "}
                <strong>Alor Carita</strong> untuk menjawab tantangan operasional yang dihadapi oleh
                pelaku UMKM lokal di Kecamatan Kabola, Kabupaten Alor, Nusa Tenggara Timur.
              </p>
              <p>
                Banyak pelaku usaha kecil masih mengandalkan buku catatan manual yang rentan hilang,
                rusak, atau sulit direkapitulasi saat perhitungan omzet dan piutang pelanggan.
                Di sisi lain, jaringan internet di beberapa area pesisir belum selalu stabil
                untuk aplikasi POS berbasis online/cloud.
              </p>
              <p>
                Dengan pendekatan <strong>Offline-First</strong>, CatatIn tidak memerlukan biaya langganan,
                tidak mengonsumsi kuota data, dan menjaga kerahasiaan data transaksi keuangan pedagang secara
                penuh di dalam penyimpanan internal HP maupun laptop kasir.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 font-body">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-kabola-teal shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-forest text-sm">Gratis 100%</h4>
                  <p className="text-xs text-earth/70">Tanpa biaya langganan bulanan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-kabola-teal shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-forest text-sm">Tanpa Registrasi</h4>
                  <p className="text-xs text-earth/70">Langsung pakai tanpa akun/email</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-kabola-teal shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-forest text-sm">Privasi Mutlak</h4>
                  <p className="text-xs text-earth/70">Data disimpan di gawai Anda sendiri</p>
                </div>
              </div>
            </div>
          </div>
        </SlideUp>
      </section>

      {/* Fitur Utama Section */}
      <section id="fitur" className="py-12 sm:py-20 bg-white/60 border-y border-kabola-teal/10">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block bg-kabola-teal/10 text-kabola-teal text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-kabola-teal/20 mb-3">
              Fitur Lengkap
            </div>
            <h2 className="font-title text-3xl sm:text-4xl text-forest">
              Semua Kebutuhan Kasir & Pembukuan Ada di Sini
            </h2>
            <p className="text-earth/70 text-sm sm:text-base mt-3">
              Dirancang sederhana agar mudah dipelajari oleh siapa saja, mulai dari warung sembako,
              kedai makan, hingga toko kerajinan tenun Alor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {keyFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <SlideUp key={f.title} delay={i * 0.05} inView>
                  <div className="bg-white rounded-2xl p-6 sm:p-7 border border-kabola-teal/15 hover:border-kabola-teal/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-kabola-teal/10 group-hover:bg-kabola-teal group-hover:text-white text-kabola-teal flex items-center justify-center transition-colors duration-200">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-semibold tracking-wider text-kabola-teal uppercase bg-kabola-teal/5 px-2.5 py-1 rounded-full border border-kabola-teal/10">
                          {f.tag}
                        </span>
                      </div>
                      <h3 className="font-title text-lg sm:text-xl text-forest mb-2">
                        {f.title}
                      </h3>
                      <p className="text-earth/75 text-xs sm:text-sm leading-relaxed font-body">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cara Mengunduh & Memulai Section */}
      <section className="py-16 sm:py-24 container mx-auto px-4 md:px-8 max-w-4xl">
        <SlideUp inView>
          <div className="text-center mb-10">
            <h2 className="font-title text-2xl sm:text-3xl md:text-4xl text-forest">
              Cara Mengunduh & Memasang
            </h2>
            <p className="text-earth/70 text-sm sm:text-base mt-2">
              Tiga langkah mudah untuk mulai mengelola pembukuan usaha Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body">
            <div className="bg-white rounded-2xl p-6 border border-kabola-teal/15 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-kabola-teal text-white font-bold flex items-center justify-center mx-auto text-lg">
                1
              </div>
              <h4 className="font-semibold text-forest text-base">Buka Tautan Unduhan</h4>
              <p className="text-earth/70 text-xs sm:text-sm leading-relaxed">
                Akses link resmi di{" "}
                <a
                  href={DOWNLOAD_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-kabola-teal font-medium underline"
                >
                  s.id/UnduhAplikasiCatatin
                </a>{" "}
                melalui browser gawai Anda.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-kabola-teal/15 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-kabola-teal text-white font-bold flex items-center justify-center mx-auto text-lg">
                2
              </div>
              <h4 className="font-semibold text-forest text-base">Pilih File Perangkat</h4>
              <p className="text-earth/70 text-xs sm:text-sm leading-relaxed">
                Unduh file <strong>APK</strong> untuk smartphone Android atau paket installer zip
                untuk laptop/PC dengan sistem operasi <strong>Windows</strong>.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-kabola-teal/15 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-kabola-teal text-white font-bold flex items-center justify-center mx-auto text-lg">
                3
              </div>
              <h4 className="font-semibold text-forest text-base">Pasang & Mulai Catat</h4>
              <p className="text-earth/70 text-xs sm:text-sm leading-relaxed">
                Buka aplikasi, atur 6 digit PIN keamanan lokal, dan Anda siap mencatat transaksi
                penjualan pertama Anda!
              </p>
            </div>
          </div>

          {/* Bottom Solid CTA Card */}
          <div className="mt-12 bg-forest rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-white text-center border border-white/10 shadow-xl space-y-6">
            <h3 className="font-title text-2xl sm:text-3xl text-white">
              Siap Mengembangkan Usaha Anda di Kabola?
            </h3>
            <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-body">
              Tinggalkan catatan buku kertas yang merepotkan. Kelola transaksi, cek stok barang, dan
              pantau keuntungan dengan rapi bersama CatatIn.
            </p>
            <div>
              <a
                href={DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl sm:rounded-2xl bg-kabola-teal hover:bg-kabola-teal-light text-white font-bold text-sm sm:text-base shadow-lg shadow-kabola-teal/30 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Download className="w-5 h-5" />
                <span>Unduh CatatIn Gratis</span>
                <ExternalLink className="w-4 h-4 opacity-75" />
              </a>
            </div>
            <div className="text-xs text-white/50">
              Dikembangkan oleh Tim KKN-PPM UGM Alor Carita 2026 · Kecamatan Kabola, Alor, NTT
            </div>
          </div>
        </SlideUp>
      </section>

      <Footer />
    </main>
  );
}
