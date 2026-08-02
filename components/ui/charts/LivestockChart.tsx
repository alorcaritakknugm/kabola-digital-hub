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

type Animal = "Sapi" | "Kambing" | "Babi" | "Ayam";

interface ChartData {
  year: string;
  Sapi: number;
  Kambing: number;
  Babi: number;
  Ayam: number;
}

const data: ChartData[] = [
  { year: "2023", Sapi: 40, Kambing: 1110, Babi: 3050, Ayam: 10500 },
  { year: "2024", Sapi: 41, Kambing: 1200, Babi: 3200, Ayam: 10700 },
  { year: "2025", Sapi: 42, Kambing: 1300, Babi: 3350, Ayam: 11000 },
];

export default function LivestockChart() {
  const [activeAnimal, setActiveAnimal] = useState<Animal>("Ayam");
  const [activeBar, setActiveBar] = useState<string | null>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-white text-earth px-4 py-3 rounded-xl border border-kabola-teal/20 text-xs font-body shadow-lg">
          <p className="font-semibold text-forest text-sm mb-1">Tahun {label}</p>
          <p className="text-earth/80">
            Jumlah <span className="font-bold text-kabola-teal">{activeAnimal}</span>:{" "}
            <span className="font-bold text-forest">{value} ekor</span>
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
        y={y - 8}
        textAnchor="middle"
        fill="#0A3D62"
        fontSize={11}
        fontWeight={600}
      >
        {value}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-kabola-teal/15 flex flex-col h-full font-body">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-center">
        <h3 className="font-title text-xl sm:text-2xl text-forest font-normal leading-snug">
          Populasi Ternak di Kecamatan Kabola (2023-2025)
        </h3>
        <p className="text-sm text-earth/80 mt-1">
          Pilih hewan ternak untuk melihat perkembangan populasinya selama tiga tahun terakhir.
        </p>
      </div>

      {/* Tabs / Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(["Sapi", "Kambing", "Babi", "Ayam"] as Animal[]).map((animal) => (
          <button
            key={animal}
            onClick={() => setActiveAnimal(animal)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeAnimal === animal
                ? "bg-kabola-teal text-white shadow-md shadow-kabola-teal/20"
                : "bg-kabola-teal/5 text-kabola-teal hover:bg-kabola-teal/10"
            }`}
          >
            {animal}
          </button>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="h-72 sm:h-80 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 24, right: 12, left: -16, bottom: 4 }}
            barSize={48}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="year"
              tick={{ fill: "#0A3D62", fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              height={36}
            />
            <YAxis
              tick={{ fill: "#1a2d3d", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(25,141,141,0.07)" }}
            />
            <Bar
              dataKey={activeAnimal}
              radius={[6, 6, 0, 0]}
              label={<CustomLabel />}
              onMouseEnter={(d) => setActiveBar(d.year)}
              onMouseLeave={() => setActiveBar(null)}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#198D8D"
                  opacity={activeBar && activeBar !== entry.year ? 0.6 : 1}
                  className="cursor-pointer transition-all duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Description */}
      <div className="mt-8 bg-sand/60 rounded-2xl p-4 border border-kabola-teal/10 text-xs sm:text-sm text-earth leading-relaxed flex items-center">
        <p>
          Dalam tiga tahun terakhir, populasi berbagai hewan ternak di Kecamatan Kabola seperti sapi, kambing, babi, dan ayam cenderung memperlihatkan peningkatan yang konsisten, meskipun tidak terlalu signifikan secara absolut. Dari berbagai jenis ternak yang tercatat, <strong>populasi ayam</strong> menunjukkan jumlah yang paling besar.
        </p>
      </div>
    </div>
  );
}
