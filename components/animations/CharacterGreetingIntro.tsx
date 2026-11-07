'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LVMonogramSVG, LeovanWordmarkSVG } from '../ui/LeovanLogo';
import { LEOVAN_PROFILE } from '../../data/profile';
import { useSound } from '../ui/SoundProvider';

const GREETING_LINES = [
  'Halo! Selamat datang di dunia digital gue — LEOVAN.',
  'Gue developer web dan app berusia 14 tahun asal Sukagumiwang, Indramayu, Jawa Barat.',
  'Awalnya cuma gabut dan penasaran sama dunia coding, sampai akhirnya mulai membangun berbagai project digital sendiri.',
  'Siap menjelajah karya & eksperimen gue? Let’s dive in!',
];

export function CharacterGreetingIntro() {
  const [visible, setVisible] = useState(false);
  const [greetingStep, setGreetingStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const { playSound } = useSound();
  const timerRef = useRef<number[]>([]);

  const clearAllTimers = useCallback(() => {
    timerRef.current.forEach((id) => window.clearTimeout(id));
    timerRef.current = [];
  }, []);

  const finishGreeting = useCallback(() => {
    clearAllTimers();
    try {
      window.sessionStorage.setItem('leovan_intro_seen', 'true');
    } catch {
      // Ignore sessionStorage errors
    }
    playSound('slash');
    setVisible(false);
    window.dispatchEvent(new CustomEvent('leovan:intro-complete'));
  }, [clearAllTimers, playSound]);

  const startGreetingSequence = useCallback(() => {
    clearAllTimers();
    setGreetingStep(0);
    setTypedText('');
    setIsTypingDone(false);
    setVisible(true);
    playSound('intro');

    // Step 1: Katana slash & character slide-in
    const t1 = window.setTimeout(() => {
      setGreetingStep(1);
      playSound('slash');
    }, 600);

    // Step 2: Open Dialogue Box & start typewriter
    const t2 = window.setTimeout(() => {
      setGreetingStep(2);
      playSound('click');

      // Typewriter line 0
      let charIdx = 0;
      const fullText = GREETING_LINES.join('\n\n');
      const typingInterval = window.setInterval(() => {
        charIdx += 2;
        if (charIdx >= fullText.length) {
          setTypedText(fullText);
          setIsTypingDone(true);
          window.clearInterval(typingInterval);
        } else {
          setTypedText(fullText.slice(0, charIdx));
        }
      }, 18);

      timerRef.current.push(typingInterval);
    }, 1100);

    timerRef.current.push(t1, t2);
  }, [clearAllTimers, playSound]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleReplay = () => {
      startGreetingSequence();
    };
    window.addEventListener('leovan:replay-intro', handleReplay);

    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      return () => {
        window.removeEventListener('leovan:replay-intro', handleReplay);
        clearAllTimers();
      };
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener('leovan:replay-intro', handleReplay);
        clearAllTimers();
      };
    }

    // Auto-start greeting on fresh open
    const initTimer = window.setTimeout(() => {
      startGreetingSequence();
    }, 10);

    return () => {
      window.clearTimeout(initTimer);
      window.removeEventListener('leovan:replay-intro', handleReplay);
      clearAllTimers();
    };
  }, [clearAllTimers, startGreetingSequence]);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        finishGreeting();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, finishGreeting]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="character-greeting-intro-modal"
          initial={{ opacity: 1 }}
          exit={{
            x: '100%',
            skewX: -16,
            opacity: 0,
            transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Salam Pembuka dari LEOVAN"
        >
          {/* Halftone & Crimson Ambient Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 halftone-overlay opacity-30 pointer-events-none"
          />

          {/* Persona Giant Red Angle Slash in Background */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0, rotate: -14, originX: 0 }}
            animate={{ scaleX: 1, rotate: -14 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-20 -right-20 top-1/2 -translate-y-1/2 h-64 sm:h-96 bg-[#E60023] border-y-4 border-white shadow-[0_0_80px_rgba(230,0,35,0.7)] pointer-events-none"
            style={{ clipPath: 'polygon(0% 15%, 100% 0%, 100% 85%, 0% 100%)' }}
          />

          {/* Top Bar: Telemetry & Skip Button */}
          <div className="relative z-30 flex items-center justify-between gap-4 border-b border-white/20 pb-3">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 bg-[#E60023] animate-pulse" />
              <div className="font-mono text-xs tracking-[0.25em] text-white uppercase font-bold">
                CHARACTER GREETING // SAMBUTAN UTAMA
              </div>
            </div>

            <button
              type="button"
              onClick={finishGreeting}
              className="px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-white bg-[#080808] border-2 border-[#E60023] hover:bg-[#E60023] shadow-[4px_4px_0px_#FFFFFF] transition-all cursor-pointer"
            >
              LEWATI [ESC]
            </button>
          </div>

          {/* Main Stage: Character on Right + Animated Speech Window on Left */}
          <div className="relative z-30 my-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 max-w-6xl mx-auto w-full py-2">
            
            {/* Left: Persona 5 Comic Speech Dialogue Box */}
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.9, skewX: -8 }}
              animate={{
                opacity: greetingStep >= 2 ? 1 : 0,
                x: greetingStep >= 2 ? 0 : -60,
                scale: greetingStep >= 2 ? 1 : 0.9,
                skewX: greetingStep >= 2 ? 0 : -8,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col gap-4 bg-[#080808]/95 border-2 border-white p-5 sm:p-7 shadow-[10px_10px_0px_#E60023]"
              style={{
                clipPath: 'polygon(0% 0%, 98% 0%, 100% 6%, 100% 100%, 2% 100%, 0% 94%)',
              }}
            >
              {/* Dialogue Box Header */}
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="flex items-center gap-3">
                  <LVMonogramSVG className="w-8 h-8 drop-shadow-[0_0_12px_rgba(230,0,35,0.8)]" />
                  <div>
                    <span className="font-display text-lg font-black tracking-wider text-white uppercase block">
                      LEOVAN
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-[#E60023] uppercase font-bold block">
                      WHO KNOWS AS MOHAMMAD SOFANDI
                    </span>
                  </div>
                </div>

                <div className="inline-block bg-[#E60023] text-white px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider -skew-x-12">
                  <span className="block skew-x-12">AGE 14 · DEV</span>
                </div>
              </div>

              {/* Dialogue Text Content with Typewriter */}
              <div className="min-h-[140px] sm:min-h-[160px] py-2 flex flex-col justify-center">
                <p className="font-display text-base sm:text-xl font-bold text-white tracking-wide leading-relaxed whitespace-pre-line">
                  {typedText || 'Memuat pesan...'}
                  {!isTypingDone && (
                    <span className="inline-block w-2.5 h-5 bg-[#E60023] ml-1 animate-pulse align-middle" />
                  )}
                </p>
              </div>

              {/* Interactive Enter CTA Button */}
              <div className="pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
                <div className="font-mono text-[11px] text-[#A0A0A0] uppercase tracking-wider">
                  SUKAGUMIWANG, INDRAMAYU · RANK: IMMORTAL
                </div>

                <button
                  type="button"
                  onClick={finishGreeting}
                  className="px-6 py-2.5 bg-[#E60023] hover:bg-white text-white hover:text-[#080808] font-mono text-xs font-bold uppercase tracking-widest border border-white shadow-[4px_4px_0px_#FFFFFF] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  MASUK KE PORTOFOLIO [ENTER]
                </button>
              </div>
            </motion.div>

            {/* Right: New Character Image with Dynamic Slide-in & Comic Flare */}
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.8, rotateZ: 4 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                rotateZ: 0,
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex items-center justify-center h-64 sm:h-80 md:h-96 lg:h-[420px]"
            >
              {/* Comic Slash Polygon Behind Character */}
              <div
                aria-hidden="true"
                className="absolute inset-2 bg-[#080808] border-2 border-[#E60023] -rotate-6 shadow-[8px_8px_0px_#E60023]"
                style={{ clipPath: 'polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)' }}
              />

              {/* The New Persona Protagonist Artwork */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LEOVAN_PROFILE.characterAssetPath}
                alt="LEOVAN Protagonist Welcome"
                referrerPolicy="no-referrer"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] pointer-events-none"
              />

              {/* Calling Card Label Tag */}
              <div
                className="absolute bottom-2 right-2 z-20 bg-[#E60023] text-white px-3 py-1 font-mono text-[11px] font-black uppercase tracking-wider -skew-x-12 shadow-[3px_3px_0px_#080808]"
              >
                <span className="block skew-x-12">THE DIGITAL PERSONA</span>
              </div>
            </motion.div>

          </div>

          {/* Bottom Branding Bar */}
          <div className="relative z-30 flex items-center justify-between border-t border-white/20 pt-3 font-mono text-xs text-white/80 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="bg-[#E60023] text-white px-2 py-0.5 font-bold">LV</span>
              <span>CREATING BEYOND THE SCREEN</span>
            </div>
            <div className="text-[#A0A0A0] hidden sm:block">
              FROM CURIOSITY TO CREATION
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
