// ky-video/magazine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see kyskills LICENSE · KYVIDEO-magazine-2611
// Magazine cover templates. Rule: covers raise the question, never show the answer.
// Each "suspense" cover = struck-through wrong belief + big question with a red ？？ box.
import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {bg, ink, red, serif, sans, grey} from './theme';

// photo = a 1920x1080 frame grab in public/; face = face position in that frame
export type PhotoSpec = {file: string; face: [number, number]};
export const Photo: React.FC<{photo: PhotoSpec; scale: number; faceX: number; faceY: number}> = ({photo, scale, faceX, faceY}) => {
  const L = faceX - photo.face[0] * scale, T = faceY - photo.face[1] * scale;
  return <Img src={staticFile(photo.file)} style={{position: 'absolute', left: L, top: T, width: 1920 * scale, height: 1080 * scale}} />;
};
export const Badge: React.FC<{text: string; style?: React.CSSProperties}> = ({text, style}) => (
  <div style={{position: 'absolute', display: 'flex', alignItems: 'center', gap: 12, background: ink, color: '#fff', fontFamily: sans, fontWeight: 600, fontSize: 34, padding: '12px 24px', ...style}}>
    <span style={{width: 14, height: 14, borderRadius: 7, background: red}} />{text}
  </div>
);
export const Q: React.FC<{size: number; text?: string}> = ({size, text = '？？'}) => (
  <span style={{display: 'inline-block', background: red, color: '#fff', padding: `0 ${size * 0.3}px`, margin: `0 ${size * 0.09}px`, transform: 'rotate(-3deg)'}}>{text}</span>
);
export const Strike: React.FC<{size: number; text: string}> = ({size, text}) => (
  <div style={{position: 'relative', display: 'inline-block', fontFamily: serif, fontWeight: 900, fontSize: size, color: grey}}>
    {text}
    <div style={{position: 'absolute', left: -10, right: -10, top: '52%', height: size * 0.12, background: red}} />
  </div>
);

// big: lines of the question; the literal token "？？" in a line becomes the red box
type CoverProps = {photo: PhotoSpec; strike: string; big: string[]; badge?: string};
const Lines: React.FC<{big: string[]; size: number}> = ({big, size}) => (
  <>{big.map((l, i) => {
    const [a, b] = l.split('？？');
    return <div key={i}>{a}{b !== undefined && <><Q size={size} />{b}</>}</div>;
  })}</>
);

// 16:9 (1920x1080) — B站 / YouTube
export const Suspense169: React.FC<CoverProps> = ({photo, strike, big, badge}) => (
  <AbsoluteFill style={{background: bg}}>
    <Photo photo={photo} scale={1.25} faceX={1420} faceY={470} />
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1080, background: 'linear-gradient(90deg, rgba(247,245,240,0.97) 72%, rgba(247,245,240,0))'}} />
    <div style={{position: 'absolute', left: 90, top: 170}}>
      <Strike size={100} text={strike} />
      <div style={{fontFamily: serif, fontWeight: 900, fontSize: 132, color: ink, marginTop: 44, lineHeight: 1.2}}><Lines big={big} size={132} /></div>
    </div>
    {badge && <Badge text={badge} style={{left: 90, bottom: 60}} />}
  </AbsoluteFill>
);
// 4:3 (1440x1080) — 抖音横封面 / 视频号分享卡片 / B站
export const Suspense43: React.FC<CoverProps> = ({photo, strike, big, badge}) => (
  <AbsoluteFill style={{background: bg}}>
    <Photo photo={photo} scale={1.3} faceX={1090} faceY={480} />
    <div style={{position: 'absolute', left: 0, top: 0, width: 860, height: 1080, background: 'linear-gradient(90deg, rgba(247,245,240,0.97) 70%, rgba(247,245,240,0))'}} />
    <div style={{position: 'absolute', left: 70, top: 190}}>
      <Strike size={80} text={strike} />
      <div style={{fontFamily: serif, fontWeight: 900, fontSize: 104, color: ink, marginTop: 40, lineHeight: 1.25}}><Lines big={big} size={104} /></div>
    </div>
    {badge && <Badge text={badge} style={{left: 70, bottom: 56}} />}
  </AbsoluteFill>
);
// 3:4 (1080x1440) — 抖音竖封面 / 视频号主页卡片
export const Suspense34: React.FC<CoverProps> = ({photo, strike, big, badge}) => (
  <AbsoluteFill style={{background: bg}}>
    <Photo photo={photo} scale={1.55} faceX={540} faceY={1060} />
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 740, background: 'linear-gradient(180deg, rgba(247,245,240,1) 80%, rgba(247,245,240,0))'}} />
    <div style={{position: 'absolute', left: 80, top: 80}}>
      <Strike size={84} text={strike} />
      <div style={{fontFamily: serif, fontWeight: 900, fontSize: 118, color: ink, marginTop: 36, lineHeight: 1.25}}><Lines big={big} size={118} /></div>
      {badge && <Badge text={badge} style={{position: 'relative', marginTop: 36, display: 'inline-flex'}} />}
    </div>
  </AbsoluteFill>
);
