"""Step 3: cut the talking-head track from the mezzanine, frame-exact.

python3 cut.py <project>          -> public/cut.mp4   (2560x1440, for preview renders)
python3 cut.py <project> --4k     -> work/cut4k.mp4   (3840x2160, used by render.py --4k)

Video: trim by frame number from mezz*.mp4.  Audio: trim by sample number (frame * 1600) from mezz.wav.
Both come from the same frame index, so lip sync cannot drift. Cards/gaps = style bg colour + silence.
Final audio: highpass 70 Hz + loudnorm to -16 LUFS.

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See kyskills LICENSE. · KYVIDEO-engine-2611
"""
from __future__ import annotations

import argparse
import json
import shutil
from concurrent.futures import ThreadPoolExecutor

from common import ASSETS, FPS, SPF, ffmpeg, load, probe_size, project_root


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project", nargs="?")
    ap.add_argument("--4k", dest="uhd", action="store_true")
    a = ap.parse_args()
    p = project_root(a.project)
    work = p / "work"
    cfg = load(p, "project.json")
    style = json.loads((p / "src" / "style" / "style.json").read_text(encoding="utf-8"))
    bg = style.get("bg", "000000")
    mezz = work / ("mezz4k.mp4" if a.uhd else "mezz.mp4")
    if not mezz.exists():
        raise SystemExit(f"缺少 {mezz.name}：先运行 prep.py{' --4k' if a.uhd else ''}")
    w, h = probe_size(mezz)
    segs = json.loads((work / "seglist.json").read_text())
    tmp = work / ("segs4k" if a.uhd else "segs")
    shutil.rmtree(tmp, ignore_errors=True)
    tmp.mkdir()

    def job(i):
        sg = segs[i]
        v, au = tmp / f"{i:03d}.mp4", tmp / f"{i:03d}.wav"
        n = sg[-1]
        ns = n * SPF
        if sg[0] == "src":
            f0 = round(sg[1] * FPS)
            seekf = max(0, f0 - 60)  # input-seek 2s early on the frame grid, then exact trim
            ffmpeg("-ss", f"{seekf / FPS:.6f}", "-i", mezz, "-vf", f"trim=start_frame={f0 - seekf},setpts=PTS-STARTPTS",
                   "-frames:v", n, "-c:v", "libx264", "-preset", "veryfast", "-crf", "16", "-pix_fmt", "yuv420p", "-r", FPS, "-an", v)
            d = n / FPS
            ffmpeg("-i", work / "mezz.wav", "-af",
                   f"atrim=start_sample={f0 * SPF}:end_sample={f0 * SPF + ns},asetpts=PTS-STARTPTS,afade=t=in:d=0.03,afade=t=out:st={d - 0.05:.4f}:d=0.05",
                   "-c:a", "pcm_s16le", au)
        else:
            ffmpeg("-f", "lavfi", "-i", f"color=c=0x{bg}:s={w}x{h}:r={FPS}", "-frames:v", n,
                   "-c:v", "libx264", "-preset", "veryfast", "-crf", "16", "-pix_fmt", "yuv420p", v)
            ffmpeg("-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo", "-af", f"atrim=end_sample={ns}", "-c:a", "pcm_s16le", au)

    with ThreadPoolExecutor(4) as ex:
        list(ex.map(job, range(len(segs))))
    vl, al = tmp / "v.txt", tmp / "a.txt"
    vl.write_text("".join(f"file '{i:03d}.mp4'\n" for i in range(len(segs))))
    al.write_text("".join(f"file '{i:03d}.wav'\n" for i in range(len(segs))))
    ffmpeg("-f", "concat", "-safe", "0", "-i", vl, "-c", "copy", tmp / "v.mp4")
    ffmpeg("-f", "concat", "-safe", "0", "-i", al, "-c", "copy", tmp / "a.wav")
    out = work / "cut4k.mp4" if a.uhd else p / "public" / "cut.mp4"
    ffmpeg("-i", tmp / "v.mp4", "-i", tmp / "a.wav", "-map", "0:v", "-map", "1:a", "-c:v", "copy",
           "-af", "highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", "48000", "-c:a", "aac", "-b:a", "192k", out)
    shutil.rmtree(tmp)
    total = sum(s[-1] for s in segs)
    print(f"已生成 {out.relative_to(p)}：{len(segs)} 段，{total / FPS:.1f} 秒")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
