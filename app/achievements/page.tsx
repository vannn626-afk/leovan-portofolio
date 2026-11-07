import type { Metadata } from 'next';
import React from 'react';
import { AchievementsSection } from '../../components/achievements/AchievementsSection';
import { CinematicButton } from '../../components/ui/CinematicButton';

export const metadata: Metadata = {
  title: 'Achievements — Beyond Development',
  description:
    'Personal gaming record LEOVAN: Mobile Legends: Bang Bang — Rank IMMORTAL.',
  alternates: {
    canonical: '/achievements',
  },
};

export default function AchievementsPage() {
  return (
    <div className="pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between gap-4">
        <div className="font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
          ROUTE // /ACHIEVEMENTS · PERSONAL RECORD
        </div>
        <CinematicButton href="/about" variant="secondary" size="sm">
          DEVELOPER PROFILE
        </CinematicButton>
      </div>
      <AchievementsSection isStandalonePage />
    </div>
  );
}
