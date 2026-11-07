'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  animated?: boolean;
}

/**
 * Original Geometric LV Monogram Vector SVG
 */
export function LVMonogramSVG({ className = 'w-10 h-10', animated = false }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-label="LV Monogram Logo"
      role="img"
    >
      {/* Angular Outer Shield */}
      <polygon
        points="14,8 112,18 98,112 6,96"
        fill="#080808"
        stroke="#E60023"
        strokeWidth="3.5"
        className={animated ? 'transition-transform duration-300 group-hover:scale-105' : ''}
      />
      {/* Diagonal Crimson Slash */}
      <polygon
        points="90,8 116,8 28,112 4,112"
        fill="#E60023"
        opacity="0.92"
      />
      {/* Geometric L */}
      <path
        d="M24 22 L44 22 L36 78 L66 78 L62 96 L14 96 Z"
        fill="#FFFFFF"
      />
      {/* Geometric Interlocking V */}
      <path
        d="M56 22 L76 22 L82 68 L98 22 L114 22 L86 96 L68 96 Z"
        fill="#FFFFFF"
      />
      {/* High-Contrast Razor Cut */}
      <polygon points="18,58 106,44 104,50 16,64" fill="#E60023" />
    </svg>
  );
}

/**
 * Original Custom Geometric LEOVAN Wordmark SVG
 */
export function LeovanWordmarkSVG({ className = 'h-7 w-auto', animated = false }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 100"
      fill="none"
      className={className}
      aria-label="LEOVAN Wordmark"
      role="img"
    >
      {/* Dynamic Red Slash Behind Letters */}
      <polygon
        points="8,74 512,18 504,34 0,90"
        fill="#E60023"
        className={animated ? 'origin-left transition-transform duration-300 group-hover:scale-x-105' : ''}
      />
      {/* L */}
      <path d="M18 14 L42 14 L34 68 L74 68 L70 86 L8 86 Z" fill="#FFFFFF" />
      {/* E */}
      <path
        d="M86 14 L152 14 L149 30 L108 30 L106 42 L142 42 L139 58 L103 58 L101 70 L146 70 L143 86 L76 86 Z"
        fill="#FFFFFF"
      />
      {/* O */}
      <path
        d="M170 14 L232 14 L240 26 L232 86 L168 86 L160 74 Z M188 30 L182 70 L212 70 L218 30 Z"
        fill="#FFFFFF"
      />
      {/* V */}
      <path d="M250 14 L274 14 L282 62 L304 14 L328 14 L290 86 L266 86 Z" fill="#FFFFFF" />
      {/* A */}
      <path
        d="M358 14 L386 14 L406 86 L382 86 L378 70 L352 70 L344 86 L320 86 Z M368 32 L358 54 L374 54 Z"
        fill="#FFFFFF"
      />
      {/* N */}
      <path
        d="M420 14 L444 14 L468 58 L474 14 L498 14 L488 86 L464 86 L440 42 L434 86 L410 86 Z"
        fill="#FFFFFF"
      />
      {/* Signature Red Notch */}
      <polygon points="498,70 516,70 512,86 494,86" fill="#E60023" />
    </svg>
  );
}
