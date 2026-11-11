# 说明

本仓库（kyskills）中的 skill 文案与随附脚本由 **Kiren Yi / KY** 维护，按 [LICENSE](./LICENSE) 中的「保留所有权利 + 有限使用许可」条款发布（2026-11-04 前的版本为 MIT）。

- 不声称与任何平台官方有关联。  
- 不在 README 或 skill 中把第三方开源项目宣称为「本产品组件」或强制安装依赖。  
- 平台名称（X、抖音、小红书、微信等）仅为描述使用场景，商标归权利人所有。  

若你在个人环境中使用其他开源工具辅助工作，请自行遵守其许可证与免责声明；**那些工具不属于本仓库发行物**。

## 历史版本中的第三方内容

- `ky-mphtml` 0.1.0 至 0.2.1（2026-07-12 至 2026-11-03）中，`clean`、`essay`、`docs`、`pulse`、`ledger`、`lecture`、`memo`、`stage` 8 套样式改编自 dontbesilent 的 [dbskill](https://github.com/dontbesilent2025/dbskill)（`dbs-wechat-html`）。该部分内容按其当时的 CC BY-NC 4.0 授权使用，不属于本仓库 MIT 授权范围，不得商用。
- 自 0.3.0（2026-11-04）起，上述样式已全部移除，`ky-mphtml` 不再包含 dbskill 的内容。0.4.0 起更名为 `ky-typeset`。

## 思路来源与致谢

- `ky-write` 的「非共识写法」（`fei-gongshi.md`）思路受 dontbesilent 关于「正确的非共识」的分享启发（[X，2026-03-31](https://x.com/dontbesilent/status/2039034866961154329)）。0.3.1 起，表述、例子和流程由 KY 用自己的方法重新整理，不包含原文表述。
- `ky-council` 的「把多位思想家装进自己的工作系统当顾问」这个想法受 Jaden 的分享启发（[X，2026-03-18](https://x.com/Jaden_riku/status/2034136005113221142)）。顾问名单、路由规则、流程和写法由 KY 独立设计。
- `ky-learn` 借鉴学习科学中公开的通用研究结论（提取练习、间隔复习、先测后学、迁移、元认知校准），用自己的话重写。
- `ky-mirror` 借鉴拖延的情绪调节研究（Tim Pychyl、Fuschia Sirois）、接纳承诺疗法（ACT）和 Kegan 与 Lahey 的「变革免疫」方法的通用思路，用自己的话重写。

## 字体

`ky-brand`、`ky-video` 使用 Noto Serif SC / Noto Sans SC（SIL Open Font License 1.1）。字体文件不随本仓库分发，由 `scripts/fetch_fonts.py` 在用户同意后从 Google Fonts 官方仓库下载到 `~/.config/kyskills/fonts/`，许可证一并保存。

