// Centralized Sound Manager for Windows 7 Aero Portfolio Experience
// High-fidelity synthesized audio via Web Audio API.
// No autoplay without user interaction. Master mute & volume controls with localStorage persistence.

function getStorageItem(key, fallback = null) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key) ?? fallback;
    }
  } catch {
    return fallback;
  }
  return fallback;
}

function setStorageItem(key, val) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, String(val));
    }
  } catch {}
}

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.isMuted = getStorageItem('sarvos_sound_muted') === 'true';
    this.volume = parseFloat(getStorageItem('sarvos_sound_volume', '0.7') || '0.7');
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    setStorageItem('sarvos_sound_muted', muted);
    if (!muted) this.init();
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    setStorageItem('sarvos_sound_volume', this.volume);
    if (this.isMuted && this.volume > 0) {
      this.setMuted(false);
    }
  }

  playTone(freq, type = 'sine', duration = 0.1, delay = 0, gainLevel = 0.1) {
    if (this.isMuted || this.volume <= 0) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      const startTime = this.audioCtx.currentTime + delay;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      const effectiveGain = gainLevel * this.volume;
      gainNode.gain.setValueAtTime(0.0001, startTime);
      gainNode.gain.exponentialRampToValueAtTime(effectiveGain, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {
      // Graceful fallback
    }
  }

  // Windows 7 Logon Chime (Iconic 4-note chord: C - E - G - B / C)
  playLogon() {
    if (this.isMuted) return;
    const chords = [
      { f: 523.25, d: 0.0, dur: 0.9, type: 'sine' },  // C5
      { f: 659.25, d: 0.15, dur: 0.8, type: 'sine' }, // E5
      { f: 783.99, d: 0.3, dur: 1.0, type: 'sine' },  // G5
      { f: 1046.5, d: 0.45, dur: 1.2, type: 'sine' }  // C6
    ];
    chords.forEach(c => this.playTone(c.f, c.type, c.dur, c.d, 0.15));
  }

  // Windows 7 Navigation Click
  playClick() {
    this.playTone(1200, 'sine', 0.03, 0, 0.06);
    this.playTone(800, 'triangle', 0.02, 0.01, 0.04);
  }

  // Window Open
  playWindowOpen() {
    this.playTone(440, 'sine', 0.08, 0, 0.08);
    this.playTone(554.37, 'sine', 0.12, 0.04, 0.08);
    this.playTone(659.25, 'sine', 0.18, 0.08, 0.09);
  }

  // Window Close
  playWindowClose() {
    this.playTone(659.25, 'sine', 0.08, 0, 0.07);
    this.playTone(523.25, 'sine', 0.12, 0.04, 0.07);
  }

  // Window Minimize
  playWindowMinimize() {
    this.playTone(600, 'triangle', 0.06, 0, 0.05);
    this.playTone(400, 'triangle', 0.08, 0.03, 0.05);
  }

  // Window Restore / Maximize
  playWindowRestore() {
    this.playTone(400, 'triangle', 0.06, 0, 0.05);
    this.playTone(620, 'triangle', 0.09, 0.03, 0.06);
  }

  // Start Menu Open
  playStartMenu() {
    this.playTone(480, 'sine', 0.06, 0, 0.06);
    this.playTone(720, 'sine', 0.09, 0.03, 0.07);
  }

  // Notification Balloon Chime
  playNotification() {
    this.playTone(659.25, 'sine', 0.12, 0, 0.08);
    this.playTone(880.00, 'sine', 0.22, 0.08, 0.1);
  }

  // Error / Warning Ding
  playError() {
    this.playTone(180, 'sawtooth', 0.2, 0, 0.12);
  }

  // Game Score
  playScore() {
    this.playTone(880, 'square', 0.06, 0, 0.05);
    this.playTone(1174.66, 'square', 0.08, 0.04, 0.05);
  }

  // Game Win
  playGameWin() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, idx) => {
      this.playTone(f, 'sine', 0.3, idx * 0.12, 0.12);
    });
  }

  // Game Over
  playGameOver() {
    this.playTone(330, 'triangle', 0.2, 0, 0.08);
    this.playTone(277, 'triangle', 0.25, 0.12, 0.08);
    this.playTone(220, 'triangle', 0.35, 0.24, 0.09);
  }
}

export const soundManager = new SoundManager();
