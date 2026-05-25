"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-cream px-4 text-center">
      <div className="w-20 h-20 bg-kabola-teal/10 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-kabola-teal" />
      </div>
      <h1 className="font-title text-4xl text-forest mb-4">Oops! Terjadi Kesalahan</h1>
      <p className="text-earth/60 mb-8 max-w-md">
        Maaf, sistem mengalami sedikit gangguan. Silakan coba muat ulang halaman ini.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-kabola-teal hover:bg-kabola-teal-dark text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm"
        >
          Coba Lagi
        </button>
        <Link 
          href="/"
          className="bg-white border border-kabola-teal/20 text-kabola-teal hover:bg-kabola-teal/5 px-8 py-3 rounded-full font-medium transition-colors shadow-sm"
        >
          Ke Beranda
        </Link>
      </div>
    </div>
  );
}
