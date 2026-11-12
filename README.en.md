<div align="center">

[简体中文](./README.md) | **English** | [日本語](./README.ja.md) | [Español](./README.es.md) | [한국어](./README.ko.md)

# kyskills

**Agent Skills by Kiren Yi: think clearly, learn faster, and turn ideas into content.**

One `SKILL.md` per skill. Works in Claude Code, Codex, Gemini CLI, Cursor, GitHub Copilot, OpenCode, Kiro and other tools that support Agent Skills.

</div>

## Skills

Commands are the same in every language. Each skill replies in the language you write in.

### Think and learn

| Command | What it does for you |
|---|---|
| [`/ky`](./skills/ky/) | Use it when something feels off but you can't say what: it listens, makes one guess about what kind of problem it is, and hands you to the right skill. You don't need to know the other skills first. |
| [`/ky-think`](./skills/ky-think/) | Think a hard problem through: get a clear judgment, truly understand something, or stress-test your own view. |
| [`/ky-mirror`](./skills/ky-mirror/) | Notice when a request is really a way around a harder problem, name what is being avoided, and take one small step toward it. |
| [`/ky-learn`](./skills/ky-learn/) | An AI tutor that maps a field for you, asks before it explains, checks what you really understood, and picks up where you left off. |
| [`/ky-council`](./skills/ky-council/) | Bring two or three thinkers' perspectives to an important decision, keep a decision record, and review the outcome later. |

### Write and publish

| Command | What it does for you |
|---|---|
| [`/ky-write`](./skills/ky-write/) | Write and edit opinion articles and talking-head scripts (Chinese): cut AI-sounding filler, check the argument, add English subtitles. |
| [`/ky-typeset`](./skills/ky-typeset/) | Typeset Markdown into styled HTML you can paste into WeChat, Substack, Medium, email and other editors. 19 styles. |
| [`/ky-xdraft`](./skills/ky-xdraft/) | Turn a local Markdown file into an X (Twitter) long-post draft. Never publishes by default. |

### Visuals and video

| Command | What it does for you |
|---|---|
| [`/ky-brand`](./skills/ky-brand/) | Covers, quote cards, posters and slide decks in one consistent style, signed with your own name. |
| [`/ky-video`](./skills/ky-video/) | Turn talking-head footage into a finished video with code: animation, subtitles, sound effects, opening hooks, covers and a publish pack. |

### Collect material

| Command | What it does for you |
|---|---|
| [`/ky-x`](./skills/ky-x/) | Archive public X posts to your computer (Markdown + JSONL). |
| [`/ky-dy`](./skills/ky-dy/) | Download public Douyin videos with their metadata. |
| [`/ky-xhs`](./skills/ky-xhs/) | Fetch public Xiaohongshu (RED) notes: text, images, video. |
| [`/ky-sph`](./skills/ky-sph/) | Organize WeChat Channels and Official Account material into your library. |

## Install

Send this to your agent:

```text
Install the skills from https://github.com/KirenYi/kyskills
```

Or run in a terminal (macOS / Linux):

```bash
curl -fsSL https://github.com/KirenYi/kyskills/raw/main/install.sh | bash
```

On Windows, `git clone` the repository and run `./scripts/install-links.sh` (Git Bash or WSL).

Restart your agent after installing.

## Supported tools

The installer links every skill into each tool below that is installed on your computer. Updating the repository updates every tool at once.

| Tool | Skills folder |
|---|---|
| Shared standard (Codex, Gemini CLI, GitHub Copilot, Cursor, OpenCode, Goose, Amp and others) | `~/.agents/skills` |
| Claude Code | `~/.claude/skills` |
| Codex | `~/.codex/skills` |
| Gemini CLI | `~/.gemini/skills` |
| GitHub Copilot | `~/.copilot/skills` |
| Cursor | `~/.cursor/skills` |
| OpenCode | `~/.config/opencode/skills` |
| Kiro | `~/.kiro/skills` |
| Windsurf | `~/.codeium/windsurf/skills` |
| Trae / Trae CN | `~/.trae/skills`, `~/.trae-cn/skills` |
| Qwen Code | `~/.qwen/skills` |
| Kimi | `~/.kimi/skills` |
| Grok | `~/.grok/skills` |
| Goose | `~/.config/goose/skills` |
| Augment, Continue, OpenHands, CodeBuddy, Lingma, iFlow, OpenClaw | each tool's `skills` folder |

## First use

Some skills ask you once, then remember your answer in `~/.config/kyskills/`:

- **ky-learn, ky-council**: where to save your learning progress and decision records. Any folder works, including an existing Obsidian vault.
- **ky-brand**: which name and website to sign your images with (or none).
- **ky-brand, ky-video**: permission to download two open-source fonts (Noto Serif SC, Noto Sans SC, about 40 MB).

## Requirements

- macOS, Linux or Windows
- Python 3.10+ for skills with scripts
- ky-video also needs ffmpeg, Node 18+ and openai-whisper; ky-brand needs Google Chrome or Chromium

## Suggestions and bugs

Open an [issue](https://github.com/KirenYi/kyskills/issues). Ideas, problems and real-use feedback are all welcome; good suggestions get built into the next version.

## Responsible use

- Only process content that is public or yours, and follow each platform's terms and your local laws.
- Collection skills depend on platform policies and may stop working; each skill explains a fallback.
- Your data (archives, cookies, notes) stays on your computer. Don't commit it to Git.

## License

© 2026 Kiren Yi. All rights reserved.

- **You may**: install and use the skills for free; what you create with them is yours, including for paid or ad-supported work; modify them on your own computer for your own use.
- **You may not, without written permission**: redistribute them, publish modified versions, sell them, bundle them into other products or courses, or use them to train AI models.

Full terms: [LICENSE](./LICENSE) (the Chinese version prevails). Commercial licensing: kirenyi16@gmail.com

## About the author

**Kiren Yi (知羿Kiren)**

- Website: [kirenyi.com](https://kirenyi.com)
- YouTube: **Kiren Yi**
- Douyin · WeChat Channels · Xiaohongshu: **知羿Kiren**
- Email: kirenyi16@gmail.com
