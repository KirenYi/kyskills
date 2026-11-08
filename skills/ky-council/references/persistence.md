# 决策沉淀协议

开始任何读取或写入前，运行 `scripts/notes_root.py`。返回路径是本次操作唯一允许的笔记库。还没设置时问用户一次（见 `SKILL.md`）；不能写入时停止保存并说明原因；不得把当前工作目录当作备用位置。

## 什么时候创建决策记录

同时接近以下条件时才创建：

- 存在两个以上真实选项。
- 选择会影响时间、金钱、关系、业务或长期方向。
- 用户准备采取行动。
- 未来可以观察结果并复盘。

普通建议、情绪安慰、低成本可逆选择默认不建文件。

## 决策记录生命周期

`open → decided → acting → reviewed → closed`

1. `open`：问题和选项仍在澄清。
2. `decided`：用户已经选择。
3. `acting`：正在执行并收集证据。
4. `reviewed`：已比较预期与结果。
5. `closed`：行动完成，结论已沉淀或明确废弃。

## 文件去向

- 决策总览：`30_MOCs/MOC_AI决策.md`
- 决策记录：`20_Cards/27_Decision_Records/`
- 成熟判断：`20_Cards/22_Atomic_Cards/`
- 可复用方法：`20_Cards/25_Method_Cards/`
- 重要对话摘要：`10_Source_Notes/15_Conversations/council/`
- 内容机会：经用户确认后记成内容选题

决策总览保存 `active_decision_id`、`active_topic`、`active_advisors`、`last_checkpoint` 和 `next_action`，用于新聊天中通过“继续顾问会”恢复。它不保存当前聊天的房间活动状态。

## 稳定关联

- 决策编号使用 `DEC-YYYYMMDD-NNN`。
- 文件名使用 `DEC_YYYYMMDD_主题.md`，冲突时递增版本，不覆盖已有文件。
- 相关内容使用 `used_in` 记录 `content_id`。
- 不使用跨设备绝对路径或跨 Vault wikilink 作为唯一关联，也不把脚本运行时返回的绝对路径写入记录。

## 结果优先

事前推演不是成熟知识。只有复盘真实结果后，才考虑把决策中的判断升级为成熟 Atomic 或 Method Card。

每完成一轮顾问分析与综合判断就更新检查点，不依赖用户主动说“保存”或“结束顾问会”。
