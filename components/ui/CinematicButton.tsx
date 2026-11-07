'use client';

import React from 'react';
import Link from 'next/link';
import { useSound } from './SoundProvider';

interface CinematicButtonProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  showArrow?: boolean;
}

export function CinematicButton({
  children,
  href,
  external = false,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ariaLabel,
  type = 'button',
  showArrow = true,
}: CinematicButtonProps) {
  const { playSound } = useSound();

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#E60023] text-white border border-[#E60023] hover:border-white shadow-[4px_4px_0px_#FFFFFF]',
    secondary:
      'bg-[#080808] text-white border border-white/30 hover:border-[#E60023] shadow-[4px_4px_0px_#E60023]',
    ghost:
      'bg-transparent text-[#A0A0A0] hover:text-white border border-white/15 hover:border-[#E60023]',
  }[variant];

  const baseClasses = `group relative inline-flex items-center justify-center gap-3 font-display font-bold uppercase tracking-wider whitespace-nowrap shrink-0 overflow-hidden transition-transform duration-150 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer angular-clip-btn ${sizeClasses} ${variantClasses} ${className}`;

  const handleMouseEnter = () => {
    if (!disabled && !loading) {
      playSound('hover');
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    playSound('click');
    onClick?.(e);
  };

  const innerContent = (
    <>
      {/* Diagonal Wipe Layer */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -translate-x-[105%] skew-x-[-18deg] transition-transform duration-200 ease-out group-hover:translate-x-0 ${
          variant === 'primary' ? 'bg-[#080808]' : 'bg-[#E60023]'
        }`}
      />
      {/* Corner Accent Cut */}
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 w-2.5 h-2.5 bg-white/80 transition-transform duration-200 group-hover:scale-125"
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
      />
      {/* Label & Sliding Arrow */}
      <span className="relative z-10 flex items-center gap-2.5 whitespace-nowrap shrink-0">
        {loading ? (
          <svg
            className="w-4 h-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : null}
        <span>{children}</span>
        {showArrow && !loading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1.5"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        )}
      </span>
    </>
  );

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          target={external || href.startsWith('http') ? '_blank' : undefined}
          rel={external || href.startsWith('http') ? 'noopener noreferrer' : undefined}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          aria-label={ariaLabel}
          className={baseClasses}
        >
          {innerContent}
        </a>
      );
    }
    return (
      <Link
        href={href}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        aria-label={ariaLabel}
        className={baseClasses}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={baseClasses}
    >
      {innerContent}
    </button>
  );
}
