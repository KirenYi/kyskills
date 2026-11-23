// Covers: question only, never the answer. Two families; list the ones you use in project.json "covers".
// 1) suspense-*: the style package's own cover (photo = frame grab listed in project.json "frames")
// 2) bigtext-*:  style-independent big-text cover (photo = dedicated cover photo in public/, ~4 chars per line)
import React from 'react';
import {Suspense169, Suspense43, Suspense34, PhotoSpec} from '../style';
import {BigTextCover, BigTextProps} from '../engine/BigTextCover';
import project from '../../project.json';
const photo: PhotoSpec = {file: 'cover_calm.png', face: project.face as [number, number]};
const strike = 'TODO 被推翻的常识';
const big = ['TODO 问题第一行', '是？？'];
const badge = '全片动画由 AI 制作';

const bt: Omit<BigTextProps, 'w' | 'h'> = {photo: 'cover_photo.png', photoWide: 'cover_calm.png', top: 'TODO四字', sub: 'TODO 一行补充信息', bottom: 'TODO四字'};
const BT = (w: number, h: number) => () => <BigTextCover w={w} h={h} {...bt} />;

export const COVERS = [
  {id: 'cover-169', width: 1920, height: 1080, component: () => <Suspense169 photo={photo} strike={strike} big={big} badge={badge} />},
  {id: 'cover-43', width: 1440, height: 1080, component: () => <Suspense43 photo={photo} strike={strike} big={big} badge={badge} />},
  {id: 'cover-34', width: 1080, height: 1440, component: () => <Suspense34 photo={photo} strike={strike} big={big} badge={badge} />},
  {id: 'bigtext-34', width: 1080, height: 1440, component: BT(1080, 1440)},
  {id: 'bigtext-916', width: 1080, height: 1920, component: BT(1080, 1920)},
  {id: 'bigtext-43', width: 1440, height: 1080, component: BT(1440, 1080)},
  {id: 'bigtext-169', width: 1920, height: 1080, component: BT(1920, 1080)},
];
