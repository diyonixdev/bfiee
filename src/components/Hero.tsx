"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wand2, Heart, ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onEnterArchive?: () => void;
}

export default function Hero({ onEnterArchive }: HeroProps) {
  return (
    <section className="relative w-full pt-6 sm:pt-10 pb-8 flex flex-col items-center justify-center text-center select-none overflow-visible">
      {/* Surrounding Hand-Drawn SVG Doodles */}
      
      {/* 1. Neon Crown above HAPPY */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-[-12px] sm:mb-[-18px] z-20"
      >
        <svg
          width="56"
          height="38"
          viewBox="0 0 60 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-pink-400 drop-shadow-[0_0_12px_#ff2d75]"
        >
          <path
            d="M5 32 L15 10 L30 24 L45 10 L55 32 Z"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="15" cy="8" r="2.5" fill="#f43f5e" className="neon-pink-glow" />
          <circle cx="30" cy="22" r="2.5" fill="#f43f5e" className="neon-pink-glow" />
          <circle cx="45" cy="8" r="2.5" fill="#f43f5e" className="neon-pink-glow" />
        </svg>
      </motion.div>

      {/* 2. Paper Airplane with dashed loop trail on top-right */}
      <div className="absolute top-2 right-[18%] sm:right-[26%] hidden sm:block pointer-events-none z-10">
        <motion.div
          animate={{ x: [0, 8, 0], y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="100" height="80" viewBox="0 0 100 80" fill="none" className="stroke-pink-300">
            {/* Dashed trail */}
            <path
              d="M10 70 C25 60, 40 40, 50 50 C60 60, 45 75, 60 65 C75 55, 80 40, 85 25"
              strokeDasharray="4 4"
              strokeWidth="1.5"
              stroke="#e9d5ff"
              opacity="0.7"
            />
            {/* Paper Airplane */}
            <g transform="translate(75, 10) rotate(25) scale(0.65)">
              <polygon
                points="0,20 30,0 22,25"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                className="drop-shadow-[0_0_8px_#ffffff]"
              />
              <line x1="30" y1="0" x2="12" y2="20" stroke="#ffffff" strokeWidth="2" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* 3. "you make everything brighter ♡" Doodle on upper left */}
      <div className="absolute top-8 left-[12%] sm:left-[22%] hidden md:block pointer-events-none text-left z-20">
        <motion.div
          animate={{ rotate: [-8, -4, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-start gap-1"
        >
          <span className="font-handwriting text-pink-200 text-lg sm:text-xl font-semibold tracking-wide neon-pink-glow">
            you make <br /> everything <br /> brighter ♡
          </span>
          {/* Curved arrow pointing left */}
          <svg width="45" height="30" viewBox="0 0 45 30" fill="none" className="stroke-pink-300">
            <path
              d="M38 25 C25 20, 15 15, 6 5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="2 3"
            />
            <path d="M6 12 L6 5 L14 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      {/* 4. "thank you for being you ♡" Doodle on upper right */}
      <div className="absolute top-28 right-[2%] sm:right-[8%] hidden md:block pointer-events-none text-left z-20">
        <motion.div
          animate={{ rotate: [6, 10, 6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-start"
        >
          <span className="font-handwriting text-pink-200 text-lg sm:text-xl font-semibold tracking-wide neon-pink-glow">
            thank you <br /> for being <br /> you ♡
          </span>
          <svg width="35" height="30" viewBox="0 0 35 30" fill="none" className="stroke-pink-300">
            <path
              d="M5 5 C15 15, 20 20, 28 25"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="2 3"
            />
            <path d="M20 25 L28 25 L28 17" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      {/* Floating Neon Outline Hearts */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [-15, -10, -15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-14 left-[28%] hidden sm:block pointer-events-none z-10"
      >
        <Heart className="w-9 h-9 stroke-pink-400 fill-pink-500/20 stroke-2 drop-shadow-[0_0_12px_#ff2d75]" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [12, 18, 12] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-12 right-[28%] hidden sm:block pointer-events-none z-10"
      >
        <Heart className="w-8 h-8 stroke-pink-400 fill-pink-500/20 stroke-2 drop-shadow-[0_0_12px_#ff2d75]" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-24 left-[26%] hidden sm:block pointer-events-none z-10"
      >
        <Heart className="w-6 h-6 stroke-pink-300 fill-pink-400/20 stroke-2 drop-shadow-[0_0_8px_#ff2d75]" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-28 right-[27%] hidden sm:block pointer-events-none z-10"
      >
        <Heart className="w-7 h-7 stroke-pink-400 fill-pink-500/25 stroke-2 drop-shadow-[0_0_10px_#ff2d75]" />
      </motion.div>

      {/* CENTRAL 3D TYPOGRAPHY */}
      <div className="relative z-20 flex flex-col items-center">
        {/* HAPPY */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="title-happy text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider leading-none mb-1 sm:mb-2 uppercase font-bubble"
        >
          HAPPY
        </motion.div>

        {/* BOYFRIEND'S */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="title-boyfriends text-[32px] min-[380px]:text-[40px] min-[440px]:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none uppercase font-bubble py-1 sm:py-2 max-w-full overflow-hidden text-ellipsis"
        >
          BOYFRIEND&apos;S
        </motion.div>

        {/* DAY */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="title-day text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider leading-none mt-1 sm:mt-2 uppercase font-bubble"
        >
          DAY
        </motion.div>
      </div>

      {/* Subtitle / Apology handwritten note */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{
          opacity: 1,
          y: [0, -3, 0],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.3 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="mt-4 sm:mt-6 max-w-2xl px-4 z-20 text-center"
      >
        <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-pink-200 tracking-wide drop-shadow-[0_0_12px_#ff2d75] select-none flex items-center justify-center gap-2">
          <span>my chotu, i&apos;m so sorry</span>
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            ❤️
          </motion.span>
        </p>
      </motion.div>

      {/* Glow Capsule Main CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 sm:mt-8 z-30 max-w-full px-2"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onEnterArchive}
          type="button"
          className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 text-white font-bold text-[11px] sm:text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(244,63,94,0.85),0_0_15px_rgba(236,72,153,0.9)] border border-pink-200/70 overflow-hidden cursor-pointer max-w-full"
        >
          {/* Subtle animated shimmer */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <Wand2 className="w-4 h-4 text-pink-100 animate-pulse" />
          <span>ENTER THE LOVE ARCHIVE</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-200" />
          <span className="text-base">💖</span>

          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center ml-1 group-hover:bg-white group-hover:text-pink-600 transition-colors">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
