'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LEOVAN_PROFILE } from '../../data/profile';
import { CharacterShowcase } from '../character/CharacterShowcase';
import { CinematicButton } from '../ui/CinematicButton';
import {
  SkewHeadlineReveal,
  SlashWipeReveal,
  PerspectiveCardReveal,
} from '../animations/ScrollReveal';

export function AchievementsSection({ isStandalonePage = false }: { isStandalonePage?: boolean }) {
  return (
    <section
      id="achievements-section"
      aria-labelledby="achievements-heading"
      className="relative py-20 sm:py-28 border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SkewHeadlineReveal>
            <div className="font-mono text-xs tracking-[0.25em] text-[#E60023] uppercase font-semibold mb-2">
              05. PERSONAL GAMING RECORD
            </div>
            <h2
              id="achievements-heading"
              className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white"
            >
              BEYOND <span className="text-[#E60023]">DEVELOPMENT.</span>
            </h2>
          </SkewHeadlineReveal>

          <SlashWipeReveal direction="right" delay={0.1}>
            <div className="font-mono text-xs text-[#A0A0A0] uppercase tracking-widest">
              COMPETITIVE DISCIPLINE · STRATEGIC EXECUTION
            </div>
          </SlashWipeReveal>
        </div>

        {/* Main Immortal Showcase Panel */}
        <PerspectiveCardReveal fromSide="left" delay={0.06}>
          <div className="relative bg-[#080808] border-2 border-[#E60023] p-6 sm:p-12 overflow-hidden shadow-[10px_10px_0px_#990019]">
            {/* Angular Crimson Graphic Slash Background */}
            <motion.div
              aria-hidden="true"
              initial={{ x: '-50%', opacity: 0 }}
              whileInView={{ x: '0%', opacity: 0.25 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(125deg, transparent 0%, transparent 45%, #E60023 45%, #990019 72%, transparent 72%)',
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left: Oversized IMMORTAL Typography & Game Details */}
              <div className="lg:col-span-7 space-y-6">
                <SlashWipeReveal direction="left" delay={0.08}>
                  <div className="inline-block bg-[#E60023] text-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest -skew-x-12">
                    <span className="block skew-x-12">HIGHEST TIER ACHIEVED</span>
                  </div>
                </SlashWipeReveal>

                <motion.div
                  initial={{ opacity: 0, x: -40, skewX: -12 }}
                  whileInView={{ opacity: 1, x: 0, skewX: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="font-mono text-xs tracking-[0.25em] text-[#A0A0A0] uppercase mb-1">
                    GAME TITLE
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wide">
                    {LEOVAN_PROFILE.game}
                  </div>
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.68,
                    x: -60,
                    skewX: -18,
                    rotateZ: -4,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    skewX: 0,
                    rotateZ: 0,
                  }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="font-mono text-xs tracking-[0.25em] text-[#E60023] uppercase mb-2">
                    COMPETITIVE RANK
                  </div>
                  {/* Oversized IMMORTAL Display Typography */}
                  <div className="font-display text-4xl sm:text-6xl xl:text-[4.25rem] font-black uppercase tracking-tight text-white leading-none drop-shadow-[5px_5px_0px_#E60023]">
                    {LEOVAN_PROFILE.rank}
                  </div>
                </motion.div>

                <SlashWipeReveal direction="up" delay={0.22}>
                  <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed max-w-xl">
                    Di luar menulis kode dan merakit aplikasi web, kompetitif di{' '}
                    <span className="text-white font-semibold">Mobile Legends: Bang Bang</span>{' '}
                    hingga menembus rank{' '}
                    <span className="text-[#E60023] font-bold">IMMORTAL</span> melatih
                    pengambilan keputusan cepat, koordinasi strategi, dan fokus di bawah tekanan.
                  </p>
                </SlashWipeReveal>

                {/* Unboxed Attribute Row */}
                <motion.div
                  initial={{ opacity: 0, y: 24, skewX: -10 }}
                  whileInView={{ opacity: 1, y: 0, skewX: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 font-mono text-xs text-white uppercase tracking-wider"
                >
                  <span>PLAYER: LEOVAN</span>
                  <span aria-hidden="true" className="text-[#E60023]">
                    /
                  </span>
                  <span>GAME: MOBILE LEGENDS: BANG BANG</span>
                  <span aria-hidden="true" className="text-[#E60023]">
                    /
                  </span>
                  <span className="text-[#E60023] font-bold">TIER: IMMORTAL</span>
                </motion.div>

                {!isStandalonePage && (
                  <div className="pt-2">
                    <CinematicButton href="/achievements" variant="secondary" size="md">
                      VIEW ACHIEVEMENT RECORD
                    </CinematicButton>
                  </div>
                )}
              </div>

              {/* Right: Protagonist Character Composition */}
              <div className="lg:col-span-5">
                <CharacterShowcase
                  variant="achievements"
                  captionLabel="RANK // IMMORTAL"
                />
              </div>
            </div>
          </div>
        </PerspectiveCardReveal>
      </div>
    </section>
  );
}
