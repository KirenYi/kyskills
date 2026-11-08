// ky-video/magazine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see kyskills LICENSE · KYVIDEO-magazine-2611
// Where the speaker video sits in each layout (1920x1080 canvas).
// face = [x, y] of the speaker's face in the full source frame (project.json "face").
// A: full frame (zoom around face)  B: same, overlays on the empty side
// C: speaker in a right-hand card   D: small PiP bottom-right   E: hidden (full card)
export type Geo = {L: number; T: number; S: number; x: number; y: number; w: number; h: number; r: number; o: number};
export const geoFor = (layout: string, zoom: number, face: [number, number]): Geo => {
  const [FX, FY] = face;
  // card rect, scale, and where the face should land inside it
  const card = (x: number, y: number, w: number, h: number, r: number, S: number, cx: number, cy: number, o = 1): Geo =>
    ({L: cx - FX * S, T: cy - FY * S, S, x, y, w, h, r, o});
  switch (layout) {
    case 'C': return card(1040, 150, 760, 780, 18, 0.8, 1420, 466);
    case 'D': return card(1460, 620, 380, 285, 14, 0.4, 1650, 733);
    case 'E': return card(1460, 620, 380, 285, 14, 0.4, 1650, 733, 0);
    default: return {L: FX - FX * zoom, T: FY - FY * zoom, S: zoom, x: 0, y: 0, w: 1920, h: 1080, r: 0, o: 1};
  }
};
// layouts where the speaker is under the overlays (full frame)
export const isFlat = (layout: string) => layout === 'A' || layout === 'B';
