'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { SoundProvider } from '../ui/SoundProvider';
import { CinematicIntro } from '../animations/CinematicIntro';
import { CinematicNavbar } from './CinematicNavbar';
import { CinematicFooter } from './CinematicFooter';
import { PageSlashTransition } from '../animations/PageSlashTransition';

const GlobalThreeScene = dynamic(
  () => import('../three/GlobalThreeScene').then((mod) => mod.GlobalThreeScene),
  { ssr: false }
);

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <div className="relative min-h-screen bg-[#080808] text-white selection:bg-[#E60023] selection:text-white overflow-x-hidden">
        <GlobalThreeScene />
        <CinematicIntro />
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
