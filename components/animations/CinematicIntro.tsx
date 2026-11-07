'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LVMonogramSVG, LeovanWordmarkSVG } from '../ui/LeovanLogo';
import { LEOVAN_PROFILE } from '../../data/profile';
import { useSound } from '../ui/SoundProvider';

export function CinematicIntro() {
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(14);
  const { playSound } = useSound();
  const timersRef = useRef<number[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const finishIntro = useCallback(() => {
    clearAllTimers();
    try {
      window.sessionStorage.setItem('leovan_intro_seen', 'true');
    } catch {
      // Ignore storage errors
    }
    playSound('slash');
    setVisible(false);
    window.dispatchEvent(new CustomEvent('leovan:intro-complete'));
  }, [clearAllTimers, playSound]);

  const startIntroSequence = useCallback(() => {
    clearAllTimers();
    setStage(1);
    setProgress(18);
    setVisible(true);
    playSound('intro');

    const t1 = window.setTimeout(() => {
      setStage(2);
      setProgress(52);
      playSound('slash');
    }, 850);

    const t2 = window.setTimeout(() => {
      setStage(3);
      setProgress(88);
      playSound('click');
    }, 1850);

    const t3 = window.setTimeout(() => {
      setStage(4);
      setProgress(100);
    }, 2950);

    const t4 = window.setTimeout(() => {
      finishIntro();
    }, 3650);

    timersRef.current = [t1, t2, t3, t4];
  }, [clearAllTimers, finishIntro, playSound]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleReplay = () => {
      startIntroSequence();
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

    const initTimer = window.setTimeout(() => {
      startIntroSequence();
    }, 10);

    return () => {
      window.clearTimeout(initTimer);
      window.removeEventListener('leovan:replay-intro', handleReplay);
      clearAllTimers();
    };
  }, [clearAllTimers, startIntroSequence]);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, finishIntro]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="leovan-cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{
            x: '100%',
            skewX: -14,
            opacity: 0,
            transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 bg-[#030303] flex flex-col justify-between p-5 sm:p-10 overflow-hidden select-none"
          role="dialog"
          aria-label="LEOVAN Intro Sequence"
        >
          {/* Halftone & Radial Crimson Atmosphere */}
          <div
            aria-hidden="true"
            className="absolute inset-0 halftone-overlay opacity-35 pointer-events-none"
          />

          {/* Kinetic Background Watermark Typography */}
          <motion.div
            aria-hidden="true"
            initial={{ x: '20%', rotate: -12, opacity: 0 }}
            animate={{
              x: stage >= 3 ? '-12%' : '4%',
              rotate: -12,
              opacity: 0.08,
            }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute -inset-x-32 top-1/4 font-display text-[6rem] sm:text-[11rem] font-black uppercase whitespace-nowrap text-white pointer-events-none leading-none tracking-tighter"
          >
            LEOVAN // DIGITAL PERSONA // MOHAMMAD SOFANDI // IMMORTAL
          </motion.div>

          {/* Primary Diagonal Crimson Slash Blade 1 */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0, rotate: -14, originX: 0 }}
            animate={{
              scaleX: 1,
              height: stage === 1 ? '20px' : stage === 2 ? '320px' : '240px',
              rotate: -14,
            }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[-15%] right-[-15%] top-1/2 -translate-y-1/2 bg-[#E60023] border-y-2 border-white shadow-[0_0_50px_rgba(230,0,35,0.8)] pointer-events-none"
          />

          {/* Secondary Counter-Slash Dark Red & White Blade 2 */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0, rotate: 9, originX: 1 }}
            animate={{
              scaleX: stage >= 2 ? 1 : 0,
              rotate: 9,
            }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[-15%] right-[-15%] top-[58%] h-10 sm:h-16 bg-[#080808] border-y-2 border-[#E60023] pointer-events-none flex items-center overflow-hidden"
          >
            <div className="font-mono text-[11px] sm:text-xs tracking-[0.35em] text-white/90 uppercase whitespace-nowrap px-8">
              CREATING BEYOND THE SCREEN // SUKAGUMIWANG, INDRAMAYU // DEV AGE 14 // APP &amp; WEB //
              CREATING BEYOND THE SCREEN // MOHAMMAD SOFANDI
            </div>
          </motion.div>

          {/* Top Bar Telemetry & Skip Trigger */}
          <div className="relative z-30 flex items-center justify-between gap-4 border-b border-white/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 bg-[#E60023] animate-pulse" />
              <div className="font-mono text-xs tracking-[0.22em] text-white uppercase">
                INITIALIZING EXPERIENCE // STAGE 0{stage}
              </div>
            </div>
            <button
              type="button"
              onClick={finishIntro}
              className="px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white bg-[#080808] border-2 border-[#E60023] hover:bg-[#E60023] shadow-[4px_4px_0px_#E60023] transition-all cursor-pointer"
            >
              SKIP INTRO [ESC]
            </button>
          </div>

          {/* STAGE 2 SPECIAL: Comic Book Character Eye/Portrait Cut-In Strip */}
          <AnimatePresence>
            {stage === 2 && (
              <motion.div
                key="stage-2-cutin"
                initial={{ x: '-100%', skewY: -5, opacity: 0 }}
                animate={{ x: '0%', skewY: -5, opacity: 1 }}
                exit={{ x: '100%', skewY: -5, opacity: 0 }}
                transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-30 my-auto w-full bg-[#080808] border-y-4 border-white py-4 sm:py-6 px-6 sm:px-14 flex items-center justify-between overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.95)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 right-0 w-1/2 bg-[#E60023]"
                  style={{ clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 0% 100%)' }}
                />
                <div className="relative z-10 flex flex-col">
                  <span className="font-mono text-xs tracking-[0.3em] text-[#E60023] font-bold uppercase">
                    PERSONA AWAKENING // CUT-IN
                  </span>
                  <span className="font-display text-3xl sm:text-6xl font-black text-white uppercase tracking-tight">
                    LEOVAN — THE DIGITAL PERSONA
                  </span>
                  <span className="font-mono text-xs tracking-[0.22em] text-white/80 uppercase mt-1">
                    WHO KNOWS AS MOHAMMAD SOFANDI · RANK: IMMORTAL
                  </span>
                </div>
                <div className="relative z-10 w-28 h-28 sm:w-40 sm:h-40 shrink-0 overflow-hidden border-2 border-white bg-[#030303] -skew-x-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={LEOVAN_PROFILE.characterAssetPath}
                    alt="LEOVAN Cut-In"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top scale-125 skew-x-12"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 1, 3, 4: Center Stage Lockup + Full Protagonist Reveal */}
          {stage !== 2 && (
            <div className="relative z-30 my-auto flex flex-col lg:flex-row items-center justify-between gap-8 max-w-6xl mx-auto w-full py-4">
              {/* Left Column: LV Monogram + Wordmark + Identity Badge */}
              <motion.div
                initial={{ scale: 0.72, x: -48, skewX: -12, opacity: 0 }}
                animate={{
                  scale: 1,
                  x: 0,
                  skewX: 0,
                  opacity: 1,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 bg-[#080808]/95 border-2 border-white p-6 sm:p-8 shadow-[10px_10px_0px_#E60023] max-w-xl w-full"
                style={{
                  clipPath: 'polygon(0 0, 96% 0, 100% 10%, 100% 100%, 4% 100%, 0 90%)',
                }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ rotate: -180, scale: 0.4 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <LVMonogramSVG className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_24px_rgba(230,0,35,0.85)]" />
                  </motion.div>
                  <div className="text-left">
                    <div className="font-mono text-[11px] tracking-[0.25em] text-[#E60023] font-bold uppercase">
                      INDEPENDENT DEVELOPER
                    </div>
                    <div className="font-mono text-xs text-white/80 uppercase tracking-widest mt-0.5">
                      SUKAGUMIWANG · INDRAMAYU · INDONESIA
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ x: -36, skewX: -14, opacity: 0 }}
                  animate={{ x: 0, skewX: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <LeovanWordmarkSVG className="h-12 sm:h-16 md:h-20 w-auto mx-auto lg:mx-0" />

                  <div className="mt-3 inline-block bg-[#E60023] text-white px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-widest -skew-x-12">
                    <span className="block skew-x-12">
                      WHO KNOWS AS MOHAMMAD SOFANDI
                    </span>
                  </div>

                  <p className="mt-4 font-display text-xl sm:text-2xl font-extrabold tracking-wide text-white uppercase">
                    {LEOVAN_PROFILE.mainSlogan}
                  </p>
                  <p className="mt-1 font-mono text-xs tracking-[0.2em] text-[#A0A0A0] uppercase">
                    DEV · AGE 14 · APP &amp; WEB · MLBB IMMORTAL
                  </p>
                </motion.div>
              </motion.div>

              {/* Right Column: Full Character 3D Slam Reveal */}
              <motion.div
                initial={{ scale: 0.72, x: 70, rotateY: -28, rotateZ: 6, opacity: 0 }}
                animate={{
                  scale: stage >= 3 ? 1.04 : 0.92,
                  x: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  opacity: 1,
                }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                className="w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative flex items-center justify-center shrink-0"
                style={{ perspective: '1000px' }}
              >
                {/* Angular Crimson Frame Behind Character */}
                <div
                  aria-hidden="true"
                  className="absolute inset-4 bg-[#080808] border-2 border-[#E60023] -rotate-6 shadow-[8px_8px_0px_#E60023]"
                  style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={LEOVAN_PROFILE.characterAssetPath}
                  alt="LEOVAN Protagonist Reveal"
                  referrerPolicy="no-referrer"
                  className="relative z-10 w-full h-full object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.95)]"
                />
              </motion.div>
            </div>
          )}

          {/* Bottom Metadata & Kinetic Progress Bar */}
          <div className="relative z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/20 pt-4">
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white uppercase">
              <span className="bg-[#E60023] text-white px-2 py-0.5 font-bold">LV</span>
              <span>LEOVAN / DIGITAL PORTFOLIO SYSTEM</span>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="w-44 sm:w-64 h-2 bg-white/15 border border-white/30 overflow-hidden -skew-x-12">
                <motion.div
                  initial={{ width: '15%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="h-full bg-[#E60023]"
                />
              </div>
              <span className="font-mono text-xs font-bold tabular-nums text-white">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
