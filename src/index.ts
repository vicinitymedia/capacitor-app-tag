import { registerPlugin } from '@capacitor/core';

import { Geolocation } from '@capacitor/geolocation';

import type { VicinityMediaTagPlugin, PermissionStatus } from './definitions';

const VicinityMediaTag = registerPlugin<VicinityMediaTagPlugin>(
  'VicinityMediaTag',
  {
    web: () => import('./web').then(m => new m.VicinityMediaTagWeb()),
  },
);

export * from './definitions';
export { VicinityMediaTag };
export { Permissions };
export { Location };
