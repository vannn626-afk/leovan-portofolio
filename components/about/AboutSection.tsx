'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LEOVAN_PROFILE, type FavoriteItem } from '../../data/profile';
import { CharacterShowcase } from '../character/CharacterShowcase';
import { CinematicButton } from '../ui/CinematicButton';
import {
  SkewHeadlineReveal,
  SlashWipeReveal,
  PerspectiveCardReveal,
  StaggeredGridReveal,
  StaggerItemReveal,
} from '../animations/ScrollReveal';

function FavoriteSvgIllustration({ type }: { type: FavoriteItem['svgType'] }) {
  if (type === 'noodle-bowl') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        className="w-10 h-10 text-[#E60023]"
        aria-hidden="true"
      >
        <path
          d="M10 30h44c0 12-9 22-22 22S10 42 10 30z"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path d="M22 52h20v4H22z" fill="#FFFFFF" />
        <path
          d="M16 14l34-6M16 20l34-4"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="square"
        />
        <path
          d="M22 18c0 5-2 7-2 12M30 16c0 6-2 8-2 14M38 15c0 6-2 9-2 15"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    );
  }
  if (type === 'iced-tea') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        className="w-10 h-10 text-[#E60023]"
        aria-hidden="true"
      >
        <polygon
          points="18,16 46,16 42,56 22,56"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path d="M36 6L28 48" stroke="#FFFFFF" strokeWidth="2.5" />
        <rect x="24" y="24" width="7" height="7" stroke="#FFFFFF" strokeWidth="2" />
        <rect x="33" y="28" width="7" height="7" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    );
  }
  if (type === 'spider-web') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        className="w-10 h-10 text-[#E60023]"
        aria-hidden="true"
      >
        {/* Original Geometric Web Pattern (Non-Copyrighted Vector Geometry) */}
        <path
          d="M32 6v52M6 32h52M14 14l36 36M50 14L14 50"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <polygon
          points="32,16 44,20 48,32 44,44 32,48 20,44 16,32 20,20"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        <polygon
          points="32,24 38,26 40,32 38,38 32,40 26,38 24,32 26,26"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className="w-10 h-10 text-[#E60023]"
      aria-hidden="true"
    >
      <polygon
        points="32,6 54,18 46,48 32,58 18,48 10,18"
        stroke="currentColor"
        strokeWidth="3"
      />
      <polygon points="32,16 42,32 32,46 22,32" fill="#FFFFFF" />
    </svg>
  );
}

export function AboutSection({ isStandalonePage = false }: { isStandalonePage?: boolean }) {
  return (
    <section
      id="about-section"
      aria-labelledby="about-heading"
      className="relative py-20 sm:py-28 border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Kicker & Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SkewHeadlineReveal>
            <div className="font-mono text-xs tracking-[0.25em] text-[#E60023] uppercase font-semibold mb-2">
              01. THE DEVELOPER PROFILE
            </div>
            <h2
              id="about-heading"
              className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white"
            >
              BEHIND THE <span className="text-[#E60023]">CODE.</span>
            </h2>
          </SkewHeadlineReveal>

          <SlashWipeReveal direction="right" delay={0.12}>
            <div className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white bg-[#E60023] px-5 py-2 -skew-x-12">
              <span className="block skew-x-12">BERAWAL DARI GABUT.</span>
            </div>
          </SlashWipeReveal>
        </div>

        {/* Main Split Grid: Biography + Personal Data Panel & Character */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Full Authentic Indonesian Biography */}
          <PerspectiveCardReveal fromSide="left" className="lg:col-span-7">
            <div className="bg-[#080808]/95 border border-white/20 p-6 sm:p-10 relative">
              {/* Corner Red Slash Accent */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-16 h-16 bg-[#E60023]"
                style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
              />

              <div className="font-mono text-xs tracking-widest text-[#A0A0A0] uppercase mb-3">
                PERSONAL INTRODUCTION // INDONESIAN
              </div>

              <SlashWipeReveal direction="left" delay={0.08}>
                <div className="mb-6 inline-block bg-[#030303] border border-[#E60023]/60 px-4 py-2 font-mono text-xs sm:text-sm text-white tracking-wider">
                  <span className="text-[#E60023] font-bold">IDENTITY:</span> LEOVAN Who knows as{' '}
                  <span className="text-white font-bold underline decoration-[#E60023] underline-offset-4">
                    Mohammad Sofandi
                  </span>
                </div>
              </SlashWipeReveal>

              <StaggeredGridReveal className="space-y-4 text-base sm:text-lg text-white/90 leading-relaxed" staggerChildren={0.08}>
                {LEOVAN_PROFILE.biographyParagraphs.map((paragraph, idx) => (
                  <StaggerItemReveal key={idx}>
                    <p
                      className={
                        idx === 0
                          ? 'font-display text-2xl sm:text-3xl font-bold text-white'
                          : idx === LEOVAN_PROFILE.biographyParagraphs.length - 1
                          ? 'text-white font-semibold border-t border-white/15 pt-4 mt-6'
                          : 'text-[#A0A0A0]'
                      }
                    >
                      {paragraph}
                    </p>
                  </StaggerItemReveal>
                ))}
              </StaggeredGridReveal>

              {/* Personal Data Matrix Table */}
              <div className="mt-10 pt-8 border-t border-white/15">
                <div className="font-mono text-xs tracking-widest text-[#E60023] uppercase mb-4">
                  DEVELOPER SPECIFICATION MATRIX
                </div>
                <StaggeredGridReveal className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerChildren={0.06}>
                  {LEOVAN_PROFILE.personalDataPanel.map((attr) => (
                    <StaggerItemReveal key={attr.label}>
                      <div className="bg-[#030303] border border-white/15 hover:border-[#E60023] transition-colors p-4 flex flex-col justify-between h-full">
                        <dt className="font-mono text-[11px] tracking-widest text-[#A0A0A0] uppercase">
                          {attr.label}
                        </dt>
                        <dd className="mt-1 font-display text-lg font-bold text-white uppercase tracking-wide tabular-nums">
                          {attr.value}
                        </dd>
                      </div>
                    </StaggerItemReveal>
                  ))}
                </StaggeredGridReveal>
              </div>

              {!isStandalonePage && (
                <div className="mt-8">
                  <CinematicButton href="/about" variant="secondary" size="md">
                    READ FULL BIOGRAPHY
                  </CinematicButton>
                </div>
              )}
            </div>
          </PerspectiveCardReveal>

          {/* Right Column: Character Composition & Journey Phases */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <CharacterShowcase
              variant="about"
              captionLabel="SUKAGUMIWANG // INDRAMAYU"
            />

            {/* Curiosity to Creation Phases */}
            <PerspectiveCardReveal fromSide="right" delay={0.1}>
              <div className="bg-[#080808]/95 border border-white/20 p-6 space-y-5">
                <div className="font-mono text-xs tracking-widest text-[#E60023] uppercase">
                  FROM CURIOSITY TO CREATION
                </div>
                <StaggeredGridReveal className="space-y-5" staggerChildren={0.1}>
                  {LEOVAN_PROFILE.journeyPhases.map((phase) => (
                    <StaggerItemReveal key={phase.index}>
                      <div className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-sm font-bold text-[#E60023] tabular-nums">
                            {phase.index}.
                          </span>
                          <h3 className="font-display text-lg font-bold text-white uppercase">
                            {phase.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-[#A0A0A0] leading-relaxed">
                          {phase.detail}
                        </p>
                      </div>
                    </StaggerItemReveal>
                  ))}
                </StaggeredGridReveal>
              </div>
            </PerspectiveCardReveal>
          </div>
        </div>

        {/* Section 15: PERSONALITY — OUTSIDE THE SCREEN (OFF THE GRID) */}
        <div className="mt-20 pt-16 border-t border-white/15">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SkewHeadlineReveal>
              <div className="font-mono text-xs tracking-[0.25em] text-[#E60023] uppercase font-semibold mb-2">
                02. PERSONALITY — OUTSIDE THE SCREEN
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                OFF THE <span className="text-[#E60023]">GRID.</span>
              </h3>
            </SkewHeadlineReveal>

            <motion.p
              initial={{ opacity: 0, x: 36, skewX: 12 }}
              whileInView={{ opacity: 1, x: 0, skewX: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs text-[#A0A0A0] uppercase tracking-widest"
            >
              AUTHENTIC FAVORITES · DAILY FUEL & INSPIRATION
            </motion.p>
          </div>

          <StaggeredGridReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerChildren={0.09}
          >
            {LEOVAN_PROFILE.favorites.map((item) => (
              <StaggerItemReveal key={item.id} className="h-full">
                <div
                  className="group bg-[#080808] border border-white/20 hover:border-[#E60023] p-6 transition-all duration-200 flex flex-col justify-between relative overflow-hidden h-full"
                  style={{
                    clipPath: 'polygon(0 0, 94% 0, 100% 8%, 100% 100%, 0 100%)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="font-mono text-[11px] tracking-widest text-[#E60023] uppercase font-semibold">
                        {item.category}
                      </span>
                      <FavoriteSvgIllustration type={item.svgType} />
                    </div>
                    <h4 className="font-display text-2xl font-extrabold text-white uppercase tracking-wide mb-1">
                      {item.title}
                    </h4>
                    <div className="font-mono text-[11px] text-white/60 uppercase tracking-wider mb-3">
                      {item.subtitle}
                    </div>
                    <p className="text-sm text-[#A0A0A0] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/70">
                    <span>LEOVAN PICK</span>
                    <span className="text-[#E60023] font-bold">VERIFIED</span>
                  </div>
                </div>
              </StaggerItemReveal>
            ))}
          </StaggeredGridReveal>
        </div>
      </div>
    </section>
  );
}
