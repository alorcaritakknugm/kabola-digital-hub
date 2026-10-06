"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALOR_MAP_PATHS, MAP_VIEWBOX, MapPathFeature } from "@/data/alorMapPaths";
import {
  LIVESTOCK_DATA,
  CLUSTERS_INFO,
  ANIMAL_TYPE_OPTIONS,
  getLivestockDataByGeoName,
  LivestockRecord,
  AnimalTypeKey,
  ClusterDetail,
} from "@/data/livestockData";
import {
  MapPin,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  X,
  Layers,
  BarChart2,
  Sparkles,
  Hand,
  MousePointer2,
} from "lucide-react";

// ─── Cluster Fill Colors ──────────────────────────────────────────────────────
const CLUSTER_FILL: Record<string, string> = {
  "klaster-1": "#B7E8ED",
  "klaster-2": "#3AABB5",
  "klaster-3": "#0B7882",
};
const CLUSTER_STROKE: Record<string, string> = {
  "klaster-1": "#198D8D",
  "klaster-2": "#0A6870",
  "klaster-3": "#065058",
};

type Tool = "select" | "pan";

export default function InteractiveLivestockMap() {
  const [viewMode, setViewMode] = useState<"cluster" | "density">("cluster");
  const [activeCluster, setActiveCluster] = useState<string>("all");
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalTypeKey>("total");
  const [hoveredFeature, setHoveredFeature] = useState<MapPathFeature | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<MapPathFeature | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeTool, setActiveTool] = useState<Tool>("select");

  // Pan drag state
  const isPanningRef = useRef(false);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Global window listeners for smooth drag ending
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isPanningRef.current = false;
      lastPointerRef.current = null;
    };
    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("touchend", handleGlobalPointerUp);
    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("touchend", handleGlobalPointerUp);
    };
  }, []);

  // ─── Pan Handlers ────────────────────────────────────────────────────────
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (activeTool !== "pan") return;
      isPanningRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    },
    [activeTool]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPanningRef.current || !lastPointerRef.current) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    },
    []
  );

  const onPointerUp = useCallback(() => {
    isPanningRef.current = false;
    lastPointerRef.current = null;
  }, []);

  // ─── Density color ────────────────────────────────────────────────────────
  const maxDensityValue = useMemo(() => {
    let max = 0;
    LIVESTOCK_DATA.forEach((item) => {
      const val = item[selectedAnimal] as number;
      if (val > max) max = val;
    });
    return max || 1;
  }, [selectedAnimal]);

  const getDensityColor = useCallback(
    (value: number) => {
      if (value === 0) return "#F0F9FA";
      const ratio = Math.min(Math.max(value / maxDensityValue, 0.08), 1);
      const r = Math.round(224 - (224 - 25) * ratio);
      const g = Math.round(244 - (244 - 141) * ratio);
      const b = Math.round(254 - (254 - 141) * ratio);
      return `rgb(${r},${g},${b})`;
    },
    [maxDensityValue]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ALOR_MAP_PATHS.filter((f) => f.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const getFeatureStyle = useCallback(
    (feature: MapPathFeature) => {
      const record = getLivestockDataByGeoName(feature.name);
      const isHovered = hoveredFeature?.id === feature.id;
      const isSelected = selectedFeature?.id === feature.id;
      const isSearchResult = searchResults.some((sr) => sr.id === feature.id);
      const dimBySearch = searchQuery.trim() && !isSearchResult;

      if (viewMode === "cluster") {
        const clusterId = record?.clusterId ?? "";
        const clusterDimmed = activeCluster !== "all" && clusterId !== activeCluster;
        const fill = CLUSTER_FILL[clusterId] ?? "#E2E8F0";
        const stroke =
          isSelected || isHovered ? "#198D8D" : CLUSTER_STROKE[clusterId] ?? "#94A3B8";
        let opacity = clusterDimmed || dimBySearch ? 0.22 : 1;
        if (isHovered) opacity = 1;
        return { fill, stroke, strokeWidth: isSelected ? 2.5 : isHovered ? 2 : 0.9, opacity };
      } else {
        const val = record ? (record[selectedAnimal] as number) : 0;
        const fill = getDensityColor(val);
        const stroke = isSelected || isHovered ? "#198D8D" : "#4B7F82";
        const opacity = dimBySearch ? 0.22 : 1;
        return { fill, stroke, strokeWidth: isSelected ? 2.5 : isHovered ? 2 : 0.9, opacity };
      }
    },
    [viewMode, activeCluster, selectedAnimal, hoveredFeature, selectedFeature, searchResults, searchQuery, getDensityColor]
  );

  const handleZoomIn = () => setZoomScale((p) => Math.min(p + 0.3, 3));
  const handleZoomOut = () => setZoomScale((p) => Math.max(p - 0.3, 0.7));
  const handleReset = () => { setZoomScale(1); setPanOffset({ x: 0, y: 0 }); };

  const selectedRecord: LivestockRecord | undefined = selectedFeature
    ? getLivestockDataByGeoName(selectedFeature.name)
    : undefined;
  const selectedClusterInfo: ClusterDetail | undefined = selectedRecord
    ? CLUSTERS_INFO.find((c) => c.id === selectedRecord.clusterId)
    : undefined;

  const hoveredRecord: LivestockRecord | undefined = hoveredFeature
    ? getLivestockDataByGeoName(hoveredFeature.name)
    : undefined;
  const hoveredClusterInfo: ClusterDetail | undefined = hoveredRecord
    ? CLUSTERS_INFO.find((c) => c.id === hoveredRecord.clusterId)
    : undefined;

  const animalBreakdown = [
    { label: "Sapi Potong", value: selectedRecord?.sapiPotong ?? 0 },
    { label: "Kambing", value: selectedRecord?.kambing ?? 0 },
    { label: "Babi", value: selectedRecord?.babi ?? 0 },
    { label: "Ayam Buras", value: selectedRecord?.ayamBuras ?? 0 },
    { label: "Ayam Ras Pedaging", value: selectedRecord?.ayamRasPedaging ?? 0 },
    { label: "Ayam Ras Petelur", value: selectedRecord?.ayamRasPetelur ?? 0 },
    { label: "Itik", value: selectedRecord?.itik ?? 0 },
    { label: "Kuda", value: selectedRecord?.kuda ?? 0 },
    { label: "Domba", value: selectedRecord?.domba ?? 0 },
    { label: "Kerbau", value: selectedRecord?.kerbau ?? 0 },
  ];

  const getClusterMembers = (clusterId: string) =>
    LIVESTOCK_DATA.filter((d) => d.clusterId === clusterId).map((d) => d.kecamatan);

  const isPanMode = activeTool === "pan";

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-kabola-teal/15 overflow-hidden font-body">

      {/* ── Card Header ───────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 md:px-10 py-5 sm:py-7 border-b border-kabola-teal/10 bg-gradient-to-br from-white to-surface-teal/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-title text-lg sm:text-xl md:text-2xl text-forest font-normal leading-snug">
              Peta Persebaran Klaster Peternakan
            </h3>
            <p className="text-earth/60 text-xs sm:text-sm mt-1 leading-relaxed">
              Sentuh atau klik kecamatan untuk melihat rincian populasi hewan ternak.
            </p>
          </div>

          {/* View Mode Pills */}
          <div className="flex items-center gap-1 bg-sand/70 p-1 rounded-xl border border-kabola-teal/10 shrink-0 self-start">
            <button
              onClick={() => setViewMode("cluster")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold transition-all whitespace-nowrap ${
                viewMode === "cluster"
                  ? "bg-kabola-teal text-white"
                  : "text-earth/60 hover:text-forest"
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              Klaster
            </button>
            <button
              onClick={() => setViewMode("density")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold transition-all whitespace-nowrap ${
                viewMode === "density"
                  ? "bg-kabola-teal text-white"
                  : "text-earth/60 hover:text-forest"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5 shrink-0" />
              Kepadatan
            </button>
          </div>
        </div>
      </div>

      {/* ── Filter Toolbar ────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 md:px-10 py-2.5 border-b border-kabola-teal/10 bg-sand/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        {/* Filter Pills — scrollable horizontally on mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 min-w-0 flex-1">
          <span className="text-[10px] font-bold text-earth/40 uppercase tracking-wider shrink-0">
            {viewMode === "cluster" ? "Filter:" : "Ternak:"}
          </span>
          {viewMode === "cluster" ? (
            <>
              <button
                onClick={() => setActiveCluster("all")}
                className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-all border ${
                  activeCluster === "all"
                    ? "bg-forest text-white border-forest/80"
                    : "bg-white text-earth/60 border-kabola-teal/20 hover:border-kabola-teal/50 hover:text-forest"
                }`}
              >
                Semua
              </button>
              {CLUSTERS_INFO.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCluster(c.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-all border ${
                    activeCluster === c.id
                      ? "bg-kabola-teal text-white border-kabola-teal"
                      : "bg-white text-earth/60 border-kabola-teal/20 hover:border-kabola-teal/50 hover:text-forest"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full border border-black/15 shrink-0"
                    style={{ backgroundColor: CLUSTER_FILL[c.id] }}
                  />
                  {c.name}
                </button>
              ))}
            </>
          ) : (
            ANIMAL_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelectedAnimal(opt.key)}
                className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-all border ${
                  selectedAnimal === opt.key
                    ? "bg-kabola-teal text-white border-kabola-teal"
                    : "bg-white text-earth/60 border-kabola-teal/20 hover:border-kabola-teal/50 hover:text-forest"
                }`}
              >
                {opt.shortLabel}
              </button>
            ))
          )}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-44 shrink-0">
          <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-earth/35" />
          <input
            type="text"
            placeholder="Cari kecamatan…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-[11px] pl-7 pr-6 py-1.5 rounded-xl border border-kabola-teal/20 focus:outline-none focus:ring-2 focus:ring-kabola-teal/20 focus:border-kabola-teal/60 text-earth placeholder-earth/35 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-earth/40 hover:text-earth"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* ── SVG Map Canvas ────────────────────────────────────────────────── */}
      <div
        ref={mapContainerRef}
        className="relative w-full bg-gradient-to-b from-[#EBF7F8] to-[#D6EEF0] overflow-hidden select-none"
        style={{
          cursor: isPanMode ? (isPanningRef.current ? "grabbing" : "grab") : "default",
          touchAction: isPanMode ? "none" : "pan-y",
          minHeight: "260px",
          height: "clamp(260px, 50vw, 500px)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #198D8D15 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* SVG */}
        <div className="w-full h-full flex items-center justify-center p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
            className="w-full h-full"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
              transformOrigin: "center center",
              transition: isPanningRef.current ? "none" : "transform 0.2s ease-out",
              maxHeight: "100%",
              userSelect: "none",
            }}
          >
            <g>
              {ALOR_MAP_PATHS.map((feature) => {
                const s = getFeatureStyle(feature);
                return (
                  <path
                    key={feature.id}
                    d={feature.path}
                    fill={s.fill}
                    stroke={s.stroke}
                    strokeWidth={s.strokeWidth}
                    opacity={s.opacity}
                    style={{
                      cursor: isPanMode ? "inherit" : "pointer",
                      transition: "fill 0.25s, opacity 0.2s",
                    }}
                    onMouseEnter={() => !isPanMode && setHoveredFeature(feature)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    onClick={() => {
                      if (isPanMode) return;
                      setSelectedFeature(selectedFeature?.id === feature.id ? null : feature);
                    }}
                  />
                );
              })}
            </g>

            {/* Labels */}
            {ALOR_MAP_PATHS.map((feature) => {
              const isActive =
                hoveredFeature?.id === feature.id || selectedFeature?.id === feature.id;
              return (
                <g
                  key={`lbl-${feature.id}`}
                  transform={`translate(${feature.centroid[0]}, ${feature.centroid[1]})`}
                  className="pointer-events-none"
                >
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={9.5}
                    fontWeight={isActive ? 700 : 500}
                    fill={isActive ? "#0A3D62" : "#1a2d3d"}
                    style={{
                      paintOrder: "stroke",
                      stroke: "rgba(255,255,255,0.9)",
                      strokeWidth: 2.5,
                      strokeLinejoin: "round",
                    }}
                  >
                    {feature.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── Map Controls (Top Right) ──────────────────────────────────── */}
        <div
          className="absolute top-2.5 right-2.5 flex flex-col gap-1 z-30 pointer-events-auto"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Tool Switcher */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-kabola-teal/15 overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTool("select");
              }}
              title="Pilih Kecamatan"
              className={`flex items-center justify-center w-8 h-8 transition-colors border-b border-kabola-teal/10 ${
                activeTool === "select"
                  ? "bg-kabola-teal text-white"
                  : "text-forest/60 hover:bg-kabola-teal/8 hover:text-kabola-teal"
              }`}
            >
              <MousePointer2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTool("pan");
                setHoveredFeature(null);
              }}
              title="Geser Peta"
              className={`flex items-center justify-center w-8 h-8 transition-colors ${
                activeTool === "pan"
                  ? "bg-kabola-teal text-white"
                  : "text-forest/60 hover:bg-kabola-teal/8 hover:text-kabola-teal"
              }`}
            >
              <Hand className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-kabola-teal/15 overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              title="Perbesar"
              className="flex items-center justify-center w-8 h-8 text-forest/60 hover:bg-kabola-teal/8 hover:text-kabola-teal transition-colors border-b border-kabola-teal/10"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              title="Perkecil"
              className="flex items-center justify-center w-8 h-8 text-forest/60 hover:bg-kabola-teal/8 hover:text-kabola-teal transition-colors border-b border-kabola-teal/10"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
              title="Reset tampilan"
              className="flex items-center justify-center w-8 h-8 text-forest/60 hover:bg-kabola-teal/8 hover:text-kabola-teal transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ── Legend (Bottom Right) ─────────────────────────────────────── */}
        <div
          className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-sm rounded-xl border border-kabola-teal/15 px-3 py-2.5 z-10 min-w-[110px]"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-earth/45 mb-1.5">
            {viewMode === "cluster" ? "Klaster" : "Populasi"}
          </p>
          {viewMode === "cluster" ? (
            <div className="space-y-1">
              {CLUSTERS_INFO.map((c) => (
                <div key={c.id} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-sm border border-black/10 shrink-0"
                    style={{ backgroundColor: CLUSTER_FILL[c.id] }}
                  />
                  <span className="text-[10px] text-earth/75 font-medium">{c.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              <div
                className="h-2 w-full rounded-full border border-kabola-teal/20"
                style={{ background: "linear-gradient(to right, #E0F4F5, #198D8D)" }}
              />
              <div className="flex justify-between text-[9px] text-earth/45 font-mono">
                <span>0</span>
                <span>{(maxDensityValue / 1000).toFixed(0)}k+</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Hover Tooltip — shown only in select mode ─────────────────── */}
        <AnimatePresence>
          {hoveredFeature && !isPanMode && (
            <motion.div
              key="hover-tooltip"
              initial={{ opacity: 0, y: 4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.12 }}
              className="absolute top-2.5 left-2.5 pointer-events-none z-20 bg-white/95 backdrop-blur-sm rounded-2xl border border-kabola-teal/20 px-3.5 py-2.5 max-w-[200px] sm:max-w-[220px]"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-sm text-forest leading-snug truncate">
                  {hoveredFeature.name}
                </span>
                {hoveredClusterInfo && (
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-bold border shrink-0"
                    style={{
                      backgroundColor: CLUSTER_FILL[hoveredClusterInfo.id] + "25",
                      borderColor: CLUSTER_FILL[hoveredClusterInfo.id] + "60",
                      color: CLUSTER_STROKE[hoveredClusterInfo.id],
                    }}
                  >
                    {hoveredClusterInfo.name}
                  </span>
                )}
              </div>

              {hoveredRecord ? (
                <div className="text-[11px] text-earth/65 space-y-0.5">
                  <div className="flex justify-between gap-3">
                    <span>Total Ternak</span>
                    <span className="font-bold text-forest">
                      {hoveredRecord.total.toLocaleString("id-ID")} ekor
                    </span>
                  </div>
                  {selectedAnimal !== "total" && (
                    <div className="flex justify-between gap-3">
                      <span className="truncate">
                        {ANIMAL_TYPE_OPTIONS.find((a) => a.key === selectedAnimal)?.shortLabel}
                      </span>
                      <span className="font-bold text-kabola-teal">
                        {(hoveredRecord[selectedAnimal] as number).toLocaleString("id-ID")} ekor
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-[11px] text-earth/40 italic">Data tidak tersedia</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Cluster Info Row ──────────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 md:px-10 py-4 sm:py-5 border-t border-kabola-teal/10 bg-sand/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 items-stretch">
          {CLUSTERS_INFO.map((c) => {
            const members = getClusterMembers(c.id);
            return (
              <button
                key={c.id}
                onClick={() => {
                  setViewMode("cluster");
                  setActiveCluster(activeCluster === c.id ? "all" : c.id);
                }}
                className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 group flex flex-col justify-between h-full ${
                  activeCluster === c.id
                    ? "border-kabola-teal bg-kabola-teal/8"
                    : "border-kabola-teal/15 bg-white hover:border-kabola-teal/35 hover:bg-surface-teal/30"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0 border border-black/10"
                      style={{ backgroundColor: CLUSTER_FILL[c.id] }}
                    />
                    <span
                      className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${
                        activeCluster === c.id
                          ? "text-kabola-teal"
                          : "text-earth/55 group-hover:text-kabola-teal"
                      }`}
                    >
                      {c.name}
                    </span>
                    <span className="ml-auto text-[9px] font-semibold text-earth/40 bg-sand px-1.5 py-0.5 rounded-full">
                      {members.length} kec
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-earth/65 leading-relaxed mb-3">
                    {c.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-kabola-teal/10">
                  {members.map((m) => (
                    <span
                      key={m}
                      className="text-[9px] bg-white border border-kabola-teal/15 text-earth/65 px-1.5 py-0.5 rounded-full font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Detail Card (on kecamatan click) ─────────────────────────────── */}
      <AnimatePresence>
        {selectedFeature && selectedRecord && (
          <motion.div
            key="detail-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-kabola-teal/15"
          >
            <div className="px-4 sm:px-8 md:px-10 py-5 sm:py-8 bg-surface-teal/30">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-kabola-teal">
                      Statistik Kecamatan
                    </span>
                    {selectedClusterInfo && (
                      <span
                        className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold border"
                        style={{
                          backgroundColor: CLUSTER_FILL[selectedClusterInfo.id] + "30",
                          borderColor: CLUSTER_FILL[selectedClusterInfo.id],
                          color: CLUSTER_STROKE[selectedClusterInfo.id],
                        }}
                      >
                        {selectedClusterInfo.name}
                      </span>
                    )}
                  </div>
                  <h4 className="font-title text-xl sm:text-2xl md:text-3xl text-forest font-normal truncate">
                    Kecamatan {selectedRecord.kecamatan}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="bg-white px-4 py-2 rounded-2xl border border-kabola-teal/20 border-slate-200 text-right">
                    <span className="text-[9px] text-earth/45 block font-medium uppercase tracking-wider">
                      Total
                    </span>
                    <span className="font-title text-xl sm:text-2xl text-kabola-teal font-bold leading-none">
                      {selectedRecord.total.toLocaleString("id-ID")}
                    </span>
                    <span className="text-[10px] text-earth/45 ml-0.5">ekor</span>
                  </div>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-kabola-teal/20 text-earth/45 hover:text-forest hover:border-kabola-teal/50 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Cluster description */}
              {selectedClusterInfo && (
                <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-2xl border border-kabola-teal/15 text-xs sm:text-sm text-earth/70 leading-relaxed mb-4">
                  <Info className="w-4 h-4 text-kabola-teal shrink-0" />
                  <p>
                    <span className="font-semibold text-forest">
                      Karakteristik {selectedClusterInfo.name}:{" "}
                    </span>
                    {selectedClusterInfo.description}
                  </p>
                </div>
              )}

              {/* 10-animal grid */}
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-earth/45 mb-2.5">
                  Rincian 10 Jenis Hewan Ternak
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {animalBreakdown.map((item) => {
                    const pct =
                      selectedRecord.total > 0
                        ? ((item.value / selectedRecord.total) * 100).toFixed(1)
                        : "0";
                    const maxVal = Math.max(...animalBreakdown.map((a) => a.value), 1);
                    const barWidth = ((item.value / maxVal) * 100).toFixed(0);
                    return (
                      <div
                        key={item.label}
                        className="bg-white rounded-xl sm:rounded-2xl p-3 border border-kabola-teal/12 flex flex-col justify-between"
                      >
                        <span className="text-[9.5px] text-earth/50 font-medium leading-snug mb-1.5 line-clamp-2">
                          {item.label}
                        </span>
                        <div>
                          <span className="text-sm sm:text-base font-bold text-forest leading-none">
                            {item.value.toLocaleString("id-ID")}
                          </span>
                          <div className="mt-1.5 w-full h-1 bg-kabola-teal/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-kabola-teal rounded-full transition-all duration-700"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <span className="text-[9px] text-earth/35 mt-0.5 block">{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
