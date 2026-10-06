"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles, Wand2, Star, Award, Gift } from "lucide-react";

interface InteractiveModalProps {
  isOpen: boolean;
  type: string;
  onClose: () => void;
}

export default function InteractiveModal({
  isOpen,
  type,
  onClose,
}: InteractiveModalProps) {
  const [loveScore, setLoveScore] = useState(100);
  const [clickCount, setClickCount] = useState(0);
  const [customCompliment, setCustomCompliment] = useState("");

  const compliments = [
    "Your smile lights up my whole universe ✨",
    "You give the warmest and safest hugs 🫂",
    "Your laugh is my absolute favourite melody 🎶",
    "You make even ordinary days feel like magic 🪄",
    "You are the best thing that ever happened to me 💖",
  ];

  const handleGameClick = () => {
    setLoveScore((prev) => prev + 10);
    setClickCount((prev) => prev + 1);
    setCustomCompliment(compliments[clickCount % compliments.length]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="relative w-full max-w-lg cosmic-glass rounded-2xl p-6 sm:p-8 text-white border border-pink-400/40 shadow-[0_0_40px_rgba(236,72,153,0.5)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {type === "PLAY" && (
              <div className="text-center space-y-5">
                <div className="inline-flex p-3 rounded-full bg-pink-500/20 text-pink-400 border border-pink-400/50 shadow-[0_0_15px_#ff2d75]">
                  <Wand2 className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold font-bubble text-pink-200">
                  Love Meter Mini Game 💖
                </h3>
                <p className="text-sm text-purple-200 font-light">
                  Tap the glowing heart to charge the love meter and unlock secret compliments!
                </p>

                <div className="py-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.88 }}
                    onClick={handleGameClick}
                    className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-fuchsia-500 mx-auto flex items-center justify-center shadow-[0_0_30px_#ff2d75] border-2 border-white/60 cursor-pointer"
                  >
                    <Heart className="w-12 h-12 fill-white stroke-white animate-pulse" />
                  </motion.button>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-pink-300 font-semibold">
                    <span>Love Level:</span>
                    <span>{loveScore}% (Infinite Love)</span>
                  </div>
                  <div className="w-full h-3 bg-purple-950 rounded-full overflow-hidden border border-pink-500/40">
                    <div
                      style={{ width: `${Math.min(100, loveScore / 2)}%` }}
                      className="h-full bg-gradient-to-r from-pink-500 to-amber-300 shadow-[0_0_10px_#ff2d75] transition-all duration-300"
                    />
                  </div>
                </div>

                {customCompliment && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-pink-500/15 border border-pink-400/40 text-pink-100 font-handwriting text-xl font-bold"
                  >
                    {customCompliment}
                  </motion.div>
                )}
              </div>
            )}

            {type === "APOLOGY" && (
              <div className="text-center space-y-4">
                <div className="inline-flex p-3 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/50">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold font-bubble text-pink-200">
                  A Little Apology & A Big Promise
                </h3>
                <p className="text-base font-handwriting text-purple-100 leading-relaxed text-left text-lg">
                  "I know I am a bit late for Boyfriend’s Day, but I wanted to make something special that lasts forever. You deserve a celebration not just on one calendar date, but every single day we are together."
                </p>
                <div className="pt-2 text-center">
                  <span className="text-xs text-pink-300 font-sans tracking-widest uppercase">
                    Forever Your #1 Fan ♡
                  </span>
                </div>
              </div>
            )}

            {type === "US" && (
              <div className="text-center space-y-4">
                <div className="inline-flex p-3 rounded-full bg-rose-500/20 text-rose-400 border border-rose-400/50">
                  <Heart className="w-7 h-7 fill-rose-400" />
                </div>
                <h3 className="text-2xl font-bold font-bubble text-pink-200">Our Stats</h3>
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 rounded-lg bg-white/5 border border-pink-500/20">
                    <p className="text-xs text-purple-300">Days Loved</p>
                    <p className="text-xl font-bold text-white font-mono">∞</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-pink-500/20">
                    <p className="text-xs text-purple-300">Smiles Given</p>
                    <p className="text-xl font-bold text-white font-mono">1,000,000+</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-pink-500/20">
                    <p className="text-xs text-purple-300">Favourite Person</p>
                    <p className="text-xl font-bold text-pink-300 font-handwriting">Only You ♡</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-pink-500/20">
                    <p className="text-xs text-purple-300">Next Adventure</p>
                    <p className="text-xl font-bold text-pink-300 font-handwriting">Coming Soon ✈</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
