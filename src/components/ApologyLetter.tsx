"use client";

import React, { useState, useCallback, useEffect, useId, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";

interface ApologyLetterProps {
  /** Text displayed on the front of the sealed envelope */
  envelopeTitle: string;
  /** The letter body content — rendered with preserved line breaks */
  letterContent: React.ReactNode;
  /** Accent variant for delicate tonal difference */
  variant?: "pink" | "purple";
  /** Optional organic scrapbook rotation angle in degrees */
  rotation?: number;
  className?: string;
}

export default function ApologyLetter({
  envelopeTitle,
  letterContent,
  variant = "pink",
  rotation = 0,
  className = "",
}: ApologyLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const modalId = useId();
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isPink = variant === "pink";

  // Pre-generate floating particles for open state
  const floatingHearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (i % 2 === 0 ? 1 : -1) * (30 + (i * 27) % 180),
    delay: (i * 0.18) % 1.5,
    duration: 2.2 + (i % 3) * 0.8,
    size: 10 + (i % 4) * 5,
  }));

  const handleOpen = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("bfie:letter-open", { detail: modalId })
    );
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
    }
    setIsOpening(true);
    // Brief beat for the envelope flap / seal animation before expanding letter
    openTimerRef.current = setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      openTimerRef.current = null;
    }, 280);
  }, [modalId]);

  const handleClose = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    setIsOpen(false);
    setIsOpening(false);
  }, []);

  useEffect(() => {
    const closeOtherOpenLetter = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== modalId) {
        if (openTimerRef.current) {
          clearTimeout(openTimerRef.current);
          openTimerRef.current = null;
        }
        setIsOpen(false);
        setIsOpening(false);
      }
    };

    window.addEventListener("bfie:letter-open", closeOtherOpenLetter);
    return () => {
      window.removeEventListener("bfie:letter-open", closeOtherOpenLetter);
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }
    };
  }, [modalId]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* ─── 💌 CLOSED STATE: SEALED ROMANTIC ENVELOPE ─── */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [rotation - 0.5, rotation + 0.5, rotation - 0.5],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.05,
          rotate: 0,
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.97 }}
        onClick={handleOpen}
        className={`relative cursor-pointer select-none group pointer-events-auto ${className}`}
        style={{ transformOrigin: "center center" }}
        role="button"
        tabIndex={0}
        aria-label={`Open letter: ${envelopeTitle}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        {/* Soft breathing purple/pink atmospheric glow */}
        <motion.div
          animate={{
            opacity: [0.35, 0.65, 0.35],
            scale: [0.98, 1.06, 0.98],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -inset-3.5 rounded-3xl blur-xl pointer-events-none transition-all ${
            isPink
              ? "bg-gradient-to-r from-pink-400/25 via-rose-300/30 to-pink-500/25"
              : "bg-gradient-to-r from-purple-400/25 via-fuchsia-300/30 to-pink-400/25"
          }`}
        />

        {/* Envelope container */}
        <div
          className={`relative w-56 sm:w-64 h-36 sm:h-40 max-w-full rounded-2xl overflow-hidden border transition-all duration-300 ${
            isPink
              ? "border-pink-200/90 shadow-[0_14px_35px_rgba(0,0,0,0.45),0_0_22px_rgba(244,114,182,0.3)] group-hover:border-pink-300"
              : "border-purple-200/90 shadow-[0_14px_35px_rgba(0,0,0,0.45),0_0_22px_rgba(192,132,252,0.3)] group-hover:border-purple-300"
          }`}
          style={{
            background:
              "linear-gradient(135deg, #fffdfa 0%, #ffffff 45%, #fff5f8 100%)",
          }}
        >
          {/* Subtle paper grain texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Scrapbook washi tape detail on top-left corner */}
          <div
            className={`absolute -top-2 left-4 w-12 h-5 rounded-xs transform -rotate-6 opacity-75 pointer-events-none z-10 backdrop-blur-[1px] shadow-sm border ${
              isPink
                ? "bg-pink-200/60 border-pink-300/50"
                : "bg-purple-200/60 border-purple-300/50"
            }`}
          />

          {/* Vintage airmail mini stamp mark on top-right */}
          <div
            className={`absolute top-2.5 right-3 text-[9px] font-mono tracking-widest uppercase opacity-40 pointer-events-none border px-1 py-0.5 rounded-xs ${
              isPink ? "border-rose-300 text-rose-600" : "border-purple-300 text-purple-600"
            }`}
          >
            PAR AVION ♡
          </div>

          {/* Envelope fold geometry lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
          >
            {/* Top flap crease */}
            <line
              x1="0"
              y1="0"
              x2="50%"
              y2="54%"
              strokeWidth="1.2"
              className={isPink ? "stroke-pink-200/70" : "stroke-purple-200/70"}
            />
            <line
              x1="100%"
              y1="0"
              x2="50%"
              y2="54%"
              strokeWidth="1.2"
              className={isPink ? "stroke-pink-200/70" : "stroke-purple-200/70"}
            />
            {/* Bottom folds */}
            <line
              x1="0"
              y1="100%"
              x2="42%"
              y2="50%"
              strokeWidth="1"
              className={isPink ? "stroke-rose-100/60" : "stroke-purple-100/60"}
            />
            <line
              x1="100%"
              y1="100%"
              x2="58%"
              y2="50%"
              strokeWidth="1"
              className={isPink ? "stroke-rose-100/60" : "stroke-purple-100/60"}
            />
          </svg>

          {/* Envelope Title on top */}
          <div className="absolute top-4 sm:top-5 inset-x-0 text-center px-4 z-10">
            <span
              className={`font-handwriting text-lg sm:text-xl font-bold tracking-wide transition-colors ${
                isPink
                  ? "text-rose-500 group-hover:text-rose-600 drop-shadow-[0_1px_2px_rgba(244,63,94,0.15)]"
                  : "text-purple-600 group-hover:text-purple-700 drop-shadow-[0_1px_2px_rgba(168,85,247,0.15)]"
              }`}
            >
              {envelopeTitle}
            </span>
          </div>

          {/* Heart wax seal in the center */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <motion.div
              animate={{
                scale: isOpening ? [1, 1.25, 0.9] : [1, 1.08, 1],
              }}
              transition={{
                duration: isOpening ? 0.3 : 2.6,
                repeat: isOpening ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className={`relative p-2.5 sm:p-3 rounded-full border shadow-md flex items-center justify-center ${
                isPink
                  ? "bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 border-rose-300/80 shadow-[0_4px_16px_rgba(244,63,94,0.45)]"
                  : "bg-gradient-to-br from-purple-400 via-fuchsia-500 to-purple-600 border-purple-300/80 shadow-[0_4px_16px_rgba(168,85,247,0.45)]"
              }`}
            >
              {/* Glossy ring highlight */}
              <div className="absolute inset-0.5 rounded-full border border-white/40 pointer-events-none" />
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white stroke-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
            </motion.div>
          </div>

          {/* Tiny twinkling sparkles */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="absolute top-2 left-3 pointer-events-none"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isPink ? "text-pink-300" : "text-purple-300"}`} />
          </motion.div>

          <motion.div
            animate={{ opacity: [0.4, 0.95, 0.4], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            className="absolute bottom-6 right-3 pointer-events-none"
          >
            <Sparkles className={`w-3 h-3 ${isPink ? "text-rose-300" : "text-fuchsia-300"}`} />
          </motion.div>

          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.85, 1.1, 0.85] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
            className="absolute bottom-6 left-4 pointer-events-none"
          >
            <Heart className={`w-2.5 h-2.5 ${isPink ? "fill-pink-200 stroke-pink-200" : "fill-purple-200 stroke-purple-200"}`} />
          </motion.div>

          {/* Small instruction at bottom */}
          <div className="absolute bottom-2.5 inset-x-0 text-center z-10">
            <span
              className={`font-handwriting text-xs sm:text-sm font-bold tracking-wider transition-opacity duration-200 ${
                isPink
                  ? "text-rose-400 group-hover:text-rose-500"
                  : "text-purple-400 group-hover:text-purple-500"
              }`}
            >
              tap to open ♡
            </span>
          </div>
        </div>
      </motion.div>

      {/* ─── 📜 OPEN STATE: HANDWRITTEN APOLOGY LETTER OVERLAY ─── */}
      <ClientPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
              style={{ zIndex: 2147483000 }}
              onClick={handleClose}
            >
            {/* Soft pink dreamy ambient vignette background (not a generic dark modal) */}
            <div
              className="absolute inset-0 backdrop-blur-md pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255, 192, 203, 0.24) 0%, rgba(45, 10, 50, 0.7) 50%, rgba(8, 0, 25, 0.88) 100%)",
              }}
            />

            {/* Floating hearts stardust gently ascending upward */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {floatingHearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{
                    opacity: 0,
                    y: 80,
                    x: `calc(50% + ${h.x}px)`,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: [0, 0.85, 0.6, 0],
                    y: -360,
                    scale: [0.6, 1.1, 0.9, 0.7],
                  }}
                  transition={{
                    duration: h.duration,
                    delay: h.delay,
                    ease: "easeOut",
                  }}
                  className="absolute bottom-1/4"
                >
                  <Heart
                    style={{ width: h.size, height: h.size }}
                    className={
                      isPink
                        ? "fill-pink-300/60 stroke-pink-200/70"
                        : "fill-purple-300/60 stroke-fuchsia-200/70"
                    }
                  />
                </motion.div>
              ))}
            </div>

            {/* Handwritten Paper Letter Card */}
              <motion.div
              initial={{
                opacity: 0,
                scale: 0.82,
                y: 40,
                rotateX: 12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.86,
                y: 25,
                transition: { duration: 0.22 },
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-20 flex max-h-[calc(100dvh-2rem)] w-full max-w-lg pointer-events-auto sm:max-h-[calc(100dvh-3rem)]"
            >
              {/* Paper Letter Sheet */}
              <div
                className="relative flex min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-amber-200/70 p-5 sm:p-8"
                style={{
                  maxHeight: "calc(100dvh - 2rem)",
                  background:
                    "linear-gradient(145deg, #fffdf8 0%, #fff9ec 45%, #fef3e2 100%)",
                  boxShadow:
                    "0 25px 60px -10px rgba(0,0,0,0.65), 0 0 35px rgba(244,63,94,0.18), inset 0 0 40px rgba(245,215,185,0.35)",
                }}
              >
                {/* CSS paper texture overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.045]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Scrapbook washi tape strip at top-center */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-6 bg-pink-200/70 border border-pink-300/60 rounded-xs shadow-sm transform -rotate-1 pointer-events-none z-10" />

                {/* Decorative corner stars & hearts */}
                <div className="absolute top-4 right-4 pointer-events-none opacity-40 text-rose-400 select-none font-serif text-sm">
                  ✧ ✦ ✧
                </div>
                <div className="absolute top-4 left-4 pointer-events-none opacity-40 text-rose-400 select-none font-serif text-sm">
                  ♡
                </div>

                {/* Top Header */}
                <div className="flex shrink-0 items-center gap-2.5 pb-3 border-b border-amber-200/60 mb-5">
                  <motion.div
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isPink
                          ? "fill-rose-500 stroke-rose-500"
                          : "fill-purple-500 stroke-purple-500"
                      }`}
                    />
                  </motion.div>

                  <h3
                    className={`font-handwriting text-3xl sm:text-4xl font-bold tracking-wide ${
                      isPink ? "text-[#58133b]" : "text-[#4a103c]"
                    }`}
                  >
                    Dear Chotu,
                  </h3>

                  <Sparkles
                    className={`w-4 h-4 ml-auto ${
                      isPink ? "text-pink-400" : "text-purple-400"
                    }`}
                  />
                </div>

                {/* Letter Body: Dark purple/pink handwritten text */}
                <div
                  className={`font-handwriting flex-1 min-h-[160px] max-h-[55vh] sm:max-h-[60vh] overflow-y-auto pr-2 text-lg leading-relaxed tracking-wide whitespace-pre-wrap break-words overscroll-contain sm:pr-3 sm:text-xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[var(--letter-scrollbar-track)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-[#fff9ec] [&::-webkit-scrollbar-thumb]:bg-[var(--letter-scrollbar-thumb)] [&::-webkit-scrollbar-thumb:hover]:bg-[var(--letter-scrollbar-thumb-hover)] ${
                    isPink ? "text-[#4a1236]" : "text-[#451036]"
                  }`}
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarGutter: "stable",
                    "--letter-scrollbar-track": isPink
                      ? "rgba(251,207,232,0.3)"
                      : "rgba(233,213,255,0.32)",
                    "--letter-scrollbar-thumb": isPink
                      ? "rgba(244,114,182,0.72)"
                      : "rgba(192,132,252,0.72)",
                    "--letter-scrollbar-thumb-hover": isPink
                      ? "rgba(225,29,72,0.8)"
                      : "rgba(168,85,247,0.8)",
                  } as React.CSSProperties}
                >
                  {letterContent}
                </div>

                {/* Scattered small decorative stars & hearts */}
                <div className="flex shrink-0 items-center gap-2 mt-6 opacity-35 select-none pointer-events-none">
                  <span className="text-xs text-rose-500">✦</span>
                  <span className="text-xs text-rose-400">♡</span>
                  <span className="text-xs text-purple-400">✧</span>
                  <span className="text-xs text-rose-400">♡</span>
                  <span className="text-xs text-rose-500">✦</span>
                </div>

                {/* Sign-off: "with love, ♡" */}
                <div className="mt-5 pt-3.5 border-t border-amber-200/60 flex shrink-0 items-center justify-between">
                  <span
                    className={`font-handwriting text-2xl sm:text-3xl font-bold ${
                      isPink ? "text-[#58133b]" : "text-[#4a103c]"
                    }`}
                  >
                    with love, ♡
                  </span>

                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isPink
                          ? "fill-rose-400 stroke-rose-400"
                          : "fill-purple-400 stroke-purple-400"
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Close Button: "close ♡" */}
                <div className="mt-6 text-center shrink-0">
                  <button
                    onClick={handleClose}
                    className={`font-handwriting text-base sm:text-lg font-bold tracking-wider px-6 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      isPink
                        ? "text-rose-600 hover:text-rose-700 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/80 hover:border-rose-300 shadow-sm"
                        : "text-purple-600 hover:text-purple-700 bg-purple-50/80 hover:bg-purple-100 border border-purple-200/80 hover:border-purple-300 shadow-sm"
                    }`}
                  >
                    close ♡
                  </button>
                </div>
              </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ClientPortal>
    </>
  );
}
