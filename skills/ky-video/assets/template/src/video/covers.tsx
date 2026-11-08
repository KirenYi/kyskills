// Covers: question only, never the answer. Photo = frame grab listed in project.json "frames".
import React from 'react';
import {Suspense169, Suspense43, Suspense34, PhotoSpec} from '../style';
import project from '../../project.json';
const photo: PhotoSpec = {file: 'cover_calm.png', face: project.face as [number, number]};
const strike = 'TODO 被推翻的常识';
const big = ['TODO 问题第一行', '是？？'];
const badge = '全片动画由 AI 制作';
export const COVERS = [
  {id: 'cover-169', width: 1920, height: 1080, component: () => <Suspense169 photo={photo} strike={strike} big={big} badge={badge} />},
  {id: 'cover-43', width: 1440, height: 1080, component: () => <Suspense43 photo={photo} strike={strike} big={big} badge={badge} />},
  {id: 'cover-34', width: 1080, height: 1440, component: () => <Suspense34 photo={photo} strike={strike} big={big} badge={badge} />},
];
