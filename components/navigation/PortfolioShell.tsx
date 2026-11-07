'use client';

import React from 'react';
import { SoundProvider } from '../ui/SoundProvider';
import { CinematicBackground } from '../ui/CinematicBackground';
import { CharacterGreetingIntro } from '../animations/CharacterGreetingIntro';
import { CinematicNavbar } from './CinematicNavbar';
import { CinematicFooter } from './CinematicFooter';
import { PageSlashTransition } from '../animations/PageSlashTransition';

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <div className="relative min-h-screen bg-[#080808] text-white selection:bg-[#E60023] selection:text-white overflow-x-hidden">
        {/* Lightweight 60fps GPU-accelerated Persona background (no lag) */}
        <CinematicBackground />

        {/* Animated Character Greeting on Web Open */}
        <CharacterGreetingIntro />

        <CinematicNavbar />
        <PageSlashTransition>
          <main id="main-content" className="relative z-10 flex-1">
            {children}
          </main>
          <CinematicFooter />
        </PageSlashTransition>
      </div>
    </SoundProvider>
  );
}
