#!/usr/bin/env python3
"""Find (or set) the notes folder where ky-learn, ky-card and ky-council save their files.

Order: the KY_NOTES_ROOT environment variable, then ~/.config/kyskills/config.json.
The script never falls back to the current directory.

Usage:
    python3 notes_root.py              # print the notes folder
    python3 notes_root.py --json       # same, as JSON
    python3 notes_root.py --set PATH   # save PATH as the notes folder (created if missing)

Exit codes: 0 ok · 2 not configured yet (ask the user where to save) ·
3 configured folder missing or not writable.

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See kyskills LICENSE. · KYNOTES-root-2611
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import tempfile
from pathlib import Path

CONFIG = Path.home() / ".config" / "kyskills" / "config.json"
ENV = "KY_NOTES_ROOT"


def read_config() -> dict:
    try:
        return json.loads(CONFIG.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def configured_root() -> Path | None:
    value = os.environ.get(ENV) or read_config().get("notes_root")
    return Path(value).expanduser() if value else None


def writable(path: Path) -> bool:
    try:
        with tempfile.NamedTemporaryFile(dir=path, prefix=".ky-write-test-"):
            return True
    except OSError:
        return False


def report(path: Path, as_json: bool) -> None:
    print(json.dumps({"status": "ok", "notes_root": str(path)}, ensure_ascii=False) if as_json else path)


def main() -> int:
    parser = argparse.ArgumentParser(description="Find or set the kyskills notes folder.")
    parser.add_argument("--set", metavar="PATH", help="save PATH as the notes folder")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    if args.set:
        root = Path(args.set).expanduser().resolve()
        root.mkdir(parents=True, exist_ok=True)
        if not writable(root):
            print(f"Cannot write to {root}", file=sys.stderr)
            return 3
        config = read_config()
        config["notes_root"] = str(root)
        CONFIG.parent.mkdir(parents=True, exist_ok=True)
        CONFIG.write_text(json.dumps(config, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        report(root, args.json)
        return 0

    root = configured_root()
    if root is None:
        print(
            "Notes folder not set. Ask the user where to save (for example ~/ky-notes or an "
            "existing Obsidian vault), then run: notes_root.py --set PATH",
            file=sys.stderr,
        )
        return 2
    if not root.is_dir() or not writable(root):
        print(f"Notes folder missing or not writable: {root}", file=sys.stderr)
        return 3
    report(root, args.json)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
