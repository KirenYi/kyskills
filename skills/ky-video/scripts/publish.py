"""Step 5: covers for every platform + the release folder.

python3 publish.py <project> [--covers-only]

Renders every cover Still listed in project.json "covers" (PNG), converts to JPG named per platform,
then assembles out/发布包-<title>/ with: 4K video, 1080p fallback, 标题和简介.md, 封面/.
Upload ONLY from this folder (avoids uploading cut.mp4 or other intermediates by mistake).

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See kyskills LICENSE. · KYVIDEO-engine-2611
"""
from __future__ import annotations

import argparse
import shutil

from common import ffmpeg, load, npx, project_root, run


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project", nargs="?")
    ap.add_argument("--covers-only", action="store_true")
    a = ap.parse_args()
    p = project_root(a.project)
    cfg = load(p, "project.json")
    title = cfg["title"]
    pack = p / "out" / f"发布包-{title}"
    covers = pack / "封面"
    covers.mkdir(parents=True, exist_ok=True)
    png = p / "out" / "封面-png"
    png.mkdir(exist_ok=True)

    for cid, names in cfg.get("covers", {}).items():
        f = png / f"{cid}.png"
        run([npx(), "remotion", "still", "src/index.ts", cid, f], cwd=p)
        for n in names:
            ffmpeg("-i", f, "-q:v", "2", covers / f"{n}.jpg")
    print("封面：", ", ".join(sorted(x.name for x in covers.iterdir())))
    if a.covers_only:
        return 0

    v4k = p / "out" / f"{title}-4K.mp4"
    if not v4k.exists():
        raise SystemExit(f"还没有 4K 成片：先运行 render.py --4k")
    shutil.copy(v4k, pack / f"{title}-4K-上传用.mp4")
    ffmpeg("-i", v4k, "-vf", "scale=1920:1080:flags=lanczos", "-c:v", "libx264", "-preset", "medium", "-crf", "18",
           "-c:a", "copy", pack / f"{title}-1080p-备用.mp4")
    meta = p / "标题和简介.md"
    if meta.exists():
        shutil.copy(meta, pack / meta.name)
    else:
        print("提醒：项目根目录还没有 标题和简介.md")
    print("发布包：", pack)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
