"""Create a new video project from the template + a style package.

python3 new_project.py <dest_dir> --style magazine --source <raw.MP4> --title 标题 [--no-install]

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See kyskills LICENSE. · KYVIDEO-engine-2611
"""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path

from common import ASSETS, need


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("dest")
    ap.add_argument("--style", default="magazine")
    ap.add_argument("--source", default="")
    ap.add_argument("--title", default="")
    ap.add_argument("--example", default="", help="copy per-video files from assets/examples/<name> (for re-runs/tests)")
    ap.add_argument("--no-install", action="store_true")
    a = ap.parse_args()

    dest = Path(a.dest).expanduser().resolve()
    if dest.exists() and any(dest.iterdir()):
        sys.exit(f"目标目录已存在且不为空，不覆盖：{dest}")
    style = ASSETS / "styles" / a.style
    if not (style / "style.json").is_file():
        have = [p.name for p in (ASSETS / "styles").iterdir() if (p / "style.json").is_file()]
        sys.exit(f"没有这个风格：{a.style}。可选：{', '.join(have)}")

    shutil.copytree(ASSETS / "template", dest, dirs_exist_ok=True)
    for d in ("work", "public", "out"):
        (dest / d).mkdir(exist_ok=True)
    shutil.copytree(style, dest / "src" / "style", dirs_exist_ok=True)
    (dest / "src" / "style" / "sample.png").unlink(missing_ok=True)
    # style fonts are served from public/ (loaded by src/style/fonts.ts).
    # The font files are not bundled; fetch_fonts.py downloads them once to ~/.config/kyskills/fonts/.
    if (dest / "src" / "style" / "fonts").is_dir():
        shutil.move(str(dest / "src" / "style" / "fonts"), str(dest / "public" / "fonts"))
        shared = Path.home() / ".config" / "kyskills" / "fonts"
        for ttf in ("NotoSerifSC.ttf", "NotoSansSC.ttf"):
            if not (shared / ttf).is_file():
                sys.exit("FONTS_MISSING: 还没有下载字体（约 40 MB，开源可商用）。先征得用户同意，再运行 "
                         f"python3 {Path(__file__).with_name('fetch_fonts.py')}，然后重新建项目。")
            shutil.copy2(shared / ttf, dest / "public" / "fonts" / ttf)
    if a.example:
        ex = ASSETS / "examples" / a.example
        shutil.copytree(ex, dest, dirs_exist_ok=True)

    cfg = json.loads((dest / "project.json").read_text(encoding="utf-8"))
    cfg["style"] = a.style
    if a.source:
        cfg["source"] = a.source
    if a.title:
        cfg["title"] = a.title
    (dest / "project.json").write_text(json.dumps(cfg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    subprocess.run([sys.executable, str(Path(__file__).with_name("sfx.py")), str(dest)], check=True)
    if not a.no_install:
        subprocess.run([need("npm"), "install", "--no-audit", "--no-fund"], cwd=dest, check=True)
    print(f"项目已创建：{dest}（风格：{a.style}）")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
