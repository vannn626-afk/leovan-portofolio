'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LEOVAN_PROJECTS, type ProjectItem } from '../../data/projects';
import { calculateCardTilt } from '../../lib/portfolio-logic';
import { CharacterShowcase } from '../character/CharacterShowcase';
import { CinematicButton } from '../ui/CinematicButton';
import {
  SkewHeadlineReveal,
  SlashWipeReveal,
  PerspectiveCardReveal,
  StaggeredGridReveal,
  StaggerItemReveal,
} from '../animations/ScrollReveal';

function ProjectArchiveCard({ project, index }: { project: ProjectItem; index: number }) {
  const cardRef = React.useRef<HTMLElement>(null);
  const rafRef = React.useRef<number>(0);
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
    const normY = (e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const { rotateX, rotateY } = calculateCardTilt(normX, normY, 6);
      cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <PerspectiveCardReveal fromSide={index % 2 === 0 ? 'left' : 'right'} delay={0.05}>
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
        }}
        className="group relative bg-[#080808] border-2 border-white/20 hover:border-[#E60023] transition-all duration-200 p-6 sm:p-10 shadow-[8px_8px_0px_#E60023] will-change-transform"
        data-testid={`project-card-${project.id}`}
      >
        {/* Top Row: Oversized Project Number & Category */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6">
          <div className="flex items-baseline gap-4">
            <motion.span
              initial={{ scale: 0.5, rotate: -14, x: -24 }}
              whileInView={{ scale: 1, rotate: 0, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl font-black text-[#E60023] tabular-nums leading-none inline-block"
            >
              {project.number}
            </motion.span>
            <div>
              <div className="font-mono text-xs tracking-[0.2em] text-[#A0A0A0] uppercase">
                PROJECT {project.number} · {project.category}
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mt-1">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="font-mono text-xs text-white/80 uppercase tracking-widest">
            {project.url.replace('https://', '')}
          </div>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-center">
          {/* Left: Description & Interactive Feature Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <SlashWipeReveal direction="left" delay={0.08}>
              <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
                &ldquo;{project.description}&rdquo;
              </p>
            </SlashWipeReveal>
            <p className="text-sm text-[#A0A0A0] leading-relaxed">
              {project.architectureNotes}
            </p>

            {/* Interactive Feature Selector */}
            <div>
              <div className="font-mono text-xs tracking-widest text-[#E60023] uppercase mb-3">
                KEY PLATFORM CAPABILITIES
              </div>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feat, idx) => (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => setActiveFeatureIdx(idx)}
                    className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                      activeFeatureIdx === idx
                        ? 'bg-[#E60023] text-white border-white font-bold'
                        : 'bg-[#030303] text-[#A0A0A0] border-white/20 hover:text-white hover:border-[#E60023]'
                    }`}
                  >
                    0{idx + 1}. {feat}
                  </button>
                ))}
              </div>
            </div>

            {/* Highlight Matrix */}
            <StaggeredGridReveal className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2" staggerChildren={0.07}>
              {project.highlights.map((h) => (
                <StaggerItemReveal key={h.label}>
                  <div className="bg-[#030303] border border-white/15 p-3 h-full">
                    <dt className="font-mono text-[10px] text-[#A0A0A0] uppercase tracking-wider">
                      {h.label}
                    </dt>
                    <dd className="font-display text-sm font-bold text-white uppercase mt-1">
                      {h.value}
                    </dd>
                  </div>
                </StaggerItemReveal>
              ))}
            </StaggeredGridReveal>
          </div>

          {/* Right: Stylized Graphic Preview Blueprint */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ scale: 0.85, rotateY: 22, skewY: -4, opacity: 0 }}
              whileInView={{ scale: 1, rotateY: 0, skewY: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.62, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#030303] border border-[#E60023] p-6 overflow-hidden min-h-[240px] flex flex-col justify-between"
              style={{
                clipPath: 'polygon(0 0, 94% 0, 100% 10%, 100% 100%, 6% 100%, 0 90%)',
              }}
            >
              {/* Diagonal Red Graphic Slash */}
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 w-40 h-40 bg-[#E60023]/20 rotate-45 pointer-events-none"
              />
              <div className="flex items-center justify-between font-mono text-xs text-[#A0A0A0] border-b border-white/15 pb-3">
                <span>LIVE DEPLOYMENT</span>
                <span className="text-[#E60023] font-bold">HTTPS</span>
              </div>

              <div className="my-6">
                <div className="font-mono text-[11px] text-[#E60023] uppercase tracking-widest">
                  ACTIVE MODULE PREVIEW
                </div>
                <div className="font-display text-2xl sm:text-3xl font-black text-white uppercase mt-1">
                  {project.features[activeFeatureIdx]}
                </div>
                <div className="mt-2 font-mono text-xs text-[#A0A0A0]">
                  {project.shortTitle}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/15 pt-3 font-mono text-xs text-white">
                <span>{project.url}</span>
                <span className="text-[#E60023]">READY</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="border-t border-white/15 pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-xs text-[#A0A0A0] uppercase tracking-wider">
            DIRECT DESTINATION: <span className="text-white">{project.url}</span>
          </div>
          <CinematicButton
            href={project.url}
            external
            variant="primary"
            size="md"
            ariaLabel={`${project.cta} - ${project.name}`}
          >
            {project.cta}
          </CinematicButton>
        </div>
      </article>
    </PerspectiveCardReveal>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects-section"
      aria-labelledby="projects-heading"
      className="relative py-20 sm:py-28 border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Split Header with Character Companion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <SkewHeadlineReveal>
              <div className="font-mono text-xs tracking-[0.25em] text-[#E60023] uppercase font-semibold mb-2">
                04. DIGITAL DEPLOYMENTS & PLATFORMS
              </div>
              <h2
                id="projects-heading"
                className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white mb-4"
              >
                THE <span className="text-[#E60023]">ARCHIVE.</span>
              </h2>
            </SkewHeadlineReveal>
            <SlashWipeReveal direction="left" delay={0.12}>
              <p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl leading-relaxed mt-4">
                Project digital yang dibangun dan dikembangkan langsung oleh LEOVAN. Setiap
                platform dirancang agar fungsional, responsif, dan bisa langsung diakses
                oleh pengguna.
              </p>
            </SlashWipeReveal>
          </div>

          <div className="lg:col-span-5">
            <CharacterShowcase
              variant="projects"
              captionLabel="ARCHIVE CURATOR // LEOVAN"
            />
          </div>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-12">
          {LEOVAN_PROJECTS.map((project, idx) => (
            <ProjectArchiveCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
