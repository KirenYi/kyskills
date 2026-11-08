#!/usr/bin/env python3
"""Download the open-source fonts used by ky-brand and ky-video (Noto Serif SC, Noto Sans SC).

The fonts are not bundled with the skills, to keep the repository small. They are saved once
to ~/.config/ky-skills/fonts/ and shared by both skills. About 40 MB in total.

Usage:
    python3 fetch_fonts.py           # download if missing
    python3 fetch_fonts.py --check   # exit 0 if present, 1 if missing

License: both fonts are under the SIL Open Font License 1.1 (saved next to them as OFL.txt).

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See ky-skills LICENSE. · KYFONTS-fetch-2611
"""

from __future__ import annotations

import argparse
import sys
import urllib.request
from pathlib import Path

FONT_DIR = Path.home() / ".config" / "ky-skills" / "fonts"
BASE = "https://github.com/google/fonts/raw/main/ofl"
FILES = {
    "NotoSerifSC.ttf": f"{BASE}/notoserifsc/NotoSerifSC%5Bwght%5D.ttf",
    "NotoSansSC.ttf": f"{BASE}/notosanssc/NotoSansSC%5Bwght%5D.ttf",
    "OFL.txt": f"{BASE}/notoserifsc/OFL.txt",
}


def missing() -> list[str]:
    return [name for name in FILES if not (FONT_DIR / name).is_file()]


def main() -> int:
    parser = argparse.ArgumentParser(description="Download the fonts used by ky-brand and ky-video.")
    parser.add_argument("--check", action="store_true", help="only check whether the fonts are present")
    args = parser.parse_args()

    todo = missing()
    if args.check:
        print(FONT_DIR if not todo else f"Missing in {FONT_DIR}: {', '.join(todo)}")
        return 0 if not todo else 1
    if not todo:
        print(f"Fonts already present: {FONT_DIR}")
        return 0

    FONT_DIR.mkdir(parents=True, exist_ok=True)
    for name in todo:
        target = FONT_DIR / name
        tmp = target.with_suffix(target.suffix + ".part")
        print(f"Downloading {name} ...", flush=True)
        try:
            urllib.request.urlretrieve(FILES[name], tmp)
        except OSError as e:
            tmp.unlink(missing_ok=True)
            print(f"Download failed for {name}: {e}", file=sys.stderr)
            return 2
        tmp.replace(target)
    print(f"Fonts saved to {FONT_DIR}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
