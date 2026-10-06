"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface PolaroidProps {
  imageSrc: string;
  caption: string;
  subcaption?: string;
  rotation?: number;
  hasPaperclip?: boolean;
  hasNeonHeart?: boolean;
  hasWashiTape?: boolean;
  tapeColor?: string;
  className?: string;
  onClick?: () => void;
}

export default function Polaroid({
  imageSrc,
  caption,
  subcaption,
  rotation = 0,
  hasPaperclip = false,
  hasNeonHeart = false,
  hasWashiTape = false,
  tapeColor = "bg-pink-300/40",
  className = "",
  onClick,
}: PolaroidProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: rotation * 0.5, zIndex: 30 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={onClick}
      className={`relative polaroid-card rounded-xs cursor-pointer select-none transition-all ${className}`}
    >
      {/* 1. Metal Paperclip Attachment */}
      {hasPaperclip && (
        <div className="absolute -top-4 left-6 z-20 pointer-events-none drop-shadow-md">
          <svg width="24" height="42" viewBox="0 0 24 42" fill="none">
            <path
              d="M7 10 V30 C7 35, 17 35, 17 30 V8 C17 3, 3 3, 3 8 V32 C3 39, 21 39, 21 32 V12"
              stroke="#cbd5e1"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M8 10 V30 C8 34, 16 34, 16 30 V8 C16 4, 4 4, 4 8 V32 C4 38, 20 38, 20 32 V12"
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* 2. Neon Glowing Heart Sticker */}
      {hasNeonHeart && (
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-3 -right-3 z-20 pointer-events-none"
        >
          <div className="p-1.5 rounded-full bg-pink-500/20 backdrop-blur-xs border border-pink-400/80 shadow-[0_0_15px_#ff2d75]">
            <Heart className="w-5 h-5 fill-pink-500 stroke-pink-300 stroke-2" />
          </div>
        </motion.div>
      )}

      {/* 3. Washi Tape */}
      {hasWashiTape && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 ${tapeColor} backdrop-blur-xs border border-white/40 shadow-xs rotate-[-1deg] z-20 rounded-2xs`}
        />
      )}

      {/* Photograph Container */}
      <div className="relative aspect-4/3 w-full bg-[#1c1228] overflow-hidden rounded-2xs border border-black/10">
        <img
          src={imageSrc}
          alt={caption}
          className="w-full h-full object-cover filter contrast-[1.05] brightness-95 transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {/* Subtle photo vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Handwritten Caption Area */}
      <div className="mt-3.5 px-1 text-center">
        <p className="font-handwriting text-slate-800 text-lg sm:text-xl font-bold tracking-wide leading-tight">
          {caption}
        </p>
        {subcaption && (
          <p className="font-handwriting text-pink-600 text-sm font-semibold mt-0.5">
            {subcaption}
          </p>
        )}
      </div>
    </motion.div>
  );
}
