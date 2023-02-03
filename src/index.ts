import { registerPlugin } from '@capacitor/core';

import type { VicinityMediaTagPlugin } from './definitions';

const VicinityMediaTag = registerPlugin<VicinityMediaTagPlugin>('VicinityMediaTag', {
  web: () => import('./web').then(m => new m.VicinityMediaTagWeb()),
});

export * from './definitions';
export { VicinityMediaTag };
