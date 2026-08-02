"use client";

import React, { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip,
} from "recharts";
import { motion } from "framer-motion";
import { Percent, Hash } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────
interface GenderItem { name: string; value: number; percentage: number; color: string; }
const genderData: GenderItem[] = [
  { name: "Perempuan", value: 63, percentage: 71.6, color: "#198D8D" },
  { name: "Laki-laki", value: 25, percentage: 28.4, color: "#0A3D62" },
];

interface AgeItem { range: string; frekuensi: number; }
const ageData: AgeItem[] = [
  { range: "20-30", frekuensi: 10 },
  { range: "30-40", frekuensi: 4  },
  { range: "40-50", frekuensi: 16 },
  { range: "50-60", frekuensi: 17 },
  { range: "60-70", frekuensi: 15 },
  { range: "70-80", frekuensi: 14 },
  { range: "80-90", frekuensi: 4  },
  { range: "≥90",   frekuensi: 1  },
];
const totalAge = ageData.reduce((s, d) => s + d.frekuensi, 0);

// ── Component ──────────────────────────────────────────────────────────
export default function CKGDemografisChart() {
  const [activeGender, setActiveGender] = useState<GenderItem | null>(null);
  const [activeAge, setActiveAge]       = useState<string | null>(null);
  const [viewMode, setViewMode]         = useState<"percent" | "count">("percent");

  // Tooltips
  const GenderTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d: GenderItem = payload[0].payload;
    return (
      <div className="bg-white px-4 py-3 rounded-xl border border-kabola-teal/20 text-xs font-body shadow-lg">
        <p className="font-semibold text-forest text-sm mb-1">{d.name}</p>
        <p className="text-earth/80">Jumlah: <span className="font-bold text-forest">{d.value} peserta</span></p>
        <p className="text-earth/80">Proporsi: <span className="font-bold text-kabola-teal">{d.percentage}%</span></p>
      </div>
    );
  };

  const AgeTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d: AgeItem = payload[0].payload;
    const pct = ((d.frekuensi / totalAge) * 100).toFixed(1);
    return (
      <div className="bg-white px-4 py-3 rounded-xl border border-kabola-teal/20 text-xs font-body shadow-lg">
        <p className="font-semibold text-forest text-sm mb-1">Usia {d.range}</p>
        <p className="text-earth/80">Frekuensi: <span className="font-bold text-forest">{d.frekuensi} peserta</span></p>
        <p className="text-earth/80">Proporsi: <span className="font-bold text-kabola-teal">{pct}%</span></p>
      </div>
    );
  };

  // Pie label
  const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const RADIAN = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    const item = genderData[index];
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
        fontSize={12} fontWeight={700} className="pointer-events-none">
        {viewMode === "percent" ? `${item.percentage}%` : `${item.value}`}
      </text>
    );
  };

  // Bar label
  const BarLabel = ({ x, y, width, value }: any) => {
    if (value < 2) return null;
    return (
      <text x={x + width / 2} y={y - 5} textAnchor="middle"
        fill="#0A3D62" fontSize={9} fontWeight={600}>{value}</text>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-kabola-teal/15 font-body">
      {/* Two charts side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ── Left: Gender Pie + Legend side-by-side ── */}
        <div className="flex flex-col gap-3">
          {/* Title + toggle */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <h3 className="font-title text-lg sm:text-xl text-forest font-normal leading-snug">
              Sebaran Peserta Menurut Jenis Kelamin
            </h3>
            <div className="flex items-center gap-1 bg-sand/60 p-1 rounded-full border border-kabola-teal/15 shrink-0 self-start">
              <button
                onClick={() => setViewMode("percent")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "percent" ? "bg-kabola-teal text-white" : "text-earth/70 hover:text-earth"
                }`}
              >
                <Percent className="w-3 h-3" /> Persentase
              </button>
              <button
                onClick={() => setViewMode("count")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "count" ? "bg-kabola-teal text-white" : "text-earth/70 hover:text-earth"
                }`}
              >
                <Hash className="w-3 h-3" /> Jumlah
              </button>
            </div>
          </div>
          {/* Inner 2-col: pie | legend */}
          <div className="grid grid-cols-2 items-center gap-4 flex-1">
            {/* Pie */}
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%" cy="50%" outerRadius={80}
                    dataKey="value" stroke="#fff" strokeWidth={2}
                    labelLine={false} label={renderPieLabel}
                    isAnimationActive={false}
                    onClick={(d) => setActiveGender(activeGender?.name === d.name ? null : d)}
                  >
                    {genderData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} className="cursor-pointer hover:opacity-85" />
                    ))}
                  </Pie>
                  <PieTooltip content={<GenderTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="space-y-2">
              {genderData.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 3 }}
                  onClick={() => setActiveGender(activeGender?.name === item.name ? null : item)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    activeGender?.name === item.name
                      ? "bg-kabola-teal/10 border-kabola-teal"
                      : "bg-sand/40 border-kabola-teal/10 hover:border-kabola-teal/30"
                  }`}
                  onMouseEnter={() => setActiveGender(item)}
                  onMouseLeave={() => setActiveGender(null)}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-md" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold text-forest text-xs">{item.name}</span>
                    </div>
                    <span className="font-bold text-forest text-sm">
                      {viewMode === "percent" ? `${item.percentage}%` : `${item.value} peserta`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>


        {/* ── Right: Age Histogram ── */}
        <div className="flex flex-col gap-3">
          <h3 className="font-title text-lg sm:text-xl text-forest font-normal leading-snug">
            Sebaran Usia Peserta
          </h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 18, right: 8, left: -20, bottom: 4 }} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="range" tick={{ fill: "#0A3D62", fontSize: 9, fontWeight: 500 }}
                  axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#1a2d3d", fontSize: 9 }} axisLine={false} tickLine={false}
                  allowDecimals={false} />
                <BarTooltip content={<AgeTooltip />} cursor={{ fill: "rgba(25,141,141,0.07)" }} />
                <Bar dataKey="frekuensi" radius={[5, 5, 0, 0]} label={<BarLabel />}
                  onMouseEnter={(d) => setActiveAge(d.range)}
                  onMouseLeave={() => setActiveAge(null)}>
                  {ageData.map((entry, i) => (
                    <Cell key={i} fill="#198D8D"
                      opacity={activeAge && activeAge !== entry.range ? 0.45 : 1}
                      className="cursor-pointer transition-all duration-200" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-earth/60 text-center font-body">Usia (tahun)</div>
        </div>
      </div>

      {/* Shared description */}
      <div className="mt-6 bg-sand/60 rounded-2xl p-4 border border-kabola-teal/10 text-xs text-earth leading-relaxed">
        <p>
          Peserta Cek Kesehatan Gratis didominasi oleh perempuan dengan persentase
          sebesar <strong>71,6%</strong>, sedangkan <strong>28,4%</strong> lainnya
          merupakan laki-laki. Sementara itu, berdasarkan usia, peserta tersebar
          pada rentang <strong>20</strong> hingga <strong>70</strong> tahun, dengan
          mayoritas berada pada kelompok usia <strong>35</strong> hingga{" "}
          <strong>70</strong> tahun.
        </p>
      </div>
    </div>
  );
}
