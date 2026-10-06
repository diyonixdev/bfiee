"use client";

import React, { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";

interface LoveLetterEnvelopeProps {
  rotation?: number;
  className?: string;
  onOpen?: () => void;
}

export default function LoveLetterEnvelope({
  rotation = -8,
  className = "",
  onOpen,
}: LoveLetterEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalId = useId();

  const handleOpen = () => {
    window.dispatchEvent(
      new CustomEvent("bfie:letter-open", { detail: modalId })
    );
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  useEffect(() => {
    const closeOtherOpenLetter = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== modalId) {
        setIsOpen(false);
      }
    };

    window.addEventListener("bfie:letter-open", closeOtherOpenLetter);
    return () => {
      window.removeEventListener("bfie:letter-open", closeOtherOpenLetter);
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
      <motion.div
        whileHover={{ scale: 1.08, rotate: rotation * 0.6 }}
        whileTap={{ scale: 0.95 }}
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={handleOpen}
        className={`relative w-48 sm:w-56 h-32 cursor-pointer select-none max-w-full ${className}`}
      >
        {/* Envelope Body */}
        <div className="relative w-full h-full bg-white/95 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-rose-100 overflow-hidden flex items-center justify-center">
          {/* Fold Lines Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-white pointer-events-none" />
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-rose-200" fill="none">
            <line x1="0" y1="0" x2="50%" y2="55%" strokeWidth="1.5" />
            <line x1="100%" y1="0" x2="50%" y2="55%" strokeWidth="1.5" />
            <line x1="0" y1="100%" x2="45%" y2="50%" strokeWidth="1.5" />
            <line x1="100%" y1="100%" x2="55%" y2="50%" strokeWidth="1.5" />
          </svg>

          {/* Red Heart Wax Seal / Sticker */}
          <div className="relative z-10 p-2.5 rounded-full bg-rose-500 text-white shadow-[0_4px_12px_rgba(244,63,94,0.5)] border border-rose-300">
            <Heart className="w-5 h-5 fill-white stroke-white animate-pulse" />
          </div>

          <span className="absolute bottom-2 text-[10px] font-handwriting text-rose-400 font-bold tracking-wider">
            tap to read letter ♡
          </span>
        </div>
      </motion.div>

      {/* Interactive Letter Modal Popup */}
      <ClientPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 flex items-center justify-center overflow-hidden p-4 sm:p-6"
              style={{
                zIndex: 2147483000,
                background:
                  "radial-gradient(ellipse at center, rgba(255, 192, 203, 0.2) 0%, rgba(45, 10, 50, 0.7) 50%, rgba(8, 0, 25, 0.88) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 flex max-h-[calc(100dvh-2rem)] min-h-0 w-full max-w-lg flex-col overflow-hidden rounded-lg border border-rose-200 bg-[#fff8f0] p-6 text-slate-900 shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:p-8 font-serif"
                style={{ maxHeight: "calc(100dvh - 2rem)" }}
              >
              {/* Decorative Header */}
              <div className="flex shrink-0 items-center gap-2 text-rose-500 mb-4 pb-2 border-b border-rose-200">
                <Heart className="w-5 h-5 fill-rose-500" />
                <h3 className="font-handwriting text-2xl font-bold">To My Favourite Person</h3>
              </div>

              {/* Letter Content */}
              <div
                className="font-handwriting min-h-0 flex-1 basis-0 space-y-4 overflow-y-auto overscroll-contain pr-2 text-lg leading-relaxed break-words text-slate-800 sm:text-xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[rgba(251,207,232,0.3)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-[#fff8f0] [&::-webkit-scrollbar-thumb]:bg-[rgba(244,114,182,0.72)] [&::-webkit-scrollbar-thumb:hover]:bg-[rgba(225,29,72,0.8)]"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarGutter: "stable",
                  scrollbarColor: "rgba(244,114,182,0.72) rgba(251,207,232,0.3)",
                }}
              >
                <p>
                  I know I might be a little late for Boyfriend’s Day, but honestly, having you in my life is something I celebrate every single second.
                </p>
                <p>
                  Thank you for your infinite patience, the stupid jokes that never fail to make me laugh, the warm hugs that fix everything, and for simply being you.
                </p>
                <p>
                  Here is to every sunset we have watched, every playlist we have shared, and a million more adventures waiting for us.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-6 pt-4 border-t border-rose-200 flex shrink-0 items-center justify-between font-handwriting text-xl text-rose-600 font-bold">
                <span>Forever & Always, Your Person ♡</span>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              {/* Close Button */}
              <div className="mt-6 text-center shrink-0">
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-handwriting text-base sm:text-lg font-bold tracking-wider px-6 py-1.5 rounded-full transition-all duration-200 cursor-pointer text-rose-600 hover:text-rose-700 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/80 hover:border-rose-300 shadow-sm"
                >
                  close ♡
                </button>
              </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ClientPortal>
    </>
  );
}
