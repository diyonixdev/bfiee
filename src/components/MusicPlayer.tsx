"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Heart,
} from "lucide-react";

interface MusicPlayerProps {
  initialTrack?: string;
  artist?: string;
  albumArt?: string;
  audioSrc?: string;
  onTimeUpdateProp?: (currentTime: number, duration: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  seekTimestamp?: number | null;
}

export default function MusicPlayer({
  initialTrack = "Love Me Like You Do",
  artist = "Ellie Goulding",
  albumArt = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=300&auto=format&fit=crop",
  audioSrc = "/music/love-me-like-you-do.mp3",
  onTimeUpdateProp,
  onPlayStateChange,
  seekTimestamp,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set 1.5x playback rate on mount and when audio instance is available
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = 1.5;
    }
  }, []);

  // Handle external seek requests from lyrics
  useEffect(() => {
    if (seekTimestamp !== undefined && seekTimestamp !== null && audioRef.current) {
      audioRef.current.currentTime = seekTimestamp;
      setCurrentTime(seekTimestamp);
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          if (onPlayStateChange) onPlayStateChange(true);
        }).catch(() => {});
      }
    }
  }, [seekTimestamp, onPlayStateChange]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        audio.playbackRate = 1.5;
        await audio.play();
        setIsPlaying(true);
        if (onPlayStateChange) onPlayStateChange(true);
      } catch (error) {
        console.error("[MusicPlayer] Play failed:", error);
        setIsPlaying(false);
        if (onPlayStateChange) onPlayStateChange(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));

    if (audio && duration > 0) {
      const newTime = percent * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
      if (onTimeUpdateProp) onTimeUpdateProp(newTime, duration);
    }
  };

  const handleSkipBack = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      setCurrentTime(0);
      if (onTimeUpdateProp) onTimeUpdateProp(0, duration);
    }
  };

  const handleSkipForward = () => {
    const audio = audioRef.current;
    if (audio) {
      const target = Math.min(duration || audio.duration || 0, audio.currentTime + 15);
      audio.currentTime = target;
      setCurrentTime(target);
      if (onTimeUpdateProp) onTimeUpdateProp(target, duration);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || !isFinite(secs) || secs <= 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative z-30 w-full max-w-md mx-auto select-none pointer-events-auto">
      {/* HTML5 Audio element pointing to /music/love-me-like-you-do.mp3 */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        loop={isRepeat}
        onLoadedMetadata={(e) => {
          const audio = e.currentTarget;
          audio.playbackRate = 1.5;
          const d = audio.duration;
          if (d && !isNaN(d) && isFinite(d)) {
            setDuration(d);
            if (onTimeUpdateProp) onTimeUpdateProp(audio.currentTime, d);
          }
        }}
        onDurationChange={(e) => {
          const d = e.currentTarget.duration;
          if (d && !isNaN(d) && isFinite(d)) {
            setDuration(d);
            if (onTimeUpdateProp) onTimeUpdateProp(currentTime, d);
          }
        }}
        onTimeUpdate={(e) => {
          const t = e.currentTarget.currentTime;
          setCurrentTime(t);
          if (onTimeUpdateProp) onTimeUpdateProp(t, e.currentTarget.duration || duration);
        }}
        onPlay={(e) => {
          e.currentTarget.playbackRate = 1.5;
          setIsPlaying(true);
          if (onPlayStateChange) onPlayStateChange(true);
        }}
        onPause={() => {
          setIsPlaying(false);
          if (onPlayStateChange) onPlayStateChange(false);
        }}
        onEnded={() => {
          if (!isRepeat) {
            setIsPlaying(false);
            setCurrentTime(0);
            if (onPlayStateChange) onPlayStateChange(false);
          }
        }}
        onError={(e) => {
          const err = e.currentTarget.error;
          console.error(`[MusicPlayer] Audio Error (${err?.code})`, `\nTarget URL: ${audioSrc}`);
          setIsPlaying(false);
          if (onPlayStateChange) onPlayStateChange(false);
        }}
      />

      <div className="cosmic-glass p-4 sm:p-5 rounded-2xl border border-pink-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {/* Top Info Bar */}
        <div className="flex items-center gap-3.5 mb-3.5">
          {/* Album Cover Thumbnail */}
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-pink-400/40 shadow-md">
            <img
              src={albumArt}
              alt="Album Artwork"
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-pink-500/20 backdrop-blur-2xs flex items-center justify-center">
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-white animate-pulse h-3" />
                  <span className="w-1 bg-white animate-pulse h-4 delay-75" />
                  <span className="w-1 bg-white animate-pulse h-2 delay-150" />
                </div>
              </div>
            )}
          </div>

          {/* Track Titles */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white text-sm sm:text-base font-bold truncate flex items-center gap-1.5">
              <span>{initialTrack}</span>
            </h4>
            <p className="text-purple-200/70 text-xs truncate font-light">
              {artist}
            </p>
          </div>

          {/* Heart Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            type="button"
            className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 transition-transform active:scale-75 ${
                isLiked
                  ? "fill-pink-500 stroke-pink-500 drop-shadow-[0_0_8px_#ff2d75]"
                  : "stroke-purple-300 fill-none"
              }`}
            />
          </button>
        </div>

        {/* Progress Bar & Timers */}
        <div className="space-y-1.5 mb-3">
          <div
            onClick={handleSeek}
            className="relative w-full h-1.5 bg-purple-950/80 rounded-full overflow-hidden cursor-pointer group"
          >
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full shadow-[0_0_10px_#ff2d75] relative transition-[width] duration-100"
            >
              {/* Glowing Scrubber Thumb */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_#ffffff] group-hover:scale-125 transition-transform" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-purple-200/60 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between px-2 text-purple-200">
          <button
            type="button"
            onClick={() => setIsShuffle(!isShuffle)}
            className={`p-1.5 rounded-full hover:text-white transition-colors cursor-pointer ${
              isShuffle ? "text-pink-400 drop-shadow-[0_0_6px_#f43f5e]" : "text-purple-300/60"
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleSkipBack}
            className="p-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Central Main Glowing Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={togglePlay}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,63,94,0.85)] border border-pink-200/60 cursor-pointer z-40"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white stroke-white" />
            ) : (
              <Play className="w-5 h-5 fill-white stroke-white ml-0.5" />
            )}
          </motion.button>

          <button
            type="button"
            onClick={handleSkipForward}
            className="p-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsRepeat(!isRepeat)}
            className={`p-1.5 rounded-full hover:text-white transition-colors cursor-pointer ${
              isRepeat ? "text-pink-400 drop-shadow-[0_0_6px_#f43f5e]" : "text-purple-300/60"
            }`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
