"""Step 2: edl.json -> trimmed piece list (work/seglist.json) + src/video/timeline.json.

python3 build.py <project>

Cut points come from the audio ENERGY (whisper word times are unreliable around pauses):
  - each seg is reduced to its speech bursts (RMS > 9.2% of p95 loudness, gaps < 0.12s merged)
  - pauses > 0.30s inside a seg shrink to 0.20s
  - a seg whose speech runs into a word that is not part of the take is cut at the energy dip
  - drop_first: drop the first burst of that seg (stutter like "十…十版")
Whisper chars are mapped onto the new timeline -> captions + keyword cues (kw('词') in scenes.tsx).

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See kyskills LICENSE. · KYVIDEO-engine-2611
"""
import json, re, difflib, sys
from pathlib import Path
import numpy as np
from common import FPS, envelope, load, project_root, words

P = project_root(sys.argv[1] if len(sys.argv) > 1 else None)
WORK = P / 'work'
EDLJ = load(P, 'edl.json')
EDL = [tuple(x) for x in EDLJ['items']]
W = words(WORK)
env = envelope(WORK)

# ---- speech bursts from energy (whisper word times are unreliable around pauses) ----
# speech threshold is relative to the recording's loudness (95th percentile of the envelope),
# so mic gain doesn't matter. 0.092 * p95 == the 0.004 absolute value tuned on video 1.
THR, MINGAP = 0.092 * float(np.percentile(env, 95)), 0.12
def bursts(s, e):
    lo, hi = max(0, int((s - 0.4) * 100)), int((e + 0.4) * 100)
    x = env[lo:hi] > THR; out = []; i = 0; g = int(MINGAP * 100)
    while i < len(x):
        if x[i]:
            j = i
            while j < len(x) and (x[j] or x[j:j + g].any()): j += 1
            out.append(((lo + i) / 100, (lo + j) / 100)); i = j
        else:
            i += 1
    return [(a, b) for a, b in out if b > s + 0.05 and a < e - 0.05 and b - a > 0.05]
DROP_FIRST = EDLJ.get('drop_first', [])   # seg starts whose first burst is a stutter ("十…十版")
PAD0, PAD1 = EDLJ.get('pads', [0.08, 0.10])   # lead-in before speech / tail after speech
KEEPGAP, MAXGAP = 0.10, 0.30   # inner pauses > MAXGAP shrink to 2*KEEPGAP

def pieces_for(s, e):
    bs = bursts(s, e)
    if any(abs(s - d) < 0.02 for d in DROP_FIRST) and len(bs) > 1: bs = bs[1:]
    # speech runs straight into a word that is not part of this take: cut at the energy dip at the boundary
    if bs and bs[-1][1] - e > 0.2 and any(e - 0.05 <= w[0] <= e + 0.15 for w in W):
        lo, hi = int((e - 0.02) * 100), int((e + 0.20) * 100)
        cut = (lo + int(np.argmin(env[lo:hi]))) / 100
        bs[-1] = (bs[-1][0], cut - PAD1 + 0.02)
    ps = []
    for a, b in bs:
        if ps and a - ps[-1][1] <= MAXGAP - 2 * 0:  # small pause: keep as is
            ps[-1][1] = b
        else:
            ps.append([a, b])
    out = []
    for k, (a, b) in enumerate(ps):
        a0 = a - (PAD0 if k == 0 else KEEPGAP); b0 = b + (PAD1 if k == len(ps) - 1 else KEEPGAP)
        out.append([a0, b0])
    return out

# ---- group contiguous EDL segs; build physical pieces ----
groups = []
for it in EDL:
    if it[0] == 'card':
        groups.append({'card': it}); continue
    if groups and 'items' in groups[-1] and abs(groups[-1]['e'] - it[1]) < 0.02:
        groups[-1]['e'] = it[2]; groups[-1]['items'].append(it)
    else:
        groups.append({'s': it[1], 'e': it[2], 'items': [it]})

shots, caps, words, seglist = [], [], [], []
t = 0  # timeline frames
zoom_toggle = False
keep = lambda c: c.isalnum()
for g in groups:
    if 'card' in g:
        _, sid, secs, lay = g['card']; n = round(secs * FPS)
        shots.append({'id': len(shots), 'name': str(sid), 'layout': lay, 'start': t, 'end': t + n, 'text': ''})
        seglist.append(('gap', secs, n)); t += n
        continue
    ps = pieces_for(g['s'], g['e'])
    # timeline placement
    mp = []
    for a, b in ps:
        n = round((b - a) * FPS)
        mp.append((a, b, t)); seglist.append(('src', a, b, n)); t += n
    gend = t
    def tl(x):  # source time -> timeline frame (gaps snap forward)
        for a, b, f0 in mp:
            if x < a: return f0
            if x <= b: return f0 + round((x - a) * FPS)
        return gend
    # whisper chars mapped to timeline (for captions and keyword cues)
    wc = []
    for (w0, w1, wt) in W:
        if w1 < g['s'] - 0.05 or w0 > g['e'] + 0.05: continue
        cs = [c for c in wt if keep(c)]
        for k, c in enumerate(cs):
            c0 = w0 + (w1 - w0) * k / len(cs); c1 = w0 + (w1 - w0) * (k + 1) / len(cs)
            wc.append((c, c0, c1))
    # a char that starts inside a silent stretch really starts at the next speech
    wcf = [(c, tl(c0), max(tl(c0) + 2, tl(c1))) for c, c0, c1 in wc]
    for c, f0, f1 in wcf: words.append({'f': f0, 'c': c})
    items = g['items']
    for j, (_, s, e, sid, lay, cap) in enumerate(items):
        f0 = mp[0][2] if j == 0 else tl(s)
        f1 = gend if j == len(items) - 1 else tl(items[j + 1][1])
        zoom = None
        if lay == 'A':
            zoom_toggle = not zoom_toggle; zoom = 1.18 if zoom_toggle else 1.0
        if sid == 'hook': zoom = 1.0
        if shots and shots[-1].get('name') == str(sid):
            shots[-1]['end'] = f1; shots[-1]['text'] += cap
        else:
            shots.append({'id': len(shots), 'name': str(sid), 'layout': lay, 'start': f0, 'end': f1, 'text': cap, 'zoom': zoom})
        # captions aligned to the chars of this shot
        sub = [x for x in wcf if f0 - 3 <= x[1] < f1]
        parts = [p for p in re.split(r'(?<=[，。？：；！])', cap) if p.strip()]
        chunks = []
        for p in parts:
            p = p.strip()
            while len(p) > 18: chunks.append(p[:16]); p = p[16:]
            chunks.append(p)
        capc = ''.join(c for c in ''.join(chunks) if keep(c))
        cmap = {}
        sm = difflib.SequenceMatcher(None, capc, ''.join(x[0] for x in sub), autojunk=False)
        for bl in sm.get_matching_blocks():
            for k in range(bl.size): cmap[bl.a + k] = sub[bl.b + k]
        total = max(1, len(capc)); acc = 0; prev = f0
        for ch in chunks:
            n_ = len([c for c in ch if keep(c)])
            idx = [k for k in range(acc, acc + n_) if k in cmap]
            if idx: a0, a1 = cmap[idx[0]][1] - 2, cmap[idx[-1]][2] + 3
            else: a0 = f0 + (f1 - f0) * acc / total; a1 = f0 + (f1 - f0) * (acc + n_) / total
            a0 = max(a0, prev, f0); a1 = min(max(a1, a0 + 12), f1)
            caps.append({'start': round(a0), 'end': round(a1), 'text': ch.rstrip('，。；：')}); prev = a1; acc += n_

for a_, b_ in zip(caps, caps[1:]):
    if 0 < b_['start'] - a_['end'] < 8: a_['end'] = b_['start']
json.dump({'fps': FPS, 'durationInFrames': t, 'shots': shots, 'captions': caps, 'words': words},
          open(P / 'src/video/timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
json.dump(seglist, open(WORK / 'seglist.json', 'w'))
print('duration', round(t / FPS, 2), 's;', len(shots), 'shots;', len(caps), 'captions;', sum(1 for x in seglist if x[0] == 'src'), 'pieces')
