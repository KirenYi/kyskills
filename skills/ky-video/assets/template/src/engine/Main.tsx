// ky-video/engine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see ky-skills LICENSE · KYVIDEO-engine-2611
// Generic engine: speaker video + layout transitions, visuals, hook, captions, SFX.
// Do not edit per video. Per-video content lives in src/video/scenes.tsx.
import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import project from '../../project.json';
import {TL, makeKw, byName, propsFor} from './tl';
import * as St from '../style';
import {VIS, SFX_MAP, HOOK} from '../video/scenes';
import type {Geo} from '../style';

const FACE = project.face as [number, number];
const geo = (s: (typeof TL.shots)[number]) => St.geoFor(s.layout, s.zoom ?? 1, FACE);
const mix = (a: Geo, b: Geo, p: number): Geo => {
  const o = {} as Geo;
  (Object.keys(a) as (keyof Geo)[]).forEach((k) => (o[k] = a[k] + (b[k] - a[k]) * p));
  return o;
};

// rendered twice: under the visuals for flat layouts (A/B), above full-screen panels otherwise
const VideoLayer: React.FC<{over: boolean}> = ({over}) => {
  const f = useCurrentFrame();
  const idx = Math.max(0, TL.shots.findIndex((s) => f >= s.start && f < s.end));
  const cur = TL.shots[idx], prev = TL.shots[idx - 1];
  if (St.isFlat(cur.layout) === over) return null;
  let g = geo(cur);
  // zoom changes inside A/B are hard cuts (like a second camera); layout changes animate
  if (prev && !(St.isFlat(prev.layout) && St.isFlat(cur.layout))) {
    const p = interpolate(f, [cur.start, cur.start + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: St.ease});
    g = mix(geo(prev), g, p);
  }
  return (
    <div style={{position: 'absolute', left: g.x, top: g.y, width: g.w, height: g.h, overflow: 'hidden', borderRadius: g.r, opacity: g.o, boxShadow: g.r > 1 ? '0 12px 40px rgba(0,0,0,0.18)' : 'none'}}>
      <OffthreadVideo src={staticFile('cut.mp4')} style={{position: 'absolute', left: g.L - g.x, top: g.T - g.y, width: 1920 * g.S, height: 1080 * g.S}} />
    </div>
  );
};

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const c = TL.captions.find((x) => f >= x.start && f < x.end);
  return c ? <St.CaptionBox text={c.text} /> : null;
};

const SFX: React.FC = () => {
  const items: [number, string][] = [];
  VIS.forEach(([a, b]) => {
    const fn = SFX_MAP[a];
    if (!fn) return;
    const p = propsFor(a, b);
    fn(p).forEach(([off, type]) => items.push([Math.max(0, p.from + off), type]));
  });
  return (
    <>
      {items.map(([from, type], i) => (
        <Sequence key={i} from={from} durationInFrames={45} layout="none">
          <Audio src={staticFile(`sfx_${type}.wav`)} volume={St.SFX_VOL[type] ?? 0.5} />
        </Sequence>
      ))}
    </>
  );
};

const Hook: React.FC<{v: number}> = ({v}) => {
  if (!HOOK) return null;
  const h = byName('hook');
  const dur = h.end - h.start;
  const kw = makeKw(h.start, h.end);
  const pay = HOOK.payKey ? kw(HOOK.payKey, Math.round(dur * 0.8)) - 4 : -1;
  return (
    <Sequence from={h.start} durationInFrames={dur} layout="none">
      <AbsoluteFill><St.HookOverlay dur={dur} cues={[0]} kw={kw} {...HOOK.variants[v]} stamp={HOOK.stamp} payKey={HOOK.payKey} /></AbsoluteFill>
      <Audio src={staticFile('sfx_impact.wav')} volume={0.7} />
      {pay >= 0 && <Sequence from={pay} layout="none"><Audio src={staticFile('sfx_impact.wav')} volume={0.8} /></Sequence>}
      {pay >= 0 && <Sequence from={pay + 2} layout="none"><Audio src={staticFile('sfx_ding.wav')} volume={0.4} /></Sequence>}
    </Sequence>
  );
};

export const Main: React.FC<{hook?: number}> = ({hook}) => (
  <AbsoluteFill style={{background: St.bg}}>
    <VideoLayer over={false} />
    {VIS.map(([a, b, render]) => {
      const {from, ...p} = propsFor(a, b);
      return (
        <Sequence key={a} from={from} durationInFrames={p.dur} layout="none">
          <AbsoluteFill>{render(p)}</AbsoluteFill>
        </Sequence>
      );
    })}
    <Hook v={hook ?? HOOK?.defaultVariant ?? 0} />
    <VideoLayer over />
    <Captions />
    <SFX />
  </AbsoluteFill>
);

export const mainDuration = TL.durationInFrames;
// hook previews run until 2.5s after the shot following the hook
const afterHook = TL.shots.findIndex((s) => s.name === 'hook') + 1;
export const hookPreviewDuration = afterHook > 0 && TL.shots[afterHook] ? TL.shots[afterHook].end + 75 : 300;
