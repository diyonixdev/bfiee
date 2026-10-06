"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, Sparkles } from "lucide-react";

// ✏️ EDIT LEFT STICKY NOTE MESSAGES HERE
const leftNoteItems = [
  "Your kindness",
  "Your stupid jokes",
  "The way you care",
  "Everything about you ♡",
];

// ✏️ EDIT RIGHT STICKY NOTE MESSAGES HERE
const rightNoteItems = [
  "More dates",
  "More laughter",
  "More memories",
  "More of us ♡",
];

interface ScrapbookChecklistProps {
  rotation?: number;
  className?: string;
}

export function ScrapbookChecklist({
  rotation = -4,
  className = "",
}: ScrapbookChecklistProps) {
  const [items, setItems] = useState(
    leftNoteItems.map((text, i) => ({ id: i + 1, text, checked: true }))
  );

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: rotation * 0.7 }}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`relative select-none ${className}`}
    >
      {/* Translucent Scotch Tape on top */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 bg-white/40 backdrop-blur-xs border border-white/60 shadow-xs rotate-[-2deg] z-20" />

      {/* Torn Paper Container */}
      <div className="torn-paper p-5 sm:p-6 w-64 sm:w-72 max-w-full rounded-xs border border-amber-200/60">
        {/* Subtle grid lines background effect */}
        <div className="space-y-3 pt-1">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="flex items-center gap-3 cursor-pointer group transition-transform active:scale-95"
            >
              <div
                className={`w-5 h-5 rounded-xs border-2 flex items-center justify-center transition-colors ${
                  item.checked
                    ? "border-pink-600 bg-pink-500 text-white shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                    : "border-slate-400 bg-white"
                }`}
              >
                {item.checked && <Check className="w-3.5 h-3.5 stroke-3" />}
              </div>
              <span
                className={`font-handwriting text-lg sm:text-xl font-bold tracking-wide transition-colors break-words overflow-hidden ${
                  item.checked ? "text-slate-800" : "text-slate-400 line-through"
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface ScrapbookWishesProps {
  rotation?: number;
  className?: string;
}

export function ScrapbookWishes({
  rotation = 6,
  className = "",
}: ScrapbookWishesProps) {
  const wishes = rightNoteItems;

  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: rotation * 0.7 }}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`relative select-none ${className}`}
    >
      {/* Neon Heart Pin Sticker at top right */}
      <div className="absolute -top-2.5 -right-2 z-20">
        <Heart className="w-6 h-6 fill-pink-500 stroke-pink-300 stroke-2 drop-shadow-[0_0_10px_#ff2d75]" />
      </div>

      {/* Soft lavender/cyan paper note */}
      <div className="torn-paper-pink bg-gradient-to-br from-[#eff6ff] to-[#f5f3ff] p-5 sm:p-6 w-56 sm:w-64 max-w-full rounded-xs border border-purple-200 shadow-lg">
        <div className="space-y-1.5 text-left pt-1">
          {wishes.map((wish, index) => (
            <p
              key={index}
              className="font-handwriting text-purple-950 text-lg sm:text-xl font-bold tracking-wide leading-relaxed break-words overflow-hidden"
            >
              {wish}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ScrapbookNote() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center">
      <ScrapbookChecklist />
      <ScrapbookWishes />
    </div>
  );
}
