'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

export function PageSlashTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const updateScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!progressRef.current) return;
        const max = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1
        );
        const ratio = Math.min(1, Math.max(0, window.scrollY / max));
        progressRef.current.style.transform = `scaleX(${ratio})`;
      });
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateScroll);
    };
  }, [pathname]);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-white/5"
      >
        <div
          ref={progressRef}
          className="h-full bg-[#E60023] transition-transform duration-100 origin-left will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 min-h-screen flex flex-col"
        >
          {/* Quick Diagonal Red Slash Entrance Accent */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 1, opacity: 0.85 }}
            animate={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 pointer-events-none bg-[#E60023] origin-right"
            style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
          />
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
