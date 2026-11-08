"""Step 1 for every video: make the constant-frame-rate mezzanine, transcribe, write a readable transcript.

python3 prep.py <project> [--4k] [--skip-whisper]

Why: phone apps record variable frame rate (VFR). Cutting VFR by timestamps drifts lip sync.
We decode once into a 30fps mezzanine (work/mezz.mp4 + work/mezz.wav, A/V aligned) and from then on
cut by frame number / sample number only. Whisper runs on audio derived from mezz.wav, so every
time in edl.json is a mezz time — no offsets anywhere.

Outputs (work/):  mezz.mp4 (2560x1440) · mezz.wav (48k) · audio16k.wav · words.json · transcript.md
                  mezz4k.mp4 with --4k (also made on demand by render.py --4k)
Also grabs cover photos listed in project.json "frames" into public/.

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See kyskills LICENSE. · KYVIDEO-engine-2611
"""
from __future__ import annotations

import argparse
import json

from common import envelope, ffmpeg, load, need, project_root, run, source_path, words


def make_mezz(src, work, uhd=False):
    out = work / ("mezz4k.mp4" if uhd else "mezz.mp4")
    if out.exists():
        print("已存在，跳过：", out.name)
        return out
    scale = "fps=30,setsar=1" if uhd else "fps=30,scale=2560:1440:flags=lanczos,setsar=1"
    print("生成中间文件", out.name, "（整段解码，原片多长就要跑多久）…")
    args = ["-i", src, "-map", "0:v", "-vf", scale, "-c:v", "libx264", "-preset", "veryfast", "-crf", "15" if not uhd else "16",
            "-g", "15", "-pix_fmt", "yuv420p", out]
    if not uhd:
        args += ["-map", "0:a", "-af", "aresample=48000:async=1:first_pts=0", "-ac", "2", "-c:a", "pcm_s16le", work / "mezz.wav"]
    ffmpeg(*args)
    return out


def transcript(work):
    """Readable transcript: one line per whisper segment, with long pauses marked (likely retakes)."""
    data = json.loads((work / "words.json").read_text(encoding="utf-8"))
    env = envelope(work)
    lines = ["# 转写稿（时间 = mezz 秒数，可直接填进 edl.json）", "",
             "规则：同一句拍了几遍，保留最后一遍；⏸ 表示 ≥0.6 秒停顿（常是口误后重说）。", ""]
    prev_end = 0.0
    for s in data["segments"]:
        st, en, tx = s["start"], s["end"], s["text"].strip()
        if st - prev_end >= 0.6:
            lines.append(f"⏸ {st - prev_end:.1f}s")
        lines.append(f"[{st:7.2f} – {en:7.2f}] {tx}")
        prev_end = en
    (work / "transcript.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    W = words(work)
    print(f"转写完成：{len(data['segments'])} 段，{len(W)} 个词，音频 {len(env) / 100:.1f} 秒 → work/transcript.md")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project", nargs="?")
    ap.add_argument("--4k", dest="uhd", action="store_true")
    ap.add_argument("--skip-whisper", action="store_true")
    ap.add_argument("--model", default="large-v3-turbo")
    a = ap.parse_args()
    p = project_root(a.project)
    cfg = load(p, "project.json")
    src = source_path(cfg)
    if not src.is_file():
        raise SystemExit(f"找不到原片：{src}（改 project.json 的 source）")
    work = p / "work"
    work.mkdir(exist_ok=True)

    make_mezz(src, work)
    if a.uhd:
        make_mezz(src, work, uhd=True)
    if not (work / "audio16k.wav").exists():
        ffmpeg("-i", work / "mezz.wav", "-ac", "1", "-ar", "16000", work / "audio16k.wav")

    for name, t in cfg.get("frames", {}).items():
        out = p / "public" / name
        if not out.exists():
            ffmpeg("-ss", str(t), "-i", work / "mezz.mp4", "-frames:v", "1", out)

    if not a.skip_whisper and not (work / "words.json").exists():
        print("whisper 转写中（large-v3-turbo，约为片长的 1/3～1/2）…")
        run([need("whisper"), work / "audio16k.wav", "--model", a.model, "--language", "zh", "--word_timestamps", "True",
             "--condition_on_previous_text", "False", "--output_format", "json", "--output_dir", work,
             "--initial_prompt", "以下是普通话的句子。"], capture_output=True)
        (work / "audio16k.json").rename(work / "words.json")
    if (work / "words.json").exists():
        transcript(work)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
