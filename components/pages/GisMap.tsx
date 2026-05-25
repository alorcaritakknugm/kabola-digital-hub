"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Map, Layers, Activity, ZoomIn } from "lucide-react";

const mapLayers = [
  { id: "admin", label: "Administrasi Wilayah", color: "bg-kabola-teal", active: true },
  { id: "komoditas", label: "Tematik Komoditas", color: "bg-kabola-teal", active: false },
  { id: "wisata", label: "Destinasi Wisata", color: "bg-blue-500", active: false },
];

const mapPoints = [
  { x: "42%", y: "38%", label: "Kantor Kelurahan", type: "admin" },
  { x: "30%", y: "60%", label: "Pasar Tradisional", type: "komoditas" },
  { x: "65%", y: "30%", label: "Bukit Panorama", type: "wisata" },
  { x: "25%", y: "45%", label: "Balai Adat", type: "admin" },
];

export default function GisMap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-cream">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-kabola-teal/10 text-kabola-teal text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Peta Interaktif GIS
          </span>
          <h2 className="font-title text-4xl md:text-5xl text-forest mb-4">
            Peta Digital <span className="text-gradient-teal">Kabola</span>
          </h2>
          <p className="text-earth/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Sistem informasi geografis (GIS) interaktif yang menampilkan administrasi wilayah, 
            sebaran komoditas, dan destinasi wisata di Kecamatan Kabola.
          </p>
        </motion.div>

        {/* GIS Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-kabola-teal/20 shadow-[0_20px_80px_rgba(26,122,94,0.12)] bg-white"
        >
          {/* Map toolbar */}
          <div className="flex items-center justify-between px-5 py-3 bg-forest/95 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-kabola-teal-light" />
              <span className="text-white text-sm font-medium">Kabola GIS · Kecamatan Kabola, Alor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row" style={{ minHeight: "480px" }}>
            
            {/* Layer panel */}
            <div className="w-full md:w-56 bg-forest/5 border-b md:border-b-0 md:border-r border-kabola-teal/10 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-kabola-teal" />
                <span className="text-forest font-semibold text-sm">Layer Peta</span>
              </div>
              <div className="space-y-2">
                {mapLayers.map((layer) => (
                  <div
                    key={layer.id}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-all ${
                      layer.active ? "bg-kabola-teal/10 border border-kabola-teal/20" : "hover:bg-earth/5"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-sm ${layer.color} flex-shrink-0`} />
                    <span className={`text-xs ${layer.active ? "text-kabola-teal font-semibold" : "text-earth/60"}`}>
                      {layer.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-earth/10">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4 text-kabola-teal" />
                  <span className="text-forest font-semibold text-sm">Info Wilayah</span>
                </div>
                <div className="space-y-1.5 text-xs text-earth/60">
                  <div className="flex justify-between">
                    <span>Luas</span>
                    <span className="font-medium text-earth">±47 km²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ketinggian</span>
                    <span className="font-medium text-earth">~30 mdpl</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Koordinat</span>
                    <span className="font-medium text-earth">8°S, 124°E</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map area */}
            <div className="flex-1 relative bg-[#e8f4f0] overflow-hidden" style={{ minHeight: "400px" }}>
              {/* Topographic SVG background */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
                {/* Mountains / terrain */}
                <path d="M0,300 Q100,200 200,250 Q300,180 400,220 Q500,160 600,200 Q700,180 800,220 L800,500 L0,500 Z" fill="#1A7A5E" opacity="0.3" />
                <path d="M0,350 Q150,280 300,320 Q450,260 600,300 Q700,280 800,310 L800,500 L0,500 Z" fill="#0D3B2E" opacity="0.4" />
                {/* Contour lines */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <ellipse key={i} cx="400" cy="250" rx={80 + i * 60} ry={50 + i * 35} fill="none" stroke="#1A7A5E" strokeWidth="0.5" opacity="0.4" />
                ))}
                {/* River/coast */}
                <path d="M0,400 Q200,380 350,420 Q500,450 800,410" fill="none" stroke="#198D8D" strokeWidth="2" opacity="0.5" />
                <path d="M-10,430 Q100,420 250,450 Q400,480 800,445 L800,500 L0,500 Z" fill="#198D8D" opacity="0.15" />
              </svg>

              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: "linear-gradient(#1A7A5E 1px, transparent 1px), linear-gradient(90deg, #1A7A5E 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />

              {/* Map points */}
              {mapPoints.map((point, i) => (
                <motion.div
                  key={i}
                  className="absolute group"
                  style={{ left: point.x, top: point.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    {/* Pulse */}
                    <div className="absolute inset-0 rounded-full bg-kabola-teal animate-ping opacity-30" style={{ animationDelay: `${i * 0.4}s` }} />
                    {/* Pin */}
                    <div className="relative w-4 h-4 rounded-full bg-kabola-teal border-2 border-white shadow-md cursor-pointer" style={{ animation: `pin-bounce 2s ease-in-out ${i * 0.4}s infinite` }} />
                    {/* Label */}
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm border border-kabola-teal/15 rounded-lg px-2.5 py-1 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <span className="text-xs font-semibold text-forest">{point.label}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Zoom controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-1">
                {["+", "−"].map((ctrl) => (
                  <button
                    key={ctrl}
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg border border-kabola-teal/20 text-forest font-bold text-sm hover:bg-white transition-colors shadow-sm flex items-center justify-center"
                  >
                    {ctrl}
                  </button>
                ))}
              </div>

              {/* Scale */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1 bg-forest/60" />
                  <span className="text-[10px] text-forest/60 font-medium">5 km</span>
                </div>
              </div>

              {/* "Coming Soon" overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-forest/10 backdrop-blur-[1px]">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl px-8 py-6 shadow-xl border border-kabola-teal/20 text-center max-w-xs">
                  <ZoomIn className="w-10 h-10 text-kabola-teal mx-auto mb-3" />
                  <h4 className="font-title text-lg text-forest mb-1">Peta GIS Interaktif</h4>
                  <p className="text-earth/60 text-xs leading-relaxed mb-3">
                    Peta interaktif lengkap akan diintegrasikan dengan data lapangan selama KKN berlangsung.
                  </p>
                  <span className="inline-flex items-center gap-1.5 bg-kabola-teal/10 text-kabola-teal text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-kabola-teal animate-pulse" />
                    Segera Hadir
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

