// ky-video/magazine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see kyskills LICENSE · KYVIDEO-magazine-2611
// Loads the style's fonts from public/fonts (copied there by new_project.py) before any frame renders.
// Noto Serif SC / Noto Sans SC: SIL Open Font License 1.1 (public/fonts/OFL.txt) — on the KY font whitelist.
import {continueRender, delayRender, staticFile} from 'remotion';

const FONTS: [string, string][] = [
  ['Noto Serif SC', 'fonts/NotoSerifSC.ttf'],
  ['Noto Sans SC', 'fonts/NotoSansSC.ttf'],
];
if (typeof document !== 'undefined') {
  const handle = delayRender('Loading style fonts');
  Promise.all(
    FONTS.map(([family, file]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format('truetype')`, {weight: '200 900'});
      return face.load().then((f) => document.fonts.add(f));
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => { console.error('font load failed', e); continueRender(handle); });
}
