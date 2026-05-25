"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  inView?: boolean; // If true, animates only when in view (useful for scroll)
  once?: boolean;
}

export function SlideUp({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  yOffset = 20, 
  className = "",
  inView = false,
  once = true
}: SlideUpProps) {
  
  if (inView) {
    return (
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, margin: "-50px" }}
        transition={{ duration, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
