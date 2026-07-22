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

interface PanteDeereEduItem {
  level: string;
  percentage: number;
  estimatedCount: number;
  color: string;
}

const panteDeereEduData: PanteDeereEduItem[] = [
  { level: "SMA", percentage: 70.9, estimatedCount: 633, color: "#198D8D" },
  { level: "SD", percentage: 13.5, estimatedCount: 121, color: "#0A3D62" },
  { level: "SMP", percentage: 10.8, estimatedCount: 96, color: "#165B5B" },
  { level: "Diploma", percentage: 2.6, estimatedCount: 23, color: "#2BB5B5" },
  { level: "TK", percentage: 2.2, estimatedCount: 20, color: "#C9882A" },
];

export default function PanteDeereEducationChart() {
  const [activeItem, setActiveItem] = useState<PanteDeereEduItem | null>(null);
  const [viewMode, setViewMode] = useState<"percent" | "count">("percent");

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: PanteDeereEduItem = payload[0].payload;
      return (
        <div className="bg-white text-earth px-4 py-3 rounded-xl border border-kabola-teal/20 text-xs font-body">
          <p className="font-semibold text-forest text-sm mb-1">{data.level}</p>
          <p className="text-earth/80">
            Persentase: <span className="font-bold text-kabola-teal">{data.percentage}%</span>
          </p>
          <p className="text-earth/80">
            Estimasi: <span className="font-bold text-forest">± {data.estimatedCount} jiwa</span>
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
    const item = panteDeereEduData[index];

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-body font-bold text-xs pointer-events-none"
      >
        {viewMode === "percent" ? `${item.percentage}%` : `±${item.estimatedCount}`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-kabola-teal/15 flex flex-col justify-between h-full font-body">
      {/* Header & View Mode Controls */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-4 min-h-[72px]">
          <h3 className="font-title text-xl sm:text-2xl text-forest font-normal leading-snug">
            Sebaran Penduduk Menurut Pendidikan
          </h3>

          <div className="flex items-center gap-1 bg-sand/60 p-1 rounded-full border border-kabola-teal/15 shrink-0 self-start">
            <button
              onClick={() => setViewMode("percent")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                viewMode === "percent"
                  ? "bg-kabola-teal text-white"
                  : "text-earth/70 hover:text-earth"
              }`}
            >
              <Percent className="w-3 h-3" /> %
            </button>
            <button
              onClick={() => setViewMode("count")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                viewMode === "count"
                  ? "bg-kabola-teal text-white"
                  : "text-earth/70 hover:text-earth"
              }`}
            >
              <Hash className="w-3 h-3" /> Jiwa
            </button>
          </div>
        </div>
      </div>

      {/* Main Pie Sejajar Layout */}
      <div className="my-2 grid grid-cols-1 md:grid-cols-2 items-center gap-6 min-h-[240px]">
        {/* Pie Chart (h-60) */}
        <div className="relative h-60 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={panteDeereEduData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="percentage"
                stroke="#ffffff"
                strokeWidth={2}
                labelLine={false}
                label={renderCustomLabel}
                onClick={(data) => setActiveItem(activeItem?.level === data.level ? null : data)}
                onMouseEnter={(_, index) => setActiveItem(panteDeereEduData[index])}
                onMouseLeave={() => setActiveItem(null)}
              >
                {panteDeereEduData.map((entry, index) => (
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
          {panteDeereEduData.map((item) => (
            <motion.div
              key={item.level}
              whileHover={{ y: -2 }}
              onClick={() => setActiveItem(activeItem?.level === item.level ? null : item)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeItem?.level === item.level
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
                  {item.level}
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1 font-body">
                <span className="text-lg font-bold text-forest">
                  {viewMode === "percent" ? `${item.percentage}%` : `± ${item.estimatedCount}`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Survey Text Box */}
      <div className="mt-auto min-h-[76px] bg-sand/60 rounded-2xl p-4 border border-kabola-teal/10 text-xs text-earth leading-relaxed font-body flex items-center">
        Tingkat pendidikan penduduk di Pante Deere didominasi oleh lulusan SMA dengan proporsi mencapai 70,9%. Pada jenjang pendidikan dasar, lulusan SD mencakup 13,5% dan SMP sebesar 10,8%. Sementara itu, kelompok lulusan TK dan Diploma mencatatkan jumlah terkecil.
      </div>
    </div>
  );
}
