'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TECH_CATEGORIES,
  LEOVAN_TECHNOLOGIES,
  type TechCategory,
  type TechItem,
} from '../../data/technologies';
import { filterTechnologies, getCategoryCount } from '../../lib/portfolio-logic';
import { useSound } from '../ui/SoundProvider';
import { CinematicButton } from '../ui/CinematicButton';
import {
  SkewHeadlineReveal,
  SlashWipeReveal,
  PerspectiveCardReveal,
} from '../animations/ScrollReveal';

export function TechStackSection({ isStandalonePage = false }: { isStandalonePage?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<TechItem>(LEOVAN_TECHNOLOGIES[0]);
  const { playSound } = useSound();

  const filteredTechs = useMemo(
    () => filterTechnologies(activeCategory, searchQuery),
    [activeCategory, searchQuery]
  );

  return (
    <section
      id="stack-section"
      aria-labelledby="stack-heading"
      className="relative py-20 sm:py-28 border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <SkewHeadlineReveal>
            <div className="font-mono text-xs tracking-[0.25em] text-[#E60023] uppercase font-semibold mb-2">
              03. TECHNOLOGY & LANGUAGES COLLECTION
            </div>
            <h2
              id="stack-heading"
              className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white"
            >
              THE <span className="text-[#E60023]">ARSENAL.</span>
            </h2>
          </SkewHeadlineReveal>

          <SlashWipeReveal direction="right" delay={0.1}>
            <p className="text-sm text-[#A0A0A0] max-w-xl leading-relaxed">
              Koleksi bahasa pemrograman, framework, basis data, dan platform yang dieksplorasi
              dan relevan dengan minat pengembangan web serta aplikasi LEOVAN.
            </p>
          </SlashWipeReveal>
        </div>

        {/* Interactive Filter Bar & Search Input */}
        <SlashWipeReveal direction="up" delay={0.08} className="mb-10">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#080808] border border-white/20 p-4">
            {/* Segmented Category Buttons */}
            <div
              role="tablist"
              aria-label="Filter Technologies by Category"
              className="flex flex-wrap items-center gap-2"
            >
              {TECH_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const count = getCategoryCount(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      playSound('click');
                      setActiveCategory(cat.id);
                      const nextItems = filterTechnologies(cat.id, searchQuery);
                      if (nextItems.length > 0) {
                        setSelectedTech(nextItems[0]);
                      }
                    }}
                    onMouseEnter={() => playSound('hover')}
                    className={`px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                      isSelected
                        ? 'bg-[#E60023] text-white border-white font-bold shadow-[3px_3px_0px_#FFFFFF]'
                        : 'bg-[#030303] text-[#A0A0A0] border-white/15 hover:text-white hover:border-[#E60023]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="ml-2 opacity-80 tabular-nums">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[240px]">
              <label htmlFor="tech-search-input" className="sr-only">
                Search Technology
              </label>
              <input
                id="tech-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technology (e.g. Next.js, Rust)..."
                className="w-full bg-[#030303] border border-white/25 focus:border-[#E60023] focus:outline-none px-4 py-2 text-xs font-mono text-white placeholder:text-[#A0A0A0]"
              />
            </div>
          </div>
        </SlashWipeReveal>

        {/* Active Spotlight Inspector Bar */}
        {selectedTech && (
          <PerspectiveCardReveal fromSide="left" delay={0.12} className="mb-10">
            <div className="bg-[#080808] border-2 border-[#E60023] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[6px_6px_0px_#990019]">
              <div className="flex items-start sm:items-center gap-5">
                <div className="w-14 h-14 shrink-0 bg-[#030303] border border-white/20 flex items-center justify-center p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={selectedTech.viewBox || '0 0 24 24'}
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                    style={{ color: selectedTech.accentHex }}
                    aria-hidden="true"
                  >
                    {selectedTech.svgPaths.map((d, i) => (
                      <path key={i} d={d} />
                    ))}
                  </svg>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#E60023] uppercase tracking-widest">
                    <span>{selectedTech.primaryCategory}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-white/80">{selectedTech.roleLabel}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase mt-0.5">
                    {selectedTech.name}
                  </h3>
                  <p className="text-sm text-[#A0A0A0] mt-1 max-w-2xl">
                    {selectedTech.description}
                  </p>
                </div>
              </div>
              <div className="font-mono text-xs text-white/70 uppercase tracking-widest shrink-0 border-t md:border-t-0 border-white/15 pt-3 md:pt-0">
                STATUS: EXPLORED & IN ARSENAL
              </div>
            </div>
          </PerspectiveCardReveal>
        )}

        {/* Technology Cards Grid */}
        {filteredTechs.length === 0 ? (
          <div className="bg-[#080808] border border-white/20 p-12 text-center">
            <p className="font-display text-xl text-white uppercase mb-2">
              NO MATCHING TECHNOLOGY FOUND
            </p>
            <p className="text-sm text-[#A0A0A0] mb-6">
              Tidak ada teknologi yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
            </p>
            <CinematicButton
              onClick={() => {
                setActiveCategory('ALL');
                setSearchQuery('');
              }}
              variant="secondary"
              size="sm"
            >
              RESET FILTER
            </CinematicButton>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredTechs.map((tech, idx) => {
                const isInspected = selectedTech?.id === tech.id;
                return (
                  <motion.button
                    key={tech.id}
                    type="button"
                    initial={{
                      opacity: 0,
                      y: 36,
                      scale: 0.85,
                      skewX: -10,
                      rotateX: 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      skewX: 0,
                      rotateX: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.86, skewX: 8 }}
                    viewport={{ once: false, amount: 0.08 }}
                    transition={{
                      duration: 0.42,
                      delay: Math.min((idx % 12) * 0.03, 0.32),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => {
                      playSound('click');
                      setSelectedTech(tech);
                    }}
                    onMouseEnter={() => {
                      playSound('hover');
                    }}
                    aria-label={`Inspect ${tech.name} (${tech.primaryCategory})`}
                    className={`group relative text-left p-4 transition-colors duration-150 cursor-pointer flex flex-col justify-between min-h-[136px] border will-change-transform ${
                      isInspected
                        ? 'bg-[#080808] border-[#E60023] shadow-[4px_4px_0px_#E60023] -translate-y-0.5'
                        : 'bg-[#080808]/90 border-white/15 hover:border-[#E60023] hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Top Row: Official Vector SVG Icon & Category Code */}
                    <div className="flex items-start justify-between gap-2 w-full">
                      <div className="w-10 h-10 bg-[#030303] border border-white/15 group-hover:border-[#E60023] flex items-center justify-center p-2 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox={tech.viewBox || '0 0 24 24'}
                          fill="currentColor"
                          className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
                          style={{ color: tech.accentHex }}
                          aria-hidden="true"
                        >
                          {tech.svgPaths.map((d, i) => (
                            <path key={i} d={d} />
                          ))}
                        </svg>
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[#A0A0A0] uppercase">
                        {tech.primaryCategory === 'PROGRAMMING LANGUAGES'
                          ? 'LANG'
                          : tech.primaryCategory === 'TOOLS & PLATFORMS'
                          ? 'TOOL'
                          : tech.primaryCategory.slice(0, 4)}
                      </span>
                    </div>

                    {/* Bottom Row: Name & Role */}
                    <div className="mt-4">
                      <div className="font-display text-base font-bold text-white uppercase tracking-wide group-hover:text-[#E60023] transition-colors">
                        {tech.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#A0A0A0] truncate mt-0.5">
                        {tech.roleLabel}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {!isStandalonePage && (
          <SlashWipeReveal direction="right" delay={0.1} className="mt-10 flex justify-end">
            <CinematicButton href="/stack" variant="secondary" size="md">
              OPEN FULL TECH ARSENAL
            </CinematicButton>
          </SlashWipeReveal>
        )}
      </div>
    </section>
  );
}
