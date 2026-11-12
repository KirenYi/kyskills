<div align="center">

[简体中文](./README.md) | [English](./README.en.md) | [日本語](./README.ja.md) | **Español** | [한국어](./README.ko.md)

# kyskills

**Agent Skills de Kiren Yi: piensa con claridad, aprende más rápido y convierte ideas en contenido.**

Un `SKILL.md` por skill. Funciona en Claude Code, Codex, Gemini CLI, Cursor, GitHub Copilot, OpenCode, Kiro y otras herramientas compatibles con Agent Skills.

</div>

## Skills

Los comandos son los mismos en todos los idiomas. Cada skill responde en el idioma en que escribes.

### Pensar y aprender

| Comando | Qué hace por ti |
|---|---|
| [`/ky`](./skills/ky/) | Úsalo cuando algo no va bien pero no sabes qué: te escucha, propone una sola hipótesis sobre qué tipo de problema es y te lleva a la skill adecuada. No necesitas conocer antes las demás skills. |
| [`/ky-think`](./skills/ky-think/) | Piensa a fondo un problema difícil: obtén un juicio claro, entiende algo de verdad o pon a prueba tu propia opinión. |
| [`/ky-mirror`](./skills/ky-mirror/) | Detecta cuándo una petición es en realidad una forma de rodear un problema más difícil, nombra lo que se evita y propone un pequeño paso hacia ello. |
| [`/ky-learn`](./skills/ky-learn/) | Un tutor con IA que traza el mapa de un campo, pregunta antes de explicar, comprueba lo que de verdad entendiste y retoma donde lo dejaste. |
| [`/ky-council`](./skills/ky-council/) | Aplica la perspectiva de dos o tres pensadores a una decisión importante, guarda un registro y revisa el resultado más adelante. |

### Escribir y publicar

| Comando | Qué hace por ti |
|---|---|
| [`/ky-write`](./skills/ky-write/) | Escribe y edita artículos de opinión y guiones para vídeo (en chino): elimina el relleno con tono de IA, revisa el argumento y añade subtítulos en inglés. |
| [`/ky-typeset`](./skills/ky-typeset/) | Convierte Markdown en HTML con estilo que puedes pegar en WeChat, Substack, Medium, correo y otros editores. 19 estilos. |
| [`/ky-xdraft`](./skills/ky-xdraft/) | Convierte un archivo Markdown local en un borrador de publicación larga en X (Twitter). Nunca publica por defecto. |

### Imagen y vídeo

| Comando | Qué hace por ti |
|---|---|
| [`/ky-brand`](./skills/ky-brand/) | Portadas, tarjetas de citas, pósteres y presentaciones con un estilo coherente, firmados con tu propio nombre. |
| [`/ky-video`](./skills/ky-video/) | Convierte grabaciones a cámara en un vídeo terminado con código: animación, subtítulos, efectos de sonido, ganchos iniciales, portadas y paquete de publicación. |

### Recopilar material

| Comando | Qué hace por ti |
|---|---|
| [`/ky-x`](./skills/ky-x/) | Archiva publicaciones públicas de X en tu ordenador (Markdown + JSONL). |
| [`/ky-dy`](./skills/ky-dy/) | Descarga vídeos públicos de Douyin con sus metadatos. |
| [`/ky-xhs`](./skills/ky-xhs/) | Obtén notas públicas de Xiaohongshu (RED): texto, imágenes y vídeo. |
| [`/ky-sph`](./skills/ky-sph/) | Organiza material de WeChat Channels y de cuentas oficiales en tu biblioteca. |

## Instalación

Envía esto a tu agente:

```text
Install the skills from https://github.com/KirenYi/kyskills
```

O ejecuta en una terminal (macOS / Linux):

```bash
curl -fsSL https://github.com/KirenYi/kyskills/raw/main/install.sh | bash
```

En Windows, haz `git clone` del repositorio y ejecuta `./scripts/install-links.sh` (Git Bash o WSL).

Reinicia tu agente después de instalar.

## Herramientas compatibles

El instalador enlaza cada skill en cada una de estas herramientas que tengas instalada. Al actualizar el repositorio, se actualizan todas a la vez.

| Herramienta | Carpeta de skills |
|---|---|
| Estándar compartido (Codex, Gemini CLI, GitHub Copilot, Cursor, OpenCode, Goose, Amp y otras) | `~/.agents/skills` |
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
| Augment, Continue, OpenHands, CodeBuddy, Lingma, iFlow, OpenClaw | la carpeta `skills` de cada herramienta |

## Primer uso

Algunas skills te preguntan una vez y recuerdan tu respuesta en `~/.config/kyskills/`:

- **ky-learn, ky-council**: dónde guardar tu progreso de aprendizaje y tus registros de decisiones. Sirve cualquier carpeta, incluida una bóveda de Obsidian existente.
- **ky-brand**: con qué nombre y sitio web firmar tus imágenes (o sin firma).
- **ky-brand, ky-video**: permiso para descargar dos fuentes de código abierto (Noto Serif SC y Noto Sans SC, unos 40 MB).

## Requisitos

- macOS, Linux o Windows
- Python 3.10+ para las skills con scripts
- ky-video necesita además ffmpeg, Node 18+ y openai-whisper; ky-brand necesita Google Chrome o Chromium

## Sugerencias y errores

Abre un [issue](https://github.com/KirenYi/kyskills/issues). Las ideas, los problemas y la experiencia de uso real son bienvenidos; las buenas sugerencias se incorporan a la siguiente versión.

## Uso responsable

- Procesa solo contenido público o tuyo, y respeta los términos de cada plataforma y las leyes locales.
- Las skills de recopilación dependen de las políticas de cada plataforma y pueden dejar de funcionar; cada skill explica una alternativa.
- Tus datos (archivos, cookies, notas) se quedan en tu ordenador. No los subas a Git.

## Licencia

© 2026 Kiren Yi. Todos los derechos reservados.

- **Puedes**: instalar y usar las skills gratis; lo que crees con ellas es tuyo, también para trabajos de pago o con publicidad; modificarlas en tu ordenador para tu propio uso.
- **No puedes sin permiso por escrito**: redistribuirlas, publicar versiones modificadas, venderlas, incluirlas en otros productos o cursos, ni usarlas para entrenar modelos de IA.

Términos completos: [LICENSE](./LICENSE) (prevalece la versión en chino). Licencias comerciales: kirenyi16@gmail.com

## Sobre el autor

**Kiren Yi (知羿Kiren)**

- Web: [kirenyi.com](https://kirenyi.com)
- YouTube: **Kiren Yi**
- Douyin · WeChat Channels · Xiaohongshu: **知羿Kiren**
- Correo: kirenyi16@gmail.com
