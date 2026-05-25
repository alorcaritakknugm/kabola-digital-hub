import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | Kabola Digital Hub",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-sand flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative background dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 dot-pattern"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md">
        {/* 404 numeral */}
        <span className="font-title text-[7rem] leading-none text-kabola-teal/20 select-none">
          404
        </span>

        {/* Heading */}
        <h1 className="font-title text-3xl md:text-4xl text-navy leading-tight">
          Halaman Tidak Ditemukan
        </h1>

        {/* Sub-text */}
        <p className="text-navy/55 text-sm leading-relaxed max-w-xs">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan. Kembali
          ke beranda untuk melanjutkan.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-kabola-teal hover:bg-kabola-teal-dark text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
