"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Percent, Hash } from "lucide-react";

interface ReligionItem {
  name: string;
  percentage: number;
  estimatedCount: number;
  color: string;
}

const religionData: ReligionItem[] = [
  { name: "Kristen", percentage: 86.98, estimatedCount: 3776, color: "#198D8D" },
  { name: "Islam", percentage: 10.73, estimatedCount: 466, color: "#0A3D62" },
  { name: "Katolik", percentage: 2.21, estimatedCount: 96, color: "#2BB5B5" },
  { name: "Hindu", percentage: 0.07, estimatedCount: 3, color: "#C9882A" },
];

export default function ReligionChart() {
  const [activeItem, setActiveItem] = useState<ReligionItem | null>(null);
  const [viewMode, setViewMode] = useState<"percent" | "count">("percent");

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: ReligionItem = payload[0].payload;
      return (
        <div className="bg-white text-earth px-4 py-3 rounded-xl border border-kabola-teal/20 text-xs font-body">
          <p className="font-semibold text-forest text-sm mb-1">{data.name}</p>
          <p className="text-earth/80">
            Persentase: <span className="font-bold text-kabola-teal">{data.percentage}%</span>
          </p>
          <p className="text-earth/80">
            Jumlah: <span className="font-bold text-forest">{data.estimatedCount.toLocaleString("id-ID")} jiwa</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const item = religionData[index];

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-body font-bold text-xs pointer-events-none"
      >
        {viewMode === "percent" ? `${item.percentage}%` : `${item.estimatedCount}`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-kabola-teal/15 flex flex-col justify-between h-full font-body">
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
        <h3 className="font-title text-xl sm:text-2xl text-forest font-normal leading-snug">
          Sebaran Penduduk Menurut Agama
        </h3>

        {/* Toggle View Mode */}
        <div className="flex items-center gap-1 bg-sand/60 p-1 rounded-full border border-kabola-teal/15 shrink-0 self-start">
          <button
            onClick={() => setViewMode("percent")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${viewMode === "percent"
                ? "bg-kabola-teal text-white"
                : "text-earth/70 hover:text-earth"
              }`}
          >
            <Percent className="w-3 h-3" /> Persentase
          </button>
          <button
            onClick={() => setViewMode("count")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${viewMode === "count"
                ? "bg-kabola-teal text-white"
                : "text-earth/70 hover:text-earth"
              }`}
          >
            <Hash className="w-3 h-3" /> Jumlah
          </button>
        </div>
      </div>

      {/* Main Sejajar Visual Layout */}
      <div className="my-2 grid grid-cols-1 md:grid-cols-2 items-center gap-6 min-h-[240px]">
        {/* Pie Chart Sejajar (h-60) */}
        <div className="relative h-60 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={religionData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="percentage"
                stroke="#ffffff"
                strokeWidth={2}
                labelLine={false}
                label={renderCustomLabel}
                onClick={(data) => setActiveItem(activeItem?.name === data.name ? null : data)}
                onMouseEnter={(_, index) => setActiveItem(religionData[index])}
                onMouseLeave={() => setActiveItem(null)}
              >
                {religionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="transition-all duration-200 cursor-pointer hover:opacity-85"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown List */}
        <div className="grid grid-cols-2 gap-3 font-body flex flex-col justify-center">
          {religionData.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -2 }}
              onClick={() => setActiveItem(activeItem?.name === item.name ? null : item)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${activeItem?.name === item.name
                  ? "bg-kabola-teal/10 border-kabola-teal"
                  : "bg-sand/40 border-kabola-teal/10 hover:border-kabola-teal/30"
                }`}
              onMouseEnter={() => setActiveItem(item)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div className="flex items-center gap-2 mb-1 font-body">
                <div
                  className="w-3 h-3 rounded-md shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-forest text-xs truncate">
                  {item.name}
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1 font-body">
                <span className="text-lg font-bold text-forest">
                  {viewMode === "percent" ? `${item.percentage}%` : `${item.estimatedCount.toLocaleString("id-ID")} jiwa`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Survey Text Box presisi sejajar di bagian bawah (mt-auto min-h-[76px]) */}
      <div className="mt-auto min-h-[76px] bg-sand/60 rounded-2xl p-4 border border-kabola-teal/10 text-xs text-earth leading-relaxed font-body flex items-center">
        <p>Sebagian besar masyarakat Kelurahan Kabola memeluk agama Kristen (<strong>86,98%</strong>), diikuti oleh penganut agama Islam (<strong>10,73%</strong>), Katolik (<strong>2,21%</strong>), dan Hindu (<strong>0,07%</strong>).</p>
      </div>
    </div>
  );
}
