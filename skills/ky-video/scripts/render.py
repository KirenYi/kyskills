"""Step 4: render with Remotion.

python3 render.py <project>              -> out/<title>-预览.mp4   (1080p, quick review)
python3 render.py <project> --hooks      -> out/开头-0.mp4 …       (one per hook variant, for picking)
python3 render.py <project> --4k         -> out/<title>-4K.mp4     (final; builds mezz4k + cut4k if needed)

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See kyskills LICENSE. · KYVIDEO-engine-2611
"""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path

from common import load, npx, project_root, run


def remotion(p: Path, comp: str, out: Path, extra=()):
    run([npx(), "remotion", "render", "src/index.ts", comp, out, "--codec=h264", "--crf=16", "--audio-bitrate=256k", *extra], cwd=p)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project", nargs="?")
    ap.add_argument("--4k", dest="uhd", action="store_true")
    ap.add_argument("--hooks", action="store_true")
    a = ap.parse_args()
    p = project_root(a.project)
    title = load(p, "project.json")["title"]
    out = p / "out"
    out.mkdir(exist_ok=True)
    here = Path(__file__).parent

    if a.hooks:
        tl = json.loads((p / "src/video/timeline.json").read_text(encoding="utf-8"))
        r = subprocess.run([npx(), "remotion", "compositions", "src/index.ts", "--quiet"], cwd=p, capture_output=True, text=True)
        ids = [x for x in r.stdout.split() if x.startswith("hook-")]
        for i in ids:
            remotion(p, i, out / f"开头-{i.split('-')[1]}.mp4")
        print("钩子预览：", ", ".join(ids), f"（共 {len(tl['shots'])} 个镜头）")
        return 0

    if not a.uhd:
        remotion(p, "main", out / f"{title}-预览.mp4", ["--concurrency=6"])
        return 0

    work = p / "work"
    if not (work / "mezz4k.mp4").exists():
        subprocess.run([sys.executable, here / "prep.py", p, "--4k", "--skip-whisper"], check=True)
    subprocess.run([sys.executable, here / "cut.py", p, "--4k"], check=True)
    cut, keep = p / "public/cut.mp4", p / "public/cut1440.mp4"
    shutil.move(cut, keep)
    shutil.copy(work / "cut4k.mp4", cut)
    try:
        remotion(p, "main", out / f"{title}-4K.mp4", ["--scale=2", "--concurrency=6"])
    finally:
        cut.unlink()
        shutil.move(keep, cut)
    print("4K 成片：", out / f"{title}-4K.mp4")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
