// ky-video/engine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see kyskills LICENSE · KYVIDEO-fx-2611
// Style-independent motion primitives. Style kits build their components from these.
// Rise (masked rise), BlurIn, Odometer, Reveal (circle wipe + slow push), Grain, Vignette,
// typing schedule (type -> delete -> retype) and SFX pitch jitter. See references/motion.md.
import React from 'react';
import {Easing, interpolate, random, useCurrentFrame} from 'remotion';

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const eOut4 = Easing.bezier(0.25, 1, 0.5, 1); // easeOutQuart: fast start, long settle
export const eIn3 = Easing.bezier(0.32, 0, 0.67, 0); // easeInCubic: for exits
export const eIO3 = Easing.bezier(0.65, 0, 0.35, 1); // easeInOutCubic: for moves and wipes
export const ramp = (f: number, s: number, d: number) => clamp01((f - s) / d);

// Chinese -> one token per character; Latin words and numbers stay together
const tokens = (t: string) => t.match(/[A-Za-z0-9.%+\-’'“”"]+|\s+|./gu) ?? [];

/** Masked rise: each token rises 1.15em out of an invisible slit, easeOutQuart, staggered. hi = substring in hiColor. */
export const Rise: React.FC<{text: string; at: number; d?: number; stagger?: number; hi?: string; hiColor?: string; style?: React.CSSProperties}> = ({text, at, d = 16, stagger = 2, hi, hiColor, style}) => {
  const f = useCurrentFrame();
  const hs = hi ? text.indexOf(hi) : -1;
  let pos = 0;
  return (
    <span style={{display: 'inline-block', whiteSpace: 'pre', ...style}}>
      {tokens(text).map((t, i) => {
        const start = pos;
        pos += t.length;
        if (/^\s+$/.test(t)) return <span key={i}>{t}</span>;
        const isHi = hs >= 0 && start >= hs && start < hs + hi!.length;
        const p = eOut4(ramp(f, at + i * stagger, d));
        return (
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', padding: '0.06em 0.01em 0.1em', margin: '-0.06em -0.01em -0.1em'}}>
            <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 115}%)`, color: isHi ? hiColor : undefined}}>{t}</span>
          </span>
        );
      })}
    </span>
  );
};

/** Blur-in for secondary text: opacity, blur 0.28em -> 0, x 0.12em -> 0, scale 1.06 -> 1 (size = font px). */
export const BlurIn: React.FC<{at: number; d?: number; size?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, d = 16, size = 40, children, style}) => {
  const f = useCurrentFrame();
  const v = ramp(f, at, d);
  const g = eOut4(v);
  return (
    <div style={{opacity: Easing.out(Easing.quad)(v), filter: `blur(${(1 - g) * size * 0.28}px)`, transform: `translateX(${(1 - g) * size * 0.12}px) scale(${1 + (1 - g) * 0.06})`, transformOrigin: 'left center', ...style}}>
      {children}
    </div>
  );
};

/** Odometer: each digit column scrolls from `from` to `to` (rightmost leads), blurred while moving. Digits only. */
export const Odometer: React.FC<{from: string; to: string; at: number; d?: number; style?: React.CSSProperties}> = ({from, to, at, d = 22, style}) => {
  const f = useCurrentFrame();
  const n = Math.max(from.length, to.length);
  const a = from.padStart(n, '0'), b = to.padStart(n, '0');
  return (
    <span style={{display: 'inline-flex', fontVariantNumeric: 'tabular-nums', ...style}}>
      {Array.from({length: n}, (_, i) => {
        const x = Number(a[i]) || 0, y = Number(b[i]) || 0;
        const s = at + (n - 1 - i) * 3;
        const p = eIO3(ramp(f, s, d)), pv = eIO3(ramp(f - 1, s, d));
        const pos = x + (y - x) * p;
        const vel = Math.abs((y - x) * (p - pv));
        return (
          <span key={i} style={{display: 'inline-block', height: '1.1em', lineHeight: '1.1em', overflow: 'hidden', padding: '0 0.12em', margin: '0 -0.06em'}}>
            <span style={{display: 'block', transform: `translateY(${-pos * 1.1}em)`, filter: `blur(${Math.min(6, vel * 40)}px)`}}>
              {Array.from({length: 10}, (_, k) => <span key={k} style={{display: 'block', height: '1.1em'}}>{k}</span>)}
            </span>
          </span>
        );
      })}
    </span>
  );
};

/** Film grain: fresh noise every 2 frames, overlay blend. Engine draws it once over the whole frame. */
export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.06}) => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / 2) % 97;
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <filter id={`grain${seed}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#grain${seed})`} />
    </svg>
  );
};

export const Vignette: React.FC<{k?: number}> = ({k = 0.16}) => (
  <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(40,30,20,${k}) 100%)`}} />
);

/**
 * Full-screen card that opens as a circle growing from (cx, cy) — default: where the PiP speaker sits —
 * then fades out. Contents get a slow push-in (+2.5% over the card) and a light vignette.
 */
export const Reveal: React.FC<{dur: number; bg: string; cx?: number; cy?: number; d?: number; vignette?: number; children: React.ReactNode}> = ({dur, bg, cx = 1650, cy = 760, d = 14, vignette = 0.16, children}) => {
  const f = useCurrentFrame();
  const p = eIO3(ramp(f, 0, d));
  const o = interpolate(f, [dur - 8, dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', inset: 0, clipPath: p >= 1 ? undefined : `circle(${p * 2300}px at ${cx}px ${cy}px)`, opacity: o, background: bg, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${1 + 0.025 * (f / Math.max(1, dur))})`, transformOrigin: '40% 45%'}}>{children}</div>
      {vignette > 0 && <Vignette k={vignette} />}
    </div>
  );
};

// ---------- typing: optional draft that gets deleted, then the real text ----------
export type TypeSpec = {text: string; draft?: string; t0: number; t2: number};
/** t0 = when typing starts; t2 = when the real text starts (only used with a draft). */
export const typeSchedule = (text: string, draft: string | undefined, t0: number, t2: number) => {
  if (!draft) return {draft: '', text, t1: t0, del: t0, t2: t0};
  const tt2 = Math.max(t0 + draft.length * 3 + draft.length * 2 + 10, t2);
  const del = Math.max(t0 + draft.length * 3 + 6, tt2 - draft.length * 2 - 4);
  return {draft, text, t1: t0, del, t2: tt2};
};
export type TypeSched = ReturnType<typeof typeSchedule>;
export const typedAt = (f: number, s: TypeSched) => {
  if (s.draft && f < s.del) return s.draft.slice(0, Math.max(0, Math.floor((f - s.t1) / 3)));
  if (s.draft && f < s.t2) return s.draft.slice(0, Math.max(0, s.draft.length - Math.floor((f - s.del) / 2)));
  return s.text.slice(0, Math.max(0, Math.floor((f - s.t2) / 2.5)));
};
export const typedDoneAt = (s: TypeSched) => s.t2 + Math.ceil(s.text.length * 2.5);
/** one SFX per visible character change: 'type' when a char appears, 'del' when one disappears */
export const typeSfx = (s: TypeSched): [number, string][] => {
  const out: [number, string][] = [];
  let prev = '';
  for (let f = 0; f <= typedDoneAt(s) + 1; f++) {
    const t = typedAt(f, s);
    if (t !== prev) out.push([f, t.length < prev.length ? 'del' : 'type']);
    prev = t;
  }
  return out;
};

/** deterministic pitch jitter so repeated SFX don't sound mechanical */
export const jitter = (i: number, amt = 0.08) => 1 + (random(`sfx${i}`) - 0.5) * 2 * amt;
