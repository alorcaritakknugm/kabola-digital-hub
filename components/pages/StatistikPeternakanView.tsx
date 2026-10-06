"use client";

import React from "react";
import LivestockChart from "@/components/ui/charts/LivestockChart";
import InteractiveLivestockMap from "@/components/ui/maps/InteractiveLivestockMap";

export default function StatistikPeternakanView() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Header Description Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-kabola-teal/15 space-y-4">
        <div className="inline-block bg-kabola-teal/10 text-kabola-teal text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-kabola-teal/20">
          Analisis Clustering K-Medoids
        </div>
        <h2 className="font-title text-xl sm:text-2xl md:text-3xl text-forest">
          Statistik & Persebaran Hewan Ternak Kabupaten Alor
        </h2>
        <p className="text-earth/75 text-xs sm:text-sm md:text-base leading-relaxed">
          Berdasarkan analisis pengelompokan metode <strong>K-Medoids Clustering</strong> berbasis <em>Bray-Curtis Distance</em>, wilayah Kabupaten Alor dikelompokkan menjadi 3 (tiga) klaster utama untuk melihat sebaran, pola, dan karakteristik populasi hewan ternak (Sapi Potong, Kerbau, Kuda, Kambing, Domba, Babi, Ayam, dan Itik) di setiap kecamatan.
        </p>
      </div>

      {/* Interactive Vector SVG Map */}
      <InteractiveLivestockMap />

      {/* Historical Growth Chart Populasi Hewan Ternak */}
      <LivestockChart />
    </div>
  );
}
