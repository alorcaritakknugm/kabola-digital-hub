"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Search, Filter, X, SearchX } from "lucide-react";

interface JobItem {
  job: string;
  count: number;
  category: "Pertanian & Kelautan" | "Usaha & Swasta" | "Pemerintahan & Pelayanan" | "Kesehatan & Pendidikan";
}

const jobDataRaw: JobItem[] = [
  { job: "Petani", count: 877, category: "Pertanian & Kelautan" },
  { job: "Wiraswasta", count: 164, category: "Usaha & Swasta" },
  { job: "Honorer", count: 161, category: "Pemerintahan & Pelayanan" },
  { job: "Nelayan", count: 153, category: "Pertanian & Kelautan" },
  { job: "PNS", count: 139, category: "Pemerintahan & Pelayanan" },
  { job: "Guru", count: 56, category: "Kesehatan & Pendidikan" },
  { job: "Pensiun", count: 43, category: "Pemerintahan & Pelayanan" },
  { job: "Perawat", count: 15, category: "Kesehatan & Pendidikan" },
  { job: "Pendeta", count: 14, category: "Pemerintahan & Pelayanan" },
  { job: "Bidan", count: 5, category: "Kesehatan & Pendidikan" },
  { job: "POLRI", count: 4, category: "Pemerintahan & Pelayanan" },
  { job: "TNI", count: 3, category: "Pemerintahan & Pelayanan" },
  { job: "Dosen", count: 2, category: "Kesehatan & Pendidikan" },
  { job: "Apoteker", count: 1, category: "Kesehatan & Pendidikan" },
  { job: "Pedagang", count: 1, category: "Usaha & Swasta" },
];

export default function JobChart() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

  const totalWorkers = useMemo(
    () => jobDataRaw.reduce((acc, item) => acc + item.count, 0),
    []
  );

  const categories = ["Semua", "Pertanian & Kelautan", "Usaha & Swasta", "Pemerintahan & Pelayanan", "Kesehatan & Pendidikan"];

  const filteredData = useMemo(() => {
    return jobDataRaw.filter((item) => {
      const matchesSearch = item.job.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: JobItem = payload[0].payload;
      const pct = ((data.count / totalWorkers) * 100).toFixed(1);
      return (
        <div className="bg-white text-slate-800 px-4 py-3 rounded-xl border border-slate-200 shadow-lg text-xs font-body">
          <p className="font-semibold text-slate-900 text-sm mb-1">{data.job}</p>
          <p className="text-slate-600">
            Jumlah Pekerja: <span className="font-bold text-slate-900">{data.count.toLocaleString("id-ID")} jiwa</span>
          </p>
          <p className="text-slate-600">
            Kategori: <span className="font-medium text-slate-700">{data.category}</span>
          </p>
          <p className="text-slate-600">
            Proporsi Pekerja: <span className="font-bold text-[#198D8D]">{pct}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-kabola-teal/15 w-full font-body">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-title text-xl sm:text-2xl text-forest">
            Sebaran Penduduk Menurut Pekerjaan
          </h3>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-64">
          <Search className="w-4 h-4 text-kabola-teal/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari pekerjaan (Petani, Nelayan...)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2 rounded-full bg-sand/50 border border-kabola-teal/15 text-xs text-earth focus:ring-2 focus:ring-kabola-teal outline-none transition-all font-body"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-earth/50 hover:text-earth"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Filter Counter */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
          <Filter className="w-3.5 h-3.5 text-earth/50 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-kabola-teal text-white"
                  : "bg-sand/60 hover:bg-sand text-earth/70 border border-kabola-teal/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-[11px] sm:text-xs text-earth/60 font-body">
          Menampilkan <strong className="text-forest">{filteredData.length}</strong> dari {jobDataRaw.length} Jenis Pekerjaan
        </span>
      </div>

      {/* Main Horizontal Bar Chart */}
      {filteredData.length > 0 ? (
        <div className="h-[380px] sm:h-[400px] w-full my-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={filteredData}
              margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
              <XAxis type="number" tick={{ fill: "#1a2d3d", fontSize: 10 }} />
              <YAxis
                type="category"
                dataKey="job"
                tick={{ fill: "#0A3D62", fontSize: 10, fontWeight: 500 }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                radius={[0, 6, 6, 0]}
                barSize={16}
                fill="#198D8D"
                onClick={(data) => setSelectedJob(selectedJob?.job === data.job ? null : data)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* Empty State Message */
        <div className="py-12 sm:py-16 text-center text-earth/60 font-body border border-dashed border-kabola-teal/20 rounded-2xl bg-sand/30 my-4 space-y-2 px-4">
          <SearchX className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-kabola-teal/40" />
          <p className="font-semibold text-forest text-sm sm:text-base">Pekerjaan "{searchQuery}" tidak ditemukan</p>
          <p className="text-xs text-earth/60 max-w-sm mx-auto">
            Tidak ada mata pencaharian yang cocok dengan kata kunci pencarian. Coba kata kunci lain atau reset filter kategori.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Semua");
            }}
            className="mt-2 inline-block px-4 py-1.5 bg-kabola-teal text-white rounded-full text-xs font-semibold hover:bg-kabola-teal-dark transition-all"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Selected Job Active Highlight */}
      {selectedJob && (
        <div className="mt-3 p-3 bg-kabola-teal/10 rounded-2xl border border-kabola-teal/20 text-xs flex items-center justify-between font-body">
          <span>Pekerjaan Terpilih: <strong className="text-forest">{selectedJob.job}</strong> ({selectedJob.category})</span>
          <span className="font-bold text-kabola-teal">{selectedJob.count.toLocaleString("id-ID")} jiwa ({((selectedJob.count / totalWorkers) * 100).toFixed(1)}%)</span>
        </div>
      )}

      {/* Description Text Box */}
      <div className="mt-4 min-h-[76px] bg-sand/60 rounded-2xl p-4 border border-kabola-teal/10 text-xs text-earth leading-relaxed font-body flex items-center">
        Untuk mata pencaharian, umumnya warga Kelurahan Kabola bekerja sebagai petani, disusul oleh wiraswasta, honorer, nelayan, dan Pegawai Negeri Sipil (PNS).
      </div>
    </div>
  );
}
