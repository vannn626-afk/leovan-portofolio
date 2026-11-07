'use client';

export type SoundEffectType = 'hover' | 'click' | 'navigate' | 'slash' | 'intro';

class ProceduralSoundEngine {
  private ctx: AudioContext | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private enabled = true;
  private lastHoverTime = 0;
  private lastClickTime = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('leovan_sound_enabled');
      // Default to enabled (true) so SFX is genuinely audible unless user explicitly muted it
      this.enabled = saved === null ? true : saved === 'true';
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): void {
    this.enabled = next;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('leovan_sound_enabled', String(next));
    }
    if (next) {
      this.unlock();
      this.play('click');
    }
  }

  public unlock(): AudioContext | null {
    return this.ensureContext();
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.002, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.12, this.ctx.currentTime);
        this.compressor.connect(this.ctx.destination);

        // Pre-build white noise buffer for cinematic slash/whoosh SFX
        const sampleRate = this.ctx.sampleRate;
        const length = Math.floor(sampleRate * 0.35);
        this.noiseBuffer = this.ctx.createBuffer(1, length, sampleRate);
        const data = this.noiseBuffer.getChannelData(0);
        for (let i = 0; i < length; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public play(type: SoundEffectType): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.compressor) return;

    const nowMs = performance.now();
    if (type === 'hover') {
      if (nowMs - this.lastHoverTime < 45) return;
      this.lastHoverTime = nowMs;
    } else if (type === 'click') {
      if (nowMs - this.lastClickTime < 50) return;
      this.lastClickTime = nowMs;
    }

    const now = ctx.currentTime;
    const out = this.compressor;

    try {
      if (type === 'hover') {
        // Crisp tactical menu tick: dual harmonic chirp
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sine';

        osc1.frequency.setValueAtTime(740, now);
        osc1.frequency.exponentialRampToValueAtTime(1480, now + 0.055);

        osc2.frequency.setValueAtTime(1110, now);
        osc2.frequency.exponentialRampToValueAtTime(2220, now + 0.055);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.16, now + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.06);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(out);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.065);
        osc2.stop(now + 0.065);
      } else if (type === 'click') {
        // Punchy game-menu confirm: low impact thump + sharp metallic synth chime
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(180, now);
        subOsc.frequency.exponentialRampToValueAtTime(48, now + 0.09);
        subGain.gain.setValueAtTime(0.28, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
        subOsc.connect(subGain);
        subGain.connect(out);
        subOsc.start(now);
        subOsc.stop(now + 0.1);

        const leadOsc = ctx.createOscillator();
        const leadFilter = ctx.createBiquadFilter();
        const leadGain = ctx.createGain();
        leadOsc.type = 'sawtooth';
        leadOsc.frequency.setValueAtTime(440, now);
        leadOsc.frequency.setValueAtTime(880, now + 0.03);
        leadOsc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);

        leadFilter.type = 'bandpass';
        leadFilter.frequency.setValueAtTime(1600, now);
        leadFilter.Q.setValueAtTime(2.5, now);

        leadGain.gain.setValueAtTime(0.22, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

        leadOsc.connect(leadFilter);
        leadFilter.connect(leadGain);
        leadGain.connect(out);
        leadOsc.start(now);
        leadOsc.stop(now + 0.135);
      } else if (type === 'navigate' || type === 'slash') {
        // Cinematic red-slash whoosh + chordal synth stab
        if (this.noiseBuffer) {
          const noise = ctx.createBufferSource();
          noise.buffer = this.noiseBuffer;
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(400, now);
          filter.frequency.exponentialRampToValueAtTime(3200, now + 0.12);
          filter.frequency.exponentialRampToValueAtTime(600, now + 0.24);
          filter.Q.setValueAtTime(1.8, now);

          const nGain = ctx.createGain();
          nGain.gain.setValueAtTime(0.001, now);
          nGain.gain.linearRampToValueAtTime(0.26, now + 0.04);
          nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

          noise.connect(filter);
          filter.connect(nGain);
          nGain.connect(out);
          noise.start(now);
          noise.stop(now + 0.26);
        }

        const freqs = [293.66, 440, 587.33]; // D4 - A4 - D5 power interval
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === 0 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(f * 0.5, now);
          osc.frequency.exponentialRampToValueAtTime(f, now + 0.06);

          gain.gain.setValueAtTime(0.14 / freqs.length, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

          osc.connect(gain);
          gain.connect(out);
          osc.start(now);
          osc.stop(now + 0.25);
        });
      } else if (type === 'intro') {
        // Dramatic cinematic intro riser & impact
        const bass = ctx.createOscillator();
        const bGain = ctx.createGain();
        bass.type = 'sawtooth';
        bass.frequency.setValueAtTime(73.42, now); // D2
        bass.frequency.exponentialRampToValueAtTime(146.83, now + 0.35);

        bGain.gain.setValueAtTime(0.001, now);
        bGain.gain.linearRampToValueAtTime(0.22, now + 0.05);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        bass.connect(bGain);
        bGain.connect(out);
        bass.start(now);
        bass.stop(now + 0.46);
      }
    } catch {
      // Ignore Web Audio restrictions until first interaction
    }
  }
}

export const soundEngine = new ProceduralSoundEngine();
