"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Music2, Mic2, Play, Pause } from "lucide-react";
import { LyricLine, loveMeLikeYouDoLyrics } from "@/data/lyrics";

interface RomanticLyricsSectionProps {
  currentTime: number;
  isPlaying: boolean;
  onSeek: (time: number) => void;
  lyrics?: LyricLine[];
}

export default function RomanticLyricsSection({
  currentTime,
  isPlaying,
  onSeek,
  lyrics = loveMeLikeYouDoLyrics,
}: RomanticLyricsSectionProps) {
  const [activeLyricIndex, setActiveLyricIndex] = useState<number>(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; char: string; x: number }[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const prevIndexRef = useRef<number>(0);

  // Find active lyric line based on currentTime
  useEffect(() => {
    let index = 0;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) {
        index = i;
      } else {
        break;
      }
    }

    if (index !== activeLyricIndex) {
      setActiveLyricIndex(index);

      // Spawn a subtle floating heart when lyric changes during playback
      if (isPlaying) {
        const heartChars = ["♡", "💖", "✦", "♥", "✨"];
        const newHeart = {
          id: Date.now(),
          char: heartChars[index % heartChars.length],
          x: Math.floor(Math.random() * 60) + 20,
        };
        setFloatingHearts((prev) => [...prev.slice(-4), newHeart]);
      }
    }
  }, [currentTime, lyrics, isPlaying, activeLyricIndex]);

  // Smoothly center the active lyric in the scroll container
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLyricIndex]);

  // Remove old floating hearts
  useEffect(() => {
    if (floatingHearts.length > 0) {
      const timer = setTimeout(() => {
        setFloatingHearts((prev) => prev.slice(1));
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [floatingHearts]);

  return (
    <section className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 select-none">
      {/* Section Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-pink-400/40 text-pink-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(244,63,94,0.35)]"
        >
          <Music2 className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>our little soundtrack</span>
        </motion.div>

        <h3 className="text-2xl sm:text-4xl font-extrabold font-bubble text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">
          Love Me Like You Do ♡
        </h3>
      </div>

      {/* Main Glassmorphism Lyrics Card */}
      <div className="relative cosmic-glass rounded-3xl p-6 sm:p-8 md:p-10 border border-pink-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.75)] backdrop-blur-2xl overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Floating Heart Particles Overlay */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          <AnimatePresence>
            {floatingHearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 0.9, y: -120, scale: 1.2 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                style={{ left: `${heart.x}%`, bottom: "20%" }}
                className="absolute text-pink-400 font-bold text-lg drop-shadow-[0_0_8px_#ff2d75]"
              >
                {heart.char}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Responsive Grid: Cover on Left, Lyrics on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          
          {/* LEFT: Aesthetic Album Cover Card */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              animate={isPlaying ? { scale: [1, 1.03, 1], rotate: [0, 0.5, 0] } : { scale: 1 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-56 sm:w-64 aspect-square rounded-2xl p-1 bg-gradient-to-tr from-pink-500 via-purple-500 to-rose-400 shadow-[0_10px_35px_rgba(244,63,94,0.45)] group"
            >
              {/* Rotating sparkle aura */}
              {isPlaying && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 opacity-40 blur-xs -z-10"
                />
              )}

              {/* Cover Interior Container */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-[#250d3e] via-[#16062a] to-[#0c001a] flex flex-col justify-between p-5 border border-white/20">
                {/* Gloss reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <div className="p-1.5 rounded-full bg-pink-500/20 backdrop-blur-xs border border-pink-300/40 text-pink-300">
                    <Heart className="w-4 h-4 fill-pink-500 stroke-pink-300 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-pink-200/80 bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-400/30">
                    {isPlaying ? "Playing 1.5x" : "Paused"}
                  </span>
                </div>

                {/* Center Vinyl & Couple Silhouette Artwork */}
                <div className="relative my-auto flex items-center justify-center py-4">
                  <div className={`relative w-28 h-28 rounded-full bg-gradient-to-tr from-pink-600 to-purple-900 flex items-center justify-center shadow-inner border-2 border-pink-300/50 overflow-hidden ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "5s" }}>
                    <img
                      src="/images/image.png"
                      alt="Album Artwork"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bottom Cover Typography */}
                <div className="z-10 text-left pt-2 border-t border-white/10">
                  <h4 className="font-bubble text-lg sm:text-xl font-bold text-white tracking-wide leading-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                    Love Me <br />
                    <span className="text-pink-300">Like You Do</span>
                  </h4>
                  <p className="text-xs text-purple-200/80 font-light mt-1 flex items-center gap-1.5">
                    <Mic2 className="w-3 h-3 text-pink-400" />
                    <span>Ellie Goulding</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Synchronized Lyrics Panel */}
          <div className="md:col-span-7 flex flex-col h-[320px] sm:h-[360px] relative">
            {/* Top Fade Gradient Mask */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#140628]/95 to-transparent z-10 pointer-events-none" />

            {/* Scrollable Lyrics Container */}
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto px-4 py-8 space-y-5 scroll-smooth custom-scrollbar text-center md:text-left"
            >
              {lyrics.map((line, idx) => {
                const isActive = idx === activeLyricIndex;
                const isPast = idx < activeLyricIndex;

                return (
                  <motion.div
                    key={line.id}
                    ref={isActive ? activeLineRef : null}
                    onClick={() => onSeek(line.time)}
                    initial={false}
                    animate={{
                      scale: isActive ? 1.04 : 0.98,
                      opacity: isActive ? 1 : isPast ? 0.45 : 0.3,
                      x: isActive ? 4 : 0,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`cursor-pointer transition-all duration-300 p-2 rounded-xl group flex items-center justify-center md:justify-start gap-2.5 ${
                      isActive
                        ? "bg-pink-500/15 border border-pink-400/40 shadow-[0_0_20px_rgba(244,63,94,0.35)]"
                        : "hover:bg-white/5 hover:opacity-80"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-pink-400 shrink-0"
                      >
                        <Heart className="w-4 h-4 fill-pink-500 stroke-pink-300" />
                      </motion.div>
                    )}

                    <p
                      className={`font-handwriting transition-all ${
                        isActive
                          ? "text-xl sm:text-2xl text-pink-200 font-bold drop-shadow-[0_0_12px_#ff2d75]"
                          : "text-base sm:text-lg text-purple-200/60 font-medium"
                      }`}
                    >
                      {line.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Fade Gradient Mask */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#140628]/95 to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
