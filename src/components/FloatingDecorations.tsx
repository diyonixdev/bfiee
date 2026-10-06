"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "heart" | "sparkle" | "star";
  opacity: number;
}

export default function FloatingDecorations() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // Generate deterministic decorative items on client mount
    const elements: FloatingItem[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: (i * 7 + 5) % 95,
      y: (i * 13 + 10) % 90,
      size: 14 + (i % 4) * 6,
      duration: 6 + (i % 5) * 2,
      delay: (i % 3) * 1.5,
      type: i % 3 === 0 ? "heart" : i % 3 === 1 ? "sparkle" : "star",
      opacity: 0.15 + ((i % 3) * 0.1),
    }));
    setItems(elements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {items.map((item) => (
        <motion.div
          key={item.id}
          aria-hidden="true"
          className="absolute text-rose-300"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            opacity: item.opacity,
          }}
          animate={{
            y: ["0px", "-20px", "0px"],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.type === "heart" && (
            <Heart style={{ width: item.size, height: item.size }} className="fill-rose-300/60" />
          )}
          {item.type === "sparkle" && (
            <Sparkles style={{ width: item.size, height: item.size }} />
          )}
          {item.type === "star" && (
            <Star style={{ width: item.size, height: item.size }} className="fill-pink-200/50" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
