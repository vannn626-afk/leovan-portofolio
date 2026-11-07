'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LEOVAN_PROFILE } from '../../data/profile';
import { CharacterShowcase } from '../character/CharacterShowcase';
import { CinematicButton } from '../ui/CinematicButton';
import { LeovanWordmarkSVG } from '../ui/LeovanLogo';

export function HeroSection() {
  const [heroAnimKey, setHeroAnimKey] = useState(0);

  useEffect(() => {
    const handleIntroDone = () => {
      setHeroAnimKey((prev) => prev + 1);
    };
    window.addEventListener('leovan:intro-complete', handleIntroDone);
    return () => window.removeEventListener('leovan:intro-complete', handleIntroDone);
  }, []);

  return (
    <section
      aria-labelledby="hero-main-heading"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between py-10 sm:py-16 overflow-hidden"
    >
      {/* Background Angular Red Slash Accent */}
      <motion.div
        key={`bg-slash-${heroAnimKey}`}
        aria-hidden="true"
        initial={{ x: 180, rotate: -12, scale: 0.75, opacity: 0 }}
        animate={{ x: 0, rotate: -12, scale: 1, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-24 top-8 w-[520px] h-[520px] bg-[#E60023]/10 pointer-events-none"
        style={{ clipPath: 'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto">
        <div
          key={`hero-grid-${heroAnimKey}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center"
        >
          {/* LEFT COLUMN: Editorial Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Top Identity Kicker with Sweeping Crimson Slash */}
            <motion.div
              initial={{ opacity: 0, x: -56, skewX: -14, scale: 0.88 }}
              animate={{ opacity: 1, x: 0, skewX: 0, scale: 1 }}
              transition={{ duration: 0.58, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden mb-4"
            >
              <motion.span
                aria-hidden="true"
                initial={{ x: '-105%', skewX: -18 }}
                animate={{ x: '115%', skewX: -18 }}
                transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-y-0 -inset-x-4 z-20 bg-gradient-to-r from-transparent via-[#E60023] to-white/90"
              />
              <div className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[#E60023] uppercase font-semibold">
                {LEOVAN_PROFILE.heroTopLabel}
              </div>
            </motion.div>

            {/* Main Brand Wordmark & Accessible H1 */}
            <h1 id="hero-main-heading" className="sr-only">
              {LEOVAN_PROFILE.brandName} — {LEOVAN_PROFILE.mainSlogan}
            </h1>
            <motion.div
              initial={{ opacity: 0, x: -64, skewX: -16, scale: 0.86 }}
              animate={{ opacity: 1, x: 0, skewX: 0, scale: 1 }}
              transition={{ duration: 0.62, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4"
            >
              <LeovanWordmarkSVG className="h-14 sm:h-20 md:h-24 w-auto max-w-full" animated />
            </motion.div>

            {/* Slogan Headline with Diagonal Slash Curtain */}
            <motion.div
              initial={{ opacity: 0, x: -56, y: 18, skewX: -12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, skewX: 0, scale: 1 }}
              transition={{ duration: 0.62, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden mb-6"
            >
              <motion.span
                aria-hidden="true"
                initial={{ x: '-105%', skewX: -18 }}
                animate={{ x: '115%', skewX: -18 }}
                transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-y-0 -inset-x-6 z-20 bg-gradient-to-r from-transparent via-[#E60023] to-white/90"
              />
              <p
                className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight uppercase text-white leading-[1.03]"
                style={{ textWrap: 'balance' }}
              >
                CREATING BEYOND <span className="text-[#E60023]">THE SCREEN.</span>
              </p>
            </motion.div>

            {/* Biography Lead */}
            <motion.p
              initial={{ opacity: 0, y: 32, skewX: -8, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, skewX: 0, scale: 1 }}
              transition={{ duration: 0.58, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed max-w-2xl mb-6"
            >
              {LEOVAN_PROFILE.heroDescription}
            </motion.p>

            {/* Unboxed Status Metadata (Zero-Pill Discipline) */}
            <motion.div
              initial={{ opacity: 0, x: -48, skewX: -12, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, skewX: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.2em] text-white/90 uppercase border-y border-white/15 py-3 w-full max-w-xl mb-8"
            >
              {LEOVAN_PROFILE.statusIndicators.map((status, idx) => (
                <React.Fragment key={status}>
                  {idx > 0 && (
                    <span aria-hidden="true" className="text-[#E60023] font-bold">
                      /
                    </span>
                  )}
                  <span>{status}</span>
                </React.Fragment>
              ))}
              <span aria-hidden="true" className="text-[#E60023] font-bold">
                /
              </span>
              <span className="text-[#A0A0A0]">AGE 14</span>
              <span aria-hidden="true" className="text-[#E60023] font-bold">
                /
              </span>
              <span className="text-[#E60023] font-bold">RANK: IMMORTAL</span>
            </motion.div>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.9, skewX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, skewX: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <CinematicButton href="/projects" variant="primary" size="lg">
                DISCOVER MY WORK
              </CinematicButton>
              <CinematicButton href="/contact" variant="secondary" size="lg">
                CONTACT ME
              </CinematicButton>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Main Uploaded Character Artwork with 2.5D Parallax */}
          <div className="lg:col-span-5 w-full">
            <CharacterShowcase
              variant="hero"
              captionLabel="LEOVAN // THE DIGITAL PERSONA"
            />
          </div>
        </div>
      </div>

      {/* Bottom Scroll & Secondary Slogan Bar */}
      <motion.div
        key={`hero-bottom-${heroAnimKey}`}
        initial={{ opacity: 0, y: 24, skewX: -8 }}
        animate={{ opacity: 1, y: 0, skewX: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-8 w-full pt-10"
      >
        <div className="border-t border-white/15 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#A0A0A0] uppercase tracking-widest">
          <span>{LEOVAN_PROFILE.secondarySlogan}</span>
          <a
            href="#about-section"
            className="inline-flex items-center gap-2 text-white hover:text-[#E60023] transition-colors"
          >
            <span>SCROLL TO EXPLORE</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 animate-bounce"
              aria-hidden="true"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
