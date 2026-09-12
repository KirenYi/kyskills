---
name: ky-wechat-dual
description: |
  在 Windows 上创建、修复或核验官方微信双开桌面快捷方式。
  触发：/ky-wechat-dual、「微信双开」「微信双开图标」「修复微信双开」
---

# ky-wechat-dual · 微信双开

**核心：腾讯官方微信客户端 → 一个可重复使用的双开快捷方式。**

`SKILL_ROOT` = 本文件所在目录。

## 流程

1. 仅询问可行性或账号风险时，先回答，不改电脑。
2. 用户要求创建或修复图标时，执行：

```powershell
powershell -NoProfile -File "<SKILL_ROOT>\scripts\install_dual_launcher.ps1"
```

3. 脚本会自动寻找 `Weixin.exe` / `WeChat.exe`，并核验腾讯版本信息与有效数字签名。
4. 自动发现失败或发现多个官方安装时，让用户选择后再传入绝对路径：

```powershell
powershell -NoProfile -File "<SKILL_ROOT>\scripts\install_dual_launcher.ps1" -WeChatPath "C:\path\to\Weixin.exe"
```

5. 以脚本返回的 `InstalledAndValidated` 结果作为验收；不要为了测试而启动快捷方式。微信已运行时，测试可能额外生成两个窗口。
6. 只有用户明确要求开机自动双开时，才使用 `-Destination Startup`。默认只创建桌面图标。
7. 扫码、手机确认、密码及其他登录操作全部交给用户本人。

## 安全边界

- 只启动腾讯有效签名的官方客户端；不下载或分发微信本体。
- 不安装多开助手、魔改版、防撤回补丁、DLL 注入器、模拟器、沙箱或群控工具。
- 不修改微信 EXE、DLL、内存、数据目录、更新机制或安全设置。
- 不承诺账号风控为零。说明本方式不改客户端，风险明显低于第三方多开工具，但最终处置权属于腾讯。
- 桌面图标仍需在重启后双击一次；`Startup` 是单独且必须明确授权的选项。
- 图标名称只能区分普通入口与双开入口，不能给已登录账号或运行窗口分别改名。
- 同名快捷方式若不是本 Skill 创建的，脚本默认拒绝覆盖；仅在用户明确同意后使用 `-Force`。

## 完成

```markdown
## ky-wechat-dual | 快捷方式路径 | 微信版本 | Desktop/Startup
```
