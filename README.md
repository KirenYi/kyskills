# ky-skills

Kiren Yi（KY）的个人 Agent Skill 集合。  
每个 skill 只做一件事：短命令、说明核心能力、可在 Claude Code / Codex / Grok 等多端安装。

## Skills

| 命令 | 核心能力 |
|------|----------|
| [`/ky-x`](./skills/ky-x/) | 归档 X 公开帖到本地 |
| [`/ky-dy`](./skills/ky-dy/) | 下载抖音公开视频 |
| [`/ky-xhs`](./skills/ky-xhs/) | 抓取小红书公开笔记 |
| [`/ky-sph`](./skills/ky-sph/) | 整理视频号 / 公众号原料入库 |
| [`/ky-xdraft`](./skills/ky-xdraft/) | 把 Markdown 做成 X 长文草稿流程 |
| [`/ky-mphtml`](./skills/ky-mphtml/) | Markdown 排成公众号可粘贴 HTML |
| [`/ky-codex-switch`](./skills/ky-codex-switch/) | Codex 一键切模型（弹窗填 Key + 图文教程） |
| [`/ky-think`](./skills/ky-think/) | 解决、理解或审查一个复杂问题（预览） |
| [`/ky-learn`](./skills/ky-learn/) | 持续学习、掌握检验与紧凑沉淀（预览） |
| [`/ky-council`](./skills/ky-council/) | 多顾问决策、风险检查与结果复盘（预览） |

以上能力均为 **KY 自维护的 skill 说明与脚本**（见 `skills/`）。  
使用前请阅读各 skill 目录下的 `README.md` / `SKILL.md`。

## 安装

把下面这句话发给你的 Agent：

```text
帮我安装这里的 Skills：https://github.com/KirenYi/ky-skills
```

或在终端：

```bash
curl -fsSL https://github.com/KirenYi/ky-skills/raw/main/install.sh | bash
```

Windows 也可先 `git clone` 再执行：

```bash
./scripts/install-links.sh
```

安装完成后**重启 Agent**，再使用上表命令。

## 使用说明（总览）

1. **先装集合**，确认本机已链到 `~/.agents/skills`（或 Claude / Codex / Grok 对应目录）。  
2. **按需装运行时**：带脚本的 skill 会在各自 README 写清 Python 依赖。  
3. **一次只做一件事**：例如先 `/ky-dy` 下视频，再自己转写或蒸馏。  
4. **不要提交密钥与个人数据**：cookies、归档库、临时文件只放本机。

### 各 skill 要点

| Skill | 你要准备什么 | 得到什么 |
|-------|--------------|----------|
| ky-x | 博主 handle | `~/.ky-x/` 下 Markdown / JSONL |
| ky-dy | 抖音视频链接；Python + Playwright | 本地 MP4 + 元数据 JSON |
| ky-xhs | 小红书笔记链接；Python + requests | 本地笔记包（文案/图/视频） |
| ky-sph | 你已保存的视频号/公众号素材路径或文案 | 统一入库说明与后续步骤 |
| ky-xdraft | 本地 Markdown；Chrome 已登录 X | 按流程创建 X 长文**草稿**（默认不发布） |
| ky-mphtml | Markdown 正文或文件 | 可复制进公众号后台的 HTML |
| ky-codex-switch | SuperGrok 登录；可选 OpenRouter Key | 桌面一键切 Grok/Claude/DeepSeek/OpenAI… |
| ky-think | 一个复杂问题、观点或计划 | 结论、最小模型、反例与验证动作 |
| ky-learn | 学习领域或目标 | 本地学习状态、掌握地图与下一次接入点 |
| ky-council | 重要选择、约束与已有证据 | 多视角判断、最小下一步与复盘记录 |

更细的步骤、参数与限制见各 skill 内文档，**以 `skills/<name>/SKILL.md` 为准**。

## 环境

- 系统：macOS / Linux / Windows  
- Python 3.10+（`ky-x`、`ky-dy`、`ky-xhs` 等需要）  
- 支持 Skills 的 Agent 工具  

## 限制与合规

- 仅处理你有权访问的**公开或自有**内容；遵守各平台条款与当地法律。  
- 抓取类能力受平台策略影响，失败属正常，skill 会说明降级办法（如粘贴文案）。  
- 本仓库**不捆绑、不转售、不冒充**任何第三方产品或官方工具。  
- 用户运行时数据（如 `~/.ky-x/`、`~/.ky-learn/`、`~/.ky-council/`、临时 cookies）默认在本机，**不要提交到 Git**。
- 标记为“预览”的 Skill 已通过结构与静态协议检查，但仍在积累真实使用验证；不要把预览状态理解为成熟效果承诺。

## 开发与贡献

见 [`AGENTS.md`](./AGENTS.md)、[`CONTRIBUTING.md`](./CONTRIBUTING.md)。  
真源始终在本仓库 `skills/`，多端只做软链。

## License

[MIT](./LICENSE)
