// ky-video/bigtext · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see kyskills LICENSE · KYVIDEO-bigtext-2611
// "Big text" cover: works with any style package (a series look that does not depend on the video style).
// Real photo full-bleed + top line (white, black stroke) + optional small subtitle + bottom line (lime gradient, the brand mark).
// Rules: ~4 characters per line (a line auto-sizes to fill the width), face in the middle band, question only, never the answer.
// One 3:4 image shows uncropped in the profile grids of 抖音 / 小红书 / 视频号, so design for 3:4 first.
import React from 'react';
import {AbsoluteFill, Img, continueRender, delayRender, staticFile} from 'remotion';

const FAMILY = 'KY Cover Sans';
if (typeof document !== 'undefined') {
  // Noto Sans SC (SIL OFL 1.1), served from public/fonts by new_project.py
  const h = delayRender('cover font');
  new FontFace(FAMILY, `url(${staticFile('fonts/NotoSansSC.ttf')}) format('truetype')`, {weight: '200 900'})
    .load().then((f) => document.fonts.add(f)).catch((e) => console.error('cover font failed', e)).finally(() => continueRender(h));
}
const FONT = `"${FAMILY}", "Noto Sans SC", sans-serif`;
const GRADS = {
  lime: 'linear-gradient(180deg, #F6FF7A 0%, #C8F04A 45%, #6FB82E 100%)',
  gold: 'linear-gradient(180deg, #FFF3A0 0%, #FFD23A 50%, #F29A1A 100%)',
  white: '',
};
export type BigTextAccent = keyof typeof GRADS;
export type BigTextProps = {
  w: number; h: number;
  photo: string;                 // file in public/: dedicated cover photo (best) or a frame grab
  photoWide?: string;            // horizontal photo for 4:3 / 16:9 (e.g. a frame grab of the 16:9 footage); cropping a vertical photo makes the face too big
  focus?: [number, number];      // 0–1 point of the photo kept in view when cropping (default: centre, slightly high)
  top: string; bottom: string; sub?: string;
  accent?: BigTextAccent;        // bottom line colour; keep the same one for every episode
  tag?: string;                  // optional small corner tag, e.g. "动画全由 AI 制作"
};

// CJK = 1 unit, ASCII = 0.6
const units = (s: string) => [...s].reduce((n, c) => n + (/[\x00-\x7F]/.test(c) ? 0.6 : 1), 0);
const fit = (s: string, w: number, max: number) => Math.min(max, (w * 0.84) / (units(s) * 0.88));

const Line: React.FC<{text: string; size: number; y: number; w: number; grad?: string}> = ({text, size, y, w, grad}) => {
  const base: React.CSSProperties = {position: 'absolute', left: 0, width: w, top: y, textAlign: 'center', fontFamily: FONT, fontWeight: 900,
    fontSize: size, lineHeight: 1.08, letterSpacing: -2, transform: 'scaleX(0.88)', whiteSpace: 'nowrap'};
  return (<>
    <div style={{...base, color: '#111', WebkitTextStroke: `${size * 0.16}px #111`, filter: 'drop-shadow(0 8px 14px rgba(0,0,0,.55))'}}>{text}</div>
    <div style={{...base, ...(grad ? {backgroundImage: grad, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'} : {color: '#fff'})}}>{text}</div>
  </>);
};
const Sub: React.FC<{text: string; size: number; y: number; w: number}> = ({text, size, y, w}) => {
  const base: React.CSSProperties = {position: 'absolute', left: 0, width: w, top: y, textAlign: 'center', fontFamily: FONT, fontWeight: 800,
    fontSize: size, whiteSpace: 'nowrap', transform: 'scaleX(0.9)'};
  return (<><div style={{...base, color: '#111', WebkitTextStroke: `${size * 0.18}px #111`}}>{text}</div><div style={{...base, color: '#fff'}}>{text}</div></>);
};

export const BigTextCover: React.FC<BigTextProps> = ({w, h, photo, photoWide, focus = [0.5, 0.4], top, bottom, sub, accent = 'lime', tag}) => {
  const u = Math.min(w, h * 0.75);          // text column = the 3:4 width, so 4:3 / 16:9 keep the same proportions
  const ts = fit(top, u, 300 * u / 1080), bs = fit(bottom, u, 320 * u / 1080);
  const by = h - bs * 1.1 - h * 0.015;
  return (
    <AbsoluteFill style={{background: '#111'}}>
      <Img src={staticFile(w > h && photoWide ? photoWide : photo)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${focus[0] * 100}% ${focus[1] * 100}%`}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 62%, rgba(0,0,0,.5) 100%)'}} />
      <Line w={w} y={h * 0.012} size={ts} text={top} />
      {sub && <Sub w={w} y={by - u * 0.1} size={u * 0.072} text={sub} />}
      <Line w={w} y={by} size={bs} text={bottom} grad={GRADS[accent] || undefined} />
      {tag && <div style={{position: 'absolute', right: w * 0.04, top: h * 0.3, background: '#111', color: '#C8F04A', fontFamily: FONT, fontWeight: 800,
        fontSize: u * 0.034, padding: '8px 18px', borderRadius: 10, transform: 'rotate(4deg)'}}>{tag}</div>}
    </AbsoluteFill>
  );
};
