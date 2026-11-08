// ky-video/magazine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see ky-skills LICENSE · KYVIDEO-magazine-2611
import {Easing, interpolate} from 'remotion';
export const red = '#D23C22';
export const bg = '#F7F5F0';
export const ink = '#111';
export const grey = '#8A8580';
export const serif = '"Noto Serif SC", serif';
export const sans = '"Noto Sans SC", sans-serif';
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const prog = (f: number, s: number, d = 15) =>
  interpolate(f, [s, s + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
export const out = (f: number, dur: number, d = 8) =>
  interpolate(f, [dur - d, dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
