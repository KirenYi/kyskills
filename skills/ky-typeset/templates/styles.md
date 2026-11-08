# ky-typeset 样式库 / Style Library

> © 2026 Kiren Yi（KY）。本文件中的样式为 KY 原创设计，使用条款见仓库根目录 `LICENSE`。
>
> 字体须遵守仓库 `docs/FONT_LICENSE.md`：只用系统字体回退栈或公开可商用字体，不引入字体文件。

使用方法：按 style id 找到对应条目，把整段 CSS 原样放进 HTML 的 `<style>`。每段 CSS 第一行的注释是版权标识，必须保留。

## 设计原则（全部样式共用）

来自 KY 的个人视觉风格：

1. **真实大于完美**：暖白、纸张、牛皮纸这类有温度的底色，不用纯白和冷蓝灰。
2. **克制大于堆砌**：每套样式最多一个强调色，靠留白和字重建立层次。
3. **情感大于信息**：先让人愿意读下去，再让结构清楚。
4. **可粘贴**：新样式不用 `:before` / `:after` 伪元素、计数器和动画，这些在复制进编辑器时常被丢掉。`scrapbook` 的旋转、`brutal` / `bubble` 的投影属于装饰，丢了也不影响正文。`ink`、`cream`、`swiss`、`night`、`fresh` 中少量伪元素装饰粘贴后可能不显示，不影响正文。

## 常用 6 套

`paper` · `window` · `steps` · `desk` · `margin` · `notebook`

## 全部 19 套

`paper` · `window` · `steps` · `desk` · `margin` · `notebook` · `kraft` · `poster` · `ink` · `cream` · `swiss` · `night` · `fresh` · `studio` · `brutal` · `bubble` · `retro` · `capsule` · `scrapbook`

---

## paper · 素笺

- English：Paper
- 别名：默认、干净、通用
- 适合：方法论、说明、大多数文章；拿不准时用它
- 设计依据：暖白底 + 焦糖色强调，KY 风格的基准款

```css
/* ky-typeset/paper · © 2026 Kiren Yi · KYTS-paper-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.85;color:#2b2722;background:#faf8f4;max-width:680px;margin:0 auto;padding:36px 22px;}
h1{font-size:25px;line-height:1.4;font-weight:700;color:#1f1b17;margin:8px 0 30px;}
h2{font-size:19px;line-height:1.5;font-weight:700;color:#1f1b17;margin:44px 0 14px;padding-bottom:8px;border-bottom:1px solid #e4dccf;}
h3{font-size:16px;line-height:1.55;font-weight:700;color:#a0764a;margin:28px 0 10px;}
p{margin:12px 0;}
blockquote{margin:22px 0;padding:14px 18px;background:#f2ece2;border-left:3px solid #a0764a;color:#4d453c;}
ul{margin:12px 0;padding-left:20px;}
li{margin:6px 0;}
strong{font-weight:700;color:#8a5f35;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#efe8dc;padding:1px 5px;border-radius:3px;}
pre{background:#efe8dc;padding:14px 16px;border-radius:4px;overflow:auto;font-size:14px;line-height:1.6;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px solid #e4dccf;margin:36px 0;}
```

---

## window · 窗光

- English：Window Light
- 别名：长文、随笔、个人表达、慢读
- 适合：观点长文、个人经历、需要情绪铺垫的内容
- 设计依据：窗边自然光的安静感；衬线字体、大行距、柔和的深棕

```css
/* ky-typeset/window · © 2026 Kiren Yi · KYTS-window-2611 */
body{font-family:"Noto Serif SC","Songti SC","STSong",serif;font-size:17px;line-height:2;color:#33302b;background:#fbf7f0;max-width:660px;margin:0 auto;padding:44px 24px;}
h1{font-size:28px;line-height:1.35;font-weight:600;color:#26221d;margin:12px 0 36px;}
h2{font-size:21px;line-height:1.5;font-weight:600;color:#26221d;margin:56px 0 16px;}
h3{font-size:17px;line-height:1.6;font-weight:600;color:#6b5a47;margin:32px 0 10px;}
p{margin:16px 0;text-align:justify;}
blockquote{margin:28px 0;padding:2px 0 2px 20px;border-left:2px solid #c9b79c;color:#6b6157;font-size:16px;}
ul{margin:16px 0;padding-left:22px;}
li{margin:8px 0;}
strong{font-weight:700;color:#7a4e24;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#f0e8db;padding:1px 5px;}
pre{background:#f0e8db;padding:14px 16px;overflow:auto;font-size:14px;line-height:1.6;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px solid #ddd0bc;margin:44px 30%;}
```

---

## steps · 步骤

- English：Steps
- 别名：教程、操作指南、文档、清单
- 适合：一步一步的教程、工具用法、安装说明
- 设计依据：章节用色块标出，读者扫一眼就知道进行到哪一步；深暖色代码块

```css
/* ky-typeset/steps · © 2026 Kiren Yi · KYTS-steps-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.8;color:#2a2621;background:#fcfaf6;max-width:690px;margin:0 auto;padding:32px 20px;}
h1{font-size:24px;line-height:1.4;font-weight:800;color:#2a2621;margin:6px 0 26px;}
h2{font-size:17px;line-height:1.5;font-weight:700;color:#2a2621;background:#efe6d8;margin:40px 0 14px;padding:8px 14px;border-radius:6px;}
h3{font-size:16px;line-height:1.55;font-weight:700;color:#55623f;margin:24px 0 8px;padding-left:10px;border-left:4px solid #7c8b6a;}
p{margin:10px 0;}
blockquote{margin:18px 0;padding:12px 16px;background:#eef0e8;border-radius:6px;color:#3f4733;font-size:15px;}
ul{margin:10px 0;padding-left:22px;}
li{margin:7px 0;}
strong{font-weight:700;color:#2a2621;background:#f3e7cf;padding:0 2px;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#efe9df;color:#6b4a2b;padding:1px 5px;border-radius:3px;}
pre{background:#2e2a25;color:#f3ede3;padding:14px 16px;border-radius:6px;overflow:auto;font-size:13px;line-height:1.65;}
pre code{background:none;color:inherit;padding:0;}
hr{border:none;border-top:1px dashed #d8ccb8;margin:32px 0;}
```

---

## desk · 桌面

- English：Desk
- 别名：AI、科技、产品、工具评测
- 适合：AI 与科技内容，但要有生活感，不要科幻冷蓝
- 设计依据：桌面上的设备与咖啡杯；暖灰底、深色引用卡、焦橙强调

```css
/* ky-typeset/desk · © 2026 Kiren Yi · KYTS-desk-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.8;color:#26231f;background:#f7f5f1;max-width:680px;margin:0 auto;padding:36px 22px;}
h1{font-size:29px;line-height:1.3;font-weight:800;color:#26231f;letter-spacing:-0.01em;margin:6px 0 30px;}
h2{font-size:20px;line-height:1.45;font-weight:800;color:#26231f;margin:50px 0 14px;padding-top:14px;border-top:2px solid #26231f;}
h3{font-size:16px;line-height:1.55;font-weight:700;color:#c2703d;margin:28px 0 8px;}
p{margin:12px 0;}
blockquote{margin:26px 0;padding:16px 20px;background:#26231f;color:#f3eee6;border-radius:4px;font-size:15px;line-height:1.75;}
ul{margin:12px 0;padding-left:20px;}
li{margin:6px 0;}
strong{font-weight:700;color:#c2703d;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#ece6dc;padding:1px 5px;border-radius:3px;}
pre{background:#ece6dc;padding:14px 16px;border-radius:4px;overflow:auto;font-size:13px;line-height:1.65;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px dashed #cfc6b8;margin:38px 0;}
```

---

## margin · 批注

- English：Margin Notes
- 别名：商业、分析、判断、复盘结论
- 适合：商业判断、案例拆解、需要突出"结论"的文章
- 设计依据：像在书页边写批注；哑光深绿表示判断，引用块就是结论框

```css
/* ky-typeset/margin · © 2026 Kiren Yi · KYTS-margin-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.85;color:#2c2b27;background:#faf8f4;max-width:680px;margin:0 auto;padding:34px 22px;}
h1{font-size:25px;line-height:1.4;font-weight:800;color:#2c2b27;margin:6px 0 28px;}
h2{display:inline-block;font-size:19px;line-height:1.5;font-weight:700;color:#3f4f3a;margin:44px 0 12px;padding-bottom:4px;border-bottom:2px solid #3f4f3a;}
h3{font-size:16px;line-height:1.55;font-weight:700;color:#2c2b27;margin:26px 0 8px;}
p{margin:12px 0;}
blockquote{margin:22px 0;padding:14px 18px;background:#eef0e8;border:1px solid #c8cfbc;border-radius:4px;color:#2f3a2b;font-weight:500;}
ul{margin:12px 0;padding-left:20px;}
li{margin:6px 0;}
strong{font-weight:700;color:#3f4f3a;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#eceee6;padding:1px 5px;border-radius:3px;}
pre{background:#eceee6;padding:14px 16px;border-radius:4px;overflow:auto;font-size:14px;line-height:1.6;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px solid #d5d9cc;margin:36px 0;}
```

---

## notebook · 笔记本

- English：Notebook
- 别名：课程、讲义、学习笔记、读书笔记
- 适合：课程内容、学习总结、带要点的知识型文章
- 设计依据：一本摊开的笔记本；章节像页边色条，引用像贴在页上的便签

```css
/* ky-typeset/notebook · © 2026 Kiren Yi · KYTS-notebook-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.85;color:#2e2923;background:#fdfbf6;max-width:680px;margin:0 auto;padding:34px 22px;}
h1{font-size:25px;line-height:1.4;font-weight:700;color:#2e2923;margin:6px 0 28px;}
h2{font-size:19px;line-height:1.5;font-weight:700;color:#5a4632;margin:44px 0 14px;padding-left:12px;border-left:6px solid #d9c7a8;}
h3{font-size:16px;line-height:1.55;font-weight:700;color:#7a6650;margin:26px 0 8px;padding-bottom:4px;border-bottom:1px dotted #cdbb9c;}
p{margin:12px 0;}
blockquote{margin:22px 0;padding:12px 16px;background:#fff8e8;border:1px dashed #d9c7a8;border-radius:4px;color:#5c4f40;font-size:15px;}
ul{margin:12px 0;padding-left:22px;}
li{margin:7px 0;}
strong{font-weight:700;color:#5a4632;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#f3ecdf;padding:1px 5px;border-radius:3px;}
pre{background:#f3ecdf;padding:14px 16px;border-radius:4px;overflow:auto;font-size:14px;line-height:1.6;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px dotted #cdbb9c;margin:34px 0;}
```

---

## kraft · 牛皮纸

- English：Kraft
- 别名：备忘、复盘、周报、内部笔记
- 适合：篇幅短、信息密的复盘和备忘
- 设计依据：牛皮纸信封的颜色；字号略小、间距紧凑、双线标题

```css
/* ky-typeset/kraft · © 2026 Kiren Yi · KYTS-kraft-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:15px;line-height:1.8;color:#3a3128;background:#efe6d6;max-width:640px;margin:0 auto;padding:30px 20px;}
h1{font-size:22px;line-height:1.4;font-weight:700;color:#2e261e;margin:4px 0 22px;padding-bottom:10px;border-bottom:3px double #8c7356;}
h2{font-size:16px;line-height:1.5;font-weight:700;color:#5b4632;letter-spacing:0.08em;margin:30px 0 10px;}
h3{font-size:15px;line-height:1.55;font-weight:700;color:#3a3128;margin:20px 0 6px;}
p{margin:8px 0;}
blockquote{margin:16px 0;padding:10px 14px;background:#e6dac6;border-left:3px solid #8c7356;color:#4a3e32;}
ul{margin:8px 0;padding-left:20px;}
li{margin:4px 0;}
strong{font-weight:700;color:#2e261e;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;background:#e3d6bf;padding:1px 4px;border-radius:2px;}
pre{background:#e3d6bf;padding:12px 14px;overflow:auto;font-size:13px;line-height:1.6;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px dashed #a8916f;margin:26px 0;}
```

---

## poster · 告示

- English：Poster
- 别名：活动、公告、招募、发布
- 适合：活动通知、招募、重要公告
- 设计依据：贴在墙上的告示；大标题、深色章节条、黑框重点

```css
/* ky-typeset/poster · © 2026 Kiren Yi · KYTS-poster-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.8;color:#2a211a;background:#f4ede2;max-width:660px;margin:0 auto;padding:34px 22px;}
h1{font-size:33px;line-height:1.25;font-weight:900;color:#2a211a;text-align:center;margin:10px 0 20px;}
h2{font-size:18px;line-height:1.5;font-weight:700;color:#faf8f4;background:#2a211a;text-align:center;margin:40px 0 16px;padding:8px 0;border-radius:2px;}
h3{font-size:16px;line-height:1.55;font-weight:700;color:#b5542c;margin:24px 0 8px;}
p{margin:12px 0;}
blockquote{margin:24px 0;padding:16px 18px;background:#faf8f4;border:2px solid #2a211a;border-radius:2px;text-align:center;font-weight:600;color:#2a211a;}
ul{margin:12px 0;padding-left:20px;}
li{margin:6px 0;}
strong{font-weight:800;color:#b5542c;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#e9dfcf;padding:1px 5px;border-radius:2px;}
pre{background:#e9dfcf;padding:14px 16px;overflow:auto;font-size:14px;line-height:1.6;}
pre code{background:none;padding:0;}
hr{border:none;border-top:3px solid #2a211a;margin:34px 44%;}
```

---

## ink · 宣纸

- English：Ink
- 别名：水墨、国风、文人、文艺
- 适合：人文、哲思、引用感强的长文（如纳瓦尔类）
- 分组：人文
- 灵感：中文公众号「宣纸/留白」范式 + 传统阅读节奏（非抄某站模板）

```css
/* ky-typeset/ink · © 2026 Kiren Yi · KYTS-ink-2611 */
body{font-family:"Songti SC","Noto Serif CJK SC","PingFang SC","STSong",serif;font-size:16px;line-height:1.95;color:#2a2622;max-width:700px;margin:0 auto;padding:32px 24px;background:#f7f1e6;}
h1{font-size:26px;line-height:1.35;font-weight:700;margin:36px 0 28px;color:#1a1612;text-align:center;letter-spacing:0.06em;}
h1:after{content:"";display:block;width:36px;height:1px;background:#8b7355;margin:18px auto 0;}
h2{font-size:20px;line-height:1.45;font-weight:700;margin:46px 0 16px;color:#1a1612;text-align:center;}
h3{font-size:17px;line-height:1.5;font-weight:700;margin:30px 0 12px;color:#3d342c;}
p{margin:14px 0;line-height:1.95;text-align:justify;}
blockquote{margin:26px 24px;padding:0;border-left:0;color:#5c5044;font-size:15px;line-height:1.9;text-align:center;font-style:normal;}
blockquote:before{content:"「";color:#a0896c;font-size:22px;}
blockquote:after{content:"」";color:#a0896c;font-size:22px;}
ul{margin:14px 0;padding-left:22px;}
li{margin:8px 0;line-height:1.9;}
strong{font-weight:800;color:#1a1612;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:#ebe2d2;padding:2px 6px;border-radius:2px;font-size:14px;}
pre{background:#ebe2d2;padding:14px 16px;overflow:auto;font-size:14px;line-height:1.6;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px solid #c4b59a;margin:36px auto;width:28%;}
```

---

## cream · 奶刊

- English：Cream
- 别名：Newsletter、Substack感、订阅信、奶油底
- 适合：个人通讯、系列专栏、温和说理
- 分组：订阅
- 灵感：Substack / 邮件 newsletter 常见奶油底 + 强调色点缀

```css
/* ky-typeset/cream · © 2026 Kiren Yi · KYTS-cream-2611 */
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.86;color:#292524;max-width:680px;margin:0 auto;padding:30px 24px;background:#fffaf3;}
h1{font-size:27px;line-height:1.28;font-weight:800;margin:32px 0 10px;color:#1c1917;}
h1+p,h1+h2{/* spacing */;}
h2{font-size:19px;line-height:1.4;font-weight:800;margin:40px 0 12px;color:#1c1917;padding-bottom:8px;border-bottom:2px solid #fb923c;}
h3{font-size:17px;line-height:1.45;font-weight:750;margin:28px 0 10px;color:#44403c;}
p{margin:13px 0;line-height:1.86;}
blockquote{margin:22px 0;padding:14px 16px;background:#fff7ed;border-left:4px solid #ea580c;color:#44403c;}
ul{margin:12px 0;padding-left:22px;}
li{margin:7px 0;line-height:1.84;}
strong{font-weight:800;color:#c2410c;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:#ffedd5;color:#9a3412;padding:2px 6px;border-radius:4px;font-size:14px;}
pre{background:#ffedd5;color:#9a3412;padding:14px 16px;overflow:auto;font-size:14px;line-height:1.6;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px dashed #fdba74;margin:32px 0;}
```

---

## swiss · 网格

- English：Swiss Grid
- 别名：瑞士、Bauhaus、大留白、现代主义
- 适合：品牌感强、结构清晰的深度文
- 分组：设计
- 灵感：Swiss Style / 国际字体风格：大字号标题、克制色、明确层级

```css
/* ky-typeset/swiss · © 2026 Kiren Yi · KYTS-swiss-2611 */
body{font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue","PingFang SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.78;color:#0a0a0a;max-width:720px;margin:0 auto;padding:40px 28px;background:#fff;}
h1{font-size:32px;line-height:1.12;font-weight:800;margin:24px 0 28px;color:#0a0a0a;letter-spacing:-0.02em;}
h2{font-size:14px;line-height:1.4;font-weight:800;margin:48px 0 16px;color:#0a0a0a;text-transform:uppercase;letter-spacing:0.14em;padding-top:16px;border-top:1px solid #0a0a0a;}
h3{font-size:18px;line-height:1.4;font-weight:700;margin:28px 0 10px;color:#0a0a0a;}
p{margin:14px 0;line-height:1.82;max-width:38em;}
blockquote{margin:28px 0;padding:0 0 0 16px;border-left:2px solid #0a0a0a;color:#404040;font-size:15px;}
ul{margin:14px 0;padding-left:18px;}
li{margin:8px 0;line-height:1.8;}
strong{font-weight:800;color:#0a0a0a;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:#f4f4f5;padding:2px 6px;border-radius:0;font-size:13px;}
pre{background:#f4f4f5;padding:16px;overflow:auto;font-size:13px;line-height:1.55;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px solid #0a0a0a;margin:40px 0;width:48px;}
```

---

## night · 夜读

- English：Night Read
- 别名：暗色、夜间、深色模式
- 适合：夜读感、科技随笔、降低刺眼
- 分组：阅读
- 灵感：暗色阅读模式 / 代码编辑器夜色（注意公众号预览仍可能被外壳影响）

```css
/* ky-typeset/night · © 2026 Kiren Yi · KYTS-night-2611 */
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.86;color:#e4e4e7;max-width:720px;margin:0 auto;padding:28px 22px;background:#18181b;}
h1{font-size:26px;line-height:1.28;font-weight:800;margin:30px 0 22px;color:#fafafa;}
h2{font-size:19px;line-height:1.4;font-weight:800;margin:40px 0 12px;color:#fafafa;padding-left:12px;border-left:3px solid #a78bfa;}
h3{font-size:17px;line-height:1.45;font-weight:750;margin:28px 0 10px;color:#d4d4d8;}
p{margin:13px 0;line-height:1.86;color:#d4d4d8;}
blockquote{margin:20px 0;padding:14px 16px;background:#27272a;border-left:3px solid #a78bfa;color:#e4e4e7;}
ul{margin:12px 0;padding-left:22px;}
li{margin:7px 0;line-height:1.84;color:#d4d4d8;}
strong{font-weight:800;color:#f5f3ff;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:#27272a;color:#c4b5fd;padding:2px 6px;border-radius:4px;font-size:14px;}
pre{background:#27272a;color:#c4b5fd;padding:14px 16px;overflow:auto;font-size:14px;line-height:1.6;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px solid #3f3f46;margin:32px 0;}
```

---

## fresh · 青芽

- English：Fresh
- 别名：小清新、浅绿、生活感、柔和
- 适合：生活、成长、轻量观点、女向/生活方式号
- 分组：生活
- 灵感：国内公众号常见「小清新」浅绿留白（秀米类模板气质，自研色板）

```css
/* ky-typeset/fresh · © 2026 Kiren Yi · KYTS-fresh-2611 */
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.88;color:#334155;max-width:720px;margin:0 auto;padding:28px 22px;background:#f7fdf9;}
h1{font-size:25px;line-height:1.32;font-weight:800;margin:30px 0 20px;color:#14532d;text-align:center;}
h2{font-size:19px;line-height:1.42;font-weight:800;margin:38px 0 12px;color:#166534;padding:8px 12px;background:#dcfce7;border-radius:8px;}
h3{font-size:17px;line-height:1.5;font-weight:750;margin:26px 0 10px;color:#15803d;}
p{margin:12px 0;line-height:1.88;}
blockquote{margin:20px 0;padding:14px 16px;background:#fff;border:1px solid #bbf7d0;border-radius:10px;color:#3f6212;box-shadow:0 1px 0 #dcfce7;}
ul{margin:12px 0;padding-left:0;list-style:none;}
li{margin:8px 0;padding:9px 12px;background:#fff;border-radius:8px;border:1px solid #e2e8f0;line-height:1.8;}
li:before{content:"🌱 ";}
strong{font-weight:800;color:#166534;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:#dcfce7;color:#14532d;padding:2px 6px;border-radius:4px;font-size:14px;}
pre{background:#dcfce7;color:#14532d;padding:14px 16px;overflow:auto;font-size:14px;line-height:1.6;border-radius:8px;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1px dashed #86efac;margin:30px auto;width:50%;}
```

---

## studio · 工作室

- English：Studio
- 别名：清单、干货、标签、方法论
- 适合：清单体、干货、方法论、AI 工作流——一条一条往下扫的文章
- 设计依据：设计工作室的标签贴：黑底白字小标题像一张张标签，重点用红色粗下划线

```css
/* ky-typeset/studio · © 2026 Kiren Yi · KYTS-studio-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.85;color:#222;background:#f6f4ef;max-width:680px;margin:0 auto;padding:36px 22px;}
h1{font-size:30px;line-height:1.28;font-weight:900;color:#111;letter-spacing:-0.02em;margin:6px 0 26px;}
h2{display:inline-block;font-size:17px;line-height:1.5;font-weight:800;color:#f6f4ef;background:#111;margin:44px 0 10px;padding:6px 14px;}
h3{font-size:16px;line-height:1.55;font-weight:800;color:#111;margin:26px 0 8px;}
p{margin:10px 0;}
blockquote{margin:24px 0;padding:16px 18px;background:#fff;border:2px solid #111;color:#111;font-weight:500;}
ul{margin:12px 0;padding-left:20px;}
ol{margin:12px 0;padding-left:22px;}
li{margin:7px 0;}
strong{font-weight:800;color:#111;border-bottom:3px solid #d23c22;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#e8e4db;padding:1px 5px;}
pre{background:#111;color:#f6f4ef;padding:14px 16px;overflow:auto;font-size:13px;line-height:1.65;}
pre code{background:none;color:inherit;padding:0;}
hr{border:none;border-top:2px solid #111;margin:40px 0;}
```

---

## brutal · 粗野

- English：Brutal
- 别名：新粗野主义、贴纸、张扬
- 适合：有态度的观点、工具测评、想让人停下来的内容
- 设计依据：Neo-brutalism：黄黑撞色、粗黑框加实心投影，像贴在页面上的贴纸
- 注意：投影在部分编辑器粘贴后可能丢失，粘贴后预览确认

```css
/* ky-typeset/brutal · © 2026 Kiren Yi · KYTS-brutal-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.85;color:#111;background:#fffdf6;max-width:680px;margin:0 auto;padding:36px 22px;}
h1{font-size:28px;line-height:1.35;font-weight:900;color:#111;background:#ffd84d;border:3px solid #111;box-shadow:6px 6px 0 #111;margin:6px 6px 34px 0;padding:16px 18px;}
h2{display:inline-block;font-size:18px;line-height:1.5;font-weight:900;color:#111;background:#fff;border:2.5px solid #111;box-shadow:4px 4px 0 #111;margin:42px 0 14px;padding:6px 14px;}
h3{font-size:16px;line-height:1.55;font-weight:900;color:#111;margin:26px 0 8px;}
p{margin:10px 0;}
blockquote{margin:24px 6px 28px 0;padding:14px 18px;background:#ffd84d;border:2.5px solid #111;box-shadow:5px 5px 0 #111;color:#111;font-weight:600;}
ul{margin:12px 0;padding-left:20px;}
ol{margin:12px 0;padding-left:22px;}
li{margin:7px 0;}
strong{font-weight:900;color:#111;background:#ffd84d;padding:0 3px;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#fff;border:1.5px solid #111;padding:0 4px;}
pre{background:#111;color:#ffd84d;padding:14px 16px;overflow:auto;font-size:13px;line-height:1.65;}
pre code{background:none;border:none;color:inherit;padding:0;}
hr{border:none;border-top:3px solid #111;margin:40px 0;}
```

---

## bubble · 对话

- English：Bubble
- 别名：聊天、气泡、口语、问答
- 适合：口语化的文章、问答、像在跟读者聊天的内容
- 设计依据：聊天界面：小标题是陶土红气泡，引言是对方回的一条白色消息
- 注意：投影在部分编辑器粘贴后可能丢失，粘贴后预览确认

```css
/* ky-typeset/bubble · © 2026 Kiren Yi · KYTS-bubble-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.85;color:#2b2723;background:#f4efe7;max-width:660px;margin:0 auto;padding:34px 20px;}
h1{font-size:26px;line-height:1.4;font-weight:800;color:#2b2723;margin:6px 0 28px;}
h2{display:inline-block;font-size:17px;line-height:1.5;font-weight:700;color:#fff;background:#c0582f;border-radius:18px 18px 18px 4px;margin:40px 0 12px;padding:9px 16px;}
h3{font-size:16px;line-height:1.55;font-weight:700;color:#c0582f;margin:24px 0 8px;}
p{margin:10px 0;}
blockquote{margin:22px 0 22px 12%;padding:14px 18px;background:#fff;border-radius:18px 18px 4px 18px;color:#3d3832;box-shadow:0 1px 2px rgba(60,40,20,.08);}
ul{margin:12px 0;padding-left:20px;}
ol{margin:12px 0;padding-left:22px;}
li{margin:7px 0;}
strong{font-weight:700;color:#c0582f;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#e9e1d4;padding:1px 6px;border-radius:6px;}
pre{background:#fff;padding:14px 16px;border-radius:14px;overflow:auto;font-size:13px;line-height:1.65;}
pre code{background:none;padding:0;}
hr{border:none;border-top:2px dotted #cdbfac;margin:36px 30%;}
```

---

## retro · 复古

- English：Retro
- 别名：70 年代、怀旧、三色条纹
- 适合：生活方式、个人故事、带怀旧感的内容
- 设计依据：70 年代海报：芥末黄、陶土红、橄榄绿三色条纹，胶囊小标题

```css
/* ky-typeset/retro · © 2026 Kiren Yi · KYTS-retro-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.85;color:#3b2a1e;background:#f4e9d3;max-width:670px;margin:0 auto;padding:36px 22px;}
h1{font-size:29px;line-height:1.3;font-weight:900;color:#3b2a1e;margin:6px 0 44px;padding-bottom:14px;border-bottom:6px solid #c4572e;box-shadow:0 6px 0 #e0a526,0 12px 0 #6b7a3a;}
h2{display:inline-block;font-size:17px;line-height:1.5;font-weight:800;color:#f4e9d3;background:#c4572e;border-radius:999px;margin:42px 0 12px;padding:6px 18px;}
h3{font-size:16px;line-height:1.55;font-weight:800;color:#6b7a3a;margin:26px 0 8px;}
p{margin:11px 0;}
blockquote{margin:24px 0;padding:14px 18px;background:#ecd9a8;border-radius:14px;color:#3b2a1e;}
ul{margin:12px 0;padding-left:20px;}
ol{margin:12px 0;padding-left:22px;}
li{margin:7px 0;}
strong{font-weight:800;color:#c4572e;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#e8d9b8;padding:1px 6px;border-radius:5px;}
pre{background:#3b2a1e;color:#f4e9d3;padding:14px 16px;border-radius:10px;overflow:auto;font-size:13px;line-height:1.65;}
pre code{background:none;color:inherit;padding:0;}
hr{border:none;border-top:6px solid #e0a526;margin:40px 40%;border-radius:3px;}
```

---

## capsule · 胶囊

- English：Capsule
- 别名：请柬、精致、居中、酒红
- 适合：人文、品牌感强、仪式感的长文
- 设计依据：请柬与菜单：酒红宋体、居中描边胶囊小标题、圆角引言框

```css
/* ky-typeset/capsule · © 2026 Kiren Yi · KYTS-capsule-2611 */
body{font-family:"Noto Serif SC","Songti SC","STSong",serif;font-size:16px;line-height:1.95;color:#2e2629;background:#faf6f3;max-width:640px;margin:0 auto;padding:40px 22px;}
h1{font-size:27px;line-height:1.4;font-weight:900;color:#5e1f2d;text-align:center;letter-spacing:0.04em;margin:10px 0 32px;}
h2{display:table;font-size:17px;line-height:1.5;font-weight:700;color:#5e1f2d;text-align:center;border:1.5px solid #5e1f2d;border-radius:999px;margin:48px auto 16px;padding:5px 22px;}
h3{font-size:16px;line-height:1.55;font-weight:700;color:#5e1f2d;text-align:center;margin:28px 0 8px;}
p{margin:13px 0;}
blockquote{margin:26px 4%;padding:16px 20px;border:1px solid #d9c2c6;border-radius:24px;text-align:center;color:#5e1f2d;font-size:15px;}
ul{margin:13px 0;padding-left:22px;}
ol{margin:13px 0;padding-left:24px;}
li{margin:8px 0;}
strong{font-weight:700;color:#5e1f2d;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;background:#f1e8e6;padding:1px 6px;border-radius:999px;}
pre{background:#f1e8e6;padding:14px 18px;border-radius:16px;overflow:auto;font-size:13px;line-height:1.65;}
pre code{background:none;padding:0;}
hr{border:none;border-top:1.5px solid #5e1f2d;margin:40px 46%;}
```

---

## scrapbook · 手账

- English：Scrapbook
- 别名：手帐、纸胶带、便签、生活记录
- 适合：生活记录、成长复盘、轻松的个人分享
- 设计依据：手账本：小标题像斜贴的纸胶带，引言像一张歪贴的黄便签，虚线分隔
- 注意：小标题和便签的轻微旋转在部分编辑器（含公众号）粘贴后可能被拉正，颜色与结构不受影响

```css
/* ky-typeset/scrapbook · © 2026 Kiren Yi · KYTS-scrapbook-2611 */
body{font-family:"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.85;color:#33302b;background:#f7f3ea;max-width:660px;margin:0 auto;padding:36px 22px;}
h1{font-size:27px;line-height:1.4;font-weight:800;color:#2a2622;margin:6px 0 30px;padding-bottom:10px;border-bottom:2px dashed #b9a98d;}
h2{display:inline-block;font-size:17px;line-height:1.5;font-weight:800;color:#2a2622;background:rgba(150,190,170,.45);transform:rotate(-1.2deg);margin:42px 0 12px;padding:5px 14px;}
h3{font-size:16px;line-height:1.55;font-weight:700;color:#7d6a4a;margin:24px 0 8px;}
p{margin:11px 0;}
blockquote{margin:26px 4px;padding:16px 18px;background:#fff3b8;transform:rotate(.8deg);box-shadow:2px 4px 10px rgba(80,60,20,.15);color:#3d3524;}
ul{margin:12px 0;padding-left:20px;}
ol{margin:12px 0;padding-left:22px;}
li{margin:7px 0;}
strong{font-weight:800;color:#2a2622;border-bottom:2px dashed #e07a5f;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;background:#ece5d6;padding:1px 6px;border-radius:3px;}
pre{background:#fff;border:1.5px dashed #b9a98d;padding:14px 16px;overflow:auto;font-size:13px;line-height:1.65;}
pre code{background:none;padding:0;}
hr{border:none;border-top:2px dashed #b9a98d;margin:38px 0;}
```
