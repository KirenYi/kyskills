"""Synthesize the standard SFX palette into <project>/public/sfx_*.wav.

python3 sfx.py <project>

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See kyskills LICENSE. · KYVIDEO-engine-2611
"""
import sys, wave
from pathlib import Path
import numpy as np
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else ".").expanduser().resolve() / "public"
OUT.mkdir(exist_ok=True)
sr = 48000; rng = np.random.default_rng(3)
def save(name, x, peak=0.5):
    x = x / (np.abs(x).max() + 1e-9) * peak
    st = np.stack([x, x], 1)
    with wave.open(str(OUT / f'sfx_{name}.wav'), 'w') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes((st * 32767).astype(np.int16).tobytes())
def t(d): return np.arange(int(sr * d)) / sr
def lp(x, a):  # one-pole lowpass
    y = np.zeros_like(x); acc = 0
    for i, v in enumerate(x): acc += a * (v - acc); y[i] = acc
    return y
# pop: short sine with fast pitch drop
tt = t(0.12); f = 900 * np.exp(-tt * 30) + 300
save('pop', np.sin(2 * np.pi * np.cumsum(f) / sr) * np.exp(-tt * 40), 0.45)
# tick: tiny click
tt = t(0.04); save('tick', (np.sin(2 * np.pi * 2400 * tt) + 0.5 * rng.normal(size=tt.size)) * np.exp(-tt * 180), 0.35)
# ding: bell-like partials
tt = t(1.2); x = sum(a * np.sin(2 * np.pi * 1318.5 * r * tt) * np.exp(-tt * d) for a, r, d in [(1, 1, 4), (0.5, 2.76, 7), (0.3, 5.4, 10), (0.4, 0.5, 3)])
save('ding', x * np.minimum(1, tt / 0.003), 0.42)
# whoosh: noise swept through a moving lowpass, bell envelope
tt = t(0.55); n = rng.normal(size=tt.size); env = np.sin(np.pi * tt / tt[-1]) ** 2
y = np.zeros_like(n); acc = 0
for i, v in enumerate(n):
    a = 0.02 + 0.25 * env[i]; acc += a * (v - acc); y[i] = acc
save('whoosh', y * env, 0.4)
# strike: short scratchy noise burst (marker line)
tt = t(0.22); n = rng.normal(size=tt.size); x = lp(n, 0.35) * np.exp(-((tt - 0.08) / 0.06) ** 2) * (1 + 0.5 * np.sin(2 * np.pi * 60 * tt))
save('strike', x, 0.4)
# impact: low thump + air
tt = t(0.6); f = 110 * np.exp(-tt * 6) + 45
x = np.sin(2 * np.pi * np.cumsum(f) / sr) * np.exp(-tt * 7) + 0.15 * lp(rng.normal(size=tt.size), 0.1) * np.exp(-tt * 20)
save('impact', x, 0.6)
# type: keyboard click
tt = t(0.035); save('type', lp(rng.normal(size=tt.size), 0.5) * np.exp(-tt * 250) + 0.3 * np.sin(2 * np.pi * 1800 * tt) * np.exp(-tt * 300), 0.3)
print('音效已生成：', OUT)
