---
name: ky-video
description: >
  口播视频 AI 制作流水线：把用户拍的口播原片，用代码（Remotion + ffmpeg + whisper）
  做成带动画、字幕、音效、开头钩子、多平台封面和发布包的成片。风格以“风格包”形式可替换
  （当前：magazine 极简杂志风）。触发：/ky-video、「做视频」「剪口播」「口播加动画」
  「出封面」「导出 4K」「发布包」「新风格」。Talking-head video pipeline with swappable style packs.
---

<!-- ky-video · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · 抖音/视频号/小红书：知羿Kiren · YouTube：Kiren Yi · Terms: see ky-skills LICENSE · KYVIDEO-SKILL-2611 -->

# ky-video

用户负责：选题、拍摄、挑选、拍板。AI 负责：稿子、动画、精剪、字幕、音效、封面、导出。
**开工前先读 `references/retrospective.md`**（踩过的坑 + 用户偏好），这是这个 Skill 存在的理由。

## 结构

- `scripts/`：通用引擎，每期不改。`prep → build → cut → render → check → publish`
- `assets/template/`：Remotion 项目骨架（`src/engine/` 通用，`src/video/` 每期内容）
- `assets/styles/<name>/`：风格包（配色、组件、字幕、版式、封面模板），目录见 `assets/styles/INDEX.md`
- `assets/examples/taste/`：作者已公开发布的第 1 期《品味》的完整项目，写新一期时照着抄

## 流程（每步做完再进下一步）

1. **选题与稿子**：先聊清楚必须回答的问题，再出口播稿 + 分镜表（每句标 A–E 版式）。可配合 `ky-write`。
2. **选风格**：读 `assets/styles/INDEX.md` 推荐 1–2 个；用户想要新风格 → 按 `references/style-contract.md` 新建（先 3 张样图，选定后做 10 秒样片）。
3. **拍摄前**：把 `references/shooting-checklist.md` 发给用户；先要 10 秒测试样片，确认比例、帧率、背景。
4. **建项目**：`python3 scripts/new_project.py <目录> --style <风格> --source <原片> --title <标题>`。第一次提示 `FONTS_MISSING` 时，告诉用户要下载两款开源字体（约 40 MB），征得同意后运行 `python3 scripts/fetch_fonts.py`（和 ky-brand 共用 `~/.config/ky-skills/fonts/`）。
5. **预处理**：`python3 scripts/prep.py <项目>` → 固定 30 帧中间文件 + whisper 转写 + `work/transcript.md`；在 project.json 填 `face`（人脸在 1920×1080 中的位置）。
6. **写剪辑表**：读 transcript.md，按“同一句保留最后一遍”写 `edl.json`（格式见 `references/project-files.md`）。开头钩子 = 复制全片最反常识/最有冲突的一句放最前。
7. **精剪**：`build.py` → `cut.py`。
8. **挂动画**：写 `src/video/scenes.tsx`（哪段放什么动画、音效挂在哪个关键词上、钩子文案 3 版），专属动画写进 `custom.tsx`。动画用 `kw('关键词')` 定时，**必须和人声同时出现，不能提前**。
9. **质检**：`python3 scripts/check.py <项目>`（口型偏差 ≤1 帧 + 成片逐字比对，修掉漏字/残留词），再 `render.py` 出 1080p 预览，抽帧看一遍有没有挡脸、重叠。
10. **给用户看**：直接给完整版，不给粗剪。钩子用 `render.py --hooks` 出 3 版让用户挑。按反馈改 → 重跑 7–9。
11. **封面与标题**：同一风格出 3 款，**只抛问题不给答案**；用户选定后写进 `src/video/covers.tsx`，标题简介写 `标题和简介.md`（简介里可以点题，并带“AI 制作 / 合作咨询”）。
12. **导出发布**：`render.py --4k` → `publish.py` → `out/发布包-<标题>/`，告诉用户只从这个文件夹上传。

## 硬规则

- 永远从中间文件按帧剪，绝不按时间戳直接剪原片（VFR 会让口型错位）。
- 切点以声音能量为准，whisper 时间只用于字幕和关键词定位。
- 动画不能挡脸：全屏动画时人像缩到画中画并在动画上层。
- 文字一律在 Remotion 里做（本机 ffmpeg 没有 drawtext）。
- 平台尺寸见 `references/platforms.md`；抖音横封面是 4:3，不是 16:9。
- BGM：第 1 期未使用，代码合成效果差。下一期要专门测试（真实曲库 + 说话时自动压低）。
- 不覆盖已有项目目录；原片只读。

## 参考

- `references/retrospective.md`：复盘手册（坑、做对的、用户偏好）
- `references/project-files.md`：project.json / edl.json / scenes.tsx 写法
- `references/style-contract.md`：风格包必须提供的零件 + 新建风格流程
- `references/platforms.md`：各平台封面尺寸与上传要点
- `references/shooting-checklist.md`：发给用户的拍摄清单
- 环境：ffmpeg、Node 18+、Python 3.9+（带 numpy）、openai-whisper（large-v3-turbo）；字体第一次使用时下载（magazine：Noto Serif SC / Noto Sans SC，OFL），不依赖系统字体

## 版权 / Copyright

ky-video 的流程、剪辑脚本、项目模板和 magazine 风格包（组件、版式、封面模板）由 Kiren Yi 原创，版权所有。使用条件同 ky-skills 仓库根目录的 `LICENSE`。再分发须取得书面授权，并保留 SKILL.md 开头的版权注释，以及每个脚本、风格包文件第一行的版权标识（`KYVIDEO-*-2611`）。

用这个 Skill 做出来的视频、封面和文案归用户所有，可以自由发布和营利。

**第三方（不属于本 Skill，使用时各自遵守其许可）**
- Remotion：有自己的许可证。个人和 3 人以下的公司免费；超过规模需要购买公司授权。替客户接单前要先确认。
- ffmpeg（LGPL/GPL）、openai-whisper（MIT）、React（MIT）：只作为本机工具调用，不随 Skill 分发。
- 字体：magazine 使用 Noto Serif SC / Noto Sans SC（SIL Open Font License 1.1，许可证在 `assets/styles/magazine/fonts/OFL.txt`）。字体文件不随 Skill 附带，由 `scripts/fetch_fonts.py` 从 Google Fonts 官方仓库下载。
- 音效：全部由 `scripts/sfx.py` 用代码合成，没有第三方素材。BGM 若用曲库，需记录曲目来源和授权。
- `assets/examples/taste/` 是作者已公开发布的视频项目，只作为写法示例，版权归作者所有。

商用授权 / Commercial licensing：kirenyi16@gmail.com · kirenyi.com
