"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import { ArrowUpDown } from "lucide-react";

interface EducationItem {
  level: string;
  count: number;
}

const rawEducationData: EducationItem[] = [
  { level: "Tidak/Belum Sekolah", count: 1083 },
  { level: "Tidak Tamat SD", count: 943 },
  { level: "SD", count: 659 },
  { level: "SMP", count: 531 },
  { level: "SMA", count: 835 },
  { level: "Diploma", count: 284 },
  { level: "S1", count: 2 },
  { level: "S2", count: 5 },
];

export default function EducationChart() {
  const [sortByCount, setSortByCount] = useState(false);

  const displayData = [...rawEducationData].sort((a, b) => {
    if (sortByCount) return b.count - a.count;
    return 0;
  });

  const totalCount = rawEducationData.reduce((acc, curr) => acc + curr.count, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: EducationItem = payload[0].payload;
      const percentage = ((data.count / totalCount) * 100).toFixed(1);
      return (
        <div className="bg-white text-earth px-4 py-3 rounded-xl border border-kabola-teal/20 text-xs font-body">
          <p className="font-body font-semibold text-forest text-sm mb-1">{data.level}</p>
          <p className="text-earth/80">
            Jumlah Penduduk: <span className="font-semibold text-forest">{data.count.toLocaleString("id-ID")} jiwa</span>
          </p>
          <p className="text-earth/80">
            Persentase Total: <span className="font-semibold text-kabola-teal">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const facilities = [
    { label: "PAUD", count: 4 },
    { label: "TK", count: 4 },
    { label: "SD", count: 5 },
    { label: "SMP", count: 2 },
    { label: "SMA", count: 1 },
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-kabola-teal/15 w-full font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-title text-lg sm:text-2xl text-forest font-normal">
            Sebaran Penduduk Menurut Tingkat Pendidikan
          </h3>
        </div>

        {/* Sort Controls */}
        <button
          onClick={() => setSortByCount(!sortByCount)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-sand/60 hover:bg-sand text-earth text-xs font-semibold transition-colors border border-kabola-teal/15 shrink-0"
        >
          <ArrowUpDown className="w-3 h-3 text-kabola-teal" />
          {sortByCount ? "Urutan: Jumlah" : "Urutan: Jenjang"}
        </button>
      </div>

      {/* Facilities Ribbon - Responsif HP Kecil */}
      <div className="mb-5 bg-sand/40 rounded-2xl p-2.5 sm:p-4 border border-kabola-teal/10">
        <span className="text-[10px] sm:text-xs font-semibold text-forest uppercase tracking-wider block mb-2">
          Fasilitas Pendidikan di Kelurahan Kabola:
        </span>
        <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center">
          {facilities.map((fac) => (
            <div key={fac.label} className="bg-white rounded-lg sm:rounded-xl p-1 sm:p-2 border border-kabola-teal/15">
              <span className="text-xs sm:text-lg font-title font-semibold text-kabola-teal block leading-tight">{fac.count}</span>
              <span className="text-[8px] xs:text-[9px] sm:text-[11px] font-semibold text-earth/70 leading-tight block mt-0.5 truncate">{fac.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Bar Chart */}
      <div className="h-60 sm:h-72 w-full my-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={displayData}
            margin={{ top: 15, right: 5, left: -15, bottom: 45 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="level"
              interval={0}
              angle={-35}
              textAnchor="end"
              tick={{ fill: "#1a2d3d", fontSize: 10, fontWeight: 500 }}
            />
            <YAxis tick={{ fill: "#1a2d3d", fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
              fill="#198D8D"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Survey Text Box */}
      <div className="mt-3 bg-sand/60 rounded-2xl p-3.5 sm:p-4 border border-kabola-teal/10 text-xs text-earth leading-relaxed font-body">
        <p>Penduduk Kabola didominasi kelompok <strong>tidak atau belum sekolah</strong> dan <strong>tidak tamat SD</strong>. Namun, pada tingkat menengah, mayoritas penduduk merupakan lulusan <strong>SMA</strong>. Sementara itu, proporsi lulusan perguruan tinggi tercatat menjadi yang paling rendah.</p>
      </div>
    </div>
  );
}
