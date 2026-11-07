import type { Metadata } from 'next';
import React from 'react';
import { ContactSection } from '../../components/contact/ContactSection';
import { CinematicButton } from '../../components/ui/CinematicButton';

export const metadata: Metadata = {
  title: "Contact — Let's Create Something",
  description:
    'Hubungi LEOVAN melalui email (vannn626@gmail.com), GitHub (vannn626-afk), atau bergabung ke saluran resmi WhatsApp Channel.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between gap-4">
        <div className="font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
          ROUTE // /CONTACT · DIRECT CHANNELS
        </div>
        <CinematicButton href="/projects" variant="secondary" size="sm">
          VIEW PROJECTS
        </CinematicButton>
      </div>
      <ContactSection />
    </div>
  );
}
