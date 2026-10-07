"use client";

import React from "react";
import { motion } from "framer-motion";

interface TickerProps {
  text: string;
}

export function Ticker({ text }: TickerProps) {
  return (
    <div className="w-full overflow-hidden border-y border-[#2a3b32] py-4 bg-[#0a0f0d] flex whitespace-nowrap">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
        className="flex"
      >
        <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent" style={{ WebkitTextStroke: "1px #2a3b32" }}>
          {text}&nbsp;//&nbsp;{text}&nbsp;//&nbsp;
        </span>
      </motion.div>
    </div>
  );
}
