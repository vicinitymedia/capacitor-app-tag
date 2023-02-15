import type { PermissionState } from '@capacitor/core';

import { Geolocation } from '@capacitor/geolocation';

export interface VicinityMediaTagPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}

export interface PermissionStatus {
  LocationPermissions: PermissionState;
}

export interface Location {
  Location: Geolocation;
}
