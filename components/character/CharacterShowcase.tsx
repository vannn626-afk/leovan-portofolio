'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { LEOVAN_PROFILE } from '../../data/profile';

export type CharacterPlacementVariant =
  | 'hero'
  | 'about'
  | 'projects'
  | 'achievements'
  | 'contact';

interface CharacterShowcaseProps {
  variant?: CharacterPlacementVariant;
  captionLabel?: string;
  className?: string;
}

export function CharacterShowcase({
  variant = 'hero',
  captionLabel = 'PROTAGONIST // LEOVAN IDENTITY',
  className = '',
}: CharacterShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(LEOVAN_PROFILE.characterAssetPath);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    let isInViewport = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isInViewport = entries[0].isIntersecting;
        }
      },
      { rootMargin: '150px' }
    );
    observer.observe(el);

    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isInViewport) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const nx = (e.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
        const ny = (e.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;

        if (layer1Ref.current) {
          layer1Ref.current.style.transform = `translate3d(${nx * -14}px, ${ny * -10}px, -40px) rotateY(${
            nx * 4
          }deg) rotateX(${ny * -4}deg)`;
        }
        if (layer2Ref.current) {
          layer2Ref.current.style.transform = `translate3d(${nx * -7}px, ${ny * -5}px, -15px)`;
        }
        if (layer3Ref.current) {
          layer3Ref.current.style.transform = `translate3d(${nx * 12}px, ${ny * 8}px, 25px) rotateY(${
            nx * 5
          }deg) rotateX(${ny * -3.5}deg)`;
        }
        if (layer4Ref.current) {
          layer4Ref.current.style.transform = `translate3d(${nx * 18}px, ${ny * 12}px, 45px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const heightClasses = {
    hero: 'h-[380px] sm:h-[460px] lg:h-[580px]',
    about: 'h-[340px] sm:h-[420px] lg:h-[500px]',
    projects: 'h-[300px] sm:h-[360px] lg:h-[420px]',
    achievements: 'h-[340px] sm:h-[420px] lg:h-[480px]',
    contact: 'h-[300px] sm:h-[360px] lg:h-[440px]',
  }[variant];

  const isHero = variant === 'hero';
  const targetOuterState = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotateY: 0,
    rotateZ: 0,
    skewX: 0,
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{
        opacity: 0,
        x: 56,
        y: 36,
        scale: 0.84,
        rotateY: -22,
        rotateZ: 4,
        skewX: -8,
      }}
      animate={isHero ? targetOuterState : undefined}
      whileInView={!isHero ? targetOuterState : undefined}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative w-full ${heightClasses} select-none flex items-center justify-center will-change-transform ${className}`}
      style={{ perspective: '1100px' }}
      data-testid={`character-showcase-${variant}`}
    >
      {/* Layer 1 (Deep Background): Angular Crimson & Obsidian Comic Panel Slash */}
      <div
        ref={layer1Ref}
        aria-hidden="true"
        className="absolute inset-x-4 inset-y-6 pointer-events-none transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: 'translate3d(0px, 0px, -40px) rotateY(0deg) rotateX(0deg)',
        }}
      >
        <motion.div
          initial={{ scale: 0.65, rotate: -12, x: 40 }}
          animate={isHero ? { scale: 1, rotate: 0, x: 0 } : undefined}
          whileInView={!isHero ? { scale: 1, rotate: 0, x: 0 } : undefined}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full bg-[#080808]/90 border-2 border-[#E60023]"
          style={{
            clipPath: 'polygon(8% 0%, 100% 4%, 92% 100%, 0% 94%)',
          }}
        >
          {/* Halftone & Diagonal Red Slash Inside Panel */}
          <div className="w-full h-full relative overflow-hidden">
            <motion.div
              initial={{ x: '-100%', skewX: -20 }}
              animate={isHero ? { x: '0%', skewX: 0 } : undefined}
              whileInView={!isHero ? { x: '0%', skewX: 0 } : undefined}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -inset-8 bg-[#E60023]/85"
              style={{
                clipPath: 'polygon(62% 0%, 100% 0%, 38% 100%, 0% 100%)',
              }}
            />
            <div className="absolute inset-0 halftone-overlay opacity-35" />
          </div>
        </motion.div>
      </div>

      {/* Layer 2 (Mid-Back): Secondary White & Dark Red Offset Geometry */}
      <div
        ref={layer2Ref}
        aria-hidden="true"
        className="absolute inset-x-8 inset-y-10 pointer-events-none transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: 'translate3d(0px, 0px, -15px)',
        }}
      >
        <motion.div
          initial={{ scale: 1.18, rotate: 8, opacity: 0 }}
          animate={isHero ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
          whileInView={!isHero ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full border border-white/25"
          style={{
            clipPath: 'polygon(0% 12%, 96% 0%, 100% 88%, 4% 100%)',
          }}
        />
      </div>

      {/* Layer 3 (Primary Protagonist): Exact User-Supplied Character Artwork */}
      <div
        ref={layer3Ref}
        className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-150 ease-out will-change-transform"
        style={{
          transform: 'translate3d(0px, 0px, 25px) rotateY(0deg) rotateX(0deg)',
        }}
      >
        {/* Subtle Rim Glow Behind Character */}
        <div
          aria-hidden="true"
          className="absolute w-3/4 h-3/4 rounded-full bg-[#E60023]/25 blur-2xl pointer-events-none"
        />

        <motion.img
          initial={{ y: 48, scale: 0.78, rotateZ: -5 }}
          animate={isHero ? { y: 0, scale: 1, rotateZ: 0 } : undefined}
          whileInView={!isHero ? { y: 0, scale: 1, rotateZ: 0 } : undefined}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.68, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          src={imgSrc}
          alt="LEOVAN Main Portfolio Character"
          referrerPolicy="no-referrer"
          decoding="async"
          onError={() => {
            if (
              imgSrc !==
              '/assets/aistudio/Picsart_26-11-07_12-37-25-519_7283776c.png'
            ) {
              setImgSrc(
                '/assets/aistudio/Picsart_26-11-07_12-37-25-519_7283776c.png'
              );
            }
          }}
          className="relative z-10 w-full h-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.92)] pointer-events-none"
        />
      </div>

      {/* Layer 4 (Foreground Frame Accents): Sharp Corner Graphic & Caption Strip */}
      <div
        ref={layer4Ref}
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: 'translate3d(0px, 0px, 45px)',
        }}
      >
        {/* Top-Left Angular Corner */}
        <motion.svg
          initial={{ x: -24, y: -24, scale: 0.6 }}
          animate={isHero ? { x: 0, y: 0, scale: 1 } : undefined}
          whileInView={!isHero ? { x: 0, y: 0, scale: 1 } : undefined}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewBox="0 0 80 80"
          className="absolute top-2 left-2 w-12 h-12 text-[#E60023]"
          fill="none"
        >
          <path d="M4 44 L4 4 L44 4" stroke="currentColor" strokeWidth="4" />
          <polygon points="12,12 28,12 12,28" fill="#FFFFFF" />
        </motion.svg>

        {/* Bottom-Right Caption Bar */}
        <motion.div
          initial={{ x: 36, skewX: -16, scale: 0.85 }}
          animate={isHero ? { x: 0, skewX: 0, scale: 1 } : undefined}
          whileInView={!isHero ? { x: 0, skewX: 0, scale: 1 } : undefined}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-2 right-2 bg-[#080808] border border-[#E60023] px-3.5 py-1.5 shadow-[4px_4px_0px_#E60023]"
          style={{ clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)' }}
        >
          <span className="font-mono text-[11px] tracking-widest text-white uppercase">
            {captionLabel}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
