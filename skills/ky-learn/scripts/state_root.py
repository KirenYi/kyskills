from __future__ import annotations

import argparse
import json
import os
import shutil
import sys
from pathlib import Path


ENV_NAME = "KY_LEARN_HOME"
DEFAULT_DIRNAME = ".ky-learn"


def state_root() -> Path:
    configured = os.environ.get(ENV_NAME)
    if configured:
        candidate = Path(configured).expanduser()
        if not candidate.is_absolute():
            raise ValueError(f"{ENV_NAME} must be an absolute path")
        return candidate.resolve()
    return (Path.home() / DEFAULT_DIRNAME).resolve()


def initialize(root: Path) -> None:
    skill_root = Path(__file__).resolve().parent.parent
    index_template = skill_root / "assets" / "learning-index-template.md"
    if not index_template.is_file():
        raise FileNotFoundError(f"Missing packaged template: {index_template}")

    root.mkdir(parents=True, exist_ok=True)
    (root / "subjects").mkdir(exist_ok=True)
    (root / "notes").mkdir(exist_ok=True)

    index_path = root / "learning-index.md"
    if not index_path.exists():
        shutil.copyfile(index_template, index_path)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Resolve the private local state directory used by ky-learn."
    )
    parser.add_argument(
        "--target",
        choices=("root", "index", "subjects", "notes"),
        default="root",
    )
    parser.add_argument("--init", action="store_true")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    try:
        root = state_root()
        if args.init:
            initialize(root)
    except (OSError, ValueError) as exc:
        print(f"Unable to resolve or initialize ky-learn state: {exc}", file=sys.stderr)
        return 2

    targets = {
        "root": root,
        "index": root / "learning-index.md",
        "subjects": root / "subjects",
        "notes": root / "notes",
    }
    target = targets[args.target]

    if args.json:
        print(
            json.dumps(
                {
                    "status": "ok",
                    "target_kind": args.target,
                    "target": str(target),
                    "initialized": args.init,
                },
                ensure_ascii=False,
            )
        )
    else:
        print(target)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
