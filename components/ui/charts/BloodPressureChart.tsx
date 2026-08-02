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

interface BPData {
  kategori: string;
  jumlah: number;
  color: string;
  label: string;
}

const bpData: BPData[] = [
  {
    kategori: "Pre Hipertensi",
    jumlah: 28,
    color: "#198D8D",
    label: "Sistolik 120–139 atau Diastolik 80–89 mmHg",
  },
  {
    kategori: "Hipertensi Tk. 1",
    jumlah: 22,
    color: "#1AABAB",
    label: "Sistolik 140–159 atau Diastolik 90–99 mmHg",
  },
  {
    kategori: "Hipertensi Tk. 2",
    jumlah: 17,
    color: "#0F6E6E",
    label: "Sistolik ≥160 atau Diastolik ≥100 mmHg",
  },
  {
    kategori: "Normal",
    jumlah: 14,
    color: "#0A3D62",
    label: "Sistolik <120 dan Diastolik <80 mmHg",
  },
];

const totalPeserta = bpData.reduce((s, d) => s + d.jumlah, 0);

export default function BloodPressureChart() {
  const [activeBar, setActiveBar] = useState<string | null>(null);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: BPData = payload[0].payload;
      const pct = ((data.jumlah / totalPeserta) * 100).toFixed(1);
      return (
        <div className="bg-white text-earth px-4 py-3 rounded-xl border border-kabola-teal/20 text-xs font-body shadow-lg">
          <p className="font-semibold text-forest text-sm mb-1">
            {data.kategori}
          </p>
          <p className="text-earth/80 mb-0.5">{data.label}</p>
          <p className="text-earth/80">
            Jumlah:{" "}
            <span className="font-bold text-forest">{data.jumlah} peserta</span>
          </p>
          <p className="text-earth/80">
            Proporsi:{" "}
            <span className="font-bold text-kabola-teal">{pct}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 6}
        textAnchor="middle"
        fill="#0A3D62"
        fontSize={11}
        fontWeight={600}
        className="font-body"
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
          Sebaran Peserta Berdasarkan Kategori Tekanan Darah
        </h3>
      </div>

      {/* Bar Chart */}
      <div className="h-64 sm:h-72 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={bpData}
            margin={{ top: 24, right: 16, left: -16, bottom: 4 }}
            barSize={48}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="kategori"
              tick={{ fill: "#0A3D62", fontSize: 10, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#1a2d3d", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(25,141,141,0.07)" }} />
            <Bar
              dataKey="jumlah"
              radius={[6, 6, 0, 0]}
              label={<CustomLabel />}
              onMouseEnter={(data) => setActiveBar(data.kategori)}
              onMouseLeave={() => setActiveBar(null)}
            >
              {bpData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={activeBar && activeBar !== entry.kategori ? 0.5 : 1}
                  className="transition-all duration-200 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        {bpData.map((item) => (
          <motion.div
            key={item.kategori}
            whileHover={{ y: -2 }}
            onMouseEnter={() => setActiveBar(item.kategori)}
            onMouseLeave={() => setActiveBar(null)}
            className={`p-2.5 rounded-xl border text-center cursor-default transition-all ${
              activeBar === item.kategori
                ? "border-kabola-teal bg-kabola-teal/10"
                : "border-kabola-teal/10 bg-sand/40"
            }`}
          >
            <div
              className="w-3 h-3 rounded-md mx-auto mb-1.5"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-[10px] sm:text-xs font-semibold text-forest leading-tight">
              {item.kategori}
            </p>
            <p className="font-bold text-base text-forest mt-0.5">
              {item.jumlah}
            </p>
            <p className="text-[10px] text-earth/60">peserta</p>
          </motion.div>
        ))}
      </div>

      {/* Description */}
      <div className="mt-4 min-h-[76px] bg-sand/60 rounded-2xl p-4 border border-kabola-teal/10 text-xs text-earth leading-relaxed font-body flex items-center">
        <p>
          Sebagian besar peserta memiliki tekanan darah yang berada di atas rentang
          normal, dengan <strong>28 peserta</strong> atau mayoritas berada dalam
          kelompok prehipertensi. Sementara itu, kelompok peserta dengan tekanan
          darah normal memiliki jumlah paling sedikit, yaitu sebanyak{" "}
          <strong>14 orang</strong>.
        </p>
      </div>
    </div>
  );
}
