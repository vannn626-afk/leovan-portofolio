import React from 'react';
import { LVMonogramSVG } from '../components/ui/LeovanLogo';

export default function Loading() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center"
      role="status"
      aria-label="Loading LEOVAN Experience"
    >
      <LVMonogramSVG className="w-20 h-20 mb-4" />
      <div className="font-mono text-xs tracking-[0.25em] text-[#E60023] uppercase font-bold">
        INITIALIZING EXPERIENCE
      </div>
      <div className="mt-1 font-mono text-[11px] tracking-widest text-[#A0A0A0] uppercase">
        LEOVAN / DIGITAL PORTFOLIO
      </div>
    </div>
  );
}
