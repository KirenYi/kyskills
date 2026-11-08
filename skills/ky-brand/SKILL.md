---
name: ky-brand
description: >
  个人视觉风格系统：用统一的风格直接生成公众号封面、小红书封面、金句卡、课程海报、视频封面和 PPT
  （PDF + 逐页 PNG），署名用你自己的名字。默认主题 magazine（米白 + 黑 + 红，和 ky-video 同款），
  备选 study、warm。触发：/ky-brand、「用我的风格」「做封面」「公众号封面」「小红书封面」「金句卡」
  「课程海报」「做 PPT」「做幻灯片」。A personal brand design system for covers, quote cards, posters and slide decks.
---

<!-- ky-brand · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · 抖音/视频号/小红书：知羿Kiren · YouTube：Kiren Yi · Terms: see ky-skills LICENSE · KYBRAND-SKILL-2611 -->

# ky-brand

一套风格，用在所有物料上：文章、课程、PPT、视频封面，让人一眼认出是你。
不出镜、只写文章的时候，也能直接出图。

## 第一次使用

渲染脚本遇到下面两种情况会停下，按提示处理一次即可，以后不再问：

- **`SIGNATURE_NOT_SET`**：问用户想在图上署什么名字，要不要带网址，也可以不署名。然后运行 `python3 scripts/render.py --set-signature "名字" --site 网址`（不署名就写 `""`）。
- **`FONTS_MISSING`**：告诉用户需要下载两款开源字体（思源宋体、思源黑体，约 40 MB，可商用），征得同意后运行 `python3 scripts/fetch_fonts.py`。字体存在 `~/.config/ky-skills/fonts/`，ky-video 也共用。

## 怎么用

1. **定内容**：先读 `references/brand-guide.md`，按里面的文案规则写标题（短、有反差、封面不剧透）。
2. **写 spec**：照 `assets/example.json` 写一份 JSON，列出要出的物料。
3. **渲染**：`python3 scripts/render.py <spec.json> [--out <目录>] [--theme magazine|study|warm]`
4. **自检**：逐张看图，检查有没有溢出、换行难看、标题压到照片的脸；再缩小到手机缩略图大小确认字能看清。然后给用户看。
5. **交付**：文件名自动按 `项目简称_用途_版本_比例_日期` 命名。属于某个内容项目的，放进该项目的 `assets/cover` 或 `assets/exports`。

不指定主题时一律用 **magazine**。用户说"换成书房 / 暖光"时再换主题。

## 物料类型（`type`）

| type | 尺寸 | 用途 |
|---|---|---|
| `wechat-cover` | 2350×1000（2.35:1） | 公众号主封面 |
| `wechat-square` | 1080×1080 | 公众号方封面、X / 朋友圈方图 |
| `xhs` | 1080×1440（3:4） | 小红书封面、视频号 / 抖音竖封面 |
| `quote` | 1080×1080 | 金句卡 |
| `poster` | 1080×1440（深色） | 课程、活动海报 |
| `video-cover` | 1920×1080 | B 站 / YouTube 封面（口播视频封面优先用 ky-video） |
| `slides` | 1920×1080，多页 | PPT：输出 PDF + 每页 PNG。版式有 cover、section、list、bullets、statement、end |

文字写法：`[词]` = 红色强调，`{？？}` = 红底白字方框（制造悬念），`\n` = 换行。
可选字段：`kicker`（顶部小标签）、`sub`（副标题）、`num`（大号编号）、`photo` + `focus`（加本人照片，人像放在右侧或底部）、`size`（标题字号）、`site`（署名是否带网址；`wechat-cover`、`wechat-square`、`xhs` 默认 `false` 防引流，其余默认 `true`，可写在单个物料或 spec 顶层）。

## 和其他 Skill 的关系

- `ky-video`：视频的 magazine 风格包和本 Skill 的 magazine 主题是同一套配色和字体。改主题色时两边要同步。
- `ky-typeset`：管文章正文排版（HTML）。本 Skill 管图片物料。

## 版权 / Copyright

ky-brand 的视觉风格（三套主题的配色、版式、组件）和渲染脚本由 Kiren Yi 原创，版权所有。使用条件同 ky-skills 仓库根目录的 `LICENSE`。再分发须取得书面授权，并保留本文件开头的版权注释和脚本头部的版权标识（`KYBRAND-*-2611`）。

用这个 Skill 生成的封面、海报、PPT 归使用者所有，可以自由发布和营利。

**第三方**
- 字体：Noto Serif SC / Noto Sans SC，SIL Open Font License 1.1。不随 Skill 附带，由 `scripts/fetch_fonts.py` 从 Google Fonts 官方仓库下载，许可证一并保存为 `~/.config/ky-skills/fonts/OFL.txt`。
- Google Chrome / Chromium：只作为本机渲染工具调用，不随 Skill 分发。

商用授权 / Commercial licensing：kirenyi16@gmail.com · kirenyi.com
