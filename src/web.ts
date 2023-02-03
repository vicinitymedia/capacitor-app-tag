import { WebPlugin } from '@capacitor/core';

import type { VicinityMediaTagPlugin } from './definitions';

export class VicinityMediaTagWeb extends WebPlugin implements VicinityMediaTagPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
