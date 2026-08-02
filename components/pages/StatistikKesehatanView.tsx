"use client";

import React from "react";
import { Calendar, MapPin } from "lucide-react";
import BMIChart from "@/components/ui/charts/BMIChart";
import BloodPressureChart from "@/components/ui/charts/BloodPressureChart";
import CKGDemografisChart from "@/components/ui/charts/CKGDemografisChart";
import PuzzleCards from "@/components/ui/PuzzleCards";
import type { PuzzlePiece } from "@/components/ui/PuzzleCards";

const PUZZLE_IMGS = [
  "/images/puzzle/piece puzzle left.png",
  "/images/puzzle/piece puzzle center.png",
  "/images/puzzle/piece puzzle right.png",
];

const ckgPieces: PuzzlePiece[] = [
  { id: "peserta", img: PUZZLE_IMGS[0], value: "88", unit: "peserta", label: "Total Peserta" },
  { id: "perempuan", img: PUZZLE_IMGS[1], value: "71,6", unit: "%", label: "Perempuan" },
  { id: "lakilaki", img: PUZZLE_IMGS[2], value: "28,4", unit: "%", label: "Laki-laki" },
];

export default function StatistikKesehatanView() {
  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Header Description Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-kabola-teal/15 space-y-4">
        <h2 className="font-title text-xl sm:text-2xl md:text-3xl text-forest">
          Statistik Kesehatan Kabola
        </h2>
        <p className="text-earth/75 text-xs sm:text-sm md:text-base leading-relaxed">
          Kesehatan merupakan salah satu indikator penting dalam menilai
          kualitas hidup masyarakat. Salah satu upaya untuk mewujudkan
          masyarakat yang sehat adalah melalui deteksi dini terhadap berbagai
          faktor risiko penyakit. Upaya tersebut dapat dilakukan melalui{" "}
          Cek Kesehatan Gratis (CKG) yang kemudian menghasilkan
          data kesehatan masyarakat, seperti status gizi, tekanan darah, kadar
          gula darah, kolesterol, hingga asam urat. Pada halaman ini, data hasil
          CKG masyarakat Kabola disajikan dalam bentuk visualisasi statistik
          untuk memberikan gambaran umum mengenai kondisi kesehatan masyarakat.
        </p>
      </div>

      {/* Puzzle Cards — CKG Stats */}
      <div className="space-y-3">
        <PuzzleCards pieces={ckgPieces} />

        {/* Lokasi & Tanggal di bawah puzzle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 font-body">
          <div className="flex items-center gap-2 text-earth/70 text-xs sm:text-sm">
            <MapPin className="w-3.5 h-3.5 text-kabola-teal shrink-0" />
            <span>GMIT Imanuel Paliboo</span>
          </div>
          <div className="hidden sm:block w-px h-3.5 bg-kabola-teal/20" />
          <div className="flex items-center gap-2 text-earth/70 text-xs sm:text-sm">
            <Calendar className="w-3.5 h-3.5 text-kabola-teal shrink-0" />
            <span>2 Agustus 2026</span>
          </div>
        </div>
      </div>

      {/* Chart Demografis: Gender + Usia (1 card gabungan) */}
      <CKGDemografisChart />

      {/* Charts Row 2: Indikator Kesehatan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <BMIChart />
        <BloodPressureChart />
      </div>
    </div>
  );
}
