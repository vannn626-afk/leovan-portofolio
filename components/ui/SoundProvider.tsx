'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { soundEngine, type SoundEffectType } from '../../lib/sound-engine';

interface SoundContextValue {
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type: SoundEffectType) => void;
}

const SoundContext = createContext<SoundContextValue>({
  soundEnabled: true,
  toggleSound: () => {},
  playSound: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setSoundEnabled(soundEngine.isEnabled());
    }, 0);

    // Unlock Web Audio Context on first user interaction and attach global interactive SFX
    const handleFirstUnlock = () => {
      soundEngine.unlock();
    };

    const handleGlobalClick = (e: MouseEvent) => {
      soundEngine.unlock();
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button, a, [role="tab"], input[type="submit"]');
      if (interactive) {
        soundEngine.play('click');
      }
    };

    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button, a, [role="tab"]');
      if (interactive) {
        soundEngine.play('hover');
      }
    };

    window.addEventListener('pointerdown', handleFirstUnlock, { passive: true });
    window.addEventListener('keydown', handleFirstUnlock, { passive: true });
    window.addEventListener('click', handleGlobalClick, { passive: true });
    window.addEventListener('mouseover', handleGlobalMouseOver, { passive: true });

    return () => {
      clearTimeout(id);
      window.removeEventListener('pointerdown', handleFirstUnlock);
      window.removeEventListener('keydown', handleFirstUnlock);
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('mouseover', handleGlobalMouseOver);
    };
  }, []);

  const toggleSound = useCallback(() => {
    const next = !soundEngine.isEnabled();
    soundEngine.setEnabled(next);
    setSoundEnabled(next);
  }, []);

  const playSound = useCallback((type: SoundEffectType) => {
    soundEngine.play(type);
  }, []);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
