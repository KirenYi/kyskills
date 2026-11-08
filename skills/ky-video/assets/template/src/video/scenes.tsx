// Per-video scenes: which visual plays over which shots, SFX cues, hook text.
// Shot names come from edl.json. kw('词') = frame (relative) where that word is spoken.
// See assets/examples/taste/src/video/scenes.tsx for a full real example.
import React from 'react';
import * as St from '../style';
import * as V from './custom';
import type {VProps, Render, SfxList, HookSpec} from '../engine/types';

export const VIS: [string, string, Render][] = [
  ['title', 'title', (p) => <St.TitleSting {...p} word="主题词" sub="到底是什么？" />],
];

export const SFX_MAP: Record<string, (p: VProps) => SfxList> = {
  title: () => [[-8, 'whoosh'], [0, 'impact']],
};

export const HOOK: HookSpec | null = {
  variants: [{lines: ['TODO 钩子第一行，', 'TODO 第二行'], hi: '第二行'}],
  defaultVariant: 0,
};
void V;
