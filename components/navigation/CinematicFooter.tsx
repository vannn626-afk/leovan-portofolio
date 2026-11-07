'use client';

import React from 'react';
import Link from 'next/link';
import { LVMonogramSVG, LeovanWordmarkSVG } from '../ui/LeovanLogo';
import { LEOVAN_PROFILE } from '../../data/profile';
import { LEOVAN_CONTACTS } from '../../data/contacts';

export function CinematicFooter() {
  return (
    <footer className="relative z-10 bg-[#030303] border-t-2 border-[#E60023] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <LVMonogramSVG className="w-9 h-9" />
            <LeovanWordmarkSVG className="h-5 w-auto" />
          </div>
          <p className="font-mono text-xs tracking-widest text-[#A0A0A0] uppercase">
            {LEOVAN_PROFILE.mainSlogan} · {LEOVAN_PROFILE.secondarySlogan}
          </p>
          <p className="text-xs text-[#A0A0A0]">
            {LEOVAN_PROFILE.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider">
          <Link href="/" className="text-[#A0A0A0] hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-[#A0A0A0] hover:text-white transition-colors">
            About
          </Link>
          <Link href="/stack" className="text-[#A0A0A0] hover:text-white transition-colors">
            Stack
          </Link>
          <Link href="/projects" className="text-[#A0A0A0] hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/achievements" className="text-[#A0A0A0] hover:text-white transition-colors">
            Achievements
          </Link>
          <Link href="/contact" className="text-[#A0A0A0] hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs text-[#A0A0A0]">
          <a
            href={`mailto:${LEOVAN_CONTACTS.email}`}
            className="hover:text-[#E60023] transition-colors"
          >
            {LEOVAN_CONTACTS.email}
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={LEOVAN_CONTACTS.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E60023] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
