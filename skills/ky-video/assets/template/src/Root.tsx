// ky-video/engine · © 2026 Kiren Yi（知羿Kiren）· kirenyi.com · Terms: see kyskills LICENSE · KYVIDEO-engine-2611
import React from 'react';
import {Still, Composition} from 'remotion';
import {Main, mainDuration, hookPreviewDuration} from './engine/Main';
import {HOOK} from './video/scenes';
import {COVERS} from './video/covers';
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="main" component={Main} width={1920} height={1080} fps={30} durationInFrames={mainDuration} />
    {(HOOK?.variants ?? []).map((_, i) => (
      <Composition key={i} id={`hook-${i}`} component={Main} width={1920} height={1080} fps={30} durationInFrames={hookPreviewDuration} defaultProps={{hook: i}} />
    ))}
    {COVERS.map((c) => <Still key={c.id} id={c.id} component={c.component} width={c.width} height={c.height} />)}
  </>
);
