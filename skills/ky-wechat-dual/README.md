# ky-wechat-dual

在 Windows 上创建一个“微信双开”快捷方式，一次启动两个腾讯官方微信窗口。

## 特点

- 自动发现官方 `Weixin.exe` / `WeChat.exe`
- 同时核验腾讯版本信息和 Authenticode 数字签名
- 快捷方式不依赖额外 VBS 或批处理文件
- 不修改、不注入、不重新打包微信客户端
- 创建后立即核验目标、参数、工作目录与图标

## 环境

- Windows 10 / 11
- Windows PowerShell 5.1 或更高版本
- 已安装腾讯官方微信桌面客户端

## 使用

Agent 调用：

```text
/ky-wechat-dual
```

也可直接运行：

```powershell
powershell -NoProfile -File ".\scripts\install_dual_launcher.ps1"
```

指定官方客户端路径：

```powershell
powershell -NoProfile -File ".\scripts\install_dual_launcher.ps1" -WeChatPath "C:\path\to\Weixin.exe"
```

仅在确实需要时创建开机启动入口：

```powershell
powershell -NoProfile -File ".\scripts\install_dual_launcher.ps1" -Destination Startup
```

## 注意

- 脚本默认只创建或修复图标，不会主动启动微信。
- 扫码、密码及手机端确认必须由用户本人完成。
- 本 Skill 不隶属于腾讯，也不包含或分发微信软件。
- 平台风控无法保证为零；不要与第三方多开、补丁、自动营销或群控工具混用。
