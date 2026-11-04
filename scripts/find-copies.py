#!/usr/bin/env python3
"""Search GitHub for copies of ky-skills by their copyright markers.

Every SKILL.md and style block in this repository carries a marker such as
`KYTS-paper-2611` or `KYX-SKILL-2611`. This script collects those markers
from the repository, searches GitHub code for each one, and lists every
repository other than KirenYi/ky-skills that contains them.

Requires the GitHub CLI (`gh`) logged in. GitHub limits code search to about
10 requests per minute, so the script waits between searches.

Usage:
    python3 scripts/find-copies.py              # print a report
    python3 scripts/find-copies.py --save       # also save to docs/copy-reports/

Limits: GitHub only indexes default branches, and forks are searchable only
when they have more stars than the parent. Copies with every marker removed
cannot be found this way.

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See ky-skills LICENSE.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import subprocess
import sys
import time
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OWN_REPOS = {"KirenYi/ky-skills"}
MARKER = re.compile(r"\bKY[A-Z]+-[A-Za-z]+-2611\b")
WAIT_SECONDS = 7


def collect_markers() -> list[str]:
    markers: set[str] = set()
    for path in (REPO_ROOT / "skills").rglob("*.md"):
        markers.update(MARKER.findall(path.read_text(encoding="utf-8", errors="ignore")))
    # One marker per SKILL.md is enough to find a copied skill; also keep style markers.
    return sorted(markers)


def search(marker: str) -> list[dict]:
    result = subprocess.run(
        ["gh", "api", "-X", "GET", "search/code", "-f", f'q="{marker}"', "-f", "per_page=100"],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"  搜索失败 {marker}: {result.stderr.strip()[:200]}", file=sys.stderr)
        return []
    items = json.loads(result.stdout).get("items", [])
    return [
        {"repo": i["repository"]["full_name"], "path": i["path"], "url": i["html_url"]}
        for i in items
        if i["repository"]["full_name"] not in OWN_REPOS
    ]


def main() -> int:
    parser = argparse.ArgumentParser(description="在 GitHub 上搜索带有 ky-skills 版权标识的副本")
    parser.add_argument("--save", action="store_true", help="把报告保存到 docs/copy-reports/")
    args = parser.parse_args()

    markers = collect_markers()
    print(f"共 {len(markers)} 个版权标识，开始搜索（每次间隔 {WAIT_SECONDS} 秒）…")
    found: dict[str, list[dict]] = {}
    for n, marker in enumerate(markers, 1):
        print(f"[{n}/{len(markers)}] {marker}")
        for hit in search(marker):
            found.setdefault(hit["repo"], []).append({**hit, "marker": marker})
        if n < len(markers):
            time.sleep(WAIT_SECONDS)

    today = dt.date.today().isoformat()
    lines = [f"# ky-skills 副本搜索报告 · {today}", ""]
    if not found:
        lines.append("没有在其他 GitHub 仓库中发现 ky-skills 的版权标识。")
    else:
        lines.append(f"在 {len(found)} 个其他仓库中发现版权标识：")
        for repo, hits in sorted(found.items()):
            lines += ["", f"## {repo}", ""]
            for h in hits:
                lines.append(f"- `{h['marker']}` · [{h['path']}]({h['url']})")
    lines += ["", "说明：只能找到保留了标识的副本；GitHub 只索引默认分支。"]
    report = "\n".join(lines) + "\n"
    print("\n" + report)

    if args.save:
        out = REPO_ROOT / "docs" / "copy-reports" / f"{today}.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(report, encoding="utf-8")
        print(f"已保存：{out.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
