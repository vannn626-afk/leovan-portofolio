'use client';

import React, { useState } from 'react';
import { LEOVAN_CONTACTS, type ContactChannel } from '../../data/contacts';
import { buildMailtoUrl } from '../../lib/portfolio-logic';
import { CharacterShowcase } from '../character/CharacterShowcase';
import { CinematicButton } from '../ui/CinematicButton';
import { useSound } from '../ui/SoundProvider';
import {
  SkewHeadlineReveal,
  SlashWipeReveal,
  PerspectiveCardReveal,
  StaggeredGridReveal,
  StaggerItemReveal,
} from '../animations/ScrollReveal';

function ChannelSvgIcon({ id }: { id: ContactChannel['id'] }) {
  if (id === 'email') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-6 h-6 text-[#E60023]"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="1" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  }
  if (id === 'github') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-white"
        aria-hidden="true"
      >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[#25D366]"
      aria-hidden="true"
    >
      <path d="M12.031 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.333 4.993L2 22l5.233-1.237a9.994 9.994 0 0 0 4.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.935 9.935 0 0 0 12.031 2zm5.828 14.127c-.246.693-1.432 1.332-1.978 1.411-.503.073-1.139.104-1.841-.119-.426-.135-.974-.316-1.676-.619-2.952-1.274-4.88-4.248-5.027-4.445-.147-.197-1.2-1.596-1.2-3.045 0-1.449.759-2.162 1.029-2.457.27-.295.588-.369.784-.369.196 0 .392.002.563.01.181.009.423-.069.662.506.245.59.833 2.039.906 2.186.074.147.123.319.025.516-.098.197-.147.319-.294.491-.147.172-.309.384-.441.516-.147.147-.301.307-.129.602.172.295.763 1.258 1.638 2.038 1.125 1.003 2.074 1.314 2.368 1.461.294.147.466.123.637-.074.172-.197.735-.86.931-1.155.196-.295.392-.246.662-.147.27.098 1.715.809 2.009.956.294.147.49.221.563.344.074.123.074.713-.172 1.406z" />
    </svg>
  );
}

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);
  const { playSound } = useSound();

  const handleCopyEmail = async () => {
    playSound('click');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(LEOVAN_CONTACTS.email);
      }
    } catch {
      // Fallback handled by state update
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleComposerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    if (!message.trim()) {
      setDispatchStatus('Mohon tulis pesan atau ide kamu terlebih dahulu.');
      return;
    }
    const mailtoUri = buildMailtoUrl({ senderName, subject, message });
    setDispatchStatus(`Membuka aplikasi email menuju ${LEOVAN_CONTACTS.email}...`);
    window.location.href = mailtoUri;
  };

  return (
    <section
      id="contact-section"
      aria-labelledby="contact-heading"
      className="relative py-20 sm:py-28 border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SkewHeadlineReveal>
            <div className="font-mono text-xs tracking-[0.25em] text-[#E60023] uppercase font-semibold mb-2">
              06. DIRECT CONNECTION & CHANNELS
            </div>
            <h2
              id="contact-heading"
              className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white"
            >
              LET&apos;S CREATE <span className="text-[#E60023]">SOMETHING.</span>
            </h2>
          </SkewHeadlineReveal>

          <SlashWipeReveal direction="right" delay={0.1}>
            <p className="text-lg text-[#A0A0A0] font-medium">
              &ldquo;{LEOVAN_CONTACTS.description}&rdquo;
            </p>
          </SlashWipeReveal>
        </div>

        {/* Contact Channels Grid (Email, GitHub, WhatsApp Channel) */}
        <StaggeredGridReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
          staggerChildren={0.1}
        >
          {LEOVAN_CONTACTS.channels.map((channel) => (
            <StaggerItemReveal key={channel.id} className="h-full">
              <div className="bg-[#080808] border border-white/20 hover:border-[#E60023] p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-[6px_6px_0px_#E60023] h-full">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="font-mono text-[11px] tracking-widest text-[#E60023] uppercase">
                      {channel.label}
                    </span>
                    <ChannelSvgIcon id={channel.id} />
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-white uppercase tracking-wide">
                    {channel.title}
                  </h3>
                  <div className="font-mono text-sm text-white/90 mt-1 break-all">
                    {channel.value}
                  </div>
                  <p className="text-sm text-[#A0A0A0] mt-3 leading-relaxed">
                    {channel.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/15 flex flex-wrap items-center gap-3">
                  <CinematicButton
                    href={channel.href}
                    external={channel.isExternal}
                    variant="primary"
                    size="sm"
                  >
                    {channel.ctaLabel}
                  </CinematicButton>

                  {channel.id === 'email' && (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy Email Address vannn626@gmail.com"
                      className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                        copiedEmail
                          ? 'bg-white text-[#080808] border-white'
                          : 'bg-[#030303] text-white border-white/30 hover:border-[#E60023]'
                      }`}
                    >
                      {copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}
                    </button>
                  )}
                </div>
              </div>
            </StaggerItemReveal>
          ))}
        </StaggeredGridReveal>

        {/* Bottom Split: Quick Email Dispatch Composer & Final Character Composition */}
        <PerspectiveCardReveal fromSide="bottom" delay={0.08}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#080808] border border-white/20 p-6 sm:p-10">
            <div className="lg:col-span-7">
              <SlashWipeReveal direction="left" delay={0.1}>
                <div className="font-mono text-xs tracking-widest text-[#E60023] uppercase mb-2">
                  QUICK DISPATCH COMPOSER
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase mb-2">
                  SEND A DIRECT MESSAGE TO LEOVAN
                </h3>
              </SlashWipeReveal>
              <p className="text-sm text-[#A0A0A0] mb-6">
                Tulis ide project, pertanyaan teknis, atau ajakan kolaborasi di bawah ini untuk
                langsung menyiapkan email ke <span className="text-white">{LEOVAN_CONTACTS.email}</span>.
              </p>

              <form onSubmit={handleComposerSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-sender-name"
                      className="block font-mono text-xs uppercase tracking-wider text-white mb-1.5"
                    >
                      YOUR NAME
                    </label>
                    <input
                      id="contact-sender-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Nama kamu"
                      className="w-full bg-[#030303] border border-white/25 focus:border-[#E60023] focus:outline-none px-4 py-2.5 text-sm text-white placeholder:text-[#A0A0A0]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block font-mono text-xs uppercase tracking-wider text-white mb-1.5"
                    >
                      SUBJECT / TOPIC
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Web App / Tools / Kolaborasi"
                      className="w-full bg-[#030303] border border-white/25 focus:border-[#E60023] focus:outline-none px-4 py-2.5 text-sm text-white placeholder:text-[#A0A0A0]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs uppercase tracking-wider text-white mb-1.5"
                  >
                    MESSAGE DETAILS
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (dispatchStatus) setDispatchStatus(null);
                    }}
                    placeholder="Ceritakan ide atau pesan kamu..."
                    className="w-full bg-[#030303] border border-white/25 focus:border-[#E60023] focus:outline-none px-4 py-2.5 text-sm text-white placeholder:text-[#A0A0A0]"
                  />
                </div>

                {dispatchStatus && (
                  <div
                    role="status"
                    className="font-mono text-xs text-white bg-[#E60023]/20 border border-[#E60023] px-4 py-2.5"
                  >
                    {dispatchStatus}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <CinematicButton type="submit" variant="primary" size="md">
                    PREPARE EMAIL DISPATCH
                  </CinematicButton>
                  <CinematicButton
                    href={LEOVAN_CONTACTS.whatsappChannelUrl}
                    external
                    variant="secondary"
                    size="md"
                  >
                    JOIN MY CHANNEL
                  </CinematicButton>
                </div>
              </form>
            </div>

            <div className="lg:col-span-5">
              <CharacterShowcase
                variant="contact"
                captionLabel="LET'S CONNECT // LEOVAN"
              />
            </div>
          </div>
        </PerspectiveCardReveal>
      </div>
    </section>
  );
}
