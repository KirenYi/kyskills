"""Shared helpers for ky-video scripts. Python 3.9+, needs numpy. Cross-platform (pathlib, no shell).

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See ky-skills LICENSE. · KYVIDEO-engine-2611
"""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
import wave
from pathlib import Path

SKILL = Path(__file__).resolve().parents[1]
ASSETS = SKILL / "assets"
FPS = 30
SPF = 1600  # 48000 / 30 audio samples per video frame


def project_root(arg: str | None) -> Path:
    p = Path(arg or ".").expanduser().resolve()
    if not (p / "project.json").is_file():
        sys.exit(f"不是 ky-video 项目（找不到 project.json）：{p}")
    return p


def load(p: Path, name: str):
    return json.loads((p / name).read_text(encoding="utf-8"))


def source_path(cfg: dict) -> Path:
    return Path(cfg["source"]).expanduser()


def need(tool: str) -> str:
    path = shutil.which(tool)
    if not path:
        sys.exit(f"缺少工具：{tool}（请先安装）")
    return path


def run(cmd: list, **kw):
    return subprocess.run([str(c) for c in cmd], check=True, **kw)


def ffmpeg(*args):
    run([need("ffmpeg"), "-v", "error", "-y", *args])


def probe_size(f: Path) -> tuple[int, int]:
    r = subprocess.run([need("ffprobe"), "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                        "-of", "csv=p=0", str(f)], capture_output=True, text=True, check=True)
    w, h = r.stdout.strip().split(",")[:2]
    return int(w), int(h)


def read_wav_mono(f: Path):
    import numpy as np
    with wave.open(str(f)) as wf:
        sr, ch = wf.getframerate(), wf.getnchannels()
        a = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    return sr, a.reshape(-1, ch).mean(1)


def envelope(work: Path):
    """10 ms RMS envelope of work/audio16k.wav (same timebase as mezz.wav)."""
    import numpy as np
    sr, a = read_wav_mono(work / "audio16k.wav")
    hop = int(sr * 0.01)
    return np.sqrt(np.convolve(a ** 2, np.ones(hop * 3) / (hop * 3), mode="same"))[::hop]


def words(work: Path):
    W = []
    for s in json.loads((work / "words.json").read_text(encoding="utf-8"))["segments"]:
        for w in s.get("words", []):
            W.append((w["start"], w["end"], w["word"].strip()))
    return W


def npx() -> str:
    return need("npx")
