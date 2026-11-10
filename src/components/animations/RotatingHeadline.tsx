"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingHeadlineProps {
  phrases?: string[];
  className?: string;
  prefix?: string;
}

const DEFAULT_PHRASES = [
  "Next-Gen Commercial EV Fast Charging",
  "Automotive-Grade LiFePO4 Energy Storage",
  "High-Efficiency Tier-1 Captive Solar EPC",
  "Intelligent Dynamic Microgrid Systems",
  "Zero-Downtime Industrial Power Solutions",
];

export default function RotatingHeadline({
  phrases = DEFAULT_PHRASES,
  className = "",
  prefix,
}: RotatingHeadlineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <div className={`inline-flex items-center flex-wrap gap-2 ${className}`}>
      {prefix && <span className="text-slate-300 font-medium">{prefix}</span>}
      <div className="relative inline-block overflow-hidden py-1 min-h-[44px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block font-extrabold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent"
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
