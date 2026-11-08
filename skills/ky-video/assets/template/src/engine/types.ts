// ky-video/engine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see kyskills LICENSE · KYVIDEO-engine-2611
export type Shot = {id: number; name: string; layout: string; start: number; end: number; text: string; zoom?: number | null};
export type Caption = {start: number; end: number; text: string};
export type Timeline = {fps: number; durationInFrames: number; shots: Shot[]; captions: Caption[]; words: {f: number; c: string}[]};
// props every visual receives:
//   dur  = frames the visual lasts
//   cues = start frame (relative) of each shot in its range
//   kw   = frame (relative) where a keyword is spoken, or the fallback if not found
export type VProps = {dur: number; cues: number[]; kw: (text: string, fallback?: number) => number};
export type Render = (p: VProps) => React.ReactNode;
export type SfxList = [number, string][];
export type HookSpec = {variants: {lines: string[]; hi: string}[]; stamp?: string; payKey?: string; defaultVariant: number};
