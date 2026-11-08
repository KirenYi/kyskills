// ky-video/engine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see kyskills LICENSE · KYVIDEO-engine-2611
import timeline from '../video/timeline.json';
import type {Timeline, VProps} from './types';
export const TL = timeline as unknown as Timeline;
// keyword -> frame (relative to `from`) when it is spoken inside [from, to]
export const makeKw = (from: number, to: number) => (text: string, fb = 0) => {
  const ws = TL.words.filter((w) => w.f >= from - 6 && w.f <= to);
  const str = ws.map((w) => w.c).join('');
  const i = str.indexOf(text.replace(/\s/g, ''));
  return i >= 0 ? Math.max(0, ws[i].f - from) : fb;
};
export const byName = (n: string) => {
  const s = TL.shots.find((x) => x.name === n);
  if (!s) throw new Error(`shot "${n}" not in timeline.json (check scenes.tsx vs edl.json)`);
  return s;
};
// props for a visual spanning shots a..b
export const propsFor = (a: string, b: string): VProps & {from: number} => {
  const s0 = byName(a), s1 = byName(b);
  const from = s0.start, dur = s1.end - s0.start;
  const cues = TL.shots.filter((s) => s.start >= s0.start && s.start <= s1.start).map((s) => s.start - from);
  return {from, dur, cues, kw: makeKw(from, from + dur)};
};
