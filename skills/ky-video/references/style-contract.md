# 风格包约定

风格包 = 一个文件夹 `assets/styles/<name>/`。新建项目时它会被复制到项目的 `src/style/`。
引擎和 scenes.tsx 只通过 `../style` 引用，所以**每个风格包都必须导出同一套名字**，换风格只需要换文件夹。

## 必须有的文件

| 文件 | 内容 |
|---|---|
| `style.json` | `name`、`label`、`bg`（卡片和空白段的底色，hex，不带 #）、`sfx`（各音效音量） |
| `STYLE.md` | 一句话气质、配色、字体、适合 / 不适合的题材、样图 |
| `sample.png` | 1920×1080 样图 |
| `index.ts` | 导出下面所有名字，以及 `SFX_VOL` |
| `theme.ts` | `bg ink red grey serif sans ease prog(f,start,dur) out(f,dur,d)`（颜色名可以沿用，值换掉） |
| `layout.ts` | `geoFor(layout, zoom, face)` 和 `isFlat(layout)`：A–E 版式下人像的位置 |
| `kit.tsx` | 通用组件（见下表） |
| `fonts/` + `fonts.ts` | 字体文件和许可证（只能用 `kyskills/docs/FONT_LICENSE.md` 白名单里的字体）；new_project 会把它们放进 public/fonts |
| `covers.tsx` | `Suspense169 / Suspense43 / Suspense34`，以及 `Photo Badge Q Strike PhotoSpec` |

## kit.tsx 必须导出

辅助：`glow useSpring cueAt BZone CZone Kicker`
组件：`TwoLines BigWord NotEqual Statement Chat Method NumberList CheckList TypeNote ChapterCard QuoteCard TitleSting HookOverlay CaptionBox`

props 签名照抄 magazine，样式可以完全不同。新风格可以额外加组件，但 scenes 里用了额外组件之后就不能直接换风格，记得在 STYLE.md 里标注。

## 新建风格的流程（第 1 期验证过）

1. 和用户聊气质，参考第 1 期的三种：极简杂志、手账纸张、深色科技。
2. 用 Remotion Still 出 **3 张样图**，内容统一用本期的一个真实画面，比如章节卡加一张图解。
3. 用户选定（可以混搭，比如"风格 3 的金字塔换成风格 1 的配色"）后，做 **10 秒动态样片**确认节奏。
4. 复制 `magazine/` 改成新名字，逐个改组件样式，保持 props 不变。
5. 用 `assets/examples/taste` 跑一次：`new_project.py <tmp> --style <新风格> --example taste --no-install`，然后渲染几帧检查有没有溢出、重叠。
6. 在 `assets/styles/INDEX.md` 登记一行。
