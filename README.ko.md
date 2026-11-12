<div align="center">

[简体中文](./README.md) | [English](./README.en.md) | [日本語](./README.ja.md) | [Español](./README.es.md) | **한국어**

# kyskills

**Kiren Yi의 Agent Skills: 더 명확하게 생각하고, 더 빠르게 배우고, 아이디어를 콘텐츠로.**

스킬마다 `SKILL.md` 하나. Claude Code, Codex, Gemini CLI, Cursor, GitHub Copilot, OpenCode, Kiro 등 Agent Skills를 지원하는 도구에서 사용할 수 있습니다.

</div>

## 스킬

명령어는 모든 언어에서 같습니다. 스킬은 당신이 쓴 언어로 답합니다.

### 생각과 학습

| 명령어 | 해 주는 일 |
|---|---|
| [`/ky`](./skills/ky/) | 뭐가 문제인지 모르겠고 그냥 막막할 때 쓰세요. 먼저 이야기를 듣고, 어떤 종류의 문제인지 하나만 추측한 뒤 맞는 스킬로 연결합니다. 다른 스킬을 미리 알 필요는 없습니다. |
| [`/ky-think`](./skills/ky-think/) | 어려운 문제를 끝까지 생각합니다: 명확한 판단을 내리고, 제대로 이해하고, 자신의 관점을 검증합니다. |
| [`/ky-mirror`](./skills/ky-mirror/) | 요청이 사실은 더 어려운 문제를 피해 가는 방법일 때 이를 알아차리고, 피하고 있는 것을 짚어 주며, 그쪽으로 가는 작은 한 걸음을 제시합니다. |
| [`/ky-learn`](./skills/ky-learn/) | AI 튜터: 분야의 지도를 그려 주고, 설명하기 전에 먼저 묻고, 정말 이해했는지 확인하며, 지난번에 멈춘 곳에서 이어 갑니다. |
| [`/ky-council`](./skills/ky-council/) | 중요한 결정을 몇 가지 핵심 관점(고객에게 주는 가치, 어떻게 실패할 수 있는지, 더 단순하게 할 수 있는지 등)에서 검토하고, 결정을 기록하고, 나중에 결과를 돌아봅니다. |

### 글쓰기와 발행

| 명령어 | 해 주는 일 |
|---|---|
| [`/ky-write`](./skills/ky-write/) | 중국어 의견 글과 토킹헤드 영상 대본을 쓰고 다듬습니다: AI 같은 군더더기를 빼고, 논증을 점검하고, 영어 자막도 만듭니다. |
| [`/ky-follow`](./skills/ky-follow/) | 글이나 영상 대본에서 독자·시청자가 흐름을 놓치는 곳을 찾습니다: 독자가 무엇을 아는지 정하고, 처음 보는 독자처럼 읽게 한 뒤, 논증의 각 단계를 대조해 메워야 할 단절과 의도한 문턱을 구분합니다. 수정은 최소한만 제안합니다. |
| [`/ky-typeset`](./skills/ky-typeset/) | Markdown을 스타일이 적용된 HTML로 조판해 WeChat, Substack, Medium, 이메일 등 편집기에 바로 붙여 넣을 수 있게 합니다. 19가지 스타일. |
| [`/ky-xdraft`](./skills/ky-xdraft/) | 로컬 Markdown 파일을 X(트위터) 긴 글 초안으로 만듭니다. 기본적으로 게시하지 않습니다. |

### 비주얼과 영상

| 명령어 | 해 주는 일 |
|---|---|
| [`/ky-brand`](./skills/ky-brand/) | 표지, 인용 카드, 포스터, 슬라이드를 일관된 스타일로 만들고 당신의 이름으로 서명합니다. |
| [`/ky-video`](./skills/ky-video/) | 토킹헤드 원본 영상을 코드로 완성본으로 만듭니다: 애니메이션, 자막, 효과음, 오프닝 훅, 표지, 발행 패키지. |

### 자료 수집

| 명령어 | 해 주는 일 |
|---|---|
| [`/ky-x`](./skills/ky-x/) | X의 공개 게시물을 컴퓨터에 보관합니다(Markdown + JSONL). |
| [`/ky-dy`](./skills/ky-dy/) | Douyin 공개 영상을 메타데이터와 함께 내려받습니다. |
| [`/ky-xhs`](./skills/ky-xhs/) | 샤오훙수(RED) 공개 노트를 가져옵니다: 텍스트, 이미지, 영상. |
| [`/ky-sph`](./skills/ky-sph/) | WeChat 채널과 공식 계정 자료를 라이브러리로 정리합니다. |

## 설치

에이전트에게 이렇게 보내세요:

```text
Install the skills from https://github.com/KirenYi/kyskills
```

또는 터미널에서 실행하세요(macOS / Linux):

```bash
curl -fsSL https://github.com/KirenYi/kyskills/raw/main/install.sh | bash
```

Windows에서는 저장소를 `git clone` 한 뒤 Git Bash 또는 WSL에서 `./scripts/install-links.sh`를 실행하세요.

설치 후 에이전트를 다시 시작하세요.

## 지원 도구

설치 프로그램은 컴퓨터에 설치된 아래 각 도구에 모든 스킬을 연결합니다. 저장소를 업데이트하면 모든 도구가 한 번에 업데이트됩니다.

| 도구 | 스킬 폴더 |
|---|---|
| 공통 표준 (Codex, Gemini CLI, GitHub Copilot, Cursor, OpenCode, Goose, Amp 등) | `~/.agents/skills` |
| Claude Code | `~/.claude/skills` |
| Codex | `~/.codex/skills` |
| Gemini CLI | `~/.gemini/skills` |
| GitHub Copilot | `~/.copilot/skills` |
| Cursor | `~/.cursor/skills` |
| OpenCode | `~/.config/opencode/skills` |
| Kiro | `~/.kiro/skills` |
| Windsurf | `~/.codeium/windsurf/skills` |
| Trae / Trae CN | `~/.trae/skills`, `~/.trae-cn/skills` |
| Qwen Code | `~/.qwen/skills` |
| Kimi | `~/.kimi/skills` |
| Grok | `~/.grok/skills` |
| Goose | `~/.config/goose/skills` |
| Augment, Continue, OpenHands, CodeBuddy, Lingma, iFlow, OpenClaw | 각 도구의 `skills` 폴더 |

## 처음 사용할 때

몇몇 스킬은 한 번만 묻고, 답을 `~/.config/kyskills/`에 기억합니다:

- **ky-learn, ky-council**: 학습 진도와 결정 기록을 저장할 폴더. 기존 Obsidian 볼트를 포함해 어떤 폴더든 됩니다.
- **ky-follow**: 독자 설정(처음 보는 시청자와 목표 독자가 무엇을 알고 무엇을 믿는지). 다음 점검 때 그대로 씁니다.
- **ky-brand**: 이미지에 서명할 이름과 웹사이트(서명 없음도 가능).
- **ky-brand, ky-video**: 오픈소스 글꼴 두 개(Noto Serif SC, Noto Sans SC, 약 40MB) 다운로드 동의.

## 요구 사항

- macOS, Linux 또는 Windows
- 스크립트가 있는 스킬은 Python 3.10+
- ky-video는 ffmpeg, Node 18+, openai-whisper, ky-brand는 Google Chrome 또는 Chromium도 필요합니다

## 제안과 버그

[이슈](https://github.com/KirenYi/kyskills/issues)를 열어 주세요. 아이디어, 문제, 실제 사용 후기를 모두 환영합니다. 좋은 제안은 다음 버전에 반영됩니다.

## 책임 있는 사용

- 공개되었거나 당신 소유인 콘텐츠만 처리하고, 각 플랫폼의 약관과 현지 법률을 지키세요.
- 수집 스킬은 플랫폼 정책에 따라 작동하지 않을 수 있으며, 각 스킬에 대안이 안내되어 있습니다.
- 당신의 데이터(아카이브, 쿠키, 노트)는 당신의 컴퓨터에만 남습니다. Git에 커밋하지 마세요.

## 라이선스

© 2026 Kiren Yi. All rights reserved.

- **할 수 있는 것**: 스킬을 무료로 설치하고 사용할 수 있습니다. 스킬로 만든 결과물은 당신의 것이며, 유료나 광고가 붙는 작업에도 쓸 수 있습니다. 자신의 컴퓨터에서 자신이 쓰기 위해 수정할 수 있습니다.
- **서면 허가 없이 할 수 없는 것**: 재배포, 수정본 공개, 판매, 다른 제품이나 강좌에 포함, AI 모델 학습에 사용.

전체 약관: [LICENSE](./LICENSE) (중국어판이 우선합니다). 상업적 라이선스: kirenyi16@gmail.com

## 작성자 소개

**Kiren Yi (知羿Kiren)**

- 웹사이트: [kirenyi.com](https://kirenyi.com)
- YouTube: **Kiren Yi**
- Douyin · WeChat 채널 · 샤오훙수: **知羿Kiren**
- 이메일: kirenyi16@gmail.com
