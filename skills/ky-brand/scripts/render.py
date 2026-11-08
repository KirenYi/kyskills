"""Render brand designs (covers, cards, posters, slide decks) from a JSON spec.

python3 render.py <spec.json> [--out <dir>] [--theme magazine|study|warm]
python3 render.py --set-signature "Your Name" [--site example.com]   # save the signature once ("" = no signature)

Every item in the spec becomes a PNG at the platform's real size; a "slides" item also becomes a PDF deck.
Markup inside text: [文字] = accent colour, {？？} = accent box, \\n = line break.
Output names follow 项目简称_用途_版本_比例_日期, e.g. taste_wechat-cover_v01_235x100_20261105.png

Needs Google Chrome or Chromium (headless). Fonts: Noto Serif SC / Noto Sans SC (SIL OFL 1.1), downloaded once
with fetch_fonts.py into ~/.config/ky-skills/fonts/.

Signature: from ~/.config/ky-skills/config.json ("brand": {"name", "site"}); a spec can override with "author" / "website".

Copyright (c) 2026 Kiren Yi (KY). All rights reserved. See kyskills LICENSE. · KYBRAND-engine-2611
"""
from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import os
import platform
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

SKILL = Path(__file__).resolve().parents[1]
ASSETS = SKILL / "assets"
CONFIG = Path.home() / ".config" / "kyskills" / "config.json"
SHARED_FONTS = Path.home() / ".config" / "kyskills" / "fonts"


def read_config() -> dict:
    try:
        return json.loads(CONFIG.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def font_dir() -> Path:
    for d in (SHARED_FONTS, ASSETS / "fonts"):
        if (d / "NotoSerifSC.ttf").is_file() and (d / "NotoSansSC.ttf").is_file():
            return d
    raise SystemExit("FONTS_MISSING: 还没有下载字体（约 40 MB，开源可商用）。先征得用户同意，再运行 "
                     f"python3 {Path(__file__).with_name('fetch_fonts.py')}")

SIZES = {  # type: (w, h, ratio label)
    "wechat-cover": (2350, 1000, "235x100"),
    "wechat-square": (1080, 1080, "1x1"),
    "xhs": (1080, 1440, "3x4"),
    "quote": (1080, 1080, "1x1"),
    "poster": (1080, 1440, "3x4"),
    "video-cover": (1920, 1080, "16x9"),
    "slides": (1920, 1080, "16x9"),
}
# 国内平台（公众号、小红书）带网址容易被判引流：这些类型默认署名只留名字，可用 "site": true 强制显示网址
NO_SITE = {"wechat-cover", "wechat-square", "xhs"}


# ---------------------------------------------------------------- helpers
class Kit:
    def __init__(self, t: dict):
        self.t = t
        self.SER = "NSerif, serif"
        self.SAN = "NSans, sans-serif"
        self.TF = self.SER if t["title_font"] == "serif" else self.SAN
        self.TW = t["title_weight"]
        self.site = True  # 署名里是否带网址，每个物料渲染前由 main() 设置
        self.author = ""   # 署名名字，空字符串 = 不署名
        self.website = ""  # 署名网址

    def text(self, s: str, accent: str | None = None) -> str:
        """escape, then [x] -> accent colour, {x} -> white text on an accent box (the 是？？ suspense box), \\n -> <br>"""
        a = accent or self.t["accent"]
        s = html.escape(s).replace("\n", "<br>")
        s = s.replace("{", f'<span style="display:inline-block;background:{a};color:#fff;padding:0 .3em;margin:0 .08em;'
                           f'transform:rotate(-3deg);border-radius:{min(self.t["radius"], 8)}px">').replace("}", "</span>")
        return s.replace("[", f'<span style="color:{a}">').replace("]", "</span>")

    def kicker(self, txt: str, size: float, on_dark=False) -> str:
        if not txt:
            return ""
        t = self.t
        ink = t["bg"] if on_dark else t["ink"]
        sub = t["bg"] if on_dark else t["sub"]
        acc = t["accent_on_dark"] if on_dark else t["accent"]
        txt = html.escape(txt)
        if t["kicker"] == "rule":
            return (f'<div style="display:flex;align-items:center;gap:{size * .6}px;font:500 {size}px {self.SAN};'
                    f'letter-spacing:{size * .3}px;color:{ink}"><span style="width:{size * 2}px;height:2px;background:{acc}"></span>{txt}</div>')
        if t["kicker"] == "pill":
            return (f'<div style="display:inline-block;font:600 {size}px {self.SAN};color:{acc};background:{acc}1F;'
                    f'padding:{size * .35}px {size * .8}px;border-radius:999px;letter-spacing:{size * .08}px">{txt}</div>')
        return (f'<div style="display:flex;align-items:center;gap:{size * .5}px;font:500 {size}px {self.SAN};color:{sub};'
                f'letter-spacing:{size * .15}px"><span style="width:{size * .5}px;height:{size * .5}px;border-radius:50%;background:{acc}"></span>{txt}</div>')

    def sig(self, size: float, color: str | None = None) -> str:
        c = color or self.t["ink"]
        if not self.author:
            return ""
        return (f'<div style="display:flex;align-items:baseline;gap:{size * .6}px;font:{size}px {self.SAN};color:{c}">'
                f'<b style="font:{self.TW} {size * 1.15}px {self.TF}">{html.escape(self.author)}</b>'
                + (f'<span style="opacity:.6">{html.escape(self.website)}</span>' if self.site and self.website else '') + '</div>')

    def rule(self, w: float, color: str | None = None) -> str:
        h = 8 if self.t["kicker"] == "rule" else 6
        r = 0 if self.t["radius"] == 0 else 3
        return f'<div style="width:{w}px;height:{h}px;background:{color or self.t["accent"]};border-radius:{r}px"></div>'

    def title(self, s: str, size: float, color: str | None = None, lh=1.22, accent=None) -> str:
        return (f'<div style="font:{self.TW} {size}px/{lh} {self.TF};letter-spacing:{-size / 75:.1f}px;'
                f'color:{color or self.t["ink"]}">{self.text(s, accent)}</div>')

    def photo(self, it: dict, w: int, h: int, side="right") -> str:
        """optional speaker photo: it['photo'] = path, it['face'] = [x, y] in the photo (px); fades into the background."""
        if not it.get("photo"):
            return ""
        src = Path(it["photo"]).expanduser().resolve().as_uri()
        bg = self.t["bg"]
        if side == "right":
            return (f'<img src="{src}" style="position:absolute;right:0;top:0;height:100%;width:{w * .55}px;object-fit:cover;'
                    f'object-position:{it.get("focus", "50% 30%")}">'
                    f'<div style="position:absolute;left:0;top:0;width:{w * .62}px;height:100%;'
                    f'background:linear-gradient(90deg,{bg} 72%,{bg}00)"></div>')
        return (f'<img src="{src}" style="position:absolute;left:0;bottom:0;width:100%;height:{h * .55}px;object-fit:cover;'
                f'object-position:{it.get("focus", "50% 30%")}">'
                f'<div style="position:absolute;left:0;top:0;width:100%;height:{h * .62}px;'
                f'background:linear-gradient(180deg,{bg} 78%,{bg}00)"></div>')


def abs_(x, y, inner, extra=""):
    return f'<div style="position:absolute;left:{x}px;top:{y}px;{extra}">{inner}</div>'


# ---------------------------------------------------------------- formats
def wechat_cover(k: Kit, it: dict) -> str:
    out = k.photo(it, 2350, 1000)
    out += abs_(140, 150, k.kicker(it.get("kicker", ""), 34) + f'<div style="margin-top:60px">{k.title(it["title"], it.get("size", 150))}</div>')
    out += f'<div style="position:absolute;left:140px;bottom:120px">{k.rule(140)}</div>'
    out += f'<div style="position:absolute;left:{140 + 180}px;bottom:110px">{k.sig(34)}</div>' if it.get("photo") else \
        f'<div style="position:absolute;right:140px;bottom:110px">{k.sig(34)}</div>'
    if it.get("num") and not it.get("photo"):
        out += f'<div style="position:absolute;right:140px;top:140px;font:italic 400 300px/1 {k.SER};color:{k.t["accent"]};opacity:.9">{html.escape(it["num"])}</div>'
    return out


def square(k: Kit, it: dict, w=1080, h=1080) -> str:
    out = abs_(90, 110, k.kicker(it.get("kicker", ""), 28))
    out += abs_(90, 260, k.title(it["title"], it.get("size", 112), lh=1.25), f"right:90px")
    if it.get("sub"):
        out += abs_(90, 660, f'<div style="font:400 40px/1.6 {k.SAN};color:{k.t["sub"]}">{k.text(it["sub"])}</div>', "right:90px")
    out += f'<div style="position:absolute;left:90px;bottom:100px">{k.sig(28)}</div>'
    return out


def xhs(k: Kit, it: dict) -> str:
    out = k.photo(it, 1080, 1440, side="bottom")
    out += abs_(90, 120, k.kicker(it.get("kicker", ""), 32))
    out += abs_(90, 270, k.title(it["title"], it.get("size", 128)), "right:90px")
    if it.get("sub"):
        out += abs_(90, it.get("sub_top", 820 if not it.get("photo") else 700),
                    f'<div style="font:400 44px/1.6 {k.SAN};color:{k.t["sub"]}">{k.text(it["sub"])}</div>', "right:90px")
    if not it.get("photo"):
        out += abs_(90, 1060, k.rule(120))
        out += f'<div style="position:absolute;left:90px;bottom:110px">{k.sig(32)}</div>'
    return out


def quote(k: Kit, it: dict) -> str:
    t = k.t
    out = abs_(100, 90, f'<div style="font:400 260px/1 {k.SER};color:{t["accent"]}">“</div>')
    out += abs_(100, 360, k.title(it["text"], it.get("size", 84), lh=1.45), "right:100px")
    if it.get("who"):
        out += abs_(100, 760, f'<div style="font:400 32px {k.SAN};color:{t["sub"]}">— {html.escape(it["who"])}</div>')
    out += f'<div style="position:absolute;left:100px;bottom:110px">{k.rule(90)}<div style="margin-top:36px">{k.sig(28)}</div></div>'
    return out


def poster(k: Kit, it: dict) -> str:
    t = k.t
    acc = t["accent_on_dark"]
    out = f'<div style="position:absolute;inset:0;background:{t["dark"]}"></div>'
    out += abs_(90, 110, k.kicker(it.get("kicker", ""), 30, on_dark=True))
    out += abs_(90, 250, k.title(it["title"], it.get("size", 132), color=t["bg"], lh=1.18, accent=acc), "right:90px")
    if it.get("sub"):
        out += abs_(90, 640, f'<div style="font:400 42px/1.7 {k.SAN};color:{t["bg"]};opacity:.75">{k.text(it["sub"], acc)}</div>', "right:90px")
    if it.get("tags"):
        tags = "".join(f'<div style="border:1.5px solid {t["bg"]}55;color:{t["bg"]};font:500 30px {k.SAN};padding:14px 26px;'
                       f'border-radius:{t["radius"]}px">{html.escape(x)}</div>' for x in it["tags"])
        out += abs_(90, 900, f'<div style="display:flex;gap:20px;flex-wrap:wrap;width:900px">{tags}</div>')
    cta = (f'<div style="background:{acc};color:#fff;font:700 34px {k.SAN};padding:20px 36px;border-radius:{t["radius"]}px">'
           f'{html.escape(it["cta"])}</div>') if it.get("cta") else ""
    out += (f'<div style="position:absolute;left:90px;right:90px;bottom:100px;display:flex;justify-content:space-between;'
            f'align-items:flex-end">{k.sig(30, t["bg"])}{cta}</div>')
    return out


def video_cover(k: Kit, it: dict) -> str:
    out = k.photo(it, 1920, 1080)
    out += abs_(110, 160, k.kicker(it.get("kicker", ""), 30) + f'<div style="margin-top:46px">{k.title(it["title"], it.get("size", 116 if it.get("photo") else 132))}</div>',
                "width:1050px" if it.get("photo") else "right:110px")
    out += f'<div style="position:absolute;left:110px;bottom:90px">{k.sig(30)}</div>'
    return out


# ---------------------------------------------------------------- slides
def slide(k: Kit, s: dict, deck: dict, i: int, n: int) -> str:
    t = k.t
    lay = s.get("layout", "bullets")
    dark = lay in ("cover", "end") and deck.get("dark_cover", True)
    fg = t["bg"] if dark else t["ink"]
    acc = t["accent_on_dark"] if dark else t["accent"]
    out = f'<div style="position:absolute;inset:0;background:{t["dark"]}"></div>' if dark else ""
    if lay not in ("cover", "end"):
        out += (f'<div style="position:absolute;top:70px;left:120px;right:120px;display:flex;justify-content:space-between;'
                f'font:500 24px {k.SAN};color:{t["sub"]};letter-spacing:4px"><span>{html.escape(deck.get("header", ""))}</span>'
                f'<span>{i:02d} / {n:02d}</span></div>')
        out += f'<div style="position:absolute;left:120px;bottom:60px">{k.sig(24, t["sub"])}</div>'
    if lay == "cover":
        out += abs_(120, 170, k.kicker(s.get("kicker", ""), 30, on_dark=dark))
        out += abs_(120, 300, k.title(s["title"], s.get("size", 150), color=fg, accent=acc), "right:120px")
        if s.get("sub"):
            out += abs_(120, 700, f'<div style="font:400 44px/1.6 {k.SAN};color:{fg};opacity:.75">{k.text(s["sub"], acc)}</div>')
        out += f'<div style="position:absolute;left:120px;bottom:90px">{k.sig(32, fg)}</div>'
    elif lay == "section":
        out += abs_(120, 250, f'<div style="font:italic 400 220px/1 {k.SER};color:{t["accent"]}">{html.escape(s.get("n", ""))}</div>')
        out += abs_(120, 520, k.title(s["title"], s.get("size", 120)), "right:120px")
        out += abs_(120, 700, k.rule(120))
        if s.get("sub"):
            out += abs_(120, 740, f'<div style="font:400 34px {k.SAN};color:{t["sub"]}">{k.text(s["sub"])}</div>')
    elif lay == "list":  # numbered rows: items = [[name, note], ...]
        border = f'{t["line_px"]}px solid {t["line"]}'
        rows = "".join(
            f'<div style="display:flex;align-items:baseline;gap:50px;padding:34px 0;border-top:{border}">'
            f'<span style="font:italic 400 48px {k.SER};color:{t["accent"]};width:70px">{j + 1:02d}</span>'
            f'<span style="font:{k.TW} 64px {k.TF};min-width:200px">{k.text(a)}</span>'
            f'<span style="font:400 36px {k.SAN};color:{t["sub"]}">{k.text(b)}</span></div>'
            for j, (a, b) in enumerate(s["items"]))
        out += abs_(120, 220, k.kicker(s.get("kicker", ""), 26) + f'<div style="margin-top:40px">{k.title(s["title"], 96, lh=1.25)}</div>'
                    f'<div style="margin-top:50px">{k.rule(110)}</div>', "width:620px")
        out += abs_(860, 240, rows + f'<div style="border-top:{border}"></div>', "width:940px")
    elif lay == "statement":
        out += abs_(160, 300, k.title(s["text"], s.get("size", 88), lh=1.45), "right:160px")
        if s.get("who"):
            out += abs_(160, 760, f'<div style="font:400 32px {k.SAN};color:{t["sub"]}">— {html.escape(s["who"])}</div>')
    elif lay == "bullets":
        pts = "".join(f'<div style="display:flex;gap:28px;align-items:baseline;margin-bottom:34px">'
                      f'<span style="width:14px;height:14px;background:{t["accent"]};border-radius:{0 if t["radius"] == 0 else 7}px;flex:none;transform:translateY(-8px)"></span>'
                      f'<span style="font:400 44px/1.5 {k.SAN}">{k.text(p)}</span></div>' for p in s["points"])
        out += abs_(120, 200, k.kicker(s.get("kicker", ""), 26) + f'<div style="margin-top:36px">{k.title(s["title"], 84, lh=1.25)}</div>', "right:120px")
        out += abs_(120, 480, pts, "right:160px")
    elif lay == "end":
        out += abs_(120, 330, k.title(s.get("title", "谢谢"), s.get("size", 140), color=fg, accent=acc))
        if s.get("sub"):
            out += abs_(120, 560, f'<div style="font:400 44px/1.6 {k.SAN};color:{fg};opacity:.75">{k.text(s["sub"], acc)}</div>')
        out += f'<div style="position:absolute;left:120px;bottom:90px">{k.sig(32, fg)}</div>'
    else:
        raise SystemExit(f"未知的幻灯片版式：{lay}（可用：cover section list statement bullets end）")
    return out


RENDER = {"wechat-cover": wechat_cover, "wechat-square": square, "xhs": xhs, "quote": quote, "poster": poster, "video-cover": video_cover}


# ---------------------------------------------------------------- page + chrome
def page(k: Kit, w: int, h: int, bodies: list[str]) -> str:
    fonts = font_dir()
    grain = ("background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>"
             "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/>"
             "<feColorMatrix values='0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 .10 0'/></filter>"
             "<rect width='220' height='220' filter='url(%23n)'/></svg>\");") if k.t["grain"] else ""
    pages = "".join(f'<section style="position:relative;width:{w}px;height:{h}px;overflow:hidden;background:{k.t["bg"]};'
                    f'color:{k.t["ink"]};{grain}break-after:page">{b}</section>' for b in bodies)
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:NSerif;src:url("{(fonts / 'NotoSerifSC.ttf').as_uri()}");font-weight:200 900}}
@font-face{{font-family:NSans;src:url("{(fonts / 'NotoSansSC.ttf').as_uri()}");font-weight:100 900}}
@page{{size:{w}px {h}px;margin:0}} html,body{{margin:0;padding:0}} *{{box-sizing:border-box}}
</style></head><body>{pages}</body></html>"""


def chrome() -> str:
    for c in ("google-chrome", "chromium", "chromium-browser", "chrome"):
        if shutil.which(c):
            return shutil.which(c)
    cands = {"Darwin": ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium"],
             "Windows": [os.path.expandvars(r"%ProgramFiles%\Google\Chrome\Application\chrome.exe"),
                         os.path.expandvars(r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"),
                         os.path.expandvars(r"%LocalAppData%\Google\Chrome\Application\chrome.exe")]}
    for c in cands.get(platform.system(), []):
        if Path(c).exists():
            return c
    raise SystemExit("找不到 Chrome / Chromium，请先安装 Google Chrome")


def shoot(html_text: str, w: int, h: int, png: Path | None = None, pdf: Path | None = None):
    with tempfile.TemporaryDirectory() as d:
        f = Path(d) / "page.html"
        f.write_text(html_text, encoding="utf-8")
        base = [chrome(), "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                "--virtual-time-budget=4000", f"--user-data-dir={Path(d) / 'profile'}"]
        if png:
            subprocess.run(base + [f"--window-size={w},{h}", f"--screenshot={png}", f.as_uri()], check=True, capture_output=True)
        if pdf:
            subprocess.run(base + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", f.as_uri()], check=True, capture_output=True)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("spec", nargs="?")
    ap.add_argument("--out", default="")
    ap.add_argument("--theme", default="")
    ap.add_argument("--set-signature", metavar="NAME", help='save the signature name ("" = no signature)')
    ap.add_argument("--site", default="", help="website shown after the name (with --set-signature)")
    a = ap.parse_args()
    if a.set_signature is not None:
        cfg = read_config()
        cfg["brand"] = {"name": a.set_signature, "site": a.site}
        CONFIG.parent.mkdir(parents=True, exist_ok=True)
        CONFIG.write_text(json.dumps(cfg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"署名已保存：{a.set_signature or '（不署名）'} {a.site}".rstrip())
        return 0
    if not a.spec:
        ap.error("spec is required")
    spec_path = Path(a.spec).expanduser().resolve()
    spec = json.loads(spec_path.read_text(encoding="utf-8"))
    theme = a.theme or spec.get("theme", "magazine")
    tf = ASSETS / "themes" / f"{theme}.json"
    if not tf.exists():
        raise SystemExit(f"没有这个主题：{theme}（可用：{', '.join(p.stem for p in (ASSETS / 'themes').glob('*.json'))}）")
    k = Kit(json.loads(tf.read_text(encoding="utf-8")))
    brand = read_config().get("brand")
    if "author" not in spec and brand is None:
        raise SystemExit("SIGNATURE_NOT_SET: 还没设置署名。问用户想在图上署什么名字和网址（也可以不署名），"
                         f'然后运行 python3 {Path(__file__).name} --set-signature "名字" --site 网址')
    k.author = spec.get("author", (brand or {}).get("name", ""))
    k.website = spec.get("website", (brand or {}).get("site", ""))
    font_dir()
    out = Path(a.out or spec.get("out") or spec_path.parent).expanduser().resolve()
    out.mkdir(parents=True, exist_ok=True)
    slug = spec.get("slug", "brand")
    ver = spec.get("version", "v01")
    date = dt.date.today().strftime("%Y%m%d")
    made = []
    for it in spec["items"]:
        typ = it["type"]
        if typ not in SIZES:
            raise SystemExit(f"未知类型：{typ}（可用：{', '.join(SIZES)}）")
        w, h, ratio = SIZES[typ]
        use = it.get("name", typ)
        k.site = it.get("site", spec.get("site", typ not in NO_SITE))
        if typ == "slides":
            slides = it["slides"]
            bodies = [slide(k, s, it, i + 1, len(slides)) for i, s in enumerate(slides)]
            pdf = out / f"{slug}_{use}_{ver}_{ratio}_{date}.pdf"
            shoot(page(k, w, h, bodies), w, h, pdf=pdf)
            made.append(pdf)
            if it.get("png", True):
                for i, b in enumerate(bodies):
                    png = out / f"{slug}_{use}-{i + 1:02d}_{ver}_{ratio}_{date}.png"
                    shoot(page(k, w, h, [b]), w, h, png=png)
                    made.append(png)
        else:
            png = out / f"{slug}_{use}_{ver}_{ratio}_{date}.png"
            shoot(page(k, w, h, [RENDER[typ](k, it)]), w, h, png=png)
            made.append(png)
    print(f"主题 {k.t['label']}，生成 {len(made)} 个文件 → {out}")
    for m in made:
        print("  ", m.name)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
