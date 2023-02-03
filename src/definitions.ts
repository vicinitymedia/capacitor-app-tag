export interface VicinityMediaTagPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
