"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden w-full pt-16"
      style={{ minHeight: "calc(100dvh + 6rem)" }}
    >
      {/* Base background */}
      <div className="absolute inset-0 z-0 bg-forest" />

      {/* Background Image (Parallax) */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute -top-10 -bottom-[400px] -left-2 -right-2 z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "12%"]) }}
      >
        <Image
          src="/images/view-2.jpg"
          alt="Kabola, Alor"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/40 via-transparent to-forest/40" />
      </motion.div>

      {/* Texture overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.2] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

        {/* Topographic pulse rings */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.025]">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 3, opacity: 1 }}
              transition={{
                duration: 18,
                repeat: Infinity,
                delay: i * 4.5,
                ease: "linear",
              }}
              className="absolute border border-kabola-teal-light rounded-full w-[800px] aspect-square"
            />
          ))}
        </div>
      </div>

      {/* Floating ornaments */}
      <motion.div
        animate={{
          y: [0, -30, 15, 0],
          x: [0, 20, -10, 0],
          rotate: [0, 8, -4, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 left-6 w-20 h-20 md:w-28 md:h-28 opacity-[0.1] pointer-events-none z-20"
      >
        <Image src="/ornaments/ornament-white.svg" alt="" fill className="object-contain" />
      </motion.div>

      <div className="absolute top-24 right-6 w-28 h-28 md:w-40 md:h-40 opacity-[0.07] pointer-events-none z-20 animate-[spin_80s_linear_infinite_reverse]">
        <Image src="/ornaments/ornament-white.svg" alt="" fill className="object-contain" />
      </div>

      {/* Gold accent particles */}
      {[
        { top: "20%", left: "10%", delay: 0 },
        { top: "40%", right: "8%", delay: 1.5 },
        { top: "70%", left: "20%", delay: 3 },
        { top: "30%", right: "20%", delay: 2 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute z-20 pointer-events-none"
          style={pos as any}
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: pos.delay }}
        >
          <Sparkles className="w-4 h-4 text-kabola-teal-light" />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-30 flex flex-col items-center text-center max-w-4xl mt-4"
        style={{ y, opacity, scale }}
      >
        {/* Location badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mb-6 sm:mb-8 max-w-full"
        >
          <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] xs:text-[11px] sm:text-xs font-medium tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-center">
            <MapPin className="w-3 h-3 text-kabola-teal-light shrink-0" />
            <span>Kec. Kabola · Kab. Alor · NTT</span>
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mb-4 sm:mb-6"
        >
          <h1 className="font-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.08] sm:leading-[1.05] tracking-wide">
            Kabola
            <br />
            <span className="text-kabola-teal-light">Digital</span> Hub
          </h1>
        </motion.div>

        {/* Sub description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="text-white/70 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed mb-6 px-2 sm:px-0"
        >
          Pusat layanan informasi digital yang mengintegrasikan data statistik, peta interaktif GIS, produk UMKM, kekayaan budaya, dan katalog wisata Kabola.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-none px-4 sm:px-0"
        >
          <a
            href="#eksplorasi"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-kabola-teal text-white hover:bg-kabola-teal-dark transition-all duration-300 text-xs sm:text-sm font-semibold tracking-wide group hover:shadow-xl hover:shadow-kabola-teal/30 active:scale-95 text-center"
          >
            Eksplorasi Kabola
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="/wisata"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-xs sm:text-sm font-medium tracking-wide active:scale-95 text-center"
          >
            Kegiatan Wisata
          </Link>
        </motion.div>
      </motion.div>

      {/* Wave bottom transition */}
      <div className="absolute bottom-[-2px] -left-2 -right-2 z-30 pointer-events-none">
        <div className="relative w-full h-20 md:h-32 overflow-hidden">
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-full relative z-10 block scale-x-[1.05]"
          >
            <path
              d="M-10,35 C200,90 500,5 720,50 C940,95 1200,15 1450,40 L1450,110 L-10,110 Z"
              fill="#FFFAF6"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

