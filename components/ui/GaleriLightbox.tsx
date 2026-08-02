"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Camera,
} from "lucide-react";

interface GaleriLightboxProps {
  images: string[];
  title?: string;
}

export default function GaleriLightbox({ images, title = "Galeri Foto Kegiatan" }: GaleriLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isOpen = selectedIndex !== null;

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % images.length);
  }, [selectedIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!images || images.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-kabola-teal/10 shadow-[0_2px_16px_rgba(0,0,0,0.02)]">
      {/* Title */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-sand">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-7 rounded-full bg-kabola-teal inline-block" />
          <h3 className="font-title text-2xl text-forest">{title}</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kabola-teal bg-kabola-teal/10 px-3 py-1 rounded-full">
          <Camera className="w-3.5 h-3.5" />
          {images.length} Foto
        </span>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((url, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedIndex(index)}
            className="group relative h-40 md:h-48 rounded-2xl overflow-hidden border border-slate-100 bg-slate-100 cursor-pointer shadow-sm"
          >
            <Image
              src={url}
              alt={`Foto ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white backdrop-blur-md shadow-lg">
                <Maximize2 className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 select-none"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between text-white relative z-20">
              <div className="flex items-center gap-3">
                <span className="text-white/70 text-xs font-mono font-medium">
                  {selectedIndex + 1} / {images.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Tutup Galeri"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Center Image Display */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-6 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20 backdrop-blur-md"
                aria-label="Foto Sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Animated Image Container */}
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -50 || velocity.x < -300) {
                    handleNext();
                  } else if (offset.x > 50 || velocity.x > 300) {
                    handlePrev();
                  }
                }}
                className="relative w-full h-full max-h-[75vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <img
                  src={images[selectedIndex]}
                  alt={`Foto ${selectedIndex + 1}`}
                  className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-6 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20 backdrop-blur-md"
                aria-label="Foto Selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-20">
              {images.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all border-2 ${selectedIndex === idx
                    ? "border-kabola-teal scale-105 shadow-lg shadow-kabola-teal/30"
                    : "border-white/20 opacity-50 hover:opacity-80"
                    }`}
                >
                  <Image src={url} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
