// ky-video/magazine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see kyskills LICENSE · KYVIDEO-magazine-2611
// Style package entry. Engine and scenes import everything from '../style'.
import './fonts';
export * from './theme';
export * from './kit';
export * from './layout';
export * from './covers';
import style from './style.json';
export const SFX_VOL: Record<string, number> = style.sfx;
