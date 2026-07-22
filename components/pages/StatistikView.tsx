"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Building2,
  Compass,
} from "lucide-react";
import PuzzleCards from "@/components/ui/PuzzleCards";
import GenderChart from "@/components/ui/charts/GenderChart";
import ReligionChart from "@/components/ui/charts/ReligionChart";
import EducationChart from "@/components/ui/charts/EducationChart";
import JobChart from "@/components/ui/charts/JobChart";
import PanteDeereEducationChart from "@/components/ui/charts/PanteDeereEducationChart";

export default function StatistikView() {
  const [activeTab, setActiveTab] = useState<"kecamatan" | "kelurahan" | "pante-deere">("kecamatan");

  const kampungList = [
    "Kampung Wolatang",
    "Kampung Moimol",
    "Kampung Buyungta",
    "Kampung Tonbung",
    "Kampung Waindoa",
    "Kampung Poliboo",
    "Kampung Buiko",
    "Kampung Mali",
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Region Selector Switcher Pills (Responsif HP Resolusi Rendah) */}
      <div className="flex flex-col items-center w-full px-1">
        <div className="w-full sm:w-auto overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 bg-white p-1.5 rounded-2xl sm:rounded-full border border-kabola-teal/15 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <button
            onClick={() => setActiveTab("kecamatan")}
            className={`flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
              activeTab === "kecamatan"
                ? "bg-kabola-teal text-white"
                : "text-earth/70 hover:text-earth"
            }`}
          >
            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Kecamatan Kabola
          </button>

          <button
            onClick={() => setActiveTab("kelurahan")}
            className={`flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
              activeTab === "kelurahan"
                ? "bg-kabola-teal text-white"
                : "text-earth/70 hover:text-earth"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Kelurahan Kabola
          </button>

          <button
            onClick={() => setActiveTab("pante-deere")}
            className={`flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
              activeTab === "pante-deere"
                ? "bg-kabola-teal text-white"
                : "text-earth/70 hover:text-earth"
            }`}
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Desa Pante Deere
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: KECAMATAN KABOLA */}
        {activeTab === "kecamatan" && (
          <motion.div
            key="tab-kecamatan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 sm:space-y-10"
          >
            {/* Header Description Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-kabola-teal/15 space-y-4">
              <h2 className="font-title text-xl sm:text-2xl md:text-3xl text-forest">
                Kecamatan Kabola
              </h2>
              <p className="text-earth/75 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                Kecamatan Kabola merupakan salah satu kecamatan yang berada di Kabupaten Alor, Provinsi Nusa Tenggara Timur. Kecamatan Kabola terletak di sepanjang pantai utara berbukit dengan curah hujan yang sangat rendah. Dengan luas wilayah 73,01 km², kecamatan ini mempunyai wilayah administratif yang terdiri dari 5 Desa/Kelurahan, 11 Dusun, 22 Rukun Warga (RW), 45 Rukun Tetangga (RT) dengan jumlah penduduk sebanyak 8385 orang.
              </p>
            </div>

            {/* Administrasi Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-kabola-teal/15 text-center">
                <span className="font-title text-2xl sm:text-3xl text-forest block mb-0.5">5</span>
                <span className="text-[11px] sm:text-xs font-semibold text-earth/70">Desa / Kelurahan</span>
              </div>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-kabola-teal/15 text-center">
                <span className="font-title text-2xl sm:text-3xl text-kabola-teal block mb-0.5">11</span>
                <span className="text-[11px] sm:text-xs font-semibold text-earth/70">Dusun</span>
              </div>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-kabola-teal/15 text-center">
                <span className="font-title text-2xl sm:text-3xl text-forest block mb-0.5">22</span>
                <span className="text-[11px] sm:text-xs font-semibold text-earth/70">Rukun Warga (RW)</span>
              </div>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-kabola-teal/15 text-center">
                <span className="font-title text-2xl sm:text-3xl text-kabola-teal block mb-0.5">45</span>
                <span className="text-[11px] sm:text-xs font-semibold text-earth/70">Rukun Tetangga (RT)</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: KELURAHAN KABOLA */}
        {activeTab === "kelurahan" && (
          <motion.div
            key="tab-kelurahan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 sm:space-y-10"
          >
            {/* Header Description Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-kabola-teal/15 space-y-3 sm:space-y-4">
              <h2 className="font-title text-xl sm:text-2xl md:text-3xl text-forest">
                Kelurahan Kabola
              </h2>
              <p className="text-earth/75 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                Kelurahan Kabola merupakan salah satu kelurahan yang berada di Kecamatan Kabola, Kabupaten Alor, Provinsi Nusa Tenggara Timur. Dengan luas wilayah sebesar 20,81 km², kelurahan ini memiliki penduduk sebanyak 4341 jiwa. Penduduk Kelurahan Kabola mayoritas beragama Kristen dan tersebar ke dalam 8 Kampung, yaitu Kampung Wolatang, Kampung Moimol, Kampung Buyungta, Kampung Tonbung, Kampung Waindoa, Kampung Poliboo, Kampung Buiko, dan Kampung Mali. Kelurahan Kabola terbagi menjadi 4 RW dan 9 RT. Saat ini, Kelurahan Kabola memiliki 4 Pendidikan Anak Usia Dini (PAUD), 4 Taman Kanak-Kanak (TK), 5 Sekolah Dasar (SD), 2 Sekolah Menengah Pertama (SMP), dan 1 Sekolah Menengah Atas (SMA).
              </p>
            </div>

            {/* Gambar 1 Puzzle Visual */}
            <PuzzleCards luasWilayah="20,81" jumlahPenduduk="4341" jumlahKK="1254" />

            {/* 8 Kampung Grid */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-kabola-teal/15 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h3 className="font-title text-xl sm:text-2xl text-forest">
                  8 Kampung di Kelurahan Kabola
                </h3>
                <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-kabola-teal/10 text-kabola-teal shrink-0">
                  4 RW & 9 RT
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {kampungList.map((kampung, idx) => (
                  <div
                    key={kampung}
                    className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-sand/40 border border-kabola-teal/10 flex items-center gap-2"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-kabola-teal text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-forest truncate">
                      {kampung}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Demographics Grid (Gambar 2 & 3) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <GenderChart />
              <ReligionChart />
            </div>

            {/* Education Chart (Gambar 4) */}
            <EducationChart />

            {/* Job Chart (Gambar 5) */}
            <JobChart />
          </motion.div>
        )}

        {/* TAB 3: DESA PANTE DEERE */}
        {activeTab === "pante-deere" && (
          <motion.div
            key="tab-pante-deere"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 sm:space-y-10"
          >
            {/* Header Description Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-kabola-teal/15 space-y-3 sm:space-y-4">
              <h2 className="font-title text-xl sm:text-2xl md:text-3xl text-forest">
                Desa Pante Deere
              </h2>
              <p className="text-earth/75 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                Desa Pante Deere merupakan salah satu desa yang berada di Kecamatan Kabola, Kabupaten Alor, Provinsi Nusa Tenggara Timur. Dengan luas wilayah sebesar 7,67 km², desa ini memiliki penduduk sebanyak 893 jiwa. Desa Pante Deere terbagi menjadi 4 RW dan 8 RT. Saat ini, Desa Pante Deere memiliki 1 Taman Kanak-Kanak (TK) dan 1 Sekolah Dasar (SD).
              </p>
            </div>

            {/* Gambar 1 Puzzle Visual Pante Deere */}
            <PuzzleCards luasWilayah="7,67" jumlahPenduduk="893" jumlahKK="259" />

            {/* Gambar 2 Pie Chart Pendidikan Pante Deere */}
            <div className="max-w-3xl mx-auto">
              <PanteDeereEducationChart />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
