import type { Metadata } from 'next';
import React from 'react';
import { TechStackSection } from '../../components/stack/TechStackSection';
import { CinematicButton } from '../../components/ui/CinematicButton';

export const metadata: Metadata = {
  title: 'Tech Stack — The Arsenal',
  description:
    'Koleksi bahasa pemrograman, framework frontend, backend, database, dan tools pengembangan yang dieksplorasi oleh LEOVAN.',
  alternates: {
    canonical: '/stack',
  },
};

export default function StackPage() {
  return (
    <div className="pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between gap-4">
        <div className="font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
          ROUTE // /STACK · FULL TECHNOLOGY ARSENAL
        </div>
        <CinematicButton href="/projects" variant="primary" size="sm">
          SEE DEPLOYED PROJECTS
        </CinematicButton>
      </div>
      <TechStackSection isStandalonePage />
    </div>
  );
}
