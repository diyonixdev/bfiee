"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate stars
    const numStars = 140;
    const stars = Array.from({ length: numStars }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      color:
        Math.random() > 0.6
          ? "#f472b6"
          : Math.random() > 0.3
          ? "#c084fc"
          : "#ffffff",
    }));

    // Sparkle crosses (✦)
    const sparkles = Array.from({ length: 18 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 6 + 4,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.015 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.twinkleDir;
        if (star.alpha > 1) {
          star.alpha = 1;
          star.twinkleDir = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.twinkleDir = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowBlur = star.radius * 3;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      // Render sparkle crosses
      sparkles.forEach((s) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.globalAlpha = (Math.sin(Date.now() * 0.002 * s.speed * 100) + 1) / 2 * s.alpha;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ff2d75";

        ctx.beginPath();
        ctx.moveTo(-s.size, 0);
        ctx.lineTo(s.size, 0);
        ctx.moveTo(0, -s.size);
        ctx.lineTo(0, s.size);
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080019]">
      {/* Dynamic Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Atmospheric Nebula Glow Lights */}
      <div className="absolute top-[-10%] left-[20%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-pink-600/25 via-purple-600/20 to-transparent blur-[120px]" />
      <div className="absolute top-[30%] right-[-5%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-purple-700/30 via-pink-500/20 to-transparent blur-[140px]" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-900/35 via-purple-900/25 to-transparent blur-[130px]" />

      {/* Dreamy Volumetric Glowing Pink Clouds at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[420px] pointer-events-none flex items-end">
        {/* Soft Cloud Ambient Lights */}
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[120%] h-[320px] rounded-[100%] bg-gradient-to-t from-pink-500/30 via-purple-600/20 to-transparent blur-[90px]" />
        <div className="absolute bottom-0 left-[-10%] w-[60%] h-[280px] rounded-full bg-pink-500/25 blur-[100px]" />
        <div className="absolute bottom-0 right-[-10%] w-[60%] h-[280px] rounded-full bg-purple-500/25 blur-[100px]" />

        {/* Ethereal Cloud Bank SVG Shapes with layered pink/peach/purple glows */}
        <div className="relative w-full h-full opacity-60 mix-blend-screen">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1440 320"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,192 C150,220 280,120 450,160 C620,200 720,260 900,210 C1080,160 1200,240 1440,200 L1440,320 L0,320 Z"
              fill="url(#cloudGrad1)"
              opacity="0.8"
            />
            <path
              d="M0,240 C200,180 380,260 600,220 C820,180 980,240 1200,210 C1350,190 1400,230 1440,250 L1440,320 L0,320 Z"
              fill="url(#cloudGrad2)"
              opacity="0.9"
            />
            <defs>
              <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff4d8d" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#d946ef" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fb7185" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Floating Cinematic Foreground Heart Bokeh */}
      <motion.div
        animate={{ y: [0, -15, 0], scale: [1, 1.05, 1], rotate: [-10, -5, -10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 -left-12 w-48 h-48 pointer-events-none z-30 blur-[6px] opacity-75"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-pink-500/80 drop-shadow-[0_0_20px_#ff2d75]">
          <path d="M50 88.9L16.7 55.6C7.2 46.1 7.2 30.7 16.7 21.2 26.2 11.7 41.6 11.7 50 21.2 58.4 11.7 73.8 11.7 83.3 21.2 92.8 30.7 92.8 46.1 83.3 55.6L50 88.9Z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.08, 1], rotate: [15, 20, 15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-16 -right-10 w-44 h-44 pointer-events-none z-30 blur-[7px] opacity-80"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-rose-500/85 drop-shadow-[0_0_25px_#f43f5e]">
          <path d="M50 88.9L16.7 55.6C7.2 46.1 7.2 30.7 16.7 21.2 26.2 11.7 41.6 11.7 50 21.2 58.4 11.7 73.8 11.7 83.3 21.2 92.8 30.7 92.8 46.1 83.3 55.6L50 88.9Z" />
        </svg>
      </motion.div>
    </div>
  );
}
