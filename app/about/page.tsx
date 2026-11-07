import type { Metadata } from 'next';
import React from 'react';
import { AboutSection } from '../../components/about/AboutSection';
import { CinematicButton } from '../../components/ui/CinematicButton';

export const metadata: Metadata = {
  title: 'About — Behind The Code',
  description:
    'Kenali LEOVAN — Developer web dan app berusia 14 tahun asal Sukagumiwang, Indramayu, Jawa Barat, Indonesia. Berawal dari gabut hingga membangun berbagai project digital.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between gap-4">
        <div className="font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
          ROUTE // /ABOUT · BIOGRAPHY & PERSONALITY
        </div>
        <CinematicButton href="/projects" variant="primary" size="sm">
          EXPLORE PROJECTS
        </CinematicButton>
      </div>
      <AboutSection isStandalonePage />
    </div>
  );
}
