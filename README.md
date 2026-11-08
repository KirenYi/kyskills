<div align="center">

**简体中文** | [English](./README.en.md) | [日本語](./README.ja.md) | [Español](./README.es.md) | [한국어](./README.ko.md)

# kyskills

**知羿 | Kiren Yi 的技能集合：想得更清楚，学得更快，把想法变成内容。**

每个技能一个 `SKILL.md`，可以在 Claude Code、Codex、Gemini CLI、Cursor、GitHub Copilot、OpenCode、Kiro 等支持技能（Skills）的 AI 工具里使用。

</div>

## Skills

命令在所有语言里都一样。你用什么语言说，Skill 就用什么语言回答。

### 思考与学习

| 命令 | 帮你做什么 |
|---|---|
| [`/ky-think`](./skills/ky-think/) | 把一个难题想清楚：直接给判断、带你真正搞懂，或者审查你自己的观点。 |
| [`/ky-mirror`](./skills/ky-mirror/) | 发现你的请求其实是在绕开一个更难面对的问题，说出被回避的是什么，给一个直接朝向它的小行动。 |
| [`/ky-learn`](./skills/ky-learn/) | AI 导师：先给你画出领域地图，先问再讲，检验你是不是真懂了，下次从上次停下的地方接着学。 |
| [`/ky-council`](./skills/ky-council/) | 重要决策时请两三位思想家的视角一起分析，记下决策，之后对照结果复盘。 |

### 写作与发布

| 命令 | 帮你做什么 |
|---|---|
| [`/ky-write`](./skills/ky-write/) | 写作和润色中文观点文章、口播稿：去掉 AI 腔，检查论证，可出英文字幕。 |
| [`/ky-typeset`](./skills/ky-typeset/) | 把 Markdown 排成带样式的网页，复制后能直接粘贴进公众号、Substack、Medium、邮件等编辑器。19 套样式。 |
| [`/ky-xdraft`](./skills/ky-xdraft/) | 把本地 Markdown 做成 X（推特）长文草稿，默认不发布。 |

### 视觉与视频

| 命令 | 帮你做什么 |
|---|---|
| [`/ky-brand`](./skills/ky-brand/) | 用统一的风格做封面、金句卡、海报和 PPT，署你自己的名字。 |
| [`/ky-video`](./skills/ky-video/) | 用代码把口播原片做成成片：动画、字幕、音效、开头钩子、封面和发布包。 |

### 素材采集

| 命令 | 帮你做什么 |
|---|---|
| [`/ky-x`](./skills/ky-x/) | 把 X 上的公开帖子存到本地（Markdown + JSONL）。 |
| [`/ky-dy`](./skills/ky-dy/) | 下载抖音公开视频和元数据。 |
| [`/ky-xhs`](./skills/ky-xhs/) | 抓取小红书公开笔记：文字、图片、视频。 |
| [`/ky-sph`](./skills/ky-sph/) | 把视频号、公众号的素材整理进你的素材库。 |

## 安装

把下面这句话发给你的 Agent：

```text
帮我安装这里的 Skills：https://github.com/KirenYi/kyskills
```

或者在终端运行（macOS / Linux）：

```bash
curl -fsSL https://github.com/KirenYi/kyskills/raw/main/install.sh | bash
```

Windows：先 `git clone` 本仓库，再在 Git Bash 或 WSL 里运行 `./scripts/install-links.sh`。

安装后重启你的 Agent。

## 支持的工具

安装脚本会把每个 Skill 链接到你电脑上已安装的下列工具。更新仓库，所有工具同时更新。

| 工具 | Skill 目录 |
|---|---|
| 通用标准（Codex、Gemini CLI、GitHub Copilot、Cursor、OpenCode、Goose、Amp 等） | `~/.agents/skills` |
| Claude Code | `~/.claude/skills` |
| Codex | `~/.codex/skills` |
| Gemini CLI | `~/.gemini/skills` |
| GitHub Copilot | `~/.copilot/skills` |
| Cursor | `~/.cursor/skills` |
| OpenCode | `~/.config/opencode/skills` |
| Kiro | `~/.kiro/skills` |
| Windsurf | `~/.codeium/windsurf/skills` |
| Trae / Trae 国内版 | `~/.trae/skills`、`~/.trae-cn/skills` |
| Qwen Code | `~/.qwen/skills` |
| Kimi | `~/.kimi/skills` |
| Grok | `~/.grok/skills` |
| Goose | `~/.config/goose/skills` |
| Augment、Continue、OpenHands、CodeBuddy、通义灵码、iFlow、OpenClaw | 各工具自己的 `skills` 目录 |

## 第一次使用

有几个 Skill 会问你一次，之后记在 `~/.config/ky-skills/`：

- **ky-learn、ky-council**：学习进度和决策记录存在哪个文件夹。任何文件夹都行，也可以是你已有的 Obsidian 库。
- **ky-brand**：图上署什么名字和网址，也可以不署名。
- **ky-brand、ky-video**：是否同意下载两款开源字体（思源宋体、思源黑体，约 40 MB）。

## 环境

- macOS、Linux 或 Windows
- 带脚本的 Skill 需要 Python 3.10+
- ky-video 还需要 ffmpeg、Node 18+ 和 openai-whisper；ky-brand 需要 Google Chrome 或 Chromium

## 建议与问题

请提 [Issue](https://github.com/KirenYi/kyskills/issues)。想法、问题、真实使用的反馈都欢迎，好的建议会做进下一个版本。

## 合规使用

- 只处理公开的或属于你自己的内容，遵守各平台条款和当地法律。
- 采集类 Skill 受平台策略影响，可能失效；每个 Skill 都写了替代办法。
- 你的数据（归档、cookies、笔记）只留在你自己的电脑上，不要提交到 Git。

## 版权与使用条款

© 2026 Kiren Yi，保留所有权利。

- **你可以**：免费安装使用；用 Skill 做出的内容归你，可以用于收费或带广告的作品；在自己电脑上修改，自己使用。
- **未经书面授权不可以**：转载传播、公开发布修改版、出售、打包进其他产品或课程、用于训练 AI 模型。

完整条款见 [LICENSE](./LICENSE)（以中文版为准）。商用授权：kirenyi16@gmail.com

## 关于作者

**Kiren Yi（知羿Kiren）**

- 网站：[kirenyi.com](https://kirenyi.com)
- 抖音 · 视频号 · 小红书：**知羿Kiren**
- YouTube：**Kiren Yi**
- 邮箱：kirenyi16@gmail.com
