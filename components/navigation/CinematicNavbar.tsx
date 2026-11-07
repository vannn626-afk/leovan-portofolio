'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { LVMonogramSVG, LeovanWordmarkSVG } from '../ui/LeovanLogo';
import { useSound } from '../ui/SoundProvider';

interface NavRouteItem {
  label: string;
  href: string;
}

const NAV_ROUTES: NavRouteItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'STACK', href: '/stack' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'ACHIEVEMENTS', href: '/achievements' },
  { label: 'CONTACT', href: '/contact' },
];

export function CinematicNavbar() {
  const pathname = usePathname() || '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { soundEnabled, toggleSound, playSound } = useSound();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#080808]/95 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title / Original SVG Lockup */}
          <Link
            href="/"
            onClick={() => playSound('navigate')}
            onMouseEnter={() => playSound('hover')}
            aria-label="LEOVAN Home"
            className="group flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]"
          >
            <LVMonogramSVG className="w-9 h-9" animated />
            <LeovanWordmarkSVG className="h-5 w-auto" animated />
          </Link>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6"
          >
            {NAV_ROUTES.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => playSound('navigate')}
                  onMouseEnter={() => playSound('hover')}
                  className={`group relative px-2.5 py-1.5 font-display text-xs font-bold tracking-widest uppercase whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isActive ? 'text-white' : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  {/* Angular Hover / Active Background Slash */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 -skew-x-12 transition-transform duration-150 origin-left ${
                      isActive
                        ? 'bg-[#E60023] scale-x-100'
                        : 'bg-white/10 scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Intro Replay, Sound Control & Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                playSound('slash');
                window.dispatchEvent(new CustomEvent('leovan:replay-intro'));
              }}
              aria-label="Replay Cinematic Intro"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 font-mono text-xs uppercase tracking-wider bg-[#030303] text-white border border-white/25 hover:border-[#E60023] hover:bg-[#E60023] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>INTRO</span>
            </button>

            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundEnabled ? 'Mute UI Sound Effects' : 'Enable UI Sound Effects'}
              aria-pressed={soundEnabled}
              className={`px-3 py-2 font-mono text-xs uppercase tracking-wider border transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 ${
                soundEnabled
                  ? 'bg-[#E60023] text-white border-[#E60023]'
                  : 'bg-[#030303] text-[#A0A0A0] border-white/20 hover:text-white hover:border-[#E60023]'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                {soundEnabled ? (
                  <>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </>
                ) : (
                  <>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </>
                )}
              </svg>
              <span>{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setMobileMenuOpen((prev) => !prev);
              }}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2.5 bg-[#030303] border border-[#E60023] text-white hover:bg-[#E60023] transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-5 h-5"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M3 6h18M6 12h15M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 lg:hidden bg-[#030303] flex flex-col justify-between p-6 overflow-y-auto"
            role="dialog"
            aria-label="Mobile Navigation Menu"
          >
            {/* Top Bar inside Mobile Overlay */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-3">
                <LVMonogramSVG className="w-9 h-9" />
                <LeovanWordmarkSVG className="h-5 w-auto" />
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setMobileMenuOpen(false);
                }}
                aria-label="Close Menu"
                className="p-2.5 bg-[#E60023] text-white font-mono text-xs uppercase tracking-widest cursor-pointer"
              >
                CLOSE [X]
              </button>
            </div>

            {/* Navigation Links */}
            <nav aria-label="Mobile Navigation Links" className="my-auto py-8 flex flex-col gap-4">
              {NAV_ROUTES.map((item, idx) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      playSound('navigate');
                      setMobileMenuOpen(false);
                    }}
                    className={`group flex items-center justify-between p-4 border transition-colors ${
                      isActive
                        ? 'bg-[#E60023] border-white text-white'
                        : 'bg-[#080808] border-white/15 text-white hover:border-[#E60023]'
                    }`}
                    style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs tabular-nums text-white/70">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-2xl font-bold tracking-wider uppercase">
                        {item.label}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                );
              })}
            </nav>

            {/* Footer inside Mobile Overlay */}
            <div className="border-t border-white/15 pt-4 flex items-center justify-between text-xs font-mono text-[#A0A0A0]">
              <span>LEOVAN // INDONESIA</span>
              <span>CREATING BEYOND THE SCREEN.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
