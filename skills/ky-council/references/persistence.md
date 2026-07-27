# 决策沉淀协议

## 状态根目录

开始任何读取或写入前，运行：

```bash
python3 "$SKILL_ROOT/scripts/state_root.py" --init --json
```

返回路径是本次操作唯一允许的状态根目录。不能初始化、目录不存在或实际写入失败时停止保存并说明原因；不得把当前工作目录当作备用位置。

默认目录为 `~/.ky-council`。用户可显式设置 `KY_COUNCIL_HOME`，但它必须展开为绝对路径。

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

- 决策总览：`council-index.md`
- 决策记录：`decisions/`
- 复盘后形成的可复用判断：`notes/`

`council-index.md` 保存 `active_decision_file`、`active_topic`、`active_advisors`、`last_checkpoint` 和 `next_action`，用于新聊天中通过“继续顾问会”恢复。它不保存当前聊天的房间活动状态。

## 稳定关联

- 决策编号使用 `DEC-YYYYMMDD-NNN`。
- 文件名使用 `DEC_YYYYMMDD_主题.md`，冲突时递增版本，不覆盖已有文件。
- 不把设备绝对路径写入记录。

## 结果优先

事前推演不是成熟知识。只有复盘真实结果后，才考虑把判断整理成可复用笔记。

每完成一轮顾问分析与综合判断就更新检查点，不依赖用户主动说“保存”或“结束顾问会”。
