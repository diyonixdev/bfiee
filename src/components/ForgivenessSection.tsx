"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function ForgivenessSection() {
  const [selectedOption, setSelectedOption] = useState<"yes" | "no" | null>(null);

  return (
    <section id="forgiveness-section" className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 my-8 text-center">
      {/* Decorative entrance wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-rose-400/40 text-rose-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(244,63,94,0.35)]">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Final Chapter</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
        </div>

        {/* Main Question */}
        <h2 className="text-3xl sm:text-5xl font-extrabold font-bubble title-happy mb-8 sm:mb-10 px-2 tracking-wide leading-tight">
          Have you forgiven me? 🥺❤️
        </h2>

        {/* Interactive Choice Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-6 max-w-lg mx-auto mb-10 w-full">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedOption("yes")}
            className={`w-full sm:w-auto min-w-[200px] sm:min-w-[220px] px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-lg cursor-pointer backdrop-blur-md border shadow-lg max-w-full ${
              selectedOption === "yes"
                ? "bg-gradient-to-r from-pink-500/30 via-rose-500/35 to-purple-600/40 border-pink-400/90 text-white shadow-[0_0_30px_rgba(244,63,94,0.6)] ring-2 ring-pink-400/50 scale-[1.02]"
                : selectedOption === "no"
                ? "bg-purple-950/20 border-purple-400/20 text-purple-200/50 opacity-60 hover:opacity-100 hover:border-pink-400/40"
                : "bg-purple-950/40 border-pink-400/30 text-pink-100 hover:border-pink-400/70 hover:bg-pink-500/15 hover:shadow-[0_0_20px_rgba(244,63,94,0.35)]"
            }`}
          >
            <span className="text-pink-400 font-serif">♡</span>
            <span>YES, obviously 🥺❤️</span>
          </motion.button>

          {/* NO Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedOption("no")}
            className={`w-full sm:w-auto min-w-[200px] sm:min-w-[220px] px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-lg cursor-pointer backdrop-blur-md border shadow-lg max-w-full ${
              selectedOption === "no"
                ? "bg-gradient-to-r from-purple-600/40 via-rose-500/30 to-purple-800/40 border-purple-400/90 text-white shadow-[0_0_30px_rgba(168,85,247,0.6)] ring-2 ring-purple-400/50 scale-[1.02]"
                : selectedOption === "yes"
                ? "bg-purple-950/20 border-purple-400/20 text-purple-200/50 opacity-60 hover:opacity-100 hover:border-purple-400/40"
                : "bg-purple-950/40 border-purple-400/30 text-purple-100 hover:border-purple-400/70 hover:bg-purple-500/15 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]"
            }`}
          >
            <span className="text-purple-300 font-serif">♡</span>
            <span>Hmm... not yet 😤💔</span>
          </motion.button>
        </div>

        {/* Dynamic Response Box */}
        <AnimatePresence mode="wait">
          {selectedOption === "yes" && (
            <motion.div
              key="response-yes"
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative max-w-2xl mx-auto cosmic-glass p-5 sm:p-10 rounded-3xl border border-pink-400/40 shadow-[0_0_40px_rgba(244,63,94,0.25)] overflow-hidden"
            >
              {/* Floating Hearts & Sparkles Background Effects */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`yes-heart-${i}`}
                    className="absolute text-pink-400/40"
                    style={{
                      left: `${10 + i * 11}%`,
                      bottom: "-10px",
                    }}
                    animate={{
                      y: [0, -120, -220],
                      opacity: [0, 0.7, 0],
                      rotate: [0, i % 2 === 0 ? 15 : -15, 0],
                      scale: [0.8, 1.2, 0.9],
                    }}
                    transition={{
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    {i % 2 === 0 ? (
                      <Heart className="w-5 h-5 fill-pink-400/30 text-pink-400" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-pink-300" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Response Content */}
              <div className="relative z-10 space-y-4">
                <div className="flex justify-center mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-400/50 flex items-center justify-center text-pink-300 shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                  >
                    <Heart className="w-6 h-6 fill-pink-400 text-pink-400" />
                  </motion.div>
                </div>

                <p className="font-handwriting text-2xl sm:text-3xl text-pink-100 font-bold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  hehe, I knew you couldn&apos;t stay mad at me forever 😌❤️
                </p>

                <p className="font-handwriting text-2xl sm:text-3xl text-pink-200 font-bold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  Come here, chotu... I owe you a proper apology kiss now. 😘🫶🏻
                </p>

                <div className="pt-4">
                  <div className="inline-block px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500/25 to-purple-600/25 border border-pink-400/40 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                    <p className="font-handwriting text-xl sm:text-2xl text-pink-300 font-bold">
                      Officially forgiven = you&apos;re stuck with me again. ♡
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedOption === "no" && (
            <motion.div
              key="response-no"
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative max-w-2xl mx-auto cosmic-glass p-5 sm:p-10 rounded-3xl border border-purple-400/40 shadow-[0_0_40px_rgba(168,85,247,0.25)] overflow-hidden"
            >
              {/* Floating Broken Hearts & Sparkles Background Effects */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`no-heart-${i}`}
                    className="absolute text-purple-300/40 text-base"
                    style={{
                      left: `${10 + i * 11}%`,
                      bottom: "-10px",
                    }}
                    animate={{
                      y: [0, -120, -220],
                      opacity: [0, 0.7, 0],
                      rotate: [0, i % 2 === 0 ? -12 : 12, 0],
                      scale: [0.8, 1.2, 0.9],
                    }}
                    transition={{
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    {i % 2 === 0 ? "💔" : <Sparkles className="w-4 h-4 text-purple-300" />}
                  </motion.div>
                ))}
              </div>

              {/* Response Content */}
              <div className="relative z-10 space-y-4">
                <div className="flex justify-center mb-3">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-xl"
                  >
                    🥺
                  </motion.div>
                </div>

                <p className="font-handwriting text-2xl sm:text-3xl text-purple-100 font-bold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  Okay... I&apos;ll wait. 🥺💔
                </p>

                <p className="font-handwriting text-2xl sm:text-3xl text-purple-200 font-bold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  I&apos;ll keep my little apology letter here until you&apos;re ready to forgive me. 🫶🏻
                </p>

                <div className="py-2">
                  <p className="font-handwriting text-xl sm:text-2xl text-pink-300 font-bold">
                    But just so you know...
                  </p>
                  <p className="font-handwriting text-2xl sm:text-3xl text-rose-300 font-extrabold mt-1 drop-shadow-[0_0_12px_rgba(244,63,94,0.5)]">
                    I&apos;m still choosing you. Every single time. ❤️
                  </p>
                </div>

                <div className="pt-2">
                  <div className="inline-block px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600/25 to-pink-500/25 border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    <p className="font-handwriting text-xl sm:text-2xl text-purple-200 font-bold">
                      Take your time, chotu... I&apos;ll be right here. 🥺👉🏻👈🏻
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
