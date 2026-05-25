"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  inView?: boolean;
  once?: boolean;
  style?: React.CSSProperties;
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  className = "",
  inView = false,
  once = true,
  style
}: FadeInProps) {
  
  if (inView) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin: "-50px" }}
        transition={{ duration, delay }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
