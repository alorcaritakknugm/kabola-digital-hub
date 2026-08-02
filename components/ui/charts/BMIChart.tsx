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

interface BMIData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const bmiData: BMIData[] = [
  { name: "Obesitas",    value: 33, percentage: 45.7, color: "#0A3D62" },
  { name: "Normal",      value: 24, percentage: 33.3, color: "#198D8D" },
  { name: "Overweight",  value: 10, percentage: 13.6, color: "#1AABAB" },
  { name: "Underweight", value: 5,  percentage: 7.4,  color: "#2BC0A8" },
];

const total = bmiData.reduce((s, d) => s + d.value, 0);

export default function BMIChart() {
  const [activeSegment, setActiveSegment] = useState<BMIData | null>(null);
  const [viewMode, setViewMode] = useState<"percent" | "count">("percent");

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: BMIData = payload[0].payload;
      return (
        <div className="bg-white text-earth px-4 py-3 rounded-xl border border-kabola-teal/20 text-xs font-body shadow-lg">
          <p className="font-semibold text-forest text-sm mb-1">{data.name}</p>
          <p className="text-earth/80">
            Jumlah: <span className="font-bold text-forest">{data.value} peserta</span>
          </p>
          <p className="text-earth/80">
            Proporsi: <span className="font-bold text-kabola-teal">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const item = bmiData[index];
    if (item.percentage < 8) return null; // skip tiny slices

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-body font-bold text-xs pointer-events-none"
        fontSize={11}
      >
        {viewMode === "percent" ? `${item.percentage}%` : `${item.value}`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-kabola-teal/15 flex flex-col justify-between h-full font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4 min-h-[72px]">
        <h3 className="font-title text-xl sm:text-2xl text-forest font-normal leading-snug">
          Sebaran Peserta Menurut Kategori Indeks Massa Tubuh
        </h3>
        {/* Toggle */}
        <div className="flex items-center gap-1 bg-sand/60 p-1 rounded-full border border-kabola-teal/15 shrink-0 self-start">
          <button
            onClick={() => setViewMode("percent")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              viewMode === "percent"
                ? "bg-kabola-teal text-white"
                : "text-earth/70 hover:text-earth"
            }`}
          >
            <Percent className="w-3 h-3" /> Persentase
          </button>
          <button
            onClick={() => setViewMode("count")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              viewMode === "count"
                ? "bg-kabola-teal text-white"
                : "text-earth/70 hover:text-earth"
            }`}
          >
            <Hash className="w-3 h-3" /> Jumlah
          </button>
        </div>
      </div>

      {/* Chart + Legend */}
      <div className="my-2 grid grid-cols-1 md:grid-cols-2 items-center gap-6 min-h-[240px]">
        {/* Pie Chart */}
        <div className="relative h-60 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bmiData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={2}
                labelLine={false}
                label={renderCustomLabel}
                isAnimationActive={false}
                onClick={(data) =>
                  setActiveSegment(
                    activeSegment?.name === data.name ? null : data
                  )
                }
              >
                {bmiData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="cursor-pointer hover:opacity-85"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Cards */}
        <div className="space-y-3 font-body flex flex-col justify-center">
          {bmiData.map((item) => {
            const pct = ((item.value / total) * 100).toFixed(1);
            return (
              <motion.div
                key={item.name}
                whileHover={{ x: 3 }}
                onClick={() =>
                  setActiveSegment(
                    activeSegment?.name === item.name ? null : item
                  )
                }
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  activeSegment?.name === item.name
                    ? "bg-kabola-teal/10 border-kabola-teal"
                    : "bg-sand/40 border-kabola-teal/10 hover:border-kabola-teal/30"
                }`}
                onMouseEnter={() => setActiveSegment(item)}
                onMouseLeave={() => setActiveSegment(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3.5 h-3.5 rounded-md"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold text-forest text-sm">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold text-forest text-base">
                    {viewMode === "percent"
                      ? `${item.percentage}%`
                      : `${item.value} peserta`}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1.5 text-xs text-earth/70">
                  <span>{item.value} peserta</span>
                  <span className="font-semibold text-forest">
                    {item.percentage}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="mt-auto min-h-[76px] bg-sand/60 rounded-2xl p-4 border border-kabola-teal/10 text-xs text-earth leading-relaxed font-body flex items-center">
        <p>
          Mayoritas peserta berada dalam kategori Obesitas dengan persentase sebesar{" "}
          <strong>45,7%</strong> yang kemudian disusul oleh kategori Normal dengan
          persentase <strong>33,3%</strong>.
        </p>
      </div>
    </div>
  );
}
