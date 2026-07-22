"use client";

import React from "react";
import { motion } from "framer-motion";

interface MotifProps {
  className?: string;
  color?: string;
  size?: number | string;
  animate?: boolean;
}

/**
 * Tenun Ikat Alor Geometric Motif SVG
 * Represents traditional Alor woven textiles with geometric diamond (Kafu),
 * starbursts, and chevron step motifs.
 */
export function TenunAlorMotif({ className = "", color = "#198D8D", size = 120, animate = false }: MotifProps) {
  const content = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Diamond Frame */}
      <polygon points="100,10 190,100 100,190 10,100" stroke={color} strokeWidth="2.5" strokeDasharray="4 2" fill="none" opacity="0.8" />
      <polygon points="100,20 180,100 100,180 20,100" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* Inner Concentric Diamonds */}
      <polygon points="100,35 165,100 100,165 35,100" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.05" />
      <polygon points="100,50 150,100 100,150 50,100" stroke={color} strokeWidth="1.5" fill="none" />
      <polygon points="100,65 135,100 100,135 65,100" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12" />

      {/* Central Star Burst (Tenun Core) */}
      <polygon points="100,78 107,93 122,100 107,107 100,122 93,107 78,100 93,93" fill={color} opacity="0.9" />
      <circle cx="100" cy="100" r="5" fill="#FFFFFF" />

      {/* Four Corner Chevron Arrowheads (Traditional Alor Spearhead) */}
      {/* Top */}
      <path d="M100,25 L92,35 H108 Z" fill={color} opacity="0.85" />
      <path d="M100,12 L85,27 L100,20 L115,27 Z" fill={color} opacity="0.7" />

      {/* Bottom */}
      <path d="M100,175 L92,165 H108 Z" fill={color} opacity="0.85" />
      <path d="M100,188 L85,173 L100,180 L115,173 Z" fill={color} opacity="0.7" />

      {/* Left */}
      <path d="M25,100 L35,92 V108 Z" fill={color} opacity="0.85" />
      <path d="M12,100 L27,85 L20,100 L27,115 Z" fill={color} opacity="0.7" />

      {/* Right */}
      <path d="M175,100 L165,92 V108 Z" fill={color} opacity="0.85" />
      <path d="M188,100 L173,85 L180,100 L173,115 Z" fill={color} opacity="0.7" />

      {/* Geometric Zig-Zag Side Accents (Kaing Step Patterns) */}
      <path d="M55,55 L65,45 M65,45 L75,55 M75,55 L85,45" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M145,55 L135,45 M135,45 L125,55 M125,55 L115,45" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M55,145 L65,155 M65,155 L75,145 M75,145 L85,155" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M145,145 L135,155 M135,155 L125,145 M125,145 L115,155" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );

  if (animate) {
    return (
      <motion.div
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

/**
 * Moko Alor Bronze Gong Motif SVG
 * Represents the iconic Moko drum pattern of Alor with 8-pointed star & concentric rings.
 */
export function MokoMotif({ className = "", color = "#198D8D", size = 100 }: MotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Circle with Tooth Edge */}
      <circle cx="80" cy="80" r="76" stroke={color} strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="80" cy="80" r="68" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <circle cx="80" cy="80" r="56" stroke={color} strokeWidth="2" strokeDasharray="6 3" opacity="0.7" />

      {/* 8-Pointed Star (Moko Face Emblem) */}
      <path
        d="M80,28 L91,62 L125,48 L103,74 L132,80 L103,86 L125,112 L91,98 L80,132 L69,98 L35,112 L57,86 L28,80 L57,74 L35,48 L69,62 Z"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Inner Rings */}
      <circle cx="80" cy="80" r="32" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9" />
      <circle cx="80" cy="80" r="20" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      <circle cx="80" cy="80" r="8" fill={color} />
    </svg>
  );
}

/**
 * Tenun Alor Ribbon Horizontal Divider Band
 * A continuous geometric woven textile strip.
 */
export function TenunAlorRibbon({ className = "", color = "#198D8D" }: { className?: string; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none opacity-40 ${className}`}>
      <svg
        viewBox="0 0 1200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-5 md:h-6 object-cover"
        preserveAspectRatio="repeat-x"
      >
        <pattern id="tenun-band-pattern" width="60" height="24" patternUnits="userSpaceOnUse">
          {/* Central Diamond */}
          <polygon points="30,2 48,12 30,22 12,12" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
          <polygon points="30,6 40,12 30,18 20,12" fill={color} opacity="0.7" />

          {/* Top & Bottom Tooth Zigzag */}
          <path d="M0,0 L5,4 L10,0 L15,4 L20,0 L25,4 L30,0 L35,4 L40,0 L45,4 L50,0 L55,4 L60,0" stroke={color} strokeWidth="1" opacity="0.6" fill="none" />
          <path d="M0,24 L5,20 L10,24 L15,20 L20,24 L25,20 L30,24 L35,20 L40,24 L45,20 L50,24 L55,20 L60,24" stroke={color} strokeWidth="1" opacity="0.6" fill="none" />

          {/* Side Chevron Points */}
          <path d="M0,12 L6,6 M0,12 L6,18" stroke={color} strokeWidth="1.5" opacity="0.8" />
          <path d="M60,12 L54,6 M60,12 L54,18" stroke={color} strokeWidth="1.5" opacity="0.8" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#tenun-band-pattern)" />
      </svg>
    </div>
  );
}
