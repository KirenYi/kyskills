<div align="center">

[简体中文](./README.md) | [English](./README.en.md) | **日本語** | [Español](./README.es.md) | [한국어](./README.ko.md)

# kyskills

**Kiren Yi の Agent Skills：より明確に考え、より速く学び、アイデアをコンテンツにする。**

各スキルは 1 つの `SKILL.md` です。Claude Code、Codex、Gemini CLI、Cursor、GitHub Copilot、OpenCode、Kiro など、Agent Skills に対応したツールで使えます。

</div>

## スキル

コマンドはどの言語でも同じです。あなたが書いた言語でスキルが答えます。

### 考える・学ぶ

| コマンド | できること |
|---|---|
| [`/ky-think`](./skills/ky-think/) | 難しい問題を考え抜く：明確な判断を出す、本当に理解する、自分の意見を検証する。 |
| [`/ky-mirror`](./skills/ky-mirror/) | 依頼そのものが、もっと向き合いにくい問題を避ける手段になっていないかに気づき、避けているものを言葉にして、そこへ向かう小さな一歩を示す。 |
| [`/ky-learn`](./skills/ky-learn/) | AI チューター：分野の地図を描き、説明の前に問いかけ、本当に理解したかを確かめ、前回の続きから再開する。 |
| [`/ky-council`](./skills/ky-council/) | 重要な決断に 2〜3 人の思想家の視点を取り入れ、決定を記録し、あとで結果を振り返る。 |

### 書く・公開する

| コマンド | できること |
|---|---|
| [`/ky-write`](./skills/ky-write/) | 中国語の意見記事やトーク動画の台本を執筆・推敲：AI っぽい言い回しを削り、論証を点検し、英語字幕も作れる。 |
| [`/ky-typeset`](./skills/ky-typeset/) | Markdown をスタイル付き HTML に組版し、WeChat、Substack、Medium、メールなどのエディタにそのまま貼り付けられる。19 スタイル。 |
| [`/ky-xdraft`](./skills/ky-xdraft/) | ローカルの Markdown を X（Twitter）の長文下書きにする。既定では投稿しない。 |

### ビジュアル・動画

| コマンド | できること |
|---|---|
| [`/ky-brand`](./skills/ky-brand/) | カバー画像、引用カード、ポスター、スライドを統一スタイルで作成し、あなた自身の名前で署名する。 |
| [`/ky-video`](./skills/ky-video/) | トーク動画の素材をコードで完成動画に：アニメーション、字幕、効果音、冒頭のフック、カバー、公開用パッケージ。 |

### 素材を集める

| コマンド | できること |
|---|---|
| [`/ky-x`](./skills/ky-x/) | X の公開投稿をローカルに保存（Markdown + JSONL）。 |
| [`/ky-dy`](./skills/ky-dy/) | Douyin の公開動画をメタデータ付きでダウンロード。 |
| [`/ky-xhs`](./skills/ky-xhs/) | 小紅書（RED）の公開ノートを取得：テキスト、画像、動画。 |
| [`/ky-sph`](./skills/ky-sph/) | WeChat チャンネルと公式アカウントの素材をライブラリに整理。 |

## インストール

エージェントにこう送ってください：

```text
Install the skills from https://github.com/KirenYi/kyskills
```

またはターミナルで実行（macOS / Linux）：

```bash
curl -fsSL https://github.com/KirenYi/kyskills/raw/main/install.sh | bash
```

Windows では、リポジトリを `git clone` して Git Bash または WSL で `./scripts/install-links.sh` を実行します。

インストール後、エージェントを再起動してください。

## 対応ツール

インストーラーは、お使いのコンピューターにインストールされている下記の各ツールにスキルをリンクします。リポジトリを更新すれば、すべてのツールが同時に更新されます。

| ツール | スキルフォルダ |
|---|---|
| 共通規格（Codex、Gemini CLI、GitHub Copilot、Cursor、OpenCode、Goose、Amp など） | `~/.agents/skills` |
| Claude Code | `~/.claude/skills` |
| Codex | `~/.codex/skills` |
| Gemini CLI | `~/.gemini/skills` |
| GitHub Copilot | `~/.copilot/skills` |
| Cursor | `~/.cursor/skills` |
| OpenCode | `~/.config/opencode/skills` |
| Kiro | `~/.kiro/skills` |
| Windsurf | `~/.codeium/windsurf/skills` |
| Trae / Trae CN | `~/.trae/skills`、`~/.trae-cn/skills` |
| Qwen Code | `~/.qwen/skills` |
| Kimi | `~/.kimi/skills` |
| Grok | `~/.grok/skills` |
| Goose | `~/.config/goose/skills` |
| Augment、Continue、OpenHands、CodeBuddy、Lingma、iFlow、OpenClaw | 各ツールの `skills` フォルダ |

## 初回の利用

いくつかのスキルは一度だけ質問し、答えを `~/.config/kyskills/` に記憶します：

- **ky-learn、ky-council**：学習の進捗と決定記録の保存先。既存の Obsidian ボールトを含め、どのフォルダでも構いません。
- **ky-brand**：画像に署名する名前とウェブサイト（署名なしも可）。
- **ky-brand、ky-video**：2 つのオープンソースフォント（Noto Serif SC、Noto Sans SC、約 40 MB）をダウンロードしてよいか。

## 動作環境

- macOS、Linux、Windows
- スクリプト付きスキルには Python 3.10+
- ky-video には ffmpeg、Node 18+、openai-whisper、ky-brand には Google Chrome または Chromium も必要

## 提案・不具合

[Issue](https://github.com/KirenYi/kyskills/issues) を作成してください。アイデア、問題、実際に使ったフィードバックを歓迎します。よい提案は次のバージョンに取り入れます。

## 責任ある利用

- 公開されている、またはあなた自身のコンテンツだけを扱い、各プラットフォームの規約と現地の法律を守ってください。
- 収集系スキルはプラットフォームの方針に左右され、使えなくなることがあります。各スキルに代替手段を記載しています。
- あなたのデータ（アーカイブ、Cookie、ノート）はあなたのコンピューターに残ります。Git にコミットしないでください。

## ライセンス

© 2026 Kiren Yi. All rights reserved.

- **できること**：スキルを無料でインストール・利用できます。スキルで作ったものはあなたのもので、有料や広告付きの作品にも使えます。自分のコンピューター上で、自分用に改変できます。
- **書面の許可なくできないこと**：再配布、改変版の公開、販売、他の製品や講座への同梱、AI モデルの学習への利用。

全文は [LICENSE](./LICENSE)（中国語版が優先）。商用ライセンス：kirenyi16@gmail.com

## 作者について

**Kiren Yi（知羿Kiren）**

- ウェブサイト：[kirenyi.com](https://kirenyi.com)
- YouTube：**Kiren Yi**
- Douyin · WeChat チャンネル · 小紅書：**知羿Kiren**
- メール：kirenyi16@gmail.com
