"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

interface AgeData {
  range: string;
  frekuensi: number;
}

const ageData: AgeData[] = [
  { range: "20-30", frekuensi: 10 },
  { range: "30-40", frekuensi: 4  },
  { range: "40-50", frekuensi: 16 },
  { range: "50-60", frekuensi: 17 },
  { range: "60-70", frekuensi: 15 },
  { range: "70-80", frekuensi: 14 },
  { range: "80-90", frekuensi: 4  },
  { range: "≥90",   frekuensi: 1  },
];

const total = ageData.reduce((s, d) => s + d.frekuensi, 0);

export default function AgeChart() {
  const [activeBar, setActiveBar] = useState<string | null>(null);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d: AgeData = payload[0].payload;
      const pct = ((d.frekuensi / total) * 100).toFixed(1);
      return (
        <div className="bg-white text-earth px-4 py-3 rounded-xl border border-kabola-teal/20 text-xs font-body shadow-lg">
          <p className="font-semibold text-forest text-sm mb-1">Usia {d.range}</p>
          <p className="text-earth/80">
            Frekuensi: <span className="font-bold text-forest">{d.frekuensi} peserta</span>
          </p>
          <p className="text-earth/80">
            Proporsi: <span className="font-bold text-kabola-teal">{pct}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    if (value < 2) return null; // jangan tampilkan label pada bar sangat kecil
    return (
      <text
        x={x + width / 2}
        y={y - 6}
        textAnchor="middle"
        fill="#0A3D62"
        fontSize={10}
        fontWeight={600}
      >
        {value}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-kabola-teal/15 flex flex-col h-full font-body">
      {/* Header */}
      <div className="mb-4 min-h-[72px] flex flex-col justify-center">
        <h3 className="font-title text-xl sm:text-2xl text-forest font-normal leading-snug">
          Sebaran Usia Peserta
        </h3>
      </div>

      {/* Bar Chart */}
      <div className="h-64 sm:h-72 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ageData}
            margin={{ top: 24, right: 12, left: -16, bottom: 4 }}
            barSize={32}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="range"
              tick={{ fill: "#0A3D62", fontSize: 10, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Usia",
                position: "insideBottom",
                offset: -2,
                fontSize: 11,
                fill: "#1a2d3d",
              }}
              height={36}
            />
            <YAxis
              tick={{ fill: "#1a2d3d", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              label={{
                value: "Frekuensi",
                angle: -90,
                position: "insideLeft",
                offset: 20,
                fontSize: 11,
                fill: "#1a2d3d",
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(25,141,141,0.07)" }}
            />
            <Bar
              dataKey="frekuensi"
              radius={[6, 6, 0, 0]}
              label={<CustomLabel />}
              onMouseEnter={(d) => setActiveBar(d.range)}
              onMouseLeave={() => setActiveBar(null)}
            >
              {ageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#198D8D"
                  opacity={activeBar && activeBar !== entry.range ? 0.5 : 1}
                  className="cursor-pointer transition-all duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Description */}
      <div className="mt-4 min-h-[76px] bg-sand/60 rounded-2xl p-4 border border-kabola-teal/10 text-xs text-earth leading-relaxed flex items-center">
        <p>
          Berdasarkan usia, peserta tersebar pada rentang <strong>20</strong> hingga{" "}
          <strong>70</strong> tahun, dengan mayoritas berada pada kelompok usia{" "}
          <strong>35</strong> hingga <strong>70</strong> tahun.
        </p>
      </div>
    </div>
  );
}
