"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface PuzzlePiece {
  id: string;
  img: string;
  value: string;
  unit: string;
  label: string;
}

interface PuzzleCardsProps {
  luasWilayah?: string;
  jumlahPenduduk?: string;
  jumlahKK?: string;
  pieces?: PuzzlePiece[];
}

const PUZZLE_IMGS = [
  "/images/puzzle/piece puzzle left.png",
  "/images/puzzle/piece puzzle center.png",
  "/images/puzzle/piece puzzle right.png",
];

export default function PuzzleCards({
  luasWilayah = "20,81",
  jumlahPenduduk = "4341",
  jumlahKK = "1254",
  pieces: customPieces,
}: PuzzleCardsProps) {
  const pieces: PuzzlePiece[] = customPieces ?? [
    {
      id: "left",
      img: PUZZLE_IMGS[0],
      value: luasWilayah,
      unit: "km²",
      label: "Luas Wilayah",
    },
    {
      id: "center",
      img: PUZZLE_IMGS[1],
      value: jumlahPenduduk,
      unit: "jiwa",
      label: "Jumlah Penduduk",
    },
    {
      id: "right",
      img: PUZZLE_IMGS[2],
      value: jumlahKK,
      unit: "KK",
      label: "Jumlah Kartu Keluarga",
    },
  ];

  return (
    <div className="w-full space-y-4 font-body">
      {/* Container Background Teal Murni Solid (#198D8D) — tetapkan w-full */}
      <div className="rounded-2xl sm:rounded-3xl bg-kabola-teal p-5 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div
          className={
            pieces.length === 1
              ? "flex items-center justify-center w-full mx-auto"
              : "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 max-w-5xl mx-auto items-center"
          }
        >
          {pieces.map((piece, index) => (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                pieces.length === 3 && index === 1 ? "-mx-0 md:-mx-4 z-10" : "z-0"
              }`}
            >
              {/* Gambar PNG Puzzle Asli - Presisi & Rapi dengan Ukuran Asli */}
              <div className="relative w-full aspect-[16/11] sm:aspect-[4/3] max-w-[270px] sm:max-w-[300px] mx-auto flex items-center justify-center">
                <Image
                  src={piece.img}
                  alt={piece.label}
                  fill
                  className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                  priority
                />

                {/* Angka & Satuan di Dalam Gambar Puzzle */}
                <div className="absolute inset-0 flex items-center justify-center p-3 text-center z-10 pointer-events-none">
                  <div className="flex items-baseline justify-center gap-1 text-white">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight leading-none drop-shadow-xs">
                      {piece.value}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold opacity-95">
                      {piece.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Chip Label Singkat di Bawah Kepingan */}
              <div className="mt-2.5 sm:mt-3 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-semibold tracking-wide border border-white/25 shadow-xs">
                {piece.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
