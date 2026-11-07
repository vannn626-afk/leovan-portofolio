'use client';

import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'scale';
  withSlashBar?: boolean;
}

/**
 * SlashWipeReveal
 * Reveals content with a Persona-inspired diagonal crimson & white slash curtain
 * sweeping across the container, paired with 3D perspective skew, rotation, and scale snap.
 */
export function SlashWipeReveal({
  children,
  className = '',
  delay = 0,
  direction = 'left',
  withSlashBar = true,
}: ScrollRevealProps) {
  const initialTransform = {
    left: { x: -56, y: 20, skewX: -14, rotateX: 16, scale: 0.88 },
    right: { x: 56, y: 20, skewX: 14, rotateX: 16, scale: 0.88 },
    up: { x: 0, y: 48, skewX: -10, rotateX: 22, scale: 0.88 },
    scale: { x: 0, y: 28, skewX: -12, rotateX: 18, scale: 0.8 },
  }[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialTransform.x,
        y: initialTransform.y,
        skewX: initialTransform.skewX,
        rotateX: initialTransform.rotateX,
        scale: initialTransform.scale,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        skewX: 0,
        rotateX: 0,
        scale: 1,
      }}
      viewport={{ once: false, amount: 0.08 }}
      transition={{
        duration: 0.62,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative overflow-hidden will-change-transform ${className}`}
    >
      {withSlashBar && (
        <motion.span
          aria-hidden="true"
          initial={{ x: direction === 'right' ? '105%' : '-105%', skewX: -18 }}
          whileInView={{ x: direction === 'right' ? '-115%' : '115%', skewX: -18 }}
          viewport={{ once: false, amount: 0.08 }}
          transition={{
            duration: 0.68,
            delay: delay + 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-none absolute inset-y-0 -inset-x-6 z-30 bg-gradient-to-r from-transparent via-[#E60023] to-white/90 opacity-90"
        />
      )}
      {children}
    </motion.div>
  );
}

/**
 * SkewHeadlineReveal
 * High-impact editorial section header entrance with kinetic skew, 3D tilt,
 * and an expanding crimson slash underline bar.
 */
export function SkewHeadlineReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -68,
        y: 32,
        skewX: -16,
        rotateZ: -2.5,
        scale: 0.86,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        skewX: 0,
        rotateZ: 0,
        scale: 1,
      }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        duration: 0.62,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1, originX: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.55, delay: delay + 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 h-1 w-28 bg-[#E60023] -skew-x-12"
      />
    </motion.div>
  );
}

/**
 * PerspectiveCardReveal
 * 3D isometric depth slam for major feature panels, project cards, and showcases.
 */
export function PerspectiveCardReveal({
  children,
  className = '',
  delay = 0,
  fromSide = 'left',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  fromSide?: 'left' | 'right' | 'bottom';
}) {
  const initialRotateY = fromSide === 'left' ? -14 : fromSide === 'right' ? 14 : 0;
  const initialX = fromSide === 'left' ? -44 : fromSide === 'right' ? 44 : 0;

  return (
    <div style={{ perspective: '1200px' }} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          x: initialX,
          y: 56,
          scale: 0.88,
          rotateX: 16,
          rotateY: initialRotateY,
          skewX: fromSide === 'right' ? 6 : -6,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          skewX: 0,
        }}
        viewport={{ once: false, amount: 0.08 }}
        transition={{
          duration: 0.66,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="will-change-transform h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * StaggeredGridReveal & StaggerItemReveal
 * Domino 3D skew + scale cascade for multi-card grids and specification lists.
 */
export function StaggeredGridReveal({
  children,
  className = '',
  staggerChildren = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItemReveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 40,
          x: -16,
          scale: 0.86,
          skewX: -10,
          rotateX: 18,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          skewX: 0,
          rotateX: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
