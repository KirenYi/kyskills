# PROGRESS — 跨 Agent 进度板

> **每个 Agent（Claude Code / Codex / Grok / 其他）在本仓库做完一轮有意义的改动后，必须在本文件顶部追加一条记录。**  
> 这样下一个工具打开仓库时能立刻对齐状态，而不是只靠聊天上下文。

格式固定：

```markdown

## YYYY-MM-DD HH:MM TZ — <工具名> — <一句话标题>

- **操作者**：Grok / Claude Code / Codex / Human / …
- **目标**：…
- **已完成**：
  - …
- **改动路径**：
  - `path/to/file`
- **验证**：
  - …
- **未完成 / 下一步**：
  - …
- **风险或注意**：
  - …
```

---

## 2026-11-11 — Claude Code — 设置目录统一为 ~/.config/kyskills/

- **目标**：修复改名后代码和文档不一致。2026-11-08 改名时脚本里的设置目录被改成 `~/.config/kyskills/`，文档和说明仍写 `~/.config/ky-skills/`，导致已有设置读不到。
- **已完成**：按 Kiren 决定统一用 `kyskills`。所有 README（五种语言）、`AGENTS.md`、`THIRD_PARTY_NOTICES.md`、`ky-brand` / `ky-video` 的 `SKILL.md` 和脚本注释改为 `~/.config/kyskills/`；脚本逻辑未变。
- **验证**：`ky-learn`、`ky-council` 的 `notes_root.py` 返回已设置的笔记库（退出码 0）；`ky-brand` 的 `render.py assets/example.json` 正常出图。`ky-video` 未重新渲染。
- **风险或注意**：2026-11-08 当天在旧目录 `~/.config/ky-skills/` 存过设置的用户，需要把该文件夹改名为 `kyskills`，或重新设置一次。`~/.ky-skills/` 安装目录没有改。

## 2026-11-08 — Claude Code — 仓库改名 kyskills；中文首页优先

- GitHub 仓库 `KirenYi/ky-skills` 改名为 `KirenYi/kyskills`（旧网址自动跳转），所有链接、标题、版权注释里的仓库名同步改为 `kyskills`；命令仍是 `ky-*`。
- 本机路径不改：`~/.config/ky-skills/`（用户设置、字体）、`~/.ky-skills/`（一键安装目录），改了会断开已有设置。
- README 顺序改为中文优先：`README.md` 是简体中文，英文移到 `README.en.md`；语言切换顺序为 简体中文 | English | 日本語 | Español | 한국어。

## 2026-11-08 — Claude Code — 发布 6 个新 Skill；多语言 README；适配更多 AI 工具

- **新增 Skill**：`ky-think`、`ky-mirror`、`ky-learn`、`ky-council`、`ky-brand`、`ky-video`（从 Kiren 的私有 Skill 工厂迁入，去掉了验证记录和个人内容）。`ky-card` 未发布：方法改编自第三方提示词，待作者许可或重写。
- **存储**：`ky-learn`、`ky-council` 不再依赖作者本机的知识库结构，改用 `scripts/notes_root.py`，第一次使用时问用户存在哪；设置存在 `~/.config/ky-skills/config.json`。
- **ky-brand / ky-video**：署名改为用户设置（`render.py --set-signature`），字体不再随仓库分发，第一次使用时征得同意后用 `scripts/fetch_fonts.py` 下载到 `~/.config/ky-skills/fonts/`；样图换成占位署名；`ky-video` 保留作者已公开发布的《品味》作为示例。
- **README**：英文、简体中文、日语、西班牙语、韩语五个版本，顶部可切换；按用途分四组；新增支持工具表。
- **安装**：`install-links.sh` 新增 Gemini CLI、GitHub Copilot、OpenCode、Kiro、Kimi、OpenClaw 的目录（路径经官方文档或公开资料核对）。
- **反馈**：`CONTRIBUTING.md` 改为只收 Issue、不收 PR（与 LICENSE 一致），新增 Issue 模板。
- **注意**：`~/.ky-skills/` 是一键安装的仓库目录，更新时会被替换，用户设置和字体不能放在那里。

## 2026-11-05 — Claude Code — 移除 ky-codex-switch

- **原因**：用户改用 CC Switch 切换 Codex 模型，这个 Skill 不再需要。
- **已完成**：删除 `skills/ky-codex-switch/`，README、AGENTS 去掉对应条目；本机桌面和 ~/Applications 的「Codex 切换模型」图标、~/.codex/bin 下的切换脚本、各宿主软链接已移除（文件移到废纸篓，可恢复）。
- **未改动**：~/.codex/config.toml 里切换器写过的 provider 段落未动，当前由 CC Switch 管理。


## 2026-11-04 PST — Claude Code — 许可证改为保留所有权利；ky-mphtml 更名 ky-typeset；ky-write 去除来源原话

- **操作者**：Claude Code
- **目标**：用户要求别人只能使用，不能传播、不能改了再发布、不能商用；Skill 要面向全球；所有 Skill 加上作者署名，帮作者引流
- **已完成**：
  - `LICENSE`：MIT 改为「保留所有权利 + 有限使用许可」（中文为准，附英文译本）。用 Skill 产出的内容归使用者，可以营利；禁止传播、公开修改版、拿 Skill 本身商用、删除署名、用于 AI 训练。2026-11-04 前的版本仍按 MIT
  - 填入联系方式：邮箱 kirenyi16@gmail.com、kirenyi.com、抖音/视频号/小红书「知羿Kiren」、YouTube「Kiren Yi」；README 增加「关于作者」
  - 所有 `SKILL.md` 的 frontmatter 下面加版权与账号注释（`KY*-SKILL-2611`）；ky-dy、ky-xhs 脚本头和 ky-codex-switch README 的 MIT 字样已替换
  - `ky-mphtml` 更名为 `ky-typeset`（0.4.0）：不再只针对公众号，说明中英双语，样式加英文名，指纹改为 `KYTS-`，旧命令仍可触发；完成回复末尾附作者署名，生成的文章正文不加署名
  - 删除所有宿主中的 `ky-mphtml` 旧软链，用 `install-links.sh ky-typeset` 重新链接
  - `ky-write` 0.3.1：`fei-gongshi.md` 改用 KY 自己文章中的观点作例子，三个层次改名为「只转述 / 带判断 / 换框架」，加致谢（思路来自 dontbesilent 2026-03-31 的 X 帖）
  - `THIRD_PARTY_NOTICES.md` 补充更名记录和致谢
  - 新增 `scripts/find-copies.py`：从仓库收集 22 个版权标识，在 GitHub 代码搜索中逐个查找，并排除本仓库
- **改动路径**：
  - `LICENSE`、`README.md`、`THIRD_PARTY_NOTICES.md`、`AGENTS.md`、`docs/FONT_LICENSE.md`
  - `skills/ky-typeset/*`（由 `skills/ky-mphtml/` 改名而来）、`skills/ky-write/fei-gongshi.md`、`skills/ky-write/SKILL.md`、`skills/ky-write/VERSION`、`skills/ky-write/references/changelog.md`
  - 所有 `skills/*/SKILL.md`（头部注释）、`skills/ky-dy/scripts/download.py`、`skills/ky-xhs/scripts/fetch.py`、`skills/ky-codex-switch/README.md`
- **验证**：
  - 两个脚本都通过 `py_compile`；Claude Code 已识别 `ky-typeset`
- **未完成 / 下一步**：
  - 定期运行 `python3 scripts/find-copies.py --save`，查看有没有别人复制本仓库
- **风险或注意**：
  - 已经用 MIT 发出去的旧版本，别人得到的权利收不回来

---

## 2026-11-04 PST — Claude Code — ky-mphtml 净室重写，移除改编自 dbskill 的样式

- **操作者**：Claude Code
- **目标**：尊重原作者版权。最早 8 套样式改编自 dbskill（当时为 CC BY-NC 4.0），既没有署名，又被放进了 MIT 仓库，所以改为用 KY 自己的方法重做
- **已完成**：
  - 删除 clean、essay、docs、pulse、ledger、lecture、memo、stage 8 套；按 KY 视觉风格指南从零设计 paper、window、steps、desk、margin、notebook、kraft、poster 8 套，重写时未参照 dbskill 文件
  - 保留 KY 原创的 ink、cream、swiss、night、fresh 5 套
  - 用新结构重写 `SKILL.md`；加入版权标识 `KYMP-*` 和 HTML `generator` 标记
  - `THIRD_PARTY_NOTICES.md` 写明 0.1.0–0.2.1 版本里含 CC BY-NC 内容
  - VERSION 0.2.1 → 0.3.0，同步 changelog 和 README
- **改动路径**：
  - `skills/ky-mphtml/SKILL.md`、`templates/styles.md`、`README.md`、`VERSION`、`references/changelog.md`
  - `THIRD_PARTY_NOTICES.md`
- **验证**：
  - 和 dbs-wechat-html 对比：新样式色值重合 0，声明重合 13–20 条，与 KY 原创样式的基线（15–26）相当，剩下的都是通用 CSS；SKILL.md 只有 2 行 HTML 模板行相同
  - 13 套样式都用示例文章渲染过
- **未完成 / 下一步**：
  - 仓库许可证从 MIT 改为什么，等用户决定
  - 未提交、未推送，等用户确认
  - ky-write 的 `fei-gongshi.md` 改写自一篇文章的方法论，出处待用户补充
- **风险或注意**：
  - 样式 id 全部换了。用户习惯说的「clean / essay」等不再存在，`SKILL.md` 里的挑选表已按新 id 写好

---

## 2026-11-04 PST — Claude Code — ky-write 加入非共识写法

- **操作者**：Claude Code
- **目标**：把一篇讲「正确的非共识」的文章方法论放进 ky-write，又不让每篇稿子都被往反常识方向改
- **已完成**：
  - 新增 `fei-gongshi.md`：刻板印象 = 简化因果、四步法、告知/认知/植入三层、替换而非消灭、商业模式匹配
  - `SKILL.md`：作者明确要求时读取该文件；润色/写作辅助时只在合适时提一条「可选」建议，不主动改
  - 观点文章检查清单新增第 10、11 条（反对时给替代、转述时加判断），每篇都检查
  - VERSION 0.2.0 → 0.3.0，同步 changelog 和 skill README
- **改动路径**：
  - `skills/ky-write/fei-gongshi.md`（新增）、`skills/ky-write/SKILL.md`、`skills/ky-write/README.md`、`skills/ky-write/VERSION`、`skills/ky-write/references/changelog.md`
- **验证**：
  - 纯文档 skill，无脚本；`~/.claude/skills/ky-write` 软链指向真源，改动即时生效
- **未完成 / 下一步**：
  - 用户之后补充「刻板印象选题库」，可考虑放在用户本地数据而不是仓库
- **风险或注意**：
  - 「可选」建议的触发频率需要实际用几篇后再调

---

## 2026-11-02 18:40 PDT — Claude Code — 删除 ky-wechat-dual

- **操作者**：Claude Code
- **目标**：用户不再需要 Windows 微信双开 skill
- **已完成**：
  - 删除 `skills/ky-wechat-dual/`，README 两张表和 AGENTS 已发布列表同步移除
  - 本机删除各宿主下的 `ky-wechat-dual` 软链
- **改动路径**：
  - `skills/ky-wechat-dual/`（删除）、`README.md`、`AGENTS.md`、`docs/PROGRESS.md`
- **验证**：
  - `git grep wechat-dual` 只剩 PROGRESS 历史记录
- **未完成 / 下一步**：
  - 无
- **风险或注意**：
  - 其他机器上装过的旧软链会变成坏链接，需手动删除；代码仍在 git 历史里，可找回

---

## 2026-11-02 18:30 PDT — Claude Code — README 分组、安装提示、清理分支

- **操作者**：Claude Code
- **目标**：整理仓库：skill 按工作流分组展示，修过时的安装提示，清掉不要的分支
- **已完成**：
  - README skill 表分为「采集 / 创作与发布 / 电脑工具」三组
  - `install.sh` 装完后的命令列表改为自动读取 `skills/ky-*`，不再写死
  - 新增 `skills/ky-write/README.md`
  - 删除分支 `agent/add-short-skills`（ky-biz、ky-tool、ky-vcheck，用户确认不要）和已合并的 `codex/single-switcher-icon`
  - 本机：删掉指向已不存在的 ky-wechat-html 的坏软链，重跑 install-links 链接全部 9 个 skill
- **改动路径**：
  - `README.md`、`install.sh`、`skills/ky-write/README.md`、`docs/PROGRESS.md`
- **验证**：
  - `bash -n install.sh`；`./scripts/install-links.sh` 输出 9 个 skill
- **未完成 / 下一步**：
  - 私有 skill（Kiren_Skill_Factory、ky-script / ky-kcard / ky-alchemy）是否统一到一个私有仓库，待用户决定
  - `docs/grok-bot/`、`docs/COVER_ON_CAMERA_NOTES.md` 是否移出公开仓库，待用户决定
- **风险或注意**：
  - 无

---

## 2026-11-02 18:10 PDT — Claude Code — ky-deai 改名为 ky-write

- **操作者**：Claude Code
- **目标**：用户把这个 skill 定位为「写作」，去 AI 味只是写作的一部分
- **已完成**：
  - `skills/ky-deai/` → `skills/ky-write/`，name、description、标题改为写作定位；垫词清单和 AI 腔清单归到「去 AI 味」一节下
  - skill VERSION 0.2.0；README、AGENTS 同步改名
  - 删除各宿主下 `ky-deai` 旧软链，重新链接 `ky-write`
- **改动路径**：
  - `skills/ky-write/`
  - `README.md`、`AGENTS.md`、`docs/PROGRESS.md`
- **验证**：
  - `./scripts/install-links.sh ky-write`
- **未完成 / 下一步**：
  - 同上一条：真实稿件试跑、补示例
- **风险或注意**：
  - 已安装过 ky-deai 的其他机器需删除旧软链后重跑 install-links

---

## 2026-11-02 18:00 PDT — Claude Code — 新增 ky-deai

- **操作者**：Claude Code
- **目标**：把用户在 Claude 对话里做好的「去 AI 味」skill 收进集合，以后在仓库里持续打磨
- **已完成**：
  - 新增 `skills/ky-deai/`（曾用名 de-ai-flavor-writing）：文章润色、写作辅助、口播稿、英文字幕四种模式
  - README skill 表、AGENTS 已发布列表、根 VERSION 升到 0.9.0
  - 删除 `~/.claude/skills/de-ai-flavor-writing` 本地副本，改为 install-links 软链
- **改动路径**：
  - `skills/ky-deai/`
  - `README.md`、`AGENTS.md`、`VERSION`、`docs/PROGRESS.md`
- **验证**：
  - `./scripts/install-links.sh ky-deai`
- **未完成 / 下一步**：
  - 用真实文章、口播稿试跑，补一组修改前后示例
  - 观察「短 20% 到 30%」在原文已精炼时是否硬删
- **风险或注意**：
  - claude.ai 账号里还有一份旧的 de-ai-flavor-writing，需用户在网页端手动删除

---

## 2026-10-07 20:09 PDT — Codex — Codex 切换器合并为单一图标

- **操作者**：Codex
- **目标**：桌面只保留一个 Codex 模型切换图标，打开图标后再选择模型或通道
- **已完成**：
  - 停止在通道切换成功后生成 `Codex → 模型` 独立快捷 App
  - 安装或升级时清理旧版生成的分模型 App，只保留「Codex 切换模型」
  - 主图标继续进入模型/通道选择菜单，教程也保留在同一菜单中
  - 删除不再使用的分模型快捷方式脚本与 profile 标记
  - 同步 README、Skill 说明、教程、版本和 changelog
- **改动路径**：
  - `skills/ky-codex-switch/**`
  - `README.md`
  - `AGENTS.md`
  - `VERSION`
  - `docs/PROGRESS.md`
- **验证**：
  - `skill-creator` 的 `quick_validate.py` 通过
  - 所有修改过的 shell 脚本通过 `bash -n`
  - 隔离桌面验证旧生成 App 被清理、无关 App 保留、主图标 launcher 使用 `pick`
  - 隔离 HOME 完整安装通过，桌面最终只有一个 Codex 切换图标
  - `profiles.json` 通过 JSON 校验，`git diff --check` 通过
- **未完成 / 下一步**：
  - 用户确认后推送独立分支
- **风险或注意**：
  - 清理逻辑只删除 bundle id 以 `local.ky.codex.provider.` 开头的旧 Codex App，避免误删用户自己的同名应用

---

## 2026-09-12 17:54 +08:00 — Codex — 新增 Windows 微信双开 Skill

- **操作者**：Codex
- **目标**：把官方微信双开桌面快捷方式沉淀为可公开安装的 `ky-wechat-dual`。
- **已完成**：
  - 新增 Skill 说明、用户 README、PowerShell 安装脚本、独立版本与变更记录。
  - 自动发现 `Weixin.exe` / `WeChat.exe`，并校验腾讯版本信息与有效 Authenticode 签名。
  - 创建无 VBS / BAT 外部依赖的双开快捷方式；默认不启动微信，避免测试导致额外窗口。
  - 更新集合 README、已发布 Skill 清单与集合版本 `0.7.0`。
- **改动路径**：
  - `skills/ky-wechat-dual/**`
  - `README.md`
  - `AGENTS.md`
  - `VERSION`
  - `docs/PROGRESS.md`
- **验证**：
  - Skill Creator `quick_validate.py` 通过。
  - PowerShell 语法解析零错误，运行脚本返回 `InstalledAndValidated`。
  - 本机腾讯官方微信 4.1.13.12 的数字签名状态为 `Valid`。
  - `install-links.sh --dry-run ky-wechat-dual` 成功识别并规划多宿主链接。
  - 隐私扫描未发现本机用户名、安装路径或凭据。
- **未完成 / 下一步**：
  - 无。
- **风险或注意**：
  - 仅支持 Windows；登录验证必须由用户本人完成。
  - 不承诺平台账号风控为零，禁止与第三方多开、补丁或群控工具混用。

## 2026-07-21 — Grok — Skill 更名 ky-codex-switch

- **操作者**：Grok
- **目标**：skill 命名改为 ky-codex- + 主功能「切换」
- **已完成**：目录/文档/脚本路径全部更名为 ky-codex-switch；多端软链更新
- **改动路径**：skills/ky-codex-switch/**、README、AGENTS
- **注意**：旧名 ky-codex-supergrok 已废弃

---

## 2026-07-21 — Grok — 官方 Codex 图标 + 误删可重生 + 清理桌面

- 图标改用 ChatGPT 内置 icon-codex-dark-color
- 桌面仅保留「Codex 切换模型」；通道快捷方式可再选一次重新生成
- 文档/教程补充误删恢复说明

---

## 2026-07-21 — Grok — 主图标设计 + 中转站 API + 去掉教程图标

- **已完成**：仅保留「Codex 切换模型」主图标（.icns）；教程只在菜单；新增⑤中转站（base_url+key+model + relay-proxy）
- **改动**：make-desktop-apps、build-app-icon、relay-proxy、profiles、tutorial/README

---

## 2026-07-21 — Grok — 支持 DeepSeek 官网 API Key

- **问题**：用户使用 DeepSeek 官网 Key，却走 OpenRouter → 401
- **修复**：deepseek-proxy 本地桥（Responses→Chat）；profile 用 DEEPSEEK_API_KEY；弹窗区分官网 Key
- **验证**：本地 /v1/responses 返回 200 且含 DEEPSEEK_OK

---

## 2026-07-21 — Grok — 修复 OpenRouter Desktop 401 Missing Authentication

- **原因**：Codex Desktop 读不到 ky-provider.env，请求无 Authorization
- **修复**：sync-openrouter-bearer.py 把 Key 写入 experimental_bearer_token；切换时自动同步
- **验证**：本机 config 已含 bearer；用户需重启 Codex 并确认 Key 为 sk-or-v1- 格式

---

## 2026-07-21 — Grok — 桌面按需生成快捷方式

- **操作者**：Grok
- **目标**：桌面不预装一堆图标；首次选中通道后自动生成快捷方式
- **已完成**：默认仅「切换模型」+「使用教程」；ensure-desktop-shortcut 在成功切换后创建 Codex → xxx
- **改动路径**：skills/ky-codex-switch/scripts/*
- **验证**：use grok → 桌面出现 Codex → Grok
- **下一步**：无

---

## 2026-07-21 — Grok — 清理桌面切换器图标

- **操作者**：Grok
- **目标**：桌面只保留最新 5 个入口
- **已完成**：删除 Claude/DeepSeek/Gemini 等多余 App 与旧 .command；make-desktop-apps 同步
- **改动路径**：本机 Desktop/Applications；skills/ky-codex-switch/scripts/make-desktop-apps.sh
- **验证**：ls Desktop Codex*
- **下一步**：无

---

## 2026-07-21 09:00 PDT — Grok — 多模型切换 UX：弹窗填 Key + 图文教程

- **操作者**：Grok
- **目标**：让非技术用户点按钮即可切换；缺 API 时引导填写并提供「不会使用怎么办」教程
- **已完成**：
  - 首次 OpenRouter Key 的 macOS 对话框（保存并切换 / 查看教程 / 取消）
  - 离线教程 HTML + 「Codex 使用教程」桌面 App
  - OpenRouter 多模型 catalog + `api` 合集 profile
  - pick 菜单增加教程入口；失败时引导教程
- **改动路径**：
  - `skills/ky-codex-switch/**`
  - `docs/PROGRESS.md`、`VERSION`、根 `README`（若有）
- **验证**：
  - bash -n / install 本地安装
  - codex-provider list / tutorial 路径存在
- **风险或注意**：
  - 教程说明走 OpenRouter 而非 DeepSeek 官网直连的原因

---

## 2026-07-21 08:10 PDT — Grok — ky-codex-switch 多模型一键切换

- **操作者**：Grok
- **目标**：在 SuperGrok/OpenAI 之外加入 Claude、DeepSeek、Gemini 等一键切换
- **已完成**：
  - `profiles.json` 多 profile 注册表
  - `codex-provider use|list|pick|status|toggle|keys`
  - OpenRouter provider（Responses）承载 Claude/DeepSeek/Gemini
  - 密钥文件 `~/.codex/ky-provider.env` + 桌面多通道 App
  - 文档与 skill VERSION 0.2.0
- **改动路径**：
  - `skills/ky-codex-switch/**`
  - `README.md`
  - `docs/PROGRESS.md`
  - `VERSION`
- **验证**：
  - `bash -n` codex-provider / install
  - 本机 `install.sh` + `codex-provider list`
- **未完成 / 下一步**：
  - 用户自备 OPENROUTER_API_KEY 后验证 Claude/DeepSeek 实请求
- **风险或注意**：
  - 直连 DeepSeek/Anthropic 与 Codex Responses 不兼容，故走 OpenRouter
  - 勿提交 ky-provider.env

---

## 2026-07-21 07:25 PDT — Grok — 新增 ky-codex-switch

- **操作者**：Grok
- **目标**：把 Codex ↔ SuperGrok 订阅通道与一键切换做成可发布 skill
- **已完成**：
  - 新增 `skills/ky-codex-switch/`（SKILL/README/scripts/references）
  - 安装脚本：本地代理、token 刷新、config provider、macOS 桌面一键 App
  - 更新根 README skill 表与 AGENTS 已发布列表
- **改动路径**：
  - `skills/ky-codex-switch/**`
  - `README.md`
  - `AGENTS.md`
  - `docs/PROGRESS.md`
  - `VERSION`
- **验证**：
  - `bash -n` 安装与切换脚本
  - `python3 -m py_compile` proxy/token
  - `./scripts/install-links.sh --dry-run ky-codex-switch`
- **未完成 / 下一步**：
  - 推送到 GitHub main
- **风险或注意**：
  - 非官方 SuperGrok 订阅代理集成；文档已标明风险与非 API Key 路径
  - 勿提交 `~/.grok/auth.json` 或任何 token

---

## 2026-07-21 — Grok — 去掉对外「挂靠第三方」表述，改为自有产品说明

- **操作者**：Grok
- **目标**：借鉴可以，但公开文档不得把别人的项目写成我们的组件/依赖清单，避免抄袭与蹭项目观感
- **已完成**：
  - 重写根 README：自有安装与使用说明，依赖表不再链到外部下载器仓库
  - `ky-sph` 改为原料入库工作流，明确不捆绑任何第三方下载器
  - `ky-xdraft` 改为自有草稿流程说明，移除仓库内非自研上传脚本
  - `THIRD_PARTY_NOTICES` 改为「非关联 / 不捆绑」声明
  - dy/xhs README 改为纯 KY 产品语气
- **改动路径**：
  - `README.md`、`THIRD_PARTY_NOTICES.md`、`VERSION`
  - `skills/ky-sph/**`、`skills/ky-xdraft/**`、`skills/ky-dy/**`、`skills/ky-xhs/**`
- **验证**：
  - 全文不再把外部仓库当作 skill 安装依赖展示
- **未完成 / 下一步**：
  - push
- **风险或注意**：
  - ky-xdraft 暂以手动草稿流程为主；自动化需后续 KY 自研再加

---

## 2026-07-21 — Grok — 精简 skill 命名与核心描述

- **操作者**：Grok
- **目标**：命名尽量短，description 只保留核心能力
- **已完成**：
  - 重命名：`ky-douyin`→`ky-dy`，`ky-wx-channels`→`ky-sph`，`ky-x-article`→`ky-xdraft`，`ky-wechat-html`→`ky-mphtml`
  - 统一 description 为一行核心能力 + 短触发
  - 更新 README / install / AGENTS / THIRD_PARTY / 字体文档引用
- **改动路径**：
  - `skills/ky-dy|ky-xhs|ky-sph|ky-xdraft|ky-mphtml|ky-x/**`
  - `README.md` `VERSION` `AGENTS.md` `install.sh` `docs/**`
- **验证**：
  - 目录名与 SKILL frontmatter `name` 一致
- **未完成 / 下一步**：
  - push；本机重链 soft link
- **风险或注意**：
  - 旧命令名失效，需重启 Agent

---

## 2026-07-20 — Grok — 新增媒体抓取与 X 草稿四 skill 并准备推送

- **操作者**：Grok
- **目标**：将抖音 / 小红书 / 视频号 / X Article 草稿能力沉淀为正式 `ky-*` skill，并入 kyskills 真源后推送 GitHub
- **已完成**：
  - 新增 `ky-douyin`（Playwright 拦截下载 + metadata）
  - 新增 `ky-xhs`（INITIAL_STATE 抓取 + 媒体）
  - 新增 `ky-wx-channels`（编排 wx_channels_download 工作流）
  - 新增 `ky-x-article`（Markdown → X Articles 草稿）
  - 更新根 README、VERSION 0.4.0、AGENTS、install.sh 提示、THIRD_PARTY_NOTICES
- **改动路径**：
  - `skills/ky-douyin/**`
  - `skills/ky-xhs/**`
  - `skills/ky-wx-channels/**`
  - `skills/ky-x-article/**`
  - `README.md`、`VERSION`、`AGENTS.md`、`install.sh`、`THIRD_PARTY_NOTICES.md`、`docs/PROGRESS.md`
- **验证**：
  - `python -m py_compile` 对新脚本（若环境有 Python）
  - `git status` 确认仅相关文件
- **未完成 / 下一步**：
  - `git push` 到 `KirenYi/kyskills`（本轮执行）
  - 用户本机 `./scripts/install-links.sh` 刷新软链
- **风险或注意**：
  - 平台抓取随时可能被风控；文档已写诚实限制
  - 勿提交 cookies / 用户数据

---

## 2026-07-19 07:23 PDT — Codex — 增加一行命令安装入口

- **操作者**：Codex
- **目标**：让非技术用户无需理解 Git 和目录结构即可安装或更新 Skills
- **已完成**：
  - 将“把仓库链接发给 Agent，让 Agent 自动安装”设为首选入口
  - 新增根目录 `install.sh`，一条命令自动下载、更新并连接 Skills
  - 在没有 Git 时自动使用 GitHub 压缩包安装
  - 为链接脚本增加简洁输出模式和隔离测试目录支持
  - 将 README 安装入口改为可直接复制的一行命令
- **改动路径**：
  - `install.sh`
  - `scripts/install-links.sh`
  - `README.md`
  - `docs/MULTI_HOST.md`
  - `VERSION`
  - `docs/PROGRESS.md`
- **验证**：
  - `bash -n install.sh scripts/install-links.sh`
  - 在 `/tmp` 隔离环境验证首次安装、重复更新、安装全部与只安装 `ky-x`
  - 验证生成的多宿主链接均指向受管安装目录
- **未完成 / 下一步**：
  - 无
- **风险或注意**：
  - 一键安装依赖 GitHub 可访问；失败时用户可让 Agent 按仓库 README 手动安装

---

## 2026-07-19 07:11 PDT — Codex — 精简公开介绍并移除测试账号

- **操作者**：Codex
- **目标**：精简仓库与 Skill 的公开说明，移除早期测试账号及与功能无关的个人化介绍
- **已完成**：
  - 将根 README 收敛为项目功能、安装、使用与限制说明
  - 从文档、示例配置和初始化逻辑中移除早期测试账号；必要示例统一为 `naval`
  - 清理 `ky-x` 与 `ky-wechat-html` 中会外显的署名、品牌解释和 HTML 标题后缀
  - 同步版本号、变更记录与 `ky-x` 命令行帮助文本
- **改动路径**：
  - `README.md`、`VERSION`
  - `skills/ky-x/**`
  - `skills/ky-wechat-html/**`
  - `docs/PROGRESS.md`
- **验证**：
  - `git diff --check`
  - `python3 -m xarchive --help`、`python3 -m xarchive --version`
  - 临时目录执行 `python3 -m xarchive init` 并通过 JSON 校验
  - `./scripts/install-links.sh --dry-run`
  - 全仓搜索确认早期测试账号无命中
- **未完成 / 下一步**：
  - 用户确认后推送远端
- **风险或注意**：
  - `.gitignore` 继续保留旧版数据目录规则，防止历史用户数据被误提交

---

## 2026-07-12 — Grok — 出镜封面规则 v2（竖屏修正 / 横屏暂缓）

- **操作者**：Grok
- **目标**：按用户反馈修正出镜封面：竖屏大字在脸下或头上；横屏仅记录
- **已完成**：
  - 重出竖屏封面样本（脸下/头上大字）
  - 笔记 `docs/COVER_ON_CAMERA_NOTES.md` + 云盘 `出镜封面规则_v2.md`
- **改动路径**：
  - `docs/COVER_ON_CAMERA_NOTES.md`
  - 用户云盘 `ky-封面测试/from-video-chatgpt56/`
- **验证**：png_covers_v2 导出
- **未完成 / 下一步**：用户确认竖屏版本后，再考虑写入 ky-cover
- **风险或注意**：横屏等真实横屏成片再执行

---

## 2026-07-12 — Grok — 字体商用许可硬约束

- **操作者**：Grok
- **目标**：封面/排版统一「可公开、可商用、无侵权风险」字体策略
- **已完成**：
  - 新增 `docs/FONT_LICENSE.md`（白名单 + 禁止项 + 检查清单）
  - `AGENTS.md`、`ky-wechat-html` SKILL / styles 引用该约束
  - 封面测试说明补充字体条款
- **改动路径**：
  - `docs/FONT_LICENSE.md`、`AGENTS.md`、`skills/ky-wechat-html/**`、用户云盘测试说明
- **验证**：文档交叉引用存在
- **未完成 / 下一步**：正式 `ky-cover` 时默认 Noto 渲染管线
- **风险或注意**：系统字体栈用于本机光栅化位图通常不构成分发字体文件；若未来打包 .ttf 必须只用 OFL 并附 LICENSE

---

## 2026-07-12 — Grok — ky-wechat-html 扩充 5 套风格

- **操作者**：Grok
- **目标**：调研公开排版范式后，扩展 KY 风格库并保持微信兼容
- **已完成**：
  - 新增 `ink` / `cream` / `swiss` / `night` / `fresh`（styles.md + SKILL 表）
  - 版本 0.2.0，changelog 更新
- **改动路径**：
  - `skills/ky-wechat-html/templates/styles.md`
  - `skills/ky-wechat-html/SKILL.md`
  - `skills/ky-wechat-html/VERSION`
  - `skills/ky-wechat-html/references/changelog.md`
- **验证**：styles.md 含 13 个 `## id ·` 段落
- **未完成 / 下一步**：用户可指定把新风格跑进纳瓦尔文稿预览
- **风险或注意**：`night` 暗色在部分公众号外壳下观感可能被冲淡

---

## 2026-07-12 — Grok — 新增 ky-wechat-html

- **操作者**：Grok
- **目标**：借鉴 dbs-wechat-html 的核心结构，写成 KY 自有公众号 HTML skill（非全文抄袭）
- **已完成**：
  - 新增 `skills/ky-wechat-html/`（SKILL.md + 8 套原创风格 styles.md）
  - 输出目录 `ky-公众号HTML/`、风格 id 独立命名
  - 更新根 README skill 表；`install-links` 可挂多端
- **改动路径**：
  - `skills/ky-wechat-html/**`
  - `README.md`
  - `docs/PROGRESS.md`
- **验证**：
  - 目录结构完整；`./scripts/install-links.sh ky-wechat-html`
- **未完成 / 下一步**：
  - 可选：Python 渲染脚本提高长文稳定性
  - 人类用真实 MD 试跑一轮排版
- **风险或注意**：
  - 当前仍为 Agent 按规则生成 HTML（与参考 skill 同类），长文依赖模型遵守规则

---

## 2026-07-12 — Grok — 多 Agent 协作文档 + 跨端安装

- **操作者**：Grok
- **目标**：
  1. 为多工具协作增加规范与进度同步文件
  2. 明确 kyskills 是「多 skill 集合」，ky-x 仅为 v0.1 第一个 skill
  3. 强化「任意主流 Agent 宿主都能装同一套 skill」的安装方式
- **已完成**：
  - 新增 `AGENTS.md`、`CLAUDE.md`、`SOURCE_OF_TRUTH.md`
  - 新增 `docs/PROGRESS.md`、`docs/MULTI_HOST.md`、`docs/COLLABORATION.md`
  - 扩展 `scripts/install-links.sh` 覆盖更多 skills 目录（含 Trae / 通用 Agents 等）
  - 更新根 `README.md`：集合定位 + 多端安装
- **改动路径**：
  - `AGENTS.md`、`CLAUDE.md`、`SOURCE_OF_TRUTH.md`
  - `docs/*`
  - `scripts/install-links.sh`
  - `README.md`
- **验证**：
  - `./scripts/install-links.sh ky-x`（推送前本地执行）
- **未完成 / 下一步**：
  - 人类确认后 `git push`
  - 后续可增加更多 `ky-*` skill
  - 若某宿主路径特殊（如 Work Buddy 官方目录），补进 `MULTI_HOST.md` 与 install 脚本
- **风险或注意**：
  - 部分宿主 skills 路径可能随版本变化；以各产品文档为准，脚本采用「存在则链接、不存在则跳过」策略

---

## 2026-07-12 — Grok — 初版仓库上线

- **操作者**：Grok
- **目标**：发布 kyskills 与首个 skill `ky-x`
- **已完成**：
  - 仓库结构、`ky-x` 实现、GitHub `KirenYi/kyskills` public 推送
- **改动路径**：
  - 初版全量
- **验证**：
  - `python3 -m xarchive` 冒烟；remote push 成功
- **未完成 / 下一步**：
  - 多 Agent 协作文档（本轮）
- **风险或注意**：
  - `ky-x` 依赖公开 RSS，非全量历史
