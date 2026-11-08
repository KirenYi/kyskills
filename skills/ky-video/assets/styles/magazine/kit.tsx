// ky-video/magazine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see ky-skills LICENSE · KYVIDEO-magazine-2611
// Magazine style kit: helpers + generic, reusable components.
// Every style package must export the same names (see references/style-contract.md).
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {red, ink, grey, serif, sans, prog, out, bg} from './theme';
import type {VProps} from '../engine/types';

// ---------- helpers ----------
export const glow = '0 0 18px rgba(247,245,240,0.95), 0 0 6px rgba(247,245,240,0.9)';
export const useSpring = (delay = 0, damping = 200) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: {damping}});
};
export const cueAt = (cues: number[], i: number) => cues[Math.min(i, cues.length - 1)] ?? 0;
const hl = (l: string, hi?: string, color = red) => {
  const parts = hi && l.includes(hi) ? l.split(hi) : [l];
  return parts.length > 1 ? (<>{parts[0]}<span style={{color}}>{hi}</span>{parts[1]}</>) : l;
};

// B-zone: left side next to the speaker (layouts A/B), fades out at the end
export const BZone: React.FC<{dur: number; children: React.ReactNode; top?: number}> = ({dur, children, top = 170}) => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', left: 130, top, width: 760, opacity: out(f, dur), textShadow: glow}}>{children}</div>;
};
// C-zone: full-screen panel, speaker sits on the right (layout C) or in the PiP (D)
export const CZone: React.FC<{dur: number; children: React.ReactNode; title?: string}> = ({dur, children, title}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: out(f, dur)}}>
      {title && <div style={{position: 'absolute', left: 120, top: 90}}><Kicker text={title} /></div>}
      {children}
    </AbsoluteFill>
  );
};
export const Kicker: React.FC<{text: string; delay?: number; color?: string}> = ({text, delay = 0, color = ink}) => {
  const f = useCurrentFrame();
  const p = prog(f, delay);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily: sans, fontSize: 24, letterSpacing: 6, color, opacity: p}}>
      <div style={{width: 48 * p, height: 2, background: red}} />
      {text}
    </div>
  );
};

// ---------- B-zone components (layout A/B) ----------
// rows: [left, right, highlight]; keys: keyword that triggers each row (first row defaults to 0)
export const TwoLines: React.FC<VProps & {rows: [string, string, boolean][]; keys?: string[]}> = ({dur, kw, rows, keys = []}) => {
  const f = useCurrentFrame();
  return (
    <BZone dur={dur} top={200}>
      {rows.map(([a, b, hi], i) => {
        const p = prog(f, keys[i] ? kw(keys[i], 30 * i) : 0);
        return (
          <div key={a} style={{display: 'flex', alignItems: 'center', gap: 36, fontFamily: serif, fontSize: 110, fontWeight: 700, opacity: p, transform: `translateX(${(1 - p) * -30}px)`, marginBottom: 20}}>
            <span style={{width: 170}}>{a}</span>
            <span style={{fontFamily: sans, fontWeight: 300, fontSize: 70, color: grey}}>→</span>
            <span style={{color: hi ? red : ink}}>{b}</span>
          </div>
        );
      })}
    </BZone>
  );
};

export const BigWord: React.FC<VProps & {word: string; sub?: string; key2?: string}> = ({dur, word, sub, key2, kw}) => {
  const k0 = key2 ? kw(key2, 0) : 0;
  const s = useSpring(k0, 14);
  const f = useCurrentFrame();
  return (
    <BZone dur={dur} top={150}>
      <div style={{fontFamily: serif, fontWeight: 900, fontSize: 230, lineHeight: 1, letterSpacing: -4, transform: `translateY(${(1 - s) * -80}px)`, opacity: Math.min(1, s * 1.5)}}>{word}</div>
      <div style={{width: 120 * prog(f, k0 + 10), height: 8, background: red, marginTop: 30}} />
      {sub && <div style={{fontFamily: sans, fontSize: 34, marginTop: 24, opacity: prog(f, 16)}}>{sub}</div>}
    </BZone>
  );
};

// "A ≠ B" with B struck through when key2 is spoken
export const NotEqual: React.FC<VProps & {left: string; right: string; key2: string}> = ({dur, left, right, key2, kw}) => {
  const f = useCurrentFrame();
  const r = kw(key2, 12);
  const strike = prog(f, r + 10, 12);
  return (
    <BZone dur={dur} top={230}>
      <div style={{display: 'flex', alignItems: 'center', gap: 40, fontFamily: serif, fontWeight: 700, fontSize: 120}}>
        <span style={{opacity: prog(f, 0)}}>{left}</span>
        <span style={{color: red, opacity: prog(f, 6), fontFamily: sans, fontWeight: 300}}>≠</span>
        <span style={{position: 'relative', opacity: prog(f, r)}}>
          {right}
          <span style={{position: 'absolute', left: -10, top: '52%', height: 8, background: red, width: `calc(${strike * 100}% + 20px)`}} />
        </span>
      </div>
    </BZone>
  );
};

// key phrase lines, one by one; hi = red part
export const Statement: React.FC<VProps & {lines: string[]; hi?: string; size?: number; kicker?: string; key2?: string}> = ({dur, lines, hi, size = 76, kicker, key2, kw}) => {
  const f = useCurrentFrame();
  const k0 = key2 ? Math.max(0, kw(key2, 0) - 8) : 0;
  return (
    <BZone dur={dur} top={200}>
      {kicker && <Kicker text={kicker} />}
      <div style={{marginTop: kicker ? 30 : 0}}>
        {lines.map((l, i) => {
          const p = prog(f, k0 + 6 + i * 10);
          return <div key={i} style={{fontFamily: serif, fontWeight: 700, fontSize: size, lineHeight: 1.35, opacity: p, transform: `translateY(${(1 - p) * 20}px)`}}>{hl(l, hi)}</div>;
        })}
      </div>
    </BZone>
  );
};

// chat bubble with typing; good = dark bubble, startKey = keyword that starts typing
export const Chat: React.FC<VProps & {text: string; good?: boolean; label?: string; hi?: string; startKey?: string; reply?: string}> = ({dur, text, good, label, hi, startKey, reply, kw}) => {
  const f = useCurrentFrame();
  const t0 = startKey ? kw(startKey, 20) : 0;
  const s = useSpring(t0, 16);
  const shown = Math.floor(interpolate(f, [t0 + 6, t0 + 6 + text.length * 2], [0, text.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const t = text.slice(0, shown);
  return (
    <BZone dur={dur} top={230}>
      {label && <Kicker text={label} color={good ? ink : grey} />}
      <div style={{marginTop: 26, display: 'inline-block', padding: '28px 40px', borderRadius: 28, borderBottomLeftRadius: 6, background: good ? ink : '#E4E1DB', color: good ? '#fff' : '#6A6560', fontFamily: sans, fontSize: 46, transform: `scale(${s})`, transformOrigin: 'left bottom', textShadow: 'none', maxWidth: 700, lineHeight: 1.5}}>
        {hi && t.includes(hi) ? hl(t, hi, '#FF6A4D') : t}
      </div>
      {reply && <div style={{fontFamily: sans, fontSize: 30, color: grey, marginTop: 24, opacity: prog(f, 40)}}>{reply}</div>}
    </BZone>
  );
};

// numbered method title: 01 看最好的
export const Method: React.FC<VProps & {n: string; title: string; sub?: string}> = ({dur, n, title, sub}) => {
  const f = useCurrentFrame();
  const s = useSpring(0, 200);
  return (
    <BZone dur={dur} top={210}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 30}}>
        <span style={{fontFamily: serif, fontStyle: 'italic', fontSize: 130, color: red, opacity: s, transform: `translateY(${(1 - s) * 30}px)`, display: 'inline-block'}}>{n}</span>
        <span style={{fontFamily: serif, fontWeight: 700, fontSize: 96, opacity: prog(f, 6)}}>{title}</span>
      </div>
      <div style={{height: 2, background: ink, width: 640 * prog(f, 8, 20), marginTop: 10}} />
      {sub && <div style={{fontFamily: sans, fontSize: 38, marginTop: 26, opacity: prog(f, 16)}}>{sub}</div>}
    </BZone>
  );
};

// numbered list that builds in quickly (table of contents for a section)
export const NumberList: React.FC<VProps & {title: string; items: string[]}> = ({dur, title, items}) => {
  const f = useCurrentFrame();
  return (
    <BZone dur={dur} top={130}>
      <Kicker text={title} />
      <div style={{marginTop: 20}}>
        {items.map((t, i) => {
          const p = prog(f, 6 + i * 5);
          return (
            <div key={t} style={{display: 'flex', alignItems: 'baseline', gap: 24, padding: '8px 0', borderBottom: '1.5px solid rgba(17,17,17,0.6)', opacity: p, transform: `translateX(${(1 - p) * -20}px)`, width: 560}}>
              <span style={{fontFamily: serif, fontStyle: 'italic', color: red, fontSize: 34}}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{fontFamily: serif, fontWeight: 700, fontSize: 44}}>{t}</span>
            </div>
          );
        })}
      </div>
    </BZone>
  );
};

// checklist: item i is ticked when shot i+1 of the range starts
export const CheckList: React.FC<VProps & {title: string; items: string[]}> = ({dur, cues, title, items}) => {
  const f = useCurrentFrame();
  return (
    <BZone dur={dur} top={150}>
      <Kicker text={title} />
      <div style={{marginTop: 24}}>
        {items.map((t, i) => {
          const p = prog(f, cueAt(cues, i + 1));
          return (
            <div key={t} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '14px 0', opacity: 0.15 + 0.85 * p}}>
              <span style={{width: 46, height: 46, border: `3px solid ${p > 0.5 ? red : ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: red, fontSize: 34, fontWeight: 700, fontFamily: sans}}>{p > 0.3 ? '✓' : ''}</span>
              <span style={{fontFamily: serif, fontWeight: 700, fontSize: 46}}>{t}</span>
            </div>
          );
        })}
      </div>
    </BZone>
  );
};

// sticky note with typed text
export const TypeNote: React.FC<VProps & {label: string; text: string}> = ({dur, label, text}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [10, 10 + text.length * 3], [0, text.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const s = useSpring(0, 14);
  return (
    <BZone dur={dur} top={220}>
      <div style={{background: '#FFF8DC', width: 720, padding: '44px 48px', boxShadow: '0 12px 30px rgba(0,0,0,0.12)', transform: `rotate(${-3 * s}deg) scale(${s})`, textShadow: 'none'}}>
        <div style={{fontFamily: sans, fontSize: 24, color: grey, letterSpacing: 4}}>{label}</div>
        <div style={{fontFamily: serif, fontWeight: 700, fontSize: 52, marginTop: 20, minHeight: 80, whiteSpace: 'nowrap'}}>
          {text.slice(0, n)}<span style={{opacity: f % 20 < 10 ? 1 : 0, color: red}}>|</span>
        </div>
        <div style={{height: 2, background: red, width: 520 * prog(f, 50, 20), marginTop: 8}} />
      </div>
    </BZone>
  );
};

// ---------- full-screen cards (layout E/D) ----------
const CN = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
export const ChapterCard: React.FC<VProps & {n: string; title: string; sub: string; tag?: string}> = ({dur, n, title, sub, tag = ''}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: bg, opacity: interpolate(f, [0, 6, dur - 8, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <div style={{position: 'absolute', top: 70, left: 120, right: 120, display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 6, fontFamily: sans}}>
        <span>第{CN[Number(n) - 1]}章 · CHAPTER {n}</span><span style={{color: red}}>{tag}</span>
      </div>
      <div style={{position: 'absolute', top: 118, left: 120, height: 2, background: ink, width: 1680 * prog(f, 0, 25)}} />
      <div style={{position: 'absolute', left: 120, top: 250, fontFamily: serif, fontStyle: 'italic', fontSize: 220, color: red, opacity: prog(f, 4), lineHeight: 1}}>{n}</div>
      <div style={{position: 'absolute', left: 120, top: 520, fontFamily: serif, fontWeight: 900, fontSize: 120, display: 'flex'}}>
        {title.split('').map((c, i) => {
          const s = spring({frame: f - 8 - i * 2, fps, config: {damping: 200}});
          return <span key={i} style={{opacity: s, transform: `translateY(${(1 - s) * 40}px)`, color: c === '？' ? red : ink}}>{c}</span>;
        })}
      </div>
      <div style={{position: 'absolute', left: 120, top: 700, width: 120 * prog(f, 18), height: 8, background: red}} />
      <div style={{position: 'absolute', left: 120, top: 740, fontFamily: sans, fontSize: 30, color: '#555', letterSpacing: 2, opacity: prog(f, 24)}}>{sub}</div>
    </AbsoluteFill>
  );
};

export const QuoteCard: React.FC<VProps & {en: string; zh: string; who: string; hi?: string}> = ({dur, en, zh, who, hi}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: bg, opacity: out(f, dur)}}>
      <div style={{position: 'absolute', left: 140, top: 60, fontFamily: serif, fontSize: 320, color: red, opacity: prog(f, 0), lineHeight: 1}}>“</div>
      <div style={{position: 'absolute', left: 160, top: 300, width: 1180}}>
        <div style={{fontFamily: serif, fontStyle: 'italic', fontSize: 50, lineHeight: 1.4, opacity: prog(f, 4)}}>{en}</div>
        <div style={{fontFamily: serif, fontWeight: 700, fontSize: 52, marginTop: 40, opacity: prog(f, 14)}}>{hl(zh, hi)}</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 50, fontFamily: sans, fontSize: 30, opacity: prog(f, 22)}}>
          <div style={{width: 60, height: 2, background: ink}} />{who}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// title card right after the hook
export const TitleSting: React.FC<VProps & {word: string; sub: string}> = ({dur, word, sub}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 200}});
  const q = sub.endsWith('？') ? sub.slice(0, -1) : sub;
  return (
    <AbsoluteFill style={{background: bg, opacity: interpolate(f, [0, 4, dur - 6, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center'}}>
        <div style={{fontFamily: serif, fontWeight: 900, fontSize: 300, lineHeight: 1, transform: `scale(${0.9 + 0.1 * s})`, opacity: s}}>{word}</div>
        <div style={{fontFamily: serif, fontSize: 72, marginTop: 30, opacity: prog(f, 8)}}>{q}{q !== sub && <span style={{color: red}}>？</span>}</div>
        <div style={{width: 120 * prog(f, 12), height: 8, background: red, margin: '36px auto 0'}} />
      </div>
    </AbsoluteFill>
  );
};

// ---------- hook headline over the opening clip ----------
// stamp appears when payKey is spoken (the answer); lines dim at that moment
export const HookOverlay: React.FC<VProps & {lines: string[]; hi: string; stamp?: string; payKey?: string}> = ({dur, lines, hi, stamp, payKey, kw}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pay = payKey ? kw(payKey, Math.round(dur * 0.8)) - 4 : 1e9;
  const slam = spring({frame: f, fps, config: {damping: 12, mass: 0.6}});
  const st = spring({frame: f - pay, fps, config: {damping: 10, mass: 0.5}});
  return (
    <div style={{position: 'absolute', left: 100, top: 110, width: 860, opacity: out(f, dur, 6)}}>
      <div style={{display: 'inline-block', background: 'rgba(247,245,240,0.92)', padding: '34px 44px 40px', transform: `scale(${0.85 + 0.15 * slam})`, transformOrigin: 'left top', opacity: Math.min(1, slam * 1.4), borderLeft: `10px solid ${red}`, boxShadow: '0 16px 40px rgba(0,0,0,0.12)'}}>
        {lines.map((l, i) => (
          <div key={i} style={{fontFamily: serif, fontWeight: 900, fontSize: i === 0 ? 64 : 84, lineHeight: 1.25, color: ink, opacity: 1 - 0.55 * Math.min(1, Math.max(0, st))}}>{hl(l, hi)}</div>
        ))}
      </div>
      {stamp && f >= pay && (
        <div style={{position: 'absolute', left: 60, bottom: -150, transform: `rotate(-6deg) scale(${2.2 - 1.2 * st})`, opacity: Math.min(1, st * 2), fontFamily: serif, fontWeight: 900, fontSize: 150, color: '#fff', background: red, padding: '0 36px', lineHeight: 1.25, boxShadow: '0 14px 30px rgba(210,60,34,0.35)'}}>{stamp}</div>
      )}
    </div>
  );
};

// ---------- captions ----------
export const CaptionBox: React.FC<{text: string}> = ({text}) => (
  <div style={{position: 'absolute', bottom: 56, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
    <div style={{background: 'rgba(247,245,240,0.9)', padding: '10px 30px', fontFamily: sans, fontWeight: 600, fontSize: 44, color: ink, letterSpacing: 1, borderLeft: `6px solid ${red}`}}>{text}</div>
  </div>
);
