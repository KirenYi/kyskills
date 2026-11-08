"""QA before showing the user anything.

python3 check.py <project> [--sync] [--words]     (default: both)

--sync   lip sync: on the 5 longest pieces, cut frames must match mezz frames at offset 0 (pixel diff) and
         cut audio must match mezz.wav at zero lag. Pass = within 1 frame.
--words  re-transcribe public/cut.mp4 with whisper and diff against the captions:
         missing chars = clipped word at a cut; extra chars = leftover stutter / unwanted word.

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See ky-skills LICENSE. · KYVIDEO-engine-2611
"""
from __future__ import annotations

import argparse
import difflib
import json
import subprocess
import tempfile
from pathlib import Path

import numpy as np

from common import FPS, load, need, project_root, run


def frames_at(f: Path, ranges: list[tuple[int, int]]):
    """Exact frames by decode index (select n), one decoding pass. Seeking is not trusted here:
    a concatenated mp4 can land 1-2 frames off after -ss, which would fake a sync error."""
    expr = "+".join(f"between(n\\,{a}\\,{a + k - 1})" for a, k in ranges)
    r = subprocess.run([need("ffmpeg"), "-v", "error", "-i", str(f), "-vf", f"select='{expr}',scale=160:90,format=gray",
                        "-vsync", "0", "-f", "rawvideo", "-"], capture_output=True)
    v = np.frombuffer(r.stdout, np.uint8).reshape(-1, 90 * 160).astype(float)
    out, i = [], 0
    for _, k in sorted(ranges):
        out.append(v[i:i + k]); i += k
    return dict(zip([a for a, _ in sorted(ranges)], out))


def audio_env(f: Path, ss: float, d: float):
    r = subprocess.run([need("ffmpeg"), "-v", "error", "-ss", f"{ss:.4f}", "-i", str(f), "-t", f"{d:.4f}", "-vn", "-ac", "1",
                        "-ar", "48000", "-f", "s16le", "-"], capture_output=True)
    a = np.frombuffer(r.stdout, np.int16).astype(float)
    return np.sqrt(np.add.reduceat(a ** 2, np.arange(0, len(a), 160)) / 160)  # 300 Hz


def lag(x, y, maxk):
    """k such that x[t] ~ y[t + k] (samples); plus normalised correlation."""
    m = min(len(x), len(y))
    x = (x[:m] - x[:m].mean()) / (x[:m].std() + 1e-9)
    y = (y[:m] - y[:m].mean()) / (y[:m].std() + 1e-9)
    return max(((float(np.dot(x[max(0, -k):m - max(0, k)], y[max(0, k):m + min(0, k)]) / (m - abs(k))), k) for k in range(-maxk, maxk + 1)))[::-1]


def sync(p: Path, cfg: dict) -> bool:
    """On the 5 longest pieces: the cut's frames must match the mezzanine frame-for-frame (pixel diff) and its audio must
    match mezz.wav at zero lag. Then sync is inherited from the mezzanine, which is A/V aligned by construction."""
    segs = json.loads((p / "work/seglist.json").read_text())
    pos, items = 0, []
    for sg in segs:
        if sg[0] == "src":
            items.append((sg[-1], pos, sg[1]))
        pos += sg[-1]
    ok = True
    picks = sorted(items, reverse=True)[:5]
    cutf = frames_at(p / "public/cut.mp4", [(tl + 15, 6) for _, tl, _ in picks])
    mezf = frames_at(p / "work/mezz.mp4", [(round(src * FPS) + 13, 10) for _, _, src in picks])
    for n, tl, src in picks:
        f0 = round(src * FPS)
        # video: which mezz frame offset matches the cut best (must be 0)
        c, m = cutf[tl + 15], mezf[f0 + 13]
        diffs = {k: float(np.abs(m[2 + k:8 + k] - c).mean()) for k in (-2, -1, 0, 1, 2)}
        vk = min(diffs, key=diffs.get)
        # audio: envelope offset cut vs mezz.wav (must be 0)
        t0, s0, d = tl / FPS + 0.2, f0 / FPS + 0.2, n / FPS - 0.4
        ak, _ = lag(audio_env(p / "public/cut.mp4", t0, d), audio_env(p / "work/mezz.wav", s0, d), 60)
        err = vk * 1000 / FPS - ak * 1000 / 300
        good = abs(err) <= 34
        ok &= good
        print(f"  成片 {int(t0) // 60}:{int(t0) % 60:02d}（{d:.0f}s）画面偏 {vk:+d} 帧，声音偏 {ak * 1000 / 300:+.0f}ms → 口型偏差 {err:+.0f}ms {'✓' if good else '✗'}")
    print("口型同步：" + ("全部在 1 帧以内" if ok else "有片段偏差超过 1 帧"))
    return ok


def word_check(p: Path) -> bool:
    tl = json.loads((p / "src/video/timeline.json").read_text(encoding="utf-8"))
    keep = lambda c: c.isalnum()
    with tempfile.TemporaryDirectory() as d:
        wav = Path(d) / "cut.wav"
        run([need("ffmpeg"), "-v", "error", "-i", p / "public/cut.mp4", "-ac", "1", "-ar", "16000", wav])
        run([need("whisper"), wav, "--model", "large-v3-turbo", "--language", "zh", "--word_timestamps", "True",
             "--condition_on_previous_text", "False", "--output_format", "json", "--output_dir", d,
             "--initial_prompt", "以下是普通话的句子。"], capture_output=True)
        data = json.loads((Path(d) / "cut.json").read_text(encoding="utf-8"))
    heard = [(c, w["start"]) for s in data["segments"] for w in s.get("words", []) for c in w["word"] if keep(c)]
    capc = [(c, cap["start"] / FPS) for cap in tl["captions"] for c in cap["text"] if keep(c)]
    sm = difflib.SequenceMatcher(None, [c for c, _ in capc], [c for c, _ in heard], autojunk=False)
    issues = 0
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == "equal":
            continue
        want = "".join(c for c, _ in capc[i1:i2])
        got = "".join(c for c, _ in heard[j1:j2])
        t = heard[j1][1] if j1 < len(heard) else capc[min(i1, len(capc) - 1)][1]
        # noise: same-length substitutions (homophones 品位/品味, 十版/石板) and digits vs 汉字 (九十/90)
        if len(want) == len(got) or (got and all(c.isdigit() for c in got)):
            continue
        issues += 1
        print(f"  {int(t) // 60}:{int(t) % 60:02d}  字幕「{want}」 听到「{got}」")
    print(f"逐字比对：相似度 {sm.ratio():.3f}，可疑处 {issues} 个（同音字可忽略，重点看漏字和多字）")
    return issues == 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project", nargs="?")
    ap.add_argument("--sync", action="store_true")
    ap.add_argument("--words", action="store_true")
    a = ap.parse_args()
    p = project_root(a.project)
    cfg = load(p, "project.json")
    both = not (a.sync or a.words)
    ok = True
    if a.sync or both:
        ok &= sync(p, cfg)
    if a.words or both:
        ok &= word_check(p)
    print("QA 通过" if ok else "QA 有问题，先修再给用户看")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
