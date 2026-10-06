"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Heart, Music, Image as ImageIcon, Mail, Wand2, Sparkles } from "lucide-react";

interface NavigationProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onOpenPlay?: () => void;
}

export default function Navigation({
  activeTab = "APOLOGY",
  onSelectTab,
  onOpenPlay,
}: NavigationProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const tabs = [
    { id: "APOLOGY", label: "APOLOGY", icon: Home, color: "text-pink-400" },
    { id: "US", label: "US", icon: Heart, color: "text-rose-400" },
    { id: "OUR SONG", label: "OUR SONG", icon: Music, color: "text-purple-300" },
    { id: "MEMORIES", label: "MEMORIES", icon: ImageIcon, color: "text-amber-300" },
    { id: "LETTER", label: "LETTER", icon: Mail, color: "text-pink-300" },
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    if (onSelectTab) onSelectTab(tabId);
  };

  return (
    <header className="relative z-40 w-full pt-4 sm:pt-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Handwritten Doodle */}
        <div className="flex items-center gap-1.5 select-none transform -rotate-6 transition-transform hover:scale-105">
          <span className="text-xl sm:text-2xl text-pink-300 font-handwriting tracking-wide font-bold neon-pink-glow">
            ♡ just for you &lt;3
          </span>
        </div>

        {/* Central Glassmorphic Capsule Nav */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full cosmic-glass-pill shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                type="button"
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-white font-bold"
                    : "text-purple-200/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600/60 to-purple-600/60 border border-pink-400/40 shadow-[0_0_15px_rgba(244,63,94,0.5)] -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-pink-400 drop-shadow-[0_0_8px_#f43f5e]" : tab.color
                  }`}
                />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-pink-400 rounded-full shadow-[0_0_8px_#ff2d75]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Glowing Action Button */}
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPlay}
            type="button"
            className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 border border-pink-300/60 text-white text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.9)] transition-all"
          >
            <Wand2 className="w-3.5 h-3.5 text-pink-200 animate-pulse" />
            <span>PLAY WITH ME ✦</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile nav pills bar */}
      <div className="md:hidden flex items-center justify-start sm:justify-center gap-1.5 mt-3 px-3 py-1.5 rounded-full cosmic-glass-pill mx-auto w-full max-w-full overflow-x-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap shrink-0 transition-colors ${
                isActive ? "bg-pink-600/70 text-white border border-pink-400/50 shadow-[0_0_10px_rgba(244,63,94,0.4)]" : "text-purple-200/60 hover:text-white"
              }`}
            >
              <Icon className="w-3 h-3 text-pink-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
