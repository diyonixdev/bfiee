"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Polaroid from "@/components/Polaroid";
import { ScrapbookChecklist, ScrapbookWishes } from "@/components/ScrapbookNote";
import LoveLetterEnvelope from "@/components/LoveLetterEnvelope";
import MusicPlayer from "@/components/MusicPlayer";
import RomanticLyricsSection from "@/components/RomanticLyricsSection";
import ApologyLetter from "@/components/ApologyLetter";
import InteractiveModal from "@/components/InteractiveModal";
import ForgivenessSection from "@/components/ForgivenessSection";
import { ChevronDown, Heart, Sparkles } from "lucide-react";

// =========================================================================
// 💌 APOLOGY LETTERS CONTENT (EDITABLE)
// Type your apology letters here. They will appear inside the open letters.
// =========================================================================

// ✏️ EDIT APOLOGY LETTER 1 HERE
const apologyLetter1 = (
  <div className="space-y-3.5 sm:space-y-4">
    <p>Sorry yrr... 🥺❤️</p>

    <p>
      Tune meri wajah se dance chhod diya... and honestly, I feel so guilty. You don&apos;t even know how much. 💔
    </p>

    <div className="flex items-center gap-1.5 py-0.5 text-xs opacity-40 text-rose-400">
      <span>♡</span>
      <span>✧</span>
      <span>♡</span>
    </div>

    <p>
      Meri wajah se you left something that you absolutely loved, something that made you happy... and that thought genuinely hurts me. I wish I could go back in time and correct my mistake. I really, really do. 🥺
    </p>

    <p>
      Ek baar galti ho gayi...{" "}
      <span className="bg-pink-200/60 text-rose-900 px-2 py-0.5 rounded-md font-bold shadow-[0_1px_2px_rgba(244,63,94,0.12)] inline-block">
        please maaf kar de
      </span>
      . ❤️🩹
    </p>

    <p>
      And honestly, I would really love it if you would dance again. Please. 🥺🫶🏻
      <br />
      I don&apos;t want my mistake to be the reason you stay away from something you loved so much.
    </p>

    <div className="flex items-center gap-1.5 py-0.5 text-xs opacity-40 text-rose-400">
      <span>✦</span>
      <span>♡</span>
      <span>✦</span>
    </div>

    <p>
      I know it was disrespectful.
      <br />
      <span className="bg-pink-200/60 text-rose-900 px-2 py-0.5 rounded-md font-bold shadow-[0_1px_2px_rgba(244,63,94,0.12)] inline-block">
        I know I was wrong
      </span>
      .
      <br />
      And I&apos;m genuinely, genuinely sorry. 😔
    </p>

    <p>Bas... please forgive me. ❤️</p>

    <p>
      I can&apos;t undo what happened, but I hope I can make it right somehow.
    </p>

    <p>
      And if you ever feel like dancing again...
      <br />
      please dance. 💃🏻❤️
      <br />
      Not because of me, but because YOU love it.
    </p>

    <div className="flex items-center gap-1.5 py-0.5 text-xs opacity-40 text-rose-400">
      <span>♡</span>
      <span>✧</span>
      <span>♡</span>
    </div>

    <p>I&apos;m so sorry, Chotu. 🥺❤️🩹</p>
  </div>
);

// ✏️ EDIT APOLOGY LETTER 2 HERE
const apologyLetter2 = (
  <div className="space-y-2.5 sm:space-y-3 text-[15px] sm:text-[16px] leading-[1.45] sm:leading-[1.5] tracking-normal">
    <p>Chotu... I&apos;m really sorry. 🥺❤️</p>

    <p>
      Maine B Block ke saamne volume tez karke tumhe embarrass kiya aur tumhare saath disrespect
      kiya... and{" "}
      <span className="bg-pink-200/70 text-[#5b1238] px-1.5 py-0.5 rounded-md font-bold shadow-[0_1px_3px_rgba(244,63,94,0.16)]">
        I know that was wrong
      </span>
      . 💔
    </p>

    <p>
      I know tumhe kitna bura laga hoga, especially because it happened in front of other people.
      Mujhe pata hai tumhe kitna sharminda feel hua hoga because of me, and honestly... that
      thought makes me feel terrible. 🥺
    </p>

    <div className="flex items-center gap-1.5 py-0.5 text-[10px] opacity-45 text-pink-500">
      <span>♡</span>
      <span>✧</span>
      <span>♡</span>
    </div>

    <p>
      Maine tumhe drag kiya, volume tez kiya aur jis tarah se maine behave kiya... I know it
      wasn&apos;t okay. 😔
    </p>

    <p>
      It wasn&apos;t intentional, I swear, but I know that doesn&apos;t make what happened any less
      hurtful.
    </p>

    <p>
      Mujhe pata hai tum disrespect bilkul pasand nahi karte... and I still ended up making you
      feel disrespected. I&apos;m genuinely sorry for that. ❤️‍🩹
    </p>

    <div className="flex items-center gap-1.5 py-0.5 text-[10px] opacity-45 text-rose-500">
      <span>✦</span>
      <span>♡</span>
      <span>✦</span>
    </div>

    <p>I wish I could take that moment back.</p>

    <p>But I can&apos;t.</p>

    <p>
      All I can do is promise you that{" "}
      <span className="bg-pink-200/70 text-[#5b1238] px-1.5 py-0.5 rounded-md font-bold shadow-[0_1px_3px_rgba(244,63,94,0.16)]">
        it won&apos;t happen again
      </span>
      . 🥺🫶🏻
    </p>

    <p>
      I will be more careful with you, with your feelings, and with the things that matter to you.
    </p>

    <p>I&apos;m really, really sorry, Chotu. ❤️</p>

    <div className="flex items-center gap-1.5 py-0.5 text-[10px] opacity-45 text-pink-500">
      <span>♡</span>
      <span>✧</span>
      <span>♡</span>
    </div>

    <p>
      <span className="bg-pink-200/70 text-[#5b1238] px-1.5 py-0.5 rounded-md font-bold shadow-[0_1px_3px_rgba(244,63,94,0.16)]">
        Please forgive me
      </span>
      . 🥺❤️‍🩹
    </p>
  </div>
);

export default function LoveArchivePage() {
  const [modalType, setModalType] = useState<string | null>(null);
  const [currentAudioTime, setCurrentAudioTime] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [seekTimestamp, setSeekTimestamp] = useState<number | null>(null);

  const handleTabSelect = (tabId: string) => {
    if (tabId === "APOLOGY" || tabId === "US") {
      setModalType(tabId);
    } else if (tabId === "MEMORIES" || tabId === "LETTER" || tabId === "OUR SONG") {
      const targetId = tabId === "OUR SONG" ? "our-song" : tabId.toLowerCase().replace(" ", "-");
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenPlay = () => {
    setModalType("PLAY");
  };

  const handleAudioTimeUpdate = (t: number) => {
    setCurrentAudioTime(t);
  };

  const handleAudioPlayStateChange = (playing: boolean) => {
    setIsAudioPlaying(playing);
  };

  const handleLyricSeek = (time: number) => {
    setSeekTimestamp(time);
    // Reset timestamp trigger after propagation
    setTimeout(() => setSeekTimestamp(null), 100);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#080019] text-white">
      {/* 1. Deep Cosmic Nebula & Twinkling Background with Dreamy Clouds & Bokeh */}
      <CosmicBackground />

      {/* 2. Top Navigation Bar */}
      <Navigation
        onSelectTab={handleTabSelect}
        onOpenPlay={handleOpenPlay}
      />

      {/* 3. Main Hero Viewport Composition (Exact Reference Reproduction) */}
      <div className="relative z-10 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">
        {/* Scrapbook Floating Grid Container — 3-column grid keeps side items in their own lanes */}
        <div className="relative w-full flex-1 my-auto">
          <div className="hidden lg:grid w-full items-start" style={{ gridTemplateColumns: 'auto 1fr auto', gap: '0' }}>
            {/* LEFT SCRAPBOOK ITEMS — own grid cell, never overlaps center */}
            <div className="flex flex-col items-start gap-6 pt-6 z-20 pointer-events-auto self-center shrink-0" style={{ maxWidth: 'min(18vw, 280px)', minWidth: '200px' }}>
              {/* Top Left Polaroid: Sunset Couple with Metal Paperclip */}
              <Polaroid
                imageSrc="/images/diya1.jpeg"
                caption="my favourite place"
                subcaption="is anywhere with you ♡"
                rotation={-8}
                hasPaperclip={true}
                className="w-full"
              />

              {/* Mid Left Torn Paper Checklist Note */}
              <ScrapbookChecklist rotation={-4} className="mt-1" />
            </div>

            {/* CENTER HERO (3D Typography + Doodles + CTA) — protected center column */}
            <div className="relative z-30 flex flex-col items-center justify-center px-4 py-6">
              <Hero
                onEnterArchive={() => {
                  const el = document.getElementById("our-song");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>

            {/* RIGHT SCRAPBOOK ITEMS — own grid cell, never overlaps center */}
            <div className="flex flex-col items-end gap-5 pt-6 z-20 pointer-events-auto self-center shrink-0" style={{ maxWidth: 'min(18vw, 280px)', minWidth: '200px' }}>
              {/* Top Right Polaroid: City Lights Couple with Neon Heart Sticker */}
              <Polaroid
                imageSrc="/images/diya%203.jpeg"
                caption="different days"
                subcaption="same favourite person ♡"
                rotation={7}
                hasNeonHeart={true}
                className="w-full"
              />

              {/* Mid Right Wishes Note */}
              <ScrapbookWishes rotation={6} />

              {/* Mid Right Floating Love Letter Envelope */}
              <LoveLetterEnvelope rotation={-8} className="mt-1" />
            </div>
          </div>

          {/* CENTER HERO for tablet/mobile (no side columns shown) */}
          <div className="lg:hidden w-full flex flex-col items-center justify-center">
            <Hero
              onEnterArchive={() => {
                const el = document.getElementById("our-song");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>

          {/* MOBILE & TABLET SCRAPBOOK STRIP (Visible below hero on smaller screens) */}
          <div className="lg:hidden w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 justify-items-center z-20">
            <Polaroid
              imageSrc="/images/diya1.jpeg"
              caption="my favourite place is anywhere with you ♡"
              rotation={-3}
              hasPaperclip={true}
              className="w-64"
            />
            <Polaroid
              imageSrc="/images/diya%203.jpeg"
              caption="different days same favourite person ♡"
              rotation={3}
              hasNeonHeart={true}
              className="w-64"
            />
            <ScrapbookChecklist rotation={-2} />
            <div className="flex flex-col items-center gap-4">
              <ScrapbookWishes rotation={2} />
              <LoveLetterEnvelope rotation={-4} />
            </div>
          </div>
        </div>

        {/* 4. Bottom Glassmorphic Music Player flanked by Apology Letters & Scroll Indicator */}
        <div id="our-song" className="relative z-20 w-full pt-8 sm:pt-12 flex flex-col items-center gap-6">
          {/* Responsive Layout: [Letter 1] [Music Player] [Letter 2] on Desktop, Stacked on Mobile */}
          <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-8 xl:gap-14 px-2">
            {/* LETTER 1 (Left on desktop, Top on mobile) */}
            <div className="flex justify-center items-center order-1">
              <ApologyLetter
                envelopeTitle="for my chotu ♡"
                letterContent={apologyLetter1}
                variant="pink"
                rotation={-3}
              />
            </div>

            {/* MUSIC PLAYER (Center on desktop, Middle on mobile) */}
            <div className="w-full max-w-md shrink-0 order-2">
              <MusicPlayer
                initialTrack="Love Me Like You Do"
                artist="Ellie Goulding"
                audioSrc="/music/love-me-like-you-do.mp3"
                albumArt="/images/image.png"
                onTimeUpdateProp={handleAudioTimeUpdate}
                onPlayStateChange={handleAudioPlayStateChange}
                seekTimestamp={seekTimestamp}
              />
            </div>

            {/* LETTER 2 (Right on desktop, Bottom on mobile) */}
            <div className="flex justify-center items-center order-3">
              <ApologyLetter
                envelopeTitle="one more thing... 💌"
                letterContent={apologyLetter2}
                variant="purple"
                rotation={3}
              />
            </div>
          </div>

          {/* Scroll to explore our story */}
          <a
            href="#lyrics-section"
            className="flex flex-col items-center gap-1.5 text-purple-200/70 hover:text-pink-300 transition-colors cursor-pointer group"
          >
            <div className="w-5 h-8 rounded-full border-2 border-purple-300/50 flex items-start justify-center p-1 group-hover:border-pink-400 transition-colors">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-pink-400 rounded-full shadow-[0_0_6px_#ff2d75]"
              />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase font-mono">
              SCROLL TO VIEW SYNCHRONIZED LYRICS
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-pink-400" />
          </a>
        </div>
      </div>

      {/* 5. Synchronized Romantic Lyrics Section */}
      <div id="lyrics-section">
        <RomanticLyricsSection
          currentTime={currentAudioTime}
          isPlaying={isAudioPlaying}
          onSeek={handleLyricSeek}
        />
      </div>

      {/* 6. Second Fold: Memories & Scrapbook Story Section */}
      <section id="memories" className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-pink-400/40 text-pink-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Chapter By Chapter</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-bubble title-happy mb-4">
            Our Little Universe 🌌
          </h2>
          <p className="font-handwriting text-xl sm:text-2xl text-purple-200 font-bold max-w-xl mx-auto">
            "In every timeline, every galaxy, and every life — I'd still choose you."
          </p>
        </div>

        {/* Polaroid Memory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-center justify-items-center">
          <Polaroid
            imageSrc="/images/diya 4.jpeg"
            caption="Where it all started"
            subcaption="Still my favourite view ❤️"
            rotation={-5}
            hasPaperclip={true}
            className="w-64 sm:w-72 max-w-full"
          />
          <Polaroid
            imageSrc="/images/diya 5.jpeg"
            caption="Stargazing & long talks"
            subcaption="Anywhere with you >>> ✨"
            rotation={3}
            hasWashiTape={true}
            tapeColor="bg-purple-300/40"
            className="w-64 sm:w-72 max-w-full"
          />
          <Polaroid
            imageSrc="/images/diya2.jpeg"
            caption="Here's to you, my person."
            subcaption="Still obsessed with you, btw 😘"
            rotation={6}
            hasNeonHeart={true}
            className="w-64 sm:w-72 max-w-full"
          />
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center">
          <p className="font-handwriting text-2xl text-pink-300 font-bold drop-shadow-[0_0_8px_#ff2d75]">
            Made with all my heart ♡
          </p>
        </div>
      </section>

      {/* 7. New Interactive Forgiveness Section (Final Chapter) */}
      <ForgivenessSection />

      {/* Interactive Modal Handler */}
      <InteractiveModal
        isOpen={modalType !== null}
        type={modalType || ""}
        onClose={() => setModalType(null)}
      />
    </div>
  );
}
