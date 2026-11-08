// 《品味》 covers (chosen: C1 suspense). Question only — the answer stays in the video.
import React from 'react';
import {Suspense169, Suspense43, Suspense34, PhotoSpec} from '../style';
const photo: PhotoSpec = {file: 'cover_calm.png', face: [1140, 420]};
const strike = '会用 AI 就够了';
const badge = '全片动画由 AI 制作';
export const COVERS = [
  {id: 'cover-169', width: 1920, height: 1080, component: () => <Suspense169 photo={photo} strike={strike} big={['AI 时代最值钱的', '是？？']} badge={badge} />},
  {id: 'cover-43', width: 1440, height: 1080, component: () => <Suspense43 photo={photo} strike={strike} big={['AI 时代', '最值钱的', '是？？']} badge={badge} />},
  {id: 'cover-34', width: 1080, height: 1440, component: () => <Suspense34 photo={photo} strike={strike} big={['AI 时代最值钱的', '是？？']} badge={badge} />},
];
