// 《品味》 topic-specific visuals (not part of the style package).
import React from 'react';
import {AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {red, ink, grey, serif, sans, prog, out, bg, glow, useSpring, cueAt, BZone, CZone, Kicker} from '../style';
import type {VProps} from '../engine/types';

export const Minus: React.FC<VProps> = ({dur, kw}) => {
  const f = useCurrentFrame();
  const k = kw('做减法', 30);
  const s = useSpring(k, 12);
  return (
    <BZone dur={dur} top={220}>
      <Kicker text="品味的核心" />
      <div style={{display: 'flex', alignItems: 'center', gap: 40, marginTop: 30}}>
        <div style={{width: 120 * s, height: 22, background: red}} />
        <div style={{fontFamily: serif, fontWeight: 900, fontSize: 140, opacity: prog(f, k + 4)}}>做减法</div>
      </div>
    </BZone>
  );
};

export const Arrows: React.FC<VProps> = ({dur, kw}) => {
  const f = useCurrentFrame();
  const at = [kw('做东西', 0), kw('东西的能力', 80) - 6];
  const items: [string, string, string][] = [['做东西', '↓', grey], ['挑东西', '↑', red]];
  return (
    <BZone dur={dur} top={230}>
      {items.map(([w, a, c], i) => {
        const p = prog(f, at[i]);
        return (
          <div key={w} style={{display: 'flex', alignItems: 'center', gap: 30, fontFamily: serif, fontWeight: 700, fontSize: 100, opacity: p, marginBottom: 16}}>
            <span>{w}</span>
            <span style={{color: c, fontFamily: sans, fontWeight: 300, transform: `translateY(${(1 - p) * (a === '↑' ? 40 : -40)}px)`}}>{a}</span>
            <span style={{fontFamily: sans, fontSize: 34, color: c}}>{i === 0 ? '越来越便宜' : '越来越值钱'}</span>
          </div>
        );
      })}
    </BZone>
  );
};

export const DoToChoose: React.FC<VProps> = ({dur, kw}) => {
  const f = useCurrentFrame();
  const kb = kw('变成', 30), kc = kw('选和', 45), kd = kw('定标准', 60);
  const strike = prog(f, kb, 10);
  return (
    <BZone dur={dur} top={260}>
      <div style={{display: 'flex', alignItems: 'center', gap: 30, fontFamily: serif, fontWeight: 700, fontSize: 96}}>
        <span style={{position: 'relative', color: strike > 0.5 ? grey : ink}}>做<span style={{position: 'absolute', left: -6, top: '52%', height: 6, background: red, width: `${strike * 110}%`}} /></span>
        <span style={{fontFamily: sans, fontWeight: 300, opacity: prog(f, kb + 4)}}>→</span>
        <span style={{opacity: prog(f, kc)}}>选</span>
        <span style={{color: red, opacity: prog(f, kd)}}>+ 定标准</span>
      </div>
    </BZone>
  );
};

export const Coffee: React.FC<VProps> = ({dur, cues, kw}) => {
  const f = useCurrentFrame();
  const ku = kw('苦', 30);
  const p = prog(f, kw('酸', cueAt(cues, 1) + 20));
  const draw = prog(f, 0, 30);
  return (
    <BZone dur={dur} top={190}>
      <svg width={240} height={220} style={{overflow: 'visible'}}>
        <path d="M30 60 L50 200 L170 200 L190 60 Z M190 90 C 250 90, 250 160, 182 160" fill="none" stroke={ink} strokeWidth={5} strokeLinejoin="round" strokeDasharray={900} strokeDashoffset={900 * (1 - draw)} />
        {[70, 110, 150].map((x, i) => (
          <path key={x} d={`M${x} 40 C ${x - 14} 20, ${x + 14} 10, ${x} -10`} stroke={grey} strokeWidth={4} fill="none" opacity={prog(f, 20 + i * 5)} />
        ))}
      </svg>
      <div style={{display: 'flex', gap: 40, fontFamily: serif, fontWeight: 900, fontSize: 120, marginTop: 30}}>
        {['酸', '苦', '香'].map((c, i) => {
          const visible = i === 1 ? prog(f, ku) : p;
          return <span key={c} style={{opacity: visible, color: i === 1 ? ink : red, transform: `translateX(${i === 1 ? 0 : (1 - p) * (i === 0 ? 60 : -60)}px)`}}>{c}</span>;
        })}
      </div>
    </BZone>
  );
};

export const AorB: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const s = useSpring(0, 10);
  return (
    <BZone dur={dur} top={220}>
      <div style={{fontFamily: serif, fontWeight: 900, fontSize: 150, transform: `scale(${s})`, transformOrigin: 'left center'}}>
        A <span style={{fontStyle: 'italic', fontWeight: 400, fontSize: 90, color: grey}}>or</span> <span style={{color: red}}>B</span> ？
      </div>
      <div style={{fontFamily: sans, fontSize: 36, marginTop: 20, opacity: prog(f, 15)}}>评论区告诉我</div>
    </BZone>
  );
};

// ---------- C: left panel visuals (x 100–980) ----------

const PH = 130, PG = 16, PW = 560, PCX = 280;

const wAt = (y: number) => (PW * (y + 50)) / (3 * PH + 2 * PG + 50);

const band = (i: number) => {
  const y0 = i * (PH + PG), y1 = y0 + PH;
  return [[PCX - wAt(y0) / 2, y0], [PCX + wAt(y0) / 2, y0], [PCX + wAt(y1) / 2, y1], [PCX - wAt(y1) / 2, y1]];
};

const perim = (p: number[][]) => p.reduce((a, c, i) => { const n = p[(i + 1) % 4]; return a + Math.hypot(n[0] - c[0], n[1] - c[1]); }, 0);

export const PyramidSVG: React.FC<{starts: number[]; topFill: number; lit?: number[]; small?: boolean}> = ({starts, topFill, lit}) => {
  const f = useCurrentFrame();
  const names = [['选择', '敢按自己的标准选'], ['判断', '说得出为什么'], ['感知', '看得出差别']]; // top→bottom
  return (
    <g>
      {names.map(([k, d], i) => {
        const st = starts[2 - i];
        const p = band(i), L = perim(p);
        const draw = prog(f, st, 24);
        const t = prog(f, st + 12);
        const yMid = i * (PH + PG) + PH / 2;
        const isTop = i === 0;
        const litOn = lit ? lit.includes(i) : false;
        const fillOp = isTop ? topFill : litOn ? 1 : 0;
        return (
          <g key={k}>
            <polygon points={p.map((q) => q.join(',')).join(' ')} fill={red} fillOpacity={fillOp} stroke={ink} strokeWidth={2.5} strokeDasharray={L} strokeDashoffset={L * (1 - draw)} />
            <text x={PCX} y={yMid + 16} textAnchor="middle" fontFamily={serif} fontWeight={700} fontSize={46} letterSpacing={6} fill={fillOp > 0.5 ? '#fff' : ink} opacity={t}>{k}</text>
            {!lit && <text x={PCX + wAt(yMid) / 2 + 30} y={yMid + 12} fontFamily={sans} fontSize={30} fill="#333" opacity={t}>{d}</text>}
          </g>
        );
      })}
    </g>
  );
};

export const Pyramid: React.FC<VProps> = ({dur, cues, kw}) => {
  const f = useCurrentFrame();
  // cues: 11 intro, 12 感知, 13 fonts, 14 判断, 15 tags, 16 选择
  const starts = [cueAt(cues, 1), cueAt(cues, 3), cueAt(cues, 5)];
  const topFill = prog(f, cueAt(cues, 5) + 24, 15);
  const fontsP = prog(f, kw('两种字体', cueAt(cues, 2))) * (1 - prog(f, cueAt(cues, 3)));
  const tagsP = prog(f, kw('留白', cueAt(cues, 4) + 30)) * (1 - prog(f, cueAt(cues, 5)));
  return (
    <CZone dur={dur} title="品味的三层">
      <svg width={1000} height={760} style={{position: 'absolute', left: 120, top: 200}}>
        <PyramidSVG starts={starts} topFill={topFill} />
      </svg>
      {/* fonts mini demo */}
      <div style={{position: 'absolute', left: 140, top: 740, display: 'flex', gap: 40, opacity: fontsP}}>
        <div style={{border: '1.5px solid #111', padding: '14px 26px', fontFamily: serif, fontSize: 44}}>品味 Aa</div>
        <div style={{border: '1.5px solid #111', padding: '14px 26px', fontFamily: sans, fontSize: 44}}>品味 Aa</div>
        <div style={{fontFamily: sans, fontSize: 26, color: grey, alignSelf: 'center'}}>一样吗？</div>
      </div>
      <div style={{position: 'absolute', left: 140, top: 740, display: 'flex', gap: 24, opacity: tagsP}}>
        {['留白多', '颜色少'].map((t) => (
          <div key={t} style={{background: ink, color: '#fff', padding: '12px 28px', fontFamily: sans, fontSize: 36}}>{t}</div>
        ))}
      </div>
    </CZone>
  );
};

const Curve: React.FC<{draw: number; hi: number; dot: number}> = ({draw, hi, dot}) => {
  // bell curve in 780 x 400
  const W = 780, H = 380;
  const pts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = i / 100;
    const y = Math.exp(-Math.pow((x - 0.5) / 0.15, 2) / 2);
    pts.push(`${x * W},${H - y * (H - 40)}`);
  }
  const d = 'M' + pts.join(' L');
  const dotX = interpolate(dot, [0, 1], [W * 0.5, W * 0.9]);
  const dotY = interpolate(dot, [0, 1], [40, 30]);
  return (
    <svg width={W + 40} height={H + 80} style={{overflow: 'visible'}}>
      <rect x={W * 0.35} y={0} width={W * 0.3} height={H} fill={red} opacity={0.12 * hi} />
      <path d={d} fill="none" stroke={ink} strokeWidth={3} strokeDasharray={1400} strokeDashoffset={1400 * (1 - draw)} />
      <line x1={0} y1={H} x2={W} y2={H} stroke={ink} strokeWidth={1.5} />
      <text x={W / 2} y={H + 50} textAnchor="middle" fontFamily={sans} fontSize={30} fill={ink} opacity={draw}>最常见 · 最安全</text>
      <text x={W / 2} y={H / 2 + 60} textAnchor="middle" fontFamily={serif} fontWeight={700} fontSize={54} fill={ink} opacity={hi}>AI</text>
      {dot > 0 && (
        <g>
          <line x1={W * 0.5} y1={40} x2={dotX} y2={dotY} stroke={red} strokeWidth={2} strokeDasharray="8 8" opacity={dot} />
          <circle cx={dotX} cy={dotY} r={16} fill={red} />
          <text x={dotX} y={dotY - 34} textAnchor="middle" fontFamily={serif} fontWeight={700} fontSize={46} fill={red} opacity={dot}>品味</text>
        </g>
      )}
    </svg>
  );
};

export const BellAI: React.FC<VProps> = ({dur, cues}) => {
  const f = useCurrentFrame();
  return (
    <CZone dur={dur} title="AI 给你的是平均值">
      <div style={{position: 'absolute', left: 120, top: 300}}>
        <Curve draw={prog(f, 0, 30)} hi={prog(f, cueAt(cues, 1))} dot={0} />
      </div>
    </CZone>
  );
};

export const BellTaste: React.FC<VProps> = ({dur, kw}) => {
  const f = useCurrentFrame();
  const k = kw('拉出来', 30);
  return (
    <CZone dur={dur} title="从平均值里拉出来">
      <div style={{position: 'absolute', left: 120, top: 300}}>
        <Curve draw={1} hi={1} dot={prog(f, k - 12, 24)} />
      </div>
    </CZone>
  );
};

export const Tree: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const nodes = [
    {x: 120, y: 360, t: '你喜欢的导演', l: 0},
    {x: 470, y: 200, t: '他喜欢的导演', l: 1}, {x: 470, y: 520, t: '他的老师', l: 1},
    {x: 800, y: 120, t: '……', l: 2}, {x: 800, y: 280, t: '……', l: 2}, {x: 800, y: 460, t: '……', l: 2}, {x: 800, y: 600, t: '……', l: 2},
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
  return (
    <CZone dur={dur} title="顺藤摸瓜">
      <svg width={1000} height={760} style={{position: 'absolute', left: 60, top: 160}}>
        {edges.map(([a, b]) => {
          const p = prog(f, 10 + nodes[b].l * 18, 18);
          const A = nodes[a], B = nodes[b];
          return <line key={`${a}${b}`} x1={A.x + 20} y1={A.y} x2={A.x + 20 + (B.x - A.x - 20) * p} y2={A.y + (B.y - A.y) * p} stroke={ink} strokeWidth={2} />;
        })}
        {nodes.map((n, i) => {
          const p = prog(f, n.l * 18 + (n.l ? 14 : 0));
          return (
            <g key={i} opacity={p}>
              <circle cx={n.x + 20} cy={n.y} r={n.l === 0 ? 18 : 12} fill={n.l === 0 ? red : ink} />
              <text x={n.x + 20} y={n.y + (n.l === 0 ? 62 : 48)} textAnchor="middle" fontFamily={n.l === 2 ? sans : serif} fontWeight={700} fontSize={n.l === 0 ? 38 : 32} fill={ink}>{n.t}</text>
            </g>
          );
        })}
      </svg>
    </CZone>
  );
};

export const GapChart: React.FC<VProps> = ({dur, cues, kw}) => {
  const f = useCurrentFrame();
  const W = 760, H = 420;
  const craft = prog(f, 0, 40);
  const taste = prog(f, cueAt(cues, 1), 25);
  const quit = prog(f, kw('放弃', cueAt(cues, 2) + 30), 15);
  const gapP = prog(f, cueAt(cues, 1) + 20);
  // craft line: slowly rising curve
  const cy = (x: number) => H - 30 - Math.pow(x, 1.6) * (H - 30 - 200);
  const pts = Array.from({length: 51}, (_, i) => `${(i / 50) * W},${cy(i / 50)}`);
  const ty = 80;
  return (
    <CZone dur={dur} title="眼高手低的落差">
      <svg width={W + 200} height={H + 120} style={{position: 'absolute', left: 120, top: 250, overflow: 'visible'}}>
        <line x1={0} y1={H} x2={W} y2={H} stroke={ink} strokeWidth={1.5} />
        <text x={W} y={H + 44} textAnchor="end" fontFamily={sans} fontSize={26} fill={grey}>时间 →</text>
        <path d={'M' + pts.join(' L')} fill="none" stroke={ink} strokeWidth={4} strokeDasharray={1200} strokeDashoffset={1200 * (1 - craft)} opacity={1 - quit * 0.7} />
        <text x={W + 16} y={cy(1) + 10} fontFamily={serif} fontWeight={700} fontSize={36} fill={ink} opacity={craft}>手艺</text>
        <line x1={0} y1={ty} x2={W * taste} y2={ty} stroke={red} strokeWidth={4} />
        <text x={W + 16} y={ty + 12} fontFamily={serif} fontWeight={700} fontSize={36} fill={red} opacity={taste}>眼光</text>
        <g opacity={gapP}>
          <line x1={W * 0.3} y1={ty + 10} x2={W * 0.3} y2={cy(0.3) - 10} stroke={red} strokeWidth={2} strokeDasharray="6 6" />
          <text x={W * 0.3 + 20} y={(ty + cy(0.3)) / 2 + 12} fontFamily={serif} fontWeight={700} fontSize={44} fill={red}>落差</text>
        </g>
        {quit > 0 && (
          <g opacity={quit}>
            <line x1={W * 0.45 - 16} y1={cy(0.45) - 16} x2={W * 0.45 + 16} y2={cy(0.45) + 16} stroke={red} strokeWidth={5} />
            <line x1={W * 0.45 + 16} y1={cy(0.45) - 16} x2={W * 0.45 - 16} y2={cy(0.45) + 16} stroke={red} strokeWidth={5} />
            <text x={W * 0.45} y={cy(0.45) + 64} textAnchor="middle" fontFamily={sans} fontSize={30} fill={red}>很多人在这里放弃</text>
          </g>
        )}
      </svg>
    </CZone>
  );
};

// ---------- posters for the A/B test ----------

export const PosterA: React.FC<{w: number}> = ({w}) => {
  const k = w / 400;
  return (
    <div style={{width: w, height: 560 * k, background: 'linear-gradient(135deg,#FFE600,#FF5FA2 60%,#4DD0E1)', position: 'relative', overflow: 'hidden', border: '1px solid #ccc'}}>
      <div style={{position: 'absolute', top: 24 * k, width: '100%', textAlign: 'center', fontFamily: '"Comic Sans MS", cursive', fontSize: 30 * k, color: '#1A5CFF', textShadow: `${3 * k}px ${3 * k}px 0 #fff`}}>★ 超级大促销 ★</div>
      <div style={{position: 'absolute', top: 90 * k, width: '100%', textAlign: 'center', fontFamily: '"Impact", sans-serif', fontSize: 74 * k, color: '#E0001B', transform: 'rotate(-6deg)', WebkitTextStroke: `${2 * k}px #fff`}}>周末市集!!!</div>
      <div style={{position: 'absolute', top: 210 * k, left: 30 * k, fontFamily: '"Kaiti SC", "STKaiti", serif', fontSize: 34 * k, color: '#00A651'}}>美食 · 音乐 · 手作 · 咖啡</div>
      <div style={{position: 'absolute', top: 270 * k, right: 20 * k, width: 120 * k, height: 120 * k, borderRadius: '50%', background: '#7A00FF', color: '#FFE600', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Impact", sans-serif', fontSize: 30 * k, transform: 'rotate(12deg)'}}>免费!</div>
      <div style={{position: 'absolute', top: 300 * k, left: 30 * k, fontFamily: '"Courier New", monospace', fontSize: 28 * k, color: '#000', fontWeight: 700}}>11.15 SAT<br />10:00-18:00</div>
      <div style={{position: 'absolute', bottom: 70 * k, width: '100%', textAlign: 'center', fontFamily: '"Comic Sans MS", cursive', fontSize: 30 * k, color: '#FF6A00'}}>📍城市公园 🎉🎉🎉</div>
      <div style={{position: 'absolute', bottom: 20 * k, width: '100%', textAlign: 'center', fontFamily: sans, fontSize: 20 * k, color: '#1A5CFF', textDecoration: 'underline'}}>扫码关注 · 转发有礼 · 限时福利</div>
    </div>
  );
};

export const PosterB: React.FC<{w: number}> = ({w}) => {
  const k = w / 400;
  return (
    <div style={{width: w, height: 560 * k, background: '#F4F1EA', position: 'relative', border: '1px solid #ccc', fontFamily: serif, color: ink}}>
      <div style={{position: 'absolute', left: 40 * k, top: 40 * k, fontSize: 18 * k, letterSpacing: 4 * k, fontFamily: sans}}>WEEKEND MARKET</div>
      <div style={{position: 'absolute', left: 36 * k, top: 120 * k, fontSize: 92 * k, fontWeight: 900, lineHeight: 1.1}}>周末<br />市集</div>
      <div style={{position: 'absolute', left: 40 * k, top: 350 * k, width: 40 * k, height: 5 * k, background: red}} />
      <div style={{position: 'absolute', left: 40 * k, bottom: 40 * k, fontSize: 22 * k, lineHeight: 1.7, fontFamily: sans}}>11.15 周六<br />城市公园</div>
    </div>
  );
};

const posterW = 400;

export const ABTest: React.FC<VProps> = ({dur, cues, kw}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pauseStart = kw('两秒', cueAt(cues, 1) + 20) + 18;
  const countdown = f >= pauseStart ? Math.max(0, 2 - Math.floor((f - pauseStart) / fps)) : null;
  const sA = spring({frame: f, fps, config: {damping: 16}});
  const sB = spring({frame: f - 6, fps, config: {damping: 16}});
  return (
    <AbsoluteFill style={{background: bg, opacity: out(f, dur)}}>
      <div style={{position: 'absolute', top: 70, width: '100%', textAlign: 'center', fontFamily: serif, fontWeight: 700, fontSize: 56}}>你更喜欢哪一张？</div>
      {[0, 1].map((i) => (
        <div key={i} style={{position: 'absolute', top: 180, left: i === 0 ? 440 : 1080, transform: `translateY(${(1 - (i ? sB : sA)) * 60}px)`, opacity: i ? sB : sA}}>
          {i === 0 ? <PosterA w={posterW} /> : <PosterB w={posterW} />}
          <div style={{textAlign: 'center', fontFamily: serif, fontWeight: 900, fontSize: 64, marginTop: 10}}>{i === 0 ? 'A' : 'B'}</div>
        </div>
      ))}
      {countdown !== null && countdown > 0 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center', fontFamily: serif, fontSize: 160, color: red, fontWeight: 900}}>{countdown}</div>
      )}
    </AbsoluteFill>
  );
};

export const BWins: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const s = useSpring(0, 18);
  return (
    <AbsoluteFill style={{background: bg, opacity: out(f, dur)}}>
      <div style={{position: 'absolute', left: 220, top: 150, opacity: 1 - s * 0.7, transform: `scale(${1 - s * 0.25})`, transformOrigin: 'left top'}}><PosterA w={posterW} /></div>
      <div style={{position: 'absolute', left: 760, top: 110, transform: `scale(${1 + s * 0.15})`, transformOrigin: 'left top', boxShadow: `0 20px 50px rgba(0,0,0,${0.18 * s})`}}><PosterB w={posterW} /></div>
      <div style={{position: 'absolute', left: 1240, top: 300, fontFamily: serif, fontWeight: 900, fontSize: 200, color: red, opacity: prog(f, 10)}}>B</div>
    </AbsoluteFill>
  );
};

export const CritiqueA: React.FC<VProps> = ({dur, kw}) => {
  const f = useCurrentFrame();
  const at = [kw('四种', 10), kw('五种', 40), kw('抢你', 70)];
  const W = 460, k = W / 400;
  const marks = [
    {x: 60, y: 90, w: 340, h: 110, t: '4 种字体'},
    {x: 10, y: 10, w: 380, h: 520, t: '5 种颜色'},
    {x: 250, y: 260, w: 150, h: 150, t: '到处抢眼'},
  ];
  return (
    <CZone dur={dur}>
      <div style={{position: 'absolute', left: 140, top: 120}}>
        <PosterA w={W} />
        <svg width={W} height={560 * k} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          {marks.map((m, i) => {
            const p = prog(f, at[i], 12);
            return (
              <g key={i} opacity={p}>
                <rect x={m.x * k} y={m.y * k} width={m.w * k} height={m.h * k} rx={14} fill="none" stroke={red} strokeWidth={5} strokeDasharray="14 8" />
              </g>
            );
          })}
        </svg>
      </div>
      <div style={{position: 'absolute', left: 660, top: 200}}>
        {marks.map((m, i) => (
          <div key={i} style={{fontFamily: serif, fontWeight: 700, fontSize: 46, color: red, opacity: prog(f, at[i] + 4), marginBottom: 40}}>✕ {m.t}</div>
        ))}
      </div>
    </CZone>
  );
};

export const CritiqueB: React.FC<VProps> = ({dur, kw}) => {
  const f = useCurrentFrame();
  const at = [kw('一种字体', 6), kw('一个颜色', 20), kw('留白', 34)];
  const look = kw('先看', 50);
  const W = 460, k = W / 400;
  const order = [{x: 140, y: 230, t: '1'}, {x: 330, y: 400, t: '2'}, {x: 200, y: 590, t: '3'}];
  return (
    <CZone dur={dur}>
      <div style={{position: 'absolute', left: 140, top: 120}}>
        <PosterB w={W} />
        <svg width={W} height={560 * k} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          {order.map((o, i) => {
            const p = prog(f, look + i * 6);
            return (
              <g key={i} opacity={p}>
                <circle cx={o.x} cy={o.y - 120} r={30} fill={red} />
                <text x={o.x} y={o.y - 108} textAnchor="middle" fontFamily={sans} fontWeight={700} fontSize={32} fill="#fff">{o.t}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div style={{position: 'absolute', left: 660, top: 200}}>
        {['1 种字体', '1 个强调色', '大量留白'].map((t, i) => (
          <div key={t} style={{fontFamily: serif, fontWeight: 700, fontSize: 46, opacity: prog(f, at[i]), marginBottom: 40}}><span style={{color: red}}>✓</span> {t}</div>
        ))}
      </div>
    </CZone>
  );
};

export const MiniPyramid: React.FC<VProps> = ({dur, kw}) => {
  const f = useCurrentFrame();
  const k1 = kw('直觉', 5), k2 = kw('原因', 45);
  return (
    <div style={{position: 'absolute', left: 130, top: 160, opacity: out(f, dur)}}>
      <svg width={900} height={520} style={{overflow: 'visible'}}>
        <g transform="scale(0.8)">
          <PyramidSVG starts={[0, 0, 0]} topFill={0} lit={f > k1 ? (f > k2 ? [2, 1] : [2]) : []} />
        </g>
        <text x={0} y={490} fontFamily={sans} fontSize={30} fill={ink} opacity={prog(f, k1)}>直觉 = 感知</text>
        <text x={240} y={490} fontFamily={sans} fontSize={30} fill={ink} opacity={prog(f, k2)}>说出原因 = 判断</text>
      </svg>
    </div>
  );
};

// ---------- D / E: full panels ----------

export const ThreeStyles: React.FC<VProps> = ({dur, cues, kw}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pick = cueAt(cues, 1);
  const files = ['style2-paper.png', 'style1-magazine.png', 'style3-dark.png'];
  return (
    <AbsoluteFill style={{background: bg, opacity: out(f, dur)}}>
      <div style={{position: 'absolute', left: 120, top: 80}}><Kicker text="AI 给我的三种风格" /></div>
      {files.map((file, i) => {
        const s = spring({frame: f - i * 6, fps, config: {damping: 18}});
        const chosen = i === 1;
        const pp = prog(f, pick + 10, 20);
        const w = 520 * (chosen ? 1 + pp * 0.2 : 1);
        const strike = chosen ? 0 : prog(f, kw('否了', pick + 20) - 10 + i * 4, 10);
        const x = 110 + i * 570 - (chosen ? pp * 52 : 0);
        return (
          <div key={file} style={{position: 'absolute', left: x, top: 280 - (chosen ? pp * 40 : 0), width: w, opacity: s * (chosen ? 1 : 1 - pp * 0.6), transform: `translateY(${(1 - s) * 80}px)`, zIndex: chosen ? 2 : 1}}>
            <Img src={staticFile(file)} style={{width: '100%', border: `${chosen ? 4 * pp : 0}px solid ${red}`, boxShadow: '0 12px 30px rgba(0,0,0,0.15)'}} />
            {!chosen && (
              <svg width={w} height={w * 0.5625} style={{position: 'absolute', left: 0, top: 0}}>
                <line x1={0} y1={w * 0.5625} x2={w * strike} y2={w * 0.5625 * (1 - strike)} stroke={red} strokeWidth={8} />
              </svg>
            )}
            {chosen && <div style={{fontFamily: serif, fontWeight: 700, fontSize: 36, color: red, marginTop: 14, opacity: pp}}>✓ 我选了这一种</div>}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const TOC: React.FC<VProps> = ({dur, kw}) => {
  const f = useCurrentFrame();
  const at = [kw('到底是什么', 30), kw('为什么', 70), kw('怎么把', 120)];
  const items = ['品味到底是什么', '为什么 AI 时代，品味更值钱', '品味怎么练'];
  return (
    <AbsoluteFill style={{background: bg, opacity: out(f, dur)}}>
      <div style={{position: 'absolute', top: 70, left: 120, right: 120, display: 'flex', justifyContent: 'space-between', fontFamily: sans, fontSize: 22, letterSpacing: 6, paddingBottom: 18, borderBottom: '2px solid #111'}}>
        <span>本期内容 · CONTENTS</span><span style={{color: red}}>TASTE</span>
      </div>
      <div style={{position: 'absolute', left: 120, top: 220, fontFamily: serif, fontWeight: 900, fontSize: 200, lineHeight: 1}}>品味</div>
      <div style={{position: 'absolute', right: 120, top: 260, width: 860}}>
        {items.map((t, i) => {
          const p = prog(f, at[i] - 4);
          return (
            <div key={t} style={{display: 'flex', alignItems: 'baseline', gap: 36, padding: '38px 0', borderTop: '1.5px solid #111', borderBottom: i === 2 ? '1.5px solid #111' : undefined, opacity: 0.12 + 0.88 * p}}>
              <span style={{fontFamily: serif, fontStyle: 'italic', fontSize: 44, color: red}}>0{i + 1}</span>
              <span style={{fontFamily: serif, fontWeight: 700, fontSize: 56}}>{t}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const TenCards: React.FC<VProps & {pick?: boolean}> = ({dur, pick}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pick ? prog(f, 10, 20) : 0;
  return (
    <AbsoluteFill style={{background: bg, opacity: out(f, dur)}}>
      <div style={{position: 'absolute', left: 120, top: 80}}><Kicker text={pick ? '你得知道选哪一版' : 'AI 几秒钟给你十版'} /></div>
      {Array.from({length: 10}).map((_, i) => {
        const s = pick ? 1 : spring({frame: f - i * 2, fps, config: {damping: 14}});
        const chosen = i === 6;
        const col = i % 5, row = Math.floor(i / 5);
        return (
          <div key={i} style={{position: 'absolute', left: 120 + col * 255, top: 190 + row * 330, width: 220, height: 290, background: '#fff', border: `${chosen ? 2 + 4 * p : 1.5}px solid ${chosen && p > 0 ? red : '#bbb'}`, padding: 22, transform: `scale(${s * (chosen ? 1 + p * 0.08 : 1)})`, opacity: chosen ? 1 : 1 - p * 0.65, boxShadow: chosen ? `0 14px 30px rgba(210,60,34,${0.25 * p})` : 'none'}}>
            <div style={{fontFamily: sans, fontSize: 18, color: chosen && p > 0 ? red : grey}}>版本 {i + 1}</div>
            {[0.9, 0.7, 0.8, 0.5, 0.65].map((w, j) => (
              <div key={j} style={{height: j === 0 ? 20 : 10, width: `${w * 100}%`, background: j === 0 ? '#333' : '#ddd', marginTop: j === 0 ? 20 : 14}} />
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Calligraphy: React.FC<VProps & {stage: number}> = ({dur, stage}) => {
  const f = useCurrentFrame();
  const fonts = ['Georgia', 'Didot', 'Baskerville', 'Futura', 'Optima', 'Gill Sans', 'Palatino', 'Helvetica Neue'];
  return (
    <AbsoluteFill style={{background: bg, opacity: out(f, dur)}}>
      <div style={{position: 'absolute', left: 120, top: 80}}><Kicker text={stage === 0 ? '一门“没用”的书法课' : stage === 1 ? '十年后' : '出处'} /></div>
      {stage === 0 && (
        <div style={{position: 'absolute', left: 320, top: 160, fontFamily: 'Didot, "Bodoni 72", serif', fontSize: 560, lineHeight: 1, color: ink, clipPath: `inset(0 ${100 - prog(f, 0, 60) * 100}% 0 0)`}}>Aa</div>
      )}
      {stage >= 1 && (
        <div style={{position: 'absolute', left: 140, top: 200, display: 'grid', gridTemplateColumns: 'repeat(4, 300px)', gap: 24}}>
          {fonts.map((fo, i) => (
            <div key={fo} style={{height: 250, border: '1.5px solid #111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: stage === 2 ? 1 : prog(f, i * 4)}}>
              <div style={{fontFamily: `"${fo}", serif`, fontSize: 120, lineHeight: 1}}>Aa</div>
              <div style={{fontFamily: sans, fontSize: 18, color: grey, marginTop: 14}}>{fo}</div>
            </div>
          ))}
        </div>
      )}
      {stage === 2 && (
        <div style={{position: 'absolute', left: 140, top: 780, fontFamily: serif, fontWeight: 700, fontSize: 48, opacity: prog(f, 4)}}>
          <span style={{color: red}}>2005</span> · 乔布斯 斯坦福毕业演讲
        </div>
      )}
    </AbsoluteFill>
  );
};

export const FinalQuote: React.FC<VProps> = ({dur, kw}) => {
  const f = useCurrentFrame();
  const k = kw('哪一个', 30);
  return (
    <AbsoluteFill style={{background: bg, opacity: out(f, dur, 12)}}>
      <div style={{position: 'absolute', left: 160, top: 300}}>
        <div style={{fontFamily: serif, fontWeight: 700, fontSize: 76, opacity: prog(f, 0)}}>AI 能帮你做出一百个东西，</div>
        <div style={{fontFamily: serif, fontWeight: 700, fontSize: 76, marginTop: 30, opacity: prog(f, k - 4)}}>
          但哪一个代表你，<span style={{color: red}}>只有你能选</span>。
        </div>
        <div style={{width: 160 * prog(f, k + 20), height: 8, background: red, marginTop: 60}} />
      </div>
    </AbsoluteFill>
  );
};

