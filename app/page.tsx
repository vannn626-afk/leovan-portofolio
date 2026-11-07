import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { AboutSection } from '../components/about/AboutSection';
import { TechStackSection } from '../components/stack/TechStackSection';
import { ProjectsSection } from '../components/projects/ProjectsSection';
import { AchievementsSection } from '../components/achievements/AchievementsSection';
import { ContactSection } from '../components/contact/ContactSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
    </div>
  );
}
