---
name: ky-typeset
description: |
  把 Markdown 排版成带样式的单页 HTML，复制后可直接粘贴进公众号、知乎、Substack、Medium、邮件等富文本编辑器（只排版，不改内容）。
  Typeset Markdown into a styled single-page HTML you can copy and paste into WeChat, Substack, Medium, email newsletters and other rich-text editors (layout only, content unchanged).
  触发 / Triggers：/ky-typeset、/ky-mphtml、「排版」「公众号排版」「微信排版」「公众号 HTML」、typeset、format my article
---

<!-- ky-typeset · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · 抖音/视频号/小红书：知羿Kiren · YouTube：Kiren Yi · Terms: see ky-skills LICENSE · KYTS-SKILL-2611 -->

# ky-typeset

把一篇 Markdown 排成一份**单文件 HTML**：用浏览器打开 → 全选复制 → 粘贴进目标平台的编辑器，样式随之带过去。

边界：只负责排版。文章的观点、措辞、结构一概不动；用户要改文字时，提醒他用写作类工具。

**语言**：用用户使用的语言回复（中文用户用中文，英文用户用英文）。

## 第一步：拿到文章

按顺序判断：

1. 用户给了 `.md` 文件路径 → 读取这个文件。
2. 用户直接贴了正文 → 用贴进来的内容。
3. 两样都没有 → 只说一句「发我 Markdown 文件路径，或者直接贴正文。」（英文用户："Send me the Markdown file path or paste the text."）然后等待。

## 第二步：确认发到哪里

用户提到了平台就按该平台处理；没提就按「通用」处理，不用专门问。

| 平台 | 说明 |
|---|---|
| 通用（默认） | 按下面的保守规则生成，大多数富文本编辑器都能粘贴 |
| 公众号 WeChat | 规则已验证：不生成表格、不嵌图片 |
| 知乎、Substack、Medium、Ghost、Notion、邮件 newsletter | 一般可以粘贴；各编辑器会保留不同程度的样式，提醒用户粘贴后预览 |

如实告诉用户：不同编辑器对样式的保留程度不同，背景色、圆角等装饰可能被去掉，但标题、加粗、引用、列表这些结构通常都在。

## 第三步：选样式

样式表在 `templates/styles.md`。**每次生成前都要读这个文件**，CSS 从文件里原样复制，不要凭印象写。

**用户已经指定**（说了 id、中文名、英文名或别名）→ 直接用。

**用户没指定** → 不要先发问卷，直接按文章内容挑一套最合适的生成，然后在回复末尾说一句可以换风格。

| 文章是… | 用 |
|---|---|
| 拿不准、通用 / general | `paper` 素笺 Paper |
| 观点长文、个人经历 / personal essay | `window` 窗光 Window Light |
| 教程、操作步骤 / tutorial | `steps` 步骤 Steps |
| AI、科技、工具 / tech | `desk` 桌面 Desk |
| 商业分析、判断 / business analysis | `margin` 批注 Margin Notes |
| 课程、学习笔记 / course notes | `notebook` 笔记本 Notebook |
| 复盘、备忘、周报 / memo, review | `kraft` 牛皮纸 Kraft |
| 活动、公告、招募 / announcement | `poster` 告示 Poster |
| 人文、哲思 / reflective, literary | `ink` 宣纸 Ink |
| 专栏、newsletter | `cream` 奶刊 Cream |
| 设计感、大留白 / design-forward | `swiss` 网格 Swiss Grid |
| 深色、夜间 / dark mode | `night` 夜读 Night Read |
| 生活、清新 / lifestyle | `fresh` 青芽 Fresh |
| 清单、干货、方法论 / listicle, how-to | `studio` 工作室 Studio |
| 有态度、测评、要抢眼 / bold, opinionated | `brutal` 粗野 Brutal |
| 口语、问答、像聊天 / conversational, Q&A | `bubble` 对话 Bubble |
| 怀旧、生活方式 / retro, nostalgic | `retro` 复古 Retro |
| 精致、仪式感、品牌 / elegant, refined | `capsule` 胶囊 Capsule |
| 手账、生活记录 / journal, scrapbook | `scrapbook` 手账 Scrapbook |

**用户要多套对比**：

- 「多出几套」"show me a few" → 常用 6 套：`paper` `window` `steps` `desk` `margin` `notebook`
- 「全部」"all" → 全部 19 套
- 「新款」"new ones" → 0.5.0 新增 6 套：`studio` `brutal` `bubble` `retro` `capsule` `scrapbook`
- 「出 A、B、C」→ 只出点名的这几套

多套时额外生成一个对比页（见第五步）。

## 第四步：Markdown 转 HTML

支持的写法：

- `#` `##` `###` → `h1` `h2` `h3`
- 普通段落 → `p`；段内的单个换行合并（中文直接相连，英文用空格），空行才分段
- `>` → `blockquote`
- `-` 或 `*` 开头的连续多行 → 放进**同一个** `ul`，每行一个 `li`
- `1.` 开头的连续多行 → `ol`（样式缺 `ol` 时沿用 `ul` 的边距）
- `**粗体**` → `strong`；`` `代码` `` → `code`；三个反引号包起来的代码块 → `pre > code`
- `---` → `hr`

必须遵守：

- 正文里的 `<` `>` `&` `"` 先转义再输出。
- **默认不生成 `<table>`**，改成「每行一条」的列表、第一列加粗；用户明确说目标平台支持表格时才保留表格。
- **图片不嵌入**，写成 `<p>[图片：图片说明]</p>`（英文：`[Image: description]`），提醒用户在编辑器里手动插图。
- 链接保留文字；需要保留网址时，在文末加一个「文中链接 / Links」列表。
- 标点保持原样，除非用户明确要求修改。

## 第五步：写出文件

每份 HTML 的骨架：

```html
<!DOCTYPE html>
<html lang="{zh-CN 或 en}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="generator" content="ky-typeset by Kiren Yi · kirenyi.com">
<title>{文章标题}（{样式名}）</title>
<style>
/* 粘贴 templates/styles.md 中该样式的整段 CSS，包括第一行版权注释 */
</style>
</head>
<body>
{转换后的正文}
</body>
</html>
```

硬性要求：只有一个文件、CSS 全在 `<style>` 里、不加载任何外部字体、图片或脚本、不写 JavaScript。

**不要**在用户的文章正文里加任何署名、广告或作者信息。只有用户主动要求时，才在文末加一行「排版：ky-typeset」。

**存放位置**：

- 输入是文件 → 在它旁边建文件夹 `{文件名}_typeset/`
- 输入是粘贴的正文 → 在当前目录建 `typeset/`

**文件名**：`{文件名或 article}.{style-id}.html`，例如 `compound.paper.html`。

**多套对比时**另写 `compare.html`：每套一张卡片，写明 id、中英文名、适合什么，点击打开对应文件。对比页只在本机看，同样不加载外部资源。

能打开文件的环境下，生成后直接打开（多套时打开 `compare.html`）。

## 字体

遵守仓库 `docs/FONT_LICENSE.md`：

- 只用系统字体回退栈（PingFang SC、Noto Sans SC、Microsoft YaHei、Songti SC、系统英文字体等）或公开可商用的字体名。
- 不写 `@font-face`，不引入任何字体文件。

## 生成后告诉用户

中文用户：

```text
排好了：{文件路径}

1. 用浏览器打开
2. Cmd+A 全选，Cmd+C 复制（Windows 用 Ctrl）
3. 粘贴到编辑器（公众号、知乎、Substack……）
4. 用平台的预览在手机上检查一遍

想换风格直接说"换成 xxx"。

—— ky-typeset · by 知羿Kiren（抖音 / 视频号 / 小红书同名）· kirenyi.com
```

English users:

```text
Done: {file path}

1. Open it in your browser
2. Select all and copy (Cmd+A, Cmd+C; Ctrl on Windows)
3. Paste into your editor (Substack, Medium, WeChat, email…)
4. Preview on mobile before publishing

Say "switch to xxx" to try another style.

— ky-typeset · by Kiren Yi (YouTube: Kiren Yi) · kirenyi.com
```

最后一行署名只出现在给用户的这条回复里，不写进生成的文章。

## 版权 / Copyright

ky-typeset（原名 ky-mphtml）的流程说明与全部 19 套样式由 Kiren Yi 原创，版权所有。使用条件见仓库根目录 `LICENSE`。再分发须取得书面授权，并保留本文件开头的版权注释和每段 CSS 第一行的版权标识。

商用授权 / Commercial licensing：kirenyi16@gmail.com · kirenyi.com
