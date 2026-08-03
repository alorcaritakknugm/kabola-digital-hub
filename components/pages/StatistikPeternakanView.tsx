"use client";

import React, { useState } from "react";
import { MapPin, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LivestockChart from "@/components/ui/charts/LivestockChart";

type ClusterInfo = {
  id: string;
  name: string;
  description: string;
  anggota: string[];
  color: string;
  bg: string;
};

const clusters: ClusterInfo[] = [
  {
    id: "klaster-1",
    name: "Klaster 1",
    description: "Populasi ternak tergolong moderat. Kecamatan di klaster ini didominasi oleh ternak seperti sapi, kuda, kambing, babi, dan ayam.",
    anggota: ["Pantar", "Pantar Timur", "Pantar Barat Laut", "Pantar Tengah", "Abad Selatan", "Alor Timur Laut", "Alor Tengah Utara", "Pulau Pura"],
    color: "border-teal-500",
    bg: "bg-teal-50",
  },
  {
    id: "klaster-2",
    name: "Klaster 2",
    description: "Memiliki populasi hewan ternak paling besar dengan dominasi kambing, domba, babi, ayam, dan itik.",
    anggota: ["Alor Barat Laut", "Kabola", "Teluk Mutiara", "Alor Barat Daya"],
    color: "border-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    id: "klaster-3",
    name: "Klaster 3",
    description: "Mencatatkan jumlah populasi paling rendah di antara klaster lainnya. Klaster ini berfokus pada sapi potong sebagai jenis ternak utama.",
    anggota: ["Mataru", "Pureman", "Alor Selatan", "Pantar Barat", "Alor Timur", "Lembur"],
    color: "border-sky-500",
    bg: "bg-sky-50",
  },
];

export default function StatistikPeternakanView() {
  const [activeCluster, setActiveCluster] = useState<string>("klaster-2");

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Header Description Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-kabola-teal/15 space-y-4">
        <h2 className="font-title text-xl sm:text-2xl md:text-3xl text-forest">
          Statistik Hewan Ternak
        </h2>
        <p className="text-earth/75 text-xs sm:text-sm md:text-base leading-relaxed">
          Berdasarkan analisis clustering menggunakan metode K-Medoids berbasis Bray-Curtins
          Distance, wilayah Kabupaten Alor dikelompokkan menjadi tiga klaster utama untuk 
          melihat sebaran dan karakteristik populasi hewan ternak.
        </p>
      </div>

      {/* Interactive Cluster Map/Toggle */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-kabola-teal/15 font-body">
        <div className="mb-6 flex flex-col justify-center">
          <h3 className="font-title text-xl sm:text-2xl text-forest font-normal leading-snug">
            Persebaran Klaster Peternakan Alor
          </h3>
          <p className="text-sm text-earth/80 mt-1">
            Pilih klaster di bawah ini untuk melihat detail daerah dan karakteristik populasinya.
          </p>
        </div>

        <div className="flex flex-col items-center w-full px-1 mb-8">
          <div className="w-full sm:w-auto overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 bg-white p-1.5 rounded-2xl sm:rounded-full border border-kabola-teal/15 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            {clusters.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCluster(c.id)}
                className={`flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  activeCluster === c.id
                    ? "bg-kabola-teal text-white"
                    : "text-earth/70 hover:text-earth"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {clusters.map((c) =>
            activeCluster === c.id ? (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-5 sm:p-6 border ${c.color} ${c.bg}`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-white rounded-full shrink-0">
                    <Info className="w-5 h-5 text-kabola-teal" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-forest text-sm sm:text-base">Karakteristik {c.name}</h5>
                    <p className="text-earth/80 text-xs sm:text-sm mt-1 leading-relaxed">{c.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-forest text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    Anggota Kecamatan
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {c.anggota.map((kec) => (
                      <span
                        key={kec}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 shadow-sm"
                      >
                        {kec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Chart Populasi Hewan Ternak */}
      <LivestockChart />
    </div>
  );
}
