# ky-typeset Changelog（原 ky-mphtml）

## 0.5.0 — 2026-11-06（新增 6 套）

- 新增 6 套 KY 原创样式，造型与原有 13 套明显区分：`studio` 工作室、`brutal` 粗野、`bubble` 对话、`retro` 复古、`capsule` 胶囊、`scrapbook` 手账
- 全量风格 13 → **19**；SKILL.md 推荐表补充对应文章类型，新增「新款」多套对比口令
- 均不使用伪元素；`scrapbook` 的旋转、`brutal` / `bubble` 的投影为可丢失装饰，已在样式说明中注明

## 0.4.0 — 2026-11-04（更名）

- `ky-mphtml` 更名为 `ky-typeset`，面向全球用户；旧命令 `/ky-mphtml` 仍可触发
- 不再只针对公众号：支持粘贴进知乎、Substack、Medium、邮件等富文本编辑器，公众号规则保留为已验证平台
- 说明与触发词改为中英双语，13 套样式补充英文名，按用户语言回复
- 版权标识前缀 `KYMP-` 改为 `KYTS-`；输出改为 `{文件名}_typeset/`、`compare.html`
- 完成回复末尾附作者署名；生成的文章正文默认不加任何署名

## 0.3.0 — 2026-11-04（净室重写）

- 全部重写 `SKILL.md`：新的流程与措辞；未指定风格时直接推荐一套，不再先发选择问卷
- 移除 0.1.0 起内置的 8 套样式（clean / essay / docs / pulse / ledger / lecture / memo / stage）。这 8 套最初改编自 dontbesilent 的 dbskill（`dbs-wechat-html`，当时按 CC BY-NC 4.0 授权）
- 按 KY 个人视觉风格（暖白底、克制、单一强调色）从零设计 8 套新样式：`paper` 素笺、`window` 窗光、`steps` 步骤、`desk` 桌面、`margin` 批注、`notebook` 笔记本、`kraft` 牛皮纸、`poster` 告示；重写时未参照 dbskill 文件
- 保留 0.2.0 由 KY 原创的 5 套：`ink`、`cream`、`swiss`、`night`、`fresh`
- 每套样式与 `SKILL.md` 加入版权标识（`KYMP-…`），生成的 HTML 带 `generator` 标记
- 新样式不使用伪元素，粘贴进公众号后台更稳定
- 输出改为 `{文件名}_公众号排版/{文件名}.{style}.html`，多套时附 `对比.html`

## 0.2.1 — 2026-07-19

- 精简公开说明，移除与功能无关的个人化介绍
- 生成的 HTML 标题默认不再附加品牌后缀，页脚默认不添加署名

## 0.2.0 — 2026-07-12

- 新增 5 套风格：`ink` 宣纸、`cream` 奶刊、`swiss` 网格、`night` 夜读、`fresh` 青芽
- 全量风格 8 → **13**
- 灵感来自 newsletter / 人文宣纸 / Swiss / 暗色阅读 / 国内小清新等公开设计范式，使用独立色板与命名

## 0.1.0 — 2026-07-12

- 首发：Markdown → 微信公众号 HTML
- 内置 8 套风格 id（clean / essay / docs / pulse / ledger / lecture / memo / stage）
- 生成模式：推荐 1 / 预览 6 / 全部 / 指定
- 微信兼容规则与输出目录约定
- 结构上参考常见「流程 + 样式库」skill 范式，实现与文案独立
