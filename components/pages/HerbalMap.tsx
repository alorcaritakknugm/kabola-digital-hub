"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Leaf, X, FlaskConical, BookOpen, Sprout, MapPin } from "lucide-react";

type HerbalPoint = {
  id: string;
  x: string;
  y: string;
  name: string;
  localName: string;
  latinName: string;
  category: string;
  benefits: string[];
  usage: string;
  science: string;
  color: string;
  image: string;
};

const herbalPoints: HerbalPoint[] = [
  {
    id: "kunyit",
    x: "32%",
    y: "42%",
    name: "Kunyit",
    localName: "Kunir / Huni",
    latinName: "Curcuma longa",
    category: "Antiinflamasi",
    benefits: ["Meredakan nyeri sendi", "Mengatasi gangguan pencernaan", "Meningkatkan imunitas"],
    usage: "Direbus dan diminum airnya, atau diparut dan dioleskan langsung pada bagian yang sakit.",
    science: "Kandungan kurkumin memiliki efek antiinflamasi dan antioksidan yang telah terbukti secara ilmiah dalam berbagai penelitian klinis.",
    color: "#E8A020",
    image: "/images/culture-4.jpg",
  },
  {
    id: "sirih",
    x: "55%",
    y: "35%",
    name: "Daun Sirih",
    localName: "Bia / Bua",
    latinName: "Piper betle",
    category: "Antiseptik",
    benefits: ["Membasmi kuman di mulut", "Mengobati luka ringan", "Meredakan batuk"],
    usage: "Daun dikunyah langsung, direbus untuk kumur, atau ditumbuk untuk kompres luka.",
    science: "Mengandung senyawa kavikol dan eugenol yang bersifat antibakteri kuat terhadap Staphylococcus aureus dan E. coli.",
    color: "#2D9B4E",
    image: "/images/view-3.jpg",
  },
  {
    id: "jahe",
    x: "70%",
    y: "52%",
    name: "Jahe Merah",
    localName: "Jae / Hae",
    latinName: "Zingiber officinale var. rubrum",
    category: "Tonik & Hangat",
    benefits: ["Menghangatkan tubuh", "Meredakan mual dan muntah", "Melancarkan peredaran darah"],
    usage: "Direbus dengan air panas, diminum sebagai minuman hangat. Bisa dicampur madu atau gula merah.",
    science: "Gingerol dan shogaol adalah senyawa bioaktif utama yang memberikan efek termogenik dan antiemetik yang signifikan.",
    color: "#C0392B",
    image: "/images/culture-1.jpg",
  },
  {
    id: "binahong",
    x: "45%",
    y: "62%",
    name: "Binahong",
    localName: "Kandula",
    latinName: "Anredera cordifolia",
    category: "Penutup Luka",
    benefits: ["Mempercepat penyembuhan luka", "Mencegah infeksi", "Menurunkan kadar gula darah"],
    usage: "Daun segar ditumbuk halus dan ditempelkan pada luka, atau direbus untuk diminum.",
    science: "Kaya saponin, flavonoid, dan asam askorbat yang mempercepat regenerasi jaringan dan bersifat antibakteri.",
    color: "#8E44AD",
    image: "/images/view-5.jpg",
  },
  {
    id: "lidahmertua",
    x: "22%",
    y: "58%",
    name: "Lidah Buaya",
    localName: "Alo Vera",
    latinName: "Aloe vera",
    category: "Kulit & Rambut",
    benefits: ["Melembapkan kulit", "Meredakan sunburn", "Mengatasi ketombe"],
    usage: "Gel dari pelepah diambil dan dioleskan langsung pada kulit atau rambut.",
    science: "Gel aloe mengandung acemannan (polisakarida) yang terbukti mempercepat penyembuhan luka bakar derajat ringan.",
    color: "#27AE60",
    image: "/images/culture-2.jpg",
  },
  {
    id: "kemiri",
    x: "62%",
    y: "25%",
    name: "Kemiri",
    localName: "Miri / Kima",
    latinName: "Aleurites moluccanus",
    category: "Rambut & Tulang",
    benefits: ["Menyuburkan rambut", "Menguatkan tulang", "Sumber minyak alami"],
    usage: "Biji kemiri disangrai dan diiris tipis, kemudian dipanaskan hingga keluar minyaknya untuk dioleskan ke rambut.",
    science: "Mengandung asam linoleat dan protein tinggi yang menutrisi folikel rambut dan memperkuat struktur batang rambut.",
    color: "#D4AC0D",
    image: "/images/culture-3.jpg",
  },
];

const categoryColors: Record<string, string> = {
  "Antiinflamasi": "bg-amber-100 text-amber-700",
  "Antiseptik": "bg-emerald-100 text-emerald-700",
  "Tonik & Hangat": "bg-rose-100 text-rose-700",
  "Penutup Luka": "bg-purple-100 text-purple-700",
  "Kulit & Rambut": "bg-green-100 text-green-700",
  "Rambut & Tulang": "bg-yellow-100 text-yellow-700",
};

export default function HerbalMap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<HerbalPoint | null>(null);

  return (
    <section className="relative pt-16 pb-20 md:pb-28 overflow-hidden bg-cream">
      {/* Decorative background */}
      <div className="absolute inset-0 batik-pattern opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-kabola-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-kabola-teal/10 text-kabola-teal text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-kabola-teal/20">
            Etnofarmakologi
          </span>
          <h2 className="font-title text-4xl md:text-5xl text-forest mb-4">
            Peta Herbal <span className="text-gradient-teal">Digital</span>
          </h2>
          <p className="text-earth/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Temukan sebaran tanaman herbal tradisional di Kabola di mana setiap titik menyimpan kearifan lokal tentang manfaat, cara penggunaan, dan penjelasan ilmiahnya.
          </p>
        </motion.div>

        {/* Main map container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-kabola-teal/20 shadow-[0_20px_80px_rgba(26,122,94,0.12)] bg-white"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 bg-forest/95 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="text-white text-sm font-medium">Peta Herbal Digital · Kabola, Alor</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-xs">{herbalPoints.length} tanaman terpetakan</span>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row" style={{ minHeight: "520px" }}>

            {/* Legend panel */}
            <div className="w-full lg:w-60 bg-forest/5 border-b lg:border-b-0 lg:border-r border-kabola-teal/10 p-4 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-kabola-teal" />
                <span className="text-forest font-semibold text-sm">Daftar Tanaman</span>
              </div>
              <div className="space-y-1.5">
                {herbalPoints.map((point) => (
                  <button
                    key={point.id}
                    onClick={() => setSelected(point)}
                    className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all hover:bg-kabola-teal/5 ${
                      selected?.id === point.id ? "bg-kabola-teal/10 border border-kabola-teal/20" : ""
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: point.color }}
                    />
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold truncate ${selected?.id === point.id ? "text-kabola-teal" : "text-forest"}`}>
                        {point.name}
                      </p>
                      <p className="text-[10px] text-earth/50 truncate italic">{point.latinName}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-earth/10">
                <p className="text-[10px] text-earth/40 leading-relaxed">
                  * Klik pin atau nama tanaman untuk melihat detail manfaat &amp; penjelasan ilmiah.
                </p>
              </div>
            </div>

            {/* Map area */}
            <div className="flex-1 relative overflow-hidden bg-[#e8f4ee]" style={{ minHeight: "420px" }}>

              {/* SVG terrain background */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
                {/* Sky/Sea gradient */}
                <defs>
                  <linearGradient id="terrain-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4efe3" />
                    <stop offset="100%" stopColor="#b8e0cc" />
                  </linearGradient>
                  <linearGradient id="sea-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5bbad5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#198D8D" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="blur-sm">
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
                </defs>

                <rect width="800" height="520" fill="url(#terrain-grad)" />

                {/* Hills/terrain shapes */}
                <path d="M0,320 Q80,260 160,290 Q240,220 320,255 Q400,200 480,240 Q560,190 640,225 Q720,200 800,230 L800,520 L0,520 Z" fill="#2D9B4E" opacity="0.25" />
                <path d="M0,370 Q120,330 240,355 Q360,310 480,340 Q600,305 720,330 Q760,320 800,335 L800,520 L0,520 Z" fill="#1A7A5E" opacity="0.3" />
                <path d="M0,420 Q200,400 400,415 Q600,400 800,415 L800,520 L0,520 Z" fill="#0D3B2E" opacity="0.35" />

                {/* Contour lines */}
                {[0, 1, 2, 3].map((i) => (
                  <ellipse
                    key={i}
                    cx="410" cy="270" rx={100 + i * 80} ry={60 + i * 45}
                    fill="none" stroke="#1A7A5E" strokeWidth="0.6" opacity="0.2"
                  />
                ))}

                {/* Coastline */}
                <path d="M0,455 Q100,440 220,460 Q350,480 500,458 Q650,440 800,458 L800,520 L0,520 Z" fill="url(#sea-grad)" />

                {/* River */}
                <path d="M150,200 Q200,280 240,350 Q270,400 300,455" fill="none" stroke="#198D8D" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />

                {/* Vegetation patches */}
                {[[100,200],[300,160],[500,220],[650,250],[200,310],[450,180]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={18 + (i % 3) * 8} fill="#2D9B4E" opacity="0.12" />
                ))}

                {/* Grid */}
                <g opacity="0.06" stroke="#1A7A5E" strokeWidth="0.8">
                  {[100,200,300,400,500,600,700].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="520" />
                  ))}
                  {[80,160,240,320,400,480].map(y => (
                    <line key={y} x1="0" y1={y} x2="800" y2={y} />
                  ))}
                </g>
              </svg>

              {/* Herbal pins */}
              {herbalPoints.map((point, i) => (
                <motion.div
                  key={point.id}
                  className="absolute group"
                  style={{ left: point.x, top: point.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    {/* Pulse ring */}
                    <div
                      className="absolute inset-[-6px] rounded-full animate-ping opacity-25"
                      style={{ backgroundColor: point.color, animationDelay: `${i * 0.35}s`, animationDuration: "2.5s" }}
                    />
                    {/* Pin */}
                    <button
                      onClick={() => setSelected(selected?.id === point.id ? null : point)}
                      className="relative w-7 h-7 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white/50"
                      style={{ backgroundColor: point.color }}
                      aria-label={`Lihat detail ${point.name}`}
                    >
                      <Leaf className="w-3.5 h-3.5 text-white" />
                    </button>
                    {/* Quick label tooltip */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/96 backdrop-blur-sm border border-kabola-teal/15 rounded-lg px-2.5 py-1 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <p className="text-xs font-bold text-forest">{point.name}</p>
                      <p className="text-[10px] text-earth/50 italic">{point.latinName}</p>
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
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                <div className="w-14 h-0.5 bg-forest/50" />
                <span className="text-[10px] text-forest/50 font-medium">2 km</span>
              </div>

              {/* "Coming soon" data notice */}
              <div className="absolute bottom-3 right-4">
                <span className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Data lapangan diperbarui saat KKN berlangsung
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detail popup (below map on mobile, slide-in panel style) */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="mt-5 rounded-3xl overflow-hidden border border-kabola-teal/15 shadow-[0_12px_40px_rgba(26,122,94,0.10)] bg-white"
            >
              {/* Header */}
              <div
                className="relative px-6 py-5 flex items-start justify-between"
                style={{ background: `linear-gradient(135deg, ${selected.color}18, ${selected.color}08)` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 shadow-md border border-white/40"
                    style={{ backgroundColor: selected.color }}
                  >
                    {selected.image ? (
                      <Image src={selected.image} alt={selected.name} fill className="object-cover" />
                    ) : (
                      <Sprout className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-title text-xl text-forest">{selected.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[selected.category] ?? "bg-gray-100 text-gray-600"}`}>
                        {selected.category}
                      </span>
                    </div>
                    <p className="text-earth/50 text-xs italic">{selected.latinName}</p>
                    <p className="text-earth/60 text-xs mt-0.5">Nama lokal: <span className="font-semibold text-earth/80">{selected.localName}</span></p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 rounded-full hover:bg-earth/10 transition-colors text-earth/40 hover:text-earth/70"
                  aria-label="Tutup detail"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Benefits */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf className="w-4 h-4 text-kabola-teal" />
                    <span className="text-sm font-bold text-forest">Manfaat Tradisional</span>
                  </div>
                  <ul className="space-y-2">
                    {selected.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-earth/70">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: selected.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Usage */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-kabola-teal" />
                    <span className="text-sm font-bold text-forest">Cara Penggunaan</span>
                  </div>
                  <p className="text-sm text-earth/70 leading-relaxed">{selected.usage}</p>
                </div>

                {/* Science */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FlaskConical className="w-4 h-4 text-kabola-teal" />
                    <span className="text-sm font-bold text-forest">Penjelasan Ilmiah</span>
                  </div>
                  <p className="text-sm text-earth/70 leading-relaxed">{selected.science}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
