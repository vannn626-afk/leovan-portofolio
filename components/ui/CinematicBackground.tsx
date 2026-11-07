'use client';

import React from 'react';

/**
 * CinematicBackground
 * Lightweight, 60fps GPU-accelerated Persona 5 comic atmosphere.
 * Replaces heavy Three.js WebGL scenes to eliminate all lag, stutters, and delay
 * while delivering authentic high-contrast red/black comic styling.
 */
export function CinematicBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050505]"
    >
      {/* Persona Halftone Comic Screen Pattern */}
      <div className="absolute inset-0 halftone-overlay opacity-30" />

      {/* Dramatic Giant Diagonal Red Ribbon Slash 1 */}
      <div
        className="absolute -top-32 -left-48 w-[140vw] h-40 bg-gradient-to-r from-transparent via-[#E60023]/15 to-transparent -rotate-12 transform-gpu"
        style={{ filter: 'blur(32px)' }}
      />

      {/* Secondary Counter Diagonal Dark Red Slash 2 */}
      <div
        className="absolute top-1/2 -right-48 w-[130vw] h-64 bg-gradient-to-r from-[#990019]/10 via-[#E60023]/10 to-transparent 8 rotate-14 transform-gpu"
        style={{ filter: 'blur(48px)' }}
      />

      {/* Thin Crisp Kinetic Diagonal Comic Vector Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="-10%"
          y1="25%"
          x2="110%"
          y2="15%"
          stroke="#E60023"
          strokeWidth="1.5"
          strokeDasharray="16 12"
        />
        <line
          x1="-10%"
          y1="65%"
          x2="110%"
          y2="55%"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeDasharray="24 16"
          opacity="0.4"
        />
        <line
          x1="-10%"
          y1="85%"
          x2="110%"
          y2="75%"
          stroke="#E60023"
          strokeWidth="2"
        />
      </svg>

      {/* Subtle Ambient Radial Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 40%, rgba(3,3,3,0.85) 100%)',
        }}
      />
    </div>
  );
}
