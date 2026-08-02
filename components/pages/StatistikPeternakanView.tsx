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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {clusters.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCluster(c.id)}
              className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border-2 ${
                activeCluster === c.id
                  ? `${c.color} ${c.bg} shadow-md`
                  : "border-transparent bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <h4 className={`text-base sm:text-lg font-bold ${activeCluster === c.id ? "text-forest" : "text-slate-700"}`}>
                {c.name}
              </h4>
              <p className="text-xs sm:text-sm text-earth/70 mt-1 line-clamp-2">
                {c.anggota.length} Kecamatan terdaftar
              </p>
            </button>
          ))}
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
