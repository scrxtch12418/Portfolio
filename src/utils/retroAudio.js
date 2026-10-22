// Compatibility wrapper routing all audio calls to the centralized soundManager
import { soundManager } from './soundManager';

export function initAudio() {
  soundManager.init();
}

export function setSoundEnabled(enabled) {
  soundManager.setMuted(!enabled);
}

export function isSoundEnabled() {
  return !soundManager.isMuted;
}

export function playBeep(freq, type, duration, vol) {
  soundManager.playTone(freq, type, duration, 0, vol);
}

export function playClick() {
  soundManager.playClick();
}

export function playWindowOpen() {
  soundManager.playWindowOpen();
}

export function playWindowClose() {
  soundManager.playWindowClose();
}

export function playErrorBeep() {
  soundManager.playError();
}

export function playStartupChime() {
  soundManager.playLogon();
}

export function playGameScore() {
  soundManager.playScore();
}

export function playGameOver() {
  soundManager.playGameOver();
}

export function playSuccessChime() {
  soundManager.playGameWin();
}
