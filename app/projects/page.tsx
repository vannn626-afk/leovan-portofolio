import type { Metadata } from 'next';
import React from 'react';
import { ProjectsSection } from '../../components/projects/ProjectsSection';
import { CinematicButton } from '../../components/ui/CinematicButton';

export const metadata: Metadata = {
  title: 'Projects — The Archive',
  description:
    'Jelajahi project digital karya LEOVAN: LEOVAN | TOOLS (https://leovan.my.id) dan LEOVAN | AI (https://leovandyz.web.id).',
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between gap-4">
        <div className="font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
          ROUTE // /PROJECTS · DIGITAL ARCHIVE
        </div>
        <CinematicButton href="/contact" variant="secondary" size="sm">
          START A COLLABORATION
        </CinematicButton>
      </div>
      <ProjectsSection />
    </div>
  );
}
